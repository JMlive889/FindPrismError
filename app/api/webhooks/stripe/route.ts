import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateBookingConfirmationEmail, generateOwnerNotificationEmail } from '@/lib/email';
import { createCalendarEvent } from '@/lib/calendar';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const metadata = session.metadata;
  
  if (!metadata) {
    console.error('No metadata found in checkout session');
    return;
  }

  try {
    // Create the booking in database
    const booking = await prisma.booking.create({
      data: {
        name: metadata.name,
        email: metadata.email,
        phone: metadata.phone,
        productId: metadata.productId,
        scheduledStart: new Date(metadata.scheduledStart),
        scheduledEnd: new Date(metadata.scheduledEnd),
        notes: metadata.notes || '',
        stripePaymentId: session.id,
        status: 'CONFIRMED'
      },
      include: {
        product: true
      }
    });

    // Create Google Calendar event
    let calendarEventId;
    try {
      calendarEventId = await createCalendarEvent(booking, booking.product);
      await prisma.booking.update({
        where: { id: booking.id },
        data: { calendarEventId }
      });
    } catch (calendarError) {
      console.error('Failed to create calendar event:', calendarError);
    }

    // Send confirmation emails
    try {
      await sendEmail({
        to: booking.email,
        subject: 'Booking Confirmation - Cryptic Mobile Detailing',
        html: generateBookingConfirmationEmail(booking, booking.product)
      });

      await sendEmail({
        to: process.env.OWNER_EMAIL!,
        subject: 'New Booking Received',
        html: generateOwnerNotificationEmail(booking, booking.product)
      });
    } catch (emailError) {
      console.error('Failed to send emails:', emailError);
    }

  } catch (error) {
    console.error('Error processing completed checkout session:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  const subscriptionId = invoice.subscription;
  
  if (subscriptionId) {
    try {
      // Update membership status
      await prisma.membership.updateMany({
        where: { stripeSubId: subscriptionId },
        data: {
          status: 'ACTIVE',
          currentPeriodStart: new Date(invoice.period_start * 1000),
          currentPeriodEnd: new Date(invoice.period_end * 1000)
        }
      });
    } catch (error) {
      console.error('Error updating membership:', error);
    }
  }
}
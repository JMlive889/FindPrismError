import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { sendEmail, generateBookingConfirmationEmail, generateOwnerNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, productId, scheduledStart, scheduledEnd, notes } = data;

    // Validate required fields
    if (!name || !email || !phone || !productId || !scheduledStart) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing booking in the past 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const existingBooking = await prisma.booking.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ],
        scheduledStart: {
          gte: sevenDaysAgo
        },
        status: {
          not: 'CANCELLED'
        }
      }
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You can only book one service per week. Please wait 7 days from your last booking.' },
        { status: 400 }
      );
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'This service is not currently available' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/booking`,
      metadata: {
        name,
        email,
        phone,
        productId,
        scheduledStart: scheduledStart,
        scheduledEnd: scheduledEnd,
        notes: notes || '',
      },
    });

    return NextResponse.json({ checkoutSessionId: session.id });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        product: true,
        user: true
      },
      orderBy: { scheduledStart: 'desc' }
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
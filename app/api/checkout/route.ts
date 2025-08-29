import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan, addons, zipCode, subtotal, travelFee, total } = await req.json();

    if (!plan || !zipCode) {
      return NextResponse.json(
        { error: 'Plan and ZIP code are required' },
        { status: 400 }
      );
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: plan }
    });

    if (!product || product.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Selected plan is not available' },
        { status: 400 }
      );
    }

    // Get addon details
    const addonDetails = await prisma.addon.findMany({
      where: {
        id: { in: addons },
        status: 'ACTIVE'
      }
    });

    // Create line items for Stripe
    const lineItems = [];

    // Base service
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price,
        ...(product.isMembership && {
          recurring: {
            interval: 'month',
          },
        }),
      },
      quantity: 1,
    });

    // Add-ons (always one-time, even for subscriptions)
    addonDetails.forEach(addon => {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: addon.name,
            description: addon.description || `Add-on: ${addon.name}`,
          },
          unit_amount: addon.price,
        },
        quantity: 1,
      });
    });

    // Travel fee (always one-time)
    if (travelFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Travel Fee',
            description: `Service area: ${zipCode}`,
          },
          unit_amount: travelFee,
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: product.isMembership ? 'subscription' : 'payment',
      success_url: `${req.nextUrl.origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/book`,
      metadata: {
        productId: product.id,
        addons: JSON.stringify(addons),
        zipCode,
        subtotal: subtotal.toString(),
        travelFee: travelFee.toString(),
        total: total.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
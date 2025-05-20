import { NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { PlanType } from '@/prisma/client';

interface SubscriptionRequest {
  planType: PlanType;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { planType, userId } = await req.json() as SubscriptionRequest;
    
    // Get user
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: [
        {
          price: PLANS[planType].priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        planType,
      },
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
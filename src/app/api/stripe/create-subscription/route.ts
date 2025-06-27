import { NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { PlanType } from '@/prisma/client';

interface SubscriptionRequest {
  planType: PlanType;
  userId: string;
  subscriptionId: string;
}

export async function POST(req: Request) {
  try {
    const { planType, userId, subscriptionId} = await req.json() as SubscriptionRequest;
    // Get user
    const user = await prisma.profile.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    //one user can have multiful active customer records, so need to subscription Id in user table to keep only one active subscription per user.
    if(subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if(subscription && subscription.status === 'active') {
        await stripe.subscriptions.update(subscription.id, {
          items: [{ id: subscription.items.data[0].id, price: PLANS[planType].priceId }],
          proration_behavior: "create_prorations", // immediately attempt charge to user 
          payment_behavior: "error_if_incomplete", // ensure subscription is only update if payment is successful
          metadata: {
            userId: user.id,
            planType,
          },
        });
        return NextResponse.json({url: `${process.env.NEXT_PUBLIC_SITE_URL}`}, {status:200})
      }
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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

POST.preferredRegion = ['gru1'];
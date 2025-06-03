import { NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { Stripe } from 'stripe';
import { PlanType, PackType } from '@/prisma/client';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
  
  const session = event.data.object as Stripe.Checkout.Session;
  
  switch (event.type) {
    case 'checkout.session.completed':
      if (session.mode === 'subscription' && session.metadata) {
        const planType = session.metadata.planType as PlanType;
        const userId = session.metadata.userId;
        const subscriptionId = session.subscription;

        await prisma.subscriptions.create({
          data: {
            user_id: userId,
            plan_type: planType,
            status: 'active',
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            method: 'stripe',
            amount: PLANS[planType].credits,
          },
        });
        
        await prisma.users.update({
          where: { id: userId },
          data: {
            subscription_plan: planType,
            stripeSubscriptionId: subscriptionId as string,
            credits_balance: {
              increment: PLANS[planType].credits,
            },
          },
        });
      } else if (session.mode === 'payment' && session.metadata) {
        const packType = session.metadata.packType as PackType;
        const userId = session.metadata.userId;
        const credits = parseInt(session.metadata.credits || '0');
        
        await prisma.credit_purchases.create({
          data: {
            user_id: userId,
            pack_type: packType,
            credits: credits,
            price: (session.amount_total || 0) / 100, 
          },
        });
        
        await prisma.users.update({
          where: { id: userId },
          data: {
            credits_balance: {
              increment: credits,
            },
          },
        });
      }
      break;
   
    case 'customer.subscription.updated':
      const planType = session.metadata.planType as PlanType;
      const userId = session.metadata.userId;
      const subscription_id = (await prisma.subscriptions.findFirst({where:{user_id:userId}})).id;

      await prisma.subscriptions.update({
        where: {id: subscription_id},
        data: {
          plan_type: planType,
          start_date: new Date(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          method: 'stripe',
          amount: PLANS[planType].credits,
        },
      });
      
      await prisma.users.update({
        where: { id: userId },
        data: {
          subscription_plan: planType,
          credits_balance: {
            increment: PLANS[planType].credits,
          },
        },
      });
      break;

    case 'invoice.paid':
      break;
      
    case 'invoice.payment_failed':
      break;
      
    case 'customer.subscription.deleted':
      break;
  }
  
  return NextResponse.json({ received: true });
}
import { NextResponse } from 'next/server';
import { stripe, CREDIT_PACKS } from '@/lib/stripe';
import { PackType } from '@/prisma/client';
import { prisma } from '@/lib/db';

interface CreditPurchaseRequest {
  packType: PackType;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { packType, userId } = await req.json() as CreditPurchaseRequest;
    
    // Get user
    const user = await prisma.profile.findUnique({
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
          price: CREDIT_PACKS[packType].priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      metadata: {
        userId: user.id,
        packType,
        credits: CREDIT_PACKS[packType].credits.toString(),
      },
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error buying credits:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

POST.preferredRegion = ['gru1'];
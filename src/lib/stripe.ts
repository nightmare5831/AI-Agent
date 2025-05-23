import Stripe from 'stripe';
import { PackType, PlanType } from '@/prisma/client';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil', 
});

interface Plan {
  name: string;
  priceId: string;
  credits: number;
}

interface CreditPack {
  name: string;
  priceId: string;
  credits: number;
}

export const PLANS: Record<PlanType, Plan> = {
  essential: {
    name: 'Essential',
    priceId: 'price_1RRfRbPK2rhKqgs1VPlMcx09', 
    credits: 100,
  },
  professional: {
    name: 'Professional',
    priceId: 'price_1RRfV4PK2rhKqgs1un7npYB3',
    credits: 150,
  },
  complete: {
    name: 'Complete',
    priceId: 'price_1RRfVePK2rhKqgs1k665W3Mj',
    credits: 200,
  },
};

// Type-safe map for credit packs
export const CREDIT_PACKS: Record<PackType, CreditPack> = {
  PACK_100: {
    name: '100 Credits',
    priceId: 'price_1RRmV9PK2rhKqgs10ZNFzTIE',
    credits: 100,
  },
  PACK_500: {
    name: '500 Credits',
    priceId: 'price_1RRmVnPK2rhKqgs1otnG86fF',
    credits: 500,
  },
  PACK_1000: {
    name: '1000 Credits',
    priceId: 'price_1RRmWWPK2rhKqgs1xMvgDX9W',
    credits: 1000,
  },
};
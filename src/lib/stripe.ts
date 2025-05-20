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
    priceId: 'price_xxx', 
    credits: 100,
  },
  professional: {
    name: 'Professional',
    priceId: 'price_yyy',
    credits: 300,
  },
  completo: {
    name: 'Completo',
    priceId: 'price_zzz',
    credits: 600,
  },
};

// Type-safe map for credit packs
export const CREDIT_PACKS: Record<PackType, CreditPack> = {
  PACK_100: {
    name: '100 Credits',
    priceId: 'price_aaa',
    credits: 100,
  },
  PACK_500: {
    name: '500 Credits',
    priceId: 'price_bbb',
    credits: 500,
  },
  PACK_1000: {
    name: '1000 Credits',
    priceId: 'price_ccc',
    credits: 1000,
  },
};
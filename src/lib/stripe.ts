import Stripe from 'stripe';
import { PackType, PlanType } from '@/prisma/client';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
    name: 'Monthly',
    priceId: 'price_1RjqIKFsOXsRMDlM5BsE0tjH', 
    credits: 100,
  },
  professional: {
    name: 'Annual',
    priceId: 'price_1RjqJTFsOXsRMDlMErKWNkds',
    credits: 100,
  },
};

// Type-safe map for credit packs
export const CREDIT_PACKS: Record<PackType, CreditPack> = {
  PACK_100: {
    name: '100 Credits',
    priceId: 'price_1RjqQbFsOXsRMDlMh4FKezLm',
    credits: 100,
  },
  PACK_200: {
    name: '200 Credits',
    priceId: 'price_1RXMuVFsOXsRMDlMrO77CATk',
    credits: 200,
  },
  PACK_400: {
    name: '400 Credits',
    priceId: 'price_1RXMvHFsOXsRMDlM94PPSX1v',
    credits: 400,
  },
};
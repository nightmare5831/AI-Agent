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
    priceId: 'price_1RXMqqFsOXsRMDlMdaYJWJg4', 
    credits: 100,
  },
  professional: {
    name: 'Professional',
    priceId: 'price_1RXMrcFsOXsRMDlMJkQmtYQ4',
    credits: 150,
  },
  complete: {
    name: 'Complete',
    priceId: 'price_1RXMsTFsOXsRMDlM0P8cPd45',
    credits: 200,
  },
};

// Type-safe map for credit packs
export const CREDIT_PACKS: Record<PackType, CreditPack> = {
  PACK_100: {
    name: '100 Credits',
    priceId: 'price_1RXMtdFsOXsRMDlMyhJPKaot',
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
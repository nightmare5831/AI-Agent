'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, Gift } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const CreditsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCreditPack, setSelectedCreditPack] = useState<string | null>(
    null
  );

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Professional',
    credits: 85,
  };

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: 'R$29.90',
      interval: 'month',
      credits: 100,
      features: [
        '100 AI Credits',
        'Basic AI Agents',
        'Email Support',
        '3-day History',
      ],
      recommended: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'R$49.90',
      interval: 'month',
      credits: 150,
      features: [
        '150 AI Credits',
        'All AI Agents',
        'WhatsApp Bot Automation',
        'Priority Support',
        '14-day History',
      ],
      recommended: true,
    },
    {
      id: 'complete',
      name: 'Complete',
      price: 'R$59.90',
      interval: 'month',
      credits: 200,
      features: [
        '200 AI Credits',
        'All AI Agents',
        'WhatsApp Bot Automation',
        'AI Scheduling Bot',
        'Priority Support',
        '30-day History',
      ],
      recommended: false,
    },
  ];

  const creditPacks = [
    {
      id: 'small',
      name: 'Small Pack',
      credits: 100,
      price: 'R$19.90',
      recommended: false,
    },
    {
      id: 'medium',
      name: 'Medium Pack',
      credits: 500,
      price: 'R$49.90',
      recommended: true,
    },
    {
      id: 'large',
      name: 'Large Pack',
      credits: 1000,
      price: 'R$89.90',
      recommended: false,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="rounded-lg border border-[#8b5cf6]/20 bg-background/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Purchase Credits & Upgrade Plan
          </h1>
          <p className="text-muted-foreground">
            Upgrade your plan or purchase additional credits to continue using
            our services
          </p>
        </div>

        {/* Alert */}
        <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You have less than 100 credits remaining. Consider purchasing
                additional credits to avoid interruptions.
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Your Current Plan</CardTitle>
            <CardDescription>
              You are currently on the {user.plan} plan with {user.credits}{' '}
              credits remaining.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <h3 className="mb-2 font-medium">Plan Details</h3>
                <div className="space-y-1 text-md">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-semibold">{user.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">R$49.90/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Billing:</span>
                    <span className="font-semibold">26 May 2025</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="mb-2 font-medium">Credit Details</h3>
                <div className="space-y-1 text-md">
                  <div className="flex justify-between">
                    <span>Monthly Credits:</span>
                    <span className="font-semibold">150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Balance:</span>
                    <span className="font-semibold">{user.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reset Date:</span>
                    <span className="font-semibold">26 May 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-10">
          <h3 className="mb-6 text-xl font-semibold">Upgrade Your Plan</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${
                  plan.recommended
                    ? 'border-2 border-[#2B6CB0]'
                    : 'border border-border'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute right-0 top-0">
                    <Badge variant="success">Recommended</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2 flex items-end">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                  <CardDescription className="mt-1">
                    Includes {plan.credits} credits per month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="text-success mr-2 h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="mt-3 bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                    size="sm"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.id === user.plan.toLowerCase()
                      ? 'Current Plan'
                      : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-xl font-semibold">
            Purchase Additional Credits
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {creditPacks.map((pack) => (
              <Card
                key={pack.id}
                className={`relative overflow-hidden ${
                  pack.recommended
                    ? 'border-2 border-[#2B6CB0]'
                    : 'border border-border'
                }`}
              >
                {pack.recommended && (
                  <div className="absolute right-0 top-0">
                    <Badge variant="success">Best Value</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{pack.name}</CardTitle>
                    <div className="rounded-full bg-text p-2">
                      <CreditCard className="h-6 w-6 text-[#2B6CB0]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold">{pack.credits}</span>
                      <span className="ml-1 text-muted-foreground">
                        credits
                      </span>
                    </div>
                    <div className="mt-3 text-xl font-semibold">
                      {pack.price}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {(
                        Number(pack.price.replace('R$', '')) / pack.credits
                      ).toFixed(2)}{' '}
                      per credit
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="mt-3 bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                    size="sm"
                    onClick={() => setSelectedCreditPack(pack.id)}
                  >
                    Purchase Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-[#2B6CB0]" />
                Referral Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Invite your friends and get 50 free credits for each successful
                referral. Your friends will also receive 25 free credits on
                signup.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="text"
                readOnly
                value="https://aiautomation.com/ref/johndoe123"
                className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                className="mt-3 bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                size="sm"
              >
                Copy Link
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;

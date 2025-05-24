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
import { useEffect, useState } from 'react';
import { creditPacks, plans } from '@/lib/constants/usermock';
import { useAuth } from '@/core/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { getSubscription } from '@/core/subscription';
import { getCurrentProfile } from '@/core/auth/server';

const CreditsPage = () => {
  const router = useRouter();
  const [{ profile }] = useAuth();
  const [reset, setReset] = useState(0);
  const [currentCredit, setCurrentCredit] = useState({
    plan:'Free', balance:0, price:'', credits:0, nextBilling: '', resetDate:''
  });

  const selectedPlan = async (plan: string) => {
    try {
      const url = await Request.Post('/api/stripe/create-subscription', 
                          {planType:plan, userId:profile.id, subscriptionId: profile.stripeSubscriptionId});
      if(url?.url) {
        router.push(url.url)
      } else { 
        router.replace('/user')
        setTimeout(() => {setReset(reset + 1);}, 500)
      };
      toast.success('Subscripion created successfully!');
    } catch (error : any) {
      toast.error(
        error?.response?.data?.message ||
          'Failed to create Subscription. Please try again.'
      );      
    }
  };

  const selecteCreditPack = async (credit: string) => {
    try {
      const url = await Request.Post('/api/stripe/buy-credits', {packType:credit, userId:profile.id});
      if(url?.url) {
        router.push(url.url)
      }
      toast.success('Credit purchased successfully!')
    } catch (error) {
      
    }
  };

  const setSubscription = async () => {
    const subscription = await getSubscription(profile.id)
    const user = await getCurrentProfile();
    let price = '';
    plans.map(
      (tplan) => {if(tplan.id === subscription.plan_type.toLowerCase()) price = tplan.price}
    );
    setCurrentCredit(prev => ({
      ...prev,
      plan: subscription?.plan_type,
      balance: user.credits_balance,
      nextBilling: subscription?.end_date.toLocaleString(),
      resetDate: subscription?.start_date.toLocaleString(),
      price: price,
      credits: subscription?.amount,
    }))
  }

  useEffect(() => {
    setSubscription();
  },[reset])

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
              You are currently on the {profile?.subscription_plan} plan with{' '}
              {profile?.credits_balance} credits remaining.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <h3 className="mb-2 font-medium">Plan Details</h3>
                <div className="text-md space-y-1">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-semibold">{currentCredit.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">{currentCredit.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Billing:</span>
                    <span className="font-semibold">{currentCredit.nextBilling}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="mb-2 font-medium">Credit Details</h3>
                <div className="text-md space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly Credits:</span>
                    <span className="font-semibold">
                      {currentCredit.credits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Balance:</span>
                    <span className="font-semibold">{currentCredit.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reset Date:</span>
                    <span className="font-semibold">{currentCredit.resetDate}</span>
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
                  plan.id ===  currentCredit.plan?.toLocaleLowerCase()
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
                    onClick={() => selectedPlan(plan.id)}
                    disabled={plan.id === currentCredit.plan?.toLocaleLowerCase() ? true : false}
                  >
                    {plan.id === currentCredit.plan?.toLocaleLowerCase()
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
                    <div className="bg-text rounded-full p-2">
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
                    onClick={() => selecteCreditPack(pack.id)}
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

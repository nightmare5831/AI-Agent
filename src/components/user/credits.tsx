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
import { useAuth } from '@/core/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { getSubscription } from '@/core/subscription';
import { useLanguage } from '@/lib/i18n/language-context';
import { Loader } from 'lucide-react';

const CreditsPage = () => {
  const router = useRouter();
  const [{ profile }] = useAuth();
  const [spinner, setSpinner] = useState(false)
  const [targetPlan, setTargetPlan] = useState('no')
  const { t } = useLanguage();
  const [currentCredit, setCurrentCredit] = useState({
    plan: 'Free',
    balance: 0,
    price: '',
    credits: 0,
    nextBilling: '',
    resetDate: '',
  });

  // Get translated plans
  const getTranslatedPlans = () => {
    return [
      {
        id: 'essential',
        name: t.user.credits.monthlyPlan,
        price: 'R$47.90',
        interval: t.user.credits.month,
        credits: 100,
        features: [
          t.user.credits.aiCredits.replace('{credits}', '100'),
          t.user.credits.allAiAgents,
          t.user.credits.prioritySupport,
          t.user.credits.dayHistory.replace('{days}', '30'),
        ],
        recommended: false,
      },
      {
        id: 'professional',
        name: t.user.credits.annualPlan,
        price: 'R$377.00',
        interval: t.user.credits.annual,
        credits: 100,
        features: [
          t.user.credits.aiCredits.replace('{credits}', '100'),
          t.user.credits.allAiAgents,
          t.user.credits.prioritySupport,
          t.user.credits.dayHistory.replace('{days}', '30'),
        ],
        recommended: true,
      },
    ];
  };

  // Get translated credit packs
  const getTranslatedCreditPacks = () => {
    return [
      {
        id: 'PACK_100',
        name: t.user.credits.extraPack,
        credits: 100,
        price: 'R$39.90',
        recommended: false,
      },
    ];
  };

  const plans = getTranslatedPlans();
  const creditPacks = getTranslatedCreditPacks();

  const selectedPlan = async (plan: string) => {
    try {
      setSpinner(true);
      setTargetPlan(plan);
      const url = await Request.Post('/api/stripe/create-subscription', {
        planType: plan,
        userId: profile.id,
        subscriptionId: profile.stripeSubscriptionId,
      });
      router.push(url.url);
      toast.success(t.user.credits.subscriptionSuccess);
      setSpinner(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || t.user.credits.subscriptionError
      );
    }
  };

  const selecteCreditPack = async (credit: string) => {
    try {
      setSpinner(true);
      setTargetPlan('onetime');
      const url = await Request.Post('/api/stripe/buy-credits', {
        packType: credit,
        userId: profile.id,
      });
      if (url?.url) {
        router.push(url.url);
      }
      toast.success(t.user.credits.creditPurchaseSuccess);
      setSpinner(false);
    } catch (error) {
      console.log('Select Credit Pack error', error);
    }
  };

  useEffect(() => {
    const setSubscription = async () => {
      const subscription = await getSubscription(profile.id);
      let price = '';
      plans.map((tplan) => {
        if (tplan.id === subscription?.plan_type.toLowerCase())
          price = tplan.price;
      });
      setCurrentCredit((prev) => ({
        ...prev,
        plan: subscription?.plan_type,
        balance: profile.credits_balance,
        nextBilling: subscription?.end_date
          ? new Date(subscription.end_date).toLocaleString('pt-BR')
          : '',
        resetDate: subscription?.start_date
          ? new Date(subscription.start_date).toLocaleString('pt-BR')
          : '',
        price: price,
        credits: subscription?.amount,
      }));
    };
    setSubscription();
  }, [profile]);

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-2 pr-2">
        {/* Header section */}
        <div className="rounded-lg border border-[#8b5cf6]/20 bg-background/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {t.user.credits.title}
          </h1>
          <p className="text-muted-foreground">{t.user.credits.subtitle}</p>
        </div>

        {/* Alert */}
        {currentCredit.balance < 10 ? (
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
                  {t.user.credits.lowCreditsWarning}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {profile?.subscription_plan != 'free' && (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>{t.user.credits.currentPlan}</CardTitle>
              <CardDescription>
                {t.user.credits.currentPlanDescription
                  .replace('{plan}', profile?.subscription_plan)
                  .replace('{credits}', profile?.credits_balance)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <div className="flex-1">
                  <h3 className="mb-2 font-medium">
                    {t.user.credits.planDetails}
                  </h3>
                  <div className="text-md space-y-1">
                    <div className="flex justify-between">
                      <span>{t.user.credits.plan}:</span>
                      <span className="font-semibold">{currentCredit.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.user.credits.price}:</span>
                      <span className="font-semibold">{currentCredit.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.user.credits.nextBilling}:</span>
                      <span className="font-semibold">
                        {currentCredit.nextBilling}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="mb-2 font-medium">
                    {t.user.credits.creditDetails}
                  </h3>
                  <div className="text-md space-y-1">
                    <div className="flex justify-between">
                      <span>{t.user.credits.monthlyCredits}:</span>
                      <span className="font-semibold">
                        {currentCredit.credits}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.user.credits.currentBalance}:</span>
                      <span className="font-semibold">
                        {currentCredit.balance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.user.credits.resetDate}:</span>
                      <span className="font-semibold">
                        {currentCredit.resetDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-10">
          <h3 className="mb-6 text-xl font-semibold">
            {t.user.credits.upgradePlan}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden flex flex-col h-full ${
                  plan.id === currentCredit.plan?.toLocaleLowerCase()
                    ? 'border-2 border-[#2B6CB0]'
                    : 'border border-border'
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2 flex items-end">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                  <CardDescription className="mt-1">
                    {t.user.credits.includesCreditsPerMonth.replace('{credits}', plan.credits.toString())}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
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
                    className="mt-3 w-full bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                    size="sm"
                    onClick={() => selectedPlan(plan.id)}
                    disabled={
                      plan.id === currentCredit.plan?.toLocaleLowerCase()
                        ? true
                        : false
                    }
                  >
                    {spinner && targetPlan === plan?.id && <Loader className="mr-1 animate-spin"/>}
                    {plan.id === currentCredit.plan?.toLocaleLowerCase()
                      ? t.user.credits.currentPlanButton
                      : t.user.credits.selectPlanButton}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {creditPacks.map((pack) => (
              <Card
                key={pack.id}
                className={`relative overflow-hidden flex flex-col h-full ${
                  pack.recommended
                    ? 'border-2 border-[#2B6CB0]'
                    : 'border border-border'
                }`}
              >
                {pack.recommended && (
                  <div className="absolute right-0 top-0">
                    <Badge variant="success">{t.user.credits.bestValueBadge}</Badge>
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
                <CardContent className="flex-1">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold">{pack.credits}</span>
                      <span className="ml-1 text-muted-foreground">
                        {t.user.credits.creditsUnit}
                      </span>
                    </div>
                    <div className="mt-3 text-xl font-semibold">
                      {pack.price}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {(
                        Number(pack.price.replace('R$', '')) / pack.credits
                      ).toFixed(2)}{' '}
                      {t.user.credits.perCreditText}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="mt-3 w-full bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]"
                    size="sm"
                    onClick={() => selecteCreditPack(pack.id)}
                  >
                    {spinner && targetPlan === "onetime" && <Loader className="mr-1 animate-spin"/>}
                    {t.user.credits.purchaseNowButton}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-[#2B6CB0]" />
                {t.user.credits.referralProgram}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{t.user.credits.referralDescription}</p>
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
                {t.user.credits.copyLink}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
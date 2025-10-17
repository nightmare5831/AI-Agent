'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/language-context';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.home.pricing.plans.monthly.name,
      price: t.home.pricing.plans.monthly.price,
      period: t.home.pricing.plans.monthly.period,
      description: t.home.pricing.plans.monthly.description,
      credits: t.home.pricing.plans.monthly.credits,
      icon: <Sparkles className="h-6 w-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        t.home.pricing.plans.monthly.features.credits,
        t.home.pricing.plans.monthly.features.agents,
        t.home.pricing.plans.monthly.features.whatsapp,
        t.home.pricing.plans.monthly.features.support,
        t.home.pricing.plans.monthly.features.history
      ]
    },
    {
      name: t.home.pricing.plans.annual.name,
      price: t.home.pricing.plans.annual.price,
      period: t.home.pricing.plans.annual.period,
      description: t.home.pricing.plans.annual.description,
      credits: t.home.pricing.plans.annual.credits,
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-purple-500 to-pink-500',
      popular: true,
      savings: t.home.pricing.plans.annual.savings,
      features: [
        t.home.pricing.plans.annual.features.credits,
        t.home.pricing.plans.annual.features.agents,
        t.home.pricing.plans.annual.features.whatsapp,
        t.home.pricing.plans.annual.features.priority,
        t.home.pricing.plans.annual.features.history,
        t.home.pricing.plans.annual.features.discount
      ]
    },
    {
      name: t.home.pricing.plans.payAsYouGo.name,
      price: t.home.pricing.plans.payAsYouGo.price,
      period: t.home.pricing.plans.payAsYouGo.period,
      description: t.home.pricing.plans.payAsYouGo.description,
      credits: t.home.pricing.plans.payAsYouGo.credits,
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-green-500 to-emerald-500',
      features: [
        t.home.pricing.plans.payAsYouGo.features.flexible,
        t.home.pricing.plans.payAsYouGo.features.noExpiry,
        t.home.pricing.plans.payAsYouGo.features.allAgents,
        t.home.pricing.plans.payAsYouGo.features.whatsapp
      ]
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative" id="pricing">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mx-auto max-w-7xl z-10 relative"
      >
        <motion.div variants={slideUp} className="text-center mb-16">
          <Badge variant="success" className="mb-4 px-4 py-1.5 text-sm border border-[#2B6CB0]/30 bg-[#2B6CB0]/5">
            {t.home.pricing.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t.home.pricing.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.home.pricing.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {t.home.pricing.popular}
                  </Badge>
                </div>
              )}
              <Card className={`p-8 h-full ${plan.popular ? 'border-2 border-[#2B6CB0] shadow-xl' : 'border-muted/50'} bg-background/80 backdrop-blur-sm hover:border-[#2B6CB0]/50 transition-all duration-300`}>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary" className="mt-2">
                      {plan.savings}
                    </Badge>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">{plan.credits}</p>
                </div>

                <Link href="/auth/signup">
                  <Button
                    className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0]' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {t.home.pricing.getStarted}
                  </Button>
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#2B6CB0] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Credit Info */}
        <motion.div
          variants={slideUp}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-gradient-to-br from-[#2B6CB0]/5 to-background border-[#2B6CB0]/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{t.home.pricing.creditSystem.title}</h3>
              <p className="text-muted-foreground">{t.home.pricing.creditSystem.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2B6CB0] mb-2">1</div>
                <p className="text-sm text-muted-foreground">{t.home.pricing.creditSystem.perTask}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2B6CB0] mb-2">20</div>
                <p className="text-sm text-muted-foreground">{t.home.pricing.creditSystem.freeCredits}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2B6CB0] mb-2">∞</div>
                <p className="text-sm text-muted-foreground">{t.home.pricing.creditSystem.neverExpire}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}

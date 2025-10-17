'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/language-context';
import {
  Megaphone,
  Calendar,
  Lightbulb,
  FileText,
  Image as ImageIcon,
  Search,
  ClipboardList,
  Target,
  TrendingUp,
  MessageSquare,
  CalendarCheck,
  Bot
} from 'lucide-react';

export function AgentsShowcaseSection() {
  const { t } = useLanguage();

  const coreAgents = [
    {
      name: t.home.agents.marketing.name,
      description: t.home.agents.marketing.description,
      icon: <Megaphone className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        { icon: <Target className="h-4 w-4" />, text: t.home.agents.marketing.features.strategy },
        { icon: <Calendar className="h-4 w-4" />, text: t.home.agents.marketing.features.calendar },
        { icon: <Lightbulb className="h-4 w-4" />, text: t.home.agents.marketing.features.postIdeas },
        { icon: <FileText className="h-4 w-4" />, text: t.home.agents.marketing.features.copywriting },
        { icon: <ImageIcon className="h-4 w-4" />, text: t.home.agents.marketing.features.imageGen },
        { icon: <Search className="h-4 w-4" />, text: t.home.agents.marketing.features.seo }
      ]
    },
    {
      name: t.home.agents.organization.name,
      description: t.home.agents.organization.description,
      icon: <ClipboardList className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        { icon: <CalendarCheck className="h-4 w-4" />, text: t.home.agents.organization.features.routines },
        { icon: <MessageSquare className="h-4 w-4" />, text: t.home.agents.organization.features.customerService },
        { icon: <FileText className="h-4 w-4" />, text: t.home.agents.organization.features.briefings },
        { icon: <ClipboardList className="h-4 w-4" />, text: t.home.agents.organization.features.delegation }
      ]
    },
    {
      name: t.home.agents.strategy.name,
      description: t.home.agents.strategy.description,
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      features: [
        { icon: <Target className="h-4 w-4" />, text: t.home.agents.strategy.features.positioning },
        { icon: <TrendingUp className="h-4 w-4" />, text: t.home.agents.strategy.features.audience },
        { icon: <Lightbulb className="h-4 w-4" />, text: t.home.agents.strategy.features.valueProposition },
        { icon: <CalendarCheck className="h-4 w-4" />, text: t.home.agents.strategy.features.goalPlanning }
      ]
    }
  ];

  const extraAgents = [
    {
      name: t.home.agents.autoSupport.name,
      description: t.home.agents.autoSupport.description,
      icon: <Bot className="h-7 w-7" />,
      color: 'from-orange-500 to-red-500',
      badge: t.home.agents.addon,
      features: [
        t.home.agents.autoSupport.features.training,
        t.home.agents.autoSupport.features.realtime,
        t.home.agents.autoSupport.features.takeover
      ]
    },
    {
      name: t.home.agents.bookingBot.name,
      description: t.home.agents.bookingBot.description,
      icon: <CalendarCheck className="h-7 w-7" />,
      color: 'from-indigo-500 to-purple-500',
      badge: t.home.agents.addon,
      features: [
        t.home.agents.bookingBot.features.scheduling,
        t.home.agents.bookingBot.features.whatsapp,
        t.home.agents.bookingBot.features.confirmation
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
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative" id="agents">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mx-auto max-w-7xl z-10 relative"
      >
        <motion.div variants={slideUp} className="text-center mb-16">
          <Badge variant="success" className="mb-4 px-4 py-1.5 text-sm border border-[#2B6CB0]/30 bg-[#2B6CB0]/5">
            {t.home.agents.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t.home.agents.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.home.agents.subtitle}
          </p>
        </motion.div>

        {/* Core Agents */}
        <motion.div
          variants={slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {coreAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-6 h-full bg-background/80 backdrop-blur-sm border-muted/50 hover:border-[#2B6CB0]/30 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${agent.color} text-white mb-4`}>
                  {agent.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
                <p className="text-muted-foreground mb-6">{agent.description}</p>
                <div className="space-y-3">
                  {agent.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#2B6CB0]">
                        {feature.icon}
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Agents */}
        <motion.div variants={slideUp} className="mt-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
              {t.home.agents.extraAgentsTitle}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t.home.agents.extraAgentsSubtitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {extraAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 h-full bg-gradient-to-br from-background to-muted/20 border-2 border-[#2B6CB0]/20 hover:border-[#2B6CB0]/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${agent.color} text-white`}>
                      {agent.icon}
                    </div>
                    <Badge variant="default" className="bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0]">
                      {agent.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{agent.name}</h3>
                  <p className="text-muted-foreground mb-6">{agent.description}</p>
                  <ul className="space-y-2">
                    {agent.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2B6CB0]"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/language-context';
import {
  MessageCircle,
  CheckCircle,
  Zap,
  FileText,
  Image as ImageIcon,
  Download
} from 'lucide-react';

export function WhatsAppSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: t.home.whatsapp.features.menuSystem.title,
      description: t.home.whatsapp.features.menuSystem.description
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t.home.whatsapp.features.guidedChat.title,
      description: t.home.whatsapp.features.guidedChat.description
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: t.home.whatsapp.features.multiFormat.title,
      description: t.home.whatsapp.features.multiFormat.description
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: t.home.whatsapp.features.creditSync.title,
      description: t.home.whatsapp.features.creditSync.description
    }
  ];

  const steps = [
    {
      number: '01',
      title: t.home.whatsapp.steps.connect.title,
      description: t.home.whatsapp.steps.connect.description
    },
    {
      number: '02',
      title: t.home.whatsapp.steps.choose.title,
      description: t.home.whatsapp.steps.choose.description
    },
    {
      number: '03',
      title: t.home.whatsapp.steps.execute.title,
      description: t.home.whatsapp.steps.execute.description
    },
    {
      number: '04',
      title: t.home.whatsapp.steps.receive.title,
      description: t.home.whatsapp.steps.receive.description
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
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative bg-muted/30" id="whatsapp">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mx-auto max-w-7xl z-10 relative"
      >
        <motion.div variants={slideUp} className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-[#25D366] text-white hover:bg-[#25D366]/90">
            <svg className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t.home.whatsapp.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t.home.whatsapp.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.home.whatsapp.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Features */}
          <motion.div variants={slideUp} className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-background/80 backdrop-blur-sm border-muted/50 hover:border-[#25D366]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Visual representation */}
          <motion.div
            variants={slideUp}
            className="relative"
          >
            <Card className="p-8 bg-gradient-to-br from-[#25D366]/5 to-background border-[#25D366]/20">
              <div className="space-y-4">
                {/* Simulated WhatsApp Chat */}
                <div className="bg-[#25D366] text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">{t.home.whatsapp.chatDemo.welcome}</p>
                </div>
                <div className="bg-[#E5E5EA] text-gray-800 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-sm">{t.home.whatsapp.chatDemo.userChoice}</p>
                </div>
                <div className="bg-[#25D366] text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">{t.home.whatsapp.chatDemo.agentResponse}</p>
                </div>
                <div className="bg-[#25D366]/10 p-4 rounded-lg border border-[#25D366]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageIcon className="h-5 w-5 text-[#25D366]" />
                    <span className="text-sm font-medium">{t.home.whatsapp.chatDemo.deliverable}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.home.whatsapp.chatDemo.creditUsed}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* How it Works */}
        <motion.div variants={slideUp} className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t.home.whatsapp.howItWorks}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#63B3ED] to-[#2B6CB0] text-white text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#2B6CB0] to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

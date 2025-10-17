'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users,LightbulbIcon,Sparkles } from 'lucide-react';
import { HeroBackground } from './hero-background';
import { useLanguage } from '@/lib/i18n/language-context';

export function HeroSection() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      title: t.home.hero.aiPoweredTools,
      description: "Personalized learning experiences adapted to each student's needs",
      icon: <Sparkles className="h-5 w-5 text-[#2B6CB0]" />
    },
    {
      title: t.home.hero.studentEngagement,
      description: "Interactive features designed to increase participation",
      icon: <Users className="h-5 w-5 text-[#2B6CB0]" />
    },
    {
      title: t.home.hero.detailedAnalytics,
      description: "Track progress and identify areas for improvement",
      icon: <LightbulbIcon className="h-5 w-5 text-[#2B6CB0]" />
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Fondo específico para el hero, más llamativo que el fondo global */}
      <HeroBackground />

      <div className="container grid px-4 sm:px-6 relative z-10 mx-auto max-w-7xl min-h-[70vh] justify-center">
        <div className="grid items-center justify-center">
          {/* Columna izquierda - Contenido principal */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start text-left items-center"
          >

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-center"
              variants={slideInLeft}
            >
              {t.home.hero.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-muted-foreground mb-8 text-center max-w-4xl"
              variants={slideInLeft}
            >
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-[#2B6CB0]/20">
                <Sparkles className="h-4 w-4 text-[#2B6CB0]" />
                <span className="text-sm font-medium">{t.home.hero.aiAgents}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-[#2B6CB0]/20">
                <svg className="h-4 w-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm font-medium">{t.home.hero.whatsappIntegration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-[#2B6CB0]/20">
                <Users className="h-4 w-4 text-[#2B6CB0]" />
                <span className="text-sm font-medium">{t.home.hero.creditBased}</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-wrap items-center gap-5 mb-10"
            >
              <Link href="/auth/signup?role=admin">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="px-8 py-6 text-lg font-medium shadow-md bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0]">
                    {t.home.hero.learnMore}
                    <motion.div
                      animate={{ x: hovered ? 5 : 0 }}
                      className="ml-2"
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* Estadísticas en la parte inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center"
        >
          {[
            { value: "500+", label: t.home.hero.business },
            { value: "10k+", label: t.home.hero.users },
            { value: "98%", label: t.home.hero.satisfaction },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="py-10 px-10 bg-background/50 border-[#2B6CB0]/10 backdrop-blur-sm h-50 flex flex-col justify-center items-center">
                <motion.h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + (i * 0.1), type: "spring" }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#2B6CB0]/30"
        />
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-[#2B6CB0]/30"
        />
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-[#2B6CB0]/30"
        />
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-[#8b5cf6]/30"
        />
      </div>
    </section>
  );
}

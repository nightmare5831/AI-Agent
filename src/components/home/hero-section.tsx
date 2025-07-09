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
              className="text-lg md:text-2xl text-muted-foreground  mb-8 text-center" 
              variants={slideInLeft}
            >
              {t.home.hero.subtitle}
            </motion.p>
            
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

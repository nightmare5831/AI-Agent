'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Marketing Director, TechFlow',
    content:
      "The AI marketing agent has transformed how we engage with customers. Our response rate has increased by 40% and we've saved countless hours on content creation.",
    image: '/assets/images/avatars/sarah.png',
    initials: 'SJ',
  },
  {
    name: 'João Oliveira',
    role: 'Operations Manager, LogiSmart',
    content:
      "The organization agent streamlined our entire workflow. Tasks that took days now happen automatically, and our team can focus on strategy instead of repetitive work.",
    image: '/assets/images/avatars/david.jpg',
    initials: 'DC',
  },
  {
    name: 'Ana Costa',
    role: 'CEO, GrowthPath',
    content:
      "I was skeptical about AI tools, but this platform delivered real results. The WhatsApp integration alone has increased our customer conversion by 25%.",
    image: '/assets/images/avatars/maria.jpg',
    initials: 'MG',
  },
];

export function TestimonialsSection() {
  const { t } = useLanguage();
  // Variantes para animaciones
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5 }
    }
  };

  const slideIn = {
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
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative" id='testimonilas'>
      {/* Eliminados los elementos de fondo para usar el Background global */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mx-auto max-w-7xl min-h-[70vh]"
      >
        <motion.div 
          variants={slideIn} 
          className="flex flex-wrap items-center justify-between gap-8 mb-16"
        >
          <div className="max-w-xl">
            <Badge variant="success" className="mb-4 px-4 py-1.5 text-sm border border-[#2B6CB0]/30 bg-[#2B6CB0]/5">
              {t.home.testimonials.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t.home.testimonials.title}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.home.testimonials.subtitle}
            </p>
          </div>

          <div className="relative ml-auto">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#63B3ED] via-[#2B6CB0] to-[#63B3ED] opacity-30 blur"></div>
            <Link href="#testimonials" className="relative">
              <Button variant="secondary" size="lg" className="group shadow-md hover:shadow-xl transition-all duration-300">
                {t.home.testimonials.viewAll}
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </motion.svg>
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card 
                variant="gradient" 
                className="relative p-8 h-full transition-all duration-300 overflow-hidden group will-change-transform"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="mb-6"
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33333 21.3333H13.3333V17.3333H9.33333C7.86667 17.3333 6.66667 16.1333 6.66667 14.6667C6.66667 13.2 7.86667 12 9.33333 12H10.6667V8H9.33333C5.65333 8 2.66667 10.9867 2.66667 14.6667C2.66667 18.3467 5.65333 21.3333 9.33333 21.3333ZM18.6667 8H22.6667V12H18.6667V8ZM22.6667 21.3333H18.6667V17.3333H22.6667C24.1333 17.3333 25.3333 16.1333 25.3333 14.6667C25.3333 13.2 24.1333 12 22.6667 12H21.3333V8H22.6667C26.3467 8 29.3333 10.9867 29.3333 14.6667C29.3333 18.3467 26.3467 21.3333 22.6667 21.3333Z" fill="url(#paint0_linear_1_2)"/>
                        <defs>
                          <linearGradient id="paint0_linear_1_2" x1="2.66667" y1="8" x2="29.3333" y2="21.3333" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#5a1ce9" />
                            <stop offset="0.33" stopColor="#2B6CB0" />
                            <stop offset="0.66" stopColor="#2B6CB0" />
                            <stop offset="1" stopColor="#63B3ED" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                    
                    <p className="text-lg mb-8 leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>
                  
                  <motion.div 
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  >
                    <Avatar className="border-2 border-background shadow-md">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback variant="gradient">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

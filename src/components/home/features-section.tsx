'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { features } from '@/lib/constants/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function FeaturesSection() {
  // Definiendo animaciones
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 0.3 
      } 
    },
    hover: { 
      scale: 1.1, 
      rotate: 5, 
      transition: { 
        yoyo: Infinity, 
        duration: 0.8 
      } 
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 relative" id='features'>
      {/* Eliminados los elementos de fondo para usar el Background global */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mx-auto max-w-7xl z-10 relative min-h-[60vh]"
      >
        <motion.div variants={slideUp} className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
          <div className="lg:w-1/3">
            <Badge variant="success" className="mb-4 px-4 py-1.5 text-sm border border-[#2B6CB0]/30 bg-[#2B6CB0]/5">
              Key Capabilities
            </Badge>
            <h2 className="text-3xl md:text-3xl font-bold mb-4 leading-tight">
              <span className="gradient-text">AI-Powered Automation</span><br />for Smart Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              Automate your business operations through WhatsApp and AI. Our platform uses intelligent agents to handle marketing, organization, and strategic planning — all powered by ChatGPT and DALL·E, tailored to your specific goals.
            </p>
          </div>
          
          <div className="lg:w-2/3">
            <Tabs defaultValue="ai-agent" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                {features.map((feature, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={feature.title.toLowerCase().replace(/\s+/g, '-')}
                    className="data-[state=active]:bg-muted/80 data-[state=active]:text-foreground relative overflow-hidden group"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#63B3ED] via-[#628beb] to-[#5a1ce9] transform scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300"></span>
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        variants={iconVariants}
                        whileHover="hover"
                        className="relative"
                      >
                        {feature.icon}
                      </motion.div>
                      <span>{feature.title.split(' ')[0]}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {features.map((feature, index) => (
                <TabsContent 
                  key={index} 
                  value={feature.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mt-0"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-[#63B3ED]/5 via-[#628beb]/5 to-[#5a1ce9]/5 p-6 rounded-lg border border-[#5a1ce9]/10"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/4">
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                      </div>
                      
                      <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {feature.items.map((item, itemIndex) => (
                          <Card key={itemIndex} className="p-4 bg-background/80 border-muted/50 hover:border-[#5a1ce9]/30 transition-all duration-300">
                            <div className="flex flex-col h-full">
                              <div className="mb-2 flex items-center gap-2">
                                <h3 className="font-medium">{item.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </motion.div>
        
        {/* Call to action banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            delay: 0.2
          }}
          className="mt-16 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#63B3ED]/20 via-[#628beb]/20 to-[#5a1ce9]/20 animate-gradient-x"></div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-background/80 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden border border-[#5a1ce9]/20 rounded-2xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your business with AI?</h3>
                <p className="text-muted-foreground max-w-xl">
                  Discover how our platform automates marketing, planning, and customer engagement — all powered by AI and integrated with WhatsApp.
                </p>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/features">
                  <Button size="lg" className="group rounded-full px-8 py-6 text-lg shadow-lg bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0]">
                    Explore all features
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        duration: 1.5,
                        repeatDelay: 0.5
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

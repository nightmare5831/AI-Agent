'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProgressOverview() {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const stats = [
    {
      icon: Trophy,
      label: 'Current Level',
      value: 'B1',
      subtext: 'Intermediate',
    },
    {
      icon: Flame,
      label: 'Assessment Score',
      value: '15/100',
      subtext: 'Score',
    },
    {
      icon: Clock,
      label: 'Assignment Score',
      value: '45.5/20',
      subtext: 'Score',
    },
    {
      icon: CheckCircle,
      label: 'Average Score',
      value: '50',
      subtext: 'Score',
    },
  ];

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {stats.map((stat, index) => {
        // Determinar colores para cada tarjeta
        const bgColors = {
          [Trophy.name]: 'bg-[#63B3ED]/10',
          [Flame.name]: 'bg-[#d32f2f]/10',
          [Clock.name]: 'bg-[#8b5cf6]/10',
          [CheckCircle.name]: 'bg-[#ec4899]/10',
        };
        
        const iconColors = {
          [Trophy.name]: 'text-[#63B3ED]',
          [Flame.name]: 'text-[#d32f2f]',
          [Clock.name]: 'text-[#8b5cf6]',
          [CheckCircle.name]: 'text-[#ec4899]',
        };
        
        const bgColor = bgColors[stat.icon.name] || 'bg-primary/10';
        const iconColor = iconColors[stat.icon.name] || 'text-primary';
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={index}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Card className="p-6 border border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <motion.div 
                  className={`rounded-full ${bgColor} p-3`}
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className={`h-6 w-6 ${iconColor}`} />
                </motion.div>
                
                <div>
                  <motion.p 
                    className="text-sm font-medium text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    {stat.label}
                  </motion.p>
                  
                  <div className="flex items-baseline gap-1">
                    <motion.h3 
                      className="text-2xl font-bold gradient-text"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.4 }}
                    >
                      {stat.value}
                    </motion.h3>
                    
                    <motion.span 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 * index, duration: 0.3 }}
                    >
                      {stat.subtext}
                    </motion.span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

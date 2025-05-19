'use client';

import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Award, Target } from 'lucide-react';

export function ProgressHeader() {
  return (
    <div className="mb-10">
      {/* Banner con gradiente y efecto de cristal */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] p-1">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        
        <div className="relative bg-black/20 backdrop-blur-sm rounded-lg p-6 overflow-hidden">
          {/* Círculos decorativos */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#63B3ED]/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#d32f2f]/20 blur-2xl" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Título y descripción */}
            <div className="z-10">
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-md p-1.5">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <p className="text-white/80 text-sm font-medium">Student Analytics</p>
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Learning <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Progress</span>
              </motion.h1>
              
              <motion.p
                className="text-white/70 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Track your language learning journey with detailed analytics and insights
              </motion.p>
            </div>
            
            {/* Tarjetas de estadísticas */}
            <div className="flex flex-wrap gap-3 z-10">
              <StatsCard 
                icon={LineChart} 
                label="Current Level" 
                value="B1" 
                delay={0.3} 
              />
              <StatsCard 
                icon={TrendingUp} 
                label="Progress" 
                value="75%" 
                delay={0.4} 
              />
              <StatsCard 
                icon={Target} 
                label="Target" 
                value="B2" 
                delay={0.5} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
}

function StatsCard({ icon: Icon, label, value, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/10 backdrop-blur-md rounded-lg p-3 w-[100px] flex flex-col items-center justify-center"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Icon className="h-5 w-5 text-white mb-1" />
      <p className="text-xs text-white/70">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </motion.div>
  );
}

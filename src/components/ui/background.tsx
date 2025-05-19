'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface BackgroundProps {
  className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div 
      className={`fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Theme-aware base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle gradient overlays with very low opacity - theme aware */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-muted to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-muted to-transparent opacity-60" />
      
      {/* Very subtle color accents */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[40%] bg-[#63B3ED]/[0.03] rounded-full filter blur-[150px] animate-[pulse_30s_ease-in-out_infinite]" />
      <div className="absolute top-[60%] -right-[5%] w-[40%] h-[40%] bg-[#8b5cf6]/[0.02] rounded-full filter blur-[130px] animate-[pulse_35s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-[#ec4899]/[0.02] rounded-full filter blur-[120px] animate-[pulse_40s_ease-in-out_infinite_4s]" />
      
      {/* Puntos de colores decorativos con animación */}
      <div className="absolute inset-0">
        {mounted && (
          <div className="relative w-full h-full">
            {/* Fondo de gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#63B3ED]/[0.01] via-[#8b5cf6]/[0.005] to-[#d32f2f]/[0.01]"></div>
            
            {/* Puntos animados más grandes pero en menor cantidad */}
            <motion.div 
              className="absolute top-[25%] left-[15%] w-[8px] h-[8px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)'],
                y: [0, -25, 0, 25, 0],
                x: [0, 15, 0, -15, 0],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute top-[12%] left-[78%] w-[7px] h-[7px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)'],
                y: [0, 20, 0, -20, 0],
                x: [0, -18, 0, 18, 0],
                scale: [1, 0.8, 1, 1.2, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div 
              className="absolute top-[88%] left-[35%] w-[10px] h-[10px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)'],
                y: [0, -30, 0, 30, 0],
                x: [0, 25, 0, -25, 0],
                scale: [1, 1.3, 1, 0.7, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div 
              className="absolute top-[65%] left-[90%] w-[6px] h-[6px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)'],
                y: [0, 18, 0, -18, 0],
                x: [0, -22, 0, 22, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
            />
            <motion.div 
              className="absolute top-[45%] left-[22%] w-[9px] h-[9px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)'],
                y: [0, -22, 0, 22, 0],
                x: [0, 20, 0, -20, 0],
                scale: [1, 0.8, 1, 1.2, 1]
              }}
              transition={{ 
                duration: 7.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute top-[72%] left-[45%] w-[8px] h-[8px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)'],
                y: [0, -20, 0, 20, 0],
                x: [0, 28, 0, -28, 0],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{ 
                duration: 6.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.2
              }}
            />
            <motion.div 
              className="absolute top-[18%] left-[52%] w-[7px] h-[7px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)'],
                y: [0, 24, 0, -24, 0],
                x: [0, -24, 0, 24, 0],
                scale: [1, 0.9, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2.5
              }}
            />
            <motion.div 
              className="absolute top-[50%] left-[70%] w-[9px] h-[9px] rounded-full"
              animate={{ 
                backgroundColor: ['rgba(147,51,234,0.3)', 'rgba(139,92,246,0.3)', 'rgba(211,47,47,0.3)', 'rgba(147,51,234,0.3)'],
                y: [0, -26, 0, 26, 0],
                x: [0, 18, 0, -18, 0],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.8
              }}
            />
          </div>
        )}
      </div>
      
      {/* Sutil gradiente superior */}
      <div className="absolute top-0 left-0 w-full h-[10px] bg-gradient-to-b from-[#63B3ED]/5 to-transparent" />
      
      {/* Very subtle corner accents */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.02),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.02),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.02),transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.02),transparent_70%)]" />
    </div>
  );
};

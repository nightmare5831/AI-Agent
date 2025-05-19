'use client';

import React from 'react';
import { useTheme } from 'next-themes';

interface HeroBackgroundProps {
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div 
      className={`absolute inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Degradado principal suave que se fusiona con el resto del fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B6CB0]/15 via-[#63B3ED]/40 to-transparent" />
      
      {/* Efecto de luz radial suave en el centro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[100%] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_80%)]" />
      
      {/* Efectos sutiles en las esquinas superiores */}
      <div className="absolute top-0 left-0 w-[50%] h-[100%] bg-[radial-gradient(circle_at_top_left,rgba(211,47,47,0.1),transparent_80%)]" />
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.1),transparent_80%)]" />
      
      {/* Transición suave al final del hero */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

'use client';

import { StudentProfileHeader } from '@/components/student/profile/profile-header';
import { StudentProfileInfo } from '@/components/student/profile/profile-info';
import { StudentLanguageProgress } from '@/components/student/profile/language-progress';
import { StudentInterests } from '@/components/student/profile/interests';
import { motion } from 'framer-motion';

export default function StudentProfilePage() {
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

  return (
    <div className="p-6">
      {/* Fondo con partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              top: `${10 + (i * 10)}%`,
              left: `${5 + (i * 12)}%`,
              backgroundColor:
                i % 4 === 0 ? 'rgba(211,47,47,0.08)' :
                i % 4 === 1 ? 'rgba(147,51,234,0.08)' :
                i % 4 === 2 ? 'rgba(139,92,246,0.08)' :
                'rgba(236,72,153,0.08)',
              opacity: 0.6,
              transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px)`,
              transition: 'transform 3s ease-in-out',
            }}
          ></div>
        ))}
      </div>
      
      {/* Encabezado con gradiente */}
      <div className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-6 backdrop-blur-sm">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-3xl font-bold">
          Mi Perfil
        </h1>
        <p className="text-[#8b5cf6] mt-2">Gestiona tu información personal y preferencias</p>
      </div>
      
      <motion.div 
        className="mx-auto max-w-7xl space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StudentProfileHeader />
        </motion.div>
        
        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          variants={itemVariants}
        >
          <div className="transform transition-all duration-500 hover:scale-[1.01]">
            <StudentProfileInfo />
          </div>
          <div className="transform transition-all duration-500 hover:scale-[1.01]">
            <StudentLanguageProgress />
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="transform transition-all duration-500 hover:scale-[1.01]">
          <StudentInterests />
        </motion.div>
      </motion.div>
    </div>
  );
}

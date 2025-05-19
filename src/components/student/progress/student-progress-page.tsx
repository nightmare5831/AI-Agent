'use client';

import { ProgressHeader } from "./progress-header";
import { ProgressOverview } from "./progress-overview";
import { SkillsBreakdown } from "./skills-breakdown";
import { LearningGoals } from "./learning-goals";
import { RecentActivities } from "./recent-activities";
import { motion } from "framer-motion";

export function StudentProgressPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Fondo con partículas sutiles, similar a la página home */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${2 + (i % 3)} h-${2 + (i % 3)} rounded-full`}
            style={{
              top: `${10 + (i * 10)}%`,
              left: `${5 + (i * 12)}%`,
              backgroundColor: 
                i % 4 === 0 ? 'rgba(211,47,47,0.08)' : 
                i % 4 === 1 ? 'rgba(147,51,234,0.08)' : 
                i % 4 === 2 ? 'rgba(139,92,246,0.08)' : 
                'rgba(236,72,153,0.08)',
            }}
            animate={{ 
              y: [0, -20, 0, 20, 0],
              x: [0, 15, 0, -15, 0],
              scale: [1, 1.1, 1, 0.9, 1],
              opacity: [0.3, 0.6, 0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 10 + (i * 2), 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        {/* Encabezado de página */}
        <motion.div variants={itemVariants}>
          <ProgressHeader />
        </motion.div>

        {/* Tarjetas de estadísticas */}
        <motion.div variants={itemVariants} className="mb-8">
          <ProgressOverview />
        </motion.div>

        {/* Layout de 2 columnas para pantallas medianas y grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Primera columna - Desglose de habilidades */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <SkillsBreakdown />
          </motion.div>

          {/* Segunda columna - Objetivos de aprendizaje */}
          <motion.div variants={itemVariants}>
            <LearningGoals />
          </motion.div>
        </div>

        {/* Actividades recientes */}
        <motion.div variants={itemVariants}>
          <RecentActivities />
        </motion.div>
      </motion.div>
    </div>
  );
}

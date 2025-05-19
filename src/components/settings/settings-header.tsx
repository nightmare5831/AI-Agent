"use client"

import { Settings } from "lucide-react"
import { motion } from "framer-motion"

export function SettingsHeader() {
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
    <motion.div 
      className="flex items-center gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="rounded-full bg-gradient-to-r from-[#63B3ED]/20 to-[#d32f2f]/20 p-3"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Settings className="h-6 w-6 text-[#63B3ED]" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
          Configuración
        </h1>
        <p className="text-[#8b5cf6]">
          Gestiona tu cuenta y preferencias de la aplicación
        </p>
      </motion.div>
    </motion.div>
  )
}
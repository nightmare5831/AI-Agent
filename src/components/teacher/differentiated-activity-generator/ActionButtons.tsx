'use client';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function ActionButtons() {
  // Animation variants
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
      className="flex flex-col gap-3"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-[#d32f2f] to-[#ec4899] text-white shadow-md transition-all duration-300 hover:from-[#d32f2f]/90 hover:to-[#ec4899]/90 hover:shadow-lg w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generar Actividad Diferenciada
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button 
          variant="outline" 
          className="w-full border-[#63B3ED]/30 text-[#63B3ED] hover:bg-[#63B3ED]/10 hover:text-[#63B3ED] hover:border-[#63B3ED]/50"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reiniciar Formulario
        </Button>
      </motion.div>
    </motion.div>
  );
}

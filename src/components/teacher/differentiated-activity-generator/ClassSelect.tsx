'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function ClassSelect() {
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
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <Card className="p-6 border-[#d32f2f]/10 bg-background/80 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-[#63B3ED]"
          >
            <BookOpen className="h-5 w-5" />
          </motion.div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[#d32f2f] to-[#ec4899] text-transparent bg-clip-text">
            Clase
          </h2>
        </div>
        
        <div className="space-y-2">
          <Label className="text-[#8b5cf6] font-medium">Selecciona una clase</Label>
          <Select>
            <SelectTrigger className="w-full border-[#63B3ED]/30 focus-visible:ring-[#63B3ED]/50">
              <SelectValue placeholder="Selecciona una clase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class-1">Matemáticas 101</SelectItem>
              <SelectItem value="class-2">Ciencias Naturales</SelectItem>
              <SelectItem value="class-3">Historia Universal</SelectItem>
              <SelectItem value="class-4">Lengua y Literatura</SelectItem>
              <SelectItem value="class-5">Inglés Básico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </motion.div>
  );
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/core/auth/AuthProvider';
import { capitalizeFirst, getInitials } from '@/lib/utils';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export function StudentProfileHeader() {
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
  const [{ profile }] = useAuth();
  return (
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <motion.div className="relative" variants={itemVariants}>
        <Avatar className="h-24 w-24 border-2 border-[#63B3ED]/30">
          <AvatarImage src="/assets/images/avatars/sarah.png" alt="Student" />
          <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
        </Avatar>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            size="icon"
            variant="outline"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#d32f2f]/10 border-[#d32f2f]/30 text-[#d32f2f]"
          >
          <Camera className="h-4 w-4" />
        </Button>
        </motion.div>
      </motion.div>
      <motion.div className="text-center" variants={itemVariants}>
        <h1 className="text-2xl font-bold gradient-text">
          {capitalizeFirst(profile?.full_name)}
        </h1>
        <motion.p 
          className="text-[#8b5cf6]" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.5 }}>
          {capitalizeFirst(profile?.role)}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

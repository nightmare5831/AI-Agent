'use client';

import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export function ActivityResult() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div 
      className="form-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="mb-4 flex items-center justify-between"
        variants={itemVariants}
      >
        <h2 className="section-title mb-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">Generated Activity Preview</h2>
        <div className="flex space-x-2">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-1 text-xs border-pink-200 hover:border-pink-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:via-pink-500/10 hover:to-purple-600/10 transition-all duration-300"
            >
              <Copy className="h-3.5 w-3.5 text-pink-500" />
              Copy
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-1 text-xs border-purple-200 hover:border-purple-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:via-pink-500/10 hover:to-purple-600/10 transition-all duration-300"
            >
              <Download className="h-3.5 w-3.5 text-purple-500" />
              Download
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="flex min-h-[500px] items-center justify-center rounded-md border border-gray-200 p-4 text-sm bg-white shadow-sm hover:shadow-md transition-all duration-300"
        variants={itemVariants}
      >
        Your differentiated activity will appear here after generation
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function Personalization() {
  const [adaptToInterests, setAdaptToInterests] = useState(false);
  const [aiCorrection, setAiCorrection] = useState(false);

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

  const checkboxVariants = {
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

  const handleAdaptToInterestsChange = (checked: boolean) => {
    setAdaptToInterests(checked);

    // Check if both options are now enabled
    if (checked && aiCorrection) {
      toast.success(
        "Teacher Validation Required.\nBoth personalization features are enabled. This will trigger teacher validation before sending to student's space."
      );
    }
  };

  const handleAiCorrectionChange = (checked: boolean) => {
    setAiCorrection(checked);

    // Check if both options are now enabled
    if (checked && adaptToInterests) {
      toast.success(
        "Teacher Validation Required.\nBoth personalization features are enabled. This will trigger teacher validation before sending to student's space."
      );
    }
  };

  return (
    <motion.div 
      className="form-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="section-title bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Personalization for Students
      </motion.h2>

      <motion.div className="space-y-4" variants={containerVariants}>
        <motion.div 
          className="flex items-center space-x-2" 
          variants={itemVariants}
          whileHover={checkboxVariants.hover}
          whileTap={checkboxVariants.tap}
        >
          <Checkbox
            id="interests"
            checked={adaptToInterests}
            onCheckedChange={handleAdaptToInterestsChange}
            className="border-pink-300 text-pink-500 focus:ring-pink-500"
          />
          <Label htmlFor="interests" className="text-gray-700 hover:text-pink-700 transition-colors duration-200">
            Adapt to students' interests (extracted from their profile)
          </Label>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-2" 
          variants={itemVariants}
          whileHover={checkboxVariants.hover}
          whileTap={checkboxVariants.tap}
        >
          <Checkbox
            id="ai-correction"
            checked={aiCorrection}
            onCheckedChange={handleAiCorrectionChange}
            className="border-purple-300 text-purple-500 focus:ring-purple-500"
          />
          <Label htmlFor="ai-correction" className="text-gray-700 hover:text-purple-700 transition-colors duration-200">
            AI Automated Correction
          </Label>
        </motion.div>

        {adaptToInterests && aiCorrection && (
          <motion.div 
            className="mt-2 rounded-md border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-3 shadow-sm"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-pink-700">
              When both options are enabled, the activity will require teacher
              validation before being sent to the student's space.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

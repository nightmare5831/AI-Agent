'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

export function QuestionTypes() {
  const [modify, setModify] = useState(false);
  
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

  const radioVariants = {
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
      <motion.h2 
        className="section-title bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Question Types
      </motion.h2>

      <RadioGroup defaultValue="keep" className="space-y-3">
        <motion.div 
          className="mb-4 flex items-center space-x-2"
          variants={itemVariants}
          whileHover={radioVariants.hover}
          whileTap={radioVariants.tap}
        >
          <RadioGroupItem
            value="keep"
            id="keep-questions"
            onClick={() => {
              setModify(false);
            }}
            className="border-pink-300 text-pink-500 focus:ring-pink-500"
          />
          <Label 
            htmlFor="keep-questions"
            className="text-gray-700 hover:text-pink-700 transition-colors duration-200"
          >
            Do not modify question typology
          </Label>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          variants={itemVariants}
          whileHover={radioVariants.hover}
          whileTap={radioVariants.tap}
        >
          <RadioGroupItem
            value="modify"
            id="modify-questions"
            onClick={() => {
              setModify(true);
            }}
            className="border-purple-300 text-purple-500 focus:ring-purple-500"
          />
          <Label 
            htmlFor="modify-questions"
            className="text-gray-700 hover:text-purple-700 transition-colors duration-200"
          >
            Modify question typology
          </Label>
        </motion.div>
      </RadioGroup>

      <motion.div 
        className="ml-6 mt-4 space-y-3"
        variants={containerVariants}
        animate={modify ? "visible" : { opacity: 0.7 }}
      >
        <motion.div variants={itemVariants}>
          <Label className="mb-2 block bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-medium">
            Question types (select multiple):
          </Label>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
            whileHover={radioVariants.hover}
            whileTap={radioVariants.tap}
          >
            {modify ? (
              <Checkbox id="mcq" className="border-pink-300 text-pink-500 focus:ring-pink-500" />
            ) : (
              <Checkbox id="mcq" disabled className="opacity-50" />
            )}

            <label
              htmlFor="mcq"
              className={`text-sm leading-none ${modify ? 'text-gray-700 hover:text-pink-700 transition-colors duration-200' : 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}`}
            >
              Multiple Choice Questions (MCQ)
            </label>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
            whileHover={radioVariants.hover}
            whileTap={radioVariants.tap}
          >
            {modify ? (
              <Checkbox id="true-false" className="border-purple-300 text-purple-500 focus:ring-purple-500" />
            ) : (
              <Checkbox id="true-false" disabled className="opacity-50" />
            )}
            <label
              htmlFor="true-false"
              className={`text-sm leading-none ${modify ? 'text-gray-700 hover:text-purple-700 transition-colors duration-200' : 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}`}
            >
              True/False
            </label>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
            whileHover={radioVariants.hover}
            whileTap={radioVariants.tap}
          >
            {modify ? (
              <Checkbox id="open-ended" className="border-pink-300 text-pink-500 focus:ring-pink-500" />
            ) : (
              <Checkbox id="open-ended" disabled className="opacity-50" />
            )}
            <label
              htmlFor="open-ended"
              className={`text-sm leading-none ${modify ? 'text-gray-700 hover:text-pink-700 transition-colors duration-200' : 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}`}
            >
              Open-ended Question
            </label>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
            whileHover={radioVariants.hover}
            whileTap={radioVariants.tap}
          >
            {modify ? (
              <Checkbox id="matching" className="border-purple-300 text-purple-500 focus:ring-purple-500" />
            ) : (
              <Checkbox id="matching" disabled className="opacity-50" />
            )}
            <label
              htmlFor="matching"
              className={`text-sm leading-none ${modify ? 'text-gray-700 hover:text-purple-700 transition-colors duration-200' : 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}`}
            >
              Matching Question
            </label>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

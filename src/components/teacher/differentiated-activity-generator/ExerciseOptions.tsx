'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

export function ExerciseOptions() {
  const [exerciseType, setExerciseType] = useState<string>('');
  const [isLanguageLevel, setIsLanguageLevel] = useState(false);
  const [isSkill, setIsSkill] = useState(false);
  const [isTheme, setIsTheme] = useState(false);

  // Determine which specific modification sections to show based on exercise type
  const isReadingOrListening =
    exerciseType === 'reading' || exerciseType === 'listening';
  const isLanguageExercise = exerciseType === 'language';
  const isWritingOrSpeaking =
    exerciseType === 'writing' || exerciseType === 'speaking';
    
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
  
  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Exercise Type Section */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Exercise Type
        </Label>
        <Select onValueChange={(value) => setExerciseType(value)}>
          <SelectTrigger className="w-full md:w-[300px] border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300">
            <SelectValue placeholder="Choose exercise type" />
          </SelectTrigger>
          <SelectContent className="border-pink-200 shadow-md">
            <SelectItem value="reading" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Reading Comprehension</SelectItem>
            <SelectItem value="listening" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Listening Comprehension</SelectItem>
            <SelectItem value="writing" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Writing Production</SelectItem>
            <SelectItem value="speaking" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Speaking Production</SelectItem>
            <SelectItem value="language" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Language Exercise</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Types of Modifications Section */}
      <motion.div variants={itemVariants}>
        <Label className="mb-3 block text-base font-medium text-pink-500">
          Types of Modifications to Apply
        </Label>
        <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2" variants={containerVariants}>
          <div className="space-y-4">
            <motion.div className="flex items-center space-x-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Checkbox id="simplify" />
              <label
                htmlFor="simplify"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Simplify
              </label>
            </motion.div>

            <motion.div className="flex items-center space-x-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Checkbox id="complexify" />
              <label
                htmlFor="complexify"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Complexify
              </label>
            </motion.div>

            <motion.div className="flex items-center space-x-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Checkbox
                id="adapt-language"
                onClick={() => setIsLanguageLevel(!isLanguageLevel)}
              />
              <label
                htmlFor="adapt-language"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Adapt to a language level
              </label>
            </motion.div>
            <Select disabled={!isLanguageLevel}>
              <SelectTrigger className="ml-6 w-full md:w-[200px] border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="border-pink-200 shadow-md">
                <SelectItem value="a1" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">A1 (Beginner)</SelectItem>
                <SelectItem value="a2" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">A2 (Elementary)</SelectItem>
                <SelectItem value="b1" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">B1 (Intermediate)</SelectItem>
                <SelectItem value="b2" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">B2 (Upper Intermediate)</SelectItem>
                <SelectItem value="c1" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">C1 (Advanced)</SelectItem>
                <SelectItem value="c2" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">C2 (Proficiency)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </motion.div>

      {/* Specific Modifications Section */}
      <motion.div variants={itemVariants}>
        <div className="border-t pt-4">
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3 
              className="text-base font-medium text-pink-500"
              variants={itemVariants}
            >
              Specific Modifications
            </motion.h3>
            
            {/* Reading/Listening Specific Options */}
            <motion.div
              className={isWritingOrSpeaking ? 'pointer-events-none opacity-50' : ''}
              variants={itemVariants}
            >
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  For reading and listening comprehension exercises:
                </p>
                {isReadingOrListening && (
                  <span className="text-xs text-pink-500 font-medium">*Required</span>
                )}
              </motion.div>
              <RadioGroup
                defaultValue="modify"
                disabled={isWritingOrSpeaking}
                aria-required={isReadingOrListening}
                className="space-y-2"
              >
                <motion.div 
                  className="flex items-center space-x-2" 
                  variants={itemVariants} 
                  whileHover={{ scale: 1.02 }}
                >
                  <RadioGroupItem value="modify" id="modify" className="text-pink-500 border-pink-300 focus:ring-pink-500" />
                  <Label htmlFor="modify" className="text-sm">
                    Also modify the text or transcript
                  </Label>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2" 
                  variants={itemVariants} 
                  whileHover={{ scale: 1.02 }}
                >
                  <RadioGroupItem value="keep" id="keep" className="text-pink-500 border-pink-300 focus:ring-pink-500" />
                  <Label htmlFor="keep" className="text-sm">
                    Keep the text or transcript identical
                  </Label>
                </motion.div>
              </RadioGroup>
            </motion.div>

            {/* Language Exercise Specific Options */}
            <motion.div
              className={isWritingOrSpeaking ? 'pointer-events-none opacity-50' : ''}
              variants={itemVariants}
            >
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  For language exercises (grammar, vocabulary, etc.):
                </p>
                {isLanguageExercise && (
                  <span className="text-xs text-pink-500 font-medium">*Required</span>
                )}
              </motion.div>
              <motion.div 
                className="ml-4 flex items-center space-x-2" 
                variants={itemVariants} 
                whileHover={{ scale: 1.02 }}
              >
                <Checkbox
                  id="contrastive"
                  disabled={isWritingOrSpeaking}
                  aria-required={isLanguageExercise}
                  className="text-pink-500 border-pink-300 focus:ring-pink-500"
                />
                <label
                  htmlFor="contrastive"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add a contrastive approach
                </label>
              </motion.div>
              <Select disabled={isWritingOrSpeaking || !isLanguageExercise}>
                <SelectTrigger className="ml-8 mt-2 w-full md:w-[200px] border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300">
                  <SelectValue placeholder="First language" />
                </SelectTrigger>
                <SelectContent className="border-pink-200 shadow-md">
                  <SelectItem value="en" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">English</SelectItem>
                  <SelectItem value="fr" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">French</SelectItem>
                  <SelectItem value="es" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Spanish</SelectItem>
                  <SelectItem value="de" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">German</SelectItem>
                  <SelectItem value="it" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Italian</SelectItem>
                  <SelectItem value="pt" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Portuguese</SelectItem>
                  <SelectItem value="ru" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Russian</SelectItem>
                  <SelectItem value="zh" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Chinese</SelectItem>
                  <SelectItem value="ja" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Japanese</SelectItem>
                  <SelectItem value="ar" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            {/* Info text for writing/speaking exercises */}
            {isWritingOrSpeaking && (
              <motion.div 
                className="mt-2 rounded-md border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-3 text-sm text-purple-700 shadow-sm"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <p>
                  For writing and speaking production exercises, the text or
                  transcript will be automatically modified to match your
                  selected adaptations.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

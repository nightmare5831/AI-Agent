'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/teacher/language-selector';
import { useClasses } from '@/components/providers/classes-context';
import { motion } from 'framer-motion';

interface LessonPlannerFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function LessonPlannerForm({
  onSubmit,
  isLoading,
}: LessonPlannerFormProps) {
  const { selectedLanguage } = useLanguage();
  const { classes, fetchClasses } = useClasses();
  const [selectedClassroom, setSelectedClassroom] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    duration: '',
    objectives: '',
    prerequisites: '',
    studentInfo: '',
    preferences: '',
    language: selectedLanguage,
  });
  
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

  useEffect(() => {
    fetchClasses();
  }, []); //eslint-disable-line

  const handleClassroomChange = (value: string) => {
    const classData = classes.find((s: any) => s.id === value);
    if (classData) {
      setSelectedClassroom(classData);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      language: selectedLanguage,
      classroom: selectedClassroom,
    };
    onSubmit(updatedFormData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Subject
        </Label>
        <Input
          id="subject"
          placeholder="e.g., Conversational English, Business English"
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          className="border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:focus:border-pink-500"
          required
        />
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Level
        </Label>
        <Select
          value={formData.level}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, level: value }))
          }
        >
          <SelectTrigger className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:focus:border-pink-500">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent className="border-pink-200 shadow-md dark:border-pink-800/40">
            <SelectItem value="beginner" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">Beginner (A1)</SelectItem>
            <SelectItem value="elementary" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">Elementary (A2)</SelectItem>
            <SelectItem value="intermediate" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">Intermediate (B1)</SelectItem>
            <SelectItem value="upperIntermediate" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">
              Upper Intermediate (B2)
            </SelectItem>
            <SelectItem value="advanced" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">Advanced (C1)</SelectItem>
            <SelectItem value="proficient" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">Proficient (C2)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Duration (minutes)
        </Label>
        <Select
          value={formData.duration}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, duration: value }))
          }
        >
          <SelectTrigger className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:focus:border-pink-500">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="border-pink-200 shadow-md dark:border-pink-800/40">
            <SelectItem value="30" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">30 minutes</SelectItem>
            <SelectItem value="45" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">45 minutes</SelectItem>
            <SelectItem value="60" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">60 minutes</SelectItem>
            <SelectItem value="90" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">90 minutes</SelectItem>
            <SelectItem value="120" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">120 minutes</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Learning Objectives
        </Label>
        <Textarea
          id="objectives"
          placeholder="What should students learn from this lesson?"
          value={formData.objectives}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, objectives: e.target.value }))
          }
          className="h-24 border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:bg-gray-950 dark:text-gray-300 dark:focus:border-pink-500"
          required
        />
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Classroom
        </Label>
        <Select
          value={selectedClassroom?.id}
          onValueChange={(value) => handleClassroomChange(value)}
        >
          <SelectTrigger className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:focus:border-pink-500">
            <SelectValue placeholder="Select classroom" />
          </SelectTrigger>
          <SelectContent className="border-pink-200 shadow-md dark:border-pink-800/40">
            {isLoading ? (
              <SelectItem value="loading" disabled className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">
                Loading classrooms...
              </SelectItem>
            ) : classes.length === 0 ? (
              <SelectItem value="no-classes" disabled className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">
                No classrooms available
              </SelectItem>
            ) : (
              classes.map((classroom) => (
                <SelectItem key={classroom.id} value={classroom.id} className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-950/30 dark:hover:to-pink-950/30">
                  {classroom.class_name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Prerequisites
        </Label>
        <Textarea
          id="prerequisites"
          placeholder="Indicate here what the students already know, which will be useful for the lesson."
          value={formData.prerequisites}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, prerequisites: e.target.value }))
          }
          className="h-24 border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:bg-gray-950 dark:text-gray-300 dark:focus:border-pink-500"
          required
        />
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Student Information
        </Label>
        <Textarea
          id="studentInfo"
          placeholder="Describe your students (age, level, interests, challenges)"
          value={formData.studentInfo}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, studentInfo: e.target.value }))
          }
          className="h-24 border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:bg-gray-950 dark:text-gray-300 dark:focus:border-pink-500"
          required
        />
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Label className="mb-2 block text-base font-medium text-pink-500">
          Teaching Preferences
        </Label>
        <Textarea
          id="preferences"
          placeholder="Any specific teaching methods or activities you prefer?"
          value={formData.preferences}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, preferences: e.target.value }))
          }
          className="h-24 border-pink-200 hover:border-pink-400 focus:border-pink-500 focus:ring-pink-500 transition-all duration-300 dark:border-pink-800/40 dark:bg-gray-950 dark:text-gray-300 dark:focus:border-pink-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white transition-all duration-300" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Plan...
            </>
          ) : (
            'Generate Lesson Plan'
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}

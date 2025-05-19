'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
// Definición de la interfaz Lesson si no existe en @/types/lesson
interface Lesson {
  id: number;
  className: string;
  title: string;
  // Añade otras propiedades según sea necesario
}
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  ClipboardList,
  Target,
  ScrollText,
  Settings,
  CheckSquare,
  Bot,
} from 'lucide-react';

const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const AGE_GROUPS = ['2-6', '6-9', '9-11', '11-15', '15-18', '18+'] as const;
const ASSESSMENT_TYPES = [
  'diagnostic assessment',
  'formal assessment',
  'summative assessment',
] as const;
const EVALUATION_TYPES = ['linguistic', 'skills-based', 'mixed'] as const;
const QUESTION_COUNTS = [5, 10, 15, 20] as const;
const TOTAL_POINTS = [10, 20, 25, 50, 100] as const;
const CLASSES = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Engineering',
] as const;

interface ExamFormProps {
  selectedClass: string | null;
  onClassChange: (value: string | null) => void;
  selectedLesson: number | null;
  onLessonChange: (value: number | null) => void;
  lessons: readonly Lesson[];
}

export function ExamForm({
  selectedClass,
  onClassChange,
  selectedLesson,
  onLessonChange,
  lessons,
}: ExamFormProps) {
  const [assessmentType, setAssessmentType] = useState<string | null>(null);
  const [evaluationType, setEvaluationType] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [useAICorrection, setUseAICorrection] = useState(false);
  const [importantInfo, setImportantInfo] = useState('');
  const [assessmentContent, setAssessmentContent] = useState('');

  const filteredLessons = selectedClass
    ? lessons.filter((lesson) => lesson.className === selectedClass)
    : lessons;
    
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const IconWrapper = ({
    icon: Icon,
    children,
  }: {
    icon: any;
    children: React.ReactNode;
  }) => (
    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#8b5cf6]">
      <motion.div 
        className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon className="h-4 w-4 text-[#63B3ED]" />
      </motion.div>
      {children}
    </div>
  );

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Target Audience Section */}
      <motion.div 
        variants={itemVariants} 
        className="border border-[#63B3ED]/10 p-6 rounded-lg shadow-md bg-background/80 backdrop-blur-sm"
      >
        <IconWrapper icon={Users}>Target Audience</IconWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="classroom" className="text-[#8b5cf6] font-medium">Classroom</Label>
            <Select
              value={selectedClass || undefined}
              onValueChange={(value) => onClassChange(value)}
            >
              <SelectTrigger id="classroom" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language-level" className="text-[#8b5cf6] font-medium">Language Level</Label>
            <Select disabled={!!selectedClass}>
              <SelectTrigger id="language-level" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age-group" className="text-[#8b5cf6] font-medium">Age Group</Label>
            <Select disabled={!!selectedClass}>
              <SelectTrigger id="age-group" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Assessment Details Section */}
      <motion.div 
        variants={itemVariants} 
        className="border border-[#63B3ED]/10 p-6 rounded-lg shadow-md bg-background/80 backdrop-blur-sm"
      >
        <IconWrapper icon={ClipboardList}>Types of Assessment</IconWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="assessment-type" className="text-[#8b5cf6] font-medium">Assessment Type</Label>
            <Select
              value={assessmentType || undefined}
              onValueChange={setAssessmentType}
            >
              <SelectTrigger id="assessment-type" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                {ASSESSMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evaluation-type" className="text-[#8b5cf6] font-medium">Evaluation Type</Label>
            <Select
              value={evaluationType || undefined}
              onValueChange={setEvaluationType}
            >
              <SelectTrigger id="evaluation-type" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select evaluation type" />
              </SelectTrigger>
              <SelectContent>
                {EVALUATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        variants={itemVariants} 
        className="border border-[#63B3ED]/10 p-6 rounded-lg shadow-md bg-background/80 backdrop-blur-sm"
      >
        <IconWrapper icon={ScrollText}>Content</IconWrapper>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lesson" className="text-[#8b5cf6] font-medium">Lesson</Label>
            <Select
              value={selectedLesson?.toString() || undefined}
              onValueChange={(value) => onLessonChange(Number(value))}
              disabled={!selectedClass || filteredLessons.length === 0}
            >
              <SelectTrigger id="lesson" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select lesson" />
              </SelectTrigger>
              <SelectContent>
                {filteredLessons.map((lesson) => (
                  <SelectItem key={lesson.id} value={lesson.id.toString()}>
                    {lesson.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="important-info" className="text-[#8b5cf6] font-medium">Important Information</Label>
            <Textarea
              id="important-info"
              placeholder="Add any important information about the exam..."
              className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30"
              value={importantInfo}
              onChange={(e) => setImportantInfo(e.target.value)}
              disabled={!selectedLesson}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment-content" className="text-[#8b5cf6] font-medium">Assessment Content</Label>
            <Textarea
              id="assessment-content"
              placeholder="Indicate here what you want to assess, objectives, linguistic specifics, etc."
              className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30"
              value={assessmentContent}
              onChange={(e) => setAssessmentContent(e.target.value)}
              disabled={!!selectedLesson}
            />
          </div>
        </div>
      </motion.div>

      {/* Grading System Section */}
      <motion.div 
        variants={itemVariants} 
        className="border border-[#63B3ED]/10 p-6 rounded-lg shadow-md bg-background/80 backdrop-blur-sm"
      >
        <IconWrapper icon={CheckSquare}>Grading System</IconWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="question-count" className="text-[#8b5cf6] font-medium">Number of Questions</Label>
            <Select
              value={questionCount?.toString() || undefined}
              onValueChange={(value) => setQuestionCount(Number(value))}
            >
              <SelectTrigger id="question-count" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_COUNTS.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total-points" className="text-[#8b5cf6] font-medium">Total Points</Label>
            <Select
              value={totalPoints?.toString() || undefined}
              onValueChange={(value) => setTotalPoints(Number(value))}
            >
              <SelectTrigger id="total-points" className="bg-background border-[#63B3ED]/20 focus:ring-[#63B3ED]/30 focus:border-[#63B3ED]/30">
                <SelectValue placeholder="Select total points" />
              </SelectTrigger>
              <SelectContent>
                {TOTAL_POINTS.map((points) => (
                  <SelectItem key={points} value={points.toString()}>
                    {points}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Customization Tools Section */}
      <motion.div 
        variants={itemVariants} 
        className="border border-[#63B3ED]/10 p-6 rounded-lg shadow-md bg-background/80 backdrop-blur-sm"
      >
        <IconWrapper icon={Settings}>Customization Tools</IconWrapper>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="customizable" className="text-[#8b5cf6] font-medium">Customizable per Student</Label>
              <p className="text-sm text-[#63B3ED]/70">
                Enable personalized assessments for each student
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                id="customizable"
                checked={isCustomizable}
                onCheckedChange={setIsCustomizable}
                className="data-[state=checked]:bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]"
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-correction" className="text-[#8b5cf6] font-medium">AI Automated Correction</Label>
              <p className="text-sm text-[#63B3ED]/70">
                Use AI to automatically grade assessments
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                id="ai-correction"
                checked={useAICorrection}
                onCheckedChange={setUseAICorrection}
                className="data-[state=checked]:bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

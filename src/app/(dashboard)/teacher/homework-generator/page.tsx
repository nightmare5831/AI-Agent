'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Users,
  ClipboardList,
  ScrollText,
  Settings,
  CheckSquare,
  Wand2,
  SendIcon,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useClasses } from '@/components/providers/classes-context';
import { useLessons } from '@/components/providers/lessons-provider';
import { useLanguage } from '@/components/teacher/language-selector';
import { LessonPlanDisplay } from '@/components/teacher/tools/lesson-planner/lesson-plan-display';
import { motion, AnimatePresence } from 'framer-motion';

// Interfaz para los datos del formulario
interface FormData {
  classroom: {
    id: string;
    name: string;
  };
  language_level: string;
  age: string;
  assignment_type: {
    type: string;
    assignment: string;
  };
  content: {
    lesson_id: string;
    important_info: string;
    assignment_content: string;
  };
  grading_system: {
    questions_number: number;
  };
  customization_tool: {
    per_student: boolean;
    ai_automated_correction: boolean;
  };
}

// Datos iniciales del formulario
const initialFormData: FormData = {
  classroom: {
    id: '',
    name: '',
  },
  language_level: '',
  age: '',
  assignment_type: {
    type: '',
    assignment: '',
  },
  content: {
    lesson_id: '',
    important_info: '',
    assignment_content: '',
  },
  grading_system: {
    questions_number: 5,
  },
  customization_tool: {
    per_student: false,
    ai_automated_correction: false,
  },
};

// Constantes
const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const AGE_GROUPS = ['2-6', '6-9', '9-11', '11-15', '15-18', '18+'] as const;
const ASSIGNMENT_TYPES = [
  'Summary',
  'Introduction (flipped classroom)',
  'Practice Exercise',
  'Research Project',
  'Creative Writing',
] as const;
const EVALUATION_TYPES = ['Linguistic', 'Skills Based', 'Mixed'] as const;
const QUESTION_COUNTS = [5, 10, 15, 20] as const;

export default function HomeworkGenerator() {
  const { classes } = useClasses();
  const { lessons } = useLessons();
  const { t, selectedLanguage } = useLanguage();
  
  // Estados para el generador de tareas
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Referencia para cancelar peticiones
  const abortControllerRef = useRef<AbortController | null>(null);

  // Validación del formulario
  const validateFunc = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.classroom.id.trim()) {
      newErrors.classroom = 'Classroom is required.';
    }
    if (!formData.language_level.trim()) {
      newErrors.language_level = 'Language level is required.';
    }
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required.';
    }
    if (!formData.assignment_type.type.trim()) {
      newErrors.assignment_type = 'Assignment type is required.';
    }
    if (!formData.assignment_type.assignment.trim()) {
      newErrors.assignment_type1 = 'Assignment is required.';
    }
    if (!formData.content.lesson_id.trim()) {
      newErrors.lesson_id = 'Lesson is required.';
    }
    if (formData.grading_system.questions_number <= 0) {
      newErrors.question_number = 'Number of questions must be greater than 0.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para cancelar la generación
  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
      setIsLoading(false);
      toast.info('Generation cancelled');
    }
  };

  // Función para manejar la generación de tareas
  const senderFunc = async (data: any) => {
    try {
      setIsLoading(true);
      setIsGenerating(true);
      setStreamedText('');

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch('/api/teacher/homework-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to generate homework');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is null');

      let receivedText = '';

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        receivedText += chunk;
        setStreamedText(receivedText);
      }

      setIsLoading(false);
      setIsGenerating(false);
      toast.success('Homework generated successfully!');
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error generating homework:', error);
        toast.error('Error generating homework. Please try again.');
      }
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFunc()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedLesson = lessons.find(
      (lesson) => lesson.id.toString() === formData.content.lesson_id
    );

    const selectedClass = classes.find(
      (classItem) => classItem.id.toString() === formData.classroom.id
    );

    const updatedFormData = {
      ...formData,
      classroom: {
        ...formData.classroom,
        name: selectedClass?.class_name || '',
      },
      lesson_title: selectedLesson?.title || '',
      language: selectedLanguage,
    };

    setIsGenerating(true);
    senderFunc(updatedFormData);
  };

  // Componente para envolver iconos con un estilo consistente
  const IconWrapper = ({
    icon: Icon,
    children,
  }: {
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center gap-2 text-sm font-medium text-[#8b5cf6]">
      <div className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5">
        <Icon className="h-4 w-4 text-[#63B3ED]" />
      </div>
      {children}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="container mx-auto max-w-4xl py-8"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
        className="mb-8 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="mr-2 h-8 w-8 text-[#63B3ED]" />
        </motion.div>
        <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
          {t('homework_generator.title') || 'Homework Generator'}
        </h1>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <form onSubmit={handleSubmit}>
            <Card className="p-6">
              <div className="space-y-8">
                {/* Target Audience Section */}
                <div>
                  <IconWrapper icon={Users}>
                    {t('homework_generator.target_audience.title') || 'Target Audience'}
                  </IconWrapper>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="classroom">
                        {t('homework_generator.target_audience.classroom') || 'Classroom'}
                      </Label>
                      <Select
                        value={formData.classroom.id}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            classroom: { ...prev.classroom, id: value },
                          }));
                          if (errors.classroom) {
                            setErrors((prev) => ({
                              ...prev,
                              classroom: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger id="classroom" className="bg-background">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no_class">No class</SelectItem>
                          {classes.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.classroom && (
                        <p className="text-sm text-red-500">
                          {errors.classroom}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language-level">
                        {t('homework_generator.target_audience.language_level') || 'Language Level'}
                      </Label>
                      <Select
                        disabled={!!formData.classroom.id}
                        value={formData.language_level}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            language_level: value,
                          }))
                        }
                      >
                        <SelectTrigger
                          id="language-level"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.language_level && (
                        <p className="text-sm text-red-500">
                          {errors.language_level}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age-group">
                        {t('homework_generator.target_audience.age') || 'Age Group'}
                      </Label>
                      <Select
                        disabled={!!formData.classroom.id}
                        value={formData.age}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, age: value }))
                        }
                      >
                        <SelectTrigger id="age-group" className="bg-background">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          {AGE_GROUPS.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.age && (
                        <p className="text-sm text-red-500">{errors.age}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assignment Type Section */}
                <div>
                  <IconWrapper icon={ClipboardList}>
                    {t('homework_generator.assignment_type.title') || 'Assignment Type'}
                  </IconWrapper>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="evaluation-type">
                        {t('homework_generator.assignment_type.assignment') || 'Assignment'}
                      </Label>
                      <Select
                        value={formData.assignment_type.assignment}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            assignment_type: {
                              ...prev.assignment_type,
                              assignment: value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="evaluation-type"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select assignment" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVALUATION_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.assignment_type1 && (
                        <p className="text-sm text-red-500">
                          {errors.assignment_type1}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div>
                  <IconWrapper icon={ScrollText}>
                    {t('homework_generator.content.title') || 'Content'}
                  </IconWrapper>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="lesson">
                        {t('homework_generator.content.lesson') || 'Lesson'}
                      </Label>
                      <Select
                        value={formData.content.lesson_id}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: { ...prev.content, lesson_id: value },
                          }))
                        }
                      >
                        <SelectTrigger id="lesson" className="bg-background">
                          <SelectValue placeholder="Select lesson" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no_lesson">No lesson</SelectItem>
                          {lessons.map((lesson) => (
                            <SelectItem key={lesson.id} value={lesson.id.toString()}>
                              {lesson.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.lesson_id && (
                        <p className="text-sm text-red-500">
                          {errors.lesson_id}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="important-info">
                        {t('homework_generator.content.important_info') || 'Important Information'}
                      </Label>
                      <Textarea
                        id="important-info"
                        className="min-h-[100px] bg-background"
                        placeholder="Enter any important information..."
                        value={formData.content.important_info}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: {
                              ...prev.content,
                              important_info: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Grading System Section */}
                <div>
                  <IconWrapper icon={CheckSquare}>
                    {t('homework_generator.grading_system.title') || 'Grading System'}
                  </IconWrapper>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="question-count">
                        {t('homework_generator.grading_system.questions_number') || 'Number of Questions'}
                      </Label>
                      <Select
                        value={formData.grading_system.questions_number.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            grading_system: {
                              ...prev.grading_system,
                              questions_number: parseInt(value),
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="question-count"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUESTION_COUNTS.map((count) => (
                            <SelectItem key={count} value={count.toString()}>
                              {count}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.question_number && (
                        <p className="text-sm text-red-500">
                          {errors.question_number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customization Tools Section */}
                <div>
                  <IconWrapper icon={Settings}>
                    {t('homework_generator.customization_tool.title') || 'Customization Tools'}
                  </IconWrapper>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="customizable">
                          {t('homework_generator.customization_tool.per_student.title') || 'Per Student'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t('homework_generator.customization_tool.per_student.sub_title') || 'Generate unique homework for each student'}
                        </p>
                      </div>
                      <Switch
                        id="customizable"
                        checked={formData.customization_tool.per_student}
                        onCheckedChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization_tool: {
                              ...prev.customization_tool,
                              per_student: value,
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-correction">
                          {t('homework_generator.customization_tool.ai_automation.title') || 'AI Automated Correction'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t('homework_generator.customization_tool.ai_automation.sub_title') || 'Use AI to automatically correct homework'}
                        </p>
                      </div>
                      <Switch
                        id="ai-correction"
                        checked={formData.customization_tool.ai_automated_correction}
                        onCheckedChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization_tool: {
                              ...prev.customization_tool,
                              ai_automated_correction: value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <motion.div 
              className="mt-6 flex justify-end gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelGeneration}
                      className="border-[#d32f2f]/30 hover:bg-[#d32f2f]/10 text-[#d32f2f]"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all hover:shadow-md"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Homework
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="h-full overflow-y-auto border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#8b5cf6]">
              <motion.div 
                className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
                animate={{ rotate: isGenerating ? 360 : 0 }}
                transition={{ duration: 4, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
              >
                <ScrollText className="h-4 w-4 text-[#63B3ED]" />
              </motion.div>
              <span>Generated Homework</span>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <motion.div
                    animate={{ y: [-1, 1, -1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-[#63B3ED]" />
                  </motion.div>
                </motion.div>
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={streamedText.length > 0 ? 'content' : 'empty'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LessonPlanDisplay plan={streamedText} isLoading={isLoading} />
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

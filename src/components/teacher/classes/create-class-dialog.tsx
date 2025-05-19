'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/teacher/language-selector';
import { useClasses } from '@/components/providers/classes-context';

interface CreateClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (classData: any) => void;
}

interface FormData {
  class_name: string;
  age_learner: string;
  subject: string;
  language_level: string;
  session_duration: string;
  problems: Record<string, number>;
  equipment: Record<string, boolean>;
}

const initialFormData: FormData = {
  class_name: '',
  age_learner: '',
  subject: '',
  language_level: '',
  session_duration: '',
  problems: {
    discipline: 0,
    lack_motivation: 0,
    low_turnout: 0,
    lack_space: 0,
    cultural: 0,
  },
  equipment: {
    phones: false,
    tablets: false,
    internet: false,
    projector: false,
    board: false,
    tv: false,
  },
};

export function CreateClassDialog({
  open,
  onOpenChange,
  onSave,
}: CreateClassDialogProps) {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
  const { addClass } = useClasses();
  const [step, setStep] = useState(1);
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const problems = [
    { id: 'discipline', label: t('createClass.problems.discipline') },
    { id: 'lack_motivation', label: t('createClass.problems.motivation') },
    { id: 'low_turnout', label: t('createClass.problems.attendance') },
    { id: 'lack_space', label: t('createClass.problems.space') },
    { id: 'cultural', label: t('createClass.problems.cultural') },
  ];

  const equipment = [
    { id: 'phones', label: t('createClass.equipment.phones') },
    { id: 'tablets', label: t('createClass.equipment.tablets') },
    { id: 'internet', label: t('createClass.equipment.internet') },
    { id: 'projector', label: t('createClass.equipment.projector') },
    { id: 'board', label: t('createClass.equipment.board') },
    { id: 'tv', label: t('createClass.equipment.tv') },
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.class_name.trim()) {
      newErrors.class_name = t('createClass.classNameError');
    } else if (formData.class_name.length < 3) {
      newErrors.class_name = t('createClass.classNameLengthError');
    }

    if (!formData.age_learner) {
      newErrors.age_learner = t('createClass.selectAgeRange');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('createClass.subject');
    }

    if (!formData.session_duration) {
      newErrors.session_duration = t('createClass.selectDuration');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    const hasRatedProblems = Object.values(formData.problems).some(
      (value) => value > 0
    );
    if (!hasRatedProblems) {
      newErrors.problems = 'Please rate at least one common problem';
    }

    const hasSelectedEquipment = Object.values(formData.equipment).some(
      (value) => value
    );
    if (!hasSelectedEquipment) {
      newErrors.equipment = 'Please select at least one equipment item';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setErrors({});
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (validateStep2()) {
      onSave(formData);
      onOpenChange(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border border-[#63B3ED]/10 shadow-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t('createClass.title')}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <div className="space-y-2">
              <Label htmlFor="className">{t('createClass.className')}</Label>
              <Input
                id="className"
                placeholder={t('createClass.classNamePlaceholder')}
                value={formData.class_name}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    class_name: e.target.value,
                  }));
                  if (errors.class_name) {
                    setErrors((prev) => ({ ...prev, class_name: undefined }));
                  }
                }}
                className={errors.class_name ? 'border-red-500' : ''}
              />
              {errors.class_name && (
                <p className="text-sm text-red-500">{errors.class_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">{t('createClass.ageOfLearners')}</Label>
              <Select
                value={formData.age_learner}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, age_learner: value }));
                  if (errors.age_learner) {
                    setErrors((prev) => ({ ...prev, age_learner: undefined }));
                  }
                }}
              >
                <SelectTrigger
                  className={errors.age_learner ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder={t('createClass.selectAgeRange')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-6">2-6 years</SelectItem>
                  <SelectItem value="6-9">6-9 years old</SelectItem>
                  <SelectItem value="9-11">9-11 years old</SelectItem>
                  <SelectItem value="11-15">11-15 years old</SelectItem>
                  <SelectItem value="15-18">15-18 years old</SelectItem>
                  <SelectItem value="18-30">18-30 years old</SelectItem>
                  <SelectItem value="30-60">30-60 years old</SelectItem>
                  <SelectItem value="60+">60+ years old</SelectItem>
                </SelectContent>
              </Select>
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="subject">{t('createClass.subject')}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="whitespace-pre-line text-sm">
                        Description here
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="subject"
                placeholder={t('createClass.subjectPlaceholder')}
                value={formData.subject}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) {
                    setErrors((prev) => ({ ...prev, subject: undefined }));
                  }
                }}
                className={errors.subject ? 'border-red-500' : ''}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="languageLevel">
                {t('createClass.languageLevel')}
              </Label>
              <Select
                value={formData.language_level}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, language_level: value }));
                  if (errors.language_level) {
                    setErrors((prev) => ({
                      ...prev,
                      language_level: undefined,
                    }));
                  }
                }}
              >
                <SelectTrigger
                  className={errors.language_level ? 'border-red-500' : ''}
                >
                  <SelectValue
                    placeholder={t('createClass.selectLanguageLevel')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="C1">C1</SelectItem>
                  <SelectItem value="C2">C2</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-sm text-red-500">{errors.level}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t('createClass.sessionDuration')}</Label>
              <Select
                value={formData.session_duration}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, session_duration: value }));
                  if (errors.session_duration) {
                    setErrors((prev) => ({
                      ...prev,
                      session_duration: undefined,
                    }));
                  }
                }}
              >
                <SelectTrigger
                  className={errors.session_duration ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder={t('createClass.selectDuration')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1h30</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="150">2h30</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                </SelectContent>
              </Select>
              {errors.sessionDuration && (
                <p className="text-sm text-red-500">{errors.sessionDuration}</p>
              )}
            </div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleNext} 
                className="w-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all duration-300"
              >
                {t('createClass.next')}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <div className="space-y-4">
              <Label>{t('createClass.commonProblems')}</Label>
              {errors.problems && (
                <p className="text-sm text-red-500">{errors.problems}</p>
              )}
              <div className="space-y-6">
                {problems.map((problem) => (
                  <div key={problem.id} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={problem.id}>{problem.label}</Label>
                      <span className="text-sm text-muted-foreground">
                        {formData.problems[problem.id]}/10
                      </span>
                    </div>
                    <Slider
                      id={problem.id}
                      min={0}
                      max={10}
                      step={1}
                      value={[formData.problems[problem.id]]}
                      onValueChange={([value]) => {
                        setFormData((prev) => ({
                          ...prev,
                          problems: {
                            ...prev.problems,
                            [problem.id]: value,
                          },
                        }));
                        if (errors.problems) {
                          setErrors((prev) => ({
                            ...prev,
                            problems: undefined,
                          }));
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>{t('createClass.equipment.title')}</Label>
              {errors.equipment && (
                <p className="text-sm text-red-500">{errors.equipment}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={formData.equipment[item.id]}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({
                          ...prev,
                          equipment: {
                            ...prev.equipment,
                            [item.id]: checked as boolean,
                          },
                        }));
                        if (errors.equipment) {
                          setErrors((prev) => ({
                            ...prev,
                            equipment: undefined,
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={item.id}>{item.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <motion.div className="flex space-x-2" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="border-[#63B3ED]/20 text-[#63B3ED] hover:bg-[#63B3ED]/5"
                >
                  {t('createClass.back')}
                </Button>
              </motion.div>
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all duration-300" 
                  onClick={handleSubmit}
                >
                  {t('createClass.create')}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

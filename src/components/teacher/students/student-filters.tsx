'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useClasses } from '@/components/providers/classes-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/components/teacher/language-selector';
import { motion } from 'framer-motion';
import { Filter, Users, Star, BookOpen } from 'lucide-react';

export type StudentLevel = 'all' | 'VERY_GOOD' | 'GOOD' | 'AVERAGE' | 'BAD';

export type Filters = {
  classroom: string;
  level: StudentLevel;
  difficulties: string[];
};

type StudentFiltersProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export function StudentFilters({
  filters,
  onFiltersChange,
}: StudentFiltersProps) {
  const { t } = useLanguage();
  const { classes } = useClasses();
  
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleClassroomChange = (value: string) => {
    onFiltersChange({ ...filters, classroom: value });
  };

  const handleLevelChange = (value: StudentLevel) => {
    onFiltersChange({ ...filters, level: value });
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const newDifficulties = checked
      ? [...filters.difficulties, difficulty]
      : filters.difficulties.filter((d) => d !== difficulty);
    onFiltersChange({ ...filters, difficulties: newDifficulties });
  };

  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Filter className="h-4 w-4 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Filtros de Estudiantes
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        ><div className="space-y-2">
          <Label htmlFor="classroom" className="text-[#8b5cf6]">{t('studentFilters.classroom')}</Label>
          <Select
            value={filters.classroom}
            onValueChange={handleClassroomChange}
          >
            <SelectTrigger 
              id="classroom"
              className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
            >
              <SelectValue placeholder={t('studentFilters.selectClassroom')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {classes.map((classroom) => (
                <SelectItem key={classroom.id} value={classroom.id}>
                  {classroom.class_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-[#63B3ED]" />
            <h3 className="font-semibold text-[#8b5cf6]">
              {t('studentFilters.levelFilter')}
            </h3>
          </div>
          <RadioGroup value={filters.level} onValueChange={handleLevelChange}>
            <motion.div className="space-y-2" variants={containerVariants}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="all" 
                  id="all" 
                  className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
                />
                <Label htmlFor="all" className="text-[#8b5cf6] font-medium">{t('studentFilters.allLevels')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="VERY_GOOD" id="verygood" />
                <Label htmlFor="verygood">{t('studentFilters.verygood')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="GOOD" id="good" />
                <Label htmlFor="good">{t('studentFilters.good')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AVERAGE" id="average" />
                <Label htmlFor="average">{t('studentFilters.average')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="BAD" id="bad" />
                <Label htmlFor="bad">{t('studentFilters.bad')}</Label>
              </div>
            </motion.div>
          </RadioGroup>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-[#63B3ED]" />
            <h3 className="font-semibold text-[#8b5cf6]">
              {t('studentFilters.difficulties')}
            </h3>
          </div>
          <motion.div className="space-y-2" variants={containerVariants}>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="grammar"
                checked={filters.difficulties.includes('grammar')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('grammar', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="grammar">{t('studentFilters.grammar')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="vocabulary"
                checked={filters.difficulties.includes('vocabulary')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('vocabulary', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="vocabulary">
                {t('studentFilters.vocabulary')}
              </Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="phonetics"
                checked={filters.difficulties.includes('phonetics')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('phonetics', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="phonetics">{t('studentFilters.phonetics')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="listening"
                checked={filters.difficulties.includes('listening')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('listening', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="listening">{t('studentFilters.listening')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="speaking"
                checked={filters.difficulties.includes('speaking')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('speaking', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="speaking">{t('studentFilters.speaking')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="reading"
                checked={filters.difficulties.includes('reading')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('reading', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="reading">{t('studentFilters.reading')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="writing"
                checked={filters.difficulties.includes('writing')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('writing', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="writing">{t('studentFilters.writing')}</Label>
            </motion.div>
            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
              <Checkbox
                id="interacting"
                checked={filters.difficulties.includes('interacting')}
                onCheckedChange={(checked) =>
                  handleDifficultyChange('interacting', checked as boolean)
                }
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label className="text-[#8b5cf6] font-medium" htmlFor="interacting">
                {t('studentFilters.interacting')}
              </Label>
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

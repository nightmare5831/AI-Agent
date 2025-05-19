'use client';

import { useLanguage } from '@/components/teacher/language-selector';
import { BookOpen } from 'lucide-react';
        import { GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  const { t } = useLanguage();
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
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <motion.header 
      className="border-b border-[#d32f2f]/10 py-4 shadow-md bg-background/80 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center space-x-2">
            <BookOpen className="text-education-indigo h-6 w-6" />
            <h1 className="text-xl font-bold">
              <span className="text-education-blue">{t('subHeader.differentiated')}</span>{' '}
              {t('subHeader.activityGenerator')}
            </h1>
          </motion.div>
          <div className="flex items-center space-x-4">
            <button className="bg-education-green rounded-md px-4 py-2 text-sm transition-colors hover:bg-opacity-90">
              {t('subHeader.upgradeToPremium')}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

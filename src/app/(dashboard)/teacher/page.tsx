'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BookOpen,
  Settings,
  Users,
  BookCheck,
  BookPlus,
  GraduationCap,
  Sparkles,
  Wand2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/teacher/language-selector';
import { useClasses } from '@/components/providers/classes-context';
import { useStudents } from '@/components/providers/students-provider';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function ClassSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
      {[1, 2].map((index) => (
        <Card key={index} className="border-border bg-card shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RecentClasses() {
  const { classes, fetchClasses } = useClasses();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  // useEffect(() => {
  //   try {
  //     setIsLoading(true);
  //     fetchClasses();
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []); //eslint-disable-line

  if (isLoading) {
    return <ClassSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
      {classes.slice(0, 2).map((classItem, index) => (
        <Card
          key={index}
          className="border-border bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-foreground">
              {classItem.class_name}
            </CardTitle>
            <GraduationCap className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-medium text-foreground">
                  Age Range: {classItem.age_learner} years
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm font-medium text-foreground">
                    Subjects
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {classItem.subject.split(',').map((subject, idx) => (
                    <Badge key={idx} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="mb-2 h-8 w-8" /> {/* Icon */}
      <Skeleton className="mb-2 h-6 w-32" /> {/* Title */}
      <Skeleton className="h-9 w-16" /> {/* Number */}
    </Card>
  );
}

function DashboardContent() {
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const { t } = useLanguage();
  const { classes, fetchClasses } = useClasses();
  const { students, fetchStudents } = useStudents();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchClasses();
        await fetchStudents();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []); //eslint-disable-line

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-background p-5"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-8 flex items-center justify-between"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="h-8 w-8 text-[#63B3ED]" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
              {t('main.teacherDashboard')}
            </h1>
          </div>
        </motion.div>

        <motion.div 
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={itemVariants}
        >
          {isLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            <>
              <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-6 border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Users className="mb-2 h-8 w-8 text-[#63B3ED]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#8b5cf6]">
                    {t('main.totalStudents')}
                  </h3>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                    {students.length}
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-6 border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <BookOpen className="mb-2 h-8 w-8 text-[#63B3ED]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#8b5cf6]">
                    {t('main.activeClasses')}
                  </h3>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                    {classes.length}
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-6 border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Settings className="mb-2 h-8 w-8 text-[#63B3ED]" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#8b5cf6]">
                    {t('main.toolsAvailable')}
                  </h3>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                    18
                  </p>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.div 
          className="flex w-full justify-between gap-6"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants} className="w-[65%]">
            <Card className="p-6 border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <motion.div
                  className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap className="h-5 w-5 text-[#63B3ED]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#8b5cf6]">
                  {t('main.recentClasses')}
                </h3>
              </div>
              <RecentClasses />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="w-[30%]">
            <Card className="p-6 border border-[#63B3ED]/10 shadow-md bg-background/80 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <motion.div
                  className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-5 w-5 text-[#63B3ED]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#8b5cf6]">
                  {t('main.quickTools')}
                </h3>
              </div>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    key="quick-lesson-planner"
                    href="/teacher/tools/lesson-planner"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#63B3ED]/20 hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t('main.lessonPlanner')}
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/teacher/exam-generator">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#63B3ED]/20 hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]"
                    >
                      <BookCheck className="mr-2 h-4 w-4" />
                      {t('main.examGenerator')}
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/teacher/homework-generator">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#63B3ED]/20 hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]"
                    >
                      <BookPlus className="mr-2 h-4 w-4" />
                      {t('main.homeworkGenerator')}
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/teacher/students">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#63B3ED]/20 hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {t('main.studentManager')}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TeacherDashboard() {
  return <DashboardContent />;
}

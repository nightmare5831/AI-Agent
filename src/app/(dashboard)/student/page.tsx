'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AssignmentList } from '@/components/student/assignments/assignment-list';
import { ProgressOverview } from '@/components/student/progress/progress-overview';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Bell,
  BookOpen,
  RefreshCw,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { useNotifications } from '@/components/providers/notification-provider';
import { AssignmentCard } from '@/components/student/assignments/assignment-card';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function StudentDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const { assessmentNotifications, refreshNotifications } = useNotifications();
  const [latestAssessments, setLatestAssessments] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log(
      'Dashboard received assessment notifications:',
      assessmentNotifications
    );

    // Process assessment notifications to display as cards
    const assessments = assessmentNotifications.map((assessment) => {
      return {
        id: assessment.id,
        title: assessment.title || 'Assessment',
        description:
          assessment.description ||
          assessment.message ||
          'Complete this assessment',
        type: 'assessment',
        status: 'in-progress',
        progress: 0,
        dueDate: new Date(assessment.dueDate),
        points: assessment.totalPoints || 0,
        questions: assessment.questions || [],
        language: assessment.language || 'English',
        link: assessment.link || `/student/assessments/${assessment.id}`,
      };
    });

    console.log('Processed assessments for dashboard:', assessments);

    // Get the latest 3 assessments
    setLatestAssessments(assessments.slice(0, 3));
  }, [assessmentNotifications]);

  // Force a refresh when the component mounts
  useEffect(() => {
    refreshNotifications();
  }, []); //eslint-disable-line

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshNotifications();
      toast.success('Notifications refreshed');
    } catch (error) {
      toast.error('Failed to refresh notifications');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Fondo con partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              top: `${10 + (i * 10)}%`,
              left: `${5 + (i * 12)}%`,
              backgroundColor:
                i % 4 === 0 ? 'rgba(211,47,47,0.08)' :
                i % 4 === 1 ? 'rgba(147,51,234,0.08)' :
                i % 4 === 2 ? 'rgba(139,92,246,0.08)' :
                'rgba(236,72,153,0.08)',
              opacity: 0.6,
              transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px)`,
              transition: 'transform 3s ease-in-out',
            }}
          ></div>
        ))}
      </div>

      <motion.div 
        className="relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Encabezado con banner de gradiente */}
        <motion.div 
          className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#9333ea] to-[#d32f2f] p-1"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

          <div className="relative bg-black/20 backdrop-blur-sm rounded-lg p-6 overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#9333ea]/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#d32f2f]/20 blur-2xl" />
            
            <div className="relative z-10">
              <h1 className="mb-2 text-4xl font-bold text-white">Student <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Dashboard</span></h1>
              <p className="text-white/70">
                Welcome back! Here's an overview of your learning progress.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-8 flex items-center justify-between"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </motion.div>

        <motion.div 
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={itemVariants}
        >
          <div className="col-span-full transform transition-all duration-500 hover:scale-[1.01]">
            <ProgressOverview />
          </div>
        </motion.div>

        {/* New Assessments Section */}
        <motion.div 
          className="mb-8 transform transition-all duration-500 hover:scale-[1.01]"
          variants={itemVariants}
        >
          <Card className="overflow-hidden border border-[#9333ea]/10 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#9333ea]/5 to-[#d32f2f]/5 backdrop-blur-sm">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#9333ea]" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333ea] to-[#d32f2f]">New Assessments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestAssessments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {latestAssessments.map((assessment) => (
                    <Card key={assessment.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="truncate text-base">
                              {assessment.title}
                            </CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {assessment.questions.length} questions •{' '}
                              {assessment.points} points
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {assessment.language}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <p className="line-clamp-2 text-sm">
                            {assessment.description}
                          </p>
                          {assessment.questions.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Question Types:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {Array.from(
                                  new Set(
                                    assessment.questions.map((q: any) => q.type)
                                  )
                                )
                                  .filter(
                                    (type): type is string =>
                                      typeof type === 'string'
                                  )
                                  .map((type: string) => (
                                    <Badge
                                      key={type}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-1" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button asChild className="w-full" size="sm">
                          <Link href={assessment.link}>
                            Start Assessment{' '}
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-muted p-8 text-center">
                  <p className="text-muted-foreground">
                    No new assessments found
                  </p>
                </div>
              )}
            </CardContent>
            {latestAssessments.length > 0 && (
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/student/assessments">View All Assessments</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>

        <motion.div 
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={itemVariants}
        >
          <div className="col-span-full">
            <AssignmentList />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

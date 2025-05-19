'use client';

import { Assignment, AssignmentStatus } from '@/types/assignments';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, ArrowRight, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface AssignmentCardProps {
  assignment: Assignment;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  // Variantes para animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    hover: { 
      y: -5,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  // Ensure statusColors includes all possible AssignmentStatus values
  const statusColors: Record<AssignmentStatus | 'all', string> = {
    'in-progress': 'bg-[#63B3ED]',
    completed: 'bg-[#8b5cf6]',
    overdue: 'bg-[#d32f2f]',
    all: 'bg-[#ec4899]', // Added for completeness, though not directly used in cards
  };

  const typeLabels: Record<string, string> = {
    assessment: 'Assessment',
    assignment: 'Assignment',
    project: 'Project',
    quiz: 'Quiz',
  };

  // Use a type guard to ensure the status is valid
  const getStatusColor = (status: AssignmentStatus): string => {
    return statusColors[status] || 'bg-slate-500'; // Fallback color
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover="hover"
    >
    <Card className="p-4 border border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{assignment.title}</h3>
            <Badge variant="outline">
              {typeLabels[assignment.type] || assignment.type}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Due{' '}
              {formatDistanceToNow(new Date(assignment.dueDate), {
                addSuffix: true,
              })}
            </span>
            {assignment.points && (
              <>
                <span>•</span>
                <span>{assignment.points} points</span>
              </>
            )}
          </div>
        </div>
        <Badge className={getStatusColor(assignment.status)}>
          {assignment.status}
        </Badge>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {assignment.description}
      </p>

      {assignment.attachments && assignment.attachments.length > 0 && (
        <div className="mt-4 flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            {assignment.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Progress</span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-[#63B3ED]"
          >
            {assignment.progress}%
          </motion.span>
        </div>
        <Progress value={assignment.progress} className="h-2 bg-[#63B3ED]/20" />
      </div>

      <div className="mt-4">
        <Button className="w-full bg-[#d32f2f] hover:bg-[#d32f2f]/90 text-white">
          <motion.div
            className="flex items-center justify-center w-full"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {assignment.status === 'completed' ? 'View Submission' : 'Continue'}
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 1 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.span>
          </motion.div>
        </Button>
      </div>
    </Card>
    </motion.div>
  );
}

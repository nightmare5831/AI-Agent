'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreVertical, Pencil, Trash2, FileText, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LessonCardProps {
  lessonItem: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function LessonCardSkeleton() {
  return (
    <Card className="p-4 border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="mb-2 h-6 w-48" /> {/* Title */}
          <Skeleton className="mb-2 h-4 w-36" /> {/* Class name */}
          <Skeleton className="h-4 w-40" /> {/* Teacher name */}
        </div>
        <div className="space-x-2">
          <Skeleton className="inline-block h-8 w-8 rounded-md" />{' '}
          {/* Edit button */}
          <Skeleton className="inline-block h-8 w-8 rounded-md" />{' '}
          {/* Delete button */}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <div>
          <Skeleton className="mb-2 h-4 w-24" /> {/* Lesson Type label */}
          <Skeleton className="h-6 w-20" /> {/* Badge */}
        </div>
        <Skeleton className="h-9 w-32" /> {/* Generate Plan button */}
      </div>
    </Card>
  );
}

export function LessonCard({ lessonItem, onEdit, onDelete }: LessonCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  
  // Animation variants
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

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(lessonItem.id);
    setIsDeleteDialogOpen(false);
  };
  function formatArrayToText(arr: any, replaceChar = '_') {
    return arr
      .split(replaceChar)
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover="hover"
      >
      <Card className="group border border-[#d32f2f]/10 bg-background/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-xl">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="rounded-full bg-[#63B3ED]/90 p-2 shadow-md transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FileText className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h2 className="line-clamp-1 text-xl font-semibold gradient-text">
                  {lessonItem.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {lessonItem.classroom.class_name}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-10 rounded-full hover:bg-[#ec4899]/10"
                >
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => onEdit(lessonItem.id)}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-[#8b5cf6]/10 focus:bg-[#8b5cf6]/10"
                >
                  <Pencil className="mr-2 h-4 w-4 text-[#8b5cf6]" />
                  <span>Edit Lesson</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-[#d32f2f]/10 focus:bg-[#d32f2f]/10 text-[#d32f2f]"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Lesson</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center text-sm">
              <span className="font-medium text-[#8b5cf6]">Teacher:</span>
              <span className="ml-2 text-muted-foreground">
                {lessonItem.classroom.teacher.full_name}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium text-[#8b5cf6]">Type:</span>
              <span className="ml-2 text-muted-foreground">
                {lessonItem.lessontype}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-border/50 pt-4">
            <Button
              onClick={() => router.push(`/teacher/${lessonItem.id}`)}
              className="w-full bg-gradient-to-r from-[#d32f2f] to-[#ec4899] text-white shadow-md transition-all duration-300 hover:from-[#d32f2f]/90 hover:to-[#ec4899]/90 hover:shadow-lg"
            >
              View Lesson Plan
            </Button>
          </div>
        </div>
      </Card>
      </motion.div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{lessonItem.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#d32f2f] text-white hover:bg-[#d32f2f]/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

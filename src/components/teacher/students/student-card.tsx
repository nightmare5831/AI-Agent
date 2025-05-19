import { Student } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import {
  MoreVertical,
  Pencil,
  Trash2,
  User,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
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

interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function StudentCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="mb-2 h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="space-x-2">
          <Skeleton className="inline-block h-8 w-8 rounded-md" />
          <Skeleton className="inline-block h-8 w-8 rounded-md" />
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <div>
          <Skeleton className="mb-2 h-4 w-40" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    onDelete(student.id);
    setIsDeleteDialogOpen(false);
  };

  // Get student name prioritizing different sources for compatibility
  const studentName = student.student_info?.full_name || student.full_name;
  const className = student.classroom?.class_name || '';

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover="hover"
      >
        <Card className="group cursor-pointer border border-[#63B3ED]/10 p-6 shadow-md overflow-hidden bg-background/80 backdrop-blur-sm">
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="rounded-full bg-gradient-to-r from-[#63B3ED]/20 to-[#d32f2f]/20 p-2 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <User className="h-5 w-5 text-[#63B3ED]" />
                </motion.div>
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">{studentName}</h2>
              </div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full transition-colors duration-200 hover:bg-gray-200"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-0 shadow-lg backdrop-blur-lg"
              >
                <DropdownMenuItem
                  onClick={() => onEdit(student.id)}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50"
                >
                  <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Edit Student</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-red-50 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-red-600">Delete Student</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <motion.div className="space-y-3" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div 
                className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BookOpen className="h-4 w-4 text-[#63B3ED]" />
              </motion.div>
              <span className="text-[#8b5cf6] font-medium">Clase:</span>
              <span className="text-[#63B3ED]/70">{className}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-1.5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <GraduationCap className="h-4 w-4 text-[#63B3ED]" />
              </motion.div>
              <span className="text-[#8b5cf6] font-medium">Nivel:</span>
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] px-3 py-1 text-xs font-medium text-white">
                {student?.level}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Card>
      </motion.div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {studentName}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

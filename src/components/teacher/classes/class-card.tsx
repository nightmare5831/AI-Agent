'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  BookOpen,
  Users,
  GraduationCap,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ClassCardProps {
  classItem: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClassCard({ classItem, onEdit, onDelete }: ClassCardProps) {
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(classItem.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover="hover"
      >
      <Card className="border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold gradient-text">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {classItem.class_name}
            </motion.span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-6 w-6 text-[#d32f2f]" />
            </motion.div>
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
                  onClick={() => onEdit(classItem.id)}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50"
                >
                  <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Edit Class</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="flex items-center px-3 py-2.5 transition-colors duration-200 hover:bg-red-50 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-red-600">Delete Class</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-5 w-5 text-[#63B3ED]" />
              </motion.div>
              <span className="text-sm font-medium text-foreground">
                Age Range: {classItem.age_learner} years
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                </motion.div>
                <span className="text-sm font-medium text-foreground">
                  Subjects
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {classItem.subject
                  .split(',')
                  .map((subject: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                    >
                      <Badge key={idx} variant="secondary" className="bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/30">
                        {subject}
                      </Badge>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {classItem.class_name}? This
              action cannot be undone.
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

"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlusCircle, Target, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { LearningGoal } from "@/types/progress"
import { motion } from "framer-motion"

export function LearningGoals() {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const goals: LearningGoal[] = [
    {
      id: "1",
      title: "Complete Grammar Course",
      target: 100,
      current: 45,
      dueDate: new Date("2024-03-01")
    },
    {
      id: "2",
      title: "Learn 500 New Words",
      target: 500,
      current: 325,
      dueDate: new Date("2024-03-15")
    },
    {
      id: "3",
      title: "Practice Speaking",
      target: 20,
      current: 8,
      dueDate: new Date("2024-02-28")
    }
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
    <Card className="border border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-[#ec4899]/10 p-2"
            >
              <Target className="h-5 w-5 text-[#ec4899]" />
            </motion.div>
            <CardTitle className="text-xl font-bold gradient-text">Learning Goals</CardTitle>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button variant="outline" size="sm" className="bg-[#63B3ED]/10 text-[#63B3ED] border-[#63B3ED]/20 hover:bg-[#63B3ED]/20">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <motion.div className="space-y-6" variants={containerVariants}>
          {goals.map((goal) => (
          <motion.div 
            key={goal.id} 
            className="space-y-3 p-3 rounded-lg border border-[#2B6CB0] group hover:border-[#2B6CB0] transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <motion.h3 
                  className="font-medium text-[#8b5cf6] group-hover:text-[#63B3ED] transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {goal.title}
                </motion.h3>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3 text-[#d32f2f]" />
                  <motion.p 
                    className="text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Due {formatDistanceToNow(goal.dueDate, { addSuffix: true })}
                  </motion.p>
                </div>
              </div>
              <motion.span 
                className="text-sm font-bold px-2 py-1 rounded-full bg-[#ec4899]/10 text-[#ec4899]"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {goal.current}/{goal.target}
              </motion.span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-[#ec4899]/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="absolute h-full left-0 top-0 rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] animate-gradient-x"
              />
              <motion.div 
                className="absolute right-0 top-0 h-full w-1 rounded-full bg-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              />
            </div>
          </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
    </motion.div>
  )
}
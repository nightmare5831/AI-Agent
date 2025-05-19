"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, BarChart2 } from "lucide-react"
import { SkillProgress } from "@/types/progress"
import { motion } from "framer-motion"

export function SkillsBreakdown() {
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
  const skills: SkillProgress[] = [
    { skill: "Speaking", level: "B1", progress: 75, change: 5 },
    { skill: "Listening", level: "B2", progress: 85, change: 3 },
    { skill: "Reading", level: "B1", progress: 70, change: -2 },
    { skill: "Writing", level: "B1", progress: 65, change: 4 },
    { skill: "Grammar", level: "B2", progress: 80, change: 6 },
    { skill: "Vocabulary", level: "B1", progress: 72, change: 2 }
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
              className="rounded-full bg-[#8b5cf6]/10 p-2"
            >
              <BarChart2 className="h-5 w-5 text-[#8b5cf6]" />
            </motion.div>
            <CardTitle className="text-xl font-bold gradient-text">Skills Breakdown</CardTitle>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Badge variant="outline" className="bg-[#d32f2f]/5 text-[#d32f2f] border-[#d32f2f]/20 px-3 py-1">
              Last 30 days
            </Badge>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <motion.div className="space-y-6" variants={containerVariants}>
        {skills.map((skill) => (
          <motion.div 
            key={skill.skill} 
            variants={itemVariants} 
            className="group"
          >
            <div className="flex items-center justify-between mb-2 group-hover:translate-x-1 transition-transform duration-300">
              <div className="flex items-center">
                <span className="font-medium mr-2">{skill.skill}</span>
                <motion.span 
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  Level {skill.level}
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-sm font-bold text-[#63B3ED]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {skill.progress}%
                </motion.span>
                <motion.div 
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                    skill.change > 0 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-red-500/10 text-red-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {skill.change > 0 ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">{Math.abs(skill.change)}%</span>
                </motion.div>
              </div>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-[#63B3ED]/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="absolute h-full left-0 top-0 rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] animate-gradient-x"
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
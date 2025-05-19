"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Languages } from "lucide-react"

export function StudentLanguageProgress() {
  const skills = [
    { name: "Speaking", level: "B1", progress: 75 },
    { name: "Listening", level: "B2", progress: 85 },
    { name: "Reading", level: "B1", progress: 70 },
    { name: "Writing", level: "B1", progress: 65 }
  ]

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
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Habilidades de Idioma
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="space-y-5"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              className="space-y-2"
              variants={itemVariants}
              custom={index}
            >
              <div className="flex justify-between text-sm">
                <span className="text-[#8b5cf6] font-medium">{skill.name}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] font-medium">
                  Level {skill.level}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-[#63B3ED]/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
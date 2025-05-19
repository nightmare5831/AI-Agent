"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Clock, BookOpen, Star } from "lucide-react"
import { motion } from "framer-motion"

export function TeacherStats() {
  const stats = [
    { icon: Users, label: "Estudiantes Activos", value: "45", progress: 75 },
    { icon: Clock, label: "Horas de Enseñanza", value: "120", progress: 85 },
    { icon: BookOpen, label: "Clases", value: "4", progress: 70 },
    { icon: Star, label: "Calificación", value: "4.8", progress: 95 }
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
          <Star className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Estadísticas de Enseñanza
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="grid grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="space-y-3"
              variants={itemVariants}
              custom={index}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-2">
                  <stat.icon className="h-5 w-5 text-[#63B3ED]" />
                </div>
                <div>
                  <p className="text-sm text-[#8b5cf6] font-medium">{stat.label}</p>
                  <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-[#63B3ED]/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]"
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
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
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

export function TeacherClasses() {
  const classes = [
    { name: "Inglés para Principiantes", code: "ENG101", students: 12, level: "A1" },
    { name: "Inglés de Negocios", code: "ENG201", students: 8, level: "B2" },
    { name: "Gramática Avanzada", code: "ENG301", students: 15, level: "C1" },
    { name: "Práctica de Conversación", code: "ENG102", students: 10, level: "B1" }
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
    <Card className="overflow-hidden border border-[#9333ea]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#9333ea]/5 to-[#d32f2f]/5 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#9333ea]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333ea] to-[#d32f2f]">
            Clases Activas
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="grid gap-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {classes.map((class_, index) => (
            <motion.div 
              key={class_.code} 
              className="flex items-center justify-between p-4 border border-[#9333ea]/10 rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-[#9333ea]/5"
              variants={itemVariants}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(147, 51, 234, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h3 className="font-medium text-[#8b5cf6]">{class_.name}</h3>
                <p className="text-sm text-[#9333ea]/70">Código: {class_.code}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-[#9333ea]/20 text-[#9333ea] hover:bg-[#9333ea]/30">
                  {class_.students} Estudiantes
                </Badge>
                <Badge className="bg-gradient-to-r from-[#9333ea] to-[#d32f2f] hover:from-[#9333ea]/90 hover:to-[#d32f2f]/90">
                  {class_.level}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
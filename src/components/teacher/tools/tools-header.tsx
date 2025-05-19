"use client"

import { Input } from "@/components/ui/input"
import { Wrench } from "lucide-react"
import { motion } from "framer-motion"

interface ToolsHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ToolsHeader({ searchQuery, onSearchChange }: ToolsHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center gap-2" variants={itemVariants}>
        <motion.div 
          className="rounded-full bg-gradient-to-r from-[#63B3ED]/20 to-[#d32f2f]/20 p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Wrench className="h-6 w-6 text-[#63B3ED]" />
        </motion.div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
          Herramientas de Enseñanza
        </h1>
      </motion.div>
      <motion.div className="w-full md:w-64" variants={itemVariants}>
        <Input
          placeholder="Buscar herramientas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
        />
      </motion.div>
    </motion.div>
  )
}
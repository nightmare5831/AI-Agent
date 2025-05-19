"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toolCategories } from "@/lib/data/tools"
import { ToolCategory } from "@/types/tools"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"

interface ToolsFiltersProps {
  selectedCategory: ToolCategory | "all"
  onCategoryChange: (category: ToolCategory | "all") => void
}

export function ToolsFilters({ selectedCategory, onCategoryChange }: ToolsFiltersProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Filter className="h-4 w-4 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Categorías
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <RadioGroup 
            value={selectedCategory} 
            onValueChange={(value) => onCategoryChange(value as ToolCategory | "all")}
            className="space-y-2"
          >
            <motion.div 
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <RadioGroupItem 
                value="all" 
                id="all" 
                className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
              />
              <Label htmlFor="all" className="text-[#8b5cf6] font-medium">
                Todas las Herramientas
              </Label>
            </motion.div>
            {Object.entries(toolCategories).map(([key, { label, icon: Icon }], index) => (
              <motion.div 
                key={key} 
                className="flex items-center space-x-2"
                variants={itemVariants}
                custom={index}
              >
                <RadioGroupItem 
                  value={key} 
                  id={key} 
                  className="border-[#63B3ED]/30 text-[#63B3ED] focus:ring-[#63B3ED]/20"
                />
                <Label 
                  htmlFor={key} 
                  className="flex items-center gap-2 text-[#8b5cf6] font-medium"
                >
                  <Icon className="h-4 w-4 text-[#63B3ED]" />
                  {label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>
      </CardContent>
    </Card>
  )
}
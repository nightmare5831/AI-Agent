"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun, Palette } from "lucide-react"
import { motion } from "framer-motion"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()

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
          <Palette className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Apariencia
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Label className="text-base text-[#8b5cf6] mb-2 block">Tema</Label>
            <RadioGroup
              defaultValue={theme}
              onValueChange={setTheme}
              className="grid grid-cols-3 gap-4 mt-3"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center gap-2 rounded-md border-2 border-[#63B3ED]/20 p-4 hover:bg-[#63B3ED]/5 cursor-pointer [&:has([data-state=checked])]:border-[#63B3ED] [&:has([data-state=checked])]:bg-[#63B3ED]/10 transition-all duration-300"
                >
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <Sun className="h-6 w-6 text-[#d32f2f]" />
                  <span className="text-[#8b5cf6]">Claro</span>
                </Label>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center gap-2 rounded-md border-2 border-[#63B3ED]/20 p-4 hover:bg-[#63B3ED]/5 cursor-pointer [&:has([data-state=checked])]:border-[#63B3ED] [&:has([data-state=checked])]:bg-[#63B3ED]/10 transition-all duration-300"
                >
                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                  <Moon className="h-6 w-6 text-[#63B3ED]" />
                  <span className="text-[#8b5cf6]">Oscuro</span>
                </Label>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center gap-2 rounded-md border-2 border-[#63B3ED]/20 p-4 hover:bg-[#63B3ED]/5 cursor-pointer [&:has([data-state=checked])]:border-[#63B3ED] [&:has([data-state=checked])]:bg-[#63B3ED]/10 transition-all duration-300"
                >
                  <RadioGroupItem value="system" id="system" className="sr-only" />
                  <Monitor className="h-6 w-6 text-[#8b5cf6]" />
                  <span className="text-[#8b5cf6]">Sistema</span>
                </Label>
              </motion.div>
            </RadioGroup>
          </motion.div>
        </motion.div>
      </CardContent>

      <CardFooter className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 p-4">
        <motion.div 
          className="w-full flex justify-end"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all duration-300">
              Guardar Preferencias
            </Button>
          </motion.div>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
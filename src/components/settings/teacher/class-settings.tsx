"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Clock, RotateCw, KeyRound } from "lucide-react"

export function TeacherClassSettings() {
  const [autoAssign, setAutoAssign] = useState(true)
  const [groupWork, setGroupWork] = useState(true)
  const [peerReview, setPeerReview] = useState(false)
  
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
    <div className="space-y-6">
      <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#63B3ED]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
              Gestión de Clase
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
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assign">Asignación Automática de Tareas</Label>
                  <p className="text-sm text-muted-foreground">
                    Asignar automáticamente tareas según el progreso de la clase
                  </p>
                </div>
                <Switch
                  id="auto-assign"
                  checked={autoAssign}
                  onCheckedChange={setAutoAssign}
                  className="data-[state=checked]:bg-[#63B3ED]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="group-work" className="text-gray-200">Habilitar Trabajo en Grupo</Label>
                  <p className="text-sm text-gray-400">
                    Permitir que los estudiantes colaboren en las tareas
                  </p>
                </div>
                <Switch
                  id="group-work"
                  checked={groupWork}
                  onCheckedChange={setGroupWork}
                  className="data-[state=checked]:bg-[#63B3ED]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="peer-review" className="text-gray-200">Revisión por Pares</Label>
                  <p className="text-sm text-gray-400">
                    Habilitar revisión por pares para las tareas
                  </p>
                </div>
                <Switch
                  id="peer-review"
                  checked={peerReview}
                  onCheckedChange={setPeerReview}
                  className="data-[state=checked]:bg-[#63B3ED]"
                />
              </div>
            </motion.div>

            <Separator className="bg-gray-700" />

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-medium text-[#63B3ED] flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#63B3ED]" /> Configuración Predeterminada de Tareas
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deadline" className="text-gray-200">Duración Predeterminada del Plazo</Label>
                  <Select defaultValue="7">
                    <SelectTrigger 
                      id="deadline"
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-[#63B3ED]/30"
                    >
                      <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="5">5 días</SelectItem>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="14">2 semanas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attempts" className="text-gray-200">Intentos Máximos</Label>
                  <Input 
                    id="attempts" 
                    type="number" 
                    min="1" 
                    defaultValue="3"
                    className="bg-gray-800 border-gray-700 text-gray-200 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </motion.div>

            <Separator className="bg-gray-700" />

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-medium text-[#63B3ED] flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#63B3ED]" /> Códigos de Clase
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="code-expiry" className="text-gray-200">Expiración del Código</Label>
                  <Select defaultValue="never">
                    <SelectTrigger 
                      id="code-expiry"
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-[#63B3ED]/30"
                    >
                      <SelectValue placeholder="Seleccionar expiración" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="24h">24 horas</SelectItem>
                      <SelectItem value="week">1 semana</SelectItem>
                      <SelectItem value="month">1 mes</SelectItem>
                      <SelectItem value="never">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="outline"
                  className="border-[#63B3ED]/30 text-[#63B3ED] hover:bg-[#63B3ED]/10 hover:text-[#63B3ED]"
                >
                  <RotateCw className="mr-2 h-4 w-4" /> Generar Nuevo Código de Clase
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-end px-6 py-4 bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 border-t border-gray-800">
          <Button className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all hover:shadow-md">
            Guardar Configuración
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
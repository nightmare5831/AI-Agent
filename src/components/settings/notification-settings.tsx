"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, BellRing, BookOpen, MessageSquare, Clock, RefreshCw } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    assignments: true,
    messages: true,
    reminders: false,
    updates: true
  })

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
          <Bell className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Preferencias de Notificaciones
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
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="font-medium text-[#8b5cf6]">Métodos de Entrega</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#63B3ED]/5 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-[#63B3ED]" />
                  <div>
                    <Label htmlFor="email-notifications" className="text-[#8b5cf6]">
                      Notificaciones por Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones vía email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#63B3ED] data-[state=checked]:to-[#d32f2f]"
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#63B3ED]/5 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex gap-3">
                  <BellRing className="h-5 w-5 text-[#63B3ED]" />
                  <div>
                    <Label htmlFor="push-notifications" className="text-[#8b5cf6]">
                      Notificaciones Push
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones en tu navegador
                    </p>
                  </div>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#63B3ED] data-[state=checked]:to-[#d32f2f]"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="font-medium text-[#8b5cf6]">Tipos de Notificaciones</h3>
            <div className="space-y-4">
              {[
                { id: 'assignments', label: 'Actualizaciones de Tareas', description: 'Cuando los estudiantes envían o modifican tareas', icon: <BookOpen className="h-5 w-5 text-[#63B3ED]" /> },
                { id: 'messages', label: 'Nuevos Mensajes', description: 'Cuando recibes nuevos mensajes', icon: <MessageSquare className="h-5 w-5 text-[#63B3ED]" /> },
                { id: 'reminders', label: 'Recordatorios', description: 'Para fechas límite y eventos próximos', icon: <Clock className="h-5 w-5 text-[#63B3ED]" /> },
                { id: 'updates', label: 'Actualizaciones de la Plataforma', description: 'Sobre nuevas funciones y mejoras', icon: <RefreshCw className="h-5 w-5 text-[#63B3ED]" /> }
              ].map(({ id, label, description, icon }, index) => (
                <motion.div 
                  key={id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#63B3ED]/5 transition-colors duration-300"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex gap-3">
                    {icon}
                    <div>
                      <Label htmlFor={id} className="text-[#8b5cf6]">{label}</Label>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Switch
                    id={id}
                    checked={notifications[id as keyof typeof notifications]}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [id]: checked }))
                    }
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#63B3ED] data-[state=checked]:to-[#d32f2f]"
                  />
                </motion.div>
              ))}
            </div>
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
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, KeyRound, ShieldAlert, Trash2 } from "lucide-react"

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false)

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
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-[#63B3ED]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                Cambiar Contraseña
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.div className="grid gap-2" variants={itemVariants}>
                <Label htmlFor="current" className="text-[#8b5cf6]">Contraseña Actual</Label>
                <Input 
                  id="current" 
                  type="password" 
                  className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
                />
              </motion.div>
              <motion.div className="grid gap-2" variants={itemVariants}>
                <Label htmlFor="new" className="text-[#8b5cf6]">Nueva Contraseña</Label>
                <Input 
                  id="new" 
                  type="password" 
                  className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
                />
              </motion.div>
              <motion.div className="grid gap-2" variants={itemVariants}>
                <Label htmlFor="confirm" className="text-[#8b5cf6]">Confirmar Nueva Contraseña</Label>
                <Input 
                  id="confirm" 
                  type="password" 
                  className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
                />
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
                  Actualizar Contraseña
                </Button>
              </motion.div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#63B3ED]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                Autenticación de Dos Factores
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[#63B3ED]/5 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-[#63B3ED]" />
                <div>
                  <Label htmlFor="2fa" className="text-[#8b5cf6]">Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Añade una capa extra de seguridad a tu cuenta
                  </p>
                </div>
              </div>
              <Switch
                id="2fa"
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#63B3ED] data-[state=checked]:to-[#d32f2f]"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-red-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-700/10 backdrop-blur-sm">
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                Zona de Peligro
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div 
              className="flex items-center justify-between"
              whileHover={{ x: 5 }}
            >
              <div className="flex gap-3">
                <Trash2 className="h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-medium mb-2 text-red-500">Eliminar Cuenta</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Elimina permanentemente tu cuenta y todos los datos asociados
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="destructive" className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300">
                  Eliminar Cuenta
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
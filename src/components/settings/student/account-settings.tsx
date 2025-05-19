'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User, BookOpen } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import { studentInterests } from '@/lib/data/interests';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languageLevels } from '@/lib/data/language-levels';
import { capitalizeFirst, getInitials } from '@/lib/utils';
import { useAuth } from '@/core/auth/AuthProvider';
import { motion } from 'framer-motion';

export function StudentAccountSettings() {
  const [{ profile }] = useAuth();
  
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
      <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#63B3ED]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
              Información del Perfil
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div 
            className="mb-6 flex items-center gap-6"
            variants={itemVariants}
          >
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-[#63B3ED]/30">
                <AvatarImage
                  src="/assets/images/avatars/sarah.png"
                  alt="Profile"
                />
                <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
              </Avatar>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#d32f2f]/10 border-[#d32f2f]/30 text-[#d32f2f]"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <div>
              <h3 className="font-medium text-[#8b5cf6]">Foto de Perfil</h3>
              <p className="text-sm text-muted-foreground">
                Haz clic en el ícono de cámara para actualizar tu foto
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid gap-5"
            variants={containerVariants}
          >
            <motion.div className="grid gap-2" variants={itemVariants}>
              <Label htmlFor="name" className="text-[#8b5cf6]">Nombre</Label>
              <Input
                id="name"
                defaultValue={capitalizeFirst(profile?.full_name)}
                className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div className="grid gap-2" variants={itemVariants}>
              <Label htmlFor="email" className="text-[#8b5cf6]">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={profile?.email} 
                className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div className="grid gap-2" variants={itemVariants}>
              <Label htmlFor="classCode" className="text-[#8b5cf6]">Código de Clase</Label>
              <Input 
                id="classCode" 
                defaultValue="ENG101" 
                className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
              />
            </motion.div>
            
            <motion.div className="grid gap-2" variants={itemVariants}>
              <Label className="text-[#8b5cf6]">Intereses</Label>
              <MultiSelect
                options={studentInterests}
                defaultValue={['sports', 'music']}
                placeholder="Selecciona tus intereses"
              />
            </motion.div>
            
            <motion.div className="grid gap-2" variants={itemVariants}>
              <Label className="text-[#8b5cf6]">Nivel CEFR Actual</Label>
              <Select defaultValue="b1">
                <SelectTrigger className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent className="border-[#63B3ED]/20">
                  {languageLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                Guardar Cambios
              </Button>
            </motion.div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

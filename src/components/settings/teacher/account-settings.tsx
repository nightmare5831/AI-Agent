'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User, Mail, BookOpen, Award, FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeFirst, getInitials } from '@/lib/utils';
import { useAuth } from '@/core/auth/AuthProvider';
import { motion } from 'framer-motion';

export function TeacherAccountSettings() {
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
    <div className="space-y-6">
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
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/assets/images/avatars/sarah.png"
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-[#63B3ED]/80 to-[#d32f2f]/80 text-white">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-[#63B3ED]/20 hover:bg-[#63B3ED]/10 hover:text-[#63B3ED]"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-medium text-[#63B3ED]">
                  {capitalizeFirst(profile?.full_name) || 'Your Profile'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click the camera icon to update your photo
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#63B3ED]" /> Nombre Completo
                </Label>
                <Input
                  id="name"
                  defaultValue={capitalizeFirst(profile?.full_name)}
                  className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#63B3ED]" /> Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={profile?.email} 
                  className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#63B3ED]" /> Título Profesional
                </Label>
                <Input 
                  id="title" 
                  defaultValue="English Language Teacher" 
                  className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization" className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#63B3ED]" /> Especialización
                </Label>
                <Select defaultValue="esl">
                  <SelectTrigger 
                    id="specialization"
                    className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0 bg-white"
                  >
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="esl">ESL/EFL</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="business">Business English</SelectItem>
                    <SelectItem value="academic">Academic English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#63B3ED]" /> Biografía Profesional
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your teaching experience and approach"
                  className="h-32 border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-end px-6 py-4 bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5">
          <Button className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all hover:shadow-md">
            Guardar Cambios
          </Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#63B3ED]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
              Credenciales de Enseñanza
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
            <motion.div variants={itemVariants} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="qualification" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#63B3ED]" /> Calificación más Alta
                </Label>
                <Select defaultValue="masters">
                  <SelectTrigger 
                    id="qualification"
                    className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0 bg-white"
                  >
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="certifications" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#63B3ED]" /> Certificaciones de Enseñanza
                </Label>
                <Input
                  id="certifications"
                  placeholder="e.g., CELTA, DELTA, TESOL"
                  className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#63B3ED]" /> Años de Experiencia
                </Label>
                <Input 
                  id="experience" 
                  type="number" 
                  min="0" 
                  defaultValue="5" 
                  className="border-[#63B3ED]/20 focus-visible:ring-[#63B3ED]/30 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-end px-6 py-4 bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5">
          <Button className="bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-white hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all hover:shadow-md">
            Actualizar Credenciales
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

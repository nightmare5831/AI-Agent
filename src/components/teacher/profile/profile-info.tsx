'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/core/auth/AuthProvider';
import { capitalizeFirst } from '@/lib/utils';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export function TeacherProfileInfo() {
  const [{ profile }] = useAuth();
  
  const inputVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Información Profesional
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          custom={0}
        >
          <Label htmlFor="name" className="text-[#8b5cf6]">Nombre Completo</Label>
          <Input 
            id="name" 
            defaultValue={capitalizeFirst(profile?.full_name)} 
            className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          custom={1}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="email" className="text-[#8b5cf6]">Email</Label>
          <Input 
            id="email" 
            type="email" 
            defaultValue={profile?.email} 
            className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          custom={2}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="specialization" className="text-[#8b5cf6]">Especialización</Label>
          <Input 
            id="specialization" 
            defaultValue="ESL, Business English" 
            className="border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          custom={3}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="bio" className="text-[#8b5cf6]">Biografía Profesional</Label>
          <Textarea
            id="bio"
            className="h-24 border-[#63B3ED]/20 focus:border-[#63B3ED] focus:ring-[#63B3ED]/20 transition-all duration-300"
            placeholder="Escribe una breve biografía sobre tu experiencia docente..."
          />
        </motion.div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 p-4">
        <motion.div 
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] hover:from-[#63B3ED]/90 hover:to-[#d32f2f]/90 transition-all duration-300"
          >
            Guardar Cambios
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}

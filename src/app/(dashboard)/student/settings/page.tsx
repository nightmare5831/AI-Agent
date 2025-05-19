'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentAccountSettings } from '@/components/settings/student/account-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { SettingsHeader } from '@/components/settings/settings-header';
import { motion } from 'framer-motion';

export default function StudentSettingsPage() {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="p-6">
      {/* Fondo con partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              top: `${10 + (i * 10)}%`,
              left: `${5 + (i * 12)}%`,
              backgroundColor:
                i % 4 === 0 ? 'rgba(211,47,47,0.08)' :
                i % 4 === 1 ? 'rgba(147,51,234,0.08)' :
                i % 4 === 2 ? 'rgba(139,92,246,0.08)' :
                'rgba(236,72,153,0.08)',
              opacity: 0.6,
              transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px)`,
              transition: 'transform 3s ease-in-out',
            }}
          ></div>
        ))}
      </div>
      
      {/* Encabezado con gradiente */}
      <div className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 p-6 backdrop-blur-sm">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-3xl font-bold">
          Configuración
        </h1>
        <p className="text-[#8b5cf6] mt-2">Personaliza tu experiencia en la plataforma</p>
      </div>
      
      <motion.div 
        className="mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SettingsHeader />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="account" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-[#63B3ED]/10 to-[#d32f2f]/10 backdrop-blur-sm">
              <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#63B3ED]/20 data-[state=active]:to-[#d32f2f]/20 data-[state=active]:text-[#63B3ED] transition-all duration-300">
                Cuenta
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#63B3ED]/20 data-[state=active]:to-[#d32f2f]/20 data-[state=active]:text-[#63B3ED] transition-all duration-300">
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#63B3ED]/20 data-[state=active]:to-[#d32f2f]/20 data-[state=active]:text-[#63B3ED] transition-all duration-300">
                Apariencia
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#63B3ED]/20 data-[state=active]:to-[#d32f2f]/20 data-[state=active]:text-[#63B3ED] transition-all duration-300">
                Seguridad
              </TabsTrigger>
            </TabsList>
            
            <motion.div 
              className="mt-6 p-1"
              variants={itemVariants}
            >
              <TabsContent value="account" className="transform transition-all duration-500 hover:scale-[1.01]">
                <StudentAccountSettings />
              </TabsContent>
              <TabsContent value="notifications" className="transform transition-all duration-500 hover:scale-[1.01]">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="appearance" className="transform transition-all duration-500 hover:scale-[1.01]">
                <AppearanceSettings />
              </TabsContent>
              <TabsContent value="security" className="transform transition-all duration-500 hover:scale-[1.01]">
                <SecuritySettings />
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

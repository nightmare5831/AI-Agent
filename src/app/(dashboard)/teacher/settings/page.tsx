'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherAccountSettings } from '@/components/settings/teacher/account-settings';
import { TeacherClassSettings } from '@/components/settings/teacher/class-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { SettingsHeader } from '@/components/settings/settings-header';
import { motion } from 'framer-motion';
import { User, Users, Bell, Palette, Shield } from 'lucide-react';

export default function TeacherSettingsPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <SettingsHeader />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-5 bg-[#9333ea]/10 p-1">
              <TabsTrigger 
                value="account" 
                className="flex items-center gap-2 data-[state=active]:bg-[#9333ea] data-[state=active]:text-white"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger 
                value="class" 
                className="flex items-center gap-2 data-[state=active]:bg-[#9333ea] data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Class</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center gap-2 data-[state=active]:bg-[#9333ea] data-[state=active]:text-white"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="flex items-center gap-2 data-[state=active]:bg-[#9333ea] data-[state=active]:text-white"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center gap-2 data-[state=active]:bg-[#9333ea] data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <TabsContent value="account">
                <TeacherAccountSettings />
              </TabsContent>
              <TabsContent value="class">
                <TeacherClassSettings />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="appearance">
                <AppearanceSettings />
              </TabsContent>
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { AssignmentsList } from '@/components/student/assignments/assignments-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssessmentPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <div className="container mx-auto p-6">
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
          />
        ))}
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        {/* Encabezado con banner de gradiente */}
        <motion.div 
          className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] p-1"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          <div className="relative bg-black/20 backdrop-blur-sm rounded-lg p-6 overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#63B3ED]/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#d32f2f]/20 blur-2xl" />
            
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white">Student <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Assessments</span></h1>
              <p className="text-white/70 mt-2">
                Track and complete your language assessments
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="in-progress">
            <TabsList className="mb-4 grid w-full max-w-md grid-cols-3 bg-[#63B3ED]/10 p-1">
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-[#63B3ED] data-[state=active]:text-white">In Progress</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-[#63B3ED] data-[state=active]:text-white">Completed</TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-[#63B3ED] data-[state=active]:text-white">All</TabsTrigger>
            </TabsList>

            <motion.div variants={itemVariants}>
              <TabsContent value="in-progress">
                <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md transform transition-all duration-500 hover:scale-[1.01]">
                  <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#63B3ED]" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">In Progress Assessments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AssignmentsList
                      selectedStatus="in-progress"
                      selectedType="assessment"
                      searchQuery=""
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TabsContent value="completed">
                <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md transform transition-all duration-500 hover:scale-[1.01]">
                  <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#63B3ED]" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">Completed Assessments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AssignmentsList
                      selectedStatus="completed"
                      selectedType="assessment"
                      searchQuery=""
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TabsContent value="all">
                <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md transform transition-all duration-500 hover:scale-[1.01]">
                  <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#63B3ED]" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">All Assessments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AssignmentsList
                      selectedStatus="all"
                      selectedType="assessment"
                      searchQuery=""
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

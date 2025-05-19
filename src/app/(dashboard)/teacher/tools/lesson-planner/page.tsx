'use client';

import { LessonPlanDisplay } from '@/components/teacher/tools/lesson-planner/lesson-plan-display';
import { LessonPlannerForm } from '@/components/teacher/tools/lesson-planner/lesson-planner-form';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LessonPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  const handleGeneratePlan = async (formData: any) => {
    try {
      setIsLoading(true);
      setStreamedText('');
      const response = await fetch('/api/lesson-planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson plan');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let isDone = false;
      while (!isDone) {
        const { value, done } = await reader.read();
        if (done) {
          isDone = true;
          break;
        }
        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsLoading(false);
              break;
            }

            try {
              const { content } = JSON.parse(data);
              setStreamedText((prev) => prev + content);
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
      if (!reader) {
        throw new Error('No reader available');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#030712] min-h-screen">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="mb-8 flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-[#0c0f18] p-6 rounded-xl border border-purple-200/50 dark:border-purple-900/30 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-3 shadow-md shadow-purple-500/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">AI Lesson Planner</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Generate detailed lesson plans powered by AI with customized content for your students
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 border-purple-200/50 bg-white shadow-xl dark:border-purple-900/30 dark:bg-[#0c0f18] dark:shadow-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-20"></div>
              <div className="relative z-10">
                <LessonPlannerForm
                  onSubmit={handleGeneratePlan}
                  isLoading={isLoading}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 border-purple-200/50 bg-white shadow-xl dark:border-purple-900/30 dark:bg-[#0c0f18] dark:shadow-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Lesson Plan Preview</h2>
                <LessonPlanDisplay plan={streamedText} isLoading={isLoading} />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ToolCard } from './tool-card';
import { tools } from '@/lib/data/tools';
import { ToolCategory } from '@/types/tools';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface ToolsGridProps {
  selectedCategory: ToolCategory | 'all';
  searchQuery: string;
}

export function ToolsGrid({ selectedCategory, searchQuery }: ToolsGridProps) {
  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredTools.length === 0) {
    return (
      <motion.div 
        className="rounded-lg border border-[#63B3ED]/10 bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 p-8 text-center shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <Search className="h-10 w-10 text-[#63B3ED]/50" />
          <p className="text-[#8b5cf6]">
            No se encontraron herramientas que coincidan con tus criterios
          </p>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {filteredTools.map((tool, index) => (
        <motion.div 
          key={tool.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1] 
              }
            }
          }}
        >
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </motion.div>
  );
}

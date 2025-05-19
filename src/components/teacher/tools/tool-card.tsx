'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tool } from '@/types/tools';
import { toolCategories, toolIcons } from '@/lib/data/tools';
import { Wrench, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Variantes para animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    hover: { 
      y: -5,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.2 }
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -5, 0],
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };
  const category = toolCategories[tool.category];
  const Icon = toolIcons[tool.icon] || Wrench;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover="hover"
    >
    <Card className="p-4 border border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className="rounded-full bg-[#63B3ED]/10 p-2"
            variants={iconVariants}
            whileHover="hover"
          >
            <Icon className="h-5 w-5 text-[#63B3ED]" />
          </motion.div>
          <div>
            <motion.h3 
              className="font-semibold gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {tool.name}
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {tool.description}
            </motion.p>
          </div>
        </div>
        {tool.isPremium && 
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Badge variant="success" className="bg-[#d32f2f]/10 text-[#d32f2f] border-[#d32f2f]/30">
              Premium
            </Badge>
          </motion.div>
        }
      </div>
      <div className="mt-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Badge variant="success" className="flex items-center gap-1 bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#2B6CB0]">
          {category && <category.icon className="h-3 w-3" />}
          {category?.label}
        </Badge>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button asChild className="bg-[#d32f2f] hover:bg-[#d32f2f]/90 text-white">
            <Link href={tool.url} className="flex items-center gap-1">
              <span>Open Tool</span>
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 1 }}
              >
                <ArrowRight className="ml-1 h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </Card>
    </motion.div>
  );
}

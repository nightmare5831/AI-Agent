'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import LanguageSelector from '@/components/language-selector';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { adminItems, userItems } from '@/lib/constants/navigation';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/language-selector';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'admin' | 'user';
}

export function Sidebar({ open, onOpenChange, type }: SidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  // Animation variants
  const sidebarVariants = {
    open: { width: '16rem', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
    closed: { width: '4rem', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const iconVariants = {
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  const items = type === 'admin' ? adminItems : userItems;

  return (
    <div className="relative">
      <motion.div
        className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-background border-r border-[#d32f2f]/10 font-medium"
        animate={open ? 'open' : 'closed'}
        variants={sidebarVariants}
        initial={false}
      >
        <ScrollArea className="flex h-full flex-col">
          <div className="flex-1 space-y-2 p-4">
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start transition-all duration-300',
                      !open && 'justify-center px-0',
                      pathname === item.href ? 
                        'bg-gradient-to-r from-[#d32f2f]/10 to-[#ec4899]/10 text-[#63B3ED] font-medium' : 
                        'hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]'
                    )}
                  >
                    <motion.div
                      whileHover="hover"
                      variants={iconVariants}
                      className={pathname === item.href ? 'text-[#63B3ED]' : ''}
                    >
                      <item.icon className={cn('h-5 w-5', open ? 'mr-2' : 'm-0')} />
                    </motion.div>
                    {open && <span className="truncate text-sm max-w-[12rem] inline-block">{item.title}</span>}
                    {!open && <span className="sr-only">{item.shortTitle}</span>}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-[#d32f2f]/10 p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              custom={items.length}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start transition-all duration-300',
                  !open && 'justify-center px-0',
                  'hover:bg-[#63B3ED]/5 hover:text-[#63B3ED]'
                )}
              >
                <motion.div
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Settings className={cn('h-5 w-5 text-[#ec4899]', open ? 'mr-2' : 'm-0')} />
                </motion.div>
                {open && <span className="truncate text-sm max-w-[12rem] inline-block">{t('sidebar.settings')}</span>}
              </Button>
            </motion.div>
          </div>
          <LanguageSelector />
        </ScrollArea>
      </motion.div>
      
      {/* Botón para colapsar/expandir el sidebar */}
      <div 
        className="fixed z-40 transition-all duration-500" 
        style={{ 
          left: open ? 'calc(16rem - 1.25rem)' : 'calc(4rem - 1.25rem)', 
          top: '5rem', 
          transition: 'left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)' 
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background shadow-md hover:bg-background/90 border border-[#d32f2f]/10"
            onClick={() => onOpenChange(!open)}
          >
            {open ? <ChevronLeft className="h-4 w-4 text-[#d32f2f]" /> : <ChevronRight className="h-4 w-4 text-[#d32f2f]" />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

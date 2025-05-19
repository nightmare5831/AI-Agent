'use client';

import { FileText, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function GenerationMode() {
  const [activeTab, setActiveTab] = useState('paste');
  const [activityText, setActivityText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setActivityText(text);
    setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <Card className="p-6 border-[#d32f2f]/10 bg-background/80 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-[#63B3ED]"
          >
            <FileText className="h-5 w-5" />
          </motion.div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[#d32f2f] to-[#ec4899] text-transparent bg-clip-text">
            Modo de Generación
          </h2>
        </div>

        <Tabs defaultValue="paste" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-[#63B3ED]/10">
            <TabsTrigger 
              value="paste" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d32f2f]/20 data-[state=active]:to-[#ec4899]/20 data-[state=active]:text-[#63B3ED] data-[state=active]:shadow-sm"
            >
              Escribir o Pegar
            </TabsTrigger>
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d32f2f]/20 data-[state=active]:to-[#ec4899]/20 data-[state=active]:text-[#63B3ED] data-[state=active]:shadow-sm"
            >
              Subir Contenido
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#8b5cf6] font-medium">Pega tu texto de actividad aquí (límite 800 palabras)</Label>
              <Textarea 
                placeholder="Pega tu actividad aquí..." 
                className="min-h-[200px] border-[#63B3ED]/30 focus-visible:ring-[#63B3ED]/50"
                value={activityText}
                onChange={handleTextChange}
              />
              <div className="text-right text-sm text-muted-foreground">
                {wordCount}/800 palabras
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-[#63B3ED]/30 rounded-lg p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center"
              >
                <Upload className="h-10 w-10 text-[#63B3ED]/70 mb-2" />
                <p className="text-lg font-medium text-[#63B3ED]">Arrastra archivos aquí</p>
                <p className="text-sm text-muted-foreground mb-4">o haz clic para seleccionar</p>
                <Button 
                  variant="outline" 
                  className="border-[#63B3ED]/30 text-[#63B3ED] hover:bg-[#63B3ED]/10 hover:text-[#63B3ED] hover:border-[#63B3ED]/50"
                >
                  Seleccionar archivo
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Actualiza tu plan para desbloquear la carga de archivos
                </p>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}

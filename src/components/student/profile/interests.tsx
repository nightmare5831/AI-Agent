'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { MultiSelect } from '@/components/ui/multi-select';
import { studentInterests } from '@/lib/data/interests';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function StudentInterests() {
  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-[#d32f2f]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
            Intereses
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MultiSelect
            options={studentInterests}
            defaultValue={['sports', 'music']}
            placeholder="Selecciona tus intereses"
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
            Actualizar Intereses
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}

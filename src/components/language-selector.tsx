'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { languageFlags } from '@/lib/data/flags';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useState, createContext, useContext, useEffect } from 'react';

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: 'de',
  setSelectedLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState('de');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (
      savedLanguage &&
      languageFlags.some((lang) => lang.code === savedLanguage)
    ) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
    } catch (error) {
      console.warn(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default function FlagSelector() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const selectedFlag = languageFlags.find((l) => l.code === selectedLanguage);

  return (
    <div className="absolute bottom-5 left-[10%] flex items-end gap-2">
      <div className="relative mt-7 flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-2 hover:bg-transparent"
              id="options"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={selectedFlag?.flag || ''}
                  alt={selectedFlag?.name || ''}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="ml-2">{selectedFlag?.name}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="grid gap-2">
              {languageFlags.map((lang) => (
                <Button
                  key={lang.code}
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2 p-2"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span className="flex-1">{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

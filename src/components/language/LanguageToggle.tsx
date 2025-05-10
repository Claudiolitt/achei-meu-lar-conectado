
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { toast } from '@/components/ui/sonner';

// This is a simplified language switcher
// In a real application, this would be connected to i18n libraries like i18next or react-intl

const LANGUAGES = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
];

export function LanguageToggle() {
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);

  const handleLanguageChange = (language: typeof LANGUAGES[0]) => {
    setCurrentLanguage(language);
    
    // In a real app, this would switch the application language
    // For now, we'll just show a toast message
    toast.info(`Idioma alterado para ${language.name}`);
    
    // Store the language preference in localStorage for demonstration
    localStorage.setItem('preferred-language', language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-visible:ring-0">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Alterar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map(language => (
          <DropdownMenuItem 
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={currentLanguage.code === language.code ? "bg-muted" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageToggle;

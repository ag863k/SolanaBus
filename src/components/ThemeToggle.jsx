
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/ui/use-toast';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    toast({
      title: `Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`,
      duration: 1500,
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 transition-transform duration-500 rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-500 rotate-90 scale-0" />
      )}
       <Sun className="absolute h-5 w-5 transition-transform duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
       <Moon className="absolute h-5 w-5 transition-transform duration-500 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
  
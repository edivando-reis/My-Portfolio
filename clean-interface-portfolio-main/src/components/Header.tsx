
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled 
          ? (theme === 'dark' 
              ? "bg-background/80 backdrop-blur-md border-b border-border/10" 
              : "bg-white/80 backdrop-blur-md shadow-sm") 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl font-display font-bold tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Edivando Reis
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {['sobre', 'experiência', 'habilidades', 'formação', 'contato'].map(item => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <Toggle 
            variant="outline" 
            size="sm" 
            pressed={theme === 'dark'}
            onPressedChange={toggleTheme}
            className="rounded-full w-8 h-8 p-0 border-border/40 hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="transition-all" />
            ) : (
              <Moon size={16} className="transition-all" />
            )}
          </Toggle>
        </div>

        <div className="flex md:hidden items-center gap-4">
          {/* Theme Toggle (Mobile) */}
          <Toggle 
            variant="outline" 
            size="sm" 
            pressed={theme === 'dark'}
            onPressedChange={toggleTheme}
            className="rounded-full w-8 h-8 p-0 border-border/40 hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="transition-all" />
            ) : (
              <Moon size={16} className="transition-all" />
            )}
          </Toggle>

          {/* Mobile Menu Button */}
          <button 
            className="p-2 focus:outline-none z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span 
                className={cn(
                  "bg-foreground h-0.5 rounded-full transition-all duration-300",
                  mobileMenuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                )}
              />
              <span 
                className={cn(
                  "bg-foreground h-0.5 rounded-full transition-all duration-300",
                  mobileMenuOpen ? "opacity-0" : "w-4 opacity-100"
                )}
              />
              <span 
                className={cn(
                  "bg-foreground h-0.5 rounded-full transition-all duration-300",
                  mobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div 
          className={cn(
            "fixed inset-0 bg-background flex flex-col items-center justify-center transition-all duration-500 md:hidden",
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <nav className="flex flex-col items-center space-y-6">
            {['sobre', 'experiência', 'habilidades', 'formação', 'contato'].map(item => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xl font-medium hover:text-accent transition-colors capitalize py-2"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

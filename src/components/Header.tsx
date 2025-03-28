import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage, Language } from '@/providers/LanguageProvider';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm dark:bg-background/80'
          : 'py-5 bg-b'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight text-foreground">
            Edivando Reis
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('about')}
            </a>
            <a
              href="#experience"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('experience')}
            </a>
            <a
              href="#projects"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('projects')}
            </a>
            <a
              href="#skills"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('skills')}
            </a>
            <a
              href="#education"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('education')}
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('contact')}
            </a>
          </nav>

          {/* Theme Toggle & Menu Button */}
          <div className="flex items-center space-x-4 ">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/80 hover:bg-muted transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-foreground/80 hover:bg-muted transition-colors"
              aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <span className="text-sm font-medium">
                {language === 'pt' ? (
                  <span className="flex items-center text-blue-600">PT</span>
                ) : (
                  <span className="flex items-center text-green-600">EN</span>
                )}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full text-foreground/80 hover:bg-muted transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
  className={`md:hidden fixed inset-0 bg-background dark:bg-background z-50 transition-transform duration-300 ease-in-out ${
    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
        <div className="flex flex-col h-full pt-6 px-6">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="self-end p-2 rounded-full text-foreground/80 hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col space-y-6 items-center mt-10">
            <a
              href="#about"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('about')}
            </a>
            <a
              href="#experience"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('experience')}
            </a>
            <a
              href="#skills"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('skills')}
            </a>
            <a
              href="#projects"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('projects')}
            </a>
            <a
              href="#education"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('education')}
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="text-xl font-medium text-foreground/80 hover:text-accent transition-colors"
            >
              {t('contact')}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
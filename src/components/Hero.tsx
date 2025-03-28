import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useLanguage } from '@/providers/LanguageProvider';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (textContainerRef.current) {
      observer.observe(textContainerRef.current);
    }

    return () => {
      if (textContainerRef.current) {
        observer.unobserve(textContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - Math.min(scrollPosition / 500, 1);
      const translateY = scrollPosition * 0.4;
      
      if (textContainerRef.current) {
        textContainerRef.current.style.opacity = String(opacity);
        textContainerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
      id="about"
    >
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px] opacity-60" />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div 
        ref={textContainerRef}
        className="container px-6 max-w-4xl mx-auto text-center relative z-10 appear-animation transition-all duration-700 ease-out"
      >
        <p className="text-accent font-medium mb-4 animate-fade-in">{t('frontend.developer')}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 stagger-delay-1">
          Edivando Reis
        </h1>
        <p className="text-[15px] md:text-[18px] text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed stagger-delay-2">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-delay-3">
          <button 
            onClick={() => {
              const element = document.getElementById('experience');
              if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
              }
            }}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
          >
            {t('view.experience')}
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
              }
            }}
            className="px-8 py-3 rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('contact')}
          </button>
        </div>
      </div>

      {/* Down arrow animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-6 border-r-2 border-b-2 border-foreground/40 transform rotate-45 inline-block"></div>
      </div>
    </div>
  );
};

export default Hero;

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useTheme } from '@/providers/ThemeProvider';

const Index: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Update the document title
    document.title = "Portfolio Edivando Reis";
    
    // Intersection Observer to handle section animations
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    // Create grid pattern for background texture
    const createGridPattern = () => {
      const patternDiv = document.createElement('div');
      patternDiv.className = 'absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]';
      document.getElementById('sobre')?.appendChild(patternDiv);

      const style = document.createElement('style');
      style.innerHTML = `
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .dark .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `;
      document.head.appendChild(style);
    };

    createGridPattern();
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

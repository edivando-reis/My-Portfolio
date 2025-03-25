
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';

interface SkillCategory {
  name: string;
  nameKey: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Linguagens",
    nameKey: "languages",
    skills: ["HTML5", "CSS3/SASS", "JavaScript (ES6+)", "TypeScript", "Python", "Java"]
  },
  {
    name: "Frameworks/Bibliotecas",
    nameKey: "frameworks.libraries",
    skills: ["React", "Next.js", "Angular", "Vite", "TailwindCSS", "Bootstrap"]
  },
  {
    name: "Ferramentas",
    nameKey: "tools",
    skills: ["Git", "Webpack", "npm/yarn", "Jest", "ESLint", "VS Code"]
  },
  {
    name: "Outros",
    nameKey: "others",
    skills: ["Responsive Design", "SEO", "Google Analytics", "UX/UI Design", "Performance Optimization", "Acessibilidade Web"]
  }
];

// English translations for some specific skills
const skillsEnTranslations: Record<string, string> = {
  "Acessibilidade Web": "Web Accessibility",
  "Responsive Design": "Responsive Design",
  "Performance Optimization": "Performance Optimization"
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    categoryRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      categoryRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  // Translate skill if needed
  const translateSkill = (skill: string): string => {
    if (language === 'en' && skillsEnTranslations[skill]) {
      return skillsEnTranslations[skill];
    }
    return skill;
  };

  return (
    <section 
      id="habilidades" 
      ref={sectionRef}
      className="py-20 px-6 section"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-heading">{t('technical.skills')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {skillsData.map((category, index) => (
            <div 
              key={index}
              ref={el => categoryRefs.current[index] = el}
              className={cn(
                "section rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300",
                theme === 'dark' 
                  ? 'bg-secondary/50 backdrop-blur-sm' 
                  : 'bg-white'
              )}
            >
              <h3 className="text-xl font-bold mb-6 text-center pb-3 border-b border-border/30">{t(category.nameKey)}</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="skill-badge"
                    style={{
                      transitionDelay: `${skillIndex * 50}ms`,
                      transform: 'translateY(10px)',
                      opacity: 0,
                      animation: `fade-in 0.5s ease-out forwards ${index * 100 + skillIndex * 50}ms`
                    }}
                  >
                    {translateSkill(skill)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
import React, { useEffect, useRef, useState } from 'react';
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
    skills: ["HTML5", "CSS3/SASS", "JavaScript (ES6+)", "PHP", "TypeScript", "Python", "Java", "C#"]
  },
  {
    name: "Frameworks/Bibliotecas",
    nameKey: "frameworks.libraries",
    skills: ["React", "Next.js", "Angular", "Vite", "TailwindCSS", "Bootstrap", "jQuery", "Express", "Laravel", "Django", "Flask", "Spring Boot"]
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
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []); // No dependencies to prevent re-running on theme change

  // Translate skill if needed
  const translateSkill = (skill: string): string => {
    if (language === 'en' && skillsEnTranslations[skill]) {
      return skillsEnTranslations[skill];
    }
    return skill;
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-6 section"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-heading">{t('technical.skills')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {skillsData.map((category, index) => (
            <div 
              key={index}
              className={cn(
                "skill-category rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300",
                isVisible ? "active" : "",
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
                    className="skill-badge text-center"
                    style={{
                      transitionDelay: `${skillIndex * 50}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
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

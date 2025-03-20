
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EducationItem {
  course: string;
  institution: string;
  location: string;
  period: string;
}

const educationData: EducationItem[] = [
  {
    course: "C#",
    institution: "Microsoft",
    location: "São Paulo",
    period: "02/2025 - Cursando"
  },
  {
    course: "Java",
    institution: "Udemy",
    location: "São Paulo",
    period: "01/2024 - 03/2024"
  },
  {
    course: "Ciências da Computação",
    institution: "Universidade Estácio de Sá",
    location: "São Paulo",
    period: "02/2023 - Cursando"
  },
  {
    course: "Python",
    institution: "XP Educação",
    location: "São Paulo",
    period: "11/2022 - 01/2023"
  },
  {
    course: "React.js Next.js Node.js",
    institution: "Udemy",
    location: "São Paulo",
    period: "06/2022 - 08/2022"
  },
  {
    course: "Desenvolvedor Full Stack",
    institution: "Udemy",
    location: "São Paulo",
    period: "04/2022 - 06/2022"
  },
  {
    course: "JavaScript",
    institution: "Udemy",
    location: "São Paulo",
    period: "01/2022 - 03/2022"
  },
  {
    course: "Web Developer",
    institution: "Udemy",
    location: "São Paulo",
    period: "10/2020 - 12/2020"
  },
  {
    course: "SEO para Desenvolvedores",
    institution: "Udemy",
    location: "São Paulo",
    period: "09/2020 - 09/2020"
  }
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      itemRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section 
      id="formação" 
      ref={sectionRef}
      className="py-20 px-6 bg-secondary/30 section"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-heading">Formação Acadêmica</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {educationData.map((item, index) => (
            <div 
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="section bg-white rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:translate-y-[-5px] transition-all duration-300"
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-bold mb-1 text-[black]">{item.course}</h3>
                <p className="text-accent font-medium">{item.institution}</p>
                <p className="text-sm text-muted-foreground">{item.location}</p>
                <div className="mt-auto pt-4">
                  <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">{item.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

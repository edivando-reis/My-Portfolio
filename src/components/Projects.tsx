import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  category: string;
  tech: string;
  link: string;
  image: string;
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  
  // Dados em Português
  const projectsDataPt = {
    projects: [
      {
        id: 1,
        title: "Felipe Ramalho",
        description: "Este portfólio de arquitetura foi projetado para destacar a estética e precisão das imagens capturadas. O site apresenta um design limpo e minimalista, valorizando as fotografias com layout organizado e navegação intuitiva.",
        year: "2025",
        category: "Desenvolvimento Web, Design, Ideia",
        tech: "TypeScript, React e Tailwind CSS.",
        link: "https://feliperamalhofotografia.netlify.app/",
        image: "/assets/felipeScreen.jpg"
      },
      {
        id: 2,
        title: "Meu Portfólio",
        description: "Meu portfólio foi desenvolvido para apresentar projetos e habilidades de forma profissional e engajadora. Com design moderno e responsivo, oferece navegação intuitiva que destaca as principais competências e trabalhos realizados.",
        year: "2025",
        category: "Desenvolvimento Web, Design, Ideia",
        tech: "React, Tailwind CSS e Typescript.",
        link: "https://portfolio-edivando-reis.netlify.app/",
        image: "/assets/portScreen.jpg"
      },
      {
        id: 3,
        title: "Ateliê Rudá",
        description: "Este e-commerce foi desenvolvido utilizando Wix Studio, garantindo uma experiência visual sofisticada e funcional. O design segue uma abordagem minimalista e elegante, com tipografia refinada e espaçamentos bem distribuídos.",
        year: "2024",
        category: "Desenvolvimento",
        tech: "e-commerce, Wix Studio.",
        link: "https://ruda.art.br/",
        image: "/assets/rudaScreen.jpg"
      },
      {
        id: 4,
        title: "Insep",
        description: "O site do INSEP foi desenvolvido para oferecer uma experiência acessível e intuitiva, com foco na formação de especialistas em acessibilidade digital. Reflete a missão de inclusão da plataforma com design moderno.",
        year: "2023",
        category: "Desenvolvimento Web",
        tech: "React, Vite e Tailwind CSS.",
        link: "https://insep.org.br/",
        image: "/assets/insepScreen.jpg"
      }
    ],
    links: {
      details: "Veja o projeto"
    }
  };

  // Dados em Inglês
  const projectsDataEn = {
    projects: [
      {
        id: 1,
        title: "Felipe Ramalho",
        description: "This architectural photography portfolio is designed to highlight the aesthetics and accuracy of the images captured. The site features a clean and minimalist design, valuing photographs with an organized layout and intuitive navigation.",
        year: "2025",
        category: "Web Development, Design, Idea",
        tech: "TypeScript, React, and Tailwind CSS.",
        link: "https://feliperamalhofotografia.netlify.app/",
        image: "/assets/felipeScreen.jpg"
      },
      {
        id: 2,
        title: "My Portfolio",
        description: "My portfolio is designed to present the author's projects and skills in a professional and engaging way. With a modern and responsive design, the site offers intuitive navigation that highlights the main skills and work done.",
        year: "2025",
        category: "Web Development, Design, Idea",
        tech: "React, Tailwind CSS and Typescript.",
        link: "https://portfolio-edivando-reis.netlify.app/",
        image: "/assets/portScreen.jpg"
      },
      {
        id: 3,
        title: "Ateliê Rudá",
        description: "This e-commerce was developed using Wix Studio, ensuring a sophisticated and functional visual experience. The site's design follows a minimalist and elegant approach, with refined typography and well-distributed spacing to provide fluid navigation.",
        year: "2024",
        category: "Development",
        tech: "e-commerce, Wix Studio.",
        link: "https://ruda.art.br/",
        image: "/assets/rudaScreen.jpg"
      },
      {
        id: 4,
        title: "Insep",
        description: "The INSEP website was developed to offer an accessible and intuitive experience, focused on training specialists in digital accessibility. With a modern and engaging design, it reflects the platform's mission of inclusion and empowerment.",
        year: "2023",
        category: "Web Development",
        tech: "React, Vite and Tailwind CSS.",
        link: "https://insep.org.br/",
        image: "/assets/insepScreen.jpg"
      }
    ],
    links: {
      details: "See the project"
    }
  };

  const projectsData = language === 'en' ? projectsDataEn : projectsDataPt;

  return (
    <section id="projects" className="section py-20 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="section-heading">{language === 'en' ? 'Projects' : 'Projetos'}</h2>
        
        <div className="mt-12">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {projectsData.projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="bg-card dark:bg-secondary/30 border-border/50 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-8 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
                            <div className="text-sm text-muted-foreground mb-2">{project.category}</div>
                            <div className="text-sm text-accent font-semibold mb-4">{project.year}</div>
                            <p className="text-foreground/90 mb-6">{project.description}</p>
                            <p className="text-sm text-muted-foreground">{project.tech}</p>
                          </div>
                          <div className="mt-6">
                            <Link 
                              to={project.link} 
                              className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {projectsData.links.details} 
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                        <div className="bg-black flex items-center justify-center p-4 lg:p-8">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-auto rounded shadow-md"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative static left-0 right-0 mx-2 translate-y-0" />
              <CarouselNext className="relative static left-0 right-0 mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;


import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

// Chronological job data (newest to oldest)
const jobsData: Job[] = [
 /*  {
    title: "Desenvolvedor Front End",
    company: "ONG-Insep",
    location: "São Paulo",
    period: "12/2023 – 02/2024",
    description: [
      "Participação em uma equipe de desenvolvimento Front-end para um projeto da ONG INSEP. ",
      "Responsável pela implementação do site, priorizando acessibilidade para PCDs. ",
      "Desenvolvimento seguindo as diretrizes da equipe de UI/UX no Figma.",
      "Otimizei o desempenho das páginas web, melhorando tempos de carregamento e SEO."
    ]
  }, */
  {
    title: "Desenvolvedor Front End",
    company: "Muni Startup",
    location: "São Paulo",
    period: "06/2022 – Atual",
    description: [
      "Desenvolvi e mantive interfaces de usuário responsivas utilizando HTML, CSS e JavaScript.",
      "Colaborei com designers e desenvolvedores back-end para criar aplicações web dinâmicas.",
      "Implementação de componentes reutilizáveis ​​em React para otimização o desenvolvimento.",
      "Realizei testes unitários e de integração para garantir a qualidade do código.",
      
    ]
  },
  {
    title: "Supervisor de e-commerce",
    company: "Casa Dos Bateristas",
    location: "São Paulo",
    period: "05/2021 - 04/2022",
    description: [
      "Gerenciar plataformas de e-commerce, Tray, Loja Integrada e Mercado Livre.",
      "Desenvolvimento em HTML, CSS e Javascript",
      "Ações de marketing, manutenção e criação de lojas em redes sociais, Facebook, Instagram.",
      "Criação, atualização de lista de produtos, banco de imagens e atendimento ao cliente."
    ]
  },
  {
    title: "Cozinheiro, Proprietário",
    company: "Pocoloco   ",
    location: "Sorriso-MT",
    period: "06/2017 - 02/2020",
    description: [
      "Plano de negócios, pesquisa de mercado, marketing e desenvolvimento de negócios.",
      "Monitoramento e planejamento Google ADWORDS, anúncios Facebook ADS.",
      "Criação de materiais digitais e impressos para divulgação.",
      "Cotação de produtos, criação de receitas, cozinheiro.",
      "Criação de página em Html, CSS e Javascript."
    ]
  },
  {
    title: "Design gráfico",
    company: "Target",
    location: "Sorriso-MT",
    period: "03/2016 - 05/2017",
    description: [
      "Manutenção em computadores e softwares, cabeamento, configurações de rede.",
      "Planejamento de campanhas de marketing, gerenciamento de rede social.",
      "Criação de sites para clientes, planejamento de comunicação.",
      "Materiais gráficos, criação e edição de vídeos, criação de identidade visual."
    ]
  },
  {
    title: "Analista de Suporte",
    company: "Ofcdesk LLc",
    location: "São Paulo",
    period: "11/2009 - 04/2015",
    description: [
      "Atendimento a clientes, suporte de softwares, AutoCad, Revit, ofcdeskcad.",
      "Configuração de VPN, SIP, Firewall, SQL, análise Google ADWORDS.",
      "Pesquisa de palavras chaves, criação de anúncios, monitoramento de resultados.",
      "Condução ou gestão ou execução de operações diárias de backup."
    ]
  },
  
  {
    title: "assistente de service desk",
    company: "cpm braxis",
    location: "São paulo",
    period: "05/2007 - 01/2009",
    description: [
      "instalação e configuração de componentes de hardware e software para garantir a usabilidade.",
      "solucionar problemas de hardware e software, reparar ou substituir o hardware danificado.",
      "atualizar todo o sistema de todos os computadores da rede.",
      "fornecer suporte aos usuários e ser o primeiro ponto de contato."
    ]
  }
];

// English translations for job data
const jobsDataEn: Job[] = [
  {
    title: "Front End Developer",
    company: "Muni Startup",
    location: "São Paulo",
    period: "06/2022 – Present",
    description: [
      "Developed and maintained responsive user interfaces using HTML, CSS, and JavaScript.",
      "Collaborated with designers and back-end developers to create dynamic web applications.",
      "Implemented reusable React components to optimize development.",
      "Conducted unit and integration tests to ensure code quality.",
      "Optimized web page performance, improving loading times and SEO."
    ]
  },
  {
    title: "E-commerce Supervisor",
    company: "Casa Dos Bateristas",
    location: "São Paulo",
    period: "05/2021 - 04/2022",
    description: [
      "Managed e-commerce platforms including Tray, Loja Integrada, and Mercado Livre.",
      "Developed using HTML, CSS, and Javascript",
      "Marketing actions, maintenance and creation of stores on social networks, Facebook, Instagram.",
      "Creation, updating of product lists, image database, and customer service."
    ]
  },
  {
    title: "Chef, Owner",
    company: "Pocoloco",
    location: "Sorriso-MT",
    period: "06/2017 - 02/2020",
    description: [
      "Business plan, market research, marketing, and business development.",
      "Monitoring and planning Google ADWORDS, Facebook ADS advertisements.",
      "Creation of digital and printed materials for promotion.",
      "Product quotation, recipe creation, chef.",
      "Creation of web page using HTML, CSS, and Javascript."
    ]
  },
  {
    title: "Graphic Designer",
    company: "Target",
    location: "Sorriso-MT",
    period: "03/2016 - 05/2017",
    description: [
      "Maintenance of computers and software, cabling, network configurations.",
      "Planning of marketing campaigns, social media management.",
      "Creation of websites for clients, communication planning.",
      "Graphic materials, video creation and editing, visual identity creation."
    ]
  },
  {
    title: "Support Analyst",
    company: "Ofcdesk Llc",
    location: "São Paulo",
    period: "11/2009 - 04/2015",
    description: [
      "Customer service, software support for AutoCAD, Revit, ofcdeskcad.",
      "Configuration of VPN, SIP, Firewall, SQL, Google ADWORDS analysis.",
      "Keyword research, ad creation, results monitoring.",
      "Conducting or managing daily backup operations."
    ]
  },
  {
    title: "Service Desk Assistant",
    company: "CPM Braxis S/A",
    location: "São Paulo",
    period: "05/2007 - 01/2009",
    description: [
      "Installation and configuration of hardware and software components to ensure usability.",
      "Troubleshooting hardware and software issues, repairing or replacing damaged hardware.",
      "Updating the entire system of all computers on the network.",
      "Providing support to users and being the first point of contact."
    ]
  }
];


const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const jobCardRefs = useRef<Array<HTMLDivElement | null>>([]);
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

    jobCardRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      jobCardRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  // Get jobs data based on current language
  const jobs = language === 'en' ? jobsDataEn : jobsData;
  
  // Split jobs into two rows
  const firstRowJobs = jobs.slice(0, 3);
  const secondRowJobs = jobs.slice(3);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 px-6 bg-secondary/30 section"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-heading">{t('professional.experience')}</h2>
        
        {/* First row of jobs (newest) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {firstRowJobs.map((job, index) => (
            <div 
              key={`first-row-${index}`}
              className="section"
              ref={el => jobCardRefs.current[index] = el}
            >
              <div className="timeline-card h-full">
                <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                <div className="flex flex-col md:flex-row md:items-center mb-3 gap-1 md:gap-3">
                  <span className="text-accent font-medium">{job.company}</span>
                  <span className="hidden md:block text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{job.period}</p>
                <ul className="space-y-2 text-sm">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/80 mt-1.5 mr-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline separator */}
        <div className="flex justify-center my-10">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
          </div>
        </div>
        
        {/* Second row of jobs (oldest) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondRowJobs.map((job, index) => (
            <div 
              key={`second-row-${index}`}
              className="section"
              ref={el => jobCardRefs.current[index + firstRowJobs.length] = el}
            >
              <div className="timeline-card h-full">
                <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                <div className="flex flex-col md:flex-row md:items-center mb-3 gap-1 md:gap-3">
                  <span className="text-accent font-medium">{job.company}</span>
                  <span className="hidden md:block text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{job.period}</p>
                <ul className="space-y-2 text-sm">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/80 mt-1.5 mr-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
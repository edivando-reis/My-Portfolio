
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

// Chronological job data (newest to oldest)
const jobsData: Job[] = [
  {
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
  },
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
    title: "Design gráfico/programador/TI",
    company: "Target Publicidade e Propaganda",
    location: "Sorriso",
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
  /* {
    title: "assistente de service desk",
    company: "cpm braxis",
    location: "são paulo",
    period: "05/2007 - 01/2009",
    description: [
      "instalação e configuração de componentes de hardware e software para garantir a usabilidade.",
      "solucionar problemas de hardware e software, reparar ou substituir o hardware danificado.",
      "atualizar todo o sistema de todos os computadores da rede.",
      "fornecer suporte aos usuários e ser o primeiro ponto de contato."
    ]
  } */
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const jobCardRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  // Split jobs into two rows
  const firstRowJobs = jobsData.slice(0, 3);
  const secondRowJobs = jobsData.slice(3);

  return (
    <section 
      id="experiência" 
      ref={sectionRef}
      className="py-20 px-6 bg-secondary/30 section"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-heading">Experiência Profissional</h2>
        
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

import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Mail, MessageCircle, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Função para gerar o link de email com parâmetros
  const getEmailLink = () => {
    const subject = encodeURIComponent(
      language === 'en' 
        ? 'Contact from Portfolio' 
        : 'Contato via Portfólio'
    );
    
    const body = encodeURIComponent(
      language === 'en'
        ? 'Hello Edivando,\n\nI would like to talk about...'
        : 'Olá Edivando,\n\nGostaria de conversar sobre...'
    );

    return `mailto:edivando.siqueira@gmail.com?subject=${subject}&body=${body}`;
  };

  // ... (mantenha o useEffect e observer igual)

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-6 section relative overflow-hidden"
    >
      {/* ... (mantenha os elementos de fundo iguais) */}
      
      <div className="container max-w-4xl mx-auto relative z-10">
        <h2 className="section-heading">{language === 'en' ? "Contact" : "Contato"}</h2>
        
        <div className="glass rounded-2xl p-8 md:p-12 mt-16 shadow-lg">
         {/*  <h3 className="text-2xl font-bold text-center mb-8">
            {language === 'en' ? "Let's talk" : "Vamos conversar"}
          </h3> */}
          
          <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
            {/* Email com link otimizado */}
            <a
              href={getEmailLink()}
              className="p-3 rounded-full hover:bg-accent/5 transition-colors group"
              aria-label={language === 'en' ? "Send Email" : "Enviar Email"}
            >
              <Mail className="w-8 h-8 text-foreground/80 group-hover:text-accent transition-colors stroke-1" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5511945487840"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-accent/5 transition-colors group"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-8 h-8 text-foreground/80 group-hover:text-accent transition-colors stroke-1" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/edivando-reis-de-siqueira-1236aa190/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-accent/5 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-8 h-8 text-foreground/80 group-hover:text-accent transition-colors stroke-1" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/DidoReis"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-accent/5 transition-colors group"
              aria-label="GitHub"
            >
              <Github className="w-8 h-8 text-foreground/80 group-hover:text-accent transition-colors stroke-1" />
            </a>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>(11)94548-7840</p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
  
      if (response.ok) {
        toast({
          title: "Mensagem enviada",
          description: "Obrigado por entrar em contato! Responderei em breve.",
        });
        setFormState({ name: '', email: '', message: '' });
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contato" 
      ref={sectionRef}
      className="py-20 px-6 section relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute -right-16 top-20 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] opacity-50" />
      <div className="absolute -left-16 bottom-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] opacity-50" />
      
      <div className="container max-w-4xl mx-auto relative z-10">
        <h2 className="section-heading">Entre em Contato</h2>
        
        <div className="glass rounded-2xl p-8 md:p-10 mt-16 shadow-lg">
          <p className="text-center text-muted-foreground mb-8">
            Tem uma oportunidade ou projeto interessante? Envie uma mensagem e ficarei feliz em conversar!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-border/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-border/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-border/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                placeholder="Sua mensagem..."
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "px-8 py-3 rounded-full bg-accent text-white font-medium transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md disabled:opacity-70 disabled:pointer-events-none min-w-[180px]",
                  isSubmitting && "animate-pulse"
                )}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </div>
          </form>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <a 
              href="mailto:djdidoreis@gmail.com" 
              className="text-accent hover:text-accent/80 transition-colors"
            >
              edivando.siqueira@gmail.com
            </a>
            <span className="hidden md:block text-muted-foreground">•</span>
            <a 
              href="tel:+5511945487840" 
              className="text-accent hover:text-accent/80 transition-colors"
            >
              +55 (11) 94548-7840
            </a>
            <span className="hidden md:block text-muted-foreground">•</span>
            <span className="text-muted-foreground">São Paulo, Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

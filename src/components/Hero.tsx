import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Encontre a propriedade perfeita para você',
      description: 'Milhares de imóveis para comprar ou alugar em todo o Brasil'
    },
    {
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      title: 'Apartamentos modernos e confortáveis',
      description: 'Descubra opções que combinam com seu estilo de vida'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Casas com muito espaço e conforto',
      description: 'Encontre o lar ideal para sua família'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
      title: 'Empreendimentos comerciais de qualidade',
      description: 'Invista em espaços comerciais estratégicos'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Muda a cada 5 segundos
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-navy-950 dark:bg-navy-900" id="main-content">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-3xl text-center mx-auto animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-8 md:mb-10">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              {/* Buttons removed */}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default Hero;

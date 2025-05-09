
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Home, Building } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-navy-950">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` 
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Encontre o lar perfeito para você
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10">
            Milhares de imóveis para comprar ou alugar em todo o Brasil
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              className="w-full md:w-auto flex items-center justify-center space-x-2 bg-white text-navy-800 hover:bg-white/90"
              size="lg"
            >
              <Home className="h-5 w-5" />
              <span>Comprar</span>
            </Button>
            <Button 
              className="w-full md:w-auto flex items-center justify-center space-x-2 bg-boho-400 text-white hover:bg-boho-500"
              size="lg"
            >
              <Building className="h-5 w-5" />
              <span>Alugar</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full md:w-auto flex items-center justify-center space-x-2 text-white border-white hover:bg-white/10"
              size="lg"
            >
              <Search className="h-5 w-5" />
              <span>Buscar</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-950 to-transparent"></div>
    </div>
  );
};

export default Hero;

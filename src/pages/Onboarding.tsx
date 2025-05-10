import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Home, User, ArrowRight, ArrowLeft } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Bem-vindo ao Imóveis Conecta",
      description: "Sua plataforma para encontrar o imóvel perfeito para suas necessidades.",
      icon: <Home className="h-20 w-20 text-navy-900" />
    },
    {
      title: "Busque com facilidade",
      description: "Filtros avançados para encontrar exatamente o que você procura em qualquer região.",
      icon: <Search className="h-20 w-20 text-navy-900" />
    },
    {
      title: "Perfil personalizado",
      description: "Salve seus imóveis favoritos e receba alertas sobre novas oportunidades.",
      icon: <User className="h-20 w-20 text-navy-900" />
    },
    {
      title: "Pronto para começar?",
      description: "Crie sua conta agora mesmo ou explore os imóveis disponíveis.",
      icon: <Check className="h-20 w-20 text-navy-900" />
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    navigate('/');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e1624]">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          {steps[currentStep].icon}
          
          <h1 className="text-2xl font-bold mt-6 mb-4 text-navy-900 dark:text-white">{steps[currentStep].title}</h1>
          <p className="text-gray-600 dark:text-navy-200 mb-8">{steps[currentStep].description}</p>
          
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? 'bg-navy-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={currentStep === 0 ? 'invisible' : ''}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-center">
        <Button variant="link" onClick={handleSkip}>
          Pular apresentação
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

import { Search } from 'lucide-react';


import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';

const Subscriptions: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Planos e Preços</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Escolha o plano ideal para destacar seus imóveis e alcançar mais clientes
            </p>
          </div>
          
          <SubscriptionPlans />
          
          <div className="mt-16 bg-muted rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Parceria para Empresas</h3>
            <p className="mb-4">
              Oferecemos soluções personalizadas para imobiliárias, empresas de decoração, mudança e outros serviços relacionados a imóveis.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Anúncios direcionados para o público interessado em imóveis</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Integração com sua marca e materiais</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Comissões por indicações realizadas</span>
              </li>
            </ul>
            <Button>Fale com nossa equipe</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscriptions;

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

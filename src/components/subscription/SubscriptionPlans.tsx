
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlan } from "@/types/subscription";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from '@/components/ui/sonner';

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Ideal para quem está começando',
    price: 0,
    tier: 'free',
    features: [
      { name: 'Até 1 anúncio', description: 'Limite de 1 anúncio ativo', included: true },
      { name: 'Duração do anúncio', description: '30 dias', included: true },
      { name: 'Visibilidade básica', description: 'Exibição normal na plataforma', included: true },
      { name: 'Anúncios destacados', description: 'Anúncios destacados na plataforma', included: false },
      { name: 'Estatísticas avançadas', description: 'Métricas detalhadas sobre seus anúncios', included: false },
    ],
    listingsLimit: 1,
    highlightedListings: 0,
    durationDays: 30,
  },
  {
    id: 'basic',
    name: 'Básico',
    description: 'Para pequenos proprietários',
    price: 49.90,
    tier: 'basic',
    features: [
      { name: 'Até 5 anúncios', description: 'Limite de 5 anúncios ativos', included: true },
      { name: 'Duração do anúncio', description: '45 dias', included: true },
      { name: 'Visibilidade média', description: 'Melhor posicionamento na busca', included: true },
      { name: 'Anúncios destacados', description: '1 anúncio destacado', included: true },
      { name: 'Estatísticas avançadas', description: 'Métricas detalhadas sobre seus anúncios', included: false },
    ],
    listingsLimit: 5,
    highlightedListings: 1,
    durationDays: 45,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Ideal para imobiliárias',
    price: 99.90,
    featured: true,
    tier: 'premium',
    features: [
      { name: 'Anúncios ilimitados', description: 'Sem limite de anúncios ativos', included: true },
      { name: 'Duração do anúncio', description: '60 dias', included: true },
      { name: 'Visibilidade máxima', description: 'Melhor posicionamento na busca', included: true },
      { name: 'Anúncios destacados', description: '5 anúncios destacados', included: true },
      { name: 'Estatísticas avançadas', description: 'Métricas detalhadas sobre seus anúncios', included: true },
    ],
    listingsLimit: -1, // Unlimited
    highlightedListings: 5,
    durationDays: 60,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para grandes imobiliárias',
    price: 199.90,
    tier: 'enterprise',
    features: [
      { name: 'Anúncios ilimitados', description: 'Sem limite de anúncios ativos', included: true },
      { name: 'Duração do anúncio', description: '90 dias', included: true },
      { name: 'Visibilidade máxima', description: 'Melhor posicionamento na busca', included: true },
      { name: 'Anúncios destacados', description: 'Anúncios destacados ilimitados', included: true },
      { name: 'Estatísticas avançadas', description: 'Métricas detalhadas sobre seus anúncios', included: true },
    ],
    listingsLimit: -1, // Unlimited
    highlightedListings: -1, // Unlimited
    durationDays: 90,
  }
];

interface SubscriptionPlansProps {
  selectedPlanId?: string;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  selectedPlanId,
  onSelectPlan,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      toast('É necessário estar logado para assinar um plano', {
        description: 'Faça login para continuar com a assinatura',
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    if (user?.type !== 'owner') {
      toast('Apenas anunciantes podem assinar planos', {
        description: 'Atualize seu perfil para anunciante para continuar',
        action: {
          label: 'Atualizar perfil',
          onClick: () => navigate('/profile'),
        },
      });
      return;
    }
    
    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      navigate(`/payment/${plan.id}`);
    }
  };

  return (
    <div className="my-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Planos de Anunciante</h2>
        <p className="text-muted-foreground mt-2">
          Escolha o plano perfeito para seus anúncios de imóveis
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${
              plan.featured ? 'border-primary shadow-lg' : 'border-border'
            } ${selectedPlanId === plan.id ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.featured && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Mais popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {plan.price === 0 ? 'Grátis' : `R$${plan.price.toFixed(2)}`}
                </span>
                {plan.price > 0 && <span className="text-muted-foreground">/mês</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? (
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                className="w-full" 
                variant={plan.featured ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.price === 0 ? 'Começar Grátis' : 'Assinar agora'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;

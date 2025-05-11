import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '@/types/payment';

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  selectedPlan: string | null;
  onSelectPlan: (planId: string) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`p-6 relative ${
            plan.recommended ? 'border-primary' : ''
          }`}
        >
          {plan.recommended && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                Recomendado
              </span>
            </div>
          )}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold">
              R$ {plan.price.toFixed(2)}
              <span className="text-sm text-muted-foreground">
                /{plan.period === 'monthly' ? 'mês' : 'ano'}
              </span>
            </div>
          </div>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="w-full"
            variant={selectedPlan === plan.id ? 'default' : 'outline'}
            onClick={() => onSelectPlan(plan.id)}
          >
            {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar'}
          </Button>
        </Card>
      ))}
    </div>
  );
}; 
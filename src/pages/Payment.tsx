import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { SubscriptionPlans } from '@/components/payment/SubscriptionPlans';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { SubscriptionPlan, PaymentFormData, PaymentResponse } from '@/types/payment';

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 29.90,
    period: 'monthly',
    features: [
      'Até 5 imóveis',
      'Suporte por email',
      'Estatísticas básicas',
    ],
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 49.90,
    period: 'monthly',
    recommended: true,
    features: [
      'Imóveis ilimitados',
      'Suporte prioritário',
      'Estatísticas avançadas',
      'Destaque nos resultados',
    ],
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 99.90,
    period: 'monthly',
    features: [
      'Todas as features do Pro',
      'API de integração',
      'Suporte 24/7',
      'Relatórios personalizados',
    ],
  },
];

export default function Payment() {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(planId || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (planId && !subscriptionPlans.find(p => p.id === planId)) {
      toast.error('Plano não encontrado');
      navigate('/subscriptions');
    }
  }, [planId, navigate]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = async (data: PaymentFormData) => {
    if (!selectedPlan) {
      toast.error('Por favor, selecione um plano primeiro');
      return;
    }

    setIsLoading(true);
    try {
      // Simular chamada à API de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const response: PaymentResponse = {
        success: true,
        message: 'Pagamento processado com sucesso!',
        transactionId: '123456789',
      };

      if (response.success) {
        toast.success(response.message);
        navigate('/dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Escolha seu Plano</h1>
      
      <div className="mb-12">
        <SubscriptionPlans
          plans={subscriptionPlans}
          selectedPlan={selectedPlan}
          onSelectPlan={handleSelectPlan}
        />
      </div>

      {selectedPlan && (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6">Informações de Pagamento</h2>
          <PaymentForm
            onSubmit={handlePayment}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

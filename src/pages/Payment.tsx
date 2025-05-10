
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionPlan } from '@/types/subscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { CreditCard, LucideWallet, CreditCardIcon } from 'lucide-react';

// Mock subscription plans (in a real app, you would fetch from your backend)
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

const Payment: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [paymentTab, setPaymentTab] = useState<string>('credit-card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);

  // Form state
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  
  useEffect(() => {
    // Find the selected plan
    const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!selectedPlan) {
      toast.error('Plano não encontrado');
      navigate('/subscriptions');
      return;
    }
    
    setPlan(selectedPlan);
    
    // Check if user is authenticated and is an owner
    if (!isAuthenticated) {
      toast('É necessário estar logado para assinar um plano', {
        description: 'Faça login para continuar com a assinatura',
      });
      navigate('/login');
      return;
    }
    
    if (user?.type !== 'owner') {
      toast('Apenas anunciantes podem assinar planos', {
        description: 'Atualize seu perfil para anunciante para continuar',
      });
      navigate('/profile');
      return;
    }
  }, [planId, isAuthenticated, user, navigate]);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate a receipt and show success message
      const invoiceNumber = `INV-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      const paymentDate = new Date().toISOString();
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1); // Add 1 month
      
      // In a real app, you would send this to your backend
      const receipt = {
        id: `rcpt-${Math.random().toString(36).substr(2, 9)}`,
        userId: user?.id || '',
        planId: plan?.id || '',
        planName: plan?.name || '',
        amount: plan?.price || 0,
        paymentDate,
        expirationDate: expirationDate.toISOString(),
        paymentMethod: paymentTab === 'credit-card' ? 'Cartão de Crédito' : 'Pix',
        invoiceNumber,
      };
      
      // Store the receipt in localStorage for demo purposes
      const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
      receipts.push(receipt);
      localStorage.setItem('receipts', JSON.stringify(receipts));
      
      toast.success('Pagamento realizado com sucesso!', {
        description: 'Seu plano foi ativado com sucesso',
      });
      
      navigate('/payment-success', { state: { receipt } });
    }, 2000);
  };

  if (!plan) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Payment form */}
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Pagamento</CardTitle>
                  <CardDescription>
                    Escolha seu método de pagamento preferido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentTab} onValueChange={setPaymentTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit-card">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Cartão
                      </TabsTrigger>
                      <TabsTrigger value="pix">
                        <LucideWallet className="mr-2 h-4 w-4" />
                        Pix
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="credit-card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número do cartão</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nome no cartão</Label>
                        <Input
                          id="card-name"
                          placeholder="Nome completo como aparece no cartão"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="pix" className="mt-4">
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <div className="mx-auto w-48 h-48 bg-white p-2 rounded-md mb-4">
                          {/* Placeholder for QR code */}
                          <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            QR Code Pix
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Escaneie o QR Code acima com o aplicativo do seu banco
                        </p>
                        <Button variant="outline" className="w-full">
                          Copiar código
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Order summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Plano</span>
                      <span className="font-medium">{plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Período</span>
                      <span className="font-medium">Mensal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {plan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">R$ {plan.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;

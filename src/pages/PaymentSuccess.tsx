
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Receipt } from '@/types/subscription';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt as Receipt | undefined;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  if (!receipt) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Informações não disponíveis</CardTitle>
              <CardDescription className="text-center">
                Não foi possível encontrar as informações do pagamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => navigate('/subscriptions')}>
                Ver planos disponíveis
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Pagamento Confirmado!</h1>
            <p className="text-muted-foreground mt-2">
              Seu plano foi ativado com sucesso.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detalhes do Pagamento</CardTitle>
              <CardDescription>
                Recibo nº {receipt.invoiceNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plano</p>
                    <p className="font-medium">{receipt.planName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium">R$ {receipt.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data do Pagamento</p>
                    <p className="font-medium">{formatDate(receipt.paymentDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Validade</p>
                    <p className="font-medium">{formatDate(receipt.expirationDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                    <p className="font-medium">{receipt.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.print()}>
                Imprimir recibo
              </Button>
              <p className="text-sm text-muted-foreground">
                Uma cópia deste recibo foi enviada para seu e-mail.
              </p>
            </CardFooter>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/properties')}
              className="flex-1 sm:flex-initial"
            >
              Ver meus imóveis
            </Button>
            <Button 
              onClick={() => navigate('/property-registration')}
              className="flex-1 sm:flex-initial"
            >
              Anunciar novo imóvel
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;

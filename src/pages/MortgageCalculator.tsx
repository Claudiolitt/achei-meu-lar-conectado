
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const MortgageCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(30);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    // Calculate loan amount
    const loanAmount = propertyValue - downPayment;
    
    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // Calculate total number of payments
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly payment
    const x = Math.pow(1 + monthlyInterestRate, totalPayments);
    const monthly = (loanAmount * x * monthlyInterestRate) / (x - 1);
    
    // Calculate total payment and interest
    const totalPaid = monthly * totalPayments;
    const totalInterestPaid = totalPaid - loanAmount;
    
    // Update state
    setMonthlyPayment(isNaN(monthly) ? 0 : monthly);
    setTotalInterest(isNaN(totalInterestPaid) ? 0 : totalInterestPaid);
    setTotalAmount(isNaN(totalPaid) ? 0 : totalPaid);
  }, [propertyValue, downPayment, interestRate, loanTerm]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Calculadora de Financiamento</h1>
            <p className="text-muted-foreground">
              Calcule as parcelas e o custo total do seu financiamento imobiliário
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Dados do Financiamento</CardTitle>
              <CardDescription>Ajuste os valores para calcular seu financiamento</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="property-value">Valor do Imóvel</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="property-value-slider"
                    defaultValue={[500000]}
                    max={2000000}
                    min={100000}
                    step={50000}
                    value={[propertyValue]}
                    onValueChange={(value) => setPropertyValue(value[0])}
                    className="flex-1"
                  />
                  <Input
                    id="property-value"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="down-payment">Valor de Entrada</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="down-payment-slider"
                    defaultValue={[100000]}
                    max={propertyValue}
                    min={0}
                    step={10000}
                    value={[downPayment > propertyValue ? propertyValue : downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    className="flex-1"
                  />
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setDownPayment(value > propertyValue ? propertyValue : value);
                    }}
                    className="w-32"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="interest-rate">Taxa de Juros (% ao ano)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="interest-rate-slider"
                    defaultValue={[8]}
                    max={20}
                    min={1}
                    step={0.1}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="flex-1"
                  />
                  <Input
                    id="interest-rate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-32"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="loan-term">Prazo (anos)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="loan-term-slider"
                    defaultValue={[30]}
                    max={35}
                    min={5}
                    step={1}
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    className="flex-1"
                  />
                  <Input
                    id="loan-term"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Resultado do Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Parcela Mensal</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</div>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Total de Juros</div>
                <div className="text-2xl font-bold">{formatCurrency(totalInterest)}</div>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Valor Total Pago</div>
                <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MortgageCalculator;

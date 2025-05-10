
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

export default function TwoFactorSetup() {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [setupCode, setSetupCode] = useState<string>("");
  const { user } = useAuth();
  const form = useForm();
  
  // This is a mock function - in a real app this would generate a real 2FA setup
  const generateSetupCode = () => {
    // Generate a mock secret key (in a real app this would be a proper TOTP secret)
    const mockSecret = "ABCDEF123456";
    setSetupCode(mockSecret);
    
    // Move to verification step
    setStep('verify');
    
    return mockSecret;
  };
  
  const handleSetup = () => {
    // In a real app, this would call an API to generate a 2FA secret
    generateSetupCode();
    
    toast.info("Código de configuração gerado", {
      description: "Use este código no seu aplicativo autenticador."
    });
  };
  
  const handleVerify = (value: string) => {
    // In a real app, this would verify the OTP against the generated secret
    console.log("Verifying code:", value);
    
    // Mock successful verification (in a real app this would validate against the TOTP algorithm)
    if (value.length === 6) {
      setTimeout(() => {
        setStep('complete');
        toast.success("Autenticação de dois fatores ativada com sucesso!");
      }, 1000);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Autenticação em Dois Fatores</CardTitle>
        </div>
        <CardDescription>
          Proteja sua conta com uma camada extra de segurança
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 'setup' && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Por que ativar?</h4>
                  <p className="text-sm text-muted-foreground">
                    A autenticação em dois fatores adiciona uma camada extra de segurança, 
                    dificultando o acesso não autorizado à sua conta, mesmo se sua senha for comprometida.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Como configurar:</h3>
              <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                <li>Clique no botão "Configurar" abaixo</li>
                <li>Escaneie o QR code ou insira o código manualmente em um aplicativo autenticador como Google Authenticator ou Authy</li>
                <li>Digite o código gerado pelo aplicativo para verificar a configuração</li>
              </ol>
            </div>
          </div>
        )}
        
        {step === 'verify' && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm mb-2">Escaneie o QR code abaixo com seu aplicativo autenticador</p>
              <div className="mx-auto w-48 h-48 bg-white p-2 rounded-md mb-4">
                <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  QR Code Placeholder
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Ou use este código:</p>
                <code className="bg-background px-2 py-1 rounded-md text-sm font-mono">
                  {setupCode}
                </code>
              </div>
            </div>
            
            <div className="space-y-2 text-center">
              <Label htmlFor="otp-input">Digite o código do aplicativo autenticador</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} onComplete={handleVerify}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
        )}
        
        {step === 'complete' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-medium">Configuração concluída!</h3>
              <p className="text-muted-foreground">
                A autenticação em dois fatores foi ativada com sucesso para sua conta.
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-md mt-4 text-left">
              <h4 className="font-medium text-sm">Códigos de backup</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Guarde estes códigos em um local seguro. Eles podem ser usados para acessar sua conta caso você perca acesso ao seu dispositivo.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["ABCDE-12345", "FGHIJ-67890", "KLMNO-13579", "PQRST-24680"].map(code => (
                  <code key={code} className="text-xs bg-background px-2 py-1 rounded-md font-mono">
                    {code}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {step === 'setup' && (
          <Button onClick={handleSetup} className="w-full">
            Configurar autenticação em dois fatores
          </Button>
        )}
        {step === 'verify' && (
          <Button 
            variant="outline"
            onClick={() => setStep('setup')}
            className="w-full"
          >
            Voltar
          </Button>
        )}
        {step === 'complete' && (
          <Button 
            variant="outline"
            onClick={() => setStep('setup')}
            className="w-full"
          >
            Concluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

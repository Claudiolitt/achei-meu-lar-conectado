import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import VerificationCode from "./VerificationCode";
import { sendVerificationEmail } from "@/services/verificationService";
import { Mail, Phone, ArrowLeft } from "lucide-react";

export default function ValidationMethod() {
  const [selectedMethod, setSelectedMethod] = useState<"email" | "phone">("email");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      if (selectedMethod === "email") {
        if (!user?.email) {
          toast.error("Email não encontrado");
          return;
        }
        await sendVerificationEmail(user.email);
        toast.success("Email de verificação enviado!");
      } else {
        // TODO: Implementar verificação por telefone
        toast.success("Código de verificação enviado para seu telefone!");
      }
      setShowVerification(true);
    } catch (error) {
      toast.error("Erro ao enviar código de verificação");
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerification) {
    return <VerificationCode method={selectedMethod} onResend={handleSendCode} />;
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Verificação da Conta</h2>
        <p className="text-muted-foreground">
          Escolha como você prefere receber o código de verificação
        </p>
      </div>

      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => setSelectedMethod(value as "email" | "phone")}
        className="space-y-4"
      >
        <div 
          className={`flex items-start space-x-3 space-y-0 rounded-lg border p-4 transition-all duration-200 cursor-pointer ${
            selectedMethod === "email" ? "border-primary bg-primary/5" : "hover:bg-accent"
          }`}
          onClick={() => setSelectedMethod("email")}
        >
          <RadioGroupItem value="email" id="email" className="mt-1" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <Label htmlFor="email" className="font-medium cursor-pointer">
                Email
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Enviaremos um código de verificação para {user?.email}
            </p>
          </div>
        </div>

        <div 
          className={`flex items-start space-x-3 space-y-0 rounded-lg border p-4 transition-all duration-200 cursor-pointer ${
            selectedMethod === "phone" ? "border-primary bg-primary/5" : "hover:bg-accent"
          }`}
          onClick={() => setSelectedMethod("phone")}
        >
          <RadioGroupItem value="phone" id="phone" className="mt-1" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <Label htmlFor="phone" className="font-medium cursor-pointer">
                Telefone
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Enviaremos um código de verificação para {user?.phone || "seu telefone"}
            </p>
          </div>
        </div>
      </RadioGroup>

      <Button onClick={handleSendCode} className="w-full">
        Enviar código
      </Button>
    </div>
  );
} 
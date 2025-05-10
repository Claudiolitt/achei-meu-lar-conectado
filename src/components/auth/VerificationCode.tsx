import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { verifyCode } from "@/services/verificationService";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface VerificationCodeProps {
  method: "email" | "phone";
  onResend: () => void;
}

export default function VerificationCode({ method, onResend }: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      if (!user?.email) {
        toast.error("Email não encontrado");
        return;
      }

      const codeString = code.join("");
      const isValid = verifyCode(user.email, codeString);
      if (isValid) {
        toast.success("Código verificado com sucesso!");
        navigate('/onboarding');
      } else {
        toast.error("Código inválido ou expirado");
      }
    } catch (error) {
      toast.error("Erro ao verificar código");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(3600); // Reset timer
    setCode(Array(6).fill("")); // Reset code
    toast.success("Novo código enviado!");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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
        <h2 className="text-2xl font-semibold">Verificação</h2>
        <p className="text-muted-foreground">
          Digite o código de verificação enviado para {method === "email" ? user?.email : user?.phone}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-2xl font-semibold"
            />
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Código expira em: {formatTime(timeLeft)}</p>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleVerify} 
              className="w-full"
              disabled={code.some(digit => !digit) || isLoading}
            >
              {isLoading ? "Verificando..." : "Verificar"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleResend}
              className="w-full"
              disabled={timeLeft > 0}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {timeLeft > 0
                ? `Reenviar código (${formatTime(timeLeft)})`
                : "Reenviar código"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";

interface WelcomeScreenProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function WelcomeScreen({
  onNext,
  isFirstStep,
}: WelcomeScreenProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Bem-vindo ao Achei Meu Lar!</h1>
        <p className="text-muted-foreground">
          Vamos personalizar sua experiência para encontrar o imóvel perfeito para você.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">O que você vai fazer aqui:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Escolher seus tipos de imóveis preferidos
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Definir sua faixa de orçamento
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Selecionar as localizações de interesse
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Estabelecer seu prazo para encontrar o imóvel
            </li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Não se preocupe, você poderá alterar essas preferências a qualquer momento.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onNext({})}>
          Começar
        </Button>
      </div>
    </div>
  );
} 
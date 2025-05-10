import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";

// Importando as telas de onboarding
import WelcomeScreen from "./screens/WelcomeScreen";
import PropertyPreferences from "./screens/PropertyPreferences";
import BudgetRange from "./screens/BudgetRange";
import LocationPreferences from "./screens/LocationPreferences";
import TimelineScreen from "./screens/TimelineScreen";

export interface OnboardingData {
  propertyTypes: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  preferredLocations: string[];
  timeline: string;
  additionalPreferences: string[];
}

const INITIAL_DATA: OnboardingData = {
  propertyTypes: [],
  budgetRange: {
    min: 0,
    max: 0,
  },
  preferredLocations: [],
  timeline: "",
  additionalPreferences: [],
};

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const { user, updatePreferences } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(
    user?.preferences || INITIAL_DATA
  );

  const steps = [
    {
      title: "Bem-vindo",
      component: WelcomeScreen,
    },
    {
      title: "Preferências de Imóvel",
      component: PropertyPreferences,
    },
    {
      title: "Faixa de Orçamento",
      component: BudgetRange,
    },
    {
      title: "Localização Preferida",
      component: LocationPreferences,
    },
    {
      title: "Prazo de Busca",
      component: TimelineScreen,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...stepData }));

    if (currentStep === steps.length - 1) {
      // Finalizar onboarding
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await updatePreferences(onboardingData);
      toast.success("Preferências salvas com sucesso!");
      navigate("/"); // Redirect to main page after completing onboarding
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("Erro ao salvar preferências. Tente novamente.");
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Etapa {currentStep + 1} de {steps.length}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6">
          <CurrentStepComponent
            data={onboardingData}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
} 
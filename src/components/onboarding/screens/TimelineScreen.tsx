import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TimelineScreenProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const timelineOptions = [
  {
    id: "urgent",
    label: "Urgente",
    description: "Preciso encontrar um imóvel o mais rápido possível",
  },
  {
    id: "1-3-months",
    label: "1-3 meses",
    description: "Estou planejando me mudar nos próximos meses",
  },
  {
    id: "3-6-months",
    label: "3-6 meses",
    description: "Tenho tempo para encontrar o imóvel ideal",
  },
  {
    id: "6-plus-months",
    label: "6+ meses",
    description: "Estou apenas pesquisando opções para o futuro",
  },
];

export default function TimelineScreen({
  data,
  onNext,
  onBack,
  isFirstStep,
}: TimelineScreenProps) {
  const [selectedTimeline, setSelectedTimeline] = useState(data.timeline);

  const handleNext = () => {
    onNext({ timeline: selectedTimeline });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Qual seu prazo para encontrar um imóvel?</h2>
        <p className="text-muted-foreground">
          Isso nos ajudará a priorizar as buscas de acordo com sua necessidade.
        </p>
      </div>

      <RadioGroup
        value={selectedTimeline}
        onValueChange={setSelectedTimeline}
        className="space-y-4"
      >
        {timelineOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent cursor-pointer"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <div className="space-y-1">
              <Label
                htmlFor={option.id}
                className="font-medium cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!selectedTimeline}
          className={isFirstStep ? "w-full" : ""}
        >
          {isLastStep ? "Finalizar" : "Continuar"}
        </Button>
      </div>
    </div>
  );
} 
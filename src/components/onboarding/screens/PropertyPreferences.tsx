import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropertyPreferencesProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const propertyTypes = [
  { id: "apartment", label: "Apartamento" },
  { id: "house", label: "Casa" },
  { id: "studio", label: "Studio" },
  { id: "commercial", label: "Comercial" },
  { id: "land", label: "Terreno" },
  { id: "farm", label: "Sítio/Chácara" },
];

export default function PropertyPreferences({
  data,
  onNext,
  onBack,
  isFirstStep,
}: PropertyPreferencesProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(data.propertyTypes);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleNext = () => {
    onNext({ propertyTypes: selectedTypes });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Que tipo de imóvel você procura?</h2>
        <p className="text-muted-foreground">
          Selecione todos os tipos de imóveis que você tem interesse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox
              id={type.id}
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={() => handleTypeToggle(type.id)}
            />
            <Label htmlFor={type.id}>{type.label}</Label>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={selectedTypes.length === 0}
          className={isFirstStep ? "w-full" : ""}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
} 
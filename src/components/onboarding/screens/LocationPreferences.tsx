import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LocationPreferencesProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function LocationPreferences({
  data,
  onNext,
  onBack,
  isFirstStep,
}: LocationPreferencesProps) {
  const [locations, setLocations] = useState<string[]>(data.preferredLocations);
  const [newLocation, setNewLocation] = useState("");

  const handleAddLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLocation();
    }
  };

  const handleNext = () => {
    onNext({ preferredLocations: locations });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Onde você quer morar?</h2>
        <p className="text-muted-foreground">
          Adicione os bairros, cidades ou regiões de seu interesse.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="location" className="sr-only">
              Adicionar localização
            </Label>
            <Input
              id="location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite um bairro, cidade ou região"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddLocation}
            disabled={!newLocation.trim()}
          >
            Adicionar
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {location}
              <button
                type="button"
                onClick={() => handleRemoveLocation(location)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        {locations.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Adicione pelo menos uma localização para continuar.
          </p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={locations.length === 0}
          className={isFirstStep ? "w-full" : ""}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
} 
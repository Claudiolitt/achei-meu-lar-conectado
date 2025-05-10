import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BudgetRangeProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function BudgetRange({
  data,
  onNext,
  onBack,
  isFirstStep,
}: BudgetRangeProps) {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    data.budgetRange.min || 100000,
    data.budgetRange.max || 500000,
  ]);

  const handleSliderChange = (value: number[]) => {
    setBudgetRange([value[0], value[1]]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''));
    if (!isNaN(value)) {
      setBudgetRange([value, budgetRange[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''));
    if (!isNaN(value)) {
      setBudgetRange([budgetRange[0], value]);
    }
  };

  const handleNext = () => {
    onNext({
      budgetRange: {
        min: budgetRange[0],
        max: budgetRange[1],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Qual sua faixa de orçamento?</h2>
        <p className="text-muted-foreground">
          Defina o valor mínimo e máximo que você está disposto a investir.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Mínimo: {formatCurrency(budgetRange[0])}</span>
            <span>Máximo: {formatCurrency(budgetRange[1])}</span>
          </div>
          
          <Slider
            defaultValue={budgetRange}
            max={1000000}
            step={10000}
            value={budgetRange}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-budget">Valor mínimo</Label>
            <Input
              id="min-budget"
              value={formatCurrency(budgetRange[0])}
              onChange={handleMinInputChange}
              placeholder="R$ 0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-budget">Valor máximo</Label>
            <Input
              id="max-budget"
              value={formatCurrency(budgetRange[1])}
              onChange={handleMaxInputChange}
              placeholder="R$ 0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={budgetRange[0] >= budgetRange[1]}
          className={isFirstStep ? "w-full" : ""}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
} 
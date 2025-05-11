import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PropertyAgeProps {
  minAge: string;
  maxAge: string;
  onMinAgeChange: (value: string) => void;
  onMaxAgeChange: (value: string) => void;
}

export const PropertyAge: React.FC<PropertyAgeProps> = ({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
}) => {
  return (
    <div>
      <Label className="font-semibold mb-2 text-navy-900 dark:text-white">Faixa de Idade do Imóvel</Label>
      <div className="flex gap-2">
        <Input
          value={minAge}
          onChange={(e) => onMinAgeChange(e.target.value)}
          placeholder="Mínimo (anos)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
        <Input
          value={maxAge}
          onChange={(e) => onMaxAgeChange(e.target.value)}
          placeholder="Máximo (anos)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
      </div>
    </div>
  );
};

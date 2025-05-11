
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PropertyAgeProps {
  minAge: number;
  maxAge: number;
  onMinAgeChange: (value: number) => void;
  onMaxAgeChange: (value: number) => void;
}

export const PropertyAge: React.FC<PropertyAgeProps> = ({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
}) => {
  // Handler para garantir que os valores são inteiros positivos
  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value));
    onMinAgeChange(value);
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value));
    onMaxAgeChange(value);
  };

  return (
    <div>
      <Label className="font-semibold mb-2 block text-navy-900 dark:text-white">Faixa de Idade do Imóvel</Label>
      <div className="flex gap-2">
        <Input
          value={minAge || ''}
          onChange={handleMinAgeChange}
          placeholder="Mínimo (anos)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
        <Input
          value={maxAge || ''}
          onChange={handleMaxAgeChange}
          placeholder="Máximo (anos)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
      </div>
    </div>
  );
};

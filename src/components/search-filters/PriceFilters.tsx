
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceFiltersProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export const PriceFilters: React.FC<PriceFiltersProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  // Handler para garantir que os valores são inteiros positivos
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value));
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value));
    onMaxPriceChange(value);
  };

  return (
    <div>
      <Label className="font-semibold mb-2 block text-navy-900 dark:text-white">Preço</Label>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={minPrice || ''}
            onChange={handleMinPriceChange}
            placeholder="Mínimo"
            className="dark:bg-[#232c43] dark:text-white"
            type="number"
            min={0}
          />
          <Input
            value={maxPrice || ''}
            onChange={handleMaxPriceChange}
            placeholder="Máximo"
            className="dark:bg-[#232c43] dark:text-white"
            type="number"
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

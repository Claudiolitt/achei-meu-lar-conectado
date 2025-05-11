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
  return (
    <div>
      <Label className="font-semibold mb-2 text-navy-900 dark:text-white">Preço</Label>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={minPrice}
            onChange={(e) => onMinPriceChange(Number(e.target.value))}
            placeholder="Mínimo"
            className="dark:bg-[#232c43] dark:text-white"
            type="number"
            min={0}
          />
          <Input
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
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

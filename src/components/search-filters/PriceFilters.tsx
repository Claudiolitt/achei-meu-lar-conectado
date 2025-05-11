import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface PriceFiltersProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  includeTotalPrice: boolean;
  onIncludeTotalPriceChange: (checked: boolean) => void;
  minCondoFee: number;
  maxCondoFee: number;
  onMinCondoFeeChange: (value: number) => void;
  onMaxCondoFeeChange: (value: number) => void;
  minPropertyTax: number;
  maxPropertyTax: number;
  onMinPropertyTaxChange: (value: number) => void;
  onMaxPropertyTaxChange: (value: number) => void;
  transactionType: 'buy' | 'rent';
}

export const PriceFilters: React.FC<PriceFiltersProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  includeTotalPrice,
  onIncludeTotalPriceChange,
  minCondoFee,
  maxCondoFee,
  onMinCondoFeeChange,
  onMaxCondoFeeChange,
  minPropertyTax,
  maxPropertyTax,
  onMinPropertyTaxChange,
  onMaxPropertyTaxChange,
  transactionType
}) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMaxPriceChange(value);
  };

  const handleMinCondoFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMinCondoFeeChange(value);
  };

  const handleMaxCondoFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMaxCondoFeeChange(value);
  };

  const handleMinPropertyTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMinPropertyTaxChange(value);
  };

  const handleMaxPropertyTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    onMaxPropertyTaxChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="font-semibold mb-2 block text-navy-900 dark:text-white">
          {transactionType === 'rent' ? 'Valor do Aluguel' : 'Preço'}
        </Label>
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

      {transactionType === 'rent' && (
        <>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeTotalPrice" 
              checked={includeTotalPrice}
              onCheckedChange={onIncludeTotalPriceChange}
            />
            <Label htmlFor="includeTotalPrice" className="text-sm text-navy-700 dark:text-white">
              Preço Total (Incluir preço de aluguel, condomínio e IPTU)
            </Label>
          </div>
        </>
      )}

      {transactionType === 'rent' && (
        <>
          <div>
            <Label className="text-sm text-navy-700 dark:text-white mb-1 block">Condomínio</Label>
            <div className="flex gap-2">
              <Input
                value={minCondoFee || ''}
                onChange={handleMinCondoFeeChange}
                placeholder="Mínimo"
                className="dark:bg-[#232c43] dark:text-white"
                type="number"
                min={0}
              />
              <Input
                value={maxCondoFee || ''}
                onChange={handleMaxCondoFeeChange}
                placeholder="Máximo"
                className="dark:bg-[#232c43] dark:text-white"
                type="number"
                min={0}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-navy-700 dark:text-white mb-1 block">IPTU</Label>
            <div className="flex gap-2">
              <Input
                value={minPropertyTax || ''}
                onChange={handleMinPropertyTaxChange}
                placeholder="Mínimo"
                className="dark:bg-[#232c43] dark:text-white"
                type="number"
                min={0}
              />
              <Input
                value={maxPropertyTax || ''}
                onChange={handleMaxPropertyTaxChange}
                placeholder="Máximo"
                className="dark:bg-[#232c43] dark:text-white"
                type="number"
                min={0}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

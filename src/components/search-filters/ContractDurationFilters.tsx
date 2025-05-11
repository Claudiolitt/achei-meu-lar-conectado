import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractDurationFiltersProps {
  minContractDuration: number;
  maxContractDuration: number;
  onMinContractDurationChange: (value: number) => void;
  onMaxContractDurationChange: (value: number) => void;
}

export const ContractDurationFilters: React.FC<ContractDurationFiltersProps> = ({
  minContractDuration,
  maxContractDuration,
  onMinContractDurationChange,
  onMaxContractDurationChange
}) => {
  return (
    <div className="flex-1">
      <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Duração do Contrato (meses)</h4>
      <div className="flex gap-2">
        <Input
          value={minContractDuration}
          onChange={(e) => onMinContractDurationChange(Number(e.target.value))}
          placeholder="Mínimo (meses)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
        <Input
          value={maxContractDuration}
          onChange={(e) => onMaxContractDurationChange(Number(e.target.value))}
          placeholder="Máximo (meses)"
          className="dark:bg-[#232c43] dark:text-white"
          type="number"
          min={0}
        />
      </div>
    </div>
  );
};

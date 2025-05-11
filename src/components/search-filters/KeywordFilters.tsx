
import React from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface KeywordFiltersProps {
  keywords: string;
  excludeUnderContract: boolean;
  onKeywordsChange: (value: string) => void;
  onExcludeUnderContractChange: (checked: boolean) => void;
}

export const KeywordFilters: React.FC<KeywordFiltersProps> = ({
  keywords,
  excludeUnderContract,
  onKeywordsChange,
  onExcludeUnderContractChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2 block text-navy-900 dark:text-white">Palavras-chave</h4>
        <Input
          value={keywords}
          onChange={(e) => onKeywordsChange(e.target.value)}
          placeholder="Digite palavras-chave..."
          className="dark:bg-[#232c43] dark:text-white w-full"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={excludeUnderContract}
            onCheckedChange={(checked) => onExcludeUnderContractChange(checked as boolean)}
          />
          <span className="text-navy-700 dark:text-white">Excluir imóveis sob contrato</span>
        </label>
      </div>
    </div>
  );
};

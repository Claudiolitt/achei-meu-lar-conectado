import React from 'react';
import { Input } from "@/components/ui/input";

interface KeywordFiltersProps {
  keywords: string;
  excludeUnderContract: boolean;
  onKeywordsChange: (value: string) => void;
  onExcludeUnderContractChange: (checked: boolean) => void;
  transactionType: 'buy' | 'rent';
}

export const KeywordFilters: React.FC<KeywordFiltersProps> = ({
  keywords,
  onKeywordsChange,
  transactionType
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
    </div>
  );
};

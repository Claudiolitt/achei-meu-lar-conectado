import React from 'react';
import AutocompleteSearch from '@/components/AutocompleteSearch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuickSearchBarProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  onFilterClick: () => void;
  onQuickSearch: () => void;
}

const QuickSearchBar: React.FC<QuickSearchBarProps> = ({
  activeTab,
  onTabChange,
  location,
  onLocationChange,
  onFilterClick,
  onQuickSearch,
}) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="flex justify-start w-auto mb-2 bg-transparent shadow-none p-0">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="alugar">Alugar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            value={location}
            onChange={e => onLocationChange(e.target.value)}
            placeholder="Digite o endereço, bairro ou cidade..."
            className="w-full px-3 py-2 rounded bg-background text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onQuickSearch}
            variant="outline"
            className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
          >
            Buscar
          </Button>
          <Button
            onClick={onFilterClick}
            variant="outline"
            className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
          >
            Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearchBar;

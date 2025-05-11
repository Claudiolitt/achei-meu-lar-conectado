
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
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="alugar">Alugar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <AutocompleteSearch
            value={location}
            onChange={onLocationChange}
            placeholder="Digite o endereço, bairro ou cidade..."
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onFilterClick}
            variant="outline"
            className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
          >
            Filtros
          </Button>
          <Button 
            onClick={onQuickSearch}
            className="bg-navy-700 hover:bg-navy-800 text-white"
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearchBar;

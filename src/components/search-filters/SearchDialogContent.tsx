
import React from 'react';
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SearchFiltersTabs from './SearchFiltersTabs';
import { useSearchFiltersContext } from './SearchFiltersContext';

interface SearchDialogContentProps {
  activeTab: string;
  dialogActiveTab: string;
  onTabChange: (value: string) => void;
  onDialogTabChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClearFilters: () => void;
}

const SearchDialogContent: React.FC<SearchDialogContentProps> = ({
  activeTab,
  dialogActiveTab,
  onTabChange,
  onDialogTabChange,
  onSearch,
  onClearFilters,
}) => {
  return (
    <>
      <SearchFiltersTabs
        activeTab={activeTab}
        dialogActiveTab={dialogActiveTab}
        onTabChange={onTabChange}
        onDialogTabChange={onDialogTabChange}
        isDialog={true}
      />

      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onClearFilters}
        >
          Limpar Filtros
        </Button>
        <Button onClick={onSearch}>
          Aplicar Filtros
        </Button>
      </div>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        Fechar
      </DialogClose>
    </>
  );
};

export default SearchDialogContent;

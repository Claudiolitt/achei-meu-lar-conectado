import React from 'react';
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SearchFiltersTabs from './SearchFiltersTabs';
import { useSearchFiltersContext } from './SearchFiltersContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const { excludeUnderContract, setExcludeUnderContract } = useSearchFiltersContext();

  return (
    <div className="flex flex-col h-full">
      <SearchFiltersTabs
        activeTab={activeTab}
        dialogActiveTab={dialogActiveTab}
        onTabChange={onTabChange}
        onDialogTabChange={onDialogTabChange}
        isDialog={true}
      />
      <div className="flex-shrink-0 pt-4 pb-2 flex justify-end gap-2 border-b bg-background sticky top-0 z-10">
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
      <div className="flex-1 overflow-y-auto pr-2">
        {dialogActiveTab === 'rent' && (
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeUnderContract"
                checked={excludeUnderContract}
                onCheckedChange={(checked) => setExcludeUnderContract(checked as boolean)}
              />
              <Label htmlFor="excludeUnderContract" className="text-sm text-navy-700 dark:text-white">
                Excluir imóveis sob contrato
              </Label>
            </div>
          </div>
        )}
        {/* Aqui virão os outros filtros, que já estão no conteúdo do modal principal */}
      </div>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogClose>
    </div>
  );
};

export default SearchDialogContent;

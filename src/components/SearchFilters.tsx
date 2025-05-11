import React from 'react';
import QuickSearchBar from './search-filters/QuickSearchBar';
import SearchDialogContent from './search-filters/SearchDialogContent';
import { SearchFiltersProvider } from './search-filters/SearchFiltersContext';
import { useSearchFiltersHandlers } from './search-filters/useSearchFiltersHandlers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SearchFiltersContent: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    location,
    setLocation,
    activeTab,
    dialogActiveTab,
    handleTabChange,
    handleDialogTabChange,
    handleSearch,
    handleClearFilters,
    handleQuickSearch,
  } = useSearchFiltersHandlers();

  return (
    <>
      <QuickSearchBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        location={location}
        onLocationChange={setLocation}
        onFilterClick={() => setIsOpen(true)}
        onQuickSearch={handleQuickSearch}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[95vh] min-h-[500px]">
          <DialogHeader>
            <DialogTitle>Filtros de Busca</DialogTitle>
          </DialogHeader>
          <SearchDialogContent
            activeTab={activeTab}
            dialogActiveTab={dialogActiveTab}
            onTabChange={handleTabChange}
            onDialogTabChange={handleDialogTabChange}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

// Wrap the component with the context provider
const SearchFilters: React.FC = () => {
  return (
    <SearchFiltersProvider>
      <SearchFiltersContent />
    </SearchFiltersProvider>
  );
};

export default SearchFilters;

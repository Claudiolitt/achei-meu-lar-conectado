import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilterContent from './SearchFilterContent';

interface SearchFiltersTabsProps {
  activeTab: string;
  dialogActiveTab: string;
  onTabChange: (value: string) => void;
  onDialogTabChange: (value: string) => void;
  isDialog?: boolean;
}

const SearchFiltersTabs: React.FC<SearchFiltersTabsProps> = ({
  activeTab,
  dialogActiveTab,
  onTabChange,
  onDialogTabChange,
  isDialog = false
}) => {
  // If it's a dialog, use dialog-specific props
  const currentTab = isDialog ? dialogActiveTab : activeTab;
  const handleChange = isDialog ? onDialogTabChange : onTabChange;
  
  return (
    <Tabs value={currentTab} onValueChange={handleChange}>
      <TabsList className={isDialog ? 'flex justify-start w-auto mb-4' : 'grid w-full grid-cols-2'}>
        <TabsTrigger value={isDialog ? "buy" : "comprar"}>
          {isDialog ? "Comprar" : "Comprar"}
        </TabsTrigger>
        <TabsTrigger value={isDialog ? "rent" : "alugar"}>
          {isDialog ? "Alugar" : "Alugar"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={isDialog ? "buy" : "comprar"}>
        <SearchFilterContent transactionType="buy" isDialog={isDialog} />
      </TabsContent>

      <TabsContent value={isDialog ? "rent" : "alugar"}>
        <SearchFilterContent transactionType="rent" isDialog={isDialog} />
      </TabsContent>
    </Tabs>
  );
};

export default SearchFiltersTabs;

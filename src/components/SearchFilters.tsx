
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import QuickSearchBar from './search-filters/QuickSearchBar';
import SearchDialogContent from './search-filters/SearchDialogContent';
import { SearchFiltersProvider } from './search-filters/SearchFiltersContext';
import { useSearchFiltersContext } from './search-filters/SearchFiltersContext';

const SearchFiltersContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('comprar');
  const [dialogActiveTab, setDialogActiveTab] = useState('buy');
  const navigate = useNavigate();
  
  const {
    propertyTypes,
    minPrice,
    maxPrice,
    minAge,
    maxAge,
    landSize,
    buildingSize,
    minContractDuration,
    maxContractDuration,
    bedrooms,
    bathrooms,
    parkingSpots,
    keywords,
    excludeUnderContract,
    features,
  } = useSearchFiltersContext();

  // Syncronize tabs between dialog and main
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setDialogActiveTab(value === 'comprar' ? 'buy' : 'rent');
  };

  const handleDialogTabChange = (value: string) => {
    setDialogActiveTab(value);
    setActiveTab(value === 'buy' ? 'comprar' : 'alugar');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    params.append('transaction', activeTab === 'comprar' ? 'sale' : 'rent');
    
    // Add selected property types to URL
    if (propertyTypes.length > 0) {
      params.append('propertyTypes', propertyTypes.join(','));
    }
    
    if (location) params.append('search', location);
    if (minPrice > 0) params.append('minPrice', minPrice.toString());
    if (maxPrice > 0) params.append('maxPrice', maxPrice.toString());
    if (minAge > 0) params.append('minAge', minAge.toString());
    if (maxAge > 0) params.append('maxAge', maxAge.toString());
    if (landSize[0] > 0) params.append('minLandSize', landSize[0].toString());
    if (landSize[1] > 0) params.append('maxLandSize', landSize[1].toString());
    if (buildingSize[0] > 0) params.append('minBuildingSize', buildingSize[0].toString());
    if (buildingSize[1] > 0) params.append('maxBuildingSize', buildingSize[1].toString());
    if (bedrooms > 0) params.append('bedrooms', bedrooms.toString());
    if (bathrooms > 0) params.append('bathrooms', bathrooms.toString());
    if (parkingSpots > 0) params.append('parkingSpots', parkingSpots.toString());
    if (keywords) params.append('keywords', keywords);
    if (excludeUnderContract) params.append('excludeUnderContract', 'true');
    
    const activeFeatures = Object.entries(features)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    if (activeFeatures.length > 0) {
      params.append('features', activeFeatures.join(','));
    }
    
    navigate(`/properties?${params.toString()}`);
    
    // Close dialog if open
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleClearFilters = () => {
    // Context will handle this through useSearchFiltersContext
    const {
      setPropertyTypes,
      setMinPrice,
      setMaxPrice,
      setMinAge,
      setMaxAge,
      setLandSize,
      setBuildingSize,
      setMinContractDuration,
      setMaxContractDuration,
      setBedrooms,
      setBathrooms,
      setParkingSpots,
      setKeywords,
      setExcludeUnderContract,
      setFeatures,
    } = useSearchFiltersContext();

    setPropertyTypes([]);
    setMinPrice(0);
    setMaxPrice(0);
    setMinAge(0);
    setMaxAge(0);
    setLandSize([0, 0]);
    setBuildingSize([0, 0]);
    setMinContractDuration(0);
    setMaxContractDuration(0);
    setBedrooms(0);
    setBathrooms(0);
    setParkingSpots(0);
    setKeywords('');
    setExcludeUnderContract(false);
    setFeatures({
      pool: false,
      balcony: false,
      furnished: false,
      pet: false,
      accessible: false,
      photo: false,
      new: false,
      garage: false,
      garden: false,
      barbecue: false,
      office: false,
      builtInWardrobe: false,
      laundry: false,
      airConditioning: false,
      heating: false,
      solarPanels: false,
      fireplace: false,
      groundFloor: false,
      noSteps: false,
      wideDoors: false,
      elevator: false,
      old: false,
      veryOld: false,
      suite: false,
      dishwasher: false,
      builtIn: false,
      security: false,
    });
  };

  const handleQuickSearch = () => {
    handleSearch(new Event('submit') as unknown as React.FormEvent);
  };

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
        <DialogContent className="sm:max-w-[625px] max-h-[90vh]">
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

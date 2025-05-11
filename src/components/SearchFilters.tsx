
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useNavigate } from "react-router-dom";
import { PropertyType } from "@/types/property";
import { PriceFilters } from "@/components/search-filters/PriceFilters";
import { PropertyFeatures } from "@/components/search-filters/PropertyFeatures";
import { PropertyAge } from "@/components/search-filters/PropertyAge";
import { SizeFilters } from "@/components/search-filters/SizeFilters";
import { ContractDurationFilters } from "@/components/search-filters/ContractDurationFilters";
import { PropertyCharacteristics } from "@/components/search-filters/PropertyCharacteristics";
import { RoomFilters } from "@/components/search-filters/RoomFilters";
import { KeywordFilters } from "@/components/search-filters/KeywordFilters";
import { PropertyTypeSelector } from "@/components/search-filters/PropertyTypeSelector";
import AutocompleteSearch from "@/components/AutocompleteSearch";

const SearchFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [landSize, setLandSize] = useState<[number, number]>([0, 0]);
  const [buildingSize, setBuildingSize] = useState<[number, number]>([0, 0]);
  const [minContractDuration, setMinContractDuration] = useState<number>(0);
  const [maxContractDuration, setMaxContractDuration] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [parkingSpots, setParkingSpots] = useState<number>(0);
  const [keywords, setKeywords] = useState<string>("");
  const [excludeUnderContract, setExcludeUnderContract] = useState<boolean>(false);
  const [features, setFeatures] = useState<{
    [key: string]: boolean;
  }>({
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
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('comprar');
  const [dialogActiveTab, setDialogActiveTab] = useState('buy');

  // Sincronizar tabs entre o diálogo e o principal
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
    
    if (propertyType) params.append('type', propertyType);
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
  };

  const handleClearFilters = () => {
    setPropertyType("");
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
    <div className="flex flex-col gap-4">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="alugar">Alugar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <AutocompleteSearch
            value={location}
            onChange={setLocation}
            placeholder="Digite o endereço, bairro ou cidade..."
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
          >
            Filtros
          </Button>
          <Button 
            onClick={handleQuickSearch}
            className="bg-navy-700 hover:bg-navy-800 text-white"
          >
            Buscar
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Filtros de Busca</DialogTitle>
          </DialogHeader>
          <Tabs value={dialogActiveTab} onValueChange={handleDialogTabChange}>
            <TabsList>
              <TabsTrigger value="buy">Comprar</TabsTrigger>
              <TabsTrigger value="rent">Alugar</TabsTrigger>
            </TabsList>

            <TabsContent value="buy">
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="space-y-6 p-1">
                  <PropertyTypeSelector
                    propertyType={propertyType}
                    onPropertyTypeChange={setPropertyType}
                  />
                  <PriceFilters
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                  />
                  <PropertyFeatures
                    features={features}
                    onFeatureChange={(feature, checked) => setFeatures(prev => ({
                      ...prev,
                      [feature]: checked
                    }))}
                  />
                  <PropertyAge
                    minAge={minAge}
                    maxAge={maxAge}
                    onMinAgeChange={setMinAge}
                    onMaxAgeChange={setMaxAge}
                  />
                  <SizeFilters
                    landSize={landSize}
                    buildingSize={buildingSize}
                    onLandSizeChange={(min, max) => setLandSize([min, max])}
                    onBuildingSizeChange={(min, max) => setBuildingSize([min, max])}
                  />
                  <RoomFilters
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    parkingSpots={parkingSpots}
                    onBedroomsChange={setBedrooms}
                    onBathroomsChange={setBathrooms}
                    onParkingSpotsChange={setParkingSpots}
                  />
                  <KeywordFilters
                    keywords={keywords}
                    excludeUnderContract={excludeUnderContract}
                    onKeywordsChange={setKeywords}
                    onExcludeUnderContractChange={setExcludeUnderContract}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rent">
              <div className="max-h-[70vh] overflow-y-auto">
                <div className="space-y-6 p-1">
                  <PropertyTypeSelector
                    propertyType={propertyType}
                    onPropertyTypeChange={setPropertyType}
                  />
                  <PriceFilters
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                  />
                  <PropertyFeatures
                    features={features}
                    onFeatureChange={(feature, checked) => setFeatures(prev => ({
                      ...prev,
                      [feature]: checked
                    }))}
                  />
                  <PropertyAge
                    minAge={minAge}
                    maxAge={maxAge}
                    onMinAgeChange={setMinAge}
                    onMaxAgeChange={setMaxAge}
                  />
                  <SizeFilters
                    landSize={landSize}
                    buildingSize={buildingSize}
                    onLandSizeChange={(min, max) => setLandSize([min, max])}
                    onBuildingSizeChange={(min, max) => setBuildingSize([min, max])}
                  />
                  <ContractDurationFilters
                    minContractDuration={minContractDuration}
                    maxContractDuration={maxContractDuration}
                    onMinContractDurationChange={setMinContractDuration}
                    onMaxContractDurationChange={setMaxContractDuration}
                  />
                  <RoomFilters
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    parkingSpots={parkingSpots}
                    onBedroomsChange={setBedrooms}
                    onBathroomsChange={setBathrooms}
                    onParkingSpotsChange={setParkingSpots}
                  />
                  <KeywordFilters
                    keywords={keywords}
                    excludeUnderContract={excludeUnderContract}
                    onKeywordsChange={setKeywords}
                    onExcludeUnderContractChange={setExcludeUnderContract}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </Button>
            <Button onClick={handleSearch}>
              Aplicar Filtros
            </Button>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            Fechar
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchFilters;

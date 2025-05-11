import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchFiltersContext } from './SearchFiltersContext';

export function useSearchFiltersHandlers() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('comprar');
  const [dialogActiveTab, setDialogActiveTab] = useState('buy');
  const navigate = useNavigate();
  const routerLocation = useLocation();

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
    includeTotalPrice,
    minCondoFee,
    maxCondoFee,
    minPropertyTax,
    maxPropertyTax,
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
    setIncludeTotalPrice,
    setMinCondoFee,
    setMaxCondoFee,
    setMinPropertyTax,
    setMaxPropertyTax,
  } = useSearchFiltersContext();

  // Limpa filtros do contexto se a URL não tiver parâmetros
  useEffect(() => {
    if (!routerLocation.search) {
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
      setIncludeTotalPrice(false);
      setMinCondoFee(0);
      setMaxCondoFee(0);
      setMinPropertyTax(0);
      setMaxPropertyTax(0);
      setLocation('');
    }
  }, [routerLocation.search]);

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
    if (propertyTypes.length > 0) {
      params.append('propertyTypes', propertyTypes.join(','));
    }
    if (location) params.append('search', location);
    if (activeTab === 'alugar' && includeTotalPrice) {
      if (minPrice > 0) params.append('minTotalPrice', minPrice.toString());
      if (maxPrice > 0) params.append('maxTotalPrice', maxPrice.toString());
      if (minCondoFee > 0) params.append('minCondoFee', minCondoFee.toString());
      if (maxCondoFee > 0) params.append('maxCondoFee', maxCondoFee.toString());
      if (minPropertyTax > 0) params.append('minPropertyTax', minPropertyTax.toString());
      if (maxPropertyTax > 0) params.append('maxPropertyTax', maxPropertyTax.toString());
    } else {
      if (minPrice > 0) params.append('minPrice', minPrice.toString());
      if (maxPrice > 0) params.append('maxPrice', maxPrice.toString());
    }
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
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleClearFilters = () => {
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
    setIncludeTotalPrice(false);
    setMinCondoFee(0);
    setMaxCondoFee(0);
    setMinPropertyTax(0);
    setMaxPropertyTax(0);
    setLocation('');
    const transaction = activeTab === 'comprar' ? 'sale' : 'rent';
    navigate(`/properties?transaction=${transaction}`);
  };

  const handleQuickSearch = () => {
    const params = new URLSearchParams();
    params.append('transaction', activeTab === 'comprar' ? 'sale' : 'rent');
    if (location) params.append('search', location);
    navigate(`/properties?${params.toString()}`);
  };

  return {
    isOpen,
    setIsOpen,
    location,
    setLocation,
    activeTab,
    setActiveTab,
    dialogActiveTab,
    setDialogActiveTab,
    handleTabChange,
    handleDialogTabChange,
    handleSearch,
    handleClearFilters,
    handleQuickSearch,
  };
} 
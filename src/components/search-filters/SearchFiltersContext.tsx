
import React, { createContext, useContext, useState } from 'react';

interface SearchFiltersContextType {
  propertyTypes: string[];
  setPropertyTypes: React.Dispatch<React.SetStateAction<string[]>>;
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minAge: number;
  maxAge: number;
  setMinAge: React.Dispatch<React.SetStateAction<number>>;
  setMaxAge: React.Dispatch<React.SetStateAction<number>>;
  landSize: [number, number];
  buildingSize: [number, number];
  setLandSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  setBuildingSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  minContractDuration: number;
  maxContractDuration: number;
  setMinContractDuration: React.Dispatch<React.SetStateAction<number>>;
  setMaxContractDuration: React.Dispatch<React.SetStateAction<number>>;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  setBedrooms: React.Dispatch<React.SetStateAction<number>>;
  setBathrooms: React.Dispatch<React.SetStateAction<number>>;
  setParkingSpots: React.Dispatch<React.SetStateAction<number>>;
  keywords: string;
  excludeUnderContract: boolean;
  setKeywords: React.Dispatch<React.SetStateAction<string>>;
  setExcludeUnderContract: React.Dispatch<React.SetStateAction<boolean>>;
  features: {
    [key: string]: boolean;
  };
  setFeatures: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
  }>>;
}

const SearchFiltersContext = createContext<SearchFiltersContextType | undefined>(undefined);

export const SearchFiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
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

  return (
    <SearchFiltersContext.Provider
      value={{
        propertyTypes,
        setPropertyTypes,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        minAge,
        maxAge,
        setMinAge,
        setMaxAge,
        landSize,
        buildingSize,
        setLandSize,
        setBuildingSize,
        minContractDuration,
        maxContractDuration,
        setMinContractDuration,
        setMaxContractDuration,
        bedrooms,
        bathrooms,
        parkingSpots,
        setBedrooms,
        setBathrooms,
        setParkingSpots,
        keywords,
        excludeUnderContract,
        setKeywords,
        setExcludeUnderContract,
        features,
        setFeatures,
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};

export const useSearchFiltersContext = () => {
  const context = useContext(SearchFiltersContext);
  if (context === undefined) {
    throw new Error('useSearchFiltersContext must be used within a SearchFiltersProvider');
  }
  return context;
};

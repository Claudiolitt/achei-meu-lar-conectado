
import React from 'react';
import { PropertyTypeSelector } from './PropertyTypeSelector';
import { PriceFilters } from './PriceFilters';
import { PropertyFeatures } from './PropertyFeatures';
import { PropertyAge } from './PropertyAge';
import { SizeFilters } from './SizeFilters';
import { ContractDurationFilters } from './ContractDurationFilters';
import { RoomFilters } from './RoomFilters';
import { KeywordFilters } from './KeywordFilters';
import { useSearchFiltersContext } from './SearchFiltersContext';

interface SearchFilterContentProps {
  transactionType: 'buy' | 'rent';
  isDialog?: boolean;
}

const SearchFilterContent: React.FC<SearchFilterContentProps> = ({
  transactionType,
  isDialog = false
}) => {
  const { 
    propertyTypes,
    setPropertyTypes,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    features,
    setFeatures,
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
    setExcludeUnderContract
  } = useSearchFiltersContext();

  return (
    <div className={isDialog ? "max-h-[70vh] overflow-y-auto" : ""}>
      <div className="space-y-6 p-1">
        <PropertyTypeSelector
          propertyTypes={propertyTypes}
          onPropertyTypesChange={setPropertyTypes}
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
        {transactionType === 'rent' && (
          <ContractDurationFilters
            minContractDuration={minContractDuration}
            maxContractDuration={maxContractDuration}
            onMinContractDurationChange={setMinContractDuration}
            onMaxContractDurationChange={setMaxContractDuration}
          />
        )}
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
  );
};

export default SearchFilterContent;

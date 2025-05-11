import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

import { useNavigate } from "react-router-dom";
import { PropertyType } from "@/types/property";
import { PriceFilters } from "@/components/search-filters/PriceFilters";
import { PropertyFeatures } from "@/components/search-filters/PropertyFeatures";
import { PropertyAge } from "@/components/search-filters/PropertyAge";
import { SizeFilters } from "@/components/search-filters/SizeFilters";

const SearchFilters: React.FC = () => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [landSize, setLandSize] = useState<[number, number]>([0, 1000]);
  const [buildingSize, setBuildingSize] = useState<[number, number]>([0, 1000]);
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const [features, setFeatures] = useState<{[key: string]: boolean}>({
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
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minAge) params.append('minAge', minAge);
    if (maxAge) params.append('maxAge', maxAge);
    if (landSize[0] > 0) params.append('minLandSize', landSize[0].toString());
    if (landSize[1] < 1000) params.append('maxLandSize', landSize[1].toString());
    if (buildingSize[0] > 0) params.append('minBuildingSize', buildingSize[0].toString());
    if (buildingSize[1] < 1000) params.append('maxBuildingSize', buildingSize[1].toString());
    
    const activeFeatures = Object.entries(features)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    if (activeFeatures.length > 0) {
      params.append('features', activeFeatures.join(','));
    }
    
    navigate(`/properties?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinAge('');
    setMaxAge('');
    setLandSize([0, 1000]);
    setBuildingSize([0, 1000]);
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

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="comprar" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="alugar">Alugar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setIsOpen(true)}>
          Filtros
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Tabs defaultValue="preco">
            <TabsList>
              <TabsTrigger value="preco">Preço</TabsTrigger>
              <TabsTrigger value="caracteristicas">Características</TabsTrigger>
              <TabsTrigger value="idade">Idade</TabsTrigger>
              <TabsTrigger value="tamanho">Tamanho</TabsTrigger>
            </TabsList>

            <TabsContent value="preco">
              <PriceFilters
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />
            </TabsContent>

            <TabsContent value="caracteristicas">
              <PropertyFeatures
                features={features}
                onFeatureChange={(feature, checked) => setFeatures(prev => ({
                  ...prev,
                  [feature]: checked
                }))}
              />
            </TabsContent>

            <TabsContent value="idade">
              <PropertyAge
                minAge={minAge}
                maxAge={maxAge}
                onMinAgeChange={setMinAge}
                onMaxAgeChange={setMaxAge}
              />
            </TabsContent>

            <TabsContent value="tamanho">
              <SizeFilters
                landSize={landSize}
                buildingSize={buildingSize}
                onLandSizeChange={(min, max) => setLandSize([min, max])}
                onBuildingSizeChange={(min, max) => setBuildingSize([min, max])}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar Filtros
            </Button>
            <Button onClick={handleSearch}>
              Aplicar Filtros
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minAge) params.append('minAge', minAge);
    if (maxAge) params.append('maxAge', maxAge);
    if (landSize[0] > 0) params.append('minLandSize', landSize[0].toString());
    if (landSize[1] < 1000) params.append('maxLandSize', landSize[1].toString());
    if (buildingSize[0] > 0) params.append('minBuildingSize', buildingSize[0].toString());
    if (buildingSize[1] < 1000) params.append('maxBuildingSize', buildingSize[1].toString());
    
    const activeFeatures = Object.entries(features)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    if (activeFeatures.length > 0) {
      params.append('features', activeFeatures.join(','));
    }
    
    navigate(`/properties?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinAge('');
    setMaxAge('');
    setLandSize([0, 1000]);
    setBuildingSize([0, 1000]);
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

  const handleApplyFilters = () => {
    handleSearch(location);
  };

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="comprar" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comprar">Comprar</TabsTrigger>
          <TabsTrigger value="alugar">Alugar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setIsOpen(true)}>
          Filtros
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Tabs defaultValue="preco">
            <TabsList>
              <TabsTrigger value="preco">Preço</TabsTrigger>
              <TabsTrigger value="caracteristicas">Características</TabsTrigger>
              <TabsTrigger value="idade">Idade</TabsTrigger>
              <TabsTrigger value="tamanho">Tamanho</TabsTrigger>
            </TabsList>

            <TabsContent value="preco">
              <PriceFilters
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />
            </TabsContent>

            <TabsContent value="caracteristicas">
              <PropertyFeatures
                features={features}
                onFeaturesChange={setFeatures}
              />
            </TabsContent>

            <TabsContent value="idade">
              <PropertyAge
                minAge={minAge}
                maxAge={maxAge}
                onMinAgeChange={setMinAge}
                onMaxAgeChange={setMaxAge}
              />
            </TabsContent>

            <TabsContent value="tamanho">
              <SizeFilters
                landSize={landSize}
                buildingSize={buildingSize}
                onLandSizeChange={setLandSize}
                onBuildingSizeChange={setBuildingSize}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar Filtros
            </Button>
            <Button onClick={handleSearch}>
              Aplicar Filtros
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

};)}
  </div>
  
  <div className="flex gap-4 items-center">
    <div className="flex-1">
      <Input
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Digite o endereço, bairro ou cidade..."
        className="dark:bg-[#232c43] dark:text-white"
      />
    </div>
    <Button
      onClick={() => setIsOpen(true)}
      variant="outline"
      className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
    >
      Filtros
    </Button>
  </div>

  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Filtros de Busca</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="price" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="price">Preço</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="age">Idade</TabsTrigger>
          <TabsTrigger value="size">Tamanho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="price">
          <div>
            <Label className="font-semibold mb-2 text-navy-900 dark:text-white">Preço</Label>
            <div className="space-y-4">
              <div className="flex gap-2">
                onFeatureChange={(feature, checked) => setFeatures({...features, [feature]: checked})}
              />
                    <span className="text-navy-700 dark:text-white">Escritório</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.builtInWardrobe}
                      onCheckedChange={(checked) => setFeatures({...features, builtInWardrobe: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Armários embutidos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.laundry}
                      onCheckedChange={(checked) => setFeatures({...features, laundry: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Lavanderia</span>
                  </label>
                </div>
              </div>

              {/* Climatização e Energia */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Climatização e Energia</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.airConditioning}
                      onCheckedChange={(checked) => setFeatures({...features, airConditioning: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Ar-condicionado</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.heating}
                      onCheckedChange={(checked) => setFeatures({...features, heating: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Aquecimento</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.solarPanels}
                      onCheckedChange={(checked) => setFeatures({...features, solarPanels: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Painéis solares</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.fireplace}
                      onCheckedChange={(checked) => setFeatures({...features, fireplace: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Lareira</span>
                  </label>
                </div>
              </div>

              {/* Acessibilidade */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Acessibilidade</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.groundFloor}
                      onCheckedChange={(checked) => setFeatures({...features, groundFloor: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Térreo</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.noSteps}
                      onCheckedChange={(checked) => setFeatures({...features, noSteps: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Entrada sem degraus</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.wideDoors}
                      onCheckedChange={(checked) => setFeatures({...features, wideDoors: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Portas largas</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.elevator}
                      onCheckedChange={(checked) => setFeatures({...features, elevator: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Elevador</span>
                  </label>
                </div>
              </div>

              {/* Palavras-chave */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Palavras-chave</h4>
                <Input
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="Digite palavras-chave..."
                  className="dark:bg-[#232c43] dark:text-white"
                />
              </div>

              {/* Método de venda */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Método de venda</h4>
                <Select value={saleMethod} onValueChange={setSaleMethod}>
                  <SelectTrigger className="dark:bg-[#232c43] dark:text-white">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="private">Particular</SelectItem>
                    <SelectItem value="auction">Leilão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Excluir imóveis sob contrato */}
              <div>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={excludeUnderContract}
                    onCheckedChange={(checked) => setExcludeUnderContract(checked as boolean)}
                  />
              {/* Preço do Aluguel */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Preço do Aluguel</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                      placeholder="Mínimo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                      disabled={useTotalPrice}
                    />
                    <Input
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      placeholder="Máximo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                      disabled={useTotalPrice}
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={showPriceOnly}
                      onCheckedChange={(checked) => setShowPriceOnly(checked as boolean)}
                      disabled={useTotalPrice}
                    />
                    <span className="text-navy-700 dark:text-white">Mostrar apenas imóveis com preço</span>
                  </label>
                </div>
              </div>

              {/* Checkbox preço total - apenas na aba Alugar */}
              <div className="mt-2">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={useTotalPrice}
                    onCheckedChange={(checked) => setUseTotalPrice(checked as boolean)}
                  />
                  <span className="text-navy-700 dark:text-white">Usar preço total (aluguel + condomínio + IPTU)</span>
                </label>
              </div>

              {/* Filtros de Condomínio e IPTU */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Condomínio (R$)</h4>
                  <div className="flex gap-2">
                    <Input
                      value={minCondo}
                      onChange={e => setMinCondo(e.target.value)}
                      placeholder="Mínimo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                    <Input
                      value={maxCondo}
                      onChange={e => setMaxCondo(e.target.value)}
                      placeholder="Máximo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">IPTU (R$)</h4>
                  <div className="flex gap-2">
                    <Input
                      value={minIptu}
                      onChange={e => setMinIptu(e.target.value)}
                      placeholder="Mínimo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                    <Input
                      value={maxIptu}
                      onChange={e => setMaxIptu(e.target.value)}
                      placeholder="Máximo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Duração do Contrato */}
              <div className="flex gap-4 mt-2">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Duração do Contrato (meses)</h4>
                  <div className="flex gap-2">
                    <Input
                      value={minContractDuration}
                      onChange={e => setMinContractDuration(e.target.value)}
                      placeholder="Mínimo (meses)"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                    <Input
                      value={maxContractDuration}
                      onChange={e => setMaxContractDuration(e.target.value)}
                      placeholder="Máximo (meses)"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Quartos, Banheiros e Vagas */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Quartos, Banheiros e Vagas</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-navy-700 dark:text-white">Quartos</label>
                    <Select
                      value={bedrooms === 0 ? '' : bedrooms.toString()}
                      onValueChange={(value) => setBedrooms(Number(value))}
                    >
                      <SelectTrigger className="dark:bg-[#232c43] dark:text-white">
                        <SelectValue placeholder="Mínimo" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-navy-700 dark:text-white">Banheiros</label>
                    <Select
                      value={bathrooms === 0 ? '' : bathrooms.toString()}
                      onValueChange={(value) => setBathrooms(Number(value))}
                    >
                      <SelectTrigger className="dark:bg-[#232c43] dark:text-white">
                        <SelectValue placeholder="Mínimo" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-navy-700 dark:text-white">Vagas</label>
                    <Select
                      value={parkingSpots === 0 ? '' : parkingSpots.toString()}
                      onValueChange={(value) => setParkingSpots(Number(value))}
                    >
                      <SelectTrigger className="dark:bg-[#232c43] dark:text-white">
                        <SelectValue placeholder="Mínimo" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Características do Imóvel */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Características do Imóvel</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Características Externas</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[/* ... */].map(feature => (
                        { id: 'garage', label: 'Garagem' },
                        { id: 'garden', label: 'Jardim' },
                        { id: 'balcony', label: 'Varanda' },
                        { id: 'barbecue', label: 'Churrasqueira' },
                        { id: 'security', label: 'Segurança 24h' }
                      ].map(feature => (
                        <label key={feature.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={features[feature.id]}
                            onCheckedChange={(checked) => setFeatures({...features, [feature.id]: checked as boolean})}
                          />
                          <span className="text-navy-700 dark:text-white">{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Características Internas</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'suite', label: 'Suíte' },
                        { id: 'office', label: 'Escritório' },
                        { id: 'dishwasher', label: 'Lava-louças' },
                        { id: 'furnished', label: 'Mobiliado' },
                        { id: 'builtIn', label: 'Armários embutidos' },
                        { id: 'airConditioning', label: 'Ar-condicionado' }
                      ].map(feature => (
                        <label key={feature.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={features[feature.id]}
                            onCheckedChange={(checked) => setFeatures({...features, [feature.id]: checked as boolean})}
                          />
                          <span className="text-navy-700 dark:text-white">{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Acessibilidade</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'groundFloor', label: 'Térreo' },
                        { id: 'noSteps', label: 'Sem degraus' },
                        { id: 'wideDoors', label: 'Portas largas' },
                        { id: 'elevator', label: 'Elevador' }
                      ].map(feature => (
                        <label key={feature.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={features[feature.id]}
                            onCheckedChange={(checked) => setFeatures({...features, [feature.id]: checked as boolean})}
                          />
                          <span className="text-navy-700 dark:text-white">{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Palavras-chave e Exclusão */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Palavras-chave</h4>
                  <Input
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    placeholder="Digite palavras-chave..."
                    className="dark:bg-[#232c43] dark:text-white"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={excludeUnderContract}
                      onCheckedChange={(checked) => setExcludeUnderContract(checked as boolean)}
                    />
                    <span className="text-navy-700 dark:text-white">Excluir imóveis sob contrato</span>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
            >
              Limpar Filtros
            </Button>
            <Button onClick={handleApplyFilters}>
              Aplicar Filtros
            </Button>
          </div>

          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchFilters;

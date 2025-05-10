import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Home, MapPin, Search } from 'lucide-react';
import { PropertyType } from '../types/property';
import AutocompleteSearch from './AutocompleteSearch';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

const SearchFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [transactionType, setTransactionType] = useState<string>('buy');
  const [contractDuration, setContractDuration] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [condoRange, setCondoRange] = useState<[number, number]>([0, 2000]);
  const [iptuRange, setIptuRange] = useState<[number, number]>([0, 2000]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [parkingSpots, setParkingSpots] = useState<number>(0);
  const [totalPriceRange, setTotalPriceRange] = useState<[number, number]>([0, 3000000]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [landSize, setLandSize] = useState<[number, number]>([0, 1000]);
  const [buildingSize, setBuildingSize] = useState<[number, number]>([0, 1000]);
  const [yearBuilt, setYearBuilt] = useState<string>('any');
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
    established: false,
    suite: false,
    dishwasher: false,
    builtIn: false,
    security: false,
  });
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('comprar');
  const [showFilters, setShowFilters] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [saleMethod, setSaleMethod] = useState<string>('all');
  const [excludeUnderContract, setExcludeUnderContract] = useState(false);
  const [showPriceOnly, setShowPriceOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [minCondo, setMinCondo] = useState('');
  const [maxCondo, setMaxCondo] = useState('');
  const [minIptu, setMinIptu] = useState('');
  const [maxIptu, setMaxIptu] = useState('');
  const [useTotalPrice, setUseTotalPrice] = useState(false);
  const [minContractDuration, setMinContractDuration] = useState('');
  const [maxContractDuration, setMaxContractDuration] = useState('');

  const togglePropertyType = (type: PropertyType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    params.append('q', query);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (bedrooms > 0) params.append('bedrooms', bedrooms.toString());
    if (bathrooms > 0) params.append('bathrooms', bathrooms.toString());
    if (parkingSpots > 0) params.append('parkingSpots', parkingSpots.toString());
    if (propertyTypes.length > 0) params.append('propertyTypes', propertyTypes.join(','));
    Object.entries(features).forEach(([key, value]) => {
      if (value) params.append(`feature_${key}`, 'true');
    });
    if (keywords) params.append('keywords', keywords);
    if (showPriceOnly) params.append('showPriceOnly', 'true');
    if (excludeUnderContract) params.append('excludeUnderContract', 'true');
    if (!useTotalPrice) {
      if (minCondo) params.append('minCondo', minCondo);
      if (maxCondo) params.append('maxCondo', maxCondo);
      if (minIptu) params.append('minIptu', minIptu);
      if (maxIptu) params.append('maxIptu', maxIptu);
    }
    if (useTotalPrice) params.append('useTotalPrice', 'true');
    if (minContractDuration) params.append('minContractDuration', minContractDuration);
    if (maxContractDuration) params.append('maxContractDuration', maxContractDuration);
    navigate(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  const handleApplyFilters = () => {
    handleSearch(location);
  };

  const handleClearFilters = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms(0);
    setBathrooms(0);
    setParkingSpots(0);
    setPropertyTypes([]);
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
      established: false,
      suite: false,
      dishwasher: false,
      builtIn: false,
      security: false,
    });
    setKeywords('');
    setShowPriceOnly(false);
    setExcludeUnderContract(false);
    setMinCondo('');
    setMaxCondo('');
    setMinIptu('');
    setMaxIptu('');
    setUseTotalPrice(false);
    setMinContractDuration('');
    setMaxContractDuration('');
  };

  return (
    <div className="bg-white dark:bg-[#18223a] rounded-xl shadow-md p-4 border border-navy-100 dark:border-[#18223a] flex flex-col gap-2">
      <div className="flex gap-6 border-b border-gray-200 dark:border-navy-700 pb-2">
        {['comprar', 'alugar'].map(tab => (
          <button
            key={tab}
            className={`text-base font-semibold pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary dark:text-primary' : 'border-transparent text-navy-700 dark:text-white'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
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
        <Button
          onClick={() => handleSearch(location)}
          className="bg-navy-600 hover:bg-navy-700 text-white"
        >
          Aplicar Filtros
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filtros de Busca</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="comprar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comprar">Comprar</TabsTrigger>
              <TabsTrigger value="alugar">Alugar</TabsTrigger>
            </TabsList>

            <TabsContent value="comprar" className="space-y-6">
              {/* Tipo de Imóvel */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Tipo de imóvel</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['todos', 'casa', 'apartamento', 'terreno', 'comercial', 'vila', 'rural', 'condomínio', 'outros'].map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <Checkbox
                        checked={propertyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) setPropertyTypes([...propertyTypes, type]);
                          else setPropertyTypes(propertyTypes.filter(t => t !== type));
                        }}
                      />
                      <span className="text-navy-700 dark:text-white">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preço */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Preço</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                      placeholder="Mínimo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                    <Input
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      placeholder="Máximo"
                      className="dark:bg-[#232c43] dark:text-white"
                      type="number"
                      min={0}
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={showPriceOnly}
                      onCheckedChange={(checked) => setShowPriceOnly(checked as boolean)}
                    />
                    <span className="text-navy-700 dark:text-white">Mostrar apenas imóveis com preço</span>
                  </label>
                </div>
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

              {/* Quartos, Banheiros, Vagas */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Quartos</h4>
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
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Banheiros</h4>
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
                  <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Vagas</h4>
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

              {/* Área */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Área do terreno</h4>
                <div className="flex gap-2">
                  <Input
                    value={landSize[0]}
                    onChange={e => setLandSize([Number(e.target.value), landSize[1]])}
                    placeholder="Mínimo (m²)"
                    className="dark:bg-[#232c43] dark:text-white"
                    type="number"
                    min={0}
                  />
                  <Input
                    value={landSize[1]}
                    onChange={e => setLandSize([landSize[0], Number(e.target.value)])}
                    placeholder="Máximo (m²)"
                    className="dark:bg-[#232c43] dark:text-white"
                    type="number"
                    min={0}
                  />
                </div>
              </div>

              {/* Propriedade */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Propriedade</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.new}
                      onCheckedChange={(checked) => setFeatures({...features, new: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Nova</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={!features.new}
                      onCheckedChange={(checked) => setFeatures({...features, new: !checked})}
                    />
                    <span className="text-navy-700 dark:text-white">Estabelecida</span>
                  </label>
                </div>
              </div>

              {/* Características Externas */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Características Externas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.pool}
                      onCheckedChange={(checked) => setFeatures({...features, pool: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Piscina</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.garage}
                      onCheckedChange={(checked) => setFeatures({...features, garage: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Garagem</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.balcony}
                      onCheckedChange={(checked) => setFeatures({...features, balcony: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Varanda</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.garden}
                      onCheckedChange={(checked) => setFeatures({...features, garden: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Jardim</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.barbecue}
                      onCheckedChange={(checked) => setFeatures({...features, barbecue: checked as boolean})}
                    />
                    <span className="text-navy-700 dark:text-white">Churrasqueira</span>
                  </label>
                </div>
              </div>

              {/* Características Internas */}
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Características Internas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={features.office}
                      onCheckedChange={(checked) => setFeatures({...features, office: checked as boolean})}
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
                  <span className="text-navy-700 dark:text-white">Excluir imóveis sob contrato</span>
                </label>
              </div>
            </TabsContent>

            <TabsContent value="alugar" className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Tipo de imóvel</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['todos', 'casa', 'apartamento', 'terreno', 'comercial', 'vila', 'rural', 'condomínio', 'outros'].map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <Checkbox
                        checked={propertyTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) setPropertyTypes([...propertyTypes, type]);
                          else setPropertyTypes(propertyTypes.filter(t => t !== type));
                        }}
                      />
                      <span className="text-navy-700 dark:text-white">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

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
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Tipo de Propriedade</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={features.new}
                          onCheckedChange={(checked) => setFeatures({...features, new: checked as boolean})}
                        />
                        <span className="text-navy-700 dark:text-white">Nova</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={features.established}
                          onCheckedChange={(checked) => setFeatures({...features, established: checked as boolean})}
                        />
                        <span className="text-navy-700 dark:text-white">Estabelecida</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Características Externas</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'pool', label: 'Piscina' },
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

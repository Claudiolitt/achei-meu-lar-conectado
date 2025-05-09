
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Home, MapPin } from 'lucide-react';
import { PropertyType } from '../types/property';
import AutocompleteSearch from './AutocompleteSearch';
import { useNavigate } from 'react-router-dom';

const SearchFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('');
  const navigate = useNavigate();
  
  const togglePropertyType = (type: PropertyType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  const handleSearch = (searchQuery: string) => {
    // Build the search query parameters
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    
    if (propertyType) {
      params.append('type', propertyType);
    }
    
    if (transactionType) {
      params.append('transaction', transactionType);
    }
    
    if (selectedTypes.length > 0) {
      params.append('propertyTypes', selectedTypes.join(','));
    }
    
    params.append('minPrice', priceRange[0].toString());
    params.append('maxPrice', priceRange[1].toString());
    params.append('minArea', areaRange[0].toString());
    params.append('maxArea', areaRange[1].toString());
    
    // Navigate to the properties page with the search parameters
    navigate(`/properties?${params.toString()}`);
  };
  
  const handleApplyFilters = () => {
    handleSearch('');
  };
  
  const handleClearFilters = () => {
    setPropertyType('');
    setTransactionType('');
    setSelectedTypes([]);
    setPriceRange([0, 1000000]);
    setAreaRange([0, 500]);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 relative">
            <AutocompleteSearch 
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="apartment">Apartamento</SelectItem>
                <SelectItem value="house">Casa</SelectItem>
                <SelectItem value="commercial">Comercial</SelectItem>
                <SelectItem value="land">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/4">
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="Comprar ou Alugar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sale">Comprar</SelectItem>
                <SelectItem value="rent">Alugar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/6">
            <Button 
              className="w-full bg-navy-700 hover:bg-navy-600"
              onClick={handleSearch.bind(null, '')}
            >
              Buscar
            </Button>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-navy-700 p-0 flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            {isExpanded ? "Menos filtros" : "Mais filtros"}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Preço (R$)
              </label>
              <div className="px-3">
                <Slider
                  value={priceRange}
                  max={2000000}
                  step={50000}
                  onValueChange={(value) => setPriceRange(value as number[])}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-navy-500">
                <span>{priceRange[0].toLocaleString('pt-BR')}</span>
                <span>{priceRange[1].toLocaleString('pt-BR')}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Dormitórios
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Vagas de garagem
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Área (m²)
              </label>
              <div className="px-3">
                <Slider
                  value={areaRange}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setAreaRange(value as number[])}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-navy-500">
                <span>{areaRange[0]} m²</span>
                <span>{areaRange[1]} m²</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Mobiliado
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Idade do Imóvel
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="new">Novo (Até 2 anos)</SelectItem>
                  <SelectItem value="recent">De 2 a 5 anos</SelectItem>
                  <SelectItem value="established">De 5 a 10 anos</SelectItem>
                  <SelectItem value="old">Acima de 10 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Tipo de Imóvel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant={selectedTypes.includes('apartment') ? 'default' : 'outline'}
                  className={selectedTypes.includes('apartment') ? 'bg-navy-700' : ''}
                  onClick={() => togglePropertyType('apartment')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Apartamento
                </Button>
                <Button
                  variant={selectedTypes.includes('house') ? 'default' : 'outline'}
                  className={selectedTypes.includes('house') ? 'bg-navy-700' : ''}
                  onClick={() => togglePropertyType('house')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Casa
                </Button>
                <Button
                  variant={selectedTypes.includes('commercial') ? 'default' : 'outline'}
                  className={selectedTypes.includes('commercial') ? 'bg-navy-700' : ''}
                  onClick={() => togglePropertyType('commercial')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Comercial
                </Button>
                <Button
                  variant={selectedTypes.includes('land') ? 'default' : 'outline'}
                  className={selectedTypes.includes('land') ? 'bg-navy-700' : ''}
                  onClick={() => togglePropertyType('land')}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Terreno
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-3 pt-4 flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </Button>
              <Button 
                className="bg-navy-700 hover:bg-navy-600"
                onClick={handleApplyFilters}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;

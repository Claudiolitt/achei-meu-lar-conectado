
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const SearchFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cidade, bairro ou endereço" 
                className="w-full pl-10"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <Select>
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
            <Select>
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
            <Button className="w-full bg-navy-700 hover:bg-navy-600">
              <Search className="mr-2 h-4 w-4" />
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
                  defaultValue={[0, 1000000]}
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="150">150+</SelectItem>
                  <SelectItem value="200">200+</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;

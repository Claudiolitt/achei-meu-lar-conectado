import React from 'react';
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { SelectSeparator } from "@/components/ui/select";
import { SelectScrollUpButton } from "@/components/ui/select";
import { SelectScrollDownButton } from "@/components/ui/select";

interface PropertyTypeSelectorProps {
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
}

export const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  propertyType,
  onPropertyTypeChange,
}) => {
  const residentialOptions = [
    { id: 'apartamento', label: 'Apartamento' },
    { id: 'casa', label: 'Casa' },
    { id: 'casa-de-condominio', label: 'Casa de Condomínio' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'kitnet', label: 'Kitnet' },
    { id: 'loft', label: 'Loft' },
    { id: 'studio', label: 'Studio' },
    { id: 'sobrado', label: 'Sobrado' },
    { id: 'terreno', label: 'Terreno' },
    { id: 'chacara', label: 'Chácara' },
    { id: 'sala-comercial', label: 'Sala Comercial' },
  ];

  const commercialOptions = [
    { id: 'loja', label: 'Loja' },
    { id: 'galpao', label: 'Galpão' },
    { id: 'deposito', label: 'Depósito' },
    { id: 'area-industrial', label: 'Área Industrial' },
    { id: 'praca-comercial', label: 'Praça Comercial' },
    { id: 'edificio-comercial', label: 'Edifício Comercial' },
    { id: 'edificio-industrial', label: 'Edifício Industrial' },
    { id: 'edificio-misto', label: 'Edifício Misto' },
    { id: 'galpao-industrial', label: 'Galpão Industrial' },
    { id: 'predio-comercial', label: 'Prédio Comercial' },
    { id: 'predio-industrial', label: 'Prédio Industrial' },
  ];

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Tipo de Imóvel</h4>
      <Select
        value={propertyType}
        onValueChange={onPropertyTypeChange}
      >
        <SelectTrigger className="dark:bg-[#232c43] dark:text-white">
          <SelectValue placeholder="Selecione o tipo de imóvel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Todos os tipos</SelectLabel>
            <SelectItem value="">
              Todos os tipos
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Residencial</SelectLabel>
            {residentialOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Comercial</SelectLabel>
            {commercialOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

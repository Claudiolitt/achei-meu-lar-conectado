import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropertyTypeSelectorProps {
  propertyTypes: string[];
  onPropertyTypesChange: (values: string[]) => void;
}

export const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  propertyTypes,
  onPropertyTypesChange,
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
  ];

  const commercialOptions = [
    { id: 'sala-comercial', label: 'Sala Comercial' },
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

  // All property options for easy access
  const allOptions = [...residentialOptions, ...commercialOptions];

  // Handle select/deselect all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all options
      onPropertyTypesChange(allOptions.map(option => option.id));
    } else {
      // Deselect all
      onPropertyTypesChange([]);
    }
  };

  // Handle individual option selection
  const handleOptionToggle = (optionId: string, checked: boolean) => {
    if (checked) {
      // Add the option
      onPropertyTypesChange([...propertyTypes, optionId]);
    } else {
      // Remove the option
      onPropertyTypesChange(propertyTypes.filter(id => id !== optionId));
    }
  };

  // Check if all options are selected
  const allSelected = propertyTypes.length === allOptions.length;
  // Check if all residential or all commercial are selected
  const allResidentialSelected = residentialOptions.every(opt => propertyTypes.includes(opt.id));
  const allCommercialSelected = commercialOptions.every(opt => propertyTypes.includes(opt.id));

  // Handle select/deselect all residential
  const handleSelectAllResidential = (checked: boolean) => {
    if (checked) {
      // Adiciona todos residenciais (sem duplicar)
      const newTypes = Array.from(new Set([...propertyTypes, ...residentialOptions.map(o => o.id)]));
      onPropertyTypesChange(newTypes);
    } else {
      // Remove todos residenciais
      onPropertyTypesChange(propertyTypes.filter(id => !residentialOptions.some(o => o.id === id)));
    }
  };
  // Handle select/deselect all commercial
  const handleSelectAllCommercial = (checked: boolean) => {
    if (checked) {
      const newTypes = Array.from(new Set([...propertyTypes, ...commercialOptions.map(o => o.id)]));
      onPropertyTypesChange(newTypes);
    } else {
      onPropertyTypesChange(propertyTypes.filter(id => !commercialOptions.some(o => o.id === id)));
    }
  };

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Tipo de Imóvel</h4>
      
      <div className="space-y-4">
        {/* Select all option */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">Todos os tipos</Label>
        </div>
        
        {/* Residential group */}
        <div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Residencial</h5>
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="select-all-residential"
              checked={allResidentialSelected}
              onCheckedChange={handleSelectAllResidential}
            />
            <Label htmlFor="select-all-residential" className="text-navy-700 dark:text-white">Selecionar todos residenciais</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {residentialOptions.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  id={`prop-type-${option.id}`}
                  checked={propertyTypes.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionToggle(option.id, checked as boolean)}
                />
                <Label htmlFor={`prop-type-${option.id}`} className="text-navy-700 dark:text-white">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Commercial group */}
        <div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Comercial</h5>
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="select-all-commercial"
              checked={allCommercialSelected}
              onCheckedChange={handleSelectAllCommercial}
            />
            <Label htmlFor="select-all-commercial" className="text-navy-700 dark:text-white">Selecionar todos comerciais</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {commercialOptions.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  id={`prop-type-${option.id}`}
                  checked={propertyTypes.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionToggle(option.id, checked as boolean)}
                />
                <Label htmlFor={`prop-type-${option.id}`} className="text-navy-700 dark:text-white">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

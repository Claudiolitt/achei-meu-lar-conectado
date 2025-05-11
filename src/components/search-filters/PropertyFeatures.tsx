import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropertyFeaturesProps {
  features: {
    [key: string]: boolean;
  };
  onFeatureChange: (feature: string, checked: boolean) => void;
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  features,
  onFeatureChange,
}) => {
  const featureOptions = [
    { id: 'pool', label: 'Piscina' },
    { id: 'balcony', label: 'Sacada' },
    { id: 'furnished', label: 'Mobiliado' },
    { id: 'pet', label: 'Aceita Pets' },
    { id: 'accessible', label: 'Acessível' },
    { id: 'photo', label: 'Com Fotos' },
  ];

  return (
    <div>
      <Label className="font-semibold mb-2 text-navy-900 dark:text-white">Características</Label>
      <div className="grid grid-cols-2 gap-2">
        {featureOptions.map((option) => (
          <label key={option.id} className="flex items-center gap-2">
            <Checkbox
              checked={features[option.id]}
              onCheckedChange={(checked) => onFeatureChange(option.id, checked as boolean)}
            />
            <span className="text-navy-700 dark:text-white">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

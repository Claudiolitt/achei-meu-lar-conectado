import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PropertyCharacteristicsProps {
  features: {
    [key: string]: boolean;
  };
  onFeatureChange: (feature: string, checked: boolean) => void;
}

export const PropertyCharacteristics: React.FC<PropertyCharacteristicsProps> = ({
  features,
  onFeatureChange
}) => {
  const externalFeatures = [
    { id: 'garage', label: 'Garagem' },
    { id: 'garden', label: 'Jardim' },
    { id: 'balcony', label: 'Varanda' },
    { id: 'barbecue', label: 'Churrasqueira' },
    { id: 'security', label: 'Segurança 24h' }
  ];

  const internalFeatures = [
    { id: 'suite', label: 'Suíte' },
    { id: 'office', label: 'Escritório' },
    { id: 'dishwasher', label: 'Lava-louças' },
    { id: 'furnished', label: 'Mobiliado' },
    { id: 'builtIn', label: 'Armários embutidos' },
    { id: 'airConditioning', label: 'Ar-condicionado' }
  ];

  const accessibilityFeatures = [
    { id: 'groundFloor', label: 'Térreo' },
    { id: 'noSteps', label: 'Sem degraus' },
    { id: 'wideDoors', label: 'Portas largas' },
    { id: 'elevator', label: 'Elevador' }
  ];

  return (
    <div>
      <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Características do Imóvel</h4>
      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Características Externas</h5>
          <div className="grid grid-cols-2 gap-2">
            {externalFeatures.map(feature => (
              <label key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  checked={features[feature.id]}
                  onCheckedChange={(checked) => onFeatureChange(feature.id, checked as boolean)}
                />
                <span className="text-navy-700 dark:text-white">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Características Internas</h5>
          <div className="grid grid-cols-2 gap-2">
            {internalFeatures.map(feature => (
              <label key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  checked={features[feature.id]}
                  onCheckedChange={(checked) => onFeatureChange(feature.id, checked as boolean)}
                />
                <span className="text-navy-700 dark:text-white">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Acessibilidade</h5>
          <div className="grid grid-cols-2 gap-2">
            {accessibilityFeatures.map(feature => (
              <label key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  checked={features[feature.id]}
                  onCheckedChange={(checked) => onFeatureChange(feature.id, checked as boolean)}
                />
                <span className="text-navy-700 dark:text-white">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

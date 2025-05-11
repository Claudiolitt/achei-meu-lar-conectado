import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SizeFiltersProps {
  landSize: [number, number];
  buildingSize: [number, number];
  onLandSizeChange: (min: number, max: number) => void;
  onBuildingSizeChange: (min: number, max: number) => void;
}

export const SizeFilters: React.FC<SizeFiltersProps> = ({
  landSize,
  buildingSize,
  onLandSizeChange,
  onBuildingSizeChange,
}) => {
  return (
    <div>
      <Label className="font-semibold mb-2 text-navy-900 dark:text-white">Tamanho</Label>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-navy-700 dark:text-white mb-2">Área do Terreno</Label>
          <div className="flex gap-2">
            <Input
              value={landSize[0]}
              onChange={(e) => onLandSizeChange(Number(e.target.value), landSize[1])}
              placeholder="Mínimo"
              className="dark:bg-[#232c43] dark:text-white"
              type="number"
              min={0}
            />
            <Input
              value={landSize[1]}
              onChange={(e) => onLandSizeChange(landSize[0], Number(e.target.value))}
              placeholder="Máximo"
              className="dark:bg-[#232c43] dark:text-white"
              type="number"
              min={0}
            />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-navy-700 dark:text-white mb-2">Área Construída</Label>
          <div className="flex gap-2">
            <Input
              value={buildingSize[0]}
              onChange={(e) => onBuildingSizeChange(Number(e.target.value), buildingSize[1])}
              placeholder="Mínimo"
              className="dark:bg-[#232c43] dark:text-white"
              type="number"
              min={0}
            />
            <Input
              value={buildingSize[1]}
              onChange={(e) => onBuildingSizeChange(buildingSize[0], Number(e.target.value))}
              placeholder="Máximo"
              className="dark:bg-[#232c43] dark:text-white"
              type="number"
              min={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface RoomFiltersProps {
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  onBedroomsChange: (value: number) => void;
  onBathroomsChange: (value: number) => void;
  onParkingSpotsChange: (value: number) => void;
}

export const RoomFilters: React.FC<RoomFiltersProps> = ({
  bedrooms,
  bathrooms,
  parkingSpots,
  onBedroomsChange,
  onBathroomsChange,
  onParkingSpotsChange
}) => {
  const renderSelect = (value: number, onChange: (value: number) => void) => (
    <Select
      value={value === 0 ? '' : value.toString()}
      onValueChange={(value) => onChange(Number(value))}
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
  );

  return (
    <div>
      <h4 className="font-semibold mb-2 text-navy-900 dark:text-white">Quartos, Banheiros e Vagas</h4>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-navy-700 dark:text-white">Quartos</label>
          {renderSelect(bedrooms, onBedroomsChange)}
        </div>

        <div>
          <label className="text-sm text-navy-700 dark:text-white">Banheiros</label>
          {renderSelect(bathrooms, onBathroomsChange)}
        </div>

        <div>
          <label className="text-sm text-navy-700 dark:text-white">Vagas</label>
          {renderSelect(parkingSpots, onParkingSpotsChange)}
        </div>
      </div>
    </div>
  );
};

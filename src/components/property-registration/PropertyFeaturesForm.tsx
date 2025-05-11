import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './usePropertyRegistrationForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyFeaturesFormProps {
  form: UseFormReturn<FormValues>;
}

const externalFeatures = [
  { name: 'garage', label: 'Garagem' },
  { name: 'garden', label: 'Jardim' },
  { name: 'balcony', label: 'Varanda' },
  { name: 'barbecue', label: 'Churrasqueira' },
  { name: 'security', label: 'Segurança 24h' },
];
const internalFeatures = [
  { name: 'suite', label: 'Suíte' },
  { name: 'office', label: 'Escritório' },
  { name: 'dishwasher', label: 'Lava-louças' },
  { name: 'furnished', label: 'Mobiliado' },
  { name: 'builtIn', label: 'Móveis planejados' },
  { name: 'builtInWardrobe', label: 'Armário embutido' },
  { name: 'airConditioning', label: 'Ar-condicionado' },
  { name: 'laundry', label: 'Lavanderia' },
  { name: 'heating', label: 'Aquecimento' },
  { name: 'fireplace', label: 'Lareira' },
];
const accessibilityFeatures = [
  { name: 'groundFloor', label: 'Térreo' },
  { name: 'noSteps', label: 'Sem degraus' },
  { name: 'wideDoors', label: 'Portas largas' },
  { name: 'elevator', label: 'Elevador' },
];
const otherFeatures = [
  { name: 'pool', label: 'Piscina' },
  { name: 'new', label: 'Novo' },
  { name: 'photo', label: 'Com fotos' },
  { name: 'pet', label: 'Aceita pets' },
  { name: 'solarPanels', label: 'Energia solar' },
  { name: 'old', label: 'Imóvel antigo' },
  { name: 'veryOld', label: 'Imóvel muito antigo' },
];

const PropertyFeaturesForm: React.FC<PropertyFeaturesFormProps> = ({ form }) => {
  const priceType = form.watch('priceType');

  return (
    <div className="space-y-4 col-span-2">
      <h2 className="text-xl font-semibold border-b pb-2">Características do Imóvel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={form.control} name="features.bedrooms" render={({ field }) => (
          <FormItem>
            <FormLabel>Quartos</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.suites" render={({ field }) => (
          <FormItem>
            <FormLabel>Suítes</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.bathrooms" render={({ field }) => (
          <FormItem>
            <FormLabel>Banheiros</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.parkingSpots" render={({ field }) => (
          <FormItem>
            <FormLabel>Vagas</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.area" render={({ field }) => (
          <FormItem>
            <FormLabel>Área construída (m²)</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.landArea" render={({ field }) => (
          <FormItem>
            <FormLabel>Área do terreno (m²)</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.buildingArea" render={({ field }) => (
          <FormItem>
            <FormLabel>Área construída adicional (m²)</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.buildYear" render={({ field }) => (
          <FormItem>
            <FormLabel>Ano de Construção</FormLabel>
            <FormControl><Input type="number" min="1800" max={new Date().getFullYear()} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="features.totalFloors" render={({ field }) => (
          <FormItem>
            <FormLabel>Total de andares</FormLabel>
            <FormControl><Input type="number" min="0" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Externas */}
      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2 text-gray-700">Características Externas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {externalFeatures.map(opt => (
            <FormField
              key={opt.name}
              control={form.control}
              name={`features.${opt.name}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">{opt.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Internas */}
      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2 text-gray-700">Características Internas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {internalFeatures.map(opt => (
            <FormField
              key={opt.name}
              control={form.control}
              name={`features.${opt.name}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">{opt.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Acessibilidade */}
      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2 text-gray-700">Acessibilidade</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {accessibilityFeatures.map(opt => (
            <FormField
              key={opt.name}
              control={form.control}
              name={`features.${opt.name}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">{opt.label}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Diferenciais/Outros */}
      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2 text-gray-700">Diferenciais e Outros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {otherFeatures.map(opt => (
            // Pet só aparece se for aluguel
            opt.name === 'pet' && priceType !== 'rent' ? null : (
              <FormField
                key={opt.name}
                control={form.control}
                name={`features.${opt.name}` as any}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">{opt.label}</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFeaturesForm; 
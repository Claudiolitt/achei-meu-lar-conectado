import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './usePropertyRegistrationForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PropertyFeaturesFormProps {
  form: UseFormReturn<FormValues>;
}

const PropertyFeaturesForm: React.FC<PropertyFeaturesFormProps> = ({ form }) => {
  return (
    <div className="space-y-4 col-span-2">
      <h2 className="text-xl font-semibold border-b pb-2">Características do Imóvel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="features.bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quartos</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features.bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banheiros</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features.area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área (m²)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="features.parkingSpots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vagas</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features.buildYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de Construção</FormLabel>
              <FormControl>
                <Input type="number" min="1800" max={new Date().getFullYear()} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features.furnished"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobiliado</FormLabel>
              <FormControl>
                <input type="checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PropertyFeaturesForm; 
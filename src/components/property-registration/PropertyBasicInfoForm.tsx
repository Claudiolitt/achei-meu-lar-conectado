import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './usePropertyRegistrationForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const residentialOptions = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa', label: 'Casa' },
  { value: 'casa-de-condominio', label: 'Casa de Condomínio' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'kitnet', label: 'Kitnet' },
  { value: 'loft', label: 'Loft' },
  { value: 'studio', label: 'Studio' },
  { value: 'sobrado', label: 'Sobrado' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'chacara', label: 'Chácara' },
];
const commercialOptions = [
  { value: 'sala-comercial', label: 'Sala Comercial' },
  { value: 'loja', label: 'Loja' },
  { value: 'galpao', label: 'Galpão' },
  { value: 'deposito', label: 'Depósito' },
  { value: 'area-industrial', label: 'Área Industrial' },
  { value: 'praca-comercial', label: 'Praça Comercial' },
  { value: 'edificio-comercial', label: 'Edifício Comercial' },
  { value: 'edificio-industrial', label: 'Edifício Industrial' },
  { value: 'edificio-misto', label: 'Edifício Misto' },
  { value: 'galpao-industrial', label: 'Galpão Industrial' },
  { value: 'predio-comercial', label: 'Prédio Comercial' },
  { value: 'predio-industrial', label: 'Prédio Industrial' },
];

interface PropertyBasicInfoFormProps {
  form: UseFormReturn<FormValues>;
}

const PropertyBasicInfoForm: React.FC<PropertyBasicInfoFormProps> = ({ form }) => {
  const category = form.watch('category');
  const typeOptions = category === 'commercial' ? commercialOptions : residentialOptions;

  return (
    <div className="space-y-4 col-span-2">
      <h2 className="text-xl font-semibold border-b pb-2">Informações Básicas</h2>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título do anúncio*</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Apartamento moderno com 2 quartos no Centro" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de imóvel*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Finalidade*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Venda ou aluguel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sale">Venda</SelectItem>
                  <SelectItem value="rent">Aluguel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)*</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="condoFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condomínio (R$)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iptu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IPTU (R$)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição*</FormLabel>
            <FormControl>
              <Textarea placeholder="Descreva detalhes do imóvel, diferenciais, localização, etc." rows={4} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyBasicInfoForm; 
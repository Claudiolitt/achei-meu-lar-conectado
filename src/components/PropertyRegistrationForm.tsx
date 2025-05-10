
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyType, PropertyStatus } from '@/types/property';
import { toast } from '@/components/ui/sonner';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Título deve ter pelo menos 5 caracteres" }),
  type: z.enum(["apartment", "house", "commercial", "land"], { 
    required_error: "Selecione o tipo de imóvel" 
  }),
  priceType: z.enum(["sale", "rent"], { 
    required_error: "Selecione venda ou aluguel" 
  }),
  price: z.coerce.number().positive({ message: "Preço deve ser positivo" }),
  description: z.string().min(20, { message: "Descrição deve ter pelo menos 20 caracteres" }),
  address: z.object({
    street: z.string().min(3, { message: "Rua é obrigatória" }),
    neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }),
    city: z.string().min(2, { message: "Cidade é obrigatória" }),
    state: z.string().min(2, { message: "Estado é obrigatório" }),
    country: z.string().default("Brasil"),
  }),
  features: z.object({
    bedrooms: z.coerce.number().int().min(0, { message: "Número inválido" }),
    bathrooms: z.coerce.number().int().min(0, { message: "Número inválido" }),
    area: z.coerce.number().positive({ message: "Área deve ser positiva" }),
    parkingSpots: z.coerce.number().int().min(0, { message: "Número inválido" }),
    buildYear: z.coerce.number().int().min(1800, { message: "Ano inválido" }).max(new Date().getFullYear(), { message: "Ano inválido" }),
    furnished: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PropertyRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<FileList | null>(null);
  const [planImage, setPlanImage] = useState<File | null>(null);
  const [listingType, setListingType] = useState<'free' | 'paid'>('free');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      priceType: "sale" as PropertyStatus,
      type: "apartment" as PropertyType,
      address: {
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
      },
      features: {
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        parkingSpots: 0,
        buildYear: new Date().getFullYear() - 5,
        furnished: false,
      },
    },
  });

  function onSubmit(data: FormValues) {
    try {
      // In a real app, you would send this data to your backend
      console.log('Form data submitted:', data);
      console.log('Images:', images);
      console.log('Floor plan:', planImage);
      console.log('Listing type:', listingType);
      
      if (listingType === 'paid') {
        // Navigate to highlight options
        navigate('/listing-highlight', { 
          state: { 
            propertyData: data,
            images: images ? Array.from(images).map(img => img.name) : [],
            planImage: planImage ? planImage.name : null
          }
        });
        return;
      }
      
      // Simulate successful submission for free listing
      toast({
        title: "Imóvel cadastrado com sucesso!",
        description: "Seu anúncio foi publicado e já está disponível para visualização.",
      });
      
      // Redirect to dashboard or property listing
      setTimeout(() => {
        navigate('/properties');
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar imóvel",
        description: "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
        variant: "destructive",
      });
      console.error('Error submitting form:', error);
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if number of images is within limits
      if (e.target.files.length > 10) {
        toast({
          title: "Limite de imagens excedido",
          description: "Você pode enviar no máximo 10 imagens por anúncio.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if image sizes are within limits (5MB each)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size > MAX_SIZE) {
          toast({
            title: "Tamanho de imagem excedido",
            description: `A imagem "${e.target.files[i].name}" excede o limite de 5MB.`,
            variant: "destructive",
          });
          return;
        }
      }
      
      setImages(e.target.files);
    }
  };

  const handlePlanImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if image size is within limits (5MB)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (e.target.files[0].size > MAX_SIZE) {
        toast({
          title: "Tamanho de imagem excedido",
          description: "A planta baixa excede o limite de 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setPlanImage(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de imóvel*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartamento</SelectItem>
                          <SelectItem value="house">Casa</SelectItem>
                          <SelectItem value="commercial">Comercial</SelectItem>
                          <SelectItem value="land">Terreno</SelectItem>
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição detalhada*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva seu imóvel com detalhes, mencionando características importantes, comodidades, estado de conservação, etc."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Address Information */}
            <div className="space-y-4 col-span-2">
              <h2 className="text-xl font-semibold border-b pb-2">Endereço</h2>
              
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua/Avenida*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Property Features */}
            <div className="space-y-4 col-span-2">
              <h2 className="text-xl font-semibold border-b pb-2">Características do Imóvel</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="features.bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quartos*</FormLabel>
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
                  name="features.parkingSpots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vagas de garagem</FormLabel>
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
                        <Input type="number" min="0" step="0.01" {...field} />
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
                      <FormLabel>Ano de construção*</FormLabel>
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
                    <FormItem className="flex items-center space-x-2 space-y-0 pt-7">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Mobiliado</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Media Upload */}
            <div className="space-y-4 col-span-2">
              <h2 className="text-xl font-semibold border-b pb-2">Fotos e Mídias</h2>
              
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="property-images" className="block mb-2">Fotos do imóvel (máx. 10 fotos, 5MB cada)</FormLabel>
                  <Input
                    id="property-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="w-full"
                  />
                  {images && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {images.length} {images.length === 1 ? 'imagem selecionada' : 'imagens selecionadas'}
                    </p>
                  )}
                </div>
                
                <div>
                  <FormLabel htmlFor="floor-plan" className="block mb-2">Planta baixa (opcional, máx. 5MB)</FormLabel>
                  <Input
                    id="floor-plan"
                    type="file"
                    accept="image/*"
                    onChange={handlePlanImageChange}
                    className="w-full"
                  />
                  {planImage && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {planImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Listing Type */}
            <div className="space-y-4 col-span-2">
              <h2 className="text-xl font-semibold border-b pb-2">Tipo de Anúncio</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    listingType === 'free' ? 'bg-primary/10 border-primary' : 'bg-card'
                  }`}
                  onClick={() => setListingType('free')}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="radio"
                        checked={listingType === 'free'}
                        onChange={() => setListingType('free')}
                        className="h-4 w-4"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Anúncio Gratuito</h3>
                      <p className="text-sm text-muted-foreground">
                        Seu imóvel ficará visível por 30 dias na plataforma.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    listingType === 'paid' ? 'bg-primary/10 border-primary' : 'bg-card'
                  }`}
                  onClick={() => setListingType('paid')}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="radio"
                        checked={listingType === 'paid'}
                        onChange={() => setListingType('paid')}
                        className="h-4 w-4"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Anúncio com Destaque</h3>
                      <p className="text-sm text-muted-foreground">
                        Visibilidade por 60 dias, aparecendo nos destaques da plataforma e recebendo selo especial.
                      </p>
                      <p className="text-sm font-medium text-primary mt-2">
                        A partir de R$ 29,90
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms and conditions */}
            <div className="col-span-2 pt-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  Declaro que as informações fornecidas são verdadeiras e estou ciente dos <a href="#" className="text-primary hover:underline">termos e condições</a> da plataforma.
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit">
              {listingType === 'free' ? 'Publicar Anúncio' : 'Próximo: Selecionar Destaque'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertyRegistrationForm;

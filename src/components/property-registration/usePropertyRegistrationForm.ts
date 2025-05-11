import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from '@/components/ui/sonner';
import { PropertyType, PropertyStatus } from '@/types/property';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Título deve ter pelo menos 5 caracteres" }),
  category: z.enum(["residential", "commercial"], { required_error: "Selecione a categoria" }),
  type: z.enum([
    // Residenciais
    "apartamento", "casa", "casa-de-condominio", "cobertura", "kitnet", "loft", "studio", "sobrado", "terreno", "chacara",
    // Comerciais
    "sala-comercial", "loja", "galpao", "deposito", "area-industrial", "praca-comercial", "edificio-comercial", "edificio-industrial", "edificio-misto", "galpao-industrial", "predio-comercial", "predio-industrial"
  ], { required_error: "Selecione o tipo de imóvel" }),
  priceType: z.enum(["sale", "rent"], { required_error: "Selecione venda ou aluguel" }),
  price: z.coerce.number().positive({ message: "Preço deve ser positivo" }),
  condoFee: z.coerce.number().int().min(0).default(0),
  iptu: z.coerce.number().int().min(0).default(0),
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
    suites: z.coerce.number().int().min(0, { message: "Número inválido" }),
    bathrooms: z.coerce.number().int().min(0, { message: "Número inválido" }),
    area: z.coerce.number().positive({ message: "Área deve ser positiva" }),
    landArea: z.coerce.number().int().min(0, { message: "Número inválido" }),
    buildingArea: z.coerce.number().int().min(0, { message: "Número inválido" }),
    parkingSpots: z.coerce.number().int().min(0, { message: "Número inválido" }),
    buildYear: z.coerce.number().int().min(1800, { message: "Ano inválido" }).max(new Date().getFullYear(), { message: "Ano inválido" }),
    furnished: z.boolean().default(false),
    totalFloors: z.coerce.number().int().min(0).default(0),
    pet: z.boolean().default(false),
    pool: z.boolean().default(false),
    balcony: z.boolean().default(false),
    accessible: z.boolean().default(false),
    photo: z.boolean().default(false),
    new: z.boolean().default(false),
    garage: z.boolean().default(false),
    garden: z.boolean().default(false),
    barbecue: z.boolean().default(false),
    office: z.boolean().default(false),
    builtInWardrobe: z.boolean().default(false),
    laundry: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    heating: z.boolean().default(false),
    solarPanels: z.boolean().default(false),
    fireplace: z.boolean().default(false),
    groundFloor: z.boolean().default(false),
    noSteps: z.boolean().default(false),
    wideDoors: z.boolean().default(false),
    elevator: z.boolean().default(false),
    old: z.boolean().default(false),
    veryOld: z.boolean().default(false),
    suite: z.boolean().default(false),
    dishwasher: z.boolean().default(false),
    builtIn: z.boolean().default(false),
    security: z.boolean().default(false),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function usePropertyRegistrationForm() {
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
      priceType: "sale",
      category: "residential",
      type: "apartamento",
      condoFee: 0,
      iptu: 0,
      address: {
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
      },
      features: {
        bedrooms: 1,
        suites: 0,
        bathrooms: 1,
        area: 0,
        landArea: 0,
        buildingArea: 0,
        parkingSpots: 0,
        buildYear: new Date().getFullYear() - 5,
        furnished: false,
        totalFloors: 0,
        pet: false,
        pool: false,
        balcony: false,
        accessible: false,
        photo: false,
        new: false,
        garage: false,
        garden: false,
        barbecue: false,
        office: false,
        builtInWardrobe: false,
        laundry: false,
        airConditioning: false,
        heating: false,
        solarPanels: false,
        fireplace: false,
        groundFloor: false,
        noSteps: false,
        wideDoors: false,
        elevator: false,
        old: false,
        veryOld: false,
        suite: false,
        dishwasher: false,
        builtIn: false,
        security: false,
      },
    },
  });

  function onSubmit(data: FormValues) {
    try {
      // In a real app, you would send this data to your backend
      if (listingType === 'paid') {
        navigate('/listing-highlight', { 
          state: { 
            propertyData: data,
            images: images ? Array.from(images).map(img => img.name) : [],
            planImage: planImage ? planImage.name : null
          }
        });
        return;
      }
      toast.success("Imóvel cadastrado com sucesso!", {
        description: "Seu anúncio foi publicado e já está disponível para visualização."
      });
      setTimeout(() => {
        navigate('/properties');
      }, 2000);
    } catch (error) {
      toast.error("Erro ao cadastrar imóvel", {
        description: "Ocorreu um erro ao processar seu cadastro. Tente novamente."
      });
      console.error('Error submitting form:', error);
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 10) {
        toast.error("Limite de imagens excedido", {
          description: "Você pode enviar no máximo 10 imagens por anúncio."
        });
        return;
      }
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size > MAX_SIZE) {
          toast.error("Tamanho de imagem excedido", {
            description: `A imagem "${e.target.files[i].name}" excede o limite de 5MB.`
          });
          return;
        }
      }
      setImages(e.target.files);
    }
  };

  const handlePlanImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (e.target.files[0].size > MAX_SIZE) {
        toast.error("Tamanho de imagem excedido", {
          description: "A planta baixa excede o limite de 5MB."
        });
        return;
      }
      setPlanImage(e.target.files[0]);
    }
  };

  return {
    form,
    images,
    setImages,
    planImage,
    setPlanImage,
    listingType,
    setListingType,
    onSubmit,
    handleImagesChange,
    handlePlanImageChange,
  };
} 
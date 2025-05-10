import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { WhatsappLogo } from './icons/WhatsappLogo';
import SocialShare from './SocialShare';

interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerName?: string;
}

// Form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const PropertyContactForm: React.FC<PropertyContactFormProps> = ({ 
  propertyId, 
  propertyTitle,
  ownerPhone = "(11) 99999-9999", // Mock phone
  ownerEmail = "corretor@exemplo.com", // Mock email
  ownerName = "Corretor Exemplo" // Mock owner name
}) => {
  const [showPhone, setShowPhone] = useState(false);
  const { toast } = useToast();
  
  // Form initialization
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `Olá! Vi o seu anúncio "${propertyTitle}" e estou interessado(a) em mais informações.`
    }
  });

  // Handle form submission
  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form data:", data);
    
    // In a real application, this would send the data to a backend service
    // For now, we'll just show a toast message
    toast({
      title: "Mensagem enviada!",
      description: "O anunciante entrará em contato em breve.",
    });
    
    // Reset the form
    form.reset({
      name: "",
      email: "",
      phone: "",
      message: `Olá! Vi o seu anúncio "${propertyTitle}" e estou interessado(a) em mais informações.`
    });
  };

  // Handle phone reveal
  const handleShowPhone = () => {
    setShowPhone(true);
    
    // Track this action (analytics would go here)
    console.log("Phone number revealed for property:", propertyId);
  };

  // Generate WhatsApp link with predefined message
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Olá! Vi o seu anúncio "${propertyTitle}" no Imóveis Conecta e estou interessado(a) em mais informações.`
    );
    // Format the phone number for WhatsApp (removing non-digits)
    const formattedPhone = ownerPhone.replace(/\D/g, "");
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  // Handle email link
  const getEmailLink = () => {
    const subject = encodeURIComponent(`Interesse no imóvel: ${propertyTitle}`);
    const body = encodeURIComponent(
      `Olá!\n\nVi o seu anúncio "${propertyTitle}" no Imóveis Conecta e estou interessado(a) em mais informações.\n\nAguardo seu contato.`
    );
    return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white dark:bg-[#18223a] rounded-lg shadow-sm p-6 border border-gray-100 dark:border-[#232c43]">
      <h3 className="text-lg font-semibold mb-4 text-navy-800 dark:text-white">Entrar em contato com {ownerName}</h3>
      
      <div className="space-y-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full flex justify-center items-center text-navy-800 dark:text-white border-navy-100 dark:border-[#232c43] bg-white dark:bg-[#232c43] hover:bg-navy-50 dark:hover:bg-[#232c43]/80 dark:placeholder-white"
          onClick={handleShowPhone}
        >
          <Phone className="mr-2 h-4 w-4" />
          {showPhone ? ownerPhone : "Mostrar telefone"}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center text-navy-800 dark:text-white border-navy-100 dark:border-[#232c43] bg-white dark:bg-[#232c43] hover:bg-navy-50 dark:hover:bg-[#232c43]/80 dark:placeholder-white" 
            asChild
          >
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center text-navy-800 dark:text-white border-navy-100 dark:border-[#232c43] bg-white dark:bg-[#232c43] hover:bg-navy-50 dark:hover:bg-[#232c43]/80 dark:placeholder-white"
            asChild
          >
            <a href={getEmailLink()}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-[#232c43] pt-4">
        <h4 className="font-medium mb-4 flex items-center text-navy-700 dark:text-white">
          <MessageSquare className="mr-2 h-4 w-4" />
          Enviar mensagem
        </h4>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy-700 dark:text-white">Nome</FormLabel>
                  <FormControl>
                    <Input className="bg-white dark:bg-[#232c43] text-navy-800 dark:text-white border border-gray-200 dark:border-[#232c43] placeholder:text-navy-400 dark:placeholder-white" placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-navy-700 dark:text-white">E-mail</FormLabel>
                    <FormControl>
                      <Input className="bg-white dark:bg-[#232c43] text-navy-800 dark:text-white border border-gray-200 dark:border-[#232c43] placeholder:text-navy-400 dark:placeholder-white" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-navy-700 dark:text-white">Telefone</FormLabel>
                    <FormControl>
                      <Input className="bg-white dark:bg-[#232c43] text-navy-800 dark:text-white border border-gray-200 dark:border-[#232c43] placeholder:text-navy-400 dark:placeholder-white" placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy-700 dark:text-white">Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escreva sua mensagem..." 
                      className="min-h-[100px] bg-white dark:bg-[#232c43] text-navy-800 dark:text-white border border-gray-200 dark:border-[#232c43] placeholder:text-navy-400 dark:placeholder-white" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-navy-700 hover:bg-navy-600 text-white dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-white">
              Enviar mensagem
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="mt-4 text-center">
        <SocialShare 
          title={`Imóvel: ${propertyTitle}`}
          description={`Confira este imóvel no Imóveis Conecta: ${propertyTitle}`}
          className="text-xs mx-auto"
        />
      </div>
    </div>
  );
};

export default PropertyContactForm;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare, Share2 } from 'lucide-react';
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
      `Olá! Vi o seu anúncio "${propertyTitle}" no Achei meu Lar e estou interessado(a) em mais informações.`
    );
    // Format the phone number for WhatsApp (removing non-digits)
    const formattedPhone = ownerPhone.replace(/\D/g, "");
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  // Handle email link
  const getEmailLink = () => {
    const subject = encodeURIComponent(`Interesse no imóvel: ${propertyTitle}`);
    const body = encodeURIComponent(
      `Olá!\n\nVi o seu anúncio "${propertyTitle}" no Achei meu Lar e estou interessado(a) em mais informações.\n\nAguardo seu contato.`
    );
    return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-navy-800">Entrar em contato com {ownerName}</h3>
      
      <div className="space-y-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full flex justify-center items-center"
          onClick={handleShowPhone}
        >
          <Phone className="mr-2 h-4 w-4" />
          {showPhone ? ownerPhone : "Mostrar telefone"}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center" 
            asChild
          >
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex justify-center items-center"
            asChild
          >
            <a href={getEmailLink()}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-medium mb-4 flex items-center text-navy-700">
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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
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
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
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
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escreva sua mensagem..." 
                      className="min-h-[100px]" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-navy-700 hover:bg-navy-600">
              Enviar mensagem
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="ghost" size="sm" className="text-xs flex items-center mx-auto text-muted-foreground">
          <Share2 className="mr-1 h-3 w-3" />
          Compartilhar este anúncio
        </Button>
      </div>
    </div>
  );
};

export default PropertyContactForm;

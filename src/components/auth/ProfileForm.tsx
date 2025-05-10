import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  avatar: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      cpf: user?.cpf || "",
      avatar: null,
    },
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("avatar", file);
    }
  };

  async function onSubmit(values: ProfileFormValues) {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.phone) formData.append("phone", values.phone);
      if (values.cpf) formData.append("cpf", values.cpf);
      if (values.avatar) formData.append("avatar", values.avatar);

      await updateProfile(formData);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p>Você precisa estar logado para acessar esta página.</p>
        <Button className="mt-4" asChild>
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Button
        variant="ghost"
        className="mb-2 p-0 h-auto"
        asChild
      >
        <Link to="/profile">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao perfil
        </Link>
      </Button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Editar perfil</h2>
        <p className="text-muted-foreground">Atualize suas informações pessoais</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Alterar foto
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      value={formatPhone(field.value || '')} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      value={formatCPF(field.value || '')} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

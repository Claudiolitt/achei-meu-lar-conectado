
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
import { ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm({
  onSuccess,
  onBack,
}: {
  onSuccess?: () => void;
  onBack?: () => void;
}) {
  const { sendPasswordResetEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(values.email);
      setEmailSent(true);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Password reset error:", error);
      // Toast is already shown in the auth context
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      {onBack && (
        <Button
          type="button"
          variant="ghost"
          className="mb-2 p-0 h-auto"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      )}

      <h2 className="text-2xl font-semibold">Recuperar senha</h2>
      <p className="text-muted-foreground mb-4">
        Informe seu email para receber instruções de recuperação de senha.
      </p>

      {emailSent ? (
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <h3 className="font-medium text-green-800">Email enviado!</h3>
          <p className="text-green-700 text-sm mt-1">
            Verifique sua caixa de entrada com instruções para redefinir sua
            senha. Se não encontrar, verifique também sua pasta de spam.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-navy-700 hover:bg-navy-600"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enviando..."
                : "Enviar instruções de recuperação"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

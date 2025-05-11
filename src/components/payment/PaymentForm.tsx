import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PaymentFormData } from '@/types/payment';

const paymentFormSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Número do cartão inválido')
    .max(19, 'Número do cartão inválido')
    .regex(/^[0-9\s-]+$/, 'Apenas números são permitidos'),
  cardName: z.string()
    .min(3, 'Nome muito curto')
    .max(50, 'Nome muito longo'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Data inválida (MM/AA)'),
  cvv: z.string()
    .min(3, 'CVV inválido')
    .max(4, 'CVV inválido')
    .regex(/^[0-9]+$/, 'Apenas números são permitidos'),
});

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isLoading: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Cartão</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0000 0000 0000 0000"
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome no Cartão</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome como está no cartão" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Expiração</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="MM/AA"
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123" type="password" maxLength={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Processando...' : 'Pagar'}
        </Button>
      </form>
    </Form>
  );
}; 
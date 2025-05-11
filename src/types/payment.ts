export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  period: 'monthly' | 'yearly';
  recommended?: boolean;
}

export interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  planId: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
} 
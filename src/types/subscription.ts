
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

export type SubscriptionFeature = {
  name: string;
  description: string;
  included: boolean;
};

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number; // Monthly price in BRL
  featured?: boolean;
  tier: SubscriptionTier;
  features: SubscriptionFeature[];
  listingsLimit: number;
  highlightedListings: number;
  durationDays: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export interface Receipt {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  paymentDate: string;
  expirationDate: string;
  paymentMethod: string;
  invoiceNumber: string;
}

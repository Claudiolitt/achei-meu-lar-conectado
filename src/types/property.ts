export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';

export type PropertyStatus = 'sale' | 'rent';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: PropertyStatus; // sale or rent
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number; // in square meters
    parkingSpots: number;
    buildYear: number;
    furnished: boolean;
    condominiumFee?: number; // valor do condomínio
    iptu?: number; // valor do IPTU
  };
  type: PropertyType;
  images: string[];
  featured?: boolean;
  createdAt: string; // ISO date string
}

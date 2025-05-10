export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  avatar?: string;
  verified: boolean;
  preferences?: {
    propertyTypes: string[];
    budgetRange: {
      min: number;
      max: number;
    };
    preferredLocations: string[];
    timeline: string;
    additionalPreferences: string[];
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
  updatePreferences: (preferences: User['preferences']) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

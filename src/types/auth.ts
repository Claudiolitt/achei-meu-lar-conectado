
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  type: 'client' | 'owner';
  photoUrl?: string;
  verified: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  type: 'client' | 'owner';
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  setUserType: (type: 'client' | 'owner') => Promise<void>;
}


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  type: 'client' | 'owner';
  photoUrl?: string;
  verified: boolean;
}

interface AuthContextType {
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

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  type: 'client' | 'owner';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'senha123',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    type: 'client' as const,
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    password: 'senha123',
    phone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    type: 'owner' as const,
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email and password
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Login bem-sucedido!');
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email já cadastrado');
      }
      
      // Create new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
        type: userData.type,
        verified: false
      };
      
      // In a real app, you would save to backend here
      // Instead, we'll just add to our mockUsers array
      mockUsers.push({...newUser, password: userData.password});
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Cadastro realizado com sucesso!');
    } catch (error: any) {
      toast.error(`Erro no cadastro: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Você saiu da sua conta');
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) throw new Error('Usuário não está logado');
      
      // Update user data
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
      }
      
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email exists
      const userExists = mockUsers.some(u => u.email === email);
      if (!userExists) {
        throw new Error('Email não encontrado');
      }
      
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) throw new Error('Usuário não está logado');
      
      // Update verification status
      const updatedUser = { ...user, verified: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Email verificado com sucesso!');
    } catch (error) {
      toast.error('Erro ao verificar email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setUserType = async (type: 'client' | 'owner') => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) throw new Error('Usuário não está logado');
      
      // Update user type
      const updatedUser = { ...user, type };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success(`Perfil atualizado para ${type === 'client' ? 'Cliente' : 'Anunciante'}`);
    } catch (error) {
      toast.error('Erro ao atualizar tipo de usuário');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateProfile,
    sendPasswordResetEmail,
    verifyEmail,
    setUserType
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

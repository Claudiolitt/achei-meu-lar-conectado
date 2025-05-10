import { useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { AuthContext } from '../contexts/AuthContext';
import { User, RegisterData } from '../types/auth';
import { mockUsers } from '../data/mockUsers';

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
      
      // Create new user - ensure all required fields are present
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
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

  const updateProfile = async (formData: FormData) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) throw new Error('Usuário não está logado');
      
      // Get form data
      const name = formData.get('name') as string;
      const phone = formData.get('phone') as string;
      const cpf = formData.get('cpf') as string;
      const avatarFile = formData.get('avatar') as File | null;

      // Handle avatar upload
      let avatarUrl = user.avatar;
      if (avatarFile) {
        // In a real app, you would upload the file to a storage service
        // For now, we'll create a data URL
        const reader = new FileReader();
        avatarUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(avatarFile);
        });
      }
      
      // Update user data
      const updatedUser = { 
        ...user, 
        name,
        phone: phone || undefined,
        cpf: cpf || undefined,
        avatar: avatarUrl
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { 
          ...mockUsers[userIndex], 
          ...updatedUser,
          password: mockUsers[userIndex].password 
        };
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

  const updatePreferences = async (preferences: User['preferences']) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) throw new Error('Usuário não está logado');
      
      // Update user preferences
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { 
          ...mockUsers[userIndex], 
          preferences,
          password: mockUsers[userIndex].password 
        };
      }
      
      toast.success('Preferências atualizadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar preferências');
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
    updatePreferences,
    sendPasswordResetEmail,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

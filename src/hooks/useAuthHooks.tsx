
import { useAuth } from '../contexts/AuthContext';

// Login hook for more focused functionality
export const useLogin = () => {
  const { login, isLoading } = useAuth();
  return { login, isLoading };
};

// Registration hook
export const useRegister = () => {
  const { register, isLoading } = useAuth();
  return { register, isLoading };
};

// Profile management hooks
export const useProfile = () => {
  const { user, updateProfile, verifyEmail, isLoading } = useAuth();
  return { user, updateProfile, verifyEmail, isLoading };
};

// Authentication status hook
export const useAuthStatus = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  return { user, isAuthenticated, isLoading };
};

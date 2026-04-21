import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth.service.js';
import { storageService } from '../services/storage.service.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = storageService.getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        storageService.clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    storageService.setToken(response.data.data.token);
    setUser(response.data.data.user);
    return response.data;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    storageService.setToken(response.data.data.token);
    setUser(response.data.data.user);
    return response.data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      storageService.clearToken();
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

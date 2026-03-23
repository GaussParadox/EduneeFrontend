import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// =========================
// Tipos
// =========================

export interface User {
  id: string;
  name: string;
  email?: string;
  token: string;
  rol: 'admin' | 'paciente';   
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// =========================
// Contexto
// =========================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =========================
// Provider
// =========================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]                     = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar sesión al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (stored) {
      const parsed: User = JSON.parse(stored);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// Hook
// =========================

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return ctx;
};
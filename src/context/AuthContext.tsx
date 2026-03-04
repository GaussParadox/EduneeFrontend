import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

/* =========================
   Tipos
========================= */

export interface User {
  id: string;
  name: string;
  email?: string;
  token: string; // JWT de Django
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

/* =========================
   Contexto
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   Provider
========================= */

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /* =========================
     Cargar sesión al iniciar
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  /* =========================
     Login
  ========================= */
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);

    // Persistencia
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  /* =========================
     Logout
  ========================= */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   Hook
========================= */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
};
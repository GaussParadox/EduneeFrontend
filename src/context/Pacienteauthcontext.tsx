import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PacienteSession {
  paciente_id: number;
  username: string;
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  genero: string;
  access: string;
}

interface PacienteAuthContextType {
  paciente: PacienteSession | null;
  login: (data: PacienteSession) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const PacienteAuthContext = createContext<PacienteAuthContextType | undefined>(undefined);

export const PacienteAuthProvider = ({ children }: { children: ReactNode }) => {
  const [paciente, setPaciente] = useState<PacienteSession | null>(null);

  // Restaurar sesión al recargar
  useEffect(() => {
    const stored = localStorage.getItem('paciente_session');
    if (stored) {
      setPaciente(JSON.parse(stored));
    }
  }, []);

  const login = (data: PacienteSession) => {
    localStorage.setItem('paciente_session', JSON.stringify(data));
    localStorage.setItem('paciente_token', data.access);
    setPaciente(data);
  };

  const logout = () => {
    localStorage.removeItem('paciente_session');
    localStorage.removeItem('paciente_token');
    setPaciente(null);
  };

  return (
    <PacienteAuthContext.Provider value={{
      paciente,
      login,
      logout,
      isAuthenticated: !!paciente,
    }}>
      {children}
    </PacienteAuthContext.Provider>
  );
};

export const usePacienteAuth = () => {
  const ctx = useContext(PacienteAuthContext);
  if (!ctx) throw new Error('usePacienteAuth debe usarse dentro de PacienteAuthProvider');
  return ctx;
};
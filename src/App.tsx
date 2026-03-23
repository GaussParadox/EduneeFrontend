import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PacienteAuthProvider } from './context/Pacienteauthcontext';
import { Login, Dashboard, Form, LoginUsers, RegistroUsers } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PacienteAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirección raíz */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin */}
            <Route path="/login"     element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Pruebas (paciente autenticado) */}
            <Route path="/pruebas/:id" element={<Form />} />

            {/* Pacientes / Clientes */}
            <Route path="/login-users"    element={<LoginUsers />} />
            <Route path="/register-users" element={<RegistroUsers />} />
          </Routes>
        </BrowserRouter>
      </PacienteAuthProvider>
    </AuthProvider>
  );
}

export default App;
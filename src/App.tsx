import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login, Dashboard, Form, LoginUsers, RegistroUsers } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pruebas/:id" element={<Form />} />
          <Route path="/login-users" element={<LoginUsers />} />
          <Route path="/register-users" element={<RegistroUsers />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login, Dashboard, Form } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"          element={<Navigate to="/login" replace />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pruebas/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
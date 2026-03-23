import { useState, ChangeEvent, FormEvent } from 'react';
import { MagicMotion } from 'react-magic-motion';
import loginImage from '../assets/imagen.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginAdministrador } from '../services/authService';
import { FormData } from 'interfaces/FormData';

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    keepLoggedIn: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userData = await loginAdministrador(
        formData.username,
        formData.password,
        formData.keepLoggedIn
      );
      login(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'username o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Botón Portal Pacientes — esquina superior derecha ── */}
      <div className="fixed top-5 right-6 z-50">
        <button
          onClick={() => navigate('/login-users')}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
        >
          {/* Icono usuario */}
          <div className="w-7 h-7 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800 leading-none">Portal Pacientes</p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Acceder aquí</p>
          </div>
          {/* Flecha */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2.5} stroke="currentColor"
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Panel Izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${loginImage})` }}
        />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Portal de Gestión</h1>
          <p className="text-lg text-gray-300 max-w-md">
            Administra los resultados con precisión y seguridad.
          </p>
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-teal-500 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Panel Derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="white" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">EDUNEE ADMIN</h2>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de Nuevo</h3>
              <p className="text-gray-600 text-sm">
                Por favor ingresa tus credenciales administrativas para continuar.
              </p>
            </div>

            <MagicMotion>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                  <input
                    type="text" name="username" placeholder="admin"
                    value={formData.username} onChange={handleChange} required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password" name="password" placeholder="••••••••"
                    value={formData.password} onChange={handleChange} required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox" name="keepLoggedIn"
                    checked={formData.keepLoggedIn} onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Mantenerme conectado</label>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                </button>
              </form>
            </MagicMotion>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
              © 2026 Edunee. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
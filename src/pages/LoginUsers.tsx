import { useState, ChangeEvent, FormEvent } from 'react';
import { MagicMotion } from 'react-magic-motion';
import loginImage from '../assets/imagen.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginCliente } from '../services/authService';
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
      const userData = await loginCliente(
        formData.username,
        formData.password,
        formData.keepLoggedIn
      );

      login(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${loginImage})` }}
        />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Portal de Clientes</h1>
          <p className="text-lg text-gray-300 max-w-md">
            Accede a tus pruebas y consulta tus resultados de forma segura.
          </p>
        </div>

        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Panel Derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">EDUNEE CLIENTES</h2>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de Nuevo</h3>
              <p className="text-gray-600 text-sm">
                Por favor ingresa tus credenciales de cliente para continuar.
              </p>
            </div>

            <MagicMotion>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Keep logged */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="keepLoggedIn"
                    checked={formData.keepLoggedIn}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Mantenerme conectado</label>
                </div>

                {/* Error */}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                {/* Botón */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/register-users')}
                  className="w-full py-3.5 px-4 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold transition-all duration-300"
                >
                  REGISTRO
                </button>
              </form>
            </MagicMotion>

            {/* Footer */}
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

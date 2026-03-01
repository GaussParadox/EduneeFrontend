import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagicMotion } from 'react-magic-motion';
import loginImage from '../assets/imagen.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementar lógica de login
    console.log('Login:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo - Imagen y Texto Promocional */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${loginImage})` }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Portal de Gestión</h1>
          <p className="text-lg text-gray-300 max-w-md">
            Administra los resultados con precisión y seguridad.
          </p>
        </div>

        {/* Decoración de círculos */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Panel Derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            {/* Logo y Header */}
            <div
          className="text-center mb-8"
            >
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
          <h2 className="text-2xl font-bold text-gray-900">EDUNEE ADMIN</h2>
            </div>

            {/* Card del formulario */}
          <div
            className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <div
              className="mb-6 animate-fadeInUp"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de Nuevo</h3>
              <p className="text-gray-600 text-sm">
                Por favor ingresa tus credenciales administrativas para continuar.
              </p>
            </div>

            {/* Form */}
            <MagicMotion>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div
                  className="animate-fadeInUp"
                  style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@edunee.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400 hover:border-blue-400 focus:scale-[1.01] transform"
                  />
                </div>

                {/* Password */}
                <div
                  className="animate-fadeInUp"
                  style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400 hover:border-blue-400 focus:scale-[1.01] transform"
                  />
                </div>

                {/* Keep me logged in */}
                <div
                  className="flex items-center animate-fadeInUp"
                  style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
                >
                  <input
                    type="checkbox"
                    id="keepLoggedIn"
                    name="keepLoggedIn"
                    checked={formData.keepLoggedIn}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-transform duration-200 hover:scale-110"
                  />
                  <label
                    htmlFor="keepLoggedIn"
                    className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                  >
                    Mantenerme conectado
                  </label>
                </div>

                {/* Sign dasdasdaIn Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.96] hover:scale-[1.02] transform animate-fadeInUp"
                  style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
                >
                  INICIAR SESIÓN
                </button>
              </form>
            </MagicMotion>

            {/* Footer */}
            <div
              className="mt-6 pt-6 border-t border-gray-200 animate-fadeInUp"
              style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            >
              <div className="text-center text-xs text-gray-500">
                <p>© 2026 Edunee. Todos los derechos reservados.</p>
                <div className="mt-2 space-x-4">
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Política de Privacidad
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Auditoría de Seguridad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

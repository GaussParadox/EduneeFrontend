import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementar lógica de login
    console.log('Login:', formData);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implementar login social
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-5">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay oscuro opcional para mejor contraste */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Card con efecto glassmorphism */}
      <div className="w-full max-w-md bg-white/85 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl shadow-indigo-500/15 p-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido Administrador</h1>
          <p className="text-gray-600 text-sm">Inicia sesión en tu cuenta para continuar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl outline-none transition-all duration-300 focus:bg-white/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-xl outline-none transition-all duration-300 focus:bg-white/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 mt-2 text-white bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/30 active:translate-y-0"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium hover:underline transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

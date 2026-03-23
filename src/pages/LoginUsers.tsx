import { useState, ChangeEvent, FormEvent } from 'react';
import { MagicMotion } from 'react-magic-motion';
import loginImage from '../assets/imagen.jpg';
import { useNavigate } from 'react-router-dom';
import { usePacienteAuth } from '../context/Pacienteauthcontext';
import { loginPaciente } from '../services/Pacienteauthservice';



const LoginUsers = () => {
  const { login } = usePacienteAuth();
  const navigate  = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginPaciente(username, password);
      login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Usuario o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Botón volver al portal admin — esquina superior derecha ── */}
      <div className="fixed top-5 right-6 z-50">
        <button
          onClick={() => navigate('/login')}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
        >
          <div className="w-7 h-7 bg-slate-50 group-hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-600">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800 leading-none">Portal Admin</p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Acceder aquí</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2.5} stroke="currentColor"
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all">
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
          <h1 className="text-4xl font-bold mb-4">Portal de Clientes</h1>
          <p className="text-lg text-gray-300 max-w-md">
            Accede a tus pruebas y consulta tus resultados de forma segura.
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    placeholder="usuario"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/register-users')}
                  className="w-full py-3.5 px-4 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold transition-all duration-300"
                >
                  CREAR UNA CUENTA
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

export default LoginUsers;
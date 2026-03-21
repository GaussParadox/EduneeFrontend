import { useState, ChangeEvent, FormEvent } from 'react';
import { MagicMotion } from 'react-magic-motion';
import loginImage from '../assets/imagen.jpg';
import { useNavigate } from 'react-router-dom';

interface RegistroFormData {
  nombres: string;
  apellidos: string;
  numeroIdentificacion: string;
  genero: string;
}

interface CredencialesFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegistroUsers = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [registroData, setRegistroData] = useState<RegistroFormData>({
    nombres: '',
    apellidos: '',
    numeroIdentificacion: '',
    genero: '',
  });
  const [credencialesData, setCredencialesData] = useState<CredencialesFormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegistroChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setRegistroData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCredencialesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredencialesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistroSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    localStorage.setItem('registro-users-step1', JSON.stringify(registroData));
    setStep(2);
  };

  const handleCredencialesSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (credencialesData.password !== credencialesData.confirmPassword) {
      setError('La confirmacion de contrasena no coincide.');
      return;
    }

    setLoading(true);

    const payload = {
      ...registroData,
      username: credencialesData.username,
      password: credencialesData.password,
    };

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('registro-users-payload', JSON.stringify(payload));
      setSuccess('Registro completado y datos guardados para envio.');
    }, 500);
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
            Crea tu cuenta para acceder a tus pruebas y resultados.
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
                  d="M18 7.5v-1.25A3.25 3.25 0 0 0 14.75 3h-5.5A3.25 3.25 0 0 0 6 6.25v11.5A3.25 3.25 0 0 0 9.25 21h5.5A3.25 3.25 0 0 0 18 17.75V16m-6-4h9m0 0-3-3m3 3-3 3"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">EDUNEE CLIENTES</h2>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 1 ? 'Registro de Cliente' : 'Credenciales de Acceso'}
              </h3>
              <p className="text-gray-600 text-sm">
                {step === 1
                  ? 'Completa tus datos para registrarte.'
                  : 'Ahora crea tu usuario y contrasena.'}
              </p>
            </div>

            <MagicMotion>
              {step === 1 ? (
                <form onSubmit={handleRegistroSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                    <input
                      type="text"
                      name="nombres"
                      placeholder="Ingresa tus nombres"
                      value={registroData.nombres}
                      onChange={handleRegistroChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      placeholder="Ingresa tus apellidos"
                      value={registroData.apellidos}
                      onChange={handleRegistroChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numero de Identificacion
                    </label>
                    <input
                      type="text"
                      name="numeroIdentificacion"
                      placeholder="Ej: 123456789"
                      value={registroData.numeroIdentificacion}
                      onChange={handleRegistroChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Genero</label>
                    <select
                      name="genero"
                      value={registroData.genero}
                      onChange={handleRegistroChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Selecciona una opcion</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                      <option value="prefiero-no-decirlo">Prefiero no decirlo</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300"
                  >
                    CONTINUAR
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCredencialesSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Ingresa tu usuario"
                      value={credencialesData.username}
                      onChange={handleCredencialesChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contrasena
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={credencialesData.password}
                      onChange={handleCredencialesChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Contrasena
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={credencialesData.confirmPassword}
                      onChange={handleCredencialesChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  {success && <div className="text-green-600 text-sm">{success}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
                  >
                    {loading ? 'Registrando...' : 'FINALIZAR REGISTRO'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3.5 px-4 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold transition-all duration-300"
                  >
                    VOLVER A DATOS PERSONALES
                  </button>
                </form>
              )}
            </MagicMotion>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
              © 2026 Edunee. Todos los derechos reservados.
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login-users')}
            className="mt-4 w-full py-3.5 px-4 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold transition-all duration-300"
          >
            VOLVER AL LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsers;

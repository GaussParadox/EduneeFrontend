import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage,faPencilRuler,faVideo,faStar,} from '@fortawesome/free-solid-svg-icons';
import { obtenerPruebasRecientes } from '@/services/pruebasService';
import { Prueba } from 'interfaces/prueba';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getAppStyle = (tipo?: string) => {
  switch (tipo) {
    case 'curso':
      return { icon: faImage,       color: 'bg-purple-100 text-purple-600' };
    case 'evaluacion':
      return { icon: faPencilRuler,  color: 'bg-orange-100 text-orange-600' };
    case 'video':
      return { icon: faVideo,        color: 'bg-pink-100 text-pink-600' };
    default:
      return { icon: faImage,        color: 'bg-gray-100 text-gray-600' };
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

const HomeModule = () => {
  const { user } = useAuth();
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

  const [recentApps, setRecentApps] = useState<Prueba[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (!token) return;

    const cargarPruebas = async () => {
      try {
        const data = await obtenerPruebasRecientes(token);
        setRecentApps(data);
      } catch (error) {
        console.error('Error al cargar pruebas recientes', error);
      } finally {
        setLoadingApps(false);
      }
    };

    cargarPruebas();
  }, [token]);

  return (
    <>
      {/* Hero Banner */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
            Premium
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Bienvenido, {user?.nombre || 'Usuario'}
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl">
            Libera tu potencial educativo con nuestro conjunto completo de herramientas
            profesionales y recursos pedagógicos.
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              Explorar Planes
            </button>
            <button className="px-6 py-2.5 bg-purple-700/50 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors border border-white/30">
              Ver Tutorial
            </button>
          </div>
        </div>
      </div>

      {/* Recent Apps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Resultados pruebas</h3>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Ver Todas
          </button>
        </div>
        {loadingApps ? (
          <p className="text-gray-500 text-sm">Cargando resultad...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentApps.map((app) => {
              const style = getAppStyle(app.tipo);
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${style.color} rounded-lg flex items-center justify-center`}>
                      <FontAwesomeIcon icon={style.icon} className="text-xl" />
                    </div>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{app.nombre}</h4>
                  <p className="text-sm text-gray-500 mb-4">{app.descripcion}</p>
                  <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-colors">
                    Abrir
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Files & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Archivos Recientes</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Ver Todos
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faImage} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">Rediseño Curso.pxm</h4>
                <p className="text-xs text-gray-500">CursoMaster • hace 2 horas</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">👥 3</span>
                <button className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg">
                  Abrir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Proyectos Activos</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Ver Todos
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Rediseño Plataforma
                  </h4>
                  <p className="text-xs text-gray-500">
                    Renovación completa de la plataforma educativa
                  </p>
                </div>
                <span className="text-xs text-gray-500">Vence: Jun 15, 2025</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progreso</span>
                  <span className="text-xs font-medium text-gray-900">75%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeModule;
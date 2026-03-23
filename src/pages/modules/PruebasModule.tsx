import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePacienteAuth } from '../../context/Pacienteauthcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faImage,
  faPencilRuler,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { obtenerPruebasRecientes } from '@/services/pruebasService';
import { Prueba } from 'interfaces/prueba';

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

const PruebasModule = () => {
  const navigate = useNavigate();
  const { paciente } = usePacienteAuth();
  const [recentApps, setRecentApps] = useState<Prueba[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
  
    const token = localStorage.getItem('paciente_token');
    

    if (!token) {
      
      setLoadingApps(false);
      return;
    }

    const cargarPruebas = async () => {
      try {
        const data = await obtenerPruebasRecientes(token, paciente?.paciente_id);
        setRecentApps(data);
      } catch (error) {
      } finally {
        setLoadingApps(false);
      }
    };

    cargarPruebas();
  }, [paciente?.paciente_id]); // ← Depende solo de paciente_id

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Resultados pruebas</h3>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          Ver Todas
        </button>
      </div>

      {loadingApps ? (
        <p className="text-gray-500 text-sm">Cargando resultados...</p>
      ) : recentApps.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay pruebas recientes.</p>
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
                  <div
                    className={`w-12 h-12 ${style.color} rounded-lg flex items-center justify-center`}
                  >
                    <FontAwesomeIcon icon={style.icon} className="text-xl" />
                  </div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                  />
                </div>

                <h4 className="font-semibold text-gray-900 mb-1">{app.nombre}</h4>
                <p className="text-sm text-gray-500 mb-4">{app.descripcion}</p>

                <button
                  onClick={() => navigate(`/pruebas/${app.id}`)}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-colors"
                >
                  Abrir
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default PruebasModule;
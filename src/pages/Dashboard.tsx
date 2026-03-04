import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome,faThLarge,faFile,faFolderOpen,faGraduationCap,faUsers,faBookOpen,faCog,faSearch,faBell,faUserCircle,faPlus,faDownload,faStar,faImage,faPencilRuler,faVideo,} from '@fortawesome/free-solid-svg-icons';
import { obtenerPruebasRecientes } from '@/services/pruebasService';
import { Prueba } from 'interfaces/prueba';

type SidebarItem =
  | 'home'
  | 'apps'
  | 'files'
  | 'projects'
  | 'learn'
  | 'community'
  | 'resources';

type TopTab = 'home' | 'apps' | 'files' | 'projects' | 'learn';


const Dashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  const [activeSidebar, setActiveSidebar] = useState<SidebarItem>('home');
  const [activeTab, setActiveTab] = useState<TopTab>('home');
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

    const sidebarItems = [
        { id: 'home' as SidebarItem, icon: faHome, label: 'Home', count: null },
        { id: 'apps' as SidebarItem, icon: faThLarge, label: 'Apps', count: null },
        { id: 'files' as SidebarItem, icon: faFile, label: 'Files', count: null },
        { id: 'projects' as SidebarItem, icon: faFolderOpen, label: 'Projects', count: null },
        { id: 'learn' as SidebarItem, icon: faGraduationCap, label: 'Learn', count: null },
        { id: 'community' as SidebarItem, icon: faUsers, label: 'Community', count: null },
        { id: 'resources' as SidebarItem, icon: faBookOpen, label: 'Resources', count: null },
    ];

    const topTabs = [
        { id: 'home' as TopTab, label: 'Home' },
        { id: 'apps' as TopTab, label: 'Apps' },
        { id: 'files' as TopTab, label: 'Files' },
        { id: 'projects' as TopTab, label: 'Projects' },
        { id: 'learn' as TopTab, label: 'Learn' },
    ];

    const getAppStyle = (tipo?: string) => {
    switch (tipo) {
        case 'curso':
        return {
            icon: faImage,
            color: 'bg-purple-100 text-purple-600',
        };
        case 'evaluacion':
        return {
            icon: faPencilRuler,
            color: 'bg-orange-100 text-orange-600',
        };
        case 'video':
        return {
            icon: faVideo,
            color: 'bg-pink-100 text-pink-600',
        };
        default:
        return {
            icon: faImage,
            color: 'bg-gray-100 text-gray-600',
        };
    }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                <h1 className="font-bold text-gray-900">EDUNEE</h1>
                <p className="text-xs text-gray-500">Plataforma Educativa</p>
                </div>
            </div>
            </div>

            {/* Search */}
            <div className="p-4">
            <div className="relative">
                <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                />
                <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 overflow-y-auto">
            {sidebarItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActiveSidebar(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-all ${
                    activeSidebar === item.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                >
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    <span className="text-sm">{item.label}</span>
                </div>
                {item.count && (
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                    </span>
                )}
                </button>
            ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faCog} />
                <span className="text-sm">Configuración</span>
            </button>
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
                <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-400" />
                <div>
                    <p className="text-sm font-medium text-gray-900">{user?.nombre || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">Premium</p>
                </div>
                </div>
            </div>
            </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Tabs Navigation - Pill Style */}
                <nav className="flex gap-2 bg-gray-100 p-1.5 rounded-lg">
                {topTabs.map((tab) => (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                    {tab.label}
                    </button>
                ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <FontAwesomeIcon icon={faDownload} className="text-xs" />
                    Instalar App
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    Nuevo Proyecto
                </button>
                <div className="relative ml-1">
                    <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                    <FontAwesomeIcon icon={faBell} className="text-gray-600 text-sm" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs cursor-pointer hover:shadow-lg transition-shadow">
                    {user?.nombre?.charAt(0).toUpperCase() || 'JD'}
                </div>
                </div>
            </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-8">
                {activeTab === 'home' && (
                <>
                    {/* Hero Banner */}
                    <div className="mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
                        Premium
                        </div>
                        <h2 className="text-4xl font-bold mb-3">Bienvenido a EDUNEE</h2>
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
                        <h3 className="text-xl font-bold text-gray-900">Apps Recientes</h3>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Ver Todas
                        </button>
                    </div>

                    {loadingApps ? (
                        <p className="text-gray-500 text-sm">Cargando apps recientes...</p>
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

                                <h4 className="font-semibold text-gray-900 mb-1">
                                {app.nombre}
                                </h4>

                                <p className="text-sm text-gray-500 mb-4">
                                {app.descripcion}
                                </p>

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
                                ></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
                )}

                {activeTab === 'apps' && (
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Todas las Apps</h2>
                    <p className="text-gray-600">Explora todas las aplicaciones disponibles...</p>
                </div>
                )}

                {activeTab === 'files' && (
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Gestión de Archivos</h2>
                    <p className="text-gray-600">Administra todos tus archivos...</p>
                </div>
                )}

                {activeTab === 'projects' && (
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Todos los Proyectos</h2>
                    <p className="text-gray-600">Gestiona todos tus proyectos...</p>
                </div>
                )}

                {activeTab === 'learn' && (
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Recursos de Aprendizaje</h2>
                    <p className="text-gray-600">Accede a materiales educativos...</p>
                </div>
                )}
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default Dashboard;

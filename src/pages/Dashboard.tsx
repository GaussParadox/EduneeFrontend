import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faThLarge,
  faFile,
  faFolderOpen,
  faGraduationCap,
  faUsers,
  faBookOpen,
  faCog,
  faSearch,
  faBell,
  faUserCircle,
  faPlus,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';

import HomeModule from './modules/HomeModule';
import PruebasModule from './modules/PruebasModule';
import ResultadosModule from './modules/ResultadosModule';
import ProjectsModule from './modules/ProjectsModule';
import LearnModule from './modules/LearnModule';
import CommunityModule from './modules/CommunityModule';
import ResourcesModule from './modules/ResourcesModule';

// ─── Types ────────────────────────────────────────────────────────────────────

type ModuleId =
  | 'home'
  | 'pruebas'
  | 'Resultados'
  | 'projects'
  | 'learn'
  | 'community'
  | 'resources';

// ─── Module registry ──────────────────────────────────────────────────────────

const MODULES: Record<ModuleId, React.ReactNode> = {
  home: <HomeModule />,
  pruebas: <PruebasModule />,
  Resultados: <ResultadosModule />,
  projects: <ProjectsModule />,
  learn: <LearnModule />,
  community: <CommunityModule />,
  resources: <ResourcesModule />,
};

// ─── Sidebar config ───────────────────────────────────────────────────────────

const SIDEBAR_ITEMS: { id: ModuleId; icon: any; label: string; count?: number }[] = [
  { id: 'home', icon: faHome, label: 'Home' },
  { id: 'pruebas', icon: faThLarge, label: 'Pruebas' },
  { id: 'Resultados', icon: faFile, label: 'Resultados' },
  { id: 'projects', icon: faFolderOpen, label: 'Projects' },
  { id: 'learn', icon: faGraduationCap, label: 'Learn' },
  { id: 'community', icon: faUsers, label: 'Community' },
  { id: 'resources', icon: faBookOpen, label: 'Resources' },
];

// ─── Dashboard Shell ──────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState<ModuleId>('home');

  const currentLabel = SIDEBAR_ITEMS.find((i) => i.id === activeModule)?.label ?? '';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
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
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-all ${
                activeModule === item.id
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-gray-600 hover:bg-purple-600 hover:text-white'
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
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-50">
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.nombre || 'Usuario'}</p>
              <p className="text-xs text-gray-500">Premium</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <h2 className="text-sm font-semibold text-gray-700">{currentLabel}</h2>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faDownload} className="text-xs" />
                Instalar App
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                Nuevo Proyecto
              </button>
              <div className="relative">
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                  <FontAwesomeIcon icon={faBell} className="text-gray-600 text-sm" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>
              </div>
              <div className="w-9 h-9 bg-linear-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs cursor-pointer hover:shadow-lg transition-shadow">
                {user?.nombre?.charAt(0).toUpperCase() || 'JD'}
              </div>
            </div>
          </div>
        </header>

        {/* Active Module */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">{MODULES[activeModule]}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

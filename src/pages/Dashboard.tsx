import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePacienteAuth } from '../context/Pacienteauthcontext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faThLarge, faFolderOpen, faGraduationCap,
  faUsers, faBookOpen, faSearch, faBell,
  faClipboardList, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import HomeModule       from './modules/HomeModule';
import PruebasModule    from './modules/PruebasModule';
import ResultadosModule from './modules/ResultadosModule';
import ProjectsModule   from './modules/ProjectsModule';
import LearnModule      from './modules/LearnModule';
import UsuariosModule   from './modules/UsuariosModule';
import ResourcesModule  from './modules/ResourcesModule';

// ─── Types ────────────────────────────────────────────────────────────────────

type ModuleId =
  | 'home'
  | 'pruebas'
  | 'resultados'
  | 'projects'
  | 'learn'
  | 'usuarios'
  | 'resources';

// ─── Module registry ──────────────────────────────────────────────────────────

const MODULES: Record<ModuleId, React.ReactNode> = {
  home:       <HomeModule />,
  pruebas:    <PruebasModule />,
  resultados: <ResultadosModule />,
  projects:   <ProjectsModule />,
  learn:      <LearnModule />,
  usuarios:   <UsuariosModule />,
  resources:  <ResourcesModule />,
};

// ─── Sidebar config ───────────────────────────────────────────────────────────

const SIDEBAR_ITEMS: { id: ModuleId; icon: any; label: string; roles: ('admin' | 'paciente')[] }[] = [
  { id: 'home',       icon: faHome,          label: 'Home',       roles: ['admin', 'paciente'] },
  { id: 'pruebas',    icon: faThLarge,       label: 'Pruebas',    roles: ['admin', 'paciente'] },
  { id: 'resultados', icon: faClipboardList, label: 'Resultados', roles: ['admin'] },
  { id: 'projects',   icon: faFolderOpen,    label: 'Projects',   roles: ['admin'] },
  { id: 'learn',      icon: faGraduationCap, label: 'Learn',      roles: ['admin', 'paciente'] },
  { id: 'usuarios',   icon: faUsers,         label: 'Usuarios',   roles: ['admin'] },
  { id: 'resources',  icon: faBookOpen,      label: 'Resources',  roles: ['admin'] },
];

// ─── Dashboard Shell ──────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { paciente, logout: logoutPaciente } = usePacienteAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<ModuleId>('home');

  const rol = (user?.rol || (paciente ? 'paciente' : 'admin')) as 'admin' | 'paciente';
  const itemsVisibles = SIDEBAR_ITEMS.filter((item) => item.roles.includes(rol));
  const currentLabel = itemsVisibles.find((i) => i.id === activeModule)?.label ?? '';

  useEffect(() => {
    if (!user && !paciente) {
      navigate('/login');
    }
  }, [user, paciente, navigate]);

  const handleLogout = () => {
    if (user) logout();
    if (paciente) logoutPaciente();
    navigate('/login');
  };

  const nombreMostrado =
    user?.name ||
    user?.nombre ||
    (paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Usuario');
  const inicial = nombreMostrado.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Sidebar ── */}
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
          {itemsVisibles.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-all ${
                activeModule === item.id
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={item.icon} className="text-sm" />
                <span className="text-sm">{item.label}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200">

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>

          {/* User info */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {inicial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{nombreMostrado}</p>
              <p className="text-xs text-gray-500 capitalize">{rol}</p>
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
              <div className="relative">
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                  <FontAwesomeIcon icon={faBell} className="text-gray-600 text-sm" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs cursor-pointer hover:shadow-lg transition-shadow">
                {inicial}
              </div>
            </div>
          </div>
        </header>

        {/* Active Module */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            {MODULES[activeModule]}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
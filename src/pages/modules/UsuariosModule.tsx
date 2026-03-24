import { useEffect, useState } from 'react';
import { obtenerUsuarios, Administrador, PacienteUser } from '@services/Usuariosservice';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatFecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

// ─── Permisos por rol ─────────────────────────────────────────────────────────

const MODULOS_ADMIN    = ['Home', 'Pruebas', 'Resultados', 'Files', 'Projects', 'Learn', 'Usuarios', 'Resources'];
const MODULOS_PACIENTE = ['Home', 'Learn', 'Pruebas'];

const BadgeModulos = ({ modulos }: { modulos: string[] }) => (
  <div className="flex flex-wrap gap-1">
    {modulos.map((m) => (
      <span key={m} className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
        {m}
      </span>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const CommunityModule = () => {
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

  const [admins, setAdmins]     = useState<Administrador[]>([]);
  const [pacientes, setPacientes] = useState<PacienteUser[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [tab, setTab]           = useState<'admins' | 'pacientes'>('admins');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (!token) return;
    const cargar = async () => {
      try {
        const data = await obtenerUsuarios(token);
        setAdmins(data.administradores);
        setPacientes(data.pacientes);
      } catch {
        setError('No se pudieron cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [token]);

  const adminsFiltrados = admins.filter((a) =>
    a.username.toLowerCase().includes(busqueda.toLowerCase())
  );

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.username.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.numero_identificacion.includes(busqueda)
  );

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          <p className="text-sm text-gray-500 mt-1">
            {admins.length} administrador{admins.length !== 1 ? 'es' : ''} · {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Búsqueda */}
        <label className="relative w-64">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="m21 21-4.35-4.35m1.6-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0" />
          </svg>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        <button
          onClick={() => setTab('admins')}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
            tab === 'admins'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Administradores
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
            {admins.length}
          </span>
        </button>
        <button
          onClick={() => setTab('pacientes')}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
            tab === 'pacientes'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pacientes
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
            {pacientes.length}
          </span>
        </button>
      </div>

      {/* ── Tabla Administradores ── */}
      {tab === 'admins' && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                <th className="border-b border-gray-200 pb-3 pr-4">#</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Usuario</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Rol</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Módulos con acceso</th>
                <th className="border-b border-gray-200 pb-3">Fecha registro</th>
              </tr>
            </thead>
            <tbody>
              {adminsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                    No se encontraron administradores.
                  </td>
                </tr>
              ) : (
                adminsFiltrados.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="border-b border-gray-100 py-4 pr-4 text-gray-400">{a.id}</td>
                    <td className="border-b border-gray-100 py-4 pr-4 font-semibold text-gray-900">
                      @{a.username}
                    </td>
                    <td className="border-b border-gray-100 py-4 pr-4">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-700">
                        Admin
                      </span>
                    </td>
                    <td className="border-b border-gray-100 py-4 pr-4">
                      <BadgeModulos modulos={MODULOS_ADMIN} />
                    </td>
                    <td className="border-b border-gray-100 py-4 text-gray-500">
                      {formatFecha(a.fecha_creacion)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Tabla Pacientes ── */}
      {tab === 'pacientes' && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                <th className="border-b border-gray-200 pb-3 pr-4">#</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Nombre</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Usuario</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Identificación</th>
                <th className="border-b border-gray-200 pb-3 pr-4">Módulos con acceso</th>
                <th className="border-b border-gray-200 pb-3">Fecha registro</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                    No se encontraron pacientes.
                  </td>
                </tr>
              ) : (
                pacientesFiltrados.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="border-b border-gray-100 py-4 pr-4 text-gray-400">{p.id}</td>
                    <td className="border-b border-gray-100 py-4 pr-4">
                      <p className="font-semibold text-gray-900">{p.nombres} {p.apellidos}</p>
                      <p className="text-xs text-gray-400">{p.genero}</p>
                    </td>
                    <td className="border-b border-gray-100 py-4 pr-4 text-gray-600">
                      @{p.username}
                    </td>
                    <td className="border-b border-gray-100 py-4 pr-4 text-gray-500">
                      {p.numero_identificacion}
                    </td>
                    <td className="border-b border-gray-100 py-4 pr-4">
                      <BadgeModulos modulos={MODULOS_PACIENTE} />
                    </td>
                    <td className="border-b border-gray-100 py-4 text-gray-500">
                      {formatFecha(p.fecha_registro)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommunityModule;
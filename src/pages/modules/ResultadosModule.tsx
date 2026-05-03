import { useEffect, useState } from 'react';
import { obtenerResultados } from '@/services/Resultadosservice';
import { exportResultadosExcel } from '@/services/exportService';
import { Sesion } from 'interfaces/sesion';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatFecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const ITEMS_POR_PAGINA = 10;

// ─── Component ────────────────────────────────────────────────────────────────

const ResultadosModule = () => {
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token') ||
    localStorage.getItem('paciente_token') ||
    sessionStorage.getItem('paciente_token');

  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    if (!token) return;

    const cargar = async () => {
      try {
        const data = await obtenerResultados(token);
        setSesiones(data);
      } catch (err) {
        setError('No se pudieron cargar los resultados.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [token]);

  // ── Filtro ─────────────────────────────────────────────────────────────────
  const filtradas = sesiones.filter((s) => {
    const q = busqueda.toLowerCase();
    return (
      s.paciente.nombres.toLowerCase().includes(q) ||
      s.paciente.apellidos.toLowerCase().includes(q) ||
      s.paciente.numero_identificacion.toLowerCase().includes(q) ||
      s.prueba.toLowerCase().includes(q)
    );
  });

  // ── Paginación ─────────────────────────────────────────────────────────────
  const totalPaginas = Math.ceil(filtradas.length / ITEMS_POR_PAGINA);
  const paginadas = filtradas.slice((pagina - 1) * ITEMS_POR_PAGINA, pagina * ITEMS_POR_PAGINA);

  const cambiarPagina = (p: number) => {
    if (p >= 1 && p <= totalPaginas) setPagina(p);
  };

  const handleBusqueda = (value: string) => {
    setBusqueda(value);
    setPagina(1);
  };

  const handleExportExcel = () => {
    try {
      exportResultadosExcel(filtradas);
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-3">
        {[...Array(6)].map((_, i) => (
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
      {/* ── Toolbar ── */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full md:max-w-sm">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m21 21-4.35-4.35m1.6-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar paciente, ID o prueba..."
            value={busqueda}
            onChange={(e) => handleBusqueda(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar a Excel
          </button>
          <p className="text-sm text-gray-400 shrink-0">
            {filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-500">
              <th className="border-b border-gray-200 pb-4 pr-4">Prueba</th>
              <th className="border-b border-gray-200 pb-4 pr-4">Tipo prueba</th>
              <th className="border-b border-gray-200 pb-4 pr-4">Nombre paciente</th>
              <th className="border-b border-gray-200 pb-4 pr-4">ID del paciente</th>
              <th className="border-b border-gray-200 pb-4 pr-4">Nombre de la prueba</th>
              <th className="border-b border-gray-200 pb-4 pr-4">Fecha de registro</th>
              <th className="border-b border-gray-200 pb-4 pr-4">Puntaje</th>
              <th className="border-b border-gray-200 pb-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {paginadas.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                  No se encontraron resultados.
                </td>
              </tr>
            ) : (
              paginadas.map((s) => (
                <tr
                  key={s.sesion_id}
                  className="text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <td className="border-b border-gray-100 py-5 pr-4 font-semibold text-gray-600">
                    #{s.sesion_id}
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-indigo-100 px-2 text-xs font-bold text-indigo-700">
                      {s.tipo_prueba || '—'}
                    </span>
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4 font-medium text-gray-800">
                    {s.paciente.nombres} {s.paciente.apellidos}
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4 text-gray-500">
                    {s.paciente.numero_identificacion}
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4 font-semibold text-gray-900">
                    {s.prueba}
                  </td>
                  <td className="border-b border-gray-100 py-5 text-gray-600">
                    {formatFecha(s.fecha_inicio)}
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4">
                    <span className="inline-flex h-8 min-w-max items-center justify-center rounded-md bg-blue-100 px-3 text-xs font-bold text-blue-700">
                      {s.puntaje_total || '0'}
                    </span>
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Paginación ── */}
      <div className="mt-6 flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>
          Mostrando {Math.min((pagina - 1) * ITEMS_POR_PAGINA + 1, filtradas.length)}–
          {Math.min(pagina * ITEMS_POR_PAGINA, filtradas.length)} de {filtradas.length} registros
        </p>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => cambiarPagina(pagina - 1)}
            disabled={pagina === 1}
            className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-500 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPaginas || Math.abs(p - pagina) <= 1)
            .reduce<(number | '...')[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="px-2 text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => cambiarPagina(p as number)}
                  className={`rounded-lg px-4 py-2 font-semibold transition ${
                    pagina === p
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => cambiarPagina(pagina + 1)}
            disabled={pagina === totalPaginas || totalPaginas === 0}
            className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-500 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultadosModule;

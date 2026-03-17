const resultados = [
  {
    prueba: 'A1',
    nombrePrueba: 'Evaluacion Cognitiva Gral',
    sesion: 'Manana',
    numeroPrueba: '#48293',
    iniciales: 'CH',
    paciente: 'Carlos Hernandez',
    idPaciente: 'ID-990-22',
    fecha: '12 Oct, 2023',
  },
  {
    prueba: 'B2',
    nombrePrueba: 'Test de Fluidez Verbal',
    sesion: 'Tarde',
    numeroPrueba: '#48295',
    iniciales: 'MA',
    paciente: 'Maria Arrieta',
    idPaciente: 'ID-812-45',
    fecha: '14 Oct, 2023',
  },
  {
    prueba: 'A2',
    nombrePrueba: 'Memoria a Largo Plazo',
    sesion: 'Manana',
    numeroPrueba: '#48301',
    iniciales: 'JR',
    paciente: 'Jorge Ruiz',
    idPaciente: 'ID-105-88',
    fecha: '15 Oct, 2023',
  },
  {
    prueba: 'C1',
    nombrePrueba: 'Atencion Sostenida',
    sesion: 'Tarde',
    numeroPrueba: '#48310',
    iniciales: 'EP',
    paciente: 'Elena Perez',
    idPaciente: 'ID-332-19',
    fecha: '18 Oct, 2023',
  },
  {
    prueba: 'B1',
    nombrePrueba: 'Destreza Visoespacial',
    sesion: 'Manana',
    numeroPrueba: '#48322',
    iniciales: 'SG',
    paciente: 'Sofia Gomez',
    idPaciente: 'ID-774-31',
    fecha: '21 Oct, 2023',
  },
];

const ResultadosModule = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
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
          placeholder="Buscar paciente o ID..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h18M6 12h12m-9 7h6"
          />
        </svg>
        Filtrar
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-215 border-separate border-spacing-0">
        <thead>
          <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-500">
            <th className="border-b border-gray-200 pb-4 pr-4">Prueba</th>
            <th className="border-b border-gray-200 pb-4 pr-4">Nombre del paciente</th>
            <th className="border-b border-gray-200 pb-4 pr-4">ID del paciente</th>
            <th className="border-b border-gray-200 pb-4 pr-4">Nombre de la prueba</th>
            <th className="border-b border-gray-200 pb-4 pr-4">Sesion</th>
            <th className="border-b border-gray-200 pb-4 pr-4">Numero de prueba</th>
            <th className="border-b border-gray-200 pb-4">Fecha de registro</th>
          </tr>
        </thead>

        <tbody>
          {resultados.map((resultado) => (
            <tr key={resultado.numeroPrueba} className="text-sm text-gray-700">
              <td className="border-b border-gray-100 py-5 pr-4">
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-indigo-100 px-2 text-xs font-bold text-indigo-700">
                  {resultado.prueba}
                </span>
              </td>

              <td className="border-b border-gray-100 py-5 pr-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                    {resultado.iniciales}
                  </span>
                  <span className="text-xl font-medium text-gray-800">{resultado.paciente}</span>
                </div>
              </td>

              <td className="border-b border-gray-100 py-5 pr-4 text-xl text-gray-500">
                {resultado.idPaciente}
              </td>

              <td className="border-b border-gray-100 py-5 pr-4 text-xl font-semibold leading-tight text-gray-900">
                {resultado.nombrePrueba}
              </td>

              <td className="border-b border-gray-100 py-5 pr-4">
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {resultado.sesion}
                </span>
              </td>

              <td className="border-b border-gray-100 py-5 pr-4 text-xl font-semibold text-gray-600">
                {resultado.numeroPrueba}
              </td>

              <td className="border-b border-gray-100 py-5 text-xl text-gray-600">
                {resultado.fecha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
      <p>Mostrando 5 de 1,248 registros</p>

      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-500 transition hover:bg-gray-50"
        >
          Anterior
        </button>
        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm"
        >
          1
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-50"
        >
          2
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-50"
        >
          3
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-500 transition hover:bg-gray-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
);

export default ResultadosModule;

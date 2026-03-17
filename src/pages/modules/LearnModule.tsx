import { useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONDICIONES = [
  {
    id: 'protanopia',
    nombre: 'Protanopia',
    subtitulo: 'Deficiencia del cono rojo',
    color: '#E85D75',
    colorLight: '#FFF0F3',
    colorMid: '#FFD6DE',
    icon: '🔴',
    descripcion:
      'La protanopia es una forma de daltonismo caracterizada por la ausencia o disfunción de los conos sensibles al rojo (conos L). Las personas con protanopia no pueden distinguir entre el rojo y el verde, y perciben el rojo como oscuro o casi negro.',
    sintomas: [
      'Dificultad para distinguir rojo del verde',
      'El rojo se percibe como marrón oscuro o negro',
      'Confusión entre naranja, amarillo y verde',
      'Problemas con señales de tráfico rojas',
    ],
    prevalencia: '1% en hombres',
    herencia: 'Ligada al cromosoma X',
    simulacion: [
      {
        originalNombre: 'Rojo intenso',
        originalHex: '#C0392B',
        percibidoNombre: 'Negro',
        percibidoHex: '#1A1A1A',
      },
      {
        originalNombre: 'Rojo vivo',
        originalHex: '#E74C3C',
        percibidoNombre: 'Gris carbon',
        percibidoHex: '#2C2C2C',
      },
      {
        originalNombre: 'Rojo claro',
        originalHex: '#FF6B6B',
        percibidoNombre: 'Gris oscuro',
        percibidoHex: '#4A4A4A',
      },
    ],
    gradiente: 'linear-gradient(135deg, #E85D75 0%, #C0392B 100%)',
  },
  {
    id: 'deuteranopia',
    nombre: 'Deuteranopia',
    subtitulo: 'Deficiencia del cono verde',
    color: '#27AE60',
    colorLight: '#F0FFF4',
    colorMid: '#C6F6D5',
    icon: '🟢',
    descripcion:
      'La deuteranopia se produce por la ausencia o mal funcionamiento de los conos M (sensibles al verde). Es el tipo más común de daltonismo. Quienes la padecen confunden el rojo y el verde, aunque a diferencia de la protanopia, el rojo no se oscurece significativamente.',
    sintomas: [
      'Confusión entre rojo y verde',
      'Dificultad para distinguir tonos de verde',
      'El verde puede parecer amarillo o beige',
      'Problemas al interpretar gráficos con estos colores',
    ],
    prevalencia: '1% en hombres',
    herencia: 'Ligada al cromosoma X',
    simulacion: [
      {
        originalNombre: 'Verde bosque',
        originalHex: '#27AE60',
        percibidoNombre: 'Amarillo oliva',
        percibidoHex: '#A0A000',
      },
      {
        originalNombre: 'Verde brillante',
        originalHex: '#2ECC71',
        percibidoNombre: 'Mostaza',
        percibidoHex: '#B8B800',
      },
      {
        originalNombre: 'Verde menta',
        originalHex: '#55EFC4',
        percibidoNombre: 'Amarillo verdoso',
        percibidoHex: '#D4D400',
      },
    ],
    gradiente: 'linear-gradient(135deg, #27AE60 0%, #1E8449 100%)',
  },
  {
    id: 'tritanopia',
    nombre: 'Tritanopia',
    subtitulo: 'Deficiencia del cono azul',
    color: '#2980B9',
    colorLight: '#EBF5FB',
    colorMid: '#AED6F1',
    icon: '🔵',
    descripcion:
      'La tritanopia es la forma más rara de daltonismo. Ocurre cuando los conos S (sensibles al azul) están ausentes o no funcionan correctamente. Afecta la percepción del azul y el amarillo, y puede presentarse tanto de forma congénita como adquirida por enfermedades oculares.',
    sintomas: [
      'Confusión entre azul y verde',
      'Dificultad para distinguir amarillo del violeta',
      'El azul puede parecer verde',
      'El amarillo puede confundirse con rosa',
    ],
    prevalencia: '0.01% en población general',
    herencia: 'Autosómica dominante (cromosoma 7)',
    simulacion: [
      {
        originalNombre: 'Azul profundo',
        originalHex: '#2980B9',
        percibidoNombre: 'Verde mar',
        percibidoHex: '#2E8B57',
      },
      {
        originalNombre: 'Azul medio',
        originalHex: '#3498DB',
        percibidoNombre: 'Verde medio',
        percibidoHex: '#3CB371',
      },
      {
        originalNombre: 'Azul claro',
        originalHex: '#5DADE2',
        percibidoNombre: 'Turquesa suave',
        percibidoHex: '#66CDAA',
      },
    ],
    gradiente: 'linear-gradient(135deg, #2980B9 0%, #1A5276 100%)',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const LearnModule = () => {
  const [activa, setActiva] = useState<string | null>(null);

  const condicionActiva = CONDICIONES.find((c) => c.id === activa);

  return (
    <div className="rounded-2xl border border-gray-200 bg-[#F3F4F8] p-6 md:p-8">
      <div
        className="mx-auto max-w-6xl"
        style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
      >
        {/* Header */}
        <div className="mb-12">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600"
            style={{ fontFamily: 'system-ui' }}
          >
            Centro de conocimiento
          </p>
          <h2 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            Tipos de Daltonismo
          </h2>
          <p
            className="max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg"
            style={{ fontFamily: 'system-ui' }}
          >
            Aprende sobre las tres condiciones que detecta nuestra plataforma: su origen, síntomas y
            cómo afectan la percepción del color.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CONDICIONES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiva(activa === c.id ? null : c.id)}
              className="group overflow-hidden rounded-2xl border bg-white p-7 text-left transition-all duration-300"
              style={{
                borderColor: activa === c.id ? c.color : '#E7E8EF',
                transform: activa === c.id ? 'translateY(-4px)' : 'none',
                boxShadow:
                  activa === c.id
                    ? `0 14px 28px -10px ${c.color}55`
                    : '0 4px 14px -8px rgba(22, 25, 40, 0.18)',
              }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white"
                  style={{ background: c.gradiente }}
                >
                  <span className="drop-shadow-sm">{c.icon}</span>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide"
                  style={{ background: c.colorMid, color: '#5347C6', fontFamily: 'system-ui' }}
                >
                  {c.prevalencia}
                </span>
              </div>

              <h3 className="mb-2 text-4xl font-extrabold text-gray-900 md:text-3xl">{c.nombre}</h3>
              <p
                className="mb-4 text-xs uppercase tracking-wide text-gray-400"
                style={{ fontFamily: 'system-ui' }}
              >
                {c.subtitulo}
              </p>
              <p
                className="line-clamp-5 min-h-32 text-sm leading-8 text-gray-600"
                style={{ fontFamily: 'system-ui' }}
              >
                {c.descripcion}
              </p>

              <div
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: '#4F46E5', fontFamily: 'system-ui' }}
              >
                {activa === c.id ? 'Ver menos' : 'Ver más'}
                <span className="text-lg leading-none">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {condicionActiva && (
          <div
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            style={{ borderColor: condicionActiva.colorMid }}
          >
            <div className="border-b border-gray-100 bg-[#F7F8FC] px-6 py-6 md:px-8">
              <div className="flex flex-wrap items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white"
                  style={{ background: condicionActiva.gradiente }}
                >
                  {condicionActiva.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {condicionActiva.nombre}
                  </h3>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'system-ui' }}>
                    {condicionActiva.subtitulo}
                  </p>
                </div>
                <span
                  className="ml-auto rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                  style={{
                    background: condicionActiva.colorMid,
                    color: '#5347C6',
                    fontFamily: 'system-ui',
                  }}
                >
                  {condicionActiva.prevalencia}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-6 lg:col-span-2">
                <h4
                  className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: '#4F46E5', fontFamily: 'system-ui' }}
                >
                  ¿Qué es?
                </h4>
                <p
                  className="mb-7 text-sm leading-7 text-gray-700"
                  style={{ fontFamily: 'system-ui' }}
                >
                  {condicionActiva.descripcion}
                </p>

                <h4
                  className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: '#4F46E5', fontFamily: 'system-ui' }}
                >
                  Síntomas principales
                </h4>
                <ul className="space-y-3" style={{ fontFamily: 'system-ui' }}>
                  {condicionActiva.sintomas.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white"
                        style={{ background: '#4F46E5' }}
                      >
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-gray-100 bg-white p-5">
                  <h4
                    className="mb-4 text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#4F46E5', fontFamily: 'system-ui' }}
                  >
                    Datos clínicos
                  </h4>
                  <div className="space-y-3" style={{ fontFamily: 'system-ui' }}>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-400">Prevalencia</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {condicionActiva.prevalencia}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-400">Herencia</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {condicionActiva.herencia}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-400">Cono afectado</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {condicionActiva.subtitulo}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5">
                  <h4
                    className="mb-4 text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#4F46E5', fontFamily: 'system-ui' }}
                  >
                    Cómo se ven los colores
                  </h4>
                  <div className="space-y-3" style={{ fontFamily: 'system-ui' }}>
                    {condicionActiva.simulacion.map((par, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        <div className="min-w-0">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Original
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 shrink-0 rounded-full border border-gray-300"
                              style={{ backgroundColor: par.originalHex }}
                            />
                            <span className="truncate text-xs font-medium text-gray-700">
                              {par.originalNombre}
                            </span>
                          </div>
                        </div>

                        <span className="text-gray-300">→</span>

                        <div className="min-w-0 text-right">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Percibido
                          </p>
                          <div className="flex items-center justify-end gap-2">
                            <span className="truncate text-xs font-medium text-gray-700">
                              {par.percibidoNombre}
                            </span>
                            <span
                              className="h-3 w-3 shrink-0 rounded-full border border-gray-300"
                              style={{ backgroundColor: par.percibidoHex }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnModule;

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
    simulacion: ['#C0392B → #1A1A1A', '#E74C3C → #2C2C2C', '#FF6B6B → #4A4A4A'],
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
    simulacion: ['#27AE60 → #A0A000', '#2ECC71 → #B8B800', '#55EFC4 → #D4D400'],
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
    simulacion: ['#2980B9 → #2E8B57', '#3498DB → #3CB371', '#5DADE2 → #66CDAA'],
    gradiente: 'linear-gradient(135deg, #2980B9 0%, #1A5276 100%)',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const LearnModule = () => {
  const [activa, setActiva] = useState<string | null>(null);

  const condicionActiva = CONDICIONES.find((c) => c.id === activa);

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
           style={{ fontFamily: 'system-ui' }}>
          Centro de conocimiento
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Tipos de Daltonismo
        </h2>
        <p className="text-gray-500 text-base max-w-xl" style={{ fontFamily: 'system-ui' }}>
          Aprende sobre las tres condiciones que detecta nuestra plataforma: su origen,
          síntomas y cómo afectan la percepción del color.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {CONDICIONES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiva(activa === c.id ? null : c.id)}
            className="text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden"
            style={{
              borderColor: activa === c.id ? c.color : '#E5E7EB',
              background: activa === c.id ? c.colorLight : 'white',
              transform: activa === c.id ? 'translateY(-2px)' : 'none',
              boxShadow: activa === c.id
                ? `0 8px 30px ${c.color}25`
                : '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {/* top color band */}
            <div className="h-2 w-full" style={{ background: c.gradiente }} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: c.colorMid }}
                >
                  {c.icon}
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: c.colorMid, color: c.color, fontFamily: 'system-ui' }}
                >
                  {c.prevalencia}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{c.nombre}</h3>
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide"
                 style={{ fontFamily: 'system-ui' }}>
                {c.subtitulo}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                 style={{ fontFamily: 'system-ui' }}>
                {c.descripcion}
              </p>

              <div
                className="mt-4 text-xs font-semibold flex items-center gap-1"
                style={{ color: c.color, fontFamily: 'system-ui' }}
              >
                {activa === c.id ? '▲ Cerrar' : '▼ Ver más'}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {condicionActiva && (
        <div
          className="rounded-2xl border-2 overflow-hidden"
          style={{ borderColor: condicionActiva.color, background: condicionActiva.colorLight }}
        >
          {/* Panel header */}
          <div
            className="px-8 py-6 flex items-center gap-4"
            style={{ background: condicionActiva.gradiente }}
          >
            <span className="text-4xl">{condicionActiva.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-white">{condicionActiva.nombre}</h3>
              <p className="text-white/70 text-sm" style={{ fontFamily: 'system-ui' }}>
                {condicionActiva.subtitulo}
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Descripción + síntomas */}
            <div className="lg:col-span-2">
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: condicionActiva.color, fontFamily: 'system-ui' }}
              >
                ¿Qué es?
              </h4>
              <p className="text-gray-700 leading-relaxed text-base mb-6"
                 style={{ fontFamily: 'system-ui' }}>
                {condicionActiva.descripcion}
              </p>

              <h4
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: condicionActiva.color, fontFamily: 'system-ui' }}
              >
                Síntomas principales
              </h4>
              <ul className="space-y-2" style={{ fontFamily: 'system-ui' }}>
                {condicionActiva.sintomas.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                      style={{ background: condicionActiva.color }}
                    >
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info lateral */}
            <div className="space-y-5">
              {/* Datos clínicos */}
              <div
                className="rounded-xl p-5 border"
                style={{ background: 'white', borderColor: condicionActiva.colorMid }}
              >
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: condicionActiva.color, fontFamily: 'system-ui' }}
                >
                  Datos clínicos
                </h4>
                <div className="space-y-3" style={{ fontFamily: 'system-ui' }}>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Prevalencia</p>
                    <p className="text-sm font-semibold text-gray-800">{condicionActiva.prevalencia}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Herencia</p>
                    <p className="text-sm font-semibold text-gray-800">{condicionActiva.herencia}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Cono afectado</p>
                    <p className="text-sm font-semibold text-gray-800">{condicionActiva.subtitulo}</p>
                  </div>
                </div>
              </div>

              {/* Simulación */}
              <div
                className="rounded-xl p-5 border"
                style={{ background: 'white', borderColor: condicionActiva.colorMid }}
              >
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: condicionActiva.color, fontFamily: 'system-ui' }}
                >
                  Cómo se ven los colores
                </h4>
                <div className="space-y-3" style={{ fontFamily: 'system-ui' }}>
                  {condicionActiva.simulacion.map((sim, i) => {
                    const [desde, hasta] = sim.split(' → ');
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <span
                          className="w-6 h-6 rounded-md flex-shrink-0 border border-gray-200"
                          style={{ background: desde }}
                        />
                        <span className="text-gray-300">→</span>
                        <span
                          className="w-6 h-6 rounded-md flex-shrink-0 border border-gray-200"
                          style={{ background: hasta }}
                        />
                        <span>
                          <span className="font-mono">{desde}</span>
                          <span className="text-gray-400"> percibido como </span>
                          <span className="font-mono">{hasta}</span>
                        </span>
                      </div>
                    );
                  })}
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



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faShieldAlt,
  faEye,
  faPalette,
  faCheckCircle,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import heroCamara from '../../assets/unnamed.png';
import vistaNormalImg from '../../assets/Vista normal.jpg';
import protanopiaImg from '../../assets/protanopia.jpg';
import tritanopiaImg from '../../assets/tritanopia.png';
import deuteranopiaImg from '../../assets/Deuteranopia.jpg';

const CamaraModule = () => (
  <section
    className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-6 md:py-8"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    {/* ── Hero Banner ── */}
    <div className="relative overflow-hidden rounded-2xl" style={{ height: 160 }}>
      <img
        src={heroCamara}
        alt="Patron abstracto de colores"
        className="absolute inset-0 h-full w-full object-cover animate-camara-pan"
      />
      <div className="absolute inset-0 bg-black/20" />
      {/* Sheen overlay — same as original */}
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-camara-sheen" />

      {/* Icon + Title row */}
      <div className="absolute inset-0 flex items-center gap-5 px-7">
        {/* Camera icon button */}
        <div className="flex-shrink-0 rounded-2xl bg-white/25 p-3 backdrop-blur-md border border-white/30">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full animate-camara-pulse"
            style={{ backgroundColor: '#4546D7' }}
          >
            <FontAwesomeIcon icon={faCameraRetro} className="text-sm text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-balance text-3xl font-extrabold leading-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
          Ve el mundo en su color real
        </h2>
      </div>
    </div>

    {/* ── Main Card ── */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      {/* Guia Rapida */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
        Guia Rapida
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 md:gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 border border-gray-100">
          <FontAwesomeIcon icon={faEye} className="text-xs text-[#4546D7]" />
          Apunta a un objeto
        </span>
        <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-400" />
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 border border-gray-100">
          <FontAwesomeIcon icon={faPalette} className="text-xs text-[#4546D7]" />
          Identifica el color
        </span>
        <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-400" />
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 border border-gray-100">
          <FontAwesomeIcon icon={faCheckCircle} className="text-xs text-[#4546D7]" />
          Obten la confirmacion
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-100" />

      {/* Uso en la vida real */}
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Uso en la vida real</h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Vista Normal', src: vistaNormalImg },
          { label: 'Protanopia', src: protanopiaImg },
          { label: 'Tritanopia', src: tritanopiaImg },
          { label: 'Deuteranopia', src: deuteranopiaImg },
        ].map(({ label, src }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <img
              src={src}
              alt={`Señal de tráfico vista con ${label}`}
              className="h-36 w-full rounded-xl object-cover border border-gray-200"
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-100" />

      {/* Preguntas frecuentes */}
      <h3 className="mb-3 text-sm font-semibold text-gray-700">Preguntas frecuentes</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-800">Como funciona?</p>
          <p className="mt-1.5 text-xs leading-5 text-gray-600">
            Apunta con el puntero al area que quieras analizar y la camara devolvera el nombre del
            color detectado en tiempo real.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-800">Por que no veo el color correcto?</p>
          <p className="mt-1.5 text-xs leading-5 text-gray-600">
            La percepcion visual cambia por luz, pantalla y daltonismo. Por eso mostramos el nombre
            detectado del color para darte una referencia objetiva.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-100" />

      {/* Camera Button */}
      <div className="flex justify-center">
        <button
          className="inline-flex items-center gap-3 rounded-lg bg-[#4546D7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3535b8] active:scale-95"
          onClick={() => {
            console.log('Abrir cámara');
          }}
        >
          <FontAwesomeIcon icon={faCameraRetro} className="text-base" />
          Abrir Cámara
        </button>
      </div>
    </div>

    {/* Accessibility note */}
    <p className="inline-flex w-full items-center justify-center gap-2 text-xs text-gray-400">
      <FontAwesomeIcon icon={faShieldAlt} className="text-[10px]" />
      Optimizado para accesibilidad y daltonismo
    </p>
  </section>
);

export default CamaraModule;

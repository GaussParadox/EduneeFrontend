import { useRef, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faShieldAlt,
  faEye,
  faPalette,
  faCheckCircle,
  faChevronRight,
  faPause,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import heroCamara from '../../assets/unnamed.png';
import vistaNormalImg from '../../assets/Vista normal.jpg';
import protanopiaImg from '../../assets/protanopia.jpg';
import tritanopiaImg from '../../assets/tritanopia.png';
import deuteranopiaImg from '../../assets/Deuteranopia.jpg';

// ── Types ────────────────────────────────────────────────────────────────────
interface ColorEntry {
  name: string;
  r: [number, number];
  g: [number, number];
  b: [number, number];
}

interface DetectedColor {
  name: string;
  hex: string;
  r: number;
  g: number;
  b: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// ── Color database (Spanish names) ──────────────────────────────────────────
const COLOR_DB: ColorEntry[] = [
  { name: 'Rojo',          r: [180,255], g: [0,80],   b: [0,80]   },
  { name: 'Rojo oscuro',   r: [100,179], g: [0,50],   b: [0,50]   },
  { name: 'Naranja',       r: [200,255], g: [100,180],b: [0,60]   },
  { name: 'Naranja oscuro',r: [150,199], g: [70,130], b: [0,50]   },
  { name: 'Amarillo',      r: [200,255], g: [200,255],b: [0,100]  },
  { name: 'Amarillo verdoso',r:[150,210],g: [200,255],b: [0,80]   },
  { name: 'Verde lima',    r: [100,200], g: [220,255],b: [0,80]   },
  { name: 'Verde',         r: [0,100],   g: [150,255],b: [0,100]  },
  { name: 'Verde oscuro',  r: [0,80],    g: [80,149], b: [0,80]   },
  { name: 'Cian',          r: [0,100],   g: [180,255],b: [180,255]},
  { name: 'Celeste',       r: [100,200], g: [180,255],b: [220,255]},
  { name: 'Azul claro',    r: [100,200], g: [150,220],b: [200,255]},
  { name: 'Azul',          r: [0,100],   g: [50,150], b: [150,255]},
  { name: 'Azul oscuro',   r: [0,80],    g: [0,80],   b: [100,180]},
  { name: 'Índigo',        r: [50,120],  g: [0,80],   b: [130,220]},
  { name: 'Violeta',       r: [120,200], g: [0,100],  b: [180,255]},
  { name: 'Magenta',       r: [180,255], g: [0,80],   b: [180,255]},
  { name: 'Rosa',          r: [220,255], g: [100,180],b: [150,230]},
  { name: 'Rosa fuerte',   r: [200,255], g: [0,100],  b: [100,200]},
  { name: 'Marrón',        r: [100,180], g: [50,120], b: [0,80]   },
  { name: 'Beige',         r: [200,255], g: [180,230],b: [150,210]},
  { name: 'Crema',         r: [230,255], g: [210,255],b: [180,230]},
  { name: 'Blanco',        r: [220,255], g: [220,255],b: [220,255]},
  { name: 'Gris claro',    r: [170,219], g: [170,219],b: [170,219]},
  { name: 'Gris',          r: [100,169], g: [100,169],b: [100,169]},
  { name: 'Gris oscuro',   r: [50,99],   g: [50,99],  b: [50,99]  },
  { name: 'Negro',         r: [0,49],    g: [0,49],   b: [0,49]   },
];

function getColorName(r: number, g: number, b: number): string {
  let best = null, bestScore = Infinity;
  for (const c of COLOR_DB) {
    const cr = (c.r[0] + c.r[1]) / 2;
    const cg = (c.g[0] + c.g[1]) / 2;
    const cb = (c.b[0] + c.b[1]) / 2;
    const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
    const inRange =
      r >= c.r[0] && r <= c.r[1] &&
      g >= c.g[0] && g <= c.g[1] &&
      b >= c.b[0] && b <= c.b[1];
    const score = inRange ? dist : dist + 300;
    if (score < bestScore) { bestScore = score; best = c; }
  }
  return best?.name ?? 'Desconocido';
}

function toHex(v: number): string { return v.toString(16).padStart(2, '0').toUpperCase(); }

function samplePixels(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius = 6): RGB {
  const size = radius * 2 + 1;
  let R = 0, G = 0, B = 0, count = 0;
  try {
    const { data } = ctx.getImageData(cx - radius, cy - radius, size, size);
    for (let i = 0; i < data.length; i += 4) {
      R += data[i]; G += data[i + 1]; B += data[i + 2]; count++;
    }
  } catch { return { r: 128, g: 128, b: 128 }; }
  return {
    r: Math.round(R / count),
    g: Math.round(G / count),
    b: Math.round(B / count),
  };
}

// ── Main Component ───────────────────────────────────────────────────────────
const CamaraModule = () => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(document.createElement('video'));
  const streamRef   = useRef<MediaStream | null>(null);
  const animIdRef   = useRef<number>(0);

  const [cameraOn,  setCameraOn]  = useState<boolean>(false);
  const [frozen,    setFrozen]    = useState<boolean>(false);
  const [error,     setError]     = useState<string>('');
  const [detected,  setDetected]  = useState<DetectedColor>({ name: '—', hex: '—', r: 0, g: 0, b: 0 });

  // ── Draw loop ──────────────────────────────────────────────────────────────
  const drawLoop = useCallback(() => {
    animIdRef.current = requestAnimationFrame(drawLoop);
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video.readyState) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const wrap = canvas.parentElement;
    canvas.width  = wrap?.offsetWidth  ?? 560;
    canvas.height = wrap?.offsetHeight ?? 420;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (frozen) return; // keep rendering video but skip color update

    const cx = Math.floor(canvas.width  / 2);
    const cy = Math.floor(canvas.height / 2);
    const { r, g, b } = samplePixels(ctx, cx, cy);
    const hex  = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    const name = getColorName(r, g, b);
    setDetected({ name, hex, r, g, b });
  }, [frozen]);

  // ── Start camera ──────────────────────────────────────────────────────────
  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      video.autoplay   = true;
      video.playsInline = true;
      video.srcObject  = stream;
      await video.play();
      setCameraOn(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setError(`No se pudo acceder a la cámara: ${msg}`);
    }
  };

  // ── Stop camera ───────────────────────────────────────────────────────────
  const stopCamera = () => {
    cancelAnimationFrame(animIdRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    videoRef.current.srcObject = null;
    setCameraOn(false);
    setFrozen(false);
    setDetected({ name: '—', hex: '—', r: 0, g: 0, b: 0 });
  };

  // ── Start loop when camera turns on ───────────────────────────────────────
  useEffect(() => {
    if (cameraOn) {
      animIdRef.current = requestAnimationFrame(drawLoop);
    }
    return () => cancelAnimationFrame(animIdRef.current);
  }, [cameraOn, drawLoop]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => stopCamera(), []);

  // ── Derived display values ────────────────────────────────────────────────
  const swatchColor = detected.hex !== '—' ? detected.hex : '#e5e7eb';

  return (
    <section
      className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-6 md:py-8"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl" style={{ height: 160 }}>
        <img
          src={heroCamara}
          alt="Patron abstracto de colores"
          className="absolute inset-0 h-full w-full object-cover animate-camara-pan"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-camara-sheen" />

        <div className="absolute inset-0 flex items-center gap-5 px-7">
          <div className="flex-shrink-0 rounded-2xl bg-white/25 p-3 backdrop-blur-md border border-white/30">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full animate-camara-pulse"
              style={{ backgroundColor: '#4546D7' }}
            >
              <FontAwesomeIcon icon={faCameraRetro} className="text-sm text-white" />
            </div>
          </div>
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
            Ve el mundo en su color real
          </h2>
        </div>
      </div>

      {/* ── Main Card ──────────────────────────────────────────────────────── */}
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

        <div className="my-5 border-t border-gray-100" />

        {/* ── Camera Viewer ─────────────────────────────────────────────────── */}
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Detector en tiempo real</h3>

        <div
          className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-black"
          style={{ aspectRatio: '4/3', maxHeight: 400 }}
        >
          {/* Canvas (video goes here) */}
          <canvas ref={canvasRef} className="h-full w-full object-cover" />

          {/* Placeholder when camera is off */}
          {!cameraOn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-950">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <p className="text-xs text-white/40 text-center px-6">
                Haz clic en "Abrir Cámara" para empezar a detectar colores
              </p>
              {error && (
                <p className="text-xs text-red-400 text-center px-6">{error}</p>
              )}
            </div>
          )}

          {/* Crosshair */}
          {cameraOn && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none"
                style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }}>
                <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2"/>
                <line x1="24" y1="2"  x2="24" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="24" y1="34" x2="24" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2"  y1="24" x2="14" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="34" y1="24" x2="46" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="2" fill="white"/>
              </svg>
            </div>
          )}

          {/* Color badge overlay */}
          {cameraOn && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3
              rounded-full px-4 py-2 backdrop-blur-md border border-white/20"
              style={{ background: 'rgba(0,0,0,0.6)', minWidth: 200 }}>
              <div
                className="h-7 w-7 flex-shrink-0 rounded-full border-2 border-white/30 transition-colors duration-100"
                style={{ background: swatchColor }}
              />
              <div>
                <p className="text-sm font-semibold text-white leading-none mb-0.5">
                  {detected.name}
                </p>
                <p className="text-xs text-white/55 font-mono">{detected.hex}</p>
              </div>
              {frozen && (
                <span className="ml-1 rounded-full bg-yellow-400/20 px-2 py-0.5 text-[10px] font-semibold text-yellow-300">
                  PAUSADO
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Color Info Cards ────────────────────────────────────────────────── */}
        {cameraOn && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Color</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{detected.name}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">HEX</p>
              <p className="text-sm font-semibold text-gray-800 font-mono">{detected.hex}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">RGB</p>
              <p className="text-xs font-semibold text-gray-800 font-mono">
                {detected.hex !== '—' ? `${detected.r}, ${detected.g}, ${detected.b}` : '—'}
              </p>
            </div>
          </div>
        )}

        {/* ── Camera Controls ─────────────────────────────────────────────────── */}
        <div className="mt-4 flex justify-center gap-3">
          {!cameraOn ? (
            <button
              className="inline-flex items-center gap-3 rounded-lg bg-[#4546D7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3535b8] active:scale-95"
              onClick={startCamera}
            >
              <FontAwesomeIcon icon={faCameraRetro} className="text-base" />
              Abrir Cámara
            </button>
          ) : (
            <>
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                onClick={() => setFrozen(f => !f)}
              >
                <FontAwesomeIcon icon={frozen ? faPlay : faPause} className="text-xs" />
                {frozen ? 'Reanudar' : 'Pausar'}
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-95"
                onClick={stopCamera}
              >
                <FontAwesomeIcon icon={faStop} className="text-xs" />
                Cerrar Cámara
              </button>
            </>
          )}
        </div>

        <div className="my-5 border-t border-gray-100" />

        {/* Uso en la vida real */}
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Uso en la vida real</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Vista Normal',  src: vistaNormalImg },
            { label: 'Protanopia',    src: protanopiaImg  },
            { label: 'Tritanopia',    src: tritanopiaImg  },
            { label: 'Deuteranopia',  src: deuteranopiaImg},
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

        <div className="my-5 border-t border-gray-100" />

        {/* Preguntas frecuentes */}
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Preguntas frecuentes</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-800">Como funciona?</p>
            <p className="mt-1.5 text-xs leading-5 text-gray-600">
              Apunta el puntero central al área que quieras analizar. La cámara captura los píxeles
              del centro en tiempo real y devuelve el nombre del color detectado.
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
      </div>

      {/* Accessibility note */}
      <p className="inline-flex w-full items-center justify-center gap-2 text-xs text-gray-400">
        <FontAwesomeIcon icon={faShieldAlt} className="text-[10px]" />
        Optimizado para accesibilidad y daltonismo
      </p>
    </section>
  );
};

export default CamaraModule;
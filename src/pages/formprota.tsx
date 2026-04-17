import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faIdCard,faPhone,faMapMarkerAlt,faVenusMars,faLock,faClipboardQuestion,faImage,faArrowLeft,} from '@fortawesome/free-solid-svg-icons';
import {FormDataPruebaProta,Pregunta,Opcion,Respuesta,} from 'interfaces/FormDataPruebaProta';
import Swal from 'sweetalert2';

const Form = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();

  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token') ||
    localStorage.getItem('paciente_token') ||
    sessionStorage.getItem('paciente_token');

  // ── Detectar si es paciente logueado ─────────────────────────────────────
  const getPacienteData = () => {
    const stored = localStorage.getItem('paciente_session');
    if (!stored) return null;
    try {
      const session = JSON.parse(stored);
      const { nombres, apellidos, numero_identificacion, genero } = session;
      if (nombres && apellidos && numero_identificacion && genero) {
        return { nombres, apellidos, numero_identificacion, genero };
      }
    } catch {
      return null;
    }
    return null;
  };

  const pacienteData = getPacienteData();
  const esPaciente   = pacienteData !== null;

  const [formData, setFormData] = useState<FormDataPruebaProta>({
    nombres:               pacienteData?.nombres               ?? '',
    apellidos:             pacienteData?.apellidos             ?? '',
    numero_identificacion: pacienteData?.numero_identificacion ?? '',
    telefono:              '',
    direccion:             '',
    genero:                pacienteData?.genero                ?? '',
  });

  const [respuestas, setRespuestas]     = useState<Respuesta[]>([]);
  const [preguntas, setPreguntas]       = useState<Pregunta[]>([]);
  const [nombrePrueba, setNombrePrueba] = useState('');
  const [loadingForm, setLoadingForm]   = useState(true);
  const [errorForm, setErrorForm]       = useState<string | null>(null);

  // ── Alerta de consentimiento al entrar ───────────────────────────────────
  useEffect(() => {
    const swalConsentimiento = Swal.mixin({
      customClass: {
        confirmButton: 'swal-btn-confirmar',
        cancelButton:  'swal-btn-cancelar',
      },
      buttonsStyling: false,
    });

    swalConsentimiento.fire({
      title:             'Consentimiento de uso de datos',
      icon:              'warning',
      showCancelButton:  true,
      confirmButtonText: '✓ Acepto, deseo iniciar la prueba',
      cancelButtonText:  '✗ No acepto, volver',
      reverseButtons:    true,
      allowOutsideClick: false,
      allowEscapeKey:    false,
      html: `
        <div style="text-align:left; font-family: inherit;">
          <p style="font-size:0.95rem; color:#374151; line-height:1.7; margin-bottom:12px;">
            Los datos personales que proporcione en este formulario —
            <strong>nombre completo, número de identificación, género e información de contacto</strong> —
            serán utilizados <strong>exclusivamente</strong> con fines clínicos para
            <strong>analizar y determinar el tipo de deficiencia en la percepción del color
            (daltonismo)</strong> que pueda presentar.
          </p>
          <p style="font-size:0.85rem; color:#6B7280; line-height:1.6; margin-bottom:12px;">
            Su información será tratada con total confidencialidad conforme a las normas
            de protección de datos en salud, y <strong>no será compartida con terceros</strong>
            sin su consentimiento explícito.
          </p>
          <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:8px; padding:10px 14px;">
            <p style="font-size:0.82rem; color:#1D4ED8; margin:0;">
              🔒 Al hacer clic en <strong>"Acepto"</strong>, usted autoriza el procesamiento
              de sus datos para los fines descritos anteriormente.
            </p>
          </div>
        </div>
      `,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/dashboard');
      }
    });

    return () => {
      Swal.close();
    };
  }, []);

  // ── Cargar preguntas desde la API ─────────────────────────────────────────
  useEffect(() => {
    if (!id || !token) return;

    const cargar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/pruebas/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPreguntas(res.data.preguntas);
        setNombrePrueba(res.data.nombre_prueba);
      } catch (err) {
        setErrorForm('No se pudieron cargar las preguntas de la prueba.');
        console.error(err);
      } finally {
        setLoadingForm(false);
      }
    };

    cargar();
  }, [id, token]);

  const handleInputChange = (field: keyof FormDataPruebaProta, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRespuestaChange = (
    pregunta_id: number,
    opcion_id: number,
    valor_opcion: string
  ) => {
    setRespuestas((prev) => [
      ...prev.filter((r) => r.pregunta_id !== pregunta_id),
      { pregunta_id, opcion_id, valor_respuesta: valor_opcion },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preguntasObligatorias  = preguntas.filter((p) => p.obligatoria);
    const respuestasObligatorias = respuestas.filter((r) =>
      preguntasObligatorias.some((p) => p.pregunta_id === r.pregunta_id)
    );

    if (respuestasObligatorias.length < preguntasObligatorias.length) {
      Swal.fire({ title: 'Faltan respuestas', text: 'Por favor responda todas las preguntas obligatorias.', icon: 'warning' });
      return;
    }

    const payload = {
      paciente: {
        nombres:               formData.nombres,
        apellidos:             formData.apellidos,
        numero_identificacion: formData.numero_identificacion,
        telefono:              formData.telefono,
        direccion:             formData.direccion,
        genero:                formData.genero,
        fecha_registro:        new Date().toISOString(),
      },
      respuestas: respuestas.map((r) => ({
        pregunta_id:            r.pregunta_id,
        opcion_seleccionada_id: r.opcion_id,
        valor_respuesta:        r.valor_respuesta,
        fecha_respuesta:        new Date().toISOString(),
      })),
    };

    try {
      await axios.post(
        `http://localhost:8000/api/pruebas/${id}/registrar/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let puntajeTotal  = 0;
      let puntajeMaximo = 0;

      preguntas.forEach((pregunta) => {
        const respuestaUsuario = respuestas.find(
          (r) => Number(r.pregunta_id) === Number(pregunta.pregunta_id)
        );
        const maxPregunta = Math.max(...pregunta.opciones.map((o) => o.puntaje || 0));
        puntajeMaximo += maxPregunta;

        if (respuestaUsuario) {
          const opcionSeleccionada = pregunta.opciones.find(
            (o) => Number(o.opcion_id) === Number(respuestaUsuario.opcion_id)
          );
          if (opcionSeleccionada?.puntaje !== undefined) {
            puntajeTotal += opcionSeleccionada.puntaje;
          }
        }
      });

      const porcentaje = puntajeMaximo > 0 ? (puntajeTotal / puntajeMaximo) * 100 : 0;
      let diagnostico  = '';

      if (porcentaje === 0)        diagnostico = 'Visión normal';
      else if (porcentaje <= 30)   diagnostico = 'Leve dificultad';
      else if (porcentaje <= 60)   diagnostico = 'Deficiencia moderada';
      else                         diagnostico = 'Alta probabilidad de protanopia';

      Swal.fire({
        title: 'Resultado de la prueba',
        icon: 'success',
        html: `
          <div style="text-align:left">
            <p><strong>Puntaje:</strong> ${puntajeTotal} / ${puntajeMaximo}</p>
            <p><strong>Porcentaje:</strong> ${porcentaje.toFixed(0)}%</p>
            <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
          </div>
        `,
        confirmButtonText: 'Aceptar',
        draggable: true,
      });

    } catch (err) {
      console.error(err);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al enviar la prueba.', icon: 'error' });
    }
  };

  // ── Clases reutilizables ──────────────────────────────────────────────────
  const inputBase      = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const inputActivo    = "bg-gray-50 border-gray-300 text-gray-700 placeholder-gray-400 focus:bg-white";
  const inputBloqueado = "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Estilos para los botones del Swal de consentimiento */}
      <style>{`
        .swal-btn-confirmar {
          background-color: #2563EB;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .swal-btn-confirmar:hover { background-color: #1D4ED8; }

        .swal-btn-cancelar {
          background-color: #F3F4F6;
          color: #374151;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px solid #D1D5DB;
          cursor: pointer;
          margin-right: 8px;
          transition: background 0.2s;
        }
        .swal-btn-cancelar:hover { background-color: #E5E7EB; }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Botón Volver */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Volver</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {nombrePrueba || 'Registro de Paciente'}
          </h1>
          <p className="text-gray-600 text-sm">
            Complete el siguiente formulario con la información del paciente.
          </p>
        </div>

        {loadingForm && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500 text-sm">
            Cargando preguntas...
          </div>
        )}

        {errorForm && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm mb-6">
            {errorForm}
          </div>
        )}

        {!loadingForm && !errorForm && (
        <form onSubmit={handleSubmit}>

          {/* ── Información Personal ── */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-xl text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
              </div>
              {esPaciente && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                  <FontAwesomeIcon icon={faLock} className="text-xs" />
                  Datos de tu cuenta
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombres <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingrese los nombres"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                  readOnly={esPaciente}
                  required
                  className={`${inputBase} ${esPaciente ? inputBloqueado : inputActivo}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingrese los apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  readOnly={esPaciente}
                  required
                  className={`${inputBase} ${esPaciente ? inputBloqueado : inputActivo}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Identificación <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faIdCard} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ej: 1234567890"
                    value={formData.numero_identificacion}
                    onChange={(e) => handleInputChange('numero_identificacion', e.target.value)}
                    readOnly={esPaciente}
                    required
                    className={`${inputBase} pl-10 ${esPaciente ? inputBloqueado : inputActivo}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faVenusMars} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.genero}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                    disabled={esPaciente}
                    required
                    className={`${inputBase} pl-10 appearance-none ${esPaciente ? inputBloqueado : `${inputActivo} cursor-pointer`}`}
                  >
                    <option value="">Seleccione género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ── Información de Contacto ── */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faPhone} className="text-xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Información de Contacto</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Ej: 0987654321"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  required
                  className={`${inputBase} pl-10 ${inputActivo}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  placeholder="Ingrese la dirección completa del paciente..."
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  required
                  rows={3}
                  className={`${inputBase} pl-10 resize-y ${inputActivo}`}
                />
              </div>
            </div>
          </div>

          {/* ── Prueba de Evaluación ── */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faClipboardQuestion} className="text-xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Prueba de Evaluación</h2>
            </div>

            {preguntas.map((pregunta, index) => (
              <div key={pregunta.pregunta_id} className="mb-8 pb-6 border-b border-gray-200 last:border-b-0">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {index + 1}. {pregunta.enunciado}
                    {pregunta.obligatoria && <span className="text-red-500 ml-1">*</span>}
                  </label>
                </div>

                {pregunta.recurso_visual && (
                  <div className="mb-4">
                    <img
                      src={`/images/${pregunta.recurso_visual}`}
                      alt={`Imagen para pregunta ${pregunta.pregunta_id}`}
                      className="w-full h-auto rounded-lg border-2 border-blue-200 shadow-sm"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'block';
                      }}
                    />
                    <div
                      className="bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-8 flex items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center">
                        <FontAwesomeIcon icon={faImage} className="text-4xl text-blue-400 mb-3" />
                        
                        <p className="text-blue-700 font-semibold">Imagen no disponible</p>
                        
                        
                        <p className="text-blue-500 text-xs mt-1">ID: {pregunta.recurso_visual}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {pregunta.opciones.map((opcion: Opcion) => {
                    const respuestaActual = respuestas.find((r) => r.pregunta_id === pregunta.pregunta_id);
                    const isSelected      = respuestaActual?.opcion_id === opcion.opcion_id;

                    return (
                      <label
                        key={opcion.opcion_id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`pregunta_${pregunta.pregunta_id}`}
                          value={opcion.valor_opcion}
                          checked={isSelected}
                          onChange={() => handleRespuestaChange(pregunta.pregunta_id, opcion.opcion_id, opcion.valor_opcion)}
                          className="w-4 h-4 text-blue-500 accent-blue-500 cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-700">{opcion.texto_opcion}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>✓</span>
              <span>Enviar Prueba</span>
            </button>
          </div>
        </form>
        )}

        <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
          <FontAwesomeIcon icon={faLock} className="text-base" />
          <span>Protocolo de Transmisión Segura de Datos de Salud</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faIdCard,
  faPhone,
  faMapMarkerAlt,
  faVenusMars,
  faLock,
  faClipboardQuestion,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormDataPruebaProta,
  Pregunta,
  Opcion,
  Respuesta,
} from 'interfaces/FormDataPruebaProta';

const Form = () => {
  const { id } = useParams<{ id: string }>();

  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

  const [formData, setFormData] = useState<FormDataPruebaProta>({
    nombres: '',
    apellidos: '',
    numero_identificacion: '',
    telefono: '',
    direccion: '',
    genero: '',
  });

  const [respuestas, setRespuestas]     = useState<Respuesta[]>([]);
  const [preguntas, setPreguntas]       = useState<Pregunta[]>([]);
  const [nombrePrueba, setNombrePrueba] = useState('');
  const [loadingForm, setLoadingForm]   = useState(true);
  const [errorForm, setErrorForm]       = useState<string | null>(null);

  // ── Cargar preguntas desde la API ──────────────────────────────────────────
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
    const nuevasRespuestas = respuestas.filter((r) => r.pregunta_id !== pregunta_id);
    nuevasRespuestas.push({ pregunta_id, opcion_id, valor_respuesta: valor_opcion });
    setRespuestas(nuevasRespuestas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preguntasObligatorias = preguntas.filter((p) => p.obligatoria);
    const respuestasObligatorias = respuestas.filter((r) =>
      preguntasObligatorias.some((p) => p.pregunta_id === r.pregunta_id)
    );

    if (respuestasObligatorias.length < preguntasObligatorias.length) {
      alert('Por favor responda todas las preguntas obligatorias.');
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
      alert('¡Prueba enviada correctamente!');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar la prueba. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {nombrePrueba || 'Registro de Paciente'}
          </h1>
          <p className="text-gray-600 text-sm">
            Complete el siguiente formulario con la información del paciente.
          </p>
        </div>

        {/* Loading */}
        {loadingForm && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500 text-sm">
            Cargando preguntas...
          </div>
        )}

        {/* Error */}
        {errorForm && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm mb-6">
            {errorForm}
          </div>
        )}

        {!loadingForm && !errorForm && (
        <form onSubmit={handleSubmit}>

          {/* ── Información Personal ── */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faUser} className="text-xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
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
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Identificación <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faIdCard}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Ej: 1234567890"
                    value={formData.numero_identificacion}
                    onChange={(e) => handleInputChange('numero_identificacion', e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={formData.genero}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer appearance-none"
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
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Ej: 0987654321"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <textarea
                  placeholder="Ingrese la dirección completa del paciente..."
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  required
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y focus:bg-white"
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
              <div
                key={pregunta.pregunta_id}
                className="mb-8 pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {index + 1}. {pregunta.enunciado}
                    {pregunta.obligatoria && <span className="text-red-500 ml-1">*</span>}
                  </label>
                </div>

                {pregunta.recurso_visual && (
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-8 flex items-center justify-center">
                      <div className="text-center">
                        <FontAwesomeIcon icon={faImage} className="text-4xl text-blue-400 mb-3" />
                        <p className="text-blue-700 font-semibold">{pregunta.recurso_visual}</p>
                        <p className="text-blue-500 text-xs mt-1">Placeholder de imagen</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {pregunta.opciones.map((opcion: Opcion) => {
                    const respuestaActual = respuestas.find(
                      (r) => r.pregunta_id === pregunta.pregunta_id
                    );
                    const isSelected = respuestaActual?.opcion_id === opcion.opcion_id;

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
                          onChange={() =>
                            handleRespuestaChange(
                              pregunta.pregunta_id,
                              opcion.opcion_id,
                              opcion.valor_opcion
                            )
                          }
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

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
          <FontAwesomeIcon icon={faLock} className="text-base" />
          <span>Protocolo de Transmisión Segura de Datos de Salud</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
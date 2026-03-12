import { useState } from 'react';
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

interface FormData {
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  telefono: string;
  direccion: string;
  genero: string;
}

interface Pregunta {
  pregunta_id: number;
  enunciado: string;
  tipo_pregunta: string;
  recurso_visual: string | null;
  obligatoria: boolean;
  opciones: Opcion[];
}

interface Opcion {
  opcion_id: number;
  texto_opcion: string;
  valor_opcion: string;
}

interface Respuesta {
  pregunta_id: number;
  opcion_id: number;
  valor_respuesta: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    numero_identificacion: '',
    telefono: '',
    direccion: '',
    genero: '',
  });

  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

  // Preguntas de ejemplo - estas podrían venir de una API
  const preguntas: Pregunta[] = [
    {
      pregunta_id: 1,
      enunciado: '¿Cuál de las siguientes imágenes muestra el número correcto?',
      tipo_pregunta: 'opcion_multiple',
      recurso_visual: 'Imagen 1',
      obligatoria: true,
      opciones: [
        { opcion_id: 1, texto_opcion: 'Opción A', valor_opcion: 'A' },
        { opcion_id: 2, texto_opcion: 'Opción B', valor_opcion: 'B' },
        { opcion_id: 3, texto_opcion: 'Opción C', valor_opcion: 'C' },
        { opcion_id: 4, texto_opcion: 'Opción D', valor_opcion: 'D' },
      ],
    },
    {
      pregunta_id: 2,
      enunciado: 'Identifique el patrón en la siguiente imagen',
      tipo_pregunta: 'opcion_multiple',
      recurso_visual: 'Imagen 2',
      obligatoria: true,
      opciones: [
        { opcion_id: 5, texto_opcion: 'Patrón circular', valor_opcion: 'circular' },
        { opcion_id: 6, texto_opcion: 'Patrón lineal', valor_opcion: 'lineal' },
        { opcion_id: 7, texto_opcion: 'Patrón irregular', valor_opcion: 'irregular' },
      ],
    },
    {
      pregunta_id: 3,
      enunciado: '¿Ha experimentado alguna dificultad visual recientemente?',
      tipo_pregunta: 'opcion_multiple',
      recurso_visual: null,
      obligatoria: false,
      opciones: [
        { opcion_id: 8, texto_opcion: 'Sí, frecuentemente', valor_opcion: 'si_frecuente' },
        { opcion_id: 9, texto_opcion: 'Ocasionalmente', valor_opcion: 'ocasional' },
        { opcion_id: 10, texto_opcion: 'No', valor_opcion: 'no' },
      ],
    },
    {
      pregunta_id: 4,
      enunciado: 'Observe la siguiente imagen y seleccione el color predominante',
      tipo_pregunta: 'opcion_multiple',
      recurso_visual: 'Imagen 3',
      obligatoria: true,
      opciones: [
        { opcion_id: 11, texto_opcion: 'Rojo', valor_opcion: 'rojo' },
        { opcion_id: 12, texto_opcion: 'Verde', valor_opcion: 'verde' },
        { opcion_id: 13, texto_opcion: 'Azul', valor_opcion: 'azul' },
        { opcion_id: 14, texto_opcion: 'Amarillo', valor_opcion: 'amarillo' },
      ],
    },
    {
      pregunta_id: 5,
      enunciado: '¿Con qué frecuencia realiza actividades que requieren distinción de colores?',
      tipo_pregunta: 'opcion_multiple',
      recurso_visual: null,
      obligatoria: true,
      opciones: [
        { opcion_id: 15, texto_opcion: 'Diariamente', valor_opcion: 'diario' },
        { opcion_id: 16, texto_opcion: 'Semanalmente', valor_opcion: 'semanal' },
        { opcion_id: 17, texto_opcion: 'Mensualmente', valor_opcion: 'mensual' },
        { opcion_id: 18, texto_opcion: 'Raramente', valor_opcion: 'raro' },
      ],
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleRespuestaChange = (pregunta_id: number, opcion_id: number, valor_opcion: string) => {
    // Actualizar o agregar respuesta
    const nuevasRespuestas = respuestas.filter((r) => r.pregunta_id !== pregunta_id);
    nuevasRespuestas.push({
      pregunta_id,
      opcion_id,
      valor_respuesta: valor_opcion,
    });
    setRespuestas(nuevasRespuestas);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todas las preguntas obligatorias estén respondidas
    const preguntasObligatorias = preguntas.filter((p) => p.obligatoria);
    const respuestasObligatorias = respuestas.filter((r) =>
      preguntasObligatorias.some((p) => p.pregunta_id === r.pregunta_id)
    );

    if (respuestasObligatorias.length < preguntasObligatorias.length) {
      alert('Por favor responda todas las preguntas obligatorias.');
      return;
    }

    // Generar JSON con los datos exactos de la tabla
    const pacienteData = {
      paciente: {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        numero_identificacion: formData.numero_identificacion,
        telefono: formData.telefono,
        direccion: formData.direccion,
        genero: formData.genero,
        fecha_registro: new Date().toISOString(),
      },
      respuestas: respuestas.map((r) => ({
        pregunta_id: r.pregunta_id,
        opcion_seleccionada_id: r.opcion_id,
        valor_respuesta: r.valor_respuesta,
        fecha_respuesta: new Date().toISOString(),
      })),
    };

    console.log('Datos Completos (JSON):', JSON.stringify(pacienteData, null, 2));
    alert('¡Registro completo! Revisa la consola para ver los datos JSON.');
  };

  const handleSaveProgress = () => {
    localStorage.setItem('patientForm', JSON.stringify(formData));
    localStorage.setItem('patientAnswers', JSON.stringify(respuestas));
    console.log('Progreso guardado:', { formData, respuestas });
    alert('¡Progreso guardado exitosamente!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Paciente</h1>
          <p className="text-gray-600 text-sm">
            Complete el siguiente formulario con la información del paciente.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información Personal */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faUser} className="text-xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Nombres */}
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

              {/* Apellidos */}
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
              {/* Número de Identificación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Identificación <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faIdCard}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faPhone} className="text-xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Información de Contacto</h2>
            </div>

            {/* Teléfono */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

            {/* Dirección */}
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

          {/* Sección de Preguntas de Prueba */}
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
                {/* Enunciado de la pregunta */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {index + 1}. {pregunta.enunciado}
                    {pregunta.obligatoria && <span className="text-red-500 ml-1">*</span>}
                  </label>
                </div>

                {/* Recurso Visual (Placeholder de imagen) */}
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

                {/* Opciones de respuesta */}
                <div className="space-y-2">
                  {pregunta.opciones.map((opcion) => {
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleSaveProgress}
              className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Guardar Progreso
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>✓</span>
              <span>Registrar Paciente</span>
            </button>
          </div>
        </form>

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

export interface FormDataPruebaProta {
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  telefono: string;
  direccion: string;
  genero: string;
}

export interface Opcion {
  opcion_id: number;
  texto_opcion: string;
  valor_opcion: string;
}

export interface Pregunta {
  pregunta_id: number;
  enunciado: string;
  tipo_pregunta: string;
  recurso_visual: string | null;
  obligatoria: boolean;
  opciones: Opcion[];
}

export interface Respuesta {
  pregunta_id: number;
  opcion_id: number;
  valor_respuesta: string;
}
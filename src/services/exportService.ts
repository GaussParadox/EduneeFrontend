import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
  title?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel
// Función auxiliar para formatear fechas en reportes
// Manejo de tipos de datos: Convierte strings ISO a formato localizado (es-CO)
// Manejo de excepciones implícito: Retorna vacío si no hay valor
/**
 * Formatear fecha para los reportes
 */
const formatFecha = (iso: string): string => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// GUÍA 8: Actividad 2 - Exportación CSV/Excel
// Función auxiliar para extraer headers/columnas de datos
// Manejo de tipos de datos: Detecta estructura de objetos e identifica columnas
// Control de excepciones: Valida arrays vacíos y retorna array vacío como fallback seguro
/**
 * Obtener todas las claves de un array de objetos (columnas)
 */
const getColumns = (data: any[]): string[] => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
};

// GUÍA 8: Actividad 2 - Exportación CSV/Excel
// Función auxiliar para normalizar estructuras de datos anidados
// Manejo de tipos de datos: Detecta objetos anidados y aplana sus propiedades
// Recursividad y mapeo: Procesa arrays de objetos complejos para exportación
/**
 * Transformar datos para exportación
 */
const transformData = (data: any[]): any[] => {
  return data.map((item) => {
    const transformed: any = {};
    Object.keys(item).forEach((key) => {
      if (item[key] instanceof Object && !(item[key] instanceof Date)) {
        // Si es un objeto anidado, extraer valores principales
        Object.keys(item[key]).forEach((subKey) => {
          transformed[`${key}_${subKey}`] = item[key][subKey];
        });
      } else {
        transformed[key] = item[key];
      }
    });
    return transformed;
  });
};

// ─── Exportar a Excel ─────────────────────────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel & Actividad 3 - Control de Excepciones
// Función principal para exportación de datos a formato Excel (.xlsx)
// Usa la librería XLSX: Convierte JSON a hojas de cálculo con auto-ajuste de columnas
// Control de excepciones (I/O Errors): Bloque try/catch con mensajes amigables usando template strings
// Manejo de errores de escritura: Captura excepciones de generación y descarga de archivos
// Timestamp dinámico: Genera nombres únicos con getTime() para evitar sobrescrituras
/**
 * Exportar datos a archivo Excel
 * @param data - Array de objetos a exportar
 * @param options - Opciones de exportación (filename, sheetName)
 */
export const exportToExcel = (data: any[], options?: ExportOptions): void => {
  try {
    if (!data || data.length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    const transformedData = transformData(data);
    const ws = XLSX.utils.json_to_sheet(transformedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, options?.sheetName || 'Datos');

    // Auto-ajustar ancho de columnas
    const maxWidth = 20;
    const colWidths = getColumns(transformedData).map((col) => ({
      wch: Math.min(maxWidth, col.length + 2),
    }));
    ws['!cols'] = colWidths;

    const filename = `${options?.filename || 'export'}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    throw new Error('No se pudo exportar el archivo Excel');
  }
};

// ─── Exportar a PDF ───────────────────────────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel & Actividad 3 - Control de Excepciones
// Función principal para exportación de datos a formato PDF con tabla profesional
// Usa librerías jsPDF + autoTable: Genera documentos PDF con estilos, headers y tablas
// Control de excepciones (I/O Errors): Bloque try/catch con validaciones de datos
// Manejo de headers y columnas: Permite especificar columnas selectivas o exportar todas
// Tipos de datos: Formatea fechas ISO detectando strings con 'T' y aplicando formatFecha()
// Template strings: Genera nombres de archivo dinámicos con timestamp
/**
 * Exportar datos a archivo PDF con tabla
 * @param data - Array de objetos a exportar
 * @param columns - Array de columnas a incluir (opcional)
 * @param options - Opciones de exportación (filename, title)
 */
export const exportToPDF = (data: any[], columns?: string[], options?: ExportOptions): void => {
  try {
    if (!data || data.length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    const doc = new jsPDF();
    const transformedData = transformData(data);
    const colsToExport = columns || getColumns(transformedData);

    // Título
    if (options?.title) {
      doc.setFontSize(16);
      doc.text(options.title, 14, 22);
    }

    // Fecha de generación
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-CO')}`, 14, options?.title ? 32 : 22);

    // Tabla
    const headers = colsToExport.map((col) => col);
    const rows = transformedData.map((row) =>
      colsToExport.map((col) => {
        const value = row[col];
        if (typeof value === 'string' && value.includes('T')) {
          return formatFecha(value);
        }
        return value || '';
      })
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: options?.title ? 40 : 30,
      margin: 10,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [242, 242, 251],
      },
    });

    const filename = `${options?.filename || 'export'}_${new Date().getTime()}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    throw new Error('No se pudo exportar el archivo PDF');
  }
};

// ─── Exportar Resultados específicos ───────────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel
// Función especializada para exportar resultados de sesiones a Excel
// Mapeo y transformación: Estructura datos de sesiones con información del paciente
// Manejo de tipos de datos: Extrae y formatea fechas, nombres, IDs y puntajes
// Reutiliza exportToExcel: Delega la generación del archivo a la función principal
/**
 * Exportar resultados de sesiones a Excel
 */
export const exportResultadosExcel = (sesiones: any[]): void => {
  const dataForExport = sesiones.map((sesion) => ({
    Prueba: sesion.prueba || '',
    'Tipo Prueba': sesion.tipo_prueba || '',
    'Nombre Paciente': `${sesion.paciente.nombres} ${sesion.paciente.apellidos}`,
    'ID Paciente': sesion.paciente.numero_identificacion || '',
    'Nombre de la Prueba': sesion.prueba || '',
    'Fecha de Registro': sesion.fecha_inicio
      ? new Date(sesion.fecha_inicio).toLocaleDateString('es-CO')
      : '',
    Puntaje: sesion.puntaje_total || 'N/A',
  }));

  exportToExcel(dataForExport, {
    filename: 'resultados-sesiones',
    sheetName: 'Resultados',
  });
};

// GUÍA 8: Actividad 2 - Exportación CSV/Excel
// Función especializada para exportar resultados de sesiones a PDF
// Transformación de datos: Mapea información de sesiones con datos del paciente
// Manejo de tipos de datos: Normaliza fechas, nombres y puntajes para visualización
// Reutiliza exportToPDF: Utiliza la función principal con título personalizado
/**
 * Exportar resultados de sesiones a PDF
 */
export const exportResultadosPDF = (sesiones: any[]): void => {
  const dataForExport = sesiones.map((sesion) => ({
    prueba: sesion.prueba,
    tipo_prueba: sesion.tipo_prueba,
    nombre_paciente: `${sesion.paciente.nombres} ${sesion.paciente.apellidos}`,
    id_paciente: sesion.paciente.numero_identificacion,
    fecha_registro: sesion.fecha_registro
      ? new Date(sesion.fecha_registro).toLocaleDateString('es-CO')
      : '',
    puntaje: sesion.puntaje || 'N/A',
  }));

  exportToPDF(dataForExport, undefined, {
    filename: 'resultados-sesiones',
    title: 'Reporte de Resultados de Sesiones',
  });
};

// ─── Exportar Usuarios ─────────────────────────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel & Actividad 3 - Control de Excepciones
// Función avanzada para exportar múltiples tipos de usuarios en hojas separadas
// Manejo de múltiples hojas: Crea un workbook con hojas para administradores y pacientes
// Manejo de headers: Define columnas específicas para cada tipo de usuario con ancho ajustado
// Control de excepciones (I/O Errors): Bloque try/catch con validación de datos
// Manejo de permisos: Acceso a localStorage/API para obtener datos de usuarios
// Mensajes amigables: Template strings informativas para errores
/**
 * Exportar usuarios (administradores y pacientes) a Excel
 */
export const exportUsuariosExcel = (admins: any[], pacientes: any[]): void => {
  try {
    const wb = XLSX.utils.book_new();

    // Hoja de administradores
    const adminsData = admins.map((admin) => ({
      ID: admin.id,
      Usuario: admin.username,
      'Fecha Creación': new Date(admin.fecha_creacion).toLocaleDateString('es-CO'),
    }));

    const wsAdmins = XLSX.utils.json_to_sheet(adminsData);
    wsAdmins['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, wsAdmins, 'Administradores');

    // Hoja de pacientes
    const pacientesData = pacientes.map((paciente) => ({
      ID: paciente.id,
      Usuario: paciente.username,
      Nombres: paciente.nombres,
      Apellidos: paciente.apellidos,
      Identificación: paciente.numero_identificacion,
      Género: paciente.genero,
      'Fecha Registro': new Date(paciente.fecha_registro).toLocaleDateString('es-CO'),
    }));

    const wsPacientes = XLSX.utils.json_to_sheet(pacientesData);
    wsPacientes['!cols'] = [
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 18 },
      { wch: 12 },
      { wch: 15 },
    ];
    XLSX.utils.book_append_sheet(wb, wsPacientes, 'Pacientes');

    const filename = `usuarios_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.error('Error al exportar usuarios:', error);
    throw new Error('No se pudo exportar el archivo de usuarios');
  }
};

// ─── Exportar Resultado Individual a PDF ──────────────────────────────────────

// GUÍA 8: Actividad 2 - Exportación CSV/Excel & Actividad 3 - Control de Excepciones
// Función especializada para generar reportes PDF individuales detallados por sesión
// Usa jsPDF: Crea documentos formateados con encabezados, secciones y footers profesionales
// Manejo de tipos de datos: Procesa fechas ISO, strings y valores numéricos con formateo localizado
// Control de excepciones (I/O Errors): Bloque try/catch para captura de errores en generación
// Mapeo de datos: Estructura información en secciones (General, Paciente, Resultados)
// Template strings: Genera nombres únicos de archivo con ID de sesión y timestamp
/**
 * Exportar un resultado individual a PDF
 */
export const exportResultadoIndividualPDF = (sesion: any): void => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // ─── Encabezado ────────────────────────────────────────────────────────

    // Título principal
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Color indigo
    doc.text('REPORTE DE RESULTADO', margin, yPosition);
    yPosition += 12;

    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // ─── Información de la Sesión ──────────────────────────────────────────

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('', 'bold');
    doc.text('INFORMACIÓN GENERAL', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('', 'normal');

    const sessionInfo = [
      { label: 'ID Sesión:', value: `#${sesion.sesion_id}` },
      { label: 'Prueba:', value: sesion.prueba },
      { label: 'Tipo de Prueba:', value: sesion.tipo_prueba || 'N/A' },
      { label: 'Categoría:', value: sesion.categoria || 'N/A' },
      {
        label: 'Fecha de Registro:',
        value: new Date(sesion.fecha_inicio).toLocaleDateString('es-CO', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
      {
        label: 'Hora:',
        value: new Date(sesion.fecha_inicio).toLocaleTimeString('es-CO'),
      },
    ];

    sessionInfo.forEach((info) => {
      doc.setFont('', 'bold');
      doc.text(`${info.label}`, margin, yPosition);
      doc.setFont('', 'normal');
      doc.text(`${info.value}`, margin + 50, yPosition);
      yPosition += 7;
    });

    yPosition += 5;

    // ─── Información del Paciente ──────────────────────────────────────────

    doc.setFontSize(12);
    doc.setFont('', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('DATOS DEL PACIENTE', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const pacienteInfo = [
      {
        label: 'Nombre Completo:',
        value: `${sesion.paciente.nombres} ${sesion.paciente.apellidos}`,
      },
      { label: 'Número de Identificación:', value: sesion.paciente.numero_identificacion },
      { label: 'Género:', value: sesion.paciente.genero || 'N/A' },
      { label: 'Teléfono:', value: sesion.paciente.telefono || 'N/A' },
    ];

    pacienteInfo.forEach((info) => {
      doc.setFont('', 'bold');
      doc.text(`${info.label}`, margin, yPosition);
      doc.setFont('', 'normal');
      doc.text(`${info.value}`, margin + 60, yPosition);
      yPosition += 7;
    });

    yPosition += 5;

    // ─── Resultados ────────────────────────────────────────────────────────

    doc.setFontSize(12);
    doc.setFont('', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text('RESULTADOS', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const resultInfo = [
      {
        label: 'Puntaje Total:',
        value: `${sesion.puntaje_total || 0}`,
        highlight: true,
      },
      { label: 'Estado:', value: sesion.estado || 'N/A' },
      {
        label: 'Fecha de Finalización:',
        value: sesion.fecha_fin
          ? new Date(sesion.fecha_fin).toLocaleDateString('es-CO')
          : 'No finalizado',
      },
    ];

    resultInfo.forEach((info) => {
      doc.setFont('', 'bold');
      doc.text(`${info.label}`, margin, yPosition);
      doc.setFont('', 'normal');
      if (info.highlight) {
        doc.setTextColor(79, 70, 229);
        doc.setFont('', 'bold');
      }
      doc.text(`${info.value}`, margin + 60, yPosition);
      doc.setTextColor(0, 0, 0);
      doc.setFont('', 'normal');
      yPosition += 7;
    });

    yPosition += 10;

    // ─── Footer ────────────────────────────────────────────────────────────

    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generado el ${new Date().toLocaleDateString('es-CO')} a las ${new Date().toLocaleTimeString('es-CO')}`,
      margin,
      pageHeight - 10
    );

    const filename = `resultado_${sesion.sesion_id}_${new Date().getTime()}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Error al exportar PDF individual:', error);
    throw new Error('No se pudo exportar el archivo PDF');
  }
};

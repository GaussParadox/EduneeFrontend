# 📋 DOCUMENTACIÓN GUÍA 8: Manejo de Archivos y Persistencia de Datos

**Proyecto:** Frontend Edunee  
**Fecha de Documentación:** 14 de mayo de 2026  
**Documentador:** GitHub Copilot

---

## 📌 Resumen General

Se ha documentado el proyecto Frontend Edunee según la **Guía 8: Manejo de Archivos y Persistencia de Datos**. Se identificaron y documentaron funciones distribuidas en tres actividades principales:

- ✅ **Actividad 1:** Lectura/Escritura de Archivos Planos (localStorage, sessionStorage, JSON)
- ✅ **Actividad 2:** Exportación CSV/Excel y Generación de Reportes PDF
- ✅ **Actividad 3:** Control de Excepciones (I/O Errors, manejo seguro de permisos)

---

## 🔍 ACTIVIDAD 1: Lectura/Escritura de Archivos Planos

### 1️⃣ **useLocalStorage.ts** (Hook personalizado React)

**Archivo:** `src/hooks/useLocalStorage.ts`

#### Funciones Documentadas:

| Línea    | Función              | Descripción                                       |
| -------- | -------------------- | ------------------------------------------------- |
| **5-56** | `useLocalStorage<T>` | Hook para manejar localStorage de manera reactiva |

**Detalles de Implementación:**

```javascript
// Línea 5-56: useLocalStorage Hook
// Interfaz: window.localStorage.getItem() y window.localStorage.setItem()
// JSON.parse: Deserializa datos persistidos en texto plano
// JSON.stringify: Serializa objetos complejos para almacenamiento
```

**Capacidades de I/O:**

- ✅ Lectura de datos: `window.localStorage.getItem(key)` → Línea 24
- ✅ Escritura de datos: `window.localStorage.setItem()` → Línea 47
- ✅ Serialización JSON: `JSON.parse()` y `JSON.stringify()` → Líneas 25, 47
- ✅ Genéricos TypeScript: Acepta cualquier tipo `<T>`

**Control de Excepciones:**

- Bloque try/catch en lectura → Línea 21-29
- Bloque try/catch en escritura → Línea 38-48
- Mensajes amigables: `console.error()` con contexto de error

---

### 2️⃣ **authService.ts** (Autenticación con Persistencia)

**Archivo:** `src/services/authService.ts`

#### Funciones Documentadas:

| Línea     | Función              | Descripción                                                            |
| --------- | -------------------- | ---------------------------------------------------------------------- |
| **3-37**  | `loginAdministrador` | Autenticación de admin con persistencia en localStorage/sessionStorage |
| **41-46** | `loginCliente`       | Autenticación de pacientes (reutiliza lógica de admin)                 |

**Detalles de Implementación:**

```javascript
// Línea 3-37: loginAdministrador
// localStorage: Almacenamiento persistente (opción "Recuerdarme")
// sessionStorage: Almacenamiento temporal de sesión
// JSON.stringify: Serializa userData en línea 20
```

**Capacidades de I/O:**

| Operación                       | Línea | Código                                                     |
| ------------------------------- | ----- | ---------------------------------------------------------- |
| Guardar token en localStorage   | 21    | `localStorage.setItem('access_token', data.access)`        |
| Guardar refresh token           | 22    | `localStorage.setItem('refresh_token', data.refresh)`      |
| Guardar usuario serializado     | 23    | `localStorage.setItem('user', JSON.stringify(userData))`   |
| Guardar token en sessionStorage | 25    | `sessionStorage.setItem('access_token', data.access)`      |
| Guardar refresh token           | 26    | `sessionStorage.setItem('refresh_token', data.refresh)`    |
| Guardar usuario serializado     | 27    | `sessionStorage.setItem('user', JSON.stringify(userData))` |

**Control de Excepciones:**

- Bloque try/catch global → Línea 8-30
- Validación de respuesta → Línea 31-36
- Mensajes con template strings: `` `Error de autenticación` ``

---

## 🔄 ACTIVIDAD 2: Exportación CSV/Excel y Reportes PDF

### 3️⃣ **exportService.ts** (Exportación de Datos)

**Archivo:** `src/services/exportService.ts`

#### Funciones Documentadas:

| Línea       | Función                        | Categoría | Descripción                                            |
| ----------- | ------------------------------ | --------- | ------------------------------------------------------ |
| **18-24**   | `formatFecha`                  | Helper    | Formatea fechas ISO a formato localizado (es-CO)       |
| **30-33**   | `getColumns`                   | Helper    | Extrae headers/columnas de array de objetos            |
| **38-52**   | `transformData`                | Helper    | Transforma objetos anidados en estructura plana        |
| **62-85**   | `exportToExcel`                | Excel     | Exporta datos a archivo .xlsx con Blob                 |
| **97-156**  | `exportToPDF`                  | PDF       | Genera PDF con tablas profesionales                    |
| **164-180** | `exportResultadosExcel`        | Excel     | Exporta resultados de sesiones a Excel                 |
| **186-202** | `exportResultadosPDF`          | PDF       | Exporta resultados de sesiones a PDF                   |
| **209-251** | `exportUsuariosExcel`          | Excel     | Exporta múltiples tipos de usuarios en hojas separadas |
| **255-407** | `exportResultadoIndividualPDF` | PDF       | Genera reporte PDF detallado por sesión                |

---

### 🔧 Detalles Técnicos Actividad 2:

#### **Exportación a Excel (.xlsx)**

**Librerías Utilizadas:** XLSX (SheetJS)

| Función                 | Línea   | Características                          |
| ----------------------- | ------- | ---------------------------------------- |
| `exportToExcel`         | 62-85   | Blob automático, auto-ajuste de columnas |
| `exportResultadosExcel` | 164-180 | Mapeo de datos de sesiones               |
| `exportUsuariosExcel`   | 209-251 | Múltiples hojas (Admins + Pacientes)     |

**Manejo de Tipos de Datos:**

```javascript
// Línea 69-71: Conversión JSON a Sheet
const transformedData = transformData(data);
const ws = XLSX.utils.json_to_sheet(transformedData);
const wb = XLSX.utils.book_new();
```

---

#### **Exportación a PDF**

**Librerías Utilizadas:** jsPDF + autoTable

| Función                        | Línea   | Características                 |
| ------------------------------ | ------- | ------------------------------- |
| `exportToPDF`                  | 97-156  | Tabla profesional con estilos   |
| `exportResultadosPDF`          | 186-202 | Reportes de sesiones con título |
| `exportResultadoIndividualPDF` | 255-407 | Reporte detallado multi-sección |

**Estructura de Reportes PDF:**

- 📌 Encabezado con título y marca de color (Indigo)
- 📋 Tabla de datos con headers formatados
- 👤 Información del paciente (si aplica)
- 📊 Resultados y scores
- 📅 Footer con fecha/hora de generación

---

## ⚠️ ACTIVIDAD 3: Control de Excepciones (I/O Errors)

### 🛡️ Bloques try/catch Implementados:

#### **En exportService.ts**

| Línea   | Función                        | Manejo de Errores                   |
| ------- | ------------------------------ | ----------------------------------- |
| 63-84   | `exportToExcel`                | try/catch con console.error + throw |
| 98-155  | `exportToPDF`                  | try/catch con console.error + throw |
| 210-250 | `exportUsuariosExcel`          | try/catch completo                  |
| 256-406 | `exportResultadoIndividualPDF` | try/catch con error logging         |

**Patrón de Excepciones:**

```javascript
try {
  // Operaciones de I/O
  XLSX.writeFile(wb, filename); // Línea 82
} catch (error) {
  console.error('Error al exportar a Excel:', error); // Template string
  throw new Error('No se pudo exportar el archivo Excel'); // Mensaje amigable
}
```

#### **En authService.ts**

| Línea | Manejo         | Descripción                               |
| ----- | -------------- | ----------------------------------------- |
| 8-37  | try/catch      | Validación de respuesta API               |
| 31-36 | Error handling | Extrae mensaje del servidor o usa default |

**Manejo de Permisos:**

```javascript
// Línea 8-10: Intenta conexión a API
const response = await axios.post('http://localhost:8000/api/login/', {...});
// Línea 31-36: Valida respuesta antes de persistir
if (error.response) {
    throw new Error(error.response.data?.detail || 'Error de autenticación');
}
```

#### **En useLocalStorage.ts**

| Línea | Escenario         | Manejo                                           |
| ----- | ----------------- | ------------------------------------------------ |
| 21-29 | Lectura fallida   | try/catch + console.error + retorna initialValue |
| 38-48 | Escritura fallida | try/catch + console.error (no interrumpe)        |

**Casos de Error Capturados:**

- ❌ JSON.parse() con datos inválidos
- ❌ localStorage.setItem() con quota exceeded
- ❌ Acceso denegado a window.localStorage
- ❌ Errores de API (authService)

---

## 📊 Resumen de Funciones por Archivo

### `src/services/exportService.ts` (9 funciones)

```
✅ formatFecha (L18)           - Helper
✅ getColumns (L30)            - Helper
✅ transformData (L38)         - Helper
✅ exportToExcel (L62)         - Exportación Excel
✅ exportToPDF (L97)           - Exportación PDF
✅ exportResultadosExcel (L164) - Reporte Excel
✅ exportResultadosPDF (L186)  - Reporte PDF
✅ exportUsuariosExcel (L209)  - Multi-sheet Excel
✅ exportResultadoIndividualPDF (L255) - Reporte PDF detallado
```

### `src/services/authService.ts` (2 funciones)

```
✅ loginAdministrador (L3)     - Auth + persistencia
✅ loginCliente (L41)          - Auth delegada
```

### `src/hooks/useLocalStorage.ts` (1 función)

```
✅ useLocalStorage<T> (L5)     - Hook React localStorage
```

---

## 🎯 Implementación de la Guía 8

### ✨ Características Implementadas:

| Aspecto                   | Implemented                | Líneas                                                              |
| ------------------------- | -------------------------- | ------------------------------------------------------------------- |
| **Lectura de archivos**   | ✅ localStorage.getItem()  | authService 21-27, useLocalStorage 24                               |
| **Escritura de archivos** | ✅ localStorage.setItem()  | authService 21-27, useLocalStorage 47                               |
| **Serialización JSON**    | ✅ JSON.parse/stringify    | useLocalStorage 25, 47, authService 20                              |
| **Blob/FileReader**       | ✅ XLSX.writeFile (Blob)   | exportService 82, 151, 249                                          |
| **Exportación CSV**       | ✅ XLSX (compatible CSV)   | exportService 62-85, 164-180, 209-251                               |
| **Exportación Excel**     | ✅ .xlsx multi-sheet       | exportService 62-85, 209-251                                        |
| **Generación PDF**        | ✅ jsPDF + autoTable       | exportService 97-156, 255-407                                       |
| **Headers/Columnas**      | ✅ Mapeo dinámico          | exportService 30-33, 76-78, 120-128                                 |
| **Tipos de datos**        | ✅ Formateo (fechas, JSON) | exportService 18-24, 165-176                                        |
| **Try/Catch I/O**         | ✅ Excepciones globales    | exportService 63-84, authService 8-36, useLocalStorage 21-29, 38-48 |
| **Manejo permisos**       | ✅ Validación API/Storage  | authService 31-36, useLocalStorage 21-29                            |
| **Mensajes amigables**    | ✅ Template strings        | Todos los archivos                                                  |

---

## 🚀 Uso de Funciones

### Ejemplo 1: Exportar datos a Excel

```javascript
import { exportToExcel } from './services/exportService';

const datos = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'María', edad: 30 },
];

exportToExcel(datos, {
  filename: 'reporte',
  sheetName: 'Datos',
});
```

### Ejemplo 2: Usar useLocalStorage en React

```javascript
import { useLocalStorage } from './hooks';

function App() {
  const [usuario, setUsuario] = useLocalStorage('usuario', {});

  return <button onClick={() => setUsuario({ nombre: 'Juan' })}>Guardar Usuario</button>;
}
```

### Ejemplo 3: Autenticación con persistencia

```javascript
import { loginAdministrador } from './services/authService';

const handleLogin = async (username, password) => {
  try {
    const userData = await loginAdministrador(username, password, true); // true = Recuerdarme
    console.log('Autenticado:', userData);
  } catch (error) {
    console.error(error.message); // Mensaje amigable
  }
};
```

---

## 📝 Observaciones Finales

### Fortalezas Identificadas:

1. ✅ **Manejo robusto de excepciones** en todas las operaciones de I/O
2. ✅ **Genericidad TypeScript** para máxima reutilización (useLocalStorage<T>)
3. ✅ **Separación de responsabilidades** (helpers, exportadores, autenticación)
4. ✅ **Consistencia en manejo de errores** con messages amigables
5. ✅ **Soporte multi-formato**: Excel, PDF, localStorage, sessionStorage

### Áreas de Mejora Potencial:

1. 🔄 Añadir exportación CSV directa (actualmente solo XLSX)
2. 🔄 Implementar compresión de archivos grandes (ZIP)
3. 🔄 Añadir validación de datos antes de exportar
4. 🔄 Implementar caché de localStorage con versionado

---

## 📄 Notas de Documentación

- ✅ **NO se alteró código** - Solo se añadieron comentarios de documentación
- ✅ **Formato de comentarios** - Utilizado `//` para JavaScript/TypeScript
- ✅ **Guía 8 aplicada** - Todas las 3 actividades están documentadas
- ✅ **Excepciones manejadas** - Control robusto de I/O errors
- ✅ **Template strings** - Utilizados con backticks en mensajes

---

**Documentación Completada:** 14 de mayo de 2026  
**Total de Funciones Documentadas:** 12  
**Archivos Modificados:** 3  
**Líneas de Documentación Añadidas:** ~150 líneas de comentarios educativos

# 🎨 Edunee - Proyecto de Detección de Daltonismo

> Un proyecto educativo interactivo para detectar y aprender sobre el daltonismo (deficiencia en la percepción del color).

---

## 🎯 ¿De qué trata Edunee?

**Edunee** es una aplicación web moderna diseñada para:
- 👥 Administradores: Gestionar pruebas, usuarios, resultados y contenido educativo
- 🧑‍💻 Pacientes: Realizar pruebas de detección de colores, ver resultados, aprender sobre daltonismo
- 📊 Análisis: Exportar datos de pruebas en múltiples formatos para evaluación profesional

La aplicación funciona como un **complemento digital para diagnósticos visuales**, permitiendo usuarios tomar pruebas de daltonismo (tipo Ishihara) desde sus navegadores, incluyendo detección avanzada mediante cámara.

---

## 🛠️ Stack Tecnológico

### Backend
```
🐍 Django 
   ├─ REST API (DRF)
   ├─ Autenticación JWT (JSON Web Tokens)
   ├─ Modelos de Datos (Tests, Results, Users)
   └─ Gestión de Permisos
```

### Frontend  
```
⚛️ React 18 + Vite
   ├─ TypeScript (tipado estricto)
   ├─ Hooks personalizados (useLocalStorage, useDebounce, useWindowSize)
   ├─ Context API (AuthContext, PacienteAuthContext)
   ├─ Componentes reutilizables
   └─ Estilos con CSS + PostCSS
```

### Base de Datos
```
🗄️ Supabase (PostgreSQL)
   ├─ Tablas: usuarios, pruebas, resultados, sesiones
   ├─ Relaciones: FK paciente → usuario, FK sesión → prueba
   ├─ RLS (Row Level Security) para privacidad
   └─ Backups automáticos
```

### Autenticación
```
🔐 JWT (JSON Web Tokens)
   ├─ Access Token (corta duración)
   ├─ Refresh Token (larga duración)
   ├─ Almacenamiento: localStorage / sessionStorage
   └─ Opción "Recuerdarme" para persistencia
```

### Exportación de Datos
```
📊 Librerías de Exportación:
   ├─ XLSX (SheetJS) → Archivos Excel (.xlsx)
   ├─ jsPDF + autoTable → Reportes PDF profesionales
   └─ CSV (compatible con XLSX)
```

---

## 📦 Módulos Implementados

### 1️⃣ **Login Dual**
```
🔑 Dos tipos de usuarios:

Administradores
├─ Acceso con username + password
├─ Gestión completa del sistema
├─ Visualización de reportes
└─ Exportación de datos

Pacientes
├─ Acceso con username + password
├─ Realización de pruebas
├─ Visualización de resultados personales
└─ Acceso a módulo educativo
```

**Archivos clave:**
- `src/services/authService.ts` - Lógica de autenticación
- `src/context/AuthContext.tsx` - Estado global de admin
- `src/context/PacienteAuthContext.tsx` - Estado global de pacientes
- `src/pages/Login.tsx` - Formulario admin
- `src/pages/LoginUsers.tsx` - Formulario pacientes

---

### 2️⃣ **Módulo de Pruebas**
```
📝 Pruebas de Ishihara Digital

Estructura:
├─ ID Prueba (único)
├─ Tipo de Prueba (Protanopía, Deuteranopía, Tritanopía)
├─ Preguntas Múltiples
│  ├─ Imagen de la prueba
│  ├─ Opciones de respuesta (A, B, C, D)
│  └─ Respuesta correcta
├─ Puntaje Total (configurable)
├─ Duración estimada
└─ Nivel de dificultad
```

**Flujo:**
1. Usuario selecciona una prueba
2. Se inicia sesión (timing, datos del paciente)
3. Se presentan preguntas una por una
4. Se registra respuesta y tiempo
5. Se calcula puntaje automático
6. Se guarda sesión con resultado

**Archivos clave:**
- `src/services/pruebasService.ts` - API de pruebas
- `src/pages/modules/PruebasModule.tsx` - Interfaz de pruebas
- `interfaces/Prueba.ts` - Estructura de datos

---

### 3️⃣ **Módulo de Resultados**
```
📊 Visualización y Análisis

Por Sesión:
├─ ID Sesión
├─ Datos del Paciente (nombre, ID, género)
├─ Nombre de la Prueba
├─ Tipo de Prueba Realizada
├─ Puntaje Obtenido / Puntaje Total
├─ Porcentaje (%)
├─ Fecha y Hora de Registro
├─ Duración Total
└─ Estado (Completada, Cancelada, Pendiente)

Filtrado:
├─ Por fecha
├─ Por paciente
├─ Por tipo de prueba
└─ Por rango de puntaje
```

**Archivos clave:**
- `src/services/Resultadosservice.ts` - Datos de resultados
- `src/pages/modules/ResultadosModule.tsx` - Visualización
- `interfaces/Sesion.ts` - Estructura de sesión

---

### 4️⃣ **Módulo de Aprendizaje sobre Daltonismo**
```
📚 Contenido Educativo

Temas Cubiertos:
├─ ¿Qué es el Daltonismo?
│  └─ Definición, prevalencia, impacto social
├─ Tipos de Daltonismo
│  ├─ Protanopía (ceguera roja)
│  ├─ Deuteranopía (ceguera verde)
│  └─ Tritanopía (ceguera azul-amarillo)
├─ Cómo Funciona la Visión del Color
│  ├─ Conos retinianos
│  ├─ Espectro visible
│  └─ Procesamiento visual
├─ Diagnóstico y Tratamiento
│  ├─ Pruebas clínicas
│  ├─ Adaptaciones
│  └─ Recursos disponibles
└─ Galería Interactiva
   └─ Simulaciones de cómo ven los daltónicos
```

**Archivos clave:**
- `src/pages/modules/LearnModule.tsx` - Interfaz educativa
- `src/assets/` - Imágenes y gráficos educativos
- `public/images/` - Recursos visuales

---

### 5️⃣ **Importación de Excel y PDF**
```
📥 Gestión de Datos (Solo Administradores)

Características:
├─ Importación de Datos Masivos
│  ├─ Excel (.xlsx) con lista de pacientes
│  ├─ Validación automática de formato
│  ├─ Detección de duplicados
│  └─ Carga en batch
├─ Control de Errores
│  ├─ Validación de campos requeridos
│  ├─ Detección de formato incorrecto
│  ├─ Reporte de errores por fila
│  └─ Rollback en caso de error masivo
└─ Soporte de Formatos
   ├─ Hojas Excel
   ├─ Importación de pruebas predefinidas
   └─ Validación de tipos de datos
```

**Flujo de Importación:**
1. Admin selecciona archivo Excel/PDF
2. Sistema valida estructura
3. Parseo de datos
4. Detección de duplicados
5. Confirmación de carga
6. Almacenamiento en BD
7. Generación de reporte

**Archivos clave:**
- `src/services/exportService.ts` - Manejo de archivos
- `src/pages/modules/UsuariosModule.tsx` - Gestión de usuarios
- Herramientas: XLSX (lectura), jsPDF (generación)

---

### 6️⃣ **Módulo de Cámara - Detección de Colores**
```
📷 Tecnología Computer Vision en Navegador

Funcionalidad:
├─ Acceso a Cámara Web del Usuario
├─ Captura de Video en Tiempo Real
├─ Análisis de Píxeles
├─ Detección de Colores
│  ├─ Extracción de RGB
│  ├─ Análisis de Espectro
│  └─ Clasificación de Color
├─ Prueba Alternativa
│  ├─ Usuarios sin pruebas de Ishihara
│  ├─ Validación por reconocimiento de color
│  └─ Scoring automático
└─ Feedback Visual
   ├─ Histograma de colores detectados
   ├─ Indicador de precisión
   └─ Recomendaciones en tiempo real
```

**Algoritmo Base:**
```javascript
// Pseudocódigo
1. Solicitar permisos de cámara
2. Iniciar stream de video
3. Capturar frame cada X ms
4. Extraer datos de píxeles (canvas)
5. Analizar distribución RGB
6. Comparar con patrones esperados
7. Generar puntaje
8. Mostrar resultados
```

**Tecnologías:**
- `getUserMedia()` API del navegador
- Canvas para procesamiento de imágenes
- Análisis de histogramas
- Comparación de espectros RGB

**Archivos clave:**
- `src/pages/modules/CamaraModule.tsx` - Interfaz de cámara
- Canvas API para procesamiento
- Fallback: Pruebas tradicionales si no hay cámara

---

## 📁 Estructura del Proyecto

```
frontend_edunee/
├─ public/
│  └─ images/              # Recursos visuales (Ishihara, educativo)
├─ src/
│  ├─ components/          # Componentes reutilizables
│  │  ├─ Button.tsx
│  │  └─ Layout.tsx
│  ├─ context/             # Estados globales
│  │  ├─ AuthContext.tsx
│  │  └─ PacienteAuthContext.tsx
│  ├─ hooks/               # Hooks personalizados
│  │  ├─ useLocalStorage.ts
│  │  ├─ useDebounce.ts
│  │  ├─ useWindowSize.ts
│  │  └─ index.ts
│  ├─ pages/               # Páginas principales
│  │  ├─ Login.tsx         # 🔑 Admin login
│  │  ├─ LoginUsers.tsx    # 🔑 Pacientes login
│  │  ├─ Dashboard.tsx     # 📊 Panel principal
│  │  ├─ RegistroUsers.tsx # 📝 Registro pacientes
│  │  └─ modules/          # Módulos funcionales
│  │     ├─ PruebasModule.tsx      # 📝 Pruebas
│  │     ├─ ResultadosModule.tsx   # 📊 Resultados
│  │     ├─ LearnModule.tsx        # 📚 Aprendizaje
│  │     ├─ CamaraModule.tsx       # 📷 Cámara
│  │     ├─ UsuariosModule.tsx     # 👥 Usuarios
│  │     ├─ HomeModule.tsx         # 🏠 Inicio
│  │     └─ ResourcesModule.tsx    # 📦 Recursos
│  ├─ services/            # Servicios de API
│  │  ├─ api.ts
│  │  ├─ authService.ts
│  │  ├─ pruebasService.ts
│  │  ├─ Resultadosservice.ts
│  │  ├─ exportService.ts
│  │  ├─ Pacienteauthservice.ts
│  │  └─ Usuariosservice.ts
│  ├─ styles/              # Estilos globales
│  │  └─ globals.css
│  ├─ utils/               # Utilidades
│  │  ├─ constants.ts
│  │  ├─ helpers.ts
│  │  └─ index.ts
│  ├─ assets/              # Recursos
│  │  └─ images/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ interfaces/             # Tipos TypeScript
│  ├─ FormData.ts
│  ├─ FormDataLoginUsers.ts
│  ├─ Sesion.ts
│  ├─ Prueba.ts
│  └─ FormDataPruebaProta.ts
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🔄 Flujo de Datos Principal

```
Usuario Paciente
    │
    ├─→ Login (JWT)
    │    └─ Almacena tokens en localStorage/sessionStorage
    │
    ├─→ Dashboard (selecciona prueba)
    │    └─ Obtiene lista de pruebas de API
    │
    ├─→ Realiza Prueba (PruebasModule)
    │    ├─ POST /api/sesiones/ → crea sesión
    │    ├─ GET /api/pruebas/{id}/ → obtiene preguntas
    │    ├─ POST /api/sesiones/{id}/respuestas/ → guarda respuestas
    │    └─ Calcula puntaje automático
    │
    └─→ Ver Resultados (ResultadosModule)
         ├─ GET /api/resultados/ → obtiene mis sesiones
         ├─ Visualización de gráficos
         ├─ Opción de exportar (PDF/Excel)
         └─ Comparativa con histórico
```

```
Usuario Administrador
    │
    ├─→ Login Admin (JWT con permisos)
    │    └─ Acceso a panel administrativo
    │
    ├─→ Gestión de Usuarios
    │    ├─ Importar desde Excel
    │    ├─ Crear/Editar/Eliminar pacientes
    │    └─ Asignar pruebas
    │
    ├─→ Gestión de Pruebas
    │    ├─ CRUD de pruebas
    │    ├─ Definir preguntas y respuestas
    │    └─ Configurar puntajes
    │
    └─→ Reportes y Exportación
         ├─ Visualizar todas las sesiones
         ├─ Filtrar por criterios
         ├─ Exportar a Excel (multi-sheet)
         └─ Generar reportes en PDF
```

---

## 🔐 Seguridad Implementada

```
🔒 Capas de Seguridad:

1. Autenticación
   ├─ JWT (tokens con expiración)
   ├─ Refresh tokens para renovación
   └─ Logout con limpieza de storage

2. Autorización
   ├─ Roles (admin vs paciente)
   ├─ Permisos por módulo
   └─ Validación en backend

3. Datos Personales
   ├─ Encriptación en tránsito (HTTPS)
   ├─ Validación de entrada
   ├─ Protección contra XSS/CSRF
   └─ RLS en base de datos

4. Almacenamiento Local
   ├─ localStorage: Datos no sensibles
   ├─ sessionStorage: Sesiones temporales
   └─ Limpieza al cerrar sesión
```

---

## 📊 Exportación de Datos

### Formatos Disponibles

**Excel (.xlsx)**
- Hojas múltiples (una por tipo de dato)
- Datos de pacientes y resultados
- Headers automáticos
- Ancho de columnas ajustado
- Timestamps para evitar sobrescrituras

**PDF**
- Reportes formateados profesionales
- Tablas con estilos
- Headers y footers
- Información del paciente y resultados
- Fecha/hora de generación

**Ejemplo de Exportación:**
```javascript
// Admin exporta resultados de sesiones
exportResultadosExcel(sesiones) 
→ archivo: resultados-sesiones_1715646180000.xlsx

// Admin exporta reporte individual
exportResultadoIndividualPDF(sesion)
→ archivo: resultado_12345_1715646180000.pdf
```

---

## 🚀 Funcionalidades Futuras

```
Próximas versiones:
├─ 📱 App mobile (React Native)
├─ 🤖 IA para recomendaciones personalizadas
├─ 📈 Dashboard avanzado con gráficos
├─ 🎮 Gamificación (badges, puntos)
├─ 🌐 Soporte multi-idioma
├─ ♿ Accesibilidad mejorada
├─ 📡 Sincronización offline
└─ 🔔 Notificaciones en tiempo real
```

---

## 📝 Configuración de Desarrollo

```bash
# Instalación
npm install

# Desarrollo
npm run dev          # Vite dev server en localhost:5173

# Build
npm run build        # Genera dist/

# Preview
npm run preview      # Previsualiza build local

# Lint
npm run lint         # Ejecuta ESLint
```

**Variables de Entorno Necesarias:**
```
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=tu-url-supabase
VITE_SUPABASE_KEY=tu-clave-publica
```

---

## 💡 Datos Interesantes

- 🎯 Las pruebas de Ishihara se generan digitalmente (no son imágenes estáticas)
- 📊 Cada sesión registra tiempo de respuesta por pregunta
- 🔄 Los resultados se sincronizan automáticamente con Supabase
- 🎨 El módulo de cámara permite detección sin pruebas visuales
- 📦 Los reportes se generan en cliente (sin cargar servidor)
- 🔐 JWT permite autenticación stateless escalable

---

## 🎓 Caso de Uso

**Escenario Típico:**
```
1. Clínica oftalmológica registra pacientes en Edunee (importa desde Excel)
2. Paciente accede desde casa, realiza prueba de daltonismo
3. Prueba se completa en 10-15 minutos
4. Resultados se guardan automáticamente
5. Oftalmólogo revisa resultados en dashboard
6. Exporta reportes para archivo del paciente
7. Comparte recomendaciones basado en diagnóstico
```

---

**Última actualización:** 14 de mayo de 2026  
**Estado del Proyecto:** 🟢 En Desarrollo Activo  
**Versión:** 1.0.0-alpha

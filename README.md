# Edunee

Plataforma educativa desarrollada con React + Vite.

## 🚀 Características

- ⚡️ Vite - Build tool ultrarrápido
- ⚛️ React 19 - Librería de UI
- 🛣️ React Router DOM - Navegación
- 🌐 Axios - Cliente HTTP
- 🎨 CSS personalizable - Estilos modulares
- 📁 Estructura organizada - Fácil escalabilidad

## 📂 Estructura del Proyecto

```
frontend_edunee/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes, iconos, fuentes
│   ├── components/     # Componentes reutilizables
│   │   ├── Layout.jsx
│   │   └── index.js
│   ├── context/        # Contextos de React
│   │   └── AuthContext.jsx
│   ├── hooks/          # Custom hooks
│   │   └── useLocalStorage.js
│   ├── pages/          # Páginas/Vistas
│   │   ├── Home.jsx
│   │   └── index.js
│   ├── services/       # Servicios API
│   │   └── api.js
│   ├── styles/         # Estilos globales
│   │   └── globals.css
│   ├── utils/          # Utilidades y helpers
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx         # Componente principal
│   ├── App.css
│   ├── index.css       # Estilos principales
│   └── main.jsx        # Punto de entrada
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore
├── eslint.config.js    # Configuración ESLint
├── index.html
├── package.json
├── vite.config.js      # Configuración Vite
└── README.md
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env
```

## 💻 Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

### Axios Configuration

El archivo `src/services/api.js` contiene la configuración de Axios con:
- Interceptores de petición (agregar tokens)
- Interceptores de respuesta (manejo de errores)
- URL base configurable

## 📦 Librerías Incluidas

### Dependencias Principales
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **react-router-dom**: ^7.1.3
- **axios**: ^1.8.0

### Dependencias de Desarrollo
- **vite**: ^7.3.1
- **@vitejs/plugin-react**: ^5.1.1
- **eslint**: ^9.39.1

## 🎯 Características Implementadas

### 1. Sistema de Rutas
- React Router configurado en `App.jsx`
- Layout compartido para todas las páginas
- Fácil agregar nuevas rutas

### 2. Autenticación (Context)
- `AuthContext` para manejo de autenticación
- Login/Logout funcional
- Protección de rutas lista para implementar

### 3. Custom Hooks
- `useLocalStorage` - Manejo de localStorage con React

### 4. Utilidades
- Helpers para formateo de fechas, validación de emails, etc.
- Constantes centralizadas
- Funciones de debounce

### 5. Servicios API
- Cliente Axios configurado
- Interceptores para tokens y errores
- Fácil agregar nuevos endpoints

## 📖 Guía de Uso

### Agregar una Nueva Página

1. Crear el componente en `src/pages/`:
```jsx
// src/pages/About.jsx
const About = () => {
  return <div>About Page</div>;
};

export default About;
```

2. Exportarlo en `src/pages/index.js`:
```javascript
export { default as About } from './About';
```

3. Agregar la ruta en `App.jsx`:
```jsx
import { About } from './pages';

// En las rutas:
<Route path="/about" element={<About />} />
```

### Crear un Nuevo Componente

1. Crear en `src/components/`:
```jsx
// src/components/Button.jsx
const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
```

2. Exportar en `src/components/index.js`:
```javascript
export { default as Button } from './Button';
```

### Agregar un Servicio API

```javascript
// src/services/userService.js
import api from './api';

export const userService = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};
```

## 🚀 Próximos Pasos Sugeridos

- [ ] Agregar TailwindCSS o styled-components
- [ ] Implementar React Query para gestión de estado del servidor
- [ ] Agregar testing con Vitest
- [ ] Configurar CI/CD
- [ ] Agregar componentes de UI (shadcn/ui, Material-UI, etc.)
- [ ] Implementar sistema de notificaciones (toast)
- [ ] Agregar manejo de formularios (React Hook Form)

## 📝 Notas

- El proyecto usa Vite para desarrollo rápido
- ESLint configurado para mantener código limpio
- Estructura modular para fácil escalabilidad
- Preparado para agregar cualquier librería adicional

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

---

Desarrollado con ❤️ para Edunee


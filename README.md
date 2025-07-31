# Music Searcher - Buscador de Música con Spotify

Music Searcher es una aplicación web moderna construida con React, TypeScript y Vite, que utiliza la API de Spotify para buscar canciones y gestionar playlists personalizadas. El proyecto está diseñado siguiendo los principios de la **Arquitectura Hexagonal (Puertos y Adaptadores)** para garantizar una separación clara de la lógica de negocio, alta mantenibilidad y escalabilidad.

## Características Principales

- **Búsqueda de Canciones**: Busca canciones en tiempo real utilizando la API de Spotify.
- **Gestión de Playlists**: Crea, visualiza y elimina playlists.
- **Añadir/Quitar Canciones**: Agrega canciones a tus playlists o quítalas de ellas con un solo clic.
- **Verificación de Duplicados**: La interfaz te informa si una canción ya se encuentra en una de tus playlists, evitando duplicados.
- **Paginación Inteligente**: Navega por los resultados de búsqueda con un sistema de paginación completo y personalizable.
- **Diseño Responsive**: Interfaz de usuario moderna y adaptable a cualquier dispositivo (móvil, tablet, desktop), inspirada en el diseño de Spotify.
- **Navegación Fluida**: Cambia fácilmente entre la página de búsqueda y la de tus playlists.
- **Estados Claros**: Componentes reutilizables para los estados de carga, error (con opción de reintentar) y vacío.
- **Modales Interactivos**: Experiencia de usuario mejorada con modales para crear playlists y agregar canciones.

## Arquitectura del Proyecto: Arquitectura Hexagonal

El proyecto sigue una **Arquitectura Hexagonal** (también conocida como de Puertos y Adaptadores) para separar la lógica de negocio (`core`) de las dependencias externas (`infrastructure`).

```
+----------------------------------------------------+
|                Infrastructure (Driving)              |
| (React Components, Custom Hooks)                   |
+------------------------+---------------------------+
                         |
                         v
+------------------------+---------------------------+
|                       Core                         |
| (Lógica de negocio, Casos de Uso, Entidades)       |
|  - Define Puertos (Interfaces)                     |
+------------------------+---------------------------+
                         |
                         v
+------------------------+---------------------------+
|                Infrastructure (Driven)               |
| (Spotify API Client, Firebase Client)              |
|  - Implementa Puertos                              |
+----------------------------------------------------+
```

### Core

Contiene la lógica de negocio pura de la aplicación, sin ninguna dependencia de frameworks o servicios externos.

- **`domain`**: Define las entidades principales de la aplicación (`Song`, `Playlist`).
- **`application`**: Contiene los casos de uso (`PlaylistService`, `SearchService`) y los **puertos** (interfaces) que definen los contratos que la infraestructura debe implementar.

### Infrastructure

Contiene las implementaciones tecnológicas y todo lo que interactúa con el mundo exterior.

- **`driving` (Adaptadores Primarios)**: Inician la interacción con el `core`. En este proyecto, son los **componentes de React** y los **Custom Hooks** que llaman a los casos de uso.
- **`driven` (Adaptadores Secundarios)**: Son controlados por el `core` y proporcionan implementaciones para los puertos. Por ejemplo, `FirebaseClient` implementa la interfaz para guardar datos y `SpotifyClient` implementa la de búsqueda.

Este enfoque permite que el `core` sea completamente independiente y testeable, y facilita el cambio de tecnologías (por ejemplo, cambiar Firebase por otro servicio de base de datos) sin afectar la lógica de negocio.

## Patrones de Diseño y Principios

- **Custom Hooks**: Se utilizan para encapsular y reutilizar lógica de estado y efectos secundarios. Ejemplos: `usePlaylist`, `usePagination`, `useSearchForm`. Esto mantiene los componentes limpios y centrados en la UI.
- **Componentes de Presentación y Contenedor**: Las vistas (`SearchPage`, `MyPlaylistPage`) actúan como **contenedores** que orquestan los hooks y los componentes de presentación. Los componentes más pequeños (`SongCard`, `PlaylistGrid`, `Pagination`) son **presentacionales**, reciben datos y funciones vía props y no contienen lógica de negocio.
- **Inversión de Dependencias**: El `core` no depende de la `infrastructure`, sino al revés. El `core` define interfaces (puertos) y la `infrastructure` las implementa, siguiendo el Principio de Inversión de Dependencias (DIP).
- **Estilos Modulares con SASS**: Cada componente tiene su propio archivo `.scss`, y se utilizan variables centralizadas para mantener la consistencia visual y facilitar el mantenimiento del tema.

## Estructura de Carpetas

```
/src
├── core/
│   ├── playlist/             # Lógica de negocio de playlists
│   │   ├── application/
│   │   └── domain/
│   └── search/               # Lógica de negocio de búsqueda
│       ├── application/
│       └── domain/
├── infrastructure/
│   ├── driven/               # Adaptadores secundarios (controlados por el core)
│   │   ├── firebase/
│   │   └── spotify/
│   └── driving/              # Adaptadores primarios (controlan el core)
│       └── web/
│           ├── components/   # Componentes reutilizables
│           ├── hooks/        # Hooks personalizados
│           └── pages/        # Páginas principales (contenedores)
├── styles/                   # Estilos globales y variables SASS
└── tests/                    # Tests unitarios y de integración
```

## Stack Tecnológico

- **Framework**: [React](https://reactjs.org/) 18+
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Estilos**: [SASS/SCSS](https://sass-lang.com/)
- **Backend Services**:
  - **Autenticación y Búsqueda**: [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
  - **Base de Datos**: [Firebase (Firestore)](https://firebase.google.com/)
- **Testing**: [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una cuenta de desarrollador de [Spotify](https://developer.spotify.com/dashboard/login) para obtener tus credenciales de API.
- Un proyecto de [Firebase](https://console.firebase.google.com/) configurado con Firestore.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/music-searcher.git
cd music-searcher
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Spotify y Firebase. Puedes usar `.env.example` como plantilla.

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Luego edita el archivo `.env` con tus credenciales reales:

```env
# Spotify API Configuration
# Obtén estas credenciales en: https://developer.spotify.com/dashboard
VITE_SPOTIFY_CLIENT_ID=tu_spotify_client_id_aqui
VITE_SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret_aqui

# Firebase Configuration
# Obtén estas credenciales en: https://console.firebase.google.com/
VITE_FIREBASE_API_KEY=tu_firebase_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id_aqui
```

#### Cómo obtener las credenciales:

**Spotify API:**

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crea una nueva aplicación
3. Copia el `Client ID` y `Client Secret`

**Firebase:**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a Configuración del proyecto > General
4. En "Tus aplicaciones", agrega una aplicación web
5. Copia la configuración que aparece

> **Importante**: Nunca subas el archivo `.env` a tu repositorio. Ya está incluido en `.gitignore` para proteger tus credenciales.

### 4. Ejecutar la Aplicación

Una vez configurado, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con Hot-Reload.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
- `npm run preview`: Sirve la build de producción localmente para previsualización.
- `npm run test`: Ejecuta los tests utilizando Vitest.
- `npm run test:ui`: Ejecuta los tests en modo UI para una experiencia más visual.
- `npm run coverage`: Genera un reporte de cobertura de los tests.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# musicSearcher

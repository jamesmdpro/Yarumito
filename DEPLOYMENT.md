# Guía de Despliegue - Ecosistema Yarumito 🌳

Esta guía detalla los pasos para configurar, ejecutar localmente y desplegar en entornos de producción los componentes del ecosistema Yarumito.

---

## 1. Despliegue Local (Desarrollo)

### Requisitos Previos
- **Node.js** v18 o superior (para Web y Dashboard)
- **Python** 3.10 o superior (para API Central)
- **Flutter SDK** v3.10+ o **React Native CLI / Expo Go** (para App Móvil)
- **PostgreSQL** y **MongoDB** instalados localmente o accesibles en la nube (ej. Supabase y MongoDB Atlas).

---

### Módulo 1: Sitio Web Informativo (`web/`)

1. Navegar al directorio del sitio web:
   ```bash
   cd web
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo de variables de entorno `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   # Integración bilingüe por defecto
   NEXT_PUBLIC_DEFAULT_LOCALE=es
   ```
4. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   *La web estará disponible en `http://localhost:3000`.*

---

### Módulo 2: API Central en Python (`api-central/`)

1. Navegar al directorio de la API:
   ```bash
   cd api-central
   ```
2. Crear un entorno virtual de Python:
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   # En macOS/Linux:
   source venv/bin/activate
   ```
3. Instalar las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Configurar las variables de entorno `.env`:
   ```env
   DATABASE_URL=postgresql://user:pass@localhost:5432/yarumito_auth
   MONGODB_URI=mongodb://localhost:27017/yarumito_telemetry
   JWT_SECRET=tu_clave_secreta_aqui
   ```
5. Iniciar la API con Uvicorn (recarga automática activa):
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *La documentación interactiva de la API estará disponible en `http://localhost:8000/docs`.*

---

### Módulo 3: Aplicación Móvil (`app-movil/`)

*Si se utiliza Flutter:*
1. Navegar al directorio de la app:
   ```bash
   cd app-movil
   ```
2. Descargar los paquetes:
   ```bash
   flutter pub get
   ```
3. Ejecutar en un emulador o dispositivo real:
   ```bash
   flutter run
   ```

---

## 2. Despliegue en Producción (Costos Optimizados)

Al ser Yarumito un proyecto sin fines de lucro financiado por donaciones, la arquitectura de despliegue en producción debe priorizar el **bajo costo, escalabilidad automática y mantenimiento cero**.

### 🌟 Estrategia de Infraestructura Serverless

```
                        ┌──────────────┐
                        │   Usuario    │
                        └──────┬───────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │  Sitio Web   │   │ API Central  │   │  Dashboards  │
    │  (Vercel)    │   │ (Cloud Run)  │   │  (Vercel)    │
    └──────────────┘   └──────┬───────┘   └──────────────┘
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
     ┌──────────────┐                  ┌──────────────┐
     │  PostgreSQL  │                  │  MongoDB     │
     │  (Supabase)  │                  │  (Atlas M0)  │
     └──────────────┘                  └──────────────┘
```

### 1. Frontend Web y Dashboards (Vercel / Netlify)
- **Servicio**: Vercel.
- **Costo**: Gratuito (Plan Hobby/Open Source).
- **Proceso**:
  - Conectar el repositorio de GitHub a Vercel.
  - Vercel detecta automáticamente el proyecto Next.js y compila el sitio de manera estática optimizada.

### 2. API Central de IA y Contenido (Google Cloud Run / Render)
- **Servicio**: Google Cloud Run (Serverless Docker containers) o Render (Free Tier).
- **Costo**: Pago por uso real (casi gratuito con tráfico inicial moderado).
- **Proceso**:
  - Crear un contenedor Docker para la API de Python.
  - Desplegar en Google Cloud Run para que la API se apague automáticamente a 0 instancias cuando no hay niños jugando, ahorrando costos de servidor.

### 3. Base de Datos
- **Autenticación y Donaciones**: **Supabase (PostgreSQL)** (Plan gratuito inicial de 500MB, ideal para miles de usuarios).
- **Telemetría de IA**: **MongoDB Atlas** (Capa gratuita M0, base de datos no relacional ideal para logs de juego masivos).

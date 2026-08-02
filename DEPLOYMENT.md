# Guía de Despliegue - Ecosistema Yarumito 🌳

Esta guía detalla los pasos para configurar, ejecutar localmente y desplegar en entornos de producción los componentes del ecosistema Yarumito.

---

## 1. Despliegue Local (Desarrollo)

### Requisitos Previos
- **Node.js** v18 o superior (para servir el Sitio Web con Vite)
- **Python** 3.10 o superior (para la API Central)
- **Base de datos (Opcional en MVP)**: PostgreSQL y MongoDB solo son necesarios en producción o cuando se implementen integraciones en la nube (ej. Supabase y MongoDB Atlas). Para el MVP local, la API almacena los datos en archivos JSON locales (`telemetry_errors.json`).

---

### Módulo 1: Sitio Web Informativo (`web/`)

El frontend es una aplicación web estática (HTML, CSS y JS). Para servirla localmente y facilitar el desarrollo con recarga rápida, utilizamos **Vite**:

1. Navegar al directorio del sitio web:
   ```bash
   cd web
   ```
2. Instalar el servidor de desarrollo local (Vite):
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   *La web estará disponible en `http://localhost:3000` e interactuará automáticamente con la API local en `http://127.0.0.1:8000`.*

---

### Módulo 2: API Central en Python (`api-central/`)

La API central se encarga de verificar códigos QR, simular telemetría y generar audios sintéticos TTS de forma local.

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
3. Instalar las dependencias requeridas (definidas en `requirements.txt`):
   ```bash
   pip install -r requirements.txt
   ```
4. Iniciar la API con Uvicorn (con recarga automática activa):
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *La API estará disponible en `http://localhost:8000` y su documentación interactiva en `http://localhost:8000/docs`.*

---

### Módulo 3: Aplicación Móvil (Futura Fase)

El MVP actual se ejecuta directamente en la Web. Posteriormente se empaquetará esta misma base de código usando **Capacitor** o se desarrollará una aplicación nativa dedicada bajo la carpeta `app-movil/` (usando Flutter o React Native).


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

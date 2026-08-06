# Guía de Compilación de APK de Yarumito 🌳📱

Esta guía explica cómo generar el archivo instalable **`.apk`** para Android cada vez que realices cambios en el código de la aplicación de Yarumito.

---

## 🛠️ Requisitos Previos

1. **Node.js**: Instalado en el equipo (para ejecutar `npm` y `npx`).
2. **Android Studio**: Instalado en tu computadora (contiene el JDK/JBR de Java y el SDK de Android necesarios).

---

## 🚀 Paso a Paso: Compilar un Nuevo APK (Línea de Comandos)

Abre la terminal de PowerShell en tu sistema y ejecuta los siguientes comandos ordenados:

### Paso 1: Ir a la carpeta web y compilar los activos
```powershell
cd c:\Users\user\Documents\Yarumito\web
npm run build
```
*Este comando utiliza Vite para empaquetar todo el HTML, CSS, Javascript y plugins nativos dentro de la carpeta `web/dist`.*

---

### Paso 2: Sincronizar con Capacitor
```powershell
npx cap sync
```
*Este comando copia automáticamente los archivos compilados de `web/dist` a las carpetas nativas del proyecto de Android (`android/app/src/main/assets/public`).*

---

### Paso 3: Compilar el APK con Gradle
```powershell
cd android
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"; .\gradlew.bat assembleDebug
```
*Este comando compila el proyecto nativo usando el motor de Java de Android Studio.*

---

## 📍 Ubicación del APK Generado

Una vez finalizada la compilación exitosamente, encontrarás el archivo listo para instalar en:

📂 **`web/android/app/build/outputs/apk/debug/app-debug.apk`**

---

## 📱 Opción Alternativa: Compilar desde la Interfaz de Android Studio

Si prefieres usar la interfaz gráfica de Android Studio:

1. Ejecuta en la carpeta `web`:
   ```powershell
   npx cap open android
   ```
2. Android Studio se abrirá automáticamente cargando el proyecto.
3. En el menú superior de Android Studio, ve a:  
   **Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. Cuando termine, aparecerá un aviso en la esquina inferior derecha con el enlace **"locate"** para abrir la carpeta con tu `app-debug.apk`.

---

## 🔊 Notas Importantes sobre Voz y Plugins Nativos

- La aplicación utiliza el plugin nativo **`@capacitor-community/text-to-speech`**.
- Esto garantiza que en el APK de Android la voz del Árbol Sabio utilice directamente el motor nativo **TextToSpeech** de Android, funcionando de forma fluida y 100% offline sin depender de la API de navegador.

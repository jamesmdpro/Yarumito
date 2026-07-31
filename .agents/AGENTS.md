# Reglas de Desarrollo y Directrices - Ecosistema Yarumito

Este documento establece las directrices arquitectónicas, pedagógicas, de diseño y de interacción para todos los agentes y desarrolladores que trabajen en el **Ecosistema Yarumito**.

---

## 1. Visión y Misión del Ecosistema

**Yarumito** es una iniciativa social financiada por donaciones, orientada a crear un ecosistema de aprendizaje adaptativo abierto y gratuito para asegurar que ningún niño quede excluido por motivos económicos.

> [!IMPORTANT]
> **Misión**: Ayudar a cada niño a desarrollar sus habilidades cognitivas, motoras y del lenguaje mediante el juego, el movimiento, la inteligencia artificial y el acompañamiento familiar, respetando su ritmo individual de aprendizaje.

---

## 2. Personaje Guía: El Árbol Sabio

El núcleo de la interacción del niño con el sistema es **El Árbol Sabio**, un personaje que representa el crecimiento del propio niño.
- **Evolución visual**: Comienza como una pequeña semilla plantada en la tierra. Conforme el niño completa actividades y progresa, la semilla germina, crece a brote, luego a planta pequeña, árbol joven y finalmente a un árbol sabio, frondoso y lleno de frutos. El niño debe ver esta progresión de manera explícita y motivadora.
- **Tono de Voz**: Amigable, pausado, acogedor y sabio, pero muy cercano. Nunca regaña, nunca penaliza los errores; en su lugar, ofrece pistas suaves o ánimos y celebra cada intento.
- **Multilingüismo**: Todas las intervenciones del Árbol Sabio deben estar diseñadas para reproducirse y procesarse tanto en **Español (ES)** como en **Inglés (EN)**.

---

## 3. Filosofía de Interacción y Neurodiversidad

El ecosistema está especialmente diseñado para niños con **dificultades de aprendizaje y neurodiversidad**.
- **La edad cronológica es solo un dato**: La IA y el motor pedagógico deben ignorar la edad biológica del niño al momento de personalizar el contenido, basándose únicamente en el **comportamiento de interacción y nivel cognitivo real** (ej. adaptar contenidos de 5 años cognitivos a un niño registrado de 10 años).
- **Entradas Múltiples (Multimodalidad)**: El niño no interactúa principalmente con teclados; responde hablando (voz), escribiendo (trazado en pantalla), moviéndose (cámara/acelerómetro), señalando, dibujando o mediante sonidos.

---

## 4. Directrices de Diseño Visual y de Interfaz

Para evitar la sobreestimulación y la distracción (crucial para TDAH u otras condiciones):
- **Fondo Animado Tranquilo**: El fondo debe usar animaciones extremadamente sutiles, lentas y en bucle (ej. hojas cayendo lentamente, nubes flotando despacio en un cielo pastel). Sin colores chillones ni movimientos bruscos.
- **Paleta de Colores**: Colores suaves, pasteles y relajantes (verdes naturaleza, azules celestes, tonos tierra cálidos). Evitar contrastes agresivos de colores complementarios estridentes.
- **Tipografía**: Fuentes de alta legibilidad diseñadas para niños y personas con dislexia (ej. *Inter*, *Outfit*, o fuentes amigables con espaciado amplio).
- **Límites de Pantalla**: La IA debe sugerir pausas activas físicas y limitar el tiempo de pantalla continua a no más de 15 minutos, invitando a juegos que requieran movimiento físico.

---

## 5. Arquitectura del Ecosistema

El ecosistema se divide en cuatro capas:
1. **WEB**: Canal de información, blog, guías para familias, transparencia de donaciones, informes anuales y comunidad de voluntarios.
2. **API CENTRAL (Python)**: Motor inteligente. Recopila analíticas anonimizadas, calcula adaptabilidad, administra perfiles y genera recomendaciones.
3. **APP MÓVIL (Android/iOS)**: El cliente del Niño. Centrado en el juego puro, sin estadísticas ni presiones.
4. **DASHBOARD (Web/Móvil)**: Vistas adaptadas para Padres, Docentes y Terapeutas para el seguimiento, creación de planes y descarga de actividades imprimibles.

---

## 6. Privacidad, Anonimización e Investigación

El Donante e Investigador son actores clave que exigen transparencia y datos de calidad:
- **Anonimización Absoluta**: Los datos recolectados para estudios científicos (tiempo de respuesta, patrones de error, curvas de aprendizaje) deben guardarse completamente desligados de cualquier dato de identidad personal (nombre, dirección, correos de padres).
- **Métricas de Interacción de la IA**:
  - Tiempo empleado por actividad.
  - Tipos y patrones de error recurrentes.
  - Velocidad de respuesta y atención estimada.
  - Patrones de movimiento detectados (cámara) y variaciones de voz.
- **Límites Médicos**: La IA **nunca** debe emitir un diagnóstico médico o psicológico. Solo identificará patrones y sugerirá al tutor consultar con un profesional de la salud o terapeuta de manera preventiva.

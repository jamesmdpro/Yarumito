# Especificación Pedagógica de Yarumito v1.0 🌳

Este documento establece las bases pedagógicas, el mapa de habilidades y la arquitectura de datos para el motor adaptativo de Yarumito. Su propósito es definir con precisión cómo aprende el niño, cómo se evalúa ese aprendizaje y cómo interviene la tecnología (IA, sensores, voz y gamificación) de manera bilingüe.

---

## 🏁 Fase 0: Filosofía de Aprendizaje Adaptativo

Para Yarumito, el progreso del niño se mide mediante la **adquisición integral de competencias** y no a través de calificaciones tradicionales.

### 1. ¿Qué significa que un niño "aprendió" un concepto?
Significa que el niño es capaz de **asociar, identificar y generalizar** el concepto a través de múltiples canales (multimodalidad) en diferentes contextos. No basta con presionar el número "3" en una pantalla táctil; debe ser capaz de reconocerlo por su sonido, trazar su forma, contar tres objetos reales o buscar el símbolo en su entorno físico.

### 2. ¿Cuántas evidencias se necesitan para validar el dominio de una habilidad?
Se requiere un mínimo de **3 evidencias consecutivas exitosas** en un intervalo de juego y distribuidas en al menos **2 canales sensoriales diferentes** (ej. una respuesta táctil visual y una respuesta motora por acelerómetro). Esto garantiza que no fue un acierto por azar.

### 3. ¿Cómo se detecta que se olvidó o debilitó un concepto?
- **Inactividad**: Si transcurren más de 7 días sin interactuar con un concepto previamente dominado.
- **Frustración en cadena**: Si al volver a una actividad de repaso de ese concepto, el niño comete más de 2 errores consecutivos o solicita la repetición del audio de instrucciones más de 3 veces.
- **Acción**: La IA reduce temporalmente el nivel de dominio en el perfil de aprendizaje del niño y vuelve a introducir andamiajes (pistas visuales y de audio).

### 4. ¿Cuándo se aumenta la dificultad?
Cuando el niño acumula las 3 evidencias de dominio de forma consecutiva con **cero solicitudes de ayuda/pistas** y con un tiempo de respuesta dentro del rango óptimo para su perfil de velocidad cognitiva.

### 5. ¿Cuándo se retrocede o se ofrece andamiaje?
Cuando el niño comete **3 errores consecutivos** en la misma actividad. 
* El sistema no muestra una pantalla de fallo ni emite sonidos de castigo.
* El **Árbol Sabio** simplifica la instrucción o añade una pista visual (ej. sombrear la respuesta correcta o parpadear el número) y, si el error persiste, sugiere un juego físico offline o una pausa.

---

## 🗺️ Fase 1: Mapa Curricular Completo (Los 20 Mundos de Yarumito)

El ecosistema de aprendizaje se compone de 20 mundos de aprendizaje progresivo y adaptativo:

1. **Mundo 1: Números (1-10)** - Iniciación al concepto numérico, símbolos visuales y fonemas elementales.
2. **Mundo 2: Conteo y Agrupación** - Cardinalidad y correspondencia asociando grupos de elementos.
3. **Mundo 3: Formas y Geometría Básica** - Discriminación de figuras elementales (círculo, cuadrado, triángulo) en entornos digitales y físicos.
4. **Mundo 4: Colores y Secuencias** - Clasificación cromática y seguimiento de patrones lógicos visuales.
5. **Mundo 5: Suma Inicial (Unión de Conjuntos)** - Integración matemática uniendo conjuntos de objetos.
6. **Mundo 6: Resta Inicial (Remoción de Elementos)** - Separación y sustracción quitando manzanas del árbol.
7. **Mundo 7: Orientación Espacial** - Conceptos de arriba, abajo, adentro, afuera, izquierda y derecha utilizando acelerómetro/movimiento.
8. **Mundo 8: Tamaños y Comparación** - Clasificación de grande, mediano, pequeño y relaciones de más que / menos que.
9. **Mundo 9: Vocales y Fonemas** - Introducción a la lectura y discriminación auditiva de las vocales en español e inglés.
10. **Mundo 10: Sílabas y Palabras Cortas** - Construcción de palabras simples bisílabas asociando sonidos de letras.
11. **Mundo 11: Emociones y Expresión** - Reconocimiento y control gestual de emociones mediante cámara y voz (alegría, calma, tristeza).
12. **Mundo 12: Ritmo y Coordinación** - Secuencias rítmicas de aplausos o saltos detectadas por sensores del móvil.
13. **Mundo 13: El Tiempo y la Rutina** - Conceptos temporales del día (mañana, tarde, noche) y estaciones del año.
14. **Mundo 14: Naturaleza y Entorno** - Clasificación de elementos naturales (agua, tierra, plantas) y sonidos de la fauna.
15. **Mundo 15: Autonomía e Higiene** - Secuencias lógicas de actividades diarias (cepillado, lavado de manos).
16. **Mundo 16: Habilidades Sociales y Colaboración** - Retos offline orientados al juego cooperativo y el respeto de turnos.
17. **Mundo 17: Lectura de Pictogramas** - Asociación de pictogramas visuales para el andamiaje de niños con TEA o TDAH.
18. **Mundo 18: Memoria y Atención** - Juegos de retención de secuencias auditivas cortas y búsqueda de parejas visuales.
19. **Mundo 19: Resolución de Problemas** - Laberintos y secuencias de programación lógica elemental (direccionalidad).
20. **Mundo 20: El Bosque del Árbol Sabio** - Integración total de conocimientos donde el árbol del niño interactúa con el bosque de la comunidad.

---

## 🎯 Fase 2: Actividades Detalladas de Mundo 1 (Números 1-10)

Para el MVP de Mundo 1, definimos exactamente el funcionamiento de las siguientes 8 actividades didácticas:

1. **Escuchar (Listening)**: 
   - *Dinámica*: El Árbol Sabio pronuncia un número (ej. "¡Tres!"). Tres nubes con números dibujados flotan en la pantalla. El niño debe tocar la nube del número pronunciado.
   - *Sensores*: Pantalla táctil y reproducción de audio.
2. **Reconocer (Recognize)**:
   - *Dinámica*: Se le muestra al niño una silueta del número y varias opciones. El niño debe identificar cuál de los números presentados encaja en la silueta.
   - *Sensores*: Pantalla táctil (discriminación visual de formas).
3. **Tocar (Touch)**:
   - *Dinámica*: El Árbol Sabio muestra un número y le pide al niño tocarlo rápidamente varias veces para llenarlo de colores. Ayuda a la estimulación visual y de motricidad básica.
   - *Sensores*: Pantalla táctil (toques múltiples).
4. **Escribir (Write)**:
   - *Dinámica*: Se dibuja el contorno de un número en formato de puntos guía. El niño debe seguir el contorno trazándolo con el dedo.
   - *Sensores*: Pantalla táctil (coordenadas de trazo y velocidad).
5. **Saltar (Jump)**:
   - *Dinámica*: El Árbol Sabio pide: "¡Vamos a movernos! Salta cuatro veces sosteniendo tu teléfono".
   - *Sensores*: Acelerómetro (mide oscilación vertical en el eje Y).
6. **Contar Objetos Físicos (Physical Count)**:
   - *Dinámica*: La app le muestra al niño 3 manzanas y le pide que coloque 3 juguetes en la mesa. La app guía el conteo por voz y el niño toca un botón de confirmación en pantalla al finalizar.
   - *Sensores*: Pantalla táctil y guía por voz.
7. **Reto con los Padres (Parent Challenge)**:
   - *Dinámica*: El Árbol Sabio le da una instrucción social: "Pregúntale a mamá o papá cuál es el número 5 en la casa". El padre valida el acierto en la interfaz.
   - *Sensores*: Interacción parental (Validación manual del tutor).
8. **Búsqueda QR (QR Search)**:
   - *Dinámica*: El niño busca en la habitación la tarjeta física del número impreso al lado del código QR. Al encontrarla, apunta con la cámara para validarla en la aplicación.
   - *Sensores*: Cámara (lector de código QR y payload asociado).

---

## 🗄️ Fase 3: Modelo de Datos (Bilingüe y Anonimizado)

Estructura de entidades relacionales (PostgreSQL para autenticación/perfiles) y no relacionales (MongoDB para telemetría anonimizada de juego).

### 1. Entidades de Autenticación y Control de Tutores (Base Relacional)
- **Tutor (Padre/Docente/Terapeuta)**:
  - `id` (UUID)
  - `email` (String, cifrado)
  - `password_hash` (String)
  - `rol` (Enum: padre, docente, terapeuta, admin)
- **Niño (Child)**:
  - `id` (UUID)
  - `tutor_id` (UUID, llave foránea)
  - `alias` (String, apodo para evitar PII, ej: "Pequeño Roble")
  - `idioma_preferido` (Enum: ES, EN)
  - `dificultades_registradas` (JSON/Array, ej: ["motricidad_fina", "atencion_tdah"])

### 2. Entidades de Aprendizaje y Telemetría Científica (Base No Relacional)
- **PerfilAprendizaje (ChildProfile)**:
  - `child_hash_id` (String, UUID anonimizado del niño)
  - `nivel_arbol` (Enum: semilla, brote, planta, arbol_joven, arbol_sabio)
  - `canal_preferente` (Enum: movimiento, auditivo, visual, escritura)
  - `habilidades_progreso` (Dict, mapea H1, H2, H3... a puntajes de dominio de 0 a 100)
- **Actividad (Activity)**:
  - `id` (String, ej: `W1_H8_NUM3`)
  - `habilidad_id` (String, ej: `H8`)
  - `dificultad` (Int, 1 al 5)
  - `codigo_qr_payload` (String, ej: `yarumito://activity/number/3`)
  - `textos_instrucciones` (Dict: `{"es": "Busca el número 3...", "en": "Find the number 3..."}`)
  - `codigo_audio_instruccion` (String, ej: `W1_NUM3_INSTRUCTION`)
- **Intento (GameplayAttempt)**:
  - `id` (UUID)
  - `child_hash_id` (String, UUID anonimizado)
  - `actividad_id` (String)
  - `exito` (Boolean)
  - `duracion_ms` (Int)
  - `errores` (Int)
  - `repeticiones_audio` (Int)
  - `sensor_usado` (Enum: screen_touch, mic_voice, camera_qr, accelerometer_movement)
  - `valor_escaneado_qr` (String, opcional, ej: `yarumito://activity/number/2`)
  - `timestamp` (DateTime)

---

## 🔬 Alineación con los Agentes y Roles del Ecosistema

Esta especificación pedagógica está alineada y se coordina con los siguientes agentes/habilidades personalizadas cargados en el ecosistema:

1. **[pedagogical_designer](file:///.agents/skills/pedagogical_designer/SKILL.md)**: Utiliza este mapa curricular para refinar los flujos del juego y estructurar las fases del personaje guía **El Árbol Sabio** en Español e Inglés.
2. **[voice_audio_designer](file:///.agents/skills/voice_audio_designer/SKILL.md)**: Emplea la taxonomía de la Fase 2 para definir guiones de voz del Árbol Sabio con SSML, velocidad pausada, y configurar las tolerancias del micrófono (STT) según el nivel del niño.
3. **[ia_child_adaptivity](file:///.agents/skills/ia_child_adaptivity/SKILL.md)**: Aplica las reglas del motor de adaptabilidad de la Fase 0 para recalcular en tiempo real el perfil cognitivo, detectar fatiga de pantalla y sugerir pausas activas.
4. **[research_analytics](file:///.agents/skills/research_analytics/SKILL.md)**: Diseña las estructuras de datos anonimizadas que se alimentan del modelo de datos de la Fase 3, asegurando la privacidad absoluta de los logs de juego recopilados.
5. **[activity_generator](file:///.agents/skills/activity_generator/SKILL.md)** (Nuevo): Diseña y genera los payloads JSON específicos y los recursos didácticos para las actividades de los 20 mundos basándose en las plantillas y sensores indicados en la Fase 2.

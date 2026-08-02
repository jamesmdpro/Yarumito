// ==========================================
// Yarumito App Logic: Landing Completa & Flujos
// ==========================================

const API_BASE_URL = "http://127.0.0.1:8000";

// Estado de la aplicación
const state = {
    locale: "es", // "es" o "en"
    targetNumber: 3,
    audioCatalog: [],
    firstActivityCompleted: false,
    selectedDonationAmount: 10,
    
    // Progresión y registro del niño
    isRegistered: false,
    childName: "James",
    childAvatar: "🦊",
    currentActivityIndex: 0,
    currentWorld: 1, // Mundo activo
    worldProgress: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
        11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
    },
    pcMode: false, // Modo PC desactivará retos móviles
    currentTreePage: 0, // Página actual del árbol (carrusel de 10 hojas)
    voiceName: "", // Voz seleccionada por el usuario
    voiceSpeed: 0.85, // Velocidad de la voz (default 0.85 pausada)
    wrongAttempts: 0 // Intentos fallidos en la actividad activa
};

// Currículo de los 20 Mundos de Yarumito (Bilingüe)
const worldsData = {
    es: [
        { num: 1, title: "Números (1-10)", desc: "Iniciación al concepto numérico, formas visuales y fonemas elementales.", unlocked: true },
        { num: 2, title: "Vocales (A-U)", desc: "Reconocimiento de vocales, asociación de sonidos y práctica de trazo de la A a la U.", unlocked: false },
        { num: 3, title: "Conteo y Grupos", desc: "Aprende cardinalidad asociando grupos de frutas y animales.", unlocked: false },
        { num: 4, title: "Geometría Básica", desc: "Identifica círculos, cuadrados y triángulos en tu entorno.", unlocked: false },
        { num: 5, title: "Colores y Patrones", desc: "Clasificación cromática y seguimiento de secuencias lógicas.", unlocked: false },
        { num: 6, title: "Suma Inicial", desc: "Introduce la unión sumando manzanas caídas del árbol.", unlocked: false },
        { num: 7, title: "Resta Inicial", desc: "Aprende a restar separando y quitando elementos del nido.", unlocked: false },
        { num: 8, title: "Orientación Espacial", desc: "Conceptos de arriba/abajo e izquierda/derecha con movimiento.", unlocked: false },
        { num: 9, title: "Tamaños y Relaciones", desc: "Comparación de tamaños y relaciones de más y menos.", unlocked: false },
        { num: 10, title: "Sílabas y Palabras", desc: "Construcción de palabras simples asociando sonidos.", unlocked: false },
        { num: 11, title: "Reconocer Emociones", desc: "Expresiones gestuales y entonación de la voz con la cámara.", unlocked: false },
        { num: 12, title: "Ritmo y Coordinación", desc: "Seguimiento de patrones rítmicos dando palmadas y saltos.", unlocked: false },
        { num: 13, title: "Día, Noche y Estaciones", desc: "Nociones temporales básicas y cambios del clima.", unlocked: false },
        { num: 14, title: "Fauna y Flora", desc: "Clasificación de plantas e identificación de sonidos de la naturaleza.", unlocked: false },
        { num: 15, title: "Rutinas Diarias", desc: "Secuenciación lógica de actividades higiénicas cotidianas.", unlocked: false },
        { num: 16, title: "Compartir y Turnos", desc: "Desafíos cooperativos offline en familia o escuela.", unlocked: false },
        { num: 17, title: "Pictogramas Visuales", desc: "Andamiaje comunicativo para niños con TEA y TDAH.", unlocked: false },
        { num: 18, title: "Memoria y Foco", desc: "Retención auditiva de secuencias y parejas visuales.", unlocked: false },
        { num: 19, title: "Resolución de Problemas", desc: "Laberintos secuenciales y lógica de programación básica.", unlocked: false },
        { num: 20, title: "El Gran Bosque", desc: "Integración de todas las habilidades con la comunidad.", unlocked: false }
    ],
    en: [
        { num: 1, title: "Numbers (1-10)", desc: "Introduction to numbers, visual shapes, and elementary phonemes.", unlocked: true },
        { num: 2, title: "Vowels (A-U)", desc: "Vowel recognition, sound association, and tracing practice from A to U.", unlocked: false },
        { num: 3, title: "Counting & Grouping", desc: "Learn cardinality by grouping fruits and animals together.", unlocked: false },
        { num: 4, title: "Basic Geometry", desc: "Identify circles, squares, and triangles in your surroundings.", unlocked: false },
        { num: 5, title: "Colores & Patterns", desc: "Color classification and visual sequencing.", unlocked: false },
        { num: 6, title: "Intro to Addition", desc: "Introduce addition by uniting fallen apples from the tree.", unlocked: false },
        { num: 7, title: "Intro to Subtraction", desc: "Learn subtraction by taking away items from the nest.", unlocked: false },
        { num: 8, title: "Spatial Orientation", desc: "Concepts of up/down and left/right using device movement.", unlocked: false },
        { num: 9, title: "Sizes & Comparisons", desc: "Comparing sizes and relationships of more and less.", unlocked: false },
        { num: 10, title: "Syllables & Words", desc: "Building simple words by linking phoneme sounds.", unlocked: false },
        { num: 11, title: "Recognizing Emotions", desc: "Gestural expressions and voice pitch using the camera.", unlocked: false },
        { num: 12, title: "Rhythm & Coordination", desc: "Following rhythmic patterns by clapping and jumping.", unlocked: false },
        { num: 13, title: "Day, Night & Seasons", desc: "Basic temporal notions and weather cycles.", unlocked: false },
        { num: 14, title: "Fauna & Flora", desc: "Plant classification and natural sound identification.", unlocked: false },
        { num: 15, title: "Daily Routines", desc: "Logical sequencing of everyday hygiene activities.", unlocked: false },
        { num: 16, title: "Sharing & Turns", desc: "Cooperative offline challenges with family or classmates.", unlocked: false },
        { num: 17, title: "Visual Pictograms", desc: "Communication scaffolding for kids with ASD and ADHD.", unlocked: false },
        { num: 18, title: "Memory & Focus", desc: "Auditory sequence retention and visual matching pairs.", unlocked: false },
        { num: 19, title: "Problem Solving", desc: "Sequential mazes and basic programming logic.", unlocked: false },
        { num: 20, title: "The Great Forest", desc: "Full skills integration and playing with the community.", unlocked: false }
    ]
};

// Generación dinámica de 50 actividades para el Mundo 1
function generateWorld1Activities() {
    const listES = [];
    const listEN = [];
    
    // 1. Introducción 1-10 (10 actividades)
    for (let num = 1; num <= 10; num++) {
        listES.push({
            id: `W1_INTRO_${num}`,
            title: `Conoce el Número ${num}`,
            icon: "🔢",
            desc: `Toca el número ${num} para escuchar cómo suena y aprender su forma.`,
            playAction: "intro",
            data: { number: num }
        });
        listEN.push({
            id: `W1_INTRO_${num}`,
            title: `Meet Number ${num}`,
            icon: "🔢",
            desc: `Touch number ${num} to hear its sound and learn its shape.`,
            playAction: "intro",
            data: { number: num }
        });
    }
    
    // 2. Contar visualmente (10 actividades mezcladas)
    const visualItems = [
        { emoji: "🍎", nameEs: "manzanas", nameEn: "apples" },
        { emoji: "⭐", nameEs: "estrellas", nameEn: "stars" },
        { emoji: "🌸", nameEs: "flores", nameEn: "flowers" },
        { emoji: "🦊", nameEs: "zorritos", nameEn: "foxes" },
        { emoji: "🐝", nameEs: "abejitas", nameEn: "bees" }
    ];
    for (let i = 1; i <= 10; i++) {
        const item = visualItems[(i - 1) % visualItems.length];
        const count = (i % 5) + 1; // Rango 1 a 5
        listES.push({
            id: `W1_VISUAL_${i}`,
            title: `¿Cuántos elementos ves?`,
            icon: "👀",
            desc: `Cuenta cuántas ${item.emoji} ves en la pantalla y selecciona el número correcto.`,
            playAction: "count_visual",
            data: { emoji: item.emoji, count: count, name: item.nameEs }
        });
        listEN.push({
            id: `W1_VISUAL_${i}`,
            title: `How many do you see?`,
            icon: "👀",
            desc: `Count how many ${item.emoji} you see on the screen and select the correct number.`,
            playAction: "count_visual",
            data: { emoji: item.emoji, count: count, name: item.nameEn }
        });
    }
    
    // 3. Escribir/Trazar números 1-5 (5 actividades)
    for (let num = 1; num <= 5; num++) {
        listES.push({
            id: `W1_TRACE_${num}`,
            title: `Escribe el Número ${num}`,
            icon: "✏️",
            desc: `Toca los puntos en orden del 1 al 3 para escribir el número ${num}.`,
            playAction: "trace",
            data: { number: num }
        });
        listEN.push({
            id: `W1_TRACE_${num}`,
            title: `Write Number ${num}`,
            icon: "✏️",
            desc: `Touch nodes 1 to 3 in order to write number ${num}.`,
            playAction: "trace",
            data: { number: num }
        });
    }
    
    // 4. Repite conmigo (5 actividades)
    for (let i = 1; i <= 5; i++) {
        listES.push({
            id: `W1_REPEAT_${i}`,
            title: "Repite Conmigo",
            icon: "🗣️",
            desc: "El Árbol Sabio dirá un número. Presiona el micrófono y dilo fuerte para practicar.",
            playAction: "repeat"
        });
        listEN.push({
            id: `W1_REPEAT_${i}`,
            title: "Repeat after Me",
            icon: "🗣️",
            desc: "The Wise Tree will say a number. Press the mic and say it out loud to practice.",
            playAction: "repeat"
        });
    }
    
    // 5. Ordenar números (5 actividades)
    const sortRanges = [
        { start: 1, end: 3 },
        { start: 1, end: 5 },
        { start: 1, end: 7 },
        { start: 5, end: 10 },
        { start: 1, end: 10 }
    ];
    sortRanges.forEach((range, idx) => {
        listES.push({
            id: `W1_SORT_${idx}`,
            title: `Ordena del ${range.start} al ${range.end}`,
            icon: "🔀",
            desc: `Toca los números en orden de menor a mayor del ${range.start} al ${range.end}.`,
            playAction: "sort",
            data: range
        });
        listEN.push({
            id: `W1_SORT_${idx}`,
            title: `Sort ${range.start} to ${range.end}`,
            icon: "🔀",
            desc: `Touch the numbers in ascending order from ${range.start} to ${range.end}.`,
            playAction: "sort",
            data: range
        });
    });
    
    // 6. Reto con padres (5 actividades)
    const parentRetosES = [
        "Dile a tus papás los números del 1 al 5 en orden.",
        "Busca 3 objetos de color verde en la habitación y muéstraselos a tus papás.",
        "Pregúntale a papá o mamá su número favorito del 1 al 10.",
        "Cuenta en voz alta junto a tus papás del 1 al 10 dando aplausos.",
        "Busca un número en un reloj o un libro en casa y señálalo con tus papás."
    ];
    const parentRetosEN = [
        "Tell your parents the numbers from 1 to 5 in order.",
        "Find 3 green objects in the room and show them to your parents.",
        "Ask mom or dad what their favorite number from 1 to 10 is.",
        "Count out loud with your parents from 1 to 10 while clapping.",
        "Find a number on a clock or in a book at home and point to it with your parents."
    ];
    for (let i = 0; i < 5; i++) {
        listES.push({
            id: `W1_PARENT_${i}`,
            title: "Reto con Padres",
            icon: "👨‍👩‍👦",
            desc: parentRetosES[i],
            playAction: "parent"
        });
        listEN.push({
            id: `W1_PARENT_${i}`,
            title: "Parent Challenge",
            icon: "👨‍👩‍👦",
            desc: parentRetosEN[i],
            playAction: "parent"
        });
    }
    
    // 7. Contar sonidos (5 actividades)
    const soundTypes = [
        { emoji: "🐶", nameEs: "ladridos de perrito", nameEn: "dog barks", sound: "bark" },
        { emoji: "🚪", nameEs: "golpes en la puerta", nameEn: "knocks on the door", sound: "knock" },
        { emoji: "🐱", nameEs: "maullidos de gatito", nameEn: "cat meows", sound: "meow" },
        { emoji: "🐦", nameEs: "canto de pajarito", nameEn: "bird chirps", sound: "chirp" },
        { emoji: "🔔", nameEs: "toques de campana", nameEn: "bell rings", sound: "bell" }
    ];
    for (let i = 0; i < 5; i++) {
        const soundType = soundTypes[i];
        const count = (i % 4) + 2; // Rango 2 a 5
        listES.push({
            id: `W1_SOUND_${i}`,
            title: "Cuenta los Sonidos",
            icon: "👂",
            desc: `Escucha con atención y selecciona cuántas veces escuchas el sonido del: ${soundType.emoji}`,
            playAction: "count_sounds",
            data: { sound: soundType.sound, count: count, emoji: soundType.emoji, name: soundType.nameEs }
        });
        listEN.push({
            id: `W1_SOUND_${i}`,
            title: "Count the Sounds",
            icon: "👂",
            desc: `Listen carefully and select how many times you hear the: ${soundType.emoji}`,
            playAction: "count_sounds",
            data: { sound: soundType.sound, count: count, emoji: soundType.emoji, name: soundType.nameEn }
        });
    }
    
    // 8. Actividades de Movimiento y QR (Móvil) (5 actividades)
    const mobileActsES = [
        { id: "W1_MOB_1", title: "Salta y Cuenta", icon: "🦘", desc: "Sostén tu celular y da 3 saltos grandes para que el Árbol Sabio los cuente.", playAction: "jump", data: { count: 3 } },
        { id: "W1_MOB_2", title: "Búsqueda con QR", icon: "📷", desc: "Busca la tarjeta del número 3 en la habitación y escanea su código QR.", playAction: "qr", data: { target: 3 } },
        { id: "W1_MOB_3", title: "Salta Alto", icon: "🦘", desc: "Sostén tu celular y da 5 saltos rápidos.", playAction: "jump", data: { count: 5 } },
        { id: "W1_MOB_4", title: "Búsqueda del QR 5", icon: "📷", desc: "Busca la tarjeta del número 5 en la habitación y escanea su código QR.", playAction: "qr", data: { target: 5 } },
        { id: "W1_MOB_5", title: "Super Salto", icon: "🦘", desc: "Da 4 saltos de canguro sosteniendo tu teléfono.", playAction: "jump", data: { count: 4 } }
    ];
    const mobileActsEN = [
        { id: "W1_MOB_1", title: "Jump and Count", icon: "🦘", desc: "Hold your phone and do 3 big jumps so the Wise Tree can count them.", playAction: "jump", data: { count: 3 } },
        { id: "W1_MOB_2", title: "QR Treasure Hunt", icon: "📷", desc: "Find the printed card for number 3 in the room and scan its QR.", playAction: "qr", data: { target: 3 } },
        { id: "W1_MOB_3", title: "Jump High", icon: "🦘", desc: "Hold your phone and do 5 quick jumps.", playAction: "jump", data: { count: 5 } },
        { id: "W1_MOB_4", title: "QR Hunt for 5", icon: "📷", desc: "Find the printed card for number 5 in the room and scan its QR.", playAction: "qr", data: { target: 5 } },
        { id: "W1_MOB_5", title: "Super Jump", icon: "🦘", desc: "Do 4 kangaroo jumps holding your phone.", playAction: "jump", data: { count: 4 } }
    ];
    for (let i = 0; i < 5; i++) {
        listES.push({ ...mobileActsES[i], isMobileOnly: true });
        listEN.push({ ...mobileActsEN[i], isMobileOnly: true });
    }
    
    // Mezclar las actividades manteniendo la Introducción al inicio (primeros 10 puestos)
    const introES = listES.slice(0, 10);
    const restES = listES.slice(10);
    const introEN = listEN.slice(0, 10);
    const restEN = listEN.slice(10);
    
    // Mezcla determinista paralela usando una semilla aleatoria fija en esta sesión
    const seedRandom = (seed) => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    
    const indices = Array.from({ length: restES.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(seedRandom(i + 42) * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    const shuffledRestES = indices.map(i => restES[i]);
    const shuffledRestEN = indices.map(i => restEN[i]);
    
    return {
        es: [...introES, ...shuffledRestES],
        en: [...introEN, ...shuffledRestEN]
    };
}

function generateWorld2Activities() {
    const listES = [];
    const listEN = [];
    
    // 1. Introducción Vocales A, E, I, O, U (5 actividades)
    const vowels = ["A", "E", "I", "O", "U"];
    vowels.forEach(v => {
        listES.push({
            id: `W2_INTRO_${v}`,
            title: `Conoce la Vocal ${v}`,
            icon: "🔤",
            desc: `Toca la vocal ${v} para escuchar cómo suena y aprender su forma.`,
            playAction: "intro",
            data: { number: v }
        });
        listEN.push({
            id: `W2_INTRO_${v}`,
            title: `Meet Vowel ${v}`,
            icon: "🔤",
            desc: `Touch vowel ${v} to hear its sound and learn its shape.`,
            playAction: "intro",
            data: { number: v }
        });
    });
    
    // 2. Identificar Vocal Inicial (10 actividades mezcladas)
    const vowelItems = [
        { emoji: "✈️", vowel: "A", wordEs: "avión", wordEn: "airplane" },
        { emoji: "🐘", vowel: "E", wordEs: "elefante", wordEn: "elephant" },
        { emoji: "🏝️", vowel: "I", wordEs: "isla", wordEn: "island" },
        { emoji: "🐻", vowel: "O", wordEs: "oso", wordEn: "bear" },
        { emoji: "🍇", vowel: "U", wordEs: "uva", wordEn: "grapes" },
        { emoji: "🐝", vowel: "A", wordEs: "abeja", wordEn: "bee" },
        { emoji: "🌟", vowel: "E", wordEs: "estrella", wordEn: "star" },
        { emoji: "🦎", vowel: "I", wordEs: "iguana", wordEn: "iguana" },
        { emoji: "👁️", vowel: "O", wordEs: "ojo", wordEn: "eye" },
        { emoji: "🦄", vowel: "U", wordEs: "unicornio", wordEn: "unicorn" }
    ];
    vowelItems.forEach((item, idx) => {
        listES.push({
            id: `W2_VISUAL_${idx}`,
            title: `¿Con qué vocal empieza?`,
            icon: "👀",
            desc: `Observa el dibujo de la ${item.wordEs} (${item.emoji}) y selecciona con qué vocal comienza.`,
            playAction: "count_visual",
            data: { isVowelChoice: true, emoji: item.emoji, correctVowel: item.vowel, name: item.wordEs }
        });
        listEN.push({
            id: `W2_VISUAL_${idx}`,
            title: `What vowel does it start with?`,
            icon: "👀",
            desc: `Look at the picture of the ${item.wordEn} (${item.emoji}) and select the starting vowel.`,
            playAction: "count_visual",
            data: { isVowelChoice: true, emoji: item.emoji, correctVowel: item.vowel, name: item.wordEn }
        });
    });
    
    // 3. Escribir/Trazar Vocales (10 actividades: 5 mayúsculas, 5 minúsculas)
    vowels.forEach(v => {
        listES.push({
            id: `W2_TRACE_${v}`,
            title: `Trazar la Vocal ${v}`,
            icon: "✏️",
            desc: `Une los puntos en orden para escribir la letra ${v}.`,
            playAction: "trace",
            data: { number: v }
        });
        listEN.push({
            id: `W2_TRACE_${v}`,
            title: `Trace Vowel ${v}`,
            icon: "✏️",
            desc: `Touch the nodes in order to write letter ${v}.`,
            playAction: "trace",
            data: { number: v }
        });
    });
    
    const lowerVowels = ["a", "e", "i", "o", "u"];
    lowerVowels.forEach(v => {
        listES.push({
            id: `W2_TRACE_${v}`,
            title: `Trazar la Vocal ${v}`,
            icon: "✏️",
            desc: `Une los puntos en orden para escribir la letra ${v}.`,
            playAction: "trace",
            data: { number: v }
        });
        listEN.push({
            id: `W2_TRACE_${v}`,
            title: `Trace Vowel ${v}`,
            icon: "✏️",
            desc: `Touch the nodes in order to write letter ${v}.`,
            playAction: "trace",
            data: { number: v }
        });
    });
    
    // 4. Repite conmigo (5 actividades)
    for (let i = 0; i < 5; i++) {
        const vowel = vowels[i];
        listES.push({
            id: `W2_REPEAT_${vowel}`,
            title: "Repite Conmigo",
            icon: "🗣️",
            desc: `El Árbol Sabio dirá la vocal ${vowel}. Presiona el micrófono y dila fuerte.`,
            playAction: "repeat",
            data: { number: vowel }
        });
        listEN.push({
            id: `W2_REPEAT_${vowel}`,
            title: "Repeat after Me",
            icon: "🗣️",
            desc: `The Wise Tree will say vowel ${vowel}. Press the mic and say it out loud.`,
            playAction: "repeat",
            data: { number: vowel }
        });
    }
    
    // 5. Ordenar vocales (5 actividades)
    const vowelSortRanges = [
        { start: "A", end: "I" },
        { start: "I", end: "U" },
        { start: "A", end: "E" },
        { start: "E", end: "O" },
        { start: "A", end: "U" }
    ];
    vowelSortRanges.forEach((range, idx) => {
        listES.push({
            id: `W2_SORT_${idx}`,
            title: `Ordena las vocales`,
            icon: "🔀",
            desc: `Toca las vocales en orden alfabético de la ${range.start} a la ${range.end}.`,
            playAction: "sort",
            data: range
        });
        listEN.push({
            id: `W2_SORT_${idx}`,
            title: `Sort the vowels`,
            icon: "🔀",
            desc: `Touch the vowels in alphabetical order from ${range.start} to ${range.end}.`,
            playAction: "sort",
            data: range
        });
    });
    
    // 6. Retos con padres (5 actividades)
    const parentRetosES = [
        "Dile a tus papás las 5 vocales en orden (A, E, I, O, U).",
        "Busca en la habitación un objeto que empiece con la letra A y muéstraselo a tus papás.",
        "Dile a tus papás 3 palabras que comiencen con la letra E.",
        "Canta con tus papás la canción de las vocales.",
        "Dibuja con el dedo en la espalda de papá o mamá la vocal O para que la adivinen."
    ];
    const parentRetosEN = [
        "Say the 5 vowels in order (A, E, I, O, U) to your parents.",
        "Find an object in the room that starts with letter A and show it to your parents.",
        "Tell your parents 3 words that start with letter E.",
        "Sing the vowel song together with your parents.",
        "Draw letter O with your finger on your parent's back and have them guess it."
    ];
    for (let i = 0; i < 5; i++) {
        listES.push({
            id: `W2_PARENT_${i}`,
            title: "Reto con Padres",
            icon: "👨‍👩‍👦",
            desc: parentRetosES[i],
            playAction: "parent"
        });
        listEN.push({
            id: `W2_PARENT_${i}`,
            title: "Parent Challenge",
            icon: "👨‍👩‍👦",
            desc: parentRetosEN[i],
            playAction: "parent"
        });
    }
    
    // 7. Contar sonidos de vocales (5 actividades)
    for (let i = 0; i < 5; i++) {
        const vowel = vowels[i];
        const count = (i % 3) + 2; // Rango 2 a 4
        listES.push({
            id: `W2_SOUND_${vowel}`,
            title: "Cuenta las Vocales",
            icon: "👂",
            desc: `Escucha atentamente cuántas veces el Árbol Sabio pronuncia la vocal ${vowel}.`,
            playAction: "count_sounds",
            data: { isVowelSpeech: true, vowel: vowel, count: count, emoji: "🗣️", name: `letra ${vowel}` }
        });
        listEN.push({
            id: `W2_SOUND_${vowel}`,
            title: "Count the Vowels",
            icon: "👂",
            desc: `Listen carefully to how many times the Wise Tree pronounces vowel ${vowel}.`,
            playAction: "count_sounds",
            data: { isVowelSpeech: true, vowel: vowel, count: count, emoji: "🗣️", name: `letter ${vowel}` }
        });
    }
    
    // 8. Actividades Móviles (Movimiento y QR) (5 actividades)
    const mobileActsES = [
        { id: "W2_MOB_1", title: "Salta con la letra A", icon: "🦘", desc: "Sostén tu celular y da 3 saltos cada vez que escuches la letra A.", playAction: "jump", data: { count: 3 } },
        { id: "W2_MOB_2", title: "Busca la Vocal E", icon: "📷", desc: "Busca la tarjeta con la vocal E en la habitación y escanea su código QR.", playAction: "qr", data: { target: "E" } },
        { id: "W2_MOB_3", title: "Salta con la letra I", icon: "🦘", desc: "Sostén tu celular y da 4 saltos rápidos con la vocal I.", playAction: "jump", data: { count: 4 } },
        { id: "W2_MOB_4", title: "Busca la Vocal O", icon: "📷", desc: "Busca la tarjeta con la vocal O en la habitación y escanea su código QR.", playAction: "qr", data: { target: "O" } },
        { id: "W2_MOB_5", title: "Busca la Vocal U", icon: "📷", desc: "Busca la tarjeta con la vocal U en la habitación y escanea su código QR.", playAction: "qr", data: { target: "U" } }
    ];
    const mobileActsEN = [
        { id: "W2_MOB_1", title: "Jump with letter A", icon: "🦘", desc: "Hold your phone and do 3 jumps when you hear letter A.", playAction: "jump", data: { count: 3 } },
        { id: "W2_MOB_2", title: "Find Vowel E", icon: "📷", desc: "Find the printed card for vowel E in the room and scan its QR.", playAction: "qr", data: { target: "E" } },
        { id: "W2_MOB_3", title: "Jump with letter I", icon: "🦘", desc: "Hold your phone and do 4 quick jumps with vowel I.", playAction: "jump", data: { count: 4 } },
        { id: "W2_MOB_4", title: "Find Vowel O", icon: "📷", desc: "Find the printed card for vowel O in the room and scan its QR.", playAction: "qr", data: { target: "O" } },
        { id: "W2_MOB_5", title: "Find Vowel U", icon: "📷", desc: "Find the printed card for vowel U in the room and scan its QR.", playAction: "qr", data: { target: "U" } }
    ];
    for (let i = 0; i < 5; i++) {
        listES.push({ ...mobileActsES[i], isMobileOnly: true });
        listEN.push({ ...mobileActsEN[i], isMobileOnly: true });
    }
    
    // Mezclar las actividades manteniendo la Introducción al inicio (primeros 5 puestos)
    const introES = listES.slice(0, 5);
    const restES = listES.slice(5);
    const introEN = listEN.slice(0, 5);
    const restEN = listEN.slice(5);
    
    const seedRandom = (seed) => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    
    const indices = Array.from({ length: restES.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(seedRandom(i + 88) * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    const shuffledRestES = indices.map(i => restES[i]);
    const shuffledRestEN = indices.map(i => restEN[i]);
    
    return {
        es: [...introES, ...shuffledRestES],
        en: [...introEN, ...shuffledRestEN]
    };
}

const worldActivities = {
    1: generateWorld1Activities(),
    2: generateWorld2Activities()
};

function getActiveActivities() {
    const worldNum = state.currentWorld || 1;
    const worldData = worldActivities[worldNum] || worldActivities[1];
    const all = worldData[state.locale];
    if (state.pcMode) {
        return all.filter(act => !act.isMobileOnly);
    }
    return all;
}

// Traducciones de la interfaz
const translations = {
    es: {
        heroTitle: "Ayudamos a cada niño a florecer a su propio ritmo",
        heroSubtitle: "Un ecosistema de aprendizaje adaptativo, libre y bilingüe, diseñado especialmente para la neurodiversidad y el juego activo.",
        ctaPlayNow: "🎮 Jugar Primer Reto Gratis",
        ctaNote: "Sin registros ni tarjetas de crédito. ¡Juega de inmediato!",
        logoTitle: "🌳 Yarumito",
        donarNavBtn: "❤️ Donar",
        loginNavBtn: "🔑 Iniciar Sesión",
        logoutNavBtn: "🚪 Salir",
        
        playBadge: "👉 Actividad Inicial Gratuita",
        playSectionTitle: "¡Vamos a jugar con el Árbol Sabio!",
        playSectionDesc: "Ayuda a la pequeña semilla a dar sus primeros brotes. Escucha la voz del Árbol Sabio y selecciona la respuesta correcta en la pantalla.",
        speakerLbl: "El Árbol Sabio dice:",
        freeActivityVoice: "\"¡Hola! Soy tu amigo el Árbol Sabio. Toca el número 3 para ayudarme a despertar.\"",
        playFreeVoiceBtn: "🔊 Escuchar Instrucción",
        
        worldsTitle: "🗺️ Ruta de Aprendizaje: Los 20 Mundos",
        worldsDesc: "Nuestra currícula está estructurada en mundos progresivos. Cada mundo fortalece habilidades auditivas, visuales, de motricidad y de interacción física.",
        
        qrTitle: "📷 Búsqueda Activa con QR",
        qrDesc: "Combina el movimiento con el reconocimiento de números. El niño busca tarjetas impresas y las escanea.",
        targetVoiceLabel: "El Árbol Sabio dice:",
        instructionText: "Busca el número 3 y escanéalo.",
        playTargetAudioBtn: "🔊 Escuchar Instrucción",
        cameraStatus: "Buscando tarjeta en la habitación...",
        scanBtnPrefix: "📄 Escanear",
        
        voiceTitle: "🎙️ Catálogo de Voces de Yarumito",
        voiceDesc: "Voces genéricas y específicas que el motor de IA selecciona para guiar al niño de forma pausada y acogedora.",
        
        infoSectionTitle: "🔍 Información Detallada para Acompañantes",
        infoSectionDesc: "Haz clic en cada sección para expandir y conocer cómo opera Yarumito para cada actor del ecosistema.",
        accordionHeader1: "👨‍👩‍👦 Para Padres y Madres: ¿Cómo jugar en casa?",
        accordionText1: "El rol de la familia es fundamental. La app de Yarumito propone pausas activas cada 15 minutos y genera retos cooperativos (\"Pregúntale a papá\"). Desde tu panel, podrás ver el crecimiento de la semilla de tu hijo y descargar plantillas en PDF con tarjetas numéricas y juegos analógicos.",
        accordionHeader2: "🎓 Para Docentes: Integración en el Salón de Clases",
        accordionText2: "Los docentes no enseñan dentro de la plataforma, sino que acompañan. Yarumito te permite crear grupos de estudiantes, ver resúmenes pedagógicos agregados (por ejemplo, saber si un grupo tiene dificultades con números mayores a 5) y recibir sugerencias de actividades físicas grupales sin pantallas.",
        accordionHeader3: "🩺 Para Terapeutas: Herramientas de Intervención Adaptadas",
        accordionText3: "Como terapeuta, cuentas con un portal avanzado. Podrás diseñar planes de estudio específicos desbloqueando ejercicios selectivos, analizar estadísticas detalladas de velocidad de respuesta, patrones de error recurrente (como fallas visomotoras o auditivas) y agregar bitácoras clínicas de seguimiento.",
        accordionHeader4: "🔬 Para Investigadores: Privacidad y Datos Científicos",
        accordionText4: "Yarumito apoya la investigación científica del aprendizaje. Dividimos estrictamente los datos de identidad (cifrados) de la telemetría de juego. Los investigadores tienen acceso a registros 100% anonimizados de tiempos de reacción, curvas de aprendizaje y recurrencia de errores, cumpliendo con los estándares de COPPA.",
        
        missionTitle: "Una iniciativa social financiada al 100% por donantes",
        missionBody1: "Yarumito es y será siempre 100% libre de lucro y gratuito. Creemos firmemente que la educación adaptativa de calidad debe ser un derecho y no un privilegio comercial. Ningún niño quedará excluido del ecosistema por razones económicas.",
        missionBody2: "Tu contribución directa no compra licencias. Ayuda a sostener servidores en la nube, financiar la síntesis de nuevas voces pedagógicas en múltiples idiomas y desarrollar actividades accesibles adicionales.",
        donationsCardTitle: "Apoya el Aprendizaje",
        donateSubmitBtn: "Contribuir ahora",
        
        modalTitle: "🌳 ¡Excelente trabajo!",
        modalSubtitle: "¡Has despertado a la pequeña semilla!",
        modalDesc: "¡Qué lindo! Pídele ayuda a tu papá, mamá o a un adulto para registrar una cuenta de tutor gratuita. Así guardaremos el progreso y el crecimiento de tu Árbol Sabio.",
        labelName: "Nombre del Tutor",
        labelEmail: "Correo Electrónico",
        labelRole: "Tu relación con el niño",
        labelPrivacy: "Acepto los términos de privacidad y anonimización de datos.",
        btnRegisterSubmit: "Crear cuenta y Guardar Árbol",
        
        impactLabels: {
            10: "✔ Financiará 18 días de servidor.",
            25: "✔ Financiará 45 días de servidor y 2 actividades.",
            50: "✔ Patrocinará a 3 niños y pagará 3 meses de base de datos."
        },
        
        // Bloqueo y Actividades
        lockedLabel: "Bloqueado",
        unlockedLabel: "Desbloqueado",
        lockedWarning: "Este mundo está durmiendo. Termina el mundo anterior para despertarlo.",
        actModalTitle: "🎮 Actividades: Mundo 1",
        actModalDesc: "Selecciona una actividad para iniciar tu aprendizaje guiado por el Árbol Sabio:"
    },
    en: {
        heroTitle: "Helping every child bloom at their own pace",
        heroSubtitle: "A free, bilingual, adaptive learning ecosystem designed especially for neurodiversity and active play.",
        ctaPlayNow: "🎮 Play First Challenge Free",
        ctaNote: "No sign-up or credit card required. Play instantly!",
        logoTitle: "🌳 Yarumito",
        donarNavBtn: "❤️ Donate",
        loginNavBtn: "🔑 Sign In",
        logoutNavBtn: "🚪 Sign Out",
        
        playBadge: "👉 Free Initial Activity",
        playSectionTitle: "Let's play with the Wise Tree!",
        playSectionDesc: "Help the tiny seed grow its first sprout. Listen to the Wise Tree's voice and select the correct response on the screen.",
        speakerLbl: "The Wise Tree says:",
        freeActivityVoice: "\"Hello! I am your friend the Wise Tree. Touch number 3 to help me wake up.\"",
        playFreeVoiceBtn: "🔊 Listen to Instruction",
        
        worldsTitle: "🗺️ Learning Route: The 20 Worlds",
        worldsDesc: "Our curriculum is structured in progressive worlds. Each world strengthens auditory, visual, motor, and physical interaction skills.",
        
        qrTitle: "📷 Active Search with QR",
        qrDesc: "Combines physical room exploration with number recognition. The child searches for printed cards and scans them.",
        targetVoiceLabel: "The Wise Tree says:",
        instructionText: "Find number 3 and scan it.",
        playTargetAudioBtn: "🔊 Listen to Instruction",
        cameraStatus: "Searching for card in the room...",
        scanBtnPrefix: "📄 Scan",
        
        voiceTitle: "🎙️ Yarumito Voice Catalog",
        voiceDesc: "Generic and specific voices that the AI engine selects to guide the child in a calm and comforting manner.",
        
        infoSectionTitle: "🔍 Detailed Information for Accompaniers",
        infoSectionDesc: "Click each section to expand and understand how Yarumito operates for each actor in the ecosystem.",
        accordionHeader1: "👨‍👩‍👦 For Parents: How to play at home?",
        accordionText1: "The family's role is key. Yarumito proposes active breaks every 15 minutes and designs cooperative challenges (\"Ask mom/dad\"). From your portal, you can track the growth of your child's seed and download PDF templates with number cards and physical games.",
        accordionHeader2: "🎓 For Teachers: Integrating into the Classroom",
        accordionText2: "Teachers accompany rather than teach within the app. Yarumito allows you to create student groups, view aggregated pedagogical charts (e.g. check if a group struggles with numbers above 5) and receive suggestions for active physical games without screens.",
        accordionHeader3: "🩺 For Therapists: Tailored Intervention Tools",
        accordionText3: "As a therapist, you have access to an advanced portal. You can design specific learning tracks by unlocking selected exercises, analyze reaction times, visomotor/auditory error patterns, and log clinical annotations.",
        accordionHeader4: "🔬 For Researchers: Privacy & Scientific Telemetry",
        accordionText4: "Yarumito supports scientific learning research. We strictly divide identity data (encrypted) from gameplay logs. Researchers get access to 100% anonymized logs of reaction times, learning curves, and error patterns in compliance with COPPA.",
        
        missionTitle: "A social initiative funded 100% by donors",
        missionBody1: "Yarumito is and will always be 100% non-profit and free. We firmly believe that quality adaptive education must be a right and not a commercial privilege. No child will ever be excluded for financial reasons.",
        missionBody2: "Your donation does not buy licenses. It helps keep our server infrastructure running, fund the synthesis of new pedagogical voices in multiple languages, and build more accessible activities.",
        donationsCardTitle: "Support the Learning",
        donateSubmitBtn: "Contribute now",
        
        modalTitle: "🌳 Great job!",
        modalSubtitle: "You have awakened the tiny seed!",
        modalDesc: "Wonderful! Ask your mom, dad, or a guardian to help you register a free tutor account. This will save the progress and growth of your Wise Tree.",
        labelName: "Tutor Name",
        labelEmail: "Email Address",
        labelRole: "Your relationship with the child",
        labelPrivacy: "I accept privacy and data anonymization terms.",
        btnRegisterSubmit: "Create account & Save Tree",
        
        impactLabels: {
            10: "✔ Will fund 18 days of server hosting.",
            25: "✔ Will fund 45 days of server hosting and 2 activities.",
            50: "✔ Will sponsor 3 children and pay for 3 months of DB."
        },
        
        // Bloqueo y Actividades
        lockedLabel: "Locked",
        unlockedLabel: "Unlocked",
        lockedWarning: "This world is sleeping. Complete the previous world to wake it up.",
        actModalTitle: "🎮 Activities: World 1",
        actModalDesc: "Select an activity to start your learning guided by the Wise Tree:"
    }
};

// ==========================================
// 1. Generador de Hojas Animadas (Fondo Calmo)
// ==========================================
function setupFallingLeaves() {
    const container = document.getElementById("leaf-container");
    const leafCount = 15;
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement("div");
        leaf.classList.add("leaf");
        
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.animationDuration = `${12 + Math.random() * 10}s`;
        leaf.style.animationDelay = `${Math.random() * 8}s`;
        leaf.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
        
        const greenHue = 120 + Math.floor(Math.random() * 30);
        leaf.style.backgroundColor = `hsla(${greenHue}, 60%, 50%, 0.12)`;
        
        container.appendChild(leaf);
    }
}

// ==========================================
// 2. Control de Idioma y Renderizado Dinámico
// ==========================================
function updateLanguageUI() {
    const t = translations[state.locale];
    
    // Textos de landing
    document.getElementById("hero-title").innerText = t.heroTitle;
    document.getElementById("hero-subtitle").innerText = t.heroSubtitle;
    document.getElementById("cta-play-now").innerText = t.ctaPlayNow;
    document.getElementById("cta-note-el").innerText = t.ctaNote;
    document.getElementById("donar-nav-btn").innerText = t.donarNavBtn;
    
    const pcLabel = document.getElementById("pc-mode-label");
    if (pcLabel) {
        pcLabel.innerText = state.locale === "es" ? "💻 Modo PC" : "💻 PC Mode";
    }
    
    const loginBtn = document.getElementById("login-nav-btn");
    if (loginBtn) {
        if (state.isRegistered) {
            loginBtn.innerText = state.locale === "es" ? `🚪 Salir (${state.childName})` : `🚪 Sign Out (${state.childName})`;
        } else {
            loginBtn.innerText = t.loginNavBtn;
        }
    }
    
    // Actividad libre
    document.getElementById("play-badge-el").innerText = t.playBadge;
    document.getElementById("play-section-title").innerText = t.playSectionTitle;
    document.getElementById("play-section-desc").innerText = t.playSectionDesc;
    document.getElementById("speaker-lbl").innerText = t.speakerLbl;
    document.getElementById("play-free-voice").innerText = t.playFreeVoiceBtn;
    if (!state.firstActivityCompleted) {
        document.getElementById("free-activity-voice").innerText = t.freeActivityVoice;
    }
    
    // Mundos
    document.getElementById("worlds-title").innerText = t.worldsTitle;
    document.getElementById("worlds-desc").innerText = t.worldsDesc;
    
    // QR
    document.getElementById("qr-title").innerText = t.qrTitle;
    document.getElementById("qr-desc").innerText = t.qrDesc;
    document.getElementById("target-voice-label").innerText = t.targetVoiceLabel;
    document.getElementById("play-target-audio").innerText = t.playTargetAudioBtn;
    document.getElementById("camera-status").innerText = t.cameraStatus;
    
    // Voces
    document.getElementById("voice-title").innerText = t.voiceTitle;
    document.getElementById("voice-desc").innerText = t.voiceDesc;
    
    // Acordeón de info
    document.getElementById("info-section-title").innerText = t.infoSectionTitle;
    document.getElementById("info-section-desc").innerText = t.infoSectionDesc;
    document.getElementById("accordion-head-1").querySelector("span:first-child").innerText = t.accordionHeader1;
    document.getElementById("accordion-text-1").innerText = t.accordionText1;
    document.getElementById("accordion-head-2").querySelector("span:first-child").innerText = t.accordionHeader2;
    document.getElementById("accordion-text-2").innerText = t.accordionText2;
    document.getElementById("accordion-head-3").querySelector("span:first-child").innerText = t.accordionHeader3;
    document.getElementById("accordion-text-3").innerText = t.accordionText3;
    document.getElementById("accordion-head-4").querySelector("span:first-child").innerText = t.accordionHeader4;
    document.getElementById("accordion-text-4").innerText = t.accordionText4;
    
    // Donación
    document.getElementById("mission-title").innerText = t.missionTitle;
    document.getElementById("mission-body-1").innerHTML = t.missionBody1.replace("Yarumito es y será siempre 100% libre de lucro y gratuito.", "<strong>Yarumito es y será siempre 100% libre de lucro y gratuito.</strong>");
    document.getElementById("mission-body-2").innerText = t.missionBody2;
    document.getElementById("donations-card-title").innerText = t.donationsCardTitle;
    document.getElementById("donate-submit-btn").innerText = t.donateSubmitBtn;
    document.getElementById("donation-impact-lbl").innerText = t.impactLabels[state.selectedDonationAmount];
    
    // Modal de registro
    document.querySelector("#register-modal .modal-header h2").innerText = t.modalTitle;
    document.getElementById("modal-subtitle-el").innerText = t.modalSubtitle;
    document.getElementById("modal-desc-el").innerText = t.modalDesc;
    document.getElementById("label-name").innerText = t.labelName;
    document.getElementById("label-email").innerText = t.labelEmail;
    document.getElementById("label-role").innerText = t.labelRole;
    document.getElementById("label-privacy").innerText = t.labelPrivacy;
    document.getElementById("btn-register-submit").innerText = t.btnRegisterSubmit;
    
    // Modal de actividades
    document.getElementById("act-modal-title").innerText = t.actModalTitle;
    document.getElementById("act-modal-desc").innerText = t.actModalDesc;

    // QR Simulator
    if (state.targetNumber === 3) {
        document.getElementById("instruction-text").innerText = t.instructionText;
    } else {
        document.getElementById("instruction-text").innerText = state.locale === "es" ? 
            `Busca el número ${state.targetNumber} y escanéalo.` : `Find number ${state.targetNumber} and scan it.`;
    }
    
    const scanButtons = document.querySelectorAll(".scan-option-btn");
    scanButtons.forEach(btn => {
        const payload = btn.getAttribute("data-payload");
        const number = payload.split("/").pop();
        btn.innerText = `${t.scanBtnPrefix} [${number}]`;
    });
    
    // Traducir Botones de la Barra de Navegación
    document.getElementById("nav-landing-btn").innerText = state.locale === "es" ? "🏠 Inicio" : "🏠 Home";
    document.getElementById("nav-game-btn").innerText = state.locale === "es" ? "🎮 Mi Árbol" : "🎮 My Tree";
    document.getElementById("nav-blog-btn").innerText = state.locale === "es" ? "📰 Blog" : "📰 Blog";
    
    // Traducir Sección de Propósito e Información Pedagógica (Acerca de)
    document.getElementById("about-purpose-title").innerText = state.locale === "es" ? "Un espacio seguro diseñado para la neurodiversidad" : "A safe space designed for neurodiversity";
    document.getElementById("about-purpose-desc").innerText = state.locale === "es" ? 
        "Yarumito está especialmente dirigido a niños con dificultades de aprendizaje y neurodiversidad (TDAH, Autismo, Dislexia, Discalculia). El motor pedagógico evalúa la interacción cognitiva de manera dinámica, ignorando la edad cronológica para adaptarse 100% al ritmo del niño mediante juegos sin límites de tiempo, presiones competitivas ni penalizaciones por fallar." :
        "Yarumito is specially designed for children with learning difficulties and neurodiversity (ADHD, Autism, Dyslexia, Dyscalculia). The pedagogical engine evaluates cognitive interaction dynamically, ignoring chronological age to adapt 100% to the child's pace through games with no time limits, competitive pressures, or penalties for failing.";
    document.getElementById("about-interaction-title").innerText = state.locale === "es" ? "La tecnología y el juego físico en armonía" : "Technology and physical play in harmony";
    document.getElementById("about-interaction-desc").innerText = state.locale === "es" ? 
        "Nuestra filosofía de aprendizaje une lo mejor de la tecnología interactiva con actividades físicas fuera de pantalla para combatir el sedentarismo y la sobreestimulación visual." :
        "Our learning philosophy unites the best of interactive technology with screen-free physical activities to combat sedentary behavior and visual overstimulation.";
        
    document.getElementById("activity-type-auditory").innerText = state.locale === "es" ? "Entrenamiento Auditivo" : "Auditory Training";
    document.getElementById("activity-type-auditory-desc").innerText = state.locale === "es" ? 
        "Contar y discriminar sonidos en tiempo real (como ladridos de perritos o campanas) para fortalecer la atención." :
        "Counting and discriminating sounds in real time (like dog barks or bells) to strengthen attention span.";
    document.getElementById("activity-type-tracing").innerText = state.locale === "es" ? "Trazado Visomotor" : "Visuomotor Tracing";
    document.getElementById("activity-type-tracing-desc").innerText = state.locale === "es" ? 
        "Guiar trazos uniendo puntos en pantalla para estimular el control de la grafía y la motricidad fina." :
        "Guiding strokes by connecting dots on screen to stimulate handwriting control and fine motor skills.";
    document.getElementById("activity-type-movement").innerText = state.locale === "es" ? "Movimiento Físico" : "Physical Movement";
    document.getElementById("activity-type-movement-desc").innerText = state.locale === "es" ? 
        "Retos donde el niño salta con el móvil o explora su habitación escaneando tarjetas QR impresas en casa." :
        "Challenges where the child jumps with the mobile or explores their room scanning printed QR cards at home.";
    document.getElementById("activity-type-parental").innerText = state.locale === "es" ? "Desafíos en Familia" : "Family Challenges";
    document.getElementById("activity-type-parental-desc").innerText = state.locale === "es" ? 
        "Pausas lúdicas supervisadas fuera de la pantalla que fomentan la socialización con tutores o padres." :
        "Supervised play breaks off-screen that encourage socialization with tutors or parents.";

    // Traducir Marcador de Posición para No Registrados
    document.getElementById("unreg-title").innerText = state.locale === "es" ? "Tu Árbol de Progreso Personalizado" : "Your Personalized Progress Tree";
    document.getElementById("unreg-desc").innerText = state.locale === "es" ? 
        "Para ver el avance del Mundo 1, ver germinar tu semilla del Árbol Sabio, subir por sus hojas y desbloquear los 20 mundos de aprendizaje adaptativo, necesitas iniciar sesión o registrar una cuenta de tutor." :
        "To see the progress of World 1, watch your Wise Tree seed germinate, climb through its leaves, and unlock the 20 worlds of adaptive learning, you need to sign in or register a tutor account.";
    document.getElementById("btn-unreg-login").innerText = state.locale === "es" ? "🔑 Registrarse o Iniciar Sesión" : "🔑 Register or Sign In";
    document.getElementById("btn-unreg-back").innerText = state.locale === "es" ? "🏠 Volver al Inicio" : "🏠 Back to Home";

    // Traducir Módulo de Blog
    document.getElementById("blog-title").innerText = state.locale === "es" ? "📰 Blog de la Comunidad Yarumito" : "📰 Yarumito Community Blog";
    document.getElementById("blog-subtitle").innerText = state.locale === "es" ? 
        "Artículos sobre aprendizaje adaptativo, consejos de crianza y guías pedagógicas preparadas por expertos." :
        "Articles on adaptive learning, parenting tips, and pedagogical guides prepared by experts.";
    const btnBack = document.getElementById("btn-back-to-blog");
    if (btnBack) btnBack.innerText = state.locale === "es" ? "⬅️ Volver a los artículos" : "⬅️ Back to articles";
    const commTitle = document.getElementById("comments-section-title");
    if (commTitle) commTitle.innerText = state.locale === "es" ? "Comentarios de la Comunidad" : "Community Comments";
    const addCommTitle = document.getElementById("add-comment-title");
    if (addCommTitle) addCommTitle.innerText = state.locale === "es" ? "Escribe tu comentario" : "Write your comment";
    const nameInput = document.getElementById("comment-author-name");
    if (nameInput) nameInput.placeholder = state.locale === "es" ? "Tu Nombre / Apodo" : "Your Name / Nickname";
    const emailInput = document.getElementById("comment-author-email");
    if (emailInput) emailInput.placeholder = state.locale === "es" ? "Tu Correo (No se publica)" : "Your Email (Not published)";
    const textInput = document.getElementById("comment-text-content");
    if (textInput) textInput.placeholder = state.locale === "es" ? "Comparte tus ideas, experiencias o preguntas sobre este artículo..." : "Share your ideas, experiences, or questions about this article...";

    // Traducir Formulario de Reporte de Actividad
    const toggleFbBtn = document.getElementById("btn-toggle-feedback");
    if (toggleFbBtn) toggleFbBtn.innerText = state.locale === "es" ? "⚠️ Reportar error o sugerencia" : "⚠️ Report error or suggestion";
    const fbHeader = document.querySelector("#feedback-report-box h4");
    if (fbHeader) fbHeader.innerText = state.locale === "es" ? "Reportar problema / Recomendación" : "Report issue / Recommendation";
    const fbForm = document.getElementById("activity-feedback-form");
    if (fbForm) {
        fbForm.querySelector("label[for='feedback-type']").innerText = state.locale === "es" ? "Tipo de reporte" : "Report type";
        fbForm.querySelector("label[for='feedback-desc']").innerText = state.locale === "es" ? "Descripción" : "Description";
        fbForm.querySelector("textarea").placeholder = state.locale === "es" ? "Cuéntanos qué falló o qué sugieres..." : "Tell us what failed or what you suggest...";
        fbForm.querySelector("button[type='submit']").innerText = state.locale === "es" ? "Enviar reporte" : "Submit report";
        const optMal = fbForm.querySelector("option[value='malfuncionamiento']");
        if (optMal) optMal.innerText = state.locale === "es" ? "❌ Mal funcionamiento (Error visual/audio)" : "❌ Malfunction (Visual/audio error)";
        const optRec = fbForm.querySelector("option[value='recomendacion']");
        if (optRec) optRec.innerText = state.locale === "es" ? "💡 Recomendación / Sugerencia pedagógica" : "💡 Recommendation / Pedagogical suggestion";
    }
    const fbSuccess = document.getElementById("feedback-report-success");
    if (fbSuccess) fbSuccess.innerText = state.locale === "es" ? "¡Muchas gracias! Tu reporte ha sido guardado." : "Thank you so much! Your report has been saved.";

    // Re-renderizar mundos y catálogo con el nuevo idioma
    renderWorldsShowcase();
    renderAudioCatalogList();
    
    // Si ya está registrado, re-renderizar la zona de juego
    if (state.isRegistered) {
        renderProgressTree();
        renderActiveActivity();
    }
}

// ==========================================
// 3. Renderizar los 20 Mundos & Bloqueos
// ==========================================
function renderWorldsShowcase() {
    const container = document.getElementById("worlds-grid-container");
    if (!container) return;
    
    container.innerHTML = "";
    const list = worldsData[state.locale];
    const t = translations[state.locale];
    
    list.forEach(world => {
        const card = document.createElement("div");
        card.classList.add("world-card");
        
        // El Mundo 2 se desbloquea si el niño completa al menos 8 actividades del Mundo 1
        const isWorldUnlocked = world.num === 1 || 
            (world.num === 2 && (state.worldProgress[1] >= 8 || world.unlocked)) || 
            (world.num > 2 && (state.worldProgress[world.num - 1] >= 8 || world.unlocked));
        
        if (!isWorldUnlocked) {
            card.classList.add("locked");
        }
        
        card.innerHTML = `
            <div class="world-card-header">
                <div class="world-num-tag">Mundo ${world.num}</div>
                <button class="card-voice-btn" data-title="${world.title}" data-desc="${world.desc}" title="Escuchar">🔊</button>
            </div>
            <h3>${world.title}</h3>
            <p>${world.desc}</p>
            ${isWorldUnlocked ? 
                `<div class="lock-container" style="color:var(--color-green)"><span class="lock-label">${t.unlockedLabel}</span></div>` : 
                `<div class="lock-container"><span class="lock-label">${t.lockedLabel}</span><span class="lock-icon">🔒</span></div>`
            }
        `;
        
        // Listener del botón de voz (Accesibilidad)
        card.querySelector(".card-voice-btn").addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar abrir el modal o tirar error de bloqueo
            const title = e.currentTarget.getAttribute("data-title");
            const desc = e.currentTarget.getAttribute("data-desc");
            speakText(`${title}. ${desc}`);
        });

        // Listener para abrir Mundo o dar alerta en Mundos bloqueados
        card.addEventListener("click", () => {
            if (isWorldUnlocked) {
                state.currentWorld = world.num;
                state.currentActivityIndex = state.worldProgress[world.num] || 0;
                saveLocalState();
                
                renderProgressTree();
                renderActiveActivity();
                
                renderWorldActivities();
                document.getElementById("world-activities-modal").classList.add("active");
                
                const worldData = worldsData[state.locale].find(w => w.num === world.num);
                const voiceTitle = state.locale === "es" ? 
                    `Actividades de ${worldData ? worldData.title : `Mundo ${world.num}`}` :
                    `Activities for ${worldData ? worldData.title : `World ${world.num}`}`;
                speakText(voiceTitle);
            } else {
                speakText(t.lockedWarning);
                alert(t.lockedWarning);
            }
        });
        
        container.appendChild(card);
    });
}

// ==========================================
// 3b. Modal de Actividades detalladas del Mundo Seleccionado
// ==========================================
function renderWorldActivities() {
    const container = document.getElementById("activities-grid-container");
    if (!container) return;
    
    // Actualizar dinámicamente el título del modal
    const modalTitle = document.getElementById("act-modal-title");
    if (modalTitle) {
        const worldData = worldsData[state.locale].find(w => w.num === state.currentWorld);
        modalTitle.innerText = state.locale === "es" ? 
            `🎮 Actividades: ${worldData ? worldData.title : `Mundo ${state.currentWorld}`}` : 
            `🎮 Activities: ${worldData ? worldData.title : `World ${state.currentWorld}`}`;
    }
    
    container.innerHTML = "";
    const activities = getActiveActivities();
    
    activities.forEach((act, idx) => {
        const actCard = document.createElement("div");
        actCard.classList.add("activity-card");
        
        // Se desbloquean secuencialmente: sólo si su índice es <= al progreso actual del mundo
        const isActUnlocked = idx <= state.currentActivityIndex;
        if (!isActUnlocked) {
            actCard.style.opacity = "0.5";
        }
        
        actCard.innerHTML = `
            <div class="activity-card-info">
                <div class="activity-card-title-row">
                    <span class="activity-card-icon">${act.icon}</span>
                    <span class="activity-card-title">${act.title}</span>
                </div>
                <span class="activity-card-desc">${act.desc}</span>
            </div>
            <div class="activity-card-controls">
                <button class="card-voice-btn mini-speak-btn" data-text="${act.title}. ${act.desc}">🔊</button>
                ${isActUnlocked ? 
                    `<button class="activity-card-play-btn" data-idx="${idx}">▶</button>` : 
                    `<span>🔒</span>`
                }
            </div>
        `;
        
        // Listener de altavoz
        actCard.querySelector(".mini-speak-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            speakText(e.currentTarget.getAttribute("data-text"));
        });
        
        // Listener de Play
        if (isActUnlocked) {
            actCard.querySelector(".activity-card-play-btn").addEventListener("click", (e) => {
                const targetIdx = parseInt(e.currentTarget.getAttribute("data-idx"));
                document.getElementById("world-activities-modal").classList.remove("active");
                
                // Si aún no está registrado, forzar el modal de registro primero
                if (!state.isRegistered) {
                    document.getElementById("register-modal").classList.add("active");
                    return;
                }
                
                // Activar la Zona de Juego
                state.currentActivityIndex = targetIdx;
                saveLocalState();
                
                document.getElementById("game-play-zone").style.display = "block";
                document.getElementById("jugar-section").style.display = "none";
                document.getElementById("game-play-zone").scrollIntoView();
                
                renderProgressTree();
                renderActiveActivity();
            });
        }
        
        container.appendChild(actCard);
    });
}

// ==========================================
// 4. Servicio e Integración de Audio
// ==========================================
function playAudio(code) {
    const url = `${API_BASE_URL}/static/audio/${state.locale}/${code}.mp3`;
    const audio = new Audio(url);
    
    audio.play().catch(err => {
        console.warn(`[AudioPlayer] Fallback TTS para código: ${code}`);
        fallbackSpeechSynthesis(code);
    });
}

function speakText(text) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.locale === "es" ? "es-ES" : "en-US";
    utterance.rate = typeof state.voiceSpeed === "number" ? state.voiceSpeed : 0.85;
    
    if (state.voiceName) {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.name === state.voiceName);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
    }
    
    window.speechSynthesis.speak(utterance);
}

function fallbackSpeechSynthesis(code) {
    const item = state.audioCatalog.find(a => a.code === code);
    if (!item) return;
    
    const text = item.translations[state.locale];
    if (!text) return;
    speakText(text);
}

async function loadAudioCatalog() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/voice-catalog`);
        if (!response.ok) throw new Error("Catalog load failed");
        const data = await response.json();
        state.audioCatalog = data.audios;
        console.log("[YarumitoAPI] Voces cargadas del servidor.");
    } catch (error) {
        console.warn("[YarumitoAPI] API desconectada. Usando voces locales.");
        state.audioCatalog = [
            { "code": "GEN_SI", "translations": {"es": "Sí.", "en": "Yes."}, "description": "Afirmación simple" },
            { "code": "GEN_NO", "translations": {"es": "No.", "en": "No."}, "description": "Negación simple" },
            { "code": "GEN_BIEN_HECHO", "translations": {"es": "¡Muy bien hecho! ¡Lo lograste!", "en": "Well done! You did it!"}, "description": "Felicitación por acierto" },
            { "code": "GEN_INTENTALO_OTRA_VEZ", "translations": {"es": "Casi lo tienes. Vamos a intentarlo otra vez.", "en": "Close. Let's try again."}, "description": "Ánimo tras error" },
            { "code": "W1_QR_BUSCAR_3", "translations": {"es": "¡Vamos a buscar! Encuentra el número 3 escondido en la habitación y escanéalo con tu cámara.", "en": "Let's explore! Find number 3 hidden in the room and scan it."}, "description": "Instrucción QR 3" },
            { "code": "W1_QR_ERROR_ASOCIACION_3", "translations": {"es": "¡Oh, has encontrado otro número! Es muy bonito, pero ahora estamos buscando el número 3. ¡Sigue buscando!", "en": "Oh, you found a different number! We are looking for number 3. Keep searching!"}, "description": "Error QR 3" }
        ];
    }
    renderAudioCatalogList();
}

function renderAudioCatalogList() {
    const listContainer = document.getElementById("audio-list-container");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    state.audioCatalog.forEach(audio => {
        const text = audio.translations[state.locale] || "";
        const itemEl = document.createElement("div");
        itemEl.classList.add("audio-item");
        
        itemEl.innerHTML = `
            <div class="audio-info">
                <span class="audio-code-tag">${audio.code}</span>
                <div class="audio-text">"${text}"</div>
                <div class="audio-desc">${audio.description}</div>
            </div>
            <button class="play-round-btn" data-code="${audio.code}">▶</button>
        `;
        
        listContainer.appendChild(itemEl);
    });
    
    const playButtons = listContainer.querySelectorAll(".play-round-btn");
    playButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            playAudio(btn.getAttribute("data-code"));
        });
    });
}

// ==========================================
// 4b. Telemetría de Errores para Investigadores
// ==========================================
async function logTelemetryError(activityId, targetValue, selectedValue, reason) {
    const data = {
        child_name: state.childName,
        activity_id: activityId,
        target_value: String(targetValue),
        scanned_or_clicked: String(selectedValue),
        error_reason: reason
    };
    console.warn(`[YarumitoTelemetry] Registrando error del niño en el servidor:`, data);
    try {
        await fetch(`${API_BASE_URL}/api/telemetry/error`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error("[YarumitoTelemetry] El backend está desconectado. Guardado en logs locales del navegador.", err);
    }
}

// ==========================================
// 5. Lógica del Primer Reto Gratis (Juego Libre)
// ==========================================
function setupFreeActivity() {
    document.getElementById("play-free-voice").addEventListener("click", () => {
        if (!state.firstActivityCompleted) {
            speakText(translations[state.locale].freeActivityVoice);
        } else {
            playAudio("GEN_BIEN_HECHO");
        }
    });

    const optButtons = document.querySelectorAll(".number-opt-btn");
    const feedbackBox = document.getElementById("free-activity-feedback");

    optButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const selectedNum = parseInt(e.currentTarget.getAttribute("data-num"));
            
            if (selectedNum === 3) {
                state.firstActivityCompleted = true;
                feedbackBox.className = "activity-result success";
                feedbackBox.innerHTML = state.locale === "es" ? 
                    "🎉 ¡Excelente! Encontraste el número 3 y despertaste la semilla." : 
                    "🎉 Great! You found number 3 and awakened the seed.";
                
                playAudio("GEN_BIEN_HECHO");
                
                setTimeout(() => {
                    document.getElementById("register-modal").classList.add("active");
                    // Indicación por voz directa al niño para que pida ayuda a sus padres
                    const childPrompt = state.locale === "es" ? 
                        "¡Excelente trabajo! Has despertado a la pequeña semilla. Pídele ayuda a tu papá, mamá o acudiente para registrarse y guardar tu Árbol." :
                        "Excellent job! You have awakened the tiny seed. Please ask your mom, dad, or guardian to help you register and save your Tree.";
                    speakText(childPrompt);
                }, 2000);
            } else {
                feedbackBox.className = "activity-result error";
                feedbackBox.innerHTML = state.locale === "es" ? 
                    "❌ ¡Casi! Ese es otro número. Sigue escuchando al Árbol Sabio." : 
                    "❌ Close! That's another number. Keep listening to the Wise Tree.";
                
                playAudio("GEN_INTENTALO_OTRA_VEZ");
                
                // Registro local de error
                logTelemetryError("FREE_CHALLENGE", 3, selectedNum, "Asociación numérica errónea en reto inicial libre.");
            }
        });
    });
}

// ==========================================
// 6. Simulación QR
// ==========================================
async function simulateQRScan(scannedPayload) {
    const feedbackBox = document.getElementById("scan-feedback-box");
    feedbackBox.className = "simulation-feedback";
    feedbackBox.innerHTML = state.locale === "es" ? "Procesando código..." : "Processing code...";
    
    let result;
    try {
        const url = `${API_BASE_URL}/api/verify-qr?target_number=${state.targetNumber}&scanned_payload=${encodeURIComponent(scannedPayload)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API verification failed");
        result = await response.json();
    } catch (err) {
        const match = scannedPayload.match(/(\d+)$/);
        const scannedNum = match ? parseInt(match[1]) : null;
        
        if (scannedNum === state.targetNumber) {
            result = { success: true, target_number: state.targetNumber, scanned_number: scannedNum, audio_code: "GEN_BIEN_HECHO" };
        } else {
            result = { success: false, target_number: state.targetNumber, scanned_number: scannedNum, audio_code: "GEN_INTENTALO_OTRA_VEZ" };
        }
    }
    
    if (result.success) {
        feedbackBox.className = "simulation-feedback success";
        feedbackBox.innerHTML = `
            <div>🎉 ${state.locale === "es" ? "¡ENCONTRADO!" : "FOUND!"}</div>
            <div class="feedback-details">${state.locale === "es" ? "Escaneaste correctamente el número " : "You correctly scanned number "}${result.scanned_number}</div>
        `;
        playAudio(result.audio_code);
        
        setTimeout(() => {
            state.targetNumber = state.targetNumber === 3 ? 5 : 3;
            updateLanguageUI();
            feedbackBox.className = "simulation-feedback idle";
            feedbackBox.innerHTML = state.locale === "es" ? "Listo para escanear otra tarjeta..." : "Ready to scan another card...";
        }, 4000);
    } else {
        feedbackBox.className = "simulation-feedback error";
        feedbackBox.innerHTML = `
            <div>❌ ${state.locale === "es" ? "¡CÓDIGO EQUIVOCADO!" : "WRONG CARD!"}</div>
            <div class="feedback-details">${state.locale === "es" ? "Encontraste el número " : "You found number "}${result.scanned_number} ${state.locale === "es" ? "pero buscamos el " : "but we want "}${result.target_number}</div>
        `;
        playAudio(result.audio_code);
    }
}

// ==========================================
// 7. Configuración de Acordeón
// ==========================================
function setupAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", (e) => {
            const item = e.currentTarget.parentElement;
            const content = item.querySelector(".accordion-content");
            const icon = item.querySelector(".accordion-icon");
            
            const isActive = item.classList.contains("active");
            
            document.querySelectorAll(".accordion-item").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".accordion-content").style.maxHeight = null;
                el.querySelector(".accordion-icon").innerText = "➕";
            });
            
            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = `${content.scrollHeight}px`;
                icon.innerText = "➖";
            }
        });
    });
}

// ==========================================
// 8. Control de Modales y Registro / Log In
// ==========================================
function setupModales() {
    const regModal = document.getElementById("register-modal");
    const registerForm = document.getElementById("tutor-register-form");
    const loginForm = document.getElementById("tutor-login-form");
    const tabRegister = document.getElementById("tab-register-btn");
    const tabLogin = document.getElementById("tab-login-btn");
    
    const modalSubtitle = document.getElementById("modal-subtitle-el");
    const modalDesc = document.getElementById("modal-desc-el");

    // Conmutador de Pestañas (Registrarse vs Continuar)
    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        registerForm.style.display = "flex";
        loginForm.style.display = "none";
        
        modalSubtitle.style.display = "block";
        modalDesc.style.display = "block";
        speakText(state.locale === "es" ? "Crear cuenta nueva" : "Create new account");
    });
    
    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        registerForm.style.display = "none";
        loginForm.style.display = "flex";
        
        modalSubtitle.style.display = "none";
        modalDesc.style.display = "none";
        speakText(state.locale === "es" ? "Ingresa tu correo para continuar tu progreso" : "Enter email to resume progress");
    });

    // Configuración de los botones de avatares en el modal
    const avatarButtons = document.querySelectorAll(".avatar-opt-btn");
    const avatarInput = document.getElementById("selected-avatar-input");
    
    avatarButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            avatarButtons.forEach(b => b.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            
            const avatar = target.getAttribute("data-avatar");
            avatarInput.value = avatar;
            state.childAvatar = avatar;
            
            speakText(avatar === "🦊" ? "¡Zorro!" : avatar === "🐻" ? "¡Oso!" : avatar === "🐰" ? "¡Conejo!" : "¡León!");
        });
    });

    // Cerrar modal
    document.getElementById("close-modal-btn").addEventListener("click", () => {
        regModal.classList.remove("active");
    });
    regModal.addEventListener("click", (e) => {
        if (e.target === regModal) regModal.classList.remove("active");
    });

    // Evento del botón de la cabecera (Iniciar/Cerrar Sesión)
    const headerLoginBtn = document.getElementById("login-nav-btn");
    if (headerLoginBtn) {
        headerLoginBtn.addEventListener("click", () => {
            if (state.isRegistered) {
                // Cerrar Sesión
                state.isRegistered = false;
                state.childName = "James";
                state.childAvatar = "🦊";
                state.currentActivityIndex = 0;
                state.currentWorld = 1;
                state.worldProgress = {
                    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
                    11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
                };
                state.firstActivityCompleted = false;
                
                localStorage.removeItem("yarumito_logged_email");
                localStorage.removeItem("yarumito_state");
                
                // Redireccionar a la landing page
                showPage("landing");
                
                // Resetear el feedback de la actividad libre
                const feedbackBox = document.getElementById("free-activity-feedback");
                if (feedbackBox) feedbackBox.innerHTML = "";
                
                // Restaurar la visualización inicial de la actividad libre
                const freeActVoice = document.getElementById("free-activity-voice");
                if (freeActVoice) {
                    const t = translations[state.locale];
                    freeActVoice.innerText = t.freeActivityVoice;
                }
                
                // Desplazar al inicio
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                updateLanguageUI();
                
                const logoutMsg = state.locale === "es" ? 
                    "Has cerrado sesión. ¡Adiós! Regresa pronto." : 
                    "You have signed out. Goodbye! Come back soon.";
                speakText(logoutMsg);
            } else {
                // Iniciar Sesión (Abrir modal en la pestaña de Login)
                regModal.classList.add("active");
                tabLogin.click();
            }
        });
    }

    // Procesar Registro de Tutor
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const tutorName = document.getElementById("tutor-name").value;
        const tutorEmail = document.getElementById("tutor-email").value.trim().toLowerCase();
        const childName = document.getElementById("child-name").value;
        const avatar = avatarInput.value;
        
        // Guardar en mapa global de usuarios en localStorage
        const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
        users[tutorEmail] = {
            tutorName: tutorName,
            childName: childName,
            childAvatar: avatar,
            currentActivityIndex: 0,
            currentWorld: 1,
            worldProgress: {
                1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
                11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
            }
        };
        localStorage.setItem("yarumito_users", JSON.stringify(users));
        localStorage.setItem("yarumito_logged_email", tutorEmail);
        
        state.childName = childName;
        state.childAvatar = avatar;
        state.isRegistered = true;
        state.currentActivityIndex = 0; 
        state.currentWorld = 1;
        state.worldProgress = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
            11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
        };
        saveLocalState();
        
        const cardBody = regModal.querySelector(".modal-body");
        cardBody.style.textAlign = "center";
        cardBody.innerHTML = `
            <div class="modal-graphic">${avatar}</div>
            <h2>¡Registro Completo, ${childName}!</h2>
            <p style="margin-top:10px; color:var(--text-muted)">Hemos creado la cuenta del tutor y tu avatar está listo en la raíz del árbol para iniciar tu aventura.</p>
            <button class="donate-btn" id="start-ecosystem-btn" style="margin-top:20px; max-width:260px">Entrar al Ecosistema</button>
        `;
        
        document.getElementById("start-ecosystem-btn").addEventListener("click", () => {
            regModal.classList.remove("active");
            
            // Mostrar interfaz de juego activo
            showPage("game");
            
            // Actualizar datos del badge de perfil
            document.getElementById("child-badge-avatar").innerText = state.childAvatar;
            document.getElementById("child-badge-name").innerText = state.childName;
            
            // Desplazar a la zona de juego
            document.getElementById("game-play-zone").scrollIntoView();
            
            // Inicializar juego y árbol
            renderProgressTree();
            renderActiveActivity();
            
            const welcomeMsg = state.locale === "es" ? 
                `¡Hola ${state.childName}! Bienvenido a tu árbol de progreso. Vamos a empezar con la primera actividad.` : 
                `Hello ${state.childName}! Welcome to your progress tree. Let's start with the first activity.`;
            speakText(welcomeMsg);
        });
    });

    // Procesar Inicio de Sesión (Continuar Progreso)
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById("login-tutor-email").value.trim().toLowerCase();
        
        const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
        
        if (users[loginEmail]) {
            const user = users[loginEmail];
            
            // Cargar datos en el estado
            state.childName = user.childName;
            state.childAvatar = user.childAvatar;
            state.currentWorld = user.currentWorld || 1;
            state.worldProgress = user.worldProgress || {
                1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
                11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
            };
            state.currentActivityIndex = typeof state.worldProgress[state.currentWorld] === "number" ? state.worldProgress[state.currentWorld] : 0;
            state.isRegistered = true;
            state.firstActivityCompleted = true;
            
            localStorage.setItem("yarumito_logged_email", loginEmail);
            saveLocalState();
            
            regModal.classList.remove("active");
            
            // Mostrar interfaz de juego activo
            showPage("game");
            
            // Renderizar datos del perfil
            document.getElementById("child-badge-avatar").innerText = state.childAvatar;
            document.getElementById("child-badge-name").innerText = state.childName;
            
            // Desplazar a la zona de juego
            document.getElementById("game-play-zone").scrollIntoView();
            
            // Re-renderizar interfaces
            renderProgressTree();
            renderActiveActivity();
            renderWorldsShowcase();
            
            const resumeMsg = state.locale === "es" ? 
                `¡Hola otra vez ${state.childName}! Qué alegría verte de nuevo. Continuamos en la actividad ${state.currentActivityIndex + 1}.` : 
                `Hello again ${state.childName}! Great to see you again. Resuming at activity ${state.currentActivityIndex + 1}.`;
            speakText(resumeMsg);
        } else {
            const errorMsg = state.locale === "es" ? 
                "El correo ingresado no tiene un progreso registrado. ¡Regístrate gratis primero!" : 
                "The email entered has no registered progress. Sign up free first!";
            alert(errorMsg);
            speakText(errorMsg);
        }
    });

    // Modal de Actividades de Mundo 1
    const actModal = document.getElementById("world-activities-modal");
    document.getElementById("close-activities-modal-btn").addEventListener("click", () => {
        actModal.classList.remove("active");
    });
    actModal.addEventListener("click", (e) => {
        if (e.target === actModal) actModal.classList.remove("active");
    });
}

// ==========================================
// 9. Lógica de Caja de Donaciones
// ==========================================
function setupDonations() {
    const donButtons = document.querySelectorAll(".don-opt-btn");
    const impactLbl = document.getElementById("donation-impact-lbl");
    
    donButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            donButtons.forEach(b => b.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            
            const amount = parseInt(target.getAttribute("data-amount"));
            state.selectedDonationAmount = amount;
            
            impactLbl.innerText = translations[state.locale].impactLabels[amount];
        });
    });
    
    document.getElementById("donate-submit-btn").addEventListener("click", () => {
        alert(state.locale === "es" ? 
            `¡Muchas gracias por tu intención de donar $${state.selectedDonationAmount} USD! Redireccionando a la pasarela de pagos segura...` :
            `Thank you so much for donating $${state.selectedDonationAmount} USD! Redirecting to secure payment gateway...`
        );
    });
}

// ==========================================
// 9b. Datos y Lógica del Blog de Comunidad
// ==========================================
const blogPosts = {
    es: [
        {
            id: "post_1",
            title: "La Neurodiversidad en el Aprendizaje Infantil",
            tag: "Pedagogía",
            date: "2026-08-01",
            desc: "Descubre cómo Yarumito ignora la edad cronológica para adaptarse al ritmo cognitivo individual de cada niño.",
            content: `
                <p>El cerebro infantil se desarrolla de formas diversas. Para los niños con TDAH, autismo o dificultades específicas del aprendizaje, los métodos de evaluación tradicionales basados en exámenes rígidos pueden resultar estresantes y sumamente desmotivadores.</p>
                <p>En Yarumito, eliminamos las presiones competitivas. Nuestra plataforma utiliza la inteligencia artificial no para calificar ni juzgar, sino para construir un andamiaje educativo suave y motivador adaptado a cada perfil único.</p>
                <blockquote>La neurodiversidad no es un trastorno que deba corregirse en un aula rígida, sino un ritmo de aprendizaje natural que debe ser acompañado y respetado con amor y paciencia.</blockquote>
                <p>Al centrar la interacción en entradas múltiples (audio, voz, tacto) y respetar el tiempo del niño, logramos una experiencia que previene la frustración y promueve el amor por el conocimiento.</p>
            `,
            defaultComments: [
                { author: "Ana Ramos", text: "Excelente iniciativa. El hecho de que adapte el ritmo a niños neurodivergentes es un alivio para nosotros los padres.", date: "2026-08-01 14:32" },
                { author: "Dr. Roberto Silva", text: "Como terapeuta, aprecio mucho el andamiaje progresivo sin puntuaciones negativas. ¡Buen trabajo!", date: "2026-08-02 09:12" }
            ]
        },
        {
            id: "post_2",
            title: "El Poder de los Retos Físicos y Sensoriales",
            tag: "Juego Activo",
            date: "2026-07-28",
            desc: "La importancia de combinar la pantalla con el movimiento. ¿Por qué incluimos saltos y búsqueda de códigos QR?",
            content: `
                <p>Pasar demasiado tiempo frente a una pantalla inmóvil puede ser perjudicial para el desarrollo motor de los niños. Por eso Yarumito fomenta el juego activo y la exploración del entorno físico.</p>
                <p>A través de actividades híbridas como saltar físicamente o buscar tarjetas con códigos QR en la habitación, logramos que la tecnología sirva como un puente hacia el movimiento y la interacción familiar real.</p>
                <p>Los estudios demuestran que la actividad física ligera activa áreas prefrontales del cerebro que facilitan la concentración y retención de conceptos lógicos y numéricos.</p>
            `,
            defaultComments: [
                { author: "Carlos Gómez", text: "A mi hija le encantó saltar con el teléfono. Se divirtió mucho buscando los números en la sala.", date: "2026-07-29 11:20" }
            ]
        },
        {
            id: "post_3",
            title: "Guía para Padres: Acompañamiento sin Pantallas",
            tag: "Familia",
            date: "2026-07-15",
            desc: "Ideas prácticas para continuar el aprendizaje de Yarumito en la vida cotidiana de tu hogar.",
            content: `
                <p>El aprendizaje adaptativo no termina cuando se apaga la tablet o la computadora. Como familias, podemos integrar dinámicas de conteo y fonética en las actividades cotidianas del hogar.</p>
                <p>Esta guía te brinda consejos sencillos: desde contar manzanas mientras preparan la cena, contar escalones al subir, hasta asociar sonidos de la naturaleza al caminar por el parque.</p>
                <blockquote>Integrar el juego numérico en la rutina diaria refuerza las conexiones neuronales de manera orgánica y divertida.</blockquote>
            `,
            defaultComments: [
                { author: "Lucía Fernández", text: "Los consejos para contar escalones en casa nos sirvieron mucho esta semana. ¡Gracias por la guía!", date: "2026-07-16 16:45" }
            ]
        }
    ],
    en: [
        {
            id: "post_1",
            title: "Neurodiversity in Early Childhood Learning",
            tag: "Pedagogy",
            date: "2026-08-01",
            desc: "Discover how Yarumito ignores chronological age to adapt to the individual cognitive pace of each child.",
            content: `
                <p>The child's brain develops in diverse ways. For children with ADHD, autism, or specific learning difficulties, traditional rigid testing methods can be stressful and highly demotivating.</p>
                <p>At Yarumito, we eliminate competitive pressure. Our platform uses artificial intelligence not to grade or judge, but to build a gentle and motivating educational scaffolding tailored to each unique profile.</p>
                <blockquote>Neurodiversity is not a disorder to be corrected, but a natural pace of learning that must be accompanied and respected with love and patience.</blockquote>
                <p>By centering interaction on multiple inputs (audio, voice, touch) and respecting the child's timing, we achieve an experience that prevents frustration and promotes a love for learning.</p>
            `,
            defaultComments: [
                { author: "Ann Ramos", text: "Excellent initiative. Adapting to neurodivergent kids' pace is a huge relief for us parents.", date: "2026-08-01 14:32" },
                { author: "Dr. Robert Silva", text: "As a therapist, I highly appreciate the progressive scaffolding without negative scores. Good job!", date: "2026-08-02 09:12" }
            ]
        },
        {
            id: "post_2",
            title: "The Power of Physical and Sensory Challenges",
            tag: "Active Play",
            date: "2026-07-28",
            desc: "The importance of combining screens with physical movement. Why do we include jumping and QR card searches?",
            content: `
                <p>Spending too much time in front of an immobile screen can be harmful to children's motor development. That is why Yarumito encourages active play and physical exploration.</p>
                <p>Through hybrid activities like physically jumping or searching for printed QR cards in the room, we make technology serve as a bridge to physical movement and real family interaction.</p>
                <p>Studies show that light physical activity activates prefrontal brain areas that facilitate concentration and retention of logical and mathematical concepts.</p>
            `,
            defaultComments: [
                { author: "Charles Gomez", text: "My daughter loved jumping with the phone. She had a lot of fun searching for numbers in the living room.", date: "2026-07-29 11:20" }
            ]
        },
        {
            id: "post_3",
            title: "Parent Guide: Screen-Free Accompaniment",
            tag: "Family",
            date: "2026-07-15",
            desc: "Practical ideas to continue Yarumito's learning in the daily life of your home.",
            content: `
                <p>Adaptive learning does not end when the tablet or computer is turned off. As families, we can integrate counting and phonics into daily household routines.</p>
                <p>This guide gives you simple tips: from counting apples while cooking dinner, counting steps while climbing, to associating nature sounds while walking in the park.</p>
                <blockquote>Integrating number play into daily routines reinforces neural connections in an organic and fun way.</blockquote>
            `,
            defaultComments: [
                { author: "Lucy Fernandez", text: "The tips for counting steps at home were super helpful this week. Thanks for the guide!", date: "2026-07-16 16:45" }
            ]
        }
    ]
};

// --- NAVEGACIÓN Y CAMBIO DE PÁGINAS ---
function showPage(pageId) {
    const sections = {
        landing: [
            document.querySelector(".hero-section"),
            document.getElementById("jugar-section"),
            document.getElementById("about-yarumito-section"),
            document.querySelector(".expandable-info"),
            document.getElementById("donar-section"),
            document.querySelector(".two-column-layout")
        ],
        game: [
            document.getElementById("game-placeholder-zone"),
            document.getElementById("game-play-zone"),
            document.querySelector(".worlds-showcase")
        ],
        blog: [
            document.getElementById("blog-section")
        ]
    };

    // Ocultar todas las secciones
    Object.values(sections).flat().forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    // Desactivar botones visuales del navbar
    document.querySelectorAll(".nav-link-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Mostrar las secciones correspondientes a la página seleccionada
    if (pageId === "landing") {
        document.getElementById("nav-landing-btn").classList.add("active");
        
        // Mostrar elementos de landing
        sections.landing.forEach(sec => {
            if (sec) {
                // El juego libre se oculta si ya se registró
                if (sec.id === "jugar-section" && state.isRegistered) {
                    sec.style.display = "none";
                } else {
                    sec.style.display = "block";
                }
            }
        });
    } else if (pageId === "game") {
        document.getElementById("nav-game-btn").classList.add("active");
        
        if (state.isRegistered) {
            // Mostrar interfaz de juego activo
            const playZone = document.getElementById("game-play-zone");
            const showcase = document.querySelector(".worlds-showcase");
            if (playZone) playZone.style.display = "block";
            if (showcase) showcase.style.display = "block";
            
            // Renderizar dinámicamente según el estado actual cargado
            renderProgressTree();
            renderActiveActivity();
            renderWorldsShowcase();
        } else {
            // Mostrar placeholder de registro requerido
            const placeholder = document.getElementById("game-placeholder-zone");
            if (placeholder) placeholder.style.display = "block";
        }
    } else if (pageId === "blog") {
        document.getElementById("nav-blog-btn").classList.add("active");
        const blogSec = document.getElementById("blog-section");
        if (blogSec) {
            blogSec.style.display = "block";
            renderBlogList();
        }
    }
    
    // Hacer scroll arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
    document.getElementById("nav-landing-btn").addEventListener("click", () => showPage("landing"));
    document.getElementById("nav-game-btn").addEventListener("click", () => showPage("game"));
    document.getElementById("nav-blog-btn").addEventListener("click", () => showPage("blog"));
    
    // Botones del placeholder de no registrado
    document.getElementById("btn-unreg-login").addEventListener("click", () => {
        const modal = document.getElementById("register-modal");
        if (modal) modal.classList.add("active");
    });
    document.getElementById("btn-unreg-back").addEventListener("click", () => showPage("landing"));
}

function setupVoiceSettings() {
    const modal = document.getElementById("voice-settings-modal");
    const openBtn = document.getElementById("btn-voice-settings");
    const closeBtn = document.getElementById("close-voice-settings-btn");
    const voiceSelect = document.getElementById("voice-select");
    const speedSlider = document.getElementById("voice-speed-slider");
    const speedVal = document.getElementById("voice-speed-val");
    const testBtn = document.getElementById("btn-test-voice");

    if (!modal || !openBtn || !closeBtn || !voiceSelect || !speedSlider || !speedVal || !testBtn) return;

    // Abrir/Cerrar Modal
    openBtn.addEventListener("click", () => {
        modal.classList.add("active");
        populateVoicesList();
    });
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    // Función para poblar la lista de voces
    const populateVoicesList = () => {
        const voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = "";
        
        // Filtrar voces del idioma actual (español o inglés)
        const currentLocalePrefix = state.locale === "es" ? "es" : "en";
        const filtered = voices.filter(v => v.lang.startsWith(currentLocalePrefix));
        
        // Identificar voces femeninas por nombres populares
        const femaleKeywords = [
            "samantha", "zira", "hazel", "sabina", "helena", "helen", "hilda", "daria", 
            "francisca", "paolina", "laura", "alba", "susan", "karen", "moira", "tessa", 
            "fiona", "veena", "elena", "female", "mujer", "rosa", "maria", "soledad"
        ];
        
        // Clasificar y ordenar: primero voces femeninas, luego el resto
        const listWithGender = filtered.map(voice => {
            const isFemale = femaleKeywords.some(kw => voice.name.toLowerCase().includes(kw));
            return { voice, isFemale };
        });
        
        // Ordenar poniendo las femeninas arriba
        listWithGender.sort((a, b) => b.isFemale - a.isFemale);
        
        if (listWithGender.length === 0) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.innerText = state.locale === "es" ? "Voz por defecto del sistema" : "System default voice";
            voiceSelect.appendChild(opt);
            return;
        }

        listWithGender.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.voice.name;
            
            const badge = item.isFemale ? 
                (state.locale === "es" ? "👩 Voz Femenina" : "👩 Female Voice") : 
                (state.locale === "es" ? "👤 Voz" : "👤 Voice");
                
            opt.innerText = `${item.voice.name} (${item.voice.lang}) - ${badge}`;
            
            if (state.voiceName === item.voice.name) {
                opt.selected = true;
            }
            voiceSelect.appendChild(opt);
        });

        // Si no hay ninguna voz seleccionada previamente en state, elegir la primera (que será femenina si existe)
        if (!state.voiceName && voiceSelect.options.length > 0) {
            state.voiceName = voiceSelect.options[0].value;
            saveLocalState();
        }
    };

    // Chrome carga las voces asíncronamente
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoicesList;
    }
    populateVoicesList();

    // Actualizar voz seleccionada
    voiceSelect.addEventListener("change", (e) => {
        state.voiceName = e.target.value;
        saveLocalState();
    });

    // Controlar Slider de velocidad
    speedSlider.value = state.voiceSpeed;
    speedVal.innerText = `${state.voiceSpeed.toFixed(2)}x`;
    
    speedSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        state.voiceSpeed = val;
        speedVal.innerText = `${val.toFixed(2)}x`;
        saveLocalState();
    });

    // Probar voz
    testBtn.addEventListener("click", () => {
        const testText = state.locale === "es" ? 
            "Hola, soy tu amigo el Árbol Sabio. Esta es mi voz de aprendizaje." : 
            "Hello, I am your friend the Wise Tree. This is my learning voice.";
        speakText(testText);
    });
}

function showGameFeedbackMsg(msg, type) {
    const feedbackIds = ["count-feedback", "sound-feedback", "arena-game-feedback", "sort-progress-msg"];
    feedbackIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = msg;
            if (type === "warning") {
                el.style.color = "var(--color-orange)";
            } else if (type === "error") {
                el.style.color = "var(--color-heart)";
            } else {
                el.style.color = "var(--color-green)";
            }
        }
    });
}

function handleWrongAttempt(gameType, data, onShuffle) {
    if (typeof state.wrongAttempts !== "number") {
        state.wrongAttempts = 0;
    }
    state.wrongAttempts++;
    
    if (state.wrongAttempts === 1) {
        // Primer fallo: aviso de "Ten cuidado"
        const msg = state.locale === "es" ? "Ten cuidado. Inténtalo otra vez." : "Be careful. Try again.";
        speakText(msg);
        showGameFeedbackMsg(msg, "warning");
        playAudio("GEN_INTENTALO_OTRA_VEZ");
    } else if (state.wrongAttempts === 2) {
        // Segundo fallo: reordenar y avisar que cambiaron
        const msg = state.locale === "es" ? "Ten cuidado, las opciones han cambiado." : "Be careful, options have changed.";
        speakText(msg);
        showGameFeedbackMsg(msg, "warning");
        playAudio("GEN_INTENTALO_OTRA_VEZ");
        if (typeof onShuffle === "function") {
            onShuffle();
        }
    } else if (state.wrongAttempts >= 3) {
        // Tercer fallo: retroceder a la actividad anterior
        state.wrongAttempts = 0;
        
        const prevIdx = Math.max(0, state.currentActivityIndex - 1);
        const msg = state.locale === "es" ? 
            "Vamos a repasar la actividad anterior para hacerlo mejor." : 
            "Let's review the previous activity to do it better.";
            
        speakText(msg);
        showGameFeedbackMsg(msg, "error");
        
        // Desactivar temporalmente los botones para evitar clicks durante la transición
        document.querySelectorAll(".number-opt-btn, .sound-opt-btn, .sort-card-btn").forEach(btn => {
            btn.disabled = true;
        });
        
        setTimeout(() => {
            state.currentActivityIndex = prevIdx;
            state.worldProgress[state.currentWorld] = state.currentActivityIndex;
            state.currentTreePage = Math.floor(state.currentActivityIndex / 10);
            
            const loggedEmail = localStorage.getItem("yarumito_logged_email");
            if (loggedEmail) {
                const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
                if (users[loggedEmail]) {
                    if (!users[loggedEmail].worldProgress) {
                        users[loggedEmail].worldProgress = {};
                    }
                    users[loggedEmail].worldProgress[state.currentWorld] = state.currentActivityIndex;
                    users[loggedEmail].currentActivityIndex = state.currentActivityIndex;
                    localStorage.setItem("yarumito_users", JSON.stringify(users));
                }
            }
            
            saveLocalState();
            renderProgressTree();
            renderActiveActivity();
        }, 3000);
    }
}

// --- MÓDULO DEL BLOG ---
function renderBlogList() {
    const listContainer = document.getElementById("blog-list-view");
    const detailContainer = document.getElementById("blog-detail-view");
    const grid = document.getElementById("blog-posts-grid");
    
    if (!grid || !listContainer || !detailContainer) return;
    
    listContainer.style.display = "block";
    detailContainer.style.display = "none";
    grid.innerHTML = "";
    
    const posts = blogPosts[state.locale];
    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("blog-card");
        card.innerHTML = `
            <span class="blog-card-tag">${post.tag}</span>
            <h3 class="blog-card-title">${post.title}</h3>
            <span style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px; font-weight:500;">📅 ${post.date}</span>
            <p class="blog-card-desc">${post.desc}</p>
            <button class="blog-card-btn" data-id="${post.id}">${state.locale === "es" ? "Leer Artículo ➔" : "Read Article ➔"}</button>
        `;
        
        card.querySelector(".blog-card-btn").addEventListener("click", (e) => {
            const postId = e.currentTarget.getAttribute("data-id");
            showBlogPost(postId);
        });
        
        grid.appendChild(card);
    });
}

function showBlogPost(postId) {
    const listContainer = document.getElementById("blog-list-view");
    const detailContainer = document.getElementById("blog-detail-view");
    const content = document.getElementById("blog-article-content");
    
    if (!listContainer || !detailContainer || !content) return;
    
    const posts = blogPosts[state.locale];
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    listContainer.style.display = "none";
    detailContainer.style.display = "block";
    
    content.innerHTML = `
        <span class="blog-card-tag">${post.tag}</span>
        <h2 style="font-size: 2.2rem; font-weight: 900; color:var(--text-main); line-height:1.2; margin-top:10px;">${post.title}</h2>
        <div class="blog-article-meta">
            <span>📅 ${post.date}</span>
            <span>👤 Yarumito Team</span>
        </div>
        <div class="blog-article-body">
            ${post.content}
        </div>
    `;
    
    // Configurar el formulario de comentarios
    loadBlogComments(postId);
    
    const form = document.getElementById("blog-comment-submit-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const author = document.getElementById("comment-author-name").value.trim();
        const email = document.getElementById("comment-author-email").value.trim();
        const text = document.getElementById("comment-text-content").value.trim();
        
        if (author && text) {
            saveBlogComment(postId, author, email, text);
            form.reset();
        }
    };
    
    document.getElementById("btn-back-to-blog").onclick = () => {
        renderBlogList();
    };
}

function loadBlogComments(postId) {
    const list = document.getElementById("blog-comments-list");
    if (!list) return;
    list.innerHTML = "";
    
    // Cargar comentarios locales
    const localComments = JSON.parse(localStorage.getItem("yarumito_blog_comments") || "{}");
    const postComments = localComments[postId] || [];
    
    // Si no hay comentarios locales, cargar los por defecto del post
    const posts = blogPosts[state.locale];
    const post = posts.find(p => p.id === postId);
    const defaults = post ? post.defaultComments : [];
    
    const allComments = [...defaults, ...postComments];
    
    if (allComments.length === 0) {
        list.innerHTML = `<p style="font-style:italic; color:var(--text-muted); font-size:0.9rem;">${state.locale === "es" ? "Sé el primero en comentar..." : "Be the first to comment..."}</p>`;
        return;
    }
    
    allComments.forEach(comment => {
        const item = document.createElement("div");
        item.classList.add("blog-comment-item");
        item.innerHTML = `
            <div class="blog-comment-header">
                <span class="blog-comment-author">👤 ${comment.author}</span>
                <span>${comment.date}</span>
            </div>
            <p class="blog-comment-text">${comment.text}</p>
        `;
        list.appendChild(item);
    });
    list.scrollTop = list.scrollHeight;
}

function saveBlogComment(postId, author, email, text) {
    const localComments = JSON.parse(localStorage.getItem("yarumito_blog_comments") || "{}");
    if (!localComments[postId]) {
        localComments[postId] = [];
    }
    
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    localComments[postId].push({ author, text, date: formattedDate });
    localStorage.setItem("yarumito_blog_comments", JSON.stringify(localComments));
    
    // Recargar la lista
    loadBlogComments(postId);
}

// --- REPORTE DE ERRORES/SUGERENCIAS DE ACTIVIDAD ---
function setupActivityFeedback() {
    const toggleBtn = document.getElementById("btn-toggle-feedback");
    const reportBox = document.getElementById("feedback-report-box");
    const form = document.getElementById("activity-feedback-form");
    const successMsg = document.getElementById("feedback-report-success");
    
    if (!toggleBtn || !reportBox || !form) return;
    
    // Toggle abrir/cerrar caja de reporte
    toggleBtn.addEventListener("click", () => {
        const isHidden = reportBox.style.display === "none";
        reportBox.style.display = isHidden ? "block" : "none";
        successMsg.style.display = "none";
        form.reset();
    });
    
    // Submit del reporte
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const type = document.getElementById("feedback-type").value;
        const desc = document.getElementById("feedback-desc").value.trim();
        
        const activities = getActiveActivities();
        const activeAct = activities[state.currentActivityIndex] || { id: "unknown", title: "Actividad General" };
        
        const report = {
            id: `report_${Date.now()}`,
            childName: state.childName,
            activityIndex: state.currentActivityIndex,
            activityId: activeAct.id || "W1_ACT",
            activityTitle: activeAct.title,
            type,
            desc,
            date: new Date().toISOString()
        };
        
        // Guardar en LocalStorage
        const allReports = JSON.parse(localStorage.getItem("yarumito_activity_reports") || "[]");
        allReports.push(report);
        localStorage.setItem("yarumito_activity_reports", JSON.stringify(allReports));
        
        // Mock enviar reporte a la API Central (en segundo plano)
        fetch(`${API_BASE_URL}/api/report-malfunction`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report)
        }).catch(err => console.warn("API Central fuera de línea. Reporte guardado localmente.", err));
        
        // Mostrar mensaje de éxito y resetear formulario
        form.reset();
        successMsg.style.display = "block";
        
        setTimeout(() => {
            reportBox.style.display = "none";
            successMsg.style.display = "none";
        }, 3000);
    });
}

// ==========================================
// 10. Persistencia Local
// ==========================================
function saveLocalState() {
    localStorage.setItem("yarumito_state", JSON.stringify({
        isRegistered: state.isRegistered,
        childName: state.childName,
        childAvatar: state.childAvatar,
        currentActivityIndex: state.currentActivityIndex,
        firstActivityCompleted: state.firstActivityCompleted,
        pcMode: state.pcMode,
        voiceName: state.voiceName,
        voiceSpeed: state.voiceSpeed,
        currentWorld: state.currentWorld,
        worldProgress: state.worldProgress
    }));
}

function loadLocalState() {
    const dataStr = localStorage.getItem("yarumito_state");
    if (!dataStr) return;
    try {
        const local = JSON.parse(dataStr);
        state.isRegistered = local.isRegistered || false;
        state.childName = local.childName || "James";
        state.childAvatar = local.childAvatar || "🦊";
        state.firstActivityCompleted = local.firstActivityCompleted || false;
        state.pcMode = local.pcMode || false;
        state.voiceName = local.voiceName || "";
        state.voiceSpeed = typeof local.voiceSpeed === "number" ? local.voiceSpeed : 0.85;
        state.currentWorld = local.currentWorld || 1;
        state.worldProgress = local.worldProgress || {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
            11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0
        };
        state.currentActivityIndex = typeof state.worldProgress[state.currentWorld] === "number" ? state.worldProgress[state.currentWorld] : 0;
        state.currentTreePage = Math.floor(state.currentActivityIndex / 10);
        
        const pcCheck = document.getElementById("pc-mode-check");
        if (pcCheck) {
            pcCheck.checked = state.pcMode;
        }
        
        if (state.isRegistered) {
            document.getElementById("jugar-section").style.display = "none";
            document.getElementById("game-play-zone").style.display = "block";
            document.getElementById("child-badge-avatar").innerText = state.childAvatar;
            document.getElementById("child-badge-name").innerText = state.childName;
        }
    } catch (e) {
        console.error("Error cargando estado local", e);
    }
}

// ==========================================
// 11. Motor del Árbol de Progreso
// ==========================================
function renderProgressTree() {
    const pathContainer = document.getElementById("progress-tree-path");
    if (!pathContainer) return;
    
    pathContainer.innerHTML = "";
    const activities = getActiveActivities();
    const totalActs = activities.length;
    const totalPages = Math.ceil(totalActs / 10);
    
    // Validar que la página del árbol esté dentro de rangos
    if (state.currentTreePage >= totalPages) {
        state.currentTreePage = Math.max(0, totalPages - 1);
    }
    if (state.currentTreePage < 0) {
        state.currentTreePage = 0;
    }
    
    // Obtener las 10 actividades de la página actual
    const startIndex = state.currentTreePage * 10;
    const endIndex = Math.min(totalActs, startIndex + 10);
    const pageActs = activities.slice(startIndex, endIndex);
    
    // Generar las hojas con posicionamiento dinámico y espacioso (máximo 10 hojas por pantalla)
    pageActs.forEach((act, localIdx) => {
        const globalIdx = startIndex + localIdx;
        const leaf = document.createElement("div");
        leaf.classList.add("tree-leaf-node");
        leaf.setAttribute("data-idx", globalIdx);
        leaf.innerText = globalIdx + 1;
        
        // Posicionamiento dinámico adaptable de 10% a 88% vertical para máxima amplitud
        const N = pageActs.length;
        const bottomPct = 10 + (localIdx / Math.max(1, N - 1)) * 78;
        leaf.style.bottom = `${bottomPct}%`;
        
        if (globalIdx % 2 === 0) {
            leaf.style.left = "24%";
            leaf.style.right = "auto";
            leaf.style.borderRadius = "50% 0 50% 0";
        } else {
            leaf.style.right = "24%";
            leaf.style.left = "auto";
            leaf.style.borderRadius = "0 50% 0 50%";
        }
        
        // Asignar clases de estado
        if (globalIdx < state.currentActivityIndex) {
            leaf.classList.add("completed");
            leaf.title = `${act.title} (${state.locale === "es" ? "Completado" : "Completed"})`;
        } else if (globalIdx === state.currentActivityIndex) {
            leaf.classList.add("active");
            leaf.title = `${act.title} (${state.locale === "es" ? "Jugando" : "Playing"})`;
        } else {
            leaf.classList.add("locked");
            leaf.title = `${act.title} (${state.locale === "es" ? "Bloqueado" : "Locked"})`;
        }
        
        // Clicar una hoja ya completada o activa permite saltar a ella
        leaf.addEventListener("click", () => {
            if (globalIdx <= state.currentActivityIndex) {
                state.currentActivityIndex = globalIdx;
                state.currentTreePage = Math.floor(globalIdx / 10);
                saveLocalState();
                renderProgressTree();
                renderActiveActivity();
            } else {
                speakText(state.locale === "es" ? "Completa las actividades anteriores primero." : "Complete the previous activities first.");
            }
        });
        
        pathContainer.appendChild(leaf);
    });
    
    // Crear el Avatar Escalador
    const marker = document.createElement("div");
    marker.id = "child-avatar-marker";
    marker.classList.add("child-avatar-marker");
    marker.innerText = state.childAvatar;
    pathContainer.appendChild(marker);
    
    // Colocar el avatar sobre la hoja activa con transiciones si está en la página actual
    setTimeout(() => {
        const activeNode = pathContainer.querySelector(`.tree-leaf-node[data-idx="${state.currentActivityIndex}"]`);
        if (activeNode) {
            marker.style.display = "flex";
            const isLeft = activeNode.style.left && activeNode.style.left !== "auto" && activeNode.style.left !== "";
            marker.style.left = isLeft ? activeNode.style.left : "auto";
            marker.style.right = isLeft ? "auto" : activeNode.style.right;
            marker.style.bottom = activeNode.style.bottom;
            marker.style.transform = `translate(${isLeft ? "-50%" : "50%"}, -85%) scaleX(${isLeft ? 1 : -1})`;
        } else {
            marker.style.display = "none";
        }
    }, 100);
    
    // Actualizar controles de paginación/carrusel del árbol
    const prevBtn = document.getElementById("btn-tree-prev");
    const nextBtn = document.getElementById("btn-tree-next");
    const indicator = document.getElementById("tree-page-indicator");
    
    if (indicator) {
        indicator.innerText = state.locale === "es" ? 
            `Etapa ${state.currentTreePage + 1} de ${totalPages}` : 
            `Stage ${state.currentTreePage + 1} of ${totalPages}`;
    }
    if (prevBtn) {
        prevBtn.disabled = state.currentTreePage === 0;
        prevBtn.onclick = () => {
            if (state.currentTreePage > 0) {
                state.currentTreePage--;
                renderProgressTree();
            }
        };
    }
    if (nextBtn) {
        nextBtn.disabled = state.currentTreePage === totalPages - 1;
        nextBtn.onclick = () => {
            if (state.currentTreePage < totalPages - 1) {
                state.currentTreePage++;
                renderProgressTree();
            }
        };
    }
    
    // Actualizar el estado del badge y del árbol guía (Wise Tree Stage)
    document.getElementById("child-badge-status").innerText = state.locale === "es" ? 
        `¡Actividad ${Math.min(totalActs, state.currentActivityIndex + 1)} de ${totalActs}!` : 
        `Activity ${Math.min(totalActs, state.currentActivityIndex + 1)} of ${totalActs}!`;
        
    const treeIcon = document.getElementById("wise-tree-stage-icon");
    if (state.currentActivityIndex >= totalActs) {
        treeIcon.innerText = "🌳"; 
    } else if (state.currentActivityIndex >= Math.floor(totalActs * 0.75)) {
        treeIcon.innerText = "🌲"; 
    } else if (state.currentActivityIndex >= Math.floor(totalActs * 0.5)) {
        treeIcon.innerText = "🌿"; 
    } else if (state.currentActivityIndex >= Math.floor(totalActs * 0.25)) {
        treeIcon.innerText = "🌱"; 
    } else {
        treeIcon.innerText = "🌰"; 
    }
}

// ==========================================
// 12. Motor de Arena de Juego (Los 8 Mini-juegos)
// ==========================================
function renderActiveActivity() {
    const arena = document.getElementById("active-activity-box");
    if (!arena) return;
    
    // Actualizar el título del mundo activo en la interfaz
    const titleLabel = document.getElementById("game-zone-title-label");
    if (titleLabel) {
        const worldData = worldsData[state.locale].find(w => w.num === state.currentWorld);
        titleLabel.innerText = state.locale === "es" ? 
            `🎮 Arena de Juego Activo - ${worldData ? worldData.title : `Mundo ${state.currentWorld}`}` :
            `🎮 Active Game Arena - ${worldData ? worldData.title : `World ${state.currentWorld}`}`;
    }
    
    // Si completó todas las actividades del mundo actual
    const activities = getActiveActivities();
    const totalActs = activities.length;
    if (state.currentActivityIndex >= totalActs) {
        renderGrandFinale(arena);
        return;
    }
    
    const act = activities[state.currentActivityIndex];
    arena.innerHTML = `
        <div class="arena-game-header">
            <div class="arena-game-info">
                <span class="arena-game-icon">${act.icon}</span>
                <div>
                    <div class="arena-game-title">${act.title}</div>
                    <div class="arena-game-desc">${act.desc}</div>
                </div>
            </div>
            <button class="card-voice-btn" id="arena-instruction-voice-btn" title="Escuchar">🔊</button>
        </div>
        <div class="arena-game-body" id="arena-game-body-container" style="width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1;">
            <!-- Contenido dinámico del juego individual -->
        </div>
        <div class="activity-result" id="arena-game-feedback" style="margin-top:10px;"></div>
    `;
    
    const speakInstruction = () => {
        const text = state.locale === "es" ? 
            `Mundo ${state.currentWorld}. Actividad ${state.currentActivityIndex + 1}. ${act.title}. ${act.desc}` : 
            `World ${state.currentWorld}. Activity ${state.currentActivityIndex + 1}. ${act.title}. ${act.desc}`;
        speakText(text);
    };
    
    document.getElementById("arena-instruction-voice-btn").addEventListener("click", speakInstruction);
    
    // Cargar el mini-juego correspondiente
    setupMiniGame(state.currentActivityIndex);
    
    setTimeout(speakInstruction, 800);
}

const motivationMessages = {
    es: [
        "¡Buen trabajo!",
        "¡Lo estás logrando!",
        "¡Genial!",
        "¡Súper!",
        "¡Eres increíble!",
        "¡Excelente!",
        "¡Lo hiciste muy bien!",
        "¡Sigue así!"
    ],
    en: [
        "Good job!",
        "You are doing it!",
        "Great!",
        "Super!",
        "You are amazing!",
        "Excellent!",
        "You did so well!",
        "Keep it up!"
    ]
};

function completeCurrentActivity() {
    const feedback = document.getElementById("arena-game-feedback");
    if (!feedback) return;
    
    feedback.className = "activity-result success";
    
    // Seleccionar mensaje motivacional aleatorio
    const msgs = motivationMessages[state.locale];
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    
    feedback.innerHTML = `🎉 ${randomMsg} ${state.locale === "es" ? "¡El Árbol Sabio crece!" : "The Wise Tree grows!"}`;
    
    // Reproducir la voz de felicitación corta
    speakText(randomMsg);
    
    // Producir un sonido de éxito dinámico (chime de campana) mediante Web Audio
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
        console.warn("Fallo al reproducir audio de éxito", e);
    }
    
    setTimeout(() => {
        state.currentActivityIndex++;
        state.worldProgress[state.currentWorld] = state.currentActivityIndex;
        state.currentTreePage = Math.floor(state.currentActivityIndex / 10);
        
        // Guardar progreso en el mapa de usuarios local de localStorage
        const loggedEmail = localStorage.getItem("yarumito_logged_email");
        if (loggedEmail) {
            const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
            if (users[loggedEmail]) {
                if (!users[loggedEmail].worldProgress) {
                    users[loggedEmail].worldProgress = {};
                }
                users[loggedEmail].worldProgress[state.currentWorld] = state.currentActivityIndex;
                users[loggedEmail].currentActivityIndex = state.currentActivityIndex;
                localStorage.setItem("yarumito_users", JSON.stringify(users));
            }
        }
        
        saveLocalState();
        renderProgressTree();
        renderActiveActivity();
        renderWorldsShowcase(); 
    }, 2800);
}

function setupMiniGame(index) {
    const container = document.getElementById("arena-game-body-container");
    if (!container) return;
    
    // Reiniciar contador de intentos incorrectos para la nueva actividad
    state.wrongAttempts = 0;
    
    const activities = getActiveActivities();
    if (index < 0 || index >= activities.length) return;
    
    const act = activities[index];
    
    switch (act.playAction) {
        case "intro":
            setupGameIntro(container, act.data.number);
            break;
        case "count_visual":
            setupGameCountVisual(container, act.data);
            break;
        case "trace":
            setupGameTrace(container, act.data.number);
            break;
        case "repeat":
            setupGameRepeat(container, act.data ? act.data.number : null);
            break;
        case "sort":
            setupGameSort(container, act.data.start, act.data.end);
            break;
        case "parent":
            setupGameParent(container, act);
            break;
        case "count_sounds":
            setupGameCountSounds(container, act.data);
            break;
        case "jump":
            setupGameJump(container, act.data.count);
            break;
        case "qr":
            setupGameQR(container, act.data.target);
            break;
        default:
            console.warn("Acción de juego desconocida:", act.playAction);
            break;
    }
}

// 1. Contar Elementos Visuales (Manzanas, estrellas, etc.)
function setupGameCountVisual(container, data, skipVoice = false) {
    const isVowelChoice = data.isVowelChoice === true;
    
    if (!skipVoice) {
        const voiceMsg = state.locale === "es" ? 
            (isVowelChoice ? `Observa el dibujo y selecciona con qué vocal comienza.` : `Cuenta cuántos elementos ves en la pantalla.`) :
            (isVowelChoice ? `Look at the picture and select the starting vowel.` : `Count how many items you see on the screen.`);
        setTimeout(() => speakText(voiceMsg), 1000);
    }
    
    const correctVal = isVowelChoice ? data.correctVowel : data.count;
    
    let uniqueOpts;
    if (isVowelChoice) {
        const vowels = ["A", "E", "I", "O", "U"];
        const others = vowels.filter(v => v !== correctVal);
        others.sort(() => Math.random() - 0.5);
        uniqueOpts = [correctVal, others[0], others[1]];
        uniqueOpts.sort(() => Math.random() - 0.5);
    } else {
        const count = data.count;
        const opts = [count, count + 1, count - 1].filter(n => n > 0);
        uniqueOpts = [...new Set(opts)];
        uniqueOpts.sort(() => Math.random() - 0.5);
    }
    
    let emojisHtml = "";
    if (!isVowelChoice) {
        for (let i = 0; i < data.count; i++) {
            emojisHtml += `<span style="font-size:3.5rem; margin:5px; display:inline-block; animation: float ${1.5 + (i * 0.2)}s infinite ease-in-out alternate;">${data.emoji}</span>`;
        }
    }
    
    container.innerHTML = `
        <div style="text-align:center; margin:15px 0; width:100%;">
            <div style="min-height:90px; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; margin-bottom:20px; background:rgba(0,0,0,0.02); padding:15px; border-radius:15px;">
                ${isVowelChoice ? `<span style="font-size:5rem; display:inline-block; animation: float 2.5s infinite ease-in-out alternate;">${data.emoji}</span>` : emojisHtml}
            </div>
            <h4 style="margin-bottom:15px; font-family:'Outfit',sans-serif; color:var(--text-main); font-weight:700;">
                ${state.locale === "es" ? 
                    (isVowelChoice ? `¿Con qué vocal empieza ${data.name}?` : `¿Cuántas ${data.name} hay?`) : 
                    (isVowelChoice ? `What vowel does ${data.name} start with?` : `How many ${data.name} are there?`)}
            </h4>
            <div style="display:flex; justify-content:center; gap:15px;">
                ${uniqueOpts.map(opt => `
                    <button class="number-opt-btn count-opt-btn" data-num="${opt}" style="width:70px; height:70px; font-size:2rem; border-radius:15px; background:white; color:var(--text-main); border:2px solid var(--text-muted); cursor:pointer; transition:all 0.2s ease; font-weight:800; font-family:'Outfit',sans-serif;">
                        ${opt}
                    </button>
                `).join("")}
            </div>
            <div id="count-feedback" style="margin-top:15px; font-weight:600; min-height:24px;"></div>
        </div>
    `;
    
    container.querySelectorAll(".count-opt-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rawVal = e.currentTarget.getAttribute("data-num");
            const num = isVowelChoice ? rawVal : parseInt(rawVal);
            
            if (num === correctVal) {
                e.currentTarget.style.background = "var(--color-pastel-green)";
                e.currentTarget.style.color = "var(--color-green)";
                e.currentTarget.style.borderColor = "var(--color-green)";
                completeCurrentActivity();
            } else {
                handleWrongAttempt("count_visual", data, () => {
                    setupGameCountVisual(container, data, true);
                });
                logTelemetryError(`W1_COUNT_VISUAL_${data.emoji}`, correctVal.toString(), num.toString(), "Error en conteo visual u opción de vocal.");
            }
        });
    });
}

// 2. Trazar/Escribir Número por Puntos
function setupGameTrace(container, number) {
    const tracePoints = {
        1: [
            { id: 1, x: 40, y: 40 },
            { id: 2, x: 50, y: 25 },
            { id: 3, x: 50, y: 75 }
        ],
        2: [
            { id: 1, x: 35, y: 35 },
            { id: 2, x: 50, y: 25 },
            { id: 3, x: 65, y: 35 },
            { id: 4, x: 35, y: 75 },
            { id: 5, x: 65, y: 75 }
        ],
        3: [
            { id: 1, x: 35, y: 30 },
            { id: 2, x: 60, y: 30 },
            { id: 3, x: 45, y: 50 },
            { id: 4, x: 60, y: 70 },
            { id: 5, x: 35, y: 70 }
        ],
        4: [
            { id: 1, x: 55, y: 25 },
            { id: 2, x: 35, y: 60 },
            { id: 3, x: 65, y: 60 },
            { id: 4, x: 55, y: 75 }
        ],
        5: [
            { id: 1, x: 60, y: 25 },
            { id: 2, x: 40, y: 25 },
            { id: 3, x: 40, y: 50 },
            { id: 4, x: 60, y: 60 },
            { id: 5, x: 35, y: 75 }
        ],
        "A": [
            { id: 1, x: 25, y: 75 },
            { id: 2, x: 50, y: 25 },
            { id: 3, x: 75, y: 75 },
            { id: 4, x: 35, y: 55 },
            { id: 5, x: 65, y: 55 }
        ],
        "E": [
            { id: 1, x: 65, y: 25 },
            { id: 2, x: 35, y: 25 },
            { id: 3, x: 35, y: 50 },
            { id: 4, x: 55, y: 50 },
            { id: 5, x: 35, y: 75 },
            { id: 6, x: 65, y: 75 }
        ],
        "I": [
            { id: 1, x: 35, y: 25 },
            { id: 2, x: 65, y: 25 },
            { id: 3, x: 50, y: 25 },
            { id: 4, x: 50, y: 75 },
            { id: 5, x: 35, y: 75 },
            { id: 6, x: 65, y: 75 }
        ],
        "O": [
            { id: 1, x: 50, y: 25 },
            { id: 2, x: 75, y: 50 },
            { id: 3, x: 50, y: 75 },
            { id: 4, x: 25, y: 50 },
            { id: 5, x: 48, y: 26 }
        ],
        "U": [
            { id: 1, x: 30, y: 25 },
            { id: 2, x: 30, y: 70 },
            { id: 3, x: 50, y: 78 },
            { id: 4, x: 70, y: 70 },
            { id: 5, x: 70, y: 25 }
        ],
        "a": [
            { id: 1, x: 60, y: 40 },
            { id: 2, x: 40, y: 40 },
            { id: 3, x: 40, y: 70 },
            { id: 4, x: 60, y: 70 },
            { id: 5, x: 60, y: 40 },
            { id: 6, x: 60, y: 75 }
        ],
        "e": [
            { id: 1, x: 35, y: 55 },
            { id: 2, x: 65, y: 55 },
            { id: 3, x: 50, y: 35 },
            { id: 4, x: 35, y: 55 },
            { id: 5, x: 50, y: 75 },
            { id: 6, x: 65, y: 65 }
        ],
        "i": [
            { id: 1, x: 50, y: 30 },
            { id: 2, x: 50, y: 45 },
            { id: 3, x: 50, y: 75 }
        ],
        "o": [
            { id: 1, x: 50, y: 40 },
            { id: 2, x: 65, y: 55 },
            { id: 3, x: 50, y: 70 },
            { id: 4, x: 35, y: 55 },
            { id: 5, x: 48, y: 41 }
        ],
        "u": [
            { id: 1, x: 35, y: 40 },
            { id: 2, x: 35, y: 65 },
            { id: 3, x: 50, y: 73 },
            { id: 4, x: 65, y: 65 },
            { id: 5, x: 65, y: 40 },
            { id: 6, x: 65, y: 75 }
        ]
    };
    
    const points = tracePoints[number] || tracePoints[1];
    let nextPointIndex = 0;
    const isVowel = typeof number === "string";
    
    const voiceMsg = state.locale === "es" ? 
        (isVowel ? `Une los puntos en orden para formar la letra ${number}.` : `Une los puntos en orden para formar el número ${number}.`) : 
        (isVowel ? `Connect the dots in order to draw letter ${number}.` : `Connect the dots in order to draw number ${number}.`);
    setTimeout(() => speakText(voiceMsg), 1000);
    
    container.innerHTML = `
        <h4 style="margin-bottom:10px; text-align:center; font-family:'Outfit',sans-serif; color:var(--text-main); font-weight:700;">
            ${state.locale === "es" ? `Sigue el orden de los puntos:` : `Follow the dot order:`}
        </h4>
        <div class="dots-drawing-container" style="position:relative; width:280px; height:240px; border:2px dashed var(--text-muted); border-radius:15px; background:white; margin:0 auto 15px; overflow:hidden;">
            <svg class="dots-svg-layer" id="dots-svg-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></svg>
            ${points.map(p => `
                <div class="dot-node ${p.id === 1 ? 'active-pulse' : ''}" style="position:absolute; left:${p.x}%; top:${p.y}%; width:36px; height:36px; border-radius:50%; background:white; border:3px solid var(--text-muted); display:flex; align-items:center; justify-content:center; font-weight:bold; cursor:pointer; z-index:10; transform:translate(-50%, -50%); transition:all 0.2s ease; font-family:'Outfit',sans-serif;" data-id="${p.id}" id="dot-${p.id}">
                    ${p.id}
                </div>
            `).join("")}
        </div>
        <div id="trace-feedback" style="font-weight:600; text-align:center; min-height:24px; color:var(--color-green);"></div>
    `;
    
    const svg = document.getElementById("dots-svg-canvas");
    
    points.forEach(p => {
        const el = document.getElementById(`dot-${p.id}`);
        if (!el) return;
        el.addEventListener("click", () => {
            if (p.id === nextPointIndex + 1) {
                el.classList.remove("active-pulse");
                el.style.background = "var(--color-pastel-green)";
                el.style.color = "var(--color-green)";
                el.style.borderColor = "var(--color-green)";
                
                if (nextPointIndex > 0) {
                    const prevP = points[nextPointIndex - 1];
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    
                    const rect = svg.getBoundingClientRect();
                    const w = rect.width || 280;
                    const h = rect.height || 240;
                    
                    line.setAttribute("x1", (prevP.x * w) / 100);
                    line.setAttribute("y1", (prevP.y * h) / 100);
                    line.setAttribute("x2", (p.x * w) / 100);
                    line.setAttribute("y2", (p.y * h) / 100);
                    line.setAttribute("stroke", "var(--color-green)");
                    line.setAttribute("stroke-width", "6");
                    line.setAttribute("stroke-linecap", "round");
                    
                    svg.appendChild(line);
                }
                
                nextPointIndex++;
                
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                osc.frequency.value = 350 + (nextPointIndex * 80);
                osc.connect(audioCtx.destination);
                osc.start();
                setTimeout(() => osc.stop(), 120);
                
                if (nextPointIndex === points.length) {
                    const traceMsg = state.locale === "es" ? 
                        (isVowel ? `¡Excelente! Letra ${number} trazada.` : `¡Excelente! Número ${number} trazado.`) : 
                        (isVowel ? `Awesome! Letter ${number} traced.` : `Awesome! Number ${number} traced.`);
                    speakText(traceMsg);
                    completeCurrentActivity();
                } else {
                    const nextDot = document.getElementById(`dot-${p.id + 1}`);
                    if (nextDot) nextDot.classList.add("active-pulse");
                }
            } else {
                handleWrongAttempt("trace", number, null);
                logTelemetryError(`W1_TRACE_${number}`, (nextPointIndex + 1).toString(), p.id.toString(), "Error secuencial al unir puntos para trazar.");
            }
        });
    });
}

// 3. Reto con Padres (Actividad fuera de pantalla)
function setupGameParent(container, act) {
    const voiceMsg = act.desc;
    setTimeout(() => speakText(voiceMsg), 1000);
    
    container.innerHTML = `
        <div style="text-align:center; padding:15px; display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%;">
            <div style="font-size:3.5rem; margin-bottom:15px; animation: float 2.5s infinite ease-in-out;">👨‍👩‍👦</div>
            <p style="font-weight:600; color:var(--text-main); font-size:1.1rem; max-width:320px; line-height:1.4; margin-bottom:20px;">
                ${act.desc}
            </p>
            <button class="donate-btn active-pulse" id="btn-parent-done" style="background:var(--color-accent); color:white; font-weight:700; padding:12px 30px; font-size:1.15rem; border-radius:25px; box-shadow:0 4px 12px rgba(22, 160, 133, 0.2);">
                ${state.locale === "es" ? "👍 ¡Listo, ya lo hice!" : "👍 Done, I did it!"}
            </button>
        </div>
    `;
    
    document.getElementById("btn-parent-done").addEventListener("click", () => {
        completeCurrentActivity();
    });
}

// 4. Contar Sonidos (Web Audio)
function setupGameCountSounds(container, data, skipVoice = false) {
    const count = data.count;
    const isVowelSpeech = data.isVowelSpeech === true;
    if (!skipVoice) {
        const voiceMsg = state.locale === "es" ? 
            (isVowelSpeech ? `Escucha con atención. Toca el megáfono y cuenta cuántas veces escuchas la letra ${data.vowel}.` : `Escucha con atención. Toca el megáfono y cuenta cuántos sonidos escuchas.`) :
            (isVowelSpeech ? `Listen carefully. Tap the megaphone and count how many times you hear letter ${data.vowel}.` : `Listen carefully. Tap the megaphone and count how many sounds you hear.`);
        setTimeout(() => speakText(voiceMsg), 1000);
    }
    
    const opts = [count, count + 1, count - 1].filter(n => n > 0);
    const uniqueOpts = [...new Set(opts)];
    uniqueOpts.sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div style="text-align:center; margin:15px 0; width:100%;">
            <button class="number-opt-btn active-pulse" id="btn-play-sounds" style="width:100px; height:100px; font-size:3rem; border-radius:50%; background:var(--color-pastel-blue); color:var(--color-accent); border:3px solid var(--color-accent); cursor:pointer; transition:all 0.3s ease; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                📢
            </button>
            <p id="sound-status" style="font-weight:600; color:var(--text-muted); margin-bottom:15px;">
                ${state.locale === "es" ? "Presiona para escuchar" : "Press to listen"}
            </p>
            <h4 style="margin-bottom:15px; font-family:'Outfit',sans-serif; color:var(--text-main); font-weight:700;">
                ${state.locale === "es" ? 
                    (isVowelSpeech ? `¿Cuántas veces escuchaste la ${data.name}?` : `¿Cuántos ${data.name} escuchaste?`) : 
                    (isVowelSpeech ? `How many times did you hear ${data.name}?` : `How many ${data.name} did you hear?`)}
            </h4>
            <div style="display:flex; justify-content:center; gap:15px;">
                ${uniqueOpts.map(opt => `
                    <button class="number-opt-btn sound-opt-btn" data-num="${opt}" style="width:70px; height:70px; font-size:2rem; border-radius:15px; background:white; color:var(--text-main); border:2px solid var(--text-muted); cursor:pointer; transition:all 0.2s ease; font-weight:800; font-family:'Outfit',sans-serif;">
                        ${opt}
                    </button>
                `).join("")}
            </div>
            <div id="sound-feedback" style="margin-top:15px; font-weight:600; min-height:24px;"></div>
        </div>
    `;
    
    const playSingleSound = (type, audioCtx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;
        
        if (type === "bark") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(380, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.22);
            gain.gain.setValueAtTime(0.38, now); // Volumen incrementado (era 0.12)
            gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === "knock") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(90, now);
            gain.gain.setValueAtTime(0.55, now); // Volumen incrementado (era 0.2)
            gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === "meow") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(650, now + 0.2);
            osc.frequency.linearRampToValueAtTime(450, now + 0.45);
            gain.gain.setValueAtTime(0.28, now); // Volumen incrementado (era 0.06)
            gain.gain.linearRampToValueAtTime(0.001, now + 0.45);
            osc.start(now);
            osc.stop(now + 0.45);
        } else if (type === "chirp") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(3000, now + 0.08);
            gain.gain.setValueAtTime(0.25, now); // Volumen incrementado (era 0.08)
            gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else {
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now);
            gain.gain.setValueAtTime(0.25, now); // Volumen incrementado (era 0.06)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
            osc.start(now);
            osc.stop(now + 0.65);
        }
    };
    
    let isPlaying = false;
    const playBtn = document.getElementById("btn-play-sounds");
    const statusText = document.getElementById("sound-status");
    
    const triggerAudioProgression = () => {
        if (isPlaying) return;
        isPlaying = true;
        
        playBtn.classList.remove("active-pulse");
        playBtn.innerText = "🔊";
        statusText.innerText = state.locale === "es" ? "Escuchando..." : "Listening...";
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let soundCount = 0;
        
        const nextSound = () => {
            if (soundCount < count) {
                if (isVowelSpeech) {
                    speakText(data.vowel);
                } else {
                    playSingleSound(data.sound, audioCtx);
                }
                soundCount++;
                setTimeout(nextSound, isVowelSpeech ? 1300 : (data.sound === "bell" ? 750 : 500));
            } else {
                isPlaying = false;
                playBtn.innerText = "📢";
                playBtn.classList.add("active-pulse");
                statusText.innerText = state.locale === "es" ? "¡Listo! Puedes repetir" : "Done! You can repeat";
            }
        };
        nextSound();
    };
    
    playBtn.addEventListener("click", triggerAudioProgression);
    
    container.querySelectorAll(".sound-opt-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const num = parseInt(e.currentTarget.getAttribute("data-num"));
            
            if (num === count) {
                e.currentTarget.style.background = "var(--color-pastel-green)";
                e.currentTarget.style.color = "var(--color-green)";
                e.currentTarget.style.borderColor = "var(--color-green)";
                completeCurrentActivity();
            } else {
                handleWrongAttempt("count_sounds", data, () => {
                    setupGameCountSounds(container, data, true);
                });
                logTelemetryError(`W1_SOUND_COUNT_${data.sound || 'vowel'}`, count.toString(), num.toString(), "Error en discriminación y conteo auditivo.");
            }
        });
    });
}

// 5. Salta y Cuenta (Reto de Movimiento / Acelerómetro)
function setupGameJump(container, count) {
    const target = count;
    let counts = 0;
    
    const voiceMsg = state.locale === "es" ? 
        `Sostén tu celular y haz un salto.` :
        `Hold your phone and make a jump.`;
    setTimeout(() => speakText(voiceMsg), 1000);
    
    container.innerHTML = `
        <div style="text-align:center; padding:15px; display:flex; flex-direction:column; align-items:center; width:100%;">
            <div id="bounce-box" style="width:90px; height:90px; background:#e67e22; border-radius:50%; margin-bottom:20px; display:flex; align-items:center; justify-content:center; color:white; font-size:2.5rem; transition: transform 0.2s; cursor:pointer;">
                🦘
            </div>
            <div id="jump-counter-lbl" style="font-size:1.8rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">0 / ${target}</div>
            <p style="font-size:0.85rem; color:var(--text-muted); max-width:280px; line-height:1.4;">
                ${state.locale === "es" ? 
                    "(Haz clic en el canguro para simular un salto del niño en PC)" : 
                    "(Click the kangaroo to simulate a child's jump on PC)"}
            </p>
        </div>
    `;
    
    const bounceBox = document.getElementById("bounce-box");
    const countLbl = document.getElementById("jump-counter-lbl");
    
    const triggerJump = () => {
        counts++;
        countLbl.innerText = `${counts} / ${target}`;
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.frequency.value = 150 + (counts * 100);
        osc.connect(audioCtx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 150);
        
        bounceBox.style.transform = "translateY(-40px) scale(1.15)";
        setTimeout(() => { bounceBox.style.transform = "none"; }, 200);
        
        if (counts >= target) {
            completeCurrentActivity();
        } else {
            speakText(`${counts}`);
        }
    };
    
    bounceBox.addEventListener("click", triggerJump);
}

// 6. Escanear Código QR
function setupGameQR(container, target) {
    const isVowel = typeof target === "string";
    const voiceMsg = state.locale === "es" ? 
        (isVowel ? `Busca el código QR impreso de la letra ${target} en la habitación.` : `Busca el código QR impreso del número ${target} en la habitación.`) :
        (isVowel ? `Search for the printed QR card of letter ${target} in the room.` : `Search for the printed QR card of number ${target} in the room.`);
    setTimeout(() => speakText(voiceMsg), 1000);
    
    const options = isVowel ? 
        [target === "E" ? "A" : "E", target, "U"] : 
        [target === 3 ? 2 : 3, target, 5];
        
    container.innerHTML = `
        <h4 style="margin-bottom:15px; text-align:center; font-family:'Outfit',sans-serif; color:var(--text-main); font-weight:700;">
            ${state.locale === "es" ? 
                (isVowel ? `Busca el QR de la letra ${target}:` : `Busca el QR del número ${target}:`) : 
                (isVowel ? `Find the QR for letter ${target}:` : `Find the QR for number ${target}:`)}
        </h4>
        <div class="simulated-camera" style="width:100%; max-width:340px; height:240px; border-radius:15px; overflow:hidden; border:3px solid var(--color-pastel-blue); background:rgba(0,0,0,0.03); margin:0 auto 15px; position:relative;">
            <div class="camera-lens" style="padding:15px; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center;">
                <div class="scanning-line" style="width:90%; height:4px; background:var(--color-heart); animation: scan 2s infinite linear; border-radius:2px;"></div>
                <span class="camera-status" style="font-size:0.85rem; font-weight:600; color:var(--text-muted); background:white; padding:4px 10px; border-radius:10px;">
                    📷 ${state.locale === "es" ? "Escaneando..." : "Scanning..."}
                </span>
                <div class="card-options" style="display:flex; gap:10px; margin-top:10px;">
                    ${options.map(opt => `
                        <button class="scan-option-btn arena-qr-btn" data-payload="yarumito://activity/${isVowel ? 'vowel' : 'number'}/${opt}">📄 [${opt}]</button>
                    `).join("")}
                </div>
            </div>
        </div>
        <div id="qr-feedback" style="text-align:center; font-weight:600; min-height:24px; color:var(--text-muted);"></div>
    `;
    
    const styleId = "scan-anim-styles";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            @keyframes scan {
                0% { transform: translateY(0); }
                50% { transform: translateY(120px); }
                100% { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.querySelectorAll(".arena-qr-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const payload = e.currentTarget.getAttribute("data-payload");
            const feedback = document.getElementById("qr-feedback");
            feedback.style.color = "var(--text-muted)";
            feedback.innerHTML = state.locale === "es" ? "Verificando QR..." : "Checking QR...";
            
            let result;
            try {
                const url = `${API_BASE_URL}/api/verify-qr?target_number=${target}&scanned_payload=${encodeURIComponent(payload)}`;
                const response = await fetch(url);
                result = await response.json();
            } catch (err) {
                const scannedValue = payload.split("/").pop();
                result = { success: scannedValue.toUpperCase() === target.toString().toUpperCase(), scanned_number: scannedValue };
            }
            
            if (result.success) {
                feedback.style.color = "var(--color-green)";
                feedback.innerHTML = state.locale === "es" ? "¡Excelente! Código QR correcto." : "Awesome! Correct QR code.";
                completeCurrentActivity();
            } else {
                handleWrongAttempt("qr", target, null);
                logTelemetryError(`W1_QR_SCAN_${target}`, target.toString(), (result.scanned_number || "").toString(), "Código QR incorrecto escaneado.");
            }
        });
    });
}





// ---- NUEVOS MINI-JUEGOS PEDAGÓGICOS ----

// 1. Introducción Secuencial de Números (1 a 10)
function setupGameIntro(container, number) {
    const isVowel = typeof number === "string";
    const vowelEmojis = {
        "A": { emoji: "✈️", wordEs: "Avión", wordEn: "Airplane" },
        "E": { emoji: "🐘", wordEs: "Elefante", wordEn: "Elephant" },
        "I": { emoji: "🏝️", wordEs: "Isla", wordEn: "Island" },
        "O": { emoji: "🐻", wordEs: "Oso", wordEn: "Bear" },
        "U": { emoji: "🍇", wordEs: "Uva", wordEn: "Grapes" }
    };
    
    const info = isVowel ? vowelEmojis[number.toUpperCase()] : null;
    const voiceMsg = state.locale === "es" ? 
        (isVowel ? `Esta es la letra ${number}. ${number} de ${info.wordEs}. ¡Tócala para escuchar!` : `Este es el número ${number}. ¡Tócalo para escuchar cómo suena!`) :
        (isVowel ? `This is letter ${number}. ${number} for ${info.wordEn}. Tap it to listen!` : `This is number ${number}. Tap it to hear its sound!`);
        
    setTimeout(() => speakText(voiceMsg), 1000);
    
    container.innerHTML = `
        <div style="text-align: center; margin: 20px 0; display:flex; flex-direction:column; align-items:center; gap:15px;">
            <button class="number-opt-btn active-pulse" id="intro-number-btn" style="width: 140px; height: 140px; font-size: 5rem; border-radius: 50%; background: var(--color-pastel-green); color: var(--color-green); border: 4px solid var(--color-green); cursor: pointer; transition: all 0.3s ease; display:flex; align-items:center; justify-content:center; font-family:'Outfit',sans-serif; font-weight:900;">
                ${number}
            </button>
            ${isVowel ? `
                <div style="text-align:center;">
                    <span style="font-size:3.5rem; display:inline-block; animation: float 2.5s infinite ease-in-out alternate;">${info.emoji}</span>
                    <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--color-green); margin-top:5px;">${state.locale === "es" ? info.wordEs : info.wordEn}</h3>
                </div>
            ` : ""}
            <p style="font-weight: 500; color: var(--text-main);">
                ${state.locale === "es" ? (isVowel ? "Presiona la letra para escuchar" : "Presiona el número para escuchar") : (isVowel ? "Press the letter to listen" : "Press the number to listen")}
            </p>
            <button class="donate-btn" id="btn-intro-continue" style="display: none; background: var(--color-green); color: white; padding: 10px 30px; font-size: 1.1rem; border-radius: 20px; box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2); max-width: 200px; font-weight:700;">
                ${state.locale === "es" ? "Continuar ➔" : "Continue ➔"}
            </button>
        </div>
    `;
    
    const btn = document.getElementById("intro-number-btn");
    const continueBtn = document.getElementById("btn-intro-continue");
    
    btn.addEventListener("click", () => {
        // Efecto de sonido (oscilador local)
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const frequencies = { "A": 440, "E": 329.63, "I": 293.66, "O": 261.63, "U": 220 };
        osc.frequency.value = isVowel ? (frequencies[number.toUpperCase()] || 440) : (300 + (number * 30));
        osc.connect(audioCtx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 200);
        
        btn.style.transform = "scale(1.2)";
        setTimeout(() => { btn.style.transform = "none"; }, 150);
        
        // Explicación de voz
        const explanation = state.locale === "es" ? 
            (isVowel ? `Letra ${number}. ${number} de ${info.wordEs}.` : `Número ${number}.`) :
            (isVowel ? `Letter ${number}. ${number} for ${info.wordEn}.` : `Number ${number}.`);
        speakText(explanation);
        
        if (continueBtn && continueBtn.style.display === "none") {
            continueBtn.style.display = "block";
            continueBtn.classList.add("active-pulse");
        }
    });
    
    continueBtn.addEventListener("click", () => {
        completeCurrentActivity();
    });
}

// 2. Actividad: Repite Conmigo
function setupGameRepeat(container, targetVowel = null) {
    const isVowelWorld = state.currentWorld === 2;
    const vowelsList = ["A", "E", "I", "O", "U"];
    const targetItem = targetVowel || (isVowelWorld ? vowelsList[Math.floor(Math.random() * 5)] : (Math.floor(Math.random() * 10) + 1));
    
    const voiceMsg = state.locale === "es" ? 
        (isVowelWorld ? `Repite conmigo: la vocal ${targetItem}. Presiona el micrófono y dila fuerte.` : `Repite conmigo: el número ${targetItem}. Presiona el micrófono y dilo fuerte.`) :
        (isVowelWorld ? `Repeat after me: vowel ${targetItem}. Press the microphone and say it out loud.` : `Repeat after me: number ${targetItem}. Press the microphone and say it out loud.`);
        
    setTimeout(() => speakText(voiceMsg), 1000);
    
    container.innerHTML = `
        <div style="text-align: center; margin: 20px 0; display:flex; flex-direction:column; align-items:center;">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-green); margin-bottom: 15px;">
                ${state.locale === "es" ? `Repite: ¡${targetItem}!` : `Repeat: ${targetItem}!`}
            </div>
            <button class="number-opt-btn active-pulse" id="mic-btn" style="width: 100px; height: 100px; font-size: 3rem; border-radius: 50%; background: var(--color-pastel-blue); color: var(--color-accent); border: 3px solid var(--color-accent); cursor: pointer; transition: all 0.3s ease; display:flex; align-items:center; justify-content:center;">
                🎤
            </button>
            <div id="mic-status" style="margin-top: 15px; font-weight: 500; color: var(--text-muted);">
                ${state.locale === "es" ? "Presiona para hablar" : "Press to talk"}
            </div>
            <div id="voice-waves" style="display: none; justify-content: center; gap: 6px; margin-top: 15px; height:45px; align-items:center;">
                <span class="wave-bar" style="width:6px; height:20px; background:var(--color-accent); border-radius:3px; animation: wave-anim 0.6s infinite ease-in-out alternate;"></span>
                <span class="wave-bar" style="width:6px; height:40px; background:var(--color-accent); border-radius:3px; animation: wave-anim 0.6s infinite ease-in-out alternate; animation-delay: 0.15s;"></span>
                <span class="wave-bar" style="width:6px; height:30px; background:var(--color-accent); border-radius:3px; animation: wave-anim 0.6s infinite ease-in-out alternate; animation-delay: 0.30s;"></span>
                <span class="wave-bar" style="width:6px; height:15px; background:var(--color-accent); border-radius:3px; animation: wave-anim 0.6s infinite ease-in-out alternate; animation-delay: 0.45s;"></span>
            </div>
        </div>
    `;
    
    const styleId = "wave-anim-styles";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            @keyframes wave-anim {
                0% { transform: scaleY(0.3); }
                100% { transform: scaleY(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const micBtn = document.getElementById("mic-btn");
    const status = document.getElementById("mic-status");
    const waves = document.getElementById("voice-waves");
    
    micBtn.addEventListener("click", () => {
        micBtn.classList.remove("active-pulse");
        waves.style.display = "flex";
        status.innerText = state.locale === "es" ? "Te escucho..." : "Listening...";
        micBtn.style.background = "#fadbd8";
        micBtn.style.color = "var(--color-heart)";
        micBtn.style.borderColor = "var(--color-heart)";
        micBtn.innerText = "🛑";
        
        setTimeout(() => {
            waves.style.display = "none";
            micBtn.innerText = "🎤";
            micBtn.style.background = "var(--color-pastel-blue)";
            micBtn.style.color = "var(--color-accent)";
            micBtn.style.borderColor = "var(--color-accent)";
            status.innerText = state.locale === "es" ? "¡Genial! Te escuché." : "Great! I heard you.";
            
            speakText(state.locale === "es" ? 
                (isVowelWorld ? `¡Te escuché fuerte y claro! Dijiste la vocal ${targetItem}. ¡Excelente trabajo!` : `¡Te escuché fuerte y claro! Dijiste el número ${targetItem}. ¡Excelente trabajo!`) : 
                (isVowelWorld ? `I heard you loud and clear! You said vowel ${targetItem}. Excellent job!` : `I heard you loud and clear! You said number ${targetItem}. Excellent job!`)
            );
            
            completeCurrentActivity();
        }, 2500);
    });
}

// 3. Actividad: Ordenar Números
function setupGameSort(container, start, end, skipVoice = false) {
    const isVowel = typeof start === "string";
    const values = [];
    if (isVowel) {
        const fullVowels = ["A", "E", "I", "O", "U"];
        const startIndex = fullVowels.indexOf(start.toUpperCase());
        const endIndex = fullVowels.indexOf(end.toUpperCase());
        for (let i = startIndex; i <= endIndex; i++) {
            values.push(fullVowels[i]);
        }
    } else {
        for (let i = start; i <= end; i++) {
            values.push(i);
        }
    }
    
    const shuffled = [...values];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    let isSorted = true;
    for (let i = 0; i < shuffled.length; i++) {
        if (shuffled[i] !== values[i]) {
            isSorted = false;
            break;
        }
    }
    if (isSorted && shuffled.length > 1) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    
    if (!skipVoice) {
        const voiceMsg = state.locale === "es" ? 
            (isVowel ? `Ordena las vocales en orden alfabético, empezando por la letra ${start}.` : `Ordena los números de menor a mayor, empezando por el número ${start}.`) : 
            (isVowel ? `Sort the vowels in alphabetical order, starting with letter ${start}.` : `Sort the numbers from smallest to largest, starting with number ${start}.`);
        setTimeout(() => speakText(voiceMsg), 1000);
    }
    
    container.innerHTML = `
        <h4 style="margin-bottom:15px; text-align:center; font-family:'Outfit',sans-serif; font-weight:700; color:var(--text-main);">
            ${state.locale === "es" ? `Toca en orden de la ${start} a la ${end}:` : `Tap in order from ${start} to ${end}:`}
        </h4>
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:10px; max-width:400px; margin: 0 auto 20px;">
            ${shuffled.map(n => `
                <button class="number-opt-btn sort-card-btn" data-num="${n}" style="width:60px; height:60px; font-size:1.8rem; border-radius:12px; background:white; color:var(--text-main); border:2px solid var(--text-muted); cursor:pointer; transition:all 0.2s ease; font-weight:700; font-family:'Outfit',sans-serif; display:flex; align-items:center; justify-content:center;">
                    ${n}
                </button>
            `).join("")}
        </div>
        <div id="sort-progress-msg" style="font-weight:600; text-align:center; min-height:24px; color:var(--color-green); font-size:1.1rem;"></div>
    `;
    
    let expectedNextIndex = 0;
    
    container.querySelectorAll(".sort-card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rawVal = e.currentTarget.getAttribute("data-num");
            const num = isVowel ? rawVal : parseInt(rawVal);
            const targetNum = values[expectedNextIndex];
            
            if (num === targetNum) {
                e.currentTarget.style.background = "var(--color-pastel-green)";
                e.currentTarget.style.color = "var(--color-green)";
                e.currentTarget.style.borderColor = "var(--color-green)";
                e.currentTarget.disabled = true;
                e.currentTarget.style.transform = "scale(0.9)";
                
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                osc.frequency.value = 400 + (expectedNextIndex * 80);
                osc.connect(audioCtx.destination);
                osc.start();
                setTimeout(() => osc.stop(), 100);
                
                expectedNextIndex++;
                
                const msgBox = document.getElementById("sort-progress-msg");
                if (expectedNextIndex < values.length) {
                    msgBox.style.color = "var(--color-green)";
                    msgBox.innerText = state.locale === "es" ? 
                        `¡Bien hecho! Ahora busca la ${values[expectedNextIndex]}` : 
                        `Well done! Now find ${values[expectedNextIndex]}`;
                } else {
                    msgBox.innerText = "";
                    completeCurrentActivity();
                }
            } else {
                handleWrongAttempt(`sort_${start}_${end}`, { start, end }, () => {
                    setupGameSort(container, start, end, true);
                });
                logTelemetryError(`W1_ACT_ORDER_${start}_${end}`, targetNum.toString(), num.toString(), "Ordenación fuera de orden.");
            }
        });
    });
}

// ---- FINAL CURRICULAR: El Árbol Sabio Frondoso ----
function renderGrandFinale(arena) {
    const totalActs = getActiveActivities().length;
    const currentWorld = state.currentWorld || 1;
    const nextWorld = currentWorld + 1;
    const nextWorldTitle = worldsData[state.locale][nextWorld - 1] ? worldsData[state.locale][nextWorld - 1].title : "";
    
    arena.innerHTML = `
        <div class="modal-graphic" style="font-size:6rem; animation: float 2.5s infinite ease-in-out;">🌳</div>
        <h2 style="color:var(--color-green); font-weight:900;">🏆 ¡Felicitaciones, ${state.childName}!</h2>
        <p style="color:var(--text-muted); max-width:400px; margin: 0 auto;">
            ${state.locale === "es" ? 
                `¡Has completado las ${totalActs} actividades del Mundo ${currentWorld}! El Árbol Sabio ha crecido fuerte y frondoso y está lleno de flores.` : 
                `You have completed all ${totalActs} activities of World ${currentWorld}! The Wise Tree has grown strong, leafy, and full of flowers.`}
        </p>
        
        ${nextWorldTitle ? `
            <div style="background:var(--color-pastel-green); border: 2px solid var(--color-green); border-radius:15px; padding:15px; margin:15px 0; font-weight:800; color:#1b5e20;">
                🔑 ${state.locale === "es" ? `MUNDO ${nextWorld} DESBLOQUEADO: ${nextWorldTitle}` : `WORLD ${nextWorld} UNLOCKED: ${nextWorldTitle}`}
            </div>
        ` : ""}
        
        <button class="register-submit-btn" id="btn-reset-progress" style="background:var(--gradient-orange); padding:12px 24px; box-shadow:0 4px 10px rgba(0,0,0,0.15)">
            ${state.locale === "es" ? `🔄 Volver a Jugar Mundo ${currentWorld}` : `🔄 Replay World ${currentWorld}`}
        </button>
    `;
    
    // Desbloquear el siguiente mundo en worldsData
    const worldList = worldsData[state.locale];
    const nextWorldObj = worldList.find(w => w.num === nextWorld);
    if (nextWorldObj) {
        nextWorldObj.unlocked = true;
    }
    
    const finalSpeech = state.locale === "es" ? 
        `¡Felicitaciones ${state.childName}! Has completado todo el Mundo ${currentWorld}. Tu Árbol Sabio ha crecido fuerte y feliz. ¡Has desbloqueado el Mundo ${nextWorld}!` :
        `Congratulations ${state.childName}! You completed all of World ${currentWorld}. Your Wise Tree has grown strong and happy. You have unlocked World ${nextWorld}!`;
    setTimeout(() => speakText(finalSpeech), 800);
    
    document.getElementById("btn-reset-progress").addEventListener("click", () => {
        state.worldProgress[currentWorld] = 0;
        state.currentActivityIndex = 0;
        state.currentTreePage = 0;
        
        // Reiniciar también en el mapa de usuarios local de localStorage
        const loggedEmail = localStorage.getItem("yarumito_logged_email");
        if (loggedEmail) {
            const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
            if (users[loggedEmail]) {
                if (!users[loggedEmail].worldProgress) {
                    users[loggedEmail].worldProgress = {};
                }
                users[loggedEmail].worldProgress[currentWorld] = 0;
                users[loggedEmail].currentActivityIndex = 0;
                localStorage.setItem("yarumito_users", JSON.stringify(users));
            }
        }
        
        saveLocalState();
        renderProgressTree();
        renderActiveActivity();
        renderWorldsShowcase();
    });
}

// ==========================================
// 14. Inicialización General
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    setupFallingLeaves();
    loadAudioCatalog();
    setupFreeActivity();
    setupAccordion();
    setupModales();
    setupDonations();
    setupNavigation();
    setupActivityFeedback();
    setupVoiceSettings();
    
    // Cargar estado guardado
    loadLocalState();
    
    // Renderizado inicial
    updateLanguageUI();
    showPage("landing");
    
    // Toggle de Idioma
    document.getElementById("lang-toggle").addEventListener("click", () => {
        state.locale = state.locale === "es" ? "en" : "es";
        updateLanguageUI();
        
        // Al cambiar de idioma, volver a renderizar por los textos
        renderProgressTree();
        renderActiveActivity();
    });
    
    // Listener del Modo PC
    const pcCheck = document.getElementById("pc-mode-check");
    if (pcCheck) {
        pcCheck.addEventListener("change", (e) => {
            state.pcMode = e.target.checked;
            saveLocalState();
            
            // Re-renderizar la progresión y actividad del Mundo 1
            renderProgressTree();
            renderActiveActivity();
            
            const activitiesGrid = document.getElementById("activities-grid-container");
            if (activitiesGrid && activitiesGrid.innerHTML !== "") {
                renderWorldActivities();
            }
        });
    }
    
    // Lector QR
    document.getElementById("play-target-audio").addEventListener("click", () => {
        playAudio(`W1_QR_BUSCAR_${state.targetNumber}`);
    });
    
    const scanButtons = document.querySelectorAll(".scan-option-btn");
    scanButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            simulateQRScan(e.currentTarget.getAttribute("data-payload"));
        });
    });
});

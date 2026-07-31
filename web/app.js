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
    currentActivityIndex: 0 // 0 a 7 (las 8 actividades de Mundo 1)
};

// Currículo de los 20 Mundos de Yarumito (Bilingüe)
const worldsData = {
    es: [
        { num: 1, title: "Números (1-10)", desc: "Iniciación al concepto numérico, formas visuales y fonemas elementales.", unlocked: true },
        { num: 2, title: "Conteo y Grupos", desc: "Aprende cardinalidad asociando grupos de frutas y animales.", unlocked: false },
        { num: 3, title: "Geometría Básica", desc: "Identifica círculos, cuadrados y triángulos en tu entorno.", unlocked: false },
        { num: 4, title: "Colores y Patrones", desc: "Clasificación cromática y seguimiento de secuencias lógicas.", unlocked: false },
        { num: 5, title: "Suma Inicial", desc: "Introduce la unión sumando manzanas caídas del árbol.", unlocked: false },
        { num: 6, title: "Resta Inicial", desc: "Aprende a restar separando y quitando elementos del nido.", unlocked: false },
        { num: 7, title: "Orientación Espacial", desc: "Conceptos de arriba/abajo e izquierda/derecha con movimiento.", unlocked: false },
        { num: 8, title: "Tamaños y Relaciones", desc: "Comparación de tamaños y relaciones de más y menos.", unlocked: false },
        { num: 9, title: "Vocales y Fonemas", desc: "Discriminación auditiva y pronunciación de las vocales básicas.", unlocked: false },
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
        { num: 2, title: "Counting & Grouping", desc: "Learn cardinality by grouping fruits and animals together.", unlocked: false },
        { num: 3, title: "Basic Geometry", desc: "Identify circles, squares, and triangles in your surroundings.", unlocked: false },
        { num: 4, title: "Colores & Patterns", desc: "Color classification and visual sequencing.", unlocked: false },
        { num: 5, title: "Intro to Addition", desc: "Introduce addition by uniting fallen apples from the tree.", unlocked: false },
        { num: 6, title: "Intro to Subtraction", desc: "Learn subtraction by taking away items from the nest.", unlocked: false },
        { num: 7, title: "Spatial Orientation", desc: "Concepts of up/down and left/right using device movement.", unlocked: false },
        { num: 8, title: "Sizes & Comparisons", desc: "Comparing sizes and relationships of more and less.", unlocked: false },
        { num: 9, title: "Vowels & Phonemes", desc: "Auditory discrimination and basic vowel pronunciation.", unlocked: false },
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

// Actividades específicas para el Mundo 1
const worldActivities = {
    es: [
        { id: "W1_ACT1", title: "Escuchar Números", icon: "👂", desc: "Asocia el sonido hablado con el número correcto en globos flotantes.", playAction: "play" },
        { id: "W1_ACT2", title: "Reconocer Siluetas", icon: "👀", desc: "Identifica el número que encaja en la sombra misteriosa.", playAction: "play" },
        { id: "W1_ACT3", title: "Tocar y Despertar", icon: "👆", desc: "Toca el número indicado para ayudar a despertar la semilla del árbol.", playAction: "freePlay" },
        { id: "W1_ACT4", title: "Trazar con Puntos", icon: "✏️", desc: "Dibuja la forma del número uniendo los puntos guías en pantalla.", playAction: "play" },
        { id: "W1_ACT5", title: "Salta y Cuenta", icon: "🦘", desc: "Sostén el móvil y salta tantas veces como diga el Árbol Sabio.", playAction: "play" },
        { id: "W1_ACT6", title: "Contar Juguetes", icon: "🍎", desc: "Coloca juguetes reales en la mesa siguiendo las instrucciones de voz.", playAction: "play" },
        { id: "W1_ACT7", title: "Reto con Padres", icon: "👨‍👩‍👦", desc: "Pregúntale a tus padres dónde hay un número y dile cuál es.", playAction: "play" },
        { id: "W1_ACT8", title: "Búsqueda con QR", icon: "📷", desc: "Busca la tarjeta del número en la habitación y escanea su código QR.", playAction: "qrScan" }
    ],
    en: [
        { id: "W1_ACT1", title: "Listen to Numbers", icon: "👂", desc: "Match the spoken sound with the correct floating balloon number.", playAction: "play" },
        { id: "W1_ACT2", title: "Recognize Silhouettes", icon: "👀", desc: "Identify the number that fits the mystery silhouette shape.", playAction: "play" },
        { id: "W1_ACT3", title: "Touch & Awaken", icon: "👆", desc: "Touch the shown number to help awaken the tree's tiny seed.", playAction: "freePlay" },
        { id: "W1_ACT4", title: "Trace the Dots", icon: "✏️", desc: "Draw the number's shape by connecting the guidelines on screen.", playAction: "play" },
        { id: "W1_ACT5", title: "Jump & Count", icon: "🦘", desc: "Hold your device and jump as many times as the Wise Tree counts.", playAction: "play" },
        { id: "W1_ACT6", title: "Count Objects", icon: "🍎", desc: "Place real toys on the table following the voice instructions.", playAction: "play" },
        { id: "W1_ACT7", title: "Parent Challenge", icon: "👨‍👩‍👦", desc: "Ask your parents where a number is in the room and tell them.", playAction: "play" },
        { id: "W1_ACT8", title: "QR Treasure Hunt", icon: "📷", desc: "Search for the printed number card in the room and scan its QR.", playAction: "qrScan" }
    ]
};

// Traducciones de la interfaz
const translations = {
    es: {
        heroTitle: "Ayudamos a cada niño a florecer a su propio ritmo",
        heroSubtitle: "Un ecosistema de aprendizaje adaptativo, libre y bilingüe, diseñado especialmente para la neurodiversidad y el juego activo.",
        ctaPlayNow: "🎮 Jugar Primer Reto Gratis",
        ctaNote: "Sin registros ni tarjetas de crédito. ¡Juega de inmediato!",
        logoTitle: "🌳 Yarumito",
        donarNavBtn: "❤️ Donar",
        
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
        
        // El Mundo 2 se desbloquea si el niño completa las 8 actividades de Mundo 1
        const isWorldUnlocked = world.num === 1 || (world.num === 2 && state.currentActivityIndex >= 8);
        
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

        // Listener para abrir Mundo 1 o dar alerta en Mundos bloqueados
        card.addEventListener("click", () => {
            if (isWorldUnlocked) {
                if (world.num === 1) {
                    renderWorld1Activities();
                    document.getElementById("world-activities-modal").classList.add("active");
                    speakText(t.actModalTitle);
                } else {
                    alert(state.locale === "es" ? "¡Felicidades! Iniciando el Mundo 2." : "Congratulations! Starting World 2.");
                }
            } else {
                speakText(t.lockedWarning);
                alert(t.lockedWarning);
            }
        });
        
        container.appendChild(card);
    });
}

// ==========================================
// 3b. Modal de Actividades detalladas del Mundo 1
// ==========================================
function renderWorld1Activities() {
    const container = document.getElementById("activities-grid-container");
    if (!container) return;
    
    container.innerHTML = "";
    const activities = worldActivities[state.locale];
    
    activities.forEach((act, idx) => {
        const actCard = document.createElement("div");
        actCard.classList.add("activity-card");
        
        // Se desbloquean secuencialmente: sólo si su índice es <= al progreso actual
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
    utterance.rate = 0.85; 
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
            currentActivityIndex: 0
        };
        localStorage.setItem("yarumito_users", JSON.stringify(users));
        localStorage.setItem("yarumito_logged_email", tutorEmail);
        
        state.childName = childName;
        state.childAvatar = avatar;
        state.isRegistered = true;
        state.currentActivityIndex = 0; 
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
            
            // Ocultar sección inicial y mostrar zona de juego
            document.getElementById("jugar-section").style.display = "none";
            document.getElementById("game-play-zone").style.display = "block";
            
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
            state.currentActivityIndex = typeof user.currentActivityIndex === "number" ? user.currentActivityIndex : 0;
            state.isRegistered = true;
            state.firstActivityCompleted = true;
            
            localStorage.setItem("yarumito_logged_email", loginEmail);
            saveLocalState();
            
            regModal.classList.remove("active");
            
            // Ocultar juego libre y mostrar la Zona de Juego
            document.getElementById("jugar-section").style.display = "none";
            document.getElementById("game-play-zone").style.display = "block";
            
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
// 10. Persistencia Local
// ==========================================
function saveLocalState() {
    localStorage.setItem("yarumito_state", JSON.stringify({
        isRegistered: state.isRegistered,
        childName: state.childName,
        childAvatar: state.childAvatar,
        currentActivityIndex: state.currentActivityIndex,
        firstActivityCompleted: state.firstActivityCompleted
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
        state.currentActivityIndex = typeof local.currentActivityIndex === "number" ? local.currentActivityIndex : 0;
        state.firstActivityCompleted = local.firstActivityCompleted || false;
        
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
    const activities = worldActivities[state.locale];
    
    // Generar las 8 hojas
    activities.forEach((act, idx) => {
        const leaf = document.createElement("div");
        leaf.classList.add("tree-leaf-node");
        leaf.setAttribute("data-idx", idx);
        leaf.innerText = idx + 1;
        
        // Asignar clases de estado
        if (idx < state.currentActivityIndex) {
            leaf.classList.add("completed");
            leaf.title = `${act.title} (${state.locale === "es" ? "Completado" : "Completed"})`;
        } else if (idx === state.currentActivityIndex) {
            leaf.classList.add("active");
            leaf.title = `${act.title} (${state.locale === "es" ? "Jugando" : "Playing"})`;
        } else {
            leaf.classList.add("locked");
            leaf.title = `${act.title} (${state.locale === "es" ? "Bloqueado" : "Locked"})`;
        }
        
        // Clicar una hoja ya completada o activa permite saltar a ella
        leaf.addEventListener("click", () => {
            if (idx <= state.currentActivityIndex) {
                state.currentActivityIndex = idx;
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
    
    // Colocar el avatar sobre la hoja activa con transiciones
    setTimeout(() => {
        const activeNode = pathContainer.querySelector(`.tree-leaf-node[data-idx="${Math.min(7, state.currentActivityIndex)}"]`);
        if (activeNode) {
            marker.style.left = activeNode.style.left;
            marker.style.bottom = activeNode.style.bottom;
            
            const isLeft = activeNode.style.left.includes("left") || parseInt(activeNode.style.left) < 50;
            marker.style.transform = `translate(-50%, -85%) scaleX(${isLeft ? 1 : -1})`;
        }
    }, 100);
    
    // Actualizar el estado del badge y del árbol guía (Wise Tree Stage)
    document.getElementById("child-badge-status").innerText = state.locale === "es" ? 
        `¡Actividad ${Math.min(8, state.currentActivityIndex + 1)} de 8!` : 
        `Activity ${Math.min(8, state.currentActivityIndex + 1)} of 8!`;
        
    const treeIcon = document.getElementById("wise-tree-stage-icon");
    if (state.currentActivityIndex >= 8) {
        treeIcon.innerText = "🌳"; 
    } else if (state.currentActivityIndex >= 6) {
        treeIcon.innerText = "🌲"; 
    } else if (state.currentActivityIndex >= 4) {
        treeIcon.innerText = "🌿"; 
    } else if (state.currentActivityIndex >= 2) {
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
    
    // Si completó las 8 actividades de Mundo 1
    if (state.currentActivityIndex >= 8) {
        renderGrandFinale(arena);
        return;
    }
    
    const act = worldActivities[state.locale][state.currentActivityIndex];
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
            `Actividad ${state.currentActivityIndex + 1}. ${act.title}. ${act.desc}` : 
            `Activity ${state.currentActivityIndex + 1}. ${act.title}. ${act.desc}`;
        speakText(text);
    };
    
    document.getElementById("arena-instruction-voice-btn").addEventListener("click", speakInstruction);
    
    // Cargar el mini-juego correspondiente
    setupMiniGame(state.currentActivityIndex);
    
    setTimeout(speakInstruction, 800);
}

function completeCurrentActivity() {
    const feedback = document.getElementById("arena-game-feedback");
    feedback.className = "activity-result success";
    feedback.innerHTML = state.locale === "es" ? 
        "🎉 ¡Excelente trabajo! Has completado este desafío. ¡El Árbol Sabio crece!" : 
        "🎉 Awesome job! You completed this challenge. The Wise Tree grows!";
        
    playAudio("GEN_BIEN_HECHO");
    
    setTimeout(() => {
        state.currentActivityIndex++;
        
        // Guardar progreso en el mapa de usuarios local de localStorage
        const loggedEmail = localStorage.getItem("yarumito_logged_email");
        if (loggedEmail) {
            const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
            if (users[loggedEmail]) {
                users[loggedEmail].currentActivityIndex = state.currentActivityIndex;
                localStorage.setItem("yarumito_users", JSON.stringify(users));
            }
        }
        
        saveLocalState();
        renderProgressTree();
        renderActiveActivity();
        renderWorldsShowcase(); 
    }, 3500);
}

// ==========================================
// 13. Implementación de los 8 Mini-juegos
// ==========================================
function setupMiniGame(index) {
    const container = document.getElementById("arena-game-body-container");
    if (!container) return;
    
    switch (index) {
        case 0: 
            setupGameEscuchar(container);
            break;
        case 1: 
            setupGameSiluetas(container);
            break;
        case 2: 
            setupGameTocar(container);
            break;
        case 3: 
            setupGameTrazar(container);
            break;
        case 4: 
            setupGameSaltar(container);
            break;
        case 5: 
            setupGameContar(container);
            break;
        case 6: 
            setupGameRetoPadres(container);
            break;
        case 7: 
            setupGameQR(container);
            break;
    }
}

// ---- JUEGO 1: Escuchar Números ----
function setupGameEscuchar(container) {
    const target = 5;
    
    const voiceMsg = state.locale === "es" ? 
        `Escucha con tus orejitas. Toca el globo que tiene el número ${target}` :
        `Listen carefully. Touch the balloon with number ${target}`;
        
    setTimeout(() => speakText(voiceMsg), 1800);
    
    container.innerHTML = `
        <h4 style="margin-bottom:10px;">${state.locale === "es" ? `Busca el número ${target}:` : `Find number ${target}:`}</h4>
        <div class="balloon-game-container">
            <button class="balloon-btn" data-num="2">🎈<span class="balloon-number">2</span></button>
            <button class="balloon-btn" data-num="5">🎈<span class="balloon-number">5</span></button>
            <button class="balloon-btn" data-num="8">🎈<span class="balloon-number">8</span></button>
        </div>
    `;
    
    container.querySelectorAll(".balloon-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const num = parseInt(e.currentTarget.getAttribute("data-num"));
            if (num === target) {
                e.currentTarget.style.transform = "scale(1.3) translateY(-100px)";
                e.currentTarget.style.opacity = "0";
                completeCurrentActivity();
            } else {
                playAudio("GEN_INTENTALO_OTRA_VEZ");
                const feedback = document.getElementById("arena-game-feedback");
                feedback.className = "activity-result error";
                feedback.innerHTML = state.locale === "es" ? 
                    `❌ Ese es el número ${num}. Escucha otra vez.` : 
                    `❌ That is number ${num}. Listen again.`;
                
                // Reportar error científico a la API Central
                logTelemetryError("W1_ACT1", target, num, "Fallo de discriminación auditiva (clic en número erróneo).");
            }
        });
    });
}

// ---- JUEGO 2: Reconocer Siluetas ----
function setupGameSiluetas(container) {
    const target = 7;
    container.innerHTML = `
        <div class="silhouette-image-box">7</div>
        <div class="number-options-grid" style="max-width:320px; margin-top:10px;">
            <button class="number-opt-btn" data-num="3">3</button>
            <button class="number-opt-btn" data-num="7">7</button>
            <button class="number-opt-btn" data-num="9">9</button>
        </div>
    `;
    
    container.querySelectorAll(".number-opt-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const num = parseInt(e.currentTarget.getAttribute("data-num"));
            if (num === target) {
                completeCurrentActivity();
            } else {
                playAudio("GEN_INTENTALO_OTRA_VEZ");
                const feedback = document.getElementById("arena-game-feedback");
                feedback.className = "activity-result error";
                feedback.innerHTML = state.locale === "es" ? "❌ Casi, busca la silueta idéntica." : "❌ Close, look for the matching shape.";
                
                // Reportar error científico
                logTelemetryError("W1_ACT2", target, num, "Fallo de asociación visomotora (silueta de número incorrecto).");
            }
        });
    });
}

// ---- JUEGO 3: Tocar y Despertar ----
function setupGameTocar(container) {
    let clicks = 0;
    const requiredClicks = 5;
    
    container.innerHTML = `
        <div class="growing-seed-graphic" id="seed-clicker">🌰</div>
        <div class="seed-growing-progress-bar">
            <div class="seed-progress-fill" id="seed-progress-bar-fill"></div>
        </div>
        <button class="register-submit-btn" id="btn-seed-tap" style="margin-top:15px; padding:10px 25px;">${state.locale === "es" ? "¡Tocar Semilla!" : "Tap Seed!"}</button>
    `;
    
    const clicker = document.getElementById("seed-clicker");
    const bar = document.getElementById("seed-progress-bar-fill");
    
    const triggerClick = () => {
        clicks++;
        const pct = (clicks / requiredClicks) * 100;
        bar.style.width = `${pct}%`;
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.frequency.value = 261.63 + (clicks * 50); 
        osc.connect(audioCtx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 150);
        
        if (clicks === 1) {
            clicker.innerText = "🌱";
            clicker.style.transform = "scale(1.1)";
        } else if (clicks === 3) {
            clicker.innerText = "🌿";
            clicker.style.transform = "scale(1.2)";
        } else if (clicks >= requiredClicks) {
            clicker.innerText = "🌸";
            clicker.style.transform = "scale(1.3)";
            document.getElementById("btn-seed-tap").style.display = "none";
            completeCurrentActivity();
            return;
        }
        
        setTimeout(() => { clicker.style.transform = "none"; }, 150);
    };
    
    document.getElementById("btn-seed-tap").addEventListener("click", triggerClick);
    clicker.addEventListener("click", triggerClick);
}

// ---- JUEGO 4: Trazar con Puntos ----
function setupGameTrazar(container) {
    const nodes = [
        { id: 1, x: 50, y: 25 },
        { id: 2, x: 50, y: 55 },
        { id: 3, x: 50, y: 85 }
    ];
    let nextRequiredId = 1;
    
    container.innerHTML = `
        <h4 style="margin-bottom:5px;">${state.locale === "es" ? "Une los puntos del 1 al 3 en orden:" : "Connect nodes 1 to 3 in order:"}</h4>
        <div class="dots-drawing-container">
            <svg class="dots-svg-layer" id="dots-svg-canvas"></svg>
            <div class="dot-node active-pulse" style="left:50%; top:25%;" data-id="1">1</div>
            <div class="dot-node" style="left:50%; top:55%;" data-id="2">2</div>
            <div class="dot-node" style="left:50%; top:85%;" data-id="3">3</div>
        </div>
    `;
    
    const svg = document.getElementById("dots-svg-canvas");
    
    container.querySelectorAll(".dot-node").forEach(dot => {
        dot.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            if (id === nextRequiredId) {
                e.currentTarget.classList.remove("active-pulse");
                e.currentTarget.classList.add("connected");
                
                if (id > 1) {
                    const prevNode = nodes[id - 2];
                    const currNode = nodes[id - 1];
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    
                    line.setAttribute("x1", (prevNode.x * 280) / 100);
                    line.setAttribute("y1", (prevNode.y * 240) / 100);
                    line.setAttribute("x2", (currNode.x * 280) / 100);
                    line.setAttribute("y2", (currNode.y * 240) / 100);
                    line.setAttribute("stroke", "#27ae60");
                    line.setAttribute("stroke-width", "6");
                    line.setAttribute("stroke-linecap", "round");
                    
                    svg.appendChild(line);
                }
                
                if (id === 3) {
                    completeCurrentActivity();
                } else {
                    nextRequiredId++;
                    const nextDot = container.querySelector(`.dot-node[data-id="${nextRequiredId}"]`);
                    if (nextDot) nextDot.classList.add("active-pulse");
                    playAudio("GEN_SI");
                }
            } else {
                playAudio("GEN_INTENTALO_OTRA_VEZ");
                
                // Reportar error científico
                logTelemetryError("W1_ACT4", nextRequiredId, id, "Fallo secuencial visomotor (trazado de puntos fuera de orden).");
            }
        });
    });
}

// ---- JUEGO 5: Saltar y Cuenta ----
function setupGameSaltar(container) {
    let jumps = 0;
    const requiredJumps = 3;
    
    container.innerHTML = `
        <div class="kangaroo-sprite" id="kangaroo-visual">🦘</div>
        <button class="cta-button" id="btn-jump-trigger" style="padding:10px 30px; font-size:1.1rem; box-shadow:0 4px 10px rgba(0,0,0,0.15);">${state.locale === "es" ? "💥 ¡SALTAR!" : "💥 JUMP!"}</button>
        <div style="margin-top:10px; font-weight:800; color:var(--text-muted);" id="jump-counter-lbl">${state.locale === "es" ? `Saltos: 0 de ${requiredJumps}` : `Jumps: 0 of ${requiredJumps}`}</div>
    `;
    
    const kanga = document.getElementById("kangaroo-visual");
    const lbl = document.getElementById("jump-counter-lbl");
    
    document.getElementById("btn-jump-trigger").addEventListener("click", () => {
        jumps++;
        lbl.innerText = state.locale === "es" ? `Saltos: ${jumps} de ${requiredJumps}` : `Jumps: ${jumps} of ${requiredJumps}`;
        
        kanga.classList.add("jump-anim");
        speakText(`${jumps}`);
        
        if (jumps >= requiredJumps) {
            document.getElementById("btn-jump-trigger").style.display = "none";
            setTimeout(completeCurrentActivity, 600);
        } else {
            setTimeout(() => kanga.classList.remove("jump-anim"), 450);
        }
    });
}

// ---- JUEGO 6: Contar Juguetes (Drag & Drop) ----
function setupGameContar(container) {
    let basketCount = 0;
    const requiredApples = 3;
    
    container.innerHTML = `
        <h4 style="margin-bottom:10px;">${state.locale === "es" ? `Coloca ${requiredApples} manzanas en la cesta:` : `Put ${requiredApples} apples in the basket:`}</h4>
        <div class="fruit-basket-area">
            <div class="apples-rack" id="apples-rack">
                <div class="draggable-apple" draggable="true" id="apple-1">🍎</div>
                <div class="draggable-apple" draggable="true" id="apple-2">🍎</div>
                <div class="draggable-apple" draggable="true" id="apple-3">🍎</div>
                <div class="draggable-apple" draggable="true" id="apple-4">🍎</div>
            </div>
            
            <div class="basket-dropzone" id="basket-zone">
                🧺
                <div class="basket-apples-count" id="basket-count-tag">0</div>
            </div>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted);">${state.locale === "es" ? "Arrastra las manzanas o haz clic en ellas." : "Drag the apples or click them."}</p>
    `;
    
    const basket = document.getElementById("basket-zone");
    const countTag = document.getElementById("basket-count-tag");
    
    const addAppleToBasket = (appleEl) => {
        if (!appleEl) return;
        appleEl.style.display = "none"; 
        basketCount++;
        countTag.innerText = basketCount;
        
        speakText(`${basketCount}`);
        
        if (basketCount === requiredApples) {
            basket.style.transform = "scale(1.1)";
            basket.style.borderColor = "var(--color-green)";
            completeCurrentActivity();
        } else {
            playAudio("GEN_SI");
        }
    };
    
    container.querySelectorAll(".draggable-apple").forEach(apple => {
        apple.addEventListener("click", (e) => {
            addAppleToBasket(e.currentTarget);
        });
        
        apple.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
    });
    
    basket.addEventListener("dragover", (e) => {
        e.preventDefault();
        basket.classList.add("hover");
    });
    
    basket.addEventListener("dragleave", () => {
        basket.classList.remove("hover");
    });
    
    basket.addEventListener("drop", (e) => {
        e.preventDefault();
        basket.classList.remove("hover");
        const id = e.dataTransfer.getData("text/plain");
        const apple = document.getElementById(id);
        addAppleToBasket(apple);
    });
}

// ---- JUEGO 7: Reto con Padres ----
function setupGameRetoPadres(container) {
    container.innerHTML = `
        <div class="parent-challenge-card">
            👪 ${state.locale === "es" ? 
                "¡DESAFÍO OFFLINE! Busca un número 3 en casa con papá o mamá (en un reloj, libro o calle) y grítalo fuerte." : 
                "OFFLINE CHALLENGE! Find a number 3 inside the house with mom or dad and shout it out loud!"}
        </div>
        <button class="cta-button" id="btn-parent-challenge-done" style="margin-top:10px; background:var(--gradient-orange); box-shadow:0 4px 15px rgba(243, 156, 18, 0.3);">${state.locale === "es" ? "🎉 ¡LO ENCONTRAMOS!" : "🎉 WE FOUND IT!"}</button>
    `;
    
    document.getElementById("btn-parent-challenge-done").addEventListener("click", () => {
        completeCurrentActivity();
    });
}

// ---- JUEGO 8: Búsqueda con QR ----
function setupGameQR(container) {
    container.innerHTML = `
        <h4 style="margin-bottom:10px;">${state.locale === "es" ? "Busca el código QR del número 3 en tu habitación:" : "Scan the QR card for number 3:"}</h4>
        
        <div class="simulated-camera" style="width:100%; max-width:340px; height:220px; border-radius:15px; overflow:hidden;">
            <div class="camera-lens" style="padding:15px;">
                <div class="scanning-line"></div>
                <span class="camera-status" style="font-size:0.8rem;">Buscando código QR...</span>
                <div class="card-options">
                    <button class="scan-option-btn arena-qr-btn" data-payload="yarumito://activity/number/2">📄 [2]</button>
                    <button class="scan-option-btn arena-qr-btn" data-payload="yarumito://activity/number/3">📄 [3]</button>
                    <button class="scan-option-btn arena-qr-btn" data-payload="yarumito://activity/number/5">📄 [5]</button>
                </div>
            </div>
        </div>
    `;
    
    container.querySelectorAll(".arena-qr-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const payload = e.currentTarget.getAttribute("data-payload");
            const feedback = document.getElementById("arena-game-feedback");
            feedback.className = "activity-result";
            feedback.innerHTML = state.locale === "es" ? "Verificando QR..." : "Checking QR...";
            
            let result;
            try {
                const url = `${API_BASE_URL}/api/verify-qr?target_number=3&scanned_payload=${encodeURIComponent(payload)}`;
                const response = await fetch(url);
                result = await response.json();
            } catch (err) {
                const number = parseInt(payload.split("/").pop());
                result = { success: number === 3, scanned_number: number };
            }
            
            if (result.success) {
                completeCurrentActivity();
            } else {
                playAudio("GEN_INTENTALO_OTRA_VEZ");
                feedback.className = "activity-result error";
                feedback.innerHTML = state.locale === "es" ? 
                    `❌ Has escaneado el número ${result.scanned_number || 2}, pero buscamos el 3.` : 
                    `❌ Scanned number ${result.scanned_number || 2}, but we need 3.`;
                
                // Reportar error científico a la API Central
                logTelemetryError("W1_ACT8", 3, result.scanned_number || 2, "Fallo de asociación de código QR (tarjeta incorrecta).");
            }
        });
    });
}

// ---- FINAL CURRICULAR: El Árbol Sabio Frondoso ----
function renderGrandFinale(arena) {
    arena.innerHTML = `
        <div class="modal-graphic" style="font-size:6rem; animation: float 2.5s infinite ease-in-out;">🌳</div>
        <h2 style="color:var(--color-green); font-weight:900;">🏆 ¡Felicitaciones, ${state.childName}!</h2>
        <p style="color:var(--text-muted); max-width:400px; margin: 0 auto;">¡Has completado las 8 actividades del Mundo 1! El Árbol Sabio ha crecido fuerte y frondoso y está lleno de flores.</p>
        
        <div style="background:var(--color-pastel-green); border: 2px solid var(--color-green); border-radius:15px; padding:15px; margin:15px 0; font-weight:800; color:#1b5e20;">
            🔑 ${state.locale === "es" ? "MUNDO 2 DESBLOQUEADO: Conteo y Grupos" : "WORLD 2 UNLOCKED: Counting & Grouping"}
        </div>
        
        <button class="register-submit-btn" id="btn-reset-progress" style="background:var(--gradient-orange); padding:12px 24px; box-shadow:0 4px 10px rgba(0,0,0,0.15)">
            ${state.locale === "es" ? "🔄 Volver a Jugar Mundo 1" : "🔄 Replay World 1"}
        </button>
    `;
    
    const finalSpeech = state.locale === "es" ? 
        `¡Felicitaciones ${state.childName}! Has completado todo el Mundo 1. Tu Árbol Sabio ha crecido fuerte y feliz. ¡Has desbloqueado el Mundo 2!` :
        `Congratulations ${state.childName}! You completed all of World 1. Your Wise Tree has grown strong and happy. You have unlocked World 2!`;
    setTimeout(() => speakText(finalSpeech), 800);
    
    document.getElementById("btn-reset-progress").addEventListener("click", () => {
        state.currentActivityIndex = 0;
        
        // Reiniciar también en el mapa de usuarios local de localStorage
        const loggedEmail = localStorage.getItem("yarumito_logged_email");
        if (loggedEmail) {
            const users = JSON.parse(localStorage.getItem("yarumito_users") || "{}");
            if (users[loggedEmail]) {
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
    
    // Cargar estado guardado
    loadLocalState();
    
    // Renderizado inicial
    updateLanguageUI();
    
    // Toggle de Idioma
    document.getElementById("lang-toggle").addEventListener("click", () => {
        state.locale = state.locale === "es" ? "en" : "es";
        updateLanguageUI();
    });
    
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

#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import sys

# Intentar importar gTTS. Si no está instalado, se instala dinámicamente o se da aviso.
try:
    from gtts import gTTS
except ImportError:
    print("[VoiceGenerator] gTTS no está instalado. Instalando mediante pip...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "gtts"])
    from gtts import gTTS

# Rutas del catálogo y de salida
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_PATH = os.path.join(BASE_DIR, "audio_catalog.json")
STATIC_AUDIO_DIR = os.path.join(BASE_DIR, "static", "audio")

def init_directories():
    """Crea los directorios para almacenar los archivos de audio en es y en."""
    for lang in ["es", "en"]:
        path = os.path.join(STATIC_AUDIO_DIR, lang)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"[VoiceGenerator] Creada carpeta de audio: {path}")

def load_catalog():
    """Carga el catálogo de audios desde el JSON."""
    if not os.path.exists(CATALOG_PATH):
        print(f"[VoiceGenerator] ERROR: No se encontró el catálogo en {CATALOG_PATH}")
        sys.exit(1)
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def generate_audio(code, text, lang, force=False):
    """Genera el audio usando gTTS si no existe previamente."""
    file_name = f"{code}.mp3"
    dest_path = os.path.join(STATIC_AUDIO_DIR, lang, file_name)
    
    # Validar si ya existe para evitar llamadas repetidas (ahorro de ancho de banda y procesamiento)
    if os.path.exists(dest_path) and not force:
        print(f"[VoiceGenerator] Reusando existente [{lang.upper()}]: {code} -> {dest_path}")
        return False
        
    try:
        print(f"[VoiceGenerator] Generando [{lang.upper()}]: '{text}' -> {file_name}...")
        # gTTS genera la síntesis de voz en el idioma seleccionado
        tts = gTTS(text=text, lang=lang, slow=True) # slow=True ayuda a los niños con problemas de atención
        tts.save(dest_path)
        print(f"[VoiceGenerator] Guardado exitoso: {dest_path}")
        return True
    except Exception as e:
        print(f"[VoiceGenerator] ERROR generando {code} ({lang}): {e}")
        return False

def main():
    print("--- Generador de Voz de Yarumito ---")
    init_directories()
    catalog = load_catalog()
    
    generated_count = 0
    reused_count = 0
    
    for audio in catalog.get("audios", []):
        code = audio.get("code")
        translations = audio.get("translations", {})
        
        for lang, text in translations.items():
            # Generar audio para cada idioma configurado en el catálogo
            created = generate_audio(code, text, lang)
            if created:
                generated_count += 1
            else:
                reused_count += 1
                
    print("\n--- Proceso Finalizado ---")
    print(f"Audios Generados: {generated_count}")
    print(f"Audios Reutilizados: {reused_count}")

if __name__ == "__main__":
    main()

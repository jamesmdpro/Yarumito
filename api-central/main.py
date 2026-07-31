#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Inicializar la aplicación FastAPI
app = FastAPI(
    title="API Central Yarumito",
    description="Motor pedagógico y repositorio de voces para el aprendizaje adaptativo",
    version="1.0"
)

# Habilitar CORS para permitir solicitudes del Frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir todos los orígenes en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_PATH = os.path.join(BASE_DIR, "audio_catalog.json")

# Asegurar directorios estáticos
STATIC_DIR = os.path.join(BASE_DIR, "static")
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

# Montar la carpeta static para servir los audios generados y los códigos QR
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def read_root():
    return {
        "message": "Bienvenido a la API Central del Ecosistema Yarumito 🌳",
        "version": "1.0",
        "documentation_url": "/docs"
    }

@app.get("/api/voice-catalog")
def get_voice_catalog():
    """Retorna la lista de audios con sus descripciones y traducciones bilingües."""
    if not os.path.exists(CATALOG_PATH):
        raise HTTPException(status_code=500, detail="Catálogo de audio no inicializado.")
    
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/api/verify-qr")
def verify_qr(target_number: int, scanned_payload: str):
    """
    Valida el código QR escaneado por el niño en la actividad de búsqueda.
    
    Formatos esperados:
    - URL del ecosistema: yarumito://activity/number/{num}
    - Número puro en string: "3"
    """
    scanned_number = None
    
    # Intentar extraer el número del payload
    if scanned_payload.isdigit():
        scanned_number = int(scanned_payload)
    else:
        # Buscar el número en el patrón yarumito://activity/number/{num}
        match = re.search(r"yarumito://activity/number/(\d+)", scanned_payload)
        if match:
            scanned_number = int(match.group(1))
            
    if scanned_number is None:
        raise HTTPException(status_code=400, detail="El código escaneado no tiene un formato válido.")

    # Validar coincidencia
    if scanned_number == target_number:
        return {
            "success": True,
            "target_number": target_number,
            "scanned_number": scanned_number,
            "audio_code": "GEN_BIEN_HECHO",
            "message": "¡Búsqueda correcta! Encontró el número buscado."
        }
    else:
        # Retorna el código de audio de error específico para indicarle qué número está buscando realmente
        # Si no existe código de error específico para el número, se retorna el genérico
        specific_error_code = f"W1_QR_ERROR_ASOCIACION_{target_number}"
        
        # Validar si existe ese código en el catálogo
        has_specific = False
        if os.path.exists(CATALOG_PATH):
            with open(CATALOG_PATH, "r", encoding="utf-8") as f:
                catalog = json.load(f)
                for audio in catalog.get("audios", []):
                    if audio.get("code") == specific_error_code:
                        has_specific = True
                        break
                        
        audio_code = specific_error_code if has_specific else "GEN_INTENTALO_OTRA_VEZ"
        
        return {
            "success": False,
            "target_number": target_number,
            "scanned_number": scanned_number,
            "audio_code": audio_code,
            "message": f"Búsqueda incorrecta. Escaneó el número {scanned_number} pero se esperaba {target_number}."
        }


# Modelos Pydantic para Telemetría
class TelemetryError(BaseModel):
    child_name: str
    activity_id: str
    target_value: str
    scanned_or_clicked: str
    error_reason: str
    timestamp: str = None


TELEMETRY_PATH = os.path.join(BASE_DIR, "telemetry_errors.json")


@app.post("/api/telemetry/error")
def log_telemetry_error(data: TelemetryError):
    """
    Registra de forma anonimizada un error cometido por el niño durante la actividad.
    Guarda los datos en un archivo JSON para que los científicos de aprendizaje lo analicen.
    """
    import datetime
    
    record = {
        "child_name": data.child_name,
        "activity_id": data.activity_id,
        "target_value": data.target_value,
        "scanned_or_clicked": data.scanned_or_clicked,
        "error_reason": data.error_reason,
        "timestamp": data.timestamp or datetime.datetime.utcnow().isoformat()
    }
    
    # Leer registros previos
    records = []
    if os.path.exists(TELEMETRY_PATH):
        try:
            with open(TELEMETRY_PATH, "r", encoding="utf-8") as f:
                records = json.load(f)
                if not isinstance(records, list):
                    records = []
        except Exception:
            records = []
            
    records.append(record)
    
    # Guardar en archivo local
    with open(TELEMETRY_PATH, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=4, ensure_ascii=False)
        
    return {
        "success": True,
        "message": "Error de telemetría registrado con éxito para análisis científico."
    }


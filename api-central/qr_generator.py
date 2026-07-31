#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

# Intentar importar dependencias y auto-instalarlas si faltan
try:
    import qrcode
except ImportError:
    print("[QRGenerator] qrcode no está instalado. Instalando...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "qrcode[pil]"])
    import qrcode

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_QR_DIR = os.path.join(BASE_DIR, "static", "qr")

def init_directories():
    """Crea la carpeta static/qr si no existe."""
    if not os.path.exists(STATIC_QR_DIR):
        os.makedirs(STATIC_QR_DIR)
        print(f"[QRGenerator] Creado directorio para QRs: {STATIC_QR_DIR}")

def generate_qr_images():
    """Genera las imágenes QR para los números del 1 al 10."""
    print("[QRGenerator] Generando códigos QR...")
    for num in range(1, 11):
        # El payload para escanear en la app del niño
        payload = f"yarumito://activity/number/{num}"
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(payload)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        dest_path = os.path.join(STATIC_QR_DIR, f"qr_number_{num}.png")
        img.save(dest_path)
        print(f"[QRGenerator] Generado QR para el número {num} -> {dest_path}")

def generate_html_print_sheet():
    """Genera una hoja de impresión HTML para que padres y maestros puedan imprimir las tarjetas fácilmente."""
    html_content = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Yarumito - Tarjetas de Búsqueda QR</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #f7f9fa;
            margin: 20px;
            color: #2c3e50;
            text-align: center;
        }
        h1 {
            color: #27ae60;
            margin-bottom: 5px;
        }
        p.subtitle {
            font-size: 1.1em;
            color: #7f8c8d;
            margin-bottom: 30px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border: 3px dashed #27ae60;
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            page-break-inside: avoid;
        }
        .card img {
            width: 150px;
            height: 150px;
            margin-bottom: 10px;
        }
        .number-label {
            font-size: 3.5rem;
            font-weight: 900;
            color: #2c3e50;
            margin: 0;
            line-height: 1;
        }
        .instructions {
            font-size: 0.8rem;
            color: #95a5a6;
            margin-top: 5px;
            font-weight: normal;
        }
        @media print {
            body {
                background: white;
                margin: 0;
            }
            .grid-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            .card {
                border-color: #000;
                box-shadow: none;
            }
            h1, p.subtitle {
                display: none;
            }
        }
    </style>
</head>
<body>
    <h1>🌳 Tarjetas de Búsqueda Activa: Números (1-10)</h1>
    <p class="subtitle">Imprime esta hoja, recorta las tarjetas y escóndelas en la habitación para que el niño juegue a encontrarlas con el Árbol Sabio.</p>
    
    <div class="grid-container">
"""
    
    for num in range(1, 11):
        html_content += f"""        <div class="card">
            <img src="qr_number_{num}.png" alt="QR Código para número {num}">
            <div class="number-label">{num}</div>
            <div class="instructions">Escanea para validar el número {num}</div>
        </div>\n"""
        
    html_content += """    </div>
</body>
</html>
"""
    
    dest_path = os.path.join(STATIC_QR_DIR, "print_cards.html")
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[QRGenerator] Generada hoja de impresión en HTML -> {dest_path}")

def main():
    print("--- Generador de Códigos QR de Yarumito ---")
    init_directories()
    generate_qr_images()
    generate_html_print_sheet()
    print("--- Proceso Completado ---")

if __name__ == "__main__":
    main()

# MINDFLOW: REHABILITACIÓN COGNITIVA DIGITAL
MindFlow es una plataforma SaaS (Software as a Service), diseñada para centros de rehabilitación multidisciplinados. Utiliza **gamificaciones** y **ML** para mejorar y monitorear funciones cognitivas como la atención, memoria de trabajo e inhibición de impulsos en pacientes de todas las edades.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Django](https://img.shields.io/badge/Django-6.0-green)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Versión](https://img.shields.io/badge/versión-1.0-green)

# Caracteristicas Principales
- **Modulos de estimulación:** juegos clásicos (Simón dice, Memorice) adaptados para métricas clínicas.
- **Dashboard para los funcionarios:** Visualización de progreso en tiempo real con análisis de latencia y precisión.
- **Accesibilidad con IA:** Integración con **ElevenLabs API** para descripción de audio automáticas, facilitando el uso a personas con dificultades visuales y lectura.
- **Privacidad de datos:** Gestión segura de pacientes mediantes nicknames y segmentación por institución.

# Stack tecnlógico
- **Backend:** Python  3.12 / Django 6.0
- **Frontend:** Javascript, Boostrap 5.8 HTML5 CSS3
- **IA/voz:** ElevenLabs API (Text-to-speech)
- **BD:** SQLite

# Arquitectura de datos & ML
El sistema de captura métrica de **latencia de respuesta** y **tasa de error** mediante eventos asincronicos en JavaScript. Estos datos son procesados por el backend de Django para alimentar:
1. **Modelo predictivo:** Identifica patrones de fatiga cognitiva o mejoras en la atención sostenida.
2. **Dashboard clínico:** Genera visualizaciones de series temporales para el seguimiento del paciente.

# Instalación y configuración

## 1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/techsalud.git
cd MindFlow
```
## 2. Crea el entorno
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac
source venv/bin/activate
```
## 3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## 4. Configuración variables del entorno(.env)
Crea un archivo .env y añadele:
```bash
SECRET_KEY='tu_secret_key'
DEBUG=True
ELEVEN_API_KEY='tu_api_key'
VOICE_ID='id_de_voz'
```

## 5. Migraciones 
```bash
python manage.py makemigrations
python manage.py migrate
```

## 6. Inicia el servidor
```bash
python manage.py runserver
```

# Roadmap (Próximas versiones)
- [] Implementación del juego "Traza mi camino" (Planificación motora).
- [] Reportes descargables en pdf para padres y médicos.
- [] Modulo de alertas tempranas mediante Machine Learning.

# Autores
- Sofía Cartagena - *Desarrollo, Visión y Arquitectura de Datos*  - [GitHub](https://github.com/socartagena02)
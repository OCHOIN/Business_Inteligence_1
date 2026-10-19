# Business Intelligence Lab

Sitio educativo estático sobre fundamentos de Business Intelligence, ETL, toma de decisiones y dashboard interactivo de la UEFA Champions League 2025-2026.

## Estructura del proyecto

- `index.html` — landing page con fundamentos, procesos ETL, caso práctico y cuestionario.
- `dashboard.html` — dashboard académico con filtros, KPI, gráficos y exportación CSV.
- `css/styles.css` — estilos generales del sitio.
- `css/dashboard.css` — estilos del dashboard.
- `js/main.js` — navegación y comportamiento compartido.
- `js/quiz.js` — lógica de cuestionario y gamificación.
- `js/dashboard.js` — cálculo de KPIs, filtros, gráficos y exportación.
- `img/` — recursos SVG de marca e ilustraciones.

## Cómo ejecutar localmente

1. Abre la carpeta del proyecto en VS Code o un navegador.
2. Desde la terminal, ejecuta:

```bash
cd /workspaces/Business_Inteligence_1
python3 -m http.server 8000
```

3. Abre en el navegador:

- `http://localhost:8000/index.html`
- `http://localhost:8000/dashboard.html`

> El proyecto es estático y no requiere backend ni dependencias adicionales.

## Cómo publicar en GitHub Pages

1. Sube este repositorio a GitHub.
2. En el repositorio, ve a `Settings` → `Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama principal (`main` o `master`) y la carpeta `/root` o `/` según la configuración.
5. Guarda y espera a que GitHub procese la publicación.
6. La URL será algo como:

```text
https://<usuario>.github.io/<repositorio>/index.html
```

7. Comprueba que los archivos CSS, JS e imágenes carguen correctamente.

## Datos del dashboard

El dashboard usa un conjunto de datos de demostración para fines académicos. Los valores no son una clasificación oficial ni un conjunto de resultados reales de la UEFA.

- Estado de los datos: `Datos simulados`
- Origen: conjunto documentado para entrenamiento y demostración académica
- Verificación: se mantienen como un dataset de ejemplo con nombre de equipos, fases y métricas calculadas desde el propio demo

## Verificación y limitaciones reales

### Verificado

- Estructura principal del sitio creada.
- Enlaces entre `index.html` y `dashboard.html` funcionando por rutas relativas.
- Cuestionario con progreso, puntuación, retroalimentación y reinicio.
- Dashboard con filtros, KPI y exportación CSV.
- Gráficos basados en datos cargados en JavaScript.

### Limitaciones conocidas

- Las estadísticas del dashboard son simuladas para fines educativos; no representan resultados oficiales.
- Los datos de la Champions League no se obtienen de una API externa ni se validan contra fuentes deportivas oficiales.
- Los gráficos y tablas están diseñados para una demostración estática dentro de un proyecto sin backend.

## Créditos de librerías externas

- Bootstrap 5: CDN
- Bootstrap Icons: CDN
- Google Fonts: CDN
- Chart.js: CDN

Si no hay conexión a internet, el contenido principal sigue visible y los elementos que dependan de CDN mostrarán su estado por ausencia del recurso.

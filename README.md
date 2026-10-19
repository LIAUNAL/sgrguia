# Guía Metodológica: Formulación de Proyectos en el Sistema General de Regalías (SGR) & MGA-WEB

Presentación interactiva y deck metodológico para la formulación, evaluación económica y estructuración del **Documento Técnico de Soporte (DTS)** de proyectos de inversión pública en el **Sistema General de Regalías (SGR)** y el aplicativo **MGA-WEB** del Departamento Nacional de Planeación (DNP) de Colombia.

**Presentación en vivo:** [https://liaunal.github.io/sgrguia/](https://liaunal.github.io/sgrguia/)

> **Nota de Neutralidad Institucional**: Todo el contenido se encuentra debidamente anonimizado conforme a las directrices pedagógicas, utilizando identificadores neutrales como `Entidad 1` (Institución Académica Formuladora), `Entidad 2` (Entidad Territorial Municipal Ejecutora), `Entidad 3` (Gobernación Departamental Cofinanciadora), `Municipio 1`, `Departamento 1` y `Corregimientos A–D`.

---

## 🎨 Estilo y Arquitectura Visual (Inspirado en [AgentPt](https://github.com/LIAUNAL/AgentPt))

- **HTML independiente (HTML + CSS + JS, sin build ni dependencias)**:
  - Tipografías profesionales de Google Fonts: `Space Grotesk` (sans-serif para interfaz y datos) y `Source Serif 4` (serif para títulos de alto impacto).
  - Fondo ambiental reactivo (`--bg-wash`) con tonos cromáticos por módulo (`tone-cyan`, `tone-blue`, `tone-yellow`, `tone-green`, `tone-purple`, `tone-orange`, `tone-magenta`).
  - **Barra superior de módulos (`.rail`)**: Píldoras de navegación con títulos clicables y pips de estado (`.rail-dots` y `.rail-pip`) generados dinámicamente.
  - **Escenario central (`.viewport`)**: Tarjeta elevada con sombra suave, resplandor tonal y transición fluida entre diapositivas (desplazamientos direccionales animados).
  - **Estructura de dos columnas (`.slide`)**: Columna izquierda con síntesis conceptual, listas con viñetas destacadas (`.slide-list`) y texto guía; columna derecha (`.slide-figure`) con diagramas SVG vectoriales, tablas metodológicas y herramientas interactivas.
  - **Barra inferior de control (`.deck-controls`)**: Título en ejecución (*running title*), logos institucionales del Laboratorio de Inteligencia Artificial UNAL, botones anterior/siguiente y contador de diapositivas (`01 / 28`).

---

## 📑 Módulos de la Presentación (28 Slides)

| # | Módulo | Diapositivas | Temas Clave |
| :- | :--- | :--- | :--- |
| **0** | **Portada** | Slide 0 | Título oficial, referentes (`Entidad 1`, `Entidad 2`, DNP) y año 2026. |
| **1** | **Marco General e Inversión** | Slides 1–4 | Jerarquía de planeación, regla de oro (solo inversión), ciclo SNIP (4 plataformas) y Consulta Previa (CLPI). |
| **2** | **Sistema General de Regalías** | Slides 5–8 | Ley 2056/2020, Dec. 1821/2021, Ley 2441/2024 ($30,9B), matriz 92.5%/4.5%/3.0% y Vigencias Futuras. |
| **3** | **Fase de Identificación (MGA 1)** | Slides 9–12 | Diagnóstico causal (prohibición de "falta de"), Árbol de Problemas y Objetivos, Matriz Poder-Interés y Población. |
| **4** | **Fase de Preparación (MGA 2)** | Slides 13–16 | Cadena de Valor en 6 pasos, Catálogo de Productos DNP, 11 insumos y Matriz de Riesgos en 3 niveles. |
| **5** | **Evaluación Social & RPC (MGA 3)** | Slides 17–20 | Precios cuenta, factores RPC del DNP, Tasa Social de Descuento (TSD = 9.0%) y calculadora interactiva de VPNE. |
| **6** | **Programación & Políticas (MGA 4)** | Slides 21–23 | Fuentes concurrentes, cofinanciación territorial, 7 políticas transversales y ruta de viabilidad en SUIFP. |
| **7** | **Caso Práctico DTS & Auditoría** | Slides 24–27 | Caso real anonimizado ($1.419M), 4 capítulos del DTS, lección de jornales (costo, no beneficio) y checklist Fase III. |

---

## ⌨️ Navegación y Atajos

| Acción | Teclas / Gestos |
| :--- | :--- |
| **Siguiente diapositiva** | `→`, `Espacio`, `PageDown`, clic en botón `Sig ▶` |
| **Diapositiva anterior** | `←`, `PageUp`, clic en botón `◀ Ant` |
| **Primera / Última diapositiva** | `Home` / `End` |
| **Modo Foco** | Tecla `f` (oculta la barra superior de módulos) |
| **Navegación táctil en móvil** | Deslizar dedo a izquierda / derecha (*swipe*) |
| **Saltar a módulo específico** | Clic directo en el título o punto del módulo en la barra superior |

---

## 📂 Estructura del Repositorio

```text
├── index.html                   # Deck principal de presentación (28 slides organizados en 7 módulos)
├── styles.css                   # Hoja de estilos del deck (espejo en raíz)
├── app.js                       # Motor interactivo de navegación y widgets (espejo en raíz)
├── assets/
│   ├── css/styles.css           # Estilos modulares, animaciones y paleta AgentPt
│   ├── js/app.js                # Lógica de teclado, swipe, pips y simuladores
│   └── images/                  # Logotipos y escudos institucionales
├── docs/
│   └── analisis-corpus-sgr.md   # Análisis exhaustivo de los 7 documentos PDF originales (495 páginas)
├── tests/
│   └── verify-guide.mjs         # Pruebas automatizadas (Node.js test runner)
└── odd/
    └── tasks/
        └── sgr-project-guide.md # Bitácora de desarrollo y especificaciones ODD
```

---

## 🧪 Pruebas Automatizadas

Validación de integridad de archivos, contenido técnico y cumplimiento estricto del protocolo de anonimización:

```bash
node --test tests/verify-guide.mjs
```

---

## 🌐 Despliegue en GitHub Pages

Cada push a la rama `main` activa automáticamente el flujo de GitHub Actions configurado en `.github/workflows/deploy-pages.yml`, publicando de inmediato en:

👉 **[https://liaunal.github.io/sgrguia/](https://liaunal.github.io/sgrguia/)**

# Guía Integral de Formulación de Proyectos SGR & MGA-WEB

Plataforma web interactiva y presentación ejecutiva para la formulación, evaluación económica y estructuración del **Documento Técnico de Soporte (DTS)** de proyectos de inversión pública en el **Sistema General de Regalías (SGR)** y el aplicativo **MGA-WEB** del Departamento Nacional de Planeación (DNP) de Colombia.

> **Nota de Neutralidad Institucional**: Todo el contenido se encuentra debidamente anonimizado conforme a las directrices pedagógicas, utilizando identificadores neutrales como `Entidad 1` (Institución Académica Formuladora), `Entidad 2` (Entidad Territorial Municipal Ejecutora), `Entidad 3` (Gobernación Departamental Cofinanciadora) y `Corregimientos A–D`.

---

## 🚀 Características Principales

- **Dual Mode (Guía Web + Modo Presentación)**:
  - **Modo Guía**: Documentación técnica estructurada, navegación lateral, buscador integrado y recursos metodológicos.
  - **Modo Presentación**: Slide deck de diapositivas interactivas en pantalla completa para capacitaciones y talleres, con atajos de teclado (`◀`, `▶`, `Espacio`, `Esc`), barra de progreso y notas de síntesis.
- **Simulador Presupuestal SGR**:
  - Cálculo instantáneo de la distribución legal de ingresos corrientes (Ley 2056 de 2020 y Presupuesto Bienal 2025–2026 de $30,9 billones): Inversión (92.5%), Ahorro (4.5%) y Administración/SSEC (3.0%).
- **Constructor de Árbol de Problemas & Árbol de Objetivos**:
  - Visualización interactiva de la conversión metodológica de causas directas e indirectas en medios y fines (Enfoque de Marco Lógico).
- **Estructuración de la Cadena de Valor**:
  - Directrices para seleccionar productos estandarizados del Catálogo DNP, definir la ruta crítica y costear las 11 categorías de insumos de la MGA.
- **Calculadora de Evaluación Económica (RPC y TSD 9.0%)**:
  - Conversión de precios financieros de mercado a precios sombra mediante Razones Precio Cuenta (RPC) y cálculo de viabilidad con la **Tasa Social de Descuento (TSD = 9.0%)** fijada en el Instructivo MGA 2023.
- **Caso Práctico Real Anonimizado**:
  - Análisis del DTS de construcción de aulas escolares rurales por COP $1.419.432.133 formulado por la `Entidad 2` con cofinanciación de la `Entidad 3` y asesoría de la `Entidad 1`.
- **Checklist de Maduración en Fase III (Factibilidad)**:
  - Verificación de requisitos insubsanables (titularidad predial, APU, licencias ambientales, consulta previa y sostenibilidad).

---

## 📂 Estructura del Repositorio

```text
├── index.html                   # Interfaz semántica principal (Guía y Modo Presentación)
├── styles.css                   # Arquitectura visual responsiva y paleta accesible (CSS variables)
├── app.js                       # Lógica interactiva (Dual Mode, simulador, calculadora RPC y árboles)
├── docs/
│   └── analisis-corpus-sgr.md   # Análisis exhaustivo de los 7 documentos PDF (495 páginas)
├── tests/
│   └── verify-guide.mjs         # Suite de pruebas automatizadas (Node.js test runner)
└── odd/
    └── tasks/
        └── sgr-project-guide.md # Bitácora de desarrollo y especificaciones ODD
```

---

## 🧪 Pruebas Automatizadas

El proyecto cuenta con una suite de pruebas automatizadas que valida la existencia de archivos, contenido metodológico y el cumplimiento riguroso del protocolo de anonimización:

```bash
node --test tests/verify-guide.mjs
```

---

## 🌐 Despliegue en GitHub Pages

El proyecto está diseñado como una aplicación web estática autónoma (cero dependencias externas y sin necesidad de paso de compilación). Puede ser servido directamente desde GitHub Pages activando la publicación desde la rama `main` o `gh-pages` en la raíz (`/`).

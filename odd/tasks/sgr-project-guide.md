Objective: Analyze the SGR/MGA PDF corpus, build an anonymized interactive web guide and presentation for SGR project formulation, and deploy it to GitHub Pages under github.com/orgs/liaunal.
Branch: feat/sgr-web-guide | Strategy: exception-ok (single cohesive static web guide & documentation) | Runner: node --test tests/verify-guide.mjs

## Specs

- **S1**: "revisa el folder de documentos fuente, genera un analisis del mismo, estamos buscando construir una guia general para la escritura de proyectos del sgr. explora los pdfs" — Produce a comprehensive technical analysis (`docs/analisis-corpus-sgr.md`) of all 7 PDF documents (Marco General, SGR, Identificación, Preparación, DTS Aulas_Ejemplo, Manual Conceptual MGA 2015, Instructivo MGA 2023) and expose the analysis within the web application.
- **S2**: "construye la guia como una pagina web, que vamos a desplegar en github pages" — Build a modern, responsive, self-contained static web application (`index.html`, `styles.css`, `app.js`) that functions both as an interactive step-by-step reference guide and as a slide presentation ("presentacion") for formulating SGR projects in MGA-WEB and drafting the Documento Técnico de Soporte (DTS).
- **S3**: "asegurate de no colocar el nombre de la institución académica o entidades de ese estilo, en dicho caso pon entidad1 o entidad2 etc" — Exclude raw source PDFs from version control and ensure zero occurrences of specific academic/territorial entity names in any tracked file, replacing them with neutral placeholders (`Entidad 1`, `Entidad 2`, `Municipio 1`, `Departamento 1`, `Institución Académica 1`, etc.).
- **S4**: "crea el repo github en github.com/orgs/liaunal donde despliegues la presentacion." — Create the repository under `github.com/orgs/liaunal`, push the anonymized codebase, configure and deploy GitHub Pages, and verify the published site URL.

## Tasks

- [x] **T1** (S1, S3) | Route: inline | Setup `.gitignore`, automated verification test suite (`tests/verify-guide.mjs`), and comprehensive corpus analysis (`docs/analisis-corpus-sgr.md`) | Commit: pending
- [x] **T2** (S1, S2, S3) | Route: inline | Build interactive SGR/MGA Web Guide & Presentation (`index.html`, `styles.css`, `app.js`, `README.md`) with Dual Mode (Guide + Presentation), interactive tools, and anonymized case study (`Entidad 1`, `Entidad 2`) | Commit: pending
- [ ] **T3** (S4) | Route: inline + independent verifier (High Risk item 5: deploy) | Create repository in `github.com/orgs/liaunal`, deploy to GitHub Pages, and run independent verification | Commit: pending

## Log

- **L1** (2026-10-19): Initial request: review the source documents, generate an integral analysis, build a general guide for writing SGR projects as an interactive web page and presentation for GitHub Pages under github.com/orgs/liaunal, with strict anonymization (`Entidad 1`, `Entidad 2`, etc.).
- **L2** (2026-10-19): Explorer subagent mapped all 7 PDFs (495 total pages across modules, manuals, and DTS example) and cataloged all institutional/territorial names requiring anonymization (`Entidad 1`, `Entidad 2`, etc.).
- **L3** (2026-10-19): Completed T1 and T2: Created `.gitignore`, test runner `tests/verify-guide.mjs`, corpus analysis `docs/analisis-corpus-sgr.md`, interactive web guide `index.html`, styles `styles.css`, motor `app.js`, and `README.md`. Automated tests passing 3/3.

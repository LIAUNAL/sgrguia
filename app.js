/**
 * Guía Interactiva SGR & MGA-WEB
 * Motor interactivo: Dual Mode (Guía + Modo Presentación), Simuladores SGR,
 * Constructor de Árbol de Problemas y Objetivos, y Calculadora de Evaluación Económica (RPC / TSD).
 *
 * Entidades de referencia metodológica:
 * - Entidad 1: Institución académica formuladora de los módulos pedagógicos.
 * - Entidad 2: Entidad territorial municipal ejecutora en el caso práctico del Documento Técnico de Soporte (DTS).
 */

// Estado Global de la Aplicación
const AppState = {
  mode: 'guide', // 'guide' | 'presentation'
  currentSlide: 0,
  totalSlides: 10,
  theme: 'light',
  sgrBudgetBienio: 30900000000000, // $30,9 billones COP (Ley 2441 de 2024, Bienio 2025-2026)
};

// ==========================================================================
// 1. INICIALIZACIÓN Y EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initPresentationMode();
  initSimuladorSGR();
  initCalculadoraRPC();
  initArbolInteractivo();
  initChecklistFaseIII();
  initSearch();
});

// ==========================================================================
// 2. GESTIÓN DE TEMA (CLARO / OSCURO)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('sgr_theme') || 'light';
  setTheme(savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
}

function setTheme(theme) {
  AppState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sgr_theme', theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
  }
}

// ==========================================================================
// 3. NAVEGACIÓN Y MODO GUÍA
// ==========================================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.sidebar .nav-item a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.parentElement.classList.remove('active'));
      link.parentElement.classList.add('active');
    });
  });

  // Botón para alternar a Modo Presentación
  const modeBtn = document.getElementById('btn-toggle-presentation');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      togglePresentationMode(true);
    });
  }
}

// ==========================================================================
// 4. MODO PRESENTACIÓN (SLIDE DECK)
// ==========================================================================
function initPresentationMode() {
  const slides = document.querySelectorAll('.slide-card');
  AppState.totalSlides = slides.length;

  const btnClose = document.getElementById('btn-close-presentation');
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  const btnNavPrev = document.getElementById('pres-nav-prev');
  const btnNavNext = document.getElementById('pres-nav-next');

  if (btnClose) btnClose.addEventListener('click', () => togglePresentationMode(false));
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnNavPrev) btnNavPrev.addEventListener('click', prevSlide);
  if (btnNavNext) btnNavNext.addEventListener('click', nextSlide);

  // Atajos de teclado
  window.addEventListener('keydown', (e) => {
    if (AppState.mode !== 'presentation') return;

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      togglePresentationMode(false);
    }
  });

  updateSlideDisplay();
}

function togglePresentationMode(show) {
  const presView = document.getElementById('presentation-view');
  if (!presView) return;

  if (show) {
    AppState.mode = 'presentation';
    presView.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateSlideDisplay();
  } else {
    AppState.mode = 'guide';
    presView.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function nextSlide() {
  if (AppState.currentSlide < AppState.totalSlides - 1) {
    AppState.currentSlide++;
    updateSlideDisplay();
  }
}

function prevSlide() {
  if (AppState.currentSlide > 0) {
    AppState.currentSlide--;
    updateSlideDisplay();
  }
}

function updateSlideDisplay() {
  const slides = document.querySelectorAll('.slide-card');
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === AppState.currentSlide);
  });

  const counter = document.getElementById('slide-counter');
  if (counter) {
    counter.textContent = `${AppState.currentSlide + 1} / ${AppState.totalSlides}`;
  }

  const progressBar = document.getElementById('pres-progress-bar');
  if (progressBar && AppState.totalSlides > 0) {
    const percent = ((AppState.currentSlide + 1) / AppState.totalSlides) * 100;
    progressBar.style.width = `${percent}%`;
  }
}

// ==========================================================================
// 5. SIMULADOR DE DISTRIBUCIÓN SGR (Ley 2056/2020 y Presupuesto Bienal)
// ==========================================================================
function initSimuladorSGR() {
  const inputPresupuesto = document.getElementById('sgr-presupuesto-input');
  const btnCalcular = document.getElementById('btn-calcular-sgr');

  if (btnCalcular && inputPresupuesto) {
    btnCalcular.addEventListener('click', () => {
      const valor = parseFloat(inputPresupuesto.value) || AppState.sgrBudgetBienio;
      calcularDistribucionSGR(valor);
    });
    // Cálculo inicial
    calcularDistribucionSGR(AppState.sgrBudgetBienio);
  }
}

function calcularDistribucionSGR(total) {
  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  // Reglas Legales de Distribución de Ingresos Corrientes SGR:
  // 1. Inversión: 92.5%
  const inversionTotal = total * 0.925;
  const asigDirectas = total * 0.25; // 25% (20% directas + 5% anticipadas)
  const invRegional = total * 0.34;  // 34% (60% Dptos: 20.4%, 40% Regiones: 13.6%)
  const invRegionalDptos = invRegional * 0.60;
  const invRegionalOCAD = invRegional * 0.40;
  const invLocal = total * 0.15;     // 15% (12.68% municipios pobres + 2.32% étnicos)
  const ctei = total * 0.10;         // 10% (min 20% ambiental)
  const paz = total * 0.07;          // 7% municipios PDET
  const ambiental = total * 0.01;    // 1% conservación
  const rioMagdalena = total * 0.005; // 0.5% ribereños y Canal del Dique

  // 2. Ahorro: 4.5%
  const ahorroTotal = total * 0.045;
  const fae = total * 0.0225;
  const fonpet = total * 0.0225;

  // 3. Administración y Control: 3%
  const adminTotal = total * 0.03;
  const funcionamiento = total * 0.02;
  const ssec = total * 0.01;

  // Actualizar DOM
  const elInversion = document.getElementById('res-sgr-inversion');
  const elAhorro = document.getElementById('res-sgr-ahorro');
  const elAdmin = document.getElementById('res-sgr-admin');
  const elDirectas = document.getElementById('res-sgr-directas');
  const elRegional = document.getElementById('res-sgr-regional');
  const elLocal = document.getElementById('res-sgr-local');
  const elCtei = document.getElementById('res-sgr-ctei');
  const elPaz = document.getElementById('res-sgr-paz');

  if (elInversion) elInversion.textContent = formatoCOP.format(inversionTotal);
  if (elAhorro) elAhorro.textContent = formatoCOP.format(ahorroTotal);
  if (elAdmin) elAdmin.textContent = formatoCOP.format(adminTotal);
  if (elDirectas) elDirectas.textContent = formatoCOP.format(asigDirectas);
  if (elRegional) elRegional.textContent = `${formatoCOP.format(invRegional)} (Dptos: ${formatoCOP.format(invRegionalDptos)} / OCAD: ${formatoCOP.format(invRegionalOCAD)})`;
  if (elLocal) elLocal.textContent = formatoCOP.format(invLocal);
  if (elCtei) elCtei.textContent = formatoCOP.format(ctei);
  if (elPaz) elPaz.textContent = formatoCOP.format(paz);
}

// ==========================================================================
// 6. CONSTRUCTOR INTERACTIVO: ÁRBOL DE PROBLEMAS Y ÁRBOL DE OBJETIVOS
// ==========================================================================
function initArbolInteractivo() {
  const btnToggleArbol = document.getElementById('btn-toggle-arbol');
  const arbolProblemasView = document.getElementById('arbol-problemas-view');
  const arbolObjetivosView = document.getElementById('arbol-objetivos-view');

  let showingObjetivos = false;

  if (btnToggleArbol && arbolProblemasView && arbolObjetivosView) {
    btnToggleArbol.addEventListener('click', () => {
      showingObjetivos = !showingObjetivos;
      if (showingObjetivos) {
        arbolProblemasView.style.display = 'none';
        arbolObjetivosView.style.display = 'flex';
        btnToggleArbol.innerHTML = '🔄 Ver Árbol de Problemas';
      } else {
        arbolProblemasView.style.display = 'flex';
        arbolObjetivosView.style.display = 'none';
        btnToggleArbol.innerHTML = '🔄 Transformar a Árbol de Objetivos';
      }
    });
  }
}

// ==========================================================================
// 7. CALCULADORA DE EVALUACIÓN ECONÓMICA (RPC y TSD = 9%)
// ==========================================================================
function initCalculadoraRPC() {
  const btnCalcularRPC = document.getElementById('btn-calcular-rpc');
  if (!btnCalcularRPC) return;

  btnCalcularRPC.addEventListener('click', () => {
    // Factores Oficiales RPC según Manual Conceptual e Instructivo MGA 2023:
    const rpcFactors = {
      moCalificada: 1.00,
      moNoCalificada: 0.60,
      materiales: 0.79,
      maquinaria: 0.77,
      transporte: 0.75,
      servicios: 0.71,
      otros: 0.80
    };

    const cMoCal = parseFloat(document.getElementById('c-mo-cal')?.value) || 0;
    const cMoNoCal = parseFloat(document.getElementById('c-mo-nocal')?.value) || 0;
    const cMat = parseFloat(document.getElementById('c-materiales')?.value) || 0;
    const cMaq = parseFloat(document.getElementById('c-maquinaria')?.value) || 0;
    const cTrans = parseFloat(document.getElementById('c-transporte')?.value) || 0;
    const cServ = parseFloat(document.getElementById('c-servicios')?.value) || 0;
    const cOtros = parseFloat(document.getElementById('c-otros')?.value) || 0;

    const costoFinancieroTotal = cMoCal + cMoNoCal + cMat + cMaq + cTrans + cServ + cOtros;

    const costoEconomicoTotal = (cMoCal * rpcFactors.moCalificada) +
      (cMoNoCal * rpcFactors.moNoCalificada) +
      (cMat * rpcFactors.materiales) +
      (cMaq * rpcFactors.maquinaria) +
      (cTrans * rpcFactors.transporte) +
      (cServ * rpcFactors.servicios) +
      (cOtros * rpcFactors.otros);

    const beneficioAnualSocial = parseFloat(document.getElementById('beneficio-anual-social')?.value) || 0;
    const horizonteAnos = parseInt(document.getElementById('horizonte-evaluacion')?.value) || 10;
    const tsd = 0.09; // Tasa Social de Descuento = 9% según Instructivo MGA 2023 DNP

    // Cálculo del Valor Presente Neto Económico (VPNE)
    // Flujo en t=0 es -costoEconomicoTotal
    // Flujos en t=1..horizonte son beneficioAnualSocial
    let vpnBeneficios = 0;
    for (let t = 1; t <= horizonteAnos; t++) {
      vpnBeneficios += beneficioAnualSocial / Math.pow(1 + tsd, t);
    }
    const vpne = vpnBeneficios - costoEconomicoTotal;
    const rbc = costoEconomicoTotal > 0 ? (vpnBeneficios / costoEconomicoTotal) : 0;

    const formatoCOP = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });

    const elCostoFinanciero = document.getElementById('res-costo-financiero');
    const elCostoEconomico = document.getElementById('res-costo-economico');
    const elVpne = document.getElementById('res-vpne');
    const elRbc = document.getElementById('res-rbc');
    const elVeredicto = document.getElementById('res-veredicto-economico');

    if (elCostoFinanciero) elCostoFinanciero.textContent = formatoCOP.format(costoFinancieroTotal);
    if (elCostoEconomico) elCostoEconomico.textContent = formatoCOP.format(costoEconomicoTotal);
    if (elVpne) {
      elVpne.textContent = formatoCOP.format(vpne);
      elVpne.style.color = vpne >= 0 ? 'var(--success)' : 'var(--danger)';
    }
    if (elRbc) elRbc.textContent = rbc.toFixed(2);
    if (elVeredicto) {
      if (vpne >= 0) {
        elVeredicto.textContent = '✅ Proyecto Económica y Socialmente Viable (VPNE ≥ 0 a TSD del 9%)';
        elVeredicto.className = 'callout callout-success';
      } else {
        elVeredicto.textContent = '⚠️ Proyecto No Viable Económicamente con los supuestos actuales (VPNE < 0 a TSD del 9%)';
        elVeredicto.className = 'callout callout-warning';
      }
    }
  });
}

// ==========================================================================
// 8. CHECKLIST DE MADURACIÓN FASE III (FACTIBILIDAD SGR)
// ==========================================================================
function initChecklistFaseIII() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const counterEl = document.getElementById('checklist-counter');

  function updateChecklistProgress() {
    if (!checkboxes.length || !counterEl) return;
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    counterEl.textContent = `${checked} de ${total} requisitos completados (${Math.round((checked / total) * 100)}%)`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateChecklistProgress);
  });
  updateChecklistProgress();
}

// ==========================================================================
// 9. BUSCADOR INTERNO EN LA GUÍA
// ==========================================================================
function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll('.guide-section');

    if (!term) {
      sections.forEach(sec => sec.style.display = 'block');
      return;
    }

    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(term)) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  });
}

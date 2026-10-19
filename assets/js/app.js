const slides = Array.from(document.querySelectorAll(".slide"));
const railModules = Array.from(document.querySelectorAll(".rail-module"));
const railTitles = Array.from(document.querySelectorAll(".rail-title"));
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const deckApp = document.querySelector(".deck-app");
const modeBadge = document.getElementById("mode-badge");

let current = 0;
let cleanupTimer = null;
let lastModule = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const modeMap = {
  0: "normal",
  1: "command",
  2: "insert",
  3: "visual",
  4: "replace",
  5: "terminal",
  6: "normal",
  7: "command",
  8: "insert",
  9: "visual",
  10: "replace",
  11: "terminal"
};

function buildDots() {
  const moduleMap = {};
  slides.forEach((slide, idx) => {
    const mod = slide.dataset.module;
    if (!moduleMap[mod]) moduleMap[mod] = [];
    moduleMap[mod].push(idx);
  });

  Object.entries(moduleMap).forEach(([mod, indices]) => {
    const container = document.getElementById(`dots-${mod}`);
    if (!container) return;
    indices.forEach((slideIdx) => {
      const pip = document.createElement("button");
      pip.className = "rail-pip";
      pip.dataset.slide = slideIdx;
      pip.setAttribute("aria-label", `Slide ${slideIdx + 1}`);
      pip.addEventListener("click", () => render(slideIdx));
      container.appendChild(pip);
    });
  });
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function cleanupTransitionClasses(slide) {
  slide.classList.remove(
    "is-entering",
    "is-leaving",
    "from-next",
    "from-prev",
    "to-next",
    "to-prev"
  );
}

function updateChrome() {
  const pips = Array.from(document.querySelectorAll(".rail-pip"));
  pips.forEach((pip) => {
    pip.classList.toggle("is-active", Number(pip.dataset.slide) === current);
  });

  const currentModule = slides[current]?.dataset.module;
  const moduleChanged = currentModule !== lastModule;
  railModules.forEach((mod) => {
    const isActive = mod.dataset.module === currentModule;
    mod.classList.toggle("is-active-module", isActive);
    if (isActive && moduleChanged) {
      mod.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  });
  lastModule = currentModule;

  counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;

  const tone = slides[current]?.dataset.tone;
  const moduleIdx = Number(currentModule);
  const mode = modeMap[moduleIdx] || "normal";

  deckApp.className = deckApp.className
    .replace(/tone-\w+/g, "")
    .replace(/mode-\w+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (tone) deckApp.classList.add(`tone-${tone}`);
  deckApp.classList.add(`mode-${mode}`);

  if (modeBadge) {
    modeBadge.textContent = mode.toUpperCase();
  }
}

function render(index, options = {}) {
  const { animate = true } = options;
  const next = Math.max(0, Math.min(index, slides.length - 1));

  if (next === current) {
    updateChrome();
    return;
  }

  const previous = current;
  current = next;
  try { localStorage.setItem("deck-slide-v2", current); } catch (_) {}

  // Una pulsacion nueva cancela la transicion en curso en vez de descartarse.
  if (cleanupTimer) {
    window.clearTimeout(cleanupTimer);
    cleanupTimer = null;
  }

  const currentSlide = slides[current];
  const previousSlide = slides[previous];

  // Cualquier slide ajeno a la transicion vuelve a su estado de reposo.
  slides.forEach((slide, idx) => {
    if (idx !== current && idx !== previous) {
      cleanupTransitionClasses(slide);
      slide.classList.remove("is-active");
    }
  });

  cleanupTransitionClasses(previousSlide);
  cleanupTransitionClasses(currentSlide);

  if (!animate || reduceMotion.matches) {
    previousSlide.classList.remove("is-active");
    currentSlide.classList.add("is-active");
    updateChrome();
    return;
  }

  const direction = next > previous ? "next" : "prev";

  previousSlide.classList.remove("is-active");
  previousSlide.classList.add("is-leaving", direction === "next" ? "to-next" : "to-prev");

  currentSlide.classList.add("is-active", "is-entering", direction === "next" ? "from-next" : "from-prev");

  cleanupTimer = window.setTimeout(() => {
    slides.forEach((slide) => {
      cleanupTransitionClasses(slide);
      if (slide !== slides[current]) slide.classList.remove("is-active");
    });
    cleanupTimer = null;
  }, 440);

  updateChrome();
}

railTitles.forEach((title) => {
  title.addEventListener("click", () => {
    const firstSlide = Number(title.dataset.first);
    if (!Number.isFinite(firstSlide)) return;
    render(firstSlide);
  });
});

prevBtn.addEventListener("click", () => render(current - 1));
nextBtn.addEventListener("click", () => render(current + 1));

window.addEventListener("keydown", (event) => {
  const opts = { animate: !event.repeat };
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    render(current + 1, opts);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    render(current - 1, opts);
  }
  if (event.key === "Home") render(0);
  if (event.key === "End") render(slides.length - 1);
  if (event.key.toLowerCase() === "f") {
    document.body.classList.toggle("focus-mode");
  }
});

let touchStartX = 0;
window.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});
window.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta < 0) render(current + 1);
  if (delta > 0) render(current - 1);
});

// ==========================================================================
// HERRAMIENTAS INTERACTIVAS METODOLÓGICAS (SGR & MGA-WEB)
// Referencias: Entidad 1 (Académica) y Entidad 2 (Municipal en DTS)
// Modo Presentación de alta interactividad
// ==========================================================================

function initSimuladorSGR() {
  const inputPresupuesto = document.getElementById("sgr-presupuesto-input");
  const btnCalcular = document.getElementById("btn-calcular-sgr");

  if (btnCalcular && inputPresupuesto) {
    btnCalcular.addEventListener("click", () => {
      const valor = parseFloat(inputPresupuesto.value) || 30900000000000;
      calcularDistribucionSGR(valor);
    });
    calcularDistribucionSGR(30900000000000);
  }
}

function calcularDistribucionSGR(total) {
  const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  const elInversion = document.getElementById("res-sgr-inversion");
  const elAhorro = document.getElementById("res-sgr-ahorro");
  const elAdmin = document.getElementById("res-sgr-admin");
  const elDirectas = document.getElementById("res-sgr-directas");
  const elRegional = document.getElementById("res-sgr-regional");
  const elLocal = document.getElementById("res-sgr-local");
  const elCtei = document.getElementById("res-sgr-ctei");
  const elPaz = document.getElementById("res-sgr-paz");

  if (elInversion) elInversion.textContent = formatoCOP.format(total * 0.925);
  if (elAhorro) elAhorro.textContent = formatoCOP.format(total * 0.045);
  if (elAdmin) elAdmin.textContent = formatoCOP.format(total * 0.03);
  if (elDirectas) elDirectas.textContent = formatoCOP.format(total * 0.25);
  if (elRegional) elRegional.textContent = formatoCOP.format(total * 0.34);
  if (elLocal) elLocal.textContent = formatoCOP.format(total * 0.15);
  if (elCtei) elCtei.textContent = formatoCOP.format(total * 0.10);
  if (elPaz) elPaz.textContent = formatoCOP.format(total * 0.07);
}

function initArbolInteractivo() {
  const btnToggleArbol = document.getElementById("btn-toggle-arbol");
  const arbolProblemasView = document.getElementById("arbol-problemas-view");
  const arbolObjetivosView = document.getElementById("arbol-objetivos-view");

  let showingObjetivos = false;

  if (btnToggleArbol && arbolProblemasView && arbolObjetivosView) {
    btnToggleArbol.addEventListener("click", () => {
      showingObjetivos = !showingObjetivos;
      if (showingObjetivos) {
        arbolProblemasView.style.display = "none";
        arbolObjetivosView.style.display = "flex";
        btnToggleArbol.textContent = "Ver Árbol de Problemas";
      } else {
        arbolProblemasView.style.display = "flex";
        arbolObjetivosView.style.display = "none";
        btnToggleArbol.textContent = "Transformar a Árbol de Objetivos";
      }
    });
  }
}

function initCalculadoraRPC() {
  const btnCalcularRPC = document.getElementById("btn-calcular-rpc");
  if (!btnCalcularRPC) return;

  btnCalcularRPC.addEventListener("click", () => {
    const rpcFactors = {
      moCalificada: 1.00,
      moNoCalificada: 0.60,
      materiales: 0.79,
      maquinaria: 0.77,
      transporte: 0.75,
      servicios: 0.71,
      otros: 0.80
    };

    const cMoCal = parseFloat(document.getElementById("c-mo-cal")?.value) || 0;
    const cMoNoCal = parseFloat(document.getElementById("c-mo-nocal")?.value) || 0;
    const cMat = parseFloat(document.getElementById("c-materiales")?.value) || 0;
    const cMaq = parseFloat(document.getElementById("c-maquinaria")?.value) || 0;
    const cTrans = parseFloat(document.getElementById("c-transporte")?.value) || 0;
    const cServ = parseFloat(document.getElementById("c-servicios")?.value) || 0;
    const cOtros = parseFloat(document.getElementById("c-otros")?.value) || 0;

    const costoFinancieroTotal = cMoCal + cMoNoCal + cMat + cMaq + cTrans + cServ + cOtros;
    const costoEconomicoTotal = (cMoCal * rpcFactors.moCalificada) +
      (cMoNoCal * rpcFactors.moNoCalificada) +
      (cMat * rpcFactors.materiales) +
      (cMaq * rpcFactors.maquinaria) +
      (cTrans * rpcFactors.transporte) +
      (cServ * rpcFactors.servicios) +
      (cOtros * rpcFactors.otros);

    const beneficioAnualSocial = parseFloat(document.getElementById("beneficio-anual-social")?.value) || 0;
    const horizonteAnos = parseInt(document.getElementById("horizonte-evaluacion")?.value) || 10;
    const tsd = 0.09; // Tasa Social de Descuento = 9% según Instructivo MGA 2023 DNP

    let vpnBeneficios = 0;
    for (let t = 1; t <= horizonteAnos; t++) {
      vpnBeneficios += beneficioAnualSocial / Math.pow(1 + tsd, t);
    }
    const vpne = vpnBeneficios - costoEconomicoTotal;
    const rbc = costoEconomicoTotal > 0 ? (vpnBeneficios / costoEconomicoTotal) : 0;

    const formatoCOP = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    });

    const elCostoFinanciero = document.getElementById("res-costo-financiero");
    const elCostoEconomico = document.getElementById("res-costo-economico");
    const elVpne = document.getElementById("res-vpne");
    const elRbc = document.getElementById("res-rbc");
    const elVeredicto = document.getElementById("res-veredicto-economico");

    if (elCostoFinanciero) elCostoFinanciero.textContent = formatoCOP.format(costoFinancieroTotal);
    if (elCostoEconomico) elCostoEconomico.textContent = formatoCOP.format(costoEconomicoTotal);
    if (elVpne) {
      elVpne.textContent = formatoCOP.format(vpne);
      elVpne.style.color = vpne >= 0 ? "var(--green)" : "var(--red)";
    }
    if (elRbc) elRbc.textContent = rbc.toFixed(2);
    if (elVeredicto) {
      if (vpne >= 0) {
        elVeredicto.textContent = "✅ Proyecto Viable Económica y Socialmente (VPNE ≥ 0 a TSD del 9%)";
        elVeredicto.style.color = "var(--green)";
      } else {
        elVeredicto.textContent = "⚠️ Proyecto No Viable Económicamente (VPNE < 0 a TSD del 9%)";
        elVeredicto.style.color = "var(--red)";
      }
    }
  });
}

function initChecklistFaseIII() {
  const checkboxes = document.querySelectorAll(".deck-checklist-cb");
  const counterEl = document.getElementById("checklist-counter");

  function updateChecklistProgress() {
    if (!checkboxes.length || !counterEl) return;
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    counterEl.textContent = `${checked} / ${total} cumplidos (${Math.round((checked / total) * 100)}%)`;
  }

  checkboxes.forEach(cb => cb.addEventListener("change", updateChecklistProgress));
  updateChecklistProgress();
}

buildDots();
const saved = Number(localStorage.getItem("deck-slide-v2")) || 0;
render(Math.min(saved, slides.length - 1), { animate: false });

document.addEventListener("DOMContentLoaded", () => {
  initSimuladorSGR();
  initArbolInteractivo();
  initCalculadoraRPC();
  initChecklistFaseIII();
});

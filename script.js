// Datos: [nombre, código, [prerrequisitos]]
const ramosPorSemestre = {
  "Primer semestre": [
    ["Química General y Orgánica", "DQUI1050", []],
    ["Morfología Básica", "DMOR0030", []],
    ["Antropología", "FORI0001", []],
    ["Biología Celular", "DBIO1084", []],
    ["Bases de la Enfermería y su Rol en el Liderazgo", "ENFEA003", []],
    ["Psicología Evolutiva", "ENFEA004", []]
  ],
  "Segundo semestre": [
    ["Bioquímica General", "DBIO1092", ["DQUI1050"]],
    ["Microbiología General", "DBIO1097", ["DBIO1084"]],
    ["Integrado Fisiología-Fisiopatología 1", "DMOR0022", ["DBIO1084"]],
    ["Salud Digital", "FACU0004", []],
    ["IAAS (Calidad y Seguridad)", "ENFEB003", []],
    ["Salud Intercultural", "ENFEB004", []]
  ],
  "Tercer semestre": [
    ["Integrado Fisiología-Fisiopatología 2", "DMOR0023", ["DMOR0022"]],
    ["Farmacología General", "BDIO1098", ["DMOR0022"]],
    ["Salud Poblacional", "DSPU0012", []],
    ["Enfermería en el Curso de la Vida", "ENFEC004", []],
    ["Educación para la Salud", "ENFEC005", []],
    ["Comunicación Interdisciplinar", "ENFEC006", []]
  ]
  // Puedes seguir agregando los siguientes semestres aquí...
};

// Estados
let aprobados = new Set();
let desbloqueados = new Set();

// Elementos DOM
const malla = document.getElementById("malla");
const detalle = document.getElementById("detalle");

// Inicializar desbloqueados (sin prerrequisitos)
function inicializarDesbloqueados() {
  desbloqueados.clear();
  for (const sem in ramosPorSemestre) {
    for (const [nombre, codigo, prereqs] of ramosPorSemestre[sem]) {
      if (prereqs.length === 0) desbloqueados.add(codigo);
    }
  }
}

// Verificar si todos los prerrequisitos de un ramo están aprobados
function prerrequisitosAprobados(prereqs) {
  return prereqs.every(cod => aprobados.has(cod));
}

// Actualizar lista de ramos desbloqueados
function actualizarDesbloqueados() {
  let cambio = false;
  for (const semestre in ramosPorSemestre) {
    for (const [nombre, codigo, prereqs] of ramosPorSemestre[semestre]) {
      if (!desbloqueados.has(codigo) && prerrequisitosAprobados(prereqs)) {
        desbloqueados.add(codigo);
        cambio = true;
      }
    }
  }
  if (cambio) renderMalla(); // Re-render si hay cambios
}

// Crear un ramo como tarjeta DOM
function crearTarjeta(nombre, codigo, prereqs) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = `${nombre}\n(${codigo})`;

  // Bloqueado
  if (!desbloqueados.has(codigo)) div.classList.add("bloqueado");

  // Aprobado
  if (aprobados.has(codigo)) div.classList.add("aprobado");

  // Evento clic
  div.addEventListener("click", () => {
    if (!aprobados.has(codigo)) {
      aprobados.add(codigo);
      actualizarDesbloqueados();
      renderMalla();
      mostrarDetalle(nombre, codigo, prereqs);
    } else {
      mostrarDetalle(nombre, codigo, prereqs);
    }
  });

  return div;
}

// Mostrar detalle de un ramo
function mostrarDetalle(nombre, codigo, prereqs) {
  detalle.classList.remove("hidden");
  const requisitos = prereqs.length > 0 ? prereqs.join(", ") : "Ninguno";
  detalle.innerHTML = `
    <strong>${nombre} (${codigo})</strong><br>
    Estado: ${aprobados.has(codigo) ? "✅ Aprobado" : "⏳ Pendiente"}<br>
    Prerrequisitos: ${requisitos}
  `;
}

// Renderizar la malla completa
function renderMalla() {
  malla.innerHTML = "";
  for (const semestre in ramosPorSemestre) {
    const contenedor = document.createElement("div");
    contenedor.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    contenedor.appendChild(titulo);

    const contenedorRamos = document.createElement("div");
    contenedorRamos.className = "ramos";

    for (const [nombre, codigo, prereqs] of ramosPorSemestre[semestre]) {
      const tarjeta = crearTarjeta(nombre, codigo, prereqs);
      contenedorRamos.appendChild(tarjeta);
    }

    contenedor.appendChild(contenedorRamos);
    malla.appendChild(contenedor);
  }
}

// Inicializar
inicializarDesbloqueados();
renderMalla();

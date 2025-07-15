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
    ["Calidad, Seguridad y Prevención de IAAS", "ENFEB003", []],
    ["Salud Intercultural", "ENFEB004", []]
  ],
  "Tercer semestre": [
    ["Integrado de Fisiología-Fisiopatología 2", "DMOR0023", ["DMOR0022"]],
    ["Farmacología General", "BDIO1098", ["DMOR0022"]],
    ["Salud Poblacional", "DSPU0012", []],
    ["Enfermería en el Curso de la Vida", "ENFEC005", []],
    ["Educación para la Salud", "ENFEC005", []],
    ["Comunicación Interdisciplinar", "ENFEC006", []]
  ],
  "Cuarto semestre": [
    ["Gestión del Cuidado del Adulto 1", "ENFED005", ["ENFEC004"]],
    ["Ética", "FORI0002", ["FORI0001"]],
    ["Bases de práctica basada en evidencia", "ENFED006", []],
    ["Administración para la gestión del cuidado", "ENFED007", []],
    ["HITO EVALUATIVO INTEGRATIVO", "ENFED008", ["Segundo y Tercer semestre"]]
  ],
  "Quinto semestre": [
    ["Persona y sociedad", "FORI0003", ["FORI0002"]],
    ["Gestión del cuidado del adulto 2", "ENFEE004", ["ENFED005"]],
    ["Bioestadística y Salud", "DCEX0015", []],
    ["Epidemiología", "DSPU0014", ["DSPU0012"]],
    ["Medioambiente, salud y enfermería", "ENFEE005", ["ENFED007"]],
    ["Gestión de proyectos en Salud", "ENFEE006", ["ENFED007"]]
  ],
  "Sexto semestre": [
    ["Electivo 1: Formación integral", "ELECFORI01", []],
    ["Gestión del cuidado en la persona mayor", "ENFEF005", ["ENFEE004"]],
    ["Enfermería en Salud Mental y Psiquiatría", "ENFEF006", ["ENFEE004"]],
    ["Liderazgo y toma de decisiones en salud", "ENFEF007", ["ENFEE005"]],
    ["Metodología de la Investigación", "DSPU0013", []]
  ],
  "Séptimo semestre": [
    ["Electivo 2: Formación integral", "ELECFORI02", []],
    ["Gestión del cuidado en la niñez y adolescencia", "ENFEG003", ["ENFEE004"]],
    ["Enfermería en salud familiar y comunitaria", "ENFEG004", ["ENFEF006"]],
    ["Gerencia y gobernanza para la gestión en salud", "ENFEG005", ["ENFEF007"]],
    ["Bioética", "DEBI0001", []],
    ["Proyecto de Investigación", "ENFEG006", ["DSPU0013"]]
  ],
  "Octavo semestre": [
    ["Electivo 3: Formación integral", "ELECFORI03", []],
    ["Enfermería de urgencia", "ENFEH002", ["ENFEG003"]],
    ["Enfermería en oncología y cuidados paliativos", "ENFEH003", ["ENFEG004"]],
    ["Liderazgo para la gestión del cambio en equipos de salud", "ENFEH004", ["ENFEG005"]],
    ["Práctica basada en la evidencia", "ENFEH005", ["ENFEG006"]],
    ["HITO EVALUATIVO INTEGRATIVO", "ENFEH006", ["Sexto y Séptimo semestre"]]
  ],
  "Noveno semestre": [
    ["Gestión de carrera y desarrollo profesional", "ELECDEE03", []],
    ["Internado clínico asistencial", "ENFEI003", ["Séptimo y Octavo semestre"]],
    ["Electivo 1", "ELECENFE01", ["Séptimo y Octavo semestre"]]
  ],
  "Décimo semestre": [
    ["Internado en salud familiar y comunitaria", "ENFEJ001", ["Séptimo y Octavo semestre"]],
    ["Internado de gestión en salud", "ENFEJ002", ["Séptimo y Octavo semestre"]],
    ["Electivo 2", "ELECENFE02", ["Séptimo y Octavo semestre"]]
  ]
};

const malla = document.getElementById("malla");
const detalle = document.getElementById("detalle");

let aprobados = new Set();
let desbloqueados = new Set();

// Inicializamos los desbloqueados con los ramos sin prerrequisitos
function inicializarDesbloqueados() {
  desbloqueados.clear();
  for (const semestre in ramosPorSemestre) {
    for (const [nombre, codigo, prereqs] of ramosPorSemestre[semestre]) {
      if (prereqs.length === 0) {
        desbloqueados.add(codigo);
      }
    }
  }
}

// Verifica si todos los prerrequisitos están aprobados
function prerrequisitosAprobados(prereqs) {
  return prereqs.every(p => aprobados.has(p));
}

// Cuando apruebas un ramo, desbloquea los que dependen de él
function actualizarDesbloqueados() {
  let cambio = false;
  for (const semestre in ramosPorSemestre) {
    for (const [nombre, codigo, prereqs] of ramosPorSemestre[semestre]) {
      if (!desbloqueados.has(codigo)) {
        if (prerrequisitosAprobados(prereqs)) {
          desbloqueados.add(codigo);
          cambio = true;
        }
      }
    }
  }
  // Si se desbloquearon nuevos ramos, intentar actualizar otra vez para cadena
  if (cambio) actualizarDesbloqueados();
}

function crearTarjeta(nombre, codigo) {
  const div = document.createElement("div");
  div.className = "ramo";

  if (!desbloqueados.has(codigo)) {
    div.style.display = "none";
  }
  
  if (aprobados.has(codigo)) {
    div.classList.add("aprobado");
  }
  div.textContent = `${nombre}\n(${codigo})`;
  div.addEventListener("click", () => {
    if (desbloqueados.has(codigo) && !aprobados.has(codigo)) {
      aprobados.add(codigo);
      actualizarDesbloqueados();
      actualizarMalla();
    }
    detalle.classList.remove("hidden");
    detalle.innerHTML = `
      <h2>${nombre}</h2>
      <p><strong>Código:</strong> ${codigo}</p>
      <p><strong>Prerrequisitos:</strong> ${prereqText(codigo)}</p>
      <p><strong>Estado:</strong> ${aprobados.has(codigo) ? "✅ Aprobado" : "⏳ Pendiente"}</p>
    `;
  });
  return div;
}

function prereqText(codigo) {
  for (const semestre in ramosPorSemestre) {
    for (const [nombre, cod, prereqs] of ramosPorSemestre[semestre]) {
      if (cod === codigo) {
        return prereqs.length ? prereqs.join(", ") : "Ninguno";
      }
    }
  }
  return "Ninguno";
}

function actualizarMalla() {
  malla.innerHTML = "";
  for (const semestre in ramosPorSemestre) {
    const container = document.createElement("div");
    container.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    container.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "ramos";

    for (const [nombre, codigo] of ramosPorSemestre[semestre]) {
      const tarjeta = crearTarjeta(nombre, codigo);
      grid.appendChild(tarjeta);
    }

    container.appendChild(grid);
    malla.appendChild(container);
  }
}

// Inicializar al cargar la página
inicializarDesbloqueados();
actualizarMalla();

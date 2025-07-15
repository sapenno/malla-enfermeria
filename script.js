
const ramos = [
  { nombre: "Morfología Básica", prerequisitos: [] },
  { nombre: "Química General y Orgánica", prerequisitos: [] },
  { nombre: "Biología Celular", prerequisitos: [] },
  { nombre: "Psicología Evolutiva", prerequisitos: [] },
  { nombre: "Antropología Ética Persona y Sociedad", prerequisitos: [] },
  { nombre: "Integrado Fisiología‑Fisiopatología I", prerequisitos: ["Morfología Básica", "Biología Celular", "Química General y Orgánica"] },
  { nombre: "Bioquímica General", prerequisitos: ["Química General y Orgánica"] },
  { nombre: "Microbiología General", prerequisitos: ["Biología Celular", "Química General y Orgánica"] },
  { nombre: "Salud Digital", prerequisitos: [] },
  { nombre: "Electivo I (Formación e Identidad)", prerequisitos: [] },
  { nombre: "Integrado Fisiología‑Fisiopatología II", prerequisitos: ["Integrado Fisiología‑Fisiopatología I"] },
  { nombre: "Farmacología General", prerequisitos: ["Integrado Fisiología‑Fisiopatología I", "Bioquímica General"] },
  { nombre: "Epidemiología", prerequisitos: [] },
  { nombre: "Bases de la Enfermería y su Rol en el Liderazgo", prerequisitos: [] },
  { nombre: "Electivo II (Formación e Identidad)", prerequisitos: [] },
  { nombre: "Bioestadística y Salud", prerequisitos: ["Epidemiología"] },
  { nombre: "Salud Poblacional", prerequisitos: ["Epidemiología"] },
  { nombre: "Educación para la Salud", prerequisitos: ["Bases de la Enfermería y su Rol en el Liderazgo"] },
  { nombre: "Salud Intercultural", prerequisitos: [] },
  { nombre: "Electivo III (Formación e Identidad)", prerequisitos: [] },
  { nombre: "Metodología de la Investigación", prerequisitos: ["Epidemiología", "Bioestadística y Salud"] },
  { nombre: "Calidad, Seguridad e IAAS", prerequisitos: ["Microbiología General"] },
  { nombre: "Gestión del Cuidado del Adulto I", prerequisitos: ["Integrado Fisiología‑Fisiopatología II", "Bases de la Enfermería y su Rol en el Liderazgo"] },
  { nombre: "Medio Ambiente, Salud y Enfermería", prerequisitos: ["Salud Poblacional"] },
  { nombre: "Comunicación Interdisciplinar", prerequisitos: ["Bases de la Enfermería y su Rol en el Liderazgo"] },
  { nombre: "Gestión del Cuidado del Adulto II", prerequisitos: ["Gestión del Cuidado del Adulto I"] },
  { nombre: "Gestión del Cuidado en la Persona Mayor", prerequisitos: ["Gestión del Cuidado del Adulto I"] },
  { nombre: "Bases de Práctica Basada en Evidencia", prerequisitos: ["Metodología de la Investigación"] },
  { nombre: "Enfermería en Salud Mental y Psiquiatría", prerequisitos: ["Psicología Evolutiva"] },
  { nombre: "Proyecto de Investigación", prerequisitos: ["Metodología de la Investigación"] },
  { nombre: "Gestión del Cuidado en la Niñez y Adolescencia", prerequisitos: ["Integrado Fisiología‑Fisiopatología II", "Bases de la Enfermería y su Rol en el Liderazgo"] },
  { nombre: "Enfermería en Salud Familiar y Comunitaria", prerequisitos: ["Salud Poblacional", "Comunicación Interdisciplinar"] },
  { nombre: "Enfermería en Urgencia", prerequisitos: ["Gestión del Cuidado del Adulto II"] },
  { nombre: "Enfermería en Oncología y Cuidados Paliativos", prerequisitos: ["Gestión del Cuidado del Adulto II"] },
  { nombre: "Administración para la Gestión del Cuidado", prerequisitos: ["Bases de la Enfermería y su Rol en el Liderazgo"] },
  { nombre: "Gestión de Proyectos en Salud", prerequisitos: ["Administración para la Gestión del Cuidado"] },
  { nombre: "Liderazgo y Toma de Decisiones en Salud", prerequisitos: ["Administración para la Gestión del Cuidado"] },
  { nombre: "Gerencia y Gobernanza para la Gestión en Salud", prerequisitos: ["Liderazgo y Toma de Decisiones en Salud"] },
  { nombre: "Práctica Basada en la Evidencia", prerequisitos: ["Bases de Práctica Basada en Evidencia"] },
  { nombre: "Bioética", prerequisitos: ["Proyecto de Investigación"] },
  { nombre: "Liderazgo para la Gestión del Cambio en Equipos de Salud", prerequisitos: ["Gerencia y Gobernanza para la Gestión en Salud"] },
  { nombre: "Internado Clínico Asistencial", prerequisitos: ["all"] },
  { nombre: "Internado Salud Familiar y Comunitaria", prerequisitos: ["Enfermería en Salud Familiar y Comunitaria"] },
  { nombre: "Internado Gestión en Salud", prerequisitos: ["Gestión de Proyectos en Salud", "Gerencia y Gobernanza para la Gestión en Salud"] },
  { nombre: "Electivo Disciplinar (I o II)", prerequisitos: [] },
  { nombre: "Gestión de Carrera y Desarrollo Profesional", prerequisitos: ["90"] },
  { nombre: "HIT Evaluativo Integrativo Interprofesional", prerequisitos: ["Internado Clínico Asistencial", "Proyecto de Investigación"] },
  { nombre: "HIT Evaluativo Integrativo", prerequisitos: ["100"] },
  { nombre: "Título y Grado (Examen o equivalente)", prerequisitos: ["all"] },
];

const malla = document.getElementById("malla");
const detalle = document.getElementById("detalle");

let aprobados = new Set();

function puedeAprobar(ramo) {
  return ramo.prerequisitos.every(req => {
    if (req === "all") return false;   // simplificación de regla
    if (req === "90" || req === "100") return false; // requisitos globales
    return aprobados.has(req);
  });
}

function actualizarMalla() {
  malla.innerHTML = "";
  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    if (aprobados.has(ramo.nombre)) div.classList.add("aprobado");
    div.textContent = ramo.nombre;
    div.addEventListener("click", () => {
      if (!aprobados.has(ramo.nombre) && puedeAprobar(ramo)) {
        aprobados.add(ramo.nombre);
        actualizarMalla();
      }
      detalle.classList.remove("hidden");
      detalle.innerHTML = `
        <h2>${ramo.nombre}</h2>
        <p><strong>Prerrequisitos:</strong> ${ramo.prerequisitos.length ? ramo.prerequisitos.join(", ") : "Ninguno"}</p>
        <p><strong>Estado:</strong> ${aprobados.has(ramo.nombre) ? "Aprobado ✅" : "Pendiente ⏳"}</p>
      `;
    });
    malla.appendChild(div);
  });
}

actualizarMalla();

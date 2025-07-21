let malla = [];
let materiasPorId = {};
let completadas = JSON.parse(localStorage.getItem("materiasCompletadas") || "[]");

async function cargarMalla() {
  const res = await fetch('malla.json');
  const data = await res.json();
  malla = data.mallaData;

  // Mapear materias por ID
  malla.forEach(periodo => {
    periodo.materias.forEach(m => {
      materiasPorId[m.id] = m;
    });
  });

  renderMalla();
}

function guardarProgreso() {
  localStorage.setItem("materiasCompletadas", JSON.stringify(completadas));
}

function estaDesbloqueada(materia) {
  return materia.requisitos.every(reqId => completadas.includes(reqId));
}

function toggleMateria(id) {
  const index = completadas.indexOf(id);
  if (index >= 0) {
    completadas.splice(index, 1);
  } else {
    completadas.push(id);
  }
  guardarProgreso();
  renderMalla();
}

function renderMalla() {
  const container = document.getElementById("mallaContainer");
  container.innerHTML = "";

  const años = [...new Set(malla.map(e => e.año))];

  años.forEach(anio => {
    const anioDiv = document.createElement("div");
    anioDiv.className = "anio";
    anioDiv.innerHTML = `<h2>Año ${anio}</h2>`;

    const periodos = malla.filter(p => p.año === anio && p.materias.length > 0);
    periodos.forEach(p => {
      const periodoDiv = document.createElement("div");
      periodoDiv.className = "periodo";
      periodoDiv.innerHTML = `<h3>${p.periodo}</h3>`;

      p.materias.forEach(m => {
        const materiaDiv = document.createElement("div");
        materiaDiv.className = "materia";
        materiaDiv.textContent = `${m.nombre} (${m.creditos} créditos)`;

        const completada = completadas.includes(m.id);
        const desbloqueada = estaDesbloqueada(m);

        if (completada) {
          materiaDiv.classList.add("completed");
        } else if (!desbloqueada && m.requisitos.length > 0) {
          materiaDiv.classList.add("locked");
        } else {
          materiaDiv.addEventListener("click", () => toggleMateria(m.id));
        }

        periodoDiv.appendChild(materiaDiv);
      });

      anioDiv.appendChild(periodoDiv);
    });

    container.appendChild(anioDiv);
  });
}

cargarMalla();

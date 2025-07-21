let mallaData = [];
let estructuraPorAnio = [];

async function cargarMalla() {
  const res = await fetch('malla.json');
  const data = await res.json();
  mallaData = data.mallaData;
  estructuraPorAnio = data.estructuraPorAnio;
  poblarAnios(data.cantidadAnios);
}

function poblarAnios(cantidad) {
  const select = document.getElementById("selectAnio");
  for (let i = 1; i <= cantidad; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Año ${i}`;
    select.appendChild(option);
  }
  select.addEventListener("change", (e) => mostrarMallaPorAnio(e.target.value));
}

function mostrarMallaPorAnio(anioSeleccionado) {
  const container = document.getElementById("mallaContainer");
  container.innerHTML = '';

  const periodos = mallaData.filter((e) => e.año == anioSeleccionado && e.materias.length > 0);
  periodos.forEach(periodo => {
    const divPeriodo = document.createElement("div");
    divPeriodo.className = "periodo";
    divPeriodo.innerHTML = `<h3>${periodo.periodo}</h3>`;

    periodo.materias.forEach(materia => {
      const divMateria = document.createElement("div");
      divMateria.className = "materia";
      divMateria.innerHTML = `
        <strong>${materia.nombre}</strong> (${materia.creditos} créditos)<br/>
        ${materia.requisitos.length > 0 ? "<em>Requiere:</em> " + materia.requisitos.length + " asignatura(s)" : "<em>Sin requisitos</em>"}
      `;
      divPeriodo.appendChild(divMateria);
    });

    container.appendChild(divPeriodo);
  });
}

cargarMalla();

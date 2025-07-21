let materiasCompletadas = JSON.parse(localStorage.getItem('materiasCompletadas')) || [];

async function cargarMalla() {
  const res = await fetch('malla.json');
  const data = await res.json();
  const contenedor = document.getElementById('malla-container');

  // Mapa para mostrar nombres de los requisitos
  const idToNombre = {};
  data.mallaData.forEach(bloque =>
    bloque.materias.forEach(m =>
      idToNombre[m.id] = m.nombre
    )
  );

  const anios = {};

  data.mallaData.forEach((bloque) => {
    if (!anios[bloque.año]) {
      anios[bloque.año] = [];
    }
    anios[bloque.año].push(bloque);
  });

  Object.keys(anios).forEach((anio) => {
    const columna = document.createElement('div');
    columna.className = 'anio';
    columna.innerHTML = `<h3>${anio}° Año</h3>`;

    anios[anio].forEach((bloque) => {
      if (bloque.materias.length > 0) {
        const div = document.createElement('div');
        div.className = 'semestre';
        div.innerHTML = `<h2>${bloque.periodo}</h2>`;

        bloque.materias.forEach((materia) => {
          const matDiv = document.createElement('div');
          matDiv.className = 'materia';
          matDiv.textContent = materia.nombre;
          matDiv.dataset.id = materia.id;
          matDiv.onclick = () => toggleMateria(materia);

          const completada = materiasCompletadas.includes(materia.id);
          const habilitada = materia.requisitos.length === 0 ||
                             materia.requisitos.every(req => materiasCompletadas.includes(req));

          if (completada) matDiv.classList.add('completed');
          if (!habilitada && !completada) {
            matDiv.classList.add('disabled');

            const requisitosNombres = materia.requisitos.map(id => idToNombre[id]).join(', ');
            matDiv.title = "Requiere: " + requisitosNombres;
          }

          div.appendChild(matDiv);
        });

        columna.appendChild(div);
      }
    });

    contenedor.appendChild(columna);
  });
}

function toggleMateria(materia) {
  if (materiasCompletadas.includes(materia.id)) {
    materiasCompletadas = materiasCompletadas.filter(id => id !== materia.id);
  } else {
    materiasCompletadas.push(materia.id);
  }
  localStorage.setItem('materiasCompletadas', JSON.stringify(materiasCompletadas));
  location.reload();
}

document.addEventListener('DOMContentLoaded', cargarMalla);

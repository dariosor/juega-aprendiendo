// Palabras ocultas (puedes añadir más)
const palabras = ["SOL", "LUNA", "RIO", "BOLIVIA", "PAZ", "ESCOLA"];
const gridSize = 12; // tamaño de la sopa

const sopaDiv = document.getElementById("sopa");
const listaPalabrasDiv = document.getElementById("lista-palabras");
const resultadoDiv = document.getElementById("resultado");

let grid = [];
let seleccion = [];
let encontradas = [];

// Mostrar palabras a encontrar
palabras.forEach(p => {
  let li = document.createElement("li");
  li.textContent = p;
  listaPalabrasDiv.appendChild(li);
});

// Inicializar grilla vacía
for (let i = 0; i < gridSize; i++) {
  grid[i] = new Array(gridSize).fill("");
}

// Insertar palabras horizontalmente (simple, se puede mejorar)
palabras.forEach(pal => {
  let fila = Math.floor(Math.random() * gridSize);
  let col = Math.floor(Math.random() * (gridSize - pal.length));
  for (let i = 0; i < pal.length; i++) {
    grid[fila][col + i] = pal[i];
  }
});

// Llenar el resto con letras aleatorias
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
for (let f = 0; f < gridSize; f++) {
  for (let c = 0; c < gridSize; c++) {
    if (grid[f][c] === "") {
      grid[f][c] = letras[Math.floor(Math.random() * letras.length)];
    }
  }
}

// Renderizar sopa
sopaDiv.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
for (let f = 0; f < gridSize; f++) {
  for (let c = 0; c < gridSize; c++) {
    let celda = document.createElement("div");
    celda.textContent = grid[f][c];
    celda.dataset.fila = f;
    celda.dataset.col = c;
    celda.addEventListener("click", seleccionarLetra);
    sopaDiv.appendChild(celda);
  }
}

// Selección de letras
function seleccionarLetra(e) {
  let celda = e.target;
  if (celda.classList.contains("seleccionado")) return;

  celda.classList.add("seleccionado");
  seleccion.push(celda.textContent);

  let palabraActual = seleccion.join("");
  // ¿Coincide con alguna palabra?
  palabras.forEach(p => {
    if (palabraActual.includes(p) && !encontradas.includes(p)) {
      encontradas.push(p);
      resultadoDiv.innerHTML = `✔ Encontraste: ${p}`;
      marcarPalabra(p);
      sumarPuntos(50); // +50 puntos al marcador global
    }
  });

  // Si encontró todas
  if (encontradas.length === palabras.length) {
    resultadoDiv.innerHTML = "🎉 ¡Has encontrado todas las palabras!";
  }
}

// Marcar palabra encontrada en la lista
function marcarPalabra(p) {
  [...listaPalabrasDiv.children].forEach(li => {
    if (li.textContent === p) li.style.textDecoration = "line-through";
  });
}

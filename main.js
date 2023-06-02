const drawingBoard = document.querySelector("#drawing-board");
const askGridBtn = document.querySelector("#ask-grid-btn");

let grid = 0;
askGridBtn.addEventListener("click", () => {
  grid = prompt("Set the the Grid (Min: 16, Max: 64)");
  if (grid <= 15 || grid > 100) {
    alert("Allowed grid is between 16 - 100");
    grid = 0;
  } else {
    renderGrid(grid);
  }
});

function renderGrid(gridCount) {
  clearGrid();

  drawingBoard.setAttribute(
    "style",
    `grid-template-columns: repeat(${grid}, 1fr);grid-template-rows: repeat(${grid}, 1fr);`
  );

  let gridOffset = drawingBoard.offsetWidth / grid;

  for (let i = 0; i < gridCount * gridCount; i++) {
    const div = document.createElement("div");
    div.setAttribute(
      "style",
      `height: ${gridOffset}px; width: ${gridOffset}px`
    );
    div.classList.add("block");
    drawingBoard.appendChild(div);
  }
}

function clearGrid() {
  drawingBoard.innerHTML = "";
}

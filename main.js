const drawingBoard = document.querySelector("#drawing-board");
const gridBtn = document.querySelectorAll(".grid-btn");

let grid = 16;
renderGrid(grid);

gridBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    grid = Number(btn.dataset.value);
    renderGrid(grid);
  });
});

function renderGrid(gridCount) {
  clearGrid();

  drawingBoard.setAttribute(
    "style",
    `grid-template-columns: repeat(${grid}, 1fr);grid-template-rows: repeat(${grid}, 1fr);`
  );

  let gridOffset = drawingBoard.offsetWidth / grid;

  // RENDER GRID
  for (let i = 0; i < gridCount * gridCount; i++) {
    const div = document.createElement("div");
    div.setAttribute(
      "style",
      `height: ${gridOffset}px; width: ${gridOffset}px`
    );
    div.classList.add("block");
    drawingBoard.appendChild(div);

    // DRAW
    let drawMode = false;
    window.addEventListener("mousedown", (e) => {
      drawMode = true;
    });

    window.addEventListener("mouseup", () => {
      drawMode = false;
    });

    div.addEventListener("mouseover", () => {
      if (drawMode) {
        div.style.backgroundColor = "#000";
      }
    });
  }
}
// CLEAR GRID
function clearGrid() {
  drawingBoard.innerHTML = "";
}

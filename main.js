const colorPallet = document.querySelector('input[type="color"]');
const drawingBoard = document.querySelector(".drawing-board");
// buttons
const gridPickerBtn = document.querySelectorAll(".grid-picker button");

// INIT
let gridSize = 16;
let drawingBoardOffset = drawingBoard.offsetWidth;

drawingBoard.style = `
      grid-template-columns: repeat(${gridSize}, 1fr);
      grid-template-rows: repeat(${gridSize}, 1fr)`;

// EVENT LISTENERS
gridPickerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearCanvas(drawingBoard);
    gridSize = Number(getGridSize(btn));
    drawingBoard.style = `
      grid-template-columns: repeat(${gridSize}, 1fr);
      grid-template-rows: repeat(${gridSize}, 1fr)`;

    setGridCanvas(drawingBoard, gridSize);
  });
});

// FUNCTIONS
function getGridSize(button) {
  return button.dataset.grid;
}

function setGridCanvas(container, count) {
  for (let i = 0; i < count ** 2; i++) {
    const div = document.createElement("div");
    div.style = `
      border: 1px solid #ccc;
      height: ${drawingBoardOffset / gridSize}px;
      `;
    container.appendChild(div);
  }
}

function clearCanvas(canvas) {
  canvas.innerHTML = "";
}

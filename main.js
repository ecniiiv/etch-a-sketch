const drawingBoard = document.querySelector(".drawing-board");
const savedColorBtn = document.querySelectorAll(".saved-color");

// buttons
const colorPallete = document.querySelectorAll('input[type="color"]');
const gridPickerBtn = document.querySelectorAll(".grid-picker button");

// INIT
let gridSize = 16;
let drawingBoardOffset = drawingBoard.offsetWidth;

// EVENT LISTENERS
gridPickerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    gridSize = Number(getGridSize(btn));
    setCanvas(btn);
  });
});

let chosenColor = "#000000";
savedColorBtn.forEach((btn) => {
  btn.style = `background-color: ${btn.dataset.color}`;
  btn.addEventListener("click", () => {
    chosenColor = setColor(btn);

    console.log("chosen Color", chosenColor);
  });
});

// FUNCTIONS

function getGridSize(button) {
  return button.dataset.grid;
}

function setCanvas() {
  clearCanvas(drawingBoard);
  drawingBoard.style = `
      grid-template-columns: repeat(${gridSize}, 1fr);
      grid-template-rows: repeat(${gridSize}, 1fr);
      `;
  renderGridCanvas(drawingBoard, gridSize);
}

function renderGridCanvas(container, count) {
  for (let i = 0; i < count ** 2; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("disabled-select");
    div.style = `
      height: ${drawingBoardOffset / gridSize}px;
      border: 1px solid #ccc
      `;
    draw(div);
  }
}

function setColor(controller) {
  return controller.dataset.color;
}

let drawMode = false;
function draw(target) {
  window.addEventListener("mousedown", () => {
    drawMode = true;
  });
  window.addEventListener("mouseup", () => {
    drawMode = false;
  });
  target.addEventListener("click", () => {
    target.setAttribute("style", `background-color: ${chosenColor}`);
  });
  target.addEventListener("mouseover", () => {
    if (drawMode === true) {
      target.setAttribute("style", `background-color: ${chosenColor}`);
    }
  });
}

function clearCanvas(canvas) {
  canvas.innerHTML = "";
}

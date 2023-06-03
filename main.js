const drawingBoard = document.querySelector(".drawing-board");
const gridPickerBtn = document.querySelectorAll(".grid-picker button");
const colorPickerBtn = document.querySelectorAll("button[data-color]");
const colorPickerWheel = document.querySelector("input[type='color'");
const staticColor = document.querySelector(".color-picker .static");
const addButton = document.querySelector(".add-color");

let gridSize = 16;
let drawingBoardOffset = drawingBoard.offsetWidth;
let penColor = "#000000";
let colorWheelColor = "";

setCanvas();

gridPickerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    gridSize = btn.dataset.grid;

    setCanvas();
  });
});

colorPickerBtn.forEach((btn) => {
  btn.style.backgroundColor = `${btn.dataset.color}`;
  btn.addEventListener("click", () => setPenColor(btn));
});

colorPickerWheel.addEventListener("change", () => {
  setPenColorWheel(colorPickerWheel);
});

addButton.addEventListener("click", () => {
  if (staticColor.children.length < 12) {
    const button = document.createElement("button");
    button.classList.add("saved-color");
    button.setAttribute("data-color", `${colorWheelColor}`);
    button.style.backgroundColor = `${button.dataset.color}`;
    staticColor.appendChild(button);

    button.addEventListener("click", () => setPenColor(button));
  } else {
    alert("cannot add more Color to the pallete (limit: 10)");
  }
});

// SET UP
function setCanvas() {
  drawingBoard.innerHTML = "";

  drawingBoard.style = `
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
    `;

  for (let i = 0; i < gridSize ** 2; i++) {
    const div = document.createElement("div");
    div.classList.add("disabled-select");
    div.style = `
      height: ${drawingBoardOffset / gridSize}px;
      `;
    drawingBoard.appendChild(div);
    draw(div);
  }
}

function setPenColor(controller) {
  penColor = controller.dataset.color;
}
function setPenColorWheel(controller) {
  penColor = controller.value;
  colorWheelColor = controller.value;
}

// FUNCTIONALITIES

let drawMode = false;
window.addEventListener("mousedown", () => (drawMode = true));
window.addEventListener("mouseup", () => (drawMode = false));

function draw(div) {
  div.addEventListener("mouseover", () => {
    if (drawMode === true) {
      div.style.backgroundColor = penColor;
    }
  });
  div.addEventListener("click", () => {
    div.style.backgroundColor = penColor;
  });
}

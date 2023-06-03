const drawingBoard = document.querySelector(".drawing-board");
const gridPickerBtn = document.querySelectorAll(".grid-picker button");
const colorPickerBtn = document.querySelectorAll("button[data-color]");
const colorPickerWheel = document.querySelector("input[type='color'");
const staticColors = document.querySelector(".color-picker .static");
const addButton = document.querySelector(".add-color");
const removeColorbtn = document.querySelector(".remove-color");
const rbImage = document.querySelector(".remove-color img");

let gridSize = 16;
let drawingBoardOffset = drawingBoard.offsetWidth;
let penColor = "#000000";
let colorWheelColor = "";

// STATUSES
let drawMode = false;
let removeColorMode = false;

// INITIALIZE
setCanvas();

gridPickerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    gridSize = btn.dataset.grid;

    setCanvas();
  });
});

colorPickerBtn.forEach((btn) => {
  btn.style.backgroundColor = `${btn.dataset.color}`;
  btn.addEventListener("click", () => {
    if (removeColorMode) {
      staticColors.removeChild(btn);
    } else {
      setPenColor(btn);
    }
  });
});

colorPickerWheel.addEventListener("change", () => {
  setPenColorWheel(colorPickerWheel);
});

addButton.addEventListener("click", () => addToPallete());
removeColorbtn.addEventListener("click", () => {
  removeColorMode = !removeColorMode;
  if (removeColorMode) {
    rbImage.setAttribute("src", "./assets/done.svg");
  } else {
    rbImage.setAttribute("src", "./assets/trash.svg");
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
    div.classList.add("saved-color");
    div.style = `
      height: ${drawingBoardOffset / gridSize}px;
      `;
    drawingBoard.appendChild(div);
    draw(div);
  }
}

// FUNCTIONALITIES

function setPenColor(controller) {
  penColor = controller.dataset.color;
}

function setPenColorWheel(controller) {
  penColor = controller.value;
  colorWheelColor = controller.value;
}

function addToPallete() {
  if (staticColors.children.length < 12) {
    const button = document.createElement("button");
    button.classList.add("saved-color");
    button.setAttribute("data-color", `${colorWheelColor}`);
    button.style.backgroundColor = `${button.dataset.color}`;
    staticColors.appendChild(button);

    button.addEventListener("click", () => {
      if (removeColorMode) {
        staticColors.removeChild(button);
        removeColorMode = false;
        console.log(removeColorMode);
      } else {
        setPenColor(button);
      }
    });
  } else {
    alert("cannot add more Color to the pallete (limit: 10)");
  }
}

// function removeToPallete(color) {
//   if(removeColorMode) {
//     color.data
//   }
// }

window.addEventListener("mousedown", () => (drawMode = true));
window.addEventListener("mouseup", () => (drawMode = false));

function draw(div) {
  div.addEventListener("click", () => {
    div.style.backgroundColor = penColor;
  });

  div.addEventListener("mouseover", () => {
    if (drawMode === true) {
      div.style.backgroundColor = penColor;
    }
  });
}

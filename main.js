const drawingBoard = document.querySelector(".drawing-board");
const gridPickerBtn = document.querySelectorAll(".grid-picker button");
const colorPickerBtn = document.querySelectorAll("button[data-color]");
const colorPickerWheel = document.querySelector("input[type='color'");
const staticColors = document.querySelector(".color-picker .static");
const addButton = document.querySelector(".add-color");
const removeColorbtn = document.querySelector(".remove-color");
const rbImage = document.querySelector(".remove-color img");
const activeColorBox = document.querySelector(".active-color .box");

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
      removeFromPallete(staticColors, btn);
    } else {
      setPenColor(btn);
      setActiveColor(activeColorBox);
    }
  });
});

colorPickerWheel.addEventListener("change", () => {
  setPenColorWheel(colorPickerWheel);
  setActiveColor(activeColorBox);
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

function setActiveColor(target) {
  target.style.backgroundColor = `${penColor}`;
}

function addToPallete() {
  if (staticColors.children.length < 12) {
    // creating a div element
    const button = document.createElement("button");
    button.classList.add("saved-color");
    button.setAttribute("data-color", `${colorWheelColor} `);
    button.style.backgroundColor = `${button.dataset.color}`;

    if (colorWheelColor !== "") {
      staticColors.appendChild(button);
    }

    button.addEventListener("click", () => {
      if (removeColorMode) {
        removeFromPallete(staticColors, button);
      } else {
        setPenColor(button);
        setActiveColor(activeColorBox);
      }
    });
  } else {
    alert("cannot add more Color to the pallete (limit: 10)");
  }
}

function removeFromPallete(origin, target) {
  origin.removeChild(target);
}

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

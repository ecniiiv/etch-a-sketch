const gridBtnXs = new Button(
  document.querySelector("#grid-options #xs"),
  "off"
);

const gridBtnSm = new Button(
  document.querySelector("#grid-options #sm"),
  "off"
);
const gridBtnMd = new Button(
  document.querySelector("#grid-options #md"),
  "off"
);
const gridBtnL = new Button(document.querySelector("#grid-options #l"), "off");

const eraseBtn = new Button(
  document.querySelector("#options button[id='eraser']"),
  "toggle"
);
const rainbowBtn = new Button(
  document.querySelector("#options button[id='rainbow']"),
  "toggle"
);
const clear = new Button(
  document.querySelector("#options button[id='clear']"),
  "preventMod"
);
// INIT
const canvas = document.querySelector("#canvas");
const setGridBtn = document.querySelector("#set-grid");
const colorPicker = document.querySelector("#selector input[type='color']");
const colorActive = document.querySelector("#color-status #active #square");
colorActive.dataset.active = "#000000";
let defaultGridSize = 16;

let canvasOffset = canvas.offsetWidth;
let penColor = colorActive.dataset.active;

let drawMode = false;
let eraserMode = false;
let rainbowMode = false;

let allowRunning = false;

let gridButtonList = [];
let optionButtonList = [];
gridButtonList.push([gridBtnXs, gridBtnL, gridBtnMd, gridBtnSm]);
optionButtonList.push([eraseBtn, rainbowBtn, clear]);

// Side Panel Buttons
gridButtonList.forEach((obj) => {
  obj.forEach((button) => {
    button.changeStatus(gridButtonList);
    button.listenFor("click", () => {
      if (defaultGridSize !== button.element.dataset.grid) {
        allowRunning = true;
      }
      defaultGridSize = button.element.dataset.grid;
    });
  });
});
optionButtonList.forEach((obj) => {
  obj.forEach((button) => {
    button.changeStatus(optionButtonList);
    button.listenFor("click", () => {
      if (button.element.id === "clear") {
        rainbowMode = false;
        eraserMode = false;
        setGrid(canvas, defaultGridSize);
      } else if (button.element.id === "eraser") {
        eraserMode = !eraserMode;
        rainbowMode = false;
      } else if (button.element.id === "rainbow") {
        rainbowMode = !rainbowMode;

        eraserMode = false;
      }
    });
  });
});

gridButtonList.forEach((obj) => {
  obj.forEach((button) => {
    if (button.element.dataset.grid == 16) {
      button.element.style.backgroundColor = "#85edab";
      button.element.style.color = "#333";
    }
  });
});

setGridBtn.addEventListener("click", () => {
  if (allowRunning) {
    allowRunning = false;
    setGrid(canvas, defaultGridSize);
  }
});

colorPicker.addEventListener(
  "change",
  () => (penColor = setActiveColor(colorPicker))
);

// eraseBtn.element.addEventListener("click", () => {
//   eraseMode = !eraseMode;
// })

// SET UP FUNCTIONS
setGrid(canvas, defaultGridSize);

function setGrid(canvas, size, mode) {
  canvas.innerHTML = "";
  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${defaultGridSize}, 1fr)`;

  canvas.addEventListener("mousedown", () => {
    drawMode = true;
  });
  canvas.addEventListener("mouseup", () => {
    drawMode = false;
  });

  for (let i = 0; i < size ** 2; i++) {
    const div = document.createElement("div");
    div.style.height = `${canvasOffset / defaultGridSize}px`;
    div.style.border = `1px solid #ccc`;
    div.classList.add("disable-select");
    canvas.appendChild(div);
    draw(div);

    // erase(canvas, div, penColor, eraseMode);
  }
}

function draw(target) {
  target.addEventListener("mouseover", () => {
    if (drawMode)
      if (eraserMode) {
        target.style.backgroundColor = "#ffffff";
      } else if (rainbowMode) {
        let r = Math.floor(Math.random() * 255) + 1;
        let g = Math.floor(Math.random() * 255) + 1;
        let b = Math.floor(Math.random() * 255) + 1;
        target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      } else {
        target.style.backgroundColor = penColor;
      }
  });

  target.addEventListener("click", () => {
    target.style.backgroundColor = eraserMode ? "#ffffff" : penColor;
  });
}

function clearCanvas(controller, canvas) {
  if (controller.id === "clear") {
    canvas.innerHTML = "";
  }
}

function setActiveColor(controller) {
  colorActive.dataset.active = controller.value;
  colorActive.style.backgroundColor = controller.value;
  return controller.value;
}

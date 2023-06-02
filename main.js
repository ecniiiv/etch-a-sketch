const drawingBoard = document.querySelector("#drawing-board");
const askGridBtn = document.querySelector("#ask-grid-btn");

// Set up drawing board grid

//  -- ASk for grid size
let grid = 0;
askGridBtn.addEventListener("click", () => {
  drawingBoard.innerHTML = "";
  grid = Number(prompt("Set up how many grids (max: )"));
  if (grid > 32) {
    alert("maximun of 100");
    grid = 0;
  } else if (grid > 15) {
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        console.log(i + j);

        drawingBoard.setAttribute(
          "style",
          `width: ${grid * grid}px; height: ${grid * grid}px`
        );

        drawingBoard.innerHTML += `
        <div class='block' 
        style="width: ${grid}px; height: ${grid}px">
        </div> 
        `;
      }
    }
  }
});

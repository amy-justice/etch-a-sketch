const gridSize = 10;

const canvasContainer = document.getElementById('canvas-container');

function addHover() {
    allSquares = document.querySelectorAll('.grid-square');
    console.log(allSquares);
    allSquares.forEach((square) => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = "black"
        })
    })
}

function buildCanvas() {
    for (i = 0; i < gridSize * gridSize; i++) {
        if (i % gridSize == 0) {
            //create new row
            canvasRow = document.createElement('canvas-row');
            canvasRow.classList.add('canvas-row');
            canvasContainer.appendChild(canvasRow);
        }
        gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        newRow = Array.from(document.querySelectorAll('.canvas-row')).pop();
        newRow.appendChild(gridSquare);
    }
    addHover();
}

buildCanvas();
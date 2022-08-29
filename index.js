let gridSize = 16;
let rainbow = false;
let eraser = false;

// change line color
const colorPicker = document.getElementById('line-color');
colorPicker.value = '#222222';
let lineColor = colorPicker.value;
colorPicker.addEventListener('change', (e) => {
    rainbow = false;
    eraser = false;
    lineColor = e.target.value;
});
colorPicker.addEventListener('click', () => {
    rainbow = false;
    eraser = false;
})

// rainbow mode
function rainbowMode() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function fillBox() {
    if (rainbow) {
        this.style.backgroundColor = rainbowMode();
    } else if (eraser) {
        this.style.backgroundColor = 'rgb(240, 240, 240)';
    } else {
        this.style.backgroundColor = lineColor;
    }
}

function startDrawing(e) {
    e.preventDefault();
    // start on first square
    if (rainbow) {
        e.target.style.backgroundColor = rainbowMode();
    } else if (eraser) {
        e.target.style.backgroundColor = 'rgb(240, 240, 240)';
    } else {
        e.target.style.backgroundColor = lineColor;
    }
    // continue drawing
    allSquares = document.querySelectorAll('.grid-square');
    allSquares.forEach((square) => {
        square.addEventListener('mouseover', fillBox)
    })
}

function stopDrawing(e) {
    e.preventDefault();
    allSquares = document.querySelectorAll('.grid-square');
    allSquares.forEach((square) => {
        square.removeEventListener('mouseover', fillBox)
    })
}

function resetCanvas() {
    allSquares = document.querySelectorAll('.grid-square');
    allSquares.forEach((square) => {
        square.style.backgroundColor = 'rgb(240, 240, 240)';
    })
}

function buildCanvas(gridSize) {
    for (i = 0; i < gridSize * gridSize; i++) {
        if (i % gridSize == 0) {
            // create new row
            canvasRow = document.createElement('div');
            canvasRow.classList.add('canvas-row');
            canvasContainer.appendChild(canvasRow);
        }
        gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        newRow = Array.from(document.querySelectorAll('.canvas-row')).pop();
        newRow.appendChild(gridSquare);
    }
}

function resizeCanvas(gridSize) {
    while (canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild);
    }
    buildCanvas(gridSize)
}

//drawing events
const canvasContainer = document.getElementById('canvas-container');
canvasContainer.addEventListener('mousedown', startDrawing);
canvasContainer.addEventListener('mouseup', stopDrawing);

// drawing tools

// eraser
const eraserButton = document.getElementById('eraser-button');
eraserButton.addEventListener('click', () => {
    if (!eraser) {
        rainbow = false;
        eraser = true;
    } else {
        eraser = false;
    }
})

// rainbow 
const rainbowButton = document.getElementById('rainbow-button');
rainbowButton.addEventListener('click', () => {
    if (!rainbow) {
        eraser = false;
        rainbow = true;
    } else {
        rainbow = false;
    }
})


// clear canvas
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetCanvas);

// change gridSize
const changeGrid = document.getElementById('change-grid');
const gridSizeText = document.getElementById('grid-size-text')
gridSizeText.innerHTML = gridSize + ' x ' + gridSize;
changeGrid.addEventListener('change', (e) => {
    gridSize = e.target.value;
    resizeCanvas(gridSize);
    gridSizeText.innerHTML = gridSize + ' x ' + gridSize;
})

buildCanvas(gridSize);
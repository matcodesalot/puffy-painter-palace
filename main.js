//Define the canvas, getContext, and dimensions
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

const CELL_SIZE = 20;
const ROWS = 20;
const COLS = 20;

canvas.width = CELL_SIZE * COLS;
canvas.height = CELL_SIZE * ROWS;

//This 2D array will hold the values for our map.
let grid = [];

let isMouseDown = false;

for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < COLS; col++) {
        grid[row][col] = 0;
        ctx.fillStyle = `white`;
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

//Draw horizontal lines
for (let row = 1; row < ROWS; row++) {
    ctx.fillStyle = `black`;
    ctx.beginPath();
    ctx.moveTo(0, row * CELL_SIZE);
    ctx.lineTo(canvas.width, row * CELL_SIZE);
    ctx.stroke();
}

//Draw vertical lines
for (let col = 1; col < COLS; col++) {
    ctx.fillStyle = `black`;
    ctx.beginPath();
    ctx.moveTo(col * CELL_SIZE, 0);
    ctx.lineTo(col * CELL_SIZE, canvas.height);
    ctx.stroke();
}

canvas.addEventListener(`mousedown`, (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const clickedRow = Math.floor(mouseY / CELL_SIZE);
    const clickedCol = Math.floor(mouseX / CELL_SIZE);

    //left mouse button
    if(e.button === 0) {
        const colorSelect = document.getElementById(`colorSelect`);
        const selectedColor = colorSelect.value;
    
        ctx.fillStyle = selectedColor;
        ctx.fillRect(clickedCol * CELL_SIZE, clickedRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        grid[clickedRow][clickedCol] = 1;
        isMouseDown = true;
        printGrid();
    }

    //right mouse button
    if(e.button === 2) {
        ctx.fillStyle = `white`;
        ctx.fillRect(clickedCol * CELL_SIZE, clickedRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        grid[clickedRow][clickedCol] = 0;
        isMouseDown = true;
        printGrid();
    }
});

canvas.addEventListener(`mousemove`, (e) => {
    if(isMouseDown) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const clickedRow = Math.floor(mouseY / CELL_SIZE);
        const clickedCol = Math.floor(mouseX / CELL_SIZE);
    
        //left mouse button held
        if(e.buttons === 1) {
            const colorSelect = document.getElementById(`colorSelect`);
            const selectedColor = colorSelect.value;
        
            ctx.fillStyle = selectedColor;
            ctx.fillRect(clickedCol * CELL_SIZE, clickedRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            grid[clickedRow][clickedCol] = 1;
            printGrid();
        }
    
        //right mouse button held
        if(e.buttons === 2) {
            ctx.fillStyle = `white`;
            ctx.fillRect(clickedCol * CELL_SIZE, clickedRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            grid[clickedRow][clickedCol] = 0;
            printGrid();
        }
    }
});

//set this to window.addEventListener instead of canvas.addEventListener to fix the mouse down off canvas.
window.addEventListener(`mouseup`, (e) => {
    isMouseDown = false;
});

//prevents the context menu from showing up when you right click
canvas.addEventListener(`contextmenu`, (e) => {
    e.preventDefault();
});

function printGrid() {
    let gridString = ``;
    for(let row = 0; row < ROWS; row++) {
        for(let col = 0; col < COLS; col++) {
            gridString += grid[row][col] + ` `;
        }
        gridString += `\n`;
    }

    console.log(gridString);
}
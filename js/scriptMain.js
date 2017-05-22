// 
// CREATE_FIELD 
//
function createField() {
    var x, y, cell; 
    for (y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) { 
            cell = createCellNull(); 
            cell.y = y; 
            cell.x = x; 
            setCellOffset(cell); 
            appendCell(cell);
        }
    }
} 

function createCellNull() {
    var square = document.createElement("div"); 
    square.classList.add("field__cell", "field__cell--null"); 
    return square;
} 

function setCellOffset(cell) { 
    cell.style.left = (20 + (20 + 125) * cell.x) + "px"; 
    cell.style.top = (20 + (20 + 125) * cell.y) + "px"; 
} 

function appendCell(square) {
    var field = document.getElementById("field"); 
    field.appendChild(square); 
}  


// 
// GLOBAL_ARRAY 
// 
var tiles = []; 

// 
// GLOBAL_OBJECT 
// 
var freeCell = {
    x: 3, 
    y: 3
}; 

// 
// GAME IS STARTED? 
//
var started = false;

// 
// CREATE_TILES
//
function createTiles() {
    var x, y, cell; 
    for (y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) { 
            if(y < 3 || x < 3) {
                cell = createCellTiles(); 
                cell.y = y; 
                cell.x = x; 
                setTileValue(cell);
                setCellOffset(cell); 
                appendCell(cell);
                tiles.push(cell);
            }
        }
    } 
}

function createCellTiles() {
    var square = document.createElement("div"); 
    square.classList.add("field__cell", "field__cell--tile"); 
    return square;
} 

function setTileValue(cell) { 
    cell.innerHTML = (cell.y * 4 + cell.x + 1) + "";
} 

var step = 0; 
var stepText = document.getElementById("stepBox");
function tileClick(event) {
    var bar = event.target, tile; 
    var oldPosition;  
    if (bar.y == freeCell.y) {
        oldPosition = { x: bar.x, y: bar.y };
        for (var i = 0; i < 15; ++i) {
            tile = tiles[i];
            if (tile.y == bar.y && between(bar.x, freeCell.x, tile.x)) {
                if (bar.x < freeCell.x) {
                    tile.x++;
                } else {
                    tile.x--;
                }
            } 
            setCellOffset(tile);
        }
        freeCell = oldPosition;
        if (started) {
            step++; 
            stepText.innerHTML = step; 
        }
    } else if(bar.x == freeCell.x) {
        oldPosition = { x: bar.x, y: bar.y };
        for (var i = 0; i < 15; ++i) {
            tile = tiles[i];
            if (tile.x == bar.x && between(bar.y, freeCell.y, tile.y)) {
                if (bar.y < freeCell.y) {
                    tile.y++;
                } else {
                    tile.y--;
                }
            } 
            setCellOffset(tile);
        }
        freeCell = oldPosition; 
        if (started) {
            step++; 
            stepText.innerHTML = step; 
        }
    } 
    if(started) {
        checkVictory();
    }
}

// 
// ADD EVENTLISTENER TO TILES
//
function animateTiles() { 
    for (var i = 0; i < 15; ++i) {
        tiles[i].addEventListener("click", tileClick); 
    }
} 

function between (a, b, t) {
    if ((a <= t && t <= b) || (b <= t && t <= a)) {
        return true;
    } else {
        return false;    
    }
} 

function shuffleTiles() { 
    for (var i = 0; i < 5; ++i) { 
        var a = Math.floor(Math.random() * tiles.length); 
        tiles[a].click(); 
    }
    started = true;
} 

var win = document.getElementById("modal");
function checkVictory() {
    for (var i = 0; i < 15; ++i) {
        if (tiles[i].innerText !== String(tiles[i].x + tiles[i].y * 4 + 1)) {
            return;
        }
    } 
    pause();
    win.classList.add('modal--visible');
}

function reload() { 
        win.classList.remove("modal--visible");  
        reset();
        started = false;
        shuffleTiles(); 
        step = 0; 
        stepText.innerHTML = 0;
        start();
    
}  
var button = document.getElementById("rerun"); 
button.addEventListener("click", reload);
 


// 
// INITIALIZATION FUNCTIONS 
//
createField();
createTiles();
animateTiles(); 
shuffleTiles(); 
start();


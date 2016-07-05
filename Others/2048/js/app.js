'use strict';

var constants = {
    // key code
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_ENTER: 13,

    MOVE_LEFT: 0,
    MOVE_UP: 1,
    MOVE_RIGHT: 2,
    MOVE_DOWN: 3,

    GRID_SIZE: 4,
    START_TILES: 2,

    // Text
    WIN_TEXT: 'You win!',
    LOSE_TEXT: 'Game over!'
};

/**
 * Handle keyboard event and also notify event
 */
function EventController () {
    this.event = {};
    this.listenKeyDown();
}

// listen to keydow event
EventController.prototype.listenKeyDown = function () {
    var self = this;
    var map = {};
    map[constants.KEY_LEFT] = constants.MOVE_LEFT;
    map[constants.KEY_UP] = constants.MOVE_UP;
    map[constants.KEY_RIGHT] = constants.MOVE_RIGHT;
    map[constants.KEY_DOWN] = constants.MOVE_DOWN;

    document.addEventListener('keydown', function (event) {
        var combined = event.altKey || event.ctrlKey || event.shiftKey;
        var moveDirt = map[event.which];
        if (!combined && moveDirt !== undefined) {
            event.preventDefault();
            self.fire('move', moveDirt);
        }
    });
}

// triger callback for the given event
EventController.prototype.listen = function (eventName, callback, callee) {
    var callee = callee || this;
    var callback = callback ? callback.bind(callee) : {}
    if (!this.event[eventName]) {
        this.event[eventName] = [];
    }
    this.event[eventName].push(callback);
}

// fire the specific event
EventController.prototype.fire = function (eventName, eventData) {
    var callbacks = this.event[eventName];
    if (!!callbacks.length) {
        callbacks.forEach(function (callback, index, array) {
            callback(eventData);
        });
    }
}

/**
 * Controlls Tiles movements and displaying
 */
function ViewController () {
    this.scoreBoard = document.getElementsByClassName('score-board')[0];
    this.messageContainer = document.getElementsByClassName('message-container')[0];
    this.tileContainer = document.getElementsByClassName('tile-container')[0];
}

<<<<<<< HEAD
ViewController.prototype.addTile(tile) {
=======
// Add a tile on the screen
ViewController.prototype.addTile(tile) {
    var tileElement = document.createElement('div');
    var classes = ['tile', 'tile-' + tile.value, this.positionClass(tile)];
    this.attachTileElement(tileElement, classes);
}

// Return tile-cell-row-col class name
ViewController.prototype.positionClass = function (tile) {
    return 'tile-cell-' + tile.row + '-' + tile.col;
}
>>>>>>> dba867503f270790647ef62dd980da4e932fc7a9

// Add tile element to tileContainer
ViewController.prototype.attachTileElement = function (elem, classes) {
    this.applyClass(elem, classes);
    this.tileContainer.appendChild(elem);
}

// renew element class attribute
ViewController.prototype.applyClass = function (elem, classes) {
    elem.setAttribute('class', classes.join(' '));
}

// update value displayed in score board
ViewController.prototype.updateScore = function (newScore) {
    this.scoreBoard.innerText = newScore;
}

<<<<<<< HEAD
function TilesGrid (size) {
=======
/**
 * Saves the current tile grid status
 */
function TileGrid (size) {
>>>>>>> dba867503f270790647ef62dd980da4e932fc7a9
    this.gridSize = size;
    this.tileCells = [];
    this.initTileCells();
}
<<<<<<< HEAD

TilesGrid.prototype.initTileCells = function () {
    for (var row = 0; row < this.gridSize; row++) {
        var row = this.tileCells[row] = [];
        for (var col = 0; col < this.gridSize; col++) {
            row.push(null);
        }
    }
=======

// Initialize tileCells (2D array of Tile object)
TileGrid.prototype.initTileCells = function () {
    for (var row = 0; row < this.gridSize; row++) {
        var rows = tileCells[row] = [];
        for (var col = 0; col < this.gridSize; col++) {
            rows.push(null);
        }
    }
}

// Return a random empty cell ({ row, col})
TileGrid.prototype.emptyCellAvailale = funciton () {
    var cells = this.findEmptyCells();
    return cells.length ? cells[Math.random() * cells.length] || null;
}

// Return all empty cells
TileGrid.prototype.findEmptyCells = function () {
    var cells = [];
    for (var row = 0; row < this.gridSize; row++) {
        for (var col = 0; col < this.gridSize; col++) {
            var tile = this.tileCells[row][col];
            if (!tile) {
                cells.push({
                    row: row,
                    col: col
                });
            }
        }
    }
}

// Add a Tile object to tileCells
TileGrid.prototype.addTile = function (tile) {
    this.tileCells[tile.row][tile.col] = tile;
}

// Remove a Tile object in tileCells
TileGrid.prototype.removeTile = function (row, col) {
    this.tileCells[row][col] = null;
>>>>>>> dba867503f270790647ef62dd980da4e932fc7a9
}

/**
 * Stores tile's position and value
 */
function Tile (row, col) {
    this.row = row;
    this.col = col;
    this.value = this.randomValue();
}

Tile.prototype.randomValue = function () {
    return Math.random() < 0.8 ? 2 : 4;
}

Tile.prototype.updatePosition(row, col) {
    this.row = row;
    this.col = col;
}

function GameController (startTiles) {
    this.startTiles = startTiles || constants.START_TILES;

    this.eventController = new EventController();
    this.viewController = new ViewController();
    this.grid = new TileGrid();

    this.eventController.listen('move', this.moveTile, this);
}

GameController.prototype.restart = function () {
    this.viewController.updateScore(0);
    for (var i = 0; i < this.startTiles; i++) {
    }
}

GameController.prototype.moveTile = function (moveDirt) {
    switch (moveDirt) {
        case constants.MOVE_LEFT:
            console.log('left...');
            break;
        case constants.MOVE_RIGHT:
            console.log('right...');
            break;
        case constants.MOVE_UP:
            console.log('up...');
            break;
        case constants.MOVE_DOWN:
            console.log('down...');
            break;
        default:
    }
}

var gameCtrl = new GameController();

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
    WIN_TEXT: ['You win!', 'Another round'],
    LOSE_TEXT: ['Game over!', 'Try again'],

    // win: 2048
    MAX: 2048
};

/**
 * Handle keyboard event and also notify event
 */
function EventController () {
    this.event = {};
    this.listenKeyDown();
}

// Listen to keydow event
EventController.prototype.listenKeyDown = function () {
    var self = this;
    var map = this.keyMap();

    document.addEventListener('keydown', function (event) {
        var combined = event.altKey || event.ctrlKey || event.shiftKey;
        var moveDirt = map[event.which];
        if (!combined && moveDirt !== undefined) {
            event.preventDefault();
            self.fire('move', moveDirt);
        }
    });
}

// Triger callback for the given event
EventController.prototype.listen = function (eventName, callback, callee) {
    var callee = callee || this;
    var callback = callback ? callback.bind(callee) : {}
    if (!this.event[eventName]) {
        this.event[eventName] = [];
    }
    this.event[eventName].push(callback);
}

// Fire the specific event
EventController.prototype.fire = function (eventName, eventData) {
    var callbacks = this.event[eventName];
    if (!!callbacks.length) {
        callbacks.forEach(function (callback, index, array) {
            callback(eventData);
        });
    }
}

// Return default key map
EventController.prototype.keyMap = function () {
    var map = {};
    map[constants.KEY_LEFT]  = constants.MOVE_LEFT;
    map[constants.KEY_UP]    = constants.MOVE_UP;
    map[constants.KEY_RIGHT] = constants.MOVE_RIGHT;
    map[constants.KEY_DOWN]  = constants.MOVE_DOWN;
    return map;
}

/**
 * Saves the current tile grid status
 */
function TileGrid () {
    this.gridSize = constants.GRID_SIZE;
    this.tileCells = [];
    this.initTileCells();
}

// Initialize tileCells (2D array of Tile object)
TileGrid.prototype.initTileCells = function () {
    for (var row = 0; row < this.gridSize; row++) {
        var rows = this.tileCells[row] = [];
        for (var col = 0; col < this.gridSize; col++) {
            rows.push(null);
        }
    }
}

// Return a random empty cell ({ row, col})
TileGrid.prototype.emptyCellAvailable = function () {
    var cells = this.findEmptyCells();
    return cells.length ? cells[Math.floor(Math.random() * cells.length)] : null;
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
    return cells;
}

// Get tile at the given row and col
TileGrid.prototype.tileAt = function (row, col) {
    if (this.validPosition(row, col)) {
        return this.tileCells[row][col];
    } else {
        return null;
    }
}

// Check if the cell is occupied
TileGrid.prototype.cellOccupied = function (row, col) {
    return !!this.tileAt(row, col);
}

TileGrid.prototype.cellEmpty = function (row, col) {
    return !!!this.tileAt(row, col);
}

// Add a Tile object to tileCells
TileGrid.prototype.addTile = function (tile) {
    this.tileCells[tile.row][tile.col] = tile;
}

// Remove a Tile object in tileCells
TileGrid.prototype.removeTile = function (row, col) {
    this.tileCells[row][col] = null;
}

// Check if the given row and col are valid
TileGrid.prototype.validPosition = function (row, col) {
    return row >= 0 && row < this.gridSize &&
           col >= 0 && col < this.gridSize;
}

/**
 * Stores tile's position and value
 */
function Tile (row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value || this.randomValue();
    this.previousPosition = null;
    this.fromMerge = null;
}

// Return 2 or 4 randomly
Tile.prototype.randomValue = function () {
    return Math.random() < 0.9 ? 2 : 4;
}

// Update tile value
Tile.prototype.updateValue = function (value) {
    this.value = value;
}

// Upate tile row and col
Tile.prototype.updatePosition = function (row, col) {
    this.previousPosition = {
        row: this.row,
        col: this.col
    };
    this.row = row;
    this.col = col;
}

// Return false if the given row and col are the same as the current ones
Tile.prototype.needMove = function (row, col) {
    return !(this.row === row && this.col === col);
}

/**
 * Controlls Tiles movements and displaying
 */
function ViewController (eventController) {
    this.eventController = eventController;
    this.listen();
    this.initElements();
}

// Listen to events
ViewController.prototype.listen = function () {
    this.eventController.listen('addtile', this.addTile, this);
    this.eventController.listen('notify', this.notify, this);
    this.eventController.listen('refresh', this.refresh, this);
}

// Initialize DOM elements
ViewController.prototype.initElements = function () {
    var self = this;

    this.scoreBoard = document.getElementsByClassName('score-board')[0];

    this.messageContainer = document.getElementsByClassName('message-container')[0];
    this.messageTitle = this.messageContainer.getElementsByClassName('message')[0];
    this.restartBtn = this.messageContainer.getElementsByClassName('restart-btn')[0];
    this.restartBtn.addEventListener('click', function (event) {
        event.preventDefault();
        self.eventController.fire('restart');
    });

    this.tileContainer = document.getElementsByClassName('tile-container')[0];
}

// Update notification display
ViewController.prototype.notify = function (metaData) {
    this.updateScore(metaData.score);
    if (metaData.win) {
        this.message(true);
    } else if (metaData.lose) {
        this.message(false);
    }
}

// Update game end message
ViewController.prototype.message = function (win) {
    this.messageTitle.textContent = win ? constants.WIN_TEXT[0] : constants.LOSE_TEXT[0];
    this.restartBtn.textContent = win ? constants.WIN_TEXT[1] : constants.LOSE_TEXT[1];
    this.toggleMessage(true);
}

// Show(true) or hide(false) message container
ViewController.prototype.toggleMessage = function (flag) {
    if (flag) {
        this.messageContainer.setAttribute('class', 'message-container');
    } else {
        this.messageContainer.setAttribute('class', 'message-container hide');
    }
}

// Add a tile on the screen
ViewController.prototype.addTile = function (tile) {
    this.appendTileElement(tile);
}

// Return "tile-value" css class name
ViewController.prototype.valueClass = function (tile) {
    return 'tile-' + tile.value;
}

// Return "tile-cell-row-col" css class name
ViewController.prototype.positionClass = function (tile) {
    return 'tile-cell-' + tile.row + '-' + tile.col;
}

// Return a string of required tile class
ViewController.prototype.getTileClass = function (tile) {
    return ['tile', this.valueClass(tile), this.positionClass(tile)];
}

// Add tile element to tileContainer
ViewController.prototype.appendTileElement = function (tile) {
    var tileElement = document.createElement('div');
    var classes = this.getTileClass(tile);

    this.applyClass(tileElement, classes);

    tileElement.textContent = tile.value;
    this.tileContainer.appendChild(tileElement);
}

// Renew element class attribute
ViewController.prototype.applyClass = function (elem, classes) {
    elem.setAttribute('class', classes.join(' '));
}

// Update value displayed in score board
ViewController.prototype.updateScore = function (newScore) {
    this.scoreBoard.textContent = newScore;
}

// Build tile elements once for all
ViewController.prototype.buildTileElements = function (cells) {
    var elements = '';
    for (var row = 0; row < cells.length; row++) {
        var columns = cells[row];
        for (var col = 0; col < columns.length; col++) {
            var tile = columns[col];
            if (tile) {
                var classes = this.getTileClass(tile);
                var html = '<div class="' + classes.join(' ') + '">' + tile.value + '</div>';
                elements += html;
            }
        }
    }

    return elements;
}

ViewController.prototype.drawTiles = function (cells) {
    for (var row = 0; row < cells.length; row++) {
        var columns = cells[row];
        for (var col = 0; col < columns.length; col++) {
            var tile = columns[col];
            if (tile) {

            }
        }
    }
}

// Clear everything in tile container
ViewController.prototype.clearTileContainer = function () {
    this.tileContainer.innerHTML = '';
}

// Refresh tile container to show updated tile grid
ViewController.prototype.refresh = function (metaData) {
    this.clearTileContainer();
    var cells = metaData.grid.tileCells;
    var html = this.buildTileElements(cells);
    this.tileContainer.innerHTML = html;
    this.eventController.fire('notify', metaData.gameStatus);
}

/**
 * Main controller for the game
 */
function GameController (startTiles) {
    this.startTiles = startTiles || constants.START_TILES;

    this.eventController = new EventController();
    this.viewController = new ViewController(this.eventController);
    this.eventController.listen('move', this.move, this);
    this.eventController.listen('restart', this.restart, this);

    this.setup();
}

// Properties setup
GameController.prototype.setup = function () {
    this.grid = new TileGrid();
    this.score = 0;
    this.win = false;
    this.lose = false;
    this.map = this.directionMap();

    this.addStartTiles();
    this.notify();
}

// Restart
GameController.prototype.restart = function () {
    this.viewController.clearTileContainer();
    this.setup();
    this.viewController.toggleMessage(false);
}

// return moving direction map
GameController.prototype.directionMap = function () {
    var map = {};
    map[constants.MOVE_LEFT]  = { row: 0, col: -1 };
    map[constants.MOVE_UP]    = { row: -1, col: 0 };
    map[constants.MOVE_RIGHT] = { row: 0, col: 1 };
    map[constants.MOVE_DOWN]  = { row: 1, col: 0};

    return map;
}

// Notify view to update displaying
GameController.prototype.notify = function () {
    this.eventController.fire('notify', {
        score: this.score,
        win: this.win,
        lose: this.lose
    });
}

// Add tiles when game starts
GameController.prototype.addStartTiles = function () {
    for (var i = 0; i < this.startTiles; i++) {
        this.addRandomTile();
    }
}

// Add a tile at the randon empty cell and return it,
// return null if add nothing
GameController.prototype.addRandomTile = function () {
    var cell = this.grid.emptyCellAvailable();
    if (cell !== null) {
        var tile = new Tile(cell.row, cell.col);
        this.grid.addTile(tile);
        this.eventController.fire('addtile', tile);
        return tile;
    }

    return null;
}

// Reste fromMerge to defailt
GameController.prototype.resetMerge = function () {
    var cells = this.grid.tileCells;
    for (var row = 0; row < cells.length; row++) {
        var columns = cells[row];
        for (var col = 0; col < columns.length; col++) {
            var tile = columns[col];
            if (tile) {
                tile.fromMerge = false;
            }
        }
    }
}

// Return moving direction e.g. {row: -1, col: 0}
GameController.prototype.direction = function (direction) {
    return this.map[direction];
}

// Make sure we traversal tiles in right order based on moving direction
GameController.prototype.buildTraversals = function (direction) {
    var traversals = { row: [], col: [] };
    for (var pos = 0; pos < this.grid.gridSize; pos++) {
        traversals.row.push(pos);
        traversals.col.push(pos);
    }
    direction.row === 1 && traversals.row.reverse();
    direction.col === 1 && traversals.col.reverse();

    return traversals;
}

// Move tiles by pressing arrow keys
GameController.prototype.move = function (direction) {
    // Don't do anything if game is over
    if (this.win || this.lose) return;

    var self = this;
    var moved = false;
    var direction = this.direction(direction);
    var traversals = this.buildTraversals(direction);

    this.resetMerge();

    traversals.row.forEach(function (row) {
        traversals.col.forEach(function (col) {
            var tile = self.grid.tileAt(row, col);
            if (tile) {
                var next = self.nextPosition({row: tile.row, col: tile.col}, direction);
                var siblingTile = next.sibling;
                // Merge tiles with the same value
                if (siblingTile && tile.value === siblingTile.value && !siblingTile.fromMerge) {

                    var mergedTile = self.merge(tile, siblingTile);

                    mergedTile.value === constants.MAX ?
                        self.win = true : self.win = false;

                    self.score += mergedTile.value;
                    moved = true;

                } else if (tile.needMove(next.nextCell.row, next.nextCell.col)) {
                    self.moveTile(tile, next.nextCell.row, next.nextCell.col);
                    moved = true;
                }
            }
        });
    });

    // If anything changes in cell grid, update view
    if (moved) {
        // Game continues if it can still add tile, otherwise game is over.
        var randTile = this.addRandomTile();
        randTile ? this.lose = false : this.lose = true;

        // refresh tile container to show updated tiles
        var metaData = {
            grid: this.grid,
            gameStatus: {
                score: this.score,
                win: this.win,
                lose: this.lose
            }
        };

        this.eventController.fire('refresh', metaData);
    }
}

// Merge two tile
GameController.prototype.merge = function (tile, tileBeingMerged) {
    // Create a new tile with doubled value
    var mergedTile = new Tile(tileBeingMerged.row, tileBeingMerged.col, tile.value * 2);
    mergedTile.fromMerge = true;
    this.grid.removeTile(tile.row, tile.col);
    this.grid.removeTile(tileBeingMerged.row, tileBeingMerged.col);
    this.grid.addTile(mergedTile);

    return mergedTile;
}

// Return position after moving
GameController.prototype.nextPosition = function (currPos, direction) {
    var prevPos;

    do {
        prevPos = currPos;
        currPos = {
            row: prevPos.row + direction.row,
            col: prevPos.col + direction.col
        }
    } while (this.grid.validPosition(currPos.row, currPos.col) &&
             this.grid.cellEmpty(currPos.row, currPos.col));

    return {
        nextCell: prevPos,
        sibling: this.grid.tileAt(currPos.row, currPos.col)
    };
}

// Move tile to the specific row and column
GameController.prototype.moveTile = function (tile, row, col) {
    this.grid.tileCells[tile.row][tile.col] = null;
    this.grid.tileCells[row][col] = tile;
    tile.updatePosition(row, col);
}


// Start game
var gameCtrl = new GameController();

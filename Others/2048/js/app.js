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

EventController.prototype.listen = function (eventName, callback, callee) {
    var callee = callee || this;
    var callback = callback ? callback.bind(callee) : {}
    if (!this.event[eventName]) {
        this.event[eventName] = [];
    }
    this.event[eventName].push(callback);
}

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

ViewController.prototype.addTile(tile) {

}

ViewController.prototype.updateScore = function (newScore) {
    this.scoreBoard.innerText = newScore;
}

function TilesGrid (size) {
    this.gridSize = size;
    this.tileCells = [];
    this.initTileCells();
}

TilesGrid.prototype.initTileCells = function () {
    for (var row = 0; row < this.gridSize; row++) {
        var row = this.tileCells[row] = [];
        for (var col = 0; col < this.gridSize; col++) {
            row.push(null);
        }
    }
}

/**
 * Stores tile's position and value
 */
function Tile (row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value || this.randomValue();
}

Tile.prototype.randomValue = function () {
    return Math.random() < 0.8 ? 2 : 4;
}

Tile.prototype.updatePosition(row, col) {
    this.row = row;
    this.col = col;
}

function GameController () {
    this.init();
}

GameController.prototype.init = function () {
    this.eventController = new EventController();
    this.viewController = new ViewController();

    this.eventController.listen('move', this.moveTile, this);
    this.viewController.updateScore(12);
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

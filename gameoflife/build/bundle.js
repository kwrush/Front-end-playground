/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ui = __webpack_require__(1);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var core = new _game2.default({
	    row: 50,
	    col: 70
	});
	var ui = new _ui2.default({
	    game: core,
	    speed: 200
	});
	
	ui.drawGrid();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CELL_SIZE = 12,
	    // tile size, in 'px'
	ALIVE_CELL = '#333',
	    // color of alive cell
	DEAD_CELL = '#fff',
	    // color of dead cell
	BORDER_COLOR = '#333';
	
	var GameUI = function () {
	    function GameUI(options) {
	        _classCallCheck(this, GameUI);
	
	        this.game = options.game;
	        this.speed = options.speed || 100;
	
	        this.rowNum = this.game.row || 40;
	        this.colNum = this.game.col || 60;
	
	        this.initCanvas();
	        this.listen();
	    }
	
	    // init canvas properties
	
	
	    _createClass(GameUI, [{
	        key: 'initCanvas',
	        value: function initCanvas() {
	            this.canvas = document.getElementById('game-grid');
	            this.ctx = this.canvas.getContext('2d');
	
	            this.canvas.width = this.colNum * CELL_SIZE + 1;
	            this.canvas.height = this.rowNum * CELL_SIZE + 1;
	        }
	
	        // listen to DOM events
	
	    }, {
	        key: 'listen',
	        value: function listen() {
	            var _this = this;
	
	            this.randBtn = document.getElementById('rand-pattern-btn');
	            this.startBtn = document.getElementById('start-btn');
	            this.stopBtn = document.getElementById('stop-btn');
	
	            this.canvas.addEventListener('click', function (evt) {
	                return _this._handleClick(evt);
	            }, false);
	            this.randBtn.addEventListener('click', function (evt) {
	                return _this._prepare(evt);
	            }, false);
	            this.startBtn.addEventListener('click', function (evt) {
	                return _this._play(evt);
	            }, false);
	            this.stopBtn.addEventListener('click', function (evt) {
	                return _this._stop(evt);
	            }, false);
	        }
	
	        // Make grid
	
	    }, {
	        key: 'drawGrid',
	        value: function drawGrid() {
	            this.ctx.strokeStyle = '#333';
	            this.ctx.lineWidth = 1;
	            this.ctx.beginPath();
	
	            // Draw horizontal lines
	            for (var i = 0; i <= this.rowNum; i++) {
	                this.ctx.moveTo(0, CELL_SIZE * i + 0.5);
	                this.ctx.lineTo(CELL_SIZE * this.colNum, CELL_SIZE * i + 0.5);
	            }
	
	            // Vertical lines
	            for (var j = 0; j <= this.colNum; j++) {
	                this.ctx.moveTo(CELL_SIZE * j + 0.5, 0);
	                this.ctx.lineTo(CELL_SIZE * j + 0.5, CELL_SIZE * this.colNum);
	            }
	
	            this.ctx.stroke();
	            this.ctx.closePath();
	        }
	
	        // Click in cell rectangle to toggle cell's status
	
	    }, {
	        key: '_handleClick',
	        value: function _handleClick(evt) {
	            evt = evt || window.event;
	
	            evt.preventDefault();
	            evt.stopPropagation();
	
	            // Calculate the position of the cell being clicked
	            var pageX = evt.pageX;
	            var pageY = evt.pageY;
	
	            var recDim = this.canvas.getBoundingClientRect();
	
	            var offsetX = pageX - recDim.left;
	            var offsetY = pageY - recDim.top;
	
	            // Get row and column number of the tile
	            var c = Math.floor(offsetX / CELL_SIZE);
	            var r = Math.floor(offsetY / CELL_SIZE);
	
	            var cell = this.game.getCellAt(r, c);
	            cell.alive = !cell.alive;
	            this._fillCell(c, r, cell.alive);
	            // debug
	            console.log('r:' + r + '; c:' + c + '; alive: ' + cell.alive + '; index:' + (r * this.colNum + c));
	        }
	
	        // random pattern button callback
	
	    }, {
	        key: '_prepare',
	        value: function _prepare(evt) {
	            this.game.randomPattern();
	            this._drawCells();
	        }
	
	        // stop button callback
	
	    }, {
	        key: '_stop',
	        value: function _stop(evt) {
	            clearInterval(this.playTimer);
	        }
	
	        // start button callback
	
	    }, {
	        key: '_play',
	        value: function _play(evt) {
	            var _this2 = this;
	
	            this._stop();
	            this.playTimer = setInterval(function () {
	                // populate next generation
	                _this2.game.populate();
	                _this2._transition();
	            }, this.speed);
	        }
	
	        // Show next generation of cells
	
	    }, {
	        key: '_transition',
	        value: function _transition() {
	            for (var r = 0; r < this.rowNum; r++) {
	                for (var c = 0; c < this.colNum; c++) {
	                    var cell = this.game.getCellAt(r, c);
	                    cell = this.game.nextGen(cell);
	                    this._fillCell(c, r, cell.next);
	                }
	            }
	        }
	
	        // Fill color in grid cells based on the pattern
	
	    }, {
	        key: '_drawCells',
	        value: function _drawCells() {
	            this.ctx.strokeStyle = '#333';
	            this.ctx.lineWidth = 1;
	
	            for (var r = 0; r < this.rowNum; r++) {
	                for (var c = 0; c < this.colNum; c++) {
	                    var tile = this.game.getCellAt(r, c);
	
	                    // row: top to bottom, col: left to right
	                    // so x is col and y is row in canvas
	                    this._fillCell(tile.col, tile.row, tile.alive);
	                }
	            }
	        }
	
	        // Fill color in the given cell
	
	    }, {
	        key: '_fillCell',
	        value: function _fillCell(x, y, status) {
	            var w = this.ctx.lineWidth;
	
	            x = x * CELL_SIZE;
	            y = y * CELL_SIZE;
	
	            x = x + w;
	            y = y + w;
	
	            var size = CELL_SIZE - w;
	
	            this.ctx.fillStyle = status ? ALIVE_CELL : DEAD_CELL;
	            this.ctx.fillRect(x, y, size, size);
	        }
	    }]);
	
	    return GameUI;
	}();
	
	exports.default = GameUI;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameCore = function () {
	    function GameCore(options) {
	        _classCallCheck(this, GameCore);
	
	        this.row = options.row || 40;
	        this.col = options.col || 60;
	        this.cells = initCells(this.row, this.col);
	    }
	
	    // Return a cell object at the row and column
	
	
	    _createClass(GameCore, [{
	        key: 'getCellAt',
	        value: function getCellAt(r, c) {
	            return this.cells[r * this.col + c];
	        }
	
	        // Give each cell a random living status
	
	    }, {
	        key: 'randomPattern',
	        value: function randomPattern() {
	            for (var r = 0; r < this.row; r++) {
	                for (var c = 0; c < this.col; c++) {
	                    var tile = this.getCellAt(r, c);
	                    tile.alive = randomStatus();
	                    tile.next = tile.alive;
	                }
	            }
	        }
	
	        // Loop throughs all cells to generate next status
	
	    }, {
	        key: 'populate',
	        value: function populate() {
	            for (var r = 0; r < this.row; r++) {
	                for (var c = 0; c < this.col; c++) {
	                    var cell = this.getCellAt(r, c);
	                    if (cell) {
	                        cell.next = this._nextStatus(cell);
	                    }
	                }
	            }
	        }
	
	        // switch cell's living status to next generation
	
	    }, {
	        key: 'nextGen',
	        value: function nextGen(cell) {
	            if (cell && cell.hasOwnProperty('alive') && cell.hasOwnProperty('next')) {
	                cell.alive = cell.next;
	            }
	            return cell;
	        }
	
	        // generate next living status for the given cell based on game rules
	
	    }, {
	        key: '_nextStatus',
	        value: function _nextStatus(cell) {
	            var next = false;
	            // Count alive neighbors
	            var aliveNeighbors = this._isCellAlive(cell.row - 1, cell.col - 1) + this._isCellAlive(cell.row - 1, cell.col) + this._isCellAlive(cell.row - 1, cell.col + 1) + this._isCellAlive(cell.row, cell.col - 1) + this._isCellAlive(cell.row, cell.col + 1) + this._isCellAlive(cell.row + 1, cell.col - 1) + this._isCellAlive(cell.row + 1, cell.col) + this._isCellAlive(cell.row + 1, cell.col + 1);
	            if (cell.alive) {
	                next = aliveNeighbors === 2 || aliveNeighbors === 3;
	            } else {
	                next = aliveNeighbors === 3;
	            }
	            return next;
	        }
	
	        // Return true if the cell at the given row and column is alive
	
	    }, {
	        key: '_isCellAlive',
	        value: function _isCellAlive(r, c) {
	            var cell = this.getCellAt(r, c);
	            if (cell) {
	                return cell.alive;
	            } else {
	                return false;
	            }
	        }
	    }]);
	
	    return GameCore;
	}();
	
	// private functions
	
	
	function initCells(row, col) {
	    var cells = [];
	    for (var r = 0; r < row; r++) {
	        for (var c = 0; c < col; c++) {
	            cells.push({
	                alive: false,
	                next: false,
	                row: r,
	                col: c
	            });
	        }
	    }
	
	    return cells;
	}
	
	function randomStatus() {
	    return !!Math.round(Math.random());
	}
	
	exports.default = GameCore;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
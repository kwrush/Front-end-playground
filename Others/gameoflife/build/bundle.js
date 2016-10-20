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
/***/ function(module, exports, __webpack_require__) {

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
	    game: core
	});
	
	ui.drawGrid();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CELL_SIZE = 10,
	    // tile size, in 'px'
	ALIVE_CELL = '#333',
	    // color of alive cell
	DEAD_CELL = '#fff'; // color of dead cell
	
	var GameUI = function () {
	    function GameUI(options) {
	        _classCallCheck(this, GameUI);
	
	        this.game = options.game;
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
	
	            this.canvas.width = this.colNum * CELL_SIZE;
	            this.canvas.height = this.rowNum * CELL_SIZE;
	        }
	
	        // init game setup, such as initial pattern
	
	    }, {
	        key: 'initSetup',
	        value: function initSetup() {
	            this.game.randomPattern();
	            this._drawCells();
	        }
	    }, {
	        key: 'listen',
	        value: function listen() {
	            this.startBtn = document.getElementById('start-btn');
	            this.stopBtn = document.getElementById('stop-btn');
	
	            this.startBtn.addEventListener('click', this._play.bind(this), false);
	            this.stopBtn.addEventListener('click', function (evt) {}, false);
	        }
	
	        // Make grid
	
	    }, {
	        key: 'drawGrid',
	        value: function drawGrid() {
	            this.ctx.strokeStyle = '#777';
	            this.ctx.lineWidth = 1;
	            // Draw horizontal lines
	            for (var i = 0; i <= this.rowNum; i++) {
	                this.ctx.beginPath();
	                this.ctx.moveTo(0, CELL_SIZE * i);
	                this.ctx.lineTo(CELL_SIZE * this.colNum, CELL_SIZE * i);
	                this.ctx.stroke();
	            }
	
	            // Vertical lines
	            for (var j = 0; j <= this.colNum; j++) {
	                this.ctx.beginPath();
	                this.ctx.moveTo(CELL_SIZE * j, 0);
	                this.ctx.lineTo(CELL_SIZE * j, CELL_SIZE * this.colNum);
	                this.ctx.stroke();
	            }
	
	            this.ctx.closePath();
	        }
	    }, {
	        key: '_play',
	        value: function _play(evt) {
	            this.initSetup();
	        }
	
	        // Fill color in grid cells based on the pattern
	
	    }, {
	        key: '_drawCells',
	        value: function _drawCells() {
	            for (var i = 0; i < this.game.cells.length; i++) {
	                var tile = this.game.cells[i];
	                var args = [tile.col * CELL_SIZE, tile.row * CELL_SIZE, tile.alive];
	                this._fillCell.apply(this, args);
	            }
	        }
	
	        // Fill color in the given cell
	
	    }, {
	        key: '_fillCell',
	        value: function _fillCell(x, y, status) {
	            this.ctx.fillStyle = status ? ALIVE_CELL : DEAD_CELL;
	            this.ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
	        }
	    }]);
	
	    return GameUI;
	}();
	
	exports.default = GameUI;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameCore = function () {
	    function GameCore(options) {
	        _classCallCheck(this, GameCore);
	
	        this.cells = [];
	        this.row = options.row || 40;
	        this.col = options.col || 60;
	    }
	
	    _createClass(GameCore, [{
	        key: "randomPattern",
	        value: function randomPattern() {
	            this.cells = [];
	            for (var x = 0; x < this.col; x++) {
	                for (var y = 0; y < this.row; y++) {
	                    this.cells.push({
	                        alive: randomStatus(),
	                        row: y,
	                        col: x
	                    });
	                }
	            }
	        }
	    }, {
	        key: "populate",
	        value: function populate() {}
	    }]);
	
	    return GameCore;
	}();
	
	// private functions
	
	
	function randomStatus() {
	    return Math.round(Math.random());
	}
	
	exports.default = GameCore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
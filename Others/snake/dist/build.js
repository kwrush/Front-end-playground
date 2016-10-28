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
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _snake = __webpack_require__(2);
	
	var _snake2 = _interopRequireDefault(_snake);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var snake = new _snake2.default({
	    size: 20
	});
	var gameCtrl = new _game2.default({
	    snake: snake
	});
	
	gameCtrl.drawSnake();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEF_WIDTH = 640; // default canvas dimension, unit in px
	var DEF_HEIGHT = 480;
	var DEF_BORDER_COLOR = '#333';
	var DEF_BG_COLOR = '#ccc';
	
	var _class = function () {
	    function _class(options) {
	        _classCallCheck(this, _class);
	
	        this.snake = options.snake;
	        this.width = options.width || DEF_WIDTH;
	        this.height = options.height || DEF_HEIGHT;
	        this.borderColor = options.borderColor || DEF_BORDER_COLOR;
	        this.bgColor = options.bgColor || DEF_BG_COLOR;
	        this.initCanvas();
	    }
	
	    _createClass(_class, [{
	        key: 'initCanvas',
	        value: function initCanvas() {
	            this.canvas = document.getElementById('canvas');
	            this.ctx = this.canvas.getContext('2d');
	
	            this.canvas.width = this.width;
	            this.canvas.height = this.height;
	
	            // draw background and border
	            this.ctx.rect(0, 0, this.width, this.height);
	            this.ctx.fillStyle = this.bgColor;
	            this.ctx.fill();
	
	            this.ctx.strokeStyle = this.borderColor;
	            this.ctx.lineWidth = 2;
	            this.ctx.stroke();
	        }
	    }, {
	        key: 'drawSnake',
	        value: function drawSnake() {
	            this.ctx.strokeStyle = this.snake.borderColor;
	            this.ctx.lineWidth = 1;
	            this.ctx.beginPath();
	
	            for (var i = 0; i < this.snake.getLength(); i++) {
	                var block = this.snake.getBodyBlock(i);
	                this.ctx.fillRect(10, 10, this.snake.size, this.snake.size);
	            }
	
	            this.ctx.stroke();
	            this.ctx.closePath();
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEF_LENGTH = 20;
	var BODY_COLOR = '#333';
	var BORDER_COLOR = '#fff';
	
	var _class = function () {
	    function _class(options) {
	        _classCallCheck(this, _class);
	
	        this.size = options.size || DEF_LENGTH;
	        this.bodyColor = options.bodyColor || BODY_COLOR;
	        this.borderColor = options.borderColor || BORDER_COLOR;
	        this.init();
	    }
	
	    _createClass(_class, [{
	        key: 'init',
	        value: function init() {
	            this.body = [];
	            this.longer();
	        }
	
	        // Spontaneously moving
	
	    }, {
	        key: 'move',
	        value: function move() {}
	    }, {
	        key: 'eat',
	        value: function eat() {
	            this.longer();
	        }
	    }, {
	        key: 'longer',
	        value: function longer() {
	            var head = this.getHead();
	            if (head) {
	                head.isHead = false;
	            }
	            this.body.unshift(this.getNewHead());
	        }
	    }, {
	        key: 'getHead',
	        value: function getHead() {
	            return this.getBodyBlock(0);
	        }
	    }, {
	        key: 'getLength',
	        value: function getLength() {
	            return this.body.length;
	        }
	    }, {
	        key: 'getBodyBlock',
	        value: function getBodyBlock(index) {
	            return this.body[index];
	        }
	    }, {
	        key: 'getNewHead',
	        value: function getNewHead() {
	            return {
	                isHead: true
	            };
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map
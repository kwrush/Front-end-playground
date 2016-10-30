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
	
	var _view = __webpack_require__(3);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _snake = __webpack_require__(4);
	
	var _snake2 = _interopRequireDefault(_snake);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var snake = new _snake2.default({
	    size: 10
	});
	
	var view = new _view2.default();
	
	var gameCtrl = new _game2.default({
	    snake: snake,
	    view: view
	});
	
	gameCtrl.init();
	gameCtrl.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _food = __webpack_require__(2);
	
	var _food2 = _interopRequireDefault(_food);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEF_SPEED = 200; // snake speed(redrawing interval), units in ms
	
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_DOWN = 40;
	
	var _gameLoop = null;
	var _moving = false;
	
	var _class = function () {
	    function _class(options) {
	        _classCallCheck(this, _class);
	
	        this.snake = options.snake;
	        this.view = options.view;
	        this.speed = options.speed || DEF_SPEED;
	        this.food = new _food2.default(this.snake.size);
	    }
	
	    _createClass(_class, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            this.view.listenKeyDown(function (keyCode) {
	                _this.handleKeyDown(keyCode);
	            });
	            // Give snake an initial position
	            this.snake.init(Math.floor(this.view.width / 2), Math.floor(this.view.height / 2));
	            this.food.makeFood(this.snake, this.view.width, this.view.height);
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this2 = this;
	
	            this.stop();
	            _gameLoop = setInterval(function () {
	                _this2.run();
	            }, this.speed);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            clearInterval(_gameLoop);
	            _gameLoop = null;
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            this.snake.move();
	            if (this.collisionCheck()) {
	                this.stop();
	                return;
	            }
	            console.log(this.canEat());
	            if (this.canEat()) {
	                this.snake.grow();
	                this.food.makeFood(this.snake, this.view.width, this.view.height);
	            }
	            this.view.render(this.snake, this.food);
	            _moving = false;
	        }
	
	        // Return true if snake head's position is the same as the food's position
	
	    }, {
	        key: 'canEat',
	        value: function canEat() {
	            var head = this.snake.getHead();
	            if (head.x === this.food.x && head.y === this.food.y) {
	                return true;
	            }
	            return false;
	        }
	
	        // check collision
	
	    }, {
	        key: 'collisionCheck',
	        value: function collisionCheck() {
	            var head = this.snake.getHead();
	            for (var i = 0, len = this.snake.getLength() - 1; i < len; i++) {
	                var node = this.snake.nodeAt(i);
	                if (node.x === head.x && node.y === head.y) {
	                    return true;
	                }
	            }
	            return head.x < 0 || head.x >= this.view.width || head.y < 0 || head.y >= this.view.height;
	        }
	
	        // Handle keydow action, pressing arrow keys to move snake
	
	    }, {
	        key: 'handleKeyDown',
	        value: function handleKeyDown(keyCode) {
	            if (_gameLoop === null) return;
	            var dir = 0;
	            if (keyCode === KEY_UP) {
	                dir = 1;
	            } else if (keyCode === KEY_RIGHT) {
	                dir = 2;
	            } else if (keyCode === KEY_DOWN) {
	                dir = 3;
	            }
	            if (!_moving) this.moveTo(dir);
	        }
	
	        // 0: left, 1: up, 2: right, 3: down
	
	    }, {
	        key: 'moveTo',
	        value: function moveTo(dir) {
	            var goTo = {
	                x: this.snake.snakeX,
	                y: this.snake.snakeY
	            };
	
	            if (!!goTo.x) {
	                if (dir === 1 || dir === 3) {
	                    goTo.x = 0;
	                    goTo.y = dir - 2;
	                }
	            } else if (!!goTo.y) {
	                if (dir === 0 || dir === 2) {
	                    goTo.x = dir - 1;
	                    goTo.y = 0;
	                }
	            }
	
	            this.snake.nextStep(goTo);
	            _moving = true;
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
	
	var FOOD_COLOR = '#C46243';
	
	var _class = function () {
	    function _class(size) {
	        _classCallCheck(this, _class);
	
	        this.size = size || 10;
	        this.color = FOOD_COLOR;
	    }
	
	    _createClass(_class, [{
	        key: 'makeFood',
	        value: function makeFood(snake, width, height) {
	            while (true) {
	                this.x = Math.floor(Math.random() * width / this.size) * this.size;
	                this.y = Math.floor(Math.random() * height / this.size) * this.size;
	                if (_canPutFoodAt(snake, this.x, this.y)) return;
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	
	
	function _canPutFoodAt(snake, x, y) {
	    for (var i = 0, len = snake.getLength(); i < len; i++) {
	        var node = snake.nodeAt(i);
	        if (node.x === x && node.y === y) {
	            return false;
	        }
	    }
	
	    return true;
	}

/***/ },
/* 3 */
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
	var DEF_BG_COLOR = '#eee';
	
	var _class = function () {
	    function _class(options) {
	        _classCallCheck(this, _class);
	
	        options = options || {};
	        this.width = options.width || DEF_WIDTH;
	        this.height = options.height || DEF_HEIGHT;
	        this.borderColor = options.borderCOlor || DEF_BORDER_COLOR;
	        this.bgColor = options.bgColor || DEF_BG_COLOR;
	        this.initCanvas();
	    }
	
	    // Make canvas instance
	
	
	    _createClass(_class, [{
	        key: 'initCanvas',
	        value: function initCanvas() {
	            this.canvas = document.getElementById('canvas');
	            this.ctx = this.canvas.getContext('2d');
	
	            this.canvas.width = this.width;
	            this.canvas.height = this.height;
	        }
	    }, {
	        key: 'listenKeyDown',
	        value: function listenKeyDown(callback) {
	            document.addEventListener('keydown', function (evt) {
	                evt = evt || window.event;
	                callback(evt.keyCode);
	            }, false);
	        }
	    }, {
	        key: 'render',
	        value: function render(snake, food) {
	            this.ctx.clearRect(0, 0, this.width, this.height);
	            this.drawBackground();
	            this.drawSnake(snake);
	            this.drawFood(food);
	        }
	
	        // Draw canvas background
	
	    }, {
	        key: 'drawBackground',
	        value: function drawBackground() {
	            if (!this.canvas || !this.ctx) {
	                this.initCanvas();
	            }
	
	            // draw background and border
	            this.ctx.rect(0, 0, this.width, this.height);
	            this.ctx.fillStyle = this.bgColor;
	            this.ctx.fill();
	
	            this.ctx.strokeStyle = this.borderColor;
	            this.ctx.lineWidth = 2;
	            this.ctx.stroke();
	        }
	
	        // Draw the snake at the given position(x, y)
	
	    }, {
	        key: 'drawSnake',
	        value: function drawSnake(snake) {
	            for (var i = 0, len = snake.getLength(); i < len; i++) {
	                var node = snake.nodeAt(i);
	                if (node) {
	                    this.ctx.fillStyle = node.color;
	                    this.ctx.fillRect(node.x, node.y, snake.size, snake.size);
	                }
	            }
	        }
	    }, {
	        key: 'drawFood',
	        value: function drawFood(food) {
	            //let pos = makeFood(snake, this.width, this.height);
	            this.ctx.fillStyle = food.color;
	            this.ctx.fillRect(food.x, food.y, food.size, food.size);
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEF_SIZE = 10;
	var BODY_COLOR = '#333';
	var HEAD_COLOR = '#0089A7';
	
	function _makeBodyNode(nodeX, nodeY) {
	    return {
	        color: BODY_COLOR,
	        x: nodeX,
	        y: nodeY
	    };
	}
	
	var _class = function () {
	    function _class(options) {
	        _classCallCheck(this, _class);
	
	        options = options || {};
	        this.size = options.size || DEF_SIZE; // node size
	        this.bodyColor = options.bodyColor || BODY_COLOR; // body color
	        this.headColor = options.headColor || HEAD_COLOR; // head color
	    }
	
	    _createClass(_class, [{
	        key: 'init',
	        value: function init(x, y) {
	            this.body = []; // head is the last element
	            this.nextStep({
	                x: 1,
	                y: 0
	            });
	
	            // 3 nodes long initially □□
	            var count = 0;
	            while (count < 10) {
	                var node = _makeBodyNode(x - this.size * count, y);
	                this.addNode(node);
	                count++;
	            }
	        }
	
	        // Snake moves in the given direction
	
	    }, {
	        key: 'move',
	        value: function move() {
	            var count = 0;
	
	            while (count < this.getLength()) {
	                var nextNode = this.body[count + 1];
	                var currNode = this.body[count];
	
	                // move current node to the position of the next node,
	                if (nextNode) {
	                    currNode.x = nextNode.x;
	                    currNode.y = nextNode.y;
	                } else {
	                    // move head one step further in the given direction
	                    currNode.x = currNode.x + this.snakeX * this.size;
	                    currNode.y = currNode.y + this.snakeY * this.size;
	                }
	
	                count++;
	            }
	        }
	    }, {
	        key: 'nextStep',
	        value: function nextStep(dir) {
	            this.snakeX = dir.x;
	            this.snakeY = dir.y;
	        }
	    }, {
	        key: 'eat',
	        value: function eat() {
	            var tail = this.getTail();
	            var x = tail.x;
	            var node = _makeBodyNode(x, y);
	        }
	
	        // Append one node to the body
	
	    }, {
	        key: 'addNode',
	        value: function addNode(node) {
	            if (!node) {
	                throw new Error('node is undefined.');
	            }
	            // if length is 0, then it's the head
	            if (this.getLength() === 0) {
	                node.color = this.headColor;
	            }
	            this.body.unshift(node);
	            return this;
	        }
	    }, {
	        key: 'grow',
	        value: function grow() {
	            var head = this.getHead();
	            var newHead = _makeBodyNode(head.x, head.y);
	            head.color = BODY_COLOR;
	            newHead.color = HEAD_COLOR;
	            this.body.push(newHead);
	        }
	    }, {
	        key: 'nodeAt',
	        value: function nodeAt(index) {
	            return this.body[index];
	        }
	    }, {
	        key: 'getHead',
	        value: function getHead() {
	            return this.body[this.body.length - 1];
	        }
	    }, {
	        key: 'getTail',
	        value: function getTail() {
	            return this.body[0];
	        }
	    }, {
	        key: 'getLength',
	        value: function getLength() {
	            return this.body.length;
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map
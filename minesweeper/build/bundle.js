/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _EASY = {
    INDEX: 0,
    NAME: 'Easy',
    BOMB_NUM: 10,
    GRID_ROW: 10,
    GRID_COL: 10
};

var _MEDIUM = {
    INDEX: 1,
    NAME: 'Medium',
    BOMB_NUM: 40,
    GRID_ROW: 16,
    GRID_COL: 16
};

var _HARD = {
    INDEX: 2,
    NAME: 'Hard',
    BOMB_NUM: 99,
    GRID_ROW: 16,
    GRID_COL: 30
};

var base = exports.base = {
    KEY_CODE: {
        ALT: 18,
        ENTER: 13,
        CTRL: 17,
        LEFT_CLICK: 1,
        MID_CLICK: 2,
        RIGHT_CLICK: 3
    },

    LEVELS: [_EASY, _MEDIUM, _HARD]
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEF_LEVEL = _const.base.LEVELS[0];

var Grid = function () {
    function Grid(options) {
        _classCallCheck(this, Grid);

        options = options || {};
        var row = options.row || DEF_LEVEL.GRID_ROW;
        var col = options.col || DEF_LEVEL.GRID_COL;
        var bombs = options.bombs || DEF_LEVEL.BOMB_NUM;

        this.create(row, col, bombs);
    }

    _createClass(Grid, [{
        key: 'create',
        value: function create(row, col, bombs) {
            this.resize(row, col).countBombs(bombs).build().randomBombs();

            return this;
        }
    }, {
        key: 'resize',
        value: function resize(r, c) {
            this.row = r > 0 ? r : this.row;
            this.col = c > 0 ? c : this.col;
            return this;
        }
    }, {
        key: 'build',
        value: function build() {
            this.grid = [];
            for (var r = 0; r < this.row; r++) {
                this.grid[r] = [];
                for (var c = 0; c < this.col; c++) {
                    this.grid[r].push(this._createTile());
                }
            }

            return this;
        }
    }, {
        key: 'countBombs',
        value: function countBombs(bombs) {
            this.bombsCount = bombs > 0 ? bombs : this.bombsCount;
            return this;
        }
    }, {
        key: 'randomBombs',
        value: function randomBombs() {
            if (this.grid && Array.isArray(this.grid)) {
                var count = 0;

                while (count < this.bombsCount) {
                    var r = Math.floor(Math.random() * this.row);
                    var c = Math.floor(Math.random() * this.col);

                    if (!this.hasBomb(r, c)) {
                        this._addBomb(r, c)._increaseBombsAround(r - 1, c)._increaseBombsAround(r - 1, c - 1)._increaseBombsAround(r - 1, c + 1)._increaseBombsAround(r, c - 1)._increaseBombsAround(r, c + 1)._increaseBombsAround(r + 1, c)._increaseBombsAround(r + 1, c - 1)._increaseBombsAround(r + 1, c + 1);

                        count++;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'hasBomb',
        value: function hasBomb(r, c) {
            return this.grid[r] && this.grid[r][c] && this.grid[r][c].hasBomb;
        }
    }, {
        key: 'isExposed',
        value: function isExposed(r, c) {
            return this.grid[r] && this.grid[r][c] && this.grid[r][c].exposed;
        }
    }, {
        key: 'isMarked',
        value: function isMarked(r, c) {
            return this.grid[r] && this.grid[r][c] && this.grid[(r, c)].marked;
        }
    }, {
        key: '_createTile',
        value: function _createTile() {
            return {
                hasBomb: false,
                marked: false,
                exposed: false,
                bombsAround: 0
            };
        }
    }, {
        key: '_addBomb',
        value: function _addBomb(r, c) {
            this.grid[r] && this.grid[r][c] && (this.grid[r][c].hasBomb = true);
            return this;
        }
    }, {
        key: '_increaseBombsAround',
        value: function _increaseBombsAround(r, c) {
            this.grid[r] && this.grid[r][c] && this.grid[r][c].bombsAround++;
            return this;
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qs = qs;
exports.qsa = qsa;
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.on = on;
exports.delegate = delegate;
exports.listenTo = listenTo;
exports.fire = fire;


function qs(selector, context) {
    return (context || document).querySelector(selector);
}

function qsa(selector, context) {
    return (context || document).querySelectorAll(selector);
}

function hasClass(element, className) {
    return !!element && element.classList.contains(className);
}

function addClass(element, className) {
    element && element.classList.add(className);
}

function removeClass(element, className) {
    element && element.classList.remove(className);
}

function on(target, event, callback, useCapture) {
    target.addEventListener(event, _callback(callback, target), !!!useCapture);
}

function delegate(delegator, selector, eventName, callback) {
    var useCapture = eventName === 'blur' || eventName === 'focus';

    on(delegator, eventName, function (event) {
        var target = event.target;
        var potentialTargets = qsa(selector, delegator);
        var hasMatch = Array.prototype.indexOf(potentialTargets, target) >= 0;

        if (hasMatch) {
            _callback(target, callback)(event);
        }
    }, useCapture);
}

function listenTo(obj, eventName, callback, context) {
    if (!obj) return this;
    obj._events = obj._events || {};
    if (typeof eventName === 'string') {
        var handlers = obj._events[eventName] || (obj._events[eventName] = []);
        context = context || null;
        handlers.push({
            callback: callback,
            context: context
        });
    }
}

function fire(obj, eventName, eventData) {
    if (!obj._events) return this;

    eventData = eventData || {};
    var handlers = obj._events[eventName] || [];

    for (var i = 0; i < handlers.length; i++) {
        if (!handlers[i] || !handlers[i].callback) continue;
        var ctx = handlers[i].context || this;
        _callback(handlers[i].callback, ctx)(eventData);
    }
}

function _callback(callback, context) {
    return function () {
        if (typeof callback === 'function') {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            callback.apply(context, params);
        }
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(0);

var _util = __webpack_require__(2);

var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

var _view = __webpack_require__(6);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(option) {
        _classCallCheck(this, Controller);

        option = option || {};
        this.levels = option.levels || _const.base.LEVELS;
        this.currentLevel = option.currentLevel || 0;

        var level = this.levels[this.currentLevel];

        this.grid = new _grid2.default({
            row: level.GRID_ROW,
            col: level.GRID_COL,
            bombs: level.BOMB_NUM
        });

        this.view = new _view2.default();
        this.view.initOption(this.levels);

        this.listen();
    }

    /**
     * Listens to actions on interface
     */


    _createClass(Controller, [{
        key: 'listen',
        value: function listen() {
            var _this = this;

            (0, _util.listenTo)(this.view, 'levelChanged', function (eventData) {
                _this._levelChanged(eventData.value);
            }, this);

            (0, _util.listenTo)(this.view, 'tileClicked', function (eventData) {}, this);

            (0, _util.listenTo)(this.view, 'reset', function () {}, this);

            (0, _util.listenTo)(this, 'over', function () {});

            (0, _util.listenTo)(this, 'won', function () {});

            return this;
        }
    }, {
        key: 'start',
        value: function start() {}

        /**
         * Reset parameters
         */

    }, {
        key: 'reset',
        value: function reset(level) {
            this.stopTimer();

            var redo = false;

            if (this.currentLevel !== level) {
                this.currentLevel = level >= 0 && level < this.levels.length ? level : this.currentLevel;
                redo = this.currentLevel !== level;
            }

            this.bombsLeft = this.levels[this.currentLevel].BOMB_NUM;
            this.timePassed = 0;

            if (redo) {
                var row = this.levels[this.currentLevel].GRID_ROW;
                var col = this.levels[this.currentLevel].GRID_COL;
                var bombs = this.levels[this.currentLevel].BOMB_NUM;
                this.grid.create();
            } else {
                this.grid.randomBombs();
            }

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            this.view.setBombsLeft(this.bombsLeft).setTimer(this.timePassed).render(this.grid);
        }
    }, {
        key: 'startTimer',
        value: function startTimer() {
            var _this2 = this;

            this.stopTimer();
            this.timePassed = 0;
            this.timer = window.setInterval(function () {
                _this2.timePassed++;
                _this2.view.setTimer(_this2.timePassed);
            });

            return this;
        }
    }, {
        key: 'stopTimer',
        value: function stopTimer() {
            window.clearInterval(this.timer);
            this.timer = null;

            return this;
        }
    }, {
        key: '_levelChanged',
        value: function _levelChanged(value) {
            this.reset(value).render();
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _const = __webpack_require__(0);

var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);

        this.$container = (0, _util.qs)('.container');
        this.$grid = (0, _util.qs)('.grid-container', this.$container);
        this.$levelOption = (0, _util.qs)('#level-select');
        this.$timer = (0, _util.qs)('div.timer p', this.$container);
        this.$counter = (0, _util.qs)('div.counter p', this.$container);
        this.$resetButton = (0, _util.qs)('#reset-btn');
    }

    _createClass(View, [{
        key: 'render',
        value: function render(grid) {
            if (grid && grid.row && grid.col) {
                this.buildGridView(grid.row, grid.col);
            }
            return this;
        }
    }, {
        key: 'buildGridView',
        value: function buildGridView(row, col) {
            var gridElement = '';
            for (var r = 0; r < row; r++) {
                var gridRow = '<div class="row band">';
                for (var c = 0; c < col; c++) {
                    gridRow += '<div class="col tile ' + this._getTileClass(r, c) + '"></div>';
                }
                gridRow += '</div>';
                gridElement += gridRow;
            }

            this.$grid.innerHTML = gridElement;
            this._adjustContainerWidth(col);

            return this;
        }
    }, {
        key: 'setTimer',
        value: function setTimer(timePassed) {
            if (timePassed >= 0) {
                this.$timer.innerHTML = timePassed + '';
            }
            return this;
        }
    }, {
        key: 'setBombsLeft',
        value: function setBombsLeft(bombsLeft) {
            if (bombsLeft >= 0) {
                this.$counter.innerHTML = bombsLeft + '';
            }
            return this;
        }
    }, {
        key: 'initLevels',
        value: function initLevels(levels) {
            var _this = this;

            levels.map(function (level) {
                _this.$levelOption.innerHTML += '<option value="' + level.INDEX + '">' + level.NAME + '</option>';
            });

            return this;
        }
    }, {
        key: '_adjustContainerWidth',
        value: function _adjustContainerWidth(col) {
            var $tile = (0, _util.qs)('.cell-0-0');
            var padding = 2 * parseInt(window.getComputedStyle(this.$container).paddingLeft, 10);
            var tileWidth = $tile.offsetWidth + 2 * parseInt(window.getComputedStyle($tile).marginRight, 10);
            var gridWidth = tileWidth * col + padding;
            this.$container.style.width = gridWidth + 'px';
        }
    }, {
        key: '_installListeners',
        value: function _installListeners() {
            var _this2 = this;

            (0, _util.delegate)(this.$grid, '.tile', 'click', function (tile, evt) {
                (0, _util.fire)(_this2, 'tileClicked', {
                    tile: tile,
                    event: evt
                });
            });

            (0, _util.on)(this.$levelOption, 'change', function (event) {
                (0, _util.fire)(_this2, 'levelChanged', {
                    value: _this2.$levelOption.value
                });
            }, false);

            (0, _util.on)(this.$resetButton, 'click', function (event) {
                (0, _util.fire)(_this2, 'reset', {});
            }, false);
        }
    }, {
        key: '_getTileClass',
        value: function _getTileClass(r, c) {
            return 'cell-' + r + '-' + c;
        }
    }]);

    return View;
}();

exports.default = View;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _normalize = __webpack_require__(5);

var _normalize2 = _interopRequireDefault(_normalize);

var _app = __webpack_require__(4);

var _app2 = _interopRequireDefault(_app);

var _const = __webpack_require__(0);

var _controller = __webpack_require__(3);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctrl = new _controller2.default(_const.base.LEVELS.EASY);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
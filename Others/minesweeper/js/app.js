/**
 * Handle events operations,
 * return a singleton EventHandler object
 */
var EventsHandler = (function () {
    var instance;

    function init () {
        var events = {};

        function _getCallback (element, callback) {
            var aCallback = function (evt) {
                if (typeof callback === 'function') {
                    return callback.call(element, evt);
                }
            };

            return aCallback;
        }

        return {
            delegateMouseClick: function (element, targetClass, callback, rightClick) {
                this.click(element, function (evt) {
                    var event = evt || window.event;
                    var target = event.target || event.srcElement;

                    if (target.classList.contains(targetClass)) {
                        event.preventDefault();
                        callback(target, event);
                    }
                }, rightClick);
            },

            click: function (element, callback, rightClick) {
                callback = _getCallback(element, callback);

                if (rightClick) element.addEventListener('contextmenu', callback, false);
                element.addEventListener('click', callback, false);
                return element;
            },

            onchange: function (element, callback) {
                callback = _getCallback(element, callback);
                element.addEventListener('change', callback, false);
                return element;
            },

            getEvents: function () {
                return events;
            },

            listen: function (eventName, callback, callee) {
                var aCallee = callee || this;
                var aCallback = callback ? callback.bind(aCallee) : {};
                if (!events[eventName]) {
                    events[eventName] = [];
                }
                events[eventName].push(aCallback);
            },

            emit: function (eventName, eventData) {
                var callbacks = events[eventName];
                if (callbacks.length) {
                    callbacks.forEach(function (callback) {
                        callback(eventData);
                    });
                }
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

/**
 * Stores cells data
 */
function MineGrid () {
    this.setGridSize();
}

MineGrid.prototype = (function () {
    var _cells = [];

    var _constants = {
        NO_BOMB: 0,
        HAS_BOMB: 1,
        DEFAULT_GRID_SIZE: {x: 10, y: 10}
    };

    function _setGridSize(size) {
        this.gridSize = size || _constants.DEFAULT_GRID_SIZE;
    }

    function _initCell () {
        return {
            content: _constants.NO_BOMB,
            marked: false,
            cleared: false,
            bombsAround: 0
        };
    }

    function _build () {
        for (var x = 0; x < this.gridSize.x; x++) {
            var rows = _cells[x] = [];
            for (var y = 0; y < this.gridSize.y; y++) {
                rows.push(_initCell());
            }
        }
    }

    function _eachCell (callback) {
        for (var x = 0; x < this.gridSize.x; x++) {
            for (var y = 0; y < this.gridSize.y; y++) {
                callback(_cells[x][y], x, y);
            }
        }
    }

    function _toggleMarkCell (x, y) {
        _cells[x][y].marked = _cells[x][y].marked ? false : true;
    }

    function _clearCell(x, y) {
        _cells[x][y].cleared = true;
    }

    // Return bombs around this cell
    function _bombsAroundAt(x, y) {
        return _cells[x][y].bombsAround;
    }

    // Check if the given cell has been marked
    function _isMarked (x, y) {
        return _cells[x][y].marked;
    }

    // Check if the given cell has been opened
    function _isCleared (x, y) {
        return _cells[x][y].cleared;
    }

    // Check if the given cell has bomb
    function _hasBomb (x, y) {
        return _cells[x][y].content === _constants.HAS_BOMB;
    }

    function _withinBound (x, y) {
        return x >= 0 && y >= 0 && x < this.gridSize.x && y < this.gridSize.y;
    }

    function _increaseBombsAroundAt (x, y) {
        if (this.withinBound(x, y)) _cells[x][y].bombsAround++;
        return this;
    }

    function _randomBombs (bombNumber) {
        while (bombNumber > 0) {
            var x = Math.floor(Math.random() * this.gridSize.x);
            var y = Math.floor(Math.random() * this.gridSize.y);

            if (!_cells[x][y].content) {
                _cells[x][y].content = _constants.HAS_BOMB;

                // increase bombCount for the 8 adjacent cells
                this.increaseBombsAroundAt(x - 1, y)
                    .increaseBombsAroundAt(x - 1, y + 1)
                    .increaseBombsAroundAt(x - 1, y - 1)
                    .increaseBombsAroundAt(x, y - 1)
                    .increaseBombsAroundAt(x, y + 1)
                    .increaseBombsAroundAt(x + 1, y)
                    .increaseBombsAroundAt(x + 1, y - 1)
                    .increaseBombsAroundAt(x + 1, y + 1);

                bombNumber--;
            }
        }
    }

    function _cellContent (x, y) {
        return _cells[x][y];
    }

    return {
        setGridSize: _setGridSize,
        build: _build,
        eachCell: _eachCell,
        toggleMarkCell: _toggleMarkCell,
        bombsAroundAt: _bombsAroundAt,
        clearCell: _clearCell,
        isMarked: _isMarked,
        isCleared: _isCleared,
        hasBomb: _hasBomb,
        randomBombs: _randomBombs,
        withinBound: _withinBound,
        cellContent: _cellContent,
        increaseBombsAroundAt: _increaseBombsAroundAt
    };
})();

/**
 * View
 */
function MineView (level) {
    this.init(level || 0);
}

MineView.prototype = (function () {
    var _eventsHandler = EventsHandler.getInstance();
    var _constants = {
        0 : 'over',
        1 : 'won',
        2: 'running'
    };

    // Get DOM elements and setup initial values
    function _init (level) {
        this.mainContainer = document.getElementsByClassName('container')[0];

        this.levelList = document.getElementById('level-select');
        this.levelList.value = level;

        this.timeBoard = document.querySelector('div.timer p');
        this.bombCountBoard = document.querySelector('div.counter p');

        this.gameContainer = document.getElementsByClassName('game-container')[0];
        this.resetBtn = document.getElementById('reset-btn');
        this.gameStatus(2);

        this.listen();
    }

    function _listen () {
        _eventsHandler.delegateMouseClick(this.gameContainer, 'tile', function (tile, evt) {
            _eventsHandler.emit('clickTile', { tile: tile, event: evt });
        }.bind(this), true);

        _eventsHandler.onchange(this.levelList, function (evt) {
            _eventsHandler.emit('levelChanged', this.value);
        });

        _eventsHandler.click(this.resetBtn, function (evt) {
            _eventsHandler.emit('reset', 2);
        });
    }

    // clear the given tile
    function _clearTile (tile, tileClass) {
        var classList = tile.classList;
        classList.remove('tile-flag');
        classList.add(tileClass, 'cleared');
    }

    // Show bomb on the tile
    function _revealBomb (tile) {
        tile.classList.add('tile-bomb', 'cleared');
    }

    // Toggle flag on the tile
    function _toggleFlag (tile, marked) {
        if (marked) {
            tile.classList.remove('tile-flag');
        } else {
            tile.classList.add('tile-flag');
        }
    }

    // Return the first tile element
    function _tileAt (x, y) {
        return this.gameContainer.getElementsByClassName(_getCellClass(x, y))[0];
    }

    // Resize container to fit tiles
    function _adjustContainerWidth (gridY) {
        var tile = this.tileAt(0, 0);

        var padding = 2 * parseInt(window.getComputedStyle(this.mainContainer).paddingLeft, 10);
        var tileWidth = tile.offsetWidth + 2 * parseInt(window.getComputedStyle(tile).marginRight, 10);

        var width = tileWidth * gridY + padding;
        this.mainContainer.style.width = width + 'px';
    }

    // Build view based on the current setup
    function _buildGridView (gridX, gridY) {
        var gridElements = '';

        // Build view
        for (var x = 0; x < gridX; x++) {
            var row = '<div class="row row-10">';
            var cols = [];
            for (var y = 0; y < gridY; y++) {
                row += '<div class="col tile ' + _getCellClass(x, y) + '"></div>';
            }
            row += '</div>';
            gridElements += row;
        }

        this.gameContainer.innerHTML = gridElements;
        this.adjustContainerWidth(gridY);
    }

    // Return cell css class
    function _getCellClass (x, y) {
        return 'cell-' + x + '-' + y;
    }

    // Set time passed
    function _setTime (time) {
        if (time >= 0 && time <= 99999) this.timeBoard.textContent = time;
    }

    // Set bombs left
    function _setBombLeft (bombLeft) {
        if (bombLeft >= 0) this.bombCountBoard.textContent = bombLeft;
    }

    // Toggle blocking game container
    function _toggleBlock (block) {
        if (block) {
            this.gameContainer.classList.add('block');
        } else {
            this.gameContainer.classList.remove('block');
        }
    }

    // Update view of game status
    function _gameStatus (status) {
        this.resetBtn.setAttribute('class', _constants[status]);
    }

    return {
        init: _init,
        listen: _listen,
        revealBomb: _revealBomb,
        toggleFlag: _toggleFlag,
        clearTile: _clearTile,
        tileAt: _tileAt,
        adjustContainerWidth: _adjustContainerWidth,
        buildGridView: _buildGridView,
        setTime: _setTime,
        setBombLeft: _setBombLeft,
        toggleBlock: _toggleBlock,
        gameStatus: _gameStatus
    };
})();

/**
 * Main game
 */
var MineSweeper = (function () {
    var _constants = {
        DIFFICULTY: {
            // easy
            0: {
                LEVEL: 0,
                BOMB_NUM: 2,
                GRID_X: 10,
                GRID_Y: 10
            },
            // medium
            1: {
                LEVEL: 1,
                BOMB_NUM: 40,
                GRID_X: 16,
                GRID_Y: 16
            },
            //hard
            2: {
                LELVE: 2,
                BOMB_NUM: 99,
                GRID_X: 16,
                GRID_Y: 30
            }
        },

        DEFAULT_DIFFICULTY: 0,

        // action type
        MARK: 1,
        CLEAR: 0,

        // mouse keycode
        LEFT_CLICK: 1,
        MID_CLICK: 2,
        RIGHT_CLICK: 3,

        OVER: 0,
        WON: 1,
        RUN: 2
    };

    var _eventsHandler = EventsHandler.getInstance(),
        _grid = new MineGrid(),     // MineGrid object
        _won = false,               // has won ?
        _over = false,              // is over ?
        _bombLeft,                  // Bombs not marked
        _timer;                     // timer

    return {
        init: function () {
            this.difficulty = _constants.DIFFICULTY[_constants.DEFAULT_DIFFICULTY];
            this.view = new MineView(this.difficulty.LEVEL);
            this.listen();
            this.reset();
        },

        // Listen to all events
        listen: function () {
            var self = this;

            _eventsHandler.listen('clickTile', this.clickTile, this);
            _eventsHandler.listen('won', this.updateGameStatus, this);
            _eventsHandler.listen('over', this.updateGameStatus, this);
            _eventsHandler.listen('reset', this.updateGameStatus, this);
            _eventsHandler.listen('levelChanged', this.changeDifficulty, this);
        },

        changeDifficulty: function (level) {
            this.difficulty = _constants.DIFFICULTY[level];
            _eventsHandler.emit('reset', _constants.RUN);
        },

        updateGameStatus: function (status) {
            switch (status) {
                case _constants.WON:
                case _constants.OVER:
                    this.stopGame(status);
                    break;
                case _constants.RUN:
                    this.reset();
                    break;
            }
        },

        stopGame: function (status) {
            this.view.toggleBlock(true);
            this.gameStatus = status;
            this.view.gameStatus(this.gameStatus);
            this.stopTimer();
        },

        reset: function () {
            this.setup();
            this.initMineGrid();
            this.startTimer();
        },

        setup: function () {
            _bombLeft = this.difficulty.BOMB_NUM;
            _won = false;
            _over = false;

            this.gameStatus = _constants.RUN;
            this.timePassed = 0;

            this.view.setTime(this.timePassed);
            this.view.setBombLeft(_bombLeft);
            this.view.gameStatus(this.gameStatus);
            this.view.toggleBlock(false);
        },

        initMineGrid: function () {
            this.gridSize = this.getGridSize();

            _grid.setGridSize(this.gridSize);
            _grid.build();
            _grid.randomBombs(this.difficulty.BOMB_NUM);

            this.view.buildGridView(this.gridSize.x, this.gridSize.y);
        },

        // Return current grid size
        getGridSize: function () {
            return {
                x: this.difficulty.GRID_X,
                y: this.difficulty.GRID_Y
            };
        },

        // Callback for clicking tile
        clickTile: function (metaData) {
            if (_won || _over) return;

            var tile = metaData.tile;
            var event = metaData.event || window.event;

            var combined = event.shiftKey || event.ctrlKey;
            if (combined) return;

            var action = this.actionType(event);
            var pos = this.tilePosition(tile);

            if (action === _constants.MARK && !_grid.isCleared(pos.x, pos.y)) {
                this.toggleFlag(tile, pos.x, pos.y);
            } else if (action === _constants.CLEAR) {
                this.openTile(tile, pos.x, pos.y);
            }

            if (this.hasWon()) {
                _over = false;
                this.gameStatus = _constants.WON;
                _eventsHandler.emit('won', this.gameStatus);
            }
        },

        // Open the tile
        openTile: function (tile, x, y) {
            if (_grid.withinBound(x, y) && !_grid.isMarked(x, y)) {
                if (_grid.hasBomb(x, y)) {
                    this.revealBomb(tile);
                } else {
                    this.clearAdjacentTiles(x, y);
                }
            }
        },

        // clear tiles with no bombs
        clearAdjacentTiles: function (x, y) {
            if (_grid.withinBound(x, y) && !_grid.hasBomb(x, y) &&
                !_grid.isCleared(x, y) && !_grid.isMarked(x, y)) {

                var tile = this.view.tileAt(x, y);
                this.clearTile(tile, x, y);

                if (!this.bombsAround(x, y)) {

                    this.clearAdjacentTiles(x - 1, y);
                    this.clearAdjacentTiles(x - 1, y + 1);
                    this.clearAdjacentTiles(x - 1, y - 1);
                    this.clearAdjacentTiles(x, y - 1);
                    this.clearAdjacentTiles(x, y + 1);
                    this.clearAdjacentTiles(x + 1, y);
                    this.clearAdjacentTiles(x + 1, y - 1);
                    this.clearAdjacentTiles(x + 1, y + 1);
                }
            }
        },

        // Check if there are bombs around this cell position
        bombsAround: function (x, y) {
            return _grid.bombsAroundAt(x, y) > 0;
        },

        // clear the given tile
        clearTile: function (tile, x, y) {
            _grid.clearCell(x, y);
            this.view.clearTile(tile, 'tile-' + _grid.bombsAroundAt(x, y));
        },

        // Show bomb on the tile
        revealBomb: function (tile) {
            this.view.revealBomb(tile);

            _won = false;
            _over = true;
            _eventsHandler.emit('over', _constants.OVER);
        },

        // Toggle flag on tile
        toggleFlag: function (tile, x, y) {
            var marked = _grid.isMarked(x, y);
            _bombLeft += marked ? 1 : -1;
            this.view.toggleFlag(tile, marked);
            this.view.setBombLeft(_bombLeft);
            _grid.toggleMarkCell(x, y);
        },

        // Return the given tile's position
        tilePosition: function (tile) {
            var classes = tile.className;
            var pos = classes.match(/cell\-\d+\-\d+/)[0].match(/\d+/g);

            if (pos && pos.length === 2) {
                var x = parseInt(pos[0], 10);
                var y = parseInt(pos[1], 10);

                return { x: x, y: y };
            }
        },

        // Return action type, 1 for marking bomb, 0 for uncover tile
        actionType: function (event) {
            var type;
            if (!event.altKey && event.which === _constants.LEFT_CLICK) {
                type = _constants.CLEAR;
            } else if ((event.altKey && event.which === _constants.LEFT_CLICK) ||
                      (!event.altKey && event.which === _constants.RIGHT_CLICK)) {
                type = _constants.MARK;
            }
            return type;
        },

        // Start timer
        startTimer: function () {
            var self = this;
            this.stopTimer();
            this.timePassed = 0;
            _timer = window.setInterval(function () {
                self.timePassed++;
                self.view.setTime(self.timePassed);
            }, 1000);
        },

        // Stop timer
        stopTimer: function () {
            window.clearInterval(_timer);
        },

        // Check if it has won
        hasWon: function () {
            if (_bombLeft === 0) {
                _won = true;
                _grid.eachCell(function (cell, x, y) {
                    if ((!_grid.isMarked(x, y) && !_grid.isCleared(x, y)) ||
                       (_grid.isMarked(x, y) && !_grid.hasBomb(x, y))) {
                        _won = false;
                        return;
                    }
                });
            }

            return _won;
        }
    };
})();

MineSweeper.init();

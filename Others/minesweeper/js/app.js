var constants = (function () {

})();

/**
 * Handle events operation,
 * return a singleton EventHandler object
 */
var EventHandler = (function () {
    var instance;

    function init () {
        var events = {};

        return {
            delegateMouseClick: function (element, targetClass, callback) {
                this.click(element, function (evt) {
                    var event = evt || window.event;
                    var target = event.target || event.srcElement;

                    if (target.classList.contains(targetClass)) {
                        event.preventDefault();
                        callback(target, event);
                    }
                }, true);
            },

            click: function (element, callback, rightClick) {
                var aCallback = function (evt) {
                    if (typeof callback === 'function') {
                        return callback.call(element, evt);
                    }
                };

                if (rightClick) element.addEventListener('contextmenu', aCallback, false);

                element.addEventListener('click', aCallback, false);

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

var MineSweeper = (function () {
    var constants = {
        DIFFICULTY: {
            // easy
            0: {
                BOMB_NUM: 10,
                GRID_X: 10,
                GRID_Y: 10
            },
            // medium
            1: {
                BOMB_NUM: 20,
                GRID_X: 20,
                GRID_Y: 10
            },
            //hard
            2: {
                BOMB_NUM: 50,
                GRID_X: 16,
                GRID_Y: 30
            }
        },

        // -1 bomb marked, 0 no bomb, 1 bomb
        FLAGED: -1,
        NO_BOMB: 0,
        HAS_BOMB: 1,

        // action type
        MARK: 1,
        CLEAR: 0,

        // mouse keycode
        LEFT_CLICK: 1,
        MID_CLICK: 2,
        RIGHT_CLICK: 3
    };

    var gridSize;

    var difficulty = 0;
    var cells = [];

    return {
        // Initialize cells and clean up cells displayed
        initGrid: function () {
            gridSize = this.getGridSize();
            var grid = '';

            for (var x = 0; x < gridSize.x; x++) {
                var row = '<div class="row row-10">';
                var cols = [];
                for (var y = 0; y < gridSize.y; y++) {
                    cols.push({
                        content: constants.NO_BOMB,
                        bombCount: 0,
                        marked: false,
                        cleared: false
                    });
                    row += '<div class="col tile ' + this.getCellClass(x, y) + '"></div>';
                }
                cells.push(cols);
                row += '</div>';
                grid += row;
            }

            this.gameContainer.innerHTML = grid;
            this.adjustContainerSize();
        },

        adjustContainerSize: function () {
            var tile = document.getElementsByClassName('tile')[0];

            var padding = 2 * parseInt(window.getComputedStyle(this.mainContainer).paddingLeft, 10);
            var margin = 2 * parseInt(window.getComputedStyle(this.mainContainer).marginLeft, 10);
            var tileWidth = tile.offsetWidth + 2 * parseInt(window.getComputedStyle(tile).marginRight, 10);

            var width = tileWidth * gridSize.y + padding + margin;
            this.mainContainer.style.width = width + 'px';
        },

        getCellClass: function (x, y) {
            return 'cell-' + x + '-' + y;
        },

        // Setup all aspects
        setup: function () {
            this.initGrid();
            this.placeRandomBombs();
        },

        // Bind all necessage events
        listen: function () {
            var self = this;
            this.eventsHandler.delegateMouseClick(this.gameContainer, 'tile', this.clickTile.bind(this));

            this.eventsHandler.click(this.resetBtn, function (evt) {
                self.eventsHandler.emit('reset');
            });

            this.eventsHandler.listen('win', this.reset, this);
            this.eventsHandler.listen('lose', this.reset, this);
            this.eventsHandler.listen('reset', this.reset, this);
        },

        reset: function () {
            this.setup();
            console.log('reset');
        },

        // Callback fires when we click the tile
        clickTile: function (tile, evt) {
            if (this.win || this.lose) return;

            var event = evt || window.event;
            var combined = event.shiftKey || event.ctrlKey;
            if (combined) return;

            var action = this.actionType(event);
            var pos = this.tilePosition(tile);

            if (action === constants.MARK && !this.isCleared(pos.x, pos.y)) {
                this.toggleFlag(tile);
            } else if (action === constants.CLEAR) {
                this.openTile(tile);
            }
        },

        // Open the tile
        openTile: function (tile) {
            var pos = this.tilePosition(tile);

            if (this.hasBomb(pos.x, pos.y)) {
                this.revealBomb(tile);
            } else {
                this.clearAdjacentTiles(pos.x, pos.y);
            }
        },

        // clear tiles with no bombs
        clearAdjacentTiles: function (x, y) {
            if (this.withinBound(x, y) && !this.hasBomb(x, y) && !cells[x][y].cleared) {

                var tile = document.getElementsByClassName(this.getCellClass(x, y))[0];
                this.clearTile(tile, x, y);

                if (!this.adjacentBombs(x, y)) {

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

        // Check if the given tile has been marked
        isMarked: function (x, y) {
            return cells[x][y].marked;
        },

        // Check if the given tile has been opened
        isCleared: function (x, y) {
            return cells[x][y].cleared;
        },

        // clear the given tile
        clearTile: function (tile, x, y) {
            if (!this.isCleared(x, y)) {

                cells[x][y].cleared = true;

                var classList = tile.classList;
                classList.remove('tile-flag');
                classList.add('tile-' + cells[x][y].bombCount, 'cleared');
            }
        },

        // Check if the given cell has bomb
        hasBomb: function (x, y) {
            return cells[x][y].content === constants.HAS_BOMB;
        },

        // Check if adjacent cells have bombs
        adjacentBombs: function (x, y) {
            return cells[x][y].bombCount > 0;
        },

        revealBomb: function (tile) {
            tile.classList.add('tile-bomb', 'cleared');
            this.lose = true;
            this.eventHandler.emit('lose');
        },

        // Toggle flag tile
        toggleFlag: function (tile) {
            var pos = this.tilePosition(tile);
            if (this.isMarked(pos.x, pos.y)) {
                cells[pos.x][pos.y].marked = false;
                tile.classList.remove('tile-flag');
            } else {
                cells[pos.x][pos.y].marked = true;
                tile.classList.add('tile-flag');
            }
        },

        // Place bombs randomly into the cells
        placeRandomBombs: function () {
            var bombNum  = constants.DIFFICULTY[difficulty].BOMB_NUM;

            while (bombNum > 0) {
                var x = Math.floor(Math.random() * gridSize.x);
                var y = Math.floor(Math.random() * gridSize.y);

                if (!cells[x][y].content) {
                    cells[x][y].content = constants.HAS_BOMB;

                    // increase bombCount for the 8 adjacent cells
                    this.increaseBombCountAt(x - 1, y)
                        .increaseBombCountAt(x - 1, y + 1)
                        .increaseBombCountAt(x - 1, y - 1)
                        .increaseBombCountAt(x, y - 1)
                        .increaseBombCountAt(x, y + 1)
                        .increaseBombCountAt(x + 1, y)
                        .increaseBombCountAt(x + 1, y - 1)
                        .increaseBombCountAt(x + 1, y + 1);

                    bombNum--;
                }
            }
        },

        withinBound: function (x, y) {
            return x >= 0 && y >= 0 && x < gridSize.x && y < gridSize.y;
        },

        increaseBombCountAt: function (x, y) {
            if (this.withinBound(x, y)) cells[x][y].bombCount++;
            return this;
        },

        // Return action type, 1 for marking bomb, 0 for uncover tile
        actionType: function (event) {
            var type;
            if (!event.altKey && event.which === constants.LEFT_CLICK) {
                type = constants.CLEAR;
            } else if ((event.altKey && event.which === constants.LEFT_CLICK) ||
                      (!event.altKey && event.which === constants.RIGHT_CLICK)) {
                type = constants.MARK;
            }
            return type;
        },

        getGridSize: function () {
            return {
                x: constants.DIFFICULTY[difficulty].GRID_X,
                y: constants.DIFFICULTY[difficulty].GRID_Y
            };
        },

        // Initialization
        init: function () {
            this.win = false;
            this.lose = false;

            this.bombLeft = constants.BOMB_NUM;

            this.timer = [];

            this.eventsHandler = EventHandler.getInstance();

            this.mainContainer = document.getElementsByClassName('container')[0];

            this.timeBoard = document.querySelector('div.timer p');
            this.bombCountBoard = document.querySelector('div.counter p');
            this.difficultyList = document.querySelector('#difficulty select');
            this.difficultyList.value = difficulty;

            this.gameContainer = document.getElementsByClassName('game-container')[0];
            this.resetBtn = document.getElementById('reset-btn');

            this.setup();
            this.listen();
        }
    };
})();

MineSweeper.init();

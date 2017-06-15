var MineCtrl = (function () {
    'use strict';

    var $ = $ || window.$;
    var CONST = CONST || window.CONST;

    /**
     * Actual array of tiles
     */
    var _cells = [];
    var _timer;
    var _bombsLeft;

    var MineCtrl = function (option) {
        var option = option || {};
        option.bombsCount = option.bombsCount || CONST.EASY.BOMB_NUM;
        option.row = option.row || CONST.EASY.GRID_ROW;
        option.col = option.col || CONST.EASY.GRID_COL;
        this.init(option).randomBombs();
    }

    MineCtrl.prototype.init = function (option) {
        this.grid = new MineGrid(option);
        _cells = this.grid.build();

        this.view = new MineView();
        this.view.drawGrid(this.grid);
        this.listenToView();

        return this;
    }

    MineCtrl.prototype.listenToView = function () {
        $.listenTo(this.view, 'levelChanged', function (eventData) {
            var value = eventData.value || 0;
            this.changeLevel(value);
        }, this);

        $.listenTo(this.view, 'click', function (eventData) {
            this.clickHandler();
        }, this);

        $.listenTo(this.view, 'start', function (eventData) {
            var value = eventData.value || 0;
            var level = CONST.LEVELS[value];
            this.init(level).randomBombs();
        }, this);
    }

    MineCtrl.prototype.changeLevel = function (value) {
        var level = CONST.LEVELS[value];
        this.init(level).randomBombs();
    }

    MineCtrl.prototype.clickHandler = function (tile) {
        
    }

    MineCtrl.prototype.startGame = function () {

    }

    MineCtrl.prototype.tilePosition = function (tile) {
        var classNames = tile.className;
        var pos = classNames.match(/cell\-\d+\-\d+/)[0].match(/\d+/g);

        if (pos && pos.length === 2) {
            var r = parseInt(pos[0], 10);
            var c = parseInt(pos[1], 10);

            return {
                row: r,
                col: c
            };
        }

        return {};
    }

    MineCtrl.prototype.randomBombs = function () {
        var count = 0;
        while (count < this.bombsCount) {
            var r = Math.floor(Math.random() * this.grid.row);
            var c = Math.floor(Math.random() * this.grid.col);

            if (!_cells[r][c].hasBomb) {
                this.addBomb(r, c)
                    .increaseBombsAroundAt(r, c - 1)
                    .increaseBombsAroundAt(r, c + 1)
                    .increaseBombsAroundAt(r - 1, c)
                    .increaseBombsAroundAt(r - 1, c - 1)
                    .increaseBombsAroundAt(r - 1, c + 1)
                    .increaseBombsAroundAt(r + 1, c)
                    .increaseBombsAroundAt(r + 1, c - 1)
                    .increaseBombsAroundAt(r + 1, c + 1);

                count++;
            }
        }

        return this;
    }

    MineCtrl.prototype.addBomb = function (r, c) {
         _cells[r][c].hasBomb = true;
         return this;
    }

    MineCtrl.prototype.increaseBombsAroundAt = function (r, c) {
        if (this.inGrid(r, c))
            _cells[r][c].bombsCount += 1;
        return this;
    }

    MineCtrl.prototype.inGrid = function (r, c) {
        return r >= 0 && c >= 0 && x < this.grid.row && c < this.grid.col;
    }

    MineCtrl.prototype.mark = function (r, c) {
        _cells[r][c].marked = true;
        return this;
    }

    MineCtrl.prototype.clear = function (r, c) {
        _cells[r][c].clear = true; 
        return this;
    }

    MineCtrl.prototype.startTimer = function () {
        var self = this;
        this.stopTimer();
        _timer = window.setInterval(function () {
            self.timePassed += 1;
        });
    }

    MineCtrl.prototype.stopTimer = function () {
        window.clearInterval(_timer);
    }

    return MineCtrl;
})();
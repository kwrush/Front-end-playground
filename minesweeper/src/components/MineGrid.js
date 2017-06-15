var MineGrid = (function () {
    'use strict';

    var c = CONST || window.CONST;

    function MineGrid (option) {
        var option = option || {};
        this.row = option.row | CONST.EASY.GRID_ROW;
        this.col = option.col || CONST.EASY.GRID_COL;
    }

    MineGrid.prototype.createTile = function () {
        return {
            hasBomb: false,
            marked: false,
            showed: false,
            bombsAround: 0
        };
    }

    MineGrid.prototype.build = function () {
        var cells = [];

        for (var x = 0; x < this.row; x++) {
            var rows = cells[x] = [];
            for (var y = 0; y < this.col; y++) {
                rows.push(this.createTile());
            }
        }

        return cells;
    }

    return MineGrid;
})();
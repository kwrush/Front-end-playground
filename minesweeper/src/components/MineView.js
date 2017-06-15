var MineView = (function () {
    'use strict';

    var $ = $ || window.$

    function MineView () {
        this.$level = $('#level-select');
        this.$reset = $('#reset-btn');
        this.$container = $('.game-container');
        this.$timer = $('.timer > p');
        this.installListeners();
    }

    MineView.prototype.installListeners = function () {
        $.onchange(this.$level, function (event) {
            var event = event || window.event;
            event.preventDefault();
            $.trigger(this, 'levelChanged', {
                level: this.$level.value,
                event: event
            });
        });

        $.click(this.$reset, function (event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
            $.trigger(this, 'start', {
                level: this.$level.value,
                event: event
            });
        });

        $.delegate(this.$container, 'click', '.tile', function (event) {
            var event = event || window.event;
            var tile = event.target;
            $.trigger(this, 'click', {
                tile: tile,
                event: event
            });
        });

        return this;
    }

    MineView.prototype.drawGrid = function (grid) {
        var tiles = '';
        for (var r = 0; r < grid.row; r++) {
            var row = '<div class="row band">';
            for (var c = 0; c < grid.col; c++) {
                row += ('<div class="col tile ' + _getCellClass(r, c) + '"></div>');
            }
            tiles += row;   
        }
        this.$container.innerHTML = tiles;
        return this;
    }

    function _getCellClass(r, c) {
        return 'cell-' + r + '-' + c;
    } 

    return MineView;

})();
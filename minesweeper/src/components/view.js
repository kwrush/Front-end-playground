import {
    qs, 
    qsa,
    hasClass,
    removeClass,
    addClass,
    clearClass,
    on,
    delegate,
    listenTo,
    fire
} from '../util'

import {base} from '../const'
import Grid from './grid'

export default class View {
    constructor () {
        this.$container = qs('.container');
        this.$grid = qs('.grid-container', this.$container);
        this.$levelOption = qs('#level-select');
        this.$timer = qs('div.timer p', this.$container);
        this.$counter = qs('div.counter p', this.$container);
        this.$resetButton = qs('#reset-btn');
        this._installListeners();
    }

    render(grid) {
        if (grid && grid.row && grid.col) {
            this.buildGridView(grid.row, grid.col);
        }
        return this;
    }

    resetIcon (cmd) {
        cmd = typeof cmd === 'string' ? cmd : 'running';
        clearClass(this.$resetButton);

        let name = '';
        if (cmd === 'running') {
            name += 'running';
        } else if (cmd === 'won') {
            name += 'won';
        } else if (cmd === 'over') {
            name += 'over';
        }
        addClass(this.$resetButton, name);

        return this;
    }

    toggleGrid (block) {
       block ? addClass(this.$grid, 'block') : 
               removeClass(this.$grid, 'block'); 
    }

    buildGridView(row, col) {
        let gridElement = '';
        for (let r = 0; r < row; r++) {
            let gridRow = '<div class="row band">';
            for (let c = 0; c < col; c++) {
                gridRow += '<div class="col tile ' + this._getTileClass(r, c) + '"></div>';
            }
            gridRow += '</div>';
            gridElement += gridRow;
        }

        this.$grid.innerHTML = gridElement;
        this._adjustContainerWidth(col);

        return this;
    }

    setTimer (timePassed) {
        if (timePassed >= 0) {
            this.$timer.innerHTML = timePassed + '';
        }
        return this;
    }

    setBombsLeft (bombsLeft) {
        if (bombsLeft >= 0) {
            this.$counter.innerHTML = bombsLeft + '';
        }
        return this;
    }

    initLevels (levels) {
        levels.map(level => {
            this.$levelOption.innerHTML += '<option value="' + 
                                           level.INDEX       + 
                                           '">'              +
                                           level.NAME        + 
                                           '</option>'; 
        });

        return this;
    }

    revealBomb (tile) {
        addClass(tile, 'tile-bomb');
    }

    revealMistake (tile) {
        removeClass(tile, 'tile-flag');
        addClass(tile, 'tile-wrong');
    }

    revealTile (tile, bombsNum) {
        addClass(tile, 'tile-' + bombsNum + ' cleared');
    }

    getTileAt (r, c) {
        return qs('.cell-' + r + '-' + c);
    }

    toggleFlag(tile, flag) {
        if (flag) {
            addClass(tile, 'tile-flag');
        } else {
            removeClass(tile, 'tile-flag');
        }
    }

    _adjustContainerWidth (col) {
        let $tile = qs('.cell-0-0');
        let padding = 2 * parseInt(window.getComputedStyle(this.$container).paddingLeft, 10);
        var tileWidth = $tile.offsetWidth + 2 * parseInt(window.getComputedStyle($tile).marginRight, 10);
        let gridWidth = tileWidth * col + padding;
        this.$container.style.width = gridWidth + 'px';
    }

    _installListeners () {
        delegate(this.$grid, '.tile', 'click', (event) => {
            event.preventDefault();
            fire(this, 'tileClicked', {
                tile: event.target
            });
        });

        delegate(this.$grid, '.tile', 'contextmenu', (event) => {
            event.preventDefault();
            fire(this, 'toggleFlag', {
                tile: event.target
            });
        });

        on(this.$levelOption, 'change', (event) => {
            fire(this, 'levelChanged', {
                value: this.$levelOption.value
            });
        }, false);

        on(this.$resetButton, 'click', (event) => {
            event.preventDefault();
            fire(this, 'reset', {});
        }, false);
    }

    _getTileClass(r, c) {
        return 'cell-' + r + '-' + c;
    }
}
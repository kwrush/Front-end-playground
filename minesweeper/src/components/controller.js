import { base } from '../const'
import { listenTo, fire } from '../util'

import Grid from './grid'
import View from './view'

export default class Controller {
    constructor (option) {
        option = option || {};
        this.levels = option.levels || base.LEVELS;
        this.currentLevel = option.currentLevel || 0;
        const level = this.levels[this.currentLevel];

        this.grid = new Grid({
            row: level.GRID_ROW,
            col: level.GRID_COL,
            bombs: level.BOMB_NUM
        });

        this.view = new View();
        this.view.initLevels(this.levels);

        this.listen().reset(this.currentLevel);
    }

    /**
     * Listens to actions on interface
     */
    listen () {
        listenTo(this.view, 'levelChanged', (eventData) => {
            this._levelChanged(eventData.value);
        }, this);

        listenTo(this.view, 'tileClicked', (eventData) => {
            this._tileClickHandler(eventData.tile);
        }, this);

        listenTo(this.view, 'reset', () => {
            this.reset(this.currentLevel).start();
        }, this);

        listenTo(this, 'over', () => {

        });

        listenTo(this, 'won', () => {

        });

        return this;
    }

    start () {
        this.render().startTimer();
    }

    /**
     * Reset parameters
     */
    reset (level) {
        this.stopTimer();

        this.won = this.over = false;

        let redo = false;

        if (this.currentLevel !== level) {
            let oldLevel = this.currentLevel;
            this.currentLevel = (level >= 0 && level < this.levels.length) ? 
                level : this.currentLevel;
            redo = this.currentLevel !== oldLevel;
        }

        this.bombsLeft = this.levels[this.currentLevel].BOMB_NUM;
        this.timePassed = 0;

        if (redo) {
            const row = this.levels[this.currentLevel].GRID_ROW;
            const col = this.levels[this.currentLevel].GRID_COL;
            const bombs = this.levels[this.currentLevel].BOMB_NUM;
            this.grid.create(row, col, bombs);
        } else {
            this.grid.build().randomBombs();
        }

        return this;
    }

    render () {
        this.view.setBombsLeft(this.bombsLeft)
                 .setTimer(this.timePassed)
                 .render(this.grid);
        
        let cmd = '';
        if (this.isGameRunning()) {
            cmd += 'running';
        } else if (this.won) {
            cmd += 'won';
        } else if (this.over) {
            cmd += 'over';
        }
        this.view.resetIcon(cmd);

        return this;
    }

    startTimer () {
        this.stopTimer();
        this.timePassed = 0;
        this.timer = window.setInterval(() => {
            this.timePassed++;
            this.view.setTimer(this.timePassed);
        }, 1000);

        return this;
    }

    stopTimer () {
        window.clearInterval(this.timer);
        this.timer = null;

        return this;
    }

    isGameRunning () {
        return !this.won || !this.over;
    }
 
    _levelChanged (value) {
        value = parseInt(value, 10);
        this.reset(value).start();
    }

    _tileClickHandler (tile) {
        if (!this.isGameRunning()) return;

        const pos = this._tileCoordinate(tile);
        if (pos.row >= 0 && pos.col >= 0) {
            // TODO: handle right click (toggle flag)
            // left click
           this._clearTile(pos.row, pos.col);
        }
    }

    _clearTile (r, c) {
        if (this.grid.hasBomb(r, c)) {
            fire(this, 'over');
        } else if (this.grid.isExposed(r, c) || this.grid.isMarked(r, c)) {
            // do nothing
        } else {
            this._clearAdjacentTiles(r, c);
        }

    }

    _tileCoordinate(tile) {
        const classNames = tile.className;
        const coordinate = classNames.match(/cell\-\d+\-\d+/)[0].match(/\d+/g);

        if (coordinate && coordinate.length === 2) {
            return {
                row: parseInt(coordinate[0], 10),
                col: parseInt(coordinate[1], 10)
            }
        }

        return {};
    }

    _clearAdjacentTiles (r, c) {
        if (this.grid.withinGrid(r, c) && !this.grid.isExposed(r, c) && 
        !this.grid.isMarked(r, c) && !this.grid.hasBomb(r, c)) {
            const tile = this.view.getTileAt(r, c);
            const bombsAround = this.grid.getBombsAround(r, c);

            this.grid.exposeTileAt(r, c);
            this.view.revealTile(tile, bombsAround);

            if (bombsAround === 0) {
                this._clearAdjacentTiles(r - 1, c)
                    ._clearAdjacentTiles(r - 1, c + 1)
                    ._clearAdjacentTiles(r - 1, c - 1)
                    ._clearAdjacentTiles(r, c - 1)
                    ._clearAdjacentTiles(r, c + 1)
                    ._clearAdjacentTiles(r + 1, c)
                    ._clearAdjacentTiles(r + 1, c + 1)
                    ._clearAdjacentTiles(r + 1, c - 1);
            }
        }

        return this;
    }
}
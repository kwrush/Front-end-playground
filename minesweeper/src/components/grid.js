import {base} from '../const'

const DEF_LEVEL = base.LEVELS[0];

export default class Grid {
    constructor (options) {
        options = options || {};
        const row = options.row || DEF_LEVEL.GRID_ROW;
        const col = options.col || DEF_LEVEL.GRID_COL;
        const bombs = options.bombs || DEF_LEVEL.BOMB_NUM;

        this.resize(row, col).countBombs(bombs).build();
    }

    create(row, col, bombs) {
        this.resize(row, col)
            .countBombs(bombs)
            .build()
            .randomBombs(); 

        return this;
    }

    resize(r, c) {
        this.row = r > 0 ? r : this.row;
        this.col = c > 0 ? c : this.col;
        return this;
    }

    build () {
        this.grid = [];
        for (let r = 0; r < this.row; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.col; c++) {
                this.grid[r].push(this._createTile());
            }
        }

        return this;
    }

    countBombs (bombs) {
        this.bombsCount = bombs > 0 ? bombs : this.bombsCount;
        return this;
    }

    randomBombs () {
        if (this.grid && Array.isArray(this.grid)) {
            let count = 0;

            while (count < this.bombsCount) {
                let r = Math.floor(Math.random() * this.row);
                let c = Math.floor(Math.random() * this.col);

                if (!this.hasBomb(r, c)) {
                    this._addBomb(r, c)
                        ._increaseBombsAround(r - 1, c)
                        ._increaseBombsAround(r - 1, c - 1)
                        ._increaseBombsAround(r - 1, c + 1)
                        ._increaseBombsAround(r, c - 1)
                        ._increaseBombsAround(r, c + 1)
                        ._increaseBombsAround(r + 1, c)
                        ._increaseBombsAround(r + 1, c - 1)
                        ._increaseBombsAround(r + 1, c + 1);

                    count++;
                } 
            }
        }

        return this;
    }

    exposeTileAt (r, c) {
        this.withinGrid(r, c) && (this.grid[r][c].exposed = true);
    }

    toggleMark (r, c) {
        this.withinGrid(r, c) && (this.grid[r][c].marked = !this.grid[r][c].marked);
    }

    hasBomb (r, c) {
        return this.withinGrid(r, c) && this.grid[r][c].hasBomb;
    }

    isExposed (r, c) {
        return this.withinGrid(r, c) && this.grid[r][c].exposed;
    }

    isMarked (r, c) {
        return this.withinGrid(r, c) && this.grid[r][c].marked;
    }

    getBombsAround (r, c) {
        return this.withinGrid(r, c) && this.grid[r][c].bombsAround;
    }

    withinGrid (r, c) {
        return  r >= 0 && c >= 0 && r < this.row && c < this.col;
    }

    _createTile () {
        return {
            hasBomb: false,
            marked: false,
            exposed: false,
            bombsAround: 0
        };
    }

    _addBomb (r, c) {
        this.grid[r] && this.grid[r][c] && (this.grid[r][c].hasBomb = true);
        return this;
    }

    _increaseBombsAround (r, c) {
        this.grid[r] && this.grid[r][c] && (this.grid[r][c].bombsAround++);
        return this;
    }
}
import base from '../const'

export default class Grid {
    constructor (option) {
        let opt = option || {};
        this.row = opt.row || base.LEVELS.EASY.GRID_ROW;
        this.col = opt.col || base.LEVELS.EASY.GRID_COL;
    }

    set row (r) {
        r > 0 && (this.row = r);
    }

    set col (c) {
        c > 0 && (this.col = c);
    }

    createTile() {
        return {
            hasBomb: false,
            marked: false,
            expose: false,
            bombsAround: 0
        };
    }

    build () {
        let grid = [];

        for (let r = 0; r < this.row; r++) {
            let rows = cells[r] = [];
            for (let c = 0; c < this.col; c++) {
                rows[r].push(this.createTile);
            }
        }

        return grid;
    }
}
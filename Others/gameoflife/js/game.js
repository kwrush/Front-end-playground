class GameCore {
    constructor(options) {
        this.row = options.row || 40;
        this.col = options.col || 60;
        this.cells = initCells(this.row, this.col);
    }

    getCellAt (r, c) {
        return this.cells[r * this.col + c];
    }

    randomPattern () {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let tile = this.getCellAt(r, c);
                tile.alive = randomStatus();
            }
        }
    }

    populate () {
        // Loop throughs all cells to generate next status
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let cell = this.getCellAt(r, c);
                if (cell) {
                    cell.next = this._nextStatus(cell);
                }
            }
        }

        // loop again to switch to next status
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let cell = this.getCellAt(r, c);
                if (cell) {
                    cell.alive = cell.next;
                    cell.next = false;
                }
            }
        }
    }

    _nextStatus(cell) {
        let next = false;
        // Count alive neighbors
        let aliveNeighbors = this._isCellAlive(cell.row - 1, cell.col - 1) +
                             this._isCellAlive(cell.row - 1, cell.col)     +
                             this._isCellAlive(cell.row - 1, cell.col + 1) +
                             this._isCellAlive(cell.row, cell.col - 1)     +
                             this._isCellAlive(cell.row, cell.col + 1)     +
                             this._isCellAlive(cell.row + 1, cell.col - 1) +
                             this._isCellAlive(cell.row + 1, cell.col)     +
                             this._isCellAlive(cell.row + 1, cell.col + 1);
        if (cell.alive) {
            next = aliveNeighbors === 2 || aliveNeighbors === 3;
        } else {
            next = aliveNeighbors === 3;
        }
        return next;
    }

    _isCellAlive(r, c) {
        let cell = this.getCellAt(r, c);
        if (cell) {
            return cell.alive;
        } else {
            return false;
        }
    }
}

// private functions
function initCells(row, col) {
    let cells = [];
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            cells.push({
                alive: false,
                next: false,
                row: r,
                col: c
            });
        }
    }

    return cells;
}


function randomStatus () {
    return !!Math.round(Math.random());
}

export default GameCore;

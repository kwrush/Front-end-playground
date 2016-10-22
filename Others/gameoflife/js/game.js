class GameCore {
    constructor(options) {
        this.row = options.row || 40;
        this.col = options.col || 60;
        this.cells = initCells(this.row, this.col);
    }

    // Return a cell object at the row and column
    getCellAt (r, c) {
        return this.cells[r * this.col + c];
    }

    // Give each cell a random living status
    randomPattern () {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let tile = this.getCellAt(r, c);
                tile.alive = randomStatus();
                tile.next = tile.alive;
            }
        }
    }

    // Loop throughs all cells to generate next status
    populate () {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let cell = this.getCellAt(r, c);
                if (cell) {
                    cell.next = this._nextStatus(cell);
                }
            }
        }
    }

    // switch cell's living status to next generation
    nextGen (cell) {
        if (cell && cell.hasOwnProperty('alive') && cell.hasOwnProperty('next')) {
            cell.alive = cell.next;
        }
        return cell;
    }

    // generate next living status for the given cell based on game rules
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

    // Return true if the cell at the given row and column is alive
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

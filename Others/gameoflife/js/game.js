class GameCore {
    constructor(options) {
        this.cells = [];
        this.row = options.row || 40;
        this.col = options.col || 60;
    }

    randomPattern () {
        this.cells = [];
        for (let x = 0; x < this.col; x++) {
            for (let y = 0; y < this.row; y++) {
                this.cells.push({
                    alive: randomStatus(),
                    row: y,
                    col: x
                });
            }
        }
    }

    populate () {

    }
}

// private functions
function randomStatus () {
    return Math.round(Math.random());
}

export default GameCore;

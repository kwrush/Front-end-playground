const CELL_SIZE  = 12,       // tile size, in 'px'
      ALIVE_CELL = '#333',   // color of alive cell
      DEAD_CELL  = '#fff';   // color of dead cell

class GameUI {
    constructor(options) {
        this.game = options.game;
        this.rowNum = this.game.row || 40;
        this.colNum = this.game.col || 60;

        this.initCanvas();
        this.listen();
    }

    // init canvas properties
    initCanvas() {
        this.canvas = document.getElementById('game-grid');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.colNum * CELL_SIZE;
        this.canvas.height = this.rowNum * CELL_SIZE;
    }

    // init game setup, such as initial pattern
    initSetup() {
        this.game.randomPattern();
        this._drawCells();
    }

    listen () {
        this.randBtn  = document.getElementById('rand-pattern-btn');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn  = document.getElementById('stop-btn');

        this.randBtn.addEventListener('click', evt => this._prepare(evt), false);
        this.startBtn.addEventListener('click', evt => this._play(evt), false);
    }

    // Make grid
    drawGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();

        // Draw horizontal lines
        for (let i = 0; i <= this.rowNum; i++) {
            this.ctx.moveTo(0, CELL_SIZE * i);
            this.ctx.lineTo(CELL_SIZE * this.colNum, CELL_SIZE * i );
        }

        // Vertical lines
        for (let j = 0; j <= this.colNum; j++) {
            this.ctx.moveTo(CELL_SIZE * j, 0);
            this.ctx.lineTo(CELL_SIZE * j, CELL_SIZE * this.colNum);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    _prepare (evt) {
        this.game.randomPattern();
        this._drawCells();
    }

    _play(evt) {
        this.initSetup();
    }

    // Fill color in grid cells based on the pattern
    _drawCells() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.game.cells.length; i++) {
            let tile = this.game.cells[i];
            let args = [tile.col * CELL_SIZE, tile.row * CELL_SIZE, tile.alive];
            this._fillCell.apply(this, args);
        }
    }

    // Fill color in the given cell
    _fillCell(x, y, status) {
        // let w = this.ctx.lineWidth;
        //
        // x = x + w;
        // y = y + w;
        //
        // let size = CELL_SIZE - 2 * w;
        //
        // this.ctx.fillStyle = status ? ALIVE_CELL : DEAD_CELL;
        // this.ctx.fillRect(x, y, size, size);

        this.ctx.fillStyle = status ? ALIVE_CELL : DEAD_CELL;
        this.ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    }
}

export default GameUI;

const CELL_SIZE    = 12,       // tile size, in 'px'
      ALIVE_CELL   = '#333',   // color of alive cell
      DEAD_CELL    = '#fff',   // color of dead cell
      BORDER_COLOR = '#333';

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

        this.canvas.width = this.colNum * CELL_SIZE + 1;
        this.canvas.height = this.rowNum * CELL_SIZE + 1;
    }

    // init game setup, such as initial pattern
    initSetup() {
        this.game.randomPattern();
        this._drawCells();
    }

    // listen to DOM events
    listen () {
        this.randBtn  = document.getElementById('rand-pattern-btn');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn  = document.getElementById('stop-btn');

        this.canvas.addEventListener('click', evt => this._makeCellAlive(evt), false);
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
            this.ctx.moveTo(0, CELL_SIZE * i + 0.5);
            this.ctx.lineTo(CELL_SIZE * this.colNum, CELL_SIZE * i + 0.5);
        }

        // Vertical lines
        for (let j = 0; j <= this.colNum; j++) {
            this.ctx.moveTo(CELL_SIZE * j + 0.5, 0);
            this.ctx.lineTo(CELL_SIZE * j + 0.5, CELL_SIZE * this.colNum);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    _makeCellAlive(evt) {
        evt = evt || window.event;

        evt.preventDefault();
        evt.stopPropagation();

        // Calculate the position of the tile being clicked
        let pageX = evt.pageX;
        let pageY = evt.pageY;

        let recDim = this.canvas.getBoundingClientRect();

        let offsetX = pageX - recDim.left;
        let offsetY = pageY - recDim.top;

        // Get row and column number of the tile
        let x = Math.floor(offsetX / CELL_SIZE);
        let y = Math.floor(offsetY / CELL_SIZE);

        let tile = this.game.cells[y * this.colNum + x];
        tile.alive = !tile.alive;
        this._fillCell(x, y, tile.alive);

        console.log('x:' + x + '; y:' + y + '; alive: ' + tile.alive + '; index:' + (y * this.colNum + x));
    }

    _prepare(evt) {
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
            this._fillCell(tile.col, tile.row, tile.alive);
        }
    }

    // Fill color in the given cell
    _fillCell(x, y, status) {
        let w = this.ctx.lineWidth;

        x = x * CELL_SIZE;
        y = y * CELL_SIZE;

        x = x + w;
        y = y + w;

        let size = CELL_SIZE - w;

        this.ctx.fillStyle = status ? ALIVE_CELL : DEAD_CELL;
        this.ctx.fillRect(x, y, size, size);
    }
}

export default GameUI;

const CELL_SIZE    = 12,       // tile size, in 'px'
      ALIVE_CELL   = '#333',   // color of alive cell
      DEAD_CELL    = '#fff',   // color of dead cell
      BORDER_COLOR = '#333';

class GameUI {
    constructor(options) {
        this.game = options.game;
        this.speed = options.speed || 100;

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

    // listen to DOM events
    listen () {
        this.randBtn  = document.getElementById('rand-pattern-btn');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn  = document.getElementById('stop-btn');

        this.canvas.addEventListener('click', evt => this._handleClick(evt), false);
        this.randBtn.addEventListener('click', evt => this._prepare(evt), false);
        this.startBtn.addEventListener('click', evt => this._play(evt), false);
        this.stopBtn.addEventListener('click', evt => this._stop(evt), false);
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

    // Click in cell rectangle to toggle cell's status
    _handleClick(evt) {
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
        let c = Math.floor(offsetX / CELL_SIZE);
        let r = Math.floor(offsetY / CELL_SIZE);

        let tile = this.game.getCellAt(r, c);
        tile.alive = !tile.alive;
        this._fillCell(c, r, tile.alive);
        // debug
        console.log('r:' + r + '; c:' + c + '; alive: ' + tile.alive + '; index:' + (r * this.colNum + c));
    }

    _prepare(evt) {
        this.game.randomPattern();
        this._drawCells();
    }

    _play(evt) {
        this.playTimer = setInterval(() => {
            this.game.populate();
            this._drawCells();
        }, this.speed);
    }

    _stop(evt) {
        clearInterval(this.playTimer);
    }

    // Fill color in grid cells based on the pattern
    _drawCells() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;

        for (let r = 0; r < this.rowNum; r++) {
            for (let c = 0; c < this.colNum; c++) {
                let tile = this.game.getCellAt(r, c);

                // row: top to bottom, col: left to right
                // so x is col and y is row in canvas
                this._fillCell(tile.col, tile.row, tile.alive);
            }
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

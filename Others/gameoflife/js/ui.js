class GameUI {
    constructor(options) {
        this.game = options.game;
        this.gridHeight = options.width || 480;
        this.gridWidth = options.height || 640;

        this.canvas = document.getElementById('game-grid');
    }

    drawGrid () {
        this.canvas.style.width = this.gridWidth + 'px';
        this.canvas.style.height = this.gridHeight + 'px';
        this.ctx = this.canvas.getContext('2d');
    }
}

export default GameUI;

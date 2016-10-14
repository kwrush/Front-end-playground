/**
 * GameMan - operating ui
 */
class GameMan {
    constructor (options) {
        this.core = options.core;
        this.pattern = options.pattern;
        this.gridWidth = 640;
        this.gridHeight = 480;
        
        this.init();
    } 

    init () {
        this.initGrid();
    }
    
    initGrid () {
        let canvas = document.getElementById('lifegame');
        canvas.width = this.gridWidth;
        canvas.height = this.gridHeight;
    }
}

export default GameMan;
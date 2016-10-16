import GameUI from './ui.js';
import GameCore from './game.js';

let core = new GameCore();
let ui = new GameUI(
    {
        game: core,
        width: 480,
        height: 640
    }
);

ui.drawGrid();

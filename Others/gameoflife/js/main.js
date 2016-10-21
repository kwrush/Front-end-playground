import GameUI from './ui.js';
import GameCore from './game.js';

let core = new GameCore({
    row: 50,
    col: 60
});
let ui = new GameUI(
    {
        game: core,
        speed: 200
    }
);

ui.drawGrid();

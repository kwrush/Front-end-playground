import GameUI from './ui.js';
import GameCore from './game.js';

let core = new GameCore({
    row: 50,
    col: 70
});
let ui = new GameUI(
    {
        game: core
    }
);

ui.drawGrid();

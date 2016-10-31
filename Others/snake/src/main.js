import GameController from './game.js';
import GameView from './view.js';
import Snake from './snake.js';

let snake = new Snake();
let view = new GameView();

let gameCtrl = new GameController({
    snake: snake,
    view: view,
    speed: 150
});

gameCtrl.init();
gameCtrl.start();

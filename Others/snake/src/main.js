import GameController from './game.js';
import GameView from './view.js';
import Snake from './snake.js';

let snake = new Snake({
    size: 10
});

let view = new GameView();

let gameCtrl = new GameController({
    snake: snake,
    view: view
});

gameCtrl.init();
gameCtrl.start();

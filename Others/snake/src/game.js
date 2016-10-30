import Food from './food.js';

const DEF_SPEED = 200;   // snake speed(redrawing interval), units in ms

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

let _gameLoop = null;
let _moving = false;

export default class {
    constructor(options) {
        this.snake = options.snake;
        this.view = options.view;
        this.speed = options.speed || DEF_SPEED;
        this.food = new Food(this.snake.size);
    }

    init() {
        this.view.listenKeyDown((keyCode) => {
            this.handleKeyDown(keyCode);
        });
        // Give snake an initial position
        this.snake.init(Math.floor(this.view.width / 2), Math.floor(this.view.height / 2));
        this.food.makeFood(this.snake, this.view.width, this.view.height);
    }

    start() {
        this.stop();
        _gameLoop = setInterval(() => {
            this.run();
        }, this.speed);
    }

    stop() {
        clearInterval(_gameLoop);
        _gameLoop = null;
    }

    run() {
        this.snake.move();
        if (this.collisionCheck()) {
            this.stop();
            return;
        }
        console.log(this.canEat());
        if (this.canEat()) {
            this.snake.grow();
            this.food.makeFood(this.snake, this.view.width, this.view.height);
        }
        this.view.render(this.snake, this.food);
        _moving = false;
    }

    // Return true if snake head's position is the same as the food's position
    canEat() {
        let head = this.snake.getHead();
        if (head.x === this.food.x && head.y === this.food.y) {
            return true;
        }
        return false;
    }

    // check collision
    collisionCheck() {
        let head = this.snake.getHead();
        for (let i = 0, len = this.snake.getLength() - 1; i < len; i++) {
            let node = this.snake.nodeAt(i);
            if (node.x === head.x && node.y === head.y) {
                return true;
            }
        }
        return head.x < 0 || head.x >= this.view.width || head.y < 0 || head.y >= this.view.height;
    }

    // Handle keydow action, pressing arrow keys to move snake
    handleKeyDown(keyCode) {
        if (_gameLoop === null) return;
        let dir = 0;
        if (keyCode === KEY_UP) {
            dir = 1;
        } else if (keyCode === KEY_RIGHT) {
            dir = 2;
        } else if (keyCode === KEY_DOWN) {
            dir = 3;
        }
        if (!_moving) this.moveTo(dir);
    }

    // 0: left, 1: up, 2: right, 3: down
    moveTo(dir) {
        let goTo = {
            x: this.snake.snakeX,
            y: this.snake.snakeY
        };

        if (!!goTo.x) {
            if (dir === 1 || dir === 3) {
                goTo.x = 0;
                goTo.y = dir - 2;
            }
        } else if (!!goTo.y) {
            if (dir === 0 || dir === 2) {
                goTo.x = dir - 1;
                goTo.y = 0;
            }
        }

        this.snake.nextStep(goTo);
        _moving = true;
    }
}

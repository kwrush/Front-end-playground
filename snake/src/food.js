const FOOD_COLOR = '#C46243';

export default class {
    constructor(size) {
        this.size = size || 10;
        this.color = FOOD_COLOR;
    }

    makeFood(snake, width, height) {
        while(true) {
            this.x = Math.floor(Math.random() * width / this.size) * this.size;
            this.y = Math.floor(Math.random() * height / this.size) * this.size;
            if (_canPutFoodAt(snake, this.x, this.y)) return;
        }
    }
}

function _canPutFoodAt(snake, x, y) {
    for (let i = 0, len = snake.getLength(); i < len; i++) {
        let node = snake.nodeAt(i);
        if (node.x === x && node.y === y) {
            return false;
        }
    }

    return true;
}

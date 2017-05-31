export default class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
    }

    dequeue() {
        return this.queue.shift();
    }

    front() {
        return this.queue[0];
    }

    back() {
        return this.queue[this.queue.length - 1];
    }

    length() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }

    print() {
        console.log(this.queue.join(', '));

    }
}

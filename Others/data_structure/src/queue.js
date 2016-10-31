let _queue = [];

export default class Queue {
    constructor() {}

    enqueue(element) {
        _queue.push(element);
    }

    dequeue() {
        return _queue.shift();
    }

    peek() {
        return _queue[0];
    }

    length() {
        return _queue.length;
    }

    clear() {
        _queue = [];
    }

    print() {
        console.log(_queue.join(', '));
    }
}

import Queue from '../src/queue.js';

describe('Queue', () => {
    let queue;
    beforeEach(() => {
        queue = new Queue();
    });

    it('should dequeue the first element.', () => {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.dequeue()).toBe('a');
        expect(queue.dequeue()).toBe('b');
        expect(queue.dequeue()).toBe('c');
    });

    it('should return the first element.', () => {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.front()).toBe('a');

        queue.dequeue();
        expect(queue.front()).toBe('b');
    });

    it('should return the last element.', () => {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.back()).toBe('c');

        queue.dequeue();
        expect(queue.back()).toBe('c');
    });

    it('should return the queue\'s length.', () => {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.length()).toBe(3);

        queue.dequeue();
        expect(queue.length()).toBe(2);
    });

    it('should clear the queue', () => {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.clear();
        expect(queue.length()).toBe(0);
    });

    it('should print the queue in order', () => {
        spyOn(console, 'log');
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        queue.print();
        expect(console.log).toHaveBeenCalledWith('a, b, c');
    });
});

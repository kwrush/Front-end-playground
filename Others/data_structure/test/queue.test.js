import Queue from '../src/queue.js';

describe('Queue', () => {
    it('should dequeue the first element.', () => {
        let queue = new Queue();
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.dequeue()).toBe('a');
        expect(queue.dequeue()).toBe('b');
        expect(queue.dequeue()).toBe('c');
    });

    it('should return the first element.', () => {
        let queue = new Queue();
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.peek()).toBe('a');

        queue.dequeue();
        expect(queue.peek()).toBe('a');
    });

    it('should return the queue\'s length.', () => {
        let queue = new Queue();
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.length()).toBe(3);

        queue.dequeue();
        expect(queue.length()).toBe(2);
    });

    it('should clear the queue', () => {
        let queue = new Queue();
        queue.enqueue('a');
        queue.enqueue('b');
        queue.clear();
        expect(queue.length()).toBe(0);
    });

    it('should print the queue in order', () => {
        let queue = new Queue();
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        expect(queue.print()).toBe(['a, b, c']);
    });
});

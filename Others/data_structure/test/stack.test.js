import Stack from '../src/stack.js';

describe('Stack', () => {
    it('should pop the last element.', () => {
        let stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.pop()).toBe('c');
        expect(stack.pop()).toBe('b');
        expect(stack.pop()).toBe('a');
    });

    it('should return the last element.', () => {
        let stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.peek()).toBe('c');
        stack.pop();
        expect(stack.peek()).toBe('b');
    });

    it('should return the length of the stack.', () => {
        let stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.length()).toBe(3);

        stack.pop();
        expect(stack.length()).toBe(2);
    });

    it('should clear the stack.', () => {
        let stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        stack.clear();
        expect(stack.length()).toBe(0);
        expect(stack.pop()).toBe(undefined);
    });

    it('should print the stack in order', () => {
        let stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.print()).toBe(['c, b, a']);
    });
});

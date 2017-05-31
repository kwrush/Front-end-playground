import Stack from '../src/stack.js';

describe('Stack', () => {
    let stack;
    beforeEach(() => {
        stack = new Stack();
    });

    it('should pop the last element.', () => {
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.pop()).toBe('c');
        expect(stack.pop()).toBe('b');
        expect(stack.pop()).toBe('a');
    });

    it('should peek the last element.', () => {
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.peek()).toBe('c');
        stack.pop();
        expect(stack.peek()).toBe('b');
    });

    it('should return the length of the stack.', () => {
        stack.push('a');
        stack.push('b');
        stack.push('c');
        expect(stack.length()).toBe(3);

        stack.pop();
        expect(stack.length()).toBe(2);
    });

    it('should clear the stack.', () => {
        stack.push('a');
        stack.push('b');
        stack.push('c');
        stack.clear();
        expect(stack.length()).toBe(0);
        expect(stack.pop()).toBe(undefined);
    });

    it('should print the stack in order', () => {
        spyOn(console, 'log');
        stack.push('a');
        stack.push('b');
        stack.push('c');
        stack.print();
        expect(console.log).toHaveBeenCalledWith('c, b, a');
    });
});

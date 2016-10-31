let _stack = [];

export default class Stack {
	constructor() {}

	push(element) {
		_stack.push(element);
	}

	pop() {
		return _stack.pop();
	}

	peek() {
		return _stack[_stack.length - 1];
	}

	length() {
		return _stack.length;
	}

	clear() {
		_stack = [];
	}

	print() {
		console.log(_stack.reverse().join(', '));
	}
}

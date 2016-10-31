let _stack = [];
let _top = 0;

export default class Stack {
	constructor() {

	}

	push(element) {
		_stack[_top++] = element;
	}

	pop() {
		_top--;
		return stack.pop();
	}

	peek() {
		return _stack[--_top];
	}

	length() {
		return _top
	}

	clear() {
		_stack = [];
		_top = 0;
	}
}
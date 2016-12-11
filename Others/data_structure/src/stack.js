
export default class Stack {
	constructor() {
		this.stack = [];
	}

	push(element) {
		this.stack.push(element);
	}

	pop() {
		return this.stack.pop();
	}

	peek() {
		return this.stack[this.stack.length - 1];
	}

	length() {
		return this.stack.length;
	}

	clear() {
		this.stack = [];
	}

	print() {
		console.log(this.stack.reverse().join(', '));
	}
}

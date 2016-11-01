class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class DoublyNode {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.previous = null;
	}
}

class SinglyList {
	constructor () {
		this.head = null;
		this._length = 0;
	}

	// index is zero-based
	findNodeAt(index) {
		let currNode = this.head;
		let count = 0;

		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of the list.');
		}

		while(count < index) {
			currNode = currNode.next;
			count++;
		}

		return currNode;
	}

	insertAfter(value, index) {
		let node = this.findNodeAt(index);

		let newNode = new Node(value);
		newNode.next = node.next;
		node.next = newNode;
		this._length++;

		return newNode;
	}

	add(value) {
		let node = new Node(value);
		let currNode = this.head;

		if (!currNode) {
			this.head = node;
			this._lenght++;
			return node;
		}

		while(currNode.next) {
			currNode = currNode.next;
		}

		currNode.next = node;
		this._length++;

		return node;
	}

	remove(index) {
		let currNode = this.head;
		let count = 0;
		let prevNode = null;
		let rmNode = null;

		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		if (index === 0) {
			this.head = currNode.next;
			rmNode = currNode;
			return rmNode;
		}

		while (count < index) {
			prevNode = currNode;
			currNode = currNode.next;
			count++;
		}

		prevNode.next = currNode.next;
		rmNode = currNode;
		currNode = null;
		this._length--;

		return rmNode;
 	}
}

class DoublyList {
	constructor() {
		this.head = null;
		this.tail = null;
		this._length = 0;
	}

	add(value) {
		let node = new DoublyNode(value);
		if (this._length === 0) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		}

		this._length++;

		return node;
	}

	insertAfter(value, index) {
		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		let newNode = new DoublyNode(value);
		let node = this.findNodeAt(index);

		newNode.next = node.next;
		node.next = newNode;
		newNode.previous = node;

		this._length++;

		return newNode;
	}

	remove(index) {
		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		let currNode;

		if (index === 0) {
			currNode = this.head;
			this.head = this.head.next;
			// no second node
			if (!this.head) {
				this.tail = null;
			} else {
				this.head.previous = null;
			}
		} else if (index === this._length - 1) {
			currNode = this.tail;
			this.tail = this.tail.previous;
			this.tail.next = null;
		} else {
			currNode = this.findNodeAt(index);
			currNode.previous.next = currNode.next;
			currNode.next.previous = currNode.previous;
		}

		this._length--;

		return currNode;
	}

	findNodeAt(index) {
		let currNode;
		let count;

		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		// if index is bigger than the half length of the list, start searching from tail
		return index > (this._length - 1) / 2 ? findNodeFromTail(index) : findNodeFromHead(index);
	}

	findNodeAtFromHead(index) {
		let currNode = this.head;
		let count = 0;

		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		while (count < index) {
			currNode = currNode.next;
			count++;
		}

		return currNode;
	}

	findNodeAtFromTail(index) {
		let currNode = this.tail;
		let count = this._length - 1;

		if (this._length === 0 || index < 0 || index >= this._length) {
			throw new Error('Non-existent node at the index of this list.');
		}

		while (count > index) {
			currNode = currNode.previous;
			count--;
		}

		return currNode;
 	}
}

export {SinglyList, DoublyList};

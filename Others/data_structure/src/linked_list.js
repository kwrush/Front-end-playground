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

export default class LinkedList {
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

	insertAt(value, index) {
		let node = this.findNodeAt(index);

		let newNode = new Node(value);
		newNode.next = node.next;
		node.next = newNode;
		this._length++;
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
			throw new Error('Non-existent node at the index of the list.');
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

export default class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this._length = 0;
	}

	
}
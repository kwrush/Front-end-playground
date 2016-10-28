const DEF_SIZE = 10;
const BODY_COLOR = '#333';
const HEAD_COLOR = '#0089A7';

let _length = 0;

function Node(data) {
    this.data = data;
    this.next = null;
}

export default class {
    constructor(options) {
        options = options || {};
        this.size = options.size || DEF_SIZE;               // size of each body node
        this.bodyColor = options.bodyColor || BODY_COLOR;   // body color
        this.headColor = options.headColor || HEAD_COLOR;   // head color
        this.grow();
    }

    // Spontaneously moving
    move() {

    }

    // Eat to grow
    eat() {
        this.grow();
    }

    // Add a new node to the head of the body.
    grow() {
        let node = new Node(this.makeBodyNode());
        let currentNode = this.head;
        // if
        if (!currentNode) {
            node.color = this.headColor;
            this.head = node;
            _length++;

            return node;
        }

        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        node.color = this.bodyColor;
        currentNode.next = node;
        _length++;

        return node;
    }

    iterate(callback) {
        let node = this.head;
        while (node) {
            callback(node);
            node = node.next;
        }
    }

    bodyNodeAt(index) {
        let currNode = this.head;
        let count = 0;
        if (_length <= 0 || index < 0 || index >= _length) {
            throw new Error('Non existent body node at the given index.');
        }
        while (count <= index) {
            currNode = currNode.next;
            count++;
        }

        return currNode;
    }

    makeBodyNode() {
        return {
            nextDir: null,
            currDir: null,
            color: null
        };
    }

    getLength() {
        return _length;
    }
}

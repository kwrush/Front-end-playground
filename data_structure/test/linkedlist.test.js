import { SinglyList, DoublyList } from '../src/linked_list.js';

describe('SinglyList', () => {
    let list;
    beforeEach(() => {
        list = new SinglyList();
    });

    it('head should be a and it\'s next should be b.', () => {
        list.add('a');
        list.add('b');
        expect(list.head.value).toBe('a');
        expect(list.head.next.value).toBe('b');
    });

    it('head find node c.', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        list.add('d');
        expect(list.findNodeAt(2).value).toBe('c');
    });

    it('should insert c after b', () => {
        list.add('a');
        list.add('b');
        list.add('d');
        list.insertAfter('c', 1);
        expect(list.findNodeAt(1).next.value).toBe('c');
    });

    it('should remove b', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        list.remove(1);
        expect(list.findNodeAt(0).next.value).toBe('c');
    });
});

describe('DoublyList', () => {
    let list;
    beforeEach(() => {
        list = new DoublyList();
    });

    it('both head and tail should be a', () => {
        list.add('a');
        expect(list.head.value).toBe('a');
        expect(list.tail.value).toBe('a');
    });

    it('head should be a and tail should be c.', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        expect(list.head.value).toBe('a');
        expect(list.tail.value).toBe('c');
    });

    it('length should be 3.', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        expect(list._length).toBe(3);
    });

    it('should find node c, previous node of node c is b, next node is d.', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        list.add('d');
        let node = list.findNodeAt(2);
        expect(node.value).toBe('c');
        expect(node.next.value).toBe('d');
        expect(node.previous.value).toBe('b');
    });

    it('should insert c after b, previous node of c is b.', () => {
        list.add('a');
        list.add('b');
        list.add('d');
        list.insertAfter('c', 1);

        let node = list.findNodeAt(1);
        expect(node.next.value).toBe('c');

        let another = list.findNodeAt(2);
        console.log(another.value);
        expect(another.value).toBe('c');
        expect(another.previous.value).toBe('b');
        expect(another.next.value).toBe('d');
    });

    it('should remove b', () => {
        list.add('a');
        list.add('b');
        list.add('c');
        list.remove(1);
        expect(list.findNodeAt(0).next.value).toBe('c');
    });
});

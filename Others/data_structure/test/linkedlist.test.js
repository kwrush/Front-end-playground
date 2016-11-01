import { SinglyList, DoublyNode } from '../src/linked_list.js';

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

    

});

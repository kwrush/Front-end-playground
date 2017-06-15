import {assert, expect} from 'chai';
import {
    qs, 
    hasClass,
    removeClass,
    addClass,
    listenTo,
    fire
} from '../src/util';


describe("Event", () => {
    let obj = { firstName: 'first', lastName: 'last' };

    it('add a event to change first name', () => {
        listenTo(obj, 'changeName', name => {
            obj.firstName = name;
        }, obj);
        assert.typeOf(obj._events, 'object');
        expect(obj._events).to.have.property('changeName');
        assert.lengthOf(obj._events['changeName'], 1);
    });

    it('fire event to change first name', () => {
        fire(obj, 'changeName', 'newfirst');
        expect(obj.firstName).to.equal('newfirst');
        expect(obj.lastName).to.equal('last');
    });

    it('add another event to change last name', () => {
       listenTo(obj, 'changeName', name => {
            obj.lastName = name;
        }, obj);
        obj.firstName = 'first';
        assert.lengthOf(obj._events['changeName'], 2);
    });

     it('fire event to make first and last the same', () => {
        fire(obj, 'changeName', 'samefirstlast');
        expect(obj.firstName).to.equal(obj.lastName);
    });
});


describe("DOM", () => {
    let div = document.createElement('DIV');
    div.innerHTML = '<p class="p">Text</p><p class="p2">Text</p>';

    it('add class', () => {
        addClass(div, 'newClass');
        expect(hasClass(div, 'newClass')).to.be.true;
    });

    it('remove class', () => {
        removeClass(div, 'newClass');
        expect(hasClass(div, 'newClass')).to.be.false;
    });

    it('select p with class p', () => {
        let p = qs('.p', div);
        expect(p.innerHTML).to.equal('Text');
    });
});
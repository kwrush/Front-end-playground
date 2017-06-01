var chai = require('chai');
var base = require('../src/base.js');

describe("Event", function () {
    var MineSweeper = window.MineSweeper;
    var obj = { firstName: 'first', lastName: 'last' };
    var assert = chai.assert;
    var expect = chai.expect;

    it('add a event', function () {
        MineSweeper.Events.listenTo(obj, 'changeName', function (name) {
            obj.firstName = name;
        }, obj);
        assert.typeOf(obj._events, 'object');
        expect(obj._events).to.have.property('changeName');
        assert.lengthOf(obj._events['changeName'], 1);
    });

    it('fire event to change fist name', function () {
        MineSweeper.Events.trigger(obj, 'changeName', 'newfirst');
        expect(obj.firstName).to.equal('newfirst');
        expect(obj.lastName).to.equal('last');
    });

    it('add another event', function () {
        MineSweeper.Events.listenTo(obj, 'changeName', function (name) {
            obj.lastName = name;
        }, obj);
        obj.firstName = 'first';
        assert.lengthOf(obj._events['changeName'], 2);
    });

     it('fire two events to change both names', function () {
        MineSweeper.Events.trigger(obj, 'changeName', 'samefirstlast');
        // two callbacks fired successively, so first and last name are the same
        expect(obj.firstName).to.equal('samefirstlast');
        expect(obj.lastName).to.equal('samefirstlast');
    });
});
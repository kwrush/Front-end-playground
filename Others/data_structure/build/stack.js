"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _stack = [];
var _top = 0;

var Stack = function () {
	function Stack() {
		_classCallCheck(this, Stack);
	}

	_createClass(Stack, [{
		key: "push",
		value: function push(element) {
			_stack[_top++] = element;
		}
	}, {
		key: "pop",
		value: function pop() {
			_top--;
			return stack.pop();
		}
	}, {
		key: "peek",
		value: function peek() {
			return _stack[--_top];
		}
	}, {
		key: "length",
		value: function length() {
			return _top;
		}
	}, {
		key: "clear",
		value: function clear() {
			_stack = [];
			_top = 0;
		}
	}]);

	return Stack;
}();

exports.default = Stack;
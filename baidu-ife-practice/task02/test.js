// test for task 02

// test 1
/* var str = 'abc';
var arr = [1, 2, 3];
var f = function() { return 'I\'m a function' };
			
isArray(str);
isArray(arr);
isFunction(f);
isFunction(arr); */

// test 2
var srcObj = {
	a: 1,
	b: {
		b1: ['hello', 'hi'],
		b2: 'JavaScript'
	},
	
	c: function() {}
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = 'Hello';
srcObj.c = 'A function';

console.log(abObj.a);
console.log(abObj.b.b1[0]);
console.log(abObj.c);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
console.log(tarObj.c);


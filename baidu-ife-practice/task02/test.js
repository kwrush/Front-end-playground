// test for task 02

// test 1 : type detection
/* var str = 'abc';
var arr = [1, 2, 3];
var f = function() { return 'I\'m a function' };
			
isArray(str);
isArray(arr);
isFunction(f);
isFunction(arr); */

// test 2: deep copy
/* var srcObj = {
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
console.log(tarObj.c);  */

// test 3: remove repeated elements in an array
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

var c = ['1', 1, '2', '2', 3, 4, 4, 5, '6'];
var d = uniqArray(c);
console.log(d);


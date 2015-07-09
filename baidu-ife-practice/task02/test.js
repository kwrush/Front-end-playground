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
/*var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

var c = ['1', 1, '2', '2', 3, 4, 4, 5, '6'];
var d = uniqArray(c);
console.log(d);*/

// test 4, remove empty space at the start and end of a string
/*console.log(simpleTrim(' \t trimed   '));

var str = '   hi!  ';
str = trim(str);
console.log(str);*/ // 'hi!'

// test5-1
/* var arr = ['java', 'c', 'php', 'html'];
function output1(item) {
    console.log(item)
}

each(arr, output1);  // java, c, php, html

// test 5-2
var arr = ['java', 'c', 'php', 'html'];
function output2(item, index) {
    console.log(index + ': ' + item)
}

each(arr, output2); */  // 0:java, 1:c, 2:php, 3:html

// test6
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj));
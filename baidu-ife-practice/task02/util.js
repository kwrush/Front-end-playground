// check whether arr is an array
function isArray(arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		alert('Input argument is an Array!');
	}
	else {
		alert('Input argument is NOT an Array!');
	}
}

// check whether fn is an function
function isFunction(fn) {
	if (fn && Object.prototype.toString.call(fn) === '[object Function]') {
		alert('Input argument is a function!');
	}
	else {
		alert('Input argument is NOT an Function!');
	}
}

// deep copy
function cloneObject(src) {
	var to = null;
	
	if (src.constructor !== Object && src.constructor !== Array) return src;
	if (src.constructor === Date || src.constructor === String || 
		src.constructor === Number || src.constructor === Boolean || 
		src.constructor === RegExp || src.constructor === Function) {
		
		return new src.constructor(src);
	}
	
	to = to || new src.constructor();
	
	for (var name in src) {
		to[name] = typeof to[name] === 'undefined' ? cloneObject(src[name]) : to[name];
	}
	
	return to;
}

// remove repeated elements in an array
function uniqArray(arr) {
	var map = {};
	var out = [];
	
	for (var i = 0, len = arr.length; i < len; i++) {
		if (!map[arr[i]]) {
			out.push(arr[i]);
			
			// distinguish number and string, such as 1 and '1', they are not duplicate literaly
			if (typeof map[arr[i]] === typeof arr[i]) {
				map[arr[i]] = true;
			}
			else {
				map[arr[i]] = false;
			}
		}
	}
	
	return out;
}

// remove empty space at the start and the end of a string
function simpleTrim(str) {
	
}

// use regular expression
function trim(str) {

}

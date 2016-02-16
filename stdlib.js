JSON = JSON || {};	//DEFPRINT(AST_SimpleStatement 15
if (!JSON.stringify) {
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			if (t == "function")
				return; // return undefined
			else
				return String(obj);
		} else {
			// recurse array or object
			var n, v, json = []
			var arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t != "function" && t != "undefined") {
					if (t == "string")
						v = '"' + v + '"';
					else if ((t == "object" || t == "function") && v !== null)
						v = JSON.stringify(v);
					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	;	//DEFPRINT(AST_SimpleStatement 19
}
str = JSON.stringify;	//DEFPRINT(AST_SimpleStatement 22
var ValueError = Callable(function ValueError_(message) {
	var self = this;	// complex body AST_Defun
	if (arguments[0] == "__inheritance__") return;
	self.name = "ValueError";	//DEFPRINT(AST_SimpleStatement 30
	self.message = message;	//DEFPRINT(AST_SimpleStatement 31
});	//class_fun_def A 28
ValueError.prototype = new Error("__inheritance__", ValueError);	//class_fun_def C 28
ValueError = __defineClassProperties__(ValueError);
String.prototype.find = Array.prototype.indexOf;	//DEFPRINT(AST_SimpleStatement 36
String.prototype.strip = String.prototype.trim;	//DEFPRINT(AST_SimpleStatement 37
String.prototype.lstrip = String.prototype.trimLeft;	//DEFPRINT(AST_SimpleStatement 38
String.prototype.rstrip = String.prototype.trimRight;	//DEFPRINT(AST_SimpleStatement 39
String.prototype.join = function (iterable) {
	return iterable.join(this);	//AST_Exit.DEFMETHOD( 42
};	//DEFPRINT(AST_SimpleStatement 40
String.prototype.zfill = function (size) {
	var s, s;	//complex body AST_Scope declare var as local
	s = this;	//DEFPRINT(AST_SimpleStatement 45
	while (s.length < size) {
		s = "0" + s;	//DEFPRINT(AST_SimpleStatement 47
	}
	return s;	//AST_Exit.DEFMETHOD( 48
};	//DEFPRINT(AST_SimpleStatement 43
function list(iterable) {
	if (typeof iterable === "undefined") iterable = [];
	var result, i;	//complex body AST_Scope declare var as local
	result = [];	//DEFPRINT(AST_SimpleStatement 54
	var _$iter0 = iterable;
	for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
		i = _$iter0[_$id0];
		result.append(i);	//DEFPRINT(AST_SimpleStatement 56
	}
	return result;	//AST_Exit.DEFMETHOD( 57
}
Array.prototype.append = Array.prototype.push;	//DEFPRINT(AST_SimpleStatement 58
Array.prototype.find = Array.prototype.indexOf;	//DEFPRINT(AST_SimpleStatement 59
Array.prototype.index = function (index) {
	var val;	//complex body AST_Scope declare var as local
	val = this.find(index);	//DEFPRINT(AST_SimpleStatement 62
	if (val == -1) {
		throw new ValueError(str(index) + " is not in list");	//AST_Exit.DEFMETHOD( 64
	}
	return val;	//AST_Exit.DEFMETHOD( 65
};	//DEFPRINT(AST_SimpleStatement 60
Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);	//DEFPRINT(AST_SimpleStatement 68
};	//DEFPRINT(AST_SimpleStatement 66
Array.prototype.pop = function (index) {
	if (typeof index === "undefined") index = this.length - 1;
	return this.splice(index, 1)[0];	//AST_Exit.DEFMETHOD( 71
};	//DEFPRINT(AST_SimpleStatement 69
Array.prototype.extend = function (array2) {
	this.push.apply(this, array2);	//DEFPRINT(AST_SimpleStatement 74
};	//DEFPRINT(AST_SimpleStatement 72
Array.prototype.remove = function (item) {
	var index;	//complex body AST_Scope declare var as local
	index = this.find(item);	//DEFPRINT(AST_SimpleStatement 77
	this.splice(index, 1);	//DEFPRINT(AST_SimpleStatement 78
};	//DEFPRINT(AST_SimpleStatement 75
Array.prototype.copy = function () {
	return this.slice(0);	//AST_Exit.DEFMETHOD( 81
};	//DEFPRINT(AST_SimpleStatement 79
if (!Array.prototype.map) {
	Array.prototype.map = function (callback, thisArg) {
		var T, A, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		A = new Array(len);
		for (var k = 0; k < len; k++) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue);
				A[k] = mappedValue;
			}
		}
		return A;
	};
	;	//DEFPRINT(AST_SimpleStatement 84
}
function map(oper, arr) {
	return arr.map(oper);	//AST_Exit.DEFMETHOD( 86
}
if (!Array.prototype.filter) {
	Array.prototype.filter = function (filterfun, thisArg) {
		"use strict";
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}.toString.call(filterfun) != "[object Function]") {
			throw new TypeError(filterfun + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		var A = [];
		var thisp = arguments[1];
		for (var k = 0; k < len; k++) {
			if (k in O) {
				var val = O[k]; // in case fun mutates this
				if (filterfun.call(T, val))
					A.push(val);
			}
		}
		return A;
	};
	;	//DEFPRINT(AST_SimpleStatement 89
}
function filter(oper, arr) {
	return arr.filter(oper);	//AST_Exit.DEFMETHOD( 91
}
function dict(iterable) {
	var result, key;	//complex body AST_Scope declare var as local
	result = {};	//DEFPRINT(AST_SimpleStatement 99
	var _$iter1 = iterable;
	for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
		key = _$iter1[_$id1];
		result[key] = iterable[key];	//DEFPRINT(AST_SimpleStatement 101
	}
	return result;	//AST_Exit.DEFMETHOD( 102
}
if (typeof Object.getOwnPropertyNames !== "function") {
	dict.keys = function (hash) {
		var keys;	//complex body AST_Scope declare var as local
		keys = [];	//DEFPRINT(AST_SimpleStatement 108
		for (var x in hash) {
			if (hash.hasOwnProperty(x)) {
				keys.push(x);
			}
		}
		;	//DEFPRINT(AST_SimpleStatement 111
		return keys;	//AST_Exit.DEFMETHOD( 112
	};	//DEFPRINT(AST_SimpleStatement 106
} else {
	dict.keys = function (hash) {
		return Object.getOwnPropertyNames(hash);	//AST_Exit.DEFMETHOD( 117
	};	//DEFPRINT(AST_SimpleStatement 115
}
dict.values = function (hash) {
	var vals, key;	//complex body AST_Scope declare var as local
	vals = [];	//DEFPRINT(AST_SimpleStatement 121
	var _$iter2 = dict.keys(hash);
	for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
		key = _$iter2[_$id2];
		vals.append(hash[key]);	//DEFPRINT(AST_SimpleStatement 123
	}
	return vals;	//AST_Exit.DEFMETHOD( 124
};	//DEFPRINT(AST_SimpleStatement 119
dict.items = function (hash) {
	var items, key;	//complex body AST_Scope declare var as local
	items = [];	//DEFPRINT(AST_SimpleStatement 128
	var _$iter3 = dict.keys(hash);
	for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
		key = _$iter3[_$id3];
		items.append([key, hash[key]]);	//DEFPRINT(AST_SimpleStatement 130
	}
	return items;	//AST_Exit.DEFMETHOD( 131
};	//DEFPRINT(AST_SimpleStatement 126
dict.copy = dict;	//DEFPRINT(AST_SimpleStatement 133
dict.clear = function (hash) {
	var key;	//complex body AST_Scope declare var as local
	var _$iter4 = dict.keys(hash);
	for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
		key = _$iter4[_$id4];
		delete hash[key];	//DEFPRINT(AST_SimpleStatement 138
	}
};	//DEFPRINT(AST_SimpleStatement 135
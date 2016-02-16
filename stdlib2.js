JSON = JSON || {};	//DEFPRINT(AST_SimpleStatement 15

if (!JSON.stringify) {
    
	JSON.stringify = function(obj) {
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

var ValueError = Callable(function ValueError_(message){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.name = "ValueError";	//DEFPRINT(AST_SimpleStatement 27
    self.message = message;	//DEFPRINT(AST_SimpleStatement 28
});	//class_fun_def A 25
ValueError.prototype = new Error("__inheritance__", ValueError);	//class_fun_def C 25
ValueError = __defineClassProperties__(ValueError);

var str = Callable(function str_(elem){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof elem === "undefined") elem = "";
    elem = new String(elem);	//DEFPRINT(AST_SimpleStatement 36
    String.constructor(self, elem);	//DEFPRINT(AST_SimpleStatement 37
    self._str = elem;	//DEFPRINT(AST_SimpleStatement 38
});	//class_fun_def A 33
str.prototype = new String("__inheritance__", str);	//class_fun_def C 33
str.prototype.find = function find(elem){
    var self = this;	// complex body AST_Defun
    return self._str.indexOf(elem);	//AST_Exit.DEFMETHOD( 41
};	//class_fun_def A 33
str.prototype.strip = function strip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trim());	//AST_Exit.DEFMETHOD( 44
};	//class_fun_def A 33
str.prototype.lstrip = function lstrip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trimLeft());	//AST_Exit.DEFMETHOD( 47
};	//class_fun_def A 33
str.prototype.rstrip = function rstrip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trimRight());	//AST_Exit.DEFMETHOD( 50
};	//class_fun_def A 33
str.prototype.join = function join(iterable){
    var self = this;	// complex body AST_Defun
    return new str(iterable.join(self._str));	//AST_Exit.DEFMETHOD( 53
};	//class_fun_def A 33
str.prototype.zfill = function zfill(size){
    var self = this;	// complex body AST_Defun
    var s, s;	//complex body AST_Scope declare var as local
    s = self._str;	//DEFPRINT(AST_SimpleStatement 56
    while (s.length < size) {
        s = "0" + s;	//DEFPRINT(AST_SimpleStatement 58
    }
    return new str(s);	//AST_Exit.DEFMETHOD( 59
};	//class_fun_def A 33
str.prototype.replace = function replace(orig, sub, n){
    var self = this;	// complex body AST_Defun
    var s, s, s;	//complex body AST_Scope declare var as local
    s = self._str;	//DEFPRINT(AST_SimpleStatement 62
    if (n) {
        for (n = 0; n < len(n); n++) {
            s = String.replace(s, orig, sub);	//DEFPRINT(AST_SimpleStatement 65
        }
    } else {
        s = String.replace(s, new RegExp(orig, "g"), sub);	//DEFPRINT(AST_SimpleStatement 67
    }
    return new str(s);	//AST_Exit.DEFMETHOD( 68
};	//class_fun_def A 33
str.prototype.toString = function toString(){
    var self = this;	// complex body AST_Defun
    return self._str;	//AST_Exit.DEFMETHOD( 71
};	//class_fun_def A 33
str.prototype.toSource = function toSource(){
    var self = this;	// complex body AST_Defun
    return '"' + self._str + '"';	//AST_Exit.DEFMETHOD( 75
};	//class_fun_def A 33
str.prototype.valueOf = function valueOf(){
    var self = this;	// complex body AST_Defun
    return self._str;	//AST_Exit.DEFMETHOD( 78
};	//class_fun_def A 33
str = __defineClassProperties__(str);

var list = Callable(function list_(iterable){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var elem;	//complex body AST_Scope declare var as local
    var _$iter0 = iterable;
    for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
        elem = _$iter0[_$id0];
        Array.push(self, elem);	//DEFPRINT(AST_SimpleStatement 87
    }
});	//class_fun_def A 83
list.prototype = new Array("__inheritance__", list);	//class_fun_def C 83
list.prototype.append = function append(elem){
    var self = this;	// complex body AST_Defun
    self.push(elem);	//DEFPRINT(AST_SimpleStatement 90
};	//class_fun_def A 83
list.prototype.find = function find(elem){
    var self = this;	// complex body AST_Defun
    return self.indexOf(elem);	//AST_Exit.DEFMETHOD( 93
};	//class_fun_def A 83
list.prototype.index = function index(elem){
    var self = this;	// complex body AST_Defun
    var val;	//complex body AST_Scope declare var as local
    val = self.find(elem);	//DEFPRINT(AST_SimpleStatement 96
    if (val == -1) {
        throw new ValueError(new str(elem) + " is not in list");	//AST_Exit.DEFMETHOD( 98
    }
    return val;	//AST_Exit.DEFMETHOD( 99
};	//class_fun_def A 83
list.prototype.insert = function insert(index, elem){
    var self = this;	// complex body AST_Defun
    self.splice(index, 0, elem);	//DEFPRINT(AST_SimpleStatement 102
};	//class_fun_def A 83
list.prototype.pop = function pop(index){
    var self = this;	// complex body AST_Defun
    if (typeof index === "undefined") index = len(self) - 1;
    return self.splice(index, 1)[0];	//AST_Exit.DEFMETHOD( 105
};	//class_fun_def A 83
list.prototype.extend = function extend(list2){
    var self = this;	// complex body AST_Defun
    self.push.apply(self, [].concat(list2));	//DEFPRINT(AST_SimpleStatement 108
};	//class_fun_def A 83
list.prototype.remove = function remove(elem){
    var self = this;	// complex body AST_Defun
    var index;	//complex body AST_Scope declare var as local
    index = self.find(elem);	//DEFPRINT(AST_SimpleStatement 111
    self.pop(index);	//DEFPRINT(AST_SimpleStatement 112
};	//class_fun_def A 83
list.prototype.copy = function copy(){
    var self = this;	// complex body AST_Defun
    return new list(self);	//AST_Exit.DEFMETHOD( 115
};	//class_fun_def A 83
list.prototype.toSource = function toSource(){
    var self = this;	// complex body AST_Defun
    return "[" + self + "]";	//AST_Exit.DEFMETHOD( 120
};	//class_fun_def A 83
list = __defineClassProperties__(list);

if (!Array.prototype.map) {
    
	Array.prototype.map = function(callback, thisArg) {
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
	;	//DEFPRINT(AST_SimpleStatement 124
}

function map(oper, arr) {
    return new list(arr.map(oper));	//AST_Exit.DEFMETHOD( 126
}

if (!Array.prototype.filter) {
    
	Array.prototype.filter = function(filterfun, thisArg) {
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
	;	//DEFPRINT(AST_SimpleStatement 130
}

function filter(oper, arr) {
    return new list(arr.filter(oper));	//AST_Exit.DEFMETHOD( 132
}

var dict = Callable(function dict_(hashlike){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var key;	//complex body AST_Scope declare var as local
    var _$iter1 = hashlike;
    for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
        key = _$iter1[_$id1];
        self[key] = hashlike[key];	//DEFPRINT(AST_SimpleStatement 145
    }
});	//class_fun_def A 141
dict.prototype.keys = function keys(){
    var self = this;	// complex body AST_Defun
    var keys;	//complex body AST_Scope declare var as local
    if (typeof Object.getOwnPropertyNames === "function") {
        return Object.getOwnPropertyNames(self);	//AST_Exit.DEFMETHOD( 150
    } else {
        keys = [];	//DEFPRINT(AST_SimpleStatement 153
        
			for (var x in self) {
				if (self.hasOwnProperty(x)) keys.push(x);
			}
			;	//DEFPRINT(AST_SimpleStatement 156
        return keys;	//AST_Exit.DEFMETHOD( 157
    }
};	//class_fun_def A 141
dict.prototype.values = function values(target){
    var self = this;	// complex body AST_Defun
    var tmp, i;	//complex body AST_Scope declare var as local
    tmp = [];	//DEFPRINT(AST_SimpleStatement 161
    var _$iter2 = target;
    for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
        i = _$iter2[_$id2];
        if (target.hasOwnProperty(i)) {
            tmp.push(target[i]);	//DEFPRINT(AST_SimpleStatement 164
        }
    }
    return tmp;	//AST_Exit.DEFMETHOD( 165
};	//class_fun_def A 141
dict.prototype.items = function items(){
    var self = this;	// complex body AST_Defun
    var items, key;	//complex body AST_Scope declare var as local
    items = [];	//DEFPRINT(AST_SimpleStatement 168
    var _$iter3 = dict.keys(self);
    for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
        key = _$iter3[_$id3];
        items.push([key, self[key]]);	//DEFPRINT(AST_SimpleStatement 171
    }
    return items;	//AST_Exit.DEFMETHOD( 172
};	//class_fun_def A 141
dict.prototype.copy = function copy(){
    var self = this;	// complex body AST_Defun
    return new dict(self);	//AST_Exit.DEFMETHOD( 175
};	//class_fun_def A 141
dict.prototype.clear = function clear(){
    var self = this;	// complex body AST_Defun
    var key;	//complex body AST_Scope declare var as local
    var _$iter4 = dict.keys(self);
    for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
        key = _$iter4[_$id4];
        delete self[key];	//DEFPRINT(AST_SimpleStatement 180
    }
};	//class_fun_def A 141
dict = __defineClassProperties__(dict);
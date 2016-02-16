







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

str = JSON.stringify;	//DEFPRINT(AST_SimpleStatement 22

var ValueError = Callable(function ValueError_(message){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.name = "ValueError";	//DEFPRINT(AST_SimpleStatement 30
    self.message = message;	//DEFPRINT(AST_SimpleStatement 31
});	//class_fun_def A 28
ValueError.prototype = new Error("__inheritance__", ValueError);	//class_fun_def C 28
ValueError = __defineClassProperties__(ValueError);

String.prototype.find = Array.prototype.indexOf;	//DEFPRINT(AST_SimpleStatement 37

String.prototype.strip = String.prototype.trim;	//DEFPRINT(AST_SimpleStatement 38

String.prototype.lstrip = String.prototype.trimLeft;	//DEFPRINT(AST_SimpleStatement 39

String.prototype.rstrip = String.prototype.trimRight;	//DEFPRINT(AST_SimpleStatement 40

String.prototype.join = function(iterable) {
    return iterable.join(this);	//AST_Exit.DEFMETHOD( 42
};	//DEFPRINT(AST_SimpleStatement 41

String.prototype.zfill = function(size) {
    var s, s;	//complex body AST_Scope declare var as local
    s = this;	//DEFPRINT(AST_SimpleStatement 44
    while (s.length < size) {
        s = "0" + s;	//DEFPRINT(AST_SimpleStatement 46
    }
    return s;	//AST_Exit.DEFMETHOD( 47
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

Array.prototype.index = function(index) {
    var val;	//complex body AST_Scope declare var as local
    val = this.find(index);	//DEFPRINT(AST_SimpleStatement 61
    if (val == -1) {
        throw new ValueError(str(index) + " is not in list");	//AST_Exit.DEFMETHOD( 63
    }
    return val;	//AST_Exit.DEFMETHOD( 64
};	//DEFPRINT(AST_SimpleStatement 60

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);	//DEFPRINT(AST_SimpleStatement 66
};	//DEFPRINT(AST_SimpleStatement 65

Array.prototype.pop = function(index) {
    if (typeof index === "undefined") index = this.length - 1;
    return this.splice(index, 1)[0];	//AST_Exit.DEFMETHOD( 68
};	//DEFPRINT(AST_SimpleStatement 67

Array.prototype.extend = function(array2) {
    this.push.apply(this, array2);	//DEFPRINT(AST_SimpleStatement 70
};	//DEFPRINT(AST_SimpleStatement 69

Array.prototype.remove = function(item) {
    var index;	//complex body AST_Scope declare var as local
    index = this.find(item);	//DEFPRINT(AST_SimpleStatement 72
    this.splice(index, 1);	//DEFPRINT(AST_SimpleStatement 73
};	//DEFPRINT(AST_SimpleStatement 71

Array.prototype.copy = function() {
    return this.slice(0);	//AST_Exit.DEFMETHOD( 75
};	//DEFPRINT(AST_SimpleStatement 74

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
	;	//DEFPRINT(AST_SimpleStatement 78
}

function map(oper, arr) {
    return arr.map(oper);	//AST_Exit.DEFMETHOD( 80
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
	;	//DEFPRINT(AST_SimpleStatement 83
}

function filter(oper, arr) {
    return arr.filter(oper);	//AST_Exit.DEFMETHOD( 85
}

function dict(iterable) {
    var result, key;	//complex body AST_Scope declare var as local
    result = {};	//DEFPRINT(AST_SimpleStatement 94
    var _$iter1 = iterable;
    for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
        key = _$iter1[_$id1];
        result[key] = iterable[key];	//DEFPRINT(AST_SimpleStatement 96
    }
    return result;	//AST_Exit.DEFMETHOD( 97
}

if (typeof Object.getOwnPropertyNames !== "function") {
    dict.keys = function(hash) {
        var keys;	//complex body AST_Scope declare var as local
        keys = [];	//DEFPRINT(AST_SimpleStatement 102
        
		for (var x in hash) {
			if (hash.hasOwnProperty(x)) {
				keys.push(x);
			}
		}
		;	//DEFPRINT(AST_SimpleStatement 105
        return keys;	//AST_Exit.DEFMETHOD( 106
    };	//DEFPRINT(AST_SimpleStatement 101
} else {
    dict.keys = function(hash) {
        return Object.getOwnPropertyNames(hash);	//AST_Exit.DEFMETHOD( 110
    };	//DEFPRINT(AST_SimpleStatement 109
}

dict.values = function(hash) {
    var vals, key;	//complex body AST_Scope declare var as local
    vals = [];	//DEFPRINT(AST_SimpleStatement 113
    var _$iter2 = dict.keys(hash);
    for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
        key = _$iter2[_$id2];
        vals.append(hash[key]);	//DEFPRINT(AST_SimpleStatement 115
    }
    return vals;	//AST_Exit.DEFMETHOD( 116
};	//DEFPRINT(AST_SimpleStatement 112

dict.items = function(hash) {
    var items, key;	//complex body AST_Scope declare var as local
    items = [];	//DEFPRINT(AST_SimpleStatement 119
    var _$iter3 = dict.keys(hash);
    for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
        key = _$iter3[_$id3];
        items.append([key, hash[key]]);	//DEFPRINT(AST_SimpleStatement 121
    }
    return items;	//AST_Exit.DEFMETHOD( 122
};	//DEFPRINT(AST_SimpleStatement 118

dict.copy = dict;	//DEFPRINT(AST_SimpleStatement 124

dict.clear = function(hash) {
    var key;	//complex body AST_Scope declare var as local
    var _$iter4 = dict.keys(hash);
    for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
        key = _$iter4[_$id4];
        delete hash[key];	//DEFPRINT(AST_SimpleStatement 128
    }
};	//DEFPRINT(AST_SimpleStatement 126

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
    elem = new String(elem);	//DEFPRINT(AST_SimpleStatement 37
    String.constructor(self, elem);	//DEFPRINT(AST_SimpleStatement 38
    self._str = elem;	//DEFPRINT(AST_SimpleStatement 39
});	//class_fun_def A 34
str.prototype = new String("__inheritance__", str);	//class_fun_def C 34
str.prototype.find = function find(elem){
    var self = this;	// complex body AST_Defun
    return self._str.indexOf(elem);	//AST_Exit.DEFMETHOD( 42
};	//class_fun_def A 34
str.prototype.strip = function strip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trim());	//AST_Exit.DEFMETHOD( 45
};	//class_fun_def A 34
str.prototype.lstrip = function lstrip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trimLeft());	//AST_Exit.DEFMETHOD( 48
};	//class_fun_def A 34
str.prototype.rstrip = function rstrip(){
    var self = this;	// complex body AST_Defun
    return new str(self._str.trimRight());	//AST_Exit.DEFMETHOD( 51
};	//class_fun_def A 34
str.prototype.join = function join(iterable){
    var self = this;	// complex body AST_Defun
    return new str(iterable.join(self._str));	//AST_Exit.DEFMETHOD( 54
};	//class_fun_def A 34
str.prototype.zfill = function zfill(size){
    var self = this;	// complex body AST_Defun
    var s, s;	//complex body AST_Scope declare var as local
    s = self._str;	//DEFPRINT(AST_SimpleStatement 57
    while (s.length < size) {
        s = "0" + s;	//DEFPRINT(AST_SimpleStatement 59
    }
    return new str(s);	//AST_Exit.DEFMETHOD( 60
};	//class_fun_def A 34
str.prototype.replace = function replace(orig, sub, n){
    var self = this;	// complex body AST_Defun
    var s, s, s;	//complex body AST_Scope declare var as local
    s = self._str;	//DEFPRINT(AST_SimpleStatement 63
    if (n) {
        for (n = 0; n < len(n); n++) {
            s = String.replace(s, orig, sub);	//DEFPRINT(AST_SimpleStatement 66
        }
    } else {
        s = String.replace(s, new RegExp(orig, "g"), sub);	//DEFPRINT(AST_SimpleStatement 68
    }
    return new str(s);	//AST_Exit.DEFMETHOD( 69
};	//class_fun_def A 34
str.prototype.toString = function toString(){
    var self = this;	// complex body AST_Defun
    return self._str;	//AST_Exit.DEFMETHOD( 72
};	//class_fun_def A 34
str.prototype.toSource = function toSource(){
    var self = this;	// complex body AST_Defun
    return '"' + self._str + '"';	//AST_Exit.DEFMETHOD( 76
};	//class_fun_def A 34
str.prototype.valueOf = function valueOf(){
    var self = this;	// complex body AST_Defun
    return self._str;	//AST_Exit.DEFMETHOD( 79
};	//class_fun_def A 34
str = __defineClassProperties__(str);

var list = Callable(function list_(iterable){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var elem;	//complex body AST_Scope declare var as local
    var _$iter5 = iterable;
    for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
        elem = _$iter5[_$id5];
        Array.push(self, elem);	//DEFPRINT(AST_SimpleStatement 89
    }
});	//class_fun_def A 85
list.prototype = new Array("__inheritance__", list);	//class_fun_def C 85
list.prototype.append = function append(elem){
    var self = this;	// complex body AST_Defun
    self.push(elem);	//DEFPRINT(AST_SimpleStatement 92
};	//class_fun_def A 85
list.prototype.find = function find(elem){
    var self = this;	// complex body AST_Defun
    return self.indexOf(elem);	//AST_Exit.DEFMETHOD( 95
};	//class_fun_def A 85
list.prototype.index = function index(elem){
    var self = this;	// complex body AST_Defun
    var val;	//complex body AST_Scope declare var as local
    val = self.find(elem);	//DEFPRINT(AST_SimpleStatement 98
    if (val == -1) {
        throw new ValueError(new str(elem) + " is not in list");	//AST_Exit.DEFMETHOD( 100
    }
    return val;	//AST_Exit.DEFMETHOD( 101
};	//class_fun_def A 85
list.prototype.insert = function insert(index, elem){
    var self = this;	// complex body AST_Defun
    self.splice(index, 0, elem);	//DEFPRINT(AST_SimpleStatement 104
};	//class_fun_def A 85
list.prototype.pop = function pop(index){
    var self = this;	// complex body AST_Defun
    if (typeof index === "undefined") index = len(self) - 1;
    return self.splice(index, 1)[0];	//AST_Exit.DEFMETHOD( 107
};	//class_fun_def A 85
list.prototype.extend = function extend(list2){
    var self = this;	// complex body AST_Defun
    self.push.apply(self, [].concat(list2));	//DEFPRINT(AST_SimpleStatement 110
};	//class_fun_def A 85
list.prototype.remove = function remove(elem){
    var self = this;	// complex body AST_Defun
    var index;	//complex body AST_Scope declare var as local
    index = self.find(elem);	//DEFPRINT(AST_SimpleStatement 113
    self.pop(index);	//DEFPRINT(AST_SimpleStatement 114
};	//class_fun_def A 85
list.prototype.copy = function copy(){
    var self = this;	// complex body AST_Defun
    return new list(self);	//AST_Exit.DEFMETHOD( 117
};	//class_fun_def A 85
list.prototype.toSource = function toSource(){
    var self = this;	// complex body AST_Defun
    return "[" + self + "]";	//AST_Exit.DEFMETHOD( 122
};	//class_fun_def A 85
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
	;	//DEFPRINT(AST_SimpleStatement 126
}

function map(oper, arr) {
    return new list(arr.map(oper));	//AST_Exit.DEFMETHOD( 128
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
	;	//DEFPRINT(AST_SimpleStatement 132
}

function filter(oper, arr) {
    return new list(arr.filter(oper));	//AST_Exit.DEFMETHOD( 134
}

var dict = Callable(function dict_(hashlike){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var key;	//complex body AST_Scope declare var as local
    var _$iter6 = hashlike;
    for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
        key = _$iter6[_$id6];
        self[key] = hashlike[key];	//DEFPRINT(AST_SimpleStatement 146
    }
});	//class_fun_def A 142
dict.prototype = new Object("__inheritance__", dict);	//class_fun_def C 142
dict.prototype.keys = function keys(){
    var self = this;	// complex body AST_Defun
    var keys;	//complex body AST_Scope declare var as local
    if (typeof Object.getOwnPropertyNames === "function") {
        return Object.getOwnPropertyNames(self);	//AST_Exit.DEFMETHOD( 151
    } else {
        keys = [];	//DEFPRINT(AST_SimpleStatement 154
        
			for (var x in self) {
				if (self.hasOwnProperty(x)) keys.push(x);
			}
			;	//DEFPRINT(AST_SimpleStatement 157
        return keys;	//AST_Exit.DEFMETHOD( 158
    }
};	//class_fun_def A 142
dict.prototype.values = function values(){
    var self = this;	// complex body AST_Defun
    var vals, key;	//complex body AST_Scope declare var as local
    vals = [];	//DEFPRINT(AST_SimpleStatement 161
    var _$iter7 = dict.keys(self);
    for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
        key = _$iter7[_$id7];
        vals.push(self[key]);	//DEFPRINT(AST_SimpleStatement 164
    }
    return vals;	//AST_Exit.DEFMETHOD( 165
};	//class_fun_def A 142
dict.prototype.items = function items(){
    var self = this;	// complex body AST_Defun
    var items, key;	//complex body AST_Scope declare var as local
    items = [];	//DEFPRINT(AST_SimpleStatement 168
    var _$iter8 = dict.keys(self);
    for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
        key = _$iter8[_$id8];
        items.push([key, self[key]]);	//DEFPRINT(AST_SimpleStatement 171
    }
    return items;	//AST_Exit.DEFMETHOD( 172
};	//class_fun_def A 142
dict.prototype.copy = function copy(){
    var self = this;	// complex body AST_Defun
    return new dict(self);	//AST_Exit.DEFMETHOD( 175
};	//class_fun_def A 142
dict.prototype.clear = function clear(){
    var self = this;	// complex body AST_Defun
    var key;	//complex body AST_Scope declare var as local
    var _$iter9 = dict.keys(self);
    for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
        key = _$iter9[_$id9];
        delete self[key];	//DEFPRINT(AST_SimpleStatement 180
    }
};	//class_fun_def A 142
dict = __defineClassProperties__(dict);

__author__ = "gordiaknot";	//DEFPRINT(AST_SimpleStatement 10

JamalInstance = "rapyd";	//DEFPRINT(AST_SimpleStatement 11

function isEmpty(n) {
    var key;	//complex body AST_Scope declare var as local
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;	//AST_Exit.DEFMETHOD( 25
        }
        var _$iter10 = dict.keys(n);
        for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
            key = _$iter10[_$id10];
            return false;	//AST_Exit.DEFMETHOD( 27
        }
        return true;	//AST_Exit.DEFMETHOD( 28
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;	//AST_Exit.DEFMETHOD( 31
        } else {
            return true;	//AST_Exit.DEFMETHOD( 32
        }
    }
    if (n) {
        return false;	//AST_Exit.DEFMETHOD( 34
    } else {
        return true;	//AST_Exit.DEFMETHOD( 35
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    var tmp, tmp, i, fn, ins;	//complex body AST_Scope declare var as local
    tmp = "";	//DEFPRINT(AST_SimpleStatement 37
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";	//DEFPRINT(AST_SimpleStatement 39
    }
    fn = arguments[0];	//DEFPRINT(AST_SimpleStatement 40
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");	//DEFPRINT(AST_SimpleStatement 41
    return ins;	//AST_Exit.DEFMETHOD( 42
}

function set_scope(module) {
    function scope(v) {
        var m;	//complex body AST_Scope declare var as local
        m = eval(module);	//DEFPRINT(AST_SimpleStatement 45
        if (v) {
            return m.prototype[v];	//AST_Exit.DEFMETHOD( 46
        } else {
            return m.prototype;	//AST_Exit.DEFMETHOD( 47
        }
    }
    scope.name = module;	//DEFPRINT(AST_SimpleStatement 48
    return scope;	//AST_Exit.DEFMETHOD( 49
}

function module(module) {
    var data, filter, is_k_in_filter, k, v, key, value;	//complex body AST_Scope declare var as local
    function getAllExcept(lst, module) {
        function wrapper() {
            var name, filter, tmp, m, is_k_in_filter, k, v;	//complex body AST_Scope declare var as local
            name = module.name;	//DEFPRINT(AST_SimpleStatement 53
            filter = lst;	//DEFPRINT(AST_SimpleStatement 54
            tmp = {};	//DEFPRINT(AST_SimpleStatement 55
            m = eval(name).prototype;	//DEFPRINT(AST_SimpleStatement 56
            var _$iter11 = dict.items(m);
            for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
                _$Unpack = _$iter11[_$id11];
                k = _$Unpack[0];
                v = _$Unpack[1];
                is_k_in_filter = _$in_(k, filter);	//DEFPRINT(AST_SimpleStatement 58
                if (!is_k_in_filter) {
                    tmp[k] = v;	//DEFPRINT(AST_SimpleStatement 60
                }
            }
            return tmp;	//AST_Exit.DEFMETHOD( 61
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 62
    }
    if (isEmpty(module.prototype)) {
        data = module();	//DEFPRINT(AST_SimpleStatement 64
        data.ALL = getAllExcept([ "ALL", "scope" ], module);	//DEFPRINT(AST_SimpleStatement 65
        filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__" ];	//DEFPRINT(AST_SimpleStatement 66
        var _$iter12 = dict.items(data);
        for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
            _$Unpack = _$iter12[_$id12];
            key = _$Unpack[0];
            value = _$Unpack[1];
            if (key == "scope") {
                var _$iter13 = dict.items(value);
                for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
                    _$Unpack = _$iter13[_$id13];
                    k = _$Unpack[0];
                    v = _$Unpack[1];
                    is_k_in_filter = _$in_(k, filter);	//DEFPRINT(AST_SimpleStatement 70
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);	//DEFPRINT(AST_SimpleStatement 72
                        data[k] = v;	//DEFPRINT(AST_SimpleStatement 73
                    }
                }
            }
        }
        module.prototype = data;	//DEFPRINT(AST_SimpleStatement 75
        return module.prototype;	//AST_Exit.DEFMETHOD( 76
    } else {
        return module.prototype;	//AST_Exit.DEFMETHOD( 78
    }
}

function class_properties(cls, props) {
    var k, v;	//complex body AST_Scope declare var as local
    if (!cls.prototype.__classproperty__) {
        console.log("set class properties:::");	//DEFPRINT(AST_SimpleStatement 82
        var _$iter14 = dict.items(props);
        for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
            _$Unpack = _$iter14[_$id14];
            k = _$Unpack[0];
            v = _$Unpack[1];
            setattr(cls.prototype, k, v);	//DEFPRINT(AST_SimpleStatement 84
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 85
        }
        cls.prototype.__classproperty__ = true;	//DEFPRINT(AST_SimpleStatement 86
    }
}

var RapydWeb = Callable(function RapydWeb_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        class_properties(RapydWeb, {
            "m": [],
            "v": [],
            "c": [],
            "action": "temp",
            "debug": "debug",
            "components": [],
            "config": [],
            "__instance__": {}
        });	//DEFPRINT(AST_SimpleStatement 107
        self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 119
    }
});	//class_fun_def A 88
RapydWeb.prototype.getJamalInstance = function getJamalInstance(){
    var self = this;	// complex body AST_Defun
    return eval(JamalInstance);	//AST_Exit.DEFMETHOD( 122
};	//class_fun_def A 88
RapydWeb.prototype.instanceinit = function instanceinit(){
    var self = this;	// complex body AST_Defun
    self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 125
};	//class_fun_def A 88
RapydWeb.prototype.start = function start(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 88
RapydWeb.prototype.configure = function configure(){
    var self = this;	// complex body AST_Defun
    " initialize all configuration";	//DEFPRINT(AST_Directive 131
};	//class_fun_def A 88
RapydWeb.prototype.log = function log(){
    var self = this;	// complex body AST_Defun
    console.log(self.log.caller.name, arguments);	//DEFPRINT(AST_SimpleStatement 135
};	//class_fun_def A 88
RapydWeb.prototype.error = function error(){
    var self = this;	// complex body AST_Defun
    console.error(self.error.caller.name, arguments);	//DEFPRINT(AST_SimpleStatement 138
};	//class_fun_def A 88
RapydWeb.prototype.__linkJamalProto__ = function __linkJamalProto__(successor){
    var self = this;	// complex body AST_Defun
    successor.__proto__ = eval(JamalInstance);	//DEFPRINT(AST_SimpleStatement 141
};	//class_fun_def A 88
RapydWeb.prototype.__linkMVCMediatorProto__ = function __linkMVCMediatorProto__(successor){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 88
RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    var action, action;	//complex body AST_Scope declare var as local
    self.checkActionsAvailable(name, sub_successor);	//DEFPRINT(AST_SimpleStatement 148
    if (!hyper_successor.__actions__[name]) {
        hyper_successor.__actions__[name] = {};	//DEFPRINT(AST_SimpleStatement 149
    }
    self.log("__actions__ = ", hyper_successor.__actions__);	//DEFPRINT(AST_SimpleStatement 150
    self.log("successor actions = ", sub_successor.actions);	//DEFPRINT(AST_SimpleStatement 151
    if (!hyper_successor.name == "View") {
        var _$iter15 = sub_successor.actions;
        for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
            action = _$iter15[_$id15];
            hyper_successor.__actions__[name][action] = self.actionPropStructure();	//DEFPRINT(AST_SimpleStatement 155
        }
    } else {
        var _$iter16 = sub_successor.actions;
        for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
            action = _$iter16[_$id16];
            hyper_successor.__actions__[name][action] = self.viewPropStructure();	//DEFPRINT(AST_SimpleStatement 158
        }
    }
};	//class_fun_def A 88
RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    if (sub_successor.components) {
        if (!hyper_successor.__components__[name]) {
            hyper_successor.__components__[name] = [];	//DEFPRINT(AST_SimpleStatement 163
        }
        hyper_successor.__components__[name] = sub_successor.components;	//DEFPRINT(AST_SimpleStatement 164
    }
};	//class_fun_def A 88
RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 167
    return r;	//AST_Exit.DEFMETHOD( 168
};	//class_fun_def A 88
RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 171
    return r;	//AST_Exit.DEFMETHOD( 172
};	//class_fun_def A 88
RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
    var self = this;	// complex body AST_Defun
    var action;	//complex body AST_Scope declare var as local
    self.log(name, successor);	//DEFPRINT(AST_SimpleStatement 175
    self.log(successor.actions);	//DEFPRINT(AST_SimpleStatement 176
    var _$iter17 = successor.actions;
    for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
        action = _$iter17[_$id17];
        if (!successor[action]) {
            self.error("actions [{0}] not exists", action);	//DEFPRINT(AST_SimpleStatement 179
            return false;	//AST_Exit.DEFMETHOD( 180
        }
    }
};	//class_fun_def A 88
RapydWeb = __defineClassProperties__(RapydWeb);

var Controller = Callable(function Controller_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 196
        RapydWeb.prototype.__instance__["Controller"] = self;	//DEFPRINT(AST_SimpleStatement 198
        self.__classname__ = "Controller";	//DEFPRINT(AST_SimpleStatement 199
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 200
        self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 201
    }
});	//class_fun_def A 186
Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 186
Controller.prototype.init = function init(name, successor){
    var self = this;	// complex body AST_Defun
    "\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t";	//DEFPRINT(AST_Directive 204
    self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 205
    self.__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 206
};	//class_fun_def A 186
Controller.prototype.__getattr__ = function __getattr__(item){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 209
    item;	//DEFPRINT(AST_SimpleStatement 209
};	//class_fun_def A 186
Controller.prototype.__get__ = function __get__(instance, owner){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 212
    [instance, owner];	//DEFPRINT(AST_SimpleStatement 212
};	//class_fun_def A 186
Controller.prototype.__beforAction = function __beforAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.beforeAction(f, args);	//DEFPRINT(AST_SimpleStatement 215
};	//class_fun_def A 186
Controller.prototype.beforeAction = function beforeAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 186
Controller.prototype.afterAction = function afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 186
Controller.prototype.__afterAction = function __afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.__startRender(f, args);	//DEFPRINT(AST_SimpleStatement 224
};	//class_fun_def A 186
Controller.prototype.__startRender = function __startRender(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 186
Controller = __defineClassProperties__(Controller);

var View = Callable(function View_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 239
        RapydWeb.prototype.__instance__["View"] = self;	//DEFPRINT(AST_SimpleStatement 241
        self.__classname__ = "View";	//DEFPRINT(AST_SimpleStatement 242
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 243
        self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 244
    }
});	//class_fun_def A 229
View.prototype = new RapydWeb("__inheritance__", View);	//class_fun_def C 229
View.prototype.init = function init(name, successor){
    var self = this;	// complex body AST_Defun
    "\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t";	//DEFPRINT(AST_Directive 247
    self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 248
    self.__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 249
};	//class_fun_def A 229
View.prototype.beforeRender = function beforeRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 229
View.prototype.afterRender = function afterRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 229
View = __defineClassProperties__(View);

var Model = Callable(function Model_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 267
        RapydWeb.prototype.__instance__["Model"] = self;	//DEFPRINT(AST_SimpleStatement 269
        self.__classname__ = "Model";	//DEFPRINT(AST_SimpleStatement 270
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 271
    }
});	//class_fun_def A 257
Model.prototype = new RapydWeb("__inheritance__", Model);	//class_fun_def C 257
Model.prototype.init = function init(name, successor){
    var self = this;	// complex body AST_Defun
    "\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t";	//DEFPRINT(AST_Directive 274
    self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 275
};	//class_fun_def A 257
Model.prototype.beforeSend = function beforeSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 257
Model.prototype.afterSend = function afterSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 257
Model.prototype.beforeSave = function beforeSave(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 257
Model.prototype.afterSaver = function afterSaver(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 257
Model = __defineClassProperties__(Model);

var Mediator = Callable(function Mediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 297
        RapydWeb.prototype.__instance__["Mediator"] = self;	//DEFPRINT(AST_SimpleStatement 299
        self.__classname__ = "Mediator";	//DEFPRINT(AST_SimpleStatement 300
    }
});	//class_fun_def A 289
Mediator.prototype = new RapydWeb("__inheritance__", Mediator);	//class_fun_def C 289
Mediator.prototype.test = function test(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 303
    "mediator test";	//DEFPRINT(AST_SimpleStatement 303
};	//class_fun_def A 289
Mediator.prototype.test2 = function test2(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 306
    "mediator test2";	//DEFPRINT(AST_SimpleStatement 306
};	//class_fun_def A 289
Mediator = __defineClassProperties__(Mediator);

var HeaderMediator = Callable(function HeaderMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["Mediator"];	//DEFPRINT(AST_SimpleStatement 318
        RapydWeb.prototype.__instance__["HeaderMediator"] = self;	//DEFPRINT(AST_SimpleStatement 319
    }
});	//class_fun_def A 314
HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);	//class_fun_def C 314
HeaderMediator.prototype.catchHeader = function catchHeader(header){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 314
HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 314
HeaderMediator = __defineClassProperties__(HeaderMediator);

var ViewMediator = Callable(function ViewMediator_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(ViewMediator,self).__init__.apply(self,arguments);});	//class_fun_def B 327
ViewMediator.prototype = new Mediator("__inheritance__", ViewMediator);	//class_fun_def C 327
ViewMediator.prototype.viewName_to_ControllerActionName = function viewName_to_ControllerActionName(){
    var self = this;	// complex body AST_Defun
    "\n\t\t bind view to controller action\n\t\t";	//DEFPRINT(AST_Directive 329
};	//class_fun_def A 327
ViewMediator = __defineClassProperties__(ViewMediator);

var AddressMediator = Callable(function AddressMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["Mediator"];	//DEFPRINT(AST_SimpleStatement 336
        RapydWeb.prototype.__instance__["AddressMediator"] = self;	//DEFPRINT(AST_SimpleStatement 337
    }
});	//class_fun_def A 331
AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);	//class_fun_def C 331
AddressMediator.prototype.suspendRediret = function suspendRediret(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator.prototype.redirectTo = function redirectTo(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator.prototype.historyNext = function historyNext(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator.prototype.historyPrev = function historyPrev(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator.prototype.getHistories = function getHistories(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator.prototype.onAddressChange = function onAddressChange(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 331
AddressMediator = __defineClassProperties__(AddressMediator);

var BlogController = Callable(function BlogController_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["Controller"];	//DEFPRINT(AST_SimpleStatement 364
        RapydWeb.prototype.__instance__["BlogController"] = self;	//DEFPRINT(AST_SimpleStatement 365
        self.actions = [ "index", "viewArticles", "viewByTags" ];	//DEFPRINT(AST_SimpleStatement 367
        self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 368
        self.init("BlogController", self);	//DEFPRINT(AST_SimpleStatement 369
    }
});	//class_fun_def A 357
BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 357
BlogController.prototype.index = function index(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 357
BlogController.prototype.viewArticles = function viewArticles(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 357
BlogController.prototype.viewByTags = function viewByTags(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 357
BlogController = __defineClassProperties__(BlogController);

var VoclistController = Callable(function VoclistController_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        RapydWeb.prototype.__instance__["VoclistController"] = self;	//DEFPRINT(AST_SimpleStatement 385
        self.__proto__ = RapydWeb.prototype.__instance__["Controller"];	//DEFPRINT(AST_SimpleStatement 386
        self.actions = [ "vocHome", "vocSentence", "vocIndex" ];	//DEFPRINT(AST_SimpleStatement 388
        self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 389
        self.init("VoclistController", self);	//DEFPRINT(AST_SimpleStatement 390
    }
});	//class_fun_def A 380
VoclistController.prototype = new Controller("__inheritance__", VoclistController);	//class_fun_def C 380
VoclistController.prototype.vocIndex = function vocIndex(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 380
VoclistController.prototype.vocSentence = function vocSentence(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 380
VoclistController.prototype.vocHome = function vocHome(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 380
VoclistController = __defineClassProperties__(VoclistController);

var BlogView = Callable(function BlogView_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["View"];	//DEFPRINT(AST_SimpleStatement 403
        RapydWeb.prototype.__instance__["BlogView"] = self;	//DEFPRINT(AST_SimpleStatement 404
        self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 405
        self.init("BlogView", self);	//DEFPRINT(AST_SimpleStatement 406
    }
});	//class_fun_def A 399
BlogView.prototype = new View("__inheritance__", BlogView);	//class_fun_def C 399
BlogView.prototype.index = function index(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 399
BlogView.prototype.viewArticles = function viewArticles(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 399
BlogView.prototype.viewByTags = function viewByTags(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 399
BlogView = __defineClassProperties__(BlogView);

var Template = Callable(function Template_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
});	//class_fun_def A 427
Template.prototype = new View("__inheritance__", Template);	//class_fun_def C 427
Template = __defineClassProperties__(Template);

var ViewComponent = Callable(function ViewComponent_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        self.setAttrWithOnchangedCharacteristic(self, "test", "test value");	//DEFPRINT(AST_SimpleStatement 442
        self.setAttrWithOnchangedCharacteristic(self, "test2", "set_from_callback value");	//DEFPRINT(AST_SimpleStatement 443
    }
});	//class_fun_def A 438
ViewComponent.prototype = new View("__inheritance__", ViewComponent);	//class_fun_def C 438
ViewComponent.prototype.__setattr__ = function __setattr__(key, value){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 438
ViewComponent.prototype.setAttrWithOnchangedCharacteristic = function setAttrWithOnchangedCharacteristic(attr, value){
    var self = this;	// complex body AST_Defun
    var obj;	//complex body AST_Scope declare var as local
    obj = {
        "value": value,
        "onChange": []
    };	//DEFPRINT(AST_SimpleStatement 448
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 449
    function setter_callback(instance, attr) {
        function wrapper(value) {
            instance.onChange(attr, value);	//DEFPRINT(AST_SimpleStatement 453
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 454
    }
    function getter_callback(instance, attr) {
        function wrapper(value) {
            return instance.get(attr);	//AST_Exit.DEFMETHOD( 458
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 459
    }
    self.__defineSetter__(attr, setter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 461
    self.__defineGetter__(attr, getter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 462
    return obj;	//AST_Exit.DEFMETHOD( 463
};	//class_fun_def A 438
ViewComponent.prototype.isWatchObject = function isWatchObject(value){
    var self = this;	// complex body AST_Defun
    var value_in_dict, onchange_in_dict;	//complex body AST_Scope declare var as local
    if (!typeof value == "object") {
        return false;	//AST_Exit.DEFMETHOD( 466
    }
    value_in_dict = _$in_("value", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 467
    onchange_in_dict = _$in_("onChange", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 468
    console.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);	//DEFPRINT(AST_SimpleStatement 469
    return value_in_dict || onchange_in_dict;	//AST_Exit.DEFMETHOD( 470
};	//class_fun_def A 438
ViewComponent.prototype.set = function set(attr, value){
    var self = this;	// complex body AST_Defun
    self["_" + attr] = value;	//DEFPRINT(AST_SimpleStatement 475
};	//class_fun_def A 438
ViewComponent.prototype.get = function get(attr){
    var self = this;	// complex body AST_Defun
    return self["_" + attr];	//AST_Exit.DEFMETHOD( 482
};	//class_fun_def A 438
ViewComponent.prototype.onChange = function onChange(attr, value){
    var self = this;	// complex body AST_Defun
    var original_value, on_change_register_list, target, target_attr, hash, obj;	//complex body AST_Scope declare var as local
    original_value = self.get(attr);	//DEFPRINT(AST_SimpleStatement 485
    console.info("[onChange] origianal value = ", original_value);	//DEFPRINT(AST_SimpleStatement 486
    if (!self.isWatchObject(original_value)) {
        throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';	//AST_Exit.DEFMETHOD( 488
    }
    on_change_register_list = original_value.onChange;	//DEFPRINT(AST_SimpleStatement 489
    var _$iter18 = on_change_register_list;
    for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
        hash = _$iter18[_$id18];
        if (_$in_("condition", dict.keys(hash))) {
            console.info("[onChange][set onchange list] set var with condition, attr = ", attr);	//DEFPRINT(AST_SimpleStatement 494
            self.processOnchangeConditions(hash, attr, value);	//DEFPRINT(AST_SimpleStatement 495
        } else {
            console.info("[onChange][set onchange list] set var, attr = ", attr, "value = ", value);	//DEFPRINT(AST_SimpleStatement 497
            target = hash["target"];	//DEFPRINT(AST_SimpleStatement 498
            target_attr = hash["attr"];	//DEFPRINT(AST_SimpleStatement 499
            target.set(target_attr, value);	//DEFPRINT(AST_SimpleStatement 500
        }
    }
    console.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);	//DEFPRINT(AST_SimpleStatement 503
    obj = self.get(attr);	//DEFPRINT(AST_SimpleStatement 504
    obj.value = value;	//DEFPRINT(AST_SimpleStatement 505
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 506
};	//class_fun_def A 438
ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con, attr, value){
    var self = this;	// complex body AST_Defun
    var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;	//complex body AST_Scope declare var as local
    "\n\t\trapydscript if elif else clause structure::\n\t   {'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t'elif_clause': [{\n\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t'if_clause':\n\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\tpython if else clause structure\n\t\t{'if_setter'\t: \"'pressed'\",\n\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t'else_setter'\t: \"'abc'\",\n\t\t'if_setted'\t\t: _state.name})";	//DEFPRINT(AST_Directive 509
    function get_condition(con_lst) {
        var prop_a, operator, prop_b, condition;	//complex body AST_Scope declare var as local
        _$Unpack = con_lst;	//DEFPRINT(AST_Assign 511
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 511
        condition = prop_a + operator + prop_b;	//DEFPRINT(AST_SimpleStatement 512
        return eval(condition);	//AST_Exit.DEFMETHOD( 513
    }
    if (con.if_clause) {
        var _$iter19 = dict.keys(con);
        for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
            key = _$iter19[_$id19];
            current = con[key];	//DEFPRINT(AST_SimpleStatement 517
            _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 518
            _pass = current["pass"];	//DEFPRINT(AST_SimpleStatement 519
            condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 520
            if (condition || !isEmpty(_condition)) {
                if (!_pass) {
                    setted = current["setted"];	//DEFPRINT(AST_SimpleStatement 526
                    setter = current["setter"];	//DEFPRINT(AST_SimpleStatement 527
                    if (self.isWatchObject(setter)) {
                        v = setter.value;	//DEFPRINT(AST_SimpleStatement 528
                    } else {
                        v = setter;	//DEFPRINT(AST_SimpleStatement 529
                    }
                    if (self.isWatchObject(setted)) {
                        setted.value = v;	//DEFPRINT(AST_SimpleStatement 530
                    } else {
                        throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 531
                    }
                    continue;
                } else {
                    continue;
                }
            }
        }
    } else if (con.if_con) {
        _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 537
        setted = current["if_setted"];	//DEFPRINT(AST_SimpleStatement 538
        condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 539
        if (condition) {
            setter = current["if_setter"];	//DEFPRINT(AST_SimpleStatement 540
        } else {
            setter = current["else_setter"];	//DEFPRINT(AST_SimpleStatement 541
        }
        if (self.isWatchObject(setter)) {
            v = setter.value;	//DEFPRINT(AST_SimpleStatement 542
        } else {
            v = setter;	//DEFPRINT(AST_SimpleStatement 543
        }
        if (self.isWatchObject(setted)) {
            setted.value = v;	//DEFPRINT(AST_SimpleStatement 544
        } else {
            throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 545
        }
    }
};	//class_fun_def A 438
ViewComponent.prototype.registCondition = function registCondition(register){
    var self = this;	// complex body AST_Defun
    var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;	//complex body AST_Scope declare var as local
    con = register.rapyd || register.python;	//DEFPRINT(AST_SimpleStatement 548
    pattern = new RegExp("([w]+[.][w]+)");	//DEFPRINT(AST_SimpleStatement 550
    if (con.if_clause) {
        _con = con.if_clause.condition;	//DEFPRINT(AST_SimpleStatement 554
        _$Unpack = _con;	//DEFPRINT(AST_Assign 555
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 555
        if (!con.if_clause["pass"]) {
            setted = con["setted"];	//DEFPRINT(AST_SimpleStatement 558
            setter = con["setter"];	//DEFPRINT(AST_SimpleStatement 559
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 561
        }
        if (prop_a.match(pattern)) {
            prop_a.onChange.push({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 563
        }
        if (prop_b.match(pattern)) {
            prop_b.onChange.push({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 564
        }
        return;	//AST_Exit.DEFMETHOD( 565
    } else {
        _con = con.if_con;	//DEFPRINT(AST_SimpleStatement 569
        _$Unpack = _con;	//DEFPRINT(AST_Assign 570
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 570
        if (!con["pass"]) {
            setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 572
            setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 573
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 575
        }
        if (_$in_("self.", prop_a)) {
            prop_a.onChange.push({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 576
        }
        if (_$in_("self.", prop_b)) {
            prop_b.onChange.push({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 577
        }
    }
};	//class_fun_def A 438
ViewComponent.prototype.setattr = function setattr(attr, value){
    var self = this;	// complex body AST_Defun
    if (typeof attr == "string") {
        if (self.isIfStatement(value)) {
            self.registCondition(value);	//DEFPRINT(AST_SimpleStatement 582
        }
        if (self.isWatchObject(value)) {
            value.onChange.push({
                "target": self,
                "attr": attr
            });	//DEFPRINT(AST_SimpleStatement 584
        } else {
            self.set(attr, value);	//DEFPRINT(AST_SimpleStatement 586
        }
    } else {
        throw "Invalid attribute type";	//AST_Exit.DEFMETHOD( 588
    }
};	//class_fun_def A 438
ViewComponent.prototype.changeState = function changeState(state){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 438
ViewComponent.prototype.onStateChanged = function onStateChanged(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 438
ViewComponent.prototype.isIfStatement = function isIfStatement(value){
    var self = this;	// complex body AST_Defun
    var condition, _if, key;	//complex body AST_Scope declare var as local
    if (typeof value == "object") {
        condition = value["python"] || value["rapyd"];	//DEFPRINT(AST_SimpleStatement 598
        if (!condition) {
            return false;	//AST_Exit.DEFMETHOD( 599
        }
        if (typeof condition == "object") {
            _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];	//DEFPRINT(AST_SimpleStatement 601
            var _$iter20 = dict.keys(condition);
            for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
                key = _$iter20[_$id20];
                if (_$in_(key, _if)) {
                    return true;	//AST_Exit.DEFMETHOD( 604
                }
            }
        }
    }
    return false;	//AST_Exit.DEFMETHOD( 605
};	//class_fun_def A 438
ViewComponent = __defineClassProperties__(ViewComponent);

var States = Callable(function States_(){});	//class_fun_def B2 607
States.prototype.addState = function addState(){
    var self = this;	// complex body AST_Defun
    self.states.push({
        "animation": [],
        "name": "",
        "setattr": [],
        "conditions": []
    });	//DEFPRINT(AST_SimpleStatement 611
};	//class_fun_def A 607
States.prototype.setAttr = function setAttr(attr, value){
    var self = this;	// complex body AST_Defun
    self.states[self.states.length-1]["setattr"].push([ attr, value ]);	//DEFPRINT(AST_SimpleStatement 614
};	//class_fun_def A 607
States.prototype.setName = function setName(name){
    var self = this;	// complex body AST_Defun
    self.states[self.states.length-1][name] = name;	//DEFPRINT(AST_SimpleStatement 617
    self.states[name] = self.states[self.states.length-1];	//DEFPRINT(AST_SimpleStatement 618
};	//class_fun_def A 607
States.prototype.setTarget = function setTarget(target){
    var self = this;	// complex body AST_Defun
    target["States"] = self;	//DEFPRINT(AST_SimpleStatement 621
};	//class_fun_def A 607
States.prototype.watch = function watch(attr, con){
    var self = this;	// complex body AST_Defun
    var condition;	//complex body AST_Scope declare var as local
    condition = con.python || con.rapyd;	//DEFPRINT(AST_SimpleStatement 624
    self.states[self.states.length-1]["conditions"].push(condition);	//DEFPRINT(AST_SimpleStatement 625
};	//class_fun_def A 607
States.prototype.setAnime = function setAnime(){
    var self = this;	// complex body AST_Defun
    var anim;	//complex body AST_Scope declare var as local
    anim = Animation();	//DEFPRINT(AST_SimpleStatement 628
    self.states[self.states.length-1]["animation"] = anim;	//DEFPRINT(AST_SimpleStatement 629
    return anim;	//AST_Exit.DEFMETHOD( 630
};	//class_fun_def A 607
States = __defineClassProperties__(States);

var Animation = Callable(function Animation_(){});	//class_fun_def B2 632
Animation.prototype.setAttr = function setAttr(){
    var self = this;	// complex body AST_Defun
    var attr = arguments[0];
    var args = [].slice.call(arguments, 1);
    setattr.apply(this, [self, attr].concat(args));	//DEFPRINT(AST_SimpleStatement 634
};	//class_fun_def A 632
Animation.prototype.setTwn = function setTwn(tween_code){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 632
Animation.prototype.startAnime = function startAnime(target){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 632
Animation = __defineClassProperties__(Animation);

var Button = Callable(function Button_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(Button,self).__init__.apply(self,arguments);});	//class_fun_def B 640
Button.prototype = new ViewComponent("__inheritance__", Button);	//class_fun_def C 640
Button.prototype.viewCompInit = function viewCompInit(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 640
Button.prototype.addButton = function addButton(instance, group){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 640
Button.prototype.setDefaultName = function setDefaultName(name){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 640
Button = __defineClassProperties__(Button);

var CustomButton = Callable(function CustomButton_(data){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    function clearbt(self) {
        var bt;	//complex body AST_Scope declare var as local
        var _$iter21 = self.groups[self];
        for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
            bt = _$iter21[_$id21];
            if (bt.id != self.id) {
                bt.clear();	//DEFPRINT(AST_SimpleStatement 655
            }
        }
    }
    function clear(self) {
        self.state == self.States.default;	//DEFPRINT(AST_SimpleStatement 657
    }
    function action(self) {
        var i;	//complex body AST_Scope declare var as local
        for (i = 0; i < 10; i++) {
            print;	//DEFPRINT(AST_SimpleStatement 660
            123123;	//DEFPRINT(AST_SimpleStatement 660
        }
    }
});	//class_fun_def A 650
CustomButton.prototype = new Button("__inheritance__", CustomButton);	//class_fun_def C 650
CustomButton = __defineClassProperties__(CustomButton);

rapyd = new RapydWeb("init");	//DEFPRINT(AST_SimpleStatement 663

console.log("RapydWeb instance = ", RapydWeb.__instance__);	//DEFPRINT(AST_SimpleStatement 665

console.log("rapyd instance = ", rapyd.__instance__);	//DEFPRINT(AST_SimpleStatement 666

console.log("rapyd =", rapyd);	//DEFPRINT(AST_SimpleStatement 667

rapyd.c = new Controller("init");	//DEFPRINT(AST_SimpleStatement 669

rapyd.m = new Model("init");	//DEFPRINT(AST_SimpleStatement 670

rapyd.v = new View("init");	//DEFPRINT(AST_SimpleStatement 671

rapyd.mediator = new Mediator("init");	//DEFPRINT(AST_SimpleStatement 672

rapyd.c.blog = new BlogController("init");	//DEFPRINT(AST_SimpleStatement 673

rapyd.c.voclist = new VoclistController("init");	//DEFPRINT(AST_SimpleStatement 674

rapyd.mediator.address = new AddressMediator("init");	//DEFPRINT(AST_SimpleStatement 676

rapyd.mediator.header = new HeaderMediator("init");	//DEFPRINT(AST_SimpleStatement 677

console.log("------------ start -----------");	//DEFPRINT(AST_SimpleStatement 679

console.log(rapyd);	//DEFPRINT(AST_SimpleStatement 680

console.log("------------ test for view component -----------");	//DEFPRINT(AST_SimpleStatement 682

v = new ViewComponent();	//DEFPRINT(AST_SimpleStatement 685

v.setAttrWithOnchangedCharacteristic("test_setter", 123);	//DEFPRINT(AST_SimpleStatement 686

v.setAttrWithOnchangedCharacteristic("set_from_callback", "bbb");	//DEFPRINT(AST_SimpleStatement 687

console.log('set "setter" and "set_from_callback" as watch object');	//DEFPRINT(AST_SimpleStatement 688

console.log("");	//DEFPRINT(AST_SimpleStatement 689

console.log("default value of \t\ttest_setter \t\t= ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 690

console.log("default value of \t\tset_from_callback \t= ", v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 691

console.log("");	//DEFPRINT(AST_SimpleStatement 692

console.log('set test_setter to "value1"');	//DEFPRINT(AST_SimpleStatement 693

v.test_setter = "value1";	//DEFPRINT(AST_SimpleStatement 694

console.log("set set_from_callback's reference to test_setter");	//DEFPRINT(AST_SimpleStatement 695

v.setattr("set_from_callback", v.test_setter);	//DEFPRINT(AST_SimpleStatement 696

console.log('read value of "test_setter" \t\t= ', v.test_setter);	//DEFPRINT(AST_SimpleStatement 697

console.log('read value of "set_from_callback" \t= ', v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 698

console.log("");	//DEFPRINT(AST_SimpleStatement 699

console.log("alter value of test_setter to 'value2', to see if set_from_callback value changes!");	//DEFPRINT(AST_SimpleStatement 700

v.test_setter = "value2";	//DEFPRINT(AST_SimpleStatement 702

console.log("set_from_callback value = ", v.set_from_callback, " v.test_setter = ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 703
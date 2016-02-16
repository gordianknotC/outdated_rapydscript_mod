function _$rapyd$_bind(fn, thisArg) {
    if (fn.orig) fn = fn.orig;
    var ret = function() {
        return fn.apply(thisArg, arguments);
    }
    ret.orig = fn;
    return ret;
}

function _$rapyd$_unbindAll(thisArg, rebind) {
	return
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
            else thisArg[p] = thisArg[p].orig;
        }
    }
}
function range(start, stop, step) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    var length = Math.max (Math.ceil ((stop - start) / step) , 0);
    var idx = 0;
    var range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function len(obj) {
    if (obj instanceof Array || typeof obj === "string") return obj.length;
    else {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) count++;
        }
        return count;
    }
}
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
    else return val in arr;
}
function setattr(obj, name, value) {
    obj[name] = value;
}
JSON = JSON || {};

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
	;
}

str = JSON.stringify;

function ValueError(message){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.name = "ValueError";
    self.message = message;
};
ValueError.prototype = new Error();
ValueError.prototype.constructor = ValueError;
_$rapyd$_unbindAll(ValueError.prototype);

String.prototype.find = Array.prototype.indexOf;

String.prototype.strip = String.prototype.trim;

String.prototype.lstrip = String.prototype.trimLeft;

String.prototype.rstrip = String.prototype.trimRight;

String.prototype.join = function(iterable) {
    _$rapyd$_unbindAll(this, true);
    return iterable.join(this);
};

String.prototype.zfill = function(size) {
    _$rapyd$_unbindAll(this, true);
    var s, s;
    s = this;
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
};

function list(iterable) {
    if (typeof iterable === "undefined") iterable = [];
    _$rapyd$_unbindAll(this, true);
    var result, i;
    result = [];
    var _$rapyd$_Iter0 = iterable;
    for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
        i = _$rapyd$_Iter0[_$rapyd$_Index0];
        result.append(i);
    }
    return result;
}

Array.prototype.append = Array.prototype.push;

Array.prototype.find = Array.prototype.indexOf;

Array.prototype.index = function(index) {
    _$rapyd$_unbindAll(this, true);
    var val;
    val = this.find(index);
    if (val == -1) {
        throw new ValueError(str(index) + " is not in list");
    }
    return val;
};

Array.prototype.insert = function(index, item) {
    _$rapyd$_unbindAll(this, true);
    this.splice(index, 0, item);
};

Array.prototype.pop = function(index) {
    if (typeof index === "undefined") index = this.length - 1;
    _$rapyd$_unbindAll(this, true);
    return this.splice(index, 1)[0];
};

Array.prototype.extend = function(array2) {
    _$rapyd$_unbindAll(this, true);
    this.push.apply(this, array2);
};

Array.prototype.remove = function(item) {
    _$rapyd$_unbindAll(this, true);
    var index;
    index = this.find(item);
    this.splice(index, 1);
};

Array.prototype.copy = function() {
    _$rapyd$_unbindAll(this, true);
    return this.slice(0);
};

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
	;
}

function map(oper, arr) {
    _$rapyd$_unbindAll(this, true);
    return arr.map(oper);
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
	;
}

function filter(oper, arr) {
    _$rapyd$_unbindAll(this, true);
    return arr.filter(oper);
}

function dict(iterable) {
    _$rapyd$_unbindAll(this, true);
    var result, key;
    result = {};
    var _$rapyd$_Iter1 = iterable;
    for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
        key = _$rapyd$_Iter1[_$rapyd$_Index1];
        result[key] = iterable[key];
    }
    return result;
}

if (typeof Object.getOwnPropertyNames !== "function") {
    dict.keys = function(hash) {
        _$rapyd$_unbindAll(this, true);
        var keys;
        keys = [];
        
		for (var x in hash) {
			if (hash.hasOwnProperty(x)) {
				keys.push(x);
			}
		}
		;
        return keys;
    };
} else {
    dict.keys = function(hash) {
        _$rapyd$_unbindAll(this, true);
        return Object.getOwnPropertyNames(hash);
    };
}

dict.values = function(hash) {
    _$rapyd$_unbindAll(this, true);
    var vals, key;
    vals = [];
    var _$rapyd$_Iter2 = dict.keys(hash);
    for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
        key = _$rapyd$_Iter2[_$rapyd$_Index2];
        vals.append(hash[key]);
    }
    return vals;
};

dict.items = function(hash) {
    _$rapyd$_unbindAll(this, true);
    var items, key;
    items = [];
    var _$rapyd$_Iter3 = dict.keys(hash);
    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
        key = _$rapyd$_Iter3[_$rapyd$_Index3];
        items.append([key, hash[key]]);
    }
    return items;
};

dict.copy = dict;

dict.clear = function(hash) {
    _$rapyd$_unbindAll(this, true);
    var key;
    var _$rapyd$_Iter4 = dict.keys(hash);
    for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
        key = _$rapyd$_Iter4[_$rapyd$_Index4];
        delete hash[key];
    }
};

JSON = JSON || {};

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
	;
}

function ValueError(message){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.name = "ValueError";
    self.message = message;
};
ValueError.prototype = new Error();
ValueError.prototype.constructor = ValueError;
_$rapyd$_unbindAll(ValueError.prototype);

function str(elem){
    var self = this;
    if (typeof elem === "undefined") elem = "";
    _$rapyd$_unbindAll(this, true);
    this.find = _$rapyd$_bind(this.find, this);
    this.strip = _$rapyd$_bind(this.strip, this);
    this.lstrip = _$rapyd$_bind(this.lstrip, this);
    this.rstrip = _$rapyd$_bind(this.rstrip, this);
    this.join = _$rapyd$_bind(this.join, this);
    this.zfill = _$rapyd$_bind(this.zfill, this);
    this.replace = _$rapyd$_bind(this.replace, this);
    this.toString = _$rapyd$_bind(this.toString, this);
    this.toSource = _$rapyd$_bind(this.toSource, this);
    this.valueOf = _$rapyd$_bind(this.valueOf, this);
    elem = new String(elem);
    String.prototype.constructor.call(self, elem);
    self._str = elem;
};
str.prototype = new String();
str.prototype.constructor = str;
_$rapyd$_unbindAll(str.prototype);
str.prototype.find = function(elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return self._str.indexOf(elem);
};
str.prototype.strip = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new str(self._str.trim());
};
str.prototype.lstrip = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new str(self._str.trimLeft());
};
str.prototype.rstrip = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new str(self._str.trimRight());
};
str.prototype.join = function(iterable){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new str(iterable.join(self._str));
};
str.prototype.zfill = function(size){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var s, s;
    s = self._str;
    while (s.length < size) {
        s = "0" + s;
    }
    return new str(s);
};
str.prototype.replace = function(orig, sub, n){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var s, s, s;
    s = self._str;
    if (n) {
        for (n = 0; n < len(n); n++) {
            s = String.prototype.replace.call(s, orig, sub);
        }
    } else {
        s = String.prototype.replace.call(s, new RegExp(orig, "g"), sub);
    }
    return new str(s);
};
str.prototype.toString = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return self._str;
};
str.prototype.toSource = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return '"' + self._str + '"';
};
str.prototype.valueOf = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return self._str;
};

function list(iterable){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.append = _$rapyd$_bind(this.append, this);
    this.find = _$rapyd$_bind(this.find, this);
    this.index = _$rapyd$_bind(this.index, this);
    this.insert = _$rapyd$_bind(this.insert, this);
    this.pop = _$rapyd$_bind(this.pop, this);
    this.extend = _$rapyd$_bind(this.extend, this);
    this.remove = _$rapyd$_bind(this.remove, this);
    this.copy = _$rapyd$_bind(this.copy, this);
    this.toSource = _$rapyd$_bind(this.toSource, this);
    var elem;
    var _$rapyd$_Iter5 = iterable;
    for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
        elem = _$rapyd$_Iter5[_$rapyd$_Index5];
        Array.prototype.push.call(self, elem);
    }
};
list.prototype = new Array();
list.prototype.constructor = list;
_$rapyd$_unbindAll(list.prototype);
list.prototype.append = function(elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.push(elem);
};
list.prototype.find = function(elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return self.indexOf(elem);
};
list.prototype.index = function(elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var val;
    val = self.find(elem);
    if (val == -1) {
        throw new ValueError(new str(elem) + " is not in list");
    }
    return val;
};
list.prototype.insert = function(index, elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.splice(index, 0, elem);
};
list.prototype.pop = function(index){
    var self = this;
    if (typeof index === "undefined") index = len(self) - 1;
    _$rapyd$_unbindAll(this, true);
    return self.splice(index, 1)[0];
};
list.prototype.extend = function(list2){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.push.apply(self, [].concat(list2));
};
list.prototype.remove = function(elem){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var index;
    index = self.find(elem);
    self.pop(index);
};
list.prototype.copy = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new list(self);
};
list.prototype.toSource = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return "[" + self + "]";
};

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
	;
}

function map(oper, arr) {
    _$rapyd$_unbindAll(this, true);
    return new list(arr.map(oper));
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
	;
}

function filter(oper, arr) {
    _$rapyd$_unbindAll(this, true);
    return new list(arr.filter(oper));
}

function dict(hashlike){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.keys = _$rapyd$_bind(this.keys, this);
    this.values = _$rapyd$_bind(this.values, this);
    this.items = _$rapyd$_bind(this.items, this);
    this.copy = _$rapyd$_bind(this.copy, this);
    this.clear = _$rapyd$_bind(this.clear, this);
    var key;
    var _$rapyd$_Iter6 = hashlike;
    for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
        key = _$rapyd$_Iter6[_$rapyd$_Index6];
        self[key] = hashlike[key];
    }
};
dict.prototype = new Object();
dict.prototype.constructor = dict;
_$rapyd$_unbindAll(dict.prototype);
dict.prototype.keys = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var keys;
    if (typeof Object.getOwnPropertyNames === "function") {
        return Object.getOwnPropertyNames(self);
    } else {
        keys = [];
        
			for (var x in self) {
				if (self.hasOwnProperty(x)) keys.push(x);
			}
			;
        return keys;
    }
};
dict.prototype.values = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var vals, key;
    vals = [];
    var _$rapyd$_Iter7 = dict.prototype.keys.call(self);
    for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
        key = _$rapyd$_Iter7[_$rapyd$_Index7];
        vals.push(self[key]);
    }
    return vals;
};
dict.prototype.items = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var items, key;
    items = [];
    var _$rapyd$_Iter8 = dict.prototype.keys.call(self);
    for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
        key = _$rapyd$_Iter8[_$rapyd$_Index8];
        items.push([key, self[key]]);
    }
    return items;
};
dict.prototype.copy = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    return new dict(self);
};
dict.prototype.clear = function(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var key;
    var _$rapyd$_Iter9 = dict.prototype.keys.call(self);
    for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
        key = _$rapyd$_Iter9[_$rapyd$_Index9];
        delete self[key];
    }
};

function isEmpty(n) {
    _$rapyd$_unbindAll(this, true);
    var key;
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;
        }
        var _$rapyd$_Iter10 = dict.prototype.keys.call(n);
        for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
            key = _$rapyd$_Iter10[_$rapyd$_Index10];
            return false;
        }
        return true;
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;
        } else {
            return true;
        }
    }
    if (n) {
        return false;
    } else {
        return true;
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    _$rapyd$_unbindAll(this, true);
    var tmp, tmp, i, fn, ins;
    tmp = "";
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";
    }
    fn = arguments[0];
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");
    return ins;
}

function set_scope(module_path) {
    _$rapyd$_unbindAll(this, true);
    var scope;
    scope = {};
    scope.__module__ = module_path;
    return scope;
}

function module(fn_module) {
    _$rapyd$_unbindAll(this, true);
    var module_member_data, scope_attrs, scope, _filter, is_k_in_filter, k, v, key, value, attr;
    function getAllExcept(lst, _module) {
        _$rapyd$_unbindAll(this, true);
        function wrapper() {
            _$rapyd$_unbindAll(this, true);
            var name, _filter, tmp, m, is_k_in_filter, k, v;
            name = _module.name;
            _filter = lst;
            tmp = {};
            m = eval(name).prototype;
            var _$rapyd$_Iter11 = dict.prototype.items.call(m);
            for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
                _$rapyd$_Unpack = _$rapyd$_Iter11[_$rapyd$_Index11];
                k = _$rapyd$_Unpack[0];
                v = _$rapyd$_Unpack[1];
                is_k_in_filter = _$rapyd$_in(k, _filter);
                if (!is_k_in_filter) {
                    tmp[k] = v;
                }
            }
            return tmp;
        }
        return wrapper;
    }
    if (isEmpty(fn_module.prototype)) {
        module_member_data = fn_module();
        module_member_data.ALL = getAllExcept([ "ALL", "scope" ], fn_module);
        scope_attrs = [];
        scope = module_member_data.scope;
        _filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__", "__module__" ];
        var _$rapyd$_Iter12 = dict.prototype.items.call(module_member_data);
        for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
            _$rapyd$_Unpack = _$rapyd$_Iter12[_$rapyd$_Index12];
            key = _$rapyd$_Unpack[0];
            value = _$rapyd$_Unpack[1];
            if (key == "scope") {
                var _$rapyd$_Iter13 = dict.prototype.items.call(value);
                for (var _$rapyd$_Index13 = 0; _$rapyd$_Index13 < _$rapyd$_Iter13.length; _$rapyd$_Index13++) {
                    _$rapyd$_Unpack = _$rapyd$_Iter13[_$rapyd$_Index13];
                    k = _$rapyd$_Unpack[0];
                    v = _$rapyd$_Unpack[1];
                    is_k_in_filter = _$rapyd$_in(k, _filter);
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);
                        if (isEmpty(module_member_data[k])) {
                            module_member_data[k] = v;
                        } else {
                            throw "[Error][Naming Confliction]module-scope variable: [" + k + "] interfere with module member: [" + k + "]";
                        }
                        scope["_" + k] = v;
                        scope_attrs.push(k);
                    }
                }
            }
        }
        module_member_data["scope"] = scope;
        fn_module.prototype = module_member_data;
        function setter_callback(scope_obj, _attr) {
            _$rapyd$_unbindAll(this, true);
            function wrapper(_value) {
                _$rapyd$_unbindAll(this, true);
                eval(scope_obj.__module__).prototype.scope["_$_" + _attr] = _value;
            }
            return wrapper;
        }
        function getter_callback(scope_obj, _attr) {
            _$rapyd$_unbindAll(this, true);
            function wrapper() {
                _$rapyd$_unbindAll(this, true);
                return eval(scope_obj.__module__).prototype.scope["_$_" + _attr];
            }
            return wrapper;
        }
        var _$rapyd$_Iter14 = scope_attrs;
        for (var _$rapyd$_Index14 = 0; _$rapyd$_Index14 < _$rapyd$_Iter14.length; _$rapyd$_Index14++) {
            attr = _$rapyd$_Iter14[_$rapyd$_Index14];
            console.log("set getter and setter for ", attr);
            scope.__defineSetter__(attr, setter_callback(scope, attr));
            scope.__defineGetter__(attr, getter_callback(scope, attr));
        }
        fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr));
        fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr));
        fn_module.prototype.prototype = fn_module.prototype;
        return fn_module.prototype;
    } else {
        return fn_module.prototype;
    }
}

function class_properties(cls, props) {
    _$rapyd$_unbindAll(this, true);
    var k, v;
    if (!cls.prototype.__classproperty__) {
        console.log("set class properties:::");
        var _$rapyd$_Iter15 = dict.prototype.items.call(props);
        for (var _$rapyd$_Index15 = 0; _$rapyd$_Index15 < _$rapyd$_Iter15.length; _$rapyd$_Index15++) {
            _$rapyd$_Unpack = _$rapyd$_Iter15[_$rapyd$_Index15];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            setattr(cls.prototype, k, v);
            console.log(k, v);
        }
        cls.prototype.__classproperty__ = true;
    }
}

function moduleA() {
    _$rapyd$_unbindAll(this, true);
    var scope, r;
    scope = set_scope("moduleA");
    scope.module_variableB = 2;
    scope.module_variableA = 1;
    function RapydWeb() {
        this.get_variableA = _$rapyd$_bind(this.get_variableA, this);
        this.echo = _$rapyd$_bind(this.echo, this);
    }
    RapydWeb.prototype.get_variableA = function(){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        console.log("[moduleA][get_variableA] ", scope.module_variableA);
    };
    RapydWeb.prototype.echo = function(s){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        if (self.debug) {
            return s;
        }
    };
    RapydWeb.prototype.debug = false;
    function Controller() {
        this.get_module_variableA = _$rapyd$_bind(this.get_module_variableA, this);
        this.set_module_variableA = _$rapyd$_bind(this.set_module_variableA, this);
        RapydWeb.prototype.constructor.apply(this, arguments);
    }
    Controller.prototype = new RapydWeb();
    Controller.prototype.constructor = Controller;
    _$rapyd$_unbindAll(Controller.prototype);
    Controller.prototype.get_module_variableA = function(){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        console.log("\t[moduleA][Controller][Get] module_variableA = ", scope.module_variableA);
    };
    Controller.prototype.set_module_variableA = function(value){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        console.log("\t[moduleA][Controller][Set] set moduleA's module_variableA to", value);
        scope.module_variableA = value;
    };
    r = new RapydWeb();
    r.get_variableA();
    return {
        RapydWeb: RapydWeb,
        Controller: Controller,
        scope: scope
    };
}

function moduleB() {
    _$rapyd$_unbindAll(this, true);
    var core, RapydWeb, Controller, scope_A;
    core = module(moduleA);
    console.log('\t[moduleB] set moduleA"s debug mode to True');
    core.RapydWeb.prototype.debug = true;
    _$rapyd$_Unpack = [core.RapydWeb, core.Controller, core.scope];
    RapydWeb = _$rapyd$_Unpack[0];
    Controller = _$rapyd$_Unpack[1];
    scope_A = _$rapyd$_Unpack[2];
    function BlogController() {
        Controller.prototype.constructor.apply(this, arguments);
    }
    BlogController.prototype = new Controller();
    BlogController.prototype.constructor = BlogController;
    _$rapyd$_unbindAll(BlogController.prototype);
    function ModController() {
        this.get_module_variableA = _$rapyd$_bind(this.get_module_variableA, this);
        this.set_module_variableA = _$rapyd$_bind(this.set_module_variableA, this);
        Controller.prototype.constructor.apply(this, arguments);
    }
    ModController.prototype = new Controller();
    ModController.prototype.constructor = ModController;
    _$rapyd$_unbindAll(ModController.prototype);
    ModController.prototype.get_module_variableA = function(){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        console.log("\t[moduleB][ModController][Get] module_variableA = ", scope_A.module_variableA);
    };
    ModController.prototype.set_module_variableA = function(value){
        var self = this;
        _$rapyd$_unbindAll(this, true);
        console.log("\t[moduleB][ModController][Set] set scopeA's module_variableA to", value);
        scope_A.module_variableA = value;
    };
    return {
        BlogController: BlogController,
        ModController: ModController
    };
}

core = module(moduleA);

rapyd = cls(core.RapydWeb, "init");

rapyd.c = cls(core.Controller, "init");

console.log("===== test for class property of RapydWeb inside moduleA =====================");

console.log("");

console.log('----- change moduleA"s debug mode from main scope-----');

console.log("\tdefault debug mode of moduleA = ", rapyd.debug);

console.log("\techo = ", rapyd.c.echo("[moduleA.controller.echo]") || "no output");

console.log("\tset moduleA's debug mode to True from outer scope of moduleA");

core.RapydWeb.prototype.debug = true;

console.log("\tcurrent debug mode = ", rapyd.debug);

console.log("\techo = ", rapyd.c.echo("[moduleA.controller.echo]" || "no output"));

console.log("\tset moduleA's debug mode to False from outer scope of moduleA");

core.RapydWeb.prototype.debug = false;

console.log("");

console.log('----- change moduleA"s debug mode from moduleB -----');

console.log("\tbefore initialize moduleB, debug mode = ", rapyd.debug);

app = module(moduleB);

console.log("\tafter initialize moduleB, debug mode = ", rapyd.debug);

rapyd.c.blog = cls(app.BlogController, "init");

rapyd.c.mod = cls(app.ModController, "init");

console.log("\techo = ", rapyd.c.blog.echo("[moduleBblogg.echo]" || "no output"));

console.log("");

console.log("");

console.log("===== test for module-scope variable =====================");

console.log("");

console.log("");

rapyd.c.get_module_variableA();

rapyd.c.set_module_variableA("A1");

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);

rapyd.c.get_module_variableA();

rapyd.c.mod.get_module_variableA();

rapyd.c.mod.set_module_variableA("B1");

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);

rapyd.c.mod.get_module_variableA();

rapyd.c.get_module_variableA();

rapyd.c.mod.set_module_variableA("B2");

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);

rapyd.c.mod.get_module_variableA();

rapyd.c.get_module_variableA();
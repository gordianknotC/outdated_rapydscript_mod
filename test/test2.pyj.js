function _$rapyd$_bind(fn, thisArg) {
    if (fn.bound) return fn;
    fn.bound = true;
    return function() {
        return fn.apply(thisArg, arguments);
    };
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
    self.name = "ValueError";
    self.message = message;
};
ValueError.prototype = new Error();
ValueError.prototype.constructor = ValueError;

String.prototype.find = Array.prototype.indexOf;

String.prototype.strip = String.prototype.trim;

String.prototype.lstrip = String.prototype.trimLeft;

String.prototype.rstrip = String.prototype.trimRight;

String.prototype.join = function(iterable) {
    return iterable.join(this);
};

String.prototype.zfill = function(size) {
    var s, s;
    s = this;
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
};

function list(iterable) {
    if (typeof iterable === "undefined") iterable = [];
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
    var val;
    val = this.find(index);
    if (val == -1) {
        throw new ValueError(str(index) + " is not in list");
    }
    return val;
};

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

Array.prototype.pop = function(index) {
    if (typeof index === "undefined") index = this.length - 1;
    return this.splice(index, 1)[0];
};

Array.prototype.extend = function(array2) {
    this.push.apply(this, array2);
};

Array.prototype.remove = function(item) {
    var index;
    index = this.find(item);
    this.splice(index, 1);
};

Array.prototype.copy = function() {
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
    return arr.filter(oper);
}

function dict(iterable) {
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
        return Object.getOwnPropertyNames(hash);
    };
}

dict.values = function(hash) {
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
    self.name = "ValueError";
    self.message = message;
};
ValueError.prototype = new Error();
ValueError.prototype.constructor = ValueError;

function str(elem){
    var self = this;
    if (typeof elem === "undefined") elem = "";
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
str.prototype.find = function(elem){
    var self = this;
    return self._str.indexOf(elem);
};
str.prototype.strip = function(){
    var self = this;
    return new str(self._str.trim());
};
str.prototype.lstrip = function(){
    var self = this;
    return new str(self._str.trimLeft());
};
str.prototype.rstrip = function(){
    var self = this;
    return new str(self._str.trimRight());
};
str.prototype.join = function(iterable){
    var self = this;
    return new str(iterable.join(self._str));
};
str.prototype.zfill = function(size){
    var self = this;
    var s, s;
    s = self._str;
    while (s.length < size) {
        s = "0" + s;
    }
    return new str(s);
};
str.prototype.replace = function(orig, sub, n){
    var self = this;
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
    return self._str;
};
str.prototype.toSource = function(){
    var self = this;
    return '"' + self._str + '"';
};
str.prototype.valueOf = function(){
    var self = this;
    return self._str;
};

function list(iterable){
    var self = this;
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
list.prototype.append = function(elem){
    var self = this;
    self.push(elem);
};
list.prototype.find = function(elem){
    var self = this;
    return self.indexOf(elem);
};
list.prototype.index = function(elem){
    var self = this;
    var val;
    val = self.find(elem);
    if (val == -1) {
        throw new ValueError(new str(elem) + " is not in list");
    }
    return val;
};
list.prototype.insert = function(index, elem){
    var self = this;
    self.splice(index, 0, elem);
};
list.prototype.pop = function(index){
    var self = this;
    if (typeof index === "undefined") index = len(self) - 1;
    return self.splice(index, 1)[0];
};
list.prototype.extend = function(list2){
    var self = this;
    self.push.apply(self, [].concat(list2));
};
list.prototype.remove = function(elem){
    var self = this;
    var index;
    index = self.find(elem);
    self.pop(index);
};
list.prototype.copy = function(){
    var self = this;
    return new list(self);
};
list.prototype.toSource = function(){
    var self = this;
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
    return new list(arr.filter(oper));
}

function dict(hashlike){
    var self = this;
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
dict.prototype.keys = function(){
    var self = this;
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
    return new dict(self);
};
dict.prototype.clear = function(){
    var self = this;
    var key;
    var _$rapyd$_Iter9 = dict.prototype.keys.call(self);
    for (var _$rapyd$_Index9 = 0; _$rapyd$_Index9 < _$rapyd$_Iter9.length; _$rapyd$_Index9++) {
        key = _$rapyd$_Iter9[_$rapyd$_Index9];
        delete self[key];
    }
};

__author__ = "gordiaknot";

JamalInstance = "rapyd";

arguments = null;

function class_properties(cls, props) {
    var k, v;
    if (!cls.prototype.__classproperty__) {
        var _$rapyd$_Iter10 = dict.prototype.items.call(props);
        for (var _$rapyd$_Index10 = 0; _$rapyd$_Index10 < _$rapyd$_Iter10.length; _$rapyd$_Index10++) {
            _$rapyd$_Unpack = _$rapyd$_Iter10[_$rapyd$_Index10];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            setattr(cls.prototype, k, v);
        }
        cls.prototype.__classproperty__ = true;
    }
}

function RapydWeb(){
    var self = this;
    this.getJamalInstance = _$rapyd$_bind(this.getJamalInstance, this);
    this.__init = _$rapyd$_bind(this.__init, this);
    this.start = _$rapyd$_bind(this.start, this);
    this.configure = _$rapyd$_bind(this.configure, this);
    this.log = _$rapyd$_bind(this.log, this);
    this.error = _$rapyd$_bind(this.error, this);
    this.__linkJamalProto__ = _$rapyd$_bind(this.__linkJamalProto__, this);
    this.__linkMVCMediatorProto__ = _$rapyd$_bind(this.__linkMVCMediatorProto__, this);
    class_properties(RapydWeb, {
        "m": [],
        "v": [],
        "c": [],
        "action": "temp",
        "debug": "debug",
        "components": [],
        "config": [],
        "__instance__": {}
    });
    self.__instance__["RapydWeb"] = self;
};
RapydWeb.prototype.getJamalInstance = function(){
    var self = this;
    return eval(JamalInstance);
};
RapydWeb.prototype.__init = function(name, successor){
    var self = this;
    self.__instance__["RapydWeb"][name] = successor;
    self.__instance__[name] = successor;
};
RapydWeb.prototype.start = function(){
    var self = this;
};
RapydWeb.prototype.configure = function(){
    var self = this;
    " initialize all configuration";
};
RapydWeb.prototype.log = function(){
    var self = this;
    console.log(self.log.caller.name, arguments);
};
RapydWeb.prototype.error = function(){
    var self = this;
    console.error(self.error.caller.name, arguments);
};
RapydWeb.prototype.__linkJamalProto__ = function(successor){
    var self = this;
    successor.__proto__ = eval(JamalInstance);
};
RapydWeb.prototype.__linkMVCMediatorProto__ = function(successor){
    var self = this;
};

rapyd = new RapydWeb();

function Controller(){
    var self = this;
    this.init = _$rapyd$_bind(this.init, this);
    this.__getattr__ = _$rapyd$_bind(this.__getattr__, this);
    this.__get__ = _$rapyd$_bind(this.__get__, this);
    this.__actionInit = _$rapyd$_bind(this.__actionInit, this);
    this.actionPropStructure = _$rapyd$_bind(this.actionPropStructure, this);
    this.checkActionsAvailable = _$rapyd$_bind(this.checkActionsAvailable, this);
    this.__components_init = _$rapyd$_bind(this.__components_init, this);
    this.__beforAction = _$rapyd$_bind(this.__beforAction, this);
    this.beforeAction = _$rapyd$_bind(this.beforeAction, this);
    this.afterAction = _$rapyd$_bind(this.afterAction, this);
    this.__afterAction = _$rapyd$_bind(this.__afterAction, this);
    this.__startRender = _$rapyd$_bind(this.__startRender, this);
    class_properties(Controller, {
        "__actions__": {},
        "__components__": {}
    });
    self.__proto__.__init("c", self);
    self.log("__proto__ = ", self.__proto__);
    self.log("prototype = ", self.prototype);
};
Controller.prototype = new RapydWeb();
Controller.prototype.constructor = Controller;
Controller.prototype.init = function(controller_instance, name, successor){
    var self = this;
    "\n\t\tinit alwasys call from its successor:\n\n\t\tin this scope self was originally direct to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, the following code just replace successor's super instance with controller_intance in which we specified\n\t\t";
    successor.__proto__ = controller_instance;
    controller_instance = successor.__proto__;
    controller_instance[name] = self;
    controller_instance.__components_init(name, successor);
    controller_instance.__actionInit(name, successor);
};
Controller.prototype.__getattr__ = function(item){
    var self = this;
    print;
    item;
};
Controller.prototype.__get__ = function(instance, owner){
    var self = this;
    print;
    [instance, owner];
};
Controller.prototype.__actionInit = function(name, successor){
    var self = this;
    var action;
    self.checkActionsAvailable(name, successor);
    if (!self.__actions[name]) {
        self.__actions[name] = {};
    }
    self.log("pass blog in __actions", self.__actions);
    self.log("successor actions = ", successor.actions);
    var _$rapyd$_Iter11 = successor.actions;
    for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
        action = _$rapyd$_Iter11[_$rapyd$_Index11];
        self.__actions[name][action] = self.actionPropStructure();
    }
};
Controller.prototype.actionPropStructure = function(){
    var self = this;
    var r;
    r = {
        "views": [],
        "props": {}
    };
    return r;
};
Controller.prototype.checkActionsAvailable = function(name, successor){
    var self = this;
    var action;
    self.log(name, successor);
    self.log(successor.actions);
    var _$rapyd$_Iter12 = successor.actions;
    for (var _$rapyd$_Index12 = 0; _$rapyd$_Index12 < _$rapyd$_Iter12.length; _$rapyd$_Index12++) {
        action = _$rapyd$_Iter12[_$rapyd$_Index12];
        if (!successor[action]) {
            self.error("actions [{0}] not exists", action);
            return false;
        }
    }
};
Controller.prototype.__components_init = function(name, successor){
    var self = this;
    if (successor.components) {
        if (!self.__components[name]) {
            self.__components[name] = [];
        }
        self.__components[name] = successor.components;
    }
};
Controller.prototype.__beforAction = function(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.beforeAction(f, args);
};
Controller.prototype.beforeAction = function(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};
Controller.prototype.afterAction = function(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};
Controller.prototype.__afterAction = function(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.__startRender(f, args);
};
Controller.prototype.__startRender = function(){
    var self = this;
};

C = new Controller();

console.log("------------ start -----------");

console.log(C);
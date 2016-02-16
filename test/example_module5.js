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
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") return arr.indexOf(val) != -1;
    else return val in arr;
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

function isEmpty(n) {
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
    var tmp, tmp, i, fn, ins;
    tmp = "";
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";
    }
    fn = arguments[0];
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");
    return ins;
}

function set_scope(module) {
    function scope(v) {
        var m;
        m = eval(module);
        if (v) {
            return m.prototype[v];
        } else {
            return m.prototype;
        }
    }
    return scope;
}

function module(module) {
    var data, filter, is_k_in_filter, k, v, key, value;
    function getAllExcept(lst, module) {
        function wrapper() {
            var name, filter, tmp, m, is_k_in_filter, k, v;
            name = module.name;
            filter = lst;
            tmp = {};
            m = eval(name).prototype;
            var _$rapyd$_Iter11 = dict.prototype.items.call(m);
            for (var _$rapyd$_Index11 = 0; _$rapyd$_Index11 < _$rapyd$_Iter11.length; _$rapyd$_Index11++) {
                _$rapyd$_Unpack = _$rapyd$_Iter11[_$rapyd$_Index11];
                k = _$rapyd$_Unpack[0];
                v = _$rapyd$_Unpack[1];
                is_k_in_filter = _$rapyd$_in(k, filter);
                if (!is_k_in_filter) {
                    tmp[k] = v;
                }
            }
            return tmp;
        }
        return wrapper;
    }
    if (isEmpty(module.prototype)) {
        data = module();
        data.ALL = getAllExcept([ "ALL", "scope" ], module);
        filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__" ];
        var _$rapyd$_Iter12 = dict.prototype.items.call(data);
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
                    is_k_in_filter = _$rapyd$_in(k, filter);
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);
                        data[k] = v;
                    }
                }
            }
        }
        module.prototype = data;
        return module.prototype;
    } else {
        return module.prototype;
    }
}

function rapydmvc() {
    var scope;
    scope = set_scope("rapydmvc");
    scope.module_variableB = 2;
    scope.module_varialbeA = 1;
    function RapydWeb() {}
    RapydWeb.prototype.echo = function(){
        var self = this;
        if (self.debug) {
            console.log("scope = ", scope());
            console.log("module_variable = ", scope.module_varialbeA);
        }
    };
    RapydWeb.prototype.debug = false;
    function Controller() {
        RapydWeb.prototype.constructor.apply(this, arguments);
    }
    Controller.prototype = new RapydWeb();
    Controller.prototype.constructor = Controller;
    function View() {
        RapydWeb.prototype.constructor.apply(this, arguments);
    }
    View.prototype = new RapydWeb();
    View.prototype.constructor = View;
    function Model() {
        RapydWeb.prototype.constructor.apply(this, arguments);
    }
    Model.prototype = new RapydWeb();
    Model.prototype.constructor = Model;
    function Mediator() {
        RapydWeb.prototype.constructor.apply(this, arguments);
    }
    Mediator.prototype = new RapydWeb();
    Mediator.prototype.constructor = Mediator;
    return {
        RapydWeb: RapydWeb,
        Controller: Controller,
        View: View,
        Model: Model,
        Mediator: Mediator,
        scope: scope
    };
}

function mvcapp() {
    var core, RapydWeb, Mediator, Controller, View;
    core = module(rapydmvc);
    core.RapydWeb.prototype.debug = true;
    _$rapyd$_Unpack = [core.RapydWeb, core.Mediator, core.Controller, core.View];
    RapydWeb = _$rapyd$_Unpack[0];
    Mediator = _$rapyd$_Unpack[1];
    Controller = _$rapyd$_Unpack[2];
    View = _$rapyd$_Unpack[3];
    function ViewMediator() {
        Mediator.prototype.constructor.apply(this, arguments);
    }
    ViewMediator.prototype = new Mediator();
    ViewMediator.prototype.constructor = ViewMediator;
    function BlogController() {
        Controller.prototype.constructor.apply(this, arguments);
    }
    BlogController.prototype = new Controller();
    BlogController.prototype.constructor = BlogController;
    function VoclistController() {
        Controller.prototype.constructor.apply(this, arguments);
    }
    VoclistController.prototype = new Controller();
    VoclistController.prototype.constructor = VoclistController;
    function BlogView() {
        View.prototype.constructor.apply(this, arguments);
    }
    BlogView.prototype = new View();
    BlogView.prototype.constructor = BlogView;
    return {
        ViewMediator: ViewMediator,
        BlogController: BlogController,
        VoclistController: VoclistController,
        BlogView: BlogView
    };
}

core = module(rapydmvc);

rapyd = cls(core.RapydWeb, "init");

rapyd.c = cls(core.Controller, "init");

rapyd.m = cls(core.Model, "init");

rapyd.v = cls(core.View, "init");

rapyd.mediator = cls(core.Mediator, "init");

rapyd.debug;

rapyd.c.echo();

core.RapydWeb.prototype.debug = true;

rapyd.debug;

rapyd.m.echo();

core.RapydWeb.prototype.debug = false;

app = module(mvcapp);

rapyd.c.blog = cls(app.BlogController, "init");

rapyd.c.voclist = cls(app.VoclistController, "init");

rapyd.c.blog.echo();

rapyd.c.voclist.echo();

rapyd.debug;
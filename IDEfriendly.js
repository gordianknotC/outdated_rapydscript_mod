__author__ = "gordiaknot";	//DEFPRINT(AST_SimpleStatement 2

function insert(lst, index, value) {
    var l, r, l;	//complex body AST_Scope declare var as local
    value = [ value ];	//DEFPRINT(AST_SimpleStatement 4
    l = lst.slice(0, index);	//DEFPRINT(AST_SimpleStatement 5
    r = lst.slice(index);	//DEFPRINT(AST_SimpleStatement 6
    l = l.concat(value);	//DEFPRINT(AST_SimpleStatement 7
    return l.concat(r);	//AST_Exit.DEFMETHOD( 8
}

function isEmpty(n) {
    var key;	//complex body AST_Scope declare var as local
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;	//AST_Exit.DEFMETHOD( 11
        }
        var _$iter0 = dict.keys(n);
        for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
            key = _$iter0[_$id0];
            return false;	//AST_Exit.DEFMETHOD( 13
        }
        return true;	//AST_Exit.DEFMETHOD( 14
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;	//AST_Exit.DEFMETHOD( 18
        } else {
            return true;	//AST_Exit.DEFMETHOD( 20
        }
    }
    if (n) {
        return false;	//AST_Exit.DEFMETHOD( 23
    } else {
        return true;	//AST_Exit.DEFMETHOD( 25
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    var tmp, tmp, i, fn, ins;	//complex body AST_Scope declare var as local
    tmp = "";	//DEFPRINT(AST_SimpleStatement 27
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";	//DEFPRINT(AST_SimpleStatement 29
    }
    fn = arguments[0];	//DEFPRINT(AST_SimpleStatement 30
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");	//DEFPRINT(AST_SimpleStatement 31
    return ins;	//AST_Exit.DEFMETHOD( 32
}

function set_scope(module_path) {
    var scope;	//complex body AST_Scope declare var as local
    scope = {};	//DEFPRINT(AST_SimpleStatement 34
    scope.__module__ = module_path;	//DEFPRINT(AST_SimpleStatement 35
    return scope;	//AST_Exit.DEFMETHOD( 36
}

function module(fn_module) {
    var module_member_data, scope_attrs, scope, _filter, is_k_in_filter, k, v, key, value, attr;	//complex body AST_Scope declare var as local
    function getAllExcept(lst, _module) {
        function wrapper() {
            var name, _filter, tmp, m, is_k_in_filter, k, v;	//complex body AST_Scope declare var as local
            name = _module.name;	//DEFPRINT(AST_SimpleStatement 40
            _filter = lst;	//DEFPRINT(AST_SimpleStatement 41
            tmp = {};	//DEFPRINT(AST_SimpleStatement 42
            m = eval(name).prototype;	//DEFPRINT(AST_SimpleStatement 43
            var _$iter1 = dict.items(m);
            for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
                _$Unpack = _$iter1[_$id1];
                k = _$Unpack[0];
                v = _$Unpack[1];
                is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 45
                if (!is_k_in_filter) {
                    tmp[k] = v;	//DEFPRINT(AST_SimpleStatement 47
                }
            }
            return tmp;	//AST_Exit.DEFMETHOD( 48
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 49
    }
    if (isEmpty(fn_module.prototype)) {
        module_member_data = fn_module();	//DEFPRINT(AST_SimpleStatement 52
        module_member_data.ALL = getAllExcept([ "ALL", "scope" ], fn_module);	//DEFPRINT(AST_SimpleStatement 53
        scope_attrs = [];	//DEFPRINT(AST_SimpleStatement 54
        scope = module_member_data.scope;	//DEFPRINT(AST_SimpleStatement 55
        _filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__", "__module__" ];	//DEFPRINT(AST_SimpleStatement 56
        var _$iter2 = dict.items(module_member_data);
        for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
            _$Unpack = _$iter2[_$id2];
            key = _$Unpack[0];
            value = _$Unpack[1];
            if (key == "scope") {
                var _$iter3 = dict.items(value);
                for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
                    _$Unpack = _$iter3[_$id3];
                    k = _$Unpack[0];
                    v = _$Unpack[1];
                    is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 60
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);	//DEFPRINT(AST_SimpleStatement 62
                        if (isEmpty(module_member_data[k])) {
                            module_member_data[k] = v;	//DEFPRINT(AST_SimpleStatement 64
                        } else {
                            throw "[Error][Naming Confliction]module-scope variable: [" + k + "] interfere with module ";	//AST_Exit.DEFMETHOD( 66
                            "member: [" + k + "]";	//DEFPRINT(AST_SimpleStatement 67
                        }
                        scope["_" + k] = v;	//DEFPRINT(AST_SimpleStatement 68
                        scope_attrs.append(k);	//DEFPRINT(AST_SimpleStatement 69
                    }
                }
            }
        }
        module_member_data["scope"] = scope;	//DEFPRINT(AST_SimpleStatement 70
        fn_module.prototype = module_member_data;	//DEFPRINT(AST_SimpleStatement 71
        function setter_callback(scope_obj, _attr) {
            function wrapper(_value) {
                eval(scope_obj.__module__).prototype.scope["_" + _attr] = _value;	//DEFPRINT(AST_SimpleStatement 75
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 76
        }
        function getter_callback(scope_obj, _attr) {
            function wrapper() {
                return eval(scope_obj.__module__).prototype.scope["_" + _attr];	//AST_Exit.DEFMETHOD( 79
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 80
        }
        var _$iter4 = scope_attrs;
        for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
            attr = _$iter4[_$id4];
            console.log("set getter and setter for ", attr);	//DEFPRINT(AST_SimpleStatement 83
            scope.__defineSetter__(attr, setter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 84
            scope.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 85
        }
        fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 87
        fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 88
        fn_module.prototype.prototype = fn_module.prototype;	//DEFPRINT(AST_SimpleStatement 90
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 91
    } else {
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 93
    }
}

function super_(cls, instance) {
    var level, super_name, super_class, level;	//complex body AST_Scope declare var as local
    level = "";	//DEFPRINT(AST_SimpleStatement 95
    function find_class_name(ref, name, level) {
        level += ".__proto__";	//DEFPRINT(AST_SimpleStatement 97
        if (ref.__proto__.__name__ == name) {
            return [ref.__proto__, level];	//AST_Exit.DEFMETHOD( 99
        } else {
            return find_class_name(ref.__proto__, name, level);	//AST_Exit.DEFMETHOD( 101
        }
    }
    super_name = cls.prototype.__proto__.__name__;	//DEFPRINT(AST_SimpleStatement 102
    instance.name = cls.name;	//DEFPRINT(AST_SimpleStatement 103
    _$Unpack = find_class_name(instance, super_name, level);	//DEFPRINT(AST_Assign 104
    super_class = _$Unpack[0];
    level = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 104
    instance.__superlevel__ = level;	//DEFPRINT(AST_SimpleStatement 105
    return super_class;	//AST_Exit.DEFMETHOD( 106
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);	//AST_Exit.DEFMETHOD( 109
    }
    return s4() + s4() + "_" + s4() + "_" + s4() + "_" + s4() + "_" + s4() + s4() + s4();	//AST_Exit.DEFMETHOD( 111
}

function property(fn, scope) {
    function setter(_cls, k) {
        function wrapper(value) {
            if (isEmpty(_cls.prototype.__property_methods__[k].__property_init__)) {
                _cls.prototype.__property_methods__[k].__property_init__ = true;	//DEFPRINT(AST_SimpleStatement 117
                return;	//AST_Exit.DEFMETHOD( 118
            }
            if (typeof value == "function") {
                _cls.prototype.__property_methods__[k] = value;	//DEFPRINT(AST_SimpleStatement 120
            } else {
                throw "decorated property only allowed for assigning to function";	//AST_Exit.DEFMETHOD( 122
            }
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 123
    }
    function getter() {
        return scope.prototype.__property_methods__[fn.name].call(this);	//AST_Exit.DEFMETHOD( 126
    }
    if (isEmpty(scope.prototype.__property_methods__)) {
        scope.prototype.__property_methods__ = {};	//DEFPRINT(AST_SimpleStatement 129
    }
    scope.prototype.__property_methods__[fn.name] = fn;	//DEFPRINT(AST_SimpleStatement 130
    scope.prototype.__defineGetter__(fn.name, getter);	//DEFPRINT(AST_SimpleStatement 131
    scope.prototype.__defineSetter__(fn.name, setter(scope, fn.name));	//DEFPRINT(AST_SimpleStatement 132
    return;	//AST_Exit.DEFMETHOD( 133
}

function console() {
}

function arguments() {
}

function RegExp() {
}

function jQuery() {
}

function re() {
}

function Math() {
}

function RegExp() {
}

function require(a) {
}

function condole() {
}

function console_mode() {
}

function deepEqual(a, b) {
}

var unittest = Callable(function unittest_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.description = {};	//DEFPRINT(AST_SimpleStatement 158
    self.mode = null;	//DEFPRINT(AST_SimpleStatement 159
});	//class_fun_def A 156
unittest.prototype.__recordinheritance__ = function __recordinheritance__(inheriter){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 156
unittest.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 163
    self.__inheritance__ = [];	//DEFPRINT(AST_SimpleStatement 164
};	//class_fun_def A 156
unittest.prototype.__call__ = function __call__(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var caller, name;	//complex body AST_Scope declare var as local
    caller = args[args.length-1];	//DEFPRINT(AST_SimpleStatement 167
    name = caller.name;	//DEFPRINT(AST_SimpleStatement 168
    self.info(args[0]);	//DEFPRINT(AST_SimpleStatement 169
    self.info("______________________________________________________________________________");	//DEFPRINT(AST_SimpleStatement 170
};	//class_fun_def A 156
unittest.prototype.info = function info(msg){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg;	//DEFPRINT(AST_SimpleStatement 172
    color = "background: #fff; color: #222";	//DEFPRINT(AST_SimpleStatement 173
    console.info(name, color);	//DEFPRINT(AST_SimpleStatement 174
};	//class_fun_def A 156
unittest.prototype.test_ok = function test_ok(msg){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg + "\t %cOK";	//DEFPRINT(AST_SimpleStatement 176
    color = "background: #fff; color: #0092D6";	//DEFPRINT(AST_SimpleStatement 177
    console.info(name, color, "color:Blue");	//DEFPRINT(AST_SimpleStatement 178
};	//class_fun_def A 156
unittest.prototype.failed = function failed(msg, failed){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg + "\t %cFailed!";	//DEFPRINT(AST_SimpleStatement 180
    color = "background: #fff; color: #000000";	//DEFPRINT(AST_SimpleStatement 181
    console.info(name, color, "color:Red");	//DEFPRINT(AST_SimpleStatement 182
    console.error("\t\t" + failed);	//DEFPRINT(AST_SimpleStatement 183
};	//class_fun_def A 156
unittest.prototype.run = function run(){
    var self = this;	// complex body AST_Defun
    var s, s, key, value, successor;	//complex body AST_Scope declare var as local
    var _$iter5 = self.__inheritance__;
    for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
        successor = _$iter5[_$id5];
        s = successor();	//DEFPRINT(AST_SimpleStatement 186
        s = eval("new s");	//DEFPRINT(AST_SimpleStatement 187
        s.setUp();	//DEFPRINT(AST_SimpleStatement 188
        var _$iter6 = s.__proto__.items();
        for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
            _$Unpack = _$iter6[_$id6];
            key = _$Unpack[0];
            value = _$Unpack[1];
            if ("test" == key.slice(0, 4).lower()) {
                if (self.mode == null) {
                    self.print_title(key, s);	//DEFPRINT(AST_SimpleStatement 192
                    s[key]();	//DEFPRINT(AST_SimpleStatement 193
                    console.log("\n");	//DEFPRINT(AST_SimpleStatement 194
                    console.groupEnd("[END]");	//DEFPRINT(AST_SimpleStatement 195
                    console.log("\n");	//DEFPRINT(AST_SimpleStatement 196
                }
            }
        }
        s.tearDown();	//DEFPRINT(AST_SimpleStatement 197
    }
};	//class_fun_def A 156
unittest.prototype.pyassert = function pyassert(a, okmsg, failed){
    var self = this;	// complex body AST_Defun
    if (isEmpty(a)) {
        if (!failed) {
            failed = okmsg;	//DEFPRINT(AST_SimpleStatement 200
        }
        self.failed(okmsg, failed);	//DEFPRINT(AST_SimpleStatement 201
    } else {
        self.test_ok(okmsg);	//DEFPRINT(AST_SimpleStatement 203
    }
};	//class_fun_def A 156
unittest.prototype.assertEqual = function assertEqual(a, b, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(deepEqual(a, b), ok, failed);	//DEFPRINT(AST_SimpleStatement 205
};	//class_fun_def A 156
unittest.prototype.ok = function ok(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.assertTrue(a, ok, failed);	//DEFPRINT(AST_SimpleStatement 207
};	//class_fun_def A 156
unittest.prototype.assertTrue = function assertTrue(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(a, ok, failed);	//DEFPRINT(AST_SimpleStatement 209
};	//class_fun_def A 156
unittest.prototype.assertFalse = function assertFalse(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(!a, ok, failed);	//DEFPRINT(AST_SimpleStatement 212
};	//class_fun_def A 156
unittest.prototype.createTable = function createTable(data){
    var self = this;	// complex body AST_Defun
    console.group();	//DEFPRINT(AST_SimpleStatement 215
    console.table(data);	//DEFPRINT(AST_SimpleStatement 216
    console.groupEnd();	//DEFPRINT(AST_SimpleStatement 217
};	//class_fun_def A 156
unittest.prototype.addrow = function addrow(d){
    var self = this;	// complex body AST_Defun
    var obj, data, title;	//complex body AST_Scope declare var as local
    obj = dict(a = 1, b = 2, c = 3);	//DEFPRINT(AST_SimpleStatement 220
    data = {};	//DEFPRINT(AST_SimpleStatement 221
    title = d.title;	//DEFPRINT(AST_SimpleStatement 222
    delete d.title;	//DEFPRINT(AST_SimpleStatement 223
    data[title] = d;	//DEFPRINT(AST_SimpleStatement 224
    return data;	//AST_Exit.DEFMETHOD( 225
};	//class_fun_def A 156
unittest.prototype.print_title = function print_title(n, s){
    var self = this;	// complex body AST_Defun
    var class_name, fn_name;	//complex body AST_Scope declare var as local
    class_name = s.__name__;	//DEFPRINT(AST_SimpleStatement 228
    fn_name = n;	//DEFPRINT(AST_SimpleStatement 229
    self.info("\n");	//DEFPRINT(AST_SimpleStatement 230
    console.group("[{0}] {1}            \n".format(class_name, fn_name));	//DEFPRINT(AST_SimpleStatement 231
    self.info("______________________________________________________________________________");	//DEFPRINT(AST_SimpleStatement 232
};	//class_fun_def A 156
unittest = __defineClassProperties__(unittest);
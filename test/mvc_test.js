function insert(lst, index, value) {
    var l, r, l;	//complex body AST_Scope declare var as local
    value = [ value ];	//DEFPRINT(AST_SimpleStatement 5
    l = lst.slice(0, index);	//DEFPRINT(AST_SimpleStatement 6
    r = lst.slice(index);	//DEFPRINT(AST_SimpleStatement 7
    l = l.concat(value);	//DEFPRINT(AST_SimpleStatement 8
    return l.concat(r);	//AST_Exit.DEFMETHOD( 9
}

function isEmpty(n) {
    var key;	//complex body AST_Scope declare var as local
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;	//AST_Exit.DEFMETHOD( 12
        }
        var _$iter0 = dict.keys(n);
        for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
            key = _$iter0[_$id0];
            return false;	//AST_Exit.DEFMETHOD( 14
        }
        return true;	//AST_Exit.DEFMETHOD( 15
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;	//AST_Exit.DEFMETHOD( 19
        } else {
            return true;	//AST_Exit.DEFMETHOD( 21
        }
    }
    if (n) {
        return false;	//AST_Exit.DEFMETHOD( 24
    } else {
        return true;	//AST_Exit.DEFMETHOD( 26
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    var tmp, tmp, i, fn, ins;	//complex body AST_Scope declare var as local
    tmp = "";	//DEFPRINT(AST_SimpleStatement 28
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";	//DEFPRINT(AST_SimpleStatement 30
    }
    fn = arguments[0];	//DEFPRINT(AST_SimpleStatement 31
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");	//DEFPRINT(AST_SimpleStatement 32
    return ins;	//AST_Exit.DEFMETHOD( 33
}

function set_scope(module_path) {
    var scope;	//complex body AST_Scope declare var as local
    scope = {};	//DEFPRINT(AST_SimpleStatement 35
    scope.__module__ = module_path;	//DEFPRINT(AST_SimpleStatement 36
    return scope;	//AST_Exit.DEFMETHOD( 37
}

function module(fn_module) {
    var module_member_data, scope_attrs, scope, _filter, is_k_in_filter, k, v, key, value, attr;	//complex body AST_Scope declare var as local
    function getAllExcept(lst, _module) {
        function wrapper() {
            var name, _filter, tmp, m, is_k_in_filter, k, v;	//complex body AST_Scope declare var as local
            name = _module.name;	//DEFPRINT(AST_SimpleStatement 41
            _filter = lst;	//DEFPRINT(AST_SimpleStatement 42
            tmp = {};	//DEFPRINT(AST_SimpleStatement 43
            m = eval(name).prototype;	//DEFPRINT(AST_SimpleStatement 44
            var _$iter1 = dict.items(m);
            for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
                _$Unpack = _$iter1[_$id1];
                k = _$Unpack[0];
                v = _$Unpack[1];
                is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 46
                if (!is_k_in_filter) {
                    tmp[k] = v;	//DEFPRINT(AST_SimpleStatement 48
                }
            }
            return tmp;	//AST_Exit.DEFMETHOD( 49
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 50
    }
    if (isEmpty(fn_module.prototype)) {
        module_member_data = fn_module();	//DEFPRINT(AST_SimpleStatement 53
        module_member_data.ALL = getAllExcept([ "ALL", "scope" ], fn_module);	//DEFPRINT(AST_SimpleStatement 54
        scope_attrs = [];	//DEFPRINT(AST_SimpleStatement 55
        scope = module_member_data.scope;	//DEFPRINT(AST_SimpleStatement 56
        _filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__", "__module__" ];	//DEFPRINT(AST_SimpleStatement 57
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
                    is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 61
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);	//DEFPRINT(AST_SimpleStatement 63
                        if (isEmpty(module_member_data[k])) {
                            module_member_data[k] = v;	//DEFPRINT(AST_SimpleStatement 64
                        } else {
                            throw "[Error][Naming Confliction]module-scope variable: [" + k + "] interfere with module member: [" + k + "]";	//AST_Exit.DEFMETHOD( 65
                        }
                        scope["_" + k] = v;	//DEFPRINT(AST_SimpleStatement 66
                        scope_attrs.append(k);	//DEFPRINT(AST_SimpleStatement 67
                    }
                }
            }
        }
        module_member_data["scope"] = scope;	//DEFPRINT(AST_SimpleStatement 68
        fn_module.prototype = module_member_data;	//DEFPRINT(AST_SimpleStatement 69
        function setter_callback(scope_obj, _attr) {
            function wrapper(_value) {
                eval(scope_obj.__module__).prototype.scope["_" + _attr] = _value;	//DEFPRINT(AST_SimpleStatement 73
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 74
        }
        function getter_callback(scope_obj, _attr) {
            function wrapper() {
                return eval(scope_obj.__module__).prototype.scope["_" + _attr];	//AST_Exit.DEFMETHOD( 77
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 78
        }
        var _$iter4 = scope_attrs;
        for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
            attr = _$iter4[_$id4];
            console.log("set getter and setter for ", attr);	//DEFPRINT(AST_SimpleStatement 81
            scope.__defineSetter__(attr, setter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 82
            scope.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 83
        }
        fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 85
        fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 86
        fn_module.prototype.prototype = fn_module.prototype;	//DEFPRINT(AST_SimpleStatement 88
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 89
    } else {
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 91
    }
}

function class_properties(cls, props) {
    var k, v;	//complex body AST_Scope declare var as local
    if (!cls.prototype.__classproperty_setted__) {
        function getter(_cls, k) {
            function wrapper() {
                return _cls.prototype[k];	//AST_Exit.DEFMETHOD( 96
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 97
        }
        function setter(_cls, k) {
            function wrapper(value) {
                _cls.prototype[k] = value;	//DEFPRINT(AST_SimpleStatement 100
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 101
        }
        var _$iter5 = dict.items(cls.prototype);
        for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
            _$Unpack = _$iter5[_$id5];
            k = _$Unpack[0];
            v = _$Unpack[1];
            cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 104
            cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 105
        }
        var _$iter6 = dict.items(props);
        for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
            _$Unpack = _$iter6[_$id6];
            k = _$Unpack[0];
            v = _$Unpack[1];
            if (!(typeof v == "function")) {
                console.log("define class property", k, v);	//DEFPRINT(AST_SimpleStatement 109
                cls.prototype[k] = v;	//DEFPRINT(AST_SimpleStatement 110
                cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 111
                cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 112
            }
        }
        cls.prototype.__classproperty_setted__ = true;	//DEFPRINT(AST_SimpleStatement 114
    }
}

function classprop_init(f) {
    f.prototype.__classproperty_setted__ = false;	//DEFPRINT(AST_SimpleStatement 116
    eval('new f("classprop_init")');	//DEFPRINT(AST_SimpleStatement 117
    return f;	//AST_Exit.DEFMETHOD( 118
}

function super_(cls, instance) {
    var level, super_name, super_class, level;	//complex body AST_Scope declare var as local
    level = "";	//DEFPRINT(AST_SimpleStatement 120
    function find_class_name(ref, name, level) {
        level += ".__proto__";	//DEFPRINT(AST_SimpleStatement 122
        if (ref.__proto__.__name__ == name) {
            return [ref.__proto__, level];	//AST_Exit.DEFMETHOD( 123
        } else {
            return find_class_name(ref.__proto__, name, level);	//AST_Exit.DEFMETHOD( 124
        }
    }
    super_name = cls.prototype.__proto__.__name__;	//DEFPRINT(AST_SimpleStatement 125
    instance.name = cls.name;	//DEFPRINT(AST_SimpleStatement 126
    _$Unpack = find_class_name(instance, super_name, level);	//DEFPRINT(AST_Assign 127
    super_class = _$Unpack[0];
    level = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 127
    instance.__superlevel__ = level;	//DEFPRINT(AST_SimpleStatement 128
    return super_class;	//AST_Exit.DEFMETHOD( 129
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);	//AST_Exit.DEFMETHOD( 132
    }
    return s4() + s4() + "_" + s4() + "_" + s4() + "_" + s4() + "_" + s4() + s4() + s4();	//AST_Exit.DEFMETHOD( 134
}



var RapydWeb = Callable(function RapydWeb_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init == "classprop_init") {
        self.m = [];	//DEFPRINT(AST_SimpleStatement 149
        self.v = [];	//DEFPRINT(AST_SimpleStatement 150
        self.c = [];	//DEFPRINT(AST_SimpleStatement 151
        self.action = self.debug_level = "";	//DEFPRINT(AST_SimpleStatement 152
        self.components = [];	//DEFPRINT(AST_SimpleStatement 153
        self.config = [];	//DEFPRINT(AST_SimpleStatement 154
        self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 155
        class_properties(RapydWeb, self);	//DEFPRINT(AST_SimpleStatement 157
    } else if (typeof init == "object") {
        self.__instance__[init.__name__] = init;	//DEFPRINT(AST_SimpleStatement 160
    } else if (init) {
        self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 163
    }
});	//class_fun_def A 139
RapydWeb.prototype.debug = function debug(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c[DEBUG][" + self.debug.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 166
    color = "background: #222; color: #bada55";	//DEFPRINT(AST_SimpleStatement 167
    args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 168
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 169
    console.debug.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 171
};	//class_fun_def A 139
RapydWeb.prototype.log = function log(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name;	//complex body AST_Scope declare var as local
    if (self.log.caller) {
        name = "[" + self.log.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 175
        args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 176
    }
    console.log.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 177
};	//class_fun_def A 139
RapydWeb.prototype.error = function error(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name;	//complex body AST_Scope declare var as local
    name = "[ERROR][" + self.error.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 183
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 184
    console.error.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 185
};	//class_fun_def A 139
RapydWeb.prototype.info = function info(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c[INFO][" + self.info.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 188
    color = "background: #667; color: #fff";	//DEFPRINT(AST_SimpleStatement 189
    args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 190
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 191
    console.info.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 192
};	//class_fun_def A 139
RapydWeb.prototype.inheritFromInstance = function inheritFromInstance(cls, instance){
    var self = this;	// complex body AST_Defun
    var instance_class_name, super_class, super_class_name, proto;	//complex body AST_Scope declare var as local
    instance_class_name = instance.__name__;	//DEFPRINT(AST_SimpleStatement 195
    super_class = super_(cls, instance);	//DEFPRINT(AST_SimpleStatement 196
    super_class_name = super_class.__name__;	//DEFPRINT(AST_SimpleStatement 197
    proto = instance.__superlevel__;	//DEFPRINT(AST_SimpleStatement 198
    eval('self.__instance__["{0}"]{1} = self.__instance__["{2}"]'.format(instance_class_name, proto, super_class_name));	//DEFPRINT(AST_SimpleStatement 199
};	//class_fun_def A 139
RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    var action, action;	//complex body AST_Scope declare var as local
    self.checkActionsAvailable(name, sub_successor);	//DEFPRINT(AST_SimpleStatement 203
    if (!hyper_successor.__actions__[name]) {
        hyper_successor.__actions__[name] = {};	//DEFPRINT(AST_SimpleStatement 204
    }
    self.log("__actions__ = ", hyper_successor.__actions__);	//DEFPRINT(AST_SimpleStatement 205
    self.log("successor actions = ", sub_successor.actions);	//DEFPRINT(AST_SimpleStatement 206
    if (!(hyper_successor.name == "View")) {
        var _$iter7 = sub_successor.actions;
        for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
            action = _$iter7[_$id7];
            hyper_successor.__actions__[name][action] = self.actionPropStructure();	//DEFPRINT(AST_SimpleStatement 210
        }
    } else {
        var _$iter8 = sub_successor.actions;
        for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
            action = _$iter8[_$id8];
            hyper_successor.__actions__[name][action] = self.viewPropStructure();	//DEFPRINT(AST_SimpleStatement 213
        }
    }
};	//class_fun_def A 139
RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    if (sub_successor.components) {
        if (!hyper_successor.__components__[name]) {
            hyper_successor.__components__[name] = [];	//DEFPRINT(AST_SimpleStatement 218
        }
        hyper_successor.__components__[name] = sub_successor.components;	//DEFPRINT(AST_SimpleStatement 219
    }
};	//class_fun_def A 139
RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 222
    return r;	//AST_Exit.DEFMETHOD( 223
};	//class_fun_def A 139
RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 226
    return r;	//AST_Exit.DEFMETHOD( 227
};	//class_fun_def A 139
RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
    var self = this;	// complex body AST_Defun
    var action;	//complex body AST_Scope declare var as local
    self.log(name, successor);	//DEFPRINT(AST_SimpleStatement 230
    self.log(successor.actions);	//DEFPRINT(AST_SimpleStatement 231
    var _$iter9 = successor.actions;
    for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
        action = _$iter9[_$id9];
        if (!successor[action]) {
            self.error("[error] actions [{0}] not exists", action);	//DEFPRINT(AST_SimpleStatement 234
            return false;	//AST_Exit.DEFMETHOD( 235
        }
    }
};	//class_fun_def A 139
RapydWeb = __defineClassProperties__(RapydWeb);
RapydWeb = classprop_init(RapydWeb);



var Controller = Callable(function Controller_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    var successor;	//complex body AST_Scope declare var as local
    if (init == "classprop_init") {
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 246
        self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 247
        class_properties(Controller, self);	//DEFPRINT(AST_SimpleStatement 248
    } else if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 256
        console.log("component and action init:: self = ", self, "name = ", name, "sucessor = ", successor);	//DEFPRINT(AST_SimpleStatement 257
        super_(Controller, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 258
        super_(Controller, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 259
    } else if (init) {
        super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 264
    }
});	//class_fun_def A 238
Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 238
Controller.prototype.__getattr__ = function __getattr__(item){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 270
    item;	//DEFPRINT(AST_SimpleStatement 270
};	//class_fun_def A 238
Controller.prototype.__get__ = function __get__(instance, owner){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 273
    [instance, owner];	//DEFPRINT(AST_SimpleStatement 273
};	//class_fun_def A 238
Controller.prototype.__beforAction = function __beforAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.beforeAction(f, args);	//DEFPRINT(AST_SimpleStatement 276
};	//class_fun_def A 238
Controller.prototype.beforeAction = function beforeAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 238
Controller.prototype.afterAction = function afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 238
Controller.prototype.__afterAction = function __afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.__startRender(f, args);	//DEFPRINT(AST_SimpleStatement 285
};	//class_fun_def A 238
Controller.prototype.__startRender = function __startRender(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 238
Controller = __defineClassProperties__(Controller);
Controller = classprop_init(Controller);

var BlogController = Callable(function BlogController_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    if (init) {
        super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 296
        self.actions = [ "index", "viewArticles", "viewByTags" ];	//DEFPRINT(AST_SimpleStatement 302
        self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 303
        super_(BlogController, self).__init__(self, "BlogController");	//DEFPRINT(AST_SimpleStatement 304
    }
});	//class_fun_def A 290
BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 290
BlogController = __defineClassProperties__(BlogController);



var View = Callable(function View_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var successor;	//complex body AST_Scope declare var as local
    if (init == "classprop_init") {
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 311
        self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 312
        class_properties(View, self);	//DEFPRINT(AST_SimpleStatement 313
    } else if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 318
        super_(View, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 319
        super_(View, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 320
    } else if (init) {
        super_(View, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 322
    }
});	//class_fun_def A 307
View.prototype = new RapydWeb("__inheritance__", View);	//class_fun_def C 307
View.prototype.beforeRender = function beforeRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 307
View.prototype.afterRender = function afterRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 307
View.prototype.mapToHtml = function mapToHtml(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 307
View.prototype.getComponentComment = function getComponentComment(){
    var self = this;	// complex body AST_Defun
    var comp_comment, comps, _comp, node, value, attr, comp, comp_name;	//complex body AST_Scope declare var as local
    comp_comment = jQuery("body").comments()[0];	//DEFPRINT(AST_SimpleStatement 341
    var _$iter10 = self.view_components_name;
    for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
        comp_name = _$iter10[_$id10];
        self.view_components_attributes[comp_name] = {};	//DEFPRINT(AST_SimpleStatement 343
        comps = comp_comment.getElementsByTagName(comp_name);	//DEFPRINT(AST_SimpleStatement 344
        var _$iter11 = comps;
        for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
            comp = _$iter11[_$id11];
            _comp = {};	//DEFPRINT(AST_SimpleStatement 346
            var _$iter12 = comp.attributes;
            for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
                attr = _$iter12[_$id12];
                node = attr.nodeName;	//DEFPRINT(AST_SimpleStatement 348
                value = attr.value;	//DEFPRINT(AST_SimpleStatement 349
                _comp[node] = value;	//DEFPRINT(AST_SimpleStatement 350
            }
            self.view_components_attributes[comp_name][_comp.id] = _comp;	//DEFPRINT(AST_SimpleStatement 351
        }
    }
};	//class_fun_def A 307
View = __defineClassProperties__(View);
View = classprop_init(View);



var Model = Callable(function Model_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    var successor;	//complex body AST_Scope declare var as local
    if (init == "classprop_init") {
        self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 359
        class_properties(Model, self);	//DEFPRINT(AST_SimpleStatement 360
    } else if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 365
        super_(Model, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 366
    } else if (init) {
        super_(Model, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 371
    }
});	//class_fun_def A 354
Model.prototype = new RapydWeb("__inheritance__", Model);	//class_fun_def C 354
Model.prototype.beforeSend = function beforeSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 354
Model.prototype.afterSend = function afterSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 354
Model.prototype.beforeSave = function beforeSave(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 354
Model.prototype.afterSaver = function afterSaver(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 354
Model = __defineClassProperties__(Model);
Model = classprop_init(Model);

var Mediator = Callable(function Mediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 397
    }
});	//class_fun_def A 389
Mediator.prototype = new RapydWeb("__inheritance__", Mediator);	//class_fun_def C 389
Mediator.prototype.test = function test(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 404
    "mediator test";	//DEFPRINT(AST_SimpleStatement 404
};	//class_fun_def A 389
Mediator.prototype.test2 = function test2(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 407
    "mediator test2";	//DEFPRINT(AST_SimpleStatement 407
};	//class_fun_def A 389
Mediator = __defineClassProperties__(Mediator);

var HeaderMediator = Callable(function HeaderMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 419
    }
});	//class_fun_def A 415
HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);	//class_fun_def C 415
HeaderMediator.prototype.catchHeader = function catchHeader(header){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 415
HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 415
HeaderMediator = __defineClassProperties__(HeaderMediator);

var AddressMediator = Callable(function AddressMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 434
    }
});	//class_fun_def A 430
AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);	//class_fun_def C 430
AddressMediator.prototype.suspendRediret = function suspendRediret(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator.prototype.redirectTo = function redirectTo(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator.prototype.historyNext = function historyNext(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator.prototype.historyPrev = function historyPrev(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator.prototype.getHistories = function getHistories(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator.prototype.onAddressChange = function onAddressChange(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 430
AddressMediator = __defineClassProperties__(AddressMediator);

"\n\nrapyd = RapydWeb('init')\nrapyd.c = Controller( 'init' )\nrapyd.c = Controller('init')\nrapyd.c.blog = BlogController('init')\n\nrapyd.m = Model( 'init' )\nrapyd.v = View( 'init' )\nrapyd.mediator = Mediator( 'init' )\nrapyd.mediator.address = AddressMediator( 'init' )\nrapyd.mediator.header = HeaderMediator( 'init' )\n";	//DEFPRINT(AST_SimpleStatement 458

var ViewComponent = Callable(function ViewComponent_(init, comp_code){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init == "classprop_init") {
        self.HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY;	//DEFPRINT(AST_SimpleStatement 467
        self.HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY;	//DEFPRINT(AST_SimpleStatement 468
        self.HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY;	//DEFPRINT(AST_SimpleStatement 469
        self.HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY;	//DEFPRINT(AST_SimpleStatement 470
        self.HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY;	//DEFPRINT(AST_SimpleStatement 471
        self.__rapyd_comps__ = [];	//DEFPRINT(AST_SimpleStatement 472
        class_properties(ViewComponent, self);	//DEFPRINT(AST_SimpleStatement 473
    } else if (init) {
        self.setAsWatchObject(self, "test", "test value");	//DEFPRINT(AST_SimpleStatement 477
        self.setAsWatchObject(self, "test2", "set_from_callback value");	//DEFPRINT(AST_SimpleStatement 478
        if (init == "customcomp") {
            self.css = {};	//DEFPRINT(AST_SimpleStatement 480
            self.component_tags = [];	//DEFPRINT(AST_SimpleStatement 481
            self.parseCustomComponents();	//DEFPRINT(AST_SimpleStatement 482
            self.setCompFromHtmlCommentTags(comp_code);	//DEFPRINT(AST_SimpleStatement 483
        }
    }
});	//class_fun_def A 462
ViewComponent.prototype = new View("__inheritance__", ViewComponent);	//class_fun_def C 462
ViewComponent.prototype.setAsWatchObject = function setAsWatchObject(attr, value, mode){
    var self = this;	// complex body AST_Defun
    var obj;	//complex body AST_Scope declare var as local
    obj = {
        "value": value,
        "onChange": [],
        "mode": mode
    };	//DEFPRINT(AST_SimpleStatement 489
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 490
    function setter_callback(instance, attr) {
        function wrapper(_value) {
            instance.onChange(attr, _value);	//DEFPRINT(AST_SimpleStatement 494
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 495
    }
    function getter_callback(instance, attr) {
        function wrapper(_value) {
            return instance.get(attr);	//AST_Exit.DEFMETHOD( 499
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 500
    }
    self.__defineSetter__(attr, setter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 502
    self.__defineGetter__(attr, getter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 503
    return obj;	//AST_Exit.DEFMETHOD( 504
};	//class_fun_def A 462
ViewComponent.prototype.isWatchObject = function isWatchObject(value){
    var self = this;	// complex body AST_Defun
    var value_in_dict, onchange_in_dict;	//complex body AST_Scope declare var as local
    if (typeof value == "object") {
        value_in_dict = _$in_("value", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 507
        onchange_in_dict = _$in_("onChange", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 508
        self.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);	//DEFPRINT(AST_SimpleStatement 509
        return value_in_dict || onchange_in_dict;	//AST_Exit.DEFMETHOD( 511
    } else {
        return false;	//AST_Exit.DEFMETHOD( 512
    }
};	//class_fun_def A 462
ViewComponent.prototype.set = function set(attr, value){
    var self = this;	// complex body AST_Defun
    self["_" + attr] = value;	//DEFPRINT(AST_SimpleStatement 515
};	//class_fun_def A 462
ViewComponent.prototype.get = function get(attr){
    var self = this;	// complex body AST_Defun
    return self["_" + attr];	//AST_Exit.DEFMETHOD( 518
};	//class_fun_def A 462
ViewComponent.prototype.onChange = function onChange(attr, value){
    var self = this;	// complex body AST_Defun
    var original_value, on_change_register_list, mode, state, state_data, state_conditions, _dict, target, target_attr, obj;	//complex body AST_Scope declare var as local
    original_value = self.get(attr);	//DEFPRINT(AST_SimpleStatement 520
    self.info(" origianal value = ", original_value);	//DEFPRINT(AST_SimpleStatement 521
    if (!self.isWatchObject(original_value)) {
        throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';	//AST_Exit.DEFMETHOD( 523
    }
    on_change_register_list = original_value.onChange;	//DEFPRINT(AST_SimpleStatement 525
    mode = original_value.mode;	//DEFPRINT(AST_SimpleStatement 526
    if (mode == "states") {
        state = self.States.getStateByName(value);	//DEFPRINT(AST_SimpleStatement 529
        state_data = state.data;	//DEFPRINT(AST_SimpleStatement 530
        state.processSetAttr();	//DEFPRINT(AST_SimpleStatement 531
        state.processAnime();	//DEFPRINT(AST_SimpleStatement 532
        state_conditions = state_data.conditions;	//DEFPRINT(AST_SimpleStatement 533
        var _$iter13 = state_conditions;
        for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
            _dict = _$iter13[_$id13];
            self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 535
        }
        return;	//AST_Exit.DEFMETHOD( 536
    } else if (mode == "visual_component") {
        self.VisuelElements[attr](value);	//DEFPRINT(AST_SimpleStatement 539
        return;	//AST_Exit.DEFMETHOD( 540
    }
    var _$iter14 = on_change_register_list;
    for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
        _dict = _$iter14[_$id14];
        if (_$in_("condition", dict.keys(_dict))) {
            self.info("[set onchange list] set var with condition, attr = ", attr);	//DEFPRINT(AST_SimpleStatement 545
            self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 546
        } else {
            self.info("[set onchange list] set var, attr = ", attr, "value = ", value);	//DEFPRINT(AST_SimpleStatement 548
            target = _dict["target"];	//DEFPRINT(AST_SimpleStatement 549
            target_attr = _dict["attr"];	//DEFPRINT(AST_SimpleStatement 550
            target.set(target_attr, value);	//DEFPRINT(AST_SimpleStatement 551
        }
    }
    self.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);	//DEFPRINT(AST_SimpleStatement 554
    obj = self.get(attr);	//DEFPRINT(AST_SimpleStatement 556
    obj.value = value;	//DEFPRINT(AST_SimpleStatement 557
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 558
};	//class_fun_def A 462
ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con){
    var self = this;	// complex body AST_Defun
    var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;	//complex body AST_Scope declare var as local
    "\n\t\trapydscript if elif else clause structure::\n\t\t{'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t'elif_clause': [{\n\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t'if_clause':\n\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\tpython if else clause structure\n\t\t{'if_setter'\t: \"'pressed'\",\n\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t'else_setter'\t: \"'abc'\",\n\t\t'if_setted'\t\t: _state.name})";	//DEFPRINT(AST_Directive 560
    function get_condition(con_lst) {
        var prop_a, operator, prop_b, condition;	//complex body AST_Scope declare var as local
        _$Unpack = con_lst;	//DEFPRINT(AST_Assign 562
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 562
        condition = prop_a + operator + prop_b;	//DEFPRINT(AST_SimpleStatement 563
        return eval(condition);	//AST_Exit.DEFMETHOD( 564
    }
    if (con.if_clause) {
        var _$iter15 = dict.keys(con);
        for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
            key = _$iter15[_$id15];
            current = con[key];	//DEFPRINT(AST_SimpleStatement 568
            _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 569
            _pass = current["pass"];	//DEFPRINT(AST_SimpleStatement 570
            condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 571
            if (condition || !isEmpty(_condition)) {
                if (!_pass) {
                    setted = current["setted"];	//DEFPRINT(AST_SimpleStatement 577
                    setter = current["setter"];	//DEFPRINT(AST_SimpleStatement 578
                    if (self.isWatchObject(setter)) {
                        v = setter.value;	//DEFPRINT(AST_SimpleStatement 580
                    } else {
                        v = setter;	//DEFPRINT(AST_SimpleStatement 582
                    }
                    if (self.isWatchObject(setted)) {
                        setted.value = v;	//DEFPRINT(AST_SimpleStatement 584
                    } else {
                        throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 586
                    }
                    continue;
                } else {
                    continue;
                }
            }
        }
    } else if (con.if_con) {
        _condition = con["if_con"];	//DEFPRINT(AST_SimpleStatement 592
        setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 593
        condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 594
        if (condition) {
            setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 596
        } else {
            setter = con["else_setter"];	//DEFPRINT(AST_SimpleStatement 598
        }
        if (self.isWatchObject(setter)) {
            v = setter.value;	//DEFPRINT(AST_SimpleStatement 600
        } else {
            v = setter;	//DEFPRINT(AST_SimpleStatement 602
        }
        if (self.isWatchObject(setted)) {
            setted.value = v;	//DEFPRINT(AST_SimpleStatement 604
        } else {
            throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 606
        }
    }
};	//class_fun_def A 462
ViewComponent.prototype.registCondition = function registCondition(register){
    var self = this;	// complex body AST_Defun
    var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;	//complex body AST_Scope declare var as local
    con = register.rapyd || register.python;	//DEFPRINT(AST_SimpleStatement 608
    pattern = new RegExp("([w]+[.][w]+)");	//DEFPRINT(AST_SimpleStatement 610
    if (con.if_clause) {
        _con = con.if_clause.condition;	//DEFPRINT(AST_SimpleStatement 614
        _$Unpack = _con;	//DEFPRINT(AST_Assign 615
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 615
        if (!con.if_clause["pass"]) {
            setted = con["setted"];	//DEFPRINT(AST_SimpleStatement 618
            setter = con["setter"];	//DEFPRINT(AST_SimpleStatement 619
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 621
        }
        if (prop_a.match(pattern)) {
            prop_a.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 623
        }
        if (prop_b.match(pattern)) {
            prop_b.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 625
        }
        return;	//AST_Exit.DEFMETHOD( 627
    } else {
        _con = con.if_con;	//DEFPRINT(AST_SimpleStatement 631
        _$Unpack = _con;	//DEFPRINT(AST_Assign 632
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 632
        if (!con["pass"]) {
            setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 634
            setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 635
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 637
        }
        if (_$in_("self.", prop_a)) {
            prop_a.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 638
        }
        if (_$in_("self.", prop_b)) {
            prop_b.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 639
        }
    }
};	//class_fun_def A 462
ViewComponent.prototype.setattr = function setattr(attr, value){
    var self = this;	// complex body AST_Defun
    if (typeof attr == "string") {
        if (self.isIfStatement(value)) {
            self.registCondition(value);	//DEFPRINT(AST_SimpleStatement 645
        }
        if (self.isWatchObject(value)) {
            value.onChange.append({
                "target": self,
                "attr": attr
            });	//DEFPRINT(AST_SimpleStatement 647
        } else {
            self.set(attr, value);	//DEFPRINT(AST_SimpleStatement 649
        }
    } else {
        throw "Invalid attribute type! attribute must be a string type";	//AST_Exit.DEFMETHOD( 651
    }
};	//class_fun_def A 462
ViewComponent.prototype.isIfStatement = function isIfStatement(value){
    var self = this;	// complex body AST_Defun
    var condition, _if, key;	//complex body AST_Scope declare var as local
    if (typeof value == "object") {
        condition = value["python"] || value["rapyd"];	//DEFPRINT(AST_SimpleStatement 654
        if (!condition) {
            return false;	//AST_Exit.DEFMETHOD( 655
        }
        if (typeof condition == "object") {
            _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];	//DEFPRINT(AST_SimpleStatement 657
            var _$iter16 = dict.keys(condition);
            for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
                key = _$iter16[_$id16];
                if (_$in_(key, _if)) {
                    return true;	//AST_Exit.DEFMETHOD( 660
                }
            }
        }
    }
    return false;	//AST_Exit.DEFMETHOD( 661
};	//class_fun_def A 462
ViewComponent.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 667
};	//class_fun_def A 462
ViewComponent.prototype.setCondition = function setCondition(attr, condition){
    var self = this;	// complex body AST_Defun
    self.conditionData[attr] = condition;	//DEFPRINT(AST_SimpleStatement 669
};	//class_fun_def A 462
ViewComponent.prototype.componentInitialize = function componentInitialize(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 462
ViewComponent.prototype.setState = function setState(square){
    var self = this;	// complex body AST_Defun
    function wrapper() {
        square.state = self.state;	//DEFPRINT(AST_SimpleStatement 674
        if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
            square.x = self.x;	//DEFPRINT(AST_SimpleStatement 676
            square.y = self.y;	//DEFPRINT(AST_SimpleStatement 677
        }
    }
    return wrapper;	//AST_Exit.DEFMETHOD( 678
};	//class_fun_def A 462
ViewComponent.prototype._setComponentStates = function _setComponentStates(states_instance){
    var self = this;	// complex body AST_Defun
    self.States = states_instance;	//DEFPRINT(AST_SimpleStatement 680
};	//class_fun_def A 462
ViewComponent.prototype.getCompById = function getCompById(id_name, attr){
    var self = this;	// complex body AST_Defun
    function getcomp_id_wrapper() {
        return [id_name, attr];	//AST_Exit.DEFMETHOD( 684
    }
    return getcomp_id_wrapper;	//AST_Exit.DEFMETHOD( 685
};	//class_fun_def A 462
ViewComponent.prototype.bindToHtmlTag = function bindToHtmlTag(tag_dom){
    var self = this;	// complex body AST_Defun
    self.html_target = tag_dom;	//DEFPRINT(AST_SimpleStatement 689
};	//class_fun_def A 462
ViewComponent.prototype.setInstanceName = function setInstanceName(n){
    var self = this;	// complex body AST_Defun
    self.instance_name = n;	//DEFPRINT(AST_SimpleStatement 691
};	//class_fun_def A 462
ViewComponent.prototype.onStateChanged = function onStateChanged(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlId = function setHtmlId(tag_name, id){
    var self = this;	// complex body AST_Defun
    var css_selector;	//complex body AST_Scope declare var as local
    css_selector = tag_name + "#" + id;	//DEFPRINT(AST_SimpleStatement 703
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlState = function setHtmlState(state_name){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlGroup = function setHtmlGroup(group_name){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlRenderFrom = function setHtmlRenderFrom(str_id){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlStyle = function setHtmlStyle(styles){
    var self = this;	// complex body AST_Defun
    var style;	//complex body AST_Scope declare var as local
    style = styles.split(";");	//DEFPRINT(AST_SimpleStatement 712
};	//class_fun_def A 462
ViewComponent.prototype.addRapydComp = function addRapydComp(fn){
    var self = this;	// complex body AST_Defun
    self.__rapyd_comps__.append(fn);	//DEFPRINT(AST_SimpleStatement 714
};	//class_fun_def A 462
ViewComponent.prototype.setHtmlAttribute = function setHtmlAttribute(dom){
    var self = this;	// complex body AST_Defun
    var tag_name, data, instance, jq_target, instance, jq_target, k, v;	//complex body AST_Scope declare var as local
    tag_name = dom["tag_name"];	//DEFPRINT(AST_SimpleStatement 716
    data = dom["data"];	//DEFPRINT(AST_SimpleStatement 717
    instance = jq_target = "";	//DEFPRINT(AST_SimpleStatement 718
    var _$iter17 = dict.items(data);
    for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
        _$Unpack = _$iter17[_$id17];
        k = _$Unpack[0];
        v = _$Unpack[1];
        self.setHtmlAttribute(k, v);	//DEFPRINT(AST_SimpleStatement 721
        if (k == "id") {
            _$Unpack = self.setHtmlId(tag_name, v);	//DEFPRINT(AST_Assign 723
            instance = _$Unpack[0];
            jq_target = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 723
        } else if (k == "group") {
            self.setHtmlGroup(v);	//DEFPRINT(AST_SimpleStatement 725
        } else if (k == "state") {
            self.setHtmlState(v);	//DEFPRINT(AST_SimpleStatement 727
        } else if (k == "mvc") {
        } else if (k == "render_from") {
            self.setHtmlRenderFrom(v);	//DEFPRINT(AST_SimpleStatement 731
        } else if (k == "style") {
            self.css = CssStyle(jq_target);	//DEFPRINT(AST_SimpleStatement 733
            self.css.parseStyle(v);	//DEFPRINT(AST_SimpleStatement 734
        }
    }
};	//class_fun_def A 462
ViewComponent.prototype.parseCustomComponents = function parseCustomComponents(){
    var self = this;	// complex body AST_Defun
    var html_comptag_list, rapyd_comp_list, duplicate_comp_list, apply_html_comp_tag_list, pattern, comp_data, comp_tag, comps, comp, k, tag_id, tag_name, instance, rapyd_comp_html_id, ptn, matches, comp_instance, comp_class, comp_instances, html_comptag, comp_code, groups, comp_initial_fn;	//complex body AST_Scope declare var as local
    html_comptag_list = [];	//DEFPRINT(AST_SimpleStatement 739
    rapyd_comp_list = [];	//DEFPRINT(AST_SimpleStatement 740
    duplicate_comp_list = [];	//DEFPRINT(AST_SimpleStatement 741
    apply_html_comp_tag_list = [];	//DEFPRINT(AST_SimpleStatement 742
    pattern = eval('new RegExp("(?:[\\\\s](\\\\w+)[\\\\s]*[=][\\\\s]*new[\\\\s]*(\\\\w+))","gm")');	//DEFPRINT(AST_SimpleStatement 743
    var _$iter18 = self.__rapyd_comps__;
    for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
        comp_initial_fn = _$iter18[_$id18];
        comp_data = comp_initial_fn();	//DEFPRINT(AST_SimpleStatement 748
        var _$iter19 = dict.keys(comp_data);
        for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
            k = _$iter19[_$id19];
            self.component_tags.append(k);	//DEFPRINT(AST_SimpleStatement 752
            comp_tag = k;	//DEFPRINT(AST_SimpleStatement 753
            comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 754
            var _$iter20 = comps;
            for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
                comp = _$iter20[_$id20];
                html_comptag_list.append({
                    "tag_name": comp_tag,
                    "comp": comp
                });	//DEFPRINT(AST_SimpleStatement 758
            }
        }
        var _$iter21 = html_comptag_list;
        for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
            html_comptag = _$iter21[_$id21];
            tag_id = html_comptag["comp"].id;	//DEFPRINT(AST_SimpleStatement 763
            tag_name = html_comptag["tag_name"];	//DEFPRINT(AST_SimpleStatement 764
            var _$iter22 = dict.items(comp_data);
            for (var _$id22 = 0; _$id22 < _$iter22.length; _$id22++) {
                _$Unpack = _$iter22[_$id22];
                comp_class = _$Unpack[0];
                comp_instances = _$Unpack[1];
                var _$iter23 = comp_instances.slice(1);
                for (var _$id23 = 0; _$id23 < _$iter23.length; _$id23++) {
                    comp_instance = _$iter23[_$id23];
                    if (comp_instance["id"] == tag_id) {
                        instance = comp_instance["instance"];	//DEFPRINT(AST_SimpleStatement 771
                        instance.setInstanceName(comp_instance["id"]);	//DEFPRINT(AST_SimpleStatement 772
                        instance.bindToHtmlTag(html_comptag["comp"]);	//DEFPRINT(AST_SimpleStatement 773
                        apply_html_comp_tag_list.append({
                            "html_comp": html_comptag,
                            "rapyd_comp": comp_instance
                        });	//DEFPRINT(AST_SimpleStatement 775
                    } else {
                        if (tag_name == comp_class) {
                            rapyd_comp_html_id = comp_instance["instance"].data["html_id"];	//DEFPRINT(AST_SimpleStatement 778
                            ptn = re.compile(re, rapyd_comp_html_id);	//DEFPRINT(AST_SimpleStatement 786
                            matches = tag_id.match(ptn);	//DEFPRINT(AST_SimpleStatement 787
                            if (matches) {
                                duplicate_comp_list.append({
                                    "html_comp": html_comptag,
                                    "rapyd_comp": comp_instance
                                });	//DEFPRINT(AST_SimpleStatement 789
                            }
                        }
                    }
                }
            }
        }
        comp_code = comp_initial_fn.toString();	//DEFPRINT(AST_SimpleStatement 791
        groups = comp_code.match(pattern);	//DEFPRINT(AST_SimpleStatement 792
        self.info("comp_data \t\t= ", comp_data);	//DEFPRINT(AST_SimpleStatement 794
        self.info("duplicate list \t= ", duplicate_comp_list);	//DEFPRINT(AST_SimpleStatement 795
        self.info("apply list \t\t= ", apply_html_comp_tag_list);	//DEFPRINT(AST_SimpleStatement 796
    }
};	//class_fun_def A 462
ViewComponent.prototype.setCompFromHtmlCommentTags = function setCompFromHtmlCommentTags(comp_code){
    var self = this;	// complex body AST_Defun
    var comp_tags, comp_list, comps, comp, comp_tag, pattern, groups, matched_data, m, match, group;	//complex body AST_Scope declare var as local
    return;	//AST_Exit.DEFMETHOD( 805
    comp_tags = eval(comp_code.split("__comp_tags__ = ")[1].split(";")[0]);	//DEFPRINT(AST_SimpleStatement 806
    comp_list = [];	//DEFPRINT(AST_SimpleStatement 807
    var _$iter24 = comp_tags;
    for (var _$id24 = 0; _$id24 < _$iter24.length; _$id24++) {
        comp_tag = _$iter24[_$id24];
        comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 810
        var _$iter25 = comps;
        for (var _$id25 = 0; _$id25 < _$iter25.length; _$id25++) {
            comp = _$iter25[_$id25];
            comp_list.append({
                "tag_name": comp_tag,
                "comp": comp
            });	//DEFPRINT(AST_SimpleStatement 812
        }
    }
    jQuery.__compcode__ = comp_code;	//DEFPRINT(AST_SimpleStatement 814
    pattern = 'new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+))","gm")';	//DEFPRINT(AST_SimpleStatement 815
    groups = comp_code.match(eval(pattern));	//DEFPRINT(AST_SimpleStatement 816
    eval(comp_code);	//DEFPRINT(AST_SimpleStatement 818
    console.log("evaluated generated component");	//DEFPRINT(AST_SimpleStatement 819
    console.log("bt1 = ", bt1);	//DEFPRINT(AST_SimpleStatement 820
    matched_data = {};	//DEFPRINT(AST_SimpleStatement 821
    var _$iter26 = groups;
    for (var _$id26 = 0; _$id26 < _$iter26.length; _$id26++) {
        group = _$iter26[_$id26];
        m = pattern.exec(comp_code);	//DEFPRINT(AST_SimpleStatement 823
        match = m.slice(1);	//DEFPRINT(AST_SimpleStatement 824
        if (isEmpty(matched_data[match[1]])) {
            matched_data[match[1]] = [];	//DEFPRINT(AST_SimpleStatement 825
        }
        matched_data[match[1]].append(eval(match[0]));	//DEFPRINT(AST_SimpleStatement 826
    }
    self.component_tags = comp_tags;	//DEFPRINT(AST_SimpleStatement 828
    self.info("matched = ", matched_data, "comp_tags = ", comp_tags);	//DEFPRINT(AST_SimpleStatement 829
    self.setCompFromHtmlTags(comp_list);	//DEFPRINT(AST_SimpleStatement 830
};	//class_fun_def A 462
ViewComponent.prototype.setCompFromHtmlTags = function setCompFromHtmlTags(comp_list){
    var self = this;	// complex body AST_Defun
    var tag_name, comp, dom, node, _comp;	//complex body AST_Scope declare var as local
    var _$iter27 = comp_list;
    for (var _$id27 = 0; _$id27 < _$iter27.length; _$id27++) {
        _comp = _$iter27[_$id27];
        tag_name = _comp["tag_name"];	//DEFPRINT(AST_SimpleStatement 835
        comp = _comp["comp"];	//DEFPRINT(AST_SimpleStatement 836
        dom = {
            "tag_name": tag_name,
            "data": ""
        };	//DEFPRINT(AST_SimpleStatement 837
        var _$iter28 = comp.attributes;
        for (var _$id28 = 0; _$id28 < _$iter28.length; _$id28++) {
            node = _$iter28[_$id28];
            dom["data"][node.nodeName] = node.nodeValue;	//DEFPRINT(AST_SimpleStatement 839
        }
        self.log("[setCompFromHtmlTags] dom = ", dom);	//DEFPRINT(AST_SimpleStatement 841
        self.setHtmlAttribute(dom);	//DEFPRINT(AST_SimpleStatement 842
    }
};	//class_fun_def A 462
ViewComponent = __defineClassProperties__(ViewComponent);

var Animation = Callable(function Animation_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.data = {
        "tween": []
    };	//DEFPRINT(AST_SimpleStatement 846
});	//class_fun_def A 844
Animation.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 848
};	//class_fun_def A 844
Animation.prototype.setTwn = function setTwn(tween_code){
    var self = this;	// complex body AST_Defun
    function tween(anim) {
        function wrapper(code) {
            anim.data["tween"].append(code);	//DEFPRINT(AST_SimpleStatement 852
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 853
    }
    return tween(self);	//AST_Exit.DEFMETHOD( 854
};	//class_fun_def A 844
Animation.prototype.startAnime = function startAnime(target){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 844
Animation = __defineClassProperties__(Animation);

var State = Callable(function State_(states, target){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.parent = states;	//DEFPRINT(AST_SimpleStatement 859
    self.target = target;	//DEFPRINT(AST_SimpleStatement 860
    self.data = {
        "animation": [],
        "name": "",
        "setattr": [],
        "conditions": []
    };	//DEFPRINT(AST_SimpleStatement 861
});	//class_fun_def A 857
State.prototype.setCondition = function setCondition(attr, con){
    var self = this;	// complex body AST_Defun
    self.data["conditions"].append(con);	//DEFPRINT(AST_SimpleStatement 864
};	//class_fun_def A 857
State.prototype.setAnime = function setAnime(){
    var self = this;	// complex body AST_Defun
    var anim;	//complex body AST_Scope declare var as local
    anim = new Animation();	//DEFPRINT(AST_SimpleStatement 866
    self.data["animation"] = anim;	//DEFPRINT(AST_SimpleStatement 867
    return anim;	//AST_Exit.DEFMETHOD( 868
};	//class_fun_def A 857
State.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data["setattr"].append([ attr, value ]);	//DEFPRINT(AST_SimpleStatement 870
};	//class_fun_def A 857
State.prototype.setName = function setName(name){
    var self = this;	// complex body AST_Defun
    self.data[name] = name;	//DEFPRINT(AST_SimpleStatement 872
};	//class_fun_def A 857
State.prototype.addState = function addState(){
    var self = this;	// complex body AST_Defun
    return self.parent.addState();	//AST_Exit.DEFMETHOD( 874
};	//class_fun_def A 857
State.prototype.processSetAttr = function processSetAttr(){
    var self = this;	// complex body AST_Defun
    var lst;	//complex body AST_Scope declare var as local
    var _$iter29 = self.data["setattr"];
    for (var _$id29 = 0; _$id29 < _$iter29.length; _$id29++) {
        lst = _$iter29[_$id29];
        self.target[lst[0]] = lst[1];	//DEFPRINT(AST_SimpleStatement 879
    }
};	//class_fun_def A 857
State.prototype.processAnime = function processAnime(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 857
State = __defineClassProperties__(State);

var States = Callable(function States_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.states = [];	//DEFPRINT(AST_SimpleStatement 884
    self.current_state = self.target = "";	//DEFPRINT(AST_SimpleStatement 885
    self.setAsWatchObject("current_state", "default", mode = "");	//DEFPRINT(AST_SimpleStatement 886
});	//class_fun_def A 882
States.prototype = new ViewComponent("__inheritance__", States);	//class_fun_def C 882
States.prototype.getStates = function getStates(){
    var self = this;	// complex body AST_Defun
    return self.states;	//AST_Exit.DEFMETHOD( 889
};	//class_fun_def A 882
States.prototype.getStateByName = function getStateByName(name){
    var self = this;	// complex body AST_Defun
    var state;	//complex body AST_Scope declare var as local
    var _$iter30 = self.states;
    for (var _$id30 = 0; _$id30 < _$iter30.length; _$id30++) {
        state = _$iter30[_$id30];
        if (state.data.name == name) {
            return state.data;	//AST_Exit.DEFMETHOD( 894
        }
    }
};	//class_fun_def A 882
States.prototype.addState = function addState(){
    var self = this;	// complex body AST_Defun
    var state;	//complex body AST_Scope declare var as local
    state = new State(self, self.target);	//DEFPRINT(AST_SimpleStatement 896
    self.states.append(state);	//DEFPRINT(AST_SimpleStatement 897
    return state;	//AST_Exit.DEFMETHOD( 898
};	//class_fun_def A 882
States.prototype.setTarget = function setTarget(target){
    var self = this;	// complex body AST_Defun
    self.target = target;	//DEFPRINT(AST_SimpleStatement 901
    target._setComponentStates(self);	//DEFPRINT(AST_SimpleStatement 902
};	//class_fun_def A 882
States.prototype.setState = function setState(state_name){
    var self = this;	// complex body AST_Defun
    self.current_state = state_name;	//DEFPRINT(AST_SimpleStatement 908
};	//class_fun_def A 882
States = __defineClassProperties__(States);

var VisualElements = Callable(function VisualElements_(target, data){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var i;	//complex body AST_Scope declare var as local
    if (target) {
        function getter_callback(ref, attr) {
            function wrapper() {
                return ref[attr];	//AST_Exit.DEFMETHOD( 914
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 915
        }
        var _$iter31 = data;
        for (var _$id31 = 0; _$id31 < _$iter31.length; _$id31++) {
            i = _$iter31[_$id31];
            if (_$in_("-", i)) {
                self.__defineGetter__(i, getter_callback(self, i.replace("-", "_")));	//DEFPRINT(AST_SimpleStatement 918
            }
        }
        self.target = target;	//DEFPRINT(AST_SimpleStatement 919
        self.__allowed__ = data;	//DEFPRINT(AST_SimpleStatement 920
    }
});	//class_fun_def A 909
VisualElements.prototype.pos = function pos(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.pos_hint = function pos_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.size = function size(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.size_hint = function size_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.scale = function scale(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.scale_hint = function scale_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.background = function background(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.background_color = function background_color(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements.prototype.border = function border(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 909
VisualElements = __defineClassProperties__(VisualElements);



var Rectangle = Callable(function Rectangle_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (instance == "classprop_init") {
        self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 937
        self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 938
        class_properties(Rectangle, self);	//DEFPRINT(AST_SimpleStatement 939
    } else if (typeof instance == "object") {
        if (isEmpty(self.__instance__[instance.name])) {
            self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 942
        }
        self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 943
    }
    self.data = {};	//DEFPRINT(AST_SimpleStatement 946
    self.html_target = {};	//DEFPRINT(AST_SimpleStatement 947
    self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 948
});	//class_fun_def A 933
Rectangle.prototype = new ViewComponent("__inheritance__", Rectangle);	//class_fun_def C 933
Rectangle.prototype.getInstance = function getInstance(ins_name){
    var self = this;	// complex body AST_Defun
    return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 952
};	//class_fun_def A 933
Rectangle = __defineClassProperties__(Rectangle);
Rectangle = classprop_init(Rectangle);



var Button = Callable(function Button_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (instance == "classprop_init") {
        self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 959
        self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 960
        class_properties(Button, self);	//DEFPRINT(AST_SimpleStatement 961
    } else if (typeof instance == "object") {
        if (isEmpty(self.__instance__[instance.name])) {
            self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 964
        }
        self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 965
    }
    self.data = {};	//DEFPRINT(AST_SimpleStatement 968
    self.html_target = {};	//DEFPRINT(AST_SimpleStatement 969
    self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 970
});	//class_fun_def A 955
Button.prototype = new ViewComponent("__inheritance__", Button);	//class_fun_def C 955
Button.prototype.getInstance = function getInstance(ins_name){
    var self = this;	// complex body AST_Defun
    return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 980
};	//class_fun_def A 955
Button = __defineClassProperties__(Button);
Button = classprop_init(Button);

var Square = Callable(function Square_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    super_(Square, self).constructor(self);	//DEFPRINT(AST_SimpleStatement 987
});	//class_fun_def A 985
Square.prototype = new Rectangle("__inheritance__", Square);	//class_fun_def C 985
Square = __defineClassProperties__(Square);

var CustomButton = Callable(function CustomButton_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    super_(CustomButton, self).constructor(self);	//DEFPRINT(AST_SimpleStatement 992
});	//class_fun_def A 990
CustomButton.prototype = new Button("__inheritance__", CustomButton);	//class_fun_def C 990
CustomButton.prototype.set_state = function set_state(square){
    var self = this;	// complex body AST_Defun
    function wrapper() {
        square.state = self.state;	//DEFPRINT(AST_SimpleStatement 995
        if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
            square.x = self.x;	//DEFPRINT(AST_SimpleStatement 997
            square.y = self.y;	//DEFPRINT(AST_SimpleStatement 998
        }
    }
    return wrapper;	//AST_Exit.DEFMETHOD( 999
};	//class_fun_def A 990
CustomButton = __defineClassProperties__(CustomButton);

var test = Callable(function test_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(test,self).__init__.apply(self,arguments);});	//class_fun_def B 1003
test.prototype = new Button("__inheritance__", test);	//class_fun_def C 1003
test.prototype.__int__ = function __int__(){
    var self = this;	// complex body AST_Defun
    super_(test, self).__int__(self);	//DEFPRINT(AST_SimpleStatement 1005
};	//class_fun_def A 1003
test = __defineClassProperties__(test);

rapyd = new RapydWeb("init");	//DEFPRINT(AST_SimpleStatement 1011

controller = new Controller("init");	//DEFPRINT(AST_SimpleStatement 1012

ctr = new Controller("init");	//DEFPRINT(AST_SimpleStatement 1013

blog = new BlogController("init");	//DEFPRINT(AST_SimpleStatement 1014

model = new Model("init");	//DEFPRINT(AST_SimpleStatement 1015

m = new Model("init");	//DEFPRINT(AST_SimpleStatement 1016

view = new View("init");	//DEFPRINT(AST_SimpleStatement 1017

v = new View("init");	//DEFPRINT(AST_SimpleStatement 1018

rapyd.mediator = new Mediator("init");	//DEFPRINT(AST_SimpleStatement 1019

rapyd.mediator.address = new AddressMediator("init");	//DEFPRINT(AST_SimpleStatement 1020

rapyd.mediator.header = new HeaderMediator("init");	//DEFPRINT(AST_SimpleStatement 1021

vc = new ViewComponent("init");	//DEFPRINT(AST_SimpleStatement 1023

btn = new Button("init");	//DEFPRINT(AST_SimpleStatement 1024

rec = new Rectangle("init");	//DEFPRINT(AST_SimpleStatement 1025

square = new Square();	//DEFPRINT(AST_SimpleStatement 1027

sq = new Square();	//DEFPRINT(AST_SimpleStatement 1028

custom = new CustomButton();	//DEFPRINT(AST_SimpleStatement 1029

cus = new CustomButton();	//DEFPRINT(AST_SimpleStatement 1030

rapyd.mediator.header.a = rapyd.mediator.a = rapyd.mediator.address.a = rapyd.a = controller.a = ctr.a = blog.a = model.a = view.a = m.a = v.a = "aaaaaaa";	//DEFPRINT(AST_SimpleStatement 1031

sq.aa = cus.aa = vc.aaa = btn.aa = rec.aa = square.aa = custom.aa = "aaaaaaaaaaaaaaa";	//DEFPRINT(AST_SimpleStatement 1032

console.log(sq.__instance__);	//DEFPRINT(AST_SimpleStatement 1034
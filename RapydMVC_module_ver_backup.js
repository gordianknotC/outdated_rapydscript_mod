







__author__ = "gordiaknot";	//DEFPRINT(AST_SimpleStatement 9

auau = "";	//DEFPRINT(AST_SimpleStatement 10

function insert(lst, index, value) {
    var l, r, l;	//complex body AST_Scope declare var as local
    value = [ value ];	//DEFPRINT(AST_SimpleStatement 16
    l = lst.slice(0, index);	//DEFPRINT(AST_SimpleStatement 17
    r = lst.slice(index);	//DEFPRINT(AST_SimpleStatement 18
    l = l.concat(value);	//DEFPRINT(AST_SimpleStatement 19
    return l.concat(r);	//AST_Exit.DEFMETHOD( 20
}

function isEmpty(n) {
    var key;	//complex body AST_Scope declare var as local
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;	//AST_Exit.DEFMETHOD( 23
        }
        var _$iter0 = dict.keys(n);
        for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
            key = _$iter0[_$id0];
            return false;	//AST_Exit.DEFMETHOD( 25
        }
        return true;	//AST_Exit.DEFMETHOD( 26
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;	//AST_Exit.DEFMETHOD( 30
        } else {
            return true;	//AST_Exit.DEFMETHOD( 32
        }
    }
    if (n) {
        return false;	//AST_Exit.DEFMETHOD( 35
    } else {
        return true;	//AST_Exit.DEFMETHOD( 37
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    var tmp, tmp, i, fn, ins;	//complex body AST_Scope declare var as local
    tmp = "";	//DEFPRINT(AST_SimpleStatement 39
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";	//DEFPRINT(AST_SimpleStatement 41
    }
    fn = arguments[0];	//DEFPRINT(AST_SimpleStatement 42
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");	//DEFPRINT(AST_SimpleStatement 43
    return ins;	//AST_Exit.DEFMETHOD( 44
}

function set_scope(module_path) {
    var scope;	//complex body AST_Scope declare var as local
    scope = {};	//DEFPRINT(AST_SimpleStatement 46
    scope.__module__ = module_path;	//DEFPRINT(AST_SimpleStatement 47
    return scope;	//AST_Exit.DEFMETHOD( 48
}

function module(fn_module) {
    var module_member_data, scope_attrs, scope, _filter, is_k_in_filter, k, v, key, value, attr;	//complex body AST_Scope declare var as local
    function getAllExcept(lst, _module) {
        function wrapper() {
            var name, _filter, tmp, m, is_k_in_filter, k, v;	//complex body AST_Scope declare var as local
            name = _module.name;	//DEFPRINT(AST_SimpleStatement 52
            _filter = lst;	//DEFPRINT(AST_SimpleStatement 53
            tmp = {};	//DEFPRINT(AST_SimpleStatement 54
            m = eval(name).prototype;	//DEFPRINT(AST_SimpleStatement 55
            var _$iter1 = dict.items(m);
            for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
                _$Unpack = _$iter1[_$id1];
                k = _$Unpack[0];
                v = _$Unpack[1];
                is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 57
                if (!is_k_in_filter) {
                    tmp[k] = v;	//DEFPRINT(AST_SimpleStatement 59
                }
            }
            return tmp;	//AST_Exit.DEFMETHOD( 60
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 61
    }
    if (isEmpty(fn_module.prototype)) {
        module_member_data = fn_module();	//DEFPRINT(AST_SimpleStatement 64
        module_member_data.ALL = getAllExcept([ "ALL", "scope" ], fn_module);	//DEFPRINT(AST_SimpleStatement 65
        scope_attrs = [];	//DEFPRINT(AST_SimpleStatement 66
        scope = module_member_data.scope;	//DEFPRINT(AST_SimpleStatement 67
        _filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__", "__module__" ];	//DEFPRINT(AST_SimpleStatement 68
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
                    is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 72
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);	//DEFPRINT(AST_SimpleStatement 74
                        if (isEmpty(module_member_data[k])) {
                            module_member_data[k] = v;	//DEFPRINT(AST_SimpleStatement 75
                        } else {
                            throw "[Error][Naming Confliction]module-scope variable: [" + k + "] interfere with module member: [" + k + "]";	//AST_Exit.DEFMETHOD( 76
                        }
                        scope["_" + k] = v;	//DEFPRINT(AST_SimpleStatement 77
                        scope_attrs.append(k);	//DEFPRINT(AST_SimpleStatement 78
                    }
                }
            }
        }
        module_member_data["scope"] = scope;	//DEFPRINT(AST_SimpleStatement 79
        fn_module.prototype = module_member_data;	//DEFPRINT(AST_SimpleStatement 80
        function setter_callback(scope_obj, _attr) {
            function wrapper(_value) {
                eval(scope_obj.__module__).prototype.scope["_" + _attr] = _value;	//DEFPRINT(AST_SimpleStatement 84
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 85
        }
        function getter_callback(scope_obj, _attr) {
            function wrapper() {
                return eval(scope_obj.__module__).prototype.scope["_" + _attr];	//AST_Exit.DEFMETHOD( 88
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 89
        }
        var _$iter4 = scope_attrs;
        for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
            attr = _$iter4[_$id4];
            console.log("set getter and setter for ", attr);	//DEFPRINT(AST_SimpleStatement 92
            scope.__defineSetter__(attr, setter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 93
            scope.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 94
        }
        fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 96
        fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 97
        fn_module.prototype.prototype = fn_module.prototype;	//DEFPRINT(AST_SimpleStatement 99
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 100
    } else {
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 102
    }
}

function class_properties(cls, props) {
    var k, v;	//complex body AST_Scope declare var as local
    if (!cls.prototype.__classproperty_setted__) {
        function getter(_cls, k) {
            function wrapper() {
                return _cls.prototype[k];	//AST_Exit.DEFMETHOD( 107
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 108
        }
        function setter(_cls, k) {
            function wrapper(value) {
                _cls.prototype[k] = value;	//DEFPRINT(AST_SimpleStatement 111
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 112
        }
        var _$iter5 = dict.items(props);
        for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
            _$Unpack = _$iter5[_$id5];
            k = _$Unpack[0];
            v = _$Unpack[1];
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 115
            cls.prototype[k] = v;	//DEFPRINT(AST_SimpleStatement 116
            cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 117
            cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 118
        }
        cls.prototype.__classproperty_setted__ = true;	//DEFPRINT(AST_SimpleStatement 119
    }
}

function classprop_init(f) {
    f.prototype.__classproperty_setted__ = false;	//DEFPRINT(AST_SimpleStatement 121
    f.prototype.__init__ = f.prototype.constructor;	//DEFPRINT(AST_SimpleStatement 122
    eval('new f("classprop_init")');	//DEFPRINT(AST_SimpleStatement 123
    return f;	//AST_Exit.DEFMETHOD( 124
}

function super_(cls, instance) {
    instance.name = cls.name;	//DEFPRINT(AST_SimpleStatement 126
    return instance.__proto__.__proto__;	//AST_Exit.DEFMETHOD( 127
}



function RapydMVC() {
    var scope;	//complex body AST_Scope declare var as local
    scope = set_scope("RapydMVC");	//DEFPRINT(AST_SimpleStatement 132
    scope.variableA = "valueA";	//DEFPRINT(AST_SimpleStatement 133
    scope.variableB = "valueB";	//DEFPRINT(AST_SimpleStatement 134
    
    function MVC() {
        var scope, rapyd;	//complex body AST_Scope declare var as local
        scope = set_scope("RapydMVC.MVC");	//DEFPRINT(AST_SimpleStatement 138
        
        var RapydWeb = Callable(function RapydWeb_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init == "classprop_init") {
                self.m = [];	//DEFPRINT(AST_SimpleStatement 149
                self.v = [];	//DEFPRINT(AST_SimpleStatement 150
                self.c = [];	//DEFPRINT(AST_SimpleStatement 151
                self.action = self.debug = "";	//DEFPRINT(AST_SimpleStatement 152
                self.components = [];	//DEFPRINT(AST_SimpleStatement 153
                self.config = [];	//DEFPRINT(AST_SimpleStatement 154
                self.__instance__ = [];	//DEFPRINT(AST_SimpleStatement 155
                class_properties(RapydWeb, self);	//DEFPRINT(AST_SimpleStatement 156
            } else if (init) {
                self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 159
            }
        });	//class_fun_def A 141
        RapydWeb.prototype.getJamalInstance = function getJamalInstance(){
            var self = this;	// complex body AST_Defun
            return eval(JamalInstance);	//AST_Exit.DEFMETHOD( 162
        };	//class_fun_def A 141
        RapydWeb.prototype.instanceinit = function instanceinit(){
            var self = this;	// complex body AST_Defun
            self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 165
        };	//class_fun_def A 141
        RapydWeb.prototype.start = function start(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 141
        RapydWeb.prototype.configure = function configure(){
            var self = this;	// complex body AST_Defun
            " initialize all configuration";	//DEFPRINT(AST_Directive 171
        };	//class_fun_def A 141
        RapydWeb.prototype.log = function log(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name, args;	//complex body AST_Scope declare var as local
            if (self.log.caller) {
                name = "[" + self.log.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 176
                args = args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 177
            }
            console.log.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 178
        };	//class_fun_def A 141
        RapydWeb.prototype.error = function error(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name, args;	//complex body AST_Scope declare var as local
            name = "[" + self.error.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 184
            args = args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 185
            console.error.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 186
        };	//class_fun_def A 141
        RapydWeb.prototype.info = function info(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name, args;	//complex body AST_Scope declare var as local
            name = "[" + self.info.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 190
            args = args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 191
            console.info.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 192
        };	//class_fun_def A 141
        RapydWeb.prototype.__linkJamalProto__ = function __linkJamalProto__(successor){
            var self = this;	// complex body AST_Defun
            successor.__proto__ = eval(JamalInstance);	//DEFPRINT(AST_SimpleStatement 195
        };	//class_fun_def A 141
        RapydWeb.prototype.__linkMVCMediatorProto__ = function __linkMVCMediatorProto__(successor){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 141
        RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
            var self = this;	// complex body AST_Defun
            var action, action;	//complex body AST_Scope declare var as local
            self.checkActionsAvailable(name, sub_successor);	//DEFPRINT(AST_SimpleStatement 202
            if (!hyper_successor.__actions__[name]) {
                hyper_successor.__actions__[name] = {};	//DEFPRINT(AST_SimpleStatement 203
            }
            self.log("__actions__ = ", hyper_successor.__actions__);	//DEFPRINT(AST_SimpleStatement 204
            self.log("successor actions = ", sub_successor.actions);	//DEFPRINT(AST_SimpleStatement 205
            if (!hyper_successor.name == "View") {
                var _$iter6 = sub_successor.actions;
                for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
                    action = _$iter6[_$id6];
                    hyper_successor.__actions__[name][action] = self.actionPropStructure();	//DEFPRINT(AST_SimpleStatement 209
                }
            } else {
                var _$iter7 = sub_successor.actions;
                for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
                    action = _$iter7[_$id7];
                    hyper_successor.__actions__[name][action] = self.viewPropStructure();	//DEFPRINT(AST_SimpleStatement 212
                }
            }
        };	//class_fun_def A 141
        RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
            var self = this;	// complex body AST_Defun
            if (sub_successor.components) {
                if (!hyper_successor.__components__[name]) {
                    hyper_successor.__components__[name] = [];	//DEFPRINT(AST_SimpleStatement 217
                }
                hyper_successor.__components__[name] = sub_successor.components;	//DEFPRINT(AST_SimpleStatement 218
            }
        };	//class_fun_def A 141
        RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
            var self = this;	// complex body AST_Defun
            var r;	//complex body AST_Scope declare var as local
            r = {
                "views": [],
                "props": {}
            };	//DEFPRINT(AST_SimpleStatement 221
            return r;	//AST_Exit.DEFMETHOD( 222
        };	//class_fun_def A 141
        RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
            var self = this;	// complex body AST_Defun
            var r;	//complex body AST_Scope declare var as local
            r = {
                "views": [],
                "props": {}
            };	//DEFPRINT(AST_SimpleStatement 225
            return r;	//AST_Exit.DEFMETHOD( 226
        };	//class_fun_def A 141
        RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
            var self = this;	// complex body AST_Defun
            var action;	//complex body AST_Scope declare var as local
            self.log(name, successor);	//DEFPRINT(AST_SimpleStatement 229
            self.log(successor.actions);	//DEFPRINT(AST_SimpleStatement 230
            var _$iter8 = successor.actions;
            for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
                action = _$iter8[_$id8];
                if (!successor[action]) {
                    self.error("[error] actions [{0}] not exists", action);	//DEFPRINT(AST_SimpleStatement 233
                    return false;	//AST_Exit.DEFMETHOD( 234
                }
            }
        };	//class_fun_def A 141
        RapydWeb = __defineClassProperties__(RapydWeb);
        RapydWeb = classprop_init(RapydWeb);
        var Controller = Callable(function Controller_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 250
                RapydWeb.prototype.__instance__["Controller"] = self;	//DEFPRINT(AST_SimpleStatement 252
                self.__classname__ = "Controller";	//DEFPRINT(AST_SimpleStatement 253
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 254
                self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 255
            }
        });	//class_fun_def A 240
        Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 240
        Controller.prototype.init = function init(name, successor){
            var self = this;	// complex body AST_Defun
            "\n\t\t\t\tinit alwasys call from its successor:\n\n\t\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t\t";	//DEFPRINT(AST_Directive 258
            self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 259
            self.__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 260
        };	//class_fun_def A 240
        Controller.prototype.__getattr__ = function __getattr__(item){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 263
            item;	//DEFPRINT(AST_SimpleStatement 263
        };	//class_fun_def A 240
        Controller.prototype.__get__ = function __get__(instance, owner){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 266
            [instance, owner];	//DEFPRINT(AST_SimpleStatement 266
        };	//class_fun_def A 240
        Controller.prototype.__beforAction = function __beforAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.beforeAction(f, args);	//DEFPRINT(AST_SimpleStatement 269
        };	//class_fun_def A 240
        Controller.prototype.beforeAction = function beforeAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 240
        Controller.prototype.afterAction = function afterAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 240
        Controller.prototype.__afterAction = function __afterAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.__startRender(f, args);	//DEFPRINT(AST_SimpleStatement 278
        };	//class_fun_def A 240
        Controller.prototype.__startRender = function __startRender(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 240
        Controller = __defineClassProperties__(Controller);
        var View = Callable(function View_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 293
                RapydWeb.prototype.__instance__["View"] = self;	//DEFPRINT(AST_SimpleStatement 295
                self.__classname__ = "View";	//DEFPRINT(AST_SimpleStatement 296
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 297
                self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 298
            }
        });	//class_fun_def A 283
        View.prototype = new RapydWeb("__inheritance__", View);	//class_fun_def C 283
        View.prototype.init = function init(name, successor){
            var self = this;	// complex body AST_Defun
            "\n\t\t\t\tinit alwasys call from its successor:\n\n\t\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t\t";	//DEFPRINT(AST_Directive 301
            self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 302
            self.__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 303
        };	//class_fun_def A 283
        View.prototype.beforeRender = function beforeRender(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 283
        View.prototype.afterRender = function afterRender(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 283
        View.prototype.mapToHtml = function mapToHtml(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 283
        View.prototype.getComponentComment = function getComponentComment(){
            var self = this;	// complex body AST_Defun
            var comp_comment, comps, _comp, node, value, attr, comp, comp_name;	//complex body AST_Scope declare var as local
            comp_comment = jQuery("body").comments()[0];	//DEFPRINT(AST_SimpleStatement 316
            var _$iter9 = self.view_components_name;
            for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
                comp_name = _$iter9[_$id9];
                self.view_components_attributes[comp_name] = {};	//DEFPRINT(AST_SimpleStatement 318
                comps = comp_comment.getElementsByTagName(comp_name);	//DEFPRINT(AST_SimpleStatement 319
                var _$iter10 = comps;
                for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
                    comp = _$iter10[_$id10];
                    _comp = {};	//DEFPRINT(AST_SimpleStatement 321
                    var _$iter11 = comp.attributes;
                    for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
                        attr = _$iter11[_$id11];
                        node = attr.nodeName;	//DEFPRINT(AST_SimpleStatement 323
                        value = attr.value;	//DEFPRINT(AST_SimpleStatement 324
                        _comp[node] = value;	//DEFPRINT(AST_SimpleStatement 325
                    }
                    self.view_components_attributes[comp_name][_comp.id] = _comp;	//DEFPRINT(AST_SimpleStatement 326
                }
            }
        };	//class_fun_def A 283
        View = __defineClassProperties__(View);
        var Model = Callable(function Model_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 338
                RapydWeb.prototype.__instance__["Model"] = self;	//DEFPRINT(AST_SimpleStatement 340
                self.__classname__ = "Model";	//DEFPRINT(AST_SimpleStatement 341
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 342
            }
        });	//class_fun_def A 328
        Model.prototype = new RapydWeb("__inheritance__", Model);	//class_fun_def C 328
        Model.prototype.init = function init(name, successor){
            var self = this;	// complex body AST_Defun
            "\n\t\t\t\tinit alwasys call from its successor:\n\n\t\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t\t";	//DEFPRINT(AST_Directive 345
            self.__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 346
        };	//class_fun_def A 328
        Model.prototype.beforeSend = function beforeSend(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 328
        Model.prototype.afterSend = function afterSend(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 328
        Model.prototype.beforeSave = function beforeSave(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 328
        Model.prototype.afterSaver = function afterSaver(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 328
        Model = __defineClassProperties__(Model);
        var Mediator = Callable(function Mediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];	//DEFPRINT(AST_SimpleStatement 368
                RapydWeb.prototype.__instance__["Mediator"] = self;	//DEFPRINT(AST_SimpleStatement 370
                self.__classname__ = "Mediator";	//DEFPRINT(AST_SimpleStatement 371
            }
        });	//class_fun_def A 360
        Mediator.prototype = new RapydWeb("__inheritance__", Mediator);	//class_fun_def C 360
        Mediator.prototype.test = function test(){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 374
            "mediator test";	//DEFPRINT(AST_SimpleStatement 374
        };	//class_fun_def A 360
        Mediator.prototype.test2 = function test2(){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 377
            "mediator test2";	//DEFPRINT(AST_SimpleStatement 377
        };	//class_fun_def A 360
        Mediator = __defineClassProperties__(Mediator);
        var HeaderMediator = Callable(function HeaderMediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["Mediator"];	//DEFPRINT(AST_SimpleStatement 389
                RapydWeb.prototype.__instance__["HeaderMediator"] = self;	//DEFPRINT(AST_SimpleStatement 390
            }
        });	//class_fun_def A 385
        HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);	//class_fun_def C 385
        HeaderMediator.prototype.catchHeader = function catchHeader(header){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 385
        HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 385
        HeaderMediator = __defineClassProperties__(HeaderMediator);
        var AddressMediator = Callable(function AddressMediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init) {
                self.__proto__ = RapydWeb.prototype.__instance__["Mediator"];	//DEFPRINT(AST_SimpleStatement 403
                RapydWeb.prototype.__instance__["AddressMediator"] = self;	//DEFPRINT(AST_SimpleStatement 404
            }
        });	//class_fun_def A 398
        AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);	//class_fun_def C 398
        AddressMediator.prototype.suspendRediret = function suspendRediret(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator.prototype.redirectTo = function redirectTo(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator.prototype.historyNext = function historyNext(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator.prototype.historyPrev = function historyPrev(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator.prototype.getHistories = function getHistories(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator.prototype.onAddressChange = function onAddressChange(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 398
        AddressMediator = __defineClassProperties__(AddressMediator);
        rapyd = new RapydWeb("init");	//DEFPRINT(AST_SimpleStatement 424
        rapyd.c = new Controller("init");	//DEFPRINT(AST_SimpleStatement 425
        rapyd.m = new Model("init");	//DEFPRINT(AST_SimpleStatement 426
        rapyd.v = new View("init");	//DEFPRINT(AST_SimpleStatement 427
        rapyd.mediator = new Mediator("init");	//DEFPRINT(AST_SimpleStatement 428
        rapyd.mediator.address = new AddressMediator("init");	//DEFPRINT(AST_SimpleStatement 429
        rapyd.mediator.header = new HeaderMediator("init");	//DEFPRINT(AST_SimpleStatement 430
        return {
            RapydWeb: RapydWeb,
            Controller: Controller,
            View: View,
            Model: Model,
            Mediator: Mediator,
            HeaderMediator: HeaderMediator,
            AddressMediator: AddressMediator,
            scope: scope,
            instance_pack: rapyd
        };	//AST_Exit.DEFMETHOD( 432
    }
    MVC = module(MVC);
    
    function UiKit() {
        var scope, mvc, View;	//complex body AST_Scope declare var as local
        scope = set_scope("RapydMVC.UiKit");	//DEFPRINT(AST_SimpleStatement 436
        mvc = MVC;	//DEFPRINT(AST_SimpleStatement 437
        View = mvc.View;	//DEFPRINT(AST_SimpleStatement 438
        
        var CssStyle = Callable(function CssStyle_(targets){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (targets == "classprop_init") {
                self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];	//DEFPRINT(AST_SimpleStatement 444
                self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];	//DEFPRINT(AST_SimpleStatement 446
                self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];	//DEFPRINT(AST_SimpleStatement 447
                self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];	//DEFPRINT(AST_SimpleStatement 449
                self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];	//DEFPRINT(AST_SimpleStatement 450
                class_properties(CssStyle, self);	//DEFPRINT(AST_SimpleStatement 453
            }
            if (targets) {
                self.targets = targets;	//DEFPRINT(AST_SimpleStatement 456
            }
        });	//class_fun_def A 441
        CssStyle.prototype.setStyle = function setStyle(k, v){
            var self = this;	// complex body AST_Defun
            var target;	//complex body AST_Scope declare var as local
            var _$iter12 = self.targets;
            for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
                target = _$iter12[_$id12];
                target.style[k] = v;	//DEFPRINT(AST_SimpleStatement 460
            }
        };	//class_fun_def A 441
        CssStyle.prototype.parseStyle = function parseStyle(styles){
            var self = this;	// complex body AST_Defun
            var k, v, pos_arr, x, y, x, y, z, w, h, style;	//complex body AST_Scope declare var as local
            styles = styles.split(";").slice(0, -1);	//DEFPRINT(AST_SimpleStatement 463
            var _$iter13 = styles;
            for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
                style = _$iter13[_$id13];
                k = style.split(":")[0].strip();	//DEFPRINT(AST_SimpleStatement 465
                v = style.split(":")[1].strip();	//DEFPRINT(AST_SimpleStatement 466
                if (_$in_(k, self.HTML_POSITIONING_FAMILY)) {
                    if (k == "pos") {
                        pos_arr = v.split(",");	//DEFPRINT(AST_SimpleStatement 469
                        if (len(pos_arr) == 2) {
                            _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 471
                            x = _$Unpack[0];
                            y = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 471
                        } else if (len(pos_arr) == 3) {
                            _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 473
                            x = _$Unpack[0];
                            y = _$Unpack[1];
                            z = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 473
                            self.setStyle("z-index", z);	//DEFPRINT(AST_SimpleStatement 474
                        } else {
                            throw "Invalid pos format: {0}".format(style);	//AST_Exit.DEFMETHOD( 476
                        }
                        self.setStyle("left", x);	//DEFPRINT(AST_SimpleStatement 478
                        self.setStyle("top", y);	//DEFPRINT(AST_SimpleStatement 479
                    } else if (k == "pos_hint") {
                    }
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 483
                } else if (_$in_(k, self.HTML_BACKGROUND_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 485
                } else if (_$in_(k, self.HTML_APPEARANCE_FAMILY)) {
                    if (k == "size") {
                        _$Unpack = v.split(",");	//DEFPRINT(AST_Assign 488
                        w = _$Unpack[0];
                        h = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 488
                        self.setStyle("width", w);	//DEFPRINT(AST_SimpleStatement 489
                        self.setStyle("height", h);	//DEFPRINT(AST_SimpleStatement 490
                    } else if (k == "size_hint") {
                    }
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 494
                } else if (_$in_(k, self.HTML_BORDER_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 496
                } else if (_$in_(k, self.HTML_TEXT_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 498
                } else {
                    throw "Invalid or unsupported Style tag: {0}".format(k);	//AST_Exit.DEFMETHOD( 500
                }
                self.setStyle(k, v);	//DEFPRINT(AST_SimpleStatement 502
            }
        };	//class_fun_def A 441
        CssStyle = __defineClassProperties__(CssStyle);
        CssStyle = classprop_init(CssStyle);
        var Template = Callable(function Template_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
        });	//class_fun_def A 513
        Template.prototype = new View("__inheritance__", Template);	//class_fun_def C 513
        Template = __defineClassProperties__(Template);
        
        var ViewComponent = Callable(function ViewComponent_(init, comp_code){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init == "classprop_init") {
                self.HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY;	//DEFPRINT(AST_SimpleStatement 527
                self.HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY;	//DEFPRINT(AST_SimpleStatement 528
                self.HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY;	//DEFPRINT(AST_SimpleStatement 529
                self.HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY;	//DEFPRINT(AST_SimpleStatement 530
                self.HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY;	//DEFPRINT(AST_SimpleStatement 531
                class_properties(ViewComponent, self);	//DEFPRINT(AST_SimpleStatement 532
            } else if (init) {
                self.setAsWatchObject(self, "test", "test value");	//DEFPRINT(AST_SimpleStatement 536
                self.setAsWatchObject(self, "test2", "set_from_callback value");	//DEFPRINT(AST_SimpleStatement 537
                if (comp_code) {
                    self.css = {};	//DEFPRINT(AST_SimpleStatement 540
                    self.component_tags = [];	//DEFPRINT(AST_SimpleStatement 541
                    self.setCompFromHtmlCommentTags(comp_code);	//DEFPRINT(AST_SimpleStatement 542
                }
            }
        });	//class_fun_def A 522
        ViewComponent.prototype = new View("__inheritance__", ViewComponent);	//class_fun_def C 522
        ViewComponent.prototype.setAsWatchObject = function setAsWatchObject(attr, value, mode){
            var self = this;	// complex body AST_Defun
            var obj;	//complex body AST_Scope declare var as local
            obj = {
                "value": value,
                "onChange": [],
                "mode": mode
            };	//DEFPRINT(AST_SimpleStatement 548
            self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 549
            function setter_callback(instance, attr) {
                function wrapper(_value) {
                    instance.onChange(attr, _value);	//DEFPRINT(AST_SimpleStatement 553
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 554
            }
            function getter_callback(instance, attr) {
                function wrapper(_value) {
                    return instance.get(attr);	//AST_Exit.DEFMETHOD( 558
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 559
            }
            self.__defineSetter__(attr, setter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 561
            self.__defineGetter__(attr, getter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 562
            return obj;	//AST_Exit.DEFMETHOD( 563
        };	//class_fun_def A 522
        ViewComponent.prototype.isWatchObject = function isWatchObject(value){
            var self = this;	// complex body AST_Defun
            var value_in_dict, onchange_in_dict;	//complex body AST_Scope declare var as local
            if (!typeof value == "object") {
                return false;	//AST_Exit.DEFMETHOD( 565
            }
            value_in_dict = _$in_("value", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 566
            onchange_in_dict = _$in_("onChange", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 567
            self.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);	//DEFPRINT(AST_SimpleStatement 568
            return value_in_dict || onchange_in_dict;	//AST_Exit.DEFMETHOD( 570
        };	//class_fun_def A 522
        ViewComponent.prototype.set = function set(attr, value){
            var self = this;	// complex body AST_Defun
            self["_" + attr] = value;	//DEFPRINT(AST_SimpleStatement 573
        };	//class_fun_def A 522
        ViewComponent.prototype.get = function get(attr){
            var self = this;	// complex body AST_Defun
            return self["_" + attr];	//AST_Exit.DEFMETHOD( 576
        };	//class_fun_def A 522
        ViewComponent.prototype.onChange = function onChange(attr, value){
            var self = this;	// complex body AST_Defun
            var original_value, on_change_register_list, mode, state, state_data, state_conditions, _dict, target, target_attr, obj;	//complex body AST_Scope declare var as local
            original_value = self.get(attr);	//DEFPRINT(AST_SimpleStatement 578
            self.info(" origianal value = ", original_value);	//DEFPRINT(AST_SimpleStatement 579
            if (!self.isWatchObject(original_value)) {
                throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';	//AST_Exit.DEFMETHOD( 581
            }
            on_change_register_list = original_value.onChange;	//DEFPRINT(AST_SimpleStatement 583
            mode = original_value.mode;	//DEFPRINT(AST_SimpleStatement 584
            if (mode == "states") {
                state = self.States.getStateByName(value);	//DEFPRINT(AST_SimpleStatement 587
                state_data = state.data;	//DEFPRINT(AST_SimpleStatement 588
                state.processSetAttr();	//DEFPRINT(AST_SimpleStatement 589
                state.processAnime();	//DEFPRINT(AST_SimpleStatement 590
                state_conditions = state_data.conditions;	//DEFPRINT(AST_SimpleStatement 591
                var _$iter14 = state_conditions;
                for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
                    _dict = _$iter14[_$id14];
                    self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 593
                }
                return;	//AST_Exit.DEFMETHOD( 594
            } else if (mode == "visual_component") {
                self.VisuelElements[attr](value);	//DEFPRINT(AST_SimpleStatement 597
                return;	//AST_Exit.DEFMETHOD( 598
            }
            var _$iter15 = on_change_register_list;
            for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
                _dict = _$iter15[_$id15];
                if (_$in_("condition", dict.keys(_dict))) {
                    self.info("[set onchange list] set var with condition, attr = ", attr);	//DEFPRINT(AST_SimpleStatement 603
                    self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 604
                } else {
                    self.info("[set onchange list] set var, attr = ", attr, "value = ", value);	//DEFPRINT(AST_SimpleStatement 606
                    target = _dict["target"];	//DEFPRINT(AST_SimpleStatement 607
                    target_attr = _dict["attr"];	//DEFPRINT(AST_SimpleStatement 608
                    target.set(target_attr, value);	//DEFPRINT(AST_SimpleStatement 609
                }
            }
            self.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);	//DEFPRINT(AST_SimpleStatement 612
            obj = self.get(attr);	//DEFPRINT(AST_SimpleStatement 614
            obj.value = value;	//DEFPRINT(AST_SimpleStatement 615
            self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 616
        };	//class_fun_def A 522
        ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con){
            var self = this;	// complex body AST_Defun
            var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;	//complex body AST_Scope declare var as local
            "\n\t\t\t\trapydscript if elif else clause structure::\n\t\t\t\t{'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t\t\t'elif_clause': [{\n\t\t\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t\t\t'if_clause':\n\t\t\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\t\t\tpython if else clause structure\n\t\t\t\t{'if_setter'\t: \"'pressed'\",\n\t\t\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'else_setter'\t: \"'abc'\",\n\t\t\t\t'if_setted'\t\t: _state.name})";	//DEFPRINT(AST_Directive 618
            function get_condition(con_lst) {
                var prop_a, operator, prop_b, condition;	//complex body AST_Scope declare var as local
                _$Unpack = con_lst;	//DEFPRINT(AST_Assign 620
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 620
                condition = prop_a + operator + prop_b;	//DEFPRINT(AST_SimpleStatement 621
                return eval(condition);	//AST_Exit.DEFMETHOD( 622
            }
            if (con.if_clause) {
                var _$iter16 = dict.keys(con);
                for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
                    key = _$iter16[_$id16];
                    current = con[key];	//DEFPRINT(AST_SimpleStatement 626
                    _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 627
                    _pass = current["pass"];	//DEFPRINT(AST_SimpleStatement 628
                    condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 629
                    if (condition || !isEmpty(_condition)) {
                        if (!_pass) {
                            setted = current["setted"];	//DEFPRINT(AST_SimpleStatement 635
                            setter = current["setter"];	//DEFPRINT(AST_SimpleStatement 636
                            if (self.isWatchObject(setter)) {
                                v = setter.value;	//DEFPRINT(AST_SimpleStatement 638
                            } else {
                                v = setter;	//DEFPRINT(AST_SimpleStatement 640
                            }
                            if (self.isWatchObject(setted)) {
                                setted.value = v;	//DEFPRINT(AST_SimpleStatement 642
                            } else {
                                throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 644
                            }
                            continue;
                        } else {
                            continue;
                        }
                    }
                }
            } else if (con.if_con) {
                _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 650
                setted = current["if_setted"];	//DEFPRINT(AST_SimpleStatement 651
                condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 652
                if (condition) {
                    setter = current["if_setter"];	//DEFPRINT(AST_SimpleStatement 654
                } else {
                    setter = current["else_setter"];	//DEFPRINT(AST_SimpleStatement 656
                }
                if (self.isWatchObject(setter)) {
                    v = setter.value;	//DEFPRINT(AST_SimpleStatement 658
                } else {
                    v = setter;	//DEFPRINT(AST_SimpleStatement 660
                }
                if (self.isWatchObject(setted)) {
                    setted.value = v;	//DEFPRINT(AST_SimpleStatement 662
                } else {
                    throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 664
                }
            }
        };	//class_fun_def A 522
        ViewComponent.prototype.registCondition = function registCondition(register){
            var self = this;	// complex body AST_Defun
            var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;	//complex body AST_Scope declare var as local
            con = register.rapyd || register.python;	//DEFPRINT(AST_SimpleStatement 666
            pattern = new RegExp("([w]+[.][w]+)");	//DEFPRINT(AST_SimpleStatement 668
            if (con.if_clause) {
                _con = con.if_clause.condition;	//DEFPRINT(AST_SimpleStatement 672
                _$Unpack = _con;	//DEFPRINT(AST_Assign 673
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 673
                if (!con.if_clause["pass"]) {
                    setted = con["setted"];	//DEFPRINT(AST_SimpleStatement 676
                    setter = con["setter"];	//DEFPRINT(AST_SimpleStatement 677
                } else {
                    setted = setter = "";	//DEFPRINT(AST_SimpleStatement 679
                }
                if (prop_a.match(pattern)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 681
                }
                if (prop_b.match(pattern)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 683
                }
                return;	//AST_Exit.DEFMETHOD( 685
            } else {
                _con = con.if_con;	//DEFPRINT(AST_SimpleStatement 689
                _$Unpack = _con;	//DEFPRINT(AST_Assign 690
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 690
                if (!con["pass"]) {
                    setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 692
                    setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 693
                } else {
                    setted = setter = "";	//DEFPRINT(AST_SimpleStatement 695
                }
                if (_$in_("self.", prop_a)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 696
                }
                if (_$in_("self.", prop_b)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 697
                }
            }
        };	//class_fun_def A 522
        ViewComponent.prototype.setattr = function setattr(attr, value){
            var self = this;	// complex body AST_Defun
            if (typeof attr == "string") {
                if (self.isIfStatement(value)) {
                    self.registCondition(value);	//DEFPRINT(AST_SimpleStatement 703
                }
                if (self.isWatchObject(value)) {
                    value.onChange.append({
                        "target": self,
                        "attr": attr
                    });	//DEFPRINT(AST_SimpleStatement 705
                } else {
                    self.set(attr, value);	//DEFPRINT(AST_SimpleStatement 707
                }
            } else {
                throw "Invalid attribute type";	//AST_Exit.DEFMETHOD( 709
            }
        };	//class_fun_def A 522
        ViewComponent.prototype.setStates = function setStates(states_instance){
            var self = this;	// complex body AST_Defun
            self._States = states_instance;	//DEFPRINT(AST_SimpleStatement 711
        };	//class_fun_def A 522
        ViewComponent.prototype.isIfStatement = function isIfStatement(value){
            var self = this;	// complex body AST_Defun
            var condition, _if, key;	//complex body AST_Scope declare var as local
            if (typeof value == "object") {
                condition = value["python"] || value["rapyd"];	//DEFPRINT(AST_SimpleStatement 714
                if (!condition) {
                    return false;	//AST_Exit.DEFMETHOD( 715
                }
                if (typeof condition == "object") {
                    _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];	//DEFPRINT(AST_SimpleStatement 717
                    var _$iter17 = dict.keys(condition);
                    for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
                        key = _$iter17[_$id17];
                        if (_$in_(key, _if)) {
                            return true;	//AST_Exit.DEFMETHOD( 720
                        }
                    }
                }
            }
            return false;	//AST_Exit.DEFMETHOD( 721
        };	//class_fun_def A 522
        ViewComponent.prototype.onStateChanged = function onStateChanged(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlId = function setHtmlId(tag_name, id){
            var self = this;	// complex body AST_Defun
            var css_selector;	//complex body AST_Scope declare var as local
            css_selector = tag_name + "#" + id;	//DEFPRINT(AST_SimpleStatement 729
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlState = function setHtmlState(state_name){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlGroup = function setHtmlGroup(group_name){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlRenderFrom = function setHtmlRenderFrom(str_id){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlStyle = function setHtmlStyle(styles){
            var self = this;	// complex body AST_Defun
            var style;	//complex body AST_Scope declare var as local
            style = styles.split(";");	//DEFPRINT(AST_SimpleStatement 738
        };	//class_fun_def A 522
        ViewComponent.prototype.setHtmlAttribute = function setHtmlAttribute(dom){
            var self = this;	// complex body AST_Defun
            var tag_name, data, instance, jq_target, instance, jq_target, k, v;	//complex body AST_Scope declare var as local
            tag_name = dom["tag_name"];	//DEFPRINT(AST_SimpleStatement 741
            data = dom["data"];	//DEFPRINT(AST_SimpleStatement 742
            instance = jq_target = "";	//DEFPRINT(AST_SimpleStatement 743
            return;	//AST_Exit.DEFMETHOD( 744
            var _$iter18 = dict.items(data);
            for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
                _$Unpack = _$iter18[_$id18];
                k = _$Unpack[0];
                v = _$Unpack[1];
                self.setHtmlAttribute(k, v);	//DEFPRINT(AST_SimpleStatement 746
                if (k == "id") {
                    _$Unpack = self.setHtmlId(tag_name, v);	//DEFPRINT(AST_Assign 748
                    instance = _$Unpack[0];
                    jq_target = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 748
                } else if (k == "group") {
                    self.setHtmlGroup(v);	//DEFPRINT(AST_SimpleStatement 750
                } else if (k == "state") {
                    self.setHtmlState(v);	//DEFPRINT(AST_SimpleStatement 752
                } else if (k == "mvc") {
                } else if (k == "render_from") {
                    self.setHtmlRenderFrom(v);	//DEFPRINT(AST_SimpleStatement 756
                } else if (k == "style") {
                    self.css = new CssStyle(jq_target);	//DEFPRINT(AST_SimpleStatement 758
                    self.css.parseStyle(v);	//DEFPRINT(AST_SimpleStatement 759
                }
            }
        };	//class_fun_def A 522
        ViewComponent.prototype.setCompFromHtmlCommentTags = function setCompFromHtmlCommentTags(comp_code){
            var self = this;	// complex body AST_Defun
            var comp_tags, comp_list, comps, comp, comp_tag, pattern, groups, matched_data, m, match, group;	//complex body AST_Scope declare var as local
            comp_tags = eval(comp_code.split("__comp_tags__ = ")[1].split(";")[0]);	//DEFPRINT(AST_SimpleStatement 763
            comp_list = [];	//DEFPRINT(AST_SimpleStatement 764
            var _$iter19 = comp_tags;
            for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
                comp_tag = _$iter19[_$id19];
                comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 767
                var _$iter20 = comps;
                for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
                    comp = _$iter20[_$id20];
                    comp_list.append({
                        "tag_name": comp_tag,
                        "comp": comp
                    });	//DEFPRINT(AST_SimpleStatement 769
                }
            }
            jQuery.__compcode__ = comp_code;	//DEFPRINT(AST_SimpleStatement 771
            pattern = 'new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+))","gm")';	//DEFPRINT(AST_SimpleStatement 772
            groups = comp_code.match(eval(pattern));	//DEFPRINT(AST_SimpleStatement 773
            eval(comp_code);	//DEFPRINT(AST_SimpleStatement 775
            console.log("evaluated generated component");	//DEFPRINT(AST_SimpleStatement 776
            console.log("bt1 = ", bt1);	//DEFPRINT(AST_SimpleStatement 777
            matched_data = {};	//DEFPRINT(AST_SimpleStatement 778
            var _$iter21 = groups;
            for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
                group = _$iter21[_$id21];
                m = pattern.exec(comp_code);	//DEFPRINT(AST_SimpleStatement 780
                match = m.slice(1);	//DEFPRINT(AST_SimpleStatement 781
                if (isEmpty(matched_data[match[1]])) {
                    matched_data[match[1]] = [];	//DEFPRINT(AST_SimpleStatement 782
                }
                matched_data[match[1]].append(eval(match[0]));	//DEFPRINT(AST_SimpleStatement 783
            }
            self.component_tags = comp_tags;	//DEFPRINT(AST_SimpleStatement 786
            self.setCompFromHtmlTags(comp_list);	//DEFPRINT(AST_SimpleStatement 787
        };	//class_fun_def A 522
        ViewComponent.prototype.setCompFromHtmlTags = function setCompFromHtmlTags(comp_list){
            var self = this;	// complex body AST_Defun
            var tag_name, comp, dom, node, _comp;	//complex body AST_Scope declare var as local
            var _$iter22 = comp_list;
            for (var _$id22 = 0; _$id22 < _$iter22.length; _$id22++) {
                _comp = _$iter22[_$id22];
                tag_name = _comp["tag_name"];	//DEFPRINT(AST_SimpleStatement 792
                comp = _comp["comp"];	//DEFPRINT(AST_SimpleStatement 793
                dom = {
                    "tag_name": tag_name,
                    "data": ""
                };	//DEFPRINT(AST_SimpleStatement 794
                var _$iter23 = comp.attributes;
                for (var _$id23 = 0; _$id23 < _$iter23.length; _$id23++) {
                    node = _$iter23[_$id23];
                    dom["data"][node.nodeName] = node.nodeValue;	//DEFPRINT(AST_SimpleStatement 796
                }
                self.log("[setCompFromHtmlTags] dom = ", dom);	//DEFPRINT(AST_SimpleStatement 798
                self.setHtmlAttribute(dom);	//DEFPRINT(AST_SimpleStatement 799
            }
        };	//class_fun_def A 522
        ViewComponent = __defineClassProperties__(ViewComponent);
        ViewComponent = classprop_init(ViewComponent);
        var State = Callable(function State_(states, target){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            self.parent = states;	//DEFPRINT(AST_SimpleStatement 804
            self.target = target;	//DEFPRINT(AST_SimpleStatement 805
            self.data = {
                "animation": [],
                "name": "",
                "setattr": [],
                "conditions": []
            };	//DEFPRINT(AST_SimpleStatement 806
        });	//class_fun_def A 802
        State.prototype.watch = function watch(attr, con){
            var self = this;	// complex body AST_Defun
            self.data["conditions"].append(con);	//DEFPRINT(AST_SimpleStatement 809
        };	//class_fun_def A 802
        State.prototype.setAnime = function setAnime(){
            var self = this;	// complex body AST_Defun
            var anim;	//complex body AST_Scope declare var as local
            anim = Animation();	//DEFPRINT(AST_SimpleStatement 811
            self.data["animation"] = anim;	//DEFPRINT(AST_SimpleStatement 812
            return anim;	//AST_Exit.DEFMETHOD( 813
        };	//class_fun_def A 802
        State.prototype.setAttr = function setAttr(attr, value){
            var self = this;	// complex body AST_Defun
            self.data["setattr"].append([ attr, value ]);	//DEFPRINT(AST_SimpleStatement 815
        };	//class_fun_def A 802
        State.prototype.setName = function setName(name){
            var self = this;	// complex body AST_Defun
            self.data[name] = name;	//DEFPRINT(AST_SimpleStatement 817
        };	//class_fun_def A 802
        State.prototype.addState = function addState(){
            var self = this;	// complex body AST_Defun
            return self.parent.addState();	//AST_Exit.DEFMETHOD( 819
        };	//class_fun_def A 802
        State.prototype.processSetAttr = function processSetAttr(){
            var self = this;	// complex body AST_Defun
            var lst;	//complex body AST_Scope declare var as local
            var _$iter24 = self.data["setattr"];
            for (var _$id24 = 0; _$id24 < _$iter24.length; _$id24++) {
                lst = _$iter24[_$id24];
                self.target[lst[0]] = lst[1];	//DEFPRINT(AST_SimpleStatement 824
            }
        };	//class_fun_def A 802
        State.prototype.processAnime = function processAnime(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 802
        State = __defineClassProperties__(State);
        var States = Callable(function States_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            self.current_state = self.target = "";	//DEFPRINT(AST_SimpleStatement 831
            self.setAsWatchObject("current_state", "default", mode = "");	//DEFPRINT(AST_SimpleStatement 832
        });	//class_fun_def A 827
        States.prototype = new ViewComponent("__inheritance__", States);	//class_fun_def C 827
        States.prototype.getStates = function getStates(){
            var self = this;	// complex body AST_Defun
            return self.states;	//AST_Exit.DEFMETHOD( 835
        };	//class_fun_def A 827
        States.prototype.getStateByName = function getStateByName(name){
            var self = this;	// complex body AST_Defun
            var state;	//complex body AST_Scope declare var as local
            var _$iter25 = self.states;
            for (var _$id25 = 0; _$id25 < _$iter25.length; _$id25++) {
                state = _$iter25[_$id25];
                if (state.data.name == name) {
                    return state.data;	//AST_Exit.DEFMETHOD( 840
                }
            }
        };	//class_fun_def A 827
        States.prototype.addState = function addState(){
            var self = this;	// complex body AST_Defun
            var state;	//complex body AST_Scope declare var as local
            state = new State(self, target);	//DEFPRINT(AST_SimpleStatement 842
            self.states.append(state);	//DEFPRINT(AST_SimpleStatement 843
            return state;	//AST_Exit.DEFMETHOD( 844
        };	//class_fun_def A 827
        States.prototype.setTarget = function setTarget(target){
            var self = this;	// complex body AST_Defun
            self.target = target;	//DEFPRINT(AST_SimpleStatement 847
            target.setSates(self);	//DEFPRINT(AST_SimpleStatement 848
        };	//class_fun_def A 827
        States.prototype.setState = function setState(state_name){
            var self = this;	// complex body AST_Defun
            self.current_state = state_name;	//DEFPRINT(AST_SimpleStatement 852
        };	//class_fun_def A 827
        States = __defineClassProperties__(States);
        var Animation = Callable(function Animation_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
        });	//class_fun_def A 853
        Animation.prototype.setAttr = function setAttr(){
            var self = this;	// complex body AST_Defun
            var attr = arguments[0];
            var args = [].slice.call(arguments, 1);
            setattr.apply(this, [self, attr].concat(args));	//DEFPRINT(AST_SimpleStatement 857
        };	//class_fun_def A 853
        Animation.prototype.setTwn = function setTwn(tween_code){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 853
        Animation.prototype.startAnime = function startAnime(target){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 853
        Animation = __defineClassProperties__(Animation);
        var VisualElements = Callable(function VisualElements_(target, data){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            var i;	//complex body AST_Scope declare var as local
            if (target) {
                function getter_callback(ref, attr) {
                    function wrapper() {
                        return ref[attr];	//AST_Exit.DEFMETHOD( 867
                    }
                    return wrapper;	//AST_Exit.DEFMETHOD( 868
                }
                var _$iter26 = data;
                for (var _$id26 = 0; _$id26 < _$iter26.length; _$id26++) {
                    i = _$iter26[_$id26];
                    if (_$in_("-", i)) {
                        self.__defineGetter__(i, getter_callback(self, i.replace("-", "_")));	//DEFPRINT(AST_SimpleStatement 871
                    }
                }
                self.target = target;	//DEFPRINT(AST_SimpleStatement 872
                self.__allowed__ = data;	//DEFPRINT(AST_SimpleStatement 873
            }
        });	//class_fun_def A 862
        VisualElements.prototype.pos = function pos(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.pos_hint = function pos_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.size = function size(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.size_hint = function size_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.scale = function scale(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.scale_hint = function scale_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.background = function background(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.background_color = function background_color(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements.prototype.border = function border(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 862
        VisualElements = __defineClassProperties__(VisualElements);
        
        var Rectangle = Callable(function Rectangle_(instance){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (instance == "classprop_init") {
                self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 890
                self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 891
                class_properties(Button, self);	//DEFPRINT(AST_SimpleStatement 892
            } else if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 895
                }
                self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 896
            } else {
            }
        });	//class_fun_def A 886
        Rectangle.prototype = new ViewComponent("__inheritance__", Rectangle);	//class_fun_def C 886
        Rectangle = __defineClassProperties__(Rectangle);
        Rectangle = classprop_init(Rectangle);
        
        var Button = Callable(function Button_(instance){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (instance == "classprop_init") {
                self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 906
                self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 907
                class_properties(Button, self);	//DEFPRINT(AST_SimpleStatement 908
            } else if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 911
                }
                self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 912
            } else {
            }
        });	//class_fun_def A 902
        Button.prototype = new ViewComponent("__inheritance__", Button);	//class_fun_def C 902
        Button.prototype.getInstance = function getInstance(ins_name){
            var self = this;	// complex body AST_Defun
            return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 924
        };	//class_fun_def A 902
        Button.prototype.viewCompInit = function viewCompInit(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 902
        Button.prototype.addButton = function addButton(instance, group){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 902
        Button.prototype.setDefaultName = function setDefaultName(name){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 902
        Button = __defineClassProperties__(Button);
        Button = classprop_init(Button);
        return {
            Template: Template,
            ViewComponent: ViewComponent,
            Animation: Animation,
            Button: Button,
            Rectangle: Rectangle,
            scope: scope
        };	//AST_Exit.DEFMETHOD( 932
    }
    UiKit = module(UiKit);
    return {
        MVC: MVC,
        UiKit: UiKit,
        scope: scope
    };	//AST_Exit.DEFMETHOD( 934
}
RapydMVC = module(RapydMVC);



function test_app() {
    var core, core_variables, mvc, ui, RapydWeb, Controller, View, Button;	//complex body AST_Scope declare var as local
    core = RapydMVC;	//DEFPRINT(AST_SimpleStatement 938
    core_variables = core.scope;	//DEFPRINT(AST_SimpleStatement 939
    mvc = core.MVC;	//DEFPRINT(AST_SimpleStatement 940
    ui = core.UiKit;	//DEFPRINT(AST_SimpleStatement 941
    _$Unpack = [mvc.RapydWeb, mvc.Controller, mvc.View, ui.Button];	//DEFPRINT(AST_Assign 944
    RapydWeb = _$Unpack[0];
    Controller = _$Unpack[1];
    View = _$Unpack[2];
    Button = _$Unpack[3];	//DEFPRINT(AST_SimpleStatement 944
    core_variables.variableA = "set from test_app";	//DEFPRINT(AST_SimpleStatement 946
    core_variables.variableB = "set from test_app";	//DEFPRINT(AST_SimpleStatement 947
    var BlogController = Callable(function BlogController_(init){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            self.__proto__ = RapydWeb.prototype.__instance__["Controller"];	//DEFPRINT(AST_SimpleStatement 954
            RapydWeb.prototype.__instance__["BlogController"] = self;	//DEFPRINT(AST_SimpleStatement 955
            self.actions = [ "index", "viewArticles", "viewByTags" ];	//DEFPRINT(AST_SimpleStatement 957
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 958
            self.init("BlogController", self);	//DEFPRINT(AST_SimpleStatement 959
        }
    });	//class_fun_def A 948
    BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 948
    BlogController = __defineClassProperties__(BlogController);
    var VoclistController = Callable(function VoclistController_(init){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            RapydWeb.prototype.__instance__["VoclistController"] = self;	//DEFPRINT(AST_SimpleStatement 965
            self.__proto__ = RapydWeb.prototype.__instance__["Controller"];	//DEFPRINT(AST_SimpleStatement 966
            self.actions = [ "vocHome", "vocSentence", "vocIndex" ];	//DEFPRINT(AST_SimpleStatement 968
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 969
            self.init("VoclistController", self);	//DEFPRINT(AST_SimpleStatement 970
        }
    });	//class_fun_def A 960
    VoclistController.prototype = new Controller("__inheritance__", VoclistController);	//class_fun_def C 960
    VoclistController.prototype.vocIndex = function vocIndex(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 973
    };	//class_fun_def A 960
    VoclistController.prototype.vocSentence = function vocSentence(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 975
    };	//class_fun_def A 960
    VoclistController.prototype.vocHome = function vocHome(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 977
    };	//class_fun_def A 960
    VoclistController = __defineClassProperties__(VoclistController);
    var BlogView = Callable(function BlogView_(init){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            self.__proto__ = RapydWeb.prototype.__instance__["View"];	//DEFPRINT(AST_SimpleStatement 982
            RapydWeb.prototype.__instance__["BlogView"] = self;	//DEFPRINT(AST_SimpleStatement 983
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 984
            self.init("BlogView", self);	//DEFPRINT(AST_SimpleStatement 985
        }
    });	//class_fun_def A 978
    BlogView.prototype = new View("__inheritance__", BlogView);	//class_fun_def C 978
    BlogView.prototype.index = function index(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 978
    BlogView.prototype.viewArticles = function viewArticles(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 978
    BlogView.prototype.viewByTags = function viewByTags(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 978
    BlogView = __defineClassProperties__(BlogView);
    var CustomButton = Callable(function CustomButton_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(CustomButton,self).__init__.apply(self,arguments);});	//class_fun_def B 995
    CustomButton.prototype = new Button("__inheritance__", CustomButton);	//class_fun_def C 995
    CustomButton.prototype.clearbt = function clearbt(){
        var self = this;	// complex body AST_Defun
        var bt;	//complex body AST_Scope declare var as local
        var _$iter27 = self.groups[self];
        for (var _$id27 = 0; _$id27 < _$iter27.length; _$id27++) {
            bt = _$iter27[_$id27];
            if (bt.id != self.id) {
                bt.clear();	//DEFPRINT(AST_SimpleStatement 1000
            }
        }
    };	//class_fun_def A 995
    CustomButton.prototype.clear = function clear(){
        var self = this;	// complex body AST_Defun
        self.state == self.States.default;	//DEFPRINT(AST_SimpleStatement 1002
    };	//class_fun_def A 995
    CustomButton.prototype.action = function action(){
        var self = this;	// complex body AST_Defun
        var i;	//complex body AST_Scope declare var as local
        for (i = 0; i < 10; i++) {
            print;	//DEFPRINT(AST_SimpleStatement 1005
            123123;	//DEFPRINT(AST_SimpleStatement 1005
        }
    };	//class_fun_def A 995
    CustomButton = __defineClassProperties__(CustomButton);
    return {
        BlogController: BlogController,
        VoclistController: VoclistController,
        CustomButton: CustomButton,
        BlogView: BlogView
    };	//AST_Exit.DEFMETHOD( 1007
}
test_app = module(test_app);

function test1() {
    var mvc, rapyd, app, ViewComponent, AddressMediator, HeaderMediator, BlogController, VoclistController, v;	//complex body AST_Scope declare var as local
    mvc = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1010
    rapyd = mvc.MVC.instance_pack;	//DEFPRINT(AST_SimpleStatement 1011
    app = test_app;	//DEFPRINT(AST_SimpleStatement 1012
    ViewComponent = mvc.UiKit.ViewComponent;	//DEFPRINT(AST_SimpleStatement 1014
    _$Unpack = [mvc.MVC.AddressMediator, mvc.MVC.HeaderMediator];	//DEFPRINT(AST_Assign 1015
    AddressMediator = _$Unpack[0];
    HeaderMediator = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 1015
    _$Unpack = [app.BlogController, app.VoclistController];	//DEFPRINT(AST_Assign 1016
    BlogController = _$Unpack[0];
    VoclistController = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 1016
    rapyd.c.blog = cls(BlogController, "init");	//DEFPRINT(AST_SimpleStatement 1019
    rapyd.c.voclist = cls(VoclistController, "init");	//DEFPRINT(AST_SimpleStatement 1020
    rapyd.mediator.address = cls(AddressMediator, "init");	//DEFPRINT(AST_SimpleStatement 1022
    rapyd.mediator.header = cls(HeaderMediator, "init");	//DEFPRINT(AST_SimpleStatement 1023
    console.log("------------ start -----------");	//DEFPRINT(AST_SimpleStatement 1025
    console.log(rapyd);	//DEFPRINT(AST_SimpleStatement 1026
    console.log("------------ test for view component -----------");	//DEFPRINT(AST_SimpleStatement 1028
    v = cls(ViewComponent, "init");	//DEFPRINT(AST_SimpleStatement 1031
    v.setAsWatchObject("test_setter", 123);	//DEFPRINT(AST_SimpleStatement 1032
    v.setAsWatchObject("set_from_callback", "bbb");	//DEFPRINT(AST_SimpleStatement 1033
    console.log('set "setter" and "set_from_callback" as watch object');	//DEFPRINT(AST_SimpleStatement 1034
    console.log("");	//DEFPRINT(AST_SimpleStatement 1035
    console.log("default value of \t\ttest_setter \t\t= ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1036
    console.log("default value of \t\tset_from_callback \t= ", v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 1037
    console.log("");	//DEFPRINT(AST_SimpleStatement 1038
    console.log('set test_setter to "value1"');	//DEFPRINT(AST_SimpleStatement 1039
    v.test_setter = "value1";	//DEFPRINT(AST_SimpleStatement 1040
    console.log("set set_from_callback's reference to test_setter");	//DEFPRINT(AST_SimpleStatement 1041
    v.setattr("set_from_callback", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1042
    console.log('read value of "test_setter" \t\t= ', v.test_setter);	//DEFPRINT(AST_SimpleStatement 1043
    console.log('read value of "set_from_callback" \t= ', v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 1044
    console.log("");	//DEFPRINT(AST_SimpleStatement 1045
    console.log("alter value of test_setter to 'value2', to see if set_from_callback value changes!");	//DEFPRINT(AST_SimpleStatement 1046
    v.test_setter = "value2";	//DEFPRINT(AST_SimpleStatement 1048
    console.log("set_from_callback value = ", v.set_from_callback, " v.test_setter = ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1049
}

function test2() {
    var mvc, rapyd;	//complex body AST_Scope declare var as local
    console.log("");	//DEFPRINT(AST_SimpleStatement 1051
    console.log("=========== module import test ================");	//DEFPRINT(AST_SimpleStatement 1052
    console.log("");	//DEFPRINT(AST_SimpleStatement 1053
    mvc = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1054
    rapyd = mvc.MVC.instance_pack;	//DEFPRINT(AST_SimpleStatement 1055
}

function test3(rapydml_component_tag) {
    var core, mvc, ui, ViewComponent, rapydml_component_code, v;	//complex body AST_Scope declare var as local
    console.log("=========== component test ================");	//DEFPRINT(AST_SimpleStatement 1057
    core = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1058
    mvc = core.MVC;	//DEFPRINT(AST_SimpleStatement 1059
    ui = core.UiKit;	//DEFPRINT(AST_SimpleStatement 1060
    ViewComponent = ui.ViewComponent;	//DEFPRINT(AST_SimpleStatement 1061
    rapydml_component_tag = 'script[type="text/rapydml_component"]';	//DEFPRINT(AST_SimpleStatement 1063
    rapydml_component_code = jQuery(rapydml_component_tag).html();	//DEFPRINT(AST_SimpleStatement 1064
    console.log("--------------------------");	//DEFPRINT(AST_SimpleStatement 1066
    console.log("---- component script ----");	//DEFPRINT(AST_SimpleStatement 1067
    console.log("--------------------------");	//DEFPRINT(AST_SimpleStatement 1068
    console.log(rapydml_component_code);	//DEFPRINT(AST_SimpleStatement 1069
    v = cls(ViewComponent, "init", rapydml_component_code);	//DEFPRINT(AST_SimpleStatement 1070
}
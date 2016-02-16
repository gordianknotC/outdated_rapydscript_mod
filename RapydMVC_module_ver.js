









function isEmpty(n) {
    var key;	//complex body AST_Scope declare var as local
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;	//AST_Exit.DEFMETHOD( 17
        }
        var _$iter0 = dict.keys(n);
        for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
            key = _$iter0[_$id0];
            return false;	//AST_Exit.DEFMETHOD( 19
        }
        return true;	//AST_Exit.DEFMETHOD( 20
    }
    if (typeof n == "string") {
        if (n.strip()) {
            return false;	//AST_Exit.DEFMETHOD( 24
        } else {
            return true;	//AST_Exit.DEFMETHOD( 26
        }
    }
    if (n) {
        return false;	//AST_Exit.DEFMETHOD( 29
    } else {
        return true;	//AST_Exit.DEFMETHOD( 31
    }
}

function cls() {
    var cls = arguments[0];
    var args = [].slice.call(arguments, 1);
    var tmp, tmp, i, fn, ins;	//complex body AST_Scope declare var as local
    tmp = "";	//DEFPRINT(AST_SimpleStatement 33
    for (i = 1; i < len(arguments); i++) {
        tmp += "arguments[" + i + "],";	//DEFPRINT(AST_SimpleStatement 35
    }
    fn = arguments[0];	//DEFPRINT(AST_SimpleStatement 36
    ins = eval("new fn(" + tmp.slice(0, -1) + ")");	//DEFPRINT(AST_SimpleStatement 37
    return ins;	//AST_Exit.DEFMETHOD( 38
}

function set_scope(module_path) {
    var scope;	//complex body AST_Scope declare var as local
    scope = {};	//DEFPRINT(AST_SimpleStatement 40
    scope.__module__ = module_path;	//DEFPRINT(AST_SimpleStatement 41
    return scope;	//AST_Exit.DEFMETHOD( 42
}

function module(fn_module) {
    var module_member_data, scope_attrs, scope, _filter, is_k_in_filter, k, v, key, value, attr;	//complex body AST_Scope declare var as local
    function getAllExcept(lst, _module) {
        function wrapper() {
            var name, _filter, tmp, m, is_k_in_filter, k, v;	//complex body AST_Scope declare var as local
            name = _module.name;	//DEFPRINT(AST_SimpleStatement 46
            _filter = lst;	//DEFPRINT(AST_SimpleStatement 47
            tmp = {};	//DEFPRINT(AST_SimpleStatement 48
            m = eval(name).prototype;	//DEFPRINT(AST_SimpleStatement 49
            var _$iter1 = dict.items(m);
            for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
                _$Unpack = _$iter1[_$id1];
                k = _$Unpack[0];
                v = _$Unpack[1];
                is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 51
                if (!is_k_in_filter) {
                    tmp[k] = v;	//DEFPRINT(AST_SimpleStatement 53
                }
            }
            return tmp;	//AST_Exit.DEFMETHOD( 54
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 55
    }
    if (isEmpty(fn_module.prototype)) {
        module_member_data = fn_module();	//DEFPRINT(AST_SimpleStatement 58
        module_member_data.ALL = getAllExcept([ "ALL", "scope" ], fn_module);	//DEFPRINT(AST_SimpleStatement 59
        scope_attrs = [];	//DEFPRINT(AST_SimpleStatement 60
        scope = module_member_data.scope;	//DEFPRINT(AST_SimpleStatement 61
        _filter = [ "arguments", "caller", "length", "name", "prototype", "__proto__", "__module__" ];	//DEFPRINT(AST_SimpleStatement 62
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
                    is_k_in_filter = _$in_(k, _filter);	//DEFPRINT(AST_SimpleStatement 66
                    if (!is_k_in_filter) {
                        console.log("scope var..", k, v);	//DEFPRINT(AST_SimpleStatement 68
                        if (isEmpty(module_member_data[k])) {
                            module_member_data[k] = v;	//DEFPRINT(AST_SimpleStatement 69
                        } else {
                            throw "[Error][Naming Confliction]module-scope variable: [" + k + "] interfere with module member: [" + k + "]";	//AST_Exit.DEFMETHOD( 70
                        }
                        scope["_" + k] = v;	//DEFPRINT(AST_SimpleStatement 71
                        scope_attrs.append(k);	//DEFPRINT(AST_SimpleStatement 72
                    }
                }
            }
        }
        module_member_data["scope"] = scope;	//DEFPRINT(AST_SimpleStatement 73
        fn_module.prototype = module_member_data;	//DEFPRINT(AST_SimpleStatement 74
        function setter_callback(scope_obj, _attr) {
            function wrapper(_value) {
                eval(scope_obj.__module__).prototype.scope["_" + _attr] = _value;	//DEFPRINT(AST_SimpleStatement 78
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 79
        }
        function getter_callback(scope_obj, _attr) {
            function wrapper() {
                return eval(scope_obj.__module__).prototype.scope["_" + _attr];	//AST_Exit.DEFMETHOD( 82
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 83
        }
        var _$iter4 = scope_attrs;
        for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
            attr = _$iter4[_$id4];
            console.log("set getter and setter for ", attr);	//DEFPRINT(AST_SimpleStatement 86
            scope.__defineSetter__(attr, setter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 87
            scope.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 88
        }
        fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 90
        fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr));	//DEFPRINT(AST_SimpleStatement 91
        fn_module.prototype.prototype = fn_module.prototype;	//DEFPRINT(AST_SimpleStatement 93
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 94
    } else {
        return fn_module.prototype;	//AST_Exit.DEFMETHOD( 96
    }
}

function defineClassProperties(cls) {
    var tmp, k, v;	//complex body AST_Scope declare var as local
    defineClassProperties.__name__ = defineClassProperties.name;	//DEFPRINT(AST_SimpleStatement 98
    cls.prototype.__classproperty_setted__ = false;	//DEFPRINT(AST_SimpleStatement 99
    tmp = eval('new cls("defineClassProperties")');	//DEFPRINT(AST_SimpleStatement 100
    if (!cls.prototype.__classproperty_setted__) {
        function getter(_cls, k) {
            function wrapper() {
                return _cls.prototype[k];	//AST_Exit.DEFMETHOD( 104
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 105
        }
        function setter(_cls, k) {
            function wrapper(value) {
                _cls.prototype[k] = value;	//DEFPRINT(AST_SimpleStatement 108
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 109
        }
        var _$iter5 = dict.items(cls.prototype);
        for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
            _$Unpack = _$iter5[_$id5];
            k = _$Unpack[0];
            v = _$Unpack[1];
            cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 121
            cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 122
        }
        var _$iter6 = dict.items(tmp);
        for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
            _$Unpack = _$iter6[_$id6];
            k = _$Unpack[0];
            v = _$Unpack[1];
            if (!(typeof v == "function")) {
                console.log("define class property", k, v);	//DEFPRINT(AST_SimpleStatement 125
                cls.prototype[k] = v;	//DEFPRINT(AST_SimpleStatement 126
                cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 127
                cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 128
            }
        }
        cls.prototype.__classproperty_setted__ = true;	//DEFPRINT(AST_SimpleStatement 129
    }
    return cls;	//AST_Exit.DEFMETHOD( 130
}

function super_(cls, instance) {
    var level, super_name, super_class, level;	//complex body AST_Scope declare var as local
    level = "";	//DEFPRINT(AST_SimpleStatement 133
    function find_class_name(ref, name, level) {
        level += ".__proto__";	//DEFPRINT(AST_SimpleStatement 135
        if (ref.__proto__.__name__ == name) {
            return [ref.__proto__, level];	//AST_Exit.DEFMETHOD( 136
        } else {
            return find_class_name(ref.__proto__, name, level);	//AST_Exit.DEFMETHOD( 137
        }
    }
    super_name = cls.prototype.__proto__.__name__;	//DEFPRINT(AST_SimpleStatement 138
    instance.name = cls.name;	//DEFPRINT(AST_SimpleStatement 139
    _$Unpack = find_class_name(instance, super_name, level);	//DEFPRINT(AST_Assign 140
    super_class = _$Unpack[0];
    level = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 140
    instance.__superlevel__ = level;	//DEFPRINT(AST_SimpleStatement 141
    return super_class;	//AST_Exit.DEFMETHOD( 142
}

var re = Callable(function re_(){});	//class_fun_def B2 143
re.prototype.compile = function compile(s, jsflag){
    var self = this;	// complex body AST_Defun
    if (typeof jsflag === "undefined") jsflag = "gmi";
    var regex;	//complex body AST_Scope declare var as local
    regex = eval("new RegExp");	//DEFPRINT(AST_SimpleStatement 145
    regex.compile(s, jsflag);	//DEFPRINT(AST_SimpleStatement 146
    return regex;	//AST_Exit.DEFMETHOD( 147
};	//class_fun_def A 143
re = __defineClassProperties__(re);



function RapydMVC() {
    var scope;	//complex body AST_Scope declare var as local
    scope = set_scope("RapydMVC");	//DEFPRINT(AST_SimpleStatement 153
    scope.variableA = "valueA";	//DEFPRINT(AST_SimpleStatement 154
    scope.variableB = "valueB";	//DEFPRINT(AST_SimpleStatement 155
    
    function MVC() {
        var scope, rapyd;	//complex body AST_Scope declare var as local
        scope = set_scope("RapydMVC.MVC");	//DEFPRINT(AST_SimpleStatement 159
        
        var RapydWeb = Callable(function RapydWeb_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init == defineClassProperties.name) {
                self.m = [];	//DEFPRINT(AST_SimpleStatement 170
                self.v = [];	//DEFPRINT(AST_SimpleStatement 171
                self.c = [];	//DEFPRINT(AST_SimpleStatement 172
                self.action = self.debug_level = "";	//DEFPRINT(AST_SimpleStatement 173
                self.components = [];	//DEFPRINT(AST_SimpleStatement 174
                self.config = [];	//DEFPRINT(AST_SimpleStatement 175
                self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 176
            } else if (typeof init == "object") {
                self.__instance__[init.__name__] = init;	//DEFPRINT(AST_SimpleStatement 179
            }
            self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 182
        });	//class_fun_def A 162
        RapydWeb.prototype.debug = function debug(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name, color;	//complex body AST_Scope declare var as local
            name = "%c[DEBUG][" + self.debug.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 185
            color = "background: #222; color: #bada55";	//DEFPRINT(AST_SimpleStatement 186
            args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 187
            args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 188
            console.debug.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 190
        };	//class_fun_def A 162
        RapydWeb.prototype.log = function log(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name;	//complex body AST_Scope declare var as local
            if (self.log.caller) {
                name = "[" + self.log.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 194
                args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 195
            }
            console.log.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 196
        };	//class_fun_def A 162
        RapydWeb.prototype.error = function error(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name;	//complex body AST_Scope declare var as local
            name = "[ERROR][" + self.error.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 202
            args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 203
            console.error.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 204
        };	//class_fun_def A 162
        RapydWeb.prototype.info = function info(){
            var self = this;	// complex body AST_Defun
            var args = [].slice.call(arguments, 0);
            var name, color;	//complex body AST_Scope declare var as local
            name = "%c[INFO][" + self.info.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 207
            color = "background: #667; color: #fff";	//DEFPRINT(AST_SimpleStatement 208
            args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 209
            args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 210
            console.info.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 211
        };	//class_fun_def A 162
        RapydWeb.prototype.inheritFromInstance = function inheritFromInstance(cls, instance){
            var self = this;	// complex body AST_Defun
            var instance_class_name, super_class, super_class_name, proto;	//complex body AST_Scope declare var as local
            instance_class_name = instance.__name__;	//DEFPRINT(AST_SimpleStatement 214
            super_class = super_(cls, instance);	//DEFPRINT(AST_SimpleStatement 215
            super_class_name = super_class.__name__;	//DEFPRINT(AST_SimpleStatement 216
            proto = instance.__superlevel__;	//DEFPRINT(AST_SimpleStatement 217
            eval('self.__instance__["{0}"]{1} = self.__instance__["{2}"]'.format(instance_class_name, proto, super_class_name));	//DEFPRINT(AST_SimpleStatement 218
        };	//class_fun_def A 162
        RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
            var self = this;	// complex body AST_Defun
            var action, action;	//complex body AST_Scope declare var as local
            self.checkActionsAvailable(name, sub_successor);	//DEFPRINT(AST_SimpleStatement 222
            if (!hyper_successor.__actions__[name]) {
                hyper_successor.__actions__[name] = {};	//DEFPRINT(AST_SimpleStatement 223
            }
            self.log("__actions__ = ", hyper_successor.__actions__);	//DEFPRINT(AST_SimpleStatement 224
            self.log("successor actions = ", sub_successor.actions);	//DEFPRINT(AST_SimpleStatement 225
            if (!(hyper_successor.name == "View")) {
                var _$iter7 = sub_successor.actions;
                for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
                    action = _$iter7[_$id7];
                    hyper_successor.__actions__[name][action] = self.actionPropStructure();	//DEFPRINT(AST_SimpleStatement 229
                }
            } else {
                var _$iter8 = sub_successor.actions;
                for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
                    action = _$iter8[_$id8];
                    hyper_successor.__actions__[name][action] = self.viewPropStructure();	//DEFPRINT(AST_SimpleStatement 232
                }
            }
        };	//class_fun_def A 162
        RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
            var self = this;	// complex body AST_Defun
            if (sub_successor.components) {
                if (!hyper_successor.__components__[name]) {
                    hyper_successor.__components__[name] = [];	//DEFPRINT(AST_SimpleStatement 237
                }
                hyper_successor.__components__[name] = sub_successor.components;	//DEFPRINT(AST_SimpleStatement 238
            }
        };	//class_fun_def A 162
        RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
            var self = this;	// complex body AST_Defun
            var r;	//complex body AST_Scope declare var as local
            r = {
                "views": [],
                "props": {}
            };	//DEFPRINT(AST_SimpleStatement 241
            return r;	//AST_Exit.DEFMETHOD( 242
        };	//class_fun_def A 162
        RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
            var self = this;	// complex body AST_Defun
            var r;	//complex body AST_Scope declare var as local
            r = {
                "views": [],
                "props": {}
            };	//DEFPRINT(AST_SimpleStatement 245
            return r;	//AST_Exit.DEFMETHOD( 246
        };	//class_fun_def A 162
        RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
            var self = this;	// complex body AST_Defun
            var action;	//complex body AST_Scope declare var as local
            self.log(name, successor);	//DEFPRINT(AST_SimpleStatement 249
            self.log(successor.actions);	//DEFPRINT(AST_SimpleStatement 250
            var _$iter9 = successor.actions;
            for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
                action = _$iter9[_$id9];
                if (!successor[action]) {
                    self.error("[error] actions [{0}] not exists", action);	//DEFPRINT(AST_SimpleStatement 253
                    return false;	//AST_Exit.DEFMETHOD( 254
                }
            }
        };	//class_fun_def A 162
        RapydWeb = __defineClassProperties__(RapydWeb);
        RapydWeb = defineClassProperties(RapydWeb);
        
        var Controller = Callable(function Controller_(init, name){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (typeof name === "undefined") name = null;
            var successor;	//complex body AST_Scope declare var as local
            if (init == defineClassProperties.name) {
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 270
                self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 271
            } else if (typeof init == "object") {
                successor = init;	//DEFPRINT(AST_SimpleStatement 279
                console.log("component and action init:: self = ", self, "name = ", name, "sucessor = ", successor);	//DEFPRINT(AST_SimpleStatement 280
                super_(Controller, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 281
                super_(Controller, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 282
            }
            super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 287
        });	//class_fun_def A 262
        Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 262
        Controller.prototype.__getattr__ = function __getattr__(item){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 293
            item;	//DEFPRINT(AST_SimpleStatement 293
        };	//class_fun_def A 262
        Controller.prototype.__get__ = function __get__(instance, owner){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 296
            [instance, owner];	//DEFPRINT(AST_SimpleStatement 296
        };	//class_fun_def A 262
        Controller.prototype.__beforAction = function __beforAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.beforeAction(f, args);	//DEFPRINT(AST_SimpleStatement 299
        };	//class_fun_def A 262
        Controller.prototype.beforeAction = function beforeAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 262
        Controller.prototype.afterAction = function afterAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 262
        Controller.prototype.__afterAction = function __afterAction(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.__startRender(f, args);	//DEFPRINT(AST_SimpleStatement 308
        };	//class_fun_def A 262
        Controller.prototype.__startRender = function __startRender(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 262
        Controller = __defineClassProperties__(Controller);
        Controller = defineClassProperties(Controller);
        
        var View = Callable(function View_(init, name){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            var successor;	//complex body AST_Scope declare var as local
            if (init == defineClassProperties.name) {
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 318
                self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 319
            } else if (typeof init == "object") {
                successor = init;	//DEFPRINT(AST_SimpleStatement 324
                super_(View, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 325
                super_(View, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 326
            }
            super_(View, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 328
        });	//class_fun_def A 314
        View.prototype = new RapydWeb("__inheritance__", View);	//class_fun_def C 314
        View.prototype.beforeRender = function beforeRender(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 314
        View.prototype.afterRender = function afterRender(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 314
        View.prototype.mapToHtml = function mapToHtml(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 314
        View.prototype.getComponentComment = function getComponentComment(){
            var self = this;	// complex body AST_Defun
            var comp_comment, comps, _comp, node, value, attr, comp, comp_name;	//complex body AST_Scope declare var as local
            comp_comment = jQuery("body").comments()[0];	//DEFPRINT(AST_SimpleStatement 347
            var _$iter10 = self.view_components_name;
            for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
                comp_name = _$iter10[_$id10];
                self.view_components_attributes[comp_name] = {};	//DEFPRINT(AST_SimpleStatement 349
                comps = comp_comment.getElementsByTagName(comp_name);	//DEFPRINT(AST_SimpleStatement 350
                var _$iter11 = comps;
                for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
                    comp = _$iter11[_$id11];
                    _comp = {};	//DEFPRINT(AST_SimpleStatement 352
                    var _$iter12 = comp.attributes;
                    for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
                        attr = _$iter12[_$id12];
                        node = attr.nodeName;	//DEFPRINT(AST_SimpleStatement 354
                        value = attr.value;	//DEFPRINT(AST_SimpleStatement 355
                        _comp[node] = value;	//DEFPRINT(AST_SimpleStatement 356
                    }
                    self.view_components_attributes[comp_name][_comp.id] = _comp;	//DEFPRINT(AST_SimpleStatement 357
                }
            }
        };	//class_fun_def A 314
        View = __defineClassProperties__(View);
        View = defineClassProperties(View);
        
        var Model = Callable(function Model_(init, name){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (typeof name === "undefined") name = null;
            var successor;	//complex body AST_Scope declare var as local
            if (init == defineClassProperties.name) {
                self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 365
            } else if (typeof init == "object") {
                successor = init;	//DEFPRINT(AST_SimpleStatement 370
                super_(Model, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 371
            }
            super_(Model, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 376
        });	//class_fun_def A 360
        Model.prototype = new RapydWeb("__inheritance__", Model);	//class_fun_def C 360
        Model.prototype.beforeSend = function beforeSend(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 360
        Model.prototype.afterSend = function afterSend(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 360
        Model.prototype.beforeSave = function beforeSave(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 360
        Model.prototype.afterSaver = function afterSaver(){
            var self = this;	// complex body AST_Defun
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };	//class_fun_def A 360
        Model = __defineClassProperties__(Model);
        Model = defineClassProperties(Model);
        var Mediator = Callable(function Mediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 402
        });	//class_fun_def A 394
        Mediator.prototype = new RapydWeb("__inheritance__", Mediator);	//class_fun_def C 394
        Mediator.prototype.test = function test(){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 409
            "mediator test";	//DEFPRINT(AST_SimpleStatement 409
        };	//class_fun_def A 394
        Mediator.prototype.test2 = function test2(){
            var self = this;	// complex body AST_Defun
            print;	//DEFPRINT(AST_SimpleStatement 412
            "mediator test2";	//DEFPRINT(AST_SimpleStatement 412
        };	//class_fun_def A 394
        Mediator = __defineClassProperties__(Mediator);
        var HeaderMediator = Callable(function HeaderMediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 423
        });	//class_fun_def A 420
        HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);	//class_fun_def C 420
        HeaderMediator.prototype.catchHeader = function catchHeader(header){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 420
        HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 420
        HeaderMediator = __defineClassProperties__(HeaderMediator);
        var AddressMediator = Callable(function AddressMediator_(init){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 437
        });	//class_fun_def A 434
        AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);	//class_fun_def C 434
        AddressMediator.prototype.suspendRediret = function suspendRediret(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator.prototype.redirectTo = function redirectTo(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator.prototype.historyNext = function historyNext(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator.prototype.historyPrev = function historyPrev(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator.prototype.getHistories = function getHistories(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator.prototype.onAddressChange = function onAddressChange(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 434
        AddressMediator = __defineClassProperties__(AddressMediator);
        rapyd = new RapydWeb("init");	//DEFPRINT(AST_SimpleStatement 461
        rapyd.c = new Controller("init");	//DEFPRINT(AST_SimpleStatement 462
        rapyd.m = new Model("init");	//DEFPRINT(AST_SimpleStatement 463
        rapyd.v = new View("init");	//DEFPRINT(AST_SimpleStatement 464
        rapyd.mediator = new Mediator("init");	//DEFPRINT(AST_SimpleStatement 465
        rapyd.mediator.address = new AddressMediator("init");	//DEFPRINT(AST_SimpleStatement 466
        rapyd.mediator.header = new HeaderMediator("init");	//DEFPRINT(AST_SimpleStatement 467
        return {
            RapydWeb: RapydWeb,
            Controller: Controller,
            View: View,
            Model: Model,
            Mediator: Mediator,
            HeaderMediator: HeaderMediator,
            AddressMediator: AddressMediator,
            scope: scope,
            "instance_pack": rapyd
        };	//AST_Exit.DEFMETHOD( 469
    }
    MVC = module(MVC);
    
    function UiKit() {
        var scope, mvc, View;	//complex body AST_Scope declare var as local
        scope = set_scope("RapydMVC.UiKit");	//DEFPRINT(AST_SimpleStatement 473
        mvc = MVC;	//DEFPRINT(AST_SimpleStatement 474
        View = mvc.View;	//DEFPRINT(AST_SimpleStatement 475
        
        var CssStyle = Callable(function CssStyle_(targets){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (targets == defineClassProperties.name) {
                self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];	//DEFPRINT(AST_SimpleStatement 481
                self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];	//DEFPRINT(AST_SimpleStatement 483
                self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];	//DEFPRINT(AST_SimpleStatement 484
                self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];	//DEFPRINT(AST_SimpleStatement 486
                self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];	//DEFPRINT(AST_SimpleStatement 487
            }
            self.targets = targets;	//DEFPRINT(AST_SimpleStatement 491
        });	//class_fun_def A 478
        CssStyle.prototype.setStyle = function setStyle(k, v){
            var self = this;	// complex body AST_Defun
            var target;	//complex body AST_Scope declare var as local
            var _$iter13 = self.targets;
            for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
                target = _$iter13[_$id13];
                target.style[k] = v;	//DEFPRINT(AST_SimpleStatement 495
            }
        };	//class_fun_def A 478
        CssStyle.prototype.parseStyle = function parseStyle(styles){
            var self = this;	// complex body AST_Defun
            var k, v, pos_arr, x, y, x, y, z, w, h, style;	//complex body AST_Scope declare var as local
            styles = styles.split(";").slice(0, -1);	//DEFPRINT(AST_SimpleStatement 498
            var _$iter14 = styles;
            for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
                style = _$iter14[_$id14];
                k = style.split(":")[0].strip();	//DEFPRINT(AST_SimpleStatement 500
                v = style.split(":")[1].strip();	//DEFPRINT(AST_SimpleStatement 501
                if (_$in_(k, self.HTML_POSITIONING_FAMILY)) {
                    if (k == "pos") {
                        pos_arr = v.split(",");	//DEFPRINT(AST_SimpleStatement 504
                        if (len(pos_arr) == 2) {
                            _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 506
                            x = _$Unpack[0];
                            y = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 506
                        } else if (len(pos_arr) == 3) {
                            _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 508
                            x = _$Unpack[0];
                            y = _$Unpack[1];
                            z = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 508
                            self.setStyle("z-index", z);	//DEFPRINT(AST_SimpleStatement 509
                        } else {
                            throw "Invalid pos format: {0}".format(style);	//AST_Exit.DEFMETHOD( 511
                        }
                        self.setStyle("left", x);	//DEFPRINT(AST_SimpleStatement 513
                        self.setStyle("top", y);	//DEFPRINT(AST_SimpleStatement 514
                    } else if (k == "pos_hint") {
                    }
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 518
                } else if (_$in_(k, self.HTML_BACKGROUND_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 520
                } else if (_$in_(k, self.HTML_APPEARANCE_FAMILY)) {
                    if (k == "size") {
                        _$Unpack = v.split(",");	//DEFPRINT(AST_Assign 523
                        w = _$Unpack[0];
                        h = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 523
                        self.setStyle("width", w);	//DEFPRINT(AST_SimpleStatement 524
                        self.setStyle("height", h);	//DEFPRINT(AST_SimpleStatement 525
                    } else if (k == "size_hint") {
                    }
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 529
                } else if (_$in_(k, self.HTML_BORDER_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 531
                } else if (_$in_(k, self.HTML_TEXT_FAMILY)) {
                    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 533
                } else {
                    throw "Invalid or unsupported Style tag: {0}".format(k);	//AST_Exit.DEFMETHOD( 535
                }
                self.setStyle(k, v);	//DEFPRINT(AST_SimpleStatement 537
            }
        };	//class_fun_def A 478
        CssStyle = __defineClassProperties__(CssStyle);
        CssStyle = defineClassProperties(CssStyle);
        var Template = Callable(function Template_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
        });	//class_fun_def A 547
        Template.prototype = new View("__inheritance__", Template);	//class_fun_def C 547
        Template = __defineClassProperties__(Template);
        
        var ViewComponent = Callable(function ViewComponent_(init, comp_code){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (init == defineClassProperties.name) {
                self.HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY;	//DEFPRINT(AST_SimpleStatement 561
                self.HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY;	//DEFPRINT(AST_SimpleStatement 562
                self.HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY;	//DEFPRINT(AST_SimpleStatement 563
                self.HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY;	//DEFPRINT(AST_SimpleStatement 564
                self.HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY;	//DEFPRINT(AST_SimpleStatement 565
                self.__rapyd_comps__ = [];	//DEFPRINT(AST_SimpleStatement 566
            }
            self.setAsWatchObject(self, "test", "test value");	//DEFPRINT(AST_SimpleStatement 570
            self.setAsWatchObject(self, "test2", "set_from_callback value");	//DEFPRINT(AST_SimpleStatement 571
            if (init == "customcomp") {
                self.css = {};	//DEFPRINT(AST_SimpleStatement 573
                self.component_tags = [];	//DEFPRINT(AST_SimpleStatement 574
                self.parseCustomComponents();	//DEFPRINT(AST_SimpleStatement 575
                self.setCompFromHtmlCommentTags(comp_code);	//DEFPRINT(AST_SimpleStatement 576
            }
        });	//class_fun_def A 556
        ViewComponent.prototype = new View("__inheritance__", ViewComponent);	//class_fun_def C 556
        ViewComponent.prototype.setAsWatchObject = function setAsWatchObject(attr, value, mode){
            var self = this;	// complex body AST_Defun
            var obj;	//complex body AST_Scope declare var as local
            obj = {
                "value": value,
                "onChange": [],
                "mode": mode
            };	//DEFPRINT(AST_SimpleStatement 582
            self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 583
            function setter_callback(instance, attr) {
                function wrapper(_value) {
                    instance.onChange(attr, _value);	//DEFPRINT(AST_SimpleStatement 587
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 588
            }
            function getter_callback(instance, attr) {
                function wrapper(_value) {
                    return instance.get(attr);	//AST_Exit.DEFMETHOD( 592
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 593
            }
            self.__defineSetter__(attr, setter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 595
            self.__defineGetter__(attr, getter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 596
            return obj;	//AST_Exit.DEFMETHOD( 597
        };	//class_fun_def A 556
        ViewComponent.prototype.isWatchObject = function isWatchObject(value){
            var self = this;	// complex body AST_Defun
            var value_in_dict, onchange_in_dict;	//complex body AST_Scope declare var as local
            if (typeof value == "object") {
                value_in_dict = _$in_("value", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 600
                onchange_in_dict = _$in_("onChange", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 601
                self.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);	//DEFPRINT(AST_SimpleStatement 602
                return value_in_dict || onchange_in_dict;	//AST_Exit.DEFMETHOD( 604
            } else {
                return false;	//AST_Exit.DEFMETHOD( 605
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.set = function set(attr, value){
            var self = this;	// complex body AST_Defun
            self["_" + attr] = value;	//DEFPRINT(AST_SimpleStatement 608
        };	//class_fun_def A 556
        ViewComponent.prototype.get = function get(attr){
            var self = this;	// complex body AST_Defun
            return self["_" + attr];	//AST_Exit.DEFMETHOD( 611
        };	//class_fun_def A 556
        ViewComponent.prototype.onChange = function onChange(attr, value){
            var self = this;	// complex body AST_Defun
            var original_value, on_change_register_list, mode, state, state_data, state_conditions, _dict, target, target_attr, obj;	//complex body AST_Scope declare var as local
            original_value = self.get(attr);	//DEFPRINT(AST_SimpleStatement 613
            self.info(" origianal value = ", original_value);	//DEFPRINT(AST_SimpleStatement 614
            if (!self.isWatchObject(original_value)) {
                throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';	//AST_Exit.DEFMETHOD( 616
            }
            on_change_register_list = original_value.onChange;	//DEFPRINT(AST_SimpleStatement 618
            mode = original_value.mode;	//DEFPRINT(AST_SimpleStatement 619
            if (mode == "states") {
                state = self.States.getStateByName(value);	//DEFPRINT(AST_SimpleStatement 622
                state_data = state.data;	//DEFPRINT(AST_SimpleStatement 623
                state.processSetAttr();	//DEFPRINT(AST_SimpleStatement 624
                state.processAnime();	//DEFPRINT(AST_SimpleStatement 625
                state_conditions = state_data.conditions;	//DEFPRINT(AST_SimpleStatement 626
                var _$iter15 = state_conditions;
                for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
                    _dict = _$iter15[_$id15];
                    self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 628
                }
                return;	//AST_Exit.DEFMETHOD( 629
            } else if (mode == "visual_component") {
                self.VisuelElements[attr](value);	//DEFPRINT(AST_SimpleStatement 632
                return;	//AST_Exit.DEFMETHOD( 633
            }
            var _$iter16 = on_change_register_list;
            for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
                _dict = _$iter16[_$id16];
                if (_$in_("condition", dict.keys(_dict))) {
                    self.info("[set onchange list] set var with condition, attr = ", attr);	//DEFPRINT(AST_SimpleStatement 638
                    self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 639
                } else {
                    self.info("[set onchange list] set var, attr = ", attr, "value = ", value);	//DEFPRINT(AST_SimpleStatement 641
                    target = _dict["target"];	//DEFPRINT(AST_SimpleStatement 642
                    target_attr = _dict["attr"];	//DEFPRINT(AST_SimpleStatement 643
                    target.set(target_attr, value);	//DEFPRINT(AST_SimpleStatement 644
                }
            }
            self.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);	//DEFPRINT(AST_SimpleStatement 647
            obj = self.get(attr);	//DEFPRINT(AST_SimpleStatement 649
            obj.value = value;	//DEFPRINT(AST_SimpleStatement 650
            self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 651
        };	//class_fun_def A 556
        ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con){
            var self = this;	// complex body AST_Defun
            var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;	//complex body AST_Scope declare var as local
            "\n\t\t\t\trapydscript if elif else clause structure::\n\t\t\t\t{'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t\t\t'elif_clause': [{\n\t\t\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t\t\t'if_clause':\n\t\t\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\t\t\tpython if else clause structure\n\t\t\t\t{'if_setter'\t: \"'pressed'\",\n\t\t\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'else_setter'\t: \"'abc'\",\n\t\t\t\t'if_setted'\t\t: _state.name})";	//DEFPRINT(AST_Directive 653
            function get_condition(con_lst) {
                var prop_a, operator, prop_b, condition;	//complex body AST_Scope declare var as local
                _$Unpack = con_lst;	//DEFPRINT(AST_Assign 655
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 655
                condition = prop_a + operator + prop_b;	//DEFPRINT(AST_SimpleStatement 656
                return eval(condition);	//AST_Exit.DEFMETHOD( 657
            }
            if (con.if_clause) {
                var _$iter17 = dict.keys(con);
                for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
                    key = _$iter17[_$id17];
                    current = con[key];	//DEFPRINT(AST_SimpleStatement 661
                    _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 662
                    _pass = current["pass"];	//DEFPRINT(AST_SimpleStatement 663
                    condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 664
                    if (condition || !isEmpty(_condition)) {
                        if (!_pass) {
                            setted = current["setted"];	//DEFPRINT(AST_SimpleStatement 670
                            setter = current["setter"];	//DEFPRINT(AST_SimpleStatement 671
                            if (self.isWatchObject(setter)) {
                                v = setter.value;	//DEFPRINT(AST_SimpleStatement 673
                            } else {
                                v = setter;	//DEFPRINT(AST_SimpleStatement 675
                            }
                            if (self.isWatchObject(setted)) {
                                setted.value = v;	//DEFPRINT(AST_SimpleStatement 677
                            } else {
                                throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 679
                            }
                            continue;
                        } else {
                            continue;
                        }
                    }
                }
            } else if (con.if_con) {
                _condition = con["if_con"];	//DEFPRINT(AST_SimpleStatement 685
                setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 686
                condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 687
                if (condition) {
                    setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 689
                } else {
                    setter = con["else_setter"];	//DEFPRINT(AST_SimpleStatement 691
                }
                if (self.isWatchObject(setter)) {
                    v = setter.value;	//DEFPRINT(AST_SimpleStatement 693
                } else {
                    v = setter;	//DEFPRINT(AST_SimpleStatement 695
                }
                if (self.isWatchObject(setted)) {
                    setted.value = v;	//DEFPRINT(AST_SimpleStatement 697
                } else {
                    throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 699
                }
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.registCondition = function registCondition(register){
            var self = this;	// complex body AST_Defun
            var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;	//complex body AST_Scope declare var as local
            con = register.rapyd || register.python;	//DEFPRINT(AST_SimpleStatement 701
            pattern = new RegExp("([w]+[.][w]+)");	//DEFPRINT(AST_SimpleStatement 703
            if (con.if_clause) {
                _con = con.if_clause.condition;	//DEFPRINT(AST_SimpleStatement 707
                _$Unpack = _con;	//DEFPRINT(AST_Assign 708
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 708
                if (!con.if_clause["pass"]) {
                    setted = con["setted"];	//DEFPRINT(AST_SimpleStatement 711
                    setter = con["setter"];	//DEFPRINT(AST_SimpleStatement 712
                } else {
                    setted = setter = "";	//DEFPRINT(AST_SimpleStatement 714
                }
                if (prop_a.match(pattern)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 716
                }
                if (prop_b.match(pattern)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 718
                }
                return;	//AST_Exit.DEFMETHOD( 720
            } else {
                _con = con.if_con;	//DEFPRINT(AST_SimpleStatement 724
                _$Unpack = _con;	//DEFPRINT(AST_Assign 725
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 725
                if (!con["pass"]) {
                    setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 727
                    setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 728
                } else {
                    setted = setter = "";	//DEFPRINT(AST_SimpleStatement 730
                }
                if (_$in_("self.", prop_a)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 731
                }
                if (_$in_("self.", prop_b)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });	//DEFPRINT(AST_SimpleStatement 732
                }
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.setattr = function setattr(attr, value){
            var self = this;	// complex body AST_Defun
            if (typeof attr == "string") {
                if (self.isIfStatement(value)) {
                    self.registCondition(value);	//DEFPRINT(AST_SimpleStatement 738
                }
                if (self.isWatchObject(value)) {
                    value.onChange.append({
                        "target": self,
                        "attr": attr
                    });	//DEFPRINT(AST_SimpleStatement 740
                } else {
                    self.set(attr, value);	//DEFPRINT(AST_SimpleStatement 742
                }
            } else {
                throw "Invalid attribute type! attribute must be a string type";	//AST_Exit.DEFMETHOD( 744
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.isIfStatement = function isIfStatement(value){
            var self = this;	// complex body AST_Defun
            var condition, _if, key;	//complex body AST_Scope declare var as local
            if (typeof value == "object") {
                condition = value["python"] || value["rapyd"];	//DEFPRINT(AST_SimpleStatement 747
                if (!condition) {
                    return false;	//AST_Exit.DEFMETHOD( 748
                }
                if (typeof condition == "object") {
                    _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];	//DEFPRINT(AST_SimpleStatement 750
                    var _$iter18 = dict.keys(condition);
                    for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
                        key = _$iter18[_$id18];
                        if (_$in_(key, _if)) {
                            return true;	//AST_Exit.DEFMETHOD( 753
                        }
                    }
                }
            }
            return false;	//AST_Exit.DEFMETHOD( 754
        };	//class_fun_def A 556
        ViewComponent.prototype.setData = function setData(attr, value){
            var self = this;	// complex body AST_Defun
            self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 760
        };	//class_fun_def A 556
        ViewComponent.prototype.setCondition = function setCondition(attr, condition){
            var self = this;	// complex body AST_Defun
            self.conditionData[attr] = condition;	//DEFPRINT(AST_SimpleStatement 762
        };	//class_fun_def A 556
        ViewComponent.prototype.componentInitialize = function componentInitialize(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 556
        ViewComponent.prototype.setState = function setState(square){
            var self = this;	// complex body AST_Defun
            function wrapper() {
                square.state = self.state;	//DEFPRINT(AST_SimpleStatement 767
                if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
                    square.x = self.x;	//DEFPRINT(AST_SimpleStatement 769
                    square.y = self.y;	//DEFPRINT(AST_SimpleStatement 770
                }
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 771
        };	//class_fun_def A 556
        ViewComponent.prototype._setComponentStates = function _setComponentStates(states_instance){
            var self = this;	// complex body AST_Defun
            self.States = states_instance;	//DEFPRINT(AST_SimpleStatement 773
        };	//class_fun_def A 556
        ViewComponent.prototype.getCompById = function getCompById(id_name, attr){
            var self = this;	// complex body AST_Defun
            function getcomp_id_wrapper() {
                return [id_name, attr];	//AST_Exit.DEFMETHOD( 777
            }
            return getcomp_id_wrapper;	//AST_Exit.DEFMETHOD( 778
        };	//class_fun_def A 556
        ViewComponent.prototype.bindToHtmlTag = function bindToHtmlTag(tag_dom){
            var self = this;	// complex body AST_Defun
            self.html_target = tag_dom;	//DEFPRINT(AST_SimpleStatement 782
        };	//class_fun_def A 556
        ViewComponent.prototype.setInstanceName = function setInstanceName(n){
            var self = this;	// complex body AST_Defun
            self.instance_name = n;	//DEFPRINT(AST_SimpleStatement 784
        };	//class_fun_def A 556
        ViewComponent.prototype.onStateChanged = function onStateChanged(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlId = function setHtmlId(tag_name, id){
            var self = this;	// complex body AST_Defun
            var css_selector;	//complex body AST_Scope declare var as local
            css_selector = tag_name + "#" + id;	//DEFPRINT(AST_SimpleStatement 796
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlState = function setHtmlState(state_name){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlGroup = function setHtmlGroup(group_name){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlRenderFrom = function setHtmlRenderFrom(str_id){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlStyle = function setHtmlStyle(styles){
            var self = this;	// complex body AST_Defun
            var style;	//complex body AST_Scope declare var as local
            style = styles.split(";");	//DEFPRINT(AST_SimpleStatement 805
        };	//class_fun_def A 556
        ViewComponent.prototype.addRapydComp = function addRapydComp(fn){
            var self = this;	// complex body AST_Defun
            self.__rapyd_comps__.append(fn);	//DEFPRINT(AST_SimpleStatement 807
        };	//class_fun_def A 556
        ViewComponent.prototype.setHtmlAttribute = function setHtmlAttribute(dom){
            var self = this;	// complex body AST_Defun
            var tag_name, data, instance, jq_target, instance, jq_target, k, v;	//complex body AST_Scope declare var as local
            tag_name = dom["tag_name"];	//DEFPRINT(AST_SimpleStatement 809
            data = dom["data"];	//DEFPRINT(AST_SimpleStatement 810
            instance = jq_target = "";	//DEFPRINT(AST_SimpleStatement 811
            var _$iter19 = dict.items(data);
            for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
                _$Unpack = _$iter19[_$id19];
                k = _$Unpack[0];
                v = _$Unpack[1];
                self.setHtmlAttribute(k, v);	//DEFPRINT(AST_SimpleStatement 814
                if (k == "id") {
                    _$Unpack = self.setHtmlId(tag_name, v);	//DEFPRINT(AST_Assign 816
                    instance = _$Unpack[0];
                    jq_target = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 816
                } else if (k == "group") {
                    self.setHtmlGroup(v);	//DEFPRINT(AST_SimpleStatement 818
                } else if (k == "state") {
                    self.setHtmlState(v);	//DEFPRINT(AST_SimpleStatement 820
                } else if (k == "mvc") {
                } else if (k == "render_from") {
                    self.setHtmlRenderFrom(v);	//DEFPRINT(AST_SimpleStatement 824
                } else if (k == "style") {
                    self.css = new CssStyle(jq_target);	//DEFPRINT(AST_SimpleStatement 826
                    self.css.parseStyle(v);	//DEFPRINT(AST_SimpleStatement 827
                }
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.parseCustomComponents = function parseCustomComponents(){
            var self = this;	// complex body AST_Defun
            var html_comptag_list, rapyd_comp_list, duplicate_comp_list, apply_html_comp_tag_list, pattern, comp_data, comp_tag, comps, comp, k, tag_id, tag_name, instance, rapyd_comp_html_id, ptn, matches, comp_instance, comp_class, comp_instances, html_comptag, comp_code, groups, comp_initial_fn;	//complex body AST_Scope declare var as local
            html_comptag_list = [];	//DEFPRINT(AST_SimpleStatement 832
            rapyd_comp_list = [];	//DEFPRINT(AST_SimpleStatement 833
            duplicate_comp_list = [];	//DEFPRINT(AST_SimpleStatement 834
            apply_html_comp_tag_list = [];	//DEFPRINT(AST_SimpleStatement 835
            pattern = eval('new RegExp("(?:[\\\\s](\\\\w+)[\\\\s]*[=][\\\\s]*new[\\\\s]*(\\\\w+))","gm")');	//DEFPRINT(AST_SimpleStatement 836
            var _$iter20 = self.__rapyd_comps__;
            for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
                comp_initial_fn = _$iter20[_$id20];
                comp_data = comp_initial_fn();	//DEFPRINT(AST_SimpleStatement 841
                var _$iter21 = dict.keys(comp_data);
                for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
                    k = _$iter21[_$id21];
                    self.component_tags.append(k);	//DEFPRINT(AST_SimpleStatement 845
                    comp_tag = k;	//DEFPRINT(AST_SimpleStatement 846
                    comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 847
                    var _$iter22 = comps;
                    for (var _$id22 = 0; _$id22 < _$iter22.length; _$id22++) {
                        comp = _$iter22[_$id22];
                        html_comptag_list.append({
                            "tag_name": comp_tag,
                            "comp": comp
                        });	//DEFPRINT(AST_SimpleStatement 851
                    }
                }
                var _$iter23 = html_comptag_list;
                for (var _$id23 = 0; _$id23 < _$iter23.length; _$id23++) {
                    html_comptag = _$iter23[_$id23];
                    tag_id = html_comptag["comp"].id;	//DEFPRINT(AST_SimpleStatement 856
                    tag_name = html_comptag["tag_name"];	//DEFPRINT(AST_SimpleStatement 857
                    var _$iter24 = dict.items(comp_data);
                    for (var _$id24 = 0; _$id24 < _$iter24.length; _$id24++) {
                        _$Unpack = _$iter24[_$id24];
                        comp_class = _$Unpack[0];
                        comp_instances = _$Unpack[1];
                        var _$iter25 = comp_instances.slice(1);
                        for (var _$id25 = 0; _$id25 < _$iter25.length; _$id25++) {
                            comp_instance = _$iter25[_$id25];
                            if (comp_instance["id"] == tag_id) {
                                instance = comp_instance["instance"];	//DEFPRINT(AST_SimpleStatement 864
                                instance.setInstanceName(comp_instance["id"]);	//DEFPRINT(AST_SimpleStatement 865
                                instance.bindToHtmlTag(html_comptag["comp"]);	//DEFPRINT(AST_SimpleStatement 866
                                apply_html_comp_tag_list.append({
                                    "html_comp": html_comptag,
                                    "rapyd_comp": comp_instance
                                });	//DEFPRINT(AST_SimpleStatement 868
                            } else {
                                if (tag_name == comp_class) {
                                    rapyd_comp_html_id = comp_instance["instance"].data["html_id"];	//DEFPRINT(AST_SimpleStatement 871
                                    ptn = re.compile(re, rapyd_comp_html_id);	//DEFPRINT(AST_SimpleStatement 879
                                    matches = tag_id.match(ptn);	//DEFPRINT(AST_SimpleStatement 880
                                    if (matches) {
                                        duplicate_comp_list.append({
                                            "html_comp": html_comptag,
                                            "rapyd_comp": comp_instance
                                        });	//DEFPRINT(AST_SimpleStatement 882
                                    }
                                }
                            }
                        }
                    }
                }
                comp_code = comp_initial_fn.toString();	//DEFPRINT(AST_SimpleStatement 884
                groups = comp_code.match(pattern);	//DEFPRINT(AST_SimpleStatement 885
                self.info("comp_data \t\t= ", comp_data);	//DEFPRINT(AST_SimpleStatement 887
                self.info("duplicate list \t= ", duplicate_comp_list);	//DEFPRINT(AST_SimpleStatement 888
                self.info("apply list \t\t= ", apply_html_comp_tag_list);	//DEFPRINT(AST_SimpleStatement 889
            }
        };	//class_fun_def A 556
        ViewComponent.prototype.setCompFromHtmlCommentTags = function setCompFromHtmlCommentTags(comp_code){
            var self = this;	// complex body AST_Defun
            var comp_tags, comp_list, comps, comp, comp_tag, pattern, groups, matched_data, m, match, group;	//complex body AST_Scope declare var as local
            return;	//AST_Exit.DEFMETHOD( 898
            comp_tags = eval(comp_code.split("__comp_tags__ = ")[1].split(";")[0]);	//DEFPRINT(AST_SimpleStatement 899
            comp_list = [];	//DEFPRINT(AST_SimpleStatement 900
            var _$iter26 = comp_tags;
            for (var _$id26 = 0; _$id26 < _$iter26.length; _$id26++) {
                comp_tag = _$iter26[_$id26];
                comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 903
                var _$iter27 = comps;
                for (var _$id27 = 0; _$id27 < _$iter27.length; _$id27++) {
                    comp = _$iter27[_$id27];
                    comp_list.append({
                        "tag_name": comp_tag,
                        "comp": comp
                    });	//DEFPRINT(AST_SimpleStatement 905
                }
            }
            jQuery.__compcode__ = comp_code;	//DEFPRINT(AST_SimpleStatement 907
            pattern = 'new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+))","gm")';	//DEFPRINT(AST_SimpleStatement 908
            groups = comp_code.match(eval(pattern));	//DEFPRINT(AST_SimpleStatement 909
            eval(comp_code);	//DEFPRINT(AST_SimpleStatement 911
            console.log("evaluated generated component");	//DEFPRINT(AST_SimpleStatement 912
            console.log("bt1 = ", bt1);	//DEFPRINT(AST_SimpleStatement 913
            matched_data = {};	//DEFPRINT(AST_SimpleStatement 914
            var _$iter28 = groups;
            for (var _$id28 = 0; _$id28 < _$iter28.length; _$id28++) {
                group = _$iter28[_$id28];
                m = pattern.exec(comp_code);	//DEFPRINT(AST_SimpleStatement 916
                match = m.slice(1);	//DEFPRINT(AST_SimpleStatement 917
                if (isEmpty(matched_data[match[1]])) {
                    matched_data[match[1]] = [];	//DEFPRINT(AST_SimpleStatement 918
                }
                matched_data[match[1]].append(eval(match[0]));	//DEFPRINT(AST_SimpleStatement 919
            }
            self.component_tags = comp_tags;	//DEFPRINT(AST_SimpleStatement 921
            self.info("matched = ", matched_data, "comp_tags = ", comp_tags);	//DEFPRINT(AST_SimpleStatement 922
            self.setCompFromHtmlTags(comp_list);	//DEFPRINT(AST_SimpleStatement 923
        };	//class_fun_def A 556
        ViewComponent.prototype.setCompFromHtmlTags = function setCompFromHtmlTags(comp_list){
            var self = this;	// complex body AST_Defun
            var tag_name, comp, dom, node, _comp;	//complex body AST_Scope declare var as local
            var _$iter29 = comp_list;
            for (var _$id29 = 0; _$id29 < _$iter29.length; _$id29++) {
                _comp = _$iter29[_$id29];
                tag_name = _comp["tag_name"];	//DEFPRINT(AST_SimpleStatement 928
                comp = _comp["comp"];	//DEFPRINT(AST_SimpleStatement 929
                dom = {
                    "tag_name": tag_name,
                    "data": ""
                };	//DEFPRINT(AST_SimpleStatement 930
                var _$iter30 = comp.attributes;
                for (var _$id30 = 0; _$id30 < _$iter30.length; _$id30++) {
                    node = _$iter30[_$id30];
                    dom["data"][node.nodeName] = node.nodeValue;	//DEFPRINT(AST_SimpleStatement 932
                }
                self.log("[setCompFromHtmlTags] dom = ", dom);	//DEFPRINT(AST_SimpleStatement 934
                self.setHtmlAttribute(dom);	//DEFPRINT(AST_SimpleStatement 935
            }
        };	//class_fun_def A 556
        ViewComponent = __defineClassProperties__(ViewComponent);
        ViewComponent = defineClassProperties(ViewComponent);
        var Animation = Callable(function Animation_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            self.data = {
                "tween": []
            };	//DEFPRINT(AST_SimpleStatement 939
        });	//class_fun_def A 937
        Animation.prototype.setData = function setData(attr, value){
            var self = this;	// complex body AST_Defun
            self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 941
        };	//class_fun_def A 937
        Animation.prototype.setTwn = function setTwn(tween_code){
            var self = this;	// complex body AST_Defun
            function tween(anim) {
                function wrapper(code) {
                    anim.data["tween"].append(code);	//DEFPRINT(AST_SimpleStatement 945
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 946
            }
            return tween(self);	//AST_Exit.DEFMETHOD( 947
        };	//class_fun_def A 937
        Animation.prototype.startAnime = function startAnime(target){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 937
        Animation = __defineClassProperties__(Animation);
        var State = Callable(function State_(states, target){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            self.parent = states;	//DEFPRINT(AST_SimpleStatement 952
            self.target = target;	//DEFPRINT(AST_SimpleStatement 953
            self.data = {
                "animation": [],
                "name": "",
                "setattr": [],
                "conditions": []
            };	//DEFPRINT(AST_SimpleStatement 954
        });	//class_fun_def A 950
        State.prototype.setCondition = function setCondition(attr, con){
            var self = this;	// complex body AST_Defun
            self.data["conditions"].append(con);	//DEFPRINT(AST_SimpleStatement 957
        };	//class_fun_def A 950
        State.prototype.setAnime = function setAnime(){
            var self = this;	// complex body AST_Defun
            var anim;	//complex body AST_Scope declare var as local
            anim = new Animation();	//DEFPRINT(AST_SimpleStatement 959
            self.data["animation"] = anim;	//DEFPRINT(AST_SimpleStatement 960
            return anim;	//AST_Exit.DEFMETHOD( 961
        };	//class_fun_def A 950
        State.prototype.setData = function setData(attr, value){
            var self = this;	// complex body AST_Defun
            self.data["setattr"].append([ attr, value ]);	//DEFPRINT(AST_SimpleStatement 963
        };	//class_fun_def A 950
        State.prototype.setName = function setName(name){
            var self = this;	// complex body AST_Defun
            self.data[name] = name;	//DEFPRINT(AST_SimpleStatement 965
        };	//class_fun_def A 950
        State.prototype.addState = function addState(){
            var self = this;	// complex body AST_Defun
            return self.parent.addState();	//AST_Exit.DEFMETHOD( 967
        };	//class_fun_def A 950
        State.prototype.processSetAttr = function processSetAttr(){
            var self = this;	// complex body AST_Defun
            var lst;	//complex body AST_Scope declare var as local
            var _$iter31 = self.data["setattr"];
            for (var _$id31 = 0; _$id31 < _$iter31.length; _$id31++) {
                lst = _$iter31[_$id31];
                self.target[lst[0]] = lst[1];	//DEFPRINT(AST_SimpleStatement 972
            }
        };	//class_fun_def A 950
        State.prototype.processAnime = function processAnime(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 950
        State = __defineClassProperties__(State);
        var States = Callable(function States_(){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            self.states = [];	//DEFPRINT(AST_SimpleStatement 977
            self.current_state = self.target = "";	//DEFPRINT(AST_SimpleStatement 978
            self.setAsWatchObject("current_state", "default", mode = "");	//DEFPRINT(AST_SimpleStatement 979
        });	//class_fun_def A 975
        States.prototype = new ViewComponent("__inheritance__", States);	//class_fun_def C 975
        States.prototype.getStates = function getStates(){
            var self = this;	// complex body AST_Defun
            return self.states;	//AST_Exit.DEFMETHOD( 982
        };	//class_fun_def A 975
        States.prototype.getStateByName = function getStateByName(name){
            var self = this;	// complex body AST_Defun
            var state;	//complex body AST_Scope declare var as local
            var _$iter32 = self.states;
            for (var _$id32 = 0; _$id32 < _$iter32.length; _$id32++) {
                state = _$iter32[_$id32];
                if (state.data.name == name) {
                    return state.data;	//AST_Exit.DEFMETHOD( 987
                }
            }
        };	//class_fun_def A 975
        States.prototype.addState = function addState(){
            var self = this;	// complex body AST_Defun
            var state;	//complex body AST_Scope declare var as local
            state = new State(self, self.target);	//DEFPRINT(AST_SimpleStatement 989
            self.states.append(state);	//DEFPRINT(AST_SimpleStatement 990
            return state;	//AST_Exit.DEFMETHOD( 991
        };	//class_fun_def A 975
        States.prototype.setTarget = function setTarget(target){
            var self = this;	// complex body AST_Defun
            self.target = target;	//DEFPRINT(AST_SimpleStatement 994
            target._setComponentStates(self);	//DEFPRINT(AST_SimpleStatement 995
        };	//class_fun_def A 975
        States.prototype.setState = function setState(state_name){
            var self = this;	// complex body AST_Defun
            self.current_state = state_name;	//DEFPRINT(AST_SimpleStatement 1001
        };	//class_fun_def A 975
        States = __defineClassProperties__(States);
        var VisualElements = Callable(function VisualElements_(target, data){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            var i;	//complex body AST_Scope declare var as local
            function getter_callback(ref, attr) {
                function wrapper() {
                    return ref[attr];	//AST_Exit.DEFMETHOD( 1006
                }
                return wrapper;	//AST_Exit.DEFMETHOD( 1007
            }
            var _$iter33 = data;
            for (var _$id33 = 0; _$id33 < _$iter33.length; _$id33++) {
                i = _$iter33[_$id33];
                if (_$in_("-", i)) {
                    self.__defineGetter__(i, getter_callback(self, i.replace("-", "_")));	//DEFPRINT(AST_SimpleStatement 1010
                }
            }
            self.target = target;	//DEFPRINT(AST_SimpleStatement 1011
            self.__allowed__ = data;	//DEFPRINT(AST_SimpleStatement 1012
        });	//class_fun_def A 1002
        VisualElements.prototype.pos = function pos(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.pos_hint = function pos_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.size = function size(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.size_hint = function size_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.scale = function scale(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.scale_hint = function scale_hint(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.background = function background(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.background_color = function background_color(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements.prototype.border = function border(){
            var self = this;	// complex body AST_Defun
        };	//class_fun_def A 1002
        VisualElements = __defineClassProperties__(VisualElements);
        
        var Rectangle = Callable(function Rectangle_(instance){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (instance == defineClassProperties.name) {
                self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 1029
                self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 1030
            } else if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 1033
                }
                self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 1034
            }
            self.data = {};	//DEFPRINT(AST_SimpleStatement 1037
            self.html_target = {};	//DEFPRINT(AST_SimpleStatement 1038
            self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 1039
        });	//class_fun_def A 1025
        Rectangle.prototype = new ViewComponent("__inheritance__", Rectangle);	//class_fun_def C 1025
        Rectangle.prototype.getInstance = function getInstance(ins_name){
            var self = this;	// complex body AST_Defun
            return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 1044
        };	//class_fun_def A 1025
        Rectangle = __defineClassProperties__(Rectangle);
        Rectangle = defineClassProperties(Rectangle);
        
        var Button = Callable(function Button_(instance){
            var self = this;	// complex body AST_Defun
            if (arguments[0] == "__inheritance__") return;
            if (instance == defineClassProperties.name) {
                self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 1052
                self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 1053
            } else if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 1056
                }
                self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 1057
            }
            self.data = {};	//DEFPRINT(AST_SimpleStatement 1060
            self.html_target = {};	//DEFPRINT(AST_SimpleStatement 1061
            self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 1062
        });	//class_fun_def A 1048
        Button.prototype = new ViewComponent("__inheritance__", Button);	//class_fun_def C 1048
        Button.prototype.getInstance = function getInstance(ins_name){
            var self = this;	// complex body AST_Defun
            return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 1072
        };	//class_fun_def A 1048
        Button = __defineClassProperties__(Button);
        Button = defineClassProperties(Button);
        return {
            Template: Template,
            ViewComponent: ViewComponent,
            Animation: Animation,
            Button: Button,
            State: State,
            States: States,
            Rectangle: Rectangle,
            scope: scope
        };	//AST_Exit.DEFMETHOD( 1074
    }
    UiKit = module(UiKit);
    return {
        MVC: MVC,
        UiKit: UiKit,
        scope: scope
    };	//AST_Exit.DEFMETHOD( 1078
}
RapydMVC = module(RapydMVC);



function test_app() {
    var core, core_variables, mvc, ui, RapydWeb, Controller, View, Button;	//complex body AST_Scope declare var as local
    core = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1082
    core_variables = core.scope;	//DEFPRINT(AST_SimpleStatement 1083
    mvc = core.MVC;	//DEFPRINT(AST_SimpleStatement 1084
    ui = core.UiKit;	//DEFPRINT(AST_SimpleStatement 1085
    _$Unpack = [mvc.RapydWeb, mvc.Controller, mvc.View, ui.Button];	//DEFPRINT(AST_Assign 1088
    RapydWeb = _$Unpack[0];
    Controller = _$Unpack[1];
    View = _$Unpack[2];
    Button = _$Unpack[3];	//DEFPRINT(AST_SimpleStatement 1088
    core_variables.variableA = "set from test_app";	//DEFPRINT(AST_SimpleStatement 1090
    core_variables.variableB = "set from test_app";	//DEFPRINT(AST_SimpleStatement 1091
    var BlogController = Callable(function BlogController_(init, name){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (typeof name === "undefined") name = null;
        if (init) {
            super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 1098
            self.actions = [ "index", "viewArticles", "viewByTags" ];	//DEFPRINT(AST_SimpleStatement 1104
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 1105
            super_(BlogController, self).__init__(self, "BlogController");	//DEFPRINT(AST_SimpleStatement 1106
        }
    });	//class_fun_def A 1092
    BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 1092
    BlogController = __defineClassProperties__(BlogController);
    var VoclistController = Callable(function VoclistController_(init){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 1113
            self.actions = [ "vocHome", "vocSentence", "vocIndex" ];	//DEFPRINT(AST_SimpleStatement 1115
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 1116
            super_(VoclistController, self).__init__(self, "VoclistController");	//DEFPRINT(AST_SimpleStatement 1117
        }
    });	//class_fun_def A 1108
    VoclistController.prototype = new Controller("__inheritance__", VoclistController);	//class_fun_def C 1108
    VoclistController.prototype.vocIndex = function vocIndex(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 1120
    };	//class_fun_def A 1108
    VoclistController.prototype.vocSentence = function vocSentence(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 1122
    };	//class_fun_def A 1108
    VoclistController.prototype.vocHome = function vocHome(){
        var self = this;	// complex body AST_Defun
        self.log("");	//DEFPRINT(AST_SimpleStatement 1124
    };	//class_fun_def A 1108
    VoclistController = __defineClassProperties__(VoclistController);
    var BlogView = Callable(function BlogView_(init){
        var self = this;	// complex body AST_Defun
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            super_(View, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 1130
            self.actions = [ "index", "viewArticles" ];	//DEFPRINT(AST_SimpleStatement 1132
            self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 1133
            super_(BlogView, self).__init__(self, "BlogView");	//DEFPRINT(AST_SimpleStatement 1134
        }
    });	//class_fun_def A 1126
    BlogView.prototype = new View("__inheritance__", BlogView);	//class_fun_def C 1126
    BlogView.prototype.index = function index(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 1126
    BlogView.prototype.viewArticles = function viewArticles(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 1126
    BlogView.prototype.viewByTags = function viewByTags(){
        var self = this;	// complex body AST_Defun
    };	//class_fun_def A 1126
    BlogView = __defineClassProperties__(BlogView);
    return {
        BlogController: BlogController,
        VoclistController: VoclistController,
        BlogView: BlogView
    };	//AST_Exit.DEFMETHOD( 1147
}
test_app = module(test_app);

function test1() {
    var mvc, rapyd, app, ViewComponent, AddressMediator, HeaderMediator, BlogController, VoclistController, v;	//complex body AST_Scope declare var as local
    mvc = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1150
    rapyd = mvc.MVC.instance_pack;	//DEFPRINT(AST_SimpleStatement 1151
    app = test_app;	//DEFPRINT(AST_SimpleStatement 1152
    ViewComponent = mvc.UiKit.ViewComponent;	//DEFPRINT(AST_SimpleStatement 1154
    _$Unpack = [mvc.MVC.AddressMediator, mvc.MVC.HeaderMediator];	//DEFPRINT(AST_Assign 1155
    AddressMediator = _$Unpack[0];
    HeaderMediator = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 1155
    _$Unpack = [app.BlogController, app.VoclistController];	//DEFPRINT(AST_Assign 1156
    BlogController = _$Unpack[0];
    VoclistController = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 1156
    rapyd.c.blog = cls(BlogController, "init");	//DEFPRINT(AST_SimpleStatement 1158
    rapyd.c.voclist = cls(VoclistController, "init");	//DEFPRINT(AST_SimpleStatement 1159
    rapyd.mediator.address = cls(AddressMediator, "init");	//DEFPRINT(AST_SimpleStatement 1161
    rapyd.mediator.header = cls(HeaderMediator, "init");	//DEFPRINT(AST_SimpleStatement 1162
    console.log("------------ start -----------");	//DEFPRINT(AST_SimpleStatement 1164
    console.log(rapyd);	//DEFPRINT(AST_SimpleStatement 1165
    console.log("------------ test for view component -----------");	//DEFPRINT(AST_SimpleStatement 1167
    v = cls(ViewComponent, "init");	//DEFPRINT(AST_SimpleStatement 1169
    v.setAsWatchObject("test_setter", 123);	//DEFPRINT(AST_SimpleStatement 1170
    v.setAsWatchObject("set_from_callback", "bbb");	//DEFPRINT(AST_SimpleStatement 1171
    console.log('set "setter" and "set_from_callback" as watch object');	//DEFPRINT(AST_SimpleStatement 1172
    console.log("");	//DEFPRINT(AST_SimpleStatement 1173
    console.log("default value of \t\ttest_setter \t\t= ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1174
    console.log("default value of \t\tset_from_callback \t= ", v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 1175
    console.log("");	//DEFPRINT(AST_SimpleStatement 1176
    console.log('set test_setter to "value1"');	//DEFPRINT(AST_SimpleStatement 1177
    v.test_setter = "value1";	//DEFPRINT(AST_SimpleStatement 1178
    console.log("set set_from_callback's reference to test_setter");	//DEFPRINT(AST_SimpleStatement 1179
    v.setattr("set_from_callback", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1180
    console.log('read value of "test_setter" \t\t= ', v.test_setter);	//DEFPRINT(AST_SimpleStatement 1181
    console.log('read value of "set_from_callback" \t= ', v.set_from_callback);	//DEFPRINT(AST_SimpleStatement 1182
    console.log("");	//DEFPRINT(AST_SimpleStatement 1183
    console.log("alter value of test_setter to 'value2', to see if set_from_callback value changes!");	//DEFPRINT(AST_SimpleStatement 1184
    v.test_setter = "value2";	//DEFPRINT(AST_SimpleStatement 1186
    console.log("set_from_callback value = ", v.set_from_callback, " v.test_setter = ", v.test_setter);	//DEFPRINT(AST_SimpleStatement 1187
}

function test2() {
    var mvc, rapyd;	//complex body AST_Scope declare var as local
    console.log("");	//DEFPRINT(AST_SimpleStatement 1189
    console.log("=========== module import test ================");	//DEFPRINT(AST_SimpleStatement 1190
    console.log("");	//DEFPRINT(AST_SimpleStatement 1191
    mvc = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1192
    rapyd = mvc.MVC.instance_pack;	//DEFPRINT(AST_SimpleStatement 1193
}

function test3(rapydml_component_tag) {
    var core, mvc, ui, ViewComponent, rapydml_component_code, v;	//complex body AST_Scope declare var as local
    console.log("=========== component test ================");	//DEFPRINT(AST_SimpleStatement 1195
    core = RapydMVC;	//DEFPRINT(AST_SimpleStatement 1196
    mvc = core.MVC;	//DEFPRINT(AST_SimpleStatement 1197
    ui = core.UiKit;	//DEFPRINT(AST_SimpleStatement 1198
    ViewComponent = ui.ViewComponent;	//DEFPRINT(AST_SimpleStatement 1199
    rapydml_component_tag = 'script[type="text/rapydml_component"]';	//DEFPRINT(AST_SimpleStatement 1201
    rapydml_component_code = jQuery(rapydml_component_tag).html();	//DEFPRINT(AST_SimpleStatement 1202
    console.log("--------------------------");	//DEFPRINT(AST_SimpleStatement 1204
    console.log("---- component script ----");	//DEFPRINT(AST_SimpleStatement 1205
    console.log("--------------------------");	//DEFPRINT(AST_SimpleStatement 1206
    v = cls(ViewComponent, "customcomp", rapydml_component_code);	//DEFPRINT(AST_SimpleStatement 1207
}
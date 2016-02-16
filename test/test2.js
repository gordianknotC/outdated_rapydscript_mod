function insert(lst, index, value) {
    _$rapyd$_unbindAll(this, true);
    var l, r, l;
    value = [ value ];
    l = lst.slice(0, index);
    r = lst.slice(index);
    l = l.concat(value);
    return l.concat(r);
}

function isEmpty(n) {
    _$rapyd$_unbindAll(this, true);
    var key;
    if (typeof n == "object") {
        if (len(n) == 0) {
            return true;
        }
        var _$rapyd$_Iter0 = dict.keys(n);
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            key = _$rapyd$_Iter0[_$rapyd$_Index0];
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
            var _$rapyd$_Iter1 = dict.items(m);
            for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                _$rapyd$_Unpack = _$rapyd$_Iter1[_$rapyd$_Index1];
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
        var _$rapyd$_Iter2 = dict.items(module_member_data);
        for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
            _$rapyd$_Unpack = _$rapyd$_Iter2[_$rapyd$_Index2];
            key = _$rapyd$_Unpack[0];
            value = _$rapyd$_Unpack[1];
            if (key == "scope") {
                var _$rapyd$_Iter3 = dict.items(value);
                for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                    _$rapyd$_Unpack = _$rapyd$_Iter3[_$rapyd$_Index3];
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
                        scope_attrs.append(k);
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
                eval(scope_obj.__module__).prototype.scope["_" + _attr] = _value;
            }
            return wrapper;
        }
        function getter_callback(scope_obj, _attr) {
            _$rapyd$_unbindAll(this, true);
            function wrapper() {
                _$rapyd$_unbindAll(this, true);
                return eval(scope_obj.__module__).prototype.scope["_" + _attr];
            }
            return wrapper;
        }
        var _$rapyd$_Iter4 = scope_attrs;
        for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
            attr = _$rapyd$_Iter4[_$rapyd$_Index4];
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
    if (!cls.prototype.__classproperty_setted__) {
        function getter(_cls, k) {
            _$rapyd$_unbindAll(this, true);
            function wrapper() {
                _$rapyd$_unbindAll(this, true);
                return _cls.prototype[k];
            }
            return wrapper;
        }
        function setter(_cls, k) {
            _$rapyd$_unbindAll(this, true);
            function wrapper(value) {
                _$rapyd$_unbindAll(this, true);
                _cls.prototype[k] = value;
            }
            return wrapper;
        }
        var _$rapyd$_Iter5 = dict.items(props);
        for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
            _$rapyd$_Unpack = _$rapyd$_Iter5[_$rapyd$_Index5];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            console.log(k, v);
            cls.prototype[k] = v;
            cls.__defineGetter__(k, getter(cls, k));
            cls.__defineSetter__(k, setter(cls, k));
        }
        cls.prototype.__classproperty_setted__ = true;
    }
}

function classprop_init(f) {
    _$rapyd$_unbindAll(this, true);
    f.prototype.__classproperty_setted__ = false;
    eval('new f("classprop_init")');
    return f;
}

function super_(cls, instance) {
    _$rapyd$_unbindAll(this, true);
    var super_name, super_class;
    function find_class_name(ref, name) {
        _$rapyd$_unbindAll(this, true);
        if (ref.__proto__.__name__ == name) {
            return ref.__proto__;
        } else {
            return find_class_name(ref.__proto__, name);
        }
    }
    super_name = cls.prototype.__proto__.__name__;
    instance.name = cls.name;
    super_class = find_class_name(instance, super_name);
    return super_class;
}



function RapydWeb(init){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.start = _$rapyd$_bind(this.start, this);
    this.configure = _$rapyd$_bind(this.configure, this);
    this.debug = _$rapyd$_bind(this.debug, this);
    this.log = _$rapyd$_bind(this.log, this);
    this.error = _$rapyd$_bind(this.error, this);
    this.info = _$rapyd$_bind(this.info, this);
    this.__actionInit__ = _$rapyd$_bind(this.__actionInit__, this);
    this.__components_init__ = _$rapyd$_bind(this.__components_init__, this);
    this.actionPropStructure = _$rapyd$_bind(this.actionPropStructure, this);
    this.viewPropStructure = _$rapyd$_bind(this.viewPropStructure, this);
    this.checkActionsAvailable = _$rapyd$_bind(this.checkActionsAvailable, this);
    if (init == "classprop_init") {
        self.m = [];
        self.v = [];
        self.c = [];
        self.action = self.debug_level = "";
        self.components = [];
        self.config = [];
        self.__instance__ = [];
        class_properties(RapydWeb, self);
    } else if (typeof init == "object") {
        self.__instance__[init.name] = init;
    } else if (init) {
        self.__instance__["RapydWeb"] = self;
    }
};
RapydWeb.prototype.start = function start(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
};
RapydWeb.prototype.configure = function configure(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    " initialize all configuration";
};
RapydWeb.prototype.debug = function debug(){
    var self = this;
    var args = [].slice.call(arguments, 0);
    _$rapyd$_unbindAll(this, true);
    var name, color;
    name = "%c[DEBUG][" + self.debug.caller.name + "]";
    color = "background: #222; color: #bada55";
    args.insert(0, color);
    args.insert(0, name);
    console.debug.apply(console, [].concat(args));
};
RapydWeb.prototype.log = function log(){
    var self = this;
    var args = [].slice.call(arguments, 0);
    _$rapyd$_unbindAll(this, true);
    var name;
    if (self.log.caller) {
        name = "[LOG][" + self.log.caller.name + "]";
        args.insert(0, name);
    }
    console.log.apply(console, [].concat(args));
};
RapydWeb.prototype.error = function error(){
    var self = this;
    var args = [].slice.call(arguments, 0);
    _$rapyd$_unbindAll(this, true);
    var name;
    name = "[ERROR][" + self.error.caller.name + "]";
    args.insert(0, name);
    console.error.apply(console, [].concat(args));
};
RapydWeb.prototype.info = function info(){
    var self = this;
    var args = [].slice.call(arguments, 0);
    _$rapyd$_unbindAll(this, true);
    var name, color;
    name = "%c[INFO][" + self.info.caller.name + "]";
    color = "background: #667; color: #fff";
    args.insert(0, color);
    args.insert(0, name);
    console.info.apply(console, [].concat(args));
};
RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var action, action;
    self.checkActionsAvailable(name, sub_successor);
    if (!hyper_successor.__actions__[name]) {
        hyper_successor.__actions__[name] = {};
    }
    self.log("__actions__ = ", hyper_successor.__actions__);
    self.log("successor actions = ", sub_successor.actions);
    if (!(hyper_successor.name == "View")) {
        var _$rapyd$_Iter6 = sub_successor.actions;
        for (var _$rapyd$_Index6 = 0; _$rapyd$_Index6 < _$rapyd$_Iter6.length; _$rapyd$_Index6++) {
            action = _$rapyd$_Iter6[_$rapyd$_Index6];
            hyper_successor.__actions__[name][action] = self.actionPropStructure();
        }
    } else {
        var _$rapyd$_Iter7 = sub_successor.actions;
        for (var _$rapyd$_Index7 = 0; _$rapyd$_Index7 < _$rapyd$_Iter7.length; _$rapyd$_Index7++) {
            action = _$rapyd$_Iter7[_$rapyd$_Index7];
            hyper_successor.__actions__[name][action] = self.viewPropStructure();
        }
    }
};
RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    if (sub_successor.components) {
        if (!hyper_successor.__components__[name]) {
            hyper_successor.__components__[name] = [];
        }
        hyper_successor.__components__[name] = sub_successor.components;
    }
};
RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var r;
    r = {
        "views": [],
        "props": {}
    };
    return r;
};
RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var r;
    r = {
        "views": [],
        "props": {}
    };
    return r;
};
RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var action;
    self.log(name, successor);
    self.log(successor.actions);
    var _$rapyd$_Iter8 = successor.actions;
    for (var _$rapyd$_Index8 = 0; _$rapyd$_Index8 < _$rapyd$_Iter8.length; _$rapyd$_Index8++) {
        action = _$rapyd$_Iter8[_$rapyd$_Index8];
        if (!successor[action]) {
            self.error("[error] actions [{0}] not exists", action);
            return false;
        }
    }
};
RapydWeb = classprop_init(RapydWeb);

function Controller(init){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.init = _$rapyd$_bind(this.init, this);
    this.__getattr__ = _$rapyd$_bind(this.__getattr__, this);
    this.__get__ = _$rapyd$_bind(this.__get__, this);
    this.__beforAction = _$rapyd$_bind(this.__beforAction, this);
    this.beforeAction = _$rapyd$_bind(this.beforeAction, this);
    this.afterAction = _$rapyd$_bind(this.afterAction, this);
    this.__afterAction = _$rapyd$_bind(this.__afterAction, this);
    this.__startRender = _$rapyd$_bind(this.__startRender, this);
    if (init) {
        self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];
        RapydWeb.prototype.__instance__["Controller"] = self;
        self.__classname__ = "Controller";
        self.__components__ = {};
        self.__actions__ = {};
    }
};
Controller.prototype = new RapydWeb();
Controller.prototype.constructor = Controller;
_$rapyd$_unbindAll(Controller.prototype);
Controller.prototype.init = function init(name, successor){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    "\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t";
    self.__components_init__(self, name, successor);
    self.__actionInit__(self, name, successor);
};
Controller.prototype.__getattr__ = function __getattr__(item){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    print;
    item;
};
Controller.prototype.__get__ = function __get__(instance, owner){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    print;
    [instance, owner];
};
Controller.prototype.__beforAction = function __beforAction(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    _$rapyd$_unbindAll(this, true);
    self.beforeAction(f, args);
};
Controller.prototype.beforeAction = function beforeAction(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    _$rapyd$_unbindAll(this, true);
};
Controller.prototype.afterAction = function afterAction(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    _$rapyd$_unbindAll(this, true);
};
Controller.prototype.__afterAction = function __afterAction(){
    var self = this;
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    _$rapyd$_unbindAll(this, true);
    self.__startRender(f, args);
};
Controller.prototype.__startRender = function __startRender(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
};

function BlogController(init){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    if (init) {
        super_(Controller, self).__init__(self);
        self.actions = [ "index", "viewArticles", "viewByTags" ];
        self.components = [ "modalbox" ];
        self.init("BlogController", self);
    }
};
BlogController.prototype = new Controller();
BlogController.prototype.constructor = BlogController;
_$rapyd$_unbindAll(BlogController.prototype);

"\nclass View( RapydWeb ):\n\t__actions__ = __components__ = ''\n\n\tdef __init__ (self, init):\n\t\t# due to the characteristic of javascript prototype that constructor was called\n\t\t# not only when user instantiate it but also when inheritance from it's sub classes\n\t\t# so we need make a trick to prevent constructor called by its sub class\n\t\tif init:\n\t\t\t# instance initiate code here\n\t\t\t# change inheritance from class into instance\n\t\t\tself.__proto__ = RapydWeb.prototype.__instance__['RapydWeb']\n\t\t\t# for easy access\n\t\t\tRapydWeb.prototype.__instance__['View'] = self\n\t\t\tself.__classname__ = 'View'\n\t\t\tself.__components__ = { }\n\t\t\tself.__actions__ = { }\n\n\tdef init (self, name, successor):\n\t\t'''\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t'''\n\t\tself.__components_init__( self, name, successor )\n\t\tself.__actionInit__( self, name, successor )\n\n\tdef beforeRender (self, f, *args):\n\t\tpass\n\n\tdef afterRender (self, f, *args):\n\t\tpass\n\n\tdef mapToHtml(self):\n\t\tpass\n\n\t# todo:: need test\n\tdef getComponentComment(self):\n\t\tcomp_comment = jQuery('body').comments()[0]\n\t\tfor comp_name in self.view_components_name:\n\t\t\tself.view_components_attributes[comp_name] = {}\n\t\t\tcomps = comp_comment.getElementsByTagName(comp_name)\n\t\t\tfor comp in comps:\n\t\t\t\t_comp = {}\n\t\t\t\tfor attr in comp.attributes:\n\t\t\t\t\tnode = attr.nodeName\n\t\t\t\t\tvalue = attr.value\n\t\t\t\t\t_comp[node] = value\n\t\t\t\tself.view_components_attributes[comp_name][_comp.id] = _comp\n\nclass Model( RapydWeb ):\n\t__components__ = __classname__ = ''\n\n\tdef __init__ (self, init):\n\t\t# due to the characteristic of javascript prototype that constructor was called\n\t\t# not only when user instantiate it but also when inheritance from it's sub classes\n\t\t# so we need make a trick to prevent constructor called by its sub class\n\t\tif init:\n\t\t\t# instance initiate code here\n\t\t\t# change inheritance from class into instance\n\t\t\tself.__proto__ = RapydWeb.prototype.__instance__['RapydWeb']\n\t\t\t# for easy access\n\t\t\tRapydWeb.prototype.__instance__['Model'] = self\n\t\t\tself.__classname__ = 'Model'\n\t\t\tself.__components__ = { }\n\n\tdef init (self, name, successor):\n\t\t'''\n\t\tinit alwasys call from its successor:\n\n\t\toriginally this scope of self was route to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t'''\n\t\tself.__components_init__( self, name, successor )\n\n\tdef beforeSend (self, f, *args):\n\t\tpass\n\n\tdef afterSend (self, f, *args):\n\t\tpass\n\n\tdef beforeSave (self, f, *args):\n\t\tpass\n\n\tdef afterSaver (self, f, *args):\n\t\tpass\n\nclass Mediator( RapydWeb ):\n\tdef __init__ (self, init):\n\t\t# due to the characteristic of javascript prototype that constructor was called\n\t\t# not only when user instantiate it but also when inheritance from it's sub classes\n\t\t# so we need make a trick to prevent constructor called by its sub class\n\t\tif init:\n\t\t\t# instance initiate code here\n\t\t\t# change inheritance from class into instance\n\t\t\tself.__proto__ = RapydWeb.prototype.__instance__['RapydWeb']\n\t\t\t# for easy access\n\t\t\tRapydWeb.prototype.__instance__['Mediator'] = self\n\t\t\tself.__classname__ = 'Mediator'\n\n\tdef test (self):\n\t\tprint 'mediator test'\n\n\tdef test2 (self):\n\t\tprint 'mediator test2'\n\n\n#################################################\n##\t\tI M P L E M E N T A T I O N\n#################################################\n# Mediators are components\n# to use it must declare in controller\nclass HeaderMediator( Mediator ):\n\tdef __init__ (self, init):\n\t\tif init:\n\t\t\t# change inheritance from class into instance\n\t\t\tself.__proto__ = RapydWeb.prototype.__instance__['Mediator']\n\t\t\tRapydWeb.prototype.__instance__['HeaderMediator'] = self\n\n\tdef catchHeader (self, header):\n\t\tpass\n\n\tdef rewriteHeader (self):\n\t\tpass\n\nclass AddressMediator( Mediator ):\n\t# fake code\n\tdef __init__ (self, init):\n\t\tif init:\n\t\t\t# change inheritance from class into instance\n\t\t\tself.__proto__ = RapydWeb.prototype.__instance__['Mediator']\n\t\t\tRapydWeb.prototype.__instance__['AddressMediator'] = self\n\n\tdef suspendRediret (self):\n\t\tpass\n\n\tdef redirectTo (self):\n\t\tpass\n\n\tdef historyNext (self):\n\t\tpass\n\n\tdef historyPrev (self):\n\t\tpass\n\n\tdef getHistories (self):\n\t\tpass\n\n\tdef onAddressChange (self):\n\t\tpass\n\n";

rapyd = new RapydWeb("init");

"\nrapyd.c = Controller( 'init' )\nrapyd.m = Model( 'init' )\nrapyd.v = View( 'init' )\nrapyd.mediator = Mediator( 'init' )\nrapyd.mediator.address = AddressMediator( 'init' )\nrapyd.mediator.header = HeaderMediator( 'init' )\n\nrapyd.c.blog = BlogController('init')\n";
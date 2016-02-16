function setattr(obj, name, value) {
    obj[name] = value;
}
function _$rapyd$_bind(fn, thisArg) {
    if (fn.bound) return fn;
    fn.bound = true;
    return function() {
        return fn.apply(thisArg, arguments);
    };
}
__author__ = "gordiaknot";

function module(f) {
    var tmp;
    tmp = eval("new f");
    return tmp;
}



function rapydMVC() {
    function class_properties(cls, props) {
        var k, v;
        if (!cls.prototype.__classproperty__) {
            console.log("set class properties:::");
            var _$rapyd$_Iter0 = dict.items(props);
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                _$rapyd$_Unpack = _$rapyd$_Iter0[_$rapyd$_Index0];
                k = _$rapyd$_Unpack[0];
                v = _$rapyd$_Unpack[1];
                setattr(cls.prototype, k, v);
                console.log(k, v);
            }
            cls.prototype.__classproperty__ = true;
        }
    }
    class_properties = module(class_properties);
    function RapydWeb(init){
        var self = this;
        this.getJamalInstance = _$rapyd$_bind(this.getJamalInstance, this);
        this.instanceinit = _$rapyd$_bind(this.instanceinit, this);
        this.start = _$rapyd$_bind(this.start, this);
        this.configure = _$rapyd$_bind(this.configure, this);
        this.log = _$rapyd$_bind(this.log, this);
        this.error = _$rapyd$_bind(this.error, this);
        this.__linkJamalProto__ = _$rapyd$_bind(this.__linkJamalProto__, this);
        this.__linkMVCMediatorProto__ = _$rapyd$_bind(this.__linkMVCMediatorProto__, this);
        this.__actionInit__ = _$rapyd$_bind(this.__actionInit__, this);
        this.__components_init__ = _$rapyd$_bind(this.__components_init__, this);
        this.actionPropStructure = _$rapyd$_bind(this.actionPropStructure, this);
        this.viewPropStructure = _$rapyd$_bind(this.viewPropStructure, this);
        this.checkActionsAvailable = _$rapyd$_bind(this.checkActionsAvailable, this);
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
            });
            self.__instance__["RapydWeb"] = self;
        }
    };
    RapydWeb.prototype.getJamalInstance = function(){
        var self = this;
        return eval(JamalInstance);
    };
    RapydWeb.prototype.instanceinit = function(){
        var self = this;
        self.__instance__["RapydWeb"] = self;
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
        console.log.apply(console, [self.log.caller.name].concat(arguments));
    };
    RapydWeb.prototype.error = function(){
        var self = this;
        console.error.apply(console, [self.error.caller.name].concat(arguments));
    };
    RapydWeb.prototype.__linkJamalProto__ = function(successor){
        var self = this;
        successor.__proto__ = eval(JamalInstance);
    };
    RapydWeb.prototype.__linkMVCMediatorProto__ = function(successor){
        var self = this;
    };
    RapydWeb.prototype.__actionInit__ = function(hyper_successor, name, sub_successor){
        var self = this;
        var action, action;
        self.checkActionsAvailable(name, sub_successor);
        if (!hyper_successor.__actions__[name]) {
            hyper_successor.__actions__[name] = {};
        }
        self.log("__actions__ = ", hyper_successor.__actions__);
        self.log("successor actions = ", sub_successor.actions);
        if (!hyper_successor.name == "View") {
            var _$rapyd$_Iter1 = sub_successor.actions;
            for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                action = _$rapyd$_Iter1[_$rapyd$_Index1];
                hyper_successor.__actions__[name][action] = self.actionPropStructure();
            }
        } else {
            var _$rapyd$_Iter2 = sub_successor.actions;
            for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                action = _$rapyd$_Iter2[_$rapyd$_Index2];
                hyper_successor.__actions__[name][action] = self.viewPropStructure();
            }
        }
    };
    RapydWeb.prototype.__components_init__ = function(hyper_successor, name, sub_successor){
        var self = this;
        if (sub_successor.components) {
            if (!hyper_successor.__components__[name]) {
                hyper_successor.__components__[name] = [];
            }
            hyper_successor.__components__[name] = sub_successor.components;
        }
    };
    RapydWeb.prototype.actionPropStructure = function(){
        var self = this;
        var r;
        r = {
            "views": [],
            "props": {}
        };
        return r;
    };
    RapydWeb.prototype.viewPropStructure = function(){
        var self = this;
        var r;
        r = {
            "views": [],
            "props": {}
        };
        return r;
    };
    RapydWeb.prototype.checkActionsAvailable = function(name, successor){
        var self = this;
        var action;
        self.log(name, successor);
        self.log(successor.actions);
        var _$rapyd$_Iter3 = successor.actions;
        for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
            action = _$rapyd$_Iter3[_$rapyd$_Index3];
            if (!successor[action]) {
                self.error("actions [{0}] not exists", action);
                return false;
            }
        }
    };
    function Controller(init){
        var self = this;
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
    Controller.prototype.init = function(name, successor){
        var self = this;
        "\n\t\t\tinit alwasys call from its successor:\n\n\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t";
        self.__components_init__(self, name, successor);
        self.__actionInit__(self, name, successor);
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
    function View(init){
        var self = this;
        this.init = _$rapyd$_bind(this.init, this);
        this.beforeRender = _$rapyd$_bind(this.beforeRender, this);
        this.afterRender = _$rapyd$_bind(this.afterRender, this);
        if (init) {
            self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];
            RapydWeb.prototype.__instance__["View"] = self;
            self.__classname__ = "View";
            self.__components__ = {};
            self.__actions__ = {};
        }
    };
    View.prototype = new RapydWeb();
    View.prototype.constructor = View;
    View.prototype.init = function(name, successor){
        var self = this;
        "\n\t\t\tinit alwasys call from its successor:\n\n\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t";
        self.__components_init__(self, name, successor);
        self.__actionInit__(self, name, successor);
    };
    View.prototype.beforeRender = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    View.prototype.afterRender = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    function Model(init){
        var self = this;
        this.init = _$rapyd$_bind(this.init, this);
        this.beforeSend = _$rapyd$_bind(this.beforeSend, this);
        this.afterSend = _$rapyd$_bind(this.afterSend, this);
        this.beforeSave = _$rapyd$_bind(this.beforeSave, this);
        this.afterSaver = _$rapyd$_bind(this.afterSaver, this);
        if (init) {
            self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];
            RapydWeb.prototype.__instance__["Model"] = self;
            self.__classname__ = "Model";
            self.__components__ = {};
        }
    };
    Model.prototype = new RapydWeb();
    Model.prototype.constructor = Model;
    Model.prototype.init = function(name, successor){
        var self = this;
        "\n\t\t\tinit alwasys call from its successor:\n\n\t\t\toriginally this scope of self was route to Controller class not instance\n\t\t\twe need to access Controller instance from its successor instead of Controller class\n\t\t\tso, we changed the iheritance from class into instance in above __init__ section\n\t\t\t";
        self.__components_init__(self, name, successor);
    };
    Model.prototype.beforeSend = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    Model.prototype.afterSend = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    Model.prototype.beforeSave = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    Model.prototype.afterSaver = function(){
        var self = this;
        var f = arguments[0];
        var args = [].slice.call(arguments, 1);
    };
    function Mediator(init){
        var self = this;
        this.test = _$rapyd$_bind(this.test, this);
        this.test2 = _$rapyd$_bind(this.test2, this);
        if (init) {
            self.__proto__ = RapydWeb.prototype.__instance__["RapydWeb"];
            RapydWeb.prototype.__instance__["Mediator"] = self;
            self.__classname__ = "Mediator";
        }
    };
    Mediator.prototype = new RapydWeb();
    Mediator.prototype.constructor = Mediator;
    Mediator.prototype.test = function(){
        var self = this;
        print;
        "mediator test";
    };
    Mediator.prototype.test2 = function(){
        var self = this;
        print;
        "mediator test2";
    };
    return {
        RapydWeb: RapydWeb,
        Controller: Controller,
        Model: Model,
        View: View,
        Mediator: Mediator
    };
}

mvcmodule = module(rapydMVC);

ctr = mvcmodule.Controller;

function BlogController() {
    ctr.prototype.constructor.apply(this, arguments);
}
BlogController.prototype = new ctr();
BlogController.prototype.constructor = BlogController;
BlogController.prototype.test = function(){
    var self = this;
};

b = new BlogController();
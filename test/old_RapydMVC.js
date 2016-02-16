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
"\nclass Template(View):\n\tdef __init__(self):\n\t\tpass\n\nclass ViewComponent(Template):\n\tdef __init__(self):\n\t\tpass\n\nclass States(ViewComponent):\n\tdef __init__(self,name,ref,**kwargs):\n\t\tself.background_color = ''\n\t\tself.background_image = ''\n\nclass Animation(object):\n\tdef __init__(self):\n\t\tpass\n\nclass Button(ViewComponent):\n\n\tdef viewCompInit(self):\n\t\tpass\n\n\tdef addButton(self,instance,group):\n\t\tpass\n\n\tdef setDefaultName(self,name):\n\t\tpass\n\nclass CustomButton(Button):\n\tdef __init__(self):\n\t\tpass\n\n\tdef clearbt(self):\n\t\tpass\n\n\tdef clear(self):\n\t\tpass\n\n\tdef action(self):\n\t\tpass\n\n";

if (0) {
    _$rapyd$_Unpack = "";
    console = _$rapyd$_Unpack[0];
    arguments = _$rapyd$_Unpack[1];
}

JamalInstance = "rapyd";

function class_properties(cls, props) {
    var k, v;
    if (!cls.prototype.__classproperty__) {
        var _$rapyd$_Iter0 = dict.items(props);
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            _$rapyd$_Unpack = _$rapyd$_Iter0[_$rapyd$_Index0];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            setattr(cls.prototype, k, v);
        }
        cls.prototype.__classproperty__ = true;
    }
}

function RapydWeb(){
    var self = this;
    this.instanceInit = _$rapyd$_bind(this.instanceInit, this);
    this.getJamalInstance = _$rapyd$_bind(this.getJamalInstance, this);
    this.init = _$rapyd$_bind(this.init, this);
    this.start = _$rapyd$_bind(this.start, this);
    this.extend = _$rapyd$_bind(this.extend, this);
    this.configure = _$rapyd$_bind(this.configure, this);
    this.log = _$rapyd$_bind(this.log, this);
    this.error = _$rapyd$_bind(this.error, this);
    this.__linkJamalProto__ = _$rapyd$_bind(this.__linkJamalProto__, this);
    this.__linkMVCMediatorProto__ = _$rapyd$_bind(this.__linkMVCMediatorProto__, this);
};
RapydWeb.prototype = new object();
RapydWeb.prototype.constructor = RapydWeb;
RapydWeb.prototype.instanceInit = function(){
    var self = this;
    self.instance = self;
};
RapydWeb.prototype.getJamalInstance = function(){
    var self = this;
    return eval(JamalInstance);
};
RapydWeb.prototype.init = function(name, successor){
    var self = this;
    self.instance[name] = successor;
};
RapydWeb.prototype.start = function(){
    var self = this;
};
RapydWeb.prototype.extend = function(){
    var self = this;
    var target, target, a, a, prop, i;
    target = [arguments[0], a = 1];
    if (len(arguments) == 1) {
        target = self;
    }
    a = 0;
    a += 1;
    for (i = a; i < len(arguments) + 1; i++) {
        prop = arguments[a];
        var _$rapyd$_Iter1 = prop;
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            i = _$rapyd$_Iter1[_$rapyd$_Index1];
            target[i] = prop[i];
        }
    }
    return target;
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

rapyd.instanceInit();

function Controller(rapyd_instance, controller_name){
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
    self.__proto__ = rapyd_instance;
    self.__actions = {};
    self.__components = {};
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
    var _$rapyd$_Iter2 = successor.actions;
    for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
        action = _$rapyd$_Iter2[_$rapyd$_Index2];
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
    var _$rapyd$_Iter3 = successor.actions;
    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
        action = _$rapyd$_Iter3[_$rapyd$_Index3];
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

function View(rapyd_instance, view_name){
    var self = this;
    this.init = _$rapyd$_bind(this.init, this);
    this.__components_init = _$rapyd$_bind(this.__components_init, this);
    this.viewPropStructure = _$rapyd$_bind(this.viewPropStructure, this);
    this.beforeRender = _$rapyd$_bind(this.beforeRender, this);
    this.afterRender = _$rapyd$_bind(this.afterRender, this);
    self.__proto__ = rapyd_instance;
    self.__actions = {};
    self.__components = {};
};
View.prototype = new RapydWeb();
View.prototype.constructor = View;
View.prototype.init = function(view_instance, name, successor){
    var self = this;
    "\n\t\tinit alwasys call from its successor:\n\n\t\tin this scope self was originally direct to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, the following code just replace successor's super instance with controller_intance in which we specified\n\t\t";
    successor.__proto__ = view_instance;
    view_instance = successor.__proto__;
    view_instance[name] = self;
    view_instance.__components_init(name, successor);
    view_instance.__actionInit(name, successor);
};
View.prototype.__components_init = function(name, successor){
    var self = this;
    if (successor.components) {
        self.__components[name] = successor.components;
    }
};
View.prototype.viewPropStructure = function(){
    var self = this;
    var r;
    r = {
        "views": [],
        "props": {}
    };
    return r;
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

function Model(rapyd_instance, model_name){
    var self = this;
    this.init = _$rapyd$_bind(this.init, this);
    this.__components_init = _$rapyd$_bind(this.__components_init, this);
    this.beforeSend = _$rapyd$_bind(this.beforeSend, this);
    this.afterSend = _$rapyd$_bind(this.afterSend, this);
    this.beforeSave = _$rapyd$_bind(this.beforeSave, this);
    this.afterSaver = _$rapyd$_bind(this.afterSaver, this);
    self.__proto__ = rapyd_instance;
    self.__actions = {};
    self.__components = {};
};
Model.prototype = new RapydWeb();
Model.prototype.constructor = Model;
Model.prototype.init = function(model_instance, name, successor){
    var self = this;
    "\n\t\tinit alwasys call from its successor:\n\n\t\tin this scope self was originally direct to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, the following code just replace successor's super instance with controller_intance in which we specified\n\t\t";
    successor.__proto__ = model_instance;
    model_instance = successor.__proto__;
    model_instance[name] = self;
    model_instance.__components_init(name, successor);
    model_instance.__actionInit(name, successor);
};
Model.prototype.__components_init = function(name, successor){
    var self = this;
    if (successor.components) {
        self.__components[name] = successor.components;
    }
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

function Mediator(rapyd_instance, name){
    var self = this;
    this.init = _$rapyd$_bind(this.init, this);
    this.test = _$rapyd$_bind(this.test, this);
    this.test2 = _$rapyd$_bind(this.test2, this);
    self.__proto__ = rapyd_instance;
    self.__actions = {};
    self.__components = {};
};
Mediator.prototype = new RapydWeb();
Mediator.prototype.constructor = Mediator;
Mediator.prototype.init = function(mediator_instance, name, successor){
    var self = this;
    "\n\t\tinit alwasys call from its successor:\n\n\t\tin this scope self was originally direct to Controller class not instance\n\t\twe need to access Controller instance from its successor instead of Controller class\n\t\tso, the following code just replace successor's super instance with controller_intance in which we specified\n\t\t";
    successor.__proto__ = mediator_instance;
    mediator_instance = successor.__proto__;
    mediator_instance[name] = self;
};
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

function AddressMediator(mediator_instance, name){
    var self = this;
    this.suspendRediret = _$rapyd$_bind(this.suspendRediret, this);
    this.redirectTo = _$rapyd$_bind(this.redirectTo, this);
    this.historyNext = _$rapyd$_bind(this.historyNext, this);
    this.historyPrev = _$rapyd$_bind(this.historyPrev, this);
    this.getHistories = _$rapyd$_bind(this.getHistories, this);
    this.onAddressChange = _$rapyd$_bind(this.onAddressChange, this);
    self.init(mediator_instance, name, self);
};
AddressMediator.prototype = new Mediator();
AddressMediator.prototype.constructor = AddressMediator;
AddressMediator.prototype.suspendRediret = function(){
    var self = this;
};
AddressMediator.prototype.redirectTo = function(){
    var self = this;
};
AddressMediator.prototype.historyNext = function(){
    var self = this;
};
AddressMediator.prototype.historyPrev = function(){
    var self = this;
};
AddressMediator.prototype.getHistories = function(){
    var self = this;
};
AddressMediator.prototype.onAddressChange = function(){
    var self = this;
};

function core_start() {
}

rapyd.c = new Controller(rapyd, "c");

rapyd.m = new Model(rapyd, "m");

rapyd.v = new View(rapyd, "v");

rapyd.mediator = new Mediator(rapyd, "mediator");

rapyd.mediator.address = new AddressMediator(rapyd.mediator, "address");

function HeaderMediator(mediator_instance, name){
    var self = this;
    this.catchHeader = _$rapyd$_bind(this.catchHeader, this);
    this.rewriteHeader = _$rapyd$_bind(this.rewriteHeader, this);
    self.init(mediator_instance, name, self);
};
HeaderMediator.prototype = new Mediator();
HeaderMediator.prototype.constructor = HeaderMediator;
HeaderMediator.prototype.catchHeader = function(header){
    var self = this;
};
HeaderMediator.prototype.rewriteHeader = function(){
    var self = this;
};

function ViewMediator() {
    Mediator.prototype.constructor.apply(this, arguments);
}
ViewMediator.prototype = new Mediator();
ViewMediator.prototype.constructor = ViewMediator;
ViewMediator.prototype.viewName_to_ControllerActionName = function(){
    var self = this;
    "\n\t\t bind view to controller action\n\t\t";
};

function BlogController(controller_instance, blog_name){
    var self = this;
    this.index = _$rapyd$_bind(this.index, this);
    this.viewArticles = _$rapyd$_bind(this.viewArticles, this);
    this.viewByTags = _$rapyd$_bind(this.viewByTags, this);
    self.actions = [ "index", "viewArticles", "viewByTags" ];
    self.components = [ "modalbox" ];
    self.init(controller_instance, blog_name, self);
};
BlogController.prototype = new Controller();
BlogController.prototype.constructor = BlogController;
BlogController.prototype.index = function(){
    var self = this;
};
BlogController.prototype.viewArticles = function(){
    var self = this;
};
BlogController.prototype.viewByTags = function(){
    var self = this;
};

function VoclistController(controller_instance, name){
    var self = this;
    this.vocIndex = _$rapyd$_bind(this.vocIndex, this);
    this.vocSentence = _$rapyd$_bind(this.vocSentence, this);
    this.vocHome = _$rapyd$_bind(this.vocHome, this);
    self.actions = [ "vocHome", "vocSentence", "vocIndex" ];
    self.components = [ "modalbox" ];
    self.init(controller_instance, name, self);
};
VoclistController.prototype = new Controller();
VoclistController.prototype.constructor = VoclistController;
VoclistController.prototype.vocIndex = function(){
    var self = this;
};
VoclistController.prototype.vocSentence = function(){
    var self = this;
};
VoclistController.prototype.vocHome = function(){
    var self = this;
};

rapyd.c.blog = new BlogController(rapyd.c, "blog");

rapyd.c.voclist = new VoclistController(rapyd.c, "voclist");
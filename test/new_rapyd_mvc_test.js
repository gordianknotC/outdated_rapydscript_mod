



























    baselib = require("gordianknot/baselib.js");	//DEFPRINT(AST_SimpleStatement 20
    baselib.importALL(baselib, global);	//DEFPRINT(AST_SimpleStatement 21
    console_mode("node-monkey", "once");	//DEFPRINT(AST_SimpleStatement 22


var RapydWeb = Callable(function RapydWeb_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof init == "object") {
        self.__instance__[init.__name__] = init;	//DEFPRINT(AST_SimpleStatement 35
    }
    self.__instance__["RapydWeb"] = self;	//DEFPRINT(AST_SimpleStatement 38
});	//class_fun_def A 26
RapydWeb.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.m = [];	//DEFPRINT(AST_SimpleStatement 41
    self.v = [];	//DEFPRINT(AST_SimpleStatement 42
    self.c = [];	//DEFPRINT(AST_SimpleStatement 43
    self.action = self.debug_level = "";	//DEFPRINT(AST_SimpleStatement 44
    self.components = [];	//DEFPRINT(AST_SimpleStatement 45
    self.config = [];	//DEFPRINT(AST_SimpleStatement 46
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 47
};	//class_fun_def A 26
RapydWeb.prototype.debug = function debug(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c[DEBUG][" + self.debug.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 50
    color = "background: #222; color: #bada55";	//DEFPRINT(AST_SimpleStatement 51
    args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 52
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 53
    console.debug.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 55
};	//class_fun_def A 26
RapydWeb.prototype.log = function log(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name;	//complex body AST_Scope declare var as local
    if (self.log.caller) {
        name = "[" + self.log.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 59
        args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 60
    }
    console.log.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 61
};	//class_fun_def A 26
RapydWeb.prototype.error = function error(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name;	//complex body AST_Scope declare var as local
    name = "[ERROR][" + self.error.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 67
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 68
    console.error.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 69
};	//class_fun_def A 26
RapydWeb.prototype.info = function info(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c[INFO][" + self.info.caller.name + "]";	//DEFPRINT(AST_SimpleStatement 72
    color = "background: #667; color: #fff";	//DEFPRINT(AST_SimpleStatement 73
    args.insert(0, color);	//DEFPRINT(AST_SimpleStatement 74
    args.insert(0, name);	//DEFPRINT(AST_SimpleStatement 75
    console.info.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 76
};	//class_fun_def A 26
RapydWeb.prototype.inheritFromInstance = function inheritFromInstance(cls, instance){
    var self = this;	// complex body AST_Defun
    var instance_class_name, super_class, super_class_name, proto;	//complex body AST_Scope declare var as local
    instance_class_name = instance.__name__;	//DEFPRINT(AST_SimpleStatement 79
    super_class = super_(cls, instance);	//DEFPRINT(AST_SimpleStatement 80
    super_class_name = super_class.__name__;	//DEFPRINT(AST_SimpleStatement 81
    proto = instance.__superlevel__;	//DEFPRINT(AST_SimpleStatement 82
    eval('self.__instance__["{0}"]{1} = self.__instance__["{2}"]'.format(instance_class_name, proto, super_class_name));	//DEFPRINT(AST_SimpleStatement 83
};	//class_fun_def A 26
RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    var action, action;	//complex body AST_Scope declare var as local
    self.checkActionsAvailable(name, sub_successor);	//DEFPRINT(AST_SimpleStatement 87
    if (!hyper_successor.__actions__[name]) {
        hyper_successor.__actions__[name] = {};	//DEFPRINT(AST_SimpleStatement 88
    }
    self.log("__actions__ = ", hyper_successor.__actions__);	//DEFPRINT(AST_SimpleStatement 89
    self.log("successor actions = ", sub_successor.actions);	//DEFPRINT(AST_SimpleStatement 90
    if (!(hyper_successor.name == "View")) {
        var _$iter0 = sub_successor.actions;
        for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
            action = _$iter0[_$id0];
            hyper_successor.__actions__[name][action] = self.actionPropStructure();	//DEFPRINT(AST_SimpleStatement 94
        }
    } else {
        var _$iter1 = sub_successor.actions;
        for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
            action = _$iter1[_$id1];
            hyper_successor.__actions__[name][action] = self.viewPropStructure();	//DEFPRINT(AST_SimpleStatement 97
        }
    }
};	//class_fun_def A 26
RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
    var self = this;	// complex body AST_Defun
    if (sub_successor.components) {
        if (!hyper_successor.__components__[name]) {
            hyper_successor.__components__[name] = [];	//DEFPRINT(AST_SimpleStatement 102
        }
        hyper_successor.__components__[name] = sub_successor.components;	//DEFPRINT(AST_SimpleStatement 103
    }
};	//class_fun_def A 26
RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 106
    return r;	//AST_Exit.DEFMETHOD( 107
};	//class_fun_def A 26
RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
    var self = this;	// complex body AST_Defun
    var r;	//complex body AST_Scope declare var as local
    r = {
        "views": [],
        "props": {}
    };	//DEFPRINT(AST_SimpleStatement 110
    return r;	//AST_Exit.DEFMETHOD( 111
};	//class_fun_def A 26
RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
    var self = this;	// complex body AST_Defun
    var action;	//complex body AST_Scope declare var as local
    self.log(name, successor);	//DEFPRINT(AST_SimpleStatement 114
    self.log(successor.actions);	//DEFPRINT(AST_SimpleStatement 115
    var _$iter2 = successor.actions;
    for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
        action = _$iter2[_$id2];
        if (!successor[action]) {
            self.error("[error] actions [{0}] not exists", action);	//DEFPRINT(AST_SimpleStatement 118
            return false;	//AST_Exit.DEFMETHOD( 119
        }
    }
};	//class_fun_def A 26
RapydWeb = __defineClassProperties__(RapydWeb);

var Controller = Callable(function Controller_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    var successor;	//complex body AST_Scope declare var as local
    if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 136
        console.log("component and action init:: self = ", self, "name = ", name, "sucessor = ", successor);	//DEFPRINT(AST_SimpleStatement 137
        super_(Controller, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 138
        super_(Controller, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 139
    }
    super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 143
});	//class_fun_def A 121
Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 121
Controller.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 124
    self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 125
};	//class_fun_def A 121
Controller.prototype.__getattr__ = function __getattr__(item){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 149
    item;	//DEFPRINT(AST_SimpleStatement 149
};	//class_fun_def A 121
Controller.prototype.__get__ = function __get__(instance, owner){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 152
    [instance, owner];	//DEFPRINT(AST_SimpleStatement 152
};	//class_fun_def A 121
Controller.prototype.__beforAction = function __beforAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.beforeAction(f, args);	//DEFPRINT(AST_SimpleStatement 155
};	//class_fun_def A 121
Controller.prototype.beforeAction = function beforeAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 121
Controller.prototype.afterAction = function afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 121
Controller.prototype.__afterAction = function __afterAction(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
    self.__startRender(f, args);	//DEFPRINT(AST_SimpleStatement 164
};	//class_fun_def A 121
Controller.prototype.__startRender = function __startRender(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 121
Controller = __defineClassProperties__(Controller);

var BlogController = Callable(function BlogController_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    super_(Controller, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 174
    self.actions = [ "index", "viewArticles", "viewByTags" ];	//DEFPRINT(AST_SimpleStatement 180
    self.components = [ "modalbox" ];	//DEFPRINT(AST_SimpleStatement 181
    super_(BlogController, self).__init__(self, "BlogController");	//DEFPRINT(AST_SimpleStatement 182
});	//class_fun_def A 169
BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 169
BlogController = __defineClassProperties__(BlogController);

var View = Callable(function View_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var successor;	//complex body AST_Scope declare var as local
    if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 192
        super_(View, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 193
        super_(View, self).__actionInit__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 194
    }
    super_(View, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 196
});	//class_fun_def A 184
View.prototype = new RapydWeb("__inheritance__", View);	//class_fun_def C 184
View.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 187
    self.__actions__ = {};	//DEFPRINT(AST_SimpleStatement 188
};	//class_fun_def A 184
View.prototype.beforeRender = function beforeRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 184
View.prototype.afterRender = function afterRender(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 184
View.prototype.mapToHtml = function mapToHtml(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 184
View.prototype.getComponentComment = function getComponentComment(){
    var self = this;	// complex body AST_Defun
    var comp_comment, comps, _comp, node, value, attr, comp, comp_name;	//complex body AST_Scope declare var as local
    comp_comment = jQuery("body").comments()[0];	//DEFPRINT(AST_SimpleStatement 215
    var _$iter3 = self.view_components_name;
    for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
        comp_name = _$iter3[_$id3];
        self.view_components_attributes[comp_name] = {};	//DEFPRINT(AST_SimpleStatement 217
        comps = comp_comment.getElementsByTagName(comp_name);	//DEFPRINT(AST_SimpleStatement 218
        var _$iter4 = comps;
        for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
            comp = _$iter4[_$id4];
            _comp = {};	//DEFPRINT(AST_SimpleStatement 220
            var _$iter5 = comp.attributes;
            for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
                attr = _$iter5[_$id5];
                node = attr.nodeName;	//DEFPRINT(AST_SimpleStatement 222
                value = attr.value;	//DEFPRINT(AST_SimpleStatement 223
                _comp[node] = value;	//DEFPRINT(AST_SimpleStatement 224
            }
            self.view_components_attributes[comp_name][_comp.id] = _comp;	//DEFPRINT(AST_SimpleStatement 225
        }
    }
};	//class_fun_def A 184
View = __defineClassProperties__(View);

var Model = Callable(function Model_(init, name){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof name === "undefined") name = null;
    var successor;	//complex body AST_Scope declare var as local
    if (typeof init == "object") {
        successor = init;	//DEFPRINT(AST_SimpleStatement 234
        super_(Model, self).__components_init__(self, name, successor);	//DEFPRINT(AST_SimpleStatement 235
    }
    super_(Model, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 238
});	//class_fun_def A 227
Model.prototype = new RapydWeb("__inheritance__", Model);	//class_fun_def C 227
Model.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__components__ = {};	//DEFPRINT(AST_SimpleStatement 230
};	//class_fun_def A 227
Model.prototype.beforeSend = function beforeSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 227
Model.prototype.afterSend = function afterSend(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 227
Model.prototype.beforeSave = function beforeSave(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 227
Model.prototype.afterSaver = function afterSaver(){
    var self = this;	// complex body AST_Defun
    var f = arguments[0];
    var args = [].slice.call(arguments, 1);
};	//class_fun_def A 227
Model = __defineClassProperties__(Model);

var Mediator = Callable(function Mediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 264
    }
});	//class_fun_def A 256
Mediator.prototype = new RapydWeb("__inheritance__", Mediator);	//class_fun_def C 256
Mediator.prototype.test = function test(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 271
    "mediator test";	//DEFPRINT(AST_SimpleStatement 271
};	//class_fun_def A 256
Mediator.prototype.test2 = function test2(){
    var self = this;	// complex body AST_Defun
    print;	//DEFPRINT(AST_SimpleStatement 274
    "mediator test2";	//DEFPRINT(AST_SimpleStatement 274
};	//class_fun_def A 256
Mediator = __defineClassProperties__(Mediator);

var HeaderMediator = Callable(function HeaderMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 286
    }
});	//class_fun_def A 282
HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);	//class_fun_def C 282
HeaderMediator.prototype.catchHeader = function catchHeader(header){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 282
HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 282
HeaderMediator = __defineClassProperties__(HeaderMediator);

var AddressMediator = Callable(function AddressMediator_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (init) {
        super_(Mediator, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 301
    }
});	//class_fun_def A 297
AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);	//class_fun_def C 297
AddressMediator.prototype.suspendRediret = function suspendRediret(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator.prototype.redirectTo = function redirectTo(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator.prototype.historyNext = function historyNext(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator.prototype.historyPrev = function historyPrev(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator.prototype.getHistories = function getHistories(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator.prototype.onAddressChange = function onAddressChange(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 297
AddressMediator = __defineClassProperties__(AddressMediator);

"\n\nrapyd = RapydWeb('init')\nrapyd.c = Controller( 'init' )\nrapyd.c = Controller('init')\nrapyd.c.blog = BlogController('init')\n\nrapyd.m = Model( 'init' )\nrapyd.v = View( 'init' )\nrapyd.mediator = Mediator( 'init' )\nrapyd.mediator.address = AddressMediator( 'init' )\nrapyd.mediator.header = HeaderMediator( 'init' )\n";	//DEFPRINT(AST_SimpleStatement 325

var CssStyle = Callable(function CssStyle_(targets){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.targets = targets;	//DEFPRINT(AST_SimpleStatement 329
});	//class_fun_def A 327
CssStyle.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];	//DEFPRINT(AST_SimpleStatement 332
    self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];	//DEFPRINT(AST_SimpleStatement 334
    self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];	//DEFPRINT(AST_SimpleStatement 335
    self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];	//DEFPRINT(AST_SimpleStatement 337
    self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];	//DEFPRINT(AST_SimpleStatement 338
};	//class_fun_def A 327
CssStyle.prototype.setStyle = function setStyle(k, v){
    var self = this;	// complex body AST_Defun
    var target;	//complex body AST_Scope declare var as local
    var _$iter6 = self.targets;
    for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
        target = _$iter6[_$id6];
        target.style[k] = v;	//DEFPRINT(AST_SimpleStatement 344
    }
};	//class_fun_def A 327
CssStyle.prototype.parseStyle = function parseStyle(styles){
    var self = this;	// complex body AST_Defun
    var k, v, pos_arr, x, y, x, y, z, w, h, style;	//complex body AST_Scope declare var as local
    styles = styles.split(";").slice(0, -1);	//DEFPRINT(AST_SimpleStatement 347
    var _$iter7 = styles;
    for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
        style = _$iter7[_$id7];
        k = style.split(":")[0].strip();	//DEFPRINT(AST_SimpleStatement 349
        v = style.split(":")[1].strip();	//DEFPRINT(AST_SimpleStatement 350
        if (_$in_(k, self.HTML_POSITIONING_FAMILY)) {
            if (k == "pos") {
                pos_arr = v.split(",");	//DEFPRINT(AST_SimpleStatement 353
                if (len(pos_arr) == 2) {
                    _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 355
                    x = _$Unpack[0];
                    y = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 355
                } else if (len(pos_arr) == 3) {
                    _$Unpack = pos_arr;	//DEFPRINT(AST_Assign 357
                    x = _$Unpack[0];
                    y = _$Unpack[1];
                    z = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 357
                    self.setStyle("z-index", z);	//DEFPRINT(AST_SimpleStatement 358
                } else {
                    throw "Invalid pos format: {0}".format(style);	//AST_Exit.DEFMETHOD( 360
                }
                self.setStyle("left", x);	//DEFPRINT(AST_SimpleStatement 362
                self.setStyle("top", y);	//DEFPRINT(AST_SimpleStatement 363
            } else if (k == "pos_hint") {
            }
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 367
        } else if (_$in_(k, self.HTML_BACKGROUND_FAMILY)) {
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 369
        } else if (_$in_(k, self.HTML_APPEARANCE_FAMILY)) {
            if (k == "size") {
                _$Unpack = v.split(",");	//DEFPRINT(AST_Assign 372
                w = _$Unpack[0];
                h = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 372
                self.setStyle("width", w);	//DEFPRINT(AST_SimpleStatement 373
                self.setStyle("height", h);	//DEFPRINT(AST_SimpleStatement 374
            } else if (k == "size_hint") {
            }
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 378
        } else if (_$in_(k, self.HTML_BORDER_FAMILY)) {
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 380
        } else if (_$in_(k, self.HTML_TEXT_FAMILY)) {
            console.log(k, v);	//DEFPRINT(AST_SimpleStatement 382
        } else {
            throw "Invalid or unsupported Style tag: {0}".format(k);	//AST_Exit.DEFMETHOD( 384
        }
        self.setStyle(k, v);	//DEFPRINT(AST_SimpleStatement 386
    }
};	//class_fun_def A 327
CssStyle = __defineClassProperties__(CssStyle);

var ViewComponent = Callable(function ViewComponent_(init, comp_code){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.setAsWatchObject(self, "test", "test value");	//DEFPRINT(AST_SimpleStatement 399
    self.setAsWatchObject(self, "test2", "set_from_callback value");	//DEFPRINT(AST_SimpleStatement 400
    if (init == "customcomp") {
        self.css = {};	//DEFPRINT(AST_SimpleStatement 402
        self.component_tags = [];	//DEFPRINT(AST_SimpleStatement 403
        self.parseCustomComponents();	//DEFPRINT(AST_SimpleStatement 404
        self.setCompFromHtmlCommentTags(comp_code);	//DEFPRINT(AST_SimpleStatement 405
    }
});	//class_fun_def A 388
ViewComponent.prototype = new View("__inheritance__", ViewComponent);	//class_fun_def C 388
ViewComponent.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY;	//DEFPRINT(AST_SimpleStatement 391
    self.HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY;	//DEFPRINT(AST_SimpleStatement 392
    self.HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY;	//DEFPRINT(AST_SimpleStatement 393
    self.HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY;	//DEFPRINT(AST_SimpleStatement 394
    self.HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY;	//DEFPRINT(AST_SimpleStatement 395
    self.__rapyd_comps__ = [];	//DEFPRINT(AST_SimpleStatement 396
};	//class_fun_def A 388
ViewComponent.prototype.setAsWatchObject = function setAsWatchObject(attr, value, mode){
    var self = this;	// complex body AST_Defun
    var obj;	//complex body AST_Scope declare var as local
    obj = {
        "value": value,
        "onChange": [],
        "mode": mode
    };	//DEFPRINT(AST_SimpleStatement 411
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 412
    function setter_callback(instance, attr) {
        function wrapper(_value) {
            instance.onChange(attr, _value);	//DEFPRINT(AST_SimpleStatement 416
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 417
    }
    function getter_callback(instance, attr) {
        function wrapper(_value) {
            return instance.get(attr);	//AST_Exit.DEFMETHOD( 421
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 422
    }
    self.__defineSetter__(attr, setter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 424
    self.__defineGetter__(attr, getter_callback(self, attr));	//DEFPRINT(AST_SimpleStatement 425
    return obj;	//AST_Exit.DEFMETHOD( 426
};	//class_fun_def A 388
ViewComponent.prototype.isWatchObject = function isWatchObject(value){
    var self = this;	// complex body AST_Defun
    var value_in_dict, onchange_in_dict;	//complex body AST_Scope declare var as local
    if (typeof value == "object") {
        value_in_dict = _$in_("value", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 429
        onchange_in_dict = _$in_("onChange", dict.keys(value));	//DEFPRINT(AST_SimpleStatement 430
        self.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);	//DEFPRINT(AST_SimpleStatement 431
        return value_in_dict || onchange_in_dict;	//AST_Exit.DEFMETHOD( 433
    } else {
        return false;	//AST_Exit.DEFMETHOD( 434
    }
};	//class_fun_def A 388
ViewComponent.prototype.set = function set(attr, value){
    var self = this;	// complex body AST_Defun
    self["_" + attr] = value;	//DEFPRINT(AST_SimpleStatement 437
};	//class_fun_def A 388
ViewComponent.prototype.get = function get(attr){
    var self = this;	// complex body AST_Defun
    return self["_" + attr];	//AST_Exit.DEFMETHOD( 440
};	//class_fun_def A 388
ViewComponent.prototype.onChange = function onChange(attr, value){
    var self = this;	// complex body AST_Defun
    var original_value, on_change_register_list, mode, state, state_data, state_conditions, _dict, target, target_attr, obj;	//complex body AST_Scope declare var as local
    original_value = self.get(attr);	//DEFPRINT(AST_SimpleStatement 442
    self.info(" origianal value = ", original_value);	//DEFPRINT(AST_SimpleStatement 443
    if (!self.isWatchObject(original_value)) {
        throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';	//AST_Exit.DEFMETHOD( 445
    }
    on_change_register_list = original_value.onChange;	//DEFPRINT(AST_SimpleStatement 447
    mode = original_value.mode;	//DEFPRINT(AST_SimpleStatement 448
    if (mode == "states") {
        state = self.States.getStateByName(value);	//DEFPRINT(AST_SimpleStatement 451
        state_data = state.data;	//DEFPRINT(AST_SimpleStatement 452
        state.processSetAttr();	//DEFPRINT(AST_SimpleStatement 453
        state.processAnime();	//DEFPRINT(AST_SimpleStatement 454
        state_conditions = state_data.conditions;	//DEFPRINT(AST_SimpleStatement 455
        var _$iter8 = state_conditions;
        for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
            _dict = _$iter8[_$id8];
            self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 457
        }
        return;	//AST_Exit.DEFMETHOD( 458
    } else if (mode == "visual_component") {
        self.VisuelElements[attr](value);	//DEFPRINT(AST_SimpleStatement 461
        return;	//AST_Exit.DEFMETHOD( 462
    }
    var _$iter9 = on_change_register_list;
    for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
        _dict = _$iter9[_$id9];
        if (_$in_("condition", dict.keys(_dict))) {
            self.info("[set onchange list] set var with condition, attr = ", attr);	//DEFPRINT(AST_SimpleStatement 467
            self.processOnchangeConditions(_dict);	//DEFPRINT(AST_SimpleStatement 468
        } else {
            self.info("[set onchange list] set var, attr = ", attr, "value = ", value);	//DEFPRINT(AST_SimpleStatement 470
            target = _dict["target"];	//DEFPRINT(AST_SimpleStatement 471
            target_attr = _dict["attr"];	//DEFPRINT(AST_SimpleStatement 472
            target.set(target_attr, value);	//DEFPRINT(AST_SimpleStatement 473
        }
    }
    self.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);	//DEFPRINT(AST_SimpleStatement 476
    obj = self.get(attr);	//DEFPRINT(AST_SimpleStatement 478
    obj.value = value;	//DEFPRINT(AST_SimpleStatement 479
    self.set(attr, obj);	//DEFPRINT(AST_SimpleStatement 480
};	//class_fun_def A 388
ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con){
    var self = this;	// complex body AST_Defun
    var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;	//complex body AST_Scope declare var as local
    "\n\t\trapydscript if elif else clause structure::\n\t\t{'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t'elif_clause': [{\n\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t'if_clause':\n\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\tpython if else clause structure\n\t\t{'if_setter'\t: \"'pressed'\",\n\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t'else_setter'\t: \"'abc'\",\n\t\t'if_setted'\t\t: _state.name})";	//DEFPRINT(AST_Directive 482
    function get_condition(con_lst) {
        var prop_a, operator, prop_b, condition;	//complex body AST_Scope declare var as local
        _$Unpack = con_lst;	//DEFPRINT(AST_Assign 484
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 484
        condition = prop_a + operator + prop_b;	//DEFPRINT(AST_SimpleStatement 485
        return eval(condition);	//AST_Exit.DEFMETHOD( 486
    }
    if (con.if_clause) {
        var _$iter10 = dict.keys(con);
        for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
            key = _$iter10[_$id10];
            current = con[key];	//DEFPRINT(AST_SimpleStatement 490
            _condition = current["condition"];	//DEFPRINT(AST_SimpleStatement 491
            _pass = current["pass"];	//DEFPRINT(AST_SimpleStatement 492
            condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 493
            if (condition || !isEmpty(_condition)) {
                if (!_pass) {
                    setted = current["setted"];	//DEFPRINT(AST_SimpleStatement 499
                    setter = current["setter"];	//DEFPRINT(AST_SimpleStatement 500
                    if (self.isWatchObject(setter)) {
                        v = setter.value;	//DEFPRINT(AST_SimpleStatement 502
                    } else {
                        v = setter;	//DEFPRINT(AST_SimpleStatement 504
                    }
                    if (self.isWatchObject(setted)) {
                        setted.value = v;	//DEFPRINT(AST_SimpleStatement 506
                    } else {
                        throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 508
                    }
                    continue;
                } else {
                    continue;
                }
            }
        }
    } else if (con.if_con) {
        _condition = con["if_con"];	//DEFPRINT(AST_SimpleStatement 514
        setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 515
        condition = get_condition(_condition);	//DEFPRINT(AST_SimpleStatement 516
        if (condition) {
            setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 518
        } else {
            setter = con["else_setter"];	//DEFPRINT(AST_SimpleStatement 520
        }
        if (self.isWatchObject(setter)) {
            v = setter.value;	//DEFPRINT(AST_SimpleStatement 522
        } else {
            v = setter;	//DEFPRINT(AST_SimpleStatement 524
        }
        if (self.isWatchObject(setted)) {
            setted.value = v;	//DEFPRINT(AST_SimpleStatement 526
        } else {
            throw "setted must be a referenced watch object not a" + typeof setted;	//AST_Exit.DEFMETHOD( 528
        }
    }
};	//class_fun_def A 388
ViewComponent.prototype.registCondition = function registCondition(register){
    var self = this;	// complex body AST_Defun
    var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;	//complex body AST_Scope declare var as local
    con = register.rapyd || register.python;	//DEFPRINT(AST_SimpleStatement 530
    pattern = new RegExp("([w]+[.][w]+)");	//DEFPRINT(AST_SimpleStatement 532
    if (con.if_clause) {
        _con = con.if_clause.condition;	//DEFPRINT(AST_SimpleStatement 536
        _$Unpack = _con;	//DEFPRINT(AST_Assign 537
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 537
        if (!con.if_clause["pass"]) {
            setted = con["setted"];	//DEFPRINT(AST_SimpleStatement 540
            setter = con["setter"];	//DEFPRINT(AST_SimpleStatement 541
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 543
        }
        if (prop_a.match(pattern)) {
            prop_a.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 545
        }
        if (prop_b.match(pattern)) {
            prop_b.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 547
        }
        return;	//AST_Exit.DEFMETHOD( 549
    } else {
        _con = con.if_con;	//DEFPRINT(AST_SimpleStatement 553
        _$Unpack = _con;	//DEFPRINT(AST_Assign 554
        prop_a = _$Unpack[0];
        operator = _$Unpack[1];
        prop_b = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 554
        if (!con["pass"]) {
            setted = con["if_setted"];	//DEFPRINT(AST_SimpleStatement 556
            setter = con["if_setter"];	//DEFPRINT(AST_SimpleStatement 557
        } else {
            setted = setter = "";	//DEFPRINT(AST_SimpleStatement 559
        }
        if (_$in_("self.", prop_a)) {
            prop_a.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 560
        }
        if (_$in_("self.", prop_b)) {
            prop_b.onChange.append({
                "condition": con,
                "setted": setted,
                "setter": setter
            });	//DEFPRINT(AST_SimpleStatement 561
        }
    }
};	//class_fun_def A 388
ViewComponent.prototype.setattr = function setattr(attr, value){
    var self = this;	// complex body AST_Defun
    if (typeof attr == "string") {
        if (self.isIfStatement(value)) {
            self.registCondition(value);	//DEFPRINT(AST_SimpleStatement 567
        }
        if (self.isWatchObject(value)) {
            value.onChange.append({
                "target": self,
                "attr": attr
            });	//DEFPRINT(AST_SimpleStatement 569
        } else {
            self.set(attr, value);	//DEFPRINT(AST_SimpleStatement 571
        }
    } else {
        throw "Invalid attribute type! attribute must be a string type";	//AST_Exit.DEFMETHOD( 573
    }
};	//class_fun_def A 388
ViewComponent.prototype.isIfStatement = function isIfStatement(value){
    var self = this;	// complex body AST_Defun
    var condition, _if, key;	//complex body AST_Scope declare var as local
    if (typeof value == "object") {
        condition = value["python"] || value["rapyd"];	//DEFPRINT(AST_SimpleStatement 576
        if (!condition) {
            return false;	//AST_Exit.DEFMETHOD( 577
        }
        if (typeof condition == "object") {
            _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];	//DEFPRINT(AST_SimpleStatement 579
            var _$iter11 = dict.keys(condition);
            for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
                key = _$iter11[_$id11];
                if (_$in_(key, _if)) {
                    return true;	//AST_Exit.DEFMETHOD( 582
                }
            }
        }
    }
    return false;	//AST_Exit.DEFMETHOD( 583
};	//class_fun_def A 388
ViewComponent.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 589
};	//class_fun_def A 388
ViewComponent.prototype.setCondition = function setCondition(attr, condition){
    var self = this;	// complex body AST_Defun
    self.conditionData[attr] = condition;	//DEFPRINT(AST_SimpleStatement 591
};	//class_fun_def A 388
ViewComponent.prototype.componentInitialize = function componentInitialize(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 388
ViewComponent.prototype.setState = function setState(square){
    var self = this;	// complex body AST_Defun
    function wrapper() {
        square.state = self.state;	//DEFPRINT(AST_SimpleStatement 596
        if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
            square.x = self.x;	//DEFPRINT(AST_SimpleStatement 598
            square.y = self.y;	//DEFPRINT(AST_SimpleStatement 599
        }
    }
    return wrapper;	//AST_Exit.DEFMETHOD( 600
};	//class_fun_def A 388
ViewComponent.prototype._setComponentStates = function _setComponentStates(states_instance){
    var self = this;	// complex body AST_Defun
    self.States = states_instance;	//DEFPRINT(AST_SimpleStatement 602
};	//class_fun_def A 388
ViewComponent.prototype.getCompById = function getCompById(id_name, attr){
    var self = this;	// complex body AST_Defun
    function getcomp_id_wrapper() {
        return [id_name, attr];	//AST_Exit.DEFMETHOD( 606
    }
    return getcomp_id_wrapper;	//AST_Exit.DEFMETHOD( 607
};	//class_fun_def A 388
ViewComponent.prototype.bindToHtmlTag = function bindToHtmlTag(tag_dom){
    var self = this;	// complex body AST_Defun
    self.html_target = tag_dom;	//DEFPRINT(AST_SimpleStatement 611
};	//class_fun_def A 388
ViewComponent.prototype.setInstanceName = function setInstanceName(n){
    var self = this;	// complex body AST_Defun
    self.instance_name = n;	//DEFPRINT(AST_SimpleStatement 613
};	//class_fun_def A 388
ViewComponent.prototype.onStateChanged = function onStateChanged(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlId = function setHtmlId(tag_name, id){
    var self = this;	// complex body AST_Defun
    var css_selector;	//complex body AST_Scope declare var as local
    css_selector = tag_name + "#" + id;	//DEFPRINT(AST_SimpleStatement 625
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlState = function setHtmlState(state_name){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlGroup = function setHtmlGroup(group_name){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlRenderFrom = function setHtmlRenderFrom(str_id){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlStyle = function setHtmlStyle(styles){
    var self = this;	// complex body AST_Defun
    var style;	//complex body AST_Scope declare var as local
    style = styles.split(";");	//DEFPRINT(AST_SimpleStatement 634
};	//class_fun_def A 388
ViewComponent.prototype.addRapydComp = function addRapydComp(fn){
    var self = this;	// complex body AST_Defun
    self.__rapyd_comps__.append(fn);	//DEFPRINT(AST_SimpleStatement 636
};	//class_fun_def A 388
ViewComponent.prototype.setHtmlAttribute = function setHtmlAttribute(dom){
    var self = this;	// complex body AST_Defun
    var tag_name, data, instance, jq_target, instance, jq_target, k, v;	//complex body AST_Scope declare var as local
    tag_name = dom["tag_name"];	//DEFPRINT(AST_SimpleStatement 638
    data = dom["data"];	//DEFPRINT(AST_SimpleStatement 639
    instance = jq_target = "";	//DEFPRINT(AST_SimpleStatement 640
    var _$iter12 = dict.items(data);
    for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
        _$Unpack = _$iter12[_$id12];
        k = _$Unpack[0];
        v = _$Unpack[1];
        self.setHtmlAttribute(k, v);	//DEFPRINT(AST_SimpleStatement 643
        if (k == "id") {
            _$Unpack = self.setHtmlId(tag_name, v);	//DEFPRINT(AST_Assign 645
            instance = _$Unpack[0];
            jq_target = _$Unpack[1];	//DEFPRINT(AST_SimpleStatement 645
        } else if (k == "group") {
            self.setHtmlGroup(v);	//DEFPRINT(AST_SimpleStatement 647
        } else if (k == "state") {
            self.setHtmlState(v);	//DEFPRINT(AST_SimpleStatement 649
        } else if (k == "mvc") {
        } else if (k == "render_from") {
            self.setHtmlRenderFrom(v);	//DEFPRINT(AST_SimpleStatement 653
        } else if (k == "style") {
            self.css = new CssStyle(jq_target);	//DEFPRINT(AST_SimpleStatement 655
            self.css.parseStyle(v);	//DEFPRINT(AST_SimpleStatement 656
        }
    }
};	//class_fun_def A 388
ViewComponent.prototype.parseCustomComponents = function parseCustomComponents(){
    var self = this;	// complex body AST_Defun
    var html_comptag_list, rapyd_comp_list, duplicate_comp_list, apply_html_comp_tag_list, pattern, comp_data, comp_tag, comps, comp, k, tag_id, tag_name, instance, rapyd_comp_html_id, ptn, matches, comp_instance, comp_class, comp_instances, html_comptag, comp_code, groups, comp_initial_fn;	//complex body AST_Scope declare var as local
    html_comptag_list = [];	//DEFPRINT(AST_SimpleStatement 661
    rapyd_comp_list = [];	//DEFPRINT(AST_SimpleStatement 662
    duplicate_comp_list = [];	//DEFPRINT(AST_SimpleStatement 663
    apply_html_comp_tag_list = [];	//DEFPRINT(AST_SimpleStatement 664
    pattern = eval('new RegExp("(?:[\\\\s](\\\\w+)[\\\\s]*[=][\\\\s]*new[\\\\s]*(\\\\w+))","gm")');	//DEFPRINT(AST_SimpleStatement 665
    var _$iter13 = self.__rapyd_comps__;
    for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
        comp_initial_fn = _$iter13[_$id13];
        comp_data = comp_initial_fn();	//DEFPRINT(AST_SimpleStatement 670
        var _$iter14 = dict.keys(comp_data);
        for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
            k = _$iter14[_$id14];
            self.component_tags.append(k);	//DEFPRINT(AST_SimpleStatement 674
            comp_tag = k;	//DEFPRINT(AST_SimpleStatement 675
            comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 676
            var _$iter15 = comps;
            for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
                comp = _$iter15[_$id15];
                html_comptag_list.append({
                    "tag_name": comp_tag,
                    "comp": comp
                });	//DEFPRINT(AST_SimpleStatement 680
            }
        }
        var _$iter16 = html_comptag_list;
        for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
            html_comptag = _$iter16[_$id16];
            tag_id = html_comptag["comp"].id;	//DEFPRINT(AST_SimpleStatement 685
            tag_name = html_comptag["tag_name"];	//DEFPRINT(AST_SimpleStatement 686
            var _$iter17 = dict.items(comp_data);
            for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
                _$Unpack = _$iter17[_$id17];
                comp_class = _$Unpack[0];
                comp_instances = _$Unpack[1];
                var _$iter18 = comp_instances.slice(1);
                for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
                    comp_instance = _$iter18[_$id18];
                    if (comp_instance["id"] == tag_id) {
                        instance = comp_instance["instance"];	//DEFPRINT(AST_SimpleStatement 693
                        instance.setInstanceName(comp_instance["id"]);	//DEFPRINT(AST_SimpleStatement 694
                        instance.bindToHtmlTag(html_comptag["comp"]);	//DEFPRINT(AST_SimpleStatement 695
                        apply_html_comp_tag_list.append({
                            "html_comp": html_comptag,
                            "rapyd_comp": comp_instance
                        });	//DEFPRINT(AST_SimpleStatement 697
                    } else {
                        if (tag_name == comp_class) {
                            rapyd_comp_html_id = comp_instance["instance"].data["html_id"];	//DEFPRINT(AST_SimpleStatement 700
                            ptn = re.compile(re, rapyd_comp_html_id);	//DEFPRINT(AST_SimpleStatement 708
                            matches = tag_id.match(ptn);	//DEFPRINT(AST_SimpleStatement 709
                            if (matches) {
                                duplicate_comp_list.append({
                                    "html_comp": html_comptag,
                                    "rapyd_comp": comp_instance
                                });	//DEFPRINT(AST_SimpleStatement 711
                            }
                        }
                    }
                }
            }
        }
        comp_code = comp_initial_fn.toString();	//DEFPRINT(AST_SimpleStatement 713
        groups = comp_code.match(pattern);	//DEFPRINT(AST_SimpleStatement 714
        self.info("comp_data \t\t= ", comp_data);	//DEFPRINT(AST_SimpleStatement 716
        self.info("duplicate list \t= ", duplicate_comp_list);	//DEFPRINT(AST_SimpleStatement 717
        self.info("apply list \t\t= ", apply_html_comp_tag_list);	//DEFPRINT(AST_SimpleStatement 718
    }
};	//class_fun_def A 388
ViewComponent.prototype.setCompFromHtmlCommentTags = function setCompFromHtmlCommentTags(comp_code){
    var self = this;	// complex body AST_Defun
    var comp_tags, comp_list, comps, comp, comp_tag, pattern, groups, matched_data, m, match, group;	//complex body AST_Scope declare var as local
    return;	//AST_Exit.DEFMETHOD( 727
    comp_tags = eval(comp_code.split("__comp_tags__ = ")[1].split(";")[0]);	//DEFPRINT(AST_SimpleStatement 728
    comp_list = [];	//DEFPRINT(AST_SimpleStatement 729
    var _$iter19 = comp_tags;
    for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
        comp_tag = _$iter19[_$id19];
        comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);	//DEFPRINT(AST_SimpleStatement 732
        var _$iter20 = comps;
        for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
            comp = _$iter20[_$id20];
            comp_list.append({
                "tag_name": comp_tag,
                "comp": comp
            });	//DEFPRINT(AST_SimpleStatement 734
        }
    }
    jQuery.__compcode__ = comp_code;	//DEFPRINT(AST_SimpleStatement 736
    pattern = 'new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+))","gm")';	//DEFPRINT(AST_SimpleStatement 737
    groups = comp_code.match(eval(pattern));	//DEFPRINT(AST_SimpleStatement 738
    eval(comp_code);	//DEFPRINT(AST_SimpleStatement 740
    console.log("evaluated generated component");	//DEFPRINT(AST_SimpleStatement 741
    console.log("bt1 = ", bt1);	//DEFPRINT(AST_SimpleStatement 742
    matched_data = {};	//DEFPRINT(AST_SimpleStatement 743
    var _$iter21 = groups;
    for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
        group = _$iter21[_$id21];
        m = pattern.exec(comp_code);	//DEFPRINT(AST_SimpleStatement 745
        match = m.slice(1);	//DEFPRINT(AST_SimpleStatement 746
        if (isEmpty(matched_data[match[1]])) {
            matched_data[match[1]] = [];	//DEFPRINT(AST_SimpleStatement 747
        }
        matched_data[match[1]].append(eval(match[0]));	//DEFPRINT(AST_SimpleStatement 748
    }
    self.component_tags = comp_tags;	//DEFPRINT(AST_SimpleStatement 750
    self.info("matched = ", matched_data, "comp_tags = ", comp_tags);	//DEFPRINT(AST_SimpleStatement 751
    self.setCompFromHtmlTags(comp_list);	//DEFPRINT(AST_SimpleStatement 752
};	//class_fun_def A 388
ViewComponent.prototype.setCompFromHtmlTags = function setCompFromHtmlTags(comp_list){
    var self = this;	// complex body AST_Defun
    var tag_name, comp, dom, node, _comp;	//complex body AST_Scope declare var as local
    var _$iter22 = comp_list;
    for (var _$id22 = 0; _$id22 < _$iter22.length; _$id22++) {
        _comp = _$iter22[_$id22];
        tag_name = _comp["tag_name"];	//DEFPRINT(AST_SimpleStatement 757
        comp = _comp["comp"];	//DEFPRINT(AST_SimpleStatement 758
        dom = {
            "tag_name": tag_name,
            "data": ""
        };	//DEFPRINT(AST_SimpleStatement 759
        var _$iter23 = comp.attributes;
        for (var _$id23 = 0; _$id23 < _$iter23.length; _$id23++) {
            node = _$iter23[_$id23];
            dom["data"][node.nodeName] = node.nodeValue;	//DEFPRINT(AST_SimpleStatement 761
        }
        self.log("[setCompFromHtmlTags] dom = ", dom);	//DEFPRINT(AST_SimpleStatement 763
        self.setHtmlAttribute(dom);	//DEFPRINT(AST_SimpleStatement 764
    }
};	//class_fun_def A 388
ViewComponent = __defineClassProperties__(ViewComponent);

var Animation = Callable(function Animation_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.data = {
        "tween": []
    };	//DEFPRINT(AST_SimpleStatement 768
});	//class_fun_def A 766
Animation.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data[attr] = value;	//DEFPRINT(AST_SimpleStatement 770
};	//class_fun_def A 766
Animation.prototype.setTwn = function setTwn(tween_code){
    var self = this;	// complex body AST_Defun
    function tween(anim) {
        function wrapper(code) {
            anim.data["tween"].append(code);	//DEFPRINT(AST_SimpleStatement 774
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 775
    }
    return tween(self);	//AST_Exit.DEFMETHOD( 776
};	//class_fun_def A 766
Animation.prototype.startAnime = function startAnime(target){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 766
Animation = __defineClassProperties__(Animation);

var State = Callable(function State_(states, target){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.parent = states;	//DEFPRINT(AST_SimpleStatement 781
    self.target = target;	//DEFPRINT(AST_SimpleStatement 782
    self.data = {
        "animation": [],
        "name": "",
        "setattr": [],
        "conditions": []
    };	//DEFPRINT(AST_SimpleStatement 783
});	//class_fun_def A 779
State.prototype.setCondition = function setCondition(attr, con){
    var self = this;	// complex body AST_Defun
    self.data["conditions"].append(con);	//DEFPRINT(AST_SimpleStatement 786
};	//class_fun_def A 779
State.prototype.setAnime = function setAnime(){
    var self = this;	// complex body AST_Defun
    var anim;	//complex body AST_Scope declare var as local
    anim = new Animation();	//DEFPRINT(AST_SimpleStatement 788
    self.data["animation"] = anim;	//DEFPRINT(AST_SimpleStatement 789
    return anim;	//AST_Exit.DEFMETHOD( 790
};	//class_fun_def A 779
State.prototype.setData = function setData(attr, value){
    var self = this;	// complex body AST_Defun
    self.data["setattr"].append([ attr, value ]);	//DEFPRINT(AST_SimpleStatement 792
};	//class_fun_def A 779
State.prototype.setName = function setName(name){
    var self = this;	// complex body AST_Defun
    self.data[name] = name;	//DEFPRINT(AST_SimpleStatement 794
};	//class_fun_def A 779
State.prototype.addState = function addState(){
    var self = this;	// complex body AST_Defun
    return self.parent.addState();	//AST_Exit.DEFMETHOD( 796
};	//class_fun_def A 779
State.prototype.processSetAttr = function processSetAttr(){
    var self = this;	// complex body AST_Defun
    var lst;	//complex body AST_Scope declare var as local
    var _$iter24 = self.data["setattr"];
    for (var _$id24 = 0; _$id24 < _$iter24.length; _$id24++) {
        lst = _$iter24[_$id24];
        self.target[lst[0]] = lst[1];	//DEFPRINT(AST_SimpleStatement 801
    }
};	//class_fun_def A 779
State.prototype.processAnime = function processAnime(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 779
State = __defineClassProperties__(State);

var States = Callable(function States_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.states = [];	//DEFPRINT(AST_SimpleStatement 806
    self.current_state = self.target = "";	//DEFPRINT(AST_SimpleStatement 807
    self.setAsWatchObject("current_state", "default", mode = "");	//DEFPRINT(AST_SimpleStatement 808
});	//class_fun_def A 804
States.prototype = new ViewComponent("__inheritance__", States);	//class_fun_def C 804
States.prototype.getStates = function getStates(){
    var self = this;	// complex body AST_Defun
    return self.states;	//AST_Exit.DEFMETHOD( 811
};	//class_fun_def A 804
States.prototype.getStateByName = function getStateByName(name){
    var self = this;	// complex body AST_Defun
    var state;	//complex body AST_Scope declare var as local
    var _$iter25 = self.states;
    for (var _$id25 = 0; _$id25 < _$iter25.length; _$id25++) {
        state = _$iter25[_$id25];
        if (state.data.name == name) {
            return state.data;	//AST_Exit.DEFMETHOD( 816
        }
    }
};	//class_fun_def A 804
States.prototype.addState = function addState(){
    var self = this;	// complex body AST_Defun
    var state;	//complex body AST_Scope declare var as local
    state = new State(self, self.target);	//DEFPRINT(AST_SimpleStatement 818
    self.states.append(state);	//DEFPRINT(AST_SimpleStatement 819
    return state;	//AST_Exit.DEFMETHOD( 820
};	//class_fun_def A 804
States.prototype.setTarget = function setTarget(target){
    var self = this;	// complex body AST_Defun
    self.target = target;	//DEFPRINT(AST_SimpleStatement 823
    target._setComponentStates(self);	//DEFPRINT(AST_SimpleStatement 824
};	//class_fun_def A 804
States.prototype.setState = function setState(state_name){
    var self = this;	// complex body AST_Defun
    self.current_state = state_name;	//DEFPRINT(AST_SimpleStatement 828
};	//class_fun_def A 804
States = __defineClassProperties__(States);

var VisualElements = Callable(function VisualElements_(target, data){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    var i;	//complex body AST_Scope declare var as local
    if (target) {
        function getter_callback(ref, attr) {
            function wrapper() {
                return ref[attr];	//AST_Exit.DEFMETHOD( 835
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 836
        }
        var _$iter26 = data;
        for (var _$id26 = 0; _$id26 < _$iter26.length; _$id26++) {
            i = _$iter26[_$id26];
            if (_$in_("-", i)) {
                self.__defineGetter__(i, getter_callback(self, i.replace("-", "_")));	//DEFPRINT(AST_SimpleStatement 839
            }
        }
        self.target = target;	//DEFPRINT(AST_SimpleStatement 840
        self.__allowed__ = data;	//DEFPRINT(AST_SimpleStatement 841
    }
});	//class_fun_def A 830
VisualElements.prototype.pos = function pos(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.pos_hint = function pos_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.size = function size(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.size_hint = function size_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.scale = function scale(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.scale_hint = function scale_hint(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.background = function background(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.background_color = function background_color(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements.prototype.border = function border(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 830
VisualElements = __defineClassProperties__(VisualElements);

var Rectangle = Callable(function Rectangle_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == "object") {
        if (isEmpty(self.__instance__[instance.name])) {
            self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 861
        }
        self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 862
    }
    self.data = {};	//DEFPRINT(AST_SimpleStatement 865
    self.html_target = {};	//DEFPRINT(AST_SimpleStatement 866
    self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 867
});	//class_fun_def A 853
Rectangle.prototype = new ViewComponent("__inheritance__", Rectangle);	//class_fun_def C 853
Rectangle.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 855
    self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 856
};	//class_fun_def A 853
Rectangle.prototype.getInstance = function getInstance(ins_name){
    var self = this;	// complex body AST_Defun
    return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 871
};	//class_fun_def A 853
Rectangle = __defineClassProperties__(Rectangle);

var Button = Callable(function Button_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == "object") {
        if (isEmpty(self.__instance__[instance.name])) {
            self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 881
        }
        self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 882
    }
    self.data = {};	//DEFPRINT(AST_SimpleStatement 885
    self.html_target = {};	//DEFPRINT(AST_SimpleStatement 886
    self.conditionData = {};	//DEFPRINT(AST_SimpleStatement 887
});	//class_fun_def A 873
Button.prototype = new ViewComponent("__inheritance__", Button);	//class_fun_def C 873
Button.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 875
    self.__behavior__ = {};	//DEFPRINT(AST_SimpleStatement 876
};	//class_fun_def A 873
Button.prototype.getInstance = function getInstance(ins_name){
    var self = this;	// complex body AST_Defun
    return self.prototype.__instance__;	//AST_Exit.DEFMETHOD( 897
};	//class_fun_def A 873
Button = __defineClassProperties__(Button);

var Square = Callable(function Square_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    super_(Square, self).constructor(self);	//DEFPRINT(AST_SimpleStatement 903
});	//class_fun_def A 901
Square.prototype = new Rectangle("__inheritance__", Square);	//class_fun_def C 901
Square = __defineClassProperties__(Square);

var CustomButton = Callable(function CustomButton_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    super_(CustomButton, self).constructor(self);	//DEFPRINT(AST_SimpleStatement 908
});	//class_fun_def A 906
CustomButton.prototype = new Button("__inheritance__", CustomButton);	//class_fun_def C 906
CustomButton.prototype.set_state = function set_state(square){
    var self = this;	// complex body AST_Defun
    function wrapper() {
        square.state = self.state;	//DEFPRINT(AST_SimpleStatement 911
        if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
            square.x = self.x;	//DEFPRINT(AST_SimpleStatement 913
            square.y = self.y;	//DEFPRINT(AST_SimpleStatement 914
        }
    }
    return wrapper;	//AST_Exit.DEFMETHOD( 915
};	//class_fun_def A 906
CustomButton = __defineClassProperties__(CustomButton);

var test = Callable(function test_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(test,self).__init__.apply(self,arguments);});	//class_fun_def B 917
test.prototype = new Button("__inheritance__", test);	//class_fun_def C 917
test.prototype.__int__ = function __int__(){
    var self = this;	// complex body AST_Defun
    super_(test, self).__int__(self);	//DEFPRINT(AST_SimpleStatement 919
};	//class_fun_def A 917
test = __defineClassProperties__(test);

rapyd = new RapydWeb("init");	//DEFPRINT(AST_SimpleStatement 922

controller = new Controller("init");	//DEFPRINT(AST_SimpleStatement 923

ctr = new Controller("init");	//DEFPRINT(AST_SimpleStatement 924

blog = new BlogController("init");	//DEFPRINT(AST_SimpleStatement 925

model = new Model("init");	//DEFPRINT(AST_SimpleStatement 926

m = new Model("init");	//DEFPRINT(AST_SimpleStatement 927

view = new View("init");	//DEFPRINT(AST_SimpleStatement 928

v = new View("init");	//DEFPRINT(AST_SimpleStatement 929

rapyd.mediator = new Mediator("init");	//DEFPRINT(AST_SimpleStatement 930

rapyd.mediator.address = new AddressMediator("init");	//DEFPRINT(AST_SimpleStatement 931

rapyd.mediator.header = new HeaderMediator("init");	//DEFPRINT(AST_SimpleStatement 932

vc = new ViewComponent("init");	//DEFPRINT(AST_SimpleStatement 934

btn = new Button("init");	//DEFPRINT(AST_SimpleStatement 935

rec = new Rectangle("init");	//DEFPRINT(AST_SimpleStatement 936

square = new Square();	//DEFPRINT(AST_SimpleStatement 938

sq = new Square();	//DEFPRINT(AST_SimpleStatement 939

custom = new CustomButton();	//DEFPRINT(AST_SimpleStatement 940

cus = new CustomButton();	//DEFPRINT(AST_SimpleStatement 941

rapyd.mediator.header.a = rapyd.mediator.a = rapyd.mediator.address.a = rapyd.a = controller.a = ctr.a = blog.a = model.a = view.a = m.a = v.a = "aaaaaaa";	//DEFPRINT(AST_SimpleStatement 942

sq.aa = cus.aa = vc.aaa = btn.aa = rec.aa = square.aa = custom.aa = "aaaaaaaaaaaaaaa";	//DEFPRINT(AST_SimpleStatement 943

console.log(sq.__instance__);	//DEFPRINT(AST_SimpleStatement 945
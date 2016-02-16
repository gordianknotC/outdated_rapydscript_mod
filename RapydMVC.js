


















function RapydMVC() {
    var scope;
    scope = set_scope("RapydMVC");
    scope.variableA = "valueA";
    scope.variableB = "valueB";
    function MVC() {
        var scope, rapyd;
        scope = set_scope("RapydMVC.MVC");
        var RapydWeb = Callable(function RapydWeb_(init){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            if (typeof init == "object") {
                self.__instance__[init.__name__] = init;
            }
            self.__instance__["RapydWeb"] = self;
        });
        RapydWeb.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.m = [];
            self.v = [];
            self.c = [];
            self.action = self.debug_level = "";
            self.components = [];
            self.config = [];
            self.__instance__ = {};
        };
        RapydWeb.prototype.debug = function debug(){
            var self = this;
            var args = [].slice.call(arguments, 0);
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
            var name;
            if (self.log.caller) {
                name = "[" + self.log.caller.name + "]";
                args.insert(0, name);
            }
            console.log.apply(console, [].concat(args));
        };
        RapydWeb.prototype.error = function error(){
            var self = this;
            var args = [].slice.call(arguments, 0);
            var name;
            name = "[ERROR][" + self.error.caller.name + "]";
            args.insert(0, name);
            console.error.apply(console, [].concat(args));
        };
        RapydWeb.prototype.info = function info(){
            var self = this;
            var args = [].slice.call(arguments, 0);
            var name, color;
            name = "%c[INFO][" + self.info.caller.name + "]";
            color = "background: #667; color: #fff";
            args.insert(0, color);
            args.insert(0, name);
            console.info.apply(console, [].concat(args));
        };
        RapydWeb.prototype.inheritFromInstance = function inheritFromInstance(cls, instance){
            var self = this;
            var instance_class_name, super_class, super_class_name, proto;
            instance_class_name = instance.__name__;
            super_class = super_(cls, instance);
            super_class_name = super_class.__name__;
            proto = instance.__superlevel__;
            eval('self.__instance__["{0}"]{1} = self.__instance__["{2}"]'.format(instance_class_name, proto, super_class_name));
        };
        RapydWeb.prototype.__actionInit__ = function __actionInit__(hyper_successor, name, sub_successor){
            var self = this;
            var action, action;
            self.checkActionsAvailable(name, sub_successor);
            if (!hyper_successor.__actions__[name]) {
                hyper_successor.__actions__[name] = {};
            }
            self.log("__actions__ = ", hyper_successor.__actions__);
            self.log("successor actions = ", sub_successor.actions);
            if (!(hyper_successor.name == "View")) {
                var _$iter0 = sub_successor.actions;
                for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
                    action = _$iter0[_$id0];
                    hyper_successor.__actions__[name][action] = self.actionPropStructure();
                }
            } else {
                var _$iter1 = sub_successor.actions;
                for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
                    action = _$iter1[_$id1];
                    hyper_successor.__actions__[name][action] = self.viewPropStructure();
                }
            }
        };
        RapydWeb.prototype.__components_init__ = function __components_init__(hyper_successor, name, sub_successor){
            var self = this;
            if (sub_successor.components) {
                if (!hyper_successor.__components__[name]) {
                    hyper_successor.__components__[name] = [];
                }
                hyper_successor.__components__[name] = sub_successor.components;
            }
        };
        RapydWeb.prototype.actionPropStructure = function actionPropStructure(){
            var self = this;
            var r;
            r = {
                "views": [],
                "props": {}
            };
            return r;
        };
        RapydWeb.prototype.viewPropStructure = function viewPropStructure(){
            var self = this;
            var r;
            r = {
                "views": [],
                "props": {}
            };
            return r;
        };
        RapydWeb.prototype.checkActionsAvailable = function checkActionsAvailable(name, successor){
            var self = this;
            var action;
            self.log(name, successor);
            self.log(successor.actions);
            var _$iter2 = successor.actions;
            for (var _$id2 = 0; _$id2 < _$iter2.length; _$id2++) {
                action = _$iter2[_$id2];
                if (!successor[action]) {
                    self.error("[error] actions [{0}] not exists", action);
                    return false;
                }
            }
        };
        RapydWeb = __defineClassProperties__(RapydWeb);
        var Controller = Callable(function Controller_(init, name){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            if (typeof name === "undefined") name = null;
            var successor;
            if (typeof init == "object") {
                successor = init;
                console.log("component and action init:: self = ", self, "name = ", name, "sucessor = ", successor);
                super_(Controller, self).__components_init__(self, name, successor);
                super_(Controller, self).__actionInit__(self, name, successor);
            }
            super_(Controller, self).__init__(self);
        });
        Controller.prototype = new RapydWeb("__inheritance__", Controller);
        Controller.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.__components__ = {};
            self.__actions__ = {};
        };
        Controller.prototype.__getattr__ = function __getattr__(item){
            var self = this;
            print;
            item;
        };
        Controller.prototype.__get__ = function __get__(instance, owner){
            var self = this;
            print;
            [instance, owner];
        };
        Controller.prototype.__beforAction = function __beforAction(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.beforeAction(f, args);
        };
        Controller.prototype.beforeAction = function beforeAction(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Controller.prototype.afterAction = function afterAction(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Controller.prototype.__afterAction = function __afterAction(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
            self.__startRender(f, args);
        };
        Controller.prototype.__startRender = function __startRender(){
            var self = this;
        };
        Controller = __defineClassProperties__(Controller);
        var View = Callable(function View_(init, name){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            var successor;
            if (typeof init == "object") {
                successor = init;
                super_(View, self).__components_init__(self, name, successor);
                super_(View, self).__actionInit__(self, name, successor);
            }
            super_(View, self).__init__(self);
        });
        View.prototype = new RapydWeb("__inheritance__", View);
        View.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.__components__ = {};
            self.__actions__ = {};
        };
        View.prototype.beforeRender = function beforeRender(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        View.prototype.afterRender = function afterRender(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        View.prototype.mapToHtml = function mapToHtml(){
            var self = this;
        };
        View.prototype.getComponentComment = function getComponentComment(){
            var self = this;
            var comp_comment, comps, _comp, node, value, attr, comp, comp_name;
            comp_comment = jQuery("body").comments()[0];
            var _$iter3 = self.view_components_name;
            for (var _$id3 = 0; _$id3 < _$iter3.length; _$id3++) {
                comp_name = _$iter3[_$id3];
                self.view_components_attributes[comp_name] = {};
                comps = comp_comment.getElementsByTagName(comp_name);
                var _$iter4 = comps;
                for (var _$id4 = 0; _$id4 < _$iter4.length; _$id4++) {
                    comp = _$iter4[_$id4];
                    _comp = {};
                    var _$iter5 = comp.attributes;
                    for (var _$id5 = 0; _$id5 < _$iter5.length; _$id5++) {
                        attr = _$iter5[_$id5];
                        node = attr.nodeName;
                        value = attr.value;
                        _comp[node] = value;
                    }
                    self.view_components_attributes[comp_name][_comp.id] = _comp;
                }
            }
        };
        View = __defineClassProperties__(View);
        var Model = Callable(function Model_(init, name){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            if (typeof name === "undefined") name = null;
            var successor;
            if (typeof init == "object") {
                successor = init;
                super_(Model, self).__components_init__(self, name, successor);
            }
            super_(Model, self).__init__(self);
        });
        Model.prototype = new RapydWeb("__inheritance__", Model);
        Model.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.__components__ = {};
        };
        Model.prototype.beforeSend = function beforeSend(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Model.prototype.afterSend = function afterSend(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Model.prototype.beforeSave = function beforeSave(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Model.prototype.afterSaver = function afterSaver(){
            var self = this;
            var f = arguments[0];
            var args = [].slice.call(arguments, 1);
        };
        Model = __defineClassProperties__(Model);
        var Mediator = Callable(function Mediator_(init){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);
        });
        Mediator.prototype = new RapydWeb("__inheritance__", Mediator);
        Mediator.prototype.test = function test(){
            var self = this;
            print;
            "mediator test";
        };
        Mediator.prototype.test2 = function test2(){
            var self = this;
            print;
            "mediator test2";
        };
        Mediator = __defineClassProperties__(Mediator);
        var HeaderMediator = Callable(function HeaderMediator_(init){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);
        });
        HeaderMediator.prototype = new Mediator("__inheritance__", HeaderMediator);
        HeaderMediator.prototype.catchHeader = function catchHeader(header){
            var self = this;
        };
        HeaderMediator.prototype.rewriteHeader = function rewriteHeader(){
            var self = this;
        };
        HeaderMediator = __defineClassProperties__(HeaderMediator);
        var AddressMediator = Callable(function AddressMediator_(init){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            super_(Mediator, self).__init__(self);
        });
        AddressMediator.prototype = new Mediator("__inheritance__", AddressMediator);
        AddressMediator.prototype.suspendRediret = function suspendRediret(){
            var self = this;
        };
        AddressMediator.prototype.redirectTo = function redirectTo(){
            var self = this;
        };
        AddressMediator.prototype.historyNext = function historyNext(){
            var self = this;
        };
        AddressMediator.prototype.historyPrev = function historyPrev(){
            var self = this;
        };
        AddressMediator.prototype.getHistories = function getHistories(){
            var self = this;
        };
        AddressMediator.prototype.onAddressChange = function onAddressChange(){
            var self = this;
        };
        AddressMediator = __defineClassProperties__(AddressMediator);
        rapyd = new RapydWeb("init");
        rapyd.c = new Controller("init");
        rapyd.m = new Model("init");
        rapyd.v = new View("init");
        rapyd.mediator = new Mediator("init");
        rapyd.mediator.address = new AddressMediator("init");
        rapyd.mediator.header = new HeaderMediator("init");
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
        };
    }
    MVC = module(MVC);
    
    function UiKit() {
        var scope, mvc, View;
        scope = set_scope("RapydMVC.UiKit");
        mvc = MVC;
        View = mvc.View;
        var CssStyle = Callable(function CssStyle_(targets){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            self.targets = targets;
        });
        CssStyle.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];
            self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];
            self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];
            self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];
            self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];
        };
        CssStyle.prototype.setStyle = function setStyle(k, v){
            var self = this;
            var target;
            var _$iter6 = self.targets;
            for (var _$id6 = 0; _$id6 < _$iter6.length; _$id6++) {
                target = _$iter6[_$id6];
                target.style[k] = v;
            }
        };
        CssStyle.prototype.parseStyle = function parseStyle(styles){
            var self = this;
            var k, v, pos_arr, x, y, x, y, z, w, h, style;
            styles = styles.split(";").slice(0, -1);
            var _$iter7 = styles;
            for (var _$id7 = 0; _$id7 < _$iter7.length; _$id7++) {
                style = _$iter7[_$id7];
                k = style.split(":")[0].strip();
                v = style.split(":")[1].strip();
                if (_$in_(k, self.HTML_POSITIONING_FAMILY)) {
                    if (k == "pos") {
                        pos_arr = v.split(",");
                        if (len(pos_arr) == 2) {
                            _$Unpack = pos_arr;
                            x = _$Unpack[0];
                            y = _$Unpack[1];
                        } else if (len(pos_arr) == 3) {
                            _$Unpack = pos_arr;
                            x = _$Unpack[0];
                            y = _$Unpack[1];
                            z = _$Unpack[2];
                            self.setStyle("z-index", z);
                        } else {
                            throw "Invalid pos format: {0}".format(style);
                        }
                        self.setStyle("left", x);
                        self.setStyle("top", y);
                    } else if (k == "pos_hint") {
                    }
                    console.log(k, v);
                } else if (_$in_(k, self.HTML_BACKGROUND_FAMILY)) {
                    console.log(k, v);
                } else if (_$in_(k, self.HTML_APPEARANCE_FAMILY)) {
                    if (k == "size") {
                        _$Unpack = v.split(",");
                        w = _$Unpack[0];
                        h = _$Unpack[1];
                        self.setStyle("width", w);
                        self.setStyle("height", h);
                    } else if (k == "size_hint") {
                    }
                    console.log(k, v);
                } else if (_$in_(k, self.HTML_BORDER_FAMILY)) {
                    console.log(k, v);
                } else if (_$in_(k, self.HTML_TEXT_FAMILY)) {
                    console.log(k, v);
                } else {
                    throw "Invalid or unsupported Style tag: {0}".format(k);
                }
                self.setStyle(k, v);
            }
        };
        CssStyle = __defineClassProperties__(CssStyle);
        var Template = Callable(function Template_(){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
        });
        Template.prototype = new View("__inheritance__", Template);
        Template = __defineClassProperties__(Template);
        var ViewComponent = Callable(function ViewComponent_(init, comp_code){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            self.setAsWatchObject(self, "test", "test value");
            self.setAsWatchObject(self, "test2", "set_from_callback value");
            if (init == "customcomp") {
                self.css = {};
                self.component_tags = [];
                self.parseCustomComponents();
                self.setCompFromHtmlCommentTags(comp_code);
            }
        });
        ViewComponent.prototype = new View("__inheritance__", ViewComponent);
        ViewComponent.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY;
            self.HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY;
            self.HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY;
            self.HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY;
            self.HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY;
            self.__rapyd_comps__ = [];
        };
        ViewComponent.prototype.setAsWatchObject = function setAsWatchObject(attr, value, mode){
            var self = this;
            var obj;
            obj = {
                "value": value,
                "onChange": [],
                "mode": mode
            };
            self.set(attr, obj);
            function setter_callback(instance, attr) {
                function wrapper(_value) {
                    instance.onChange(attr, _value);
                }
                return wrapper;
            }
            function getter_callback(instance, attr) {
                function wrapper(_value) {
                    return instance.get(attr);
                }
                return wrapper;
            }
            self.__defineSetter__(attr, setter_callback(self, attr));
            self.__defineGetter__(attr, getter_callback(self, attr));
            return obj;
        };
        ViewComponent.prototype.isWatchObject = function isWatchObject(value){
            var self = this;
            var value_in_dict, onchange_in_dict;
            if (typeof value == "object") {
                value_in_dict = _$in_("value", dict.keys(value));
                onchange_in_dict = _$in_("onChange", dict.keys(value));
                self.log("[ViewComp][isWatchObject] value_in_dict, onchange_in_dict = ", value_in_dict, onchange_in_dict);
                return value_in_dict || onchange_in_dict;
            } else {
                return false;
            }
        };
        ViewComponent.prototype.set = function set(attr, value){
            var self = this;
            self["_" + attr] = value;
        };
        ViewComponent.prototype.get = function get(attr){
            var self = this;
            return self["_" + attr];
        };
        ViewComponent.prototype.onChange = function onChange(attr, value){
            var self = this;
            var original_value, on_change_register_list, mode, state, state_data, state_conditions, _dict, target, target_attr, obj;
            original_value = self.get(attr);
            self.info(" origianal value = ", original_value);
            if (!self.isWatchObject(original_value)) {
                throw '[TypeError] attribute: "' + attr + '" is not a valid watch object';
            }
            on_change_register_list = original_value.onChange;
            mode = original_value.mode;
            if (mode == "states") {
                state = self.States.getStateByName(value);
                state_data = state.data;
                state.processSetAttr();
                state.processAnime();
                state_conditions = state_data.conditions;
                var _$iter8 = state_conditions;
                for (var _$id8 = 0; _$id8 < _$iter8.length; _$id8++) {
                    _dict = _$iter8[_$id8];
                    self.processOnchangeConditions(_dict);
                }
                return;
            } else if (mode == "visual_component") {
                self.VisuelElements[attr](value);
                return;
            }
            var _$iter9 = on_change_register_list;
            for (var _$id9 = 0; _$id9 < _$iter9.length; _$id9++) {
                _dict = _$iter9[_$id9];
                if (_$in_("condition", dict.keys(_dict))) {
                    self.info("[set onchange list] set var with condition, attr = ", attr);
                    self.processOnchangeConditions(_dict);
                } else {
                    self.info("[set onchange list] set var, attr = ", attr, "value = ", value);
                    target = _dict["target"];
                    target_attr = _dict["attr"];
                    target.set(target_attr, value);
                }
            }
            self.log("[onChange][set var] attr = ", attr, "value = ", value, "target = ", target, "target_attr = ", target_attr);
            obj = self.get(attr);
            obj.value = value;
            self.set(attr, obj);
        };
        ViewComponent.prototype.processOnchangeConditions = function processOnchangeConditions(con){
            var self = this;
            var current, _condition, _pass, condition, setted, setter, v, v, key, _condition, setted, condition, setter, setter, v, v;
            "\n\t\t\t\trapydscript if elif else clause structure::\n\t\t\t\t{'else_clause': {'setted': bt1.name, 'pass': '', 'setter': \"'final'\"},\n\t\t\t\t'elif_clause': [{\n\t\t\t\t\t\t'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'ccc'\"],\n\t\t\t\t\t\t'setter'\t: \"'anaother';\"},\n\n\t\t\t\t\t\t{'setted'\t: bt1.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [\"_state.state = 'ddd'\"],\n\t\t\t\t\t\t'setter'\t: \"'anoather elif';\"}],\n\n\t\t\t\t'if_clause':\n\t\t\t\t\t\t{'setted'\t: _state.name, 'pass': '',\n\t\t\t\t\t\t'condition'\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t\t\t'setter'\t: \"'pressed';\"}})\n\n\t\t\t\tpython if else clause structure\n\t\t\t\t{'if_setter'\t: \"'pressed'\",\n\t\t\t\t'if_con'\t\t: [_state.state, ' == ', \"'aaa'\"],\n\t\t\t\t'else_setter'\t: \"'abc'\",\n\t\t\t\t'if_setted'\t\t: _state.name})";
            function get_condition(con_lst) {
                var prop_a, operator, prop_b, condition;
                _$Unpack = con_lst;
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];
                condition = prop_a + operator + prop_b;
                return eval(condition);
            }
            if (con.if_clause) {
                var _$iter10 = dict.keys(con);
                for (var _$id10 = 0; _$id10 < _$iter10.length; _$id10++) {
                    key = _$iter10[_$id10];
                    current = con[key];
                    _condition = current["condition"];
                    _pass = current["pass"];
                    condition = get_condition(_condition);
                    if (condition || !isEmpty(_condition)) {
                        if (!_pass) {
                            setted = current["setted"];
                            setter = current["setter"];
                            if (self.isWatchObject(setter)) {
                                v = setter.value;
                            } else {
                                v = setter;
                            }
                            if (self.isWatchObject(setted)) {
                                setted.value = v;
                            } else {
                                throw "setted must be a referenced watch object not a" + typeof setted;
                            }
                            continue;
                        } else {
                            continue;
                        }
                    }
                }
            } else if (con.if_con) {
                _condition = con["if_con"];
                setted = con["if_setted"];
                condition = get_condition(_condition);
                if (condition) {
                    setter = con["if_setter"];
                } else {
                    setter = con["else_setter"];
                }
                if (self.isWatchObject(setter)) {
                    v = setter.value;
                } else {
                    v = setter;
                }
                if (self.isWatchObject(setted)) {
                    setted.value = v;
                } else {
                    throw "setted must be a referenced watch object not a" + typeof setted;
                }
            }
        };
        ViewComponent.prototype.registCondition = function registCondition(register){
            var self = this;
            var con, pattern, _con, prop_a, operator, prop_b, setted, setter, setted, setter, _con, prop_a, operator, prop_b, setted, setter, setted, setter;
            con = register.rapyd || register.python;
            pattern = new RegExp("([w]+[.][w]+)");
            if (con.if_clause) {
                _con = con.if_clause.condition;
                _$Unpack = _con;
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];
                if (!con.if_clause["pass"]) {
                    setted = con["setted"];
                    setter = con["setter"];
                } else {
                    setted = setter = "";
                }
                if (prop_a.match(pattern)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });
                }
                if (prop_b.match(pattern)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });
                }
                return;
            } else {
                _con = con.if_con;
                _$Unpack = _con;
                prop_a = _$Unpack[0];
                operator = _$Unpack[1];
                prop_b = _$Unpack[2];
                if (!con["pass"]) {
                    setted = con["if_setted"];
                    setter = con["if_setter"];
                } else {
                    setted = setter = "";
                }
                if (_$in_("self.", prop_a)) {
                    prop_a.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });
                }
                if (_$in_("self.", prop_b)) {
                    prop_b.onChange.append({
                        "condition": con,
                        "setted": setted,
                        "setter": setter
                    });
                }
            }
        };
        ViewComponent.prototype.setattr = function setattr(attr, value){
            var self = this;
            if (typeof attr == "string") {
                if (self.isIfStatement(value)) {
                    self.registCondition(value);
                }
                if (self.isWatchObject(value)) {
                    value.onChange.append({
                        "target": self,
                        "attr": attr
                    });
                } else {
                    self.set(attr, value);
                }
            } else {
                throw "Invalid attribute type! attribute must be a string type";
            }
        };
        ViewComponent.prototype.isIfStatement = function isIfStatement(value){
            var self = this;
            var condition, _if, key;
            if (typeof value == "object") {
                condition = value["python"] || value["rapyd"];
                if (!condition) {
                    return false;
                }
                if (typeof condition == "object") {
                    _if = [ "if_con", "if_setter", "if_setted", "if_clause", "elif_clause", "else_clause" ];
                    var _$iter11 = dict.keys(condition);
                    for (var _$id11 = 0; _$id11 < _$iter11.length; _$id11++) {
                        key = _$iter11[_$id11];
                        if (_$in_(key, _if)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ViewComponent.prototype.setData = function setData(attr, value){
            var self = this;
            self.data[attr] = value;
        };
        ViewComponent.prototype.setCondition = function setCondition(attr, condition){
            var self = this;
            self.conditionData[attr] = condition;
        };
        ViewComponent.prototype.componentInitialize = function componentInitialize(){
            var self = this;
        };
        ViewComponent.prototype.setState = function setState(square){
            var self = this;
            function wrapper() {
                square.state = self.state;
                if (_$in_(self.state, [ "left_top", "left_bottom" ])) {
                    square.x = self.x;
                    square.y = self.y;
                }
            }
            return wrapper;
        };
        ViewComponent.prototype._setComponentStates = function _setComponentStates(states_instance){
            var self = this;
            self.States = states_instance;
        };
        ViewComponent.prototype.getCompById = function getCompById(id_name, attr){
            var self = this;
            function getcomp_id_wrapper() {
                return [id_name, attr];
            }
            return getcomp_id_wrapper;
        };
        ViewComponent.prototype.bindToHtmlTag = function bindToHtmlTag(tag_dom){
            var self = this;
            self.html_target = tag_dom;
        };
        ViewComponent.prototype.setInstanceName = function setInstanceName(n){
            var self = this;
            self.instance_name = n;
        };
        ViewComponent.prototype.onStateChanged = function onStateChanged(){
            var self = this;
        };
        ViewComponent.prototype.setHtmlId = function setHtmlId(tag_name, id){
            var self = this;
            var css_selector;
            css_selector = tag_name + "#" + id;
        };
        ViewComponent.prototype.setHtmlState = function setHtmlState(state_name){
            var self = this;
        };
        ViewComponent.prototype.setHtmlGroup = function setHtmlGroup(group_name){
            var self = this;
        };
        ViewComponent.prototype.setHtmlRenderFrom = function setHtmlRenderFrom(str_id){
            var self = this;
        };
        ViewComponent.prototype.setHtmlStyle = function setHtmlStyle(styles){
            var self = this;
            var style;
            style = styles.split(";");
        };
        ViewComponent.prototype.addRapydComp = function addRapydComp(fn){
            var self = this;
            self.__rapyd_comps__.append(fn);
        };
        ViewComponent.prototype.setHtmlAttribute = function setHtmlAttribute(dom){
            var self = this;
            var tag_name, data, instance, jq_target, instance, jq_target, k, v;
            tag_name = dom["tag_name"];
            data = dom["data"];
            instance = jq_target = "";
            var _$iter12 = dict.items(data);
            for (var _$id12 = 0; _$id12 < _$iter12.length; _$id12++) {
                _$Unpack = _$iter12[_$id12];
                k = _$Unpack[0];
                v = _$Unpack[1];
                self.setHtmlAttribute(k, v);
                if (k == "id") {
                    _$Unpack = self.setHtmlId(tag_name, v);
                    instance = _$Unpack[0];
                    jq_target = _$Unpack[1];
                } else if (k == "group") {
                    self.setHtmlGroup(v);
                } else if (k == "state") {
                    self.setHtmlState(v);
                } else if (k == "mvc") {
                } else if (k == "render_from") {
                    self.setHtmlRenderFrom(v);
                } else if (k == "style") {
                    self.css = new CssStyle(jq_target);
                    self.css.parseStyle(v);
                }
            }
        };
        ViewComponent.prototype.parseCustomComponents = function parseCustomComponents(){
            var self = this;
            var html_comptag_list, rapyd_comp_list, duplicate_comp_list, apply_html_comp_tag_list, pattern, comp_data, comp_tag, comps, comp, k, tag_id, tag_name, instance, rapyd_comp_html_id, ptn, matches, comp_instance, comp_class, comp_instances, html_comptag, comp_code, groups, comp_initial_fn;
            html_comptag_list = [];
            rapyd_comp_list = [];
            duplicate_comp_list = [];
            apply_html_comp_tag_list = [];
            pattern = eval('new RegExp("(?:[\\\\s](\\\\w+)[\\\\s]*[=][\\\\s]*new[\\\\s]*(\\\\w+))","gm")');
            var _$iter13 = self.__rapyd_comps__;
            for (var _$id13 = 0; _$id13 < _$iter13.length; _$id13++) {
                comp_initial_fn = _$iter13[_$id13];
                comp_data = comp_initial_fn();
                var _$iter14 = dict.keys(comp_data);
                for (var _$id14 = 0; _$id14 < _$iter14.length; _$id14++) {
                    k = _$iter14[_$id14];
                    self.component_tags.append(k);
                    comp_tag = k;
                    comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);
                    var _$iter15 = comps;
                    for (var _$id15 = 0; _$id15 < _$iter15.length; _$id15++) {
                        comp = _$iter15[_$id15];
                        html_comptag_list.append({
                            "tag_name": comp_tag,
                            "comp": comp
                        });
                    }
                }
                var _$iter16 = html_comptag_list;
                for (var _$id16 = 0; _$id16 < _$iter16.length; _$id16++) {
                    html_comptag = _$iter16[_$id16];
                    tag_id = html_comptag["comp"].id;
                    tag_name = html_comptag["tag_name"];
                    var _$iter17 = dict.items(comp_data);
                    for (var _$id17 = 0; _$id17 < _$iter17.length; _$id17++) {
                        _$Unpack = _$iter17[_$id17];
                        comp_class = _$Unpack[0];
                        comp_instances = _$Unpack[1];
                        var _$iter18 = comp_instances.slice(1);
                        for (var _$id18 = 0; _$id18 < _$iter18.length; _$id18++) {
                            comp_instance = _$iter18[_$id18];
                            if (comp_instance["id"] == tag_id) {
                                instance = comp_instance["instance"];
                                instance.setInstanceName(comp_instance["id"]);
                                instance.bindToHtmlTag(html_comptag["comp"]);
                                apply_html_comp_tag_list.append({
                                    "html_comp": html_comptag,
                                    "rapyd_comp": comp_instance
                                });
                            } else {
                                if (tag_name == comp_class) {
                                    rapyd_comp_html_id = comp_instance["instance"].data["html_id"];
                                    ptn = re.compile(rapyd_comp_html_id, "i");
                                    matches = tag_id.match(ptn);
                                    if (matches) {
                                        duplicate_comp_list.append({
                                            "html_comp": html_comptag,
                                            "rapyd_comp": comp_instance
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                comp_code = comp_initial_fn.toString();
                groups = comp_code.match(pattern);
                self.info("comp_data \t\t= ", comp_data);
                self.info("duplicate list \t= ", duplicate_comp_list);
                self.info("apply list \t\t= ", apply_html_comp_tag_list);
            }
        };
        ViewComponent.prototype.setCompFromHtmlCommentTags = function setCompFromHtmlCommentTags(comp_code){
            var self = this;
            var comp_tags, comp_list, comps, comp, comp_tag, pattern, groups, matched_data, m, match, group;
            return;
            comp_tags = eval(comp_code.split("__comp_tags__ = ")[1].split(";")[0]);
            comp_list = [];
            var _$iter19 = comp_tags;
            for (var _$id19 = 0; _$id19 < _$iter19.length; _$id19++) {
                comp_tag = _$iter19[_$id19];
                comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);
                var _$iter20 = comps;
                for (var _$id20 = 0; _$id20 < _$iter20.length; _$id20++) {
                    comp = _$iter20[_$id20];
                    comp_list.append({
                        "tag_name": comp_tag,
                        "comp": comp
                    });
                }
            }
            jQuery.__compcode__ = comp_code;
            pattern = 'new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+))","gm")';
            groups = comp_code.match(eval(pattern));
            eval(comp_code);
            console.log("evaluated generated component");
            console.log("bt1 = ", bt1);
            matched_data = {};
            var _$iter21 = groups;
            for (var _$id21 = 0; _$id21 < _$iter21.length; _$id21++) {
                group = _$iter21[_$id21];
                m = pattern.exec(comp_code);
                match = m.slice(1);
                if (isEmpty(matched_data[match[1]])) {
                    matched_data[match[1]] = [];
                }
                matched_data[match[1]].append(eval(match[0]));
            }
            self.component_tags = comp_tags;
            self.info("matched = ", matched_data, "comp_tags = ", comp_tags);
            self.setCompFromHtmlTags(comp_list);
        };
        ViewComponent.prototype.setCompFromHtmlTags = function setCompFromHtmlTags(comp_list){
            var self = this;
            var tag_name, comp, dom, node, _comp;
            var _$iter22 = comp_list;
            for (var _$id22 = 0; _$id22 < _$iter22.length; _$id22++) {
                _comp = _$iter22[_$id22];
                tag_name = _comp["tag_name"];
                comp = _comp["comp"];
                dom = {
                    "tag_name": tag_name,
                    "data": ""
                };
                var _$iter23 = comp.attributes;
                for (var _$id23 = 0; _$id23 < _$iter23.length; _$id23++) {
                    node = _$iter23[_$id23];
                    dom["data"][node.nodeName] = node.nodeValue;
                }
                self.log("[setCompFromHtmlTags] dom = ", dom);
                self.setHtmlAttribute(dom);
            }
        };
        ViewComponent = __defineClassProperties__(ViewComponent);
        var Animation = Callable(function Animation_(){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            self.data = {
                "tween": []
            };
        });
        Animation.prototype.setData = function setData(attr, value){
            var self = this;
            self.data[attr] = value;
        };
        Animation.prototype.setTwn = function setTwn(tween_code){
            var self = this;
            function tween(anim) {
                function wrapper(code) {
                    anim.data["tween"].append(code);
                }
                return wrapper;
            }
            return tween(self);
        };
        Animation.prototype.startAnime = function startAnime(target){
            var self = this;
        };
        Animation = __defineClassProperties__(Animation);
        var State = Callable(function State_(states, target){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            self.parent = states;
            self.target = target;
            self.data = {
                "animation": [],
                "name": "",
                "setattr": [],
                "conditions": []
            };
        });
        State.prototype.setCondition = function setCondition(attr, con){
            var self = this;
            self.data["conditions"].append(con);
        };
        State.prototype.setAnime = function setAnime(){
            var self = this;
            var anim;
            anim = new Animation();
            self.data["animation"] = anim;
            return anim;
        };
        State.prototype.setData = function setData(attr, value){
            var self = this;
            self.data["setattr"].append([ attr, value ]);
        };
        State.prototype.setName = function setName(name){
            var self = this;
            self.data[name] = name;
        };
        State.prototype.addState = function addState(){
            var self = this;
            return self.parent.addState();
        };
        State.prototype.processSetAttr = function processSetAttr(){
            var self = this;
            var lst;
            var _$iter24 = self.data["setattr"];
            for (var _$id24 = 0; _$id24 < _$iter24.length; _$id24++) {
                lst = _$iter24[_$id24];
                self.target[lst[0]] = lst[1];
            }
        };
        State.prototype.processAnime = function processAnime(){
            var self = this;
        };
        State = __defineClassProperties__(State);
        var States = Callable(function States_(){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            self.states = [];
            self.current_state = self.target = "";
            self.setAsWatchObject("current_state", "default", mode = "");
        });
        States.prototype = new ViewComponent("__inheritance__", States);
        States.prototype.getStates = function getStates(){
            var self = this;
            return self.states;
        };
        States.prototype.getStateByName = function getStateByName(name){
            var self = this;
            var state;
            var _$iter25 = self.states;
            for (var _$id25 = 0; _$id25 < _$iter25.length; _$id25++) {
                state = _$iter25[_$id25];
                if (state.data.name == name) {
                    return state.data;
                }
            }
        };
        States.prototype.addState = function addState(){
            var self = this;
            var state;
            state = new State(self, self.target);
            self.states.append(state);
            return state;
        };
        States.prototype.setTarget = function setTarget(target){
            var self = this;
            self.target = target;
            target._setComponentStates(self);
        };
        States.prototype.setState = function setState(state_name){
            var self = this;
            self.current_state = state_name;
        };
        States = __defineClassProperties__(States);
        var VisualElements = Callable(function VisualElements_(target, data){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            var i;
            function getter_callback(ref, attr) {
                function wrapper() {
                    return ref[attr];
                }
                return wrapper;
            }
            var _$iter26 = data;
            for (var _$id26 = 0; _$id26 < _$iter26.length; _$id26++) {
                i = _$iter26[_$id26];
                if (_$in_("-", i)) {
                    self.__defineGetter__(i, getter_callback(self, i.replace("-", "_")));
                }
            }
            self.target = target;
            self.__allowed__ = data;
        });
        VisualElements.prototype.pos = function pos(){
            var self = this;
        };
        VisualElements.prototype.pos_hint = function pos_hint(){
            var self = this;
        };
        VisualElements.prototype.size = function size(){
            var self = this;
        };
        VisualElements.prototype.size_hint = function size_hint(){
            var self = this;
        };
        VisualElements.prototype.scale = function scale(){
            var self = this;
        };
        VisualElements.prototype.scale_hint = function scale_hint(){
            var self = this;
        };
        VisualElements.prototype.background = function background(){
            var self = this;
        };
        VisualElements.prototype.background_color = function background_color(){
            var self = this;
        };
        VisualElements.prototype.border = function border(){
            var self = this;
        };
        VisualElements = __defineClassProperties__(VisualElements);
        var Rectangle = Callable(function Rectangle_(instance){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];
                }
                self.__instance__[instance.name].append(instance);
            }
            self.data = {};
            self.html_target = {};
            self.conditionData = {};
        });
        Rectangle.prototype = new ViewComponent("__inheritance__", Rectangle);
        Rectangle.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.__instance__ = {};
            self.__behavior__ = {};
        };
        Rectangle.prototype.getInstance = function getInstance(ins_name){
            var self = this;
            return self.prototype.__instance__;
        };
        Rectangle = __defineClassProperties__(Rectangle);
        var Button = Callable(function Button_(instance){
            var self = this;
            if (arguments[0] == "__inheritance__") return;
            if (typeof instance == "object") {
                if (isEmpty(self.__instance__[instance.name])) {
                    self.__instance__[instance.name] = [];
                }
                self.__instance__[instance.name].append(instance);
            }
            self.data = {};
            self.html_target = {};
            self.conditionData = {};
        });
        Button.prototype = new ViewComponent("__inheritance__", Button);
        Button.prototype.__classproperties__ = function __classproperties__(){
            var self = this;
            self.__instance__ = {};
            self.__behavior__ = {};
        };
        Button.prototype.getInstance = function getInstance(ins_name){
            var self = this;
            return self.prototype.__instance__;
        };
        Button = __defineClassProperties__(Button);
        return {
            Template: Template,
            ViewComponent: ViewComponent,
            Animation: Animation,
            Button: Button,
            State: State,
            States: States,
            Rectangle: Rectangle,
            scope: scope
        };
    }
    UiKit = module(UiKit);
    return {
        MVC: MVC,
        UiKit: UiKit,
        scope: scope
    };
}
RapydMVC = module(RapydMVC);



function test_app() {
    var core, core_variables, mvc, ui, RapydWeb, Controller, View, Button;
    core = RapydMVC;
    core_variables = core.scope;
    mvc = core.MVC;
    ui = core.UiKit;
    _$Unpack = [mvc.RapydWeb, mvc.Controller, mvc.View, ui.Button];
    RapydWeb = _$Unpack[0];
    Controller = _$Unpack[1];
    View = _$Unpack[2];
    Button = _$Unpack[3];
    core_variables.variableA = "set from test_app";
    core_variables.variableB = "set from test_app";
    var BlogController = Callable(function BlogController_(init, name){
        var self = this;
        if (arguments[0] == "__inheritance__") return;
        if (typeof name === "undefined") name = null;
        if (init) {
            super_(Controller, self).__init__(self);
            self.actions = [ "index", "viewArticles", "viewByTags" ];
            self.components = [ "modalbox" ];
            super_(BlogController, self).__init__(self, "BlogController");
        }
    });
    BlogController.prototype = new Controller("__inheritance__", BlogController);
    BlogController = __defineClassProperties__(BlogController);
    var VoclistController = Callable(function VoclistController_(init){
        var self = this;
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            super_(Controller, self).__init__(self);
            self.actions = [ "vocHome", "vocSentence", "vocIndex" ];
            self.components = [ "modalbox" ];
            super_(VoclistController, self).__init__(self, "VoclistController");
        }
    });
    VoclistController.prototype = new Controller("__inheritance__", VoclistController);
    VoclistController.prototype.vocIndex = function vocIndex(){
        var self = this;
        self.log("");
    };
    VoclistController.prototype.vocSentence = function vocSentence(){
        var self = this;
        self.log("");
    };
    VoclistController.prototype.vocHome = function vocHome(){
        var self = this;
        self.log("");
    };
    VoclistController = __defineClassProperties__(VoclistController);
    var BlogView = Callable(function BlogView_(init){
        var self = this;
        if (arguments[0] == "__inheritance__") return;
        if (init) {
            super_(View, self).__init__(self);
            self.actions = [ "index", "viewArticles" ];
            self.components = [ "modalbox" ];
            super_(BlogView, self).__init__(self, "BlogView");
        }
    });
    BlogView.prototype = new View("__inheritance__", BlogView);
    BlogView.prototype.index = function index(){
        var self = this;
    };
    BlogView.prototype.viewArticles = function viewArticles(){
        var self = this;
    };
    BlogView.prototype.viewByTags = function viewByTags(){
        var self = this;
    };
    BlogView = __defineClassProperties__(BlogView);
    return {
        BlogController: BlogController,
        VoclistController: VoclistController,
        BlogView: BlogView
    };
}
test_app = module(test_app);

function test1() {
    var mvc, rapyd, app, ViewComponent, AddressMediator, HeaderMediator, BlogController, VoclistController, v;
    mvc = RapydMVC;
    rapyd = mvc.MVC.instance_pack;
    app = test_app;
    ViewComponent = mvc.UiKit.ViewComponent;
    _$Unpack = [mvc.MVC.AddressMediator, mvc.MVC.HeaderMediator];
    AddressMediator = _$Unpack[0];
    HeaderMediator = _$Unpack[1];
    _$Unpack = [app.BlogController, app.VoclistController];
    BlogController = _$Unpack[0];
    VoclistController = _$Unpack[1];
    rapyd.c.blog = cls(BlogController, "init");
    rapyd.c.voclist = cls(VoclistController, "init");
    rapyd.mediator.address = cls(AddressMediator, "init");
    rapyd.mediator.header = cls(HeaderMediator, "init");
    console.log("------------ start -----------");
    console.log(rapyd);
    console.log("------------ test for view component -----------");
    v = cls(ViewComponent, "init");
    v.setAsWatchObject("test_setter", 123);
    v.setAsWatchObject("set_from_callback", "bbb");
    console.log('set "setter" and "set_from_callback" as watch object');
    console.log("");
    console.log("default value of \t\ttest_setter \t\t= ", v.test_setter);
    console.log("default value of \t\tset_from_callback \t= ", v.set_from_callback);
    console.log("");
    console.log('set test_setter to "value1"');
    v.test_setter = "value1";
    console.log("set set_from_callback's reference to test_setter");
    v.setattr("set_from_callback", v.test_setter);
    console.log('read value of "test_setter" \t\t= ', v.test_setter);
    console.log('read value of "set_from_callback" \t= ', v.set_from_callback);
    console.log("");
    console.log("alter value of test_setter to 'value2', to see if set_from_callback value changes!");
    v.test_setter = "value2";
    console.log("set_from_callback value = ", v.set_from_callback, " v.test_setter = ", v.test_setter);
}

function test2() {
    var mvc, rapyd;
    console.log("");
    console.log("=========== module import test ================");
    console.log("");
    mvc = RapydMVC;
    rapyd = mvc.MVC.instance_pack;
}

function test3(rapydml_component_tag) {
    var core, mvc, ui, ViewComponent, rapydml_component_code, v;
    console.log("=========== component test ================");
    core = RapydMVC;
    mvc = core.MVC;
    ui = core.UiKit;
    ViewComponent = ui.ViewComponent;
    rapydml_component_tag = 'script[type="text/rapydml_component"]';
    rapydml_component_code = jQuery(rapydml_component_tag).html();
    console.log("--------------------------");
    console.log("---- component script ----");
    console.log("--------------------------");
    v = cls(ViewComponent, "customcomp", rapydml_component_code);
}
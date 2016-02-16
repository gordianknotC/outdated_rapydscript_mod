function setPythonDefaultProp(fn) {
    fn.__name__ = fn.name;	//DEFPRINT(AST_SimpleStatement 4
    if (!(_$rapyd$_in(fn.constructor.name, [ "Object", "Function" ]))) {
        fn.__class__ = fn.constructor.name;	//DEFPRINT(AST_SimpleStatement 5
    } else {
        fn.func_name = fn.name;	//DEFPRINT(AST_SimpleStatement 6
    }
}

function defineClassProperties(cls) {
    var tmp, k, v;	//complex body AST_Scope declare var as local
    defineClassProperties.__name__ = defineClassProperties.name;	//DEFPRINT(AST_SimpleStatement 10
    cls.prototype.__classproperty_setted__ = false;	//DEFPRINT(AST_SimpleStatement 11
    tmp = eval('new cls("defineClassProperties")');	//DEFPRINT(AST_SimpleStatement 12
    if (!cls.prototype.__classproperty_setted__) {
        function getter(_cls, k) {
            function wrapper() {
                return _cls.prototype[k];	//AST_Exit.DEFMETHOD( 16
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 17
        }
        function setter(_cls, k) {
            function wrapper(value) {
                _cls.prototype[k] = value;	//DEFPRINT(AST_SimpleStatement 20
            }
            return wrapper;	//AST_Exit.DEFMETHOD( 21
        }
        var _$rapyd$_Iter0 = dict.items(cls.prototype);
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            _$rapyd$_Unpack = _$rapyd$_Iter0[_$rapyd$_Index0];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 33
            cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 34
        }
        var _$rapyd$_Iter1 = dict.items(tmp);
        for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
            _$rapyd$_Unpack = _$rapyd$_Iter1[_$rapyd$_Index1];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            if (!(typeof v == "function")) {
                console.log("define class property", k, v);	//DEFPRINT(AST_SimpleStatement 37
                cls.prototype[k] = v;	//DEFPRINT(AST_SimpleStatement 38
                cls.__defineGetter__(k, getter(cls, k));	//DEFPRINT(AST_SimpleStatement 39
                cls.__defineSetter__(k, setter(cls, k));	//DEFPRINT(AST_SimpleStatement 40
            }
        }
        cls.prototype.__classproperty_setted__ = true;	//DEFPRINT(AST_SimpleStatement 41
    }
    return cls;	//AST_Exit.DEFMETHOD( 42
}

function super_(cls, instance) {
    var super_name, super_class;	//complex body AST_Scope declare var as local
    function find_class_name(ref, name) {
        if (ref.__proto__.__name__ == name) {
            return ref.__proto__;	//AST_Exit.DEFMETHOD( 47
        } else {
            return find_class_name(ref.__proto__, name);	//AST_Exit.DEFMETHOD( 48
        }
    }
    super_name = cls.prototype.__proto__.__name__;	//DEFPRINT(AST_SimpleStatement 49
    instance.name = cls.name;	//DEFPRINT(AST_SimpleStatement 50
    super_class = find_class_name(instance, super_name);	//DEFPRINT(AST_SimpleStatement 51
    return super_class;	//AST_Exit.DEFMETHOD( 52
}

var SuSuper = Callable(function SuSuper(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == "object") {
        self.abacwef[instance.name] = instance;	//DEFPRINT(AST_SimpleStatement 60
        self.wefe.append(instance);	//DEFPRINT(AST_SimpleStatement 61
    }
    self.super_var = "susuper_set";	//DEFPRINT(AST_SimpleStatement 64
    console.log("SuSuper init");	//DEFPRINT(AST_SimpleStatement 65
});	//class_fun_def A 56
SuSuper.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.abacwef = {};	//DEFPRINT(AST_SimpleStatement 68
    self.wefe = [];	//DEFPRINT(AST_SimpleStatement 69
};	//class_fun_def A 56
SuSuper.prototype.teset = function teset(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 56
SuSuper.prototype.work = function work(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 56
SuSuper = _$rapyd$_defineClassProp(SuSuper);

var Super = Callable(function Super(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == "object") {
        console.log("Super caller = ", self.caller);	//DEFPRINT(AST_SimpleStatement 80
        if (isEmpty(self.__instance__[instance.name])) {
            self.__instance__[instance.name] = [];	//DEFPRINT(AST_SimpleStatement 82
        }
        self.__instance__[instance.name].append(instance);	//DEFPRINT(AST_SimpleStatement 83
        self.ins.append(instance);	//DEFPRINT(AST_SimpleStatement 84
    }
    self.super_var = "super_set";	//DEFPRINT(AST_SimpleStatement 86
    console.log("Super init");	//DEFPRINT(AST_SimpleStatement 87
});	//class_fun_def A 77
Super.prototype = new SuSuper("__inheritance__");	//class_fun_def C 77
Super.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 91
    self.ins = [];	//DEFPRINT(AST_SimpleStatement 92
};	//class_fun_def A 77
Super.prototype.cacheInstance = function cacheInstance(instance){
    var self = this;	// complex body AST_Defun
    console.log("cacheInstance", instance);	//DEFPRINT(AST_SimpleStatement 94
    self.__instance__[instance.name] = instance;	//DEFPRINT(AST_SimpleStatement 95
};	//class_fun_def A 77
Super.prototype.set_super = function set_super(a){
    var self = this;	// complex body AST_Defun
    self.super_var = a;	//DEFPRINT(AST_SimpleStatement 97
};	//class_fun_def A 77
Super.prototype.pico = function pico(){
    var self = this;	// complex body AST_Defun
    console.log(self);	//DEFPRINT(AST_SimpleStatement 99
};	//class_fun_def A 77
Super.prototype.echo = function echo(mode, ref){
    var self = this;	// complex body AST_Defun
    if (mode) {
        console.log(self, ref);	//DEFPRINT(AST_SimpleStatement 102
        console.log("Super");	//DEFPRINT(AST_SimpleStatement 103
    }
};	//class_fun_def A 77
Super = _$rapyd$_defineClassProp(Super);

var CssStyle = Callable(function CssStyle(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.set_super("css style init");	//DEFPRINT(AST_SimpleStatement 109
    console.log("CssStyle self = ", self);	//DEFPRINT(AST_SimpleStatement 110
});	//class_fun_def A 106
CssStyle.prototype = new Super("__inheritance__");	//class_fun_def C 106
CssStyle.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];	//DEFPRINT(AST_SimpleStatement 116
    self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];	//DEFPRINT(AST_SimpleStatement 118
    self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];	//DEFPRINT(AST_SimpleStatement 119
    self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];	//DEFPRINT(AST_SimpleStatement 121
    self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];	//DEFPRINT(AST_SimpleStatement 122
};	//class_fun_def A 106
CssStyle.prototype.echo = function echo(mode){
    var self = this;	// complex body AST_Defun
    if (mode == "super") {
        super_(CssStyle, self).echo(mode, self);	//DEFPRINT(AST_SimpleStatement 129
    } else {
        console.log("CssStyle");	//DEFPRINT(AST_SimpleStatement 131
    }
};	//class_fun_def A 106
CssStyle.prototype.setInstanceInit = function setInstanceInit(){
    var self = this;	// complex body AST_Defun
    super_(CssStyle, self).cacheInstance(self);	//DEFPRINT(AST_SimpleStatement 133
};	//class_fun_def A 106
CssStyle.prototype.setSuperConstructorInit = function setSuperConstructorInit(){
    var self = this;	// complex body AST_Defun
    super_(CssStyle, self).constructor(self);	//DEFPRINT(AST_SimpleStatement 135
};	//class_fun_def A 106
CssStyle.prototype.set_cssstyle = function set_cssstyle(){
    var self = this;	// complex body AST_Defun
    super_(CssStyle, self).super_var = "set from cssstyle";	//DEFPRINT(AST_SimpleStatement 137
    self.super_var = "set from cssstyle";	//DEFPRINT(AST_SimpleStatement 138
};	//class_fun_def A 106
CssStyle.prototype.setvar = function setvar(v){
    var self = this;	// complex body AST_Defun
    self.HTML_APPEARANCE_FAMILY.append(v);	//DEFPRINT(AST_SimpleStatement 140
};	//class_fun_def A 106
CssStyle.prototype.set_echo = function set_echo(a){
    var self = this;	// complex body AST_Defun
    self.echo_var = a;	//DEFPRINT(AST_SimpleStatement 142
};	//class_fun_def A 106
CssStyle = _$rapyd$_defineClassProp(CssStyle);

o = {
    "abc": 123,
    "ccc": 333
};	//DEFPRINT(AST_SimpleStatement 148

tmp = o.items();	//DEFPRINT(AST_SimpleStatement 149

var _$rapyd$_Iter2 = tmp;
for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
    _$rapyd$_Unpack = _$rapyd$_Iter2[_$rapyd$_Index2];
    k = _$rapyd$_Unpack[0];
    v = _$rapyd$_Unpack[1];
    console.log(k, v);	//DEFPRINT(AST_SimpleStatement 151
}

css = new CssStyle();	//DEFPRINT(AST_SimpleStatement 155

css.echo();	//DEFPRINT(AST_SimpleStatement 156

css.echo("super");	//DEFPRINT(AST_SimpleStatement 157

CssStyle.echo;	//DEFPRINT(AST_SimpleStatement 160
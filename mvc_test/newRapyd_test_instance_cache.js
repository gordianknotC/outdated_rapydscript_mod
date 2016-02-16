try {
    baselib = require("gordianknot/baselib.js");	//DEFPRINT(AST_SimpleStatement 3
    baselib.importALL(baselib, global);	//DEFPRINT(AST_SimpleStatement 4
    console_mode("node-codein", "forever");	//DEFPRINT(AST_SimpleStatement 5
} catch (_$Exception) {
}


var SuSuper = Callable(function SuSuper_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == typeof self) {
        self.abacwef[instance.__name__] = instance;	//DEFPRINT(AST_SimpleStatement 30
        self.wefe.append(instance);	//DEFPRINT(AST_SimpleStatement 31
    }
});	//class_fun_def A 22
SuSuper.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.ttt = {};	//DEFPRINT(AST_SimpleStatement 24
    self.wefe = [];	//DEFPRINT(AST_SimpleStatement 25
};	//class_fun_def A 22
SuSuper.prototype.susuper_method = function susuper_method(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 22
SuSuper = __defineClassProperties__(SuSuper);

var Super = Callable(function Super_(instance){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    if (typeof instance == typeof self) {
        if (isEmpty(self.ttt[instance.__name__])) {
            self.ttt[instance.__name__] = [];	//DEFPRINT(AST_SimpleStatement 44
        }
        self.ttt[instance.__name__].append(instance);	//DEFPRINT(AST_SimpleStatement 45
        if (isEmpty(self.__instance__[instance.__name__])) {
            self.__instance__[instance.__name__] = [];	//DEFPRINT(AST_SimpleStatement 47
        }
        self.__instance__[instance.__name__].append(instance);	//DEFPRINT(AST_SimpleStatement 48
    }
});	//class_fun_def A 35
Super.prototype = new SuSuper("__inheritance__", Super);	//class_fun_def C 35
Super.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 37
    self.ins = [];	//DEFPRINT(AST_SimpleStatement 38
};	//class_fun_def A 35
Super.prototype.cacheInstance = function cacheInstance(instance){
    var self = this;	// complex body AST_Defun
    self.__instance__[instance.__name__] = instance;	//DEFPRINT(AST_SimpleStatement 53
};	//class_fun_def A 35
Super.prototype.super_method_pico = function super_method_pico(){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 35
Super.prototype.echo = function echo(mode, ref){
    var self = this;	// complex body AST_Defun
    if (mode) {
    }
};	//class_fun_def A 35
Super = __defineClassProperties__(Super);

var CssStyle = Callable(function CssStyle_(init){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.data = [ 1, 2, 3, 4, 5 ];	//DEFPRINT(AST_SimpleStatement 83
    super_(CssStyle, self).__init__(self);	//DEFPRINT(AST_SimpleStatement 85
});	//class_fun_def A 64
CssStyle.prototype = new Super("__inheritance__", CssStyle);	//class_fun_def C 64
CssStyle.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];	//DEFPRINT(AST_SimpleStatement 66
    self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];	//DEFPRINT(AST_SimpleStatement 68
    self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];	//DEFPRINT(AST_SimpleStatement 69
    self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];	//DEFPRINT(AST_SimpleStatement 71
    self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];	//DEFPRINT(AST_SimpleStatement 72
};	//class_fun_def A 64
CssStyle.prototype.echo = function echo(mode){
    var self = this;	// complex body AST_Defun
    if (mode == "super") {
        super_(CssStyle, self).echo(mode, self);	//DEFPRINT(AST_SimpleStatement 91
    } else {
    }
};	//class_fun_def A 64
CssStyle.prototype.setInstanceInit = function setInstanceInit(){
    var self = this;	// complex body AST_Defun
    super_(CssStyle, self).cacheInstance(self);	//DEFPRINT(AST_SimpleStatement 97
};	//class_fun_def A 64
CssStyle.prototype.__length__ = function __length__(){
    var self = this;	// complex body AST_Defun
    return len(self.data);	//AST_Exit.DEFMETHOD( 101
};	//class_fun_def A 64
CssStyle.prototype.__length__ = property(CssStyle.prototype.__length__, CssStyle.prototype);
CssStyle = __defineClassProperties__(CssStyle);

var unittest = Callable(function unittest_(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.description = {};	//DEFPRINT(AST_SimpleStatement 107
    self.mode = null;	//DEFPRINT(AST_SimpleStatement 108
    self.unittest_args = "unittest";	//DEFPRINT(AST_SimpleStatement 109
});	//class_fun_def A 102
unittest.prototype.__classproperties__ = function __classproperties__(){
    var self = this;	// complex body AST_Defun
    self.__instance__ = {};	//DEFPRINT(AST_SimpleStatement 104
    self.__inheritance__ = [];	//DEFPRINT(AST_SimpleStatement 105
};	//class_fun_def A 102
unittest.prototype.__recordinheritance__ = function __recordinheritance__(inheriter){
    var self = this;	// complex body AST_Defun
};	//class_fun_def A 102
unittest.prototype.__call__ = function __call__(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    var caller, name;	//complex body AST_Scope declare var as local
    caller = args[args.length-1];	//DEFPRINT(AST_SimpleStatement 113
    name = caller.name;	//DEFPRINT(AST_SimpleStatement 114
    self.info(args[0]);	//DEFPRINT(AST_SimpleStatement 115
    self.info("______________________________________________________________________________");	//DEFPRINT(AST_SimpleStatement 116
};	//class_fun_def A 102
unittest.prototype.info = function info(msg){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg;	//DEFPRINT(AST_SimpleStatement 118
    color = "background: #fff; color: #222";	//DEFPRINT(AST_SimpleStatement 119
    console.info(name, color);	//DEFPRINT(AST_SimpleStatement 120
};	//class_fun_def A 102
unittest.prototype.test_ok = function test_ok(msg){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg + "\t %cOK";	//DEFPRINT(AST_SimpleStatement 122
    color = "background: #fff; color: #0092D6";	//DEFPRINT(AST_SimpleStatement 123
    console.info(name, color, "color:Blue");	//DEFPRINT(AST_SimpleStatement 124
};	//class_fun_def A 102
unittest.prototype.failed = function failed(msg, failed){
    var self = this;	// complex body AST_Defun
    var name, color;	//complex body AST_Scope declare var as local
    name = "%c" + msg + "\t %cFailed!";	//DEFPRINT(AST_SimpleStatement 126
    color = "background: #fff; color: #000000";	//DEFPRINT(AST_SimpleStatement 127
    console.info(name, color, "color:Red");	//DEFPRINT(AST_SimpleStatement 128
    console.error("\t\t" + failed);	//DEFPRINT(AST_SimpleStatement 129
};	//class_fun_def A 102
unittest.prototype.run = function run(){
    var self = this;	// complex body AST_Defun
    var s, s, key, value, successor;	//complex body AST_Scope declare var as local
    var _$iter0 = self.__inheritance__;
    for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
        successor = _$iter0[_$id0];
        s = successor();	//DEFPRINT(AST_SimpleStatement 132
        s = eval("new s");	//DEFPRINT(AST_SimpleStatement 133
        s.setUp();	//DEFPRINT(AST_SimpleStatement 134
        var _$iter1 = s.__proto__.items();
        for (var _$id1 = 0; _$id1 < _$iter1.length; _$id1++) {
            _$Unpack = _$iter1[_$id1];
            key = _$Unpack[0];
            value = _$Unpack[1];
            if ("test" == key.slice(0, 4).lower()) {
                if (self.mode == null) {
                    self.print_title(key, s);	//DEFPRINT(AST_SimpleStatement 138
                    s[key]();	//DEFPRINT(AST_SimpleStatement 139
                    console.log("\n");	//DEFPRINT(AST_SimpleStatement 140
                    console.groupEnd("[END]");	//DEFPRINT(AST_SimpleStatement 141
                    console.log("\n");	//DEFPRINT(AST_SimpleStatement 142
                }
            }
        }
        s.tearDown();	//DEFPRINT(AST_SimpleStatement 143
    }
};	//class_fun_def A 102
unittest.prototype.pyassert = function pyassert(a, okmsg, failed){
    var self = this;	// complex body AST_Defun
    if (isEmpty(a)) {
        if (!failed) {
            failed = okmsg;	//DEFPRINT(AST_SimpleStatement 146
        }
        self.failed(okmsg, failed);	//DEFPRINT(AST_SimpleStatement 147
    } else {
        self.test_ok(okmsg);	//DEFPRINT(AST_SimpleStatement 149
    }
};	//class_fun_def A 102
unittest.prototype.assertEqual = function assertEqual(a, b, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(deepEqual(a, b), ok, failed);	//DEFPRINT(AST_SimpleStatement 151
};	//class_fun_def A 102
unittest.prototype.ok = function ok(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.assertTrue(a, ok, failed);	//DEFPRINT(AST_SimpleStatement 153
};	//class_fun_def A 102
unittest.prototype.assertTrue = function assertTrue(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(a, ok, failed);	//DEFPRINT(AST_SimpleStatement 155
};	//class_fun_def A 102
unittest.prototype.assertFalse = function assertFalse(a, ok, failed){
    var self = this;	// complex body AST_Defun
    self.pyassert(!a, ok, failed);	//DEFPRINT(AST_SimpleStatement 157
};	//class_fun_def A 102
unittest.prototype.createTable = function createTable(data){
    var self = this;	// complex body AST_Defun
    console.group();	//DEFPRINT(AST_SimpleStatement 159
    console.table(data);	//DEFPRINT(AST_SimpleStatement 160
    console.groupEnd();	//DEFPRINT(AST_SimpleStatement 161
};	//class_fun_def A 102
unittest.prototype.addrow = function addrow(d){
    var self = this;	// complex body AST_Defun
    var obj, data, title;	//complex body AST_Scope declare var as local
    obj = dict(a = 1, b = 2, c = 3);	//DEFPRINT(AST_SimpleStatement 163
    data = {};	//DEFPRINT(AST_SimpleStatement 164
    title = d.title;	//DEFPRINT(AST_SimpleStatement 165
    delete d.title;	//DEFPRINT(AST_SimpleStatement 166
    data[title] = d;	//DEFPRINT(AST_SimpleStatement 167
    return data;	//AST_Exit.DEFMETHOD( 168
};	//class_fun_def A 102
unittest.prototype.print_title = function print_title(n, s){
    var self = this;	// complex body AST_Defun
    var class_name, fn_name;	//complex body AST_Scope declare var as local
    class_name = s.__name__;	//DEFPRINT(AST_SimpleStatement 170
    fn_name = n;	//DEFPRINT(AST_SimpleStatement 171
    self.info("\n");	//DEFPRINT(AST_SimpleStatement 172
    console.group("[{0}] {1}            \n".format(class_name, fn_name));	//DEFPRINT(AST_SimpleStatement 173
    self.info("______________________________________________________________________________");	//DEFPRINT(AST_SimpleStatement 174
    self.info("------------------------------------------------------------------------------");	//DEFPRINT(AST_SimpleStatement 175
};	//class_fun_def A 102
unittest = __defineClassProperties__(unittest);

var TestCase = Callable(function TestCase_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(TestCase,self).__init__.apply(self,arguments);});	//class_fun_def B 176
TestCase.prototype = new unittest("__inheritance__", TestCase);	//class_fun_def C 176
TestCase.prototype.setUp = function setUp(){
    var self = this;	// complex body AST_Defun
    self.set_some_args = 1;	//DEFPRINT(AST_SimpleStatement 178
    self.css = new CssStyle();	//DEFPRINT(AST_SimpleStatement 179
};	//class_fun_def A 176
TestCase.prototype.tearDown = function tearDown(){
    var self = this;	// complex body AST_Defun
    console.log("TestCase tearDown");	//DEFPRINT(AST_SimpleStatement 181
};	//class_fun_def A 176
TestCase.prototype.test_for_test = function test_for_test(){
    var self = this;	// complex body AST_Defun
    self("testing for property decorator and class property assignment");	//DEFPRINT(AST_SimpleStatement 183
    self.assertEqual(self.css.__length__, 5, "decorator property testing1");	//DEFPRINT(AST_SimpleStatement 184
    self.assertEqual(self.css.__length__, 3, "decorator property testing1", "css.__length__ should be 3, provided:" + self.css.__length__);	//DEFPRINT(AST_SimpleStatement 185
    self.ok(self.css.HTML_BORDER_FAMILY, "setting class property", "setting class property");	//DEFPRINT(AST_SimpleStatement 187
};	//class_fun_def A 176
TestCase = __defineClassProperties__(TestCase);

unittest.run();	//DEFPRINT(AST_SimpleStatement 189
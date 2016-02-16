

function moduleA() {
    var scope, r;	//complex body AST_Scope declare var as local
    scope = set_scope("moduleA");	//DEFPRINT(AST_SimpleStatement 7
    scope.module_variableB = 2;	//DEFPRINT(AST_SimpleStatement 9
    scope.module_variableA = 1;	//DEFPRINT(AST_SimpleStatement 10
    
    function sub_module() {
        var scope;	//complex body AST_Scope declare var as local
        scope = set_scope("moduleA.sub_module");	//DEFPRINT(AST_SimpleStatement 14
        scope.sub_module_variable = "sub";	//DEFPRINT(AST_SimpleStatement 15
        var Sub = Callable(function Sub_(){});	//class_fun_def B2 16
        Sub.prototype.echo = function echo(s){
            var self = this;	// complex body AST_Defun
            console.log("[moduleA.sub_module.echo]", s);	//DEFPRINT(AST_SimpleStatement 18
        };	//class_fun_def A 16
        Sub.prototype.get_module_scope_variable = function get_module_scope_variable(){
            var self = this;	// complex body AST_Defun
            return scope.sub_module_variable;	//AST_Exit.DEFMETHOD( 20
        };	//class_fun_def A 16
        Sub = __defineClassProperties__(Sub);
        return {
            Sub: Sub,
            scope: scope
        };	//AST_Exit.DEFMETHOD( 21
    }
    sub_module = module(sub_module);
    var RapydWeb = Callable(function RapydWeb_(){});	//class_fun_def B2 23
    RapydWeb.prototype.get_variableA = function get_variableA(){
        var self = this;	// complex body AST_Defun
        console.log("[moduleA][get_variableA] ", scope.module_variableA);	//DEFPRINT(AST_SimpleStatement 25
    };	//class_fun_def A 23
    RapydWeb.prototype.echo = function echo(s){
        var self = this;	// complex body AST_Defun
        if (self.debug) {
            return s;	//AST_Exit.DEFMETHOD( 28
        }
    };	//class_fun_def A 23
    RapydWeb = __defineClassProperties__(RapydWeb);
    RapydWeb.prototype.debug = false;	//DEFPRINT(AST_SimpleStatement 29
    var Controller = Callable(function Controller_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(Controller,self).__init__.apply(self,arguments);});	//class_fun_def B 30
    Controller.prototype = new RapydWeb("__inheritance__", Controller);	//class_fun_def C 30
    Controller.prototype.get_module_variableA = function get_module_variableA(){
        var self = this;	// complex body AST_Defun
        console.log("\t[moduleA][Controller][Get] module_variableA = ", scope.module_variableA);	//DEFPRINT(AST_SimpleStatement 33
    };	//class_fun_def A 30
    Controller.prototype.set_module_variableA = function set_module_variableA(value){
        var self = this;	// complex body AST_Defun
        console.log("\t[moduleA][Controller][Set] set moduleA's module_variableA to", value);	//DEFPRINT(AST_SimpleStatement 35
        scope.module_variableA = value;	//DEFPRINT(AST_SimpleStatement 36
    };	//class_fun_def A 30
    Controller = __defineClassProperties__(Controller);
    r = new RapydWeb();	//DEFPRINT(AST_SimpleStatement 38
    r.get_variableA();	//DEFPRINT(AST_SimpleStatement 39
    return {
        RapydWeb: RapydWeb,
        Controller: Controller,
        scope: scope,
        sub_module: sub_module
    };	//AST_Exit.DEFMETHOD( 41
}
moduleA = module(moduleA);



function moduleB() {
    var core, RapydWeb, Controller, scope_A;	//complex body AST_Scope declare var as local
    core = moduleA;	//DEFPRINT(AST_SimpleStatement 46
    console.log('\t[moduleB] set moduleA"s debug mode to True');	//DEFPRINT(AST_SimpleStatement 48
    core.RapydWeb.prototype.debug = true;	//DEFPRINT(AST_SimpleStatement 49
    _$Unpack = [core.RapydWeb, core.Controller, core.scope];	//DEFPRINT(AST_Assign 51
    RapydWeb = _$Unpack[0];
    Controller = _$Unpack[1];
    scope_A = _$Unpack[2];	//DEFPRINT(AST_SimpleStatement 51
    var BlogController = Callable(function BlogController_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(BlogController,self).__init__.apply(self,arguments);});	//class_fun_def B 54
    BlogController.prototype = new Controller("__inheritance__", BlogController);	//class_fun_def C 54
    BlogController = __defineClassProperties__(BlogController);
    var ModController = Callable(function ModController_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(ModController,self).__init__.apply(self,arguments);});	//class_fun_def B 55
    ModController.prototype = new Controller("__inheritance__", ModController);	//class_fun_def C 55
    ModController.prototype.get_module_variableA = function get_module_variableA(){
        var self = this;	// complex body AST_Defun
        console.log("\t[moduleB][ModController][Get] module_variableA = ", scope_A.module_variableA);	//DEFPRINT(AST_SimpleStatement 58
    };	//class_fun_def A 55
    ModController.prototype.set_module_variableA = function set_module_variableA(value){
        var self = this;	// complex body AST_Defun
        console.log("\t[moduleB][ModController][Set] set scopeA's module_variableA to", value);	//DEFPRINT(AST_SimpleStatement 60
        scope_A.module_variableA = value;	//DEFPRINT(AST_SimpleStatement 61
    };	//class_fun_def A 55
    ModController = __defineClassProperties__(ModController);
    return {
        BlogController: BlogController,
        ModController: ModController
    };	//AST_Exit.DEFMETHOD( 63
}
moduleB = module(moduleB);

core = moduleA;	//DEFPRINT(AST_SimpleStatement 66

rapyd = cls(core.RapydWeb, "init");	//DEFPRINT(AST_SimpleStatement 67

rapyd.c = cls(core.Controller, "init");	//DEFPRINT(AST_SimpleStatement 68

console.log("===== test for class property of RapydWeb inside moduleA =====================");	//DEFPRINT(AST_SimpleStatement 70

console.log("");	//DEFPRINT(AST_SimpleStatement 71

console.log('----- change moduleA"s debug mode from main scope-----');	//DEFPRINT(AST_SimpleStatement 73

console.log("\tdefault debug mode of moduleA = ", rapyd.debug);	//DEFPRINT(AST_SimpleStatement 74

console.log("\techo = ", rapyd.c.echo("[moduleA.controller.echo]") || "no output");	//DEFPRINT(AST_SimpleStatement 75

console.log("\tset moduleA's debug mode to True from outer scope of moduleA");	//DEFPRINT(AST_SimpleStatement 76

core.RapydWeb.prototype.debug = true;	//DEFPRINT(AST_SimpleStatement 77

console.log("\tcurrent debug mode = ", rapyd.debug);	//DEFPRINT(AST_SimpleStatement 78

console.log("\techo = ", rapyd.c.echo("[moduleA.controller.echo]" || "no output"));	//DEFPRINT(AST_SimpleStatement 79

console.log("\tset moduleA's debug mode to False from outer scope of moduleA");	//DEFPRINT(AST_SimpleStatement 80

core.RapydWeb.prototype.debug = false;	//DEFPRINT(AST_SimpleStatement 81

console.log("");	//DEFPRINT(AST_SimpleStatement 82

console.log('----- change moduleA"s debug mode from moduleB -----');	//DEFPRINT(AST_SimpleStatement 85

console.log("\tbefore initialize moduleB, debug mode = ", rapyd.debug);	//DEFPRINT(AST_SimpleStatement 86

app = module(moduleB);	//DEFPRINT(AST_SimpleStatement 89

console.log("\tafter initialize moduleB, debug mode = ", rapyd.debug);	//DEFPRINT(AST_SimpleStatement 90

rapyd.c.blog = cls(app.BlogController, "init");	//DEFPRINT(AST_SimpleStatement 91

rapyd.c.mod = cls(app.ModController, "init");	//DEFPRINT(AST_SimpleStatement 92

console.log("\techo = ", rapyd.c.blog.echo("[moduleBblogg.echo]" || "no output"));	//DEFPRINT(AST_SimpleStatement 93

console.log("");	//DEFPRINT(AST_SimpleStatement 94

console.log("");	//DEFPRINT(AST_SimpleStatement 95

console.log("===== test for module-scope variable =====================");	//DEFPRINT(AST_SimpleStatement 96

console.log("");	//DEFPRINT(AST_SimpleStatement 97

console.log("");	//DEFPRINT(AST_SimpleStatement 98

rapyd.c.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 99

rapyd.c.set_module_variableA("A1");	//DEFPRINT(AST_SimpleStatement 100

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);	//DEFPRINT(AST_SimpleStatement 101

rapyd.c.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 102

rapyd.c.mod.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 103

rapyd.c.mod.set_module_variableA("B1");	//DEFPRINT(AST_SimpleStatement 104

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);	//DEFPRINT(AST_SimpleStatement 105

rapyd.c.mod.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 106

rapyd.c.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 107

rapyd.c.mod.set_module_variableA("B2");	//DEFPRINT(AST_SimpleStatement 108

console.log("\t[main][Get] module_variableA = ", moduleA.prototype.module_variableA);	//DEFPRINT(AST_SimpleStatement 109

rapyd.c.mod.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 110

rapyd.c.get_module_variableA();	//DEFPRINT(AST_SimpleStatement 111
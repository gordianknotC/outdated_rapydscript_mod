function Callable(__init__) {
    function Class() {
        function obj() {
            Class.prototype.__call__.apply(this, arguments);	//DEFPRINT(AST_SimpleStatement 9
        }
        obj.__proto__ = Class.prototype;	//DEFPRINT(AST_SimpleStatement 10
        obj.__name__ = __init__.name;	//DEFPRINT(AST_SimpleStatement 11
        obj.__init__ = __init__;	//DEFPRINT(AST_SimpleStatement 12
        __init__.apply(obj.arguments);	//DEFPRINT(AST_SimpleStatement 13
        return obj;	//AST_Exit.DEFMETHOD( 14
    }
    Class.prototype.__init__ = __init__;	//DEFPRINT(AST_SimpleStatement 15
    return Class;	//AST_Exit.DEFMETHOD( 16
}

var API = Callable(function API(){
    var self = this;	// complex body AST_Defun
    if (arguments[0] == "__inheritance__") return;
    self.prop = "oweifjiefj";	//DEFPRINT(AST_SimpleStatement 23
    self.data = [];	//DEFPRINT(AST_SimpleStatement 24
    self.tags = [ "HTML", "HTML5", "CSS" ];	//DEFPRINT(AST_SimpleStatement 25
});	//class_fun_def A 21
API.prototype = new object("__inheritance__");	//class_fun_def C 21
API.prototype.__call__ = function __call__(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    console.log.apply(console, [].concat(args));	//DEFPRINT(AST_SimpleStatement 27
};	//class_fun_def A 21
API.prototype.boss = function boss(){
    var self = this;	// complex body AST_Defun
    var args = [].slice.call(arguments, 0);
    console.log.apply(console, [self.prop].concat(args));	//DEFPRINT(AST_SimpleStatement 29
};	//class_fun_def A 21


a = new API();	//DEFPRINT(AST_SimpleStatement 31

a(".call() invacation");	//DEFPRINT(AST_SimpleStatement 32

a.boss(".boss() invocation");	//DEFPRINT(AST_SimpleStatement 33
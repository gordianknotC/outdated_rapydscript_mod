function re() {
}
re.compile = function compile(self, s){
    _$rapyd$_unbindAll(this, true);
    var regex;
    regex = eval("new RegExp");	//DEFPRINT(AST_SimpleStatement 9
    regex.compile(s);	//DEFPRINT(AST_SimpleStatement 10
    return regex;	//AST_Exit.DEFMETHOD( 11
};	//class_fun_def 6

try {
    re.compile("abc");	//DEFPRINT(AST_SimpleStatement 14
    r = new re();	//DEFPRINT(AST_SimpleStatement 16
    r.compile();	//DEFPRINT(AST_SimpleStatement 17
} catch (_$rapyd$_Exception) {
}
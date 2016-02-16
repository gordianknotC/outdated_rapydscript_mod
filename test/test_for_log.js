function _$rapyd$_bind(fn, thisArg) {
    if (fn.orig) fn = fn.orig;	
    var ret = function() {
        fn.caller = ret.orig.caller;	
        return fn.apply(thisArg, arguments);	
    }
    ret.orig = fn;	
    return ret;	
}
function _$rapyd$_unbindAll() {
}
"\n    Tow issues about _$rapyd$_bind and anonymous class function:\n    consider the following code:\n\n";	

function Logger() {
    this.log = _$rapyd$_bind(this.log, this);	
    this.log_caller = _$rapyd$_bind(this.log_caller, this);	
}
Logger.prototype.log = function log(){
    var self = this;	
    var args = [].slice.call(arguments, 0);	
    _$rapyd$_unbindAll(this, true);	
    var caller_name;	
    if (self.log.caller) {
        caller_name = "[" + self.log.caller.name + "]";	
        args.insert(0, caller_name);	
    }
    console.log.apply(console, [].concat(args));	
};	
Logger.prototype.log_caller = function log_caller(){
    var self = this;	
    var args = [].slice.call(arguments, 0);	
    _$rapyd$_unbindAll(this, true);	
    self.log.apply(self, [].concat(args));	
};	

logger = new Logger();	

logger.log("from main");	

logger.log_caller("call log inside Logger");	

function test() {
    _$rapyd$_unbindAll(this, true);	
    var logger;	
    logger = new Logger();	
    logger.log("call log outside Logger");	
}

test();	

"\n\t1/ caller reference was miswitched inside _$rapyd$_bind\n\n    When invoking logger.log through logger.log_caller, we actually calling it, through a mediator, _$rapyd$_bind.\n    In this process_general_config of mediating between two functions, the intended caller of logger.log_caller(ret.orig.caller) was\n    miswitched to _$rapyd$_bind generated wrapper 'ret'. When calling logger.log through logger.log_caller, We want the\n    actual caller of logger.log to be logger.log_caller not _$rapyd$_bind!\n\n    to solve it assign re.orig.caller to fn.caller.\n";

"\n\t2/ class functions in rapydscript was default to anonymous function\n\n\tBy default, rapydscript use anonymous function assigned to class function. It's ok in most cases, but what if we want\n\tto access class function name? In Javascript , \n";	

console.log(logger.log.name);	

console.log(logger.log_caller.name);	
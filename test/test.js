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
function log() {
    _$rapyd$_unbindAll(this, true);	
    console.log("naming pollution0");	
}

function insert(lst, index, value) {
    _$rapyd$_unbindAll(this, true);	
    var l, r, l;	
    value = [ value ];	
    l = lst.slice(0, index);	
    r = lst.slice(index);	
    l = l.concat(value);	
    return l.concat(r);	
}

function Logger() {
    this.log = _$rapyd$_bind(this.log, this);	
    this.log_caller = _$rapyd$_bind(this.log_caller, this);	
}
Logger.prototype.log = function log(){
    var self = this;	
    var args = [].slice.call(arguments, 0);	
    _$rapyd$_unbindAll(this, true);	
    var caller_name, args;	
    if (self.log.caller.name) {
        caller_name = "[" + self.log.caller.name + "]";	
        args = insert(args, 0, caller_name);	
    }
    console.log.apply(console, [].concat(args));	
};	
Logger.prototype.log_caller = function log_caller(){
    var self = this;	
    var args = [].slice.call(arguments, 0);	
    _$rapyd$_unbindAll(this, true);	
    self.log.apply(self, [].concat(args));	
};	

log();	

l = new Logger();	

l.log("Logger.log");	

l.log_caller();	
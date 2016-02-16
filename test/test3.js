
function decorator(f) {
    function new_f() {
        f();
    }
    return new_f;
}

function work() {
}
work = decorator(work);


function not_work() {
    function ABC() {}
    ABC.prototype.abc = function(){
        var self = this;
    };
    ABC.prototype.ccc = function(){
        var self = this;
    };
}
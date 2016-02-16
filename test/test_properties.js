function property(f) {
    _$rapyd$_unbindAll(this, true);
    var ref, attr;
    function empty() {
        _$rapyd$_unbindAll(this, true);
    }
    ref = f("init");
    attr = f.name;
    ref.prototype["_$" + attr] = ref.prototype[attr];
    ref.prototype.__defineSetter__(attr, empty);
    ref.prototype.__defineGetter__(attr, ref.prototype["_$" + attr]);
}

function ABC(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.__length__ = _$rapyd$_bind(this.__length__, this);
    self.data = [ 1, 2, 3, 4, 5 ];
};
ABC.prototype.__length__ = function __length__(init){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    if (init) {
        return ABC;
    } else {
        return len(self.data);
    }
};
ABC.prototype.__length__ = property(ABC.prototype.__length__);

a = new ABC();

a.__length__;
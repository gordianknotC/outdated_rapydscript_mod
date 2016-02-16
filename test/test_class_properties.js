function class_properties(cls, props) {
    _$rapyd$_unbindAll(this, true);
    var k, v;
    if (!cls.prototype.__classproperty__) {
        function getter(_cls, k) {
            _$rapyd$_unbindAll(this, true);
            function wrapper() {
                _$rapyd$_unbindAll(this, true);
                return _cls.prototype[k];
            }
            return wrapper;
        }
        function setter(_cls, k) {
            _$rapyd$_unbindAll(this, true);
            function wrapper(value) {
                _$rapyd$_unbindAll(this, true);
                _cls.prototype[k] = value;
            }
            return wrapper;
        }
        var _$rapyd$_Iter0 = dict.items(props);
        for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
            _$rapyd$_Unpack = _$rapyd$_Iter0[_$rapyd$_Index0];
            k = _$rapyd$_Unpack[0];
            v = _$rapyd$_Unpack[1];
            console.log(k, v);
            cls.prototype[k] = v;
            cls.__defineGetter__(k, getter(cls, k));
            cls.__defineSetter__(k, setter(cls, k));
        }
        cls.prototype.__classproperty__ = true;
    }
}

function classprop_init(f) {
    _$rapyd$_unbindAll(this, true);
    eval('new f("classprop_init")');
    return f;
}



function CssStyle(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.setvar = _$rapyd$_bind(this.setvar, this);
    this.test2 = _$rapyd$_bind(this.test2, this);
    if (arguments[0] == "classprop_init") {
        self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];
        self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];
        self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];
        self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];
        self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];
        class_properties(CssStyle, self);
    } else {
    }
};
CssStyle.prototype.setvar = function setvar(v){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    self.HTML_APPEARANCE_FAMILY.append(v);
};
CssStyle.prototype.test2 = function test2(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
};
CssStyle = classprop_init(CssStyle);

CssStyle.HTML_APPEARANCE_FAMILY;

css1 = new CssStyle();

css1.HTML_APPEARANCE_FAMILY;

css1.HTML_APPEARANCE_FAMILY = [ "changeprop" ];

CssStyle.HTML_APPEARANCE_FAMILY;

CssStyle.HTML_APPEARANCE_FAMILY = [];

css2 = new CssStyle();

css2.HTML_APPEARANCE_FAMILY;

pattern = new RegExp("(?:a\bcdea\fghijklmopq\rs\twyz)", "g");

pattern = new RegExp("(?:^(\\w+)[\\s]*[=][\\s]*new[\\s]*(\\w+)() western", "g");

pattern = new RegExp("(?:^(w+)[s]*[=][s]*new[s]*(w+)() western", "g");

pattern = eval(pattern);
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

function Super(){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    if (arguments[0] == "classprop_init") {
        self.__instance__ = {};
        class_properties(Super, self);
    } else {
    }
};



function CssStyle(targets){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    this.setStyle = _$rapyd$_bind(this.setStyle, this);
    this.parseStyle = _$rapyd$_bind(this.parseStyle, this);
    if (targets == "classprop_init") {
        self.HTML_BORDER_FAMILY = [ "border", "border-top", "border-bottom", "border-left", "border-right", "border-width", "border-style" ];
        self.HTML_BACKGROUND_FAMILY = [ "background", "background-color", "background-image" ];
        self.HTML_POSITIONING_FAMILY = [ "position", "left", "right", "top", "bottom", "z-index", "pos", "pos_hint", "float", "overflow", "x", "y", "z" ];
        self.HTML_APPEARANCE_FAMILY = [ "width", "height", "size", "size_hint" ];
        self.HTML_TEXT_FAMILY = [ "font-family", "font-size", "color", "font-weight", "font-style", "text-decoration", "text-align", "line-height", "letter-spacing", "text-indent", "text-transform", "vertical-align" ];
        class_properties(CssStyle, self);
    } else if (targets) {
        self.targets = targets;
    }
};
CssStyle.prototype.setStyle = function setStyle(k, v){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var target;
    var _$rapyd$_Iter1 = self.targets;
    for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
        target = _$rapyd$_Iter1[_$rapyd$_Index1];
        target.style[k] = v;
    }
};
CssStyle.prototype.parseStyle = function parseStyle(styles){
    var self = this;
    _$rapyd$_unbindAll(this, true);
    var k, v, pos_arr, x, y, x, y, z, w, h, style;
    styles = styles.split(";").slice(0, -1);
    var _$rapyd$_Iter2 = styles;
    for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
        style = _$rapyd$_Iter2[_$rapyd$_Index2];
        k = style.split(":")[0].strip();
        v = style.split(":")[1].strip();
        if (_$rapyd$_in(k, self.HTML_POSITIONING_FAMILY)) {
            if (k == "pos") {
                pos_arr = v.split(",");
                if (len(pos_arr) == 2) {
                    _$rapyd$_Unpack = pos_arr;
                    x = _$rapyd$_Unpack[0];
                    y = _$rapyd$_Unpack[1];
                } else if (len(pos_arr) == 3) {
                    _$rapyd$_Unpack = pos_arr;
                    x = _$rapyd$_Unpack[0];
                    y = _$rapyd$_Unpack[1];
                    z = _$rapyd$_Unpack[2];
                    self.setStyle("z-index", z);
                } else {
                    throw "Invalid pos format: {0}".format(style);
                }
                self.setStyle("left", x);
                self.setStyle("top", y);
            } else if (k == "pos_hint") {
            }
            console.log(k, v);
        } else if (_$rapyd$_in(k, self.HTML_BACKGROUND_FAMILY)) {
            console.log(k, v);
        } else if (_$rapyd$_in(k, self.HTML_APPEARANCE_FAMILY)) {
            if (k == "size") {
                _$rapyd$_Unpack = v.split(",");
                w = _$rapyd$_Unpack[0];
                h = _$rapyd$_Unpack[1];
                self.setStyle("width", w);
                self.setStyle("height", h);
            } else if (k == "size_hint") {
            }
            console.log(k, v);
        } else if (_$rapyd$_in(k, self.HTML_BORDER_FAMILY)) {
            console.log(k, v);
        } else if (_$rapyd$_in(k, self.HTML_TEXT_FAMILY)) {
            console.log(k, v);
        } else {
            throw "Invalid or unsupported Style tag: {0}".format(k);
        }
        self.setStyle(k, v);
    }
};
CssStyle = classprop_init(CssStyle);

target = jQuery("custombutton#custom_bt1");

css = new CssStyle(target);

css.parseStyle("position: absolute;left: 111;top: 111;width: 77;height: 88;border: solid 1px #ff00ff;background-color:#334400;");

target = "jQuery('custombutton#custom_bt1')";

_$rapyd$_print("CssStyle.HTML_APPEARANCE_FAMILY:", CssStyle.HTML_APPEARANCE_FAMILY);

_$rapyd$_print("css1 = CssStyle(target)");

css1 = new CssStyle(target);

_$rapyd$_print("css1.HTML_APPEARANCE_FAMILY:", css1.HTML_APPEARANCE_FAMILY);

_$rapyd$_print("set HTML_APPEARANCE_FAMILY to []");

CssStyle.HTML_APPEARANCE_FAMILY = [];

_$rapyd$_print("css2 = CssStyle(target)");

css2 = new CssStyle(target);

_$rapyd$_print("css2.HTML_APPEARANCE_FAMILY", css2.HTML_APPEARANCE_FAMILY);

'\noutputs:\n\nCssStyle.HTML_APPEARANCE_FAMILY: \t["width","height","size","size_hint"]\ncss1 = CssStyle(target)\ncss1.HTML_APPEARANCE_FAMILY: \t\t["width","height","size","size_hint"]\n\nset HTML_APPEARANCE_FAMILY to \t\t[]\n\ncss2 = CssStyle(target)\ncss2.HTML_APPEARANCE_FAMILY:\t\t[]\n\n\n';
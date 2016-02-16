function script_ready(scripts) {
    console.log("script ready,..loaded scripts:", scripts);	//DEFPRINT(AST_SimpleStatement 5
    test1();	//DEFPRINT(AST_SimpleStatement 6
}

function document_ready() {
    var essentialibs;	//complex body AST_Scope declare var as local
    console.log("dict = ", dict);	//DEFPRINT(AST_SimpleStatement 8
    essentialibs = [ "stdlib.js", "stdlib2.js", "baselib.js", "RapydMVC_module_ver.js" ];	//DEFPRINT(AST_SimpleStatement 9
    require(essentialibs, essentialibs);	//DEFPRINT(AST_SimpleStatement 10
}

function require(modules, essentialibs) {
    var loaded_modules, tmp, length, current_module, url, i;	//complex body AST_Scope declare var as local
    loaded_modules = [];	//DEFPRINT(AST_SimpleStatement 12
    function callback(current_module, _essentialibs, _loaded_modules) {
        function is_essential_loaded(_essentialibs, _loaded_modules) {
            var l, r, matches, l_mod, r_mod, matches, j, i;	//complex body AST_Scope declare var as local
            l = _essentialibs.length;	//DEFPRINT(AST_SimpleStatement 15
            r = _loaded_modules.length;	//DEFPRINT(AST_SimpleStatement 16
            matches = 0;	//DEFPRINT(AST_SimpleStatement 17
            for (i = 0; i < l; i++) {
                l_mod = _essentialibs[i];	//DEFPRINT(AST_SimpleStatement 19
                for (j = 0; j < r; j++) {
                    r_mod = _loaded_modules[j];	//DEFPRINT(AST_SimpleStatement 21
                    if (l_mod == r_mod) {
                        matches += 1;	//DEFPRINT(AST_SimpleStatement 22
                    }
                }
            }
            if (matches == l) {
                return true;	//AST_Exit.DEFMETHOD( 24
            } else {
                return false;	//AST_Exit.DEFMETHOD( 25
            }
        }
        function wrapper() {
            _loaded_modules.push(current_module);	//DEFPRINT(AST_SimpleStatement 27
            if (is_essential_loaded(_essentialibs, _loaded_modules)) {
                script_ready(_loaded_modules);	//DEFPRINT(AST_SimpleStatement 29
            } else {
                console.info("module:", current_module, "loaded!", _loaded_modules.length);	//DEFPRINT(AST_SimpleStatement 31
                console.info(_essentialibs, _loaded_modules);	//DEFPRINT(AST_SimpleStatement 32
            }
        }
        return wrapper;	//AST_Exit.DEFMETHOD( 33
    }
    tmp = [];	//DEFPRINT(AST_SimpleStatement 34
    length = modules.length;	//DEFPRINT(AST_SimpleStatement 35
    for (i = 0; i < length; i++) {
        current_module = modules[i];	//DEFPRINT(AST_SimpleStatement 38
        url = modules[i];	//DEFPRINT(AST_SimpleStatement 39
        jQuery.getScript(url, callback(current_module, essentialibs, loaded_modules));	//DEFPRINT(AST_SimpleStatement 40
    }
}

jQuery.require = require;	//DEFPRINT(AST_SimpleStatement 42

jQuery(document).ready(document_ready);	//DEFPRINT(AST_SimpleStatement 43

var CustomButton = Callable(function CustomButton_(){var self = this; if (arguments[0] == "__inheritance__") return;super_(CustomButton,self).__init__.apply(self,arguments);});	//class_fun_def B 46
CustomButton.prototype = new Button("__inheritance__", CustomButton);	//class_fun_def C 46
CustomButton.prototype.clearbt = function clearbt(){
    var self = this;	// complex body AST_Defun
    var bt;	//complex body AST_Scope declare var as local
    var _$iter0 = self.groups[self];
    for (var _$id0 = 0; _$id0 < _$iter0.length; _$id0++) {
        bt = _$iter0[_$id0];
        if (bt.id != self.id) {
            bt.clear();	//DEFPRINT(AST_SimpleStatement 50
        }
    }
};	//class_fun_def A 46
CustomButton.prototype.clear = function clear(){
    var self = this;	// complex body AST_Defun
    self.state == self.States.default;	//DEFPRINT(AST_SimpleStatement 52
};	//class_fun_def A 46
CustomButton.prototype.action = function action(){
    var self = this;	// complex body AST_Defun
    var i;	//complex body AST_Scope declare var as local
    for (i = 0; i < 10; i++) {
        print;	//DEFPRINT(AST_SimpleStatement 55
        123123;	//DEFPRINT(AST_SimpleStatement 55
    }
};	//class_fun_def A 46
CustomButton = __defineClassProperties__(CustomButton);

bt1 = new CustomButton();	//DEFPRINT(AST_SimpleStatement 56

bt1.setattr("custom1", bt1.val1);	//DEFPRINT(AST_SimpleStatement 57

bt1.setattr("custom2", "val2");	//DEFPRINT(AST_SimpleStatement 58

bt1.setattr("html_id", css("CustomButton[ref]"));	//DEFPRINT(AST_SimpleStatement 59

bt1.setattr("state", bt1.default_state);	//DEFPRINT(AST_SimpleStatement 60

bt1.setattr("on_press", bt1.action());	//DEFPRINT(AST_SimpleStatement 61

bt1.setattr("on_release", bt1.clear);	//DEFPRINT(AST_SimpleStatement 62

_states = States();	//DEFPRINT(AST_SimpleStatement 63

_states.setTarget(bt1);	//DEFPRINT(AST_SimpleStatement 64

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 65

_state.setName("default" | "onPress");	//DEFPRINT(AST_SimpleStatement 66

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 67

_state.setName("hold" | "clear");	//DEFPRINT(AST_SimpleStatement 68

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 69

_state.watch("background_color", {
    "if_setter": "'bg'",
    "if_con": [ _state.state, " == ", "'default'" ],
    "else_setter": "'green'",
    "if_setted": "background_color"
});	//DEFPRINT(AST_SimpleStatement 70

_state.setAttr("background_image", "bg");	//DEFPRINT(AST_SimpleStatement 71

_state.setName(stateNaming);	//DEFPRINT(AST_SimpleStatement 72

_state.setAttr("customAttr", customeAttr);	//DEFPRINT(AST_SimpleStatement 73

_state.watch("setattr", {
    "else_clause": {
        "setted": bt1.name,
        "pass": "",
        "setter": "'final'"
    },
    "elif_clause": [ {
        "setted": _state.name,
        "pass": "",
        "condition": [ _state.state, " == ", "'ccc'" ],
        "setter": "'anaother';"
    }, {
        "setted": bt1.name,
        "pass": "",
        "condition": [ "_state.state = 'ddd'" ],
        "setter": "'anoather elif';"
    } ],
    "if_clause": {
        "setted": _state.name,
        "pass": "",
        "condition": [ _state.state, " == ", "'aaa'" ],
        "setter": "'pressed';"
    }
});	//DEFPRINT(AST_SimpleStatement 74

_anime = _state.setAnime();	//DEFPRINT(AST_SimpleStatement 75

_anime.setAttr("pos", x, y);	//DEFPRINT(AST_SimpleStatement 76

_anime.setAttr("size", w, h);	//DEFPRINT(AST_SimpleStatement 77

_anime.setAttr("color", c);	//DEFPRINT(AST_SimpleStatement 78

_tween = _anime.setTwn();	//DEFPRINT(AST_SimpleStatement 79

_tween(xx);	//DEFPRINT(AST_SimpleStatement 80

_states = States();	//DEFPRINT(AST_SimpleStatement 81

_states.setTarget(css);	//DEFPRINT(AST_SimpleStatement 82

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 83

_state.setName("default" | "onPress");	//DEFPRINT(AST_SimpleStatement 84

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 85

_state.setName("hold" | "clear");	//DEFPRINT(AST_SimpleStatement 86

_states.addState(state);	//DEFPRINT(AST_SimpleStatement 87

_state.setAttr("background_color", "bg");	//DEFPRINT(AST_SimpleStatement 88

_state.setAttr("background_image", "bg");	//DEFPRINT(AST_SimpleStatement 89

_state.setName(stateNaming);	//DEFPRINT(AST_SimpleStatement 90

_state.setAttr("customAttr", customeAttr);	//DEFPRINT(AST_SimpleStatement 91

_state.watch("setAttr", {
    "if_setter": "'pressed'",
    "if_con": [ _state.state, " == ", "'aaa'" ],
    "else_setter": "'abc'",
    "if_setted": _state.name
});	//DEFPRINT(AST_SimpleStatement 92

_anime = _state.setAnime();	//DEFPRINT(AST_SimpleStatement 93

_anime.setAttr("pos", x, y);	//DEFPRINT(AST_SimpleStatement 94

_anime.setAttr("size", w, h);	//DEFPRINT(AST_SimpleStatement 95

_anime.setAttr("color", c);	//DEFPRINT(AST_SimpleStatement 96

_tween = _anime.setTwn();	//DEFPRINT(AST_SimpleStatement 97

_tween(xx);	//DEFPRINT(AST_SimpleStatement 98
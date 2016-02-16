function script_ready(scripts) {
	console.log("script ready,..loaded scripts:", scripts);
	test1();
}
function document_ready() {
	var essentialibs;
	console.log("dict = ", dict);
	essentialibs = [ "stdlib.js", "stdlib2.js", "baselib.js", "RapydMVC_module_ver.js" ];
	require(essentialibs, essentialibs);
}
function require(modules, essentialibs) {
	var loaded_modules, tmp, length, current_module, url, i;
	loaded_modules = [];
	function callback(current_module, _essentialibs, _loaded_modules) {
		function is_essential_loaded(_essentialibs, _loaded_modules) {
			var l, r, matches, l_mod, r_mod, matches, j, i;
			l = _essentialibs.length;
			r = _loaded_modules.length;
			matches = 0;
			for (i = 0; i < l; i++) {
				l_mod = _essentialibs[i];
				for (j = 0; j < r; j++) {
					r_mod = _loaded_modules[j];
					if (l_mod == r_mod) {
						matches += 1;
					}
				}
			}
			if (matches == l) {
				return true;
			} else {
				return false;
			}
		}

		function wrapper() {
			_loaded_modules.push(current_module);
			if (is_essential_loaded(_essentialibs, _loaded_modules)) {
				script_ready(_loaded_modules);
			} else {
				console.info("module:", current_module, "loaded!", _loaded_modules.length);
				console.info(_essentialibs, _loaded_modules);
			}
		}

		return wrapper;
	}

	tmp = [];
	length = modules.length;
	for (i = 0; i < length; i++) {
		current_module = modules[i];
		url = modules[i];
		jQuery.getScript(url, callback(current_module, essentialibs, loaded_modules));
	}
}
jQuery.require = require;
jQuery(document).ready(document_ready);
function CustomButton() {
	Button.prototype.constructor.apply(this, arguments);
}
CustomButton.prototype = new Button();
CustomButton.prototype.constructor = CustomButton;
CustomButton.prototype.clearbt = function () {
	var self = this;
	var bt;
	var _$rapyd$_Iter0 = self.groups[self];
	for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
		bt = _$rapyd$_Iter0[_$rapyd$_Index0];
		if (bt.id != self.id) {
			bt.clear();
		}
	}
};
CustomButton.prototype.clear = function () {
	var self = this;
	self.state == self.States.default;
};
CustomButton.prototype.action = function () {
	var self = this;
	var i;
	for (i = 0; i < 10; i++) {
		print;
		123123;
	}
};
bt1 = new CustomButton();
bt1.setattr("custom1", bt1.val1);
bt1.setattr("custom2", "val2");
bt1.setattr("html_id", css("CustomButton[ref]"));
bt1.setattr("state", bt1.default_state);
bt1.setattr("on_press", bt1.action());
bt1.setattr("on_release", bt1.clear);
_states = States();
_states.setTarget(bt1);
_states.addState(state);
_state.setName("default" | "onPress");
_states.addState(state);
_state.setName("hold" | "clear");
_states.addState(state);
_state.watch("background_color", {
	"if_setter"  : "'bg'",
	"if_con"     : [ _state.state, " == ", "'default'" ],
	"else_setter": "'green'",
	"if_setted"  : "background_color"
});
_state.setAttr("background_image", "bg");
_state.setName(stateNaming);
_state.setAttr("customAttr", customeAttr);
_state.watch("setattr", {
	"else_clause": {
		"setted": bt1.name,
		"pass"  : "",
		"setter": "'final'"
	},
	"elif_clause": [
		{
			"setted"   : _state.name,
			"pass"     : "",
			"condition": [ _state.state, " == ", "'ccc'" ],
			"setter"   : "'anaother';"
		},
		{
			"setted"   : bt1.name,
			"pass"     : "",
			"condition": [ "_state.state = 'ddd'" ],
			"setter"   : "'anoather elif';"
		}
	],
	"if_clause"  : {
		"setted"   : _state.name,
		"pass"     : "",
		"condition": [ _state.state, " == ", "'aaa'" ],
		"setter"   : "'pressed';"
	}
});
_anime = _state.setAnime();
_anime.setAttr("pos", x, y);
_anime.setAttr("size", w, h);
_anime.setAttr("color", c);
_tween = _anime.setTwn();
_tween(xx);
_states = States();
_states.setTarget(css);
_states.addState(state);
_state.setName("default" | "onPress");
_states.addState(state);
_state.setName("hold" | "clear");
_states.addState(state);
_state.setAttr("background_color", "bg");
_state.setAttr("background_image", "bg");
_state.setName(stateNaming);
_state.setAttr("customAttr", customeAttr);
_state.watch("setAttr", {
	"if_setter"  : "'pressed'",
	"if_con"     : [ _state.state, " == ", "'aaa'" ],
	"else_setter": "'abc'",
	"if_setted"  : _state.name
});
_anime = _state.setAnime();
_anime.setAttr("pos", x, y);
_anime.setAttr("size", w, h);
_anime.setAttr("color", c);
_tween = _anime.setTwn();
_tween(xx);
(function(){
    var ViewComponent, Rectangle, Button, States;
    ViewComponent = RapydMVC.UiKit.ViewComponent;
    Rectangle = RapydMVC.UiKit.Rectangle;
    Button = RapydMVC.UiKit.Button;
    States = RapydMVC.UiKit.States;
    function a3b5ed1_4645_49bc_9fb1_4bd95a8a580b() {
        var root, bt1, bt2, _states, _state, _anime, _tween, __comp_data__;
        root = ViewComponent;
        function CustomButton() {
            CustomButton.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(CustomButton, Button);
        CustomButton.prototype.__init__ = function __init__(){
            var self = this;
            super_(CustomButton, self).constructor(self);
        };
        CustomButton.prototype.clearbt = function clearbt(){
            var self = this;
            var bt;
            var _$rapyd$_Iter0 = self.groups[self];
            for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
                bt = _$rapyd$_Iter0[_$rapyd$_Index0];
                if (bt.id !== self.id) {
                    bt.clear();
                }
            }
        };
        CustomButton.prototype.clear = function clear(){
            var self = this;
            self.state === self.States.default;
        };
        CustomButton.prototype.action = function action(){
            var self = this;
            var i;
            for (i = 0; i < 10; i++) {
                print;
                123123;
            }
        };

        function SubCustomButton() {
            SubCustomButton.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(SubCustomButton, Button);
        SubCustomButton.prototype.__init__ = function __init__(){
            var self = this;
            super_(SubCustomButton, self).constructor(self);
        };
        SubCustomButton.prototype.clearbt = function clearbt(){
            var self = this;
            var bt;
            var _$rapyd$_Iter1 = self.groups[self];
            for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
                bt = _$rapyd$_Iter1[_$rapyd$_Index1];
                if (bt.id !== self.id) {
                    bt.clear();
                }
            }
        };
        SubCustomButton.prototype.clear = function clear(){
            var self = this;
            self.state === self.States.default;
        };
        SubCustomButton.prototype.action = function action(){
            var self = this;
            var i;
            for (i = 0; i < 10; i++) {
                for (i = 0; i < 10; i++) {
                    print;
                    123123;
                }
            }
            super_(GridLayout, self).constructor(self);
        };

        function GridLayout() {
            GridLayout.prototype.__init__.apply(this, arguments);
        }
        _$rapyd$_extends(GridLayout, Button);
        GridLayout.prototype.__init__ = function __init__(){
            var self = this;
            super_(GridLayout, self).constructor(self);
        };
        GridLayout.prototype.clearbt = function clearbt(){
            var self = this;
            var bt;
            var _$rapyd$_Iter2 = self.groups[self];
            for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                bt = _$rapyd$_Iter2[_$rapyd$_Index2];
                if (bt.id !== self.id) {
                    bt.clear();
                }
            }
        };
        GridLayout.prototype.clear = function clear(){
            var self = this;
            self.state === self.States.default;
        };
        GridLayout.prototype.action = function action(){
            var self = this;
            var i;
            for (i = 0; i < 10; i++) {
                print;
                123123;
            }
        };

        bt1 = new CustomButton();
        bt1 = new CustomButton();
        bt1.sbt1 = new SubCustomButton();
        bt1.sbt1 = new SubCustomButton();
        bt2 = new GridLayout();
        bt2 = new GridLayout();
        bt1.setData("custom1", bt1.val1);
        bt1.setData("custom1", bt1.val1);
        bt1.setData("custom2", "val2");
        bt1.setData("custom2", "val2");
        bt1.setCondition("custom3", {
            "if_setter": "\"abc\"",
            "if_con": [ self.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": ""
        });
        bt1.setCondition("custom3", {
            "if_setter": "\"abc\"",
            "if_con": [ self.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": ""
        });
        bt1.setData("html_id", css("CustomButton[ref]"));
        bt1.setData("html_id", css("CustomButton[ref]"));
        bt1.setData("state", bt1.default_state);
        bt1.setData("state", bt1.default_state);
        bt1.setData("on_press", bt1.action());
        bt1.setData("on_press", bt1.action());
        bt1.setData("on_release", bt1.clear);
        bt1.setData("on_release", bt1.clear);
        bt1.sbt1.setData("custom1", bt1.sbt1.val1);
        bt1.sbt1.setData("custom1", bt1.sbt1.val1);
        bt1.sbt1.setData("custom2", "val2");
        bt1.sbt1.setData("custom2", "val2");
        bt1.sbt1.setCondition("custom3", {
            "if_setter": "\"abc\"",
            "if_con": [ self.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": ""
        });
        bt1.sbt1.setCondition("custom3", {
            "if_setter": "\"abc\"",
            "if_con": [ self.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": ""
        });
        bt1.sbt1.setData("html_id", css("CustomButton[ref]"));
        bt1.sbt1.setData("html_id", css("CustomButton[ref]"));
        bt1.sbt1.setData("state", bt1.sbt1.default_state);
        bt1.sbt1.setData("state", bt1.sbt1.default_state);
        bt1.sbt1.setData("on_press", bt1.sbt1.action());
        bt1.sbt1.setData("on_press", bt1.sbt1.action());
        bt1.sbt1.setData("on_release", bt1.sbt1.clear);
        bt1.sbt1.setData("on_release", bt1.sbt1.clear);
        _states = cls(States);
        _states = cls(States);
        _states.setTarget(bt1);
        _states.setTarget(bt1);
        _state = _states.addState();
        _state = _states.addState();
        _state.setName("default" | "onPress");
        _state.setName("default" | "onPress");
        _state = _states.addState();
        _state = _states.addState();
        _state.setName("hold" | "clear");
        _state.setName("hold" | "clear");
        _state = _states.addState();
        _state = _states.addState();
        _state.setCondition("background_color", {
            "if_setter": "'bg'",
            "if_con": [ _state.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": "background_color"
        });
        _state.setCondition("background_color", {
            "if_setter": "'bg'",
            "if_con": [ _state.state, " == ", "'default'" ],
            "else_setter": "'green'",
            "if_setted": "background_color"
        });
        _state.setData("background_image", "bg");
        _state.setData("background_image", "bg");
        _state.setName(stateNaming);
        _state.setName(stateNaming);
        _state.setData("customAttr", customeAttr);
        _state.setData("customAttr", customeAttr);
        _state.setCondition("setattr", {
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
        });
        _state.setCondition("setattr", {
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
        });
        _anime = _state.setAnime();
        _anime = _state.setAnime();
        _anime.setData("pos", x, y);
        _anime.setData("pos", x, y);
        _anime.setData("size", w, h);
        _anime.setData("size", w, h);
        _anime.setData("color", c);
        _anime.setData("color", c);
        _tween = _anime.setTwn();
        _tween = _anime.setTwn();
        _tween(xx);
        _tween(xx);
        bt2.setData("custom1", bt2.val1);
        bt2.setData("custom1", bt2.val1);
        bt2.setData("custom2", "val2");
        bt2.setData("custom2", "val2");
        bt2.setData("html_id", css("CustomButton[ref]"));
        bt2.setData("html_id", css("CustomButton[ref]"));
        bt2.setData("state", bt2.default_state);
        bt2.setData("state", bt2.default_state);
        bt2.setData("on_press", bt2.action());
        bt2.setData("on_press", bt2.action());
        bt2.setData("on_release", bt2.clear);
        bt2.setData("on_release", bt2.clear);
        _states = cls(States);
        _states = cls(States);
        _states.setTarget(css);
        _states.setTarget(css);
        _state = _states.addState();
        _state = _states.addState();
        _state.setName("default" | "onPress");
        _state.setName("default" | "onPress");
        _state = _states.addState();
        _state = _states.addState();
        _state.setName("hold" | "clear");
        _state.setName("hold" | "clear");
        _state = _states.addState();
        _state = _states.addState();
        _state.setData("background_color", "bg");
        _state.setData("background_color", "bg");
        _state.setData("background_image", "bg");
        _state.setData("background_image", "bg");
        _state.setName(stateNaming);
        _state.setName(stateNaming);
        _state.setData("customAttr", customeAttr);
        _state.setData("customAttr", customeAttr);
        _state.setCondition("setAttr", {
            "if_setter": "'pressed'",
            "if_con": [ _state.state, " == ", "'aaa'" ],
            "else_setter": "'abc'",
            "if_setted": _state.name
        });
        _state.setCondition("setAttr", {
            "if_setter": "'pressed'",
            "if_con": [ _state.state, " == ", "'aaa'" ],
            "else_setter": "'abc'",
            "if_setted": _state.name
        });
        _anime = _state.setAnime();
        _anime = _state.setAnime();
        _anime.setData("pos", x, y);
        _anime.setData("pos", x, y);
        _anime.setData("size", w, h);
        _anime.setData("size", w, h);
        _anime.setData("color", c);
        _anime.setData("color", c);
        _tween = _anime.setTwn();
        _tween = _anime.setTwn();
        _tween(xx);
        _tween(xx);
        __comp_data__ = {
            "SubCustomButton": [ "Button", {
                "instance": "bt1.sbt1",
                "id": "bt1.sbt1",
                "super_class": Button
            }, {
                "instance": "bt1.sbt1",
                "id": "bt1.sbt1",
                "super_class": Button
            } ],
            "GridLayout": [ "Button", {
                "instance": bt2,
                "id": "bt2",
                "super_class": Button
            }, {
                "instance": bt2,
                "id": "bt2",
                "super_class": Button
            } ],
            "CustomButton": [ "Button", {
                "instance": bt1,
                "id": "bt1",
                "super_class": Button
            }, {
                "instance": bt1,
                "id": "bt1",
                "super_class": Button
            } ]
        };
        return __comp_data__;
        ViewComponent.addRapydComp(a3b5ed1_4645_49bc_9fb1_4bd95a8a580b);
    }
})();
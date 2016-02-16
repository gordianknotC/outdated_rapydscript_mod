var jamal = function () {
    // If the context is global, return a new object
    if (window == this) {
        return new jamal();
    }
    return this.configure();
};


jamal.fn = jamal.prototype = {
    /* Properties */
    browser: '',
    version: '0.4',
    name: '',
    action: '',
    current: {},
    m: {},
    v: {},
    c: {},
    config: {},
    debug: false,
    events: {},
    initActions: {},
    /* Methods */

    start: function () {

        //console.log('Starting the Jamal application (Version: '+this.version+')...');
        //console.log('Browser:');
        this.dir(jQuery.browser);
        //console.log('Controller: ' + this.name);
        //console.log('Action: ' + this.action);

        ////////////////////////////
        ////		Beta for test!!
        ////////////////////////////
        //this._import('jamal/config.py.js')

        if (this.debug === true && $.browser.msie != true) {
            window.console.time('Timing');
        }
        // load:
        // try to load current controller,action and all components
        var started = this.load();
        if (this.debug === true && $.browser.msie != true) {
            window.console.timeEnd('Timing');
        }
        if (jQuery.browser.mozilla) {
            //console.log('Jamal size: '+this.toSource().length+' Chars');
        }

        // capture errors
        jQuery(window).error(function (message, file, line) {
            var e;
            if (file && line) {
                e = {
                    'name': 'window.onerror',
                    'message': message,
                    'file': file,
                    'line': line,
                    'stack': ''
                };
            }

            if (jamal.fn === undefined) {
                $j.error('Window error captured!', e);
            } else {
                jamal.fn.error('Window error captured!', e);
            }
            return true;
        });

        return started;
    },

    log: function (message, b) {
        if (this.debug === true && $.browser.msie != true) {
            var log = '';
            for (var i = 0; i < arguments.length; i++) {
                log += arguments[i];
                if (i !== (arguments.length - 1)) {
                    log += ', ';
                }
            }
            try {
                console.log(message, b)
            }
            catch (e) {

            }
        }
    },

    error: function (message) {
        if (this.debug === true && $.browser.msie != true) {
            if (arguments.length > 1 && arguments[1]) {
                e = arguments[1];

                window.console.error('Jamal Error: ' + message, e);
                if (typeof e === "object") {
                    if (typeof e.message === "object") {
                        //console.log(e.name+': ');
                        this.dir(e.message);
                    } else {
                        //console.log(e.name+': '+e.message);
                    }
                    this.dir(e);
                    //console.log('Stack: ' + e.stack);
                } else {
                    //console.log(e);
                    //console.log('Stack:');
                    this.dir(this.callstack());
                }
            } else {
                window.console.error('Jamal Error: ' + message);
            }
        }
    },

    callstack: function () {
        var re_without_parenthesis = /[(][^)]*[)]/;
        var re_file_line = /(.*):(\d+)$/;

        var stack = new Error().stack.split('\n');
        stack.splice(0, 2); // remove first two stack frames

        var frames = [];
        for (var i in stack) {
            // a stack frame string split into parts
            var frame = stack[i].split('@');
            if (frame && frame.length == 2) {
                frame = {
                    // Stackframe object
                    'name': frame[0],
                    'source': frame[0].replace(re_without_parenthesis, ''),
                    'file': frame[1].match(re_file_line)[1], // first group
                    'line': frame[1].match(re_file_line)[2]  // second group
                };
                //console.log('at ' + frame.file + ' (' + frame.name + ': ' + frame.line + ')');
            }
        }
    },

    dir: function (obj) {
        if (this.debug === true && $.browser.msie != true) {
            window.console.dir(obj);
        }
    },

    configure: function () {
        try {
            //var data = jQuery(this.root+'.jamal').metadata();
            var data = []			// 放METADATA用
            var filter = {}			// 放CONTROLLER的ELEMENT對象:FILTER
            var render = {}			// render[controller][action] = true or false
            //console.log('in configure!!')
            jQuery('.jamal').each(function () {
                thisdata = $(this).metadata()
                //console.log('thisdata = ',thisdata)
                data.push(thisdata)
                var controller = thisdata.controller	//data[data.length-1].controller
                var action = thisdata.action
                var isrender = thisdata.render
                if (filter[controller] == undefined) {
                    filter[controller] = {}
                }
                if (render[controller] == undefined) {
                    render[controller] = {}
                }
                if (isrender == undefined) {
                    isrender = true
                }
                render[controller][action] = isrender
                filter[controller][action] = $(this)
            })
            //console.log('rendered filter  = ',filter)
            //console.log('isrender  = ',render)
            //console.log('metadata = ',data)

        } catch (e) {
            this.debug = true;
            this.error('jQuery Metadata Plugin failed to read the configuration. ' +
                'Probably there is no class="jamal {controller:\'example\',action:\'index\'}" in your markup!', e);
        }

        this.config['controller'] = {}

        for (i in data) {
            var meta = data[i]
            var controller = meta.controller
            var action = meta.action
            meta.filter = {}
            var _id = filter[controller][action]
            //console.log('meta = ',meta)
            if (typeof(meta) !== 'object') {
                this.debug = true;
                this.error('No configuration found!');
                return false;
            } else {

                this.name = controller;
                if (this.config['controller'][controller] == undefined) {
                    this.config['controller'][controller] = meta
                    this.config['controller'][controller]['render'] = render[controller]
                }


                this.action[controller] = action;
                for (key in meta) {
                    if (key != 'controller' && key != 'action') {
                        this.config[key] = meta[key]
                        switch (key) {
                            case 'debug':
                                this.debug = meta.debug;
                                break;
                        }
                    }
                }
                log('controller = ' + controller, 'action = ' + action)
                this.config['controller'][controller].filter[action] = _id
                log(this.config['controller'][controller].filter.__count__)
            }
        }
        this.config.render = render

        if ($.browser.msie) {
            this.browser = 'IE'
        } else {
            this.browser = 'NotIE'
        }

        return true;

    },

    load: function () {
        var loaded = false;

        // C: 		map of all avialable controllers
        // name:	controller name
        for (name in this.config['controller']) {
            var cfg = this.config['controller'][name]
            //console.log('config.py.controller = ',this.config.py['controller'])
            //console.log('cfg = ',cfg)
            //console.log('name = ',name)
            //console.log('action = ',cfg.action)

            if (typeof this.c[name] !== 'object') {
                jamal.fn = jamal;
                $j.c({
                    Generic: {}
                });
                this.config['Generic'] = {controller: 'Generic', action: 'index', debug: false}
            }

            // controller
            try {

                this.current = this.c[cfg.controller];
                //console.log('in jamal: this.current = ',this.current)
            }
            catch (e) {
                this.error('Controller error!', e);
            }


            // callback before the action
            //this.current.beforeAction(cfg.action);

            // components
            if (this.current.components) {
                for (var i in this.current.components) {
                    if (!this[this.current.components[i]].loaded) {
                        try {
                            //console.log('excute components ',this.current.components[i])
                            this[this.current.components[i]]();
                        }
                        catch (e) {
                            this.error(this.current.components[i] + ' component error!', e);
                        }
                    }
                }
            }

            // action

            if (typeof this.c[cfg.controller][cfg.action] === 'function') {
                try {
                    // filter:: controller 所控制的對象
                    // 將FILTER存入CONTROLLER以方便存取
                    this.current.filter = cfg.filter
                    // initAction:記錄所有CONTROLLER的initaction ......initAction[controllerName]
                    this.initActions[cfg.controller] = cfg.action

                    this.current.initAction = cfg.action
                    for (act in cfg.filter) {
                        //console.log('cfg.filter       act = '+act,cfg.filter[act])

                        //this.current[cfg.action]();
                        this.current.action = act
                        //jQuery.NavController.index()
                        var _param = {action: act}
                        var name = this.current.name
                        // isrender = cfg.render[controllername] = true or false
                        var isrender = cfg.render[act]
                        // 如果進入的頁面為 http://xxx.xxx.xxx/ 才RENDER
                        // 其餘交給jamal.address
                        var hash = location.hash
                        if (hash.indexOf(name) < 0) {
                            if (isrender) {
                                log('in jamal: jamal.excute(' + name + ',' + act + ',_param)')
                                jamal.excute(name, act, _param)
                                //jQuery[name+'Controller'][act](_param)
                            }
                        }

                    }

                    loaded = true;
                }
                catch (e) {
                    this.error('Action couldn\'t be started!', e);
                }
            }
            else {
                //console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
                this.error('Action not found!', 'there are some invalid definitions in your metadata ,or you must define actions where you defined in metadata');
            }

            // callback after the action
            //this.current.afterAction(cfg.action);


        }
        return loaded;
    },


    noConflict: function () {
        if (jamal._$) {
            $j = jamal._$j;
        }
        return jamal;
    },

    excute: function (c, f, query) {
        if (typeof(query) != 'object') {
            query = {action: f}
        }
        log('excute ' + c, f)
        log('excute query = ', query)
        var ctrl = jamal.c[c]
        query.a = f
        query.c = c
        query.action = f		// ???? E R R O R ????
        //
        // 當CONTROLLER[ACTION] 為UNDEFINED 時
        // jamal.address 的try catch 會catch 到錯誤  而進入自動生成未定義action的程式碼
        if (!ctrl[f]['parent']) {
            $.extend(ctrl[f], ctrl.actionBehavior)
            ctrl[f]['parent'] = ctrl[f]['c'] = ctrl
            ctrl[f]['action'] = f
            ctrl[f]['name'] = c
        }


        // 未防止 before action, action, afteraction ,before render......等的過程中發生錯誤時
        // jamal.address的try catch 會catch 到錯誤  而進入自動生成未定義action的程式碼 ,且因為
        // jamal.address的try catch 關係會掩蓋程式發生的錯誤
        // 因而在下段加入try catch
        try {
            if (ctrl['_beforeAction'].call(ctrl[f], query) != 'STOP') {
                if (ctrl['beforeAction'].call(ctrl[f], query) != 'STOP') {
                    if (ctrl[f].call(ctrl[f], query) != 'STOP') {
                        if (ctrl['_afterAction'].call(ctrl[f], query) != 'STOP') {
                            // 所有的 action ,before action ,after action
                            // 均繼承 actionBehavior 因此在action中 this 參照指的並
                            // 非controoler 而是 該action 本身
                            // 如在ACTIOIN 中
                            // this.RenderAs 指的是 actionBehavior的RenderAs function 而非 controoler 下的RenderAs
                            // 若想在ACTION中存取CONTROLLER內的FUNCTION可加入 c 參照
                            // this.c.m.getData() ,this.c.anotherAction ,this.c.setActionProp
                        }
                    }
                }
            }
        } catch (e) {
            jamal.error(e)
        }

    },

    inflector: {
        singularize: function (str) {
            return str.replace(/s$/, '');
        },
        pluralize: function (str) {
            return str + 's';
        }
    },

    // only works when all scripts are loaded( make sure app_config.js is loaded)
    // usage: _import(portfolioController) _import('portfolioModel') _import('portfolioView') _import(xxx.js) _import(xxx.css)
    _import: function (path) {
        var type = path.split('.')[1]
        var _path = this.config['path']

        // type == js or camelCase like portfolioController portfolioModel
        if (type != 'css') {

            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';

            if (type == 'js') {
                //console.log('jamal import!!  type == js_______________')
                script.src = path;
                head.appendChild(script);
                return
            }

            for (i in jamal.config.camelCase) { // Model View Controller
                var cC = jamal.config.camelCase[i]
                var name = path.split(cC)
                //console.log('jamal import!!  type == camelCase___________ name = ',name)
                if (name.length == 2) {
                    name[0] = name[0].toLowerCase()
                    cC = cC.toLowerCase()
                    if (cC == 'controller') {
                        var ex = '_' + cC
                    } else {
                        var ex = ''
                    }
                    name[1] = name[0] + ex + '.js'
                    script.src = _path[cC] + name[1]
                    head.appendChild(script);
                    return
                }
            }

        } else {
            var base = _path['css']
            document.write("<" + "link href=\"" + base + path + "\" rel=\"stylesheet\" type=\"text/css\"></" + "link>");
        }
    }

};


jamal.extend = jamal.fn.extend = function () {
    // copy reference to target object
    var target = arguments[0], a = 1;

    // extend jamal itself if only one argument is passed
    if (arguments.length == 1) {
        target = this;
        a = 0;
    }
    var prop;
    while ((prop = arguments[a++]) != null) {
        // Extend the base object
        for (var i in prop) {
            target[i] = prop[i];
        }
    }

    // Return the modified object
    return target;
};


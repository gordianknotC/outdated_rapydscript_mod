var jamal = function() {
    // If the context is global, return a new object
    if (window == this) {
        return new jamal();
    }
    return this.configure();
};


jamal.fn = jamal.prototype = {
    /* Properties */
	browser:'',
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
	initActions:{},
    /* Methods */
    
    start: function() {	
		
        //console.log('Starting the Jamal application (Version: '+this.version+')...');
        //console.log('Browser:');
        this.dir(jQuery.browser);
        //console.log('Controller: ' + this.name);
        //console.log('Action: ' + this.action);
		
		////////////////////////////
		////		Beta for test!!
		////////////////////////////
		//this._import('jamal/config.py.js')
		
        if (this.debug === true && $.browser.msie!=true) {
            window.console.time('Timing');
        }
		// load:
		// try to load current controller,action and all components
        var started = this.load();					
        if (this.debug === true && $.browser.msie!=true) {
            window.console.timeEnd('Timing');
        }
        //if (jQuery.browser.mozilla) {
            //console.log('Jamal size: '+this.toSource().length+' Chars');
        //}
        
        // capture errors
        jQuery(window).error(function(message, file, line) {
            var e;
            if(file && line) {
                e = {
                    'name': 'window.onerror',
                    'message': message,
                    'file': file,
                    'line': line,
                    'stack': ''
                };
            }
			
            if(jamal.fn === undefined) {
                $j.error('Window error captured!', e);
            } else {
                jamal.fn.error('Window error captured!', e);
            }
            return true;
        });
                    
        return started;
    },

    log: function(message,b) {
        if (this.debug === true && $.browser.msie != true) {
            var log = '';
            for (var i=0; i<arguments.length; i++) {
                log += arguments[i];
                if (i !== (arguments.length-1)) {
                    log += ', ';
                }
            }
			try{
				console.log(message,b)
			}
			catch(e){
				
			}
        }
    },

    error: function(message) {
        if (this.debug === true && $.browser.msie!=true) {
            if (arguments.length>1 && arguments[1]) {
                e = arguments[1];
                
                window.console.error('Jamal Error: '+message, e);
                if(typeof e === "object") {
                    if(typeof e.message === "object") {
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

    callstack: function() {
        var re_without_parenthesis = /[(][^)]*[)]/;
        var re_file_line = /(.*):(\d+)$/;
        
        var stack = new Error().stack.split('\n');
        stack.splice(0,2); // remove first two stack frames
        
        var frames = [];
        for(var i in stack) {
            // a stack frame string split into parts
            var frame = stack[i].split('@');
            if(frame && frame.length == 2) {
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

    dir: function(obj) {
        if (this.debug === true && $.browser.msie != true) {
            window.console.dir(obj);
        }
    },

    configure: function() {
        try {
            //var data = jQuery(this.root+'.jamal').metadata();
			var data = []			// ???METADATA???
			var filter = {}			// ???CONTROLLER???ELEMENT??????:FILTER
			var render = {}			// render[controller][action] = true or false
			//console.log('in configure!!')
			jQuery('.jamal').each(function(){ 
				thisdata = $(this).metadata()
				//console.log('thisdata = ',thisdata)
				data.push(thisdata)
				var controller 	= thisdata.controller	//data[data.length-1].controller
				var action		= thisdata.action
				var isrender	= thisdata.render
				if(filter[controller]==undefined){
					filter[controller]={}
				}
				if(render[controller]== undefined){
					render[controller] = {}
				}
				if(isrender == undefined){
					isrender = true
				}
				render[controller][action] = isrender 
				filter[controller][action] = $(this)
			})
			//console.log('rendered filter  = ',filter)
			//console.log('isrender  = ',render)
			//console.log('metadata = ',data)
			
        } catch(e) {
            this.debug = true;
            this.error('jQuery Metadata Plugin failed to read the configuration. '+
                       'Probably there is no class="jamal {controller:\'example\',action:\'index\'}" in your markup!', e);
        }
        
		this.config['controller'] = {}
		
		for(i in data){
			var meta = data[i]
			var controller 	= meta.controller
			var action		= meta.action
				meta.filter = {}
			var _id	 		= filter[controller][action]
			//console.log('meta = ',meta)
			if (typeof(meta) !== 'object') {
	            this.debug = true;
	            this.error('No configuration found!');
	            return false;
	        } else {
	            
	            this.name = controller;
				if(this.config['controller'][controller] == undefined){
					this.config['controller'][controller] = meta
					this.config['controller'][controller]['render'] = render[controller]
				}
				
				
	            this.action[controller] = action;
	            for(key in meta){
					if(key!='controller' && key!='action'){
						this.config[key] = meta[key]
						switch(key){
							case 'debug':
								this.debug = meta.debug;
								break;
						}
					}
				}
				log('controller = '+controller,'action = '+action)
				this.config['controller'][controller].filter[action] = _id
				log(this.config['controller'][controller].filter.__count__)
	        }
		}
		this.config.render = render
		
		if($.browser.msie){
			this.browser = 'IE'
		}else{
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
				this.config['Generic']={controller:'Generic',action:'index',debug:false}
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
					// filter:: controller ??????????????????
					// ???FILTER??????CONTROLLER???????????????
					this.current.filter = cfg.filter
					// initAction:????????????CONTROLLER???initaction ......initAction[controllerName]
					this.initActions[cfg.controller] = cfg.action
					
					this.current.initAction = cfg.action
					for(act in cfg.filter){
						//console.log('cfg.filter       act = '+act,cfg.filter[act])
							
							//this.current[cfg.action]();
							this.current.action = act
							//jQuery.NavController.index()
							var _param = {action:act}
							var name = this.current.name
							// isrender = cfg.render[controllername] = true or false
							var isrender = cfg.render[act]
							// ???????????????????????? http://xxx.xxx.xxx/ ???RENDER
							// ????????????jamal.address
							var hash = location.hash
							if(hash.indexOf(name)<0){
								if (isrender){
									log('in jamal: jamal.excute('+name+','+act+',_param)')
									jamal.excute(name,act,_param)
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
				this.error('Action not found!','there are some invalid definitions in your metadata ,or you must define actions where you defined in metadata');
			}
			
			// callback after the action
			//this.current.afterAction(cfg.action);
			
			
		}
		return loaded;
    },


    noConflict: function() {
        if (jamal._$) {
            $j = jamal._$j;
        }
        return jamal;
    },
	
	excute:function(c,f,query){
		if (typeof(query)!='object'){
			query = {action:f}
		}
		log('excute '+c,f)
		log('excute query = ',query)
			var ctrl 	= jamal.c[c]
			query.a 	= f
			query.c 	= c
			query.action = f		// ???? E R R O R ????
			//
			// ???CONTROLLER[ACTION] ???UNDEFINED ???
			// jamal.address ???try catch ???catch ?????????  ??????????????????????????????action????????????
			if(!ctrl[f]['parent']){
				$.extend(ctrl[f],ctrl.actionBehavior)
				ctrl[f]['parent'] 	= ctrl[f]['c']  =	ctrl
				ctrl[f]['action'] 	= f
				ctrl[f]['name']		= c
			}
			
			
			// ????????? before action, action, afteraction ,before render......??????????????????????????????
			// jamal.address???try catch ???catch ?????????  ??????????????????????????????action???????????? ,?????????
			// jamal.address???try catch ????????????????????????????????????
			// ?????????????????????try catch
			try {
				if (ctrl['_beforeAction'].call(ctrl[f], query) != 'STOP') {
					if (ctrl['beforeAction'].call(ctrl[f], query) != 'STOP') {
						if (ctrl[f].call(ctrl[f], query) != 'STOP') {
							if (ctrl['_afterAction'].call(ctrl[f], query)  != 'STOP') {
								// ????????? action ,before action ,after action
								// ????????? actionBehavior ?????????action??? this ???????????????
								// ???controoler ?????? ???action ??????
								// ??????ACTIOIN ???
								// this.RenderAs ????????? actionBehavior???RenderAs function ?????? controoler ??????RenderAs
								// ?????????ACTION?????????CONTROLLER??????FUNCTION????????? c ??????
								// this.c.m.getData() ,this.c.anotherAction ,this.c.setActionProp
							}
						}
					}
				}
			}catch(e){
				jamal.error(e)
			}
		
	},
	
	inflector: {
        singularize: function(str) {
            return str.replace(/s$/, '');
        },
        pluralize: function(str) {
            return str + 's';
        }
    },
	
	// only works when all scripts are loaded( make sure app_config.js is loaded)
	// usage: _import(portfolioController) _import('portfolioModel') _import('portfolioView') _import(xxx.js) _import(xxx.css)
	_import:function(path){
		var type = path.split('.')[1]
		var _path = this.config['path']
		
		// type == js or camelCase like portfolioController portfolioModel
		if(type != 'css'){
			
			var head	= document.getElementsByTagName('head')[0];
     		var script	= document.createElement('script');
      		script.type= 'text/javascript';
			
			if(type == 'js'){
				//console.log('jamal import!!  type == js_______________')
				script.src= path;
      			head.appendChild(script);
				return
			}
			
			for(i in jamal.config.camelCase){ // Model View Controller
				var cC = jamal.config.camelCase[i]
				var name = path.split(cC)
				//console.log('jamal import!!  type == camelCase___________ name = ',name)
				if(name.length == 2){
					name[0] = name[0].toLowerCase()
					cC = cC.toLowerCase()
					if(cC == 'controller'){
						var ex = '_'+cC
					}else{
						var ex = ''
					}
					name[1] = name[0]+ex+'.js'
					script.src= _path[cC]+name[1]
      				head.appendChild(script);
					return
				}
			}
	
		}else{
			var base = _path['css']
			document.write("<" + "link href=\"" + base + path + "\" rel=\"stylesheet\" type=\"text/css\"></" + "link>");
		}
	}
	
};



jamal.extend = jamal.fn.extend = function() {
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


jamal.m = jamal.fn.m = function(model) {
    if(typeof model === 'object') {
        var inherited;
        for (var i in model) {
            // get the jamal model
            inherited = new jamal.fn.m(i);
            
            // inherit the new model
            jamal.extend(inherited, model[i]);
            model[i] = inherited;
        }
        jamal.extend(jamal.fn.m, model);
    } else {
        this.name = model;
		this.url = '/' + this.name + '/getData'
		
    }
};



jamal.fn.extend(jamal.fn.m.prototype, {
	
	db:'sever',//json ,server ,memory
	cache:{},
	jsonData:{},
	url:'',
	property:{},


	
    settings: function(){
        var model = this;
        var cache = this.cache
        return {
			type:'Get',
            dataType: 'json',
            error: function(xhr, type, exception){
                if(model.error()) {
                    var status = xhr.status + ' ' + xhr.statusText;
                    jamal.error('Ajax - ' + type + ' (' + status + ')', exception);
					cache[this.url] = undefined
                }
            },
            success: function(response) {
                jamal.ajaxSuccess(response);
                if(model.noError(response)) {
                    if(this.callback) {// if setting.callback
                        this.callback(response);
                    }
                }
            }
        };
    },
    getUrl: function() {
		var query = ''
		for(prop in this.property){
			if(query == ''){query = "?"}else{query = query+'&'}
			query += prop+'='+this.property[prop]
		}
        return this.url+query
    },
	
	// useage: isSet([var1,var2,var3,var4])
	isSet:function(vars){
		for (v in vars){
			if(!vars[v]){
				return false
			}
		}
	},
	isNotSet:function(vars){
		return !this.isSet(vars)
	},
	// action:function(params){
	//
	// 		var a = this.m.get(url,this.action,params)
	// 		var b = this.m.get(url,this.action,params)
	// 		var c = this.m.get(url,this.action,params)
	//		
	// 		if( this.m.isNotSet([a,b,c])){
	//			return 'STOP'
	// 		}
	// 			action code.......
	// 	}
	
	/////////////////////////////////////////////////////////////
	//				???  ???  ???  ??? 
	//
	// ?????????????????? a,b,c ?????? false ,??????get???????????????????????????
	// ??????CACHE?????????RETURN ???,?????????return false ,????????????
	// ??????this.m.isnotset?????????,??????return 'stop',???a,b,c
	// ????????????(???a??????)???server???????????????,callback ???????????????action???
	// ????????????????????????CODE , ?????? A ????????????????????????CACHE???,??????
	// A ???????????????,???B,C???????????????????????????,??????CACHE[URL]??????'fetching'
	// ???????????????????????????,??????RETURN FALSE
	get:function(url,callback,params){
		var model = this;
		if (this.cache[url] == undefined | this.cache[url] == 'fetching') {
			if(this.cache[url] == 'fetching') return false
			var settings = this.settings();
			settings.url = url;
			
			settings.beforeSend = function(xhr){
				jamal.ajaxSend(xhr);
				return model.beforeFind();
			};
			
			settings.callback = function(result){
				result = model.afterFind(result);
				model.cache[url] = result
				jQuery.extend(model.db,model.cache[url])
				if(callback){callback(param,result)}
				//try:: callback.call($j.c[model.name+'s'], result);
				
			};
			this.cache[url] = 'fetching'
			jQuery.ajax(settings);
			return false
			
		}else{
			return model.cache[url]
		}
	},
	
	/*
	// var = get(url,callback)
    _get: function(url, callback) {
		var model = this;
		var settings = this.settings();
		
		if (this.cache[url] == undefined) {
			settings.type = 'GET';
			settings.url = url;
			
			settings.beforeSend = function(xhr){
				jamal.ajaxSend(xhr);
				return model.beforeFind();
			};
			
			settings.callback = function(result){
				result = model.afterFind(result);
				model.cache[url] = result
				if(callback){callback(result)}
				//try:: callback.call($j.c[model.name+'s'], result);
				
			};
			jQuery.ajax(settings);
			return 'fromServer'
			
		}else{
			callback(model.cache[url])
			return 'fromCache'

		}
    },*/
	
 	beforeFind:function(result){
		
	},
	afterFind:function(result){
		
	},
    
	
    noError: function(response){
        if(response.error) {
            var error = response.error;
            $j.error(error.error + ' (' + error.code + '): ' + error.description + ' in ' + error.file);
            $j.log('Stack:');
            $j.log(error.stack);
            $j.log('Context:');
            $j.log(error.context);
            $j.log('Listing:');
            $j.dir(error.listing);
            return false;
        }
        return true;
    },
	
	url:''
});


(function() {
    // Handle ajax event binding
    jamal.fn.ajaxSend = function(f){
        return typeof f === 'function' ? jQuery().bind('j_ajaxSend', f) : jQuery.event.trigger('j_ajaxSend', [f]);
    };
    jamal.fn.ajaxSuccess = function(f){
        return typeof f === 'function' ? jQuery().bind('j_ajaxSuccess', f) : jQuery.event.trigger('j_ajaxSuccess', [f]);
    };
	
	
})();


jamal.v = jamal.fn.v = function(view) {
    if(typeof view === 'object') {
        var inherited;
        for (var i in view) {
            inherited = new jamal.fn.v(i);
            jamal.extend(inherited, view[i]);
            view[i] = inherited;
        }
        jamal.extend(jamal.fn.v, view);
    } else {
        this.name = view;
    }
};


// view ??????
// [1] settemplate	:??????template url
// [2] setview		:??????renderTarget
// [3] renderbehavior:
//		[a] default
//			[1] headerCatcher				
//			[2] render or not render
//			[3] view action
//			[4] afterRender
//			[5] _afterRender
//				[1] trap form
//				[2] refresh jquery.addres ,flash and error message
//		[B] custom
//			[1] view action
//			[2] after render
//			[3] _after render
jamal.fn.extend(jamal.fn.v.prototype, {
	//propertyBag:{},
	//renderRule:{},
	template:{},		// template[view]: 		url
	renderTarget:{},	// renderTarget:[view]: jQuery element object
	behavior:{},		// CustomRender, Default
	renderParam:{},		// customRendering data
	filter:{},			// same as renderTarget
	App:'',				// ??????APP HASH?????????..???http://sample.com/#/home/index  ,http://sample.com/product/#/home/index ,http://sample.com/service/#/home/index
	Path:'',
	Ref:'',
	Host:'',
	noCache:false,
	cache:{},
	w2p_cache_stack:[],
	autoRender:true,	// rendering switch for default rendering behavior , set autoRender to false to top default rendering 
	
	
	
	
	
	_beforeRender:function(view ,prop){
		log('_beforeRender '+view,prop)
		
		var setting 				= prop
		this.behavior[view] 		= setting.renderBehavior.toLowerCase()
		
		var eq = setting.eq
		//	00 01 10 11
		//  V   V  X  V 
		
		
		if (this.behavior[view] == 'default') {
			this.refreshFilter(view)
			if (eq != undefined) {
				log(this.name+' '+view+' zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz 1 has eq', setting.vars)
				this.setView(view, setting)
			}
			else {
			
				if (!this.renderTarget[view]) {
					log(this.name+' '+view+' zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz 2', setting.vars)
					this.setView(view)
				}
				else {
					log(this.name+' '+view+' zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz 3', setting.vars)
				}
			}
			
			log(this.name+' '+view+' _beforeRender ...........args = ', prop.args)
			// prop.args: web2py request.args
			// prop.vars: web2py request.vars
			// template[view] ?????????RENDER ???URL
			
			if (!setting.setURL) {
				this.setTemplate(view, prop.args, prop.vars)
			}
			
		}
		
		
		log('_beforeRender setting = ',	setting)
		log('template = ',				this.template[view])
		log('renderTarget = ',			this.renderTarget[view])
			
		this.beforeRender(view,setting)
		this.renderBehavior(view,setting)
		//this.renderBehavior(view)
	},
	beforeRender:function(view,prop){},
	// RenderAs('CustomRender')
	// RenderAs('DirectRender')
	// RenderAs('Default')
	behaviorList:{
		// renderParam ?????? view action ????????????width , height , id ,args ??? 
		// args: web2py request args
		// vars: web2py request vars 
		// type: ajax method Post or Get ,default is get
		// action: action name 
		customrender:function(view,setting){
			log(this.name+' '+view+' customRender.....enter!! this = ',this)
			var opt = setting.renderParam
			if(this[view]){
				this[view](view,opt)
			}
			this._afterRender(view)
			this.afterRender(view, opt)
		},
		
		'default':function(view,setting){
			log(this.name+' '+view+'______________________defaultRender  view = '+view,this)
			// template[view] ?????????RENDER ???URL
			var tmpl = this.template[view]
			var opt = setting.renderParam
			var current = this
			
			if (setting.type){
				m = 'Post'
			}else{
				m = 'Get'
			}
			
			//??????APP
			if(jamal.config.ignoreAppUrl){
				tmpl = tmpl.replace('/'+this.App,'')
			}
			
			// ??????????????????CACHE
			// [1] ??????(?????? ERROR MESSAGE)
			// [2] POST METHOD
			// [3] ???REDIRECT ???URL
			log(this.name+' '+view+'______________________defaultRender  m = '+m,this.cache[tmpl]!=undefined)
			log('tmpl = '+tmpl,this.cache[tmpl])
			if(this.cache[tmpl] && m != 'Post'){
				var data = this.cache[tmpl]['cache']
				var xhr = this.cache[tmpl]['header']
				log(this.name+' '+view+'^^^^^^^^^^^^^^^^^^F O U N D    CACHE!! ^^^^^^^^^^^^^^^^^^^^^^^^^^ tmpl = '+tmpl)
				successCallback(data,'fromCache',xhr,tmpl,m,view,this)
				return 
			}else{
				// loading data from server
				this.loading(view)
			}
			log('tmpl = '+tmpl,this.cache[tmpl])
			var u = tmpl.split('?')[0]
			successCallback = function(data,txt,xhr,tmpl,method,view,current){
				
				log(current.name+' '+view+' sucess Callback tmpl = ' + tmpl,txt)
				current.App 	= xhr.getResponseHeader('application');
				current.Path 	= xhr.getResponseHeader('path_info');
				current.Ref 	= xhr.getResponseHeader('http_referer');
				current.Ctrl	= xhr.getResponseHeader('controller');
				current.Func	= xhr.getResponseHeader('function');
				if (jamal.address.isStartPage(current.Path, current.Ctrl, current.Func)) {
					location.href='#'
				}
				else {
					jamal.headerCatcher.Catch(xhr, current, view)
					
					// Cache it !! Post????????????CACHE
					// ?????? current.cache[tmpl] && method != 'Post' ??????BLOCK form???response
					
					if(!current.noCache){
						log('in default________cache it ________',tmpl)
						current.cache[tmpl] = {		//tmpl: a http request address
							cache: data,
							header: xhr
						}
						current.w2p_cache_stack.push(tmpl)
					}
					
					
					
					log(current.name+' '+view+' fetch template success ,begin to render!' +tmpl)
					
					// headerCatcher ???????????????stopRender header??????autoRender??????FALSE?????????RENDER
					if(current.autoRender){
						if(current[view]){
							log(current.name+' '+view+' found action in view ,begin to render!', tmpl)
							//?????????ACTION ???????????????VIEW ??????VIEW??????RETURN TRUE ????????????RENDER
							if(current[view](opt,data,xhr)){
								current.render(view,tmpl)
							}else{
								log(current.name+' '+view+' rendering was blocked from view!', opt)
							}
						}else{
							current.render(view,tmpl)
						}
						
						
					}
					
					// ??????autorender 
					current.autoRender = true
					
					//if (current[view]) {
					//	log('fetch template success ,begin to invoke current action!', opt)
					//	current[view](opt)
					//}
					
					log(current.name+' '+view+' ^^^^^^^^ fetch template success ,current.afterRender(view)', tmpl)
					
					current._afterRender(view,setting)
					current.afterRender(view, opt)
				}
			}
			
			
			
			
			
			log('send url = ',u)
			
			
			if ($.browser.msie) {
				log('send url = ',u)
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				//xmlhttp.url = u
				//xmlhttp.current = current
				//xmlhttp.view = view
				log('send url = ',u)
				if(setting.vars) u = u + '?'+setting.vars
				log('send url = ',u)
				xmlhttp.open(m, u,true);
				xmlhttp.onreadystatechange=function() {
					if (xmlhttp.readyState==4) {
						log('success send..... xhr = ',xmlhttp)
						log('success send..... headers = ',xmlhttp.getAllResponseHeaders())
						var xhr = xmlhttp,
							data = xhr.responseText,
							txt	= '',
							r 	= xhr.getResponseHeader('redirectTo');//getAllResponseHeaders())
							if (r) {
								successCallback(data, txt, xhr, jamal.v.prototype.full_address(r), m, view, current)
							}
							else {
								successCallback(data, txt, xhr, u, m, view, current)
							}
					}else{
						log('ajax error!!***************xhr = ', xmlhttp)
					}
				}
				xmlhttp.setRequestHeader('web2py-component-location', document.location);
				xmlhttp.setRequestHeader('web2py-component-element', current.filter[view].attr('id'));
				xmlhttp.setRequestHeader('jamal-cacheStack', current.w2p_cache_stack.pop());
				xmlhttp.send(null);
				return
			}
			
				log('setting.vars , url: ' + setting.vars, tmpl)
				$.ajax({
					url: u,
					type: m,
					data: setting.vars,
					view: view,
					current: this,
					cache: false,
					contentType: 'text/html; charset=utf-8',
					beforeSend: function(xhr){
						log('beforeSend view = ', view)
						xhr.setRequestHeader('web2py-component-location', document.location);
						xhr.setRequestHeader('web2py-component-element', current.filter[view].attr('id'));
						xhr.setRequestHeader('jamal-cacheStack', current.w2p_cache_stack.pop());
						
					},
					success: function(data, txt, xhr){
						log('xhr = ', xhr)
						r = xhr.getResponseHeader('redirectTo');
						log('success...... this.url = ', this.url)
						if (r) {
							successCallback(data, txt, xhr, jamal.v.prototype.full_address(r), m, this.view, this.current)
						}
						else {
							// ???AJAX???CALL this.url ??????????????????tmpl.split('?')[0] ??????  ??????VARS???FULL URL
							successCallback(data, txt, xhr, this.url, m, this.view, this.current)
						}
					},
					
					error: function(xhr, txt, err){
						log('ajax error!!***************xhr = ', xhr)
						log('ajax error!!***************txt = ', txt)
						log('ajax error!!***************err = ', err)
						//if (xhr.status == '200') {
						//this.success(xhr.responseText,txt,xhr)
						//return
						//}
						jamal.error('template not found!: ' + tmpl)
					}
				})
			
		}	
	},


	
	loading:function(view){
	},
	// _afterRender: private method
	// ??????????????? ??????FORM ??????FORM SUBMIT???ACTION ??????AJAX?????????
	// ??????????????????FILTER???ACTION ??????_afterRender ????????????FILTER?????????????????????FORM
	// ????????????WEB????????????,??????AJAX WEB??????????????????????????????????????????????????????FORM,??????
	// FORM ????????????????????????CONTROLLER ???ACTION???????????????
	_afterRender:function(view,setting){
		log('_afterRender: ',view)
		// filter[view] ??????VIEW????????????jquery target
		// ?????????metadata???????????????action ?????????metadata?????????,???????????????filter
		// ??????????????????metadata ?????????ACTION??????filter
		// ????????????????????????
		// 1 ???????????????action ??????controller????????????metadata?????? ???????????????filter
		// 2 ??????CONTROLLER metadata?????????????????????,??????View = actionname ???,??????View attribute???????????????filter
		// 3 ??????ctrl tag???,??????CONTROLLER?????????????????????ACTION????????? CTRL TAG??????????????????
		var filter = this.filter[view]
		// ???????????????FILTER???ACTION?????? web2py_trap_form
		if (filter == undefined){
			return
		}
		var t = jQuery('form',filter)
		// ??????FILTER??????FORM
		if(t.length>0){
			for(f in t){
				
			}
			log(' W E B 2 P y  T R A P F O R M    teset  t - ',t)
			log('trap web2py form========== T R A P W 2 P F O R M ========= t.selector = ',t.selector)
			log(' W E B 2 P y  T R A P F O R M    this.filter[view]',filter)
			data = t.serialize()
			var _selector = filter.attr('id')
			
			log('trap web2py form========== T R A P W 2 P F O R M ========= content = ',_selector)
			log('trap web2py form========== T R A P W 2 P F O R M ========= jQuery._w2pRef = ',this.Path.replace('/'+this.App,''))
			log('trap web2py form========== T R A P W 2 P F O R M ========= data = ',data)
			
			// HIDDEN FORM ??????ACTION?????????ACTION???????????? FORM SUBMIT???REQUEST???URL
			// ??????ACTION???????????????REQUEST????????????URL  ( ??????????????? )
			// ??????HIDDEN FORM??????ACTION???
			var hidden = $('div.hidden>input[name=action]',t)
			var _path
			if (hidden.length > 0) {
				_path = hidden.attr('value')
			}else{
				_path = ''
			}
			
			
			// [1] ???HTML?????????TRAPPED???????????? ????????? trapped = ''
			// [2] form action ?????????????????????
			//		[a]form ?????????hidden action field [b]???controoler????????????formAct [c]this.Path		
			if(!$('form',filter).attr('trapped')){
				if(_path){
					$('form',filter).attr('trapped',true)
					this.web2py_trap_form(view,_path,_selector)
				}else{
					log("setting.formAct",setting.formAct)
					
					if(setting.formAct){
						url = this[view]['formAct']
					}else{
						url = jamal.v.prototype.full_address(this.Path)
					}
					url = jamal.v.prototype.full_address(this.Path)
					$('form',filter).attr('trapped',true)
					this.web2py_trap_form(view,url,_selector)
					//this.web2py_trap_form(view,'',_selector)
				}
			}
		}
		// show error id and flash
		this.web2py_ajax_init()
		// ???RENDER??????????????????,????????????????????????BIND???ADDRESS??????????????????
		// ??????????????????RENDER?????????????????????BIND ??????,???????????????????????????FILTER
		// ???ACTION???????????????????????????,??????????????????RENDER?????????ACTION?????????
		// FILTER
		jamal.address.init()
		
	},
	web2py_ajax_init:function() {
	  //jQuery('.hidden').hide();
	  jQuery('.error').hide().slideDown('slow');
	  // ???UNBIND ??? BIND ??????????????? ,????????????????????? ( ???????????????FUNCTION??????????????????)
	  jQuery('.flash').unbind('click')
	  jQuery('.flash').click(function() { jQuery(this).fadeOut('slow'); return false; });
	  
	  
	},
	renderBehavior:function(view,setting){
		//this.behaviorList[this.behavior[view]].call(this,view,opt)
		log('in view: renderBehavior: '+this.name+' ,'+view+ ' = ',	this.behavior[view].toString())
		log('in view: renderBehavior: this.behaviorList = ',		this.behaviorList[this.behavior[view]])
		// function.call( reference ,ar1,arg2.....)
		// ex func.call(ref,arg1,arg2....) = ref.func = function(arg1,arg2.....)
		this.behaviorList[this.behavior[view]].call(this,view,setting)
		
	},
	
	getActionProp:function(view){
		return jamal.c[this.name].getActionProp(view)
	},
	// setActionProp(view,data) ?????????????????????????????????ACTION?????????
	// ex: setActionProp(blog,data) ??????????????? __blog=data ???????????? ,????????????ACTION?????????????????????
	setActionProp:function(view,opt){
		jamal.c[this.name].setActionProp(view,opt)
	},
	
	refreshFilter:function(view){
		try{
			if(this.renderTarget[view].parent().length==0){
				this.renderTarget[view] = this.filter[view] = ''
				return true
			}
		}catch(e){return true}
		return false
	},
	
	afterRender:function(view){
		
	},
	
	full_address:function(url){
		if(url.indexOf(jQuery.w2pApp)>-1){
			var host = jQuery.w2pHost,
				app	 = ''
		}else{
			var host = jQuery.w2pHost,
				app	 = '/'+jQuery.w2pApp
		}
		if(url[0]=='/'){
			
		}else if(url.substr(0,3)=='http'){
			return url
		}else{
			url = '/'+url
		}
		return host+app+url
	},
	
	
   // view: viewname
   // action: submit url
   // target: jquery selector
	web2py_trap_form:function(view,action,target) {
		log('trap test target = ',jQuery('#'+target+' form'))
		var callfrom = this
		var setting ={renderParam:'',type:'Post'}
	   jQuery('#'+target+' form').each(function(i){
	      var form=jQuery(this);
		  log('trap test1 form  = ',form)
	      if(!form.hasClass('no_trap')){
		  	form.submit(function(obj){
	      		jQuery('.flash').hide().html('');
				log('callfrom = ',callfrom)
				
				
				
				// ??????HIDDEN FORM??????ACTION ??????ACTION??????URL??????,????????????template[view]??????
				if(action){
					callfrom.template[view] = action
				}
				
				// trap form naming conventioin!!!!!
				// ??????jamal.c.portfolio.contact ?????????form ,???web2py_trap_form bind???form???,??????
				// 	   jamal.v.portfolio ????????? _contact_formAct ??????????????????FUNCTION,??????????????? form submit
				//	   return true?????? ??????????????????????????????, false??????
				if(callfrom['_'+view+'_formAct']){
					if (!callfrom['_' + view + '_formAct'](form)) {
						return false
					}
				}
				
				
				setting.vars 			= form.serialize()
				callfrom.behaviorList['default'].call(callfrom,view,setting)
				//callfrom._beforeRender(view,setting)
				
	        	return false;
	      	});
		  }
	      	
	   });
	},
	URL:function(param){
		var _app 	= this.App 	= jQuery.w2pApp
		var _info 	= this.Path = jQuery.w2pPath 
		var _ref 	= this.Ref 	= jQuery.w2pRef
		var _host 	= this.Host = jQuery.w2pHost
		var _ctrl 	= this.Ctrl	= jQuery.w2pCtrl
		
		var c 	 = param.c,
			a 	 = param.a,
			f 	 = param.f,
			args =param.args,
			vars = param.vars
		
		log('in URL _____________________________ vars = ',vars)
		
		a ? _app = a : a
		
		var _path=  _host + '/' + _app + '/'
		var base = _path.split(c)[0]
		var v 	 = '/'+f
		
		if(typeof args == 'object'){
			if(args.length>0){
				args = '/'+args.join('/')
			}else{
				args = ''
			}
		}else{
			args = ''
		}
		
		if(typeof vars == 'object'){
			if(vars.length>0){
				vars = '?'+vars.join('&')
			}else{
				vars = ''
			}
		}else{
			vars ? vars = '?'+vars : vars = ''
		}
		log('in URL _____________________________ = ',base + c + v + args + vars)
		return base + c + v + args + vars
	},
	// P U B L I C
	setTarget:function(view,target){
		this.renderTarget[view] = target
	},
	// P U B L I C
	setURL:function(view,url){
		this.template[view] = url
	},
	
	// P R I V A T E
	// view: viewname
	// args: web2py args
	// vars: web2py vars		controller/action/args1/args2....?vars1&vars2&...varsN
	// setTemplate: ??????TEMPLATE URL
	setTemplate:function(view,args,vars){
		/*
		log('in setTemplate view,args,vars = '+view+','+args+',',vars)
		var _app 	= this.App 	= jQuery.w2pApp
		var _info 	= this.Path = jQuery.w2pPath 
		var _ref 	= this.Ref 	= jQuery.w2pRef
		var _host 	= this.Host = jQuery.w2pHost
		var _ctrl 	= this.Ctrl	= jQuery.w2pCtrl
		log('_ref 	= ',_ref)
		log('_info 	= ',_info)
		log('_host 	= ',_host)
		
		var _path =  _host + '/'+_app+'/'
		jamal.config.py['path']['view'] = _path.split(this.name)[0]
		
		
		var v = '/'+view
		if(typeof args == 'object'){
			if(args.length>0){
				args = '/'+args.join('/')
			}else{
				args = ''
			}
		}else{
			args = ''
		}
		
		if(typeof vars == 'object'){
			if(vars.length>0){
				vars = '?'+vars.join('&')
			}else{
				vars = ''
			}
		}else{
			vars = ''
		}
		
		log('in setTemplate view,args,vars = '+view+args,vars)
		this.template[view] = jamal.config.py['path']['view']+this.name+v+args+vars
		log('in setTemplate 1================== args = ',this.template[view])
		*/
		this.template[view] = this.URL({a:'',c:this.name,f:view,args:args,vars:vars})
	},
	
	// P R I V A T E
	// setView: ??????renderTarget
	setView:function(view,setting){
		var filter = this.filter[view]
		log(this.name+' '+view+ '_____in setView ,div[view]  = ',$('div[view]',filter))
		var current = this
		
		// ????????????FILTER????????????VIEW attribute
		
		if (setting) {		
			var eq = parseInt(setting.eq)
		}
			
		/*
		if(!this.refreshFilter(view)){
			log('============= target has already set before!',filter)
			log('============= target has already set before!',filter.parent().length)
			this.renderTarget[view] = filter
			return
		}*/
			
		//00 01 10 11	
		if(filter){
			// ??????renderTarget???html?????????????????????,filter ???????????????????????????html node?????????
			// ?????????,??????????????????filter????????????????????????html node???,?????????node???????????????parent
			// ??????,????????????
			if(filter.parent().length>0){
				log('============= target has already set before!',filter)
				log('============= target has already set before!',filter.parent().length)
				this.renderTarget[view] = filter
				return
			}
			this.filter[view] = this.renderTarget[view]=''
		}
		
		for (key in this.filter) {
			var filter = this.filter[key]
			if (filter.is('[view*=' + view + ']')) {
				var matched = filter, 
					l 		= matched.length
					log('============= find view in metadata init',matched)
					this.filter[view] = matched
					this.renderTarget[view] = matched
					return
			}else{
				var matched = $('div[view*='+view+']',filter),
					l = matched.length
					
				if(l){
					log('============= found matched')
					if(l==1){
						current.filter[view] = matched
						current.renderTarget[view] =  matched
						log('============= found view',matched)
						return
					}else{
						try {
							current.filter[view] = matched.eq(eq)
							current.renderTarget[view] = matched.eq(eq)
							log('============= found view and eq',current.filter[view])
							return
						}catch(e){
							jamal.error('Cannot process_general_config multiple "view" without asigning "eq" queryString!',e)
							return
						}
					}
				}
				
			}
		}
		
		
			log('============= use init as renderTarget')
			//     ??????VIEW ???????????????
			// [1] metadata INIT        
			// [2] ??????????????? CONTROLLER ?????????VIEW
			// init???????????????FILTER					 ???????????????CONTROLLER FILTER ???controller metadata ?????????
			// ????????? FILTER ???controoler ????????????????????????
			
			// [1] metadata ????????????
			// ???metadata????????????controller action ?????????????????????????????? filter[view]
			// ?????? ???jamal?????????????????????????????? this.filter[view] == true ????????? metadata ?????????controller???action ???
			//if(this.filter[view]){
			//	this.renderTarget[view] = this.filter[view]
			//	return
			//}
			  
			// [2] ????????????filter:		???controller ????????????metadata 
			// [3] ????????????filter[view]:	???controller ????????????metadata ??????action??????
			if(this.filter.length == 0 | !this.filter[view]){
				var current = this
				var controller = this.name
				var target = $('div[ctrl]')	// ?????????ctrl tag??? ??? ctrl='about,home'
											// ???aboutController???homeController????????????action ???FILTER???????????????ctrl???
				
				
				// ???????????????ctrl tag ???????????????controller???
				target.each(function(){
					// Error: ctrls= app,appadmin .....ctrls.indexof(app) ??????
					var ctrls = $(this).attr('ctrl').split(',')
					for(i in ctrls){
						var c = ctrls[i]
						if(c == controller){
							current.filter[view] = $(this)
							current.renderTarget[view] = $(this)
							return //???????????? ...
									// ?????????CTRL ?????????CTRL????????????ACTION
									// ??????????????????????????????????????????
									// ???????????????CONTROLER???????????????VIEW ??????VIEW TAG
									
						}
					}
				})
			}
			// metadata??????controller ??????ctrl tag??????
			// ???jamal{controller:home,action:index} ????????????a
			// ?????????index???filter ,?????????index???????????????action ????????????b
			// ???????????????b?????? ctrl=home
			
			// jamal.address???????????????action????????????actioin, ?????????????????????action??????setTemplate???
			// ????????????action???????????????metadata????????????filter ,???????????????ctrl tag ,??????controller ???
			// ?????????action(?????????????????????) ???filter?????? ctrl tag??????????????????
			
			jamal.error('Cannot find view! in function of setView :',view)
		
		
		
	},
	
	addBehavior:function(name,func){
		this.behaviorList[name.toLowerCase()]=func
	},
	
	
	
    decode_html: function(str) {
        if (typeof str === 'string') {
            var div = document.createElement('div');
            div.innerHTML = str.replace(/<\/?[^>]+>/gi, '');
            return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
        } else {
            return '';
        }
    },
	
	
	render:function(view,url){
		
		var target = this.renderTarget[view]
		log('usage1 url = '+url,target)
		log(url,this.cache[url])
		try{
			var template = this.cache[url]['cache']
			//log('usage2 url = '+url,template)
		}catch(e){
			
			var template = this.cache['temp']['cache']
			//log('usage3 url = '+url,target)
		}
		
		
		target.html(template)
		//this.renderTemplate(target,template,view)
	}
});


jamal.c = jamal.fn.c = function(controller) {
    if(typeof controller === 'object') {
		
		//????????????SCRIPT ??? ??????????????????????????????JAMAL.FN UNDEFINED?????????!!!
		if(jamal.fn === undefined) { jamal.fn = jamal}
		
        var inherited;
        for(var i in controller) {
			
            inherited = new jamal.fn.c(i);
            jamal.extend(inherited, controller[i]);
            
            // add model
            var m = i.substr(0, i.length)
            if(jamal.fn.m[m]) {
                inherited.m = jamal.fn.m[m];
            } else {
                // if no model create one
                inherited.m = jamal.fn.m[m] = new jamal.fn.m(m);
            }
            
            // add view
            if(jamal.fn.v[i]) {
                inherited.v = jamal.fn.v[i];
            } else {
                // if no view create one
                inherited.v = jamal.fn.v[i] = new jamal.fn.v(i);
            }
            
            controller[i] = inherited;
        }
        jamal.extend(jamal.fn.c, controller);


    } else {
        this.name = controller;
    }
};

jamal.fn.extend(jamal.fn.c.prototype, {
	filter:{},		// ??????CONTORLLER???ELEMENT ?????? EX $('div#wrapper')
	render:true,
	_index:'',
	renderview:'',
	query:{},
	action:'',
	//renderBehavior:'Default' ,CustomAction ,DirectRender
	
	// query.action: ???jamal.address??????jquery.controller.action ???????????????action????????????
	// query.args:	  ???jamal.address ??????jquery.controoler.action ???????????????args ,?????????jamal
	// query.vars:	  ???jamal.address ??????jquery.controoler.action ???????????????vars ,?????????jamal
	_beforeAction:function(query){
		log('_beforeAction '+query.a,query)
		
		this.c.setActionProp(query.a,query)
							
		log('_beforeAction this.actionProp = ',this.actionProp)
	},
	
	//??????action???????????????property ,???????????? ' __action'
	getActionProp:function(action){
		return this[action]['actionProp']	
	},
	// todo
	// ???setActionProp ??? __action ?????? action??????
	// update action propery from default to given value
	setActionProp:function(action,prop){
		var index = action
		if(this[action]['actionProp']==undefined){
			var _default = {render:true,view:action,renderBehavior:'Default'}
		}else{
			var _default = this[action]['actionProp']
		}
		log('in setActionProp','')
		log(this[action]['actionProp'],prop)
		$.extend(_default,prop)
		this[action]['actionProp'] 	= _default
		log(this[action]['actionProp'],prop)
	},
	
	URL:function(param){
		return this.v.URL(param)
	},
	setURL:function(view,url){
		this.v.setURL(view,url)
	},
	// ??????ACTION ???EXTEND ACTIONBEHAVIOR ?????????action ???this ?????????????????????controller ??????
	// ????????? actionbehavior ,?????????action?????????controller???function ???????????? this.parent.xxxx ??? this.c.xxxx
	// ?????????????????????action ???????????? renderas,renderview,cancelview??? ?????????????????????
	// ??? this.CancelView.call(this[view],view)
	actionBehavior:{
		action:'',
		parent:{},
		RenderView:function(view){
			// this.current.setActionProp(
			this.parent.setActionProp(this.action,{render:true,view:view})
		},
		RenderAs:function(str,param){
			this.parent.setActionProp(this.action,{renderBehavior:str,renderParam:param})
		},
		CancelView:function(view){
			if(view == undefined){
				var view = this.action
			}
			this.parent.setActionProp(view,{render:false,view:''})
			return 'STOP'
		},
		formAct:function(url){
			this.parent.setActionProp(this.action,{formAct:url})
		},
		setURL:function(url){
			this.parent.setActionProp(this.action,{
				setURL: true
			})
			this.parent.v.setURL(this.action,url)
		}
	},
	
	
	
	
	

	// ???!!
	// var index = this.action
	// var isrender = this.render
	// var view = this.view
	_afterAction:function(query){
		log('_afterAction query = ',query)
		log('_afterAction actionProp = ',this['actionProp'])
		var isrender 	= this['actionProp'].render
		
		if(isrender){
			log('_afterAction = '+ query.a + '    , isrender = ' + isrender+ '   this.c.name = '+this.c.name + ',  this.c.filter = ', this.c.filter)
			var view = this['actionProp'].view
			log('_afterAction ,jamal.v[this.c.name].filter = '+jamal.v[this.c.name].filter )
			jamal.v[this.c.name].filter = this.c.filter
			jamal.v[this.c.name]._beforeRender(view, this['actionProp'])
			log('end of _afterAction','')
		}
	},
	
	redirectToAction:function(action,query){
		jamal.excute(this.name,action,query)
	},
	

    beforeAction: function(){
    },


    afterAction: function(){
    },
	
	
    init: function(filter){
        jamal.current[jamal.action](filter);
    }
	/*

    getState:function(view){
		if(view==undefined){
			var view = this._index
		}
		return this["__"+view]
	},
	
	setState:function(v1,v2){
		// Usage1: setState(view,opt)
		if(v1.constructor == String){
			var index = this.getState(v1)
		}else{
		// Usage2: setState(opt)
			var index = this._index
			var v2 = v1
		}
		for(key in v2){
			this[index][key] = v2[key]
		}
	},
	

	getQuery:function(str){
		if(this.query.currentTarget){
			// internal calls
			var params = this.query.currentTarget.href.split('?')[1].split('&')
			for(param in params){
				if(param.indexOf(str)!= -1){
					return param.split('=')[1]
				}
			}
		}else{
			// external calls
			return this.query[str]
		}
	},
	*/
	/*
	bindFormTo:function(controller,filter){
		var forms = $('form',filter)
		var data = {}
		forms.each(function(index){
			var form = $(this).eq(index)
			
			('_____-----------_________--------________',$('[type=submit]',form))
			$('[type=submit]',form).click(function(event){
				
				
				var form = $(this).parent()
				var elements = $('[name]',form)
				var arr = {}
				for(i=0;i<elements.length;i++){
					arr[elements.eq(i).attr('name')] = elements.eq(i).val()
				}
				arr['id'] = form.attr('id')
				var act = form.attr('action')	
				
				(controller)	
				(act)				
				jamal.c[controller][act](arr)
				
				event.preventDefault()
			})
			
		})
	},
    
    form: function(element, before, after){
        var $element = $(element);
        
        // bind the click on the submit button
        $('input[@type="submit"]', $element).click(function(){
            this.form.clicked = this;
        });
        
        // no form
        if(!$element.get(0)) {
            return false;
        }
        
        // iterate thru all the forms
        $element.each(function() {
            var $this = $(this);
            
            // define the submit event
            return $this.submit(function(){
                before.call($j.current, $this);
                
                // get the form elements
                var data = {};
                var form = $this;
                var elements = $(form).get(0).elements;
                
                // get all the data
                for(var i in elements) {
                    var o = elements[i];
                    if((o.type == 'checkbox' || o.type == 'radio') && !o.checked) {
                        continue;
                    }
                    if(o.type == "button") {
                        continue;
                    }
                    if(!o.name) {
                        continue;
                    }
                    if(o.type == "submit" && $this.get(0).clicked != o) {
                        continue;
                    }
                    data[o.name] = o.value;
                }
                
                // start the ajax submit
                $j.current.v.submitInProgress();
                $j.current.m.save($(form).attr('action'), data, function(response){
                    if(response.error_code) {
                        $j.current.v.addError(response.error_message, form);
                    }
                    $j.current.v.submitDone();
                    
                    if($.isFunction(after)) {
                        after.call($j.current, response);
                    }
                });
                return false;
            });
        });
    }

	*/	
	
	
});
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
			var data = []			// 放METADATA用
			var filter = {}			// 放CONTROLLER的ELEMENT對象:FILTER
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
					// filter:: controller 所控制的對象
					// 將FILTER存入CONTROLLER以方便存取
					this.current.filter = cfg.filter
					// initAction:記錄所有CONTROLLER的initaction ......initAction[controllerName]
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
							// 如果進入的頁面為 http://xxx.xxx.xxx/ 才RENDER
							// 其餘交給jamal.address
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
			// 當CONTROLLER[ACTION] 為UNDEFINED 時
			// jamal.address 的try catch 會catch 到錯誤  而進入自動生成未定義action的程式碼
			if(!ctrl[f]['parent']){
				$.extend(ctrl[f],ctrl.actionBehavior)
				ctrl[f]['parent'] 	= ctrl[f]['c']  =	ctrl
				ctrl[f]['action'] 	= f
				ctrl[f]['name']		= c
			}
			
			
			// 未防止 before action, action, afteraction ,before render......等的過程中發生錯誤時
			// jamal.address的try catch 會catch 到錯誤  而進入自動生成未定義action的程式碼 ,且因為
			// jamal.address的try catch 關係會掩蓋程式發生的錯誤
			// 因而在下段加入try catch
			try {
				if (ctrl['_beforeAction'].call(ctrl[f], query) != 'STOP') {
					if (ctrl['beforeAction'].call(ctrl[f], query) != 'STOP') {
						if (ctrl[f].call(ctrl[f], query) != 'STOP') {
							if (ctrl['_afterAction'].call(ctrl[f], query)  != 'STOP') {
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
	//				尚  未  測  試 
	//
	// 第一輪執行時 a,b,c 均為 false ,因為get方法只有在該筆資料
	// 有在CACHE下才會RETURN 值,否則均return false ,因此無法
	// 通過this.m.isnotset的判斷,因而return 'stop',當a,b,c
	// 三者之一(以a為例)自server取得資料後,callback 回到原來的action裡
	// 將再次執行同樣的CODE , 此時 A 所取得的資料己在CACHE中,所以
	// A 將會被設值,而B,C因為正在取得資料中,因而CACHE[URL]裡為'fetching'
	// 代表正在取得資料中,同樣RETURN FALSE
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


// view 流程
// [1] settemplate	:取得template url
// [2] setview		:取得renderTarget
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
	App:'',				// 省略APP HASH的連結..如http://sample.com/#/home/index  ,http://sample.com/product/#/home/index ,http://sample.com/service/#/home/index
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
			// template[view] 為所要RENDER 的URL
			
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
		// renderParam 傳給 view action 的資料如width , height , id ,args 等 
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
			// template[view] 存放要RENDER 的URL
			var tmpl = this.template[view]
			var opt = setting.renderParam
			var current = this
			
			if (setting.type){
				m = 'Post'
			}else{
				m = 'Get'
			}
			
			//省略APP
			if(jamal.config.ignoreAppUrl){
				tmpl = tmpl.replace('/'+this.App,'')
			}
			
			// 以下三種不能CACHE
			// [1] 表單(因有 ERROR MESSAGE)
			// [2] POST METHOD
			// [3] 被REDIRECT 的URL
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
					
					// Cache it !! Post方法不能CACHE
					// 若設 current.cache[tmpl] && method != 'Post' 則會BLOCK form的response
					
					if(!current.noCache){
						log('in default________cache it ________',tmpl)
						current.cache[tmpl] = {		//tmpl: a http request address
							cache: data,
							header: xhr
						}
						current.w2p_cache_stack.push(tmpl)
					}
					
					
					
					log(current.name+' '+view+' fetch template success ,begin to render!' +tmpl)
					
					// headerCatcher 裡若接收到stopRender header會將autoRender設為FALSE以阻止RENDER
					if(current.autoRender){
						if(current[view]){
							log(current.name+' '+view+' found action in view ,begin to render!', tmpl)
							//如果該ACTION 有個對應的VIEW 則讓VIEW必需RETURN TRUE 方可進行RENDER
							if(current[view](opt,data,xhr)){
								current.render(view,tmpl)
							}else{
								log(current.name+' '+view+' rendering was blocked from view!', opt)
							}
						}else{
							current.render(view,tmpl)
						}
						
						
					}
					
					// 重設autorender 
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
							// 在AJAX中CALL this.url 所指的並非是tmpl.split('?')[0] 而是  加上VARS的FULL URL
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
	// 主要功能為 抓取FORM 並將FORM SUBMIT的ACTION 綁入AJAX方法中
	// 所以禁示無設FILTER的ACTION 存取_afterRender 因為無設FILTER代表抓取所有的FORM
	// 這在一般WEB是合理的,但在AJAX WEB裡一個頁面中會有好幾個預先載入的隱藏FORM,這些
	// FORM 是為了提供給其他CONTROLLER 或ACTION　使用的！
	_afterRender:function(view,setting){
		log('_afterRender: ',view)
		// filter[view] 為該VIEW所掌控的jquery target
		// 所有在metadata中所定義的action 均會於metadata解析時,生成相應的filter
		// 其餘所有未於metadata 定義的ACTION均無filter
		// 以下二種情況除外
		// 1 自動生成的action 會以controller所定義的metadata位置 生成相應的filter
		// 2 於該CONTROLLER metadata所定義的區均中,定義View = actionname 者,會於View attribute的位置生成filter
		// 3 定義ctrl tag者,則該CONTROLLER下所有未定義的ACTION均隸屬 CTRL TAG所定義之區域
		var filter = this.filter[view]
		// 不允許無設FILTER的ACTION進行 web2py_trap_form
		if (filter == undefined){
			return
		}
		var t = jQuery('form',filter)
		// 如果FILTER裡有FORM
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
			
			// HIDDEN FORM 裡有ACTION則以該ACTION內的值為 FORM SUBMIT後REQUEST的URL
			// 若無ACTION則以上一次REQUEST的網址為URL  ( 這很不保險 )
			// 讀取HIDDEN FORM裡有ACTION者
			var hidden = $('div.hidden>input[name=action]',t)
			var _path
			if (hidden.length > 0) {
				_path = hidden.attr('value')
			}else{
				_path = ''
			}
			
			
			// [1] 當HTML更新後TRAPPED會裡洗掉 如同設 trapped = ''
			// [2] form action 獲取的優先順序
			//		[a]form 內有個hidden action field [b]在controoler中有設定formAct [c]this.Path		
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
		// 當RENDER完一個頁面後,原先在該頁面中所BIND的ADDRESS連結會被洗掉
		// 所以要在每次RENDER完一個頁面後再BIND 一次,這也就是為什麼無設FILTER
		// 的ACTION不允許進入的原因了,因為通常需要RENDER頁面的ACTION均會設
		// FILTER
		jamal.address.init()
		
	},
	web2py_ajax_init:function() {
	  //jQuery('.hidden').hide();
	  jQuery('.error').hide().slideDown('slow');
	  // 先UNBIND 再 BIND 會比較保險 ,不然會重複綁定 ( 每個綁定的FUNCTION都會執行一次)
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
	// setActionProp(view,data) 會生成一個用來儲存該筆ACTION的資料
	// ex: setActionProp(blog,data) 會生成一個 __blog=data 的儲存槽 ,使每一個ACTION均有自己的參數
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
				
				
				
				// 如果HIDDEN FORM裡有ACTION 則以ACTION內的URL為主,若無則以template[view]為主
				if(action){
					callfrom.template[view] = action
				}
				
				// trap form naming conventioin!!!!!
				// 如在jamal.c.portfolio.contact 內有個form ,當web2py_trap_form bind該form時,會在
				// 	   jamal.v.portfolio 中找尋 _contact_formAct 做為所對應的FUNCTION,用以客制化 form submit
				//	   return true允許 傳送表單資料至伺服器, false則否
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
	// setTemplate: 取得TEMPLATE URL
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
	// setView: 取得renderTarget
	setView:function(view,setting){
		var filter = this.filter[view]
		log(this.name+' '+view+ '_____in setView ,div[view]  = ',$('div[view]',filter))
		var current = this
		
		// 檢查在該FILTER下有無設VIEW attribute
		
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
			// 當該renderTarget於html頁面中被刪除時,filter 內的物件並不會因為html node被刪除
			// 而消失,因此必需判斷filter內的物件是否還在html node中,如果在node中則一定有parent
			// 物件,反之則無
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
			//     無設VIEW 通常是只有
			// [1] metadata INIT        
			// [2] 自動生成的 CONTROLLER 也沒有VIEW
			// init所在地為該FILTER					 自動生成的CONTROLLER FILTER 為controller metadata 所在地
			// 其餘者 FILTER 以controoler 定義的所在地為主
			
			// [1] metadata 有定義者
			// 在metadata若有定義controller action 便會將其所在區設放進 filter[view]
			// 因此 就jamal初始第一次執行時而言 this.filter[view] == true 只有在 metadata 有定義controller及action 者
			//if(this.filter[view]){
			//	this.renderTarget[view] = this.filter[view]
			//	return
			//}
			  
			// [2] 如果沒有filter:		該controller 無定義在metadata 
			// [3] 如果沒有filter[view]:	該controller 有定義在metadata 但該action則無
			if(this.filter.length == 0 | !this.filter[view]){
				var current = this
				var controller = this.name
				var target = $('div[ctrl]')	// 有定義ctrl tag者 如 ctrl='about,home'
											// 則aboutController及homeController下所有的action 其FILTER均隸屬於該ctrl下
				
				
				// 尋找所有的ctrl tag 是否有符合controller者
				target.each(function(){
					// Error: ctrls= app,appadmin .....ctrls.indexof(app) ??????
					var ctrls = $(this).attr('ctrl').split(',')
					for(i in ctrls){
						var c = ctrls[i]
						if(c == controller){
							current.filter[view] = $(this)
							current.renderTarget[view] = $(this)
							return //只找一筆 ...
									// 只定義CTRL 適用該CTRL下所有的ACTION
									// 因此只能定義一個不能重複定義
									// 若想在一個CONTROLER中使用多個VIEW 請用VIEW TAG
									
						}
					}
				})
			}
			// metadata定義controller 可與ctrl tag混用
			// 如jamal{controller:home,action:index} 所在區為a
			// 則只有index有filter ,若想在index以外所有的action 設為區域b
			// 則可在區或b加上 ctrl=home
			
			// jamal.address會在找不到action時自動生actioin, 但當自動生成的action通過setTemplate時
			// 會因為該action沒有定義在metadata而找不到filter ,這時便可設ctrl tag ,則該controller 下
			// 所有的action(包括自動生成的) 其filter均為 ctrl tag所定義的區域
			
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
		
		//動態載入SCRIPT 時 若不加下面這行會出現JAMAL.FN UNDEFINED的錯誤!!!
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
	filter:{},		// 儲存CONTORLLER的ELEMENT 對象 EX $('div#wrapper')
	render:true,
	_index:'',
	renderview:'',
	query:{},
	action:'',
	//renderBehavior:'Default' ,CustomAction ,DirectRender
	
	// query.action: 由jamal.address告訴jquery.controller.action 現在執行的action是哪一個
	// query.args:	  由jamal.address 告訴jquery.controoler.action 現在執行的args ,並傳給jamal
	// query.vars:	  由jamal.address 告訴jquery.controoler.action 現在執行的vars ,並傳給jamal
	_beforeAction:function(query){
		log('_beforeAction '+query.a,query)
		
		this.c.setActionProp(query.a,query)
							
		log('_beforeAction this.actionProp = ',this.actionProp)
	},
	
	//每個action都有自己的property ,其命名為 ' __action'
	getActionProp:function(action){
		return this[action]['actionProp']	
	},
	// todo
	// 將setActionProp 由 __action 改為 action本身
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
	// 每個ACTION 均EXTEND ACTIONBEHAVIOR 因此於action 中this 所指的對象並非controller 本身
	// 而是指 actionbehavior ,若想在action內存取controller的function 則可使用 this.parent.xxxx 或 this.c.xxxx
	// 同樣的若想想在action 以外執行 renderas,renderview,cancelview時 則必需加入參考
	// 如 this.CancelView.call(this[view],view)
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
	
	
	
	
	

	// 改!!
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
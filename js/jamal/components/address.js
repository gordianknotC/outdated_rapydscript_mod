
jamal.fn.extend({
    /* Constructor */

    address: function(){
        this.address.active = true;
        this.address.loaded = true;
		
        log('excute address!!')
        $.address.init(function(event){
			log('address init!! this = ',this)
            //jamal.address.init(event)
        })
        
        $.address.internalChange(function(event){
			
            jamal.address.internalChange(event)
        })
        
        $.address.externalChange(function(event){
            jamal.address.externalChange(event)
        });
		
		$.address.change(function(event){
			jamal.address.change(event)
		})
        
    }
});

jamal.fn.extend(jamal.fn.address, {
	initialized:false,
    active: false,
    loaded: false,
	defaultctrl:'Portfolio',
	defaultact:'index',
	
	init: function(event){
		// todo 
		// 由WEB2PY 傳入BASE URL
		// 若 INIT 的URL 中 非BASE URL 即有# 者......$.address.value(xxxx)
		log('inside init!! base web2py url = ',$.w2pPath)
        log("value 			= ", $.address.value());
        log("path 			= ", $.address.path());
        log("pathNames 		= ", $.address.pathNames());
        log("parameterNames = ", $.address.parameterNames());
        log("queryString 	= ", $.address.queryString());
        
		
        // $('a').address(function() {
        //	log('addressTrigger ,add address to history')
        //	return $(this).attr('href').replace(location.pathname, '');
        //});
        
        this.bindClick('a[rel]')
    },
	// todo
	// address 為指向jamal address的URL
	// href 為 server url
	bindClick:function(s){
		s ? s : s= 'a[rel]'
		$(s).unbind('click')
        $(s).click(function(event){
			log('address rel click ,....this = ',this)
            var path = $(this).attr("href")
            path = path.split(':')
            path = path[path.length - 1]
			$.address.title('Jamal Demo '+path)
			$.address.target = $(this)
            $.address.value(path)
            event.preventDefault()
        });
	},
	
    internalChange: function(event){
    },
	
    change: function(event){
		// jamal.address.freshurl:當SERVER發生轉址時 為了更新轉址 設jamal.address.freshurl = true
		if(jamal.address.freshurl == true){
			jamal.address.freshurl = false
			return
		}
        var path 		= event.path
        path 			= path.split(':')
        path 			= path[path.length - 1]
		if(path.indexOf(jQuery.w2pApp)>-1){
			path = path.split(jQuery.w2pApp)[1]
		}
		var _sections	= path.split('/')
		if (_sections[0] == "") {	
			_sections.shift()
		}
        var controller 	= _sections.shift()
        var action 		= _sections.shift()
		var args 		= _sections
        var query 		= event.queryString.split('&')
		var _param 		= {}
		
		for(i=0;i<query.length;i++){
			var parse = query[i].split('=')
			_param[parse[0]]=parse[1]
		}
		_param['vars']=event.queryString
		_param['args']=args
		_param['click_from'] = $.address.target
		
		log('in address change!!')
		if(action == undefined && jamal.address.initialized){
			log('switch to defaultAction .... controller = ',controller)
			action = jamal.config.defaultAction[controller]
		}
		log("externalChange baseURL = ", 		event.target.baseURL())
        log("externalChange target = ", 		event.target)
        log("externalChange event = ", 		event)
        log('externalChange controller = ', controller + "_________")
        log('externalChange action = ', 	action + "_________")
		log('externalChange _param = ', 	_param)
		log('externalChange args = ', 		args)
        log('externalChange enter  path = ',path)
        
        
        // autoUpdate(false) 可以讓jqueryAddress不處理超連結
        $.address.autoUpdate(false)
		
		
		
        switch (controller) {
            case 'debugmode':
                enableDebug()
				showDebug()
				controller 	= this.defaultctrl
				action 		= this.defaultact
                break
            case 'normalmode':
                closeDebug()
				controller 	= this.defaultctrl
				action 		= this.defaultact
                break
        }
		
		if (jamal.address.initialized) {
			try {
				if(this.isStartPage(path,controller,action)){
					this.gotoStartPage(_param)
				}else{
					_param.action = action
					jamal.c[controller].query = _param
					//jamal.c[controller][action](_param)
					log('jQuery address click!!________________ action = ', action)
					jamal.excute(controller,action,_param)
					//jQuery[controller + 'Controller'][action](_param)
				}
			} 
			catch (e) {
				// 自動生成CONTROLLER 及ACTION 也就是說不一定要有個相應的CONTROOLER.JS 及ACTIOIN
				// 但只限該CONTROOLER 不在INIT RENDER內
					var ctrl = {}
					log('jamal.c[controller] = ',jamal.c[controller])
					if (!jamal.c[controller]) {
						//{controller:{}}
						ctrl[controller]={}
						jamal.c[controller]='temp'
					}else{
						ctrl[controller] = jamal.c[controller]
					}
					log('jamal.c[controller][action] = ',jamal.c[controller][action])
					if(!jamal.c[controller][action]){
						ctrl[controller][action] = function(query){
							log('==>  ___________'+action,query)
						}
						jamal.c(ctrl)
					}
					
					_param.action = action
					jamal.c[controller].query = _param
					log('jQuery address click!!________________ action = ', action)
					jamal.excute(controller,action,_param)
					//jQuery[controller + 'Controller'][action](_param)
					
					log('address comp::Controller not found ,copy index to  controler = ' + controller + ',action = ' + action + '   ,error message:' + e)

				
			}
		}else if(!jamal.address.initialized){
			// ender 的URL 中 有HASH #
			if(location.hash){
				jamal.address.initialized = true
				$.address.update()
			}
			
		}
        $.address.autoUpdate(true)
		jamal.address.freshurl = false
		jamal.address.initialized = true
    },
    externalChange: function(event){
    },
	gotoStartPage:function(_param){
		for(_ctrl in jamal.initActions){
			var _act = jamal.initActions[_ctrl]
			log('in gotoStargPage: '+_ctrl,_act)
			_param.action = _act
			jamal.c[_ctrl].query = _param
			
			jamal.excute(_ctrl,_act,_param)
			//jQuery[_ctrl+'Controller'][_act](_param)
		}
	},
	isStartPage:function(path,ctrl,act){
		if(path != '/'){
			log('pat != /')
			var _act = jQuery.w2pFunc
			var _ctrl = jQuery.w2pCtrl
			if(ctrl == _ctrl && act == _act){
				return true
			}
			return false
		//當HISTORY 回到起始頁會為因找不到ACTION CONTROLLER 而錯誤	
		}else{
			log('path == /')
			
			log('return true')
			return true
		}
	}
    
    
});

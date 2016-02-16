
var debugcss = '#debug{	color:#000;	background:#aa3;font-size:.8em;z-index:100;padding-bottom:5px;display:none;overflow:hidden;margin:0}'


jamal.fn.extend({
    debugutil: function(){
		console.log('debug util!!','oweifjoiewfjoeijf')
        this.debugutil.active = true;
        this.debugutil.loaded = true;
		if(jamal.debug){
			//enableDebug()
		}
		
    }
});

jamal.fn.extend(jamal.fn.debugutil, {
    active: false,
    loaded: false

});

// IE不支援jQuery append 至head>STYLE中
// IE不支援jQuery html   至head>STYLE中
function log(key, value){
	
    if (jamal.debug == true) {
        var _target = $("div#debug")
        
        if (_target.attr('initial') == undefined) {
			_target.attr('initial','true')
		
            _target.click(function(){
				

                if (_target.attr("isclicked") == "true" || _target.attr("isclicked") == undefined) {
                    //console.log(_target.attr("isclicked"))
                    _target.animate({"height": "8px"}, 500)
                    _target.attr("isclicked", "false")
                }
                else {
                    //console.log(_target.attr("isclicked"))
                    h = getHeight("div#debug")
                    
                    _target.animate({"height": h}, 500, 
					function(){
                        _target.css("height", "auto");
                    })
                    _target.attr("isclicked", "true")
                }
            })
        }
        
        var data = '<p style = "font-size:.8em;color:#c7a;background:#000;margin:0;padding:0">' + key + ' ,<span style="color:#999">' + value + '</span></p>'
        $('div#debug').append(data)
		
		
		try{
			//console.log(key, value);
		}catch(e){
				
		}
    }
    
    
}
function showDebug(){
	 $("div#debug").css("display", "block")
	 if($.browser.msie){
	 	$('body').prepend('<script type="text/javascript" src="https://getfirebug.com/firebug-lite.js"></script>')	
	 }
	 
	
}

function closeDebug(){
    $("div#debug").css("display", "none")
	$("div#debug").remove()
}

function enableDebug(){
    debug = true
    var _target = $("div#debug")
			
    if (_target[0] == undefined) {
		if ($.browser.msie){
			//var _firebug = '<script id="dynamicFirebug" type="text/javascript"> </script>'
			var _html = '<style>'+debugcss+'</style><div id = "debug">Debug logs:</div>';
        	//$('body').html(_html);
			$('body').prepend(_html)
			//$('#dynamicFirebug').attr('src','firebug-lite.js')		
			 
		}else{
			var _html = '<div id = "debug">Debug logs:</div>'
        	$('style').append(debugcss)
        	$('body').prepend(_html)
		}
        
        //console.log(_html)
    }
}



// get element actual height no matter the overflow is hidden or not
function getHeight(selector){
	
    var _display 		= $(selector).css("display")
	if($.browser.msie){
		//若TEMPLOC的值為空的,IE會找不到
		var insertchunk 	= '<div temploc="temp" style="clear:both;"></div>'
	}else{
		var insertchunk 	= '<div temploc="" style="clear:both;"></div>'
	}
	
	
    $(selector).append(insertchunk)
    $(selector).show()
	
	if($.browser.msie){
		var h1 	= $(selector).offset()["top"]
    	var h2 	= $(selector+' div').offset()["top"]
	}else{
		var h1 	= $(selector).offset()["top"]
    	var h2 	= $(selector+' div[temploc]').offset()["top"]
	}

	$(selector 			+ ' div[temploc]').detach()

    //$(selector).has('div[temploc]').detach()
    $(selector).css("display", _display)
    return h2 - h1
}

function trim(ref){
	ref = ref.replace(/^\s+|\s+$/g, '');
	return ref 
}

//append or modify class in style tag
// IE不支援JQUERY APPEND 及HTML 到HEAD>STYLE 所以只能將STYLE TAG 加到BODY中
// IE不支援 TRIM
function modifyClass(name,prop){
		if($.browser.msie){
			var atstyle = $('body style');
			var csses = trim(atstyle.html()).split('}');
			
			for(i=0;i<csses.length;i++){
				var css = csses[i];
				if(css.indexOf(name)!= -1){
					var targetcss = css.split("{");
					targetcss[1] = prop;
					csses[i] = targetcss.join("{");
					atstyle.detach();
					$('<style>'+csses.join("}")+'</style>').appendTo('body')
        			//$('body').html(_html);
					
					return
				}
			}
			$('<style>'+csses.join("}")+name+'{'+prop +'}'+'</style>').appendTo('body')
			
		}else{
			var atstyle = $('style');
			var csses = atstyle.html().trim().split('}');
			
			for(i=0;i<csses.length;i++){
				var css = csses[i];
				if(css.indexOf(name)!= -1){
						var targetcss = css.split("{");
						targetcss[1] = prop;
						csses[i] = targetcss.join("{");
						atstyle.html(csses.join("}"));
						return
				}
			}
			atstyle.html(csses.join("}")+name+'{'+prop+'}');
		}
		
}





















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
















jamal.fn.extend({
    /* Constructor */
	
    animeStack: function(){
        this.address.active = true;
        this.address.loaded = true;
    }
});

jamal.fn.extend(jamal.fn.animeStack, {
	initialized:false,
    active: false,
    loaded: false,
	data:{},
	selectors:[],
	// tag@selector
	// css@selector
	// anime@selector
	register:function(s){
		if(typeof(s)== 'string'){
			this.selectors.push(s)
		}else{
			this.selectors=s
		}
		
	},
	save:function(flag,flush){
		
		if(!flush & this.data[flag]){
			return
		}
		var s = this.selectors
		this.data[flag] = []
		for(d in s){
			var selector = s[d],
			current = this
			current.data[flag][selector] = []
			
			$(selector).each(function(index){
				css = {}, _css = $(this).attr('style')
				_css ? _css : _css = ''
				
				if (_css) {
					var sp = _css.split(';')
					for (i in sp) {
						var pair = sp[i].split(':'), key = pair[0], value = pair[1], list = {}
						
						list[key] = value
						css[key] = value
					}
				}
				
				css['raw'] = _css
				current.data[flag][selector][index] = css
			})
				
			
			
			
		}
	},
	restore:function(flag){
		var d = this.data[flag]
		for(selector in d){
			tag = selector.split('@')[0]
			
			if(tag != selector){	// 未實作
				switch(tag){
					case 'css':
						$(selector).attr('style',d[selector]['raw'])
					break
					case 'anime':
						for(key in d[selector]){
							if(d[selector]){
								$(selector).animate(d[selector],500)
							}
						}
					break
				}
			}else{
				$(selector).each(function(index){
					$(this).attr('style',d[selector][index]['raw'])
				})
			}
			
		}
	}
    
    
});

















jamal.fn.extend({
    /* Constructor */

    headerCatcher: function(){
        this.headerCatcher.active = true;
        this.headerCatcher.loaded = true;
    }
});

jamal.fn.extend(jamal.fn.headerCatcher, {
    active: false,
    loaded: false,
	data:'',
	headers:['noCache',				'stopRender','loaded',
			'web2py-component-flash','redirectTo','modalMessage',
			'web2py-component-command','flushCache'],
	
	Catch:function(xhr,current,view){
		log('########        #catch0         ###########')
		for (i in this.headers){
			var header = this.headers[i]
			log('########        #catch1         ###########',header)
			var data = xhr.getResponseHeader(header)
			if(data){
				header = header.replace(/-/g,'_')
				log('########        #catch2         ###########',this[header])
				this[header](data,current,view)
			}
		}
		
		var key = xhr.getResponseHeader('cacheKey')
	},
	
	web2py_component_command:function(data,current,view){
		eval(data)
	},
	
	web2py_component_flash:function(data,current,view,type){
		if(data){
			$('div.flash').html(data).slideDown()
		}
		
		//$('div.flash').html(data).slideDown().delay(2000).slideUp()
	},
	loaded:function(data){
		$('div.flash').html(data).slideUp()
	},
	flushCache:function(data,current,view){
		('///////////////////flushCache/////////////////////////////////////////////////////////')
		for(key in current.cache){
			if(key.indexOf(data)>-1){
				('///////////////////delete/////////////////////////////////////////////////////////')
				delete current.cache[key]
			}
		}
	},
	clearForm:function(target){
		elements = $(target).get(0).elements
		for(i in elements){
			var o = elements[i]
		    if(o.name){
				$(o).val('')
			}
		}
		$('div.error',elements).remove()
	},
	redirectTo:function(data,current,view){
		if(jamal.config.ignoreAppUrl){
			data = data.replace('/'+current.App,'')
		}
		jamal.address.freshurl = true
		location.href = '#'+data
		
	},
	modalMessage:function(data,current,view){
		var target = $('div.modalWindow p')
		target.html(data)
		var tar = $('div.modalWindow')
		
		tar.showModalBox(function(){
			setTimeout('$("div.modalWindow").closeModalBox()','1000')
			
		})	
	},
	stopRender:function(){
		jamal.v.autoRender = false
	},
	noCache:function(data,current,view){
		current.noCache = true
	}
});

















jamal.fn.extend({
    modal: function(content) {
		jamal.modal.loaded = true
        if (content) {
            if (!jamal.modal.active) {
                // deactivate screen
                jQuery('body').css('overflow', 'hidden');
                if (jQuery.browser.msie) {
                    jQuery('select').hide();
                }
				
				//	Insert content, specified by the parameter, to the beginning of each element 
				//	in the set of matched elements.
                jQuery('#wrapper')
                    .prepend('<div id="jamal_overlay"></div>')
                    .prepend('<div id="jamal_modal"><div class="jamal_size">'+content+'</div></div>');
                
                jQuery('#jamal_overlay')
                    .css({'background-color': '#000',
                          'position': 'absolute',
                          'width': '4000px',
                          'height': '4000px',
                          'float': 'left',
                          'margin-left': '-1500px',
                          'top': '0',
                          'left': '0',
                          'z-index': '80',
                          'filter': 'alpha(opacity=50)',
                          '-moz-opacity': '.50',
                          'opacity': '.50'});
                jQuery('#jamal_size').css('position', 'relative');
                jQuery('#jamal_modal')
                    .css({'position': 'absolute',
                          'background-color': '#fff',
                          'border': '4px solid #ccc',
                          'width': '380px',
                          'height': '305px',
                          'padding': '10px',
                          'z-index': '900'});
                jamal.modal.active = true;
            } else {
                jQuery('div.jamal_size').html(content);
            }
            jamal.modal.resize();
            return true;
        } else {
            return false;
        }
    }
});

jamal.fn.extend(jamal.fn.modal, {
    active: false,
	loaded: false,

    resize: function() {
        // width
        jQuery('#jamal_modal').css('width', jQuery('div.jamal_size').width()+'px');
        
        var body = jQuery('#wrapper').width();
        var modal = jQuery('#jamal_modal').width();
        jQuery('#jamal_modal').css('margin-left', (body/2-modal/2)+'px');
        
        // height
        jQuery('#jamal_modal').css('height', jQuery('div.jamal_size').height()+'px');
        if (jQuery.browser.msie) {
            var offset = document.documentElement.scrollTop;
            body = document.documentElement.clientHeight;
        } else {
            var offset = window.pageYOffset;
            body = window.innerHeight;
        }
        modal = jQuery('#jamal_modal').height();
        jQuery('#jamal_modal').css('margin-top', (offset + body/2 - modal/2) +'px');
    },
    
	/**
     * Close the current dialog
	 *
	 * @example jamal.close();
	 *
	 * @private
	 * @name close
	 * @type jamal
	 * @cat modal
	 */
    close: function() {
        if (jamal.modal.active) {
            jQuery('#jamal_modal').fadeOut('slow');
            jQuery('#jamal_overlay').remove();
            jQuery('body').css('overflow', 'auto');
            if (jQuery.browser.msie) {
                jQuery('select').show();
            }
            jamal.modal.active = false;
        }
    }
});

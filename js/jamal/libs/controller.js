
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
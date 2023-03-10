
jamal.m = jamal.fn.m = function(model) {
    if(typeof model === 'object') {
        var inherited;
        for ( var i in model) {
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

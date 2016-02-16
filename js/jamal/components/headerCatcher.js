
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
			setTimeout('tar.closeModalBox()','1000')
		})	
	},
	stopRender:function(){
		jamal.v.autoRender = false
	},
	noCache:function(data,current,view){
		current.noCache = true
	}
});














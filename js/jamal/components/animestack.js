/* test
data = {}
selectors=[]
function reg(selector){
		selectors.push(selector)
	}
	function save(flag,flush){
                
		if(data[flag] & flush == undefined){
			return
		}
		
		var s = selectors
		data[flag] = []
		for(d in s){
			var selector = s[d],
				css		 = {},
				_css 	 = $(selector).attr('style')
				_css ? _css : _css = '' 
			
			if(_css){
				var sp = _css.split(';')
				for(i in sp){
					var pair = sp[i].split(':'),
						key = pair[0],
						value = pair[1],
						list  = {}
					
					list[key] = value
					css[key] = value
				}
			}	
			
			css['raw'] = _css
			data[flag][selector] = css
		}
	}*/

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



(function ($) {
	
    $.renderComp = {
		register:function(s,p){
			this.pattern = {section:s,pattern:p}
		},
		
		propertyBag:{},
		renderRule:{},
		patterns:{},
		
		outputChild:function(){ //<script>outputChild</script>
			
		},
		//Usage:: 1.render(name) 2.render(name,patternTarget,fetchDataFunction) 3.render(patternTarget,fetchDataFunction) 4.render(patternTarget)
		//			external  		external									  inside html							inside html
		render:function(opt){
			if(opt != undefined){

				var sectionDefined 	= (opt.section != 	undefined)
				var patternDefined 	= opt.pattern != 	undefined
				var fetchDefined 	= opt.fetch != 		undefined
				
				log('render ',sectionDefined +" ,"+patternDefined+" ,"+fetchDefined)
				
				// Usage1: render(name)
				if (sectionDefined && patternDefined && !fetchDefined) {
					log('usage1 name = ',opt.section)
					this.register(opt.section,opt.pattern)
					this.renderTemplate(opt.section,opt.pattern)
					
					
				// Usage2: render(name,patternTarget,fetchFunction)
				}
				
			// Usage5: render()
			}else{
				this.renderTemplate()
			}
			
		},// render
		
		
		renderTemplate:function(_sec,_ptn){
			//a for(i=0;i<44;i++)
			//b for(i=0;i<$abc.length;i++]
			//c for(i in $abc)
			//var _for = /\{for[\>\<\040\+\-\.\;\&\=\+\-\!\$\(\)a-zA-Z0-9]+\}/g
			//var _if = /\{if[\>\<\040\+\-\.\;\&\=\+\-\!\$\(\)a-zA-Z0-9]+\}/g
			//var _var = /\{var[a-zA-Z0-9\;\=\-\$\.\*]+\/\}/g
			//var _end = /\{\/[a-z]+\}/g
			
			var _all = /(\{for[\[\]\>\<\040\+\-\.\;\&\=\+\-\!\$\(\)a-zA-Z0-9]+\})|(\{if[\[\]\>\<\040\+\-\.\;\&\=\+\-\!\$\(\)a-zA-Z0-9]+\})|(\{var[a-zA-Z0-9\;\=\-\$\.\*]+\/\})|(\{\/[a-z]+\})/g
			
			var index = 0
			var ndex = -1
			var stack = []
			var state = 'close'
			var unclosed = []
			
			
			
			if(_ptn.constructor == Object){
				var str = _ptn.html().replace('&gt;','>').replace('&lt;','<')
			}else{
				var str = _ptn.replace('&gt;','>').replace('&lt;','<')
			}
			
			
			str = str.replace(_all,callback)
			var stripped = str.split('__@section__')
			
			log('stack = ' ,stack)
			for(k in stripped){
				log(stripped[k])
			}
			
			
			
			
			
			
			var renderedHTML = ''
			
			renderedHTML +=stripped[0]
			
			for (_i_=0;_i_<stripped.length-1;){
				var section = stripped[_i_+1]
				var type = 	stack[_i_].type
				log('type = ',type)
				switch(type){
					case 'for':
					
					
						if(!stack[_i_].calling){
							stack[_i_].param 		= stack[_i_].from.split('=')[0]
							stack[_i_].from 		= parseInt(stack[_i_].from.split('=')[1]) -1
							stack[_i_].instance 	= stack[_i_].instance.replace(stack[_i_].param,'stack[_i_].from')

							var inst = this.renderHTML(stack[_i_].instance)
							stack[_i_].instance = inst
							log('stack[_i_].instance = ',stack[_i_].instance)
						}
						stack[_i_].calling 			 = true
						stack[_i_].from ++
						var param = stack[_i_].param
						var from =  stack[_i_].from
						log('stack[_i_].from = ',from)
						log('stack[_i_].param = ',param)
						log('eval(stack[_i_].instance = ',eval(stack[_i_].instance))
						
						
						if(eval(stack[_i_].instance)){
							this.renderRule[param] 	= from
							log('set rule , rule = ',this.renderRule[param])
							renderedHTML += this.renderHTML(section)
							_i_++
						}else{
							log('this.renderRule = ',this.renderRule)
							clearRule(stack[_i_],type)
							
							section = stripped[stack[_i_].end+1]
							log('end for: section = ',section)
							renderedHTML += this.renderHTML(section)
							_i_ = stack[_i_].end +1
							log('callnext !!',_i_)
							
						}
						
						break
						
					case 'forin':
						if(!stack[_i_].calling){
							
							log('stack[_i_].data	=',stack[_i_].data	)
							
							stack[_i_].data		= this.renderHTML(stack[_i_].data)
							
							var keydata = []
							
							log(' stack[_i_].data = ', stack[_i_].data)
							
								
							
							for(i in stack[_i_].data){
								keydata.push(i)
								log('keydata .push = ',i)
							}
							log('keydata = ',keydata)
							
							stack[_i_].keydata = keydata
						}
						
						stack[_i_].calling 					= true
						log('stack[_i_].keydata.length = ',stack[_i_].keydata.length)
						if(stack[_i_].keydata.length>0){
							var k = stack[_i_].keydata.shift()
							log('stack[_i_].keydata.shift() = ',k)
							this.renderRule[stack[_i_].key] 	= k
							renderedHTML += this.renderHTML(section)
							_i_++
						}else{
							clearRule(stack[_i_],type)
							section = stripped[stack[_i_].end+1]
							renderedHTML += this.renderHTML(section)
							_i_ = stack[_i_].end +1
						}
						
						break
						
					case 'if':
						var instance= stack[_i_].instance
						log('if instance = ',instance)
						if(eval(instance)){
							log('if instance ==',true)
							renderedHTML += this.renderHTML(section)
							_i_++
						}else{
							log('if instance ==',false)
							//block(stack[_i_])
							_i_++
						}
						break
						
					case 'end':
						log('end!!')
						if (stack[_i_].text == '{/if}') {
							log('if end callnext')
							section = stripped[_i_+1]
							log('section = ', section)
							renderedHTML += this.renderHTML(section)
							_i_++
							break
						}
						else {
							log('back to head , head = ', stack[_i_].head)
							_i_ = stack[_i_].head // calback to head
							break
						}
				}// Switch

			}// Loop
			function clearRule(s,type){
				log('clearRule type = ',type )
				log('$.renderComp.renderRule = ',$.renderComp.renderRule)
				switch(type){
					case 'for':
					for(param in $.renderComp.renderRule){
						log('clearRule... param = '+param,' s.param = '+s.param)
						if(param == s.param){
							delete $.renderComp.renderRule[param]
						}
					}
					break
					case 'forin':
						for(key in s.data){
							log('clearRule... key = '+key,' rule[key] = '+$.renderComp.renderRule[key])
							if($.renderComp.renderRule[key] != undefined){
								delete $.renderComp.renderRule[key]
							}
						}
					break
				}	
			}// clearRule
			
			function callback(match){
				log('match! ',match)
				var isfor = match.indexOf("{for")>-1
				var isif = match.indexOf("{if")>-1
				
				if(isfor | isif){
					if(state == 'open'){
						unclosed.push(stack.length-1)
						log('unclosed = ',unclosed)
					}
					state = 'open'
					index++
					ndex++
					
					var ins = match.split('(')[1].split(')')[0]
					if(isif){
						stack[ndex]=({l:index,text:match,type:'if',instance:ins,text:match,calling:false})
						
					}else{
						var isforin = match.indexOf(" in ")>-1
						
						if(isforin){
							var k = ins.split(' in ')[0]
							var d = ins.split(' in ')[1]
							stack[ndex]=({l:index,text:match,type:'forin',key:k,data:d,calling:false})
							
						}else{
							var sec = ins.split(';')
							var f = sec[0]
							var inst = sec[1]
							var t
							
							inst.split('=')?t=inst.split('=')[1]:t = inst.split(';')[1]
							var i = sec[sec.length-1]
							
							log('inst = ',inst)
							stack[ndex]=({l:index,text:match,type:'for',from:f,to:t,increase:i,calling:false,instance:inst})
							
							
						}
						
					}
					
					log('{for ',index)

				}else if(match.indexOf('{var')>-1){
					
				}else{
					index++
					ndex++
					if(state == 'open'){
						state = 'close'
						
						var head = ndex -1
						var end = ndex
						var l = stack[head].l
						var r = index
						
						stack[head].r = r
						stack[head].end = end
						
						stack[end]={r:r,l:l,head:head,text:match,type:'end',calling:false}
					}else{
						log('unclosed = ',unclosed)
						var head = unclosed.pop()
						var end = ndex
						var l = stack[head].l
						var r = index
						
						stack[head].r = r
						stack[head].end = end
						
						stack[end]={r:r,l:l,head:head,text:match,type:'end',calling:false}
						log('unclosed = ',unclosed)
					}
					
					
				}
				
				return '__@section__'
			}
			log('renderedHTML = ',renderedHTML)
			$('div[renderer='+_sec+']').html(renderedHTML)

		}, // RenderTemplate
		
		
		
		// Usage1: renderHTML(section)			<- when script outside HTML
		// Usage2: renderHTML()					<- when script inside HTML
		renderHTML:function(html){
			log('html = '	,html)
			if(html=="" | html== undefined){
				return
			}
			var reg = /\$[0-9a-zA-Z.\[\]\.]+/g
			var reg2			= /[\[\]\.]+/g

			var _data 			= this.propertyBag
			var rule			= this.renderRule
			var parameters 		= html.match(reg)
			var _html 			= html.split(reg)
			
			log('_data = '	,_data)
			log('_html = '	,_html)
			log('rule = '	,rule)
			log('parameters = ',parameters)
			
			if(parameters){
				for(i=0;i<parameters.length;i++){
				parameters[i] = parameters[i].split(reg2);
				if(parameters[i].length >1){
					for(j=1;j<parameters[i].length;j++){
						if(parameters[i][j] != ""){
							log(parseInt(parameters[i][j]))
							
							log('rule = ',rule)
							log('parameters[i][j] = ',parameters[i][j])
							log('rule[parameters[i][j]] = ', rule[parameters[i][j]])
							if(rule[parameters[i][j]] != undefined){								// render renderRule
								parameters[i][j] = rule[parameters[i][j]]
							}
								
							if(parseInt(parameters[i][j]).toString() == 'NaN'){
								parameters[i][j] = "'"+parameters[i][j]+"'"			// ex: set => "set"    (description[set] => description["set"])
							}
							parameters[i][j] = '['+parameters[i][j] +']'			// ex: set => [set]
						}
					}
				}
				}
			}
			
			
			
			log('base parameters = ',parameters)	
				
			for (i = 0; i < _html.length-1; i++) {
				log('parameters = ',parameters[i][0].split('$')[1])
				var __data = _data[parameters[i][0].split('$')[1]]
				
				
				if(__data == undefined){
					log('__rule = ',rule.i)
					var __data = rule[parameters[i][0].split('$')[1]]
				}
				
				log('__data = ',__data)
				
				parameters[i].shift()
				var p = parameters[i].join("").toString()
				__data = eval('__data'+p)
				log('p = ',p)
				log('__data+p = ',__data)
				if(__data.constructor == Object){
					return __data
				}
				_html[i] = _html[i] + __data
			}

			return _html.join('')
		}// RenderHTML______
	}// RenderComp_______
    
}(jQuery));





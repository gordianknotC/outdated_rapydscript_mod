
// 所有的資料,CSS,SERVER 抓取圴放入MODEL
// 所有資料傳遞,設定,均放入CONTROLLER
// 所有VIEW RENDER ,ANIMATION RENDER 均放入VIEW
// 共用資料,FUNCTION 放入APP_M APP_V APP_C
// 非共用資料,FUNCTION 放入M V C
jamal.extend(jamal.fn.v.prototype, {
    
    
  
   
});


jamal.extend(jamal.fn.m.prototype, {
	
	property:{},
	db:'server',	//server , json , memory
	cacheQuery:'',
	url:'',
	
	jsonData:{},
	
	findAll:function(callback){
		this.property = {}
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	findById:function(id,callback){
		this.property = {id:id}
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	find:function(query,callback){
		this.property = query
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	findInJson:function(query){
		var r = []
			for(i=0;i<this.jsonData.__count__;){
				var data = this.jsonData[i]
				var back = false
				for(q in query){
					if(data[q] != query[q]){
						back = true
					}
				}
				if (back == false){
					r.push(data)
				}
			}
			return r
	},
	
	// before this.get method
	beforeFind:function(xhr){
		
	}
	
});


jamal.extend(jamal.fn.c.prototype, {
	// 基本上JAMAL內建的BEFOREACTION ,AFTERACTION 只有在JAMAL PARSE METADATA 後初始化CONTROLLER時才會執行,一般的ACTION 並不會執行
    components: ['debugutil','address','headerCatcher','animeStack'],
	//components: [],
	setCurrentPositionTo:function(type){
		log('@ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
		
		try{
			if(jamal.c.portfolio.__show.animating){
				return
			}
		}catch(e){
			jamal.c.portfolio['__show']={animating:true}
		}
		
		var selectors = ["div#website", "div#blog", "div#about", "div#contact", "div#portfolio"]
		
		if(type != 'portfolio' | type!='blog'){
			jamal.v.portfolio._menuSize('Tiny')
		}

		var bgcolor = "rgba(0,0,0,0)"
		
					
		if($.browser.msie){
			$('div#menu>div').css("width",'auto')
			bgcolor = "#00000000"
		}
		log('2 @ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
		jamal.c.Nav.laststate = jamal.c.Nav.state
		jamal.c.Nav._select(type)
		
		
		var lastflag = jamal.c.Nav.laststate,
			flag	= jamal.c.Nav.state
			registered = jamal.animeStack.selectors.length > 0,
			saved		= jamal.animeStack.data[lastflag]
			
				
		log('3 @ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
		if(!registered){
			var n = 'div#navigation'
			var regs=[n,
			n+' div#img',
			n+' h5',
			n+' div#navbt',
			'div#menu',
			'div#menu #row1',
			'div#menu #row2',
			'div#menu>div>div>div',
			'div#menu div.navBg',
			'div#blogphoto',
			'div#container',
			'div#footer']
			
			jamal.animeStack.register(regs)
		}
		
		if(lastflag == 'blog'){
			jamal.animeStack.restore(lastflag)	
		}
		
		if(flag == 'blog'){
			if(!saved)	jamal.animeStack.save(flag)
			if($.browser.safari)  $('div#navbt div').css('padding','16px 8px')
			
			$("div>div>div[style]",$('div#menu')).data('closeover',true)
		}else{
			if ($.browser.safari) {
				$('div#navbt div').css('padding', '18px 8px')
				$('div#describe').css('margin-top','20px')
			}
			if($.browser.mozilla) $('div#describe').css('margin-top','20px')
			$("div>div>div[style]",$('div#menu')).data('closeover',false)
			$('div#login').css('display','none')
			
		}
		
		

			
		
		
		
		log('4 @ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
		switch(type){
			case 'portfolio':
				var sid = 4
				var corner = ""
				
				break
			
			case 'about':
				var set = 15
				var sid = 2
				var corner = ",div#corner"
				var PW = 120
				var param = {id:set,action:'inittitle',args:[set]}
				//jQuery.portfolioController.inittitle(param)
				log('in setCurrentPositionTo....about','')
				jamal.v.portfolio._title({id:set,
								titleH:180,
								tableW:220,
								pW:110})
				jamal.excute('portfolio','inittitle',param)
				

				var c	 = this.m.getColors()
				var data = {colors:	c[set-1],
							imgnum: 1}
							
				
				jamal.v.portfolio._colorTransform(data)
				break
			
			case 'blog':
				var set = 16
				var sid = 1
				var corner = ""
				$('div#title').css('display','none')
				
				var c	 = jamal.m.portfolio.getColors()
				var data = {colors:	c[set-1],
							imgnum: 1}
				
				jamal.v.portfolio._menuSize('Tiny2')
				jamal.v.portfolio._colorTransform(data)
				break
			
			case 'contact':
				var set = 14
				var sid = 3
				var corner = ""
				$('div#describe').html('')
				jamal.v.portfolio._title({id:set,titleH:90})
				
				var c	 = this.m.getColors()
				var data = {colors:	c[set-1],
							imgnum: 1}
				
				
				jamal.v.portfolio._colorTransform(data)
				
				$('div#navigation').corner('Bottom 15px')
				$('div.logobg').corner('Bottom 15px')
				$('div#navbt').corner('Bottom 15px')
				$('div#navbt li>a>div').corner('BR 15px')
				$('div#title').corner('Bottom 15px')
				break
			
			case 'website':
				var set = 17
				var sid = 0
				var corner = ",div#corner"
				$('div#describe').html('')
				jamal.v.portfolio._title({id:set,titleH:90})
				
				
				var c	 = this.m.getColors()
				var data = {colors:	c[set-1],
							imgnum: 1}
				
				
				jamal.v.portfolio._colorTransform(data)
				break
		}
		
			
		
		var hide = selectors.join(',')
		//console.log(' selectors+corner ',selectors+corner)
		hide = $(selectors+corner)
		hide.css({display:'none'})
		//console.log(' selectors+corner ',hide)
		
		
		
		
		if (corner == "") {
			//console.log('show corner!! [][][][][][][][][][][][][')
			$('div#corner').css('display','block')
			$("div#corner").animate({"width": 750}, 500)
		}
		
		var target = $(selectors[sid])
		
		
		if ($.browser.msie) {
			target.css('display', 'block')
			jamal.c.portfolio.__show.animating = false   
		}
		else {
			target.css({display:'block',opacity:.1})
		    target.animate({
		        "opacity": 1
		    }, {
		        queue: false,
		        duration: 500,
		        complete: function(){
		           
					jamal.c.portfolio.__show.animating = false
					
		        }
		    })
		}
	if(type=='portfolio'){
		var _height = 400
	}else{
		var _height = $("div#"+type.toLowerCase()).innerHeight()
	}
	log('5 @ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
	if (type != 'blog') {
		$("div#navigation").animate({
			"width": 750
		}, 500)
		
		if ($.browser.msie) {
			$("div#title").animate({
				"width": 750
			}, {
				queue: false,
				duration: 500
			})
		}
		else {
			$("div#title").animate({
				"width": 750,
				"backgroundColor": bgcolor
			}, {
				queue: false,
				duration: 500
			})
		}
		
		
		
		
		log('6 @ @ @ @ @ @ -------  setCurrentPositionTo --------- @ @ @ @ @ @ type = ',type)
		$('div#container').animate({
			"height": _height,
			"width": 750
		}, {
			queue: false,
			duration: 500,
			complete: function(){
			
			}
		})
	}
	
	},
	storeAnimeData: function(type){
		var n = 'div#navigation'
		switch(type){
			case 'blog':
				jamal.c.container		= $('div#container').attr('style')
				
				jamal.c.nav_style 		= $(n).attr('style')
				jamal.c.nav_img_style 	= $(n+' div#img').attr('style')
				jamal.c.nav_h5_style 	= $(n+' h5').attr('style')
				jamal.c.nav_bt_style	= $(n+' div#navbt').attr('style')
				break
		}
	},
	restoreAnimeData: function(type){
		var n = 'div#navigation'
		switch(type){
			case 'blog':
				break	
		}
	},
	// 羪成所有BEFOREACT ACFTERACTION BEFORERENDER AFTERRENDER　均寫在app 
	// todo :: beforeAction return 為FALSE時不做之後的ACTION
	
	//
    beforeAction: function(query) {
		switch(query.a){
			case 'about':
			case 'contact':
			case 'website':
			this.c.setCurrentPositionTo(query.a)
			// 在該ACTION 以外CALL RenderAs,CancelView,RenderView 均要加上reference
			this.RenderAs('CustomRender')
			//
			break
			
	
		}
		
    },
    afterAction: function(query) {
    }
    
});


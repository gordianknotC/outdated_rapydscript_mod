

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
		
		jamal.c.Nav.laststate = jamal.c.Nav.state
		jamal.c.Nav._select(type)
		
		
		var lastflag = jamal.c.Nav.laststate,
			flag	= jamal.c.Nav.state
			registered = jamal.animeStack.selectors.length > 0,
			saved		= jamal.animeStack.data[lastflag]
			
				
		
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
		
		
		if(flag == 'blog'){
			if(!saved){
				jamal.animeStack.save(flag)
			}
		}
		if(lastflag == 'blog'){
			$("div>div>div[style]",$('div#menu')).removeAttr('closeover')
			jamal.animeStack.restore(lastflag)	
		}
		
		if (type != 'contact'){
			$('div#navigation div.logobg').corner('1px')
			$('div#title').corner('1px')
		}
		
		
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
				$('div#describe').html('')
				jamal.v.portfolio._title({id:set,titleH:90})
				
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
				$('div#navigation div.logobg').corner('BL 15px')
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
			
			
			$("div#title").css({
				'background': "transparent",
				"-ms-filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=" + bgcolor + ",endColorstr=" + bgcolor + ")",
				"filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=" + bgcolor + ",endColorstr=" + bgcolor + ")"
			});
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

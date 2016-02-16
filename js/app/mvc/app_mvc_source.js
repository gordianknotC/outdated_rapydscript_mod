


$j.m({
    portfolio: {
		// 存檔時:: this.property = {id:1,name:jhon,images:1.jpg} ;this.update()			未實作
		//			this.property = data ; this.update()								未實作
		//			this.property = {id:1}; this.save()									未實作
		
		// Find::   this.findById(id,callback)
		//			this.findAll()
		
		// FindInJson:		this.findInJason(query)
		property: {
			id: '',
			name: [],
			images: [],
			text: []
		},
		
		jsonData: 	{},
		images: 	[],
		db: 		'json', //server , json , memory
		url: 		'app/models/portfolio.json',
		icons:		[],
		queue_h:	[],
		colors:		[],
		descriptions:[],
		
		getColors: function(){
			var c = this.colors
			if ($.browser.msie) {
				if(this.colors[0][0].substr(0,1)!='#')
				var c = this.colors = this.convertColor(c, this.TomsARGB)
			}
			return c
		},
		
		convertColor: function(data, fn){
			for (i = 0; i < data.length; i++) {
				if (data[i].constructor == Array) {
					var len = data[i].length;
					for (j = 0; j < len; j++) {
					
						data[i][j] = fn(data[i][j]);
					}
				}
				else {
					//log("constructor != Array")
					data[i] = fn(data[i]);
				}
				
			}
			return data;
		},
		
		TomsARGB: function(rgba){
			rgba = rgba.split('(')[1].split(')')[0];
			var r = rgba.split(',')[0];
			var g = rgba.split(',')[1];
			var b = rgba.split(',')[2];
			var a = rgba.split(',')[3];
			
			r = eval(r).toString(16);
			g = eval(g).toString(16);
			b = eval(b).toString(16);
			a = (eval(a) * 255).toString(16);
			
			if (r.length == 1) {
				r = "0" + r;
			}
			if (b.length == 1) {
				b = "0" + b;
			}
			if (g.length == 1) {
				g = "0" + g;
			}
			if (a.length == 1) {
				a = "0" + a;
			}
			
			var arbg = '#' + a + r + g + b;
			//var cssdata = 'background: transparent;-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+')"; /* IE8 */ filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+');   /* IE6 & 7 */ zoom: 1;';
			
			return arbg;
		},
		
		getDescriptions: function(){
			return this.descriptions
		},
		process_web2py_data:function(){
			var data = web2py_data['gallery']
			for (i in data){
				for(name in data[i]){
					switch(name){
						case 'colors':
						this.colors.push(data[i][name])
						break
						case 'description':
						this.descriptions.push(data[i][name])
						break
						case 'images':
						this.images.push(data[i][name])
						break
						
					}// switch
				}// for name
			}// i in data
			this.genImages()
		},
		genImages: function(){			
			
			for (i = 0; i < this.images.length; i++) {
				var arr = []
				var xy = {}
				for (j = 0; j < this.images[i].length; j++) {
					var dir = "https://sites.google.com/site/jamalmvc/images/"
					arr.push(dir + this.images[i][j] + '.jpg')
				}
				xy = {
					x: arr.slice(0, 2),
					y: arr.slice(2, arr.length)
				}
				
				this.queue_h[i] = xy
				this.icons[i] 	= dir + "icon" + i + ".jpg"

			}
			log('this.queue_h ==============================',this.queue_h)
			
		},
		
		getImages:function(){
			return this.images
		},
		
		getIcons:function(){
			return this.icons
		},
		
		getQueuedata:function(){
			return this.queue_h
		}
		
	}});


$j.v({ portfolio: {
	//portfolio/show?id=section1_x0_y0
    show: function(view,opt){
        log('portolioView Show!!__________')
		jamal.c.Nav._select('portfolio')
		
		
		this.setActionProp('show',{state:opt.id})
		
		

		
		var duration 	= 750
		var stepx 		= -750
		var stepy 		= -1072
		var data 		= opt.id.split("section")[1] // 1_x0_y0
		
		log('portolioView Show!!__________ data = ',data)
		
		var set 		= data.split("_x")[0] // section No.
		var x 			= data.split("_x")[1].split("_y")[0] // x order of section
		var y 			= data.split("_x")[1].split("_y")[1] // y order of section
		var n 			= eval(x) + eval(4.482666666666667 * (set - 1)) // 
		var _order 		= eval(x) + eval(y)
		
		
		var _prop	 	= this.getActionProp('show')
		var lastframe	= _prop.lastframe
		var animTarget 	= $("div>img#section" + data) // current animation target
		
		log('portolioView Show!!__________ this.getActionProp(show) = ',_prop)
		
		if(lastframe == undefined){
			lastframe = $("div>img#section1_x0_y0")
			lastframe.attr('_x',0)
			lastframe.attr('_y',0)
		}
		
		log("actionTrigger1 x = ", x + " ,y = " + y + " ,n = " + n)
		
		animTarget.attr("_order", _order)
		animTarget.attr("_x", n) // 為了方便存取 for easy acess
		animTarget.attr("_y", y)
		animTarget.attr("set", set)
		
		log("actionTrigger2 x = ", x + " ,y = " + y + " ,n = " + n)
		
		var _w 	= eval($("div#container").css("width").split("px")[0]) //	visual width of animation pic
		var _h 	= eval($("div#container").css("height").split("px")[0]) //	visual height of animation pic
		var w 	= animTarget.innerWidth() //	the actual width of animation pic
		var h 	= animTarget.innerHeight() //	the actual height of animation pic
		
		log("actionTrigger3 _w = ", _w + " ,_h = " + _h + " ,w = " + w + " ,h = " + h)
		
		
		
		var isDefaultSize = (_w != 750 || _h != 400)
		// if isDefaultSize then set scale duration to scale it 
		if (isDefaultSize) {scale_dur = 500}else {scale_dur = 0}
		
		
		
		var isHorizon 	= Math.abs(n - 	lastframe.attr("_x")) > 0 // isHorizonMoving
		var isVerticle 	= (Math.abs(y - lastframe.attr("_y")) > 0) || (y == lastframe.attr("_y") && y != 0) // isVerticleMoving
		
		
		log("animTarget = ", animTarget.selector)
		log("lastframe = ", lastframe.selector)
		log('x, prevx = ', x + ", " + lastframe.attr("_x") + "	 set = " + set)
		log('y, prevy = ', y + ", " + lastframe.attr("_y"))
		log('is horizon = ', isHorizon)
		log('is vertical = ', isVerticle)
		log("pos = ", n * -750 + " ,n = " + n)
		
		
		var isTwoDimensionMoving = (isVerticle == true && isHorizon == true)
		var isMovingFromXtoY 	= ((lastframe.attr("_y") == 0) && isTwoDimensionMoving)
		var isMovingUPtoX 		= ((lastframe.attr("_y") != 0) && (y == 0) && isTwoDimensionMoving)
		var isMovingUPtoXtoDOWN = ((lastframe.attr("_y") != 0) && (y != 0) && isTwoDimensionMoving)
		
		log('isTwoDimensionMoving = ',isTwoDimensionMoving)
		log('isMovingFromXtoY = ',isMovingFromXtoY)
		log('isMovingUPtoX = ',isMovingUPtoX)
		log('isMovingUPtoXtoDOWN = ',isMovingUPtoXtoDOWN)
		
		
		var current = jamal.v.portfolio
		
		if(y==0){
			var _height = 350
		}else{
			var _height = 400
		}
		
		///////////////////////////////////// !!!!!!!!!!!!!!!!!!!!!!!!!   ////////////////////
		//////////////////////////////////// T R I C K   may contain problems!!!!!!!!!!!!!!!!!
		if(set == '13'){
			var __w = 1074
		}else{
			var __w = 750
		}
		
		
		// isTwoDimensionMoving = (isVerticle == true && isHorizon == true)
		if (isTwoDimensionMoving) {
			// Moving X -> Y
			// isMovingFromXtoY = (lastframe.attr("_y") == 0)
			if (isMovingFromXtoY) {
				
				log('test0')
				
				$("div#title").		animate({"width": __w}, {queue: false,duration: scale_dur})
				$("div#navigation").animate({"width": __w}, scale_dur)
				$("div#corner").	animate({"width": __w}, scale_dur)
				
				log('test1')
				
				$("div#container").animate({"width": __w,"height": _height}, scale_dur, function(){
					$('div#portfolio').animate({'left': -750 * n}, duration, 'easeInOutExpo', function(){
						$('div#portfolio').animate({'top': stepy * y}, duration, 'easeInOutExpo', function(){
							$("div#container").	animate({"width": w}, 500)
							$("div#title").		animate({"width": w}, {queue: false,duration: 500})
							$("div#navigation").animate({"width": w}, 500)
							$("div#corner").	animate({"width": w}, 500)
							
							current.setActionProp('show',{lastframe:animTarget,animating:false})
							
						})
					})
				})
				
			}
			
			if(isMovingUPtoX){
				//isMovingFromYtoX
				//isMovingUPtoX				lastframe.attr("_y") != 0
					
					
					$("div#title").		animate({"width": __w}, {queue: false,duration: scale_dur})
					$("div#navigation").animate({"width": __w}, scale_dur)
					$("div#corner").	animate({"width": __w}, scale_dur)
					
					$("div#container").animate({"width": __w,"height": _height}, scale_dur, function(){
						$('div#portfolio').animate({'top': stepy * y}, duration * 1.2, 'easeInOutExpo', function(){
							$('div#portfolio').animate({'left': -750 * n}, duration * 1.2, 'easeInOutExpo', function(){
								current.setActionProp('show',{lastframe:animTarget,animating:false})
							})
						})
					})	
			}
			
			if(isMovingUPtoXtoDOWN){
					// isMovingFromYtoX
					// isMovingUPtoXtoDOWN			y != 0		lastframe._y !=0  => _y -> y0 -> x -> y
				
				$("div#title").		animate({"width": __w}, {queue: false,duration: scale_dur})
				$("div#navigation").animate({"width": __w}, scale_dur)
				$("div#corner").	animate({"width": __w}, scale_dur)
					
				$("div#container").animate({"width": __w,"height": _height}, scale_dur, function(){
					$('div#portfolio').animate({'top': stepy * 0}, duration * 1.2, 'easeInOutExpo', function(){
						$('div#portfolio').animate({'left': -750 * n}, duration, 'easeInOutExpo', function(){
							$('div#portfolio').animate({'top': stepy * y}, duration * 1.2, 'easeInOutExpo', function(){
								$("div#container").animate({"width": w}, 500)
									
								$("div#title").		animate({"width": w}, {queue: false,duration: 500})
								$("div#navigation").animate({"width": w}, 500)
								$("div#corner").	animate({"width": w}, 500)
									
								current.setActionProp('show',{lastframe:animTarget,animating:false})
							})
						})
					})
				})	
			}
			log('%%%%%% ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
			opt.target = animTarget
			log('2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
			this._colorTransform(opt)
			log('2 |+_|+_|+_|+_%$#%#%$#%!@$#^$@^#$@&*^(&(*&(*&)(*)(*_)(+_)+_)+_)+_)+_)')
			this._menuSize('Big')
			return		
		}
		
		log('one dimension section:::::')
		
		$("div#title").		animate({"width": __w}, {queue: false,duration: scale_dur})
		$("div#navigation").animate({"width": __w}, scale_dur)
		$("div#corner").	animate({"width": __w}, scale_dur)
		
		log('one dimension section0:::::')
		
		if (y == 0) {
			log('one dimension section1:::::')
			$("div#container").animate({"width": __w,"height": _height}, scale_dur, function(){
				$('div#portfolio').animate({'left': -750 * n,'top': stepy * y}, duration * 2, 'easeInOutExpo', function(){
					log('set current.setActionProp!!',current)
					current.setActionProp('show',{lastframe:animTarget,animating:false})
				})
			})
		}
		else {
			log('one dimension section2:::::')
			$("div#container").animate({"width": __w,"height": _height}, scale_dur, function(){
				$('div#portfolio').animate({'left': -750 * n,'top': stepy * y}, duration * 2, 'easeInOutExpo', function(){
					$("div#container").animate({"width": w}, 500);
					
					$("div#title").		animate({"width": w}, {queue: false,duration: 500})
					$("div#navigation").animate({"width": w}, 500)
					$("div#corner").	animate({"width": w}, 500)
					
					current.setActionProp('show',{lastframe:animTarget,animating:false})
				})
			})
		}
		
		log('%%%%%% ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		//showTitle(set)
		opt.target = animTarget
		log('1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		this._colorTransform(opt)
		log('1 |+_|+_|+_|+_%$#%#%$#%!@$#^$@^#$@&*^(&(*&(*&)(*)(*_)(+_)+_)+_)+_)+_)')
		this._menuSize('Big')
		return
    },
	
	
	
	gallery:function(opt){
		
		
	},
	// naming convention for form action of contact
	// form: form object sending from web2py_form_trap
	// 
	_contact_formAct:function(form){
		$('div.modalWindow p').html('mail processing please wait..')
		jamal.c.portfolio.__ModalBox('show')
		
		// return true to allow web2py_form_trap sending data to server
		return true	
	},
	_title: function(data){
		
		log('$$$$$$$$$$$$ _title View0..$$$$$$$$$$$$$$$$')
		// call from jamal init
	 	if(data == undefined){
			return
		}
		
		log('$$$$$$$$$$$$ _title View1..$$$$$$$$$$$$$$$$')
		var set			= data.id 
		var _target 	= $('div#scrollimg img')
        var height 		= 86
		
        _target.animate({
            "top": -1 * height * (set - 1)
        }, {duration:500,queue:false})
		
		if(data.titleH != undefined){
			var height		= 90
	        var titleH 		= data.titleH
	        var pW 			= data.pW
	        var tableW 		= data.tableW
	        
	        var title 		= $('div#title')
	        var selector 	= 'div#describe>'
	        var table 		= $(selector + 'table')
	        var p 			= $(selector + 'p')
	        
	        p.attr('style', 	'')
	        table.attr('style', '')
	        
	        table.css(	'width', tableW)
	        p.css(		'width', pW)
			
	        title.animate({
	            'height': titleH
	        }, {
	            duration: 500,
	            queue: false
        	})
		}
		
		//$('div#describe[renderer=section1] td:eq(0)').corner('TR 15px')
        //$('div#describe[renderer=section1] td:eq(2)').corner('BR 15px')
        
    },
	
	/*
unit test for menuover

$("div>div>div[style]", $("div#menu")).attr('closeOver','');
$("div>div>div[style]", $("div#menu")).unbind("mouseover");
$("div>div>div[style]", $("div#menu")).bind("mouseover", abc);

function abc(){
log($(this).attr('closeOver') == true);

log('this.closeover = ',$(this).attr('closeOver'));
log('this = ',this);
log('this.getAttribute(id) = ',this.parentNode.getAttribute("id"));
}
*/
	___menuOver:function(event){
		log('________m e n u O v e r ________',event)
		
		if($(this).data('closeover')){return}
		
		var id = this.parentNode.getAttribute('id')
		var target = $("div#menu div#"+id+" div.navBg")	
		target.css('display','block')
		target.animate({opacity:.95},{duration: 450})
		
		var fadeout = $("div#menu div>div.navBg").not(target.selector)
		fadeout.css("display","none");
		fadeout.css("opacity",0);
		
		//target.css("display","block")
		if(!$.browser.msie){
			target.corner("15px")
			$("div.navBg[style*=block]>a").eq(0).corner('TR TL 15')
			$("div.navBg[style*=block]>a").eq(3).corner('BR BL 15')
		}
	},
	
	_menuSize: function(type){
		
			
		log('_________M E N U S I Z ========',type)
		var css = {'margin':'-5px 0px 0px -50px','padding':'0px','width':'150px'}
		$('div#menu').css({width:'720px',height:'154px'})
		switch(type){
			case 'Big':
				var navBgCss = {'margin':'-6px 10px 0px -85px','padding':'4px 15px','width':'153px'}
				var navaCss  = {padding:'0px 30px 5px 110px',width:'37px'}
				var w	= 70,
					h	= 55
				var thumbmargin = 4
				
				if($.browser.msie){
					$('div#menu>div').css({width:'600px'})
				}
				
				break
			case 'Tiny':
				var navBgCss = css
				var w	= 40,h=40
				var thumbmargin = 4
				
				break
			case 'Tiny2':
				var navBgCss = css
				var w=30,h=30
				var thumbmargin = 4
				$('div#menu').css('width','160px')
				if($.browser.msie){
					$('div#menu>div').css({width:'auto'})
				}
				break
			
		}
		
    	$('#menu div > div > div:first-child').animate({'height':h,'width':w,'margin-right':thumbmargin},{duration:500,queue:false})
		$('div.navBg').css(navBgCss)
		
    },
	
	_gallerySize:function(opt){
		var w = opt.width
		$("div#container").	animate({"width": w}, {queue: false,duration: 500})
		$("div#title").		animate({"width": w}, {queue: false,duration: 500})
		$("div#navigation").animate({"width": w}, {queue: false,duration: 500})
		$("div#corner").	animate({"width": w}, {queue: false,duration: 500})
	},
	
	
	
	_colorTransform:function(opt){
		var tar = opt.target
		var colors = opt.colors
		var picnum = opt.imgnum
		//				nav color   ,titlecolor[1]   ,titlecolor[2]	  ,titlecolor[3],titlecolor[4]
		// color = rgba(15,80,146,1),rgba(23,47,71,1),rgba(23,47,71,1),rgba(0,0,0,1),rgba(0,0,0,1)
		log("transColorByTarget0 tar =", tar + "    , color = " + colors)
		// colors:: [[c1],[c2],[c2],[c3]]
		
		
		targetcolor = colors
		if(tar){
			var base = eval(tar.attr("_order")) 
		}else{
			var base = 0
			
		}
		
		var argb = targetcolor[base + 1]		   
		var argb2 = targetcolor[base+ 1 + picnum]
		var argb3 = targetcolor[base+ 1 + picnum*2]
		if(!$.browser.msie){
			if(!argb2)argb2 = 'rgba(227,227,227,1)'
			if(!argb3)argb3 = 'rgba(0,0,0,0)'
		}else{
			if(!argb2)argb2 = '#FFE3E3E3'
			if(!argb3)argb3 = '#00000000'
		}
		
		
		log('id = ',opt.id)
	    log('picnum = ',picnum)
		log('argb, argb2, argb3 = ',argb+'   '+argb2+'   '+argb3)
		
		if ($.browser.msie) {
		
		    log("transColorByTarget0 IE", targetcolor[0])
		    
		    //params 0,1,2
			//params0 for navBt selected color
			//params1 for navBt h5 span white
			//params2 for title bgcolor
			//params3 for corner bgcolor
			//params4 for menu bgcolor
			function ARGBtoRGBA(c){
				var a = c.substr(1,3),
					rgb = c.substr(3,9)
				return '#'+rgb+a;
			}
			

		    params = [{
		        background: '#'+targetcolor[0].substr(3,9)
		    	}, 
				{
		        "color": '#'+targetcolor[0].substr(3,9)
		    	}, 
				{
		        background: 'transparent',
		        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=" + argb + ",endColorstr=" + argb + ")"
		    	},
				{
		        background: 'transparent',
		        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=" + argb2 + ",endColorstr=" + argb2 + ")"
		    	},
				{
		        background: 'transparent',
		        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=" + argb3 + ",endColorstr=" + argb3 + ")"
		    	}
				]
			cssdata = ['#navbt div:hover {text-decoration: none;background:' + targetcolor[0] + ';color: #FFFFFF;}#navbt .current_page_item div{background:' + targetcolor[0] + ';}', '.white{color:' + targetcolor[0] + '}', '']
		
		
		}
		else {
		    log("transColorByTarget0 FF", targetcolor[0])
			//params 0,1,2
			//params0 for navBt selected color
			//params1 for navBt h5 span white
			//params2 for title bgcolor
			//params3 for corner bgcolor
			//params4 for menu bgcolor
		    params = [{
		        "backgroundColor": targetcolor[0]
		    	}, 
				{
		        "color": targetcolor[0]
		    	}, 
				{
		        "backgroundColor": argb
		    	},
				{
				"backgroundColor": argb2
				},
				{
				"backgroundColor": argb3
				}
				]
			
			cssdata = ['#navbt div:hover {text-decoration: none;background:' + targetcolor[0] + ';color: #FFFFFF;}#navbt .current_page_item div{background:' + targetcolor[0] + ';}', '.white{color:' + targetcolor[0] + '}', '']
		}
		
		
		elements = [$('div#navbt ul>li.current_page_item div'), 
					$('div#navigation span.white'), 		//h5
					$('div#title'),
					$('div#corner'),
					$('div#menu')]
					
		
		// navBt
		log("transColorByTarget1", params[1])
		$('div#container div>h4').css(params[1])
		log("COLOUR = ", targetcolor[0])
		
		
		
		if(!$.browser.msie){
			modifyClass('#navbt div:hover', 'background:' + targetcolor[0] + ';')
			modifyClass('#navbt .current_page_item div', 'background:' + targetcolor[0] + ';')
		}else{
			modifyClass('#navbt div:hover', 'background:'+'#'+targetcolor[0].substr(3,9))
			modifyClass('#navbt .current_page_item div', 'background:' +'#'+targetcolor[0].substr(3,9))
		}
		
		
		
		log("transColorByTarget2", "")
		// alpha => r g b 'a'
		var _c = targetcolor[0].split(",")
		_c.pop() 					// pop alpha 
		_c = _c.join(',') + ',.2)' 	// set alpha to 20%
		if(!$.browser.msie){
			modifyClass('#menu div.navBg div:hover', 'background:' + _c)
		}else{
			modifyClass('#menu div.navBg div:hover', 'background:' + '#'+targetcolor[0].substr(3,9))
		}
		
		
		//$('div#menu').corner('15')
		// colorAnime for
		// navBt
		// div#title
		// 
		colorTransform(elements, params, cssdata)
		function colorTransform(elements, params, cssdata){
		    log('colorTransform0 params = ', params)
		    for (i = 0; i < elements.length; i++) {
		        var _target = elements[i]
		        
		        _param = params[i]
		        
		        
		        
		        if (!$.browser.msie) {
		            _target.animate(_param, 1000, function(){
		            })
		        }
		        else {
					log(_target,_param)
		            _target.css(_param)
		        }
		        
		    }
		}
	},
	
	
	
	afterRender:function(view,opt){
		log('in portfolio afterRender: view = ',view)
		
		switch(view){
			case '_title':
				//$("div#title").corner("15px")
				//$('div#corner').corner('BR 15px')
				//$('div#corner').corner('BL 15px')
				
				$('div#describe[renderer=section1] td:eq(0)').corner('TR 15px')
				$('div#describe[renderer=section1] td:eq(2)').corner('BR 15px')
				
			case 'inittitle':
				$('tbody img').each(function(){
					if(!$(this).attr('binded')){
						$(this).attr('binded',true)
						$(this).hover(function(){
							var src = this.src
							var isgrey = src.indexOf('_g.')>0
							if(isgrey){
							    this.src = src.replace('_g.','.')
							}else{
							    this.src = src.replace('.png','_g.png')
							}
						})
					}
					
				})
				if(jamal.c.Nav.state == 'about'){
					this._title({id:15,
								titleH:180,
								tableW:220,
								pW:110})
				}
				break
			case 'initmenu':
			case '_galleryMenu':
				log('________bind      m e n u O v e r_____')
				
				$("div#menu div[id] div[style]").corner("5px")
				$("div>div>div[style]",$('div#menu')).bind('mouseover',this.___menuOver);
				break	
			case 'initgallery':
			case '_gallery':
				log('___I M A G E Q _______',opt)
				jQuery.imagesQ({
					onLoaded:function(){
						//log('onLoaded!!',this)
						var show_img = $('img'+this.target) //id 與 src 相同者
						show_img.attr("src",this.current.src )
						show_img.css({"background":"transparent"})
						//log('show_img = ',show_img)
								
					},
					onComplete:function(){
						log('*************************************************complete!! renderBehavior!!')
						
						jamal.c.portfolio.galleryLoaded = true
						jamal.c.portfolio.__ModalBox('close')
						$('div#portfolio').css({display:'none',height:'0'})
						$('div#portfolio').css({height:'auto'})
						$('div#portfolio').slideDown(1500)
						jamal.v.portfolio.afterRender('inittitle')
					},
					queue:opt
				})
				break
			
			case 'contact':
				$('div#contact>div#con_rcolum').corner('TR 15px')
				$('div#contact>div#con_lcolum').corner('TL 15px')
			
		}
		log('end in portfolio afterRender: view = ',view)
	}
	
}
});



$j.c({portfolio: {
    galleryLoaded:false,
	index:function(){
		this.RenderAs('CustomRender')
	},
	// todo
	// action convention
	// actions wich allow  external calls without '_' prefix	:EX title => allow external calls from jqueryAddress
	// actions wich forbid external calls with a '_' prefix		:EX _title=> doesn't allow external calls from jqueryAddress
	
	// todo
	// callingFrom: 1 JamalStart 2 Internal 3 User
	
	// for fetching template from server
	inittitle:function(query){
		log('##########   inittitle      ############ query = ' ,query)
		this.RenderAs('Default',query)
	},
	// for initialize and showtitle animation
	_title:function(data){
		log('##########   _title      ############')
		this.RenderAs('CustomRender')
		if($.browser.msie){
				//$('div#navigation').css('margin-top','-20px')
				$('div#navigation').css('height','auto')
				$('div#navbt a').css({'line-height':'12px'})
				$('div#menu>div').css({width:'600px'})
				$('div#describe').css('margin-top','20px')
		}
		
	},
	initgallery:function(){
		log('##########   initgallery      ############ this =',this)
		this.RenderAs('CustomRender',this.c.m.getQueuedata())
		$('div.modalWindow p').html('loading images please wait..')
		this.c.__ModalBox('startup')
	},
	initmenu:function(query){
		log('##########   galleryMenu      ############','')
		// ie don't support removeAttr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//$("div>div>div[style]",$('div#menu')).removeAttr('closeover')
		$("div>div>div[style]",$('div#menu')).data('closeOver',false)
		this.RenderAs('CustomRender')
	},
	about:function(q){
		return this.CancelView()
	},
	contact:function(q){
		
	},
	
	////////////////////////////
	//		action show
	///////////////////////////
	// when external calls: query (String)
	// when internal calls: event (event Object)
	
	//portfolio/show?id=section1_x0_y0
	
	show:function(query){
		
		//portfolio/show....from nav
		if(query.id == undefined){
			log('reset query!!',query)
			var i = this.actionProp.state
			if(i == undefined){
				query.id = 'section1_x0_y0'
			}else{
				query.id = i
			}
		}
		
		this.c.setCurrentPositionTo('portfolio')
		log('###########n#############','')
		var img		= this.c.m.getImages()
		var c		= this.c.m.getColors()
		var prop	= this.c.getActionProp('show')
		var id		= parseInt(query.id.split('section')[1].split('_x')[0])
		log('portfolio show......id 	= ',id)
		log('portfolio show......query 	= ',query)
		log('portfolio show......prop 	= ',prop)
		if(prop.animating == true){
			// 改成QUEUE
			log('###########block animation#############',prop.animating)
			return this.CancelView()
			
		}else{
			log('_________________start animation_________________',prop.animating)
			this.c.setActionProp('show',{animating:true,query:query})
			var data = {colors:	c[id-1],
						id:		query.id,
						imgnum: img[id-1].length}
						
			this.RenderView('show')
			this.RenderAs("CustomRender",data)
			
			log('portfolio show1......this.getActionProp(show) 	= ',this.c.getActionProp('show'))
			
			var param = {
						id:		id,					//id 與ACTION 是執行jqueryControllerAction必需的
						pW:		120,
						tableW:	'auto',
						titleH:	90
						}
			
			log('args = ',id)
			jamal.excute('portfolio','inittitle',{id	:id,
												action	:'inittitle',
												args	:[id]})
												
			//jQuery.portfolioController.inittitle({id	:id,
			//									action	:'inittitle',
			//									args	:[id]})
			jamal.v.portfolio._title(param)
			log('portfolio show2......this.getActionProp(show) 	= ',this.c.getActionProp('show'))
		}
		
	},
	
	
	
	__ModalBox:function(type){
		log("showModalBox!!!! imageLoaded = ",this.galleryLoaded)
		switch(type){
			case 'startup':
				if(this.galleryLoaded!=true){	
					$('#dialog').showModalBox(function(){})
					$('#dialog').corner(30)
				}
				break
			case 'close':
				log('close ModalBox @$#$#@$@#$@#%$%$*#^$*(@&#^$*^(')
				$('#dialog').closeModalBox(function(){})
				break
			case 'show':
				$('#dialog').showModalBox(function(){})
				break
		}
				
	}
	
	
	
	
	
}
});










$j.v({ Nav: {
	afterRender:function(view){
		switch(view){
			case 'init':
				log('in Nav afterRender: view = ',view)
				$("div#navigation").corner("15px")
				//$("div#navigation img").corner("bl 15px")
				$("div#navbt ul li:last a").corner("BR 15px")
				//$("div#corner").corner("bottom 15px")
				$('div#login_bt').click(this.login_click)
				
				
				break
			case 'showLoginForm':
				var f = this.filter['init'],
						target = $('div#login',f);
				
				console.log('target = ',target)
				if (target.attr('init')!='true') {
					target.attr('init', 'true');
					$('div#login_form').css('display', 'block');
					target.css('overflow', 'visible');
					
					
					//$('input', target).css('border', 'none')
					var _h = target.innerHeight();
					target.css('height', 'auto');
					
					var h = target.innerHeight();
					target.css('height', _h);
					target.attr('close',_h+'px');
					target.attr('open',h+'px');
					target.css('overflow', 'hidden');
					console.log(_h,h);
					console.log(target.attr('close'),target.attr('open'));
					
					
					// bind hover
					$('div#login input').hover(
						function(){
							$(this).css({background:'#333',border:'1px solid #444',color:'#888'});
						},function(){
							$(this).css({background:'#222',border:'1px solid #444',color:'#888'});
						}
					);
				}
				
				var m = 'div#menu',
					n = 'div#navigation',
					g = 'div#blogphoto'
					
					mt = 205,
					lt = 65,
					ht = 100,
					h  = parseInt(target.attr('open').split('px')[0]),
					_h  = parseInt(target.attr('close').split('px')[0])
					
				$('input', target).corner('5px')		
				if(target.data('isclick')){
					// login press slidedown
					$('div#login').css({background:'url(https://sites.google.com/site/jamalmvc/images/form_black.png) repeat scroll 0 10px',backgroundColor:'#222'})
					$('div#login_bt>li>div.tinyicon').css({background:'url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png)'})	
					$('div#login input').css({background:'#303030',border:'1px solid #444',color:'#888'})	
					$('div#login input').corner('4px')
					$('div#login_form td').css({color:'#555'})
					
					target.animate({
						height: h+'px'
					}, 500)
					$(m).animate({
						top:(mt+h-_h-60)+'px'
					},500)
					
					$(g).animate({
						top:(mt+h-_h-65)+'px'
					},500)
					
					$(n+' h5').animate({
						top:(ht+h-_h)+'px'
					},500)
					$(n+' div#img').animate({
						top:(lt+h-_h)+'px'
					},500)
				}else{
					// login press slideup
					if ($.browser.msie) {
						$('div#login').css({background:'#ddd',margin:'30px 20px -38px 0'});
					}
					else {
						$('div#login').attr('style', '')
					}
					$('div#login').corner('10px')
					$('div#login_bt>li>div.tinyicon').attr('style','')
					$('div#login input').attr('style','')
					$('div#login_form td').attr('style','')
					
					
					target.animate({
						height: _h+'px'
					}, 500)
					$(m).animate({
						top:(mt)+'px'
					},500)
					$(g).animate({
						top:(mt-5)+'px'
					},500)
					$(n+' h5').animate({
						top:(ht)+'px'
					},500)
					$(n+' div#img').animate({
						top:(lt)+'px'
					},500)
				}
					
					
					log('   S  H  O  W  L  O  G  I  N  F  O  R  M   '+h,_h)
					log('   S  H  O  W  L  O  G  I  N  F  O  R  M   '+target.innerHeight(),_h)
				
				
				break
		}
	},
	loading:function(view){
		jamal.headerCatcher.web2py_component_flash('loading data please wait...')
	},
	login_click:function(){
		target = $('div#navigation>div>div#login')
		if(target.data('isclick')){
			target.data('isclick',false)
		}else{
			target.data('isclick',true)
		}
		if(!target.attr('init')){
			console.log('click init!')
			jamal.excute('Nav','showLoginForm','')
		}else{
			console.log('click2')
			jamal.v.Nav.afterRender('showLoginForm')
		}
	},
	
	login_next:function(){
		
	},
	logout_next:function(){
		
	},
	
	// call from jamal.v.blog
	login_hover:function(){
		url = 'url(https://sites.google.com/site/jamalmvc/images/ui-bg_glass_75_e6e6e6_1x400.png) '
		if($.browser.msie){
			var c1 = ' #fff',
				c2 = ' #e8e8e8'
		}else{
			var c1 = ' rgba(255, 255, 255, 1)',
				c2 = ' rgba(255, 255, 255, .8)'
		}
		
		$('div#login',this.filter['init']).hover(
			function(){
				if($.browser.msie){
					c1 = ' #fff'
				}else{
					c1 = ' rgba(255, 255, 255, 1)'
				}
				$(this).css({background:url+'repeat-x scroll 0 10px'+c1})
			},
			function(){
				if($.browser.msie){
						c2 = ' #ddd'
				}else{
						c2 = ' rgba(255, 255, 255, .8)'
				}
				$(this).css({background:url+'repeat-x scroll 0 10px'+c2})
			}
		)
	},
	
	
	showLoginForm:function(opt,data,xhr){
		return true
	}
	
}
});


$j.c({Nav: {
    	state:'portfolio',
		laststate:'portfolio',
        ////////////////////////////
        //		action index
        ///////////////////////////
        init: function(query){
            log('________Nav index  query = ', query)
			//$('div#navigation div#img').corner('BL 20px')
			
			$(document).scroll(function(){
				t = $(this).scrollTop()
				$('div.flash').css({top:t})
			})
			
			this.RenderAs('CustomRender')
			
        },
        _select: function(s){
            log('________Nav _select  s = ', s)
            var set
			this.state = s
            switch (s.toLowerCase()) {
                case "blog":
                    set = 1
                    break
                case "website":
                    set = 0
                    break
                case "portfolio":
					set = 2
                    break
                case "contact":
					set = 4
					var radius = 'BR 15px'
                    break
                case "about":
					set = 3
                    break
            }
			var target = $("div#navbt li:eq("+set+")")
            $('div#navbt div').attr('style', '')
            $('div#navbt li').removeClass("current_page_item")
            target.addClass("current_page_item")
			
			if(radius){
				$('a',target).corner(radius)
			}
        },
		
		showLoginForm:function(){
			var view = 'showLoginForm'
			var url = this.c.v.URL({a:'',c:'home',f:'user',args:['login']})
			this.setURL(url)
			this.formAct(url)
		}
		
        
        
    }
});




























$j.m({
    home: {
		// 存檔時:: this.property = {id:1,name:jhon,images:1.jpg} ;this.update()			未實作
		//			this.property = data ; this.update()								未實作
		//			this.property = {id:1}; this.save()									未實作
		
		// Find::   this.findById(id,callback)
		//			this.findAll()
		
		// FindInJson:		this.findInJason(query)
		property: {
			id: '',
			name: [],
			images: [],
			text: []
		},
		
		jsonData: 	{},
		imagedata: 	[[],['section1_x0_y0', 'section1_x1_y0', 'section1_x1_y1', 'section1_x1_y2'], ['section2_x0_y0', 'section2_x1_y0', 'section2_x1_y1'], ['section3_x0_y0', 'section3_x1_y0', 'section3_x1_y1', 'section3_x1_y2'], ['section4_x0_y0', 'section4_x1_y0', 'section4_x1_y1', 'section4_x1_y2'], ['section5_x0_y0', 'section5_x1_y0', 'section5_x1_y1', 'section5_x1_y2'], ['section6_x0_y0', 'section6_x1_y0', 'section6_x1_y1', 'section6_x1_y2'], ['section7_x0_y0', 'section7_x1_y0', 'section7_x1_y1', 'section7_x1_y2'], ['section8_x0_y0', 'section8_x1_y0', 'section8_x1_y1'], ['section9_x0_y0', 'section9_x1_y0', 'section9_x1_y1'], ['section10_x0_y0', 'section10_x1_y0', 'section10_x1_y1'], ['section11_x0_y0', 'section11_x1_y0', 'section11_x1_y1'], ['section12_x0_y0', 'section12_x1_y0', 'section12_x1_y1'], ['section13_x0_y0']],
		db: 		'json', //server , json , memory
		url: 		'app/models/Portfolio.json',
		icons:		[],
		queue_h:	[],
		
		getColors: function(){
			var c = [["rgba(15,80,146,1)", "rgba(23,47,71,1)", "rgba(23,47,71,1)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,1)", "rgba(0,0,0,.6)", "rgba(0,0,0,.6)"], ["rgba(190,44,0,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(90,90,94,1)", "rgba(33,33,35,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)"], ["rgba(0,150,220,1)", "rgba(49,58,63,.8)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(130,8,29,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(122,122,115,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(235,140,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(0,0,0,1)"], ["rgba(194,49,144,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"], ["rgba(114,0,0,1)", "rgba(114,0,0,0)", "rgba(114,0,0,1)", "rgba(114,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.4)"], ["rgba(190,44,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]]
			
			if ($.browser.msie) {
				return this.convertColor(c, this.TomsARGB)
			}
			return c
		},
		
		convertColor: function(data, fn){
			for (i = 0; i < data.length; i++) {
				if (data[i].constructor == Array) {
					var len = data[i].length;
					for (j = 0; j < len; j++) {
					
						data[i][j] = fn(data[i][j]);
					}
				}
				else {
					//log("constructor != Array")
					data[i] = fn(data[i]);
				}
				
			}
			return data;
		},
		
		TomsARGB: function(rgba){
			rgba = rgba.split('(')[1].split(')')[0];
			var r = rgba.split(',')[0];
			var g = rgba.split(',')[1];
			var b = rgba.split(',')[2];
			var a = rgba.split(',')[3];
			
			r = eval(r).toString(16);
			g = eval(g).toString(16);
			b = eval(b).toString(16);
			a = (eval(a) * 255).toString(16);
			
			if (r.length == 1) {
				r = "0" + r;
			}
			if (b.length == 1) {
				b = "0" + b;
			}
			if (g.length == 1) {
				g = "0" + g;
			}
			if (a.length == 1) {
				a = "0" + a;
			}
			
			var arbg = '#' + a + r + g + b;
			//var cssdata = 'background: transparent;-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+')"; /* IE8 */ filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+');   /* IE6 & 7 */ zoom: 1;';
			
			return arbg;
		},
		
		getDescriptions: function(){
			var skillimages = {
				alias: '<img over="images/alias.png" 		src="images/alias_g.png" 		title="3D modeling app:alias studio 2010" />',
				modo: '<img over="images/modo.png" 		src="images/modo_g.png" 		title="3D modeling and rendering app:Luxology Modo401"/>',
				solidworks: '<img over="images/solidworks.png" 	src="images/solidworks_g.png" title="3D modeling app:Solidworks2009"/>',
				photoshop: '<img over="images/photoshop.png" 	src="images/photoshop_g.png" 	title="photoshopCS3"/>',
				booscript: '<img over="images/booscript.png" 	src="images/booscript_g.png" 	title=".NET framework language similar to python:booscript"/>',
				
				unity3d: '<img over="images/unity3d.png" 		src="images/unity3d_g.png" 	title="Web3d and game development:unity3d"/>',
				blaze3d: '<img over="images/blaze3d.png" 		src="images/blaze3d_g.png" 	title="Web3d app:blaze3d"/>',
				vray: '<img over="images/vray.png" 		src="images/vray_g.png" 		title="3D rendering app:vray"/>',
				jquery: '<img over="images/jquery.png" 		src="images/jquery_g.png" 	title="javascript framework:jquery"/>',
				monorail: '<img over="images/monorail.png" 	src="images/monorail_g.png" 	title=".NET MVC framework:monorail"/>',
				
				flash: '<img over="images/flash.png" 		src="images/flash_g.png" 		title="flash actionscript2.0"/>',
				showcase: '<img over="images/showcase.png" 	src="images/showcase_g.png" 	title="autodesk showcase"/>',
				sketchbook: '<img over="images/sketchbook.png" 	src="images/sketchbook_g.png" title="autodesk sketchbook pro"/>',
				reason: '<img over="images/reason.png"  		src="images/reason_g.png" 	title="electronical music arrangement"/>'
			
			}
			
			var temp = ''
			for (_img in skillimages) {
				temp += skillimages[_img]
			}
			
			skillimages.all = temp;
			
			var Descriptions = [{
				'img': [skillimages.alias, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '用聽的看書<br>用聽的學習<br>讓閱讀不受侷限<br>讓學習如影隨形'
			}, {
				'img': [skillimages.solidworks, skillimages.vray, ''],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '網路電話,手繪地圖<br>音聲圖文,暢談無阻'
			}, //,,
			// 網路電話,手繪地圖,即時傳輸<br>比肩同樂以書代,音聲圖文,暢言(談)無阻<br>暢話網際,繪聲繪影, ...無阻
			
			
			{
				'img': [skillimages.solidworks, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': ''
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '30~60度即時仰角<br>遠近操作皆宜<br>視訊功能上掀式直覺式操作,貼近您的心'
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '耳機<BR>手環<BR>MP3'
			},//mp3手環  內建藍牙耳機<br>樂樂相伴 如影隨形
			{
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '音響<br>夜燈<br>MP3'
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '電動牙刷<br>瑞士刀<br>電鬍刀'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '夜燈<br>收音機<br>繄急照明燈'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '百萬手機設計-入選'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': 'OIC MP3設計-佳作'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': 'INTEL PC造型王第三名'
			}, {
				'img': ["", "", skillimages.sketchbook + skillimages.photoshop],
				'text': ["", "", "2D Rendering"],
				'title': ''
			}, {
				'img': [skillimages.unity3d + skillimages.blaze3d, skillimages.booscript + skillimages.monorail + skillimages.jquery, skillimages.reason],
				'text': ["Web3d app", "Web design", "Arrangement"],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': [skillimages.all, '', ''],
				'text': ['', '', ''],
				'title': '專長<BR>工業設計<BR>網頁設計<BR>WEB3D<BR>多媒體電子配樂'
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}]
			
			return Descriptions
		},
		
		genImages: function(){			
			
			for (i = 0; i < this.imagedata.length; i++) {
				var arr = []
				var xy = {}
				for (j = 0; j < this.imagedata[i].length; j++) {
					var dir = "images/"
					arr.push(dir + this.imagedata[i][j] + '.jpg')
				}
				xy = {
					x: arr.slice(0, 2),
					y: arr.slice(2, arr.length)
				}
				
				this.queue_h[i] = xy
				this.icons[i] 	= dir + "icon" + i + ".jpg"

			}
			log('this.queue_h ==============================',this.queue_h)
			
		},
		
		getImages:function(){
			return this.imagedata
		},
		
		getIcons:function(){
			return this.icons
		},
		
		getQueuedata:function(){
			return this.queue_h
		}
		
	}});

$j.v({home: {
	
	
}
});

$j.c({home: {	
    galleryLoaded:false,
	
	////////////////////////////
	//		action index
	///////////////////////////
    init: function(query) {
		log('_______Portfolio index  query = ',query)
		this.RenderView('init')
		this.RenderAs('default')
    },
	
	beforeAction:function(){
		
	}
	
}
});














	
$j.c({Website: {
    
	////////////////////////////
	//		action index
	///////////////////////////
    init: function(query) {
		log('________Webst index  query = ',query)
		this.CancelView()
    },
	
	index: function(query) {
		this.setCurrentPositionTo('Website')
		this.CancelView()
    }
	
	
}
});



$j.c({About: {
    
	////////////////////////////
	//		action index
	///////////////////////////
    init: function(query) {
		log('________About index  query = ',query)
		this.CancelView()
    },
	 index: function(query) {
		this.setCurrentPositionTo('About')
		this.CancelView()
    }
	
	
}
});



$j.m({blog: {
	date:[],
	process_web2py_data:function(){
		//log('process_web2py_data1____________________||||||||||||||__________________----------------________________-----------------')
		for(i in web2py_data["date"]){
			//log('process_web2py_data2',i)
			row = web2py_data["date"][i]
			pub = row['published_on']
			id	= row['id']
			y	= pub.split('-')[0]
			m	= pub.split('-')[1]
			d	= pub.split('-')[2].split(' ')[0]
			//log('process_web2py_data3',i)	
			if(this.date[y]){
				//log('process_web2py_data4',i)	
				if(this.date[y][m]){
					if(this.date[y][m][d]){
						this.date[y][m][d].push(id)
					}else{
						this.date[y][m][d] = [id]
					}
				}else{
					this.date[y][m] = {}
					this.date[y][m][d] = [id]
				}
			}else{
				//log('process_web2py_data5',i)	
				this.date[y] = {}
				this.date[y][m] = {}
				this.date[y][m][d] = [id]
			}
			
			//log(pub,'---------------------------------------')
		}
		//log('process_web2py_data2____________________||||||||||||||__________________----------------________________-----------------')
		web2py_data = ''
	}	

		
}});


// animstack	   | subflag1 --- css or anime
// animstack.flag--| subflag2 --- css or anime
//				   | subflagN --- css or anime
$j.v({animeStack:{
	registered:{},
	reg:function(selector){
		
	}
	
}
})

$j.v({ blog: {
	// datePicker
	datapickerInit:function(view){
		model = jamal.m.blog.date
		$('div#datepicker').attr('init','true')
		$('div#datepicker').datepicker({
			beforeShowDay:function(date){
				d = date.getDate().toString()
				m = (date.getMonth()+1).toString()
				y = date.getFullYear().toString()
				
				if(m.length==1){ m = '0'+m }
				
				try{
					if(model[y][m][d]){
						return [true,'dateClass',y+'/'+m+'/'+d]
					}else{
						return [false,'"','none']
					}
				}catch (e){
					return [false,'"','none']
				}
			},
			onSelect:function(dataText,inst){
				y 	= inst.currentYear
				m 	= inst.currentMonth
				d 	= inst.currentDay
				path = y+'/'+m+'/'+d
				url = '/blog/showArticlesByDate/'+path
				$.address.value(url)
			}		
		})	
	},
	foldCateList:function(){
		var t = $(this).next()
		if(t.data('isclick')){
			t.data('isclick',false)
			t.animate({
				height:'0'
			},500)
		}else{
			t.data('isclick',true)
			t.css('height','100%')
			h = t.innerHeight()
			t.css('height','0px')
			t.animate({
				height:h
			},500)
		}
		
	},
	loading:function(view){
		jamal.headerCatcher.web2py_component_flash('loading data please wait...')
	},
	
	afterRender:function(view,opt){
		log('!!!!!!!blog afterRender!!!!!!!',view)
		switch(view){
			case 'index':
				
				// init settings 
				if (!$('div#datepicker').attr('init')){
					this.datapickerInit(view)
					
					// clock
					$('div#fancyClock',this.filter[view]).tzineClock();
					
					// bind nav login hover
					jamal.v.Nav.login_hover()
					// input form
					
		
					
					cate_node = $('div#categoryList li>span').parent().next()
					cate_node.css({overflow:'hidden',height:'0px'})
					cate_node.prev().click(this.foldCateList)
					
					jamal.address.bindClick('div#footer a[rel]')
					this.bindBtOnRender()
					var current = this
					
					
				}
				if($.browser.msie){
					$('div#login').css({background:'#ddd',margin:'30px 20px -38px 0'});
					$('div#navigation').css({padding:'0 0 10px 0',margin:'0px 0 0 0',width:'400px'});
					$('div#login_bt').css('width','100%')
					$('div#login_bt>li').eq(0).css('width','20px');
					$('div#login_bt>li').css('float','left');
					$('div#navbt').css({'margin':'0px 0px -20px 0px',background:'transparent','float':'left'});
					$('div#navbt div').css('padding','12px 8px');
					$('div#navigation h5').css({width:'auto',left:'220px'});
					$('div.logobg').css({margin:'0px',top:'65px'});
					$('#searchBar img').css('margin-top','-16px');
					$('div#searchBar').css('background','#fff');
				}else{
					$(n+' div#navbt').css({'float':'right','margin-right':'120px'})
				}
				
				// ie doesn't support removeAttr !!!!!!!!!!!!!!!!!!!
				//$("div>div>div[style]",$('div#menu')).attr('closeover','true')
				$("div>div>div[style]",$('div#menu')).data('closeover',true)
				$('div#navigation div#login').css('display','block')
				
				$('div#menu').css({position:'absolute',top:'205px',right:'25px',padding:'0px',width:'190px',background:'none'})
				$('div#menu #row1').css('width','105px')
				$('div#menu #row2').css('width','70px')
				$('div#menu>div>div>div').corner('4px')
				$('div#menu div.navBg').css('display','none')
				$('div#blogphoto').css('display','block')
				
				
				
				$('div#title').css('display','none')
				$('div#blog_footer').corner('BL BR 35px')
				
				var n = 'div#navigation'
				$(n).corner('0px')
				$(n).css({'right':'30px',width:'415px',overflow:'visible',background:'#000',position:'absolute'})
				$(n+' div#img').css({position:'absolute',right:'0px',top:'65px',background:'url("https://sites.google.com/site/jamalmvc/images/logo_white.png") repeat scroll 0 0 transparent'})
				$(n+' h5').css({color:'#fff',position:'absolute',top:'100px',right:'100px'})
				
					
				$('div#rcol_outer').corner('25px')
				$('div#cate_inner').corner('15px')
				$('div.group').corner('15px')
				$('div.group>div>div').corner('10px')

				$('div#cate_inner>div').corner('10px')
				$('div#blog_inner').corner('25px')
				
				$('div#login').corner('10px')
				$('div#searchBar').corner('10px')
				
				break
			case 'showArticlesByTag':
			case 'showArticlesByCategory':
			case 'showArticlesByDate':
			case 'showArticlesByOrder':
			case 'showComments':
			case 'showAllArticles':
			case 'showArticlesByPage':
				this.bindBtOnRender()
				break
			
		}
		
		if($.browser.msie){
			var n = $('div.paginator li')
			n.css({'float':'left','margin-left':'4px'})
			$('div#footer div').css('float','right')
			//$('body').css('overflow-y','hidden')
		}
		$('div#cmt_form_bt').corner('TL TR 5px')
		$('div#cmt_form_body').corner('BL BR 18px')
		$('div#comment_form').corner('BL BR 18px')
		$('div.comment_bt').corner('7px')
		$('div.comment_title').corner('6px')
		//$('input',$('div#cmt_form_body')).last().corner('BR 18px')
		$('div#cmt_form_body input[type=submit]').corner('BR 18px')
		
		setTimeout('jamal.v.blog.resetH()',300)
		//
	},
	
	resetH:function (){
		var h = $('div#blog').innerHeight()	+100
		$('div#container').css({height:h,width:'850px',margin:'0 212px 0 0','float':'right'})
		log('==resetH ::::::::::::::::::::::::::::::::::::::',h)
	},
	// comment form slide down
	bindCmtForm:function(){
		var bt1 = 'div#cmt_form_bt',
					body1 = 'div#cmt_form_body',
					input1 = 'div#cmt_form_body input[type=text]',
					con	 = 'div#container',
					_bt1 = $(bt1)
			
			_bt1.unbind('hover')		
			_bt1.hover(
					function(){
							$(this).css({background:'#fff',color:'#000'})
							$(body1,$(this).parent()).css({background:'#fff'})
							$(input1,$(this).parent()).css({background:'#fff'})
					},
					function(){
						$(this).css('color', '')
						if (!$(this).data('isclick')) {
							$(this).attr('style', '')
							$(body1,$(this).parent()).attr('style', '')
							$(this).corner('TL TR 5px')
							$(body1,$(this).parent()).corner('BL BR 18px')
							$(input1,$(this).parent()).css({background:'#333'})
						}
						
					}
				)
				_bt1.unbind('click')
				_bt1.click(function(){
					log($(this).next())
					var h = 385,
						_h = $(con).innerHeight()
							
					if($(this).data('isclick')){
						$(this).data('isclick',false)
						$(this).next().animate({height:'10px'})
						$(con).css('height',_h-h)
					}else{
						$(this).data('isclick',true)
						$(this).next().animate({height:h},500)
						$(con).css('height',_h+h)
					}
				})
	},
	
	// button for showing each comment slide down
	bindCmtTitle:function(){
		log('======================================b i n d Cmt Title==========================================')
		var con	 = 'div#container',
					title = 'div.comment_title',
					_title = $(title)
			
			_title.unbind('click')		
			_title.click(function(){
					var h = $(this).next().css({height:'auto'}).innerHeight()+15,
						_h = $(con).innerHeight()
					
					$('div.comment_set').css({
						overflow: 'visible',
						height:'auto'
					})
					if($(this).data('isclick')){
						log('0')
						$(this).data('isclick',false)
						
						$(this).next().animate({height:h},500)
					}else{
						log('1')
						$(this).data('isclick',true)
						$(this).next().animate({height:'0px'},500)
					}
				})
				
				_title.unbind('hover')	
				_title.hover(
					function(){
						$(this).css({background:'#d3d3d3'})
						$('div.tinyicon',$(this)).css({background:'url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png) repeat scroll 0 0 transparent'})
					},
					function(){
						$(this).attr('style','')
						$('div.tinyicon',$(this)).attr('style','')
					}
				)
	},
	// button for showing all comments slide down
	bindCmtBt:function(){
		var con	 = 'div#container',
			bt2	  = 'div#comment_bt',
			_bt2 = $(bt2)
			
			_bt2.unbind('click')	
			_bt2.click(function(){
					$(this).next().css('overflow','hidden')
					var _h = $(con).innerHeight(),
						h = $(this).next().css({height:'auto'}).innerHeight()+15
					if($(this).data('isclick')){
						$(this).data('isclick',false)
						$(this).next().animate({height:h},500)
						$(con).css('height',_h+h)
					}else{
						$(this).data('isclick',true)
						$(this).next().animate({height:'2px'},500)
						$(con).animate({height:_h-h})
					}
				})
				
				_bt2.unbind('hover')	
				_bt2.hover(
					function(){
						//comment bt over
						$(this).css({background:'url(https://sites.google.com/site/jamalmvc/images/form_grey.png) repeat-x scroll 0  10px',backgroundColor:'#181818'})
						$('div.tinyicon',$(this)).css({background:'url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png)'})
						$('h5',$(this)).css({color:'#ef8100'})
					},
					function(){
						$(this).attr('style','')
						$('div.tinyicon',$(this)).attr('style','')
						$('h5',$(this)).attr('style','')
				})
	},
	bindBtOnRender:function(eq){
		this.bindCmtForm()
		this.bindCmtBt()
		this.bindCmtTitle()
	}
	
}
});




$j.c({blog: {
    
	////////////////////////////
	//		action index
	///////////////////////////
    init: function(query) {
		log('________Blog init  query = ',query)
		this.RenderAs('CustomRender')
		this.CancelView()
    },
	 index: function(query) {
	 	log('________Blog index  query = ',query)
		this.c.setCurrentPositionTo('blog')
		this.RenderAs('Default')
    }
	
	
}
});

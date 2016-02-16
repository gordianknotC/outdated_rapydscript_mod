


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

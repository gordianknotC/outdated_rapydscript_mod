
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
						if (!$('#cmt_form_bt').data('isclick')) {
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

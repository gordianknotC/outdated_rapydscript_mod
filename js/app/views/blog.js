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
		if(t.attr('isclick')){
			t.removeAttr('isclick')
			t.animate({
				height:'0'
			},500)
		}else{
			t.attr('isclick','true')
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
				if ($('.hasDatepicker',this.filter[view].length == 0)){
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
				
				$("div>div>div[style]",$('div#menu')).attr('closeover','true')
				
				
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
				$(n+' div#navbt').css({'float':'right','margin-right':'120px'})
					
				$('div#rcol_outer').corner('25px')
				$('div#cate_inner').corner('15px')
				$('div.group').corner('15px')
				$('div.group>div>div').corner('10px')

				$('div#cate_inner>div').corner('10px')
				$('div#blog_inner').corner('25px')
				
				
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
						if (!$('#cmt_form_bt').attr('isclick')) {
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
							
					if($(this).attr('isclick')){
						$(this).removeAttr('isclick')
						$(this).next().animate({height:'10px'})
						$(con).css('height',_h-h)
					}else{
						$(this).attr('isclick','true')
						$(this).next().animate({height:h},500)
						$(con).css('height',_h+h)
					}
				})
	},
	
	// button for showing each comment slide down
	bindCmtTitle:function(){
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
					if($(this).attr('isclick')){
						$(this).removeAttr('isclick')
						
						$(this).next().animate({height:h},500)
					}else{
						$(this).attr('isclick','true')
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
					if($(this).attr('isclick')){
						$(this).removeAttr('isclick')
						$(this).next().animate({height:h},500)
						$(con).css('height',_h+h)
					}else{
						$(this).attr('isclick','true')
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


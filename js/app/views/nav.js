
$j.v({ Nav: {
	afterRender:function(view){
		switch(view){
			case 'init':
				log('in Nav afterRender: view = ',view)
				$("div#navigation").corner("15px")
				//$("div#navigation img").corner("bl 15px")
				$("div#navbt ul li:last a").corner("BR 15px")
				$("div#corner").corner("bottom 15px")
				$('div#login_bt').click(this.login_click)
				$("div>div>div[style]",$('div#menu')).attr('closeOver','true')
				
				break
			case 'showLoginForm':
				
				var f = this.filter['init'],
						target = $('div#login',f)
						
				if (target.attr('init')!='true') {
					target.attr('init', 'true')
					$('div#login_form').css('display', 'block')
					target.css('overflow', 'display')
					
					//$('input', target).css('border', 'none')
					
					var _h = target.innerHeight()
					target.css('height', 'auto')
					var h = target.innerHeight()
					target.css('height', _h)
					
					target.attr('close',_h+'px')
					target.attr('open',h+'px')
					
					// bind hover
					$('div#login input').hover(
						function(){
							$(this).css({background:'#333',border:'1px solid #444',color:'#888'})	
						},function(){
							$(this).css({background:'#222',border:'1px solid #444',color:'#888'})
					})
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
				if(target.attr('isclick')){
					// login press
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
					// login press
					$('div#login').attr('style','')
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
					
					
					console.log('   S  H  O  W  L  O  G  I  N  F  O  R  M   '+h,_h)
					console.log('   S  H  O  W  L  O  G  I  N  F  O  R  M   '+target.innerHeight(),_h)
				
				
				break
		}
	},
	loading:function(view){
		jamal.headerCatcher.web2py_component_flash('loading data please wait...')
	},
	login_click:function(){
		target = $('div#navigation>div>div#login')
		if(target.attr('isclick')){
			target.removeAttr('isclick')
		}else{
			target.attr('isclick','true')
		}
		if(!target.attr('init')){
			jamal.excute('Nav','showLoginForm','')
		}else{
			jamal.v.Nav.afterRender('showLoginForm')
		}
	},
	
	login_next:function(){
		
	},
	logout_next:function(){
		
	},
	
	// call from jamal.v.blog
	login_hover:function(){
		url = 'url("https://sites.google.com/site/jamalmvc/images/ui-bg_glass_75_e6e6e6_1x400.png")'
		$('div#login',this.filter['init']).hover(
			function(){
				$(this).css({background:url+'repeat-x scroll 0 10px rgba(255, 255, 255, 1)'})
			},
			function(){
				$(this).css({background:url+'repeat-x scroll 0 10px rgba(255, 255, 255, .8)'})
			}
		)
	},
	
	
	showLoginForm:function(opt,data,xhr){
		return true
	}
	
}
});





























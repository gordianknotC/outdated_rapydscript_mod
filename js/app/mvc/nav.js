
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




























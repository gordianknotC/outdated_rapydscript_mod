
$j.c({Nav: {
    	state:'portfolio',
		laststate:'portfolio',
        ////////////////////////////
        //		action index
        ///////////////////////////
        init: function(query){
            log('________Nav index  query = ', query)
			$('div#navigation div#img').corner('BL 20px')
			
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
            $('div#navbt li>a').attr('style', '')
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

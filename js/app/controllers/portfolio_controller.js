

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
		
	},
	initgallery:function(){
		log('##########   initgallery      ############ this =',this)
		this.RenderAs('CustomRender',this.c.m.getQueuedata())
		$('div.modalWindow p').html('loading images please wait..')
		this.c.__ModalBox('startup')
	},
	initmenu:function(query){
		log('##########   galleryMenu      ############','')
		$("div>div>div[style]",$('div#menu')).removeAttr('closeover')
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
				
	},
	
	
	
	
	
}
});

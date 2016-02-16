

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

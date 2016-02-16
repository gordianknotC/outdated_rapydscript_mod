
	
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



// Map over the $j in case of overwrite
if (typeof $j != "undefined") {
    jamal._$j = $j;
}

// Map the jamal namespace to '$j'
var $j = jamal;


$(function(){
	path = {
        model: '/static/app/models/',
        view: '',
        controller: '/static/app/controllers/',
        css: '/static/css/',
        image: '/static/images/'
    }
    
    camelCase = [
		'Controller', 
		'Model', 
		'View'
	]
	
	mail = {
		smtp:'',
		address:"http://localhost:9045/Product/search.rails"
	}
	
	defaultAction = {
		portfolio:	'show',
		blog:		'index'
	}
	
    $j = jamal = jamal();
	jamal.config.path 		= path
	jamal.config.camelCase 	= camelCase
	jamal.config.mail 		= mail
	jamal.config.defaultAction = defaultAction
	jamal.config.ignoreAppUrl = true
	
    $j.start();
});

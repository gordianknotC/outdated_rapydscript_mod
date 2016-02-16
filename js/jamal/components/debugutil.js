
var debugcss = '#debug{	color:#000;	background:#aa3;font-size:.8em;z-index:100;padding-bottom:5px;display:none;overflow:hidden;margin:0}'


jamal.fn.extend({
    debugutil: function(){
		console.log('debug util!!','oweifjoiewfjoeijf')
        this.debugutil.active = true;
        this.debugutil.loaded = true;
		if(jamal.debug){
			//enableDebug()
		}
		
    }
});

jamal.fn.extend(jamal.fn.debugutil, {
    active: false,
    loaded: false

});














// IE不支援jQuery append 至head>STYLE中
// IE不支援jQuery html   至head>STYLE中
function log(key, value){
	
    if (jamal.debug == true) {
        var _target = $("div#debug")
        
        if (_target.attr('initial') == undefined) {
			_target.attr('initial','true')
		
            _target.click(function(){
				

                if (_target.attr("isclicked") == "true" || _target.attr("isclicked") == undefined) {
                    //console.log(_target.attr("isclicked"))
                    _target.animate({"height": "8px"}, 500)
                    _target.attr("isclicked", "false")
                }
                else {
                    //console.log(_target.attr("isclicked"))
                    h = getHeight("div#debug")
                    
                    _target.animate({"height": h}, 500, 
					function(){
                        _target.css("height", "auto");
                    })
                    _target.attr("isclicked", "true")
                }
            })
        }
        
        var data = '<p style = "font-size:.8em;color:#c7a;background:#000;margin:0;padding:0">' + key + ' ,<span style="color:#999">' + value + '</span></p>'
        $('div#debug').append(data)
		
		
		try{
			//console.log(key, value);
		}catch(e){
				
		}
    }
    
   
	
        
    
}
function showDebug(){
	 $("div#debug").css("display", "block")
	 if($.browser.msie){
	 	$('body').prepend('<script type="text/javascript" src="https://getfirebug.com/firebug-lite.js"></script>')	
	 }
	 
	
}

function closeDebug(){
    $("div#debug").css("display", "none")
	$("div#debug").remove()
}

function enableDebug(){
    debug = true
    var _target = $("div#debug")
			
    if (_target[0] == undefined) {
		if ($.browser.msie){
			//var _firebug = '<script id="dynamicFirebug" type="text/javascript"> </script>'
			var _html = '<style>'+debugcss+'</style><div id = "debug">Debug logs:</div>';
        	//$('body').html(_html);
			$('body').prepend(_html)
			//$('#dynamicFirebug').attr('src','firebug-lite.js')		
			 
		}else{
			var _html = '<div id = "debug">Debug logs:</div>'
        	$('style').append(debugcss)
        	$('body').prepend(_html)
		}
        
        //console.log(_html)
    }
}



// get element actual height no matter the overflow is hidden or not
function getHeight(selector){
	
    var _display 		= $(selector).css("display")
	if($.browser.msie){
		//若TEMPLOC的值為空的,IE會找不到
		var insertchunk 	= '<div temploc="temp" style="clear:both;"></div>'
	}else{
		var insertchunk 	= '<div temploc="" style="clear:both;"></div>'
	}
	
	
    $(selector).append(insertchunk)
    $(selector).show()
	
	if($.browser.msie){
		var h1 	= $(selector).offset()["top"]
    	var h2 	= $(selector+' div').offset()["top"]
	}else{
		var h1 	= $(selector).offset()["top"]
    	var h2 	= $(selector+' div[temploc]').offset()["top"]
	}

	$(selector 			+ ' div[temploc]').detach()

    //$(selector).has('div[temploc]').detach()
    $(selector).css("display", _display)
    return h2 - h1
}

function trim(ref){
	ref = ref.replace(/^\s+|\s+$/g, '');
	return ref 
}

//append or modify class in style tag
// IE不支援JQUERY APPEND 及HTML 到HEAD>STYLE 所以只能將STYLE TAG 加到BODY中
// IE不支援 TRIM
function modifyClass(name,prop){
		if($.browser.msie){
			var atstyle = $('body style');
			var csses = trim(atstyle.html()).split('}');
			
			for(i=0;i<csses.length;i++){
				var css = csses[i];
				if(css.indexOf(name)!= -1){
					var targetcss = css.split("{");
					targetcss[1] = prop;
					csses[i] = targetcss.join("{");
					atstyle.detach();
					$('<style>'+csses.join("}")+'</style>').appendTo('body')
        			//$('body').html(_html);
					
					return
				}
			}
			$('<style>'+csses.join("}")+name+'{'+prop +'}'+'</style>').appendTo('body')
			
		}else{
			var atstyle = $('style');
			var csses = atstyle.html().trim().split('}');
			
			for(i=0;i<csses.length;i++){
				var css = csses[i];
				if(css.indexOf(name)!= -1){
						var targetcss = css.split("{");
						targetcss[1] = prop;
						csses[i] = targetcss.join("{");
						atstyle.html(csses.join("}"));
						return
				}
			}
			atstyle.html(csses.join("}")+name+'{'+prop+'}');
		}
		
}







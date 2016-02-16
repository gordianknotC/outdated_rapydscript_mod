//<div id='modalbox'> 內容......<div id="close" class="closeModal">close</div>....</div>
//用法 $('modalbox').showModalBox(callback)
//	  $('modalbox').closeModalBox(callback)

(function ($) {
    $.fn.closeModalBox = function(){
		$('#mask').delay(1000).fadeOut("slow")
		$(this).delay(1000).fadeOut("slow")
	}
	
    $.fn.showModalBox = function(fn){
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		
		//尋找HTML中ID為MASK者
		//若無則自動生成
		if($('#mask').length == 0){
			var maskcss = '#mask { position:absolute; left:0; top:0; z-index:9000; background-color:#000; display:none;}'
			if($.browser.msie){
				//自動寫入MASKCSS至STYLE TAG中 IE Doesn't work
				//$('body style').append(maskcss)
				modifyClass("#mask","position:absolute; left:0; top:0; z-index:9000; background-color:#000; display:none;")
				$('<div id="mask" class="modalMask"></div>').appendTo('body')
			}else{
				//自動寫入MASKCSS至STYLE TAG中
				$('style').append(maskcss)
				$('<div id="mask" class="modalMask"></div>').appendTo('body')
			}
			
		}
		
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		//transition effect		
		
		$('#mask').fadeIn(600);	
		$('#mask').fadeTo("slow",0.95);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(this).css('top',  winH/3-$(this).height()/2);
		$(this).css('left', winW/2-$(this).width()/2);
	
		//transition effect
		$(this).fadeIn(1500); 
		
		var _modalDialog = $(this)
		
		//尋找CLASS為CLOSEMADAL者,將其綁入關閉MODALBOX的FUNCTION
		$('.closeModal').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();
			$('#modalMask').hide();
			_modalDialog.hide();
		});	
		
		fn()
	}
    
}(jQuery));



(function ($) {
	
// comboBoxInit() :	search all customComboBox
// setComboBox()  :	set specific combobox to customComboBox


//	combo						select
//		comboTop
//		customComboDiv1				option1
//			text or input text		optoin2
//			div.comboRemove			.
//			div.comboEdit			.
//			div.comboInsert			.
//		.							.
//		.							.
//		.							.
//									.
//		customComboDivN				optionN



//		comboTop: a drop down button
//		comboDiv: drop down content



$.customComboBox=function(){
	// add: 	enable a add function in the end of combo
	// insert: 	enable a insert function in the right of each option
	// edit:	enable a edit function in the reight of each option
	// remove: 	enable a remove function in the right of each option
	var setting = {add:true,insert:true,edit:true,remove:true}
	
	
	// transform a default select combo to a custom combo
	// select all 'visible' 'select' element with a class of customCombo 
	var tars = $('select#customCombo[style!*=none]')
	for(i=0;i<tars.length;i++){
		if(tars.length == 1) {var tar = tars}else{var tar = tars[i]}
		
		var s 			= tar.parent().html()
		var size 		= tar.attr('size')
		if(!size){size 	= '0em'}else{size = size+'em'}
		
		var s = s.replace(/select|option/g,'div')
		// append cutomCombo next of the default combo
		tar.parent().append(s)	
		// set default select combo to invisible
		tar.css('display','none')
	}
	
	
	// set combo size and overflow
	var tars = $('div#customCombo')
	tars.attr('size',size)
	multiple = tar.attr('multiple')
	if(!multiple) {
		tars.css({overflow:'hidden',height:size})
		tars.before('<div id="comboTop" class="customCombo"></div>')
	}else{
		tars.css({overflow:'scroll',height:size})
	}
	
	
	
	
	
	
	// set comboBox actions
	for(i=0;i<tars.length;i++){
		if(tars.length == 1) {var tar = tars}else{var tar = tars[i]}
		// tar: 			customComboDiv
		// tar.parent(): 	combo
		$('div#comboTop',tar.parent()).html($(tar.children()[0]).html())	//copy the first record text of customCombo to comboTop
		$('div#customComboDiv',tar).css({height:size,overflow:'hidden'})
		
		var len = tar.children().length
		$(tar.children()).each(function(index){
			// $(this): customComboDiv
			if(setting.edit){
				$(this).append('<div class="comboEdit"></div>')
				$('div.comboEdit',$(this)).click(comboEdit)	
			}
			if(setting.remove){
				$(this).append('<div class="comboRemove"></div>')
				$('div.comboRemove',$(this)).click(comboRemove)
			}
			if(setting.insert){
				$(this).append('<div class="comboInsert"></div>')
				$('div.comboInsert',$(this)).click(comboInsert)
			}
			
			
			// 最後一筆為 add function 所以不包括
			if(index != len-1){
				// 是否為multiple　selection
				if(!multiple){
					// not multiple select
					$(this).click(function(){
						// 當 comboEdit comboRemove combeInsert 按下時,不執行  COMBODIV 的 CLICK CODE
						if(!$(this).parent().attr('subClick')){
							var parent = $(this).parent()
							var len = parent.children().length-1+'em'
							var size = parent.attr('size')
							var first = tar.children()[0]
							if(parent.attr('state')){
								parent.animate({height:size},500)
								parent.attr('state','')
							}else{
								parent.animate({height:len},500)
								parent.attr('state','open')
							}
							
							if($(this).attr('value') != $(first).attr('value')){
								$(this).insertBefore(first)
								
								$('div#comboTop',tar.parent()).html($(tar.children()[0]).html().split('<div')[0])
							}
							
							var v = $(this).attr('value')
							var select = $('select',parent.parent())
							
							$('option[value='+v+']',select).attr('selected','selected')
						}
						
					})
				}else{ // multiple select ////////////////////////////////////////////// 未實作 not implemented
					
					
					
					// single select and multiselect from drag
					$(this).mouseup(function(){
						select.attr('drag','false')
					})
					$(this).mousedown(function(){
						var v = $(this).attr('value')
						var select = $('select',$(this).parent().parent())
						
						if(!select.attr('enable_multi'))select.children().removeAttr('selected')
						
						$('option[value='+v+']',select).attr('selected','selected')
						select.attr('drag','true')
						
					})
					$(this).mouseover(function(){
						if(select.attr('drag')=='true'){
							var select = $('select',$(this).parent().parent())
							var v = $(this).attr('value')
							$('option[value='+v+']',select).attr('selected','selected')
						}
					})
					
					// ctrl
					$(this).keypress(function(event){
						if(event.keycode == '17'){
							var select = $('select',$(this).parent().parent())
							select.attr('enable_multi','ture')
						}
					})
					
					$(this).keyup(function(event){
						if(event.keycode == '17'){
							var select = $('select',$(this).parent().parent())
							select.removeAttr('enable_multi')
						}
					})
					
					
					
				}// multiple selsect
			}// if != len
			
		})//each
		
		
		
		$('div#comboTop',tar.parent()).click(function(){
			console.log('woeifjoeifjoiejofieiofoejwjf')
			$(tar.children()[0]).click()
		})
		// 最後一筆為 ADD FUNCTION ,只要 OPTION中有加入 helper = insertOption 者
		// 在生成CUSTOMCOMBO時便會為其加上 ADD FUNCTION
		var target = $('div[helper=insertOption]',tar)
		if(!target.attr('binded')){
			target.click(insertOption)	
		}
		
	}// for(i=0;i<tars.length;i++)
	
		
	function insertOption(){
		// $(this): customComboDiv( add function)
		// v:		option value
		// t:		option text
		var v = $(this).attr('value')
		// customComboDiv  add....
		var t = $(this).html()
		
		// insert a new customComboDiv before add function		
		$(this).before('<div class="customComboDiv" value="' + parseInt(v+1) + '"></div>')
		// append a input text under the new customComboDiv we just create
		$(this).prev().append('<input type="text" value="" />' )	
		
		$('input',$(this).prev()).bind('focusout',function(){
			// customComboDiv > input
			$(this).attr('url','/wiki/blog/createCategory/')	
			$(this).attr('data','name='+$(this).attr('value'))
			comboFocusOut.call($(this))
		})
		$('input',$(this).prev()).focus()
	
	}
	
	function comboFocusOut(){
		console.log('comboFocusOut',$(this))
			var txt = $(this).attr('value')
			var url = $(this).attr('url')
			var data = $(this).attr('data')
			if(txt){
				// customComboDiv
				if($(this).attr('class')=='customComboDiv'){
					console.log('comboFocusOut0')
					var parent = $(this)
					
				}else{
					var parent = $(this).parent()
					var tmp = parent.html().split('<div')
							  tmp.shift()
					var t2 	= '<div'+tmp.join('<div')
					parent.html(txt+t2)
				}
				
				var combo = parent.parent()
				
				combo.animate({height:combo.children().length-2+'em'},500)
				console.log('comboFocusOut1',url)
				$.ajax({url:url,type:'Post',dataType:'html',data:data,
						success:function(data){
							console.log('success  .... data = '+data,combo)
							//$('div',combo).remove()
							$('select',combo).html(data)
							$('select',combo).css('display','none')
							//combo.animate({height:combo.children().length-1+'em'},500)
							//customComboBox()
							if(combo.attr('subClick')=='removeCombo')combo.removeAttr('subClick')
						},
						error:function(){
							console.log('ERRRRRRRRROOOORRR')
							$('div',combo).remove()
							$.customComboBox()
						}
				})
			}else{
				$(this).remove()
			}
	}
	
	function comboEdit(event){
		// $(this): comboEdit under customComboDiv
		// tar: 	customComboDiv
		// v:		option value 
		var tar = $(this).parent()
		var v = tar.attr('value')
		
		// tar.parent():	combo
		tar.parent().attr('subClick','comboEdit')
		
		// t:	option text
		// t2:	div elements (comboEdit comboRemove comboInsert)
		var tmp = tar.html().split('<div')
		var t  	= tmp.shift()
		var t2 	= '<div'+tmp.join('<div')
		// text
		
		
		
		tar.html('<input type="text" value="'+ t +'" />'+t2)
		
		$('input',tar).bind('focusout',function(){
			$(this).attr('url','/wiki/blog/updateCategory/'+v)	
			$(this).attr('data','name='+$(this).attr('value'))
			comboFocusOut.call($(this))
			tar.parent().removeAttr('subClick')
		})
		
		$('input',tar).focus()
		
	}
	function comboInsert(){
		
	}
	function comboRemove(){
		
		var tar = $(this).parent()
		var v = tar.attr('value')
		tar.parent().attr('subClick','comboRemove')
		$(tar).attr('url','/wiki/blog/removeCategory/'+v)	
		
		comboFocusOut.call(tar)
		
		tar.remove()
	}	
		
	
}



    
}(jQuery));





 	
var Monorail ={}

function contentAppendTo(content,place){
	$(content).appendTo(place)
}

function setProperty(name , value){
	Monorail[name]=value
}

function RetrieveData(data,target){
			target.html(data)
}
	


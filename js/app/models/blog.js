
$j.m({blog: {
	date:[],
	process_web2py_data:function(){
		//console.log('process_web2py_data1____________________||||||||||||||__________________----------------________________-----------------')
		for(i in web2py_data["date"]){
			//console.log('process_web2py_data2',i)
			row = web2py_data["date"][i]
			pub = row['published_on']
			id	= row['id']
			y	= pub.split('-')[0]
			m	= pub.split('-')[1]
			d	= pub.split('-')[2].split(' ')[0]
			//console.log('process_web2py_data3',i)	
			if(this.date[y]){
				//console.log('process_web2py_data4',i)	
				if(this.date[y][m]){
					if(this.date[y][m][d]){
						this.date[y][m][d].push(id)
					}else{
						this.date[y][m][d] = [id]
					}
				}else{
					this.date[y][m] = {}
					this.date[y][m][d] = [id]
				}
			}else{
				//console.log('process_web2py_data5',i)	
				this.date[y] = {}
				this.date[y][m] = {}
				this.date[y][m][d] = [id]
			}
			
			//console.log(pub,'---------------------------------------')
		}
		//console.log('process_web2py_data2____________________||||||||||||||__________________----------------________________-----------------')
		web2py_data = ''
	}	

		
}});

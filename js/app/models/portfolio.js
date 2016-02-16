/* SVN FILE: $Id$ */
/**
 * Short description for file.
 *
 * This is a sample for jamal model conventions
 *
 * jQuery is required
 *
 * Jamal :  Javascript MVC Assembly Layout <http://jamal.moagil.de/>
 * Copyright (c)    2006, Timo Derstappen <http://teemow.com/>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright        Copyright (c) 2006, Timo Derstappen
 * @link
 * @package          jamal
 * @subpackage       jamal.models
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */
/**
 * Foo Model
 *
 * This is a jamal sample model
 */
$j.m({
    portfolio: {
		// 存檔時:: this.property = {id:1,name:jhon,images:1.jpg} ;this.update()			未實作
		//			this.property = data ; this.update()								未實作
		//			this.property = {id:1}; this.save()									未實作
		
		// Find::   this.findById(id,callback)
		//			this.findAll()
		
		// FindInJson:		this.findInJason(query)
		property: {
			id: '',
			name: [],
			images: [],
			text: []
		},
		
		jsonData: 	{},
		images: 	[],
		db: 		'json', //server , json , memory
		url: 		'app/models/portfolio.json',
		icons:		[],
		queue_h:	[],
		colors:		[],
		descriptions:[],
		
		getColors: function(){
			c = this.colors
			if ($.browser.msie) {
				return this.convertColor(c, this.TomsARGB)
			}
			return c
		},
		
		convertColor: function(data, fn){
			for (i = 0; i < data.length; i++) {
				if (data[i].constructor == Array) {
					var len = data[i].length;
					for (j = 0; j < len; j++) {
					
						data[i][j] = fn(data[i][j]);
					}
				}
				else {
					//log("constructor != Array")
					data[i] = fn(data[i]);
				}
				
			}
			return data;
		},
		
		TomsARGB: function(rgba){
			rgba = rgba.split('(')[1].split(')')[0];
			var r = rgba.split(',')[0];
			var g = rgba.split(',')[1];
			var b = rgba.split(',')[2];
			var a = rgba.split(',')[3];
			
			r = eval(r).toString(16);
			g = eval(g).toString(16);
			b = eval(b).toString(16);
			a = (eval(a) * 255).toString(16);
			
			if (r.length == 1) {
				r = "0" + r;
			}
			if (b.length == 1) {
				b = "0" + b;
			}
			if (g.length == 1) {
				g = "0" + g;
			}
			if (a.length == 1) {
				a = "0" + a;
			}
			
			var arbg = '#' + a + r + g + b;
			//var cssdata = 'background: transparent;-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+')"; /* IE8 */ filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+arbg+',endColorstr='+arbg+');   /* IE6 & 7 */ zoom: 1;';
			
			return arbg;
		},
		
		getDescriptions: function(){
			return this.descriptions
		},
		process_web2py_data:function(){
			var data = web2py_data['gallery']
			for (i in data){
				for(name in data[i]){
					switch(name){
						case 'colors':
						this.colors.push(data[i][name])
						break
						case 'description':
						this.descriptions.push(data[i][name])
						break
						case 'images':
						this.images.push(data[i][name])
						break
						
					}// switch
				}// for name
			}// i in data
			this.genImages()
		},
		genImages: function(){			
			
			for (i = 0; i < this.images.length; i++) {
				var arr = []
				var xy = {}
				for (j = 0; j < this.images[i].length; j++) {
					var dir = "https://sites.google.com/site/jamalmvc/images/"
					arr.push(dir + this.images[i][j] + '.jpg')
				}
				xy = {
					x: arr.slice(0, 2),
					y: arr.slice(2, arr.length)
				}
				
				this.queue_h[i] = xy
				this.icons[i] 	= dir + "icon" + i + ".jpg"

			}
			log('this.queue_h ==============================',this.queue_h)
			
		},
		
		getImages:function(){
			return this.images
		},
		
		getIcons:function(){
			return this.icons
		},
		
		getQueuedata:function(){
			return this.queue_h
		}
		
	}});

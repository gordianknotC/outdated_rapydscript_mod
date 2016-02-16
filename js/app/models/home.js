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
    home: {
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
		imagedata: 	[[],['section1_x0_y0', 'section1_x1_y0', 'section1_x1_y1', 'section1_x1_y2'], ['section2_x0_y0', 'section2_x1_y0', 'section2_x1_y1'], ['section3_x0_y0', 'section3_x1_y0', 'section3_x1_y1', 'section3_x1_y2'], ['section4_x0_y0', 'section4_x1_y0', 'section4_x1_y1', 'section4_x1_y2'], ['section5_x0_y0', 'section5_x1_y0', 'section5_x1_y1', 'section5_x1_y2'], ['section6_x0_y0', 'section6_x1_y0', 'section6_x1_y1', 'section6_x1_y2'], ['section7_x0_y0', 'section7_x1_y0', 'section7_x1_y1', 'section7_x1_y2'], ['section8_x0_y0', 'section8_x1_y0', 'section8_x1_y1'], ['section9_x0_y0', 'section9_x1_y0', 'section9_x1_y1'], ['section10_x0_y0', 'section10_x1_y0', 'section10_x1_y1'], ['section11_x0_y0', 'section11_x1_y0', 'section11_x1_y1'], ['section12_x0_y0', 'section12_x1_y0', 'section12_x1_y1'], ['section13_x0_y0']],
		db: 		'json', //server , json , memory
		url: 		'app/models/Portfolio.json',
		icons:		[],
		queue_h:	[],
		
		getColors: function(){
			var c = [["rgba(15,80,146,1)", "rgba(23,47,71,1)", "rgba(23,47,71,1)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,1)", "rgba(0,0,0,.6)", "rgba(0,0,0,.6)"], ["rgba(190,44,0,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(90,90,94,1)", "rgba(33,33,35,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)"], ["rgba(0,150,220,1)", "rgba(49,58,63,.8)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(130,8,29,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(122,122,115,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(235,140,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(0,0,0,1)"], ["rgba(194,49,144,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"], ["rgba(114,0,0,1)", "rgba(114,0,0,0)", "rgba(114,0,0,1)", "rgba(114,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.4)"], ["rgba(190,44,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]]
			
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
			var skillimages = {
				alias: '<img over="images/alias.png" 		src="images/alias_g.png" 		title="3D modeling app:alias studio 2010" />',
				modo: '<img over="images/modo.png" 		src="images/modo_g.png" 		title="3D modeling and rendering app:Luxology Modo401"/>',
				solidworks: '<img over="images/solidworks.png" 	src="images/solidworks_g.png" title="3D modeling app:Solidworks2009"/>',
				photoshop: '<img over="images/photoshop.png" 	src="images/photoshop_g.png" 	title="photoshopCS3"/>',
				booscript: '<img over="images/booscript.png" 	src="images/booscript_g.png" 	title=".NET framework language similar to python:booscript"/>',
				
				unity3d: '<img over="images/unity3d.png" 		src="images/unity3d_g.png" 	title="Web3d and game development:unity3d"/>',
				blaze3d: '<img over="images/blaze3d.png" 		src="images/blaze3d_g.png" 	title="Web3d app:blaze3d"/>',
				vray: '<img over="images/vray.png" 		src="images/vray_g.png" 		title="3D rendering app:vray"/>',
				jquery: '<img over="images/jquery.png" 		src="images/jquery_g.png" 	title="javascript framework:jquery"/>',
				monorail: '<img over="images/monorail.png" 	src="images/monorail_g.png" 	title=".NET MVC framework:monorail"/>',
				
				flash: '<img over="images/flash.png" 		src="images/flash_g.png" 		title="flash actionscript2.0"/>',
				showcase: '<img over="images/showcase.png" 	src="images/showcase_g.png" 	title="autodesk showcase"/>',
				sketchbook: '<img over="images/sketchbook.png" 	src="images/sketchbook_g.png" title="autodesk sketchbook pro"/>',
				reason: '<img over="images/reason.png"  		src="images/reason_g.png" 	title="electronical music arrangement"/>'
			
			}
			
			var temp = ''
			for (_img in skillimages) {
				temp += skillimages[_img]
			}
			
			skillimages.all = temp;
			
			var Descriptions = [{
				'img': [skillimages.alias, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '用聽的看書<br>用聽的學習<br>讓閱讀不受侷限<br>讓學習如影隨形'
			}, {
				'img': [skillimages.solidworks, skillimages.vray, ''],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '網路電話,手繪地圖<br>音聲圖文,暢談無阻'
			}, //,,
			// 網路電話,手繪地圖,即時傳輸<br>比肩同樂以書代,音聲圖文,暢言(談)無阻<br>暢話網際,繪聲繪影, ...無阻
			
			
			{
				'img': [skillimages.solidworks, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': ''
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '30~60度即時仰角<br>遠近操作皆宜<br>視訊功能上掀式直覺式操作,貼近您的心'
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '耳機<BR>手環<BR>MP3'
			},//mp3手環  內建藍牙耳機<br>樂樂相伴 如影隨形
			{
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '音響<br>夜燈<br>MP3'
			}, {
				'img': [skillimages.solidworks, skillimages.modo, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '電動牙刷<br>瑞士刀<br>電鬍刀'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '夜燈<br>收音機<br>繄急照明燈'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': '百萬手機設計-入選'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': 'OIC MP3設計-佳作'
			}, {
				'img': [skillimages.modo, skillimages.vray, skillimages.sketchbook + skillimages.photoshop],
				'text': ["3D Modeling", "3D Rendering", "2D Rendering"],
				'title': 'INTEL PC造型王第三名'
			}, {
				'img': ["", "", skillimages.sketchbook + skillimages.photoshop],
				'text': ["", "", "2D Rendering"],
				'title': ''
			}, {
				'img': [skillimages.unity3d + skillimages.blaze3d, skillimages.booscript + skillimages.monorail + skillimages.jquery, skillimages.reason],
				'text': ["Web3d app", "Web design", "Arrangement"],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': [skillimages.all, '', ''],
				'text': ['', '', ''],
				'title': '專長<BR>工業設計<BR>網頁設計<BR>WEB3D<BR>多媒體電子配樂'
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}, {
				'img': ["", "", ""],
				'text': ["", '', ''],
				'title': ''
			}]
			
			return Descriptions
		},
		
		genImages: function(){			
			
			for (i = 0; i < this.imagedata.length; i++) {
				var arr = []
				var xy = {}
				for (j = 0; j < this.imagedata[i].length; j++) {
					var dir = "images/"
					arr.push(dir + this.imagedata[i][j] + '.jpg')
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
			return this.imagedata
		},
		
		getIcons:function(){
			return this.icons
		},
		
		getQueuedata:function(){
			return this.queue_h
		}
		
	}});

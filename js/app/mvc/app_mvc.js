$j.m({portfolio:{property:{id:"",name:[],images:[],text:[]},jsonData:{},images:[],db:"json",url:"app/models/portfolio.json",icons:[],queue_h:[],colors:[],descriptions:[],getColors:function(){var a=this.colors;if($.browser.msie)if(this.colors[0][0].substr(0,1)!="#")a=this.colors=this.convertColor(a,this.TomsARGB);return a},convertColor:function(a,b){for(i=0;i<a.length;i++)if(a[i].constructor==Array){var c=a[i].length;for(j=0;j<c;j++)a[i][j]=b(a[i][j])}else a[i]=b(a[i]);return a},TomsARGB:function(a){a=
a.split("(")[1].split(")")[0];var b=a.split(",")[0],c=a.split(",")[1],e=a.split(",")[2];a=a.split(",")[3];b=eval(b).toString(16);c=eval(c).toString(16);e=eval(e).toString(16);a=(eval(a)*255).toString(16);if(b.length==1)b="0"+b;if(e.length==1)e="0"+e;if(c.length==1)c="0"+c;if(a.length==1)a="0"+a;return"#"+a+b+c+e},getDescriptions:function(){return this.descriptions},process_web2py_data:function(){var a=web2py_data.gallery;for(i in a)for(name in a[i])switch(name){case "colors":this.colors.push(a[i][name]);
break;case "description":this.descriptions.push(a[i][name]);break;case "images":this.images.push(a[i][name])}this.genImages()},genImages:function(){for(i=0;i<this.images.length;i++){var a=[],b={};for(j=0;j<this.images[i].length;j++){var c="https://sites.google.com/site/jamalmvc/images/";a.push(c+this.images[i][j]+".jpg")}b={x:a.slice(0,2),y:a.slice(2,a.length)};this.queue_h[i]=b;this.icons[i]=c+"icon"+i+".jpg"}log("this.queue_h ==============================",this.queue_h)},getImages:function(){return this.images},
getIcons:function(){return this.icons},getQueuedata:function(){return this.queue_h}}});
$j.v({portfolio:{show:function(a,b){log("portolioView Show!!__________");jamal.c.Nav._select("portfolio");this.setActionProp("show",{state:b.id});var c=b.id.split("section")[1];log("portolioView Show!!__________ data = ",c);var e=c.split("_x")[0],f=c.split("_x")[1].split("_y")[0],g=c.split("_x")[1].split("_y")[1],l=eval(f)+eval(4.482666666666667*(e-1)),n=eval(f)+eval(g),q=this.getActionProp("show"),k=q.lastframe,o=$("div>img#section"+c);log("portolioView Show!!__________ this.getActionProp(show) = ",
q);if(k==undefined){k=$("div>img#section1_x0_y0");k.attr("_x",0);k.attr("_y",0)}log("actionTrigger1 x = ",f+" ,y = "+g+" ,n = "+l);o.attr("_order",n);o.attr("_x",l);o.attr("_y",g);o.attr("set",e);log("actionTrigger2 x = ",f+" ,y = "+g+" ,n = "+l);c=eval($("div#container").css("width").split("px")[0]);n=eval($("div#container").css("height").split("px")[0]);var p=o.innerWidth();q=o.innerHeight();log("actionTrigger3 _w = ",c+" ,_h = "+n+" ,w = "+p+" ,h = "+q);scale_dur=c!=750||n!=400?500:0;c=Math.abs(l-
k.attr("_x"))>0;n=Math.abs(g-k.attr("_y"))>0||g==k.attr("_y")&&g!=0;log("animTarget = ",o.selector);log("lastframe = ",k.selector);log("x, prevx = ",f+", "+k.attr("_x")+"\t set = "+e);log("y, prevy = ",g+", "+k.attr("_y"));log("is horizon = ",c);log("is vertical = ",n);log("pos = ",l*-750+" ,n = "+l);f=n==true&&c==true;c=k.attr("_y")==0&&f;n=k.attr("_y")!=0&&g==0&&f;k=k.attr("_y")!=0&&g!=0&&f;log("isTwoDimensionMoving = ",f);log("isMovingFromXtoY = ",c);log("isMovingUPtoX = ",n);log("isMovingUPtoXtoDOWN = ",
k);var r=jamal.v.portfolio;q=g==0?350:400;e=e=="13"?1074:750;if(f){if(c){log("test0");$("div#title").animate({width:e},{queue:false,duration:scale_dur});$("div#navigation").animate({width:e},scale_dur);$("div#corner").animate({width:e},scale_dur);log("test1");$("div#container").animate({width:e,height:q},scale_dur,function(){$("div#portfolio").animate({left:-750*l},750,"easeInOutExpo",function(){$("div#portfolio").animate({top:-1072*g},750,"easeInOutExpo",function(){$("div#container").animate({width:p},
500);$("div#title").animate({width:p},{queue:false,duration:500});$("div#navigation").animate({width:p},500);$("div#corner").animate({width:p},500);r.setActionProp("show",{lastframe:o,animating:false})})})})}if(n){$("div#title").animate({width:e},{queue:false,duration:scale_dur});$("div#navigation").animate({width:e},scale_dur);$("div#corner").animate({width:e},scale_dur);$("div#container").animate({width:e,height:q},scale_dur,function(){$("div#portfolio").animate({top:-1072*g},900,"easeInOutExpo",
function(){$("div#portfolio").animate({left:-750*l},900,"easeInOutExpo",function(){r.setActionProp("show",{lastframe:o,animating:false})})})})}if(k){$("div#title").animate({width:e},{queue:false,duration:scale_dur});$("div#navigation").animate({width:e},scale_dur);$("div#corner").animate({width:e},scale_dur);$("div#container").animate({width:e,height:q},scale_dur,function(){$("div#portfolio").animate({top:0},900,"easeInOutExpo",function(){$("div#portfolio").animate({left:-750*l},750,"easeInOutExpo",
function(){$("div#portfolio").animate({top:-1072*g},900,"easeInOutExpo",function(){$("div#container").animate({width:p},500);$("div#title").animate({width:p},{queue:false,duration:500});$("div#navigation").animate({width:p},500);$("div#corner").animate({width:p},500);r.setActionProp("show",{lastframe:o,animating:false})})})})})}log("%%%%%% ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");b.target=o;log("2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");this._colorTransform(b);log("2 |+_|+_|+_|+_%$#%#%$#%!@$#^$@^#$@&*^(&(*&(*&)(*)(*_)(+_)+_)+_)+_)+_)")}else{log("one dimension section:::::");
$("div#title").animate({width:e},{queue:false,duration:scale_dur});$("div#navigation").animate({width:e},scale_dur);$("div#corner").animate({width:e},scale_dur);log("one dimension section0:::::");if(g==0){log("one dimension section1:::::");$("div#container").animate({width:e,height:q},scale_dur,function(){$("div#portfolio").animate({left:-750*l,top:-1072*g},1500,"easeInOutExpo",function(){log("set current.setActionProp!!",r);r.setActionProp("show",{lastframe:o,animating:false})})})}else{log("one dimension section2:::::");
$("div#container").animate({width:e,height:q},scale_dur,function(){$("div#portfolio").animate({left:-750*l,top:-1072*g},1500,"easeInOutExpo",function(){$("div#container").animate({width:p},500);$("div#title").animate({width:p},{queue:false,duration:500});$("div#navigation").animate({width:p},500);$("div#corner").animate({width:p},500);r.setActionProp("show",{lastframe:o,animating:false})})})}log("%%%%%% ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");b.target=o;log("1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
this._colorTransform(b);log("1 |+_|+_|+_|+_%$#%#%$#%!@$#^$@^#$@&*^(&(*&(*&)(*)(*_)(+_)+_)+_)+_)+_)")}this._menuSize("Big")},gallery:function(){},_contact_formAct:function(){$("div.modalWindow p").html("mail processing please wait..");jamal.c.portfolio.__ModalBox("show");return true},_title:function(a){log("$$$$$$$$$$$$ _title View0..$$$$$$$$$$$$$$$$");if(a!=undefined){log("$$$$$$$$$$$$ _title View1..$$$$$$$$$$$$$$$$");var b=a.id;$("div#scrollimg img").animate({top:-86*(b-1)},{duration:500,queue:false});
if(a.titleH!=undefined){b=a.titleH;var c=a.pW;a=a.tableW;var e=$("div#title"),f=$("div#describe>table"),g=$("div#describe>p");g.attr("style","");f.attr("style","");f.css("width",a);g.css("width",c);e.animate({height:b},{duration:500,queue:false})}}},___menuOver:function(a){log("________m e n u O v e r ________",a);if(!$(this).data("closeover")){a=this.parentNode.getAttribute("id");a=$("div#menu div#"+a+" div.navBg");a.css("display","block");a.animate({opacity:0.95},{duration:450});var b=$("div#menu div>div.navBg").not(a.selector);
b.css("display","none");b.css("opacity",0);if(!$.browser.msie){a.corner("15px");$("div.navBg[style*=block]>a").eq(0).corner("TR TL 15");$("div.navBg[style*=block]>a").eq(3).corner("BR BL 15")}}},_menuSize:function(a){log("_________M E N U S I Z ========",a);var b={margin:"-5px 0px 0px -50px",padding:"0px",width:"150px"};$("div#menu").css({width:"720px",height:"154px"});switch(a){case "Big":var c={margin:"-6px 10px 0px -85px",padding:"4px 15px",width:"153px"},e=70,f=55,g=4;$.browser.msie&&$("div#menu>div").css({width:"600px"});
break;case "Tiny":c=b;f=e=40;g=4;break;case "Tiny2":c=b;f=e=30;g=4;$("div#menu").css("width","160px");$.browser.msie&&$("div#menu>div").css({width:"auto"})}$("#menu div > div > div:first-child").animate({height:f,width:e,"margin-right":g},{duration:500,queue:false});$("div.navBg").css(c)},_gallerySize:function(a){a=a.width;$("div#container").animate({width:a},{queue:false,duration:500});$("div#title").animate({width:a},{queue:false,duration:500});$("div#navigation").animate({width:a},{queue:false,
duration:500});$("div#corner").animate({width:a},{queue:false,duration:500})},_colorTransform:function(a){var b=a.target,c=a.colors,e=a.imgnum;log("transColorByTarget0 tar =",b+"    , color = "+c);targetcolor=c;var f=b?eval(b.attr("_order")):0;b=targetcolor[f+1];c=targetcolor[f+1+e];f=targetcolor[f+1+e*2];if($.browser.msie){c||(c="#FFE3E3E3");f||(f="#00000000")}else{c||(c="rgba(227,227,227,1)");f||(f="rgba(0,0,0,0)")}log("id = ",a.id);log("picnum = ",e);log("argb, argb2, argb3 = ",b+"   "+c+"   "+
f);if($.browser.msie){log("transColorByTarget0 IE",targetcolor[0]);params=[{background:"#"+targetcolor[0].substr(3,9)},{color:"#"+targetcolor[0].substr(3,9)},{background:"transparent",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr="+b+",endColorstr="+b+")"},{background:"transparent",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr="+c+",endColorstr="+c+")"},{background:"transparent",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr="+f+",endColorstr="+
f+")"}]}else{log("transColorByTarget0 FF",targetcolor[0]);params=[{backgroundColor:targetcolor[0]},{color:targetcolor[0]},{backgroundColor:b},{backgroundColor:c},{backgroundColor:f}]}cssdata=["#navbt div:hover {text-decoration: none;background:"+targetcolor[0]+";color: #FFFFFF;}#navbt .current_page_item div{background:"+targetcolor[0]+";}",".white{color:"+targetcolor[0]+"}",""];elements=[$("div#navbt ul>li.current_page_item div"),$("div#navigation span.white"),$("div#title"),$("div#corner"),$("div#menu")];
log("transColorByTarget1",params[1]);$("div#container div>h4").css(params[1]);log("COLOUR = ",targetcolor[0]);if($.browser.msie){modifyClass("#navbt div:hover","background:#"+targetcolor[0].substr(3,9));modifyClass("#navbt .current_page_item div","background:#"+targetcolor[0].substr(3,9))}else{modifyClass("#navbt div:hover","background:"+targetcolor[0]+";");modifyClass("#navbt .current_page_item div","background:"+targetcolor[0]+";")}log("transColorByTarget2","");a=targetcolor[0].split(",");a.pop();
a=a.join(",")+",.2)";$.browser.msie?modifyClass("#menu div.navBg div:hover","background:#"+targetcolor[0].substr(3,9)):modifyClass("#menu div.navBg div:hover","background:"+a);(function(g,l){log("colorTransform0 params = ",l);for(i=0;i<g.length;i++){var n=g[i];_param=l[i];if($.browser.msie){log(n,_param);n.css(_param)}else n.animate(_param,1E3,function(){})}})(elements,params,cssdata)},afterRender:function(a,b){log("in portfolio afterRender: view = ",a);switch(a){case "_title":$("div#describe[renderer=section1] td:eq(0)").corner("TR 15px");
$("div#describe[renderer=section1] td:eq(2)").corner("BR 15px");case "inittitle":$("tbody img").each(function(){if(!$(this).attr("binded")){$(this).attr("binded",true);$(this).hover(function(){var c=this.src;this.src=c.indexOf("_g.")>0?c.replace("_g.","."):c.replace(".png","_g.png")})}});jamal.c.Nav.state=="about"&&this._title({id:15,titleH:180,tableW:220,pW:110});break;case "initmenu":case "_galleryMenu":log("________bind      m e n u O v e r_____");$("div#menu div[id] div[style]").corner("5px");
$("div>div>div[style]",$("div#menu")).bind("mouseover",this.___menuOver);break;case "initgallery":case "_gallery":log("___I M A G E Q _______",b);jQuery.imagesQ({onLoaded:function(){var c=$("img"+this.target);c.attr("src",this.current.src);c.css({background:"transparent"})},onComplete:function(){log("*************************************************complete!! renderBehavior!!");jamal.c.portfolio.galleryLoaded=true;jamal.c.portfolio.__ModalBox("close");$("div#portfolio").css({display:"none",height:"0"});
$("div#portfolio").css({height:"auto"});$("div#portfolio").slideDown(1500);jamal.v.portfolio.afterRender("inittitle")},queue:b});break;case "contact":$("div#contact>div#con_rcolum").corner("TR 15px");$("div#contact>div#con_lcolum").corner("TL 15px")}log("end in portfolio afterRender: view = ",a)}}});
$j.c({portfolio:{galleryLoaded:false,index:function(){this.RenderAs("CustomRender")},inittitle:function(a){log("##########   inittitle      ############ query = ",a);this.RenderAs("Default",a)},_title:function(){log("##########   _title      ############");this.RenderAs("CustomRender");if($.browser.msie){$("div#navigation").css("height","auto");$("div#navbt a").css({"line-height":"12px"});$("div#menu>div").css({width:"600px"});$("div#describe").css("margin-top","20px")}},initgallery:function(){log("##########   initgallery      ############ this =",
this);this.RenderAs("CustomRender",this.c.m.getQueuedata());$("div.modalWindow p").html("loading images please wait..");this.c.__ModalBox("startup")},initmenu:function(){log("##########   galleryMenu      ############","");$("div>div>div[style]",$("div#menu")).data("closeOver",false);this.RenderAs("CustomRender")},about:function(){return this.CancelView()},contact:function(){},show:function(a){if(a.id==undefined){log("reset query!!",a);var b=this.actionProp.state;a.id=b==undefined?"section1_x0_y0":
b}this.c.setCurrentPositionTo("portfolio");log("###########n#############","");var c=this.c.m.getImages(),e=this.c.m.getColors(),f=this.c.getActionProp("show");b=parseInt(a.id.split("section")[1].split("_x")[0]);log("portfolio show......id \t= ",b);log("portfolio show......query \t= ",a);log("portfolio show......prop \t= ",f);if(f.animating==true){log("###########block animation#############",f.animating);return this.CancelView()}else{log("_________________start animation_________________",f.animating);
this.c.setActionProp("show",{animating:true,query:a});a={colors:e[b-1],id:a.id,imgnum:c[b-1].length};this.RenderView("show");this.RenderAs("CustomRender",a);log("portfolio show1......this.getActionProp(show) \t= ",this.c.getActionProp("show"));a={id:b,pW:120,tableW:"auto",titleH:90};log("args = ",b);jamal.excute("portfolio","inittitle",{id:b,action:"inittitle",args:[b]});jamal.v.portfolio._title(a);log("portfolio show2......this.getActionProp(show) \t= ",this.c.getActionProp("show"))}},__ModalBox:function(a){log("showModalBox!!!! imageLoaded = ",
this.galleryLoaded);switch(a){case "startup":if(this.galleryLoaded!=true){$("#dialog").showModalBox(function(){});$("#dialog").corner(30)}break;case "close":log("close ModalBox @$#$#@$@#$@#%$%$*#^$*(@&#^$*^(");$("#dialog").closeModalBox(function(){});break;case "show":$("#dialog").showModalBox(function(){})}}}});
$j.v({Nav:{afterRender:function(a){switch(a){case "init":log("in Nav afterRender: view = ",a);$("div#navigation").corner("15px");$("div#navbt ul li:last a").corner("BR 15px");$("div#login_bt").click(this.login_click);break;case "showLoginForm":a=$("div#login",this.filter.init);console.log("target = ",a);if(a.attr("init")!="true"){a.attr("init","true");$("div#login_form").css("display","block");a.css("overflow","visible");var b=a.innerHeight();a.css("height","auto");var c=a.innerHeight();a.css("height",
b);a.attr("close",b+"px");a.attr("open",c+"px");a.css("overflow","hidden");console.log(b,c);console.log(a.attr("close"),a.attr("open"));$("div#login input").hover(function(){$(this).css({background:"#333",border:"1px solid #444",color:"#888"})},function(){$(this).css({background:"#222",border:"1px solid #444",color:"#888"})})}mt=205;lt=65;ht=100;c=parseInt(a.attr("open").split("px")[0]);b=parseInt(a.attr("close").split("px")[0]);$("input",a).corner("5px");if(a.data("isclick")){$("div#login").css({background:"url(https://sites.google.com/site/jamalmvc/images/form_black.png) repeat scroll 0 10px",
backgroundColor:"#222"});$("div#login_bt>li>div.tinyicon").css({background:"url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png)"});$("div#login input").css({background:"#303030",border:"1px solid #444",color:"#888"});$("div#login input").corner("4px");$("div#login_form td").css({color:"#555"});a.animate({height:c+"px"},500);$("div#menu").animate({top:mt+c-b-60+"px"},500);$("div#blogphoto").animate({top:mt+c-b-65+"px"},500);$("div#navigation h5").animate({top:ht+c-b+"px"},500);$("div#navigation div#img").animate({top:lt+
c-b+"px"},500)}else{$.browser.msie?$("div#login").css({background:"#ddd",margin:"30px 20px -38px 0"}):$("div#login").attr("style","");$("div#login").corner("10px");$("div#login_bt>li>div.tinyicon").attr("style","");$("div#login input").attr("style","");$("div#login_form td").attr("style","");a.animate({height:b+"px"},500);$("div#menu").animate({top:mt+"px"},500);$("div#blogphoto").animate({top:mt-5+"px"},500);$("div#navigation h5").animate({top:ht+"px"},500);$("div#navigation div#img").animate({top:lt+
"px"},500)}log("   S  H  O  W  L  O  G  I  N  F  O  R  M   "+c,b);log("   S  H  O  W  L  O  G  I  N  F  O  R  M   "+a.innerHeight(),b)}},loading:function(){jamal.headerCatcher.web2py_component_flash("loading data please wait...")},login_click:function(){target=$("div#navigation>div>div#login");target.data("isclick")?target.data("isclick",false):target.data("isclick",true);if(target.attr("init")){console.log("click2");jamal.v.Nav.afterRender("showLoginForm")}else{console.log("click init!");jamal.excute("Nav",
"showLoginForm","")}},login_next:function(){},logout_next:function(){},login_hover:function(){url="url(https://sites.google.com/site/jamalmvc/images/ui-bg_glass_75_e6e6e6_1x400.png) ";if($.browser.msie)var a=" #fff",b=" #e8e8e8";else{a=" rgba(255, 255, 255, 1)";b=" rgba(255, 255, 255, .8)"}$("div#login",this.filter.init).hover(function(){a=$.browser.msie?" #fff":" rgba(255, 255, 255, 1)";$(this).css({background:url+"repeat-x scroll 0 10px"+a})},function(){b=$.browser.msie?" #ddd":" rgba(255, 255, 255, .8)";
$(this).css({background:url+"repeat-x scroll 0 10px"+b})})},showLoginForm:function(){return true}}});
$j.c({Nav:{state:"portfolio",laststate:"portfolio",init:function(a){log("________Nav index  query = ",a);$(document).scroll(function(){t=$(this).scrollTop();$("div.flash").css({top:t})});this.RenderAs("CustomRender")},_select:function(a){log("________Nav _select  s = ",a);var b;this.state=a;switch(a.toLowerCase()){case "blog":b=1;break;case "website":b=0;break;case "portfolio":b=2;break;case "contact":b=4;var c="BR 15px";break;case "about":b=3}a=$("div#navbt li:eq("+b+")");$("div#navbt div").attr("style",
"");$("div#navbt li").removeClass("current_page_item");a.addClass("current_page_item");c&&$("a",a).corner(c)},showLoginForm:function(){var a=this.c.v.URL({a:"",c:"home",f:"user",args:["login"]});this.setURL(a);this.formAct(a)}}});
$j.m({home:{property:{id:"",name:[],images:[],text:[]},jsonData:{},imagedata:[[],["section1_x0_y0","section1_x1_y0","section1_x1_y1","section1_x1_y2"],["section2_x0_y0","section2_x1_y0","section2_x1_y1"],["section3_x0_y0","section3_x1_y0","section3_x1_y1","section3_x1_y2"],["section4_x0_y0","section4_x1_y0","section4_x1_y1","section4_x1_y2"],["section5_x0_y0","section5_x1_y0","section5_x1_y1","section5_x1_y2"],["section6_x0_y0","section6_x1_y0","section6_x1_y1","section6_x1_y2"],["section7_x0_y0",
"section7_x1_y0","section7_x1_y1","section7_x1_y2"],["section8_x0_y0","section8_x1_y0","section8_x1_y1"],["section9_x0_y0","section9_x1_y0","section9_x1_y1"],["section10_x0_y0","section10_x1_y0","section10_x1_y1"],["section11_x0_y0","section11_x1_y0","section11_x1_y1"],["section12_x0_y0","section12_x1_y0","section12_x1_y1"],["section13_x0_y0"]],db:"json",url:"app/models/Portfolio.json",icons:[],queue_h:[],getColors:function(){var a=[["rgba(15,80,146,1)","rgba(23,47,71,1)","rgba(23,47,71,1)","rgba(0,0,0,1)",
"rgba(0,0,0,1)"],["rgba(190,44,0,1)","rgba(46,45,42,1)","rgba(0,0,0,.6)","rgba(0,0,0,.6)"],["rgba(190,44,0,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)"],["rgba(90,90,94,1)","rgba(33,33,35,1)","rgba(18,18,19,1)","rgba(18,18,19,1)","rgba(18,18,19,1)"],["rgba(0,150,220,1)","rgba(49,58,63,.8)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)"],["rgba(130,8,29,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)"],
["rgba(122,122,115,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)","rgba(227,227,227,1)"],["rgba(235,140,0,1)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,1)","rgba(0,0,0,1)"],["rgba(22,88,123,1)","rgba(22,88,123,1)","rgba(22,88,123,1)","rgba(0,0,0,1)"],["rgba(194,49,144,1)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,1)"],["rgba(114,0,0,1)","rgba(114,0,0,0)","rgba(114,0,0,1)","rgba(114,0,0,1)"],["rgba(190,44,0,1)","rgba(46,45,42,0)","rgba(0,0,0,0)","rgba(0,0,0,0.4)"],["rgba(190,44,0,1)",
"rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,1)"]];if($.browser.msie)return this.convertColor(a,this.TomsARGB);return a},convertColor:function(a,b){for(i=0;i<a.length;i++)if(a[i].constructor==Array){var c=a[i].length;for(j=0;j<c;j++)a[i][j]=b(a[i][j])}else a[i]=b(a[i]);return a},TomsARGB:function(a){a=a.split("(")[1].split(")")[0];var b=a.split(",")[0],c=a.split(",")[1],e=a.split(",")[2];a=a.split(",")[3];b=eval(b).toString(16);c=eval(c).toString(16);e=eval(e).toString(16);a=(eval(a)*255).toString(16);
if(b.length==1)b="0"+b;if(e.length==1)e="0"+e;if(c.length==1)c="0"+c;if(a.length==1)a="0"+a;return"#"+a+b+c+e},getDescriptions:function(){var a={alias:'<img over="images/alias.png" \t\tsrc="images/alias_g.png" \t\ttitle="3D modeling app:alias studio 2010" />',modo:'<img over="images/modo.png" \t\tsrc="images/modo_g.png" \t\ttitle="3D modeling and rendering app:Luxology Modo401"/>',solidworks:'<img over="images/solidworks.png" \tsrc="images/solidworks_g.png" title="3D modeling app:Solidworks2009"/>',
photoshop:'<img over="images/photoshop.png" \tsrc="images/photoshop_g.png" \ttitle="photoshopCS3"/>',booscript:'<img over="images/booscript.png" \tsrc="images/booscript_g.png" \ttitle=".NET framework language similar to python:booscript"/>',unity3d:'<img over="images/unity3d.png" \t\tsrc="images/unity3d_g.png" \ttitle="Web3d and game development:unity3d"/>',blaze3d:'<img over="images/blaze3d.png" \t\tsrc="images/blaze3d_g.png" \ttitle="Web3d app:blaze3d"/>',vray:'<img over="images/vray.png" \t\tsrc="images/vray_g.png" \t\ttitle="3D rendering app:vray"/>',
jquery:'<img over="images/jquery.png" \t\tsrc="images/jquery_g.png" \ttitle="javascript framework:jquery"/>',monorail:'<img over="images/monorail.png" \tsrc="images/monorail_g.png" \ttitle=".NET MVC framework:monorail"/>',flash:'<img over="images/flash.png" \t\tsrc="images/flash_g.png" \t\ttitle="flash actionscript2.0"/>',showcase:'<img over="images/showcase.png" \tsrc="images/showcase_g.png" \ttitle="autodesk showcase"/>',sketchbook:'<img over="images/sketchbook.png" \tsrc="images/sketchbook_g.png" title="autodesk sketchbook pro"/>',
reason:'<img over="images/reason.png"  \t\tsrc="images/reason_g.png" \ttitle="electronical music arrangement"/>'},b="";for(_img in a)b+=a[_img];a.all=b;return[{img:[a.alias,a.modo,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u7528\u807d\u7684\u770b\u66f8<br>\u7528\u807d\u7684\u5b78\u7fd2<br>\u8b93\u95b1\u8b80\u4e0d\u53d7\u4fb7\u9650<br>\u8b93\u5b78\u7fd2\u5982\u5f71\u96a8\u5f62"},{img:[a.solidworks,a.vray,""],text:["3D Modeling","3D Rendering","2D Rendering"],
title:"\u7db2\u8def\u96fb\u8a71,\u624b\u7e6a\u5730\u5716<br>\u97f3\u8072\u5716\u6587,\u66a2\u8ac7\u7121\u963b"},{img:[a.solidworks,a.vray,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:""},{img:[a.solidworks,a.modo,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"30~60\u5ea6\u5373\u6642\u4ef0\u89d2<br>\u9060\u8fd1\u64cd\u4f5c\u7686\u5b9c<br>\u8996\u8a0a\u529f\u80fd\u4e0a\u6380\u5f0f\u76f4\u89ba\u5f0f\u64cd\u4f5c,\u8cbc\u8fd1\u60a8\u7684\u5fc3"},
{img:[a.solidworks,a.modo,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u8033\u6a5f<BR>\u624b\u74b0<BR>MP3"},{img:[a.solidworks,a.modo,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u97f3\u97ff<br>\u591c\u71c8<br>MP3"},{img:[a.solidworks,a.modo,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u96fb\u52d5\u7259\u5237<br>\u745e\u58eb\u5200<br>\u96fb\u9b0d\u5200"},{img:[a.modo,a.vray,a.sketchbook+
a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u591c\u71c8<br>\u6536\u97f3\u6a5f<br>\u7e44\u6025\u7167\u660e\u71c8"},{img:[a.modo,a.vray,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"\u767e\u842c\u624b\u6a5f\u8a2d\u8a08-\u5165\u9078"},{img:[a.modo,a.vray,a.sketchbook+a.photoshop],text:["3D Modeling","3D Rendering","2D Rendering"],title:"OIC MP3\u8a2d\u8a08-\u4f73\u4f5c"},{img:[a.modo,a.vray,a.sketchbook+a.photoshop],text:["3D Modeling",
"3D Rendering","2D Rendering"],title:"INTEL PC\u9020\u578b\u738b\u7b2c\u4e09\u540d"},{img:["","",a.sketchbook+a.photoshop],text:["","","2D Rendering"],title:""},{img:[a.unity3d+a.blaze3d,a.booscript+a.monorail+a.jquery,a.reason],text:["Web3d app","Web design","Arrangement"],title:""},{img:["","",""],text:["","",""],title:""},{img:[a.all,"",""],text:["","",""],title:"\u5c08\u9577<BR>\u5de5\u696d\u8a2d\u8a08<BR>\u7db2\u9801\u8a2d\u8a08<BR>WEB3D<BR>\u591a\u5a92\u9ad4\u96fb\u5b50\u914d\u6a02"},{img:["",
"",""],text:["","",""],title:""},{img:["","",""],text:["","",""],title:""},{img:["","",""],text:["","",""],title:""}]},genImages:function(){for(i=0;i<this.imagedata.length;i++){var a=[],b={};for(j=0;j<this.imagedata[i].length;j++){var c="images/";a.push(c+this.imagedata[i][j]+".jpg")}b={x:a.slice(0,2),y:a.slice(2,a.length)};this.queue_h[i]=b;this.icons[i]=c+"icon"+i+".jpg"}log("this.queue_h ==============================",this.queue_h)},getImages:function(){return this.imagedata},getIcons:function(){return this.icons},
getQueuedata:function(){return this.queue_h}}});$j.v({home:{}});$j.c({home:{galleryLoaded:false,init:function(a){log("_______Portfolio index  query = ",a);this.RenderView("init");this.RenderAs("default")},beforeAction:function(){}}});$j.c({Website:{init:function(a){log("________Webst index  query = ",a);this.CancelView()},index:function(){this.setCurrentPositionTo("Website");this.CancelView()}}});
$j.c({About:{init:function(a){log("________About index  query = ",a);this.CancelView()},index:function(){this.setCurrentPositionTo("About");this.CancelView()}}});
$j.m({blog:{date:[],process_web2py_data:function(){for(i in web2py_data.date){row=web2py_data.date[i];pub=row.published_on;id=row.id;y=pub.split("-")[0];m=pub.split("-")[1];d=pub.split("-")[2].split(" ")[0];if(this.date[y])if(this.date[y][m])if(this.date[y][m][d])this.date[y][m][d].push(id);else this.date[y][m][d]=[id];else{this.date[y][m]={};this.date[y][m][d]=[id]}else{this.date[y]={};this.date[y][m]={};this.date[y][m][d]=[id]}}web2py_data=""}}});$j.v({animeStack:{registered:{},reg:function(){}}});
$j.v({blog:{datapickerInit:function(){model=jamal.m.blog.date;$("div#datepicker").attr("init","true");$("div#datepicker").datepicker({beforeShowDay:function(a){d=a.getDate().toString();m=(a.getMonth()+1).toString();y=a.getFullYear().toString();if(m.length==1)m="0"+m;try{return model[y][m][d]?[true,"dateClass",y+"/"+m+"/"+d]:[false,'"',"none"]}catch(b){return[false,'"',"none"]}},onSelect:function(a,b){y=b.currentYear;m=b.currentMonth;d=b.currentDay;path=y+"/"+m+"/"+d;url="/blog/showArticlesByDate/"+
path;$.address.value(url)}})},foldCateList:function(){var a=$(this).next();if(a.data("isclick")){a.data("isclick",false);a.animate({height:"0"},500)}else{a.data("isclick",true);a.css("height","100%");h=a.innerHeight();a.css("height","0px");a.animate({height:h},500)}},loading:function(){jamal.headerCatcher.web2py_component_flash("loading data please wait...")},afterRender:function(a){log("!!!!!!!blog afterRender!!!!!!!",a);switch(a){case "index":if(!$("div#datepicker").attr("init")){this.datapickerInit(a);
$("div#fancyClock",this.filter[a]).tzineClock();jamal.v.Nav.login_hover();cate_node=$("div#categoryList li>span").parent().next();cate_node.css({overflow:"hidden",height:"0px"});cate_node.prev().click(this.foldCateList);jamal.address.bindClick("div#footer a[rel]");this.bindBtOnRender()}if($.browser.msie){$("div#login").css({background:"#ddd",margin:"30px 20px -38px 0"});$("div#navigation").css({padding:"0 0 10px 0",margin:"0px 0 0 0",width:"400px"});$("div#login_bt").css("width","100%");$("div#login_bt>li").eq(0).css("width",
"20px");$("div#login_bt>li").css("float","left");$("div#navbt").css({margin:"0px 0px -20px 0px",background:"transparent","float":"left"});$("div#navbt div").css("padding","12px 8px");$("div#navigation h5").css({width:"auto",left:"220px"});$("div.logobg").css({margin:"0px",top:"65px"});$("#searchBar img").css("margin-top","-16px");$("div#searchBar").css("background","#fff")}else $(b+" div#navbt").css({"float":"right","margin-right":"120px"});$("div>div>div[style]",$("div#menu")).data("closeover",true);
$("div#navigation div#login").css("display","block");$("div#menu").css({position:"absolute",top:"205px",right:"25px",padding:"0px",width:"190px",background:"none"});$("div#menu #row1").css("width","105px");$("div#menu #row2").css("width","70px");$("div#menu>div>div>div").corner("4px");$("div#menu div.navBg").css("display","none");$("div#blogphoto").css("display","block");$("div#title").css("display","none");$("div#blog_footer").corner("BL BR 35px");var b="div#navigation";$(b).corner("0px");$(b).css({right:"30px",
width:"415px",overflow:"visible",background:"#000",position:"absolute"});$(b+" div#img").css({position:"absolute",right:"0px",top:"65px",background:'url("https://sites.google.com/site/jamalmvc/images/logo_white.png") repeat scroll 0 0 transparent'});$(b+" h5").css({color:"#fff",position:"absolute",top:"100px",right:"100px"});$("div#rcol_outer").corner("25px");$("div#cate_inner").corner("15px");$("div.group").corner("15px");$("div.group>div>div").corner("10px");$("div#cate_inner>div").corner("10px");
$("div#blog_inner").corner("25px");$("div#login").corner("10px");$("div#searchBar").corner("10px");break;case "showArticlesByTag":case "showArticlesByCategory":case "showArticlesByDate":case "showArticlesByOrder":case "showComments":case "showAllArticles":case "showArticlesByPage":this.bindBtOnRender()}if($.browser.msie){b=$("div.paginator li");b.css({"float":"left","margin-left":"4px"});$("div#footer div").css("float","right")}$("div#cmt_form_bt").corner("TL TR 5px");$("div#cmt_form_body").corner("BL BR 18px");
$("div#comment_form").corner("BL BR 18px");$("div.comment_bt").corner("7px");$("div.comment_title").corner("6px");$("div#cmt_form_body input[type=submit]").corner("BR 18px");setTimeout("jamal.v.blog.resetH()",300)},resetH:function(){var a=$("div#blog").innerHeight()+100;$("div#container").css({height:a,width:"850px",margin:"0 212px 0 0","float":"right"});log("==resetH ::::::::::::::::::::::::::::::::::::::",a)},bindCmtForm:function(){var a=$("div#cmt_form_bt");a.unbind("hover");a.hover(function(){$(this).css({background:"#fff",
color:"#000"});$("div#cmt_form_body",$(this).parent()).css({background:"#fff"});$("div#cmt_form_body input[type=text]",$(this).parent()).css({background:"#fff"})},function(){$(this).css("color","");if(!$(this).data("isclick")){$(this).attr("style","");$("div#cmt_form_body",$(this).parent()).attr("style","");$(this).corner("TL TR 5px");$("div#cmt_form_body",$(this).parent()).corner("BL BR 18px");$("div#cmt_form_body input[type=text]",$(this).parent()).css({background:"#333"})}});a.unbind("click");
a.click(function(){log($(this).next());var b=$("div#container").innerHeight();if($(this).data("isclick")){$(this).data("isclick",false);$(this).next().animate({height:"10px"});$("div#container").css("height",b-385)}else{$(this).data("isclick",true);$(this).next().animate({height:385},500);$("div#container").css("height",b+385)}})},bindCmtTitle:function(){log("======================================b i n d Cmt Title==========================================");var a=$("div.comment_title");a.unbind("click");
a.click(function(){var b=$(this).next().css({height:"auto"}).innerHeight()+15;$("div#container").innerHeight();$("div.comment_set").css({overflow:"visible",height:"auto"});if($(this).data("isclick")){log("0");$(this).data("isclick",false);$(this).next().animate({height:b},500)}else{log("1");$(this).data("isclick",true);$(this).next().animate({height:"0px"},500)}});a.unbind("hover");a.hover(function(){$(this).css({background:"#d3d3d3"});$("div.tinyicon",$(this)).css({background:"url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png) repeat scroll 0 0 transparent"})},
function(){$(this).attr("style","");$("div.tinyicon",$(this)).attr("style","")})},bindCmtBt:function(){var a=$("div#comment_bt");a.unbind("click");a.click(function(){$(this).next().css("overflow","hidden");var b=$("div#container").innerHeight(),c=$(this).next().css({height:"auto"}).innerHeight()+15;if($(this).data("isclick")){$(this).data("isclick",false);$(this).next().animate({height:c},500);$("div#container").css("height",b+c)}else{$(this).data("isclick",true);$(this).next().animate({height:"2px"},
500);$("div#container").animate({height:b-c})}});a.unbind("hover");a.hover(function(){$(this).css({background:"url(https://sites.google.com/site/jamalmvc/images/form_grey.png) repeat-x scroll 0  10px",backgroundColor:"#181818"});$("div.tinyicon",$(this)).css({background:"url(https://sites.google.com/site/jamalmvc/images/orange_arrow.png)"});$("h5",$(this)).css({color:"#ef8100"})},function(){$(this).attr("style","");$("div.tinyicon",$(this)).attr("style","");$("h5",$(this)).attr("style","")})},bindBtOnRender:function(){this.bindCmtForm();
this.bindCmtBt();this.bindCmtTitle()}}});$j.c({blog:{init:function(a){log("________Blog init  query = ",a);this.RenderAs("CustomRender");this.CancelView()},index:function(a){log("________Blog index  query = ",a);this.c.setCurrentPositionTo("blog");this.RenderAs("Default")}}});
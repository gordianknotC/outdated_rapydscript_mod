/**
 * @author gordianknot
 */
;
(function($){

    $._imagesq = {
        onComplete: function(){
        } // Fires when all finished loading
        ,
        onLoaded: function(){
        } // Fires when an image finishes loading
        ,
        current: null // Last loaded image (Image Object)
        ,
        target: null,
        
        qLength: 0 // the queue length before process_queue
        ,
        images: {length:0} // Loaded images (array of Image Object)
        ,
        inProcess: false // a flag to indicate if in process_queue
        ,
        queue: [] // Waiting to be processed (array of strings (urls for Image SRC))
        ,
        queue_id: [],
        queue_images: function(arg){ // gets multiple arguments each can be either an image src or an array of image src (you can mix).
            //log("arg = ",arg)
            
            for (var i = 0; i < arg.length; i++) {
            
                if (arg[i].constructor === Array) {
                    this.queue[i] = []
                    this.queue[i] = this.queue[i].concat(arg[i]); // add to queue, do not empty it!
                }
                
                else 
                    if (arg[i].constructor === Object) {
                        this.queue[i] = []
                        flat = this.queue[i].concat(arg[i].x)
                        this.queue[i] = flat
                        flat = this.queue[i].concat(arg[i].y)
                        this.queue[i] = flat
                    }
                    
                    else 
                        if (typeof arg[i] === 'string') {
                            this.queue[i] = []
                            this.queue[i].push(arg[i]);
                        }
            }
            
            //log("queue = ",this.queue[1])
        },
        
        process_queue: function(){ // start loading images from the queue
            this.inProcess = true;
            
            //log("queue.length = ",this.queue.length)
            //log("qLength = ",this.qLength)
            for (k = 0; k < this.queue.length; k++) {
                //log("k = ",k)
                //log("this.queue[k] = ",this.queue[k])
                //log(this.queue[k].length)
                this.qLength += this.queue[k].length
            }
            
            //log(this.qLength)
            //this.qLength = 27
            
            while (this.queue.length > 0) {
                //this.queue[this.queue.length-1]
                _q = this.queue.shift()
                //log("_q =  ",_q)
                for (i = 0; i < _q.length; i++) {
                    this.load_image(_q[i]);
                }
            }
            this.inProcess = false;
        },
        
        load_image: function(imageSrc){ // load a single by a url and continue to process_general_config the queue
            var th = this;
			var tmp = imageSrc.toLowerCase().split(/.jpg|.png|.gif/g)[0].split('/')
            var tar = "#" + tmp[tmp.length - 1]
            if (this.images[imageSrc] == undefined) {
                var im = new Image;
                //log("target = ",tar)
                im.onload = function(){ // After user agent has the image
                    th.current = im; // set the current
                    th.target = tar
                    th.images[imageSrc] = im; // add the image to the stack
                    th.images.length ++ 
					
					
                  	th.onLoaded(); //fire the onloaded
                    if (th.queue.length > 0 && !th.inProcess) {
                        th.process_queue(); // make sure other items are loaded!
                    }
                    //log(th.qLength,th.images.length)
                    if (th.qLength == th.images.length) { // all images loaded?
                    	//log('th.qLength == th.images.length************************************complete!! ')
                        th.onComplete(); // call callback
                    }//else{// if queue is not empty 
                    //	
                    // }
                }
                im.src = imageSrc; // Tell the User Agent to GET the image
            }
            else {
                th.target = tar;
                (th.onLoaded)(); //fire the onloaded
                if (th.queue.length > 0 && !th.inProcess) {
                    th.process_queue(); // make sure other items are loaded!
                }
                //log(th.qLength,th.images.length)
				
				
				
                if (th.qLength == th.images.length) { // all images loaded?
                	//log('th.qLength == th.images.length************************************complete!! ')
                    th.onComplete(); // call callback
                }
            }
            
        }
    }
    
    
    $.imagesQ = function(options){
    
        $.extend($._imagesq, options)
        arr = $._imagesq.queue
        $._imagesq.queue = []
        $._imagesq.queue_images(arr)
        $._imagesq.process_queue()
    }
    
    
})(jQuery)

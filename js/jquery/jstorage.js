/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * $.jStorage
 * 
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value)
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 * 
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 * 
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 * 
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/

(function($){
    if(!$ ){
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    }
    
    var
        /* This is the object, that holds the cached values */ 
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,
        
        /* How much space does the storage take */
        _storage_size = 0,

        
		subfilename = "rails",
		
		
        
        /* which backend is currently used */
        _backend = false;
        
        

       


    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     * @returns undefined
     */
    function _init(){
        /* Check if browser supports localStorage */
        if(window.localStorage){
            try {
                _storage_service = window.localStorage;
                _backend = "localStorage";
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if(window.globalStorage){
            try {
                _storage_service = window.globalStorage[window.location.hostname];
                _backend = "globalStorage";
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        
        
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     * @returns undefined
     */
    function _save(){
        try{
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
			return true
        }catch(E7){/* probably cache is full, nothing is saved this way*/
			return false
		}
    }

    /**
     * Function checks if a key is set and is string or numberic
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        return true;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: "0.1.4",
		options:{
			callback: function(data,key){
				console.log("options.callback")
				jQuery.jStorage.set(key,data)
				jQuery.jStorage.options.requestCallback(data)
			},
			requestCallback:function(){
				
			}
		} 		,
        /**
         * Sets a key's value.
         * 
         * @param {String} key - Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param value - Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @returns the used value
         */
        set: function(key, value){
            _checkKey(key);
            
            _storage[key] = value;
            _save();
            return value;
        },
		
		 /**
         * Looks up a key in cache
         * 
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @returns the key value, default value or <null>
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },
		
		
		//jStorage.requestAndCache({model:Product,action:index,querystrings:Id=1&.....),callback)
		
		
        requestAndCache: function(hash,callback){
			jQuery.jStorage.options.requestCallback = callback
			
			console.log("hash = "+hash)
			if (hash =="[object Object]"){
				q = "?"
				if (hash["querystrings"] == undefined)
				{
					hash["querystrings"] = ""
					q=""
				}
				var key = hash["model"]+"/"+hash["action"]+"."+subfilename+q+hash["querystrings"]
				var url = key
				console.log("key = "+key)
				console.log("url = "+url)
			}else if(hash === "string"){
				var key = hash
				var url = hash
			}
			

			var isCached = this.getCache(key)
			
			if (isCached != false){
				console.log("data = ",isCached)
				callback(isCached)
			}else{
				console.log("nocache data ,begin to request!! key = ",key)
				

				jQuery.get("search.rails",function(data){
					console.log("_requestCallback key =",key)
					jQuery.jStorage.options.callback(data,key)
					
				})
			}
			
		},
		//key: Product/Index.rails?id=1&......
		getCache: function(key){
			
			cache = this.get(key)
			console.log("key = "+key)
			console.log("cache = "+cache)
			if(cache){
				return cache
			}else{
				model = key.split("/")[0]
				console.log("model] = ",model)
				queries = this.index()
				console.log("queries = ",queries)
				arr = new Array()
				for(i=0;i<queries.length;i++){
					if (queries[i].indexOf(model) === -1){
						//pass
					}else{
						arr.push(queries[i])
					}
				}
				result_arr = new Array()
				key_q_pairs = {}
				
				
				if(arr.length == 0){
					isFetchedWholeData = false
				}else{
					arr.sort()
					isFetchedWholeData = arr[0].split("?")[1] === undefined
				}
				console.log("arr[0] = ",arr[0])
				
				if (isFetchedWholeData){
					key_q = key.split("?")[1].split("=")
					for(i=0;i<key_q.length;i=i+2){
						key_q_pairs[key_q[i]]=key_q[i+1]
					}
					
					
					rawdata = this.get(arr[0])
					rawdata = "[" + rawdata.substring(1,rawdata.length-1)+"]"
					key_count = 0
					json = jQuery.parseJSON(rawdata)
					
					rawdata = rawdata.substring(1,rawdata.length-1).split("},")
					for (i = 0; i < json.length; i++) {
						_qs = ""
						for (var key in key_q_pairs) {
							if (key_q_pairs[key] == json[i][key]) {
									key_count++
									_qs = _qs + key+"="+key_q_pairs[key]+"&"
							}else{
								key_count = 0
								
							}
						}
						if (key_count != 0){
							result_arr[result_arr.length] = new Array()
							result_arr[result_arr.length] = rawdata[i] //json[i]
							
							qs = _qs.substring(0,_qs.length-1)
							
						}
						key_count = 0
					}
					
					val = ""
					for(i=0;i<result_arr.length;i++){
						val += result_arr[i]	
					}
					this.set(qs,result_arr)
					
					return val
				}else{
					return false
				}
			}
		},
		
		_keyToUrl: function(key){
			return _split(key)
		},
		
		_urlToKey: function(url){
			return _split(url)
		},
		
		_split: function(url){
			
			var chunks = url.split("/")
			controller = chunks[0]
			action = chunks[1].split("?")[0]
			querystrings = chunk[1].split("?")[1]
			
			key = controller+"/"+action+"?"+querystrings
			return key
		},
		
		_requestCallback:function(data,key,callback){
			console.log("_requestCallback")
			this.set(key,data)
			callback(data)
		},
		
		

		
       
        
        /**
         * Deletes a key from cache.
         * 
         * @param {String} key - Key to delete.
         * @returns true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                _save();
                return true;
            }
            return false;
        },

        /**
         * Deletes everything in cache.
         * 
         * @returns true
         */
        flush: function(){
            _storage = {};
            _save();
            /*
             * Just to be sure - andris9/jStorage#3
             */
            try{
                window.localStorage.clear();
            }catch(E8){}
            return true;
        },
        
        /**
         * Returns a read-only copy of _storage
         * 
         * @returns Object
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },
        
        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         * 
         * @returns Array
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i)){
                    index.push(i);
                }
            }
            return index;
        },
        
        /**
         * How much space in bytes does the storage take?
         * 
         * @returns Number
         */
        storageSize: function(){
            return _storage_size;
        },
        
        /**
         * Which backend is currently in use?
         * 
         * @returns String
         */
        currentBackend: function(){
            return _backend;
        }
    };

    // Initialize jStorage
    _init();

})(window.jQuery || window.$);
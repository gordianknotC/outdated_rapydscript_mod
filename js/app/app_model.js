/* SVN FILE: $Id: jamal.js 18 2007-06-13 09:07:32Z teemow $ */
/**
 * To quote Dave Cardwell: 
 * Built on the shoulders of giants:
 *   * John Resig      - http://jquery.com/
 *
 * Jamal :  Javascript MVC Assembly Layout <http://jamal-mvc.com/>
 * Copyright (c)    2007, Timo Derstappen <http://teemow.com/>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright        Copyright (c) 2007, Timo Derstappen
 * @link            
 * @package          jamal
 * @subpackage       jamal.model
 * @since            Jamal v 0.4
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal app model
 *
 * @public
 * @cat model
 * 
 * buildin functions:::::::
 * get , getUrl , save , post , erase , beforeSave ,beforeDelete , afterSave , afterDelete , beforeFind , afterFind ,error ,callback
 */
jamal.extend(jamal.fn.m.prototype, {
	
	property:{},
	db:'server',	//server , json , memory
	cacheQuery:'',
	url:'',
	
	jsonData:{},
	
	findAll:function(callback){
		this.property = {}
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	findById:function(id,callback){
		this.property = {id:id}
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	find:function(query,callback){
		this.property = query
		if(this.get(this.getUrl(),callback) == 'fromCache'){
			return this.cacheQuery[this.getUrl()]
		}
	},
	
	findInJson:function(query){
		var r = []
			for(i=0;i<this.jsonData.__count__;){
				var data = this.jsonData[i]
				var back = false
				for(q in query){
					if(data[q] != query[q]){
						back = true
					}
				}
				if (back == false){
					r.push(data)
				}
			}
			return r
	},
	
	// before this.get method
	beforeFind:function(xhr){
		
	}
	
});

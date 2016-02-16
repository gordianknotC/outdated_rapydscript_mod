/* SVN FILE: $Id$ */
/**
 * Short description for file.
 *
 * This is a sample for jamal controller conventions
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
 * @subpackage       jamal.controllers
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * FoosController
 * 
 * This is a sample controller
 *
 */
$j.c({Website: {
    
	////////////////////////////
	//		action index
	///////////////////////////
    init: function(query) {
		log('________Webst index  query = ',query)
		this.CancelView()
    },
	
	index: function(query) {
		this.setCurrentPositionTo('Website')
		this.CancelView()
    }
	
	
}
});

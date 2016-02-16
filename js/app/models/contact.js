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
    Contact: {
		
		send: function(){
			var c = [["rgba(15,80,146,1)", "rgba(23,47,71,1)", "rgba(23,47,71,1)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,1)", "rgba(0,0,0,.6)", "rgba(0,0,0,.6)"], ["rgba(190,44,0,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(90,90,94,1)", "rgba(33,33,35,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)", "rgba(18,18,19,1)"], ["rgba(0,150,220,1)", "rgba(49,58,63,.8)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(130,8,29,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(122,122,115,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)", "rgba(227,227,227,1)"], ["rgba(235,140,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"], ["rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(22,88,123,1)", "rgba(0,0,0,1)"], ["rgba(194,49,144,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"], ["rgba(114,0,0,1)", "rgba(114,0,0,0)", "rgba(114,0,0,1)", "rgba(114,0,0,1)"], ["rgba(190,44,0,1)", "rgba(46,45,42,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.4)"], ["rgba(190,44,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]]
			
			if ($.browser.msie) {
				return this.convertColor(c, this.TomsARGB)
			}
			return c
		}
		
	}});

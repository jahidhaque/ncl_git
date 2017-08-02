/*
|----------------------------------------------
| filter to remove space and replace with -
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: ncl, 2017
|----------------------------------------------
*/
(function(){
	angular
		.module('nclhalal')
		.filter('prettyUrl', prettyUrl);

	function prettyUrl(){
		return function(text) {
		   return String(text).replace(/ /g, "-");
		};
	}
})();
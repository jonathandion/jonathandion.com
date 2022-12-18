var utils = {
	setCookie: function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	getCookie: function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	},
	forEach: function forEach(array, callback) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(null, i, array[i]); // passes back stuff we need
	  }
	},
	isMobile: function isMobile() {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.navigator.userAgent.match("CriOS")) return true;
	},
	isIOSChrome : function isIOSChrome() {
		if(window.navigator.userAgent.match("CriOS")) return true;
	}
}

  module.exports = utils;

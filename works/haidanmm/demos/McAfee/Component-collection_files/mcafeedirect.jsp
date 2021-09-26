Array.prototype.filter||(Array.prototype.filter=function(t,e){"use strict";if("Function"!=typeof t&&"function"!=typeof t||!this)throw new TypeError;var r=this.length>>>0,n=new Array(r),o=this,l=0,i=-1;if(void 0===e)for(;++i!==r;)i in this&&t(o[i],i,o)&&(n[l++]=o[i]);else for(;++i!==r;)i in this&&t.call(e,o[i],i,o)&&(n[l++]=o[i]);return n.length=l,n}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,r;if(null===this||void 0===this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=arguments[1]),r=0;r<o;){var l;r in n&&(l=n[r],t.call(e,l,r,n)),r++}}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var r;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return-1;var l=0|e;if(l>=o)return-1;for(r=Math.max(l>=0?l:o-Math.abs(l),0);r<o;){if(r in n&&n[r]===t)return r;r++}return-1}),document.getElementsByClassName||(document.getElementsByClassName=function(t){var e,r,n,o=document,l=[];if(o.querySelectorAll)return o.querySelectorAll("."+t);if(o.evaluate)for(r=".//*[contains(concat(' ', @class, ' '), ' "+t+" ')]",e=o.evaluate(r,o,null,0,null);n=e.iterateNext();)l.push(n);else for(e=o.getElementsByTagName("*"),r=new RegExp("(^|\\s)"+t+"(\\s|$)"),n=0;n<e.length;n++)r.test(e[n].className)&&l.push(e[n]);return l}),document.querySelectorAll||(document.querySelectorAll=function(t){var e,r=document.createElement("style"),n=[];for(document.documentElement.firstChild.appendChild(r),document._qsa=[],r.styleSheet.cssText=t+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",window.scrollBy(0,0),r.parentNode.removeChild(r);document._qsa.length;)(e=document._qsa.shift()).style.removeAttribute("x-qsa"),n.push(e);return document._qsa=null,n}),document.querySelector||(document.querySelector=function(t){var e=document.querySelectorAll(t);return e.length?e[0]:null}),Object.keys||(Object.keys=function(){"use strict";var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),r=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=r.length;return function(o){if("function"!=typeof o&&("object"!=typeof o||null===o))throw new TypeError("Object.keys called on non-object");var l,i,s=[];for(l in o)t.call(o,l)&&s.push(l);if(e)for(i=0;i<n;i++)t.call(o,r[i])&&s.push(r[i]);return s}}()),"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),window.hasOwnProperty=window.hasOwnProperty||Object.prototype.hasOwnProperty;
if (typeof usi_commons === 'undefined') {
	usi_commons = {
		
		debug:location.href.indexOf("usidebug") != -1,
		
		log:function(msg) {
			if (this.debug) {
				if (msg instanceof Error) {
					console.log(msg.name + ': ' + msg.message);
				} else {
					console.log.apply(console, arguments);
				}
			}
		},
		log_error: function(msg) {
			if (this.debug) {
				if (msg instanceof Error) {
					console.log('%c USI Error:', usi_commons.log_styles.error, msg.name + ': ' + msg.message);
				} else {
					console.log('%c USI Error:', usi_commons.log_styles.error, msg);
				}
			}
		},
		log_success: function(msg) {
			if (this.debug) {
				console.log('%c USI Success:', usi_commons.log_styles.success, msg);
			}
		},
		dir:function(obj) {
			if (this.debug) {
				console.dir(obj);
			}
		},
		log_styles: {
			error: 'color: red; font-weight: bold;',
			success: 'color: green; font-weight: bold;'
		},
		domain: "https://www.upsellit.com",
		cdn: "https://upsellit-14516.kxcdn.com",
		is_mobile: (/iphone|ipod|ipad|android|blackberry|mobi/i).test(navigator.userAgent.toLowerCase()),
		device: (/iphone|ipod|ipad|android|blackberry|mobi/i).test(navigator.userAgent.toLowerCase()) ? 'mobile' : 'desktop',
		gup:function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#\\?]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.href);
			if (results == null) return "";
			else return results[1];
		},
		load_script:function(source, callback) {
			if (source.indexOf("//www.upsellit.com") == 0) source = "https:"+source; //upgrade non-secure requests
			var docHead = document.getElementsByTagName("head")[0];
			if (top.location != location) docHead = parent.document.getElementsByTagName("head")[0];
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.src = source;
			if (typeof callback == "function") newScript.onload = callback;
			docHead.appendChild(newScript);
		},
		load_display:function(usiQS, usiSiteID, usiKey, callback) {
			usiKey = usiKey || "";
			var source = this.domain + "/launch.jsp?qs=" + usiQS + "&siteID=" + usiSiteID + "&keys=" + usiKey;
			this.load_script(source, callback);
		},
		load_facebook:function(usiQS, usiSiteID, usiKey) {
		},
		load_view:function(usiHash, usiSiteID, usiKey, callback) {
			if (typeof(usi_force) != "undefined" || location.href.indexOf("usi_force") != -1 || (usi_cookies.get("usi_sale") == null && usi_cookies.get("usi_launched") == null && usi_cookies.get("usi_launched"+usiSiteID) == null)) {
				usiKey = usiKey || "";
				var usi_append = "";
				if (this.gup("usi_force_date") != "") usi_append = "&usi_force_date=" + this.gup("usi_force_date");
				else if (typeof usi_cookies !== 'undefined' && usi_cookies.get("usi_force_date") != null) usi_append = "&usi_force_date=" + usi_cookies.get("usi_force_date");
				if (typeof usi_cookies !== 'undefined' && usi_cookies.get("usi_id_cache") != null) usi_append += "&usi_id_cache=" + usi_cookies.get("usi_id_cache");
				if (this.debug) usi_append += "&usi_referrer="+encodeURIComponent(location.href);
				var source = this.domain + "/view.jsp?hash=" + usiHash + "&siteID=" + usiSiteID + "&keys=" + usiKey + usi_append;
				if (typeof(this.last_view) !== "undefined" && this.last_view == usiSiteID+"_"+usiKey) return;
				this.last_view = usiSiteID+"_"+usiKey;
				if (typeof usi_js !== 'undefined' && typeof usi_js.cleanup === 'function') usi_js.cleanup();
				this.load_script(source, callback);
			}
		},
		remove_loads:function() {
			if (document.getElementById("usi_obj") != null) {
				document.getElementById("usi_obj").parentNode.parentNode.removeChild(document.getElementById("usi_obj").parentNode);
			}
			if (typeof(usi_commons.usi_loads) !== "undefined") {
				for (var i in usi_commons.usi_loads) {
					if (document.getElementById("usi_"+i) != null) {
						document.getElementById("usi_"+i).parentNode.parentNode.removeChild(document.getElementById("usi_"+i).parentNode);
					}
				}
			}
		},
		load:function(usiHash, usiSiteID, usiKey, callback){
			usiKey = usiKey || "";
			var usi_append = "";
			if (this.gup("usi_force_date") != "") usi_append = "&usi_force_date=" + this.gup("usi_force_date");
			else if (typeof usi_cookies !== 'undefined' && usi_cookies.get("usi_force_date") != null) usi_append = "&usi_force_date=" + usi_cookies.get("usi_force_date");
			if (typeof usi_cookies !== 'undefined' && usi_cookies.get("usi_id_cache") != null) usi_append += "&usi_id_cache=" + usi_cookies.get("usi_id_cache");
			if (usi_commons.debug) usi_append += "&usi_referrer="+encodeURIComponent(location.href);
			var source = this.domain + "/usi_load.jsp?hash=" + usiHash + "&siteID=" + usiSiteID + "&keys=" + usiKey + usi_append;
			this.load_script(source, callback);
			if (typeof(usi_commons.usi_loads) === "undefined") {
				usi_commons.usi_loads = new Map();
			}
			usi_commons.usi_loads[usiSiteID] = usiSiteID;
		},
		load_precapture:function(usiQS, usiSiteID, callback) {
			var source = this.domain + "/hound/monitor.jsp?qs=" + usiQS + "&siteID=" + usiSiteID + "&domain=" + encodeURIComponent(this.domain);
			this.load_script(source, callback);
		},
		load_mail:function(qs, siteID, callback) {
			var source = this.domain + "/mail.jsp?qs=" + qs + "&siteID=" + siteID + "&domain=" + encodeURIComponent(this.domain);
			this.load_script(source, callback);
		},
		send_prod_rec:function(siteID, info, real_time) {
			var result = false;
			try {
				if (document.getElementsByTagName("html").length > 0 && document.getElementsByTagName("html")[0].className != null && document.getElementsByTagName("html")[0].className.indexOf("translated") != -1) {
					//Ignore translated pages
					return false;
				}
				var data = [siteID, info.name, info.link, info.pid, info.price, info.image];
				if (data.indexOf(undefined) == -1) {
					var queryString = [siteID, info.name.replace(/\|/g, "&#124;"), info.link, info.pid, info.price, info.image].join("|");
					if (info.extra) queryString += "|" + info.extra;
					var filetype = real_time ? "jsp" : "js";
					this.load_script(this.domain + "/active/pv2." + filetype + "?" + encodeURIComponent(queryString));
					result = true;
				}
			} catch (e) {
				this.report_error(e);
				result = false;
			}
			return result;
		},
		report_error:function(err) {
			if (err == null) return;
			if (typeof err === 'string') err = new Error(err);
			if (!(err instanceof Error)) return;
			if (typeof(usi_commons.error_reported) !== "undefined") {
				return;
			}
			usi_commons.error_reported = true;
			if (location.href.indexOf('usishowerrors') !== -1) throw err;
			else usi_commons.load_script(usi_commons.domain + '/err.jsp?oops=' + encodeURIComponent(err.message) + '-' + encodeURIComponent(err.stack));
			usi_commons.log_error(err.message);
			usi_commons.dir(err);
		},
		gup_or_get_cookie: function(name, expireSeconds, forceCookie) {
			if (typeof usi_cookies === 'undefined') {
				usi_commons.log_error('usi_cookies is not defined');
				return;
			}
			expireSeconds = (expireSeconds || usi_cookies.expire_time.day);
			if (name == "usi_enable") expireSeconds = usi_cookies.expire_time.hour;
			var value = null;
			var qsValue = usi_commons.gup(name);
			if (qsValue !== '') {
				value = qsValue;
				usi_cookies.set(name, value, expireSeconds, forceCookie);
			} else {
				value = usi_cookies.get(name);
			}
			return (value || '');
		},
		get_id: function() {
			var usi_id = null;
			try {
				if (usi_cookies.get('usi_v') == null && usi_cookies.get('usi_id') == null) {
					var usi_rand_str = Math.random().toString(36).substring(2);
					if (usi_rand_str.length > 6) usi_rand_str = usi_rand_str.substring(0, 6);
					usi_id = usi_rand_str + "_" + Math.round((new Date()).getTime() / 1000);
					usi_cookies.set('usi_id', usi_id, 30 * 86400, true);
					return usi_id;
				}
				if (usi_cookies.get('usi_v') != null) usi_id = usi_cookies.get('usi_v');
				if (usi_cookies.get('usi_id') != null) usi_id = usi_cookies.get('usi_id');
				usi_cookies.set('usi_id', usi_id, 30 * 86400, true);
			} catch(err) {
				usi_commons.report_error(err);
			}
			return usi_id;
		}
	};
}

usi_cookieless = "1";
usi_session_storage = "1";
if (window.usi_app === undefined) {
	try {
		if("undefined"==typeof usi_cookies&&(usi_cookies={expire_time:{minute:60,hour:3600,two_hours:7200,four_hours:14400,day:86400,week:604800,two_weeks:1209600,month:2592e3,year:31536e3,never:31536e4},max_cookies_count:15,max_cookie_length:1e3,update_window_name:function(e,o,i){try{var n=-1;if(-1!=i){var t=new Date;t.setTime(t.getTime()+1e3*i),n=t.getTime()}var r=window.top||window,s=0;null!=o&&-1!=o.indexOf("=")&&(o=o.replace(new RegExp("=","g"),"USIEQLS")),null!=o&&-1!=o.indexOf(";")&&(o=o.replace(new RegExp(";","g"),"USIPRNS"));for(var u=r.name.split(";"),c="",a=0;a<u.length;a++){var l=u[a].split("=");3==l.length?(l[0]==e&&(l[1]=o,l[2]=n,s=1),null!=l[1]&&"null"!=l[1]&&(c+=l[0]+"="+l[1]+"="+l[2]+";")):""!=u[a]&&(c+=u[a]+";")}0==s&&(c+=e+"="+o+"="+n+";"),r.name=c}catch(e){}},flush_window_name:function(e){try{for(var o=window.top||window,i=o.name.split(";"),n="",t=0;t<i.length;t++){var r=i[t].split("=");3==r.length&&(0==r[0].indexOf(e)||(n+=i[t]+";"))}o.name=n}catch(e){}},get_from_window_name:function(e){try{for(var o=(window.top||window).name.split(";"),i=0;i<o.length;i++){var n=o[i].split("=");if(3==n.length){if(n[0]==e)if(-1!=(t=n[1]).indexOf("USIEQLS")&&(t=t.replace(new RegExp("USIEQLS","g"),"=")),-1!=t.indexOf("USIPRNS")&&(t=t.replace(new RegExp("USIPRNS","g"),";")),!("-1"!=n[2]&&usi_cookies.datediff(n[2])<0))return"undefined"==typeof usi_cookieless&&usi_cookies.create_cookie(n[0],t,usi_cookies.datediff(n[2])/1e3),usi_results=[t,n[2]],usi_results}else if(2==n.length){var t;if(n[0]==e)return-1!=(t=n[1]).indexOf("USIEQLS")&&(t=t.replace(new RegExp("USIEQLS","g"),"=")),-1!=t.indexOf("USIPRNS")&&(t=t.replace(new RegExp("USIPRNS","g"),";")),usi_results=[t,(new Date).getTime()+6048e5],usi_results}}}catch(e){}return null},datediff:function(e){return e-(new Date).getTime()},count_cookies:function(e){return e=e||"usi_",usi_cookies.search_cookies(e).length},root_domain:function(){try{var e=document.domain.split("."),o=e[e.length-1];if("com"==o||"net"==o||"org"==o||"us"==o||"co"==o||"ca"==o)return e[e.length-2]+"."+e[e.length-1]}catch(e){}return document.domain},create_cookie:function(e,o,i){if(!1!==navigator.cookieEnabled){var n="";if(-1!=i){var t=new Date;t.setTime(t.getTime()+1e3*i),n="; expires="+t.toGMTString()}var r="samesite=none;";0==location.href.indexOf("https://")&&(r+="secure;");var s=usi_cookies.root_domain();"undefined"!=typeof usi_parent_domain&&-1!=document.domain.indexOf(usi_parent_domain)&&(s=usi_parent_domain),document.cookie=e+"="+encodeURIComponent(o)+n+"; path=/;domain="+s+"; "+r}},read_cookie:function(e){if(!1===navigator.cookieEnabled)return null;for(var o=e+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){for(var t=i[n];" "==t.charAt(0);)t=t.substring(1,t.length);if(0==t.indexOf(o))return decodeURIComponent(t.substring(o.length,t.length))}return null},del:function(e){usi_cookies.set(e,null,-100),"undefined"!=typeof usi_session_storage&&null!=localStorage&&localStorage.removeItem(e)},get:function(e){var o=null;if("undefined"!=typeof usi_session_storage&&null!=localStorage&&null!=(o=localStorage.getItem(e)))return o;var i=usi_cookies.get_from_window_name(e);if(null!=i&&i.length>1)try{o=decodeURIComponent(i[0])}catch(e){return i[0]}else o=usi_cookies.read_cookie(e);return o},get_json:function(e){var o=null,i=usi_cookies.get(e);if(null==i)return null;try{o=JSON.parse(i)}catch(e){i=i.replace(/\\"/g,'"');try{o=JSON.parse(JSON.parse(i))}catch(e){try{o=JSON.parse(i)}catch(e){}}}return o},search_cookies:function(e){e=e||"";var o=[];return document.cookie.split(";").forEach(function(i){var n=i.split("=")[0].trim();""!==e&&0!==n.indexOf(e)||o.push(n)}),o},set:function(e,o,i,n){"undefined"!=typeof usi_nevercookie&&(n=!1),void 0===i&&(i=-1);try{o=o.replace(/(\r\n|\n|\r)/gm,"")}catch(e){}if("undefined"==typeof usi_windownameless&&usi_cookies.update_window_name(e+"",o+"",i),"undefined"==typeof usi_cookieless||n||null==o){if(null!=o){if(null==usi_cookies.read_cookie(e))if(!n)if(usi_cookies.search_cookies("usi_").length+1>usi_cookies.max_cookies_count)return void usi_cookies.report_error('Set cookie "'+e+'" failed. Max cookies count is '+usi_cookies.max_cookies_count);o.length>usi_cookies.max_cookie_length&&(usi_cookies.report_error('Cookie "'+e+'" truncated ('+o.length+"). Max single-cookie length is "+usi_cookies.max_cookie_length),o=o.substring(0,usi_cookies.max_cookie_length-1))}usi_cookies.create_cookie(e,o,i)}"undefined"!=typeof usi_session_storage&&null!=localStorage&&localStorage.setItem(e,o)},set_json:function(e,o,i,n){var t=JSON.stringify(o).replace(/^"/,"").replace(/"$/,"");usi_cookies.set(e,t,i,n)},flush:function(e){e=e||"usi_";var o,i,n,t=document.cookie.split(";");for(o=0;o<t.length;o++)0==(i=t[o]).trim().toLowerCase().indexOf(e)&&(n=i.trim().split("=")[0],usi_cookies.del(n));if(usi_cookies.flush_window_name(e),"undefined"!=typeof usi_session_storage&&null!=localStorage)for(x in localStorage)0==x.indexOf("usi_")&&localStorage.removeItem(x)},print:function(){for(var e=document.cookie.split(";"),o="",i=0;i<e.length;i++){var n=e[i];0==n.trim().toLowerCase().indexOf("usi_")&&(console.log(decodeURIComponent(n.trim())+" (cookie)"),o+=","+n.trim().toLowerCase().split("=")[0]+",")}if("undefined"!=typeof usi_session_storage&&null!=localStorage)for(x in localStorage)0==x.indexOf("usi_")&&"string"==typeof localStorage[x]&&-1==o.indexOf(","+x+",")&&(console.log(x+"="+localStorage[x]+" (localStorage)"),o+=","+x+",");var t=(window.top||window).name.split(";");for(i=0;i<t.length;i++){var r=t[i].split("=");if(3==r.length&&0==r[0].indexOf("usi_")&&-1==o.indexOf(","+r[0]+",")){var s=r[1];-1!=s.indexOf("USIEQLS")&&(s=s.replace(new RegExp("USIEQLS","g"),"=")),-1!=s.indexOf("USIPRNS")&&(s=s.replace(new RegExp("USIPRNS","g"),";")),console.log(r[0]+"="+s+" (window.name)"),o+=","+n.trim().toLowerCase().split("=")[0]+","}}},value_exists:function(){var e,o;for(e=0;e<arguments.length;e++)if(""===(o=usi_cookies.get(arguments[e]))||null===o||"null"===o||"undefined"===o)return!1;return!0},report_error:function(e){"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.report_error&&usi_commons.report_error(e)}},"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.gup))try{""!=usi_commons.gup("usi_email_id")&&usi_cookies.set("usi_email_id",usi_commons.gup("usi_email_id").split(".")[0],Number(usi_commons.gup("usi_email_id").split(".")[1]),!0)}catch(e){usi_commons.report_error(e)}
"undefined"==typeof usi_dom&&(usi_dom={},usi_dom.get_elements=function(e,t){return t=t||document,Array.prototype.slice.call(t.querySelectorAll(e))},usi_dom.count_elements=function(e,t){return t=t||document,usi_dom.get_elements(e,t).length},usi_dom.get_nth_element=function(e,t,n){var o=null;n=n||document;var r=usi_dom.get_elements(t,n);return r.length>=e&&(o=r[e-1]),o},usi_dom.get_first_element=function(e,t){if(""===(e||""))return null;if(t=t||document,"[object Array]"===Object.prototype.toString.call(e)){for(var n=null,o=0;o<e.length;o++){var r=e[o];if(null!=(n=usi_dom.get_first_element(r,t)))break}return n}return t.querySelector(e)},usi_dom.get_element_text_no_children=function(e,t){var n="";if(null==t&&(t=!1),null!=(e=e||document)&&null!=e.childNodes)for(var o=0;o<e.childNodes.length;++o)3===e.childNodes[o].nodeType&&(n+=e.childNodes[o].textContent);return!0===t&&(n=usi_dom.clean_string(n)),n.trim()},usi_dom.clean_string=function(e){if("string"==typeof e){return(e=(e=(e=(e=(e=(e=(e=e.replace(/[\u2010-\u2015\u2043]/g,"-")).replace(/[\u2018-\u201B]/g,"'")).replace(/[\u201C-\u201F]/g,'"')).replace(/\u2024/g,".")).replace(/\u2025/g,"..")).replace(/\u2026/g,"...")).replace(/\u2044/g,"/")).replace(/[^\x20-\xFF\u0100-\u017F\u0180-\u024F\u20A0-\u20CF]/g,"").trim()}},usi_dom.encode=function(e){if("string"==typeof e){var t=encodeURIComponent(e);return t=t.replace(/[-_.!~*'()]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},usi_dom.get_closest=function(e,t){for(e=e||document,"function"!=typeof Element.prototype.matches&&(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1});null!=e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},usi_dom.get_classes=function(e){var t=[];return null!=e&&null!=e.classList&&(t=Array.prototype.slice.call(e.classList)),t},usi_dom.add_class=function(e,t){if(null!=e){var n=usi_dom.get_classes(e);-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" "))}},usi_dom.string_to_decimal=function(e){var t=null;if("string"==typeof e)try{var n=parseFloat(e.replace(/[^0-9\.-]+/g,""));!1===isNaN(n)&&(t=n)}catch(e){usi_commons.log("Error: "+e.message)}return t},usi_dom.string_to_integer=function(e){var t=null;if("string"==typeof e)try{var n=parseInt(e.replace(/[^0-9-]+/g,""));!1===isNaN(n)&&(t=n)}catch(e){usi_commons.log("Error: "+e.message)}return t},usi_dom.get_currency_string_from_content=function(e){if("string"!=typeof e)return"";try{e=e.trim();var t=e.match(/^([^\$]*?)(\$(?:[\,\,]?\d{1,3})+(?:\.\d{2})?)(.*?)$/)||[];return 4===t.length?t[2]:""}catch(e){return usi_commons.log("Error: "+e.message),""}},usi_dom.get_absolute_url=function(){var e;return function(t){return(e=e||document.createElement("a")).href=t,e.href}}(),usi_dom.format_number=function(e,t){var n="";if("number"==typeof e){t=t||0;var o=e.toFixed(t).split(/\./g);if(1==o.length||2==o.length)n=o[0].replace(/./g,function(e,t,n){return t&&"."!==e&&(n.length-t)%3==0?","+e:e}),2==o.length&&(n+="."+o[1])}return n},usi_dom.format_currency=function(e,t,n){var o="";return e=Number(e),!1===isNaN(e)&&("object"==typeof Intl&&"function"==typeof Intl.NumberFormat?(t=t||"en-US",n=n||{style:"currency",currency:"USD"},o=e.toLocaleString(t,n)):o=e),o},usi_dom.to_decimal_places=function(e,t){if(null!=e&&"number"==typeof e&&null!=t&&"number"==typeof t){if(0==t)return parseFloat(Math.round(e));for(var n=10,o=1;o<t;o++)n*=10;return parseFloat(Math.round(e*n)/n)}return null},usi_dom.trim_string=function(e,t,n){return n=n||"",(e=e||"").length>t&&(e=e.substring(0,t),""!==n&&(e+=n)),e},usi_dom.attach_event=function(e,t,n){var o=usi_dom.find_supported_element(e,n);usi_dom.detach_event(e,t,o),o.addEventListener?o.addEventListener(e,t,!1):o.attachEvent("on"+e,t)},usi_dom.detach_event=function(e,t,n){var o=usi_dom.find_supported_element(e,n);o.removeEventListener?o.removeEventListener(e,t,!1):o.detachEvent("on"+e,t)},usi_dom.find_supported_element=function(e,t){return(t=t||document)===window?window:!0===usi_dom.is_event_supported(e,t)?t:t===document?window:usi_dom.find_supported_element(e,document)},usi_dom.is_event_supported=function(e,t){return null!=t&&void 0!==t["on"+e]},usi_dom.is_defined=function(e,t){if(null==e)return!1;if(""===(t||""))return!1;var n=!0,o=e;return t.split(".").forEach(function(e){!0===n&&(null==o||"object"!=typeof o||!1===o.hasOwnProperty(e)?n=!1:o=o[e])}),n},usi_dom.observe=function(e,t,n){var o=location.href,r=window.MutationObserver||window.WebkitMutationObserver;return t=t||{onUrlUpdate:!1,observerOptions:{childList:!0,subtree:!0}},function(e,n){var i=null,u=function(){var e=location.href;t.onUrlUpdate&&e!==o?(n(),o=e):n()};return r?(i=new r(function(e){var r=location.href,i=e[0].addedNodes.length||e[0].removedNodes.length;i&&t.onUrlUpdate&&r!==o?(n(),o=r):i&&n()})).observe(e,t.observerOptions):window.addEventListener&&(e.addEventListener("DOMNodeInserted",u,!1),e.addEventListener("DOMNodeRemoved",u,!1)),i}}(),usi_dom.params_to_object=function(e){var t={};""!=(e||"")&&e.split("&").forEach(function(e){var n=e.split("=");2===n.length?t[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):1===n.length&&(t[decodeURIComponent(n[0])]=null)});return t},usi_dom.object_to_params=function(e){var t=[];if(null!=e)for(var n in e)!0===e.hasOwnProperty(n)&&t.push(encodeURIComponent(n)+"="+(null==e[n]?"":encodeURIComponent(e[n])));return t.join("&")},usi_dom.interval_with_timeout=function(e,t,n,o){if("function"!=typeof e)throw new Error("usi_dom.interval_with_timeout(): iterationFunction must be a function");if(null==t)t=function(e){return e};else if("function"!=typeof t)throw new Error("usi_dom.interval_with_timeout(): timeoutCallback must be a function");if(null==n)n=function(e){return e};else if("function"!=typeof n)throw new Error("usi_dom.interval_with_timeout(): completeCallback must be a function");var r=(o=o||{}).intervalMS||20,i=o.timeoutMS||2e3;if("number"!=typeof r)throw new Error("usi_dom.interval_with_timeout(): intervalMS must be a number");if("number"!=typeof i)throw new Error("usi_dom.interval_with_timeout(): timeoutMS must be a number");var u=!1,l=new Date,a=setInterval(function(){var o=new Date-l;if(o>=i)return clearInterval(a),t({elapsedMS:o});!1===u&&(u=!0,e(function(e,t){if(u=!1,!0===e)return clearInterval(a),(t=t||{}).elapsedMS=new Date-l,n(t)}))},r)},usi_dom.load_external_stylesheet=function(e,t,n){if(""!==(e||"")){""===(t||"")&&(t="usi_stylesheet_"+(new Date).getTime());var o={url:e,id:t},r=document.getElementsByTagName("head")[0];if(null!=r){var i=document.createElement("link");i.type="text/css",i.rel="stylesheet",i.id=o.id,i.href=e,usi_dom.attach_event("load",function(){if(null!=n)return n(null,o)},i),r.appendChild(i)}}else if(null!=n)return n(null,o)},usi_dom.ready=function(e){void 0!==document.readyState&&"complete"===document.readyState?e():window.addEventListener?window.addEventListener("load",e,!0):window.attachEvent?window.attachEvent("onload",e):setTimeout(e,5e3)},usi_dom.fit_text=function(e,t){t||(t={});var n={multiLine:!0,minFontSize:.1,maxFontSize:20,widthOnly:!1},o={};for(var r in n)t.hasOwnProperty(r)?o[r]=t[r]:o[r]=n[r];var i=Object.prototype.toString.call(e);function u(e,t){var n,o,r,i,u,l,a,s;r=e.innerHTML,u=parseInt(window.getComputedStyle(e,null).getPropertyValue("font-size"),10),i=function(e){var t=window.getComputedStyle(e,null);return(e.clientWidth-parseInt(t.getPropertyValue("padding-left"),10)-parseInt(t.getPropertyValue("padding-right"),10))/u}(e),o=function(e){var t=window.getComputedStyle(e,null);return(e.clientHeight-parseInt(t.getPropertyValue("padding-top"),10)-parseInt(t.getPropertyValue("padding-bottom"),10))/u}(e),i&&(t.widthOnly||o)||(t.widthOnly?usi_commons.log("Set a static width on the target element "+e.outerHTML):usi_commons.log("Set a static height and width on the target element "+e.outerHTML)),-1===r.indexOf("textFitted")?((n=document.createElement("span")).className="textFitted",n.style.display="inline-block",n.innerHTML=r,e.innerHTML="",e.appendChild(n)):n=e.querySelector("span.textFitted"),t.multiLine||(e.style["white-space"]="nowrap"),l=t.minFontSize,s=t.maxFontSize;for(var c=l,d=1e3;l<=s&&d>0;)d--,a=s+l-.1,n.style.fontSize=a+"em",n.scrollWidth/u<=i&&(t.widthOnly||n.scrollHeight/u<=o)?(c=a,l=a+.1):s=a-.1;n.style.fontSize!==c+"em"&&(n.style.fontSize=c+"em")}"[object Array]"!==i&&"[object NodeList]"!==i&&"[object HTMLCollection]"!==i&&(e=[e]);for(var l=0;l<e.length;l++)u(e[l],o)});
"undefined"==typeof usi_date&&(usi_date={},usi_date.PSTOffsetMinutes=480,usi_date.localOffsetMinutes=(new Date).getTimezoneOffset(),usi_date.offsetDeltaMinutes=usi_date.localOffsetMinutes-usi_date.PSTOffsetMinutes,usi_date.toPST=function(e){return!1===usi_date.is_date(e)?e:new Date(e.getTime()+60*usi_date.offsetDeltaMinutes*1e3)},usi_date.add_hours=function(e,t){return!1===usi_date.is_date(e)?e:new Date(e.getTime()+60*t*60*1e3)},usi_date.add_minutes=function(e,t){return!1===usi_date.is_date(e)?e:new Date(e.getTime()+60*t*1e3)},usi_date.add_seconds=function(e,t){return!1===usi_date.is_date(e)?e:new Date(e.getTime()+1e3*t)},usi_date.get_week_number=function(e){var t={year:-1,weekNumber:-1};try{if(usi_date.is_date(e)){var a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()));a.setUTCDate(a.getUTCDate()+4-(a.getUTCDay()||7));var s=new Date(Date.UTC(a.getUTCFullYear(),0,1)),i=Math.ceil(((a-s)/864e5+1)/7);t.year=a.getUTCFullYear(),t.weekNumber=i}}catch(e){}finally{return t}},usi_date.is_date=function(e){return null!=e&&"object"==typeof e&&e instanceof Date==!0&&!1===isNaN(e.getTime())},usi_date.is_date_within_range=function(e,t,a){if(void 0===e&&(e=usi_date.set_date()),!1===usi_date.is_date(e))return!1;var s=usi_date.string_to_date(t,!1),i=usi_date.string_to_date(a,!1),r=usi_date.toPST(e);return r>=s&&r<i},usi_date.is_after=function(e){try{usi_date.check_format(e);var t=usi_date.set_date(),a=new Date(e);return t.getTime()>a.getTime()}catch(e){"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.report_error&&usi_commons.report_error(e)}return!1},usi_date.is_before=function(e){try{usi_date.check_format(e);var t=usi_date.set_date(),a=new Date(e);return t.getTime()<a.getTime()}catch(e){"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.report_error&&usi_commons.report_error(e)}return!1},usi_date.is_between=function(e,t){return usi_date.check_format(e,t),usi_date.is_after(e)&&usi_date.is_before(t)},usi_date.check_format=function(e,t){(-1!=e.indexOf(" ")||t&&-1!=t.indexOf(" "))&&"undefined"!=typeof usi_commons&&"function"==typeof usi_commons.report_error&&usi_commons.report_error("Incorrect format: Use YYYY-MM-DDT:hh:mm:ss")},usi_date.is_date_after=function(e,t){if(!1===usi_date.is_date(e))return!1;var a=usi_date.string_to_date(t,!1);return usi_date.toPST(e)>a},usi_date.is_date_before=function(e,t){if(!1===usi_date.is_date(e))return!1;var a=usi_date.string_to_date(t,!1);return usi_date.toPST(e)<a},usi_date.string_to_date=function(e,t){t=t||!1;var a=null,s=/^[0-2]?[0-9]\/[0-3]?[0-9]\/\d{4}(\s[0-2]?[0-9]\:[0-5]?[0-9](?:\:[0-5]?[0-9])?)?$/.exec(e),i=/^(\d{4}\-[0-2]?[0-9]\-[0-3]?[0-9])(\s[0-2]?[0-9]\:[0-5]?[0-9](?:\:[0-5]?[0-9])?)?$/.exec(e);if(2===(s||[]).length){if(a=new Date(e),""===(s[1]||"")&&!0===t){var r=new Date;a=usi_date.add_hours(a,r.getHours()),a=usi_date.add_minutes(a,r.getMinutes()),a=usi_date.add_seconds(a,r.getSeconds())}}else if(3===(i||[]).length){var o=i[1].split(/\-/g),u=o[1]+"/"+o[2]+"/"+o[0];return u+=i[2]||"",usi_date.string_to_date(u,t)}return a},usi_date.set_date=function(){var e=new Date,t=usi_commons.gup("usi_force_date");if(""!==t){t=decodeURIComponent(t);var a=usi_date.string_to_date(t,!0);null!=a?(e=a,usi_cookies.set("usi_force_date",t,usi_cookies.expire_time.hour),usi_commons.log("Date forced to: "+e)):usi_cookies.del("usi_force_date")}else e=null!=usi_cookies.get("usi_force_date")?usi_date.string_to_date(usi_cookies.get("usi_force_date"),!0):new Date;return e},usi_date.diff=function(e,t,a,s){null==s&&(s=1),""!=(a||"")&&(a=usi_date.get_units(a));var i=null;if(!0===usi_date.is_date(t)&&!0===usi_date.is_date(e))try{var r=Math.abs(t-e);switch(a){case"ms":i=r;break;case"seconds":i=usi_dom.to_decimal_places(parseFloat(r)/parseFloat(1e3),s);break;case"minutes":i=usi_dom.to_decimal_places(parseFloat(r)/parseFloat(1e3)/parseFloat(60),s);break;case"hours":i=usi_dom.to_decimal_places(parseFloat(r)/parseFloat(1e3)/parseFloat(60)/parseFloat(60),s);break;case"days":i=usi_dom.to_decimal_places(parseFloat(r)/parseFloat(1e3)/parseFloat(60)/parseFloat(60)/parseFloat(24),s)}}catch(e){i=null}return i},usi_date.convert_units=function(e,t,a,s){var i=null,r=null;switch(usi_date.get_units(t)){case"days":i=1e6*e*1e3*60*60*24;break;case"hours":i=1e6*e*1e3*60*60;break;case"minutes":i=1e6*e*1e3*60;break;case"seconds":i=1e6*e*1e3;break;case"ms":i=1e6*e}switch(usi_date.get_units(a)){case"days":r=usi_dom.to_decimal_places(parseFloat(i)/parseFloat(1e6)/parseFloat(1e3)/parseFloat(60)/parseFloat(60)/parseFloat(24),s);break;case"hours":r=usi_dom.to_decimal_places(parseFloat(i)/parseFloat(1e6)/parseFloat(1e3)/parseFloat(60)/parseFloat(60),s);break;case"minutes":r=usi_dom.to_decimal_places(parseFloat(i)/parseFloat(1e6)/parseFloat(1e3)/parseFloat(60),s);break;case"seconds":r=usi_dom.to_decimal_places(parseFloat(i)/parseFloat(1e6)/parseFloat(1e3),s);break;case"ms":r=usi_dom.to_decimal_places(parseFloat(i)/parseFloat(1e6),s)}return r},usi_date.get_units=function(e){var t="";switch(e.toLowerCase()){case"days":case"day":case"d":t="days";break;case"hours":case"hour":case"hrs":case"hr":case"h":t="hours";break;case"minutes":case"minute":case"mins":case"min":case"m":t="minutes";break;case"seconds":case"second":case"secs":case"sec":case"s":t="seconds";break;case"ms":case"milliseconds":case"millisecond":case"millis":case"milli":t="ms"}return t});
"undefined"==typeof usi_split_test&&(usi_split_test={split_test_name:"usi_dice_roll",split_group:"-1",split_siteID:"-1",split_test_cookie_length:3,get_split_var:function(t){if(t=t||"",null==usi_cookies.get("usi_visitor_id"+t)){var i=Math.random().toString(36).substring(2);i.length>6&&(i=i.substring(0,6));var s="v_"+i+"_"+Math.round((new Date).getTime()/1e3)+"_"+t;return usi_cookies.set("usi_visitor_id"+t,s,86400*this.split_test_cookie_length,!0),s}return usi_cookies.get("usi_visitor_id"+t)},report_test:function(t,i){var s=document.getElementsByTagName("head")[0],e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src","https://www.upsellit.com/utility/split_test.jsp?siteID="+t+"&group="+i+"&usi_visitor_id="+this.get_split_var(t)),s.appendChild(e),void 0!==usi_split_test.set_verification&&setTimeout("usi_split_test.set_verification("+i+");",1e3)},get_group:function(t){return usi_cookies.get(this.split_test_name+t)},instantiate:function(t,i,s){null==usi_cookies.get(this.split_test_name+t)||s?(0===i||i&&""!=i?this.split_group=i:Math.random()>.5?this.split_group="0":this.split_group="1",this.report_test(t,this.split_group),usi_cookies.set(this.split_test_name+t,this.split_group,86400*this.split_test_cookie_length,!0)):this.split_group=usi_cookies.get(this.split_test_name+t)}});
"undefined"==typeof usi_ajax&&(usi_ajax={},usi_ajax.get=function(e,t){try{return usi_ajax.get_with_options({url:e},t)}catch(e){usi_commons.report_error(e)}},usi_ajax.get_with_options=function(e,t){null==t&&(t=function(){});var r={};if((e=e||{}).headers=e.headers||[],null==XMLHttpRequest)return t(new Error("XMLHttpRequest not supported"),r);if(""===(e.url||""))return t(new Error("url cannot be blank"),r);try{var a=new XMLHttpRequest;a.open("GET",e.url,!0),a.setRequestHeader("Content-type","application/json"),e.headers.forEach(function(e){""!==(e.name||"")&&""!==(e.value||"")&&a.setRequestHeader(e.name,e.value)}),a.onreadystatechange=function(){if(4===a.readyState){r.status=a.status,r.responseText=a.responseText||"";var e=null;return 0!==String(a.status).indexOf("2")&&(e=new Error("http.status: "+a.status)),t(e,r)}},a.send()}catch(e){return usi_commons.report_error(e),t(e,r)}},usi_ajax.post=function(e,t,r){try{return usi_ajax.post_with_options({url:e,params:t},r)}catch(e){usi_commons.report_error(e)}},usi_ajax.post_with_options=function(e,t){null==t&&(t=function(){});var r={};if((e=e||{}).headers=e.headers||[],e.paramsDataType=e.paramsDataType||"string",e.params=e.params||"",null==XMLHttpRequest)return t(new Error("XMLHttpRequest not supported"),r);if(""===(e.url||""))return t(new Error("url cannot be blank"),r);try{var a=new XMLHttpRequest;a.open("POST",e.url,!0),"formData"===e.paramsDataType||("object"===e.paramsDataType?(a.setRequestHeader("Content-type","application/json; charset=utf-8"),e.params=JSON.stringify(e.params)):a.setRequestHeader("Content-type","application/x-www-form-urlencoded")),e.headers.forEach(function(e){""!==(e.name||"")&&""!==(e.value||"")&&a.setRequestHeader(e.name,e.value)}),a.onreadystatechange=function(){if(4===a.readyState){r.status=a.status,r.responseText=a.responseText||"",r.responseURL=a.responseURL||"";var e=null;return 0!==String(a.status).indexOf("2")&&(e=new Error("http.status: "+a.status)),t(e,r)}},a.send(e.params)}catch(e){return usi_commons.report_error(e),t(e,r)}},usi_ajax.form_post=function(e,t,r){try{r=r||"post";var a=document.createElement("form");a.setAttribute("method",r),a.setAttribute("action",e),null!=t&&"object"==typeof t&&Object.keys(t).forEach(function(e){var r=document.createElement("input");r.setAttribute("type","hidden"),r.setAttribute("name",e),r.setAttribute("value",t[e]),a.appendChild(r)}),document.body.appendChild(a),a.submit()}catch(e){usi_commons.report_error(e)}},usi_ajax.put_with_options=function(e,t){null==t&&(t=function(){});var r={};if((e=e||{}).headers=e.headers||[],null==XMLHttpRequest)return t(new Error("XMLHttpRequest not supported"),r);if(""===(e.url||""))return t(new Error("url cannot be blank"),r);try{var a=new XMLHttpRequest;a.open("PUT",e.url,!0),a.setRequestHeader("Content-type","application/json"),e.headers.forEach(function(e){""!==(e.name||"")&&""!==(e.value||"")&&a.setRequestHeader(e.name,e.value)}),a.onreadystatechange=function(){if(4===a.readyState){r.status=a.status,r.responseText=a.responseText||"";var e=null;return 0!==String(a.status).indexOf("2")&&(e=new Error("http.status: "+a.status)),t(e,r)}},a.send()}catch(e){return usi_commons.report_error(e),t(e,r)}},usi_ajax.get_with_script=function(e,t,r){try{var a={};null==t&&(t=!0);var n="usi_"+(new Date).getTime(),s=document.getElementsByTagName("head")[0];top.location!=location&&(s=parent.document.getElementsByTagName("head")[0]);var o=document.createElement("script");o.id=n,o.type="text/javascript",o.src=e,o.addEventListener("load",function(){if(!0===t&&s.removeChild(o),null!=r)return r(null,a)}),s.appendChild(o)}catch(e){usi_commons.report_error(e)}},usi_ajax.listener=function(e){if(null==e&&(e=!1),null!=XMLHttpRequest){var t=this;t.ajax=new Object,t.clear=function(){t.ajax.requests=[],t.ajax.registeredRequests=[],t.ajax.scriptLoads=[],t.ajax.registeredScriptLoads=[]},t.clear(),t.register=function(e,r,a){try{var n={method:e=(e||"*").toUpperCase(),url:r=r||"*",callback:a=a||function(){}};t.ajax.registeredRequests.push(n)}catch(e){usi_commons.report_error(e)}},t.registerScriptLoad=function(e,r){try{var a={url:e=e||"*",callback:r=r||function(){}};t.ajax.registeredScriptLoads.push(a)}catch(e){usi_commons.report_error(e)}},t.registerFormSubmit=function(t,r){try{null!=t&&usi_dom.attach_event("submit",function(a){if(!0===e&&usi_commons.log("USI AJAX: form submit"),null!=a&&!0===a.returnValue){a.preventDefault();var n={action:t.action,data:{},e:a},s=["submit"];if(Array.prototype.slice.call(t.elements).forEach(function(e){try{-1===s.indexOf(e.type)&&("checkbox"===e.type?!0===e.checked&&(n.data[e.name]=e.value):n.data[e.name]=e.value)}catch(e){usi_commons.report_error(e)}}),null!=r)return r(null,n);a.returnValue=!0}},t)}catch(e){usi_commons.report_error(e)}},t.listen=function(){try{t.ajax.originalOpen=XMLHttpRequest.prototype.open,t.ajax.originalSend=XMLHttpRequest.prototype.send,XMLHttpRequest.prototype.open=function(r,a){r=(r||"").toUpperCase(),a=a||"",a=usi_dom.get_absolute_url(a),!0===e&&usi_commons.log("USI AJAX: open["+r+"]: "+a);var n={method:r,url:a,openDate:new Date};t.ajax.requests.push(n);var s=null;t.ajax.registeredRequests.forEach(function(e){e.method!=r&&"*"!=e.method||(a.indexOf(e.url)>-1||"*"==e.url)&&(s=e)}),null!=s&&(!0===e&&usi_commons.log("USI AJAX: Registered URL["+r+"]: "+a),this.requestObj=n,this.requestObj.callback=s.callback),t.ajax.originalOpen.apply(this,arguments)},XMLHttpRequest.prototype.send=function(r){var a=this;null!=a.requestObj&&(!0===e&&usi_commons.log("USI AJAX: Send Registered URL["+a.requestObj.method+"]: "+a.requestObj.url),""!=(r||"")&&(a.requestObj.params=r),a.addEventListener?a.addEventListener("readystatechange",function(){t.ajax.readyStateChanged(a)},!1):t.ajax.proxifyOnReadyStateChange(a)),t.ajax.originalSend.apply(a,arguments)},t.ajax.readyStateChanged=function(t){if(4===t.readyState&&null!=t.requestObj&&(t.requestObj.completedDate=new Date,!0===e&&usi_commons.log("Completed: "+t.requestObj.url),null!=t.requestObj.callback)){var r={requestObj:t.requestObj,responseText:t.responseText};return t.requestObj.callback(null,r)}},t.ajax.proxifyOnReadyStateChange=function(e){var r=e.onreadystatechange;null!=r&&(e.onreadystatechange=function(){t.ajax.readyStateChanged(e),r()})},document.head.addEventListener("load",function(e){if(null!=e&&null!=e.target&&""!=(e.target.src||"")){var r=e.target.src,a={url:r=usi_dom.get_absolute_url(r),completedDate:new Date};t.ajax.scriptLoads.push(a);var n=null;if(t.ajax.registeredScriptLoads.forEach(function(e){(r.indexOf(e.url)>-1||"*"==e.url)&&(n=e)}),null!=n&&null!=n.callback)return n.callback(null,a)}},!0),usi_commons.log("USI AJAX: listening ...")}catch(e){usi_commons.report_error(e),usi_commons.log("usi_ajax.listener ERROR: "+e.message)}},t.unregisterAll=function(){t.ajax.registeredRequests=[],t.ajax.registeredScriptLoads=[]}}});

		usi_cookies.max_cookie_length = 2000;
		usi_app = {};
		usi_app.main = function () {
			usi_app.url = location.href;
			usi_app.is_payment_page = usi_app.url.indexOf("/payment-") != -1 || usi_app.url.indexOf("payment.html") != -1;
			usi_app.is_swift_page = usi_app.url.indexOf("/swiftcart") != -1;
			usi_app.is_enabled = usi_commons.gup_or_get_cookie("usi_enable", usi_cookies.expire_time.day, true) != "";
			usi_app.test = usi_commons.gup_or_get_cookie("usi_test", usi_cookies.expire_time.day, true) != "";
			usi_app.coupon = usi_cookies.value_exists("usi_coupon_applied") ? "" : usi_commons.gup_or_get_cookie("usi_coupon", usi_cookies.expire_time.week, true);
			usi_app.new_term = decodeURIComponent(usi_commons.gup("termtype"));
			usi_app.aff_id = usi_app.get_affid();
			usi_app.price = usi_app.get_price();
			usi_app.product = usi_app.get_product();

			usi_app.force_group = usi_commons.gup_or_get_cookie('usi_force_group');
			usi_app.today = usi_app.yyyymmdd(usi_date.set_date());
			usi_app.now = usi_date.set_date();
			usi_app.is_us_or_au_site = usi_app.url.indexOf("/en-us/") != -1 || usi_app.url.indexOf("/en-au/") != -1;
			usi_app.is_us_site = usi_app.url.indexOf("/en-us/") != -1;
			usi_app.is_ca_site = usi_app.url.indexOf("/en-ca/") != -1;
			usi_app.is_uk_site = usi_app.url.indexOf("/en-gb/") != -1;
			usi_app.is_au_site = usi_app.url.indexOf("/en-au/") != -1;
			usi_app.is_in_site = usi_app.url.indexOf("/en-in/") != -1;
			usi_app.is_atp_landing_page = usi_app.url.indexOf("https://www.mcafee.com/consumer/en-us/landing-page/atp/mls-family/livesafe.html") != -1 || usi_app.url.indexOf("https://www.mcafee.com/consumer/en-au/landing-page/atp/mls-family/livesafe.html") != -1 || usi_app.url.indexOf("https://www.mcafee.com/consumer/en-ca/landing-page/atp/mls-family/livesafe.html") != -1 || usi_app.url.indexOf("https://www.mcafee.com/consumer/en-in/landing-page/atp/mls-family/livesafe.html") != -1 || usi_app.url.indexOf("https://www.mcafee.com/consumer/en-gb/landing-page/atp/mls-family/livesafe.html") != -1;

			if (usi_app.url.indexOf("/payment-b.html") != -1) {
				usi_cookies.set("usi_suppressed", "1", usi_cookies.expire_time.day, true);
				return;
			}

			if (usi_cookies.value_exists("usi_suppressed")) {
				usi_commons.log("Suppressed for 1 day");
				return;
			}

			if (usi_app.url.indexOf("usi_enable") != -1 || document.referrer.indexOf("usi_enable") != -1) {
				usi_cookies.set("usi_enable", "1", usi_cookies.expire_time.day, true);
				usi_app.is_enabled = true;
			}

			if (usi_commons.gup("vc") != "") {
				return true;
			}

			if (usi_commons.gup("usi_precapture") != "" && !usi_cookies.value_exists("usi_precapture")) {
				usi_cookies.set("usi_precapture", "1", usi_cookies.expire_time.week, true);
			}

			if (usi_commons.gup("usi_email_id") != "" || (usi_cookies.get("usi_click_id") !== null && usi_cookies.get("usi_click_date") == null)) {
				usi_cookies.set("usi_click_date", Date.now() + "", 14*24*60*60, true);
			}

			usi_app.run_reminder = usi_app.is_reminder_eligible();

			if (usi_app.coupon != "" && (usi_app.url.indexOf("/checkout/") != -1)) {
				usi_cookies.del("usi_coupon");
				location.replace(location.href + usi_app.coupon);
			}

			if (usi_app.coupon != ""  && usi_app.get_locale() === "ja-jp" && usi_app.url.indexOf("/payment-info.edit.html") != -1) {
				usi_app.apply_japan_coupon();
			}

			usi_app.direct_audience_upsell_match={
"DE0CAA8C-E642-4E6D-8F83-7821241DD8E7_mtp_537_29.99_mtp_1_to_5":"https://www.mcafee.com/consumer/ipz/cart?moguid=CFDC63B3-FCF1-4552-A2B0-3422870D5B03&ccpubn=en-us:mtp_601:direct@modal2:from537:1yp:32.99",
"DE0CAA8C-E642-4E6D-8F83-7821241DD8E7_mtp_537_29.99_mtp_1_to_10":"https://www.mcafee.com/consumer/ipz/cart?moguid=8F356727-B359-4C2F-B667-ADC4047FF8AF&ccpubn=en-us:mtp_521:direct@modal2:from537:1yp:37.99",
"5B261F2C-F155-4178-8A9C-E63827F08465_mtp_535_34.99":"https://www.mcafee.com/consumer/ipz/cart?moguid=8F356727-B359-4C2F-B667-ADC4047FF8AF&ccpubn=en-us:mtp_521:direct@modal2:from601:1yp:37.99"
			};

			if (usi_app.url.indexOf("/retention/") != -1 && document.getElementById("wait") != null) {
				usi_app.check_for_mcafee_modal();
			}

			if (usi_app.is_payment_page || usi_app.is_swift_page || usi_app.run_reminder) {
				usi_app.load();
			}
			if (usi_app.is_atp_landing_page && !usi_cookies.value_exists("usi_cta_clicked") && usi_commons.gup("subtype") === "trial" && (usi_app.get_affid() == "105" || usi_app.get_affid() == "714" || usi_app.get_affid() == "885" || usi_app.get_affid() == "1357" || usi_app.get_affid() == "1358" || usi_app.get_affid() == "1067" || usi_app.get_affid() == "1439") && (usi_commons.gup("termtype") == "1" || usi_commons.gup("termtype") == "2")) {
				usi_app.link = usi_app.append_mcafee_lc_param();
				usi_commons.load_view("II6bGUwAjK75acACAgaIlOe", "34641", usi_commons.device + "_" + usi_app.get_locale());
			}
			if (usi_commons.gup("ccpubn").indexOf("ret") == -1 && usi_app.url.indexOf("cart-overview") != -1 && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && (usi_app.aff_id === "1357" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "1067" || usi_app.aff_id === "885" || usi_app.aff_id === "105")) {
				//ATP TT
				usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
				usi_commons.load_view("eSWYGELxB95nvM8Zi3Zw3h6", "34391", usi_commons.device + "_" + usi_app.get_locale());
			}
			if ((usi_app.aff_id === "105" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "885") && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && usi_app.url.indexOf("cart-overview") != -1) {
				usi_app.email_link = "";
				if (usi_app.get_locale() === "en-us") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10US0809";
				}
				if (usi_app.get_locale() === "en-ca") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10PERCENTCA0311";
				}
				if (usi_app.get_locale() === "en-au") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10AU0311";
				}
				if (usi_app.get_locale() === "en-in") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10PERCENTIN0805";
				}
				if (usi_app.get_locale() === "es-mx") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10MX0311";
				}
				if (usi_app.get_locale() === "pt-br") {
					usi_app.email_link = usi_app.append_atp_pc_param() + "&dc=1&vc=SAVE10BR0311";
				}
				if (usi_app.email_link != "") {
					usi_cookies.set("usi_email_link", usi_app.email_link, usi_cookies.expire_time.week);
				}
			}
		};

		usi_app.listen_for_upsellit_cta = function() {
			try {
				if (typeof(usi_app.link) !== "undefined" && document.getElementsByClassName("usi_submitbutton").length > 0) {
					if (usi_app.link.indexOf("ccpubn=") != -1) {
						var usi_ccpbun = usi_app.link.split("ccpubn=")[1];
						usi_ccpbun = usi_ccpbun.split("&")[0];
						document.getElementsByClassName("usi_submitbutton")[0].setAttribute("data-cms_cta", "true");
						document.getElementsByClassName("usi_submitbutton")[0].setAttribute("data-campaign_pub_name", decodeURIComponent(usi_ccpbun));
					}
				} else {
					setTimeout(usi_app.listen_for_upsellit_cta, 2000);
				}
			} catch(e) {
				usi_commons.report_error(e);
			}
		};

		usi_app.over_write_cookie_setter = function() {
			if (usi_cookies.get("_evidon_consent_cookie") == null) {
				usi_cookies.create_cookie = function (name, value, exp_seconds) {};
			}
		};

		usi_app.get_moguid = function() {
			var usi_moguid = "";
			if (usi_commons.gup("moguid") != "") {
				usi_moguid = usi_commons.gup("moguid");
			} else if (sessionStorage.getItem("cartOffer") != null && sessionStorage.getItem("cartOffer").indexOf("moguid") != -1) {
				usi_moguid = sessionStorage.getItem("cartOffer");
				usi_moguid = usi_moguid.substring(usi_moguid.indexOf('"moguid":"')+10, usi_moguid.length);
				usi_moguid = usi_moguid.substring(0, usi_moguid.indexOf('"'));
			} else if (usi_cookies.get("usi_moguid") != null) {
				return usi_cookies.get("usi_moguid");
			}
			if (usi_moguid != "") {
				usi_cookies.set("usi_moguid", usi_moguid, 24*60*60, true);
			}
			return usi_moguid;
		};

		usi_app.load = function() {
			usi_app.locale = usi_app.get_locale();
			usi_app.moguid = usi_app.get_moguid();
			//if (usi_app.aff_id == "1357" && !usi_app.is_enabled) return;
			//usi_app.price = usi_app.get_price();
			usi_app.devices = "Unlimited";
			usi_app.years = usi_app.get_years();
			//usi_app.product = usi_app.get_product();
			usi_app.term = usi_app.get_term();
			usi_app.desc = usi_app.get_desc();
			usi_app.image = usi_app.get_image();
			usi_app.seg = usi_app.get_cseg(usi_app.url);
			usi_app.channel = usi_app.get_channel();
			usi_app.sem_type = decodeURIComponent(usi_commons.gup("ccpubn"));
			usi_app.is_adobe_store = decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("mssp") != -1;
			usi_app.discounted_price = (Number(usi_app.price) * 0.90).toFixed(2);
			usi_app.is_direct_paid_channel = decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("sem") != -1 || decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("am") != -1 || decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("dr") != -1 || decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("mssp") != -1;
			usi_app.is_direct_store_channel = usi_commons.gup("ccpubn").indexOf("store") != -1;
			usi_app.is_direct_google_or_bing_channel = decodeURIComponent(usi_commons.gup("ccoel2")).indexOf("sem") != -1;
			usi_app.is_retention_audience = usi_commons.gup("ccpubn").indexOf("ret") != -1;

			//global suppression
			usi_app.interval();

			if (usi_app.locale === "en-us") {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
					if (usi_app.is_enabled) {
						if (Math.random() > 0.5) {
							usi_app.original_price = Number(document.querySelector(".pb-4").textContent.match(/[$\d+\.]+/)[0].replace("$", ""));
							usi_app.first_discount = (Number(usi_app.original_price - usi_app.price)).toFixed(2);
							usi_app.add_discount = (Number(usi_app.price) * .10).toFixed(2);
							usi_app.term = usi_app.term.replace(/\/([\s\S]*)$/, "").trim();
							usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
							usi_commons.load_precapture("S83OA30UWTqMpHL5lTSjdD5", "37913");
						} else {
							usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
							usi_commons.load_precapture("MXhem22KhIeoQ7fxY5oWaeU", "36929");
						}
					} else {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
						usi_commons.load_precapture("44Lgbhy9fTdxRep5B1Lj4df", "34123");
					}
				}
				if (usi_app.is_adobe_store && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
						usi_commons.load_precapture("FmOPrTSgUvKGiVe1rsM81Wu", "34131");
					}
					if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
						usi_commons.load_precapture("Ahg4jdRAlialMnGPvzQRUzf", "37937");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
						usi_commons.load_precapture("BMs5cABwEnOPdAfuEVtXudQ", "34543");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
						usi_commons.load_precapture("b3TUy14X6DYV1ih18g6G9jI", "34545");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10US0809"
					usi_commons.load_precapture("Ahg4jdRAlialMnGPvzQRUzf", "37937");
				}
			}
			if (!usi_cookies.value_exists("usi_precapture")) {
				if (usi_app.get_locale() === "ja-jp") {
					//ATP channel
					if (usi_commons.gup("ccpubn").indexOf("ret") == -1 && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && (usi_app.aff_id === "1357" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "1067" || usi_app.aff_id === "885" || usi_app.aff_id === "105")) {
						usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
						usi_commons.load_view("eSWYGELxB95nvM8Zi3Zw3h6", "34391", usi_commons.device + "_" + "ja-jp");
					}
					//HP Direct
					if (usi_app.is_enabled && usi_commons.gup("ccpubn").indexOf("ret") == -1 && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501") && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2")) {
						usi_app.link = usi_app.append_hp_tt_param() + "&dc=1&vc=";
						usi_commons.load_view("4MJInYW9YJ8sk0zLpZHQ9NI", "37935", usi_commons.device + "_" + "ja-jp");
					}
				} else {
					if (usi_app.get_locale() !== "ja-jp" && !usi_cookies.value_exists("usi_upsell_clicked")) {
						//Upsell
						if (usi_app.get_locale() === "en-us" && usi_app.aff_id === "0" && !usi_cookies.value_exists("usi_upsell_clicked") && !usi_app.is_retention_audience && usi_app.is_direct_store_channel) {
							var usi_upsell_key = usi_app.get_upsell_key();
							var roll = Math.random();
							var key = roll > 0.66 ? "_a" : roll > 0.33 ? "_b" : "_c";
							if (usi_upsell_key == "_mtp5") {
								usi_app.upsell_link = usi_app.get_upsell_link(usi_upsell_key);
								if (key == "_a") {
									usi_app.upsell_link += "&dc=1&vc=SAVE110US0706";
								}
								if (key == "_b") {
									usi_app.upsell_link += "&dc=1&vc=SAVE60US0706";
								}
								usi_commons.load("uqusHXdMUacELUR0Jt6DE95", "36985", usi_commons.device + key);
							}
							if (usi_upsell_key == "_mtp10") {
								usi_app.upsell_link = usi_app.get_upsell_link(usi_upsell_key);
								if (key == "_a") {
									usi_app.upsell_link += "&dc=1&vc=SAVE135US0707";
								}
								if (key == "_b") {
									usi_app.upsell_link += "&dc=1&vc=SAVE75US0706";
								}
								usi_commons.load("30H6IHBrHDj0Jkki467xVD7", "36987", usi_commons.device + key);
							}
							if (usi_app.aff_id === "0" && usi_app.is_direct_store_channel) {
								usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
								usi_commons.load_view("drIFWJBqEc6Pej691PMWYvU", "34393", usi_commons.device + "_" + usi_app.locale);
							}
						} else {
							//Direct paid channel
							if (usi_app.is_direct_paid_channel && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
								usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
								if (usi_app.locale != "en-in" && usi_app.locale != "en-au" && (usi_app.aff_id === "1483" || usi_app.aff_id === "1494" || usi_app.aff_id === "739")) {
									usi_commons.load_view("gfe91ViSU9rva4CguNfx5Tp", "34385", usi_commons.device + "_" + usi_app.locale);
								}
								if ((usi_app.locale == "en-in" || usi_app.locale == "en-au") && (usi_app.aff_id === "1483" || usi_app.aff_id === "1494" || usi_app.aff_id === "739" || usi_app.aff_id === "1484" || usi_app.aff_id === "148" || usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1490" || usi_app.aff_id === "1492")) {
									usi_commons.load_view("gfe91ViSU9rva4CguNfx5Tp", "34385", usi_commons.device + "_" + usi_app.locale);
								}
							}
							//Direct store channel
							if (usi_app.aff_id === "0" && usi_app.is_direct_store_channel && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
								usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
								usi_commons.load_view("drIFWJBqEc6Pej691PMWYvU", "34393", usi_commons.device + "_" + usi_app.locale);
							}
							//HP Direct
							if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501") && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2")) {
								usi_app.link = usi_app.append_hp_tt_param() + "&dc=1&vc=";
								usi_commons.load_view("4MJInYW9YJ8sk0zLpZHQ9NI", "37935", usi_commons.device + "_" + usi_app.locale);
							}
							//ATP channel
							if (usi_commons.gup("ccpubn").indexOf("ret") == -1 && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && (usi_app.aff_id === "1357" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "1067" || usi_app.aff_id === "885" || usi_app.aff_id === "105") && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && (usi_app.aff_id === "1357" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "1067" || usi_app.aff_id === "885" || usi_app.aff_id === "105")) {
								usi_app.link = usi_app.append_new_tt_param() + "&dc=1&vc=";
								usi_commons.load_view("eSWYGELxB95nvM8Zi3Zw3h6", "34391", usi_commons.device + "_" + usi_app.locale);
							}
							//Retention TT US Only
							if (usi_app.is_enabled && usi_app.get_locale() === "en-us" && usi_app.is_retention_audience && usi_app.aff_id != "752" && !usi_cookies.value_exists("usi_suppress_ret_tt")) {
								usi_app.link = usi_app.append_retention_tt_param() + "&dc=1&vc=";
								usi_app.discount = (Number(usi_app.price) * .10).toFixed(2);
								usi_app.new_price = (Number(usi_app.price) - Number(usi_app.discount)).toFixed(2);
								usi_commons.load_view("2i6056yEm51EOhlWH5oPhBT", "36283", usi_commons.device);
							}
						}
					}
				}
			}
			if (usi_app.locale === "en-in" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0") {
					usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&vc=SAVE10PERCENTIN0805";
					usi_commons.load_precapture("Dn1U7fqMvNQHfEXzIdeLOtz", "34915");
				}
				if (usi_app.is_adobe_store) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTIN0805"
						usi_commons.load_precapture("XN1HfwVWQvuO3N7GJwCkHMQ", "34919");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTIN0805"
						usi_commons.load_precapture("M1c4b5X7CSBXVehldcIClWS", "34921");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTIN0805"
						usi_commons.load_precapture("r26FbT4JzFKSdUvyYvP0zwu", "34917");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTIN0805"
					usi_commons.load_precapture("ptcZjh7hpQq0wYDrAJpWSbf", "37941");
				}
			}
			if (usi_app.locale === "en-ca" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0") {
					usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&vc=SAVE10PERCENTCA0311";
					usi_commons.load_precapture("tKMKPd3PemRH0NKHh9Iqt5W", "34907");
				}
				if (usi_app.is_adobe_store) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTCA0311"
						usi_commons.load_precapture("mBCg0XYWajHeTxgIvrAM7ji", "34909");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTCA0311"
						usi_commons.load_precapture("B6apMX5PbXArQVFDq4b0y4e", "34911");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTCA0311"
						usi_commons.load_precapture("6pRDRYJ3AcmasfzkHgeu571", "34913");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10PERCENTCA0311"
					usi_commons.load_precapture("Gulfa6JBNNdI34W4CeFujy1", "37943");
				}
			}
			//Retention
			if (usi_app.get_locale() === "en-ca" && usi_app.is_retention_audience && usi_app.aff_id != "752" && !usi_cookies.value_exists("usi_suppress_ret_tt")) {
				usi_app.link = usi_app.append_retention_tt_param() + "&dc=1&vc=";
				usi_app.discount = (Number(usi_app.price) * .10).toFixed(2);
				usi_app.new_price = (Number(usi_app.price) - Number(usi_app.discount)).toFixed(2);
				var roll = Math.random();
				var key = roll > 0.66 ? "_6" : roll > 0.33 ? "_7" : "_8";
				usi_commons.load_view("aLubvS1o6v8WW1LEgEeprxx", "37465", usi_commons.device + key);
			}
			if (usi_app.locale === "en-au" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0") {
					usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&vc=SAVE10AU0311";
					usi_commons.load_precapture("cD98hAR8Rm3CtHGeoUtueQS", "34897");
				}
				if (usi_app.is_adobe_store) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10AU0311"
						usi_commons.load_precapture("GYpbXdCgOij1zBaH4WZOiik", "34899");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10AU0311"
						usi_commons.load_precapture("wrFCHRiNB1QyBcAcaqAZn4Z", "34901");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10AU0311"
						usi_commons.load_precapture("WEMeTr6LxmjInJyusXE5Tr2", "34903");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10AU0311"
					usi_commons.load_precapture("EhbzFGRdITxnTH0oDdoWW8B", "37951");
				}
			}
			if (usi_app.locale === "es-mx" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0") {
					usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&vc=SAVE10MX0311";
					usi_commons.load_precapture("Wws68SK9tVb5Z3g0FsARXYb", "36135");
				}
				if (usi_app.is_adobe_store) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10MX0311"
						usi_commons.load_precapture("j0Jj2v4QJ9QMQOEmtpvFsau", "36147");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10MX0311"
						usi_commons.load_precapture("5RW8MMQEWAJyxcpXTaPeR8X", "36149");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param_cscr() + "&dc=1&usi_precapture=1&vc=SAVE10MX0311"
						usi_commons.load_precapture("KqSk0lm5heliHKuknHpfvw6", "36151");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10MX0311"
					usi_commons.load_precapture("yhAXdbrkKufseyZ1n32ozDw", "37939");
				}
			}
			if (usi_app.locale === "pt-br" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				if (usi_app.is_direct_store_channel && usi_app.aff_id === "0") {
					usi_app.email_link = usi_app.append_mcafee_param_cscr() + "&dc=1&vc=SAVE10BR0311";
					usi_commons.load_precapture("zg86XJ5yWMSCQ7zAe3ByhzU", "36333");
				}
				if (usi_app.is_adobe_store) {
					if (usi_app.aff_id === "739") {
						usi_app.email_link = usi_app.append_mcafee_param() + "&dc=1&usi_precapture=1&vc=SAVE10BR0311"
						usi_commons.load_precapture("Bdhov4Yn2fDZHb2eebwZqUJ", "36845");
					}
				}
				if (usi_app.is_direct_google_or_bing_channel) {
					//Google
					if (usi_app.aff_id === "1484" || usi_app.aff_id === "1485" || usi_app.aff_id === "1490") {
						usi_app.email_link = usi_app.append_sem_param() + "&dc=1&usi_precapture=1&vc=SAVE10BR0311"
						usi_commons.load_precapture("UBPu3G2owz8IMGMnEL1BbYk", "36847");
					}
					//Bing
					if (usi_app.aff_id === "1486" || usi_app.aff_id === "1487" || usi_app.aff_id === "1492") {
						usi_app.email_link = usi_app.append_sem_param() + "&dc=1&usi_precapture=1&vc=SAVE10BR0311"
						usi_commons.load_precapture("PmEzve361AbKqkNvCKruteb", "36849");
					}
				}
				//HP Direct
				if (usi_app.is_enabled && (usi_app.aff_id === "1067" || usi_app.aff_id === "1081" || usi_app.aff_id === "1330" || usi_app.aff_id === "1357" || usi_app.aff_id === "1358" || usi_app.aff_id === "1359" || usi_app.aff_id === "1360" || usi_app.aff_id === "1126" || usi_app.aff_id === "1133" || usi_app.aff_id === "1439" || usi_app.aff_id === "1202" || usi_app.aff_id === "1210" || usi_app.aff_id === "1501")) {
					usi_app.email_link = usi_app.append_hp_email_param() + "&dc=1&usi_precapture=1&vc=SAVE10BR0311"
					usi_commons.load_precapture("wxAwgw6SZbFHdE9nAO5Z2uF", "37949");
				}
			}

			if (usi_app.locale == "fr-fr") {
				usi_app.over_write_cookie_setter();
			}

			usi_app.listen_for_upsellit_cta();

			if ((usi_app.product == "" || usi_app.price == 0) && usi_app.aff_id !== "1357") {
				//Page hasn't loaded yet
				usi_commons.log("Oops, no product found. Page probably still loading...");
				setTimeout(usi_app.main, 500);
				return;
			}

			if (usi_cookies.get("usi_remove") != null) {
				usi_cookies.del("usi_remove");
				if (document.getElementsByClassName("removeTxt").length > 0) {
					document.getElementsByClassName("removeTxt")[0].click();
				}
				return;
			}

			if (usi_app.seg  == "") {
				usi_app.seg = usi_app.get_cseg(document.referrer);
			}
			if (usi_commons.gup("ccpubn") != "" && (usi_commons.gup("ccpubn").indexOf("modal2") != -1 || usi_commons.gup("ccpubn").indexOf("email2") != -1)) {
				//usi_app.set_adobe_analytics(usi_commons.gup("ccpubn"));
			}
			var control_site_1_to_10_id = "30305";
			var control_site_1_to_5_id = "30307";
			if (usi_split_test.get_group(control_site_1_to_5_id) != null) {
				usi_app.split = "mtp_1_to_5";
			} else if (usi_split_test.get_group(control_site_1_to_10_id) != null) {
				usi_app.split = "mtp_1_to_10";
			} else if (Math.random() > .5) {
				usi_app.split = "mtp_1_to_5";
			} else {
			    usi_app.split = "mtp_1_to_10";
            }
            if (usi_app.get_direct_audience_upsell_link() != null && usi_app.aff_id !== "1357" && usi_commons.gup("ccpubn").indexOf("ret") == -1) {
				usi_app.link = usi_app.get_direct_audience_upsell_link();
				if (usi_app.split == "mtp_5_to_10") {
					var control_site_id = "30233";
			    	usi_split_test.instantiate(control_site_id);
			    	if (usi_split_test.get_group(control_site_id) == '1') {
						usi_commons.load_view("1C2ACSCdg4vyLVAhsSptMfh", "30165", usi_commons.device + "_" + usi_app.split);
					}
				} else if (usi_app.split == "mtp_1_to_5") {
					usi_split_test.instantiate(control_site_1_to_5_id);
					if (usi_split_test.get_group(control_site_1_to_5_id) == '1') {
						usi_commons.load_view("1C2ACSCdg4vyLVAhsSptMfh", "30165", usi_commons.device + "_" + usi_app.split);
					}
				} else if (usi_app.split == "mtp_1_to_10") {
					usi_split_test.instantiate(control_site_1_to_10_id);
					if (usi_split_test.get_group(control_site_1_to_10_id) == '1') {
						usi_commons.load_view("1C2ACSCdg4vyLVAhsSptMfh", "30165", usi_commons.device + "_" + usi_app.split);
					}
				}
			}
            if (usi_app.sem_type.indexOf(":ret:") != -1) {
            	if (usi_app.get_locale() === "en-us") {
					usi_app.email_link = usi_app.append_ret_pc_param();
					usi_commons.load_precapture("acjhtemYOR4QcjGroKYIcbY", "35859");
				}
				if (usi_app.get_locale() === "en-ca") {
					usi_app.email_link = usi_app.append_ret_pc_param();
					usi_commons.load_precapture("MKu4IDBnXlgPoOIuXxD97FL", "36565");
				}
				if (usi_app.get_locale() === "fr-ca") {
					usi_app.email_link = usi_app.append_ret_pc_param();
					usi_commons.load_precapture("5N5gZLXqEFAdFZlqNxbAEhv", "35151");
				}
			}
            if (usi_commons.gup("ccpubn").indexOf("ret") == -1 && (usi_app.aff_id === "105" || usi_app.aff_id === "662" || usi_app.aff_id === "714" || usi_app.aff_id === "885") && (usi_app.new_term === "0" || usi_app.new_term === "1" || usi_app.new_term === "2") && usi_cookies.value_exists("usi_email_link")) {
				if (usi_app.get_locale() === "en-us") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("qkrhOISGRKGGaRa9y4pJIuR", "35317");
				}
				if (usi_app.get_locale() === "en-ca") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("N58JbIv0LgtGOzB5oVILZ3s", "35319");
				}
				if (usi_app.get_locale() === "en-au") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("l1KOJVzj4bDgv64OiWvAy3L", "35321");
				}
				if (usi_app.get_locale() === "en-in") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("4u6T9hrUeUfrUIS9VCmRA3J", "35323");
				}
				if (usi_app.get_locale() === "es-mx") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("to41w49r68pj43m8AFZUVUq", "36153");
				}
				if (usi_app.get_locale() === "pt-br") {
					usi_app.email_link = decodeURIComponent(usi_cookies.get("usi_email_link"));
					usi_commons.load_precapture("5nwBoSsWbBQA8M09vSIzPka", "36851");
				}
			}
		};

		usi_app.send_link_in_chunks = function() {
			try {
				var i=1; var usi_chunk = 900;
				while (usi_app.email_link.length > usi_chunk*(i-1)) {
					usi_js_monitor.USI_LoadDynamics(usi_app.email_link.substring(usi_chunk*(i-1), usi_chunk*i), 'usi_link'+i, usi_js_monitor.USI_getASession());
					i++;
				}
			} catch (err) {
				usi_commons.report_error(err);
			}
		};

		usi_app.append_atp_pc_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap_atp");
				search_params.set("csrc", "email");
			} else {
				search_params.set("ccstype", "_usi_precap_atp");
				search_params.set("csrc", "email");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_mcafee_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap");
			} else {
				search_params.set("ccstype", "_usi_precap");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_mcafee_param_cscr = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap");
				search_params.set("csrc", "email");
			} else {
				search_params.set("ccstype", "_usi_precap");
				search_params.set("csrc", "email");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_hp_email_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_email_hp");
				search_params.set("csrc", "email");
			} else {
				search_params.set("ccstype", "_usi_email_hp");
				search_params.set("csrc", "email");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_ret_pc_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap_ret");
			} else {
				search_params.set("ccstype", "_usi_precap_ret");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_sem_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap_sem");
			} else {
				search_params.set("ccstype", "_usi_precap_sem");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_sem_param_cscr = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_precap_sem");
				search_params.set("csrc", "email");
			} else {
				search_params.set("ccstype", "_usi_precap_sem");
				search_params.set("csrc", "email");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_new_tt_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_exit");
			} else {
				search_params.set("ccstype", "_usi_exit");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_hp_tt_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_exit_hp");
			} else {
				search_params.set("ccstype", "_usi_exit_hp");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_retention_tt_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_exit_ret");
			} else {
				search_params.set("ccstype", "_usi_exit_ret");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.append_mcafee_lc_param = function() {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_reminder");
			} else {
				search_params.set("ccstype", "_usi_reminder");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.get_upsell_link = function(key) {
			var url = new URL(location.href);
			var search_params = url.searchParams;
			var upsell_moguid = "";
			if (key === "_mtp1") {
				upsell_moguid = "0C0FFE33-4655-4B72-A35C-4A4AECB3F258";
			} else if (key === "_mtp5") {
				upsell_moguid = "B51835A2-242C-4945-945E-B594E1F333F9";
			} else if (key === "_mtp10") {
				upsell_moguid = "01359012-57E0-4AB2-A812-19F4BB02EFEE";
			}
			if (search_params.get("moguid") && upsell_moguid != "") {
				search_params.set("moguid", upsell_moguid);
			}
			if (search_params.get("ccstype") != "") {
				search_params.set("ccstype", search_params.get("ccstype") + "_usi_upsell");
			} else {
				search_params.set("ccstype", "_usi_upsell");
			}
			url.search = search_params.toString();
			var new_url = url.toString();
			return new_url;
		};
		usi_app.get_upsell_key = function() {
			var key = "";
			var product = usi_app.get_product();
			product = product.replace(/[\u00ae]/g, '');
			if (product === "McAfee Total Protection" && usi_app.get_term() === "1 Device / 1 year subscription") {
				key = "_mtp1";
			}
			if (product === "McAfee Total Protection" && usi_app.get_term() === "5 Devices / 1 year subscription") {
				key = "_mtp5";
			}
			if (product === "McAfee Total Protection" && usi_app.get_term() === "10 Devices / 1 year subscription") {
				key = "_mtp10";
			}
			return key;
		};
		usi_app.is_reminder_eligible = function() {
			usi_app.is_reminder = usi_commons.gup_or_get_cookie("usi_reminder", usi_cookies.expire_time.day, true) != "";
			if (!usi_app.is_reminder) {
				if (usi_app.url.indexOf("cart-overview") != -1 || usi_app.url.indexOf("/consumer/en-us/ipz/checkout/2web/payment.html") != -1) {
					if (document.referrer.indexOf("/landing-page/atp/mls-family/livesafe.html") != -1 && document.referrer.indexOf("affid=714") != -1) {
						usi_cookies.set("usi_reminder_referrer", "true", 24*60*60);
						return true;
					} else if (usi_cookies.value_exists("usi_reminder_referrer")) {
						return true;
					}
				}
			}
			return false;
		};
		usi_app.set_adobe_analytics = function(data){
			/*
			usi_commons.log("usi_app.set_adobe_analytics()");
			if (typeof(s) === "undefined" || typeof(s.tl) !== "function") {
				return;
			}
			s.linkTrackVars = 'eVar53';
			s.linkTrackEvents = 'none';
			s.eVar53 = decodeURIComponent(data);
			s.tl(true, 'o', 'Upsellit');
			*/
			/*
			utag.link({
				"tm_global_navigation_element_click": 'true',
				"tm_global_cms_campaign_pub_name": data,
				"tm_global_buynow_clicks": 'true'
			})
			*/
		};
		usi_app.yyyymmdd = function(x) {
			var y = x.getFullYear().toString();
			var m = (x.getMonth() + 1).toString();
			var d = x.getDate().toString();
			(d.length == 1) && (d = '0' + d);
			(m.length == 1) && (m = '0' + m);
			var yyyymmdd = y + m + d;
			return yyyymmdd;
		};
		usi_app.format_currency = function(value) {
			if (usi_app.locale == "fr-fr" || usi_app.locale == "de-de" || usi_app.locale == "es-es" || usi_app.locale == "" || usi_app.locale == "en-au" ||
			usi_app.locale == "pt-br" || usi_app.locale == "en-ca" || usi_app.locale == "it-it" || usi_app.locale == "nl-nl" || usi_app.locale == "pl-pl"  ||
			usi_app.locale == "ru-ru" || usi_app.locale == "sv-se") {
				return value.replace(".", ",");
			} else {
				return value;
			}
		};

		usi_app.get_term = function(){
			try {
				var term_element = document.getElementsByClassName("single-cartItem ng-binding");
				if (term_element.length > 0 && term_element[0].textContent != null) {
					return term_element[0].textContent.indexOf("2 years") != -1 ? "2 year subscription" : "1 year subscription";
				}
				if (document.getElementsByClassName("cmp-modularcart__title split").length > 0 && document.getElementsByClassName("cmp-modularcart__title split")[0].getElementsByClassName("pb-2").length > 0) {
                    return document.getElementsByClassName("cmp-modularcart__title split")[0].getElementsByClassName("pb-2")[0].textContent;
                }
			} catch (err) {
				usi_commons.report_error(err);
			}
			return "";
		};
		usi_app.get_desc = function(){
			try {
				var desc_element = document.querySelectorAll(".product-info-content-description p");
				if (desc_element.length > 1 && desc_element[1].textContent != null) {
					return desc_element[1].textContent
				}
			} catch (err) {
				usi_commons.report_error(err);
			}
		};
		usi_app.get_image = function() {
			if (document.getElementsByClassName("product-cart-section").length > 0 && document.getElementsByClassName("product-cart-section")[0].getElementsByTagName("img").length > 0) {
				var usi_img = document.getElementsByClassName("product-cart-section")[0].getElementsByTagName("img")[0].src.replace(/\/?(jcr.*)/, "");
				return usi_img;
			}
			return "";
		};
		usi_app.get_product = function() {
			var usi_product = "";
			if (document.getElementsByClassName("cmp-modularcart__title split").length > 0 && document.getElementsByClassName("cmp-modularcart__title split")[0].getElementsByTagName("h5").length > 0) {
				usi_product = document.getElementsByClassName("cmp-modularcart__title split")[0].getElementsByTagName("h5")[0].textContent;
			}
			if (document.getElementsByClassName("product-cart-section").length > 0 && document.getElementsByClassName("product-cart-section")[0].getElementsByTagName("h6").length > 0) {
				usi_product = document.getElementsByClassName("product-cart-section")[0].getElementsByTagName("h6")[0].innerHTML;
				if (usi_product.indexOf("Devices") == 0) {
					usi_product += " (Unlimited)";
				}
			}
			return usi_product;
		};
		usi_app.tracking_info = function() {
			return usi_app.locale + "," + usi_app.aff_id + "," + usi_app.price + ",," + usi_app.seg + "," + usi_app.moguid + "," + usi_commons.device + "," + usi_app.channel;
		};
		usi_app.get_years = function() {
			try {
				if (document.getElementsByClassName("pb-2").length > 0) {
					var usi_years = document.getElementsByClassName("pb-2")[0].textContent;
					if (usi_years != "") {
						return usi_years;
					}
				}
			} catch(e) {}
			return "";
		};
		usi_app.get_direct_audience_upsell_link = function() {
			var usi_app_referrer = document.referrer;
			if (document.referrer == "" && usi_cookies.get("refererURL") != null) {
				usi_app_referrer = usi_cookies.get("refererURL");
			}
			if (usi_app_referrer.indexOf("https://www.mcafee.com/en-us/antivirus/mcafee-total-protection.html") == -1 && usi_app_referrer.indexOf("https://www.mcafee.com/en-us/for-home.html") == -1) {
				return null;
			}
			var usi_link = usi_app.direct_audience_upsell_match[usi_app.moguid+"_"+usi_app.price +"_"+usi_app.split];
			if (typeof(usi_link) === "undefined") {
				usi_app.split = "mtp_5_to_10"
			    usi_link = usi_app.direct_audience_upsell_match[usi_app.moguid+"_"+usi_app.price];
            }
			if (typeof(usi_link) === "undefined") {
			    return null;
            }
			return usi_link;
		};
		usi_app.scrape_new_price = function() {
			try {
				if (usi_link.indexOf("ccpubn=") != -1) {
					var usi_ccpubn = usi_link.substring(usi_link.lastIndexOf("ccpubn=")+7, usi_link.length).split(":");
					for (var i=0; i<usi_ccpubn.length; i++) {
						if (usi_ccpubn[i].indexOf(".") != -1 && usi_ccpubn[i] == usi_ccpubn[i].replace(/[^0-9\.]+/g,"")) {
							//This is a number with a period in it, use this!
							usi_commons.log("Price: " + usi_app.new_price  + " vs " + usi_ccpubn[i]);
							usi_app.new_price = usi_ccpubn[i];
						}
					}
				}
			} catch (e) {}
		};
		usi_app.get_expiry = function() {
			var usi_expiry = usi_app.aff_id;
			if (location.href.indexOf("expiry%3A") != -1) {
				usi_expiry = location.href.substring(location.href.indexOf("expiry%3A")+9, location.href.length);
				usi_expiry = usi_expiry.substring(0, usi_expiry.indexOf("%"));
			}
			return usi_expiry;
		};
		usi_app.get_price = function() {
			var usi_price = "0";
			try {
				if (usi_app.url.indexOf("payment.html") != -1) {
					if (document.getElementsByClassName("font-weight-bold fs-16").length > 2) {
						usi_price = document.getElementsByClassName("font-weight-bold fs-16")[2].textContent.replace(/[^0-9\.,]+/g,"");
					} else if (document.getElementsByClassName("font-weight-bold fs-16").length > 1) {
						usi_price = document.getElementsByClassName("font-weight-bold fs-16")[1].textContent.replace(/[^0-9\.,]+/g,"");
					} else if (document.getElementsByClassName("font-weight-bold fs-16").length > 0) {
						usi_price = document.getElementsByClassName("font-weight-bold fs-16")[0].textContent.replace(/[^0-9\.,]+/g,"");
					}
				} else if (usi_app.url.indexOf("cart-overview") != -1) {
					if (document.getElementsByClassName("cmp-ordersummary__tabel__row fs-18").length > 0) {
						usi_price = document.getElementsByClassName("cmp-ordersummary__tabel__row fs-18")[0].getElementsByClassName("text-right")[0].textContent.replace(/[^0-9\.,]+/g,"");
					}
				} else if (document.getElementsByClassName("single-cartItem ng-binding").length > 0 ) {
					var price_element = document.getElementsByClassName("single-cartItem ng-binding");
					if (price_element.length > 0) {
						var usi_price = price_element[0].textContent.trim();
						if (usi_price.indexOf(" ") != -1) usi_price = usi_price.substring(0, usi_price.indexOf(" "));
						usi_price = usi_price.replace(/[^0-9\.,]+/g,"");
					}
				} else {
					return "0";
				}
				if (usi_price.indexOf(",") != -1 && usi_price.indexOf(".") != -1) {
					usi_price = usi_price.replace(",","");
				} else {
					usi_price = usi_price.replace(",",".");
				}
				if (usi_app.get_locale() === "ja-jp") {
					usi_price = Number(usi_price).toFixed(3);
				} else {
					usi_price = Number(usi_price).toFixed(2);
				}

			} catch (err) {
				usi_commons.report_error(err);
				usi_commons.load_script('https://www.upsellit.com/launch/blank.jsp?mcafee=' + encodeURIComponent(document.getElementsByClassName("single-cartItem ng-binding")[0].textContent));
			}
			return usi_price;
		};

		usi_app.get_channel = function() {
			return usi_commons.gup("subtype");
		};

		usi_app.get_cseg = function(usi_url) {
			if (usi_url.indexOf("nar-pre") != -1 || usi_url.indexOf("narpre") != -1) return "nar-pre";
			if (usi_url.indexOf("nar-post") != -1 || usi_url.indexOf("narpost") != -1) return "nar-post";
			if (usi_url.indexOf("pos-pre") != -1 || usi_url.indexOf("pospre") != -1) return "pos-pre";
			if (usi_url.indexOf("pos-post") != -1 || usi_url.indexOf("pospost") != -1) return "pos-post";
			if (usi_url.indexOf("trial:eb") != -1 || usi_url.indexOf("trial%3Aeb") != -1) return "trial:eb";
			if (usi_url.indexOf("trial:post") != -1 || usi_url.indexOf("trial%3Apost") != -1) return "trial:post";
			if (usi_url.indexOf("trial:pre") != -1 || usi_url.indexOf("trial%3Apre") != -1) return "trial:pre";
			if (usi_url.indexOf("trial") != -1 && (usi_url.indexOf("termtype=1") != -1 || usi_url.indexOf("termtype%3D1") != -1)) return "trial:pre";
			if (usi_url.indexOf("trial") != -1 && (usi_url.indexOf("termtype=2") != -1 || usi_url.indexOf("termtype%3D2") != -1)) return "trial:post";
			if (usi_cookies.get("refererURL") != null && usi_cookies.get("refererURL").indexOf("/atlas/") != -1) return "atlas";
			if (usi_commons.gup("expdt") != "") {
				if (usi_commons.gup("expdt") < usi_app.today) return "trial:post";
				else return "trial:pre";
			}
			if (usi_cookies.get("refererURL") != null && usi_cookies.get("refererURL").indexOf("trial") != -1) {
				return "trial:pre";
			}
			return "";
		};
		usi_app.get_locale = function() {
			if (typeof(utag_data) !== "undefined" && typeof(utag_data.tm_global_culture_code) !== "undefined") {
				return utag_data.tm_global_culture_code;
			} else {
				return "";
			}
		};
		usi_app.get_affid = function() {
			if (usi_app.moguid == "FBFC3DA8-27A8-4D04-A143-F88A13E8235D" || usi_app.moguid == "C8D731FF-EAD7-4363-9014-7E7156DDC347") {
				return "1494";
			}
			if (usi_commons.gup("affid") != "") {
				var usi_affid = usi_commons.gup("affid");
				if (usi_affid.indexOf("-") != -1) usi_affid = usi_affid.substring(0, usi_affid.indexOf("-"));
				return usi_affid;
			} else {
				return "";
			}
		};
		usi_app.url_contains = function(x, url) {
			for (var i = 0; i < x.length; i++) {
				if (url.indexOf(x[i]) != -1) {
					return true;
				}
			}
			return false;
		};
		usi_app.apply_japan_coupon = function() {
			usi_commons.log("usi_app.apply_coupon()");

			usi_ajax.post_with_options({
				url: "https://www.mcafee.com/consumer/ipz/cartservlet?operation=APPLY_PROMO",
				paramsDataType: "object",
				params: {"promoCode": usi_app.coupon}
			}, function () {

				usi_cookies.del("usi_coupon");
				usi_app.coupon = "";
				usi_commons.log("Coupon applied...reloading page.");
				location.reload();
			});
		};
		usi_app.check_for_mcafee_modal = function() {
			var element = document.querySelector("#wait");

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.type == 'attributes') {
						usi_commons.log('Cart detected...');
							usi_cookies.set("usi_suppress_ret_tt", "1", usi_cookies.expire_time.week, true);
							observer.disconnect();
					}
				});
			});

			if (typeof element != null) {
				observer.observe(element, {
					attributes: true
				});
			}
		};
		usi_app.check_price = function() {
			if (usi_app.price != usi_app.get_price()) {
				usi_app.price = usi_app.get_price();
				usi_commons.log("Price changed to " + usi_app.price + "... suppressing campaigns");
				if (typeof usi_js !== 'undefined' && typeof usi_js.cleanup === 'function') {
					usi_js.cleanup();
				}
				if (typeof usi_js_monitor !== "undefined" && typeof usi_js_monitor.USI_reportAllItems === "function") {
					usi_js_monitor.USI_reportAllItems = function(){};
				}
				usi_cookies.set("usi_suppressed", "1", usi_cookies.expire_time.day, true);
				clearInterval(usi_app.interval_id);
			}
		};
		usi_app.interval = function() {
			usi_commons.log("interval running")
			if (typeof usi_app.interval_id === "undefined") {
				usi_commons.log("checking")
				usi_app.interval_id = setInterval(usi_app.check_price, 1000);
			}
		};
		usi_dom.ready(function () {
			try {
				setTimeout(usi_app.main, 10); //Small delay.
			} catch (err) {
				usi_commons.report_error(err);
			}
		});
	} catch(err) {
		usi_commons.report_error(err);
	}
}
/**
 * Bunch of useful filters for angularJS(with no external dependencies!)
 * @version v0.5.17 - 2017-09-22 * @link https://github.com/a8m/angular-filter
 * @author Ariel Mashraki <ariel@mashraki.co.il>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b,c){"use strict";function d(a){return E(a)?a:Object.keys(a).map(function(b){return a[b]})}function e(a){return null===a}function f(a,b){var d=Object.keys(a);return d.map(function(d){return b[d]!==c&&b[d]==a[d]}).indexOf(!1)==-1}function g(a,b){function c(a,b,c){for(var d=0;b+d<=a.length;){if(a.charAt(b+d)==c)return d;d++}return-1}for(var d=0,e=0;e<=b.length;e++){var f=c(a,d,b.charAt(e));if(f==-1)return!1;d+=f+1}return!0}function h(a,b,c){var d=0;return a.filter(function(a){var e=y(c)?d<b&&c(a):d<b;return d=e?d+1:d,e})}function i(a,b){return Math.round(a*Math.pow(10,b))/Math.pow(10,b)}function j(a,b,c){b=b||[];var d=Object.keys(a);return d.forEach(function(d){if(D(a[d])&&!E(a[d])){var e=c?c+"."+d:c;j(a[d],b,e||d)}else{var f=c?c+"."+d:d;b.push(f)}}),b}function k(a){return a&&a.$evalAsync&&a.$watch}function l(){return function(a,b){return a>b}}function m(){return function(a,b){return a>=b}}function n(){return function(a,b){return a<b}}function o(){return function(a,b){return a<=b}}function p(){return function(a,b){return a==b}}function q(){return function(a,b){return a!=b}}function r(){return function(a,b){return a===b}}function s(){return function(a,b){return a!==b}}function t(a){return function(b,c){return b=D(b)?d(b):b,!(!E(b)||z(c))&&b.some(function(b){return B(c)&&D(b)||A(c)?a(c)(b):b===c})}}function u(a,b){return b=b||0,b>=a.length?a:E(a[b])?u(a.slice(0,b).concat(a[b],a.slice(b+1)),b):u(a,b+1)}function v(a){return function(b,c){function e(a,b){return!z(b)&&a.some(function(a){return I(a,b)})}if(b=D(b)?d(b):b,!E(b))return b;var f=[],g=a(c);return z(c)?b.filter(function(a,b,c){return c.indexOf(a)===b}):b.filter(function(a){var b=g(a);return!e(f,b)&&(f.push(b),!0)})}}function w(a,b,c){return b?a+c+w(a,--b,c):a}function x(){return function(a){return B(a)?a.split(" ").map(function(a){return a.charAt(0).toUpperCase()+a.substring(1)}).join(" "):a}}var y=b.isDefined,z=b.isUndefined,A=b.isFunction,B=b.isString,C=b.isNumber,D=b.isObject,E=b.isArray,F=b.forEach,G=b.extend,H=b.copy,I=b.equals;String.prototype.contains||(String.prototype.contains=function(){return String.prototype.indexOf.apply(this,arguments)!==-1}),b.module("a8m.angular",[]).filter("isUndefined",function(){return function(a){return b.isUndefined(a)}}).filter("isDefined",function(){return function(a){return b.isDefined(a)}}).filter("isFunction",function(){return function(a){return b.isFunction(a)}}).filter("isString",function(){return function(a){return b.isString(a)}}).filter("isNumber",function(){return function(a){return b.isNumber(a)}}).filter("isArray",function(){return function(a){return b.isArray(a)}}).filter("isObject",function(){return function(a){return b.isObject(a)}}).filter("isEqual",function(){return function(a,c){return b.equals(a,c)}}),b.module("a8m.conditions",[]).filter({isGreaterThan:l,">":l,isGreaterThanOrEqualTo:m,">=":m,isLessThan:n,"<":n,isLessThanOrEqualTo:o,"<=":o,isEqualTo:p,"==":p,isNotEqualTo:q,"!=":q,isIdenticalTo:r,"===":r,isNotIdenticalTo:s,"!==":s}),b.module("a8m.is-null",[]).filter("isNull",function(){return function(a){return e(a)}}),b.module("a8m.after-where",[]).filter("afterWhere",function(){return function(a,b){if(a=D(a)?d(a):a,!E(a)||z(b))return a;var c=a.map(function(a){return f(b,a)}).indexOf(!0);return a.slice(c===-1?0:c)}}),b.module("a8m.after",[]).filter("after",function(){return function(a,b){return a=D(a)?d(a):a,E(a)?a.slice(b):a}}),b.module("a8m.before-where",[]).filter("beforeWhere",function(){return function(a,b){if(a=D(a)?d(a):a,!E(a)||z(b))return a;var c=a.map(function(a){return f(b,a)}).indexOf(!0);return a.slice(0,c===-1?a.length:++c)}}),b.module("a8m.before",[]).filter("before",function(){return function(a,b){return a=D(a)?d(a):a,E(a)?a.slice(0,b?--b:b):a}}),b.module("a8m.chunk-by",["a8m.filter-watcher"]).filter("chunkBy",["filterWatcher",function(a){return function(b,c,d){function e(a,b){for(var c=[];a--;)c[a]=b;return c}function f(a,b,c){return E(a)?a.map(function(a,d,f){return d*=b,a=f.slice(d,d+b),!z(c)&&a.length<b?a.concat(e(b-a.length,c)):a}).slice(0,Math.ceil(a.length/b)):a}return a.isMemoized("chunkBy",arguments)||a.memoize("chunkBy",arguments,this,f(b,c,d))}}]),b.module("a8m.concat",[]).filter("concat",[function(){return function(a,b){if(z(b))return a;if(E(a))return D(b)?a.concat(d(b)):a.concat(b);if(D(a)){var c=d(a);return D(b)?c.concat(d(b)):c.concat(b)}return a}}]),b.module("a8m.contains",[]).filter({contains:["$parse",t],some:["$parse",t]}),b.module("a8m.count-by",[]).filter("countBy",["$parse",function(a){return function(b,c){var e,f={},g=a(c);return b=D(b)?d(b):b,!E(b)||z(c)?b:(b.forEach(function(a){e=g(a),f[e]||(f[e]=0),f[e]++}),f)}}]),b.module("a8m.defaults",[]).filter("defaults",["$parse",function(a){return function(b,c){if(b=D(b)?d(b):b,!E(b)||!D(c))return b;var e=j(c);return b.forEach(function(b){e.forEach(function(d){var e=a(d),f=e.assign;z(e(b))&&f(b,e(c))})}),b}}]),b.module("a8m.every",[]).filter("every",["$parse",function(a){return function(b,c){return b=D(b)?d(b):b,!(E(b)&&!z(c))||b.every(function(b){return D(b)||A(c)?a(c)(b):b===c})}}]),b.module("a8m.filter-by",[]).filter("filterBy",["$parse",function(a){return function(b,e,f,g){var h;return f=B(f)||C(f)?String(f).toLowerCase():c,b=D(b)?d(b):b,!E(b)||z(f)?b:b.filter(function(b){return e.some(function(c){if(~c.indexOf("+")){var d=c.replace(/\s+/g,"").split("+");h=d.map(function(c){return a(c)(b)}).join(" ")}else h=a(c)(b);return!(!B(h)&&!C(h))&&(h=String(h).toLowerCase(),g?h===f:h.contains(f))})})}}]),b.module("a8m.first",[]).filter("first",["$parse",function(a){return function(b){var e,f,g;return b=D(b)?d(b):b,E(b)?(g=Array.prototype.slice.call(arguments,1),e=C(g[0])?g[0]:1,f=C(g[0])?C(g[1])?c:g[1]:g[0],g.length?h(b,e,f?a(f):f):b[0]):b}}]),b.module("a8m.flatten",[]).filter("flatten",function(){return function(a,b){return b=b||!1,a=D(a)?d(a):a,E(a)?b?[].concat.apply([],a):u(a,0):a}}),b.module("a8m.fuzzy-by",[]).filter("fuzzyBy",["$parse",function(a){return function(b,c,e,f){var h,i,j=f||!1;return b=D(b)?d(b):b,!E(b)||z(c)||z(e)?b:(i=a(c),b.filter(function(a){return h=i(a),!!B(h)&&(h=j?h:h.toLowerCase(),e=j?e:e.toLowerCase(),g(h,e)!==!1)}))}}]),b.module("a8m.fuzzy",[]).filter("fuzzy",function(){return function(a,b,c){function e(a,b){var c,d,e=Object.keys(a);return 0<e.filter(function(e){return c=a[e],!!d||!!B(c)&&(c=f?c:c.toLowerCase(),d=g(c,b)!==!1)}).length}var f=c||!1;return a=D(a)?d(a):a,!E(a)||z(b)?a:(b=f?b:b.toLowerCase(),a.filter(function(a){return B(a)?(a=f?a:a.toLowerCase(),g(a,b)!==!1):!!D(a)&&e(a,b)}))}}),b.module("a8m.group-by",["a8m.filter-watcher"]).filter("groupBy",["$parse","filterWatcher",function(a,b){return function(c,d){function e(a,b){var c,d={};return F(a,function(a){c=b(a),d[c]||(d[c]=[]),d[c].push(a)}),d}return!D(c)||z(d)?c:b.isMemoized("groupBy",arguments)||b.memoize("groupBy",arguments,this,e(c,a(d)))}}]),b.module("a8m.is-empty",[]).filter("isEmpty",function(){return function(a){return D(a)?!d(a).length:!a.length}}),b.module("a8m.join",[]).filter("join",function(){return function(a,b){return z(a)||!E(a)?a:(z(b)&&(b=" "),a.join(b))}}),b.module("a8m.last",[]).filter("last",["$parse",function(a){return function(b){var e,f,g,i=H(b);return i=D(i)?d(i):i,E(i)?(g=Array.prototype.slice.call(arguments,1),e=C(g[0])?g[0]:1,f=C(g[0])?C(g[1])?c:g[1]:g[0],g.length?h(i.reverse(),e,f?a(f):f).reverse():i[i.length-1]):i}}]),b.module("a8m.map",[]).filter("map",["$parse",function(a){return function(b,c){return b=D(b)?d(b):b,!E(b)||z(c)?b:b.map(function(b){return a(c)(b)})}}]),b.module("a8m.omit",[]).filter("omit",["$parse",function(a){return function(b,c){return b=D(b)?d(b):b,!E(b)||z(c)?b:b.filter(function(b){return!a(c)(b)})}}]),b.module("a8m.pick",[]).filter("pick",["$parse",function(a){return function(b,c){return b=D(b)?d(b):b,!E(b)||z(c)?b:b.filter(function(b){return a(c)(b)})}}]),b.module("a8m.range",[]).filter("range",function(){return function(a,b,c,d,e){c=c||0,d=d||1;for(var f=0;f<parseInt(b);f++){var g=c+f*d;a.push(A(e)?e(g):g)}return a}}),b.module("a8m.remove-with",[]).filter("removeWith",function(){return function(a,b){return z(b)?a:(a=D(a)?d(a):a,a.filter(function(a){return!f(b,a)}))}}),b.module("a8m.remove",[]).filter("remove",function(){return function(a){a=D(a)?d(a):a;var b=Array.prototype.slice.call(arguments,1);return E(a)?a.filter(function(a){return!b.some(function(b){return I(b,a)})}):a}}),b.module("a8m.reverse",[]).filter("reverse",[function(){return function(a){return a=D(a)?d(a):a,B(a)?a.split("").reverse().join(""):E(a)?a.slice().reverse():a}}]),b.module("a8m.search-field",[]).filter("searchField",["$parse",function(a){return function(b){var c,e;b=D(b)?d(b):b;var f=Array.prototype.slice.call(arguments,1);return E(b)&&f.length?b.map(function(b){return e=f.map(function(d){return(c=a(d))(b)}).join(" "),G(b,{searchField:e})}):b}}]),b.module("a8m.to-array",[]).filter("toArray",function(){return function(a,b){return D(a)?b?Object.keys(a).map(function(b){return G(a[b],{$key:b})}):d(a):a}}),b.module("a8m.unique",[]).filter({unique:["$parse",v],uniq:["$parse",v]}),b.module("a8m.where",[]).filter("where",function(){return function(a,b){return z(b)?a:(a=D(a)?d(a):a,a.filter(function(a){return f(b,a)}))}}),b.module("a8m.xor",[]).filter("xor",["$parse",function(a){return function(b,c,e){function f(b,c){var d=a(e);return c.some(function(a){return e?I(d(a),d(b)):I(a,b)})}return e=e||!1,b=D(b)?d(b):b,c=D(c)?d(c):c,E(b)&&E(c)?b.concat(c).filter(function(a){return!(f(a,b)&&f(a,c))}):b}}]),b.module("a8m.math.abs",[]).filter("abs",function(){return function(a){return Math.abs(a)}}),b.module("a8m.math.byteFmt",[]).filter("byteFmt",function(){var a=[{str:"B",val:1024}];return["KB","MB","GB","TB","PB","EB","ZB","YB"].forEach(function(b,c){a.push({str:b,val:1024*a[c].val})}),function(b,c){if(C(c)&&isFinite(c)&&c%1===0&&c>=0&&C(b)&&isFinite(b)){for(var d=0;d<a.length-1&&b>=a[d].val;)d++;return b/=d>0?a[d-1].val:1,i(b,c)+" "+a[d].str}return"NaN"}}),b.module("a8m.math.degrees",[]).filter("degrees",function(){return function(a,b){if(C(b)&&isFinite(b)&&b%1===0&&b>=0&&C(a)&&isFinite(a)){var c=180*a/Math.PI;return Math.round(c*Math.pow(10,b))/Math.pow(10,b)}return"NaN"}}),b.module("a8m.math.kbFmt",[]).filter("kbFmt",function(){var a=[{str:"KB",val:1024}];return["MB","GB","TB","PB","EB","ZB","YB"].forEach(function(b,c){a.push({str:b,val:1024*a[c].val})}),function(b,c){if(C(c)&&isFinite(c)&&c%1===0&&c>=0&&C(b)&&isFinite(b)){for(var d=0;d<a.length-1&&b>=a[d].val;)d++;return b/=d>0?a[d-1].val:1,i(b,c)+" "+a[d].str}return"NaN"}}),b.module("a8m.math.max",[]).filter("max",["$parse",function(a){function b(b,c){var d=b.map(function(b){return a(c)(b)});return d.indexOf(Math.max.apply(Math,d))}return function(a,c){return E(a)?z(c)?Math.max.apply(Math,a):a[b(a,c)]:a}}]),b.module("a8m.math.min",[]).filter("min",["$parse",function(a){function b(b,c){var d=b.map(function(b){return a(c)(b)});return d.indexOf(Math.min.apply(Math,d))}return function(a,c){return E(a)?z(c)?Math.min.apply(Math,a):a[b(a,c)]:a}}]),b.module("a8m.math.percent",[]).filter("percent",function(){return function(a,b,c){var d=B(a)?Number(a):a;return b=b||100,c=c||!1,!C(d)||isNaN(d)?a:c?Math.round(d/b*100):d/b*100}}),b.module("a8m.math.radians",[]).filter("radians",function(){return function(a,b){if(C(b)&&isFinite(b)&&b%1===0&&b>=0&&C(a)&&isFinite(a)){var c=3.14159265359*a/180;return Math.round(c*Math.pow(10,b))/Math.pow(10,b)}return"NaN"}}),b.module("a8m.math.radix",[]).filter("radix",function(){return function(a,b){var c=/^[2-9]$|^[1-2]\d$|^3[0-6]$/;return C(a)&&c.test(b)?a.toString(b).toUpperCase():a}}),b.module("a8m.math.shortFmt",[]).filter("shortFmt",function(){return function(a,b){return C(b)&&isFinite(b)&&b%1===0&&b>=0&&C(a)&&isFinite(a)?a<1e3?""+a:a<1e6?i(a/1e3,b)+" K":a<1e9?i(a/1e6,b)+" M":i(a/1e9,b)+" B":"NaN"}}),b.module("a8m.math.sum",[]).filter("sum",function(){return function(a,b){return E(a)?a.reduce(function(a,b){return a+b},b||0):a}}),b.module("a8m.ends-with",[]).filter("endsWith",function(){return function(a,b,c){var d,e=c||!1;return!B(a)||z(b)?a:(a=e?a:a.toLowerCase(),d=a.length-b.length,a.indexOf(e?b:b.toLowerCase(),d)!==-1)}}),b.module("a8m.latinize",[]).filter("latinize",[function(){function a(a){return a.replace(/[^\u0000-\u007E]/g,function(a){return c[a]||a})}for(var b=[{base:"A",letters:"A?A���????�AA??????�A?�?A??????A??"},{base:"AA",letters:"?"},{base:"AE",letters:"�??"},{base:"AO",letters:"?"},{base:"AU",letters:"?"},{base:"AV",letters:"??"},{base:"AY",letters:"?"},{base:"B",letters:"B?B??????"},{base:"C",letters:"C?CCCCC�????"},{base:"D",letters:"D?D?D????�??�?"},{base:"DZ",letters:"??"},{base:"Dz",letters:"??"},{base:"E",letters:"E?E���?????E??EE�?E??????E????"},{base:"F",letters:"F?F?�?"},{base:"G",letters:"G?G?G?GGGGG????"},{base:"H",letters:"H?HH??????H???"},{base:"I",letters:"I?I���IIII�??I???I?I"},{base:"J",letters:"J?JJ?"},{base:"K",letters:"K?K?K?K???????"},{base:"L",letters:"L?L?LL??L??L??????"},{base:"LJ",letters:"?"},{base:"Lj",letters:"?"},{base:"M",letters:"M?M?????"},{base:"N",letters:"N?N?N�?N?N??????"},{base:"NJ",letters:"?"},{base:"Nj",letters:"?"},{base:"O",letters:"O?O���????�???O??O??�??OO??O???????OO�??O??"},{base:"OI",letters:"?"},{base:"OO",letters:"?"},{base:"OU",letters:"?"},{base:"OE",letters:"?�"},{base:"oe",letters:"?�"},{base:"P",letters:"P?P???????"},{base:"Q",letters:"Q?Q???"},{base:"R",letters:"R?RR?R????R??????"},{base:"S",letters:"S?S?S?S?�????S???"},{base:"T",letters:"T?T?T??T??T?T??"},{base:"TZ",letters:"?"},{base:"U",letters:"U?U���U?U?U�UUUU?UUU??U???????U???"},{base:"V",letters:"V?V?????"},{base:"VY",letters:"?"},{base:"W",letters:"W?W??W????"},{base:"X",letters:"X?X??"},{base:"Y",letters:"Y?Y?�Y???�?????"},{base:"Z",letters:"Z?ZZ?Z�???????"},{base:"a",letters:"a?a?���????�aa??????�a?�?a??????a??"},{base:"aa",letters:"?"},{base:"ae",letters:"�??"},{base:"ao",letters:"?"},{base:"au",letters:"?"},{base:"av",letters:"??"},{base:"ay",letters:"?"},{base:"b",letters:"b?b???b??"},{base:"c",letters:"c?ccccc�?????"},{base:"d",letters:"d?d?d????d????"},{base:"dz",letters:"??"},{base:"e",letters:"e?e���?????e??ee�?e??????e?????"},{base:"f",letters:"f?f?�?"},{base:"g",letters:"g?g?g?ggggg????"},{base:"h",letters:"h?hh???????h???"},{base:"hv",letters:"?"},{base:"i",letters:"i?i���iii�??i???i??i"},{base:"j",letters:"j?jjj?"},{base:"k",letters:"k?k?k?k???????"},{base:"l",letters:"l?l?ll??l???ll?????"},{base:"lj",letters:"?"},{base:"m",letters:"m?m?????"},{base:"n",letters:"n?n?n�?n?n???????"},{base:"nj",letters:"?"},{base:"o",letters:"o?o���????�???o??o??�??oo??o???????oo�?????"},{base:"oi",letters:"?"},{base:"ou",letters:"?"},{base:"oo",letters:"?"},{base:"p",letters:"p?p???????"},{base:"q",letters:"q?q???"},{base:"r",letters:"r?rr?r????r??????"},{base:"s",letters:"s?s�s?s?�????s????"},{base:"t",letters:"t?t??t??t??t????"},{base:"tz",letters:"?"},{base:"u",letters:"u?u���u?u?u�uuuu?uuu??u???????u???"},{base:"v",letters:"v?v?????"},{base:"vy",letters:"?"},{base:"w",letters:"w?w??w?????"},{base:"x",letters:"x?x??"},{base:"y",letters:"y?y?�y???�??????"},{base:"z",letters:"z?zz?z�??z????"}],c={},d=0;d<b.length;d++)for(var e=b[d].letters.split(""),f=0;f<e.length;f++)c[e[f]]=b[d].base;return function(b){return B(b)?a(b):b}}]),b.module("a8m.ltrim",[]).filter("ltrim",function(){return function(a,b){var c=b||"\\s";return B(a)?a.replace(new RegExp("^"+c+"+"),""):a}}),b.module("a8m.match",[]).filter("match",function(){return function(a,b,c){var d=new RegExp(b,c);return B(a)?a.match(d):null}}),b.module("a8m.phoneUS",[]).filter("phoneUS",function(){return function(a){return a+="","("+a.slice(0,3)+") "+a.slice(3,6)+"-"+a.slice(6)}}),b.module("a8m.repeat",[]).filter("repeat",[function(){return function(a,b,c){var d=~~b;return B(a)&&d?w(a,--b,c||""):a}}]),b.module("a8m.rtrim",[]).filter("rtrim",function(){return function(a,b){var c=b||"\\s";return B(a)?a.replace(new RegExp(c+"+$"),""):a}}),b.module("a8m.slugify",[]).filter("slugify",[function(){return function(a,b){var c=z(b)?"-":b;return B(a)?a.toLowerCase().replace(/\s+/g,c):a}}]),b.module("a8m.split",[]).filter("split",function(){function a(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}return function(b,c,d){var f,g,h,i;return z(b)||!B(b)?null:(z(c)&&(c=""),isNaN(d)&&(d=0),f=new RegExp(a(c),"g"),g=b.match(f),e(g)||d>=g.length?[b]:0===d?b.split(c):(h=b.split(c),i=h.splice(0,d+1),h.unshift(i.join(c)),h))}}),b.module("a8m.starts-with",[]).filter("startsWith",function(){return function(a,b,c){var d=c||!1;return!B(a)||z(b)?a:(a=d?a:a.toLowerCase(),!a.indexOf(d?b:b.toLowerCase()))}}),b.module("a8m.stringular",[]).filter("stringular",function(){return function(a){var b=Array.prototype.slice.call(arguments,1);return a.replace(/{(\d+)}/g,function(a,c){return z(b[c])?a:b[c]})}}),b.module("a8m.strip-tags",[]).filter("stripTags",function(){return function(a){return B(a)?a.replace(/<\S[^><]*>/g,""):a}}),b.module("a8m.test",[]).filter("test",function(){return function(a,b,c){var d=new RegExp(b,c);return B(a)?d.test(a):a}}),b.module("a8m.trim",[]).filter("trim",function(){return function(a,b){var c=b||"\\s";return B(a)?a.replace(new RegExp("^"+c+"+|"+c+"+$","g"),""):a}}),b.module("a8m.truncate",[]).filter("truncate",function(){return function(a,b,c,d){return b=z(b)?a.length:b,d=d||!1,c=c||"",!B(a)||a.length<=b?a:a.substring(0,d?a.indexOf(" ",b)===-1?a.length:a.indexOf(" ",b):b)+c}}),b.module("a8m.ucfirst",[]).filter({ucfirst:x,titleize:x}),b.module("a8m.uri-component-encode",[]).filter("uriComponentEncode",["$window",function(a){return function(b){return B(b)?a.encodeURIComponent(b):b}}]),b.module("a8m.uri-encode",[]).filter("uriEncode",["$window",function(a){return function(b){return B(b)?a.encodeURI(b):b}}]),b.module("a8m.wrap",[]).filter("wrap",function(){return function(a,b,c){return B(a)&&y(b)?[b,a,c||b].join(""):a}}),b.module("a8m.filter-watcher",[]).provider("filterWatcher",function(){this.$get=["$window","$rootScope",function(a,b){function c(b,c){function d(){var b=[];return function(c,d){if(D(d)&&!e(d)){if(~b.indexOf(d))return"[Circular]";b.push(d)}return a==d?"$WINDOW":a.document==d?"$DOCUMENT":k(d)?"$SCOPE":d}}return[b,JSON.stringify(c,d())].join("#").replace(/"/g,"")}function d(a){var b=a.targetScope.$id;F(l[b],function(a){delete j[a]}),delete l[b]}function f(){m(function(){b.$$phase||(j={})},2e3)}function g(a,b){var c=a.$id;return z(l[c])&&(a.$on("$destroy",d),l[c]=[]),l[c].push(b)}function h(a,b){var d=c(a,b);return j[d]}function i(a,b,d,e){var h=c(a,b);return j[h]=e,k(d)?g(d,h):f(),e}var j={},l={},m=a.setTimeout;return{isMemoized:h,memoize:i}}]}),b.module("angular.filter",["a8m.ucfirst","a8m.uri-encode","a8m.uri-component-encode","a8m.slugify","a8m.latinize","a8m.strip-tags","a8m.stringular","a8m.truncate","a8m.starts-with","a8m.ends-with","a8m.wrap","a8m.trim","a8m.ltrim","a8m.rtrim","a8m.repeat","a8m.test","a8m.match","a8m.split","a8m.phoneUS","a8m.to-array","a8m.concat","a8m.contains","a8m.unique","a8m.is-empty","a8m.after","a8m.after-where","a8m.before","a8m.before-where","a8m.defaults","a8m.where","a8m.reverse","a8m.remove","a8m.remove-with","a8m.group-by","a8m.count-by","a8m.chunk-by","a8m.search-field","a8m.fuzzy-by","a8m.fuzzy","a8m.omit","a8m.pick","a8m.every","a8m.filter-by","a8m.xor","a8m.map","a8m.first","a8m.last","a8m.flatten","a8m.join","a8m.range","a8m.math.max","a8m.math.min","a8m.math.abs","a8m.math.percent","a8m.math.radix","a8m.math.sum","a8m.math.degrees","a8m.math.radians","a8m.math.byteFmt","a8m.math.kbFmt","a8m.math.shortFmt","a8m.angular","a8m.conditions","a8m.is-null","a8m.filter-watcher"])}(window,window.angular);
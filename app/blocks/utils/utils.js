'use strict';

// ie11 foreach polyfill
if ('NodeList' in window && !NodeList.prototype.forEach) {
	console.info('polyfill for IE11');
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (let i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

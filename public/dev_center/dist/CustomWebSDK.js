///<jscompress sourcefile="uuid.js" />
function UUID() {
	this.id = this.createUUID()
}
UUID.prototype.valueOf = function() {
	return this.id
};
UUID.prototype.toString = function() {
	return this.id
};
UUID.prototype.createUUID = function() {
	var c = new Date(1582, 10, 15, 0, 0, 0, 0);
	var f = new Date();
	var h = f.getTime() - c.getTime();
	var i = UUID.getIntegerBits(h, 0, 31);
	var g = UUID.getIntegerBits(h, 32, 47);
	var e = UUID.getIntegerBits(h, 48, 59) + "2";
	var b = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
	var d = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
	var a = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
			+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
			+ UUID.getIntegerBits(UUID.rand(8191), 0, 7)
			+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
			+ UUID.getIntegerBits(UUID.rand(8191), 0, 15);
	return i + g + e + b + d + a
};
UUID.getIntegerBits = function(f, g, b) {
	var a = UUID.returnBase(f, 16);
	var d = new Array();
	var e = "";
	var c = 0;
	for (c = 0; c < a.length; c++) {
		d.push(a.substring(c, c + 1))
	}
	for (c = Math.floor(g / 4); c <= Math.floor(b / 4); c++) {
		if (!d[c] || d[c] == "") {
			e += "0"
		} else {
			e += d[c]
		}
	}
	return e
};
UUID.returnBase = function(c, d) {
	var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
			"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
			"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	if (c < d) {
		var b = e[c]
	} else {
		var f = "" + Math.floor(c / d);
		var a = c - f * d;
		if (f >= d) {
			var b = this.returnBase(f, d) + e[a]
		} else {
			var b = e[f] + e[a]
		}
	}
	return b
};
UUID.rand = function(a) {
	return Math.floor(Math.random() * a)
};
///<jscompress sourcefile="Version.js" />
/**
 * 版本类
 */
Custom = {};
Custom.Version = 'jssdk_bate@1 leaflet 1.3.4';

/**
 * 重写Attribution方法的options属性，去掉leaflet商标
 */
L.Control.Attribution.prototype.options={
    position: 'bottomright'
};

/**
 * 重写手势缩放的bug
 */
L.Map.TouchZoom.prototype._onTouchMove=(function(_super) {
    return function(e) {
        if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

        var map = this._map,
            p1 = map.mouseEventToContainerPoint(e.touches[0]),
            p2 = map.mouseEventToContainerPoint(e.touches[1]),
            scale = p1.distanceTo(p2) / this._startDist;


        this._zoom = map.getScaleZoom(scale, this._startZoom)+1;

        if (!map.options.bounceAtZoomLimits && (
                (this._zoom < map.getMinZoom() && scale < 1) ||
                (this._zoom > map.getMaxZoom() && scale > 1))) {
            this._zoom = map._limitZoom(this._zoom);
        }

        if (map.options.touchZoom === 'center') {
            this._center = this._startLatLng;
            if (scale === 1) { return; }
        } else {
            // Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
            var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
            if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
            this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
        }

        if (!this._moved) {
            map._moveStart(true);
            this._moved = true;
        }

        L.Util.cancelAnimFrame(this._animRequest);

        var moveFn = L.bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
        this._animRequest = L.Util.requestAnimFrame(moveFn, this, true);

        L.DomEvent.preventDefault(e);
    };
})(L.Map.TouchZoom.prototype._onTouchMove);


/**
 * 重写flyTo函数，解决该函数产生的小数缩放级别的bug
 */
L.Map.prototype.flyTo=(function(_super) {
    return function(targetCenter, targetZoom, options) {
        options = options || {};
        if (options.animate === false || !L.Browser.any3d) {
            return this.setView(targetCenter, targetZoom, options);
        }

        this._stop();

        var from = this.project(this.getCenter()),
            to = this.project(targetCenter),
            size = this.getSize(),
            startZoom = this._zoom;

        targetCenter = L.latLng(targetCenter);
        targetZoom = targetZoom === undefined ? startZoom : targetZoom;

        var w0 = Math.max(size.x, size.y),
            w1 = w0 * this.getZoomScale(startZoom, targetZoom),
            u1 = (to.distanceTo(from)) || 1,
            rho = 1.42,
            rho2 = rho * rho;

        function r(i) {
            var s1 = i ? -1 : 1,
                s2 = i ? w1 : w0,
                t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
                b1 = 2 * s2 * rho2 * u1,
                b = t1 / b1,
                sq = Math.sqrt(b * b + 1) - b;

            // workaround for floating point precision bug when sq = 0, log = -Infinite,
            // thus triggering an infinite loop in flyTo
            var log = sq < 0.000000001 ? -18 : Math.log(sq);

            return log;
        }

        function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
        function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
        function tanh(n) { return sinh(n) / cosh(n); }

        var r0 = r(0);

        function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
        function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

        function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

        var start = Date.now(),
            S = (r(1) - r0) / rho,
            duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

        function frame() {
            var t = (Date.now() - start) / duration,
                s = easeOut(t) * S;

            if (t <= 1) {
                this._flyToFrame = L.Util.requestAnimFrame(frame, this);

                this._move(
                    this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
                    this.getScaleZoom(w0 / w(s), startZoom),
                    {flyTo: true});

            } else {
                //增加这行，保证flyto完成后，地图的层级为整数
                targetZoom = Math.round(targetZoom);
                this
                    ._move(targetCenter, targetZoom)
                    ._moveEnd(true);
            }
        }

        this._moveStart(true);

        frame.call(this);
        return this;
    };
})(L.Map.prototype.flyTo);


/**
 * 如果是ie浏览器，则增加startsWith和endsWith方法
 */
if (!!window.ActiveXObject || "ActiveXObject" in window) {
    String.prototype.startsWith = function (str) {

        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    };

    String.prototype.endsWith = function(str) {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return this.indexOf(str, this.length - str.length) !== -1;
        }else{
            return this.endsWith(str);
        }
    };
}
///<jscompress sourcefile="hidpi-canvas.js" />
/**
 * HiDPI Canvas Polyfill (1.0.10)
 *
 * Author: Jonathan D. Johnson (http://jondavidjohn.com)
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
 * Issue Tracker: https://github.com/jondavidjohn/hidpi-canvas-polyfill/issues
 * License: Apache-2.0
*/
(function(prototype) {

	// var pixelRatio = (function() {
	// 		var canvas = document.createElement('canvas'),
	// 				context = canvas.getContext('2d'),
	// 				backingStore = context.backingStorePixelRatio ||
	// 					context.webkitBackingStorePixelRatio ||
	// 					context.mozBackingStorePixelRatio ||
	// 					context.msBackingStorePixelRatio ||
	// 					context.oBackingStorePixelRatio ||
	// 					context.backingStorePixelRatio || 1;
	// 		return (window.devicePixelRatio || 1) / backingStore;
	// 	})(),

    var pixelRatio =window.devicePixelRatio,

		forEach = function(obj, func) {
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					func(obj[p], p);
				}
			}
		},

		ratioArgs = {
			'fillRect': 'all',
			'clearRect': 'all',
			'strokeRect': 'all',
			'moveTo': 'all',
			'lineTo': 'all',
			'arc': [0,1,2],
			'arcTo': 'all',
			'bezierCurveTo': 'all',
			'isPointinPath': 'all',
			'isPointinStroke': 'all',
			'quadraticCurveTo': 'all',
			'rect': 'all',
			'translate': 'all',
			'createRadialGradient': 'all',
			'createLinearGradient': 'all',
            'getImageData':'all'
		};
	if (pixelRatio === 1 || pixelRatio <1) return;

	forEach(ratioArgs, function(value, key) {
		prototype[key] = (function(_super) {
			return function() {
				if(!this.isQuality){
					return _super.apply(this, arguments);
				}
				
				var i, len,
					args = Array.prototype.slice.call(arguments);

				if (value === 'all') {
					args = args.map(function(a) {
						return a * pixelRatio;
					});
				}
				else if (Array.isArray(value)) {
					for (i = 0, len = value.length; i < len; i++) {
						args[value[i]] *= pixelRatio;
					}
				}

				return _super.apply(this, args);
			};
		})(prototype[key]);
	});

	 // Stroke lineWidth adjustment
	prototype.stroke = (function(_super) {
		return function() {
			if(!this.isQuality){
					return _super.apply(this, arguments);
			}
			
			this.lineWidth *= pixelRatio;
			_super.apply(this, arguments);
			this.lineWidth /= pixelRatio;
		};
	})(prototype.stroke);

	// Text
	//
	prototype.fillText = (function(_super) {
		return function() {
			if(!this.isQuality){
					return _super.apply(this, arguments);
			}
			
			var args = Array.prototype.slice.call(arguments);
			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+\.?\d*)(px|em|rem|pt)/g,
				function(w, m, u) {
					if(m < 12){
						m = 12;
					}else{
						m = Math.round(m);
					}
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+\.?\d*)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.fillText);

	prototype.strokeText = (function(_super) {
		return function() {
			if(!this.isQuality){
					return _super.apply(this, arguments);
			}
			
			var args = Array.prototype.slice.call(arguments);

			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+\.?\d*)(px|em|rem|pt)/g,
				function(w, m, u) {
                    if(m < 12){
                        m = 12;
                    }else{
                        m = Math.round(m);
                    }
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+\.?\d*)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.strokeText);

    prototype.drawImage = (function(_super) {
        return function() {
        	if(!this.isQuality){
					return _super.apply(this, arguments);
			}
        	
            var args = Array.prototype.slice.call(arguments);
            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y
            args[3] *= pixelRatio; // width
            args[4] *= pixelRatio; // height
            _super.apply(this, args);
        };
    })(prototype.drawImage);

    prototype.clearRect = (function(_super) {
        return function() {
        	if(!this.isQuality){
					return _super.apply(this, arguments);
			}
        	
            var args = Array.prototype.slice.call(arguments);
            args[2] *= pixelRatio; // width
            args[3] *= pixelRatio; // height
            _super.apply(this, args);  
        };
    })(prototype.clearRect);

})(CanvasRenderingContext2D.prototype);
;(function(prototype) {
	prototype.getContext = (function(_super) {
		return function(type,option) {
			var backingStore, ratio,
				context = _super.call(this, type);
			context.isQuality = false;
			if(option){
				context.isQuality = option.isQuality;
			}
			
			if (type === '2d' && context.isQuality == true) {

				// backingStore = context.backingStorePixelRatio ||
				// 			context.webkitBackingStorePixelRatio || 
				// 			context.mozBackingStorePixelRatio ||
				// 			context.msBackingStorePixelRatio ||
				// 			context.oBackingStorePixelRatio ||
				// 			context.backingStorePixelRatio || 1;
                //
				// ratio = (window.devicePixelRatio || 1) / backingStore;

                ratio = window.devicePixelRatio;
				if (ratio > 1) {
					this.style.height = this.height + 'px';
					this.style.width = this.width + 'px';
					this.width *= ratio;
					this.height *= ratio;
				}
			}

			return context;
		};
	})(prototype.getContext);
})(HTMLCanvasElement.prototype);

///<jscompress sourcefile="es6-promise.js" />
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0+f046478d
 */

function promiseFun() { 'use strict';
    function objectOrFunction(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }

    function isFunction(x) {
        return typeof x === 'function';
    }

    var _isArray = undefined;
    if (Array.isArray) {
        _isArray = Array.isArray;
    } else {
        _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    }

    var isArray = _isArray;

    var len = 0;
    var vertxNext = undefined;
    var customSchedulerFn = undefined;

    var asap = function asap(callback, arg) {
        queue[len] = callback;
        queue[len + 1] = arg;
        len += 2;
        if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
                customSchedulerFn(flush);
            } else {
                scheduleFlush();
            }
        }
    };

    function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
        asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
    function useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function () {
            return process.nextTick(flush);
        };
    }

// vertx
    function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
            return function () {
                vertxNext(flush);
            };
        }

        return useSetTimeout();
    }

    function useMutationObserver() {
        var iterations = 0;
        var observer = new BrowserMutationObserver(flush);
        var node = document.createTextNode('');
        observer.observe(node, { characterData: true });

        return function () {
            node.data = iterations = ++iterations % 2;
        };
    }

// web worker
    function useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        return function () {
            return channel.port2.postMessage(0);
        };
    }

    function useSetTimeout() {
        // Store setTimeout reference so es6-promise will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var globalSetTimeout = setTimeout;
        return function () {
            return globalSetTimeout(flush, 1);
        };
    }

    var queue = new Array(1000);
    function flush() {
        for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];

            callback(arg);

            queue[i] = undefined;
            queue[i + 1] = undefined;
        }

        len = 0;
    }

    function attemptVertx() {
        try {
            var r = require;
            var vertx = r('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
        } catch (e) {
            return useSetTimeout();
        }
    }

    var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
        scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    } else if (isWorker) {
        scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof require === 'function') {
        scheduleFlush = attemptVertx();
    } else {
        scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
        var _arguments = arguments;

        var parent = this;

        var child = new this.constructor(noop);

        if (child[PROMISE_ID] === undefined) {
            makePromise(child);
        }

        var _state = parent._state;

        if (_state) {
            (function () {
                var callback = _arguments[_state - 1];
                asap(function () {
                    return invokeCallback(_state, child, callback, parent._result);
                });
            })();
        } else {
            subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
    }

    /**
     @method resolve
     @static
     @param {Any} value value that the returned promise will be resolved with
     Useful for tooling.
     @return {Promise} a promise that will become fulfilled with the given
     `value`
     */
    function resolve$1(object) {
        /*jshint validthis:true */
        var Constructor = this;

        if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
        }

        var promise = new Constructor(noop);
        resolve(promise, object);
        return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(16);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var GET_THEN_ERROR = new ErrorObject();

    function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }

    function getThen(promise) {
        try {
            return promise.then;
        } catch (error) {
            GET_THEN_ERROR.error = error;
            return GET_THEN_ERROR;
        }
    }

    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
            return e;
        }
    }

    function handleForeignThenable(promise, thenable, then$$1) {
        asap(function (promise) {
            var sealed = false;
            var error = tryThen(then$$1, thenable, function (value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    resolve(promise, value);
                } else {
                    fulfill(promise, value);
                }
            }, function (reason) {
                if (sealed) {
                    return;
                }
                sealed = true;

                reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));

            if (!sealed && error) {
                sealed = true;
                reject(promise, error);
            }
        }, promise);
    }

    function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
        } else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
        } else {
            subscribe(thenable, undefined, function (value) {
                return resolve(promise, value);
            }, function (reason) {
                return reject(promise, reason);
            });
        }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$1) {
        if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
            handleOwnThenable(promise, maybeThenable);
        } else {
            if (then$$1 === GET_THEN_ERROR) {
                reject(promise, GET_THEN_ERROR.error);
                GET_THEN_ERROR.error = null;
            } else if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
            } else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
            } else {
                fulfill(promise, maybeThenable);
            }
        }
    }

    function resolve(promise, value) {
        if (promise === value) {
            reject(promise, selfFulfillment());
        } else if (objectOrFunction(value)) {
            handleMaybeThenable(promise, value, getThen(value));
        } else {
            fulfill(promise, value);
        }
    }

    function publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }

        publish(promise);
    }

    function fulfill(promise, value) {
        if (promise._state !== PENDING) {
            return;
        }

        promise._result = value;
        promise._state = FULFILLED;

        if (promise._subscribers.length !== 0) {
            asap(publish, promise);
        }
    }

    function reject(promise, reason) {
        if (promise._state !== PENDING) {
            return;
        }
        promise._state = REJECTED;
        promise._result = reason;

        asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers;
        var length = _subscribers.length;

        parent._onerror = null;

        _subscribers[length] = child;
        _subscribers[length + FULFILLED] = onFulfillment;
        _subscribers[length + REJECTED] = onRejection;

        if (length === 0 && parent._state) {
            asap(publish, parent);
        }
    }

    function publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;

        if (subscribers.length === 0) {
            return;
        }

        var child = undefined,
            callback = undefined,
            detail = promise._result;

        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];

            if (child) {
                invokeCallback(settled, child, callback, detail);
            } else {
                callback(detail);
            }
        }

        promise._subscribers.length = 0;
    }

    function ErrorObject() {
        this.error = null;
    }

    var TRY_CATCH_ERROR = new ErrorObject();

    function tryCatch(callback, detail) {
        // try {
            return callback(detail);
        // } catch (e) {
        //     TRY_CATCH_ERROR.error = e;
        //     return TRY_CATCH_ERROR;
        // }
    }

    function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback),
            value = undefined,
            error = undefined,
            succeeded = undefined,
            failed = undefined;

        if (hasCallback) {
            value = tryCatch(callback, detail);

            if (value === TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value.error = null;
            } else {
                succeeded = true;
            }

            if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
            }
        } else {
            value = detail;
            succeeded = true;
        }

        if (promise._state !== PENDING) {
            // noop
        } else if (hasCallback && succeeded) {
            resolve(promise, value);
        } else if (failed) {
            reject(promise, error);
        } else if (settled === FULFILLED) {
            fulfill(promise, value);
        } else if (settled === REJECTED) {
            reject(promise, value);
        }
    }

    function initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                resolve(promise, value);
            }, function rejectPromise(reason) {
                reject(promise, reason);
            });
        } catch (e) {
            reject(promise, e);
        }
    }

    var id = 0;
    function nextId() {
        return id++;
    }

    function makePromise(promise) {
        promise[PROMISE_ID] = id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
    }

    function Enumerator$1(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(noop);

        if (!this.promise[PROMISE_ID]) {
            makePromise(this.promise);
        }

        if (isArray(input)) {
            this.length = input.length;
            this._remaining = input.length;

            this._result = new Array(this.length);

            if (this.length === 0) {
                fulfill(this.promise, this._result);
            } else {
                this.length = this.length || 0;
                this._enumerate(input);
                if (this._remaining === 0) {
                    fulfill(this.promise, this._result);
                }
            }
        } else {
            reject(this.promise, validationError());
        }
    }

    function validationError() {
        return new Error('Array Methods must be provided an Array');
    }

    Enumerator$1.prototype._enumerate = function (input) {
        for (var i = 0; this._state === PENDING && i < input.length; i++) {
            this._eachEntry(input[i], i);
        }
    };

    Enumerator$1.prototype._eachEntry = function (entry, i) {
        var c = this._instanceConstructor;
        var resolve$$1 = c.resolve;

        if (resolve$$1 === resolve$1) {
            var _then = getThen(entry);

            if (_then === then && entry._state !== PENDING) {
                this._settledAt(entry._state, i, entry._result);
            } else if (typeof _then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
            } else if (c === Promise$2) {
                var promise = new c(noop);
                handleMaybeThenable(promise, entry, _then);
                this._willSettleAt(promise, i);
            } else {
                this._willSettleAt(new c(function (resolve$$1) {
                    return resolve$$1(entry);
                }), i);
            }
        } else {
            this._willSettleAt(resolve$$1(entry), i);
        }
    };

    Enumerator$1.prototype._settledAt = function (state, i, value) {
        var promise = this.promise;

        if (promise._state === PENDING) {
            this._remaining--;

            if (state === REJECTED) {
                reject(promise, value);
            } else {
                this._result[i] = value;
            }
        }

        if (this._remaining === 0) {
            fulfill(promise, this._result);
        }
    };

    Enumerator$1.prototype._willSettleAt = function (promise, i) {
        var enumerator = this;

        subscribe(promise, undefined, function (value) {
            return enumerator._settledAt(FULFILLED, i, value);
        }, function (reason) {
            return enumerator._settledAt(REJECTED, i, reason);
        });
    };

    /**
     @method all
     @static
     @param {Array} entries array of promises
     @param {String} label optional string for labeling the promise.
     Useful for tooling.
     @return {Promise} promise that is fulfilled when all `promises` have been
     fulfilled, or rejected if any of them become rejected.
     @static
     */
    function all$1(entries) {
        return new Enumerator$1(this, entries).promise;
    }

    /**
     @method race
     @static
     @param {Array} promises array of promises to observe
     Useful for tooling.
     @return {Promise} a promise which settles in the same way as the first passed
     promise to settle.
     */
    function race$1(entries) {
        /*jshint validthis:true */
        var Constructor = this;

        if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
            });
        } else {
            return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                    Constructor.resolve(entries[i]).then(resolve, reject);
                }
            });
        }
    }

    /**
     @method reject
     @static
     @param {Any} reason value that the returned promise will be rejected with.
     Useful for tooling.
     @return {Promise} a promise rejected with the given `reason`.
     */
    function reject$1(reason) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor(noop);
        reject(promise, reason);
        return promise;
    }

    function needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
     @class Promise
     @param {function} resolver
     Useful for tooling.
     @constructor
     */
    function Promise$2(resolver) {
        this[PROMISE_ID] = nextId();
        this._result = this._state = undefined;
        this._subscribers = [];

        if (noop !== resolver) {
            typeof resolver !== 'function' && needsResolver();
            this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
        }
    }

    Promise$2.all = all$1;
    Promise$2.race = race$1;
    Promise$2.resolve = resolve$1;
    Promise$2.reject = reject$1;
    Promise$2._setScheduler = setScheduler;
    Promise$2._setAsap = setAsap;
    Promise$2._asap = asap;

    Promise$2.prototype = {
        constructor: Promise$2,
        /*
         @method then
         @param {Function} onFulfilled
         @param {Function} onRejected
         Useful for tooling.
         @return {Promise}
         */
        then: then,

        /**
         @method catch
         @param {Function} onRejection
         Useful for tooling.
         @return {Promise}
         */
        'catch': function _catch(onRejection) {
            return this.then(null, onRejection);
        }
    };

    /*global self*/
    function polyfill$1() {
        var local = undefined;

        if (typeof global !== 'undefined') {
            local = global;
        } else if (typeof self !== 'undefined') {
            local = self;
        } else {
            try {
                local = Function('return this')();
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        var P = local.Promise;

        if (P) {
            var promiseToString = null;
            try {
                promiseToString = Object.prototype.toString.call(P.resolve());
            } catch (e) {
                // silently ignored
            }

            if (promiseToString === '[object Promise]' && !P.cast) {
                return;
            }
        }

        local.Promise = Promise$2;
    }

// Strange compat..
    Promise$2.polyfill = polyfill$1;
    Promise$2.Promise = Promise$2;

    return Promise$2;

};

var ES6Promise = promiseFun();
var Promise = ES6Promise.Promise;

var Deferred = function() {
    this.promise = new Promise((function(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }).bind(this));

    this.then = this.promise.then.bind(this.promise);
    this.catch = this.promise.catch.bind(this.promise);
};

Custom.getJSON = function (param) {
    if(!param.type){
        param.type = 'GET';
    }
    if(!param.dataType){
        param.dataType = 'json';
    }
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        //针对某些特定的版本的mozilla浏览器的BUG进行修正
        if(xhr.overrideMimeType){
            xhr.overrideMimeType("text/html");
        }
        xhr.open(param.type, param.url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'text';

        if(param.type.toUpperCase() == 'GET'){
            xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
        }
        if(param.type.toUpperCase() == 'POST'){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        xhr.send(param.data);
        function handler() {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    var results = this.responseText;
                    if(param.dataType == 'json' && typeof(results) == 'string'){
                        results = JSON.parse(results);
                    }
                    resolve(results);
                } else {
                    reject(new Error('getJSON: ' + param.url + ' failed with status: [' + this.status + ']'));
                }
            }
        };
    });
}


Custom.getParamJSON = function (param) {
    if(!param.type){
        param.type = 'GET';
    }
    if(!param.dataType){
        param.dataType = 'json';
    }

    var xhr = new XMLHttpRequest();
    var promise =  new Promise(function(resolve, reject){
        //针对某些特定的版本的mozilla浏览器的BUG进行修正
        if(xhr.overrideMimeType){
            xhr.overrideMimeType("text/html");
        }

        var timeout = 30000;
        var time = false;//是否超时
        var timer = setTimeout(function(){
            if(xhr.status != '200'){
                time = true;
                xhr.abort();//请求中止
            }
        },timeout);

        xhr.open(param.type, param.url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'text';
        if(param.type.toUpperCase() == 'GET'){
            xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
        }
        if(param.type.toUpperCase() == 'POST'){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.send(param.data);
        function handler() {
            if(time) {
                reject({param:param,data:'getParamJSON: ' + param.url + ' timeout'});
                return;//忽略中止请求
            }

            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    var results = this.responseText;
                    if(param.dataType == 'json' && typeof(results) == 'string'){
                        results = JSON.parse(results);
                    }
                    resolve({param:param,data:results});
                } else {
                    reject({param:param,data:'getParamJSON: ' + param.url + ' failed with status: [' + this.status + ']'});
                }
            }
        };
    });

    promise.xhr = xhr;
    return promise;
}
///<jscompress sourcefile="GLabelBox.js" />
/**
 * Class: GAnnoAvoid
 *  计算注记避让box类
 *
 * Inherits:
 *  - <Object>
 */
var GLabelBox = {
    boxDistance:0,
    setBox:function(features){
        var canvas = document.createElement('CANVAS');
        var ctx =  canvas.getContext('2d',{isQuality:true});
        features.forEach(function(f, index) {
            f.hidden =false;
            //去掉尾部的空格
            if(f.label && f.label.length >0){
                f.label = f.label.replace(/(\s*$)/g,"");
            }

            //如果要素不显示,没字就不画
            if(f.style.show == false){
                f.hidden =true;
                return;
            }
            if(f.type == 1){
                //构造点盒子
                this.setPointBox(f,ctx);
            }
            if(f.type == 2){
                //如果是线文本注记
                if(f.lineType == 'text'){
                    this.setTextLineBox(f,ctx);
                }

                //如果是线编码注记
                if(f.lineType == 'code') {
                    this.setCodeLineBox(f,ctx);
                }

                //如果是线箭头注记
                if(f.lineType == 'arrow') {
                    this.setArrowLineBox(f);
                }
            }
        }.bind(this));
        return this.filterFeature(features);
    },

    //构造点注记的boxs,上下左右四个方向
    setPointBox:function(feature,ctx){
        var style = feature.style;
        var currPara = {};

        var graphicWidth = style.graphicWidth;
        var graphicHeight = style.graphicHeight;

        //如果用户没有显示的给图标赋值宽高
        if(!graphicWidth || !graphicHeight){
            var textureKey = style.texture;
            var img = feature.textures[textureKey];
            if(img){
                graphicWidth = img.width;
                graphicHeight = img.height;
            }else{
                graphicWidth = 0;
                graphicHeight = 0;
            }
        }

        currPara.fontwidth = graphicWidth;
        currPara.fontheight = graphicHeight;

        //对要显示的点注记内容按照用户的转换函数进行转换
        if(style.labelFunction){
            var labelFunction = new Function("label", style.labelFunction);
            try{
                feature.label = labelFunction.call({}, feature.label);
            }catch (e){
                console.warn(feature.label + ': 调用labelFunction失败!');
            }
        }

        var labelIsNotNull = this.isNotNull(feature.label);
        //如既没有文字，又没有图标,则不显示
        if(!labelIsNotNull && (graphicWidth == 0  || graphicHeight == 0)){
            feature.hidden =true;
            return;
        }


        var tmpLabels = 0;
        //设置当前注记的宽度和高度
        //注记分行
        if(labelIsNotNull){
            //转换为字符串
            feature.label = feature.label +'';
            tmpLabels = feature.label.split(' ');
            var tmpLabelWidth=0;
            ctx.save();
            ctx.font = style.pointFillFont;
            for(var i = 0;i<tmpLabels.length;i++ ){
                var oneRowLabelWidth = ctx.measureText(tmpLabels[i]).width;
                tmpLabelWidth = oneRowLabelWidth > tmpLabelWidth?oneRowLabelWidth:tmpLabelWidth;
            }
            ctx.restore();
            //各行的最宽宽度
            currPara.fontwidth =  tmpLabelWidth;
            //文字的高度 * 文字的行数+  行间距
            currPara.fontheight = style.pointHeight *  tmpLabels.length  + 2*(tmpLabels.length -1);
            // 如果点符号高度（用点符号宽度代替）高于文字高度 则用点符号高度替换文字高度
            currPara.fontheight = currPara.fontheight> graphicHeight ? currPara.fontheight: graphicHeight;
        }

        //包括点图标的box,用于避让
        var pt = feature.datas[0][0];
        if(style.pointHashBackground != true){
            style.pointBackgroundGap = 0;
        }
        //如果有换行时，保证图标在换行文字的中间所需的高度差值
        var partHieght = 0;
        if(graphicHeight != 0 && graphicWidth !=0){
            partHieght = (currPara.fontheight - graphicHeight)*0.5;
        }else{
            style.graphicDistance = 0;
        }

        var rightBox = [ pt[0] - graphicWidth*0.5 ,
            pt[1] - style.pointBackgroundGap -partHieght,
            pt[0] +graphicWidth*0.5 +style.graphicDistance+ currPara.fontwidth + style.pointBackgroundGap*2,
            pt[1] +currPara.fontheight + style.pointBackgroundGap -partHieght];
        var leftBox = [pt[0] -graphicWidth*0.5 -style.graphicDistance- currPara.fontwidth - style.pointBackgroundGap*2,
            rightBox[1],pt[0] + graphicWidth*0.5,
            rightBox[3]];

        var bottomBox = [pt[0]-currPara.fontwidth*0.5-style.pointBackgroundGap,
            pt[1], pt[0]+currPara.fontwidth*0.5+style.pointBackgroundGap,
            pt[1]+graphicHeight + style.graphicDistance+style.pointBackgroundGap*2 +currPara.fontheight] ;

        var topBox = [bottomBox[0],pt[1]  -style.graphicDistance - style.pointBackgroundGap*2 - currPara.fontheight ,
            bottomBox[2],pt[1]+graphicHeight];


        rightBox = this.boxScale(rightBox,style.pointBoxDisance);
        leftBox = this.boxScale(leftBox,style.pointBoxDisance);
        bottomBox = this.boxScale(bottomBox,style.pointBoxDisance);
        topBox = this.boxScale(topBox,style.pointBoxDisance);
        var boxs = [rightBox,leftBox,bottomBox,topBox];
        if(!style.direction){
            style.direction = 0;
        }

        feature.boxs = boxs;
        feature.box = boxs[style.direction];


        //不包括点图标,用于文字绘制的起点坐标
        var rPoint = [pt[0] + graphicWidth*0.5 + style.graphicDistance + style.pointBackgroundGap,
            pt[1]-partHieght];
        var lPoint = [pt[0] -graphicWidth*0.5 - style.graphicDistance - style.pointBackgroundGap -currPara.fontwidth,
            pt[1]-partHieght];
        var bPoint = [pt[0]- currPara.fontwidth*0.5,
            pt[1] + style.graphicDistance + style.pointBackgroundGap + graphicHeight];
        var tPoint = [bPoint[0],
            pt[1]-style.graphicDistance-style.pointBackgroundGap - currPara.fontheight];
        var fourPoints = [rPoint ,lPoint  ,bPoint  ,tPoint ];
        feature.fourPoints = fourPoints;
        feature.style.textPoint = fourPoints[style.direction];
    },

    /**
     * 设置线文字的box
     *  Parameters :
     *  feature - 单个线注记要素
     */
    setTextLineBox:function(feature,ctx){
        var label = feature.label;
        var textPoints = feature.datas;
        if(textPoints.length == 0){
            feature.hidden = true;
            return;
        }

        var style = feature.style;
        //将分段的点数据和角度数据保留，留给后面绘制
        feature.textPoints = textPoints;
        //线的boxs
        var lineBoxs = [];
        //如果线注记带底色
        if(style.lineHashBackground == true || textPoints.length ==1){
            var p = textPoints[0][0];
            if(textPoints.length >1){
                //获取线段的中间点
                var index = Math.floor(label.length/2);
                p = textPoints[index][0];
            }

            ctx.save();
            ctx.font = style.lineFillFont;
            var w = ctx.measureText(feature.label).width;
            ctx.restore();

            var minX = p[0] - w/2 -style.lineBackgroundGap;
            var maxX =  p[0]+ w/2 +style.lineBackgroundGap;
            var minY = p[1] -style.lineBackgroundGap;
            var maxY = p[1]+style.lineHeight +style.lineBackgroundGap;
            var box = [minX,minY,maxX,maxY];
            this.boxScale(box,style.lineTextBoxDisance);
            lineBoxs.push(box);
        }else{
            //如果文字需要旋转
            if(style.lineTextRotate){
                for(var m = 0;m<textPoints.length;m++){
                    textPoints[m][1] = style.lineTextRotate;
                }
            }else{
                //如果文字注记旋转角度方向不一致(有的字向左，有的字向右旋转)，则调整为一致
                this.textToSameBearing(textPoints);
                //判断线文字之间的最大夹角是否大于指定的阈值
                if(this.isMessy(textPoints,style,label)){
                    feature.hidden = true;
                    return;
                }
            }

            //获取每个字的box,判断每个字之前是否有压盖
            var boxs = this.getLineBoxs(label,textPoints,style);
            if(boxs){
                lineBoxs =lineBoxs.concat(boxs);
            }else{
                feature.hidden = true;
                return;
            }
        }
        feature.boxs = lineBoxs;
    },

    /**
     * 设置线编码的box
     *  Parameters :
     *  feature - 单个线注记要素
     */
    setCodeLineBox:function(feature,ctx){
        var codePoints = feature.datas;
        if(codePoints.length == 0){
            feature.hidden = true;
            return;
        }

        var style = feature.style;
        //如果要显示道路编号
        var p = codePoints[0][0];

        ctx.save();
        ctx.font = feature.style.codeLineFillFont;
        var w = ctx.measureText(feature.label).width;
        ctx.restore();

        var minX = p[0] - w/2 -style.codeLineBackgroundGap;
        var maxX =  p[0]+ w/2 +style.codeLineBackgroundGap;
        var minY = p[1] -style.codeLineBackgroundGap;
        var maxY = p[1]+style.codeLineHeight +style.codeLineBackgroundGap;
        var box = [minX,minY,maxX,maxY];
        this.boxScale(box,style.lineCodeBoxDisance);
        feature.boxs = [box];
        feature.codePoint = p;
    },


    /**
     * 设置线箭头的box
     *  Parameters :
     *  feature - 单个线注记要素
     */
    setArrowLineBox:function(feature){
        var arrowPoints = feature.datas;
        if(arrowPoints.length != 2){
            feature.hidden = true;
            return;
        }

        var p = arrowPoints[0][0];
        var p1 = arrowPoints[1][0];

        var minX = p[0]<p1[0]?p[0]:p1[0];
        var maxX = p[0]>p1[0]?p[0]:p1[0];
        var minY = p[1]<p1[1]?p[1]:p1[1];
        var maxY = p[1]>p1[1]?p[1]:p1[1];
        var box = [minX,minY,maxX,maxY];
        this.boxScale(box,feature.style.lineArrowBoxDisance);
        feature.boxs = [box];
        feature.arrowPoint = arrowPoints;
    },

    // 获取过滤后的要素.
    filterFeature:function(features){
        var returnFeatures = [];
        //剔除需避让的要素
        for(var i= 0 ;i<features.length;i++){
            if(!features[i].hidden ) {
                returnFeatures.push(features[i]);
            }
        }
        return returnFeatures;
    },
    /**
     * 判断文本是否不为空
     *  Parameters :
     *  label - 要显示的文本
     *
     */
    isNotNull:function(label){
        if(!label && label !=0){
            return false;
        }

        //如果是字符串
        if(typeof(label) == 'string'){
            label = label.toLowerCase();
            if(label == ''|| label == 'undefined' || label == 'null'){
                return false;
            }
        }
        return true;
    },

    /**
     * 判断线文字之间的最大夹角是否大于指定的阈值
     *  Parameters :
     * textPoints - 文本注记的线段数组
     *  style -要素的样式
     */
    isMessy:function(textPoints,style,label){
        var firstPoint = textPoints[0][0];
        var minX = firstPoint[0];
        var minY = firstPoint[1];
        var maxX = firstPoint[0];
        var maxY = firstPoint[1];

        var minAngle = textPoints[0][1];
        var maxAngle = textPoints[0][1];
        for(var i = 0;i<label.length;i++){
            var currPoint = textPoints[i][0];
            var currAngle = textPoints[i][1];
            if(currPoint[0]>maxX)   // 判断最大值
                maxX=currPoint[0];
            if(currPoint[0]<minX)   // 判断最小值
                minX=currPoint[0];

            if(currPoint[1]>maxY)   // 判断最大值
                maxY=currPoint[1];
            if(currPoint[1]<minY)   // 判断最小值
                minY=currPoint[1];

            if(currAngle>maxAngle)   // 判断最大值
                maxAngle=currAngle;
            if(currAngle<minAngle)   // 判断最小值
                minAngle=currAngle;
        }

        //如果文字之间，相差的最大角度大于配置的角度度则不画
        if(maxAngle -minAngle > style.angle){
            if(style.angleSwitch ==false  && style.angleColor){
                style.lineFillStyle = style.angleColor;
            }else{
                return true;
            }
        }
        return false;
    },

    /**
     * 检测线文字之间是否有自压盖
     *  Parameters :
     * boxs -
     *  style -要素的样式
     */
    getLineBoxs:function(label,textPoints,style){
        //和其它注记避让的boxs
        var boxs = [];
        //自相交避让的boxs
        var owmCrashBoxs = [];
        for(var i = 0;i<label.length;i++){
            var pt = textPoints[i][0];
            //考虑到线文字注记有角度偏转，box统一增加1.2倍
            var labelBox = [pt[0]-(style.lineHeight*1.2)*0.5,pt[1],pt[0]+(style.lineHeight*1.2)*0.5,pt[1]+style.lineHeight*1.2];
            this.boxScale(labelBox,style.lineTextBoxDisance);
            var owmCrashBox = [pt[0]-style.lineHeight*0.5,pt[1],pt[0]+style.lineHeight*0.5,pt[1]+style.lineHeight];
            owmCrashBoxs.push(owmCrashBox);
            boxs.push(labelBox);
        }

        for(var j = 0;j<owmCrashBoxs.length-1;j++){
            var box1 = owmCrashBoxs[j];
            for(var k=j+1 ;k<owmCrashBoxs.length ;k++){
                var box2 = owmCrashBoxs[k];
                if(this.crashBox(box1,box2)){
                    return null;
                }
            }
        }
        return boxs;
    },

    // 两个盒子是否相交.
    crashBox :function(ibox,jbox){
        return ibox[0] <= jbox[2] &&
            ibox[2]  >= jbox[0] &&
            ibox[1]  <= jbox[3] &&
            ibox[3]  >= jbox[1] ;
    },

    boxScale:function(box,pointBoxDisance){
        if(!pointBoxDisance){
            pointBoxDisance = this.boxDistance;
        }

        box[0] = box[0]-pointBoxDisance*0.5;
        box[1] = box[1]-pointBoxDisance*0.5;
        box[2] = box[2]+pointBoxDisance*0.5;
        box[3] = box[3]+pointBoxDisance*0.5;
        return box;
    },

    /**
     * 如果文字注记旋转角度方向不一致(有的字向左，有的字向右旋转)，则调整为一致
     * @param textPoints
     */
    textToSameBearing:function(textPoints){
        var map = {};
        for(var i = 0;i<textPoints.length-2;i++){
            var p1 = textPoints[i][1];
            var p2 = textPoints[i+1][1];
            if(p1 -p2 >= 45){
                textPoints[i+1][1] = p2 + 90;
            }

            if(p1 -p2 <= -45){
                textPoints[i+1][1] = p2 - 90;
            }
        }
    }
}
///<jscompress sourcefile="GGridIndex.js" />
'use strict';

// module.exports = GGridIndex;

var NUM_PARAMS = 3;

function GGridIndex(extent, n, padding) {
    var cells = this.cells = [];

    if (extent instanceof ArrayBuffer) {
        this.arrayBuffer = extent;
        var array = new Int32Array(this.arrayBuffer);
        extent = array[0];
        n = array[1];
        padding = array[2];

        this.d = n + 2 * padding;
        for (var k = 0; k < this.d * this.d; k++) {
            var start = array[NUM_PARAMS + k];
            var end = array[NUM_PARAMS + k + 1];
            cells.push(start === end ?
                    null :
                    array.subarray(start, end));
        }
        var keysOffset = array[NUM_PARAMS + cells.length];
        var bboxesOffset = array[NUM_PARAMS + cells.length + 1];
        this.keys = array.subarray(keysOffset, bboxesOffset);
        this.bboxes = array.subarray(bboxesOffset);

        this.insert = this._insertReadonly;

    } else {
        this.d = n + 2 * padding;
        for (var i = 0; i < this.d * this.d; i++) {
            cells.push([]);
        }
        this.keys = [];
        this.bboxes = [];
    }

    this.n = n;
    this.extent = extent;
    this.padding = padding;
    this.scale = n / extent;
    this.uid = 0;

    var p = (padding / n) * extent;
    this.min = -p;
    this.max = extent + p;
}


GGridIndex.prototype.insert = function(key, x1, y1, x2, y2) {
    this._forEachCell(x1, y1, x2, y2, this._insertCell, this.uid++);
    this.keys.push(key);
    this.bboxes.push(x1);
    this.bboxes.push(y1);
    this.bboxes.push(x2);
    this.bboxes.push(y2);
};

GGridIndex.prototype._insertReadonly = function() {
    throw 'Cannot insert into a GridIndex created from an ArrayBuffer.';
};

GGridIndex.prototype._insertCell = function(x1, y1, x2, y2, cellIndex, uid) {
    this.cells[cellIndex].push(uid);
};

GGridIndex.prototype.query = function(x1, y1, x2, y2) {
    var min = this.min;
    var max = this.max;
    if (x1 <= min && y1 <= min && max <= x2 && max <= y2) {
        // We use `Array#slice` because `this.keys` may be a `Int32Array` and
        // some browsers (Safari and IE) do not support `TypedArray#slice`
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice#Browser_compatibility
        return Array.prototype.slice.call(this.keys);

    } else {
        var result = [];
        var seenUids = {};
        this._forEachCell(x1, y1, x2, y2, this._queryCell, result, seenUids);
        return result;
    }
};

GGridIndex.prototype._queryCell = function(x1, y1, x2, y2, cellIndex, result, seenUids) {
    var cell = this.cells[cellIndex];
    if (cell !== null) {
        var keys = this.keys;
        var bboxes = this.bboxes;
        for (var u = 0; u < cell.length; u++) {
            var uid = cell[u];
            if (seenUids[uid] === undefined) {
                var offset = uid * 4;
                if ((x1 <= bboxes[offset + 2]) &&
                    (y1 <= bboxes[offset + 3]) &&
                    (x2 >= bboxes[offset + 0]) &&
                    (y2 >= bboxes[offset + 1])) {
                    seenUids[uid] = true;
                    result.push(keys[uid]);
                } else {
                    seenUids[uid] = false;
                }
            }
        }
    }
};

GGridIndex.prototype._forEachCell = function(x1, y1, x2, y2, fn, arg1, arg2) {
    var cx1 = this._convertToCellCoord(x1);
    var cy1 = this._convertToCellCoord(y1);
    var cx2 = this._convertToCellCoord(x2);
    var cy2 = this._convertToCellCoord(y2);
    for (var x = cx1; x <= cx2; x++) {
        for (var y = cy1; y <= cy2; y++) {
            var cellIndex = this.d * y + x;
            if (fn.call(this, x1, y1, x2, y2, cellIndex, arg1, arg2)) return;
        }
    }
};

GGridIndex.prototype._convertToCellCoord = function(x) {
    return Math.max(0, Math.min(this.d - 1, Math.floor(x * this.scale) + this.padding));
};

GGridIndex.prototype.toArrayBuffer = function() {
    if (this.arrayBuffer) return this.arrayBuffer;

    var cells = this.cells;

    var metadataLength = NUM_PARAMS + this.cells.length + 1 + 1;
    var totalCellLength = 0;
    for (var i = 0; i < this.cells.length; i++) {
        totalCellLength += this.cells[i].length;
    }

    var array = new Int32Array(metadataLength + totalCellLength + this.keys.length + this.bboxes.length);
    array[0] = this.extent;
    array[1] = this.n;
    array[2] = this.padding;

    var offset = metadataLength;
    for (var k = 0; k < cells.length; k++) {
        var cell = cells[k];
        array[NUM_PARAMS + k] = offset;
        array.set(cell, offset);
        offset += cell.length;
    }

    array[NUM_PARAMS + cells.length] = offset;
    array.set(this.keys, offset);
    offset += this.keys.length;

    array[NUM_PARAMS + cells.length + 1] = offset;
    array.set(this.bboxes, offset);
    offset += this.bboxes.length;

    return array.buffer;
};

///<jscompress sourcefile="Cache.js" />
/**
 * Created by kongjian on 2018/6/12.
 * 注记瓦片队列缓存工具类
 */
Custom.Cache = function(size){
    this.size = size;
    this.map = {};
    this.list = [];

    //往缓存中加入数据
    this.push = function(key,item){
        if(this.list.length>this.size-1){
            var removeKey = this.list.shift();
            delete this.map[removeKey];
        }
        this.list.push(key);
        this.map[key] = item;
    }

    //获取缓存数据
    this.getItem = function(key){
        return this.map[key];
    }

    //清空缓存
    this.clean = function(){
        this.map = {};
        this.list = [];
    }

    //获取缓存的长度
    this.length = function(){
        return this.list.length;
    }


}
///<jscompress sourcefile="CRS.CustomEPSG4326.js" />
/*
 * @namespace CRS
 * @crs L.CRS.EPSG4326
 *
 * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
 *
 * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
 * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
 * with this CRS, ensure that there are two 256x256 pixel tiles covering the
 * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
 * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
 */

L.CRS.CustomEPSG4326 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:4326',
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5),
    scale: function (zoom) {
        return 256 * Math.pow(2, zoom-1);
    }
});

///<jscompress sourcefile="DataSource.js" />
/**
 * Created by kongjian on 2017/6/30.
 */
Custom.DataSource = function() {
    //数据源id
    this.id = new UUID().valueOf();
    //数据源类型
    this.type = "";
    //key为文件名，value为image对象
    this.textures = {};
};
///<jscompress sourcefile="LocalDataSource.js" />
/**
 * Created by kongjian on 2017/6/30.
 */
Custom.LocalDataSource = function() {
    //继承DataSource
    Custom.DataSource.apply(this);
    //数据源类型
    this.type = 'LocalDataSource';
    //本地要素集合
    this.features = [];
    //图标url Map：{name:1.png,value:'http://localhost:8080/mapserver/1.png'}
    this.textureUrls = {};

    /**
     * 添加feature
     * Parameters :
     * feature
     */
    this.addFeature = function(feature){
        this.features.push(feature);
    };

    /**
     * 添加url图标
     * Parameters :
     * name 图标名称,如：1.png
     * url 图标的请求地址
     */
    this.addTextureUrl = function(name,url){
        this.textureUrls[name] = url;
    };

    /**
     * 移除url图标
     * Parameters :
     * name 图标名称,如：1.png
     */
    this.removeTextureUrl = function(name){
       delete this.textureUrls[name];
    };

    /**
     * 加载纹理
     */
    this.loadTexture = function(){
        var def = new Deferred();
        var totalCount = 0;
        for(var i in this.textureUrls){
            totalCount++;
        }

        if(totalCount == 0){
            def.resolve();
            return;
        }

        var count = 0;
        for(var key in this.textureUrls){
            var img = new Image();
            img.name = key;
            img.onload = function(data) {
                count++;
                var name = data.target.name;
                this.textures[name] =data.target;
                if(count == totalCount){
                    def.resolve();
                }
            }.bind(this);
            img.src = this.textureUrls[key];
        }
        return def;
    };

    /**
     * 通过featureId移除feature
     * Parameters :
     * featureId
     */
    this.removeFeatureById = function(featureId){
        for(var i = 0;i<this.features.length;i++){
            var feature = this.features[i];
            if(feature.id == featureId){
                this.features.splice(i,1);
            }
        }
    }

};
///<jscompress sourcefile="URLDataSource.js" />
/**
 * Created by kongjian on 2017/6/30.
 */
Custom.URLDataSource = function() {
    //继承DataSource
    Custom.DataSource.apply(this);
    //多个服务器url的域名，用于解决一个域名只有6条请求管线的限制
    this.urlArray=[];
    //数据源类型
    this.type = 'URLDataSource';
    //注记数据的请求url
    this.url = null;
    //样式文件的请求接口url
    this.styleUrl = null;
    //样式文件Id
    this.styleId = 'style';
    //过滤条件
    this.filter = null;
    //纹理
    this.textures = {};
    //过滤条件字符
    this.control = null;
    //过滤的id
    this.controlId = null;
    // 不带过滤条件的url
    var sourceUrl = null;
    //域名
    this.host = '';
    //服务名
    this.servername = '';

    /**
     * 加载样式文件和纹理数据
     */
    this.loadStyle = function(styleType){
        var def0 = new Deferred();
        var def1 = new Deferred();
        var def2 = new Deferred();

        //解析url，获取servername,styleId
        this.parseUrl();

        if(!sourceUrl){
            sourceUrl = this.url +'&clientVersion='+Custom.Version;
            this.url = this.url +'&clientVersion='+Custom.Version;
        }

        if(this.control && this.isIE()){
            //设置过滤条件
            Custom.getJSON({type:'post',url:this.host + '/mapserver/vmap/'+this.servername+'/setControl',
                data:'control='+this.control,
                dataType:'json'})
                .then(function(result) {
                    this.controlId = result.id;
                    this.url = sourceUrl + '&controlId='+result.id;
                    def0.resolve();
                }.bind(this));
        }else{
            if(this.control){
                this.url = sourceUrl + '&control='+this.control;
            }else{
                this.url = sourceUrl;
            }
            def0.resolve();
        }

        if(!styleType){
            styleType = 'label';
        }

        //请求样式文件
        Custom.getJSON({url:this.host + '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/'+styleType+'/style.js',dataType:'text'})
            .then(function(result) {
                this.styleFun = new Function("drawer","level", result);
                def1.resolve();
        }.bind(this));

        //请求图标纹理
        Custom.getJSON({url:this.host+ '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/label/texture.js',dataType:'text'}).then(function(result){
            var textures = JSON.parse(result);
            var totalCount = 0;
            for(var i in textures){
                totalCount++;
            }

            if(totalCount == 0){
                def2.resolve();
                return;
            }

            var count = 0;
            for(var key in textures){
                var img = new Image();
                img.name = key;
                 img.onload = function(data) {
                    count++;
                    var name = data.target.name;
                    this.textures[name] =data.target;
                    if(count == totalCount){
                        def2.resolve();
                    }
                }.bind(this);
                img.src = textures[key];
            }
        }.bind(this));

       return [def0,def1,def2];
    }

    /**
     * 解析url
     */
    this.parseUrl = function(){
        var urlParts = this.url.split('?');
        var urlPartOne = urlParts[0].split('/mapserver/');
        this.host = urlPartOne[0];
        this.servername = urlPartOne[1].split('/')[1];
        var params = urlParts[1].split('&');
        for(var i = 0;i<params.length;i++){
            var param = params[i];
            var keyValue = param.split('=');
            if(keyValue[0] == 'styleId'){
                this.styleId = keyValue[1];
                return;
            }
        }
    };


    /**
     * 设置过滤条件
     */
    this.setFilter = function(filter){
        this.control = null;
        if(!this.url ||  !filter || (filter.layers.length == 0 && filter.order.length == 0)){
            return;
        }

        for(var i = 0;i<filter.layers.length;i++){
            var filterLayer = filter.layers[i];
            if(!filterLayer.id){
                filter.layers.splice(i,1);
            }
        }

        this.control = JSON.stringify(filter);
    }

    this.getTexture = function(key) {
        return this.textures[key];
    }
    this.addTexture = function(key,texture) {
        this.textures[key] = texture;
    }


    /**
     * 是否为ie浏览器
     */
    this.isIE = function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    };
};
///<jscompress sourcefile="Filter.js" />
/**
 * Created by kongjian on 2017/6/30.
 */
Custom.Filter = function(){
    //该值为ture时，后面的layers是全部要显示的，如果为false，后面的layers全部不显示,顶替上面的cmdAll
    this.otherDisplay = true;
    //图层集合
    this.layers = [];
    //里面存放layerName，最终渲染的图层顺序以该图层存放的顺序为准，如果为空数组，则以样式文件中的顺序为准. 注记图层，该属性会被忽略
    this.order = [];

    /**
     * 添加过滤图层
     * Parameters :
     * filterLayer - 过滤图层
     */
   this.addFilterLayer = function(filterLayer){
        this.layers.push(filterLayer);
    }

    /**
     * 移除过滤图层
     * Parameters :
     * filterLayerId - 过滤图层ID
     */
    this.removeFilterLayerById = function(filterLayerId){
        for(var i = 0;i<this.layers.length;i++){
            if(this.layers[i].id == filterLayerId){
                this.layers.splice(i,1);
            }
        }
    }
}
///<jscompress sourcefile="FilterLayer.js" />
/**
 * Created by kongjian on 2017/6/30.
 */
Custom.FilterLayer = function(){
    //过滤图层的唯一标识
    this.id = null;
    //过滤条件
    this.filters = {};
    //过滤数据的唯一id标识
    this.idFilter = null;
    //过滤字符串,与制图系统中的过滤字符串一致，如果同时也有filters，服务会优先使用filterStr
    this.filterStr = null;
    //是否显示
    this.display = true;

    /**
     * 添加字段过滤条件
     * Parameters :
     * key - 如： Q_fcode_S_EQ，表示fcode等于value的值
     * value - 如：2101010500
     */
   this.addFilterField = function(key,value){
        this.filters[key] = value;
    }

    /**
     * 添加字段过滤条件
     * Parameters :
     * key
     */
    this.removeFilterField = function(key){
        delete this.filters[key];
    }
}
///<jscompress sourcefile="GAnnoAvoid.js" />
/**
 * Class: GAnnoAvoid
 * 避让策略类
 *
 * Inherits:
 *  - <Object>
 */
var GAnnoAvoid = {
    grid:null,

    //避让
    defaultAvoid:function(features,hasImportant){
        this.grid = new GGridIndex(8192, 16, 0);
        if(features== null || features.length<1) return [];

        //设置box,如果有线编码或者线箭头，则会新增要素
        features = GLabelBox.setBox(features);

        //权值排序
        this.sort(features,hasImportant);

        //将注记添加到单元格中，进行避让
        for(var i =0;i<features.length;i++){
            this.avoidFeature(features[i]);
        }
        features = GLabelBox.filterFeature(features);
        //注记去重
        this.removeRepeat(features);
        var features = this.filterFeature(features);
        this.prevFeatures = features;
        return features;
    },

    /**
     * 给要素设置避让的box和注记的绘制坐标
     * @param f
     */
    avoidFeature:function(f){
        if(f.style.show == false || f.hidden == true){
            f.hidden =true;
            return;
        }
        if(f.boxs){
            if(f.type == 1){
                //点注记跟其它注记避让
                this.avoidPoint(f);
            }else{
                //线注记跟其它注记进行避让
                this.avoidLine(f);
            }
        }else{
            f.hidden = true;
        }
    },

    /**
     * 将点注记加入到计算出的多个单元格中
     * @param feature
     */
    avoidPoint:function(feature){
        if(feature.style.isImportant == true){
            var box = feature.boxs[feature.style.direction];
            this.addBoxToCells(feature.primaryId,box);
            return;
        }

        //如果前面有小图标，并且开启了四宫格避让
        if(feature.style.isFourDirections && feature.style.texture){
            this.addFourCollisionFeatureToCells(feature,feature.style.direction);
        }else{
            var box = feature.boxs[feature.style.direction];
            var isCollision = this.isCollision(box);
            if(isCollision){
                feature.hidden = true;
                return;
            }else{
                this.addBoxToCells(feature.primaryId,box);
            }
        }
    },

    /**
     * 将线注记加入到计算出的多个单元格中
     * @param feature
     */
    avoidLine:function(feature){
        // for(var i = 0 ;i<feature.boxs.length;i++){
        //     var box = feature.boxs[i];
        //     this.addBoxToCells(feature.primaryId+'index_'+i,box);
        // }
        // return;


        //线注记是否与其它注记相交
        var isCollision = false;
        for(var i = 0 ;i<feature.boxs.length;i++){
            var box = feature.boxs[i];
            if(this.isCollision(box)){
                isCollision = true;
                break;
            }
        }

        if(isCollision){
            feature.hidden = true;
        }else{
            for(var i = 0 ;i<feature.boxs.length;i++){
                var box = feature.boxs[i];
                this.addBoxToCells(feature.primaryId+'index_'+i,box);
            }
        }
    },

    /**
     * 将点注记添加到单元格中
     * @param feature 点注记
     * @param index 点注记四宫格的index
     */
    addFourCollisionFeatureToCells:function(feature,index){
        var box = feature.boxs[index];
        var isCollision = this.isCollision(box);
        // 如果相交,进行四宫格避让
        if(isCollision){
            index ++;
            if(index == 4){
                index = index - 4;
            }

            //四个方向全部避让完成，仍然相交
            if(index == feature.style.direction){
                feature.hidden = true;
                return;
            }else{
                //换个点注记方向的box，再进行递归避让检测
                this.addFourCollisionFeatureToCells(feature,index);
            }
        }else{
            feature.style.textPoint =feature.fourPoints[index];
            this.addBoxToCells(feature.primaryId,box);
        }
    },


    /**
     *  返回注记的box是否与其它注记相交
     * @param row
     * @param col
     * @param feature
     */
    isCollision:function(box){
        var x1 = box[0];
        var y1 = box[1];

        var x2 = box[2];
        var y2 = box[3];
        var result = this.grid.query(x1,y1,x2,y2);
        return result.length>0;
    },

    /**
     *  注记box所占的单元格标识为true
     */
    addBoxToCells:function(key,box){
        var x1 = box[0];
        var y1 = box[1];
        var x2 = box[2];
        var y2 = box[3];
        this.grid.insert(key,x1,y1,x2,y2);
    },

    /**
     * 求两点之间的距离
     */
    getDistance:function(p1,p2){
        var calX = p2[0] - p1[0];
        var calY = p2[1] - p1[1];
       return Math.pow((calX *calX + calY * calY), 0.5);
    },

    /**
     * 获取线的长度
     */
    getLineDistance:function(line){
        if(line.length <4){
            return 0;
        }

        var dis = 0;
        for(var i = 0;i<line.length/2-1;i++){
            var p1 = [line[2*i],line[2*i+1]];
            var p2 = [line[2*(i+1)],line[2*(i+1)+1]];
            dis = dis + this.getDistance(p1,p2);
        }
        return dis;
    },

    /**
     * 已知两点，延长距离，获取延长线上的点坐标
     */
    getPoint:function(p1,p2,d){
        var xab = p2[0] - p1[0];
        var yab = p2[1] - p1[1];
        var xd = p2[0];
        var yd = p2[1];
        if(xab == 0){
            if(yab > 0){
                yd = p2[1] + d;
            }else{
                yd = p2[1] - d;
            }
        }else{
            var xbd = Math.sqrt((d * d)/((yab/xab) * (yab/xab) + 1));
            if (xab < 0) {
                xbd = -xbd
            }

            xd = p2[0] + xbd;
            yd = p2[1] + yab / xab * xbd;
        }
        return [xd,yd];
    },

    cutLineFeature:function(feature){
        var fs = [];
        var index = 0;

        var lineText = this.createLineTextFeatrue(feature,index);
        index = lineText.index;
        if(lineText.feature){
            fs.push(lineText.feature);
        }

        var lineCode= this.createLineCodeFeatrue(feature,index);
        index = lineCode.index;
        if(lineCode.feature){
            fs.push(lineCode.feature);
        }

        var lineArrow= this.createLineArrowFeatrue(feature,index);
        if(lineArrow.feature){
            fs.push(lineArrow.feature);
        }
        return fs;
    },

    /**
     * 创建线文字注记
     *  Parameters :
     *  feature
     *  index - 可用的line的index位置
     */
    createLineTextFeatrue:function(feature,index){
        var style = feature.style;
        var line = feature.sourceData;
        var d = new GDistance();
        var gaps = [];
        var textFeature =null;


        if(GLabelBox.isNotNull(feature.label)) {
                //获取线段长度
                var lineDis = this.getLineDistance(line);
                //如果线段长度小于100个像素,则只取首尾两个点
                if(lineDis < 100 && lineDis >0){
                    line = [line[0],line[1],line[line.length-2],line[line.length-1]];
                }

                //线注记的文字内容
                feature.label = feature.label+ '';
                //多切一个字的宽度，防止文字方向反转时，线段不够长
                for (var count = 0; count < feature.label.length + 1; count++) {
                    gaps.push(style.lineHeight*1.2 +2+ style.gap);
                }

                var cloneGaps = [].concat(gaps);
                var points = d.getNodePath(line, gaps);
                var textPoints = points.pointList;

                if(textPoints.length > 0){
                    index = points.index;
                    //改变方向
                    //判断是否应该换方向
                    var showChanged = this.isChangeDirection(feature.label,[line[0], line[1]], textPoints[textPoints.length - 1][0]);
                    if (showChanged) {
                        textPoints = this.changeDirection(line, textPoints, cloneGaps,index);
                    }

                    textFeature =  this.cloneFeature(feature);
                    textFeature.sourceAngleData = textPoints;
                    textFeature.lineType = 'text';

                    //如果文字放不下，则增加延长线
                    if(textPoints.length < feature.label.length){
                        this.delayTextPoint(line,textPoints,feature.label,style.chinaLabelWidth + style.gap);
                    }
                }else{
                    if(!style.showRoadCode){
                        textFeature =  this.cloneFeature(feature);
                        textFeature.sourceAngleData = [[[line[0],line[1]],0]];
                        textFeature.lineType = 'text';
                        index =2;
                    }
                }
            }
        return {feature:textFeature,index:index};
    },

    /**
     * 创建线编码注记
     *  Parameters :
     *  feature
     *  index - 可用的line的index位置
     */
    createLineCodeFeatrue:function(feature,index){
        var style = feature.style;
        var line = feature.sourceData;
        var d = new GDistance();
        var gaps = [];
        var codeFeature =null;

        var roadLabel = feature.attributes[style.roadCodeLabel];
        //如果有道路编码
        if(style.showRoadCode && GLabelBox.isNotNull(roadLabel) && index < line.length){
            var codeLine = line.slice(index,line.length -1);
            //默认是30个像素
            gaps.push(30);
            var cPoints = d.getNodePath(codeLine, gaps);
            var codePoints = cPoints.pointList;
            if(codePoints.length  == 1){
                index = index + cPoints.index;
                codeFeature =  this.cloneFeature(feature);
                codeFeature.sourceAngleData = codePoints;
                codeFeature.lineType = 'code';
                codeFeature.label = roadLabel+'';
            }

            if(codePoints.length ==0){
                codeFeature =  this.cloneFeature(feature);
                codeFeature.sourceAngleData = [[line,0]];
                codeFeature.lineType = 'code';
                codeFeature.label = roadLabel+'';
                index = 2;
                return {feature:codeFeature,index:index};
            }
        }
        return {feature:codeFeature,index:index};
    },

    /**
     * 创建线箭头注记
     *  Parameters :
     *  feature
     *  index - 可用的line的index位置
     */
    createLineArrowFeatrue:function(feature,index){
        var style = feature.style;
        var line = feature.sourceData;
        var d = new GDistance();
        var gaps = [];
        var arrowFeature =null;

        //如果有箭头
        if(style.showArrow && index < line.length){
            var arrowLine = line.slice(index,line.length -1);
            gaps.push(16);
            gaps.push(16);
            var aPoints = d.getNodePath(arrowLine, gaps);
            var arrowPoints = aPoints.pointList;

            if(arrowPoints.length == 2){
                arrowFeature =  this.cloneFeature(feature);
                arrowFeature.sourceAngleData = arrowPoints;
                arrowFeature.lineType = 'arrow';
            }
        }
        return {feature:arrowFeature,index:index};
    },

    /**
     * 当线文字放不下时，获取延长线上的点
     *  Parameters :
     *  line - 原始线坐标
     *  textPoints - 切割之后的点坐标
     *  label - 线注记
     *  gap - 每个字之间的间隔
     *  showChanged
     *
     */
    delayTextPoint:function(line,textPoints,label,gap,showChanged){
        var fristPoint = null;
        var secondPoint = null;
        //如果只能放下一个字
        if(textPoints.length == 1){
            if(showChanged){
                fristPoint = [line[line.length -2],line[line.length -1]];
            }
            fristPoint = [line[0],line[1]];
        }else{
            fristPoint = textPoints[textPoints.length-2][0];
        }
        secondPoint = textPoints[textPoints.length-1][0];
        var angle = textPoints[textPoints.length-1][1];

        var len = textPoints.length;
        for(var i = 1;i<label.length - len +1;i++){
            var p = this.getPoint(fristPoint,secondPoint,gap*i);
            var textPoint = [p,angle];
            textPoints.push(textPoint);
        }
    },


    /**
     * 克隆feature
     *  Parameters :
     *  feature - 单个线注记要素
     */
    cloneFeature:function(feature){
        return {type:feature.type,datas:feature.datas,sourceData:feature.sourceData,label:feature.label,
            attributes:feature.attributes,style:feature.style,textures:feature.textures,xyz:feature.xyz,
            lineType:feature.lineType};
    },

    /**
     *  改变文本线段的方向
     *  Parameters :
     *  line - 原始线数据
     *  textPoints - 未改方向前的文本线段数组
     *  gaps - 要切割的线段的数据间距
     *  index - 文本在原始线段中，能写到line的那个index索引位置
     */
    changeDirection:function(line,textPoints,gaps,index){
        //判断是否应该换方向
        index = index >=line.length? line.length:index;
        var textLine = line.slice(0,index);
        var linePoint = [];
        for(var i = 0;i<textLine.length-1;i++){
            linePoint.push([textLine[i],textLine[i+1]]);
            i++;
        }
        linePoint = linePoint.reverse();

        var lastPoint = textPoints[textPoints.length -1][0];
        textLine = [lastPoint[0],lastPoint[1]];
        for(var j = 0;j<linePoint.length;j++){
            textLine.push(linePoint[j][0]);
            textLine.push(linePoint[j][1]);
        }
        var d = new GDistance();
        textPoints = d.getNodePath(textLine,gaps).pointList;
        return textPoints;
    },


    /**
     * 是否需要改变线的方向
     *  Parameters :
     *  p1 - 线段起点
     *  p2 -线段的重点
     */
    isChangeDirection:function(label,p1,p2){
        var showChange = false;
        //判断是否包含汉字
        if(/.*[\u4e00-\u9fa5]+.*$/.test(label)) {
            //优先文字从上往下排
            if(p1[1]>p2[1]){
                showChange = true;
            }
            //如果是水平线
            if(p1[1] == p2[1]){
                if(p1[0] > p2[0]){
                    showChange = true;
                }
            }

            //获取两点连线与y轴的夹角
            var angle = this.getAngle(p1,p2);
            //如果是反斜线，并且夹角与x轴的夹角小于40度
            if(angle>-40 && angle<0 ){
                if(p1[1]<p2[1]){
                    showChange = true;
                }else{
                    showChange = false;
                }
            }
        }else{
            if(p1[0] > p2[0]){
                showChange = true;
            }
        }
        return showChange;
    },

    //获取两点连线与y轴的夹角
    getAngle :function( p1,p2){
        if(p2[0]-p1[0] == 0){
            if(p2[1]>p1[0]){
                return 90;
            }else{
                return -90;
            }
        }
        var k = (p2[1]-p1[1])/(p2[0]-p1[0]);
        var angle = 360*Math.atan(k)/(2*Math.PI);
        return angle;
    },


    //要素排序.
    sort:function(features,hasImportant){
        if(features.length > 0) {
            //从大到少排序
            return  features.sort(function (a, b) {
                if(hasImportant){
                    if(a.style.isImportant && !b.style.isImportant){
                        return -1;
                    }
                    if(b.style.isImportant && !a.style.isImportant){
                        return 1;
                    }
                }

                var aAttr = a.attributes[a.style.avoidField];
                var bAttr = b.attributes[b.style.avoidField];

                var aId = a.primaryId;
                var bId = b.primaryId;


                if(!aAttr){
                    aAttr = -1;
                }
                if(!bAttr){
                    bAttr = -1;
                }
                if (aAttr < bAttr) {
                    return 1;
                } else if (aAttr == bAttr){
                    if(aId < bId){
                        return 1;
                    }else if(aId ==  bId){
                        if(hasImportant) {
                            if (a.style.isImportant && b.style.isImportant) {
                                a.hidden = true;
                            }
                        }
                        return 0;
                    }else{
                        return -1;
                    }
                } else {
                    return -1;
                }
            });
        }
    },

    //去掉重复的注记
    removeRepeat:function(features){
        var pointsFs = [];
        var lineTextFs = [];
        var lineCodeFs = [];

        var drawedPointFs = [];
        var drawedLineTextFs = [];
        var drawedLineCodeFs = [];
        for(var i = 0;i<features.length;i++){
            var f = features[i];
            if(f.type == 1){
                if(f.drawed == true){
                    drawedPointFs.push(f);
                }else{
                    pointsFs.push(f);
                }

            }else if(f.type == 2){
                if(f.lineType == 'text'){
                    if(f.drawed == true){
                        drawedLineTextFs.push(f);
                    }else{
                        lineTextFs.push(f);
                    }
                }
                if(f.lineType == 'code'){
                    if(f.drawed == true){
                        drawedLineCodeFs.push(f);
                    }else{
                        lineCodeFs.push(f);
                    }
                }
            }
        }


        for(var j = 0;j<pointsFs.length;j++){
            var pf = pointsFs[j];
            this.getShowPointFeatrues(drawedPointFs,pf);
        }

        for(var k = 0;k<lineTextFs.length;k++){
            var ltf = lineTextFs[k];
            this.getShowLineTextFeatrues(drawedLineTextFs,ltf);
        }


        for(var n = 0;n<lineCodeFs.length;n++){
            var lcf = lineCodeFs[n];
            this.getShowLineCodeFeatrues(drawedLineCodeFs,lcf);
        }

        //清除上一屏的注记的绘制状态
        if(this.prevFeatures){
            for(var m = 0;m<this.prevFeatures.length;m++){
                var pf = this.prevFeatures[m];
                pf.drawed = false;
            }
        }
    },


    getShowPointFeatrues:function(features,feature){
        var hidden =  false;
        for(var i = 0;i<features.length;i++){
             var f = features[i];
             if(f.label == feature.label && f.style.distance && feature.style.distance){
                 //求两个点注记之间的距离
                 var distance = this.getDistance(f.style.textPoint,feature.style.textPoint);
                 if(distance<f.style.distance){
                     hidden = true;
                     feature.hidden = true;
                 }
             }
        }

        if(!hidden){
            features.push(feature);
        }
    },


    getShowLineTextFeatrues:function(features,feature){
        var hidden =  false;
        for(var i = 0;i<features.length;i++){
            var f = features[i];
            if(f.label == feature.label && f.style.lineTextDistance && feature.style.lineTextDistance){
                //求两个点注记之间的距离
                var distance = this.getDistance(f.centerPoint,feature.centerPoint);
                if(distance<400){
                    hidden = true;
                    feature.hidden = true;
                }
            }
        }

        if(!hidden){
            features.push(feature);
        }
    },



    getShowLineCodeFeatrues:function(features,feature){
        var hidden =  false;
        for(var i = 0;i<features.length;i++){
            var f = features[i];
            if(f.label == feature.label && f.style.lineCodedistance && feature.style.lineCodedistance){
                //求两个点注记之间的距离
                var distance = this.getDistance(f.centerPoint,feature.centerPoint);
                if(distance<f.style.lineCodedistance){
                    hidden = true;
                    feature.hidden = true;
                }
            }
        }

        if(!hidden){
            features.push(feature);
        }
    },

    // 获取过滤后的要素.
    filterFeature:function(features){
        var returnFeatures = [];
        //剔除需避让的要素
        for(var i= 0 ;i<features.length;i++){
            if(!features[i].hidden ) {
                features[i].drawed = true;
                returnFeatures.push(features[i]);
            }
        }
        return returnFeatures;
    }

}
///<jscompress sourcefile="GDistance.js" />
/**
 * Created by matt on 2017/3/5.
 */

var GDistance = function(){}


GDistance.prototype.getLengthPoint = function( fromX, fromY, toX, toY, len){
    return GDistance.getLengthPoint(fromX, fromY, toX, toY,len,null);
}

GDistance.prototype.getAngle = function( p1,p2){
    if(p2[0]-p1[0] == 0){
        if(p2[1]>p1[0]){
            return 90;
        }else{
            return -90;
        }
    }
    var k = (p2[1]-p1[1])/(p2[0]-p1[0]);
    var angle = 360*Math.atan(k)/(2*Math.PI);
    return angle;
}


GDistance.prototype.getLengthPoint = function( fromX, fromY, toX, toY, len, index){
    var dx = toX - fromX;
    var dy = toY - fromY;
    if(dx == 0){
        x_new = toX;
        if(dy > 0){
            y_new = fromY + len;
        }else{
            y_new = fromY - len;
        }
        if(index == null){
            return [x_new,y_new];
        }else{
            return [x_new,y_new,index];
        }
    }

    var tan = dy / dx;
    var sec = Math.sqrt((tan * tan) + 1);
    var dx_new = Math.abs(len / sec);
    var dy_new = Math.abs(dx_new * tan);
    var x_new;
    var y_new;
    if(dx > 0){
        x_new = fromX + dx_new;
    }else{
        x_new = fromX - dx_new;
    }
    if(dy > 0){
        y_new = fromY + dy_new;
    }else{
        y_new = fromY - dy_new;
    }
    if(index == null){
        return [x_new,y_new];
    }else{
        return [x_new,y_new,index];
    }
}

GDistance.prototype.length = function( x0, y0, x1, y1){
    var dx = x1 - x0;
    var dy = y1 - y0;
    var len = Math.sqrt(dx * dx + dy * dy);
    return len;
}


GDistance.prototype.getNodePath = function(coords,interval){
    var previous = [];
    var points = {};
    var pointList = [];
    var intervalLength = interval.length;

    //初始化标记长度等于单位长度
    var fun_getInterval = function(interval){
        var value = interval[0];
        interval.splice(0,1);
        return value;
    }
    var markLength = fun_getInterval(interval);
    var index = 0;
    while(true){
        if(pointList.length == intervalLength){
            points.index = index;
            points.pointList = pointList;
            return points;
        }
        if(index >= coords.length){
            points.index = index;
            points.pointList = pointList;
            return points;
        }
        var x = coords[index];
        var y = coords[index + 1];
        //判断上一个节点是否为空
        if(previous.length == 0){
            //如果为空就设置当前点到 上一个节点上
            previous[0] = x;
            previous[1] = y;
            continue;
        }else{

            //如果不为空则需要求上一个节点与当前结点的距离
            var lengthPath = this.length(previous[0], previous[1], x, y);
            //把节点长度加起来

            if(lengthPath >= markLength){
                //如果长度大于标记长度，则需要上一点到标记成都的点
                var savePoint = this.getLengthPoint(previous[0],previous[1], x,y, markLength);
                var angle = this.getAngle(previous,[x,y]);

                if(angle == 90){
                    angle = 0;
                }
                if(angle == -90){
                    angle = 0;
                }
                if(angle == 0){
                    angle = 0.5;
                }


                //保证竖方向的字是正的
                if(angle >= 45){
                    angle = angle - 90;
                }else{
                    if(angle <= - 40){
                        angle = angle + 90;
                    }
                }


                var pointAngle = [savePoint,angle];
                pointList.push(pointAngle);
                previous[0] = savePoint[0];
                previous[1] = savePoint[1];
                markLength = fun_getInterval(interval);
            }else{
                markLength = markLength - lengthPath;

                previous[0] = x;
                previous[1] = y;
                index = index + 2;
            }
        }
    }

    points.index = index;
    points.pointList = pointList;
    return points;
}


///<jscompress sourcefile="CanvasLayer.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
Custom.CanvasLayer = function(){
    this.width = 0;
    this.height= 0;

    //当前屏幕的瓦片层行列号集合
    this.grid =[];
    this.cache = new Custom.Cache(256);
    //注记图层对象
    this.gwvtAnno = null;
    //数据源集合
    this.dataSource = [];
    //如果dataSource是urldatasource,那么样式纹理是否加载完成。 如果只有localDataSource,则为true
    this.isReady = false;

    //地图的最大范围
    this.maxExtent = [];
    //地图的当前视口
    this.extent =[];
    //地图的当前分辨率
    this.res = 0;
    //瓦片大小
    this.tileSize = 256;
    //是否允许拾取
    this.hitDetection = false;
    //当前屏幕内的features
    this.features = [];
    //正在请求中的瓦片请求集合,还没返回的请求
    this.requestingTiles = {};
    // 是否支持有isImportant属性
    this.hasImportant = true;
    /**
     * 初始化
     */
    this.init = function(w,h,tileSize,gwvtAnno){
        this.tileSize = tileSize;
        this.gwvtAnno = gwvtAnno;
        this.initCanvas(w,h);
        this.loadResources();
    };

    /**
     * 加载dataSource的样式文件和纹理，所有dataSource的
     * 样式文件和纹理加载完成，则isReady设置为ture
     */
    this.loadResources = function(){
        if(this.dataSource.length == 0){
            this.isReady = false;
            return;
        }

        var reqArr = [];
        for(var i = 0;i<this.dataSource.length;i++){
            var ds = this.dataSource[i];
            if(ds.type == 'URLDataSource'){
                reqArr = reqArr.concat(ds.loadStyle());
            }
            if(ds.type == 'LocalDataSource'){
                reqArr = reqArr.concat(ds.loadTexture());
            }
        }

        if(reqArr.length > 0){
            Promise.all(reqArr).then(function(){
                this.isReady = true;
                //重新请求注记数据
                if(this.grid.length > 0){
                    this.requestLabelTiles(this.grid);
                }
            }.bind(this));
        }else{
            this.isReady = true;
        }
    };

    /**
     * 初始化画布
     * Parameters :
     * w - 图层宽
     * h - 图层高
     */
    this.initCanvas = function (w,h){
        this.width = w;
        this.height= h;
        if(!this.root){
            this.root = document.createElement("canvas");
        }
        this.root.style.width = this.width + "px";
        this.root.style.height = this.height + "px";
        this.root.width = this.width;
        this.root.height = this.height;
        this.canvas = this.root.getContext("2d",{isQuality:true});


        if (this.hitDetection) {
            if(!this.hitCanvas){
                this.hitCanvas = document.createElement("canvas");
            }
            this.hitCanvas.style.width = this.width + "px";
            this.hitCanvas.style.height = this.height + "px";
            this.hitCanvas.width = this.width;
            this.hitCanvas.height = this.height;
            this.hitContext = this.hitCanvas.getContext("2d",{isQuality:true});
        }
    };


    /**
     * 添加数据源
     * Parameters :
     * dataSource
     */
    this.addDataSource = function(dataSource){
        if(dataSource.type =='URLDataSource'){
            dataSource.url = dataSource.url + '&tilesize='+this.tileSize;
        }

        if(dataSource.type =='URLDataSource' || dataSource.type =='LocalDataSource'){
            this.dataSource.push(dataSource);
        }
    };

    /**
     * 根据dataSoucceId移除数据源
     * Parameters :
     * dataSoucceId
     */
    this.removeDataSourceById = function(dataSoucceId){
        for(var i = 0;i<this.dataSource.length;i++){
            if(this.dataSource[i].id == dataSoucceId){
                this.dataSource.splice(i,1);
                return;
            }
        }
    };

    /**
     * 根据dataSoucceId获取数据源
     * Parameters :
     * dataSoucceId
     */
    this.getDataSourceById = function(dataSoucceId){
        for(var i = 0;i<this.dataSource.length;i++){
            if(this.dataSource[i].id == dataSoucceId){
                return this.dataSource[i];
            }
        }
    };

    /**
     * 清空画布
     */
    this.clean = function(){
        this.canvas.clearRect(0, 0, this.width, this.height);
        if(this.hitContext){
            this.hitContext.clearRect(0, 0, this.width, this.height);
        }
    };

    /**
     * 重新绘制注记要素，当动态更改DataSouce数据源后，需要调用redraw方法
     */
    this.redraw = function(){
        if(this.grid.length == 0){
            return;
        }
        this.cache.clean();
        //重新加载样式，纹理文件
        this.loadResources();
    };

    /**
     * 请求注记瓦片
     * Parameters :
     * grid - 当前视口内，瓦片的层行列号集合
     * zoomChanged - 是否进行了缩放操作
     */
    this.requestLabelTiles = function (grid,zoomChanged){
        this.grid = grid;
        //如果数据源没有准备好
        if(!this.isReady){
            return;
        }

        //获取需要请求的url
        var requestTileUrls = this.getRequestTileUrls(grid);
        this.sendRequest(requestTileUrls);
    };

    /**
     * 获取localDataSource中在当前屏幕范围内的注记要素
     */
    this.getLocalLabelDatas = function(){
        var localFeatures = [];
        for(var i = 0;i<this.dataSource.length;i++){
            var ds = this.dataSource[i];
            if(ds.type == 'LocalDataSource'){
                for(var j = 0;j<ds.features.length;j++){
                    var feature = ds.features[j];
                    //找出在当前视口内的要素
                    if(feature.inBounds(this.extent)){
                        if(feature.type == 1){
                            //转换要素的地理坐标为屏幕坐标
                            feature.sourceAngleData = [[feature.sourceData,0]];
                            feature.transformData(this.extent,this.res);
                            feature.label = feature.getFeatureLabel();
                            feature.textures = ds.textures;
                            localFeatures.push(feature);
                        }

                        if(feature.type == 2){
                            feature.label = feature.getFeatureLabel();
                            feature.textures = ds.textures;
                            localFeatures = localFeatures.concat(this.cutLineFeature(feature,true));
                        }
                    }
                }
            }
        }

        return localFeatures;
    };

    /**
     * 计算需要请求的瓦片的url
     * Parameters :
     * requestTiles - 需要请求的瓦片层行列号集合
     */
    this.getRequestTileUrls = function(grid){
        this.hitCacheUrls = [];
        this.currentTileDatas = [];
        //本次需要请求的url
        var requestTileUrls = {};
        //请求队列中找到的url集合
        var findedRequestUrls ={};
        for(var i = 0;i<this.dataSource.length;i++){
            var dataSource = this.dataSource[i];
            //url数据源
            if(dataSource.type == 'URLDataSource'){
                var url = dataSource.url;
                for(var j = 0;j<grid.length;j++){
                    var item = grid[j];
                    var tileUrl  = url.replace('${x}',item.col).replace('{x}',item.col);
                    tileUrl = tileUrl.replace('${y}',item.row).replace('{y}',item.row);
                    tileUrl = tileUrl.replace('${z}',item.level).replace('{z}',item.level);

                    //多域名url
                    if(dataSource.urlArray.length > 0){
                        var len = dataSource.urlArray.length-1;
                        var index = Math.round(Math.random()*len);
                        var domainUrl = dataSource.urlArray[index];

                        var array = tileUrl.split('/mapserver');
                        var partUrl = array[1];
                        tileUrl = domainUrl + '/mapserver'+partUrl;
                    }

                    //判断缓存中有没有该注记
                    var cacheItem = this.cache.getItem(tileUrl);
                    if(cacheItem){
                        this.hitCacheUrls.push(tileUrl);
                    }else{
                        //已经发送的请求队列中找,队列中没找到的需要发送请求
                        if(!this.requestingTiles[tileUrl]){
                            requestTileUrls[tileUrl] = {url:tileUrl,xyz:item,dataSourceId:dataSource.id,dataType:'json'};
                        }else{
                            findedRequestUrls[tileUrl] = true;
                        }
                    }
                }
            }
        }

        // console.log('total count  ================='+ grid.length);
        //关闭上次不需要的请求
        this.cancelRequest(findedRequestUrls);
        return requestTileUrls;
    };

    /**
     * 取消上次不需要的请求
     * Parameters :
     * findedRequestUrls - 请求队列中找到的url集合
     */
    this.cancelRequest = function(findedRequestUrls){
        for(var tileUrl in this.requestingTiles) {
            if (!findedRequestUrls[tileUrl]) {
                var requestTile = this.requestingTiles[tileUrl];
                delete this.requestingTiles[tileUrl];
                requestTile.xhr.abort();
                requestTile.requestItem.cancel = true;
            }
        }
    };

    /**
     * 发送请求，取注记瓦片数据
     * Parameters :
     * requestTileUrls - 需要请求的瓦片url集合
     */
    this.sendRequest = function(requestTileUrls){
        var count = 0;
        for(var url in requestTileUrls){
            var item = requestTileUrls[url];
            var promise = Custom.getParamJSON(item);
            this.requestingTiles[item.url] = {xhr:promise.xhr,requestItem:item};
            promise.then(this.tileSuccessFunction.bind(this),this.tileFailFunction.bind(this));
            count++;
        }
        // console.log('sendRequest count ==============='+count);
        if(count == 0){
            this.sendSuccess([]);
        }
    };

    /**
     * 单个瓦片注记请求成功的回调
     */
    this.tileSuccessFunction = function(data){
        if(data.param.cancel == true){
            //请求取消失败的，直接返回
            return;
        }

        var url = data.param.url;
        // console.log('onSuceess url ==='+ url);
        //删除正在请求的url
        delete this.requestingTiles[url];
        var labelDatas = this.parseFeature(data);
        // this.currentTileDatas = this.currentTileDatas.concat(labelDatas);
        this.currentTileDatas.push({url:url,labelDatas:labelDatas});

        //如果所有的瓦片请求成功
        if(this.isEmptyObject(this.requestingTiles)){
            this.sendSuccess(this.currentTileDatas);
        }
    };

    //判断map是否为空
    this.isEmptyObject = function(e) {
        for (var t in e)
            return !1;
        return !0
    };

    /**
     * 单个瓦片注记请求失败的回调
     */
    this.tileFailFunction = function(data){
        if(data.param.cancel == true){
            //请求取消失败的，直接返回
            return;
        }

        var url = data.param.url;
        // console.log('onfail url ==='+ url);
        delete this.requestingTiles[url];

        //如果所有的瓦片请求成功
        if(this.isEmptyObject(this.requestingTiles)){
            this.sendSuccess(this.currentTileDatas);
        }
    };

    /**
     * 请求成功的回调函数，没有请求url，也会执行该回调
     * Parameters :
     * results - 请求成功的结果
     */
    this.sendSuccess = function(results){
        if(this.gwvtAnno.animating){
            return;
        }

        //合并上次在当前视口范围内的注记要素(不包括本地要素)
       var labelDatas = this.mergeLabelData(results,this.hitCacheUrls);

        for(var i = 0;i<results.length;i++){
            var item = results[i];
            this.cache.push(item.url,item.labelDatas);
        }

        //获取localDataSource中在当前屏幕范围内的注记要素
        var localFeatures = this.getLocalLabelDatas();
        labelDatas = labelDatas.concat(localFeatures);
        // console.time('avoid time:');
            //进行避让
        this.avoidlabelDatas = GAnnoAvoid.defaultAvoid(labelDatas,this.hasImportant);
        // console.timeEnd('avoid time:');
        //重置图层位置
        this.gwvtAnno.resetCanvasDiv();
        //绘制注记要素
        this.draw(this.avoidlabelDatas);
    };

    /**
     * 解析返回的注记信息
     * Parameters:
     * tileData - 请求返回的注记数据
     * Returns:
     * labelDatas - 设置过样式,坐标由瓦片内坐标转为屏幕坐标的注记数据
     */
    this.parseFeature = function(tileData){
        var layers = tileData.data;
        var xyz = tileData.param.xyz;
        var count = 0;
        for(var key in layers){
            var layerData = layers[key];
            layerData.xyz = xyz;
            count++;
        }

        var dataSourceId = tileData.param.dataSourceId;

        var labelDatas = [];
        var dataSource = this.getDataSourceById(dataSourceId);
        if(count > 0 && dataSource.styleFun){
            //设置样式
            var itemDatas = [];
            var level = tileData.param.xyz.level;
            var drawer = new LabelDrawer(layers,level,itemDatas);
            dataSource.styleFun.call({}, drawer,level);

            //转换瓦片坐标为屏幕坐标,并构造label数据
            for(var j = 0;j<itemDatas.length;j++){
                var itemData =  itemDatas[j];
                itemData.textures = dataSource.textures;
                labelDatas = labelDatas.concat(this.parseItemData(itemData));
            }
        }

        return labelDatas;
    };

    /**
     * 将注记几何数据转换为相对本地的屏幕坐标
     * Parameters:
     * itemData - 瓦片内坐标的注记数据
     * Returns:
     * labelDatas - 设置过样式,坐标由瓦片内坐标转为屏幕坐标的注记数据
     */
    this.parseItemData = function (itemData){
        var labelDatas = [];
        //点
        if(itemData.type == 1){
            labelDatas =  this.parsePoint(itemData);
        }
        //线
        if(itemData.type == 2){
            if(itemData[0] =='LINESTRING'){
                labelDatas = labelDatas.concat(this.parseLine(itemData));
            }
            //多线
            if(itemData[0] =='MULTILINESTRING'){
                labelDatas = labelDatas.concat(this.parseMultiLine(itemData));
            }
        }
        return labelDatas;
    };

    /**
     * 将点注记几何数据转换为相对本地的屏幕坐标
     * Parameters:
     * itemData - 瓦片内坐标的注记数据
     * Returns:
     * points - 设置过样式,坐标由瓦片内坐标转为屏幕坐标的注记数据
     */
    this.parsePoint = function(itemData){
        var points = [];
        var point = itemData[2];
        var sourceAngleData = [[point,0]];
        var p = this.transformData(sourceAngleData,itemData.xyz);
        var style = itemData.style;
        var label = itemData.fieldValueMap[style.labelfield];
        var primaryId = itemData.fieldValueMap['attributesId']+ '_row_'+itemData.xyz.row+'_col_'+itemData.xyz.col+'_level_'+itemData.xyz.level+'_x_'+sourceAngleData[0][0][0]+'_y_'+sourceAngleData[0][0][1];
        points.push({id:Math.round(Math.random()*256*256*256),type:itemData.type,datas:p,sourceData:point,sourceAngleData:sourceAngleData,label:label,
            attributes:itemData.fieldValueMap,primaryId:primaryId,style:style,textures:itemData.textures,xyz:itemData.xyz});
        return points;
    };

    /**
     * 将线注记几何数据转换为相对本地的屏幕坐标
     * Parameters:
     * itemData - 瓦片内坐标的注记数据
     * Returns:
     * lines - 设置过样式,坐标由瓦片内坐标转为屏幕坐标的注记数据
     */
    this.parseLine = function(itemData){
        var lines = [];
        var style = itemData.style;

        var line = this.getLine(itemData[2]);
        if(line == null){
            return lines;
        }

        var label = itemData.fieldValueMap[style.labelfield];
        var feature = {type:itemData.type,sourceData:line,label:label,
            attributes:itemData.fieldValueMap, style:style,textures:itemData.textures,xyz:itemData.xyz};
        lines = lines.concat(this.cutLineFeature(feature,false));
        return lines;
    };

    /**
     * 递归方法，从lineString的多层级数据里面获取line数据
     * Parameters:
     * itemData - 瓦片内坐标的注记数据
     */
    this.getLine = function(itemData){
        if(typeof itemData == 'undefined' || itemData.length  == 0){
            return null;
        }
        if(itemData.length >= 2){
            return itemData;
        }else{
            return this.getLine(itemData[0]);
        }
    };

    /**
     * 将多线注记几何数据转换为相对本地的屏幕坐标
     * Parameters:
     * itemData - 瓦片内坐标的注记数据
     * Returns:
     * multiLines - 设置过样式,坐标由瓦片内坐标转为屏幕坐标的注记数据
     */
    this.parseMultiLine = function(itemData){
        var multiLines = [];
        var style = itemData.style;
        for(var i=0;i<itemData[2][0][0].length;i++){
            var line = itemData[2][0][0][i];
            if(line.length == 0){
                continue;
            }
            var label = itemData.fieldValueMap[style.labelfield];
            var feature = {type:itemData.type,sourceData:line,label:label,
                attributes:itemData.fieldValueMap,style:style,textures:itemData.textures,xyz:itemData.xyz};
            multiLines = multiLines.concat(this.cutLineFeature(feature,false));
        }
        return multiLines;
    };

    /**
     * 将线切多段，分为线文字，线编码，线箭头,并转换为屏幕坐标
     * Parameters:
     * feature - 瓦片内坐标的注记数据
     * isLocal - true为本地Feature,false为远程请求的feature
     * Returns:
     * features - 切好的线文字，线编码，线箭头要素集合
     */
    this.cutLineFeature = function (feature,isLocal){
        var features = GAnnoAvoid.cutLineFeature(feature);
        for(var i = 0;i<features.length;i++){
            var f = features[i];
            //转换为屏幕坐标
            if(isLocal){
                f.datas = feature.transformData(this.extent,this.res);
            }else{
                f.datas = this.transformData(f.sourceAngleData,f.xyz);
            }

            f.primaryId = f.attributes['attributesId']+ '_row_'+feature.xyz.row+'_col_'+feature.xyz.col+'_level_'+feature.xyz.level
                +'_x_'+f.sourceAngleData[0][0][0]+'_y_'+f.sourceAngleData[0][0][1];
            //用于拾取的id
            f.id = Math.round(Math.random()*256*256*256);

            //获取注记的中心点
            if(f.lineType == 'text'){
                var centerIndex = Math.floor(f.datas.length/2);
                f.centerPoint = f.datas[centerIndex][0];
            }

            //获取注记的中心点
            if(f.lineType == 'code'){
                f.centerPoint = f.datas[0][0];
            }
        }
        return features;
    };

    /**
     * 将瓦片内坐标转换为当前屏幕坐标
     * Parameters:
     * points - 瓦片内坐标数组,item示例：[[12,20],0] [12,20]为点坐标，0为旋转的角度
     * xyz - 瓦片的层行列号
     * Returns:
     * rdata - 本地屏幕内坐标数组
     */
    this.transformData = function(points,xyz){
        //取出当前视口左上角的地理坐标
        var left = this.extent[0];
        var top = this.extent[3];

        //地图最大的范围
        var mLeft = this.maxExtent[0];
        var mTop = this.maxExtent[3];

        //计算坐上角的屏幕坐标
        var x = (left - mLeft) / this.res;
        var y = (mTop - top) / this.res;

        var rPoint = [];

        for(var i = 0;i<points.length;i++){
            var point = points[i][0];
            var gx = point[0] + xyz.col * this.tileSize;
            var gy = point[1] + xyz.row * this.tileSize;
            var p = [gx - x,gy - y];
            rPoint.push([p,points[i][1]]);
        }
        return rPoint;
    };

    /**
     * 将本次请求的注记数据和上次在本视口范围内的要素合并
     * Parameters:
     * labelDatas - 本次请求到注记数据
     * noRequestTiles - 当前视口中不需要请求的瓦片层行列号集合
     * Returns:
     * labelDatas - 合并后的注记数据，当前视口整个屏幕的数据
     */
    this.mergeLabelData = function (results,hitCacheUrls){
        var labelDatas = [];
        for(var j = 0;j<results.length;j++){
            var result = results[j];
            labelDatas = labelDatas.concat(result.labelDatas);
        }

        // var count = 0;
        for(var i =0 ;i<hitCacheUrls.length;i++){
            var cacheItem = this.cache.getItem(hitCacheUrls[i]);
            // if(cacheItem){
            //     count++;
            // }
            for(var j =0;j<cacheItem.length;j++){
                var labelData = cacheItem[j];
                //重新计算当前屏幕坐标
                labelData.datas = this.transformData(labelData.sourceAngleData,labelData.xyz);

                //获取注记的中心点
                if(labelData.lineType == 'text'){
                    var centerIndex = Math.floor(labelData.datas.length/2);
                    labelData.centerPoint = labelData.datas[centerIndex][0];
                }

                //获取注记的中心点
                if(labelData.lineType == 'code'){
                    labelData.centerPoint = labelData.datas[0][0];
                }
            }
            labelDatas = labelDatas.concat(cacheItem);
        }

        // console.log('merge cache count =============='+count );
        return labelDatas;
    };


    /**
     * 画注记
     * Parameters:
     * features - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    this.draw = function(features){
        this.clean();
        this.features = [];
        for(var i = 0;i<features.length;i++){
            var feature = features[i];
            this.features[feature.id] = feature;
            //画点注记
            if(feature.type == 1){
                Custom.GDrawGeomerty.drawPointIcon(this.canvas,this.hitContext, this.hitDetection, feature,feature.textures);
                Custom.GDrawGeomerty.drawPoint(this.canvas,this.hitContext, this.hitDetection,feature);
                continue;
            }
            //画线注记
            if(feature.type == 2){
                Custom.GDrawGeomerty.drawLine(this.canvas,this.hitContext, this.hitDetection,feature);
            }
        }
    };

    /**
     * 根据屏幕坐标获取feature
     * Parameters :
     * x
     * y
     */
    this.getFeatureByXY = function(x,y) {
        var feature = null;
        if (this.hitDetection) {
            var featureId;
            var data = this.hitContext.getImageData(x, y, 1, 1).data;
            if (data[3] === 255) { // antialiased
                var id = data[2] + (256 * (data[1] + (256 * data[0])));
                if (id) {
                    featureId = id - 1 ;
                    try {
                        feature = this.features[featureId];
                    } catch(err) {
                    }
                }
            }
        }
        return feature;
    }

}
///<jscompress sourcefile="LabelDrawer.js" />
/**
 * Created by kongjian on 2017/5/1.
 */
function LabelDrawer(layerDataMap,level,features){
    this.layerDataMap = layerDataMap;
    this.level = level;
    this.features = features;
    this.getLayer = function(layername){
        this.labelDatas = [];

        var data = this.layerDataMap[layername];
        if(data == null || data.features == null){
            return this;
        }

        for(var j=0;j<data.features.length;j++){
            var labelData = data.features[j];
            labelData.layerName = layername;
            labelData.xyz = data.xyz;
            labelData.type = data.type;
            if(!labelData.fieldValueMap){
                    labelData.fieldValueMap = this.getFieldValueMap(data,labelData);
            }
            this.labelDatas.push(labelData);
        }
        return this;
    };

    this.getGroupLayer = function(layername,value){
        this.labelDatas = [];

        var valueArr = value.split(',');
        var length = valueArr.length;
        if(length == 0){
            return this;
        }

        var data = this.layerDataMap[layername];
        if(data == null || data.features == null){
            return this;
        }

        for(var j = 0 ; j < length ; j ++){
            var dataArr = data.features[valueArr[j]];
            if(dataArr == null){
                continue;
            }

            var labelData = data.features[i];
            labelData.layerName = layername;
            labelData.xyz = data.xyz;
            labelData.type = data.type;
            if(!labelData.fieldValueMap){
                labelData.fieldValueMap = this.getFieldValueMap(data,labelData);
            }
            this.labelDatas.push(labelData);
        }
        return this;
    }

    this.setStyle=function(fn){
        for(var i=0;i<this.labelDatas.length;i++){
            var labelData = this.labelDatas[i];
            var get = function(key){
                return labelData.fieldValueMap[key];
            };
            var style = fn.call({},this.level,get);
            if(style && style.show == true){
                labelData.style = style;
				labelData.fieldValueMap['avoidWeight']=style.avoidWeight;
                this.features.push(labelData);
            }
        }
    }

    this.getFieldValueMap = function(data,labelData){
        var  fieldValueMap=  {};
        for(var i = 0;i<data.fieldsConfig.length;i++){
            var fieldName = data.fieldsConfig[i]['name'];
            var index = data.fieldsConfig[i]['index'];
            var id = data.fieldsConfig[i]['id'];
            if(id == true){
                //图层名和数据的主键构成唯一id
                fieldValueMap['attributesId'] =labelData.layerName+labelData[1][index];
            }
            fieldValueMap[fieldName] = labelData[1][index];
        }
        return fieldValueMap;
    }

    this.draw = function (){

    }

}
///<jscompress sourcefile="Feature.js" />
/**
 * Created by kongjian on 2017/6/27.
 */
Custom.Feature = function(){
    this.id = Math.round(Math.random()*256*256*256);
    //要素类型，1代表点，2代表线
    this.type = 1;
    //数据一维数组，里面依次存放x,y地理坐标
    this.sourceData =[];
    //根据sourceAngleData转换为屏幕坐标的集合
    this.datas = [];
    //由原始sourceData切断过，带角度的数据
    this.sourceAngleData = [];
    this.attributes ={};
    //单个注记的样式
    this.style ={};

    /**
     * 添加属性字段
     * Parameters :
     * key
     * value
     */
    this.addAttribute = function(key,value){
        this.attributes[key] = value;
    };

    /**
     * 根据字段名删除属性
     * Parameters :
     * key
     * value
     */
    this.removeAttributeByKey = function(key){
       delete this.attributes[key];
    };

    /**
     * 计算feature的最大外接矩形
     */
    this.getMaxExtent = function(){
        if(this.sourceData.length == 0 ){
            return null;
        }
        var minX = this.sourceData[0];
        var maxX = this.sourceData[0];
        var minY = this.sourceData[1];
        var maxY = this.sourceData[1];
        for(var i = 2;i< this.sourceData.length;i++){
            var tempX = this.sourceData[i];
            var tempY = this.sourceData[i+1];
            if(tempX>maxX)   // 判断最大值
                maxX=tempX;
            if(tempX<minX)   // 判断最小值
                minX=tempX;

            if(tempY>maxY)   // 判断最大值
                maxY=tempY;
            if(tempY<minY)   // 判断最小值
                minY=tempY;
            i++;
        }
        return [minX,minY,maxX,maxY];
    };

    /**
     * 判断feature是否在当前视口中
     * Parameters :
     * srceenBounds - 当前视口的外接矩形
     */
    this.inBounds = function (srceenBounds){
        var featureBounds = this.getMaxExtent();
        if(!featureBounds){
            return false;
        }

        return featureBounds[0] <= srceenBounds[2] &&
            featureBounds[2]  >= srceenBounds[0] &&
            featureBounds[1]  <= srceenBounds[3] &&
            featureBounds[3]  >= srceenBounds[1] ;
    };


    /**
     * 将要素的地理坐标转换为当前的屏幕坐标
     * Parameters:
     * srceenBounds - 当前视口的外接矩形
     * res - 当前地图的分辨率
     */
    this.transformData = function(srceenBounds,res){
        this.datas = [];
        if(this.sourceData.length == 0){
            return;
        }
        //取出当前视口左上角的地理坐标
        var left = srceenBounds[0];
        var top = srceenBounds[3];

        // for(var i = 0;i< this.sourceData.length;i++){
        //     var sx = this.sourceData[i];
        //     var sy = this.sourceData[i+1];
        //     this.datas.push((sx - left)/res);
        //     this.datas.push((top - sy)/res);
        //     i++;
        // }

        var rPoints = [];
        for(var i = 0;i<this.sourceAngleData.length;i++){
            var point = this.sourceAngleData[i][0];
            var gx = (point[0] - left)/res;
            var gy = (top - point[1])/res;
            var p = [gx,gy];
            rPoints.push([p,this.sourceAngleData[i][1]]);
        }
        this.datas = rPoints;
    };


    /**
     * 获取要素要显示的文字内容
     */
    this.getFeatureLabel = function(){
        var labelField = this.style['labelfield'];
        if(labelField){
            if(this.attributes[labelField]){
                return this.attributes[labelField]+'';
            }
        }
        return null;
    }
}
///<jscompress sourcefile="GLabelGrid.js" />
/**
 * Created by kongjian on 2017/9/26.
 * 后端避让后的注记，前端绘制显示图层
 */
L.GLabelGrid  = L.TileLayer.extend({
    //多个服务器url的域名，用于解决一个域名只有6条请求管线的限制
    urlArray:[],
    // 不带过滤条件的url
    sourceUrl: null,
    // 纹理图标集合
    textures: {},
    //瓦片队列
    tileQueue:[],
    //缩放比例
    ratio:1,
    //瓦片大小
    tilesize:256,
    //过滤json对象
    control:null,
    //过滤的id
    controlId:null,
    //是否支持注记拾取
    hitDetection:false,
    initialize: function(url, options) {
        if(window.devicePixelRatio > 1.5){
            this.ratio = 2;
        }

        if(!this.sourceUrl){
            this.sourceUrl = url;
        }

        if(options &&options.tileSize){
            this.tilesize = options.tileSize;
        }

        this.gxyzUtil = new Custom.GXYZUtil();
        this.gxyzUtil.tileSize = this.tilesize;
        this.gxyzUtil.parseUrl(url);

        this._url = url +'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version;
        L.setOptions(this,options);

        this.hitDetection = options.hitDetection;
        this.on('tileunload', this._onTileRemove);
        this.on('tileload', this._onTileLoad);
        this.on('tileerror', this._onTileError);
    },

    _initContainer: function () {
        if (this._container) { return; }

        this._container = L.DomUtil.create('div', 'leaflet-pane leaflet-overlay-pane');
        this.getPane().appendChild(this._container);
    },

    onAdd: function () {
        if(this.control){
            this._url = this.sourceUrl +'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+this.control;
        }
        if(this.controlId){
            this._url = this.sourceUrl +'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&controlId='+this.controlId;
        }

        this._initContainer();

        this._levels = {};
        this._tiles = {};

        //请求图标纹理
        Custom.getJSON({url:this.gxyzUtil.host+ '/mapserver/styleInfo/'+this.gxyzUtil.servername+'/'+this.gxyzUtil.styleId+'/label/texture.js',dataType:'text'}).then(function(result){
            var textures = JSON.parse(result);
            var totalCount = 0;
            for(var i in textures){
                totalCount++;
            }

            if(totalCount == 0){
                this._resetView();
                this._update();
            }

            var count = 0;
            for(var key in textures){
                var img = new Image();
                img.name = key;
                img.onload = function(data) {
                    count++;
                    var name = data.target.name;
                    this.textures[name] =data.target;
                    if(count == totalCount){
                        this._resetView();
                        this._update();
                    }
                }.bind(this);
                img.src = textures[key];
            }
        }.bind(this));
    },

    /**
     * 重写构造瓦片的方法
     */
    createTile: function (coords, done) {
        //从队列中取canvas，避免频繁创建canvas
        var tile = this.tileQueue.pop();
        if(!tile){
            tile = this.initTile();
        }else{
            this._cleanTile(tile);
        }

        var url = this.getTileUrl(coords);

        Custom.getJSON({url:url,dataType:'json'})
            .then(function(data) {
                    tile.data = data;
                    this._tileOnLoad.apply(this, [done,tile]);
            }.bind(this),
              function(error){
                  this._tileOnError.apply(this, [done, tile,error]);
              }.bind(this));

        return tile;
    },

    /**
     * 获取url的方法
     */
    getTileUrl: function (coords) {
        var data = {
            r: L.Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        if(this.urlArray.length == 0){
            return L.Util.template(this._url, L.extend(data, this.options));
        }else{
            //从urlArray中随机取出一个url
            var len = this.urlArray.length-1;
            var index = Math.round(Math.random()*len);
            var url = this.urlArray[index];

            var array = this._url.split('/mapserver');
            var partUrl = array[1];
            url = url + '/mapserver'+partUrl;
            return L.Util.template(url, L.extend(data, this.options));
        }
    },

    /**
     *  初始化canvas
     */
    initTile:function(){
        // console.time('initTile');
        var tile = document.createElement("canvas");
        tile.style.width = this.tilesize + "px";
        tile.style.height = this.tilesize + "px";
        tile.width = this.tilesize;
        tile.height = this.tilesize;

        var ctx = tile.getContext("2d",{isQuality:true});
        tile.ctx = ctx;

        if(this.hitDetection){
            var canvas = document.createElement("canvas");
            canvas.style.width = this.tilesize + "px";
            canvas.style.height = this.tilesize + "px";
            canvas.width = this.tilesize;
            canvas.height = this.tilesize;
            var hitCtx = canvas.getContext("2d",{isQuality:true});
            tile.hitCtx = hitCtx;
        }
        // console.timeEnd('initTile');
        return tile;
    },

    //移除瓦片
    _onTileRemove: function (e) {
        //加入到瓦片队列
        this.tileQueue.push(e.tile);
    },

    /**
     *  重写，取消请求的操作
     */
    _abortLoading: function () {
        var i, tile;
        for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;

                // if (!tile.complete) { // 是否要缩放时，注记放大效果
                    L.DomUtil.remove(tile);
                // }
            }
        }
    },

    _onTileLoad:function(item){
        var tile = item.tile;
        this._drawTile(tile,tile.data);
        tile.complete = true;
    },

    _onTileError:function(item){
        var tile = item.tile;
        tile.complete = true;
        this.tileQueue.push(tile);
    },

    _tileOnError: function (done, tile, e) {
        done(e, tile);
    },

    _drawTile:function(tile,features){
        // console.time('_drawTile');
        var ctx = tile.ctx;
        var hitCtx = tile.hitCtx;
        var featureIdMap = {};
        for(var i = 0;i<features.length;i++){
            var feature = features[i];
            //画点注记
            if(feature.type == 1){
                feature.id = Math.round(Math.random()*256*256*256);
                featureIdMap[feature.id] = feature;
                Custom.GDrawGeomerty.drawPointIcon(ctx,tile.hitCtx, this.hitDetection, feature,this.textures);
                Custom.GDrawGeomerty.drawPoint(ctx,tile.hitCtx, this.hitDetection,feature);
                continue;
            }
            //画线注记
            if(feature.type == 2){
                Custom.GDrawGeomerty.drawLine(ctx,feature);
            }
        }

        //用于拾取查找
        tile.featureIdMap = featureIdMap;
        // console.timeEnd('_drawTile');
    },

    _cleanTile:function(tile){
        tile.ctx.clearRect(0, 0, this.tilesize, this.tilesize);
        if(tile.hitCtx){
            tile.hitCtx.clearRect(0, 0, this.tilesize, this.tilesize);
        }
    },

    /**
     * 根据屏幕坐标获取feature
     * Parameters :
     * x
     * y
     */
    getFeatureByXY : function(x,y) {
        var feature = null;
        if (this.hitDetection) {
            var featureId;

            var latLng = this._map.containerPointToLatLng(new L.point(x,y));
            var maxBounds = this._map.options.crs.projection.bounds;
            //地图当前范围
            var bounds = this._map.getBounds();
            var pBounds = this._map.getPixelBounds();
            //地图当前分辨率
            var res = (bounds._northEast.lat - bounds._southWest.lat)/(pBounds.max.y - pBounds.min.y);

            var tileSize = this.tilesize;
            var row = (maxBounds.max.y - latLng.lat) /(res*tileSize);
            var col = (latLng.lng - maxBounds.min.x)/(res*tileSize);
            var frow = Math.floor(row);
            var fcol = Math.floor(col);
            var level = this._map.getZoom();

            var tile = this._tiles[fcol+':'+frow+':'+level].el;

            var tx = (col - fcol)*tileSize;
            var ty = (row - frow)*tileSize;
            var data = tile.hitCtx.getImageData(tx, ty, 1, 1).data;
            if (data[3] === 255) { // antialiased
                var id = data[2] + (256 * (data[1] + (256 * data[0])));
                if (id) {
                    featureId = id - 1 ;
                    try {
                        feature = tile.featureIdMap[featureId];
                    } catch(err) {
                    }
                }
            }
        }
        return feature;
    },

    /**
     * 设置过滤条件
     */
    setFilter:function(filter){
        if(!this._url ||  !filter || (filter.layers.length == 0 && filter.order.length == 0)){
            return;
        }

        this.gxyzUtil.setFilter(filter,function(result){
            if(result.isIE){
                this.controlId = result.id;
                this.setUrl(this.sourceUrl +'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version + '&controlId='+result.id);
            }else{
                this.control = result.id;
                this.setUrl(this.sourceUrl +'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+result.id);
            }
        }.bind(this));
    }
})
///<jscompress sourcefile="GWVTAnno.js" />
/**
 * Created by kongjian on 2017/6/26.
 * 前端注记避让并绘制layer
 */
L.GWVTAnno = L.Layer.extend({
    canvasLayer:null,
    currLevel:2,
    //是否允许拾取
    hitDetection:true,
    options: {
        tileSize:256
    },
    /**
     * 构造方法
     */
    initialize: function (options) {
        L.setOptions(this, options);
        if(this.options.hasOwnProperty('hitDetection')){
            this.hitDetection = this.options.hitDetection;
        }
        this.canvasLayer = new Custom.CanvasLayer();
        this.canvasLayer.tileSize = this.options.tileSize;
        this.canvasLayer.hitDetection = this.hitDetection;
        this.animating = false;
    },

    /**
     * 图层被添加到地图中调用
     */
    onAdd: function () {
        //地图最大范围
        var maxExtent = this._map.options.crs.projection.bounds;
        this.canvasLayer.init(this._map._size.x,this._map._size.y,this.options.tileSize,this);
        this.canvasLayer.maxExtent = [maxExtent.min.x,maxExtent.min.y,maxExtent.max.x,maxExtent.max.y];
        this._container = this.canvasLayer.root;

        if (this._zoomAnimated) {
            L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
        }
        this.getPane().appendChild(this.canvasLayer.root);
        this._update();
    },

    /**
     * 注册事件
     */
    getEvents: function () {
        var events = {
            resize:this.onResize,
            movestart:this.onMoveStart,
            zoom: this._onZoom,
            moveend: this._onMoveend
        };

        if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
        }
        return events;
    },

    /**
     * 浏览器窗口缩放事件
     */
    onResize:function(e){
        this.canvasLayer.tileSize = this.options.tileSize;
        this.canvasLayer.gwvtAnno = this;
        this.canvasLayer.initCanvas(this._map._size.x,this._map._size.y);
        this._update();
    },

    _onAnimZoom: function (ev) {
        this.updateTransform(ev.center, ev.zoom);
    },

    _onZoom: function () {
        this.updateTransform(this._map.getCenter(), this._map.getZoom());
    },

    _onMoveend:function(){
        this.animating = false;
        this._update();
    },

    /**
     * 缩放时更新注记层的位置
     */
    updateTransform: function (center,zoom) {
        if(!this._zoom || !this._center){
            this._zoom = this._map.getZoom();
            this._center = this._map.getCenter();
        }

        var scale = this._map.getZoomScale(zoom, this._zoom),
            position = this.getCanvasXY(),
            viewHalf = this._map.getSize().multiplyBy(0.5),
            currentCenterPoint = this._map.project(this._center, zoom),
            destCenterPoint = this._map.project(center, zoom),
            centerOffset = destCenterPoint.subtract(currentCenterPoint),
            topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
        if (L.Browser.any3d) {
            L.DomUtil.setTransform(this.canvasLayer.root, topLeftOffset, scale);
        } else {
            L.DomUtil.setPosition(this.canvasLayer.root, topLeftOffset);
        }
    },

    /**
     * 缩放，平移完成的回调
     */
    onMoveStart:function(){
        this.animating = true;
    },

    /**
     * 缩放，平移完成的回调
     */
    _update: function () {
        var map = this._map;
        if (!map) {
            return;
        }

        //地图当前范围
        var bounds = map.getBounds();
        var pBounds = map.getPixelBounds();
        //地图当前分辨率
        var res = (bounds._northEast.lat - bounds._southWest.lat)/(pBounds.max.y - pBounds.min.y);
        //地图最大范围
        var maxExtent = map.options.crs.projection.bounds;

        //需要请求行列号
        var minRow = Math.floor((maxExtent.max.y - bounds._northEast.lat) /(res*this.options.tileSize));
        var maxRow = Math.ceil((maxExtent.max.y - bounds._southWest.lat)/(res*this.options.tileSize));
        var minCol = Math.floor((bounds._southWest.lng - maxExtent.min.x)/(res*this.options.tileSize));
        var maxCol = Math.ceil((bounds._northEast.lng - maxExtent.min.x)/(res*this.options.tileSize));

        var level = map.getZoom();
        var zoomChanged = (this.currLevel != level);
        //发送请求
        var grid = this.getGrid(minRow,maxRow,minCol,maxCol,level);
        this.canvasLayer.extent = [bounds._southWest.lng,bounds._southWest.lat,bounds._northEast.lng,bounds._northEast.lat];
        this.canvasLayer.res = res;

        this.canvasLayer.requestLabelTiles(grid,zoomChanged);
        this.currLevel = level;
    },

    /**
     * 根据当前视口获取要请求的瓦片的行列号
     * Parameters (single argument):
     * bounds - 当前视口范围
     * Returns:
     * grid -  当前范围对应的瓦片层行列号
     */
    getGrid:function(minRow,maxRow,minCol,maxCol,level){
        var grid = [];
        for (var col = minCol; col < maxCol; col++) {
            for (var row = minRow; row < maxRow; row++) {
                grid.push({"row":row,"col":col,"level":level});
            }
        }
        return grid;
    },

    /**
     * 当图层缩放，平移后，更新canvas的位置
     * 考虑到它的位置信息存到了map中，不同的map sdk实现机制不一样
     * 所以考虑将该方法提到本类中
     */
    resetCanvasDiv :function(){
        var p = this.getCanvasXY();
        L.DomUtil.setPosition(this._container, p);
        this._center = this._map.getCenter();
        this._zoom = this._map.getZoom();
    },

    /**
     * 获取canvas的坐标
     */
    getCanvasXY:function(){
        if(!this._map){
            return;
        }
        var transform = this._map.dragging._draggable._element.style.transform;
        var offset = transform.match(/(-?\d+\.?\d*)(px)/g);

        var x =offset[0].replace('px','');
        var y =offset[1].replace('px','');
        return {x:-x,y:-y};
    },

    /**
     * 重新绘制注记要素，当动态更改DataSouce数据源后，需要调用redraw方法
     */
    redraw :function(){
        if(this.canvasLayer){
            this.canvasLayer.redraw();
        }
    },

    /**
     * 添加数据源
     * Parameters :
     * dataSource
     */
    addDataSource : function(dataSource){
        this.canvasLayer.addDataSource(dataSource);
    },

    /**
     * 根据dataSoucceId移除数据源
     * Parameters :
     * dataSoucceId
     */
    removeDataSourceById:function(dataSoucceId){
        this.canvasLayer.removeDataSourceById(dataSoucceId);
    },

    onRemove: function (map) {
        L.DomUtil.remove(this.canvasLayer.root);
    },

    addToMap:function(map){
        map.addLayer(this);
    },

    /**
     * 根据屏幕坐标获取feature
     * Parameters :
     * x
     * y
     */
    getFeatureByXY:function(x,y){
        return this.canvasLayer.getFeatureByXY(x,y);
    },

    /**
     * 是否支持isImportant属性，默认值为true
     * Parameters :
     * b
     */
    setHasImportant:function(b){
        if(this.canvasLayer){
            this.canvasLayer.hasImportant = b;
        }
    },

    /**
     * 获取支持isImportant属性，返回true 或者false
     */
    getHasImportant:function(){
        if(this.canvasLayer){
            return this.canvasLayer.hasImportant;
        }else{
            return true;
        }
    },

    CLASS_NAME: "OpenLayers.Layer.GWVTAnno"

});
///<jscompress sourcefile="AbstractDataHolder.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
function AbstractDataHolder(config,drawerCalss) {
    this.layerDataMap = config.layerDataMap;
    this.extent = config.extent;
    this.ctx = config.ctx;
    this.ratio = config.ratio;
    this.control = config.control;
    this.drawerCalss = drawerCalss;
    this.config = config;
    this.textures = config.textures;

    this._emptyDrawer = function(styleLayerID){
        var drawer = new this.drawerCalss(null);
        return drawer;
    }

    this.getLayer = function(dataLayerID,styleLayerID){
        if(styleLayerID == null){
            styleLayerID = dataLayerID;
        }

        if(null == this.layerDataMap){
            return this._emptyDrawer(styleLayerID);
        }


        //判断其他图层是否显示Control otherDisplay,如果是其他图层不显示，则需要在这里处理
        if(this.control != null) {
            //      console.log(this.control.controlObj.otherDisplay);
            if (this.control.controlObj.otherDisplay == false) {
                if (this.control.controlObj.controlLayersArr.indexOf(styleLayerID) == -1) {
                    return this._emptyDrawer(styleLayerID);
                }
            }
        }


        var data = this.layerDataMap[dataLayerID];

        if(data == null){
            return this._emptyDrawer(styleLayerID);
        }else{
            //修正一个十分傻逼的错误,好吧，我英语不好
            if(data.datas){
                data.features = data.datas;
            }
            // delete data.datas;

            if(data.features == null){
                return this._emptyDrawer(styleLayerID);
            }
            var propertyGetter = null;
            if(null !== data.fieldsConfig){
                propertyGetter = new PropertyGetter(data.fieldsConfig);
            }

            this.config['dataLayerID'] = dataLayerID;
            this.config['styleLayerID'] = styleLayerID;
            this.config['propertyGetter'] = propertyGetter;
            this.config['control'] = this.control;
            this.config['textures'] = this.textures;


            var drawer = new this.drawerCalss(this.config);



            if(!Array.isArray(data.features)){
                for(var index in data.features){
                    var feature = data.features[index];
                    feature.type = data.type;
                    drawer.addFeatures(feature);
                }
            }else {
                var feature = data.features;
                feature.type = data.type;
                drawer.addFeatures(feature);
            }
            return drawer;
        }
    }

    this.getGroupLayer = function(dataLayerID,value,styleLayerID){

        if(this.layerDataMap == null){
            return this._emptyDrawer(styleLayerID);
        }
        if(styleLayerID == null){
            styleLayerID = dataLayerID;
        }
        //判断其他图层是否显示Control otherDisplay,如果是其他图层不显示，则需要在这里处理
        if(this.control != null) {
            //      console.log(this.control.controlObj.otherDisplay);
            if (this.control.controlObj.otherDisplay == false) {
                if (this.control.controlObj.controlLayersArr.indexOf(styleLayerID) == -1) {
                    return this._emptyDrawer(styleLayerID);
                }
            }
        }

        var data = this.layerDataMap[dataLayerID];
        if(this.layerDataMap == null){
            return this._emptyDrawer(styleLayerID);
        }
        if(data == null){
            return this._emptyDrawer(styleLayerID);
        }
        if(data.datas == null && data.data == null ){
            return this._emptyDrawer(styleLayerID);
        }

        var valueArr = value.split(',');
        var length = valueArr.length;
        if(length == 0){
            return this._emptyDrawer(styleLayerID);
        }
        var propertyGetter = null;
        if(data.fieldsConfig != null){
            propertyGetter = new PropertyGetter(data.fieldsConfig);
        }
        this.config['dataLayerID'] = dataLayerID;
        this.config['styleLayerID'] = styleLayerID;
        this.config['propertyGetter'] = propertyGetter;
        this.config['control'] = this.control;
        this.config['textures'] = this.textures;

        var drawer = new this.drawerCalss(this.config);

        if(data.data == null){
            data.features = data.datas;
        }else{
            data.features = data.data;
        }
        for(var i = 0 ; i < length ; i ++){
            var dataArr = data.features[valueArr[i]]
            if(dataArr == null){
                continue;
            }
            dataArr.type = data.type;
            drawer.addFeatures(dataArr);
        }
        return drawer;
    }
}
///<jscompress sourcefile="AbstractVTileProcess.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
   function AbstractVTileProcess(config) {
    if(config){
        //放数据的容器
        this.featuresArr = [];
        //属性构造器
        this.propertyGetter = config.propertyGetter;
        //网格
        this.extent = config.extent;
        /**
         * 缩放比例
         * @type {*|number}
         */
        this.ratio = config.ratio;
        this.resize = false;
        if(this.ratio != 1){
            this.resize = true;
        }

        /**
         * 等级
         */
        this.level = this.extent.level;
        /**
         * 数据层级ID
         */
        this.dataLayerID = config.dataLayerID;
        /**
         * 样式层级ID
         */
        this.styleLayerID = config.styleLayerID;
        /**
         * 过滤器
         * @type {*|null}
         */
        this.control = config.control;
    }


    /**
     * 加入处理数据
     * @param features
     */
    this.addFeatures = function(features){
        this.featuresArr.push(features);
    }

    /**
     * 加入处理样式
     * @param fn
     */
    this.setStyle = function(fn){
        this.styleOperator = fn;
    }


    /**
     *处理
     */
    this.process = function(){
        var queryFilter = null;


        if (this.featuresArr == null) {
            return;
        }
        var length = this.featuresArr.length;
        if (length == 0) {
            return;
        }
        for (var i = 0; i < length; i++) {
            var features = this.featuresArr[i];
            this._processFeatures(features);
        }


    }



    this._processFeature = function(gjson){
        throw "抽象方法"
    }

    this._processFeatures = function(features) {
        for (var i = 0; i < features.length; i++) {
            var gjson = features[i];
            this._processFeature(gjson);
        }
        return;
    }

    this._getProperty = function(data){
        return data[1];
    }

    this._getPoints = function(data){
        return data[2];
    }
    this._getType = function(data){
        return data[0];
    }
    this._filterByStyle = function(gjson) {
        var type = this._getType(gjson);
        var points = this._getPoints(gjson);
        var property = this._getProperty(gjson);
        if(points == null){
            throw "绘制失败,数据中缺少Geometry";
        }
        if(type == null){
            type = "POLYGON";
        }
        var controlRes = null;
        if(this.styleOperator == null){
            return null;
        }else {
            this.propertyGetter;
            var id = this.propertyGetter.getId(property);
            var _propertyGetter = this.propertyGetter;
            var get = function(fieldName){
                return _propertyGetter.get(property,fieldName);
            }
            if(this.control) {
                if(typeof this.control.controlFn == "function") {
                    controlRes = this.control.controlFn.call({}, id, get, this.styleLayerID);
                    if (controlRes == false || controlRes == null) {
                        return {
                            display:false
                        };
                    }
                }
            }
            var style = this.styleOperator.call({},this.level,get);
            //   } catch (e) {
            //        throw e;
            //    }
        }
        if(style == null){
            return null;
        }
        if(style.display != null){
            if (style.display == false) {
                return {
                    display:false
                };
            }
        }
        if(controlRes != null) {
            style.customeColor = controlRes;
        }
        return style;
    }

}
///<jscompress sourcefile="BackgroundDrawer.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
function BackgroundDrawer(config) {
    this.ratio = config.ratio;
    this.datasArr = [];

    this.ctx = config.ctx;
    this.extent = config.extent;
    this.control = config.control;
    this.styleFn = null;
    this.drawable = false;

    this.getName = function(){
        return this.name;
    }

    /**
     * 加入样式队列
     * @param fn
     */
    this.setStyle = function(fn){
        this.styleFn = fn;
    }


    this.draw = function(){
        this.drawable = true;
        this.doDraw();
    }

    /**
     * 绘制
     */
    this.doDraw = function(layerFilter) {
        if(this.drawable) {
            // console.log(this.control.controlObj)
            if(this.control != null) {
                if(this.control.controlObj != null) {
                    if (this.control.controlObj.otherDisplay == false) {

                        return;
                    }
                }
            }

            var style = null;
            style = this.styleFn.call({}, this.level);
            if(style.backgroundColor == "undefined"){
                return;
            }
            if(style.backgroundColor) {
                this.ctx.fillStyle = style.backgroundColor;
            }
            if(style.fillOpacity) {
                this.ctx.globalAlpha = style.fillOpacity/100;
            }else{
                this.ctx.globalAlpha = 1;
            }

            this.ctx.fillRect(0, 0, 512 * this.ratio, 512 * this.ratio);

        }
    }
}
///<jscompress sourcefile="DataHolder.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
function DataHolder(config) {
    AbstractDataHolder.apply(this,[config,Drawer]);

    this.getBackground = function(){
        var backgroundDrawer = new BackgroundDrawer({
            extent:this.extent,
            ctx:this.ctx,
            control:this.control,
            ratio:this.ratio
        })
        return backgroundDrawer;
    };

    this.getWatermark = function(){

    }
}
///<jscompress sourcefile="Drawer.js" />
/**
 * Created by kongjian on 2017/5/1.
 */
function Drawer(config){
    AbstractVTileProcess.apply(this,[config]);

    // if(config == null){
    //     return;
    // }
    if(config){
        this.ctx = config.ctx;
        this.shadowDatas = [];
        this.textures = config.textures;
    }


    this.draw = function(){
        if (this.featuresArr == null) {
            return;
        }
        this.process();
        for(var j = 0;j < this.shadowDatas.length ; j++){
            var shadowData = this.shadowDatas[j];
            this._drawShape(shadowData.data);
            this._processShadowEnd(shadowData.style);
        }
    }
    this._processShadowEnd = function(style){
        this.ctx.closePath();
        if(style['shadowColor']){
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = style['shadowColor'];
            this.ctx.fill();
        }
    }


    this._drawShape = function(points) {
        var context = this.ctx;
        if (!points.length) {
            return;
        }

        context.beginPath();
        if(this.resize){
            context.moveTo(points[0]* this.ratio, points[1]* this.ratio);
            for (var i = 2, il = points.length; i < il; i += 2) {
                context.lineTo(points[i]* this.ratio, points[i + 1]* this.ratio);
            }
        }else{
            context.moveTo(points[0], points[1]);
            for (var i = 2, il = points.length; i < il; i += 2) {
                context.lineTo(points[i], points[i + 1]);
            }
        }
        context.closePath();
    }


    this._processFeature = function(gjson) {
        var style = this._filterByStyle(gjson);
        if (style == null) {
            return;
        }
        if (style.display == false) {
            return;
        }
        this._beginDraw();
        this._drawFeature(gjson,style);
    }
    this._beginDraw = function(){
        this.ctx.beginPath();
    }
    this._drawFeature = function(gjson,style){
        var type = this._getType(gjson);
        var points = this._getPoints(gjson);
        var property = this._getProperty(gjson);
        if(points == null){
            throw "绘制失败,数据中缺少Geometry";
        }
        if(type == null){
            type = "POLYGON";
        }
        var sparsity = null;
        if(style.sparsity == null){


        }else {
            sparsity = parseFloat(style.sparsity);
        }
        switch (type) {
            case "PT":
                this._processPoint(points);
                break;
            case "LINESTRING":
                this._processLineString(points,sparsity);
                this._processLineStringEnd(style);
                break;
            case "MULTILINESTRING":
                this._processLineString(points,sparsity);
                this._processLineStringEnd(style);
                break;
            case "MULTIPOLYGON":
                this._processPolygon(points,sparsity);
                this._processPolygonEnd(style);
                break;
            case "POLYGON":
                this._processPolygon(points,sparsity);
                this._processPolygonEnd(style);
                break;
            default:
                break;
        }
        if(style['shadowColor']){
            this._processShadow(points,style,type);
        }

    }
   this._processShadow = function(components,style,type) {
        var len = components.length;
        for (var i = 0; i < len; i++) {
            var component = components[i];

            if (Array.isArray(component)) {
                if (component.length == 0) {
                    return;
                }
                if (Array.isArray(component[0])) {
                    this._processShadow(component);
                } else {
                    this._drawShadow(component, style, type);
                }
            }else{
                var PS = component.PS;
                this._drawShadow(PS, style, type);
            }
        }
    }

    this._drawShadow = function(points,style,type){
        var h = -3.5 ;
        if(type == 'MULTIPOLYGON' || type =='POLYGON'){
            for(var i = 0; i < points.length - 3; i += 2){
                var _a = {};
                var _b = {};
                _a.x = points[i];
                _a.y = points[i + 1];
                _b.x = points[i + 2];
                _b.y = points[i + 3];

                var ax = _a.x;
                var ay =  _a.y+h;
                var bx = _b.x ;
                var by = _b.y+h;
                if ((bx - ax) * (_a.y - ay) < (_a.x - ax) * (by - ay)) {
                    // this._drawShape([
                    //     bx , by ,
                    //     ax , ay ,
                    //     _a.x, _a.y,
                    //     _b.x, _b.y
                    // ],true);
                    // this._processShadowEnd(style);
                    var shadowData = {};
                    shadowData.data = [
                        bx , by ,
                        ax , ay ,
                        _a.x, _a.y,
                        _b.x, _b.y
                    ];
                    shadowData.style =style;
                    this.shadowDatas.push(shadowData);
                }
            }
        }
    }




    this._processPoint = function(points){

    }
    this._processLineString = function(components,sparsity) {
        if (Array.isArray(components[0])) {
            var len = components.length;
            for (var i = 0; i < len; i++) {
                var component = components[i];
                this._processLineString(component,sparsity);
            }
        } else {
            this._renderLinePath(components, false,sparsity);
        }
    }

    this._processLineStringEnd = function(style) {
        var stroke = true;

        if (style.stroke == false) {
            stroke = false;
        }
        if (stroke != false) {
            if (this.resize) {
                this.ctx.lineWidth = style.strokeWidth * this.ratio;
            }else{
                this.ctx.lineWidth = style.strokeWidth;
            }
            this.ctx.strokeStyle = style.strokeColor;
            this.ctx.globalAlpha = style.strokeOpacity;
            if (style.dash != null) {
                this.ctx.setLineDash(style.dash);
            }
            if (style.lineCap) {
                this.ctx.lineCap = style.lineCap;
            }
            this.ctx.stroke();

            var customeColor = style['customeColor'];

            if (typeof customeColor == "object" && customeColor['color'] != null) {
                this.ctx.strokeStyle = customeColor['color'];
                this.ctx.globalAlpha = customeColor['opacity'];
                this.ctx.stroke();
            }
            this.ctx.setLineDash([])
            this.ctx.lineJoin = "round";
            this.ctx.lineCap = "butt";
        }
    }

    this._processPolygon = function(components,sparsity){
        if (Array.isArray(components[0])) {
            var len = components.length;
            for (var i = 0; i < len; i++) {
                var component = components[i];
                this._processPolygon(component,sparsity);
            }
        } else {
            this._renderLinePath(components, true , sparsity);
        }
    }

    this._processPolygonEnd = function(style){
        var stroke = false;
        var fill = false;
        if (style.stroke == true) {
            stroke = true;
        }
        if(style.fill == true){
            fill = true;
        }
        if (fill) {
            if(style['fillColor']) {
                this.ctx.fillStyle = style['fillColor'];
            }
            if(style['fillOpacity']) {
                this.ctx.globalAlpha = style['fillOpacity'];
            }else{
                this.ctx.globalAlpha = 1;
            }

            this.ctx.fill();
        }
        if (stroke) {
            if(style['strokeWidth']) {

                if(this.resize){
                    this.ctx.lineWidth = style.strokeWidth * this.ratio;
                }else{
                    this.ctx.lineWidth = style.strokeWidth;
                }
            }
            if(style['strokeColor']) {
                this.ctx.strokeStyle = style['strokeColor'];
            }
            if(style['strokeOpacity']) {
                this.ctx.globalAlpha = style['strokeOpacity'];
            }else{
                this.ctx.globalAlpha = 1;
            }
            this.ctx.stroke();
        }
        if(style['texture']){
            var textureId = style['texture'];
            var texture = this.textures(textureId);
            if(texture != null){
                var ratio = style['textureratio'];
                if(ratio == null){

                }
                var pat = this.ctx.createPattern(texture.toPattern(ratio),"repeat");
                this.ctx.fillStyle = pat;
                this.ctx.fill();
            }
        }
        var customeColor = style['customeColor'];


        if (typeof customeColor == "object" && customeColor['color'] != null) {

            this.ctx.fillStyle = customeColor['color'];
            this.ctx.globalAlpha = customeColor['opacity'];
            this.ctx.fill();
        }
    }


    this._isSavePoint = function(previous,now,next,sparsity){

        if(previous == null || next == null){
            return true;
        }
        var dx = now[0] - previous[0];
        var dy = now[1] - previous[1];
        var dx1 = next[0] - now[0];
        var dy1 = next[1] - now[1];

        if(Math.sqrt(dx * dx + dy * dy) < sparsity && Math.sqrt(dx1 * dx1 + dy1 * dy1) < sparsity){
            return false
        }else{
            return true;
        }
    }

    this._renderLinePath = function(points,close,sparsity){
        //   sparsity = 2.5
        if(this.resize){
            this.ctx.moveTo(points[0] * this.ratio , points[1] * this.ratio);
        }else{
            this.ctx.moveTo(points[0], points[1]);
        }

        var i = 2;
        var len = points.length;
        if(len % 2 != 0){
            len = len - 1;
        }
        var previous = [points[0],points[1]];
        var now = null;
        var next = null;
        while(i < len){

            var gap = 0;
            now = [points[i], points[i + 1]];
            if(sparsity != null) {
                if (i + 2 > len) {
                    next = null;
                } else {
                    next = [points[i + 2], points[i + 3]];
                }

                while (!this._isSavePoint(previous, now, next, sparsity * this.ratio)) {
                    gap = gap + 2;
                    now = [points[i + gap], points[i + 1 + gap]];
                    if (i + 2 + gap > len) {
                        next = null;
                    } else {
                        next = [points[i + 2 + gap], points[i + 3 + gap]];
                    }
                }
            }

            if(this.resize) {
                this.ctx.lineTo(now[0] * this.ratio , now[1] * this.ratio );
            }else{
                this.ctx.lineTo(now[0], now[1]);
            }
            previous = now;
            i = i + gap + 2;
        }
        if(close){
            if(this.resize){
                this.ctx.lineTo(points[0] * this.ratio , points[1] * this.ratio);
            }else{
                this.ctx.lineTo(points[0], points[1]);
            }
            this.ctx.closePath();
        }
    }

}
///<jscompress sourcefile="GXYZUtil.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
Custom.GXYZUtil =function() {
    tileSize:256,
    /**
     * 设置过滤条件
     */
    this.setFilter = function(filter,callback){
        for(var i = 0;i<filter.layers.length;i++){
            var filterLayer = filter.layers[i];
            if(!filterLayer.id){
                filter.layers.splice(i,1);
            }
        }

        var control = JSON.stringify(filter);
        if(this.isIE()){
            //设置过滤条件
            Custom.getJSON({type:'post',url:this.host + '/mapserver/vmap/'+this.servername+'/setControl',
                data:'control= '+ control,
                dataType:'json'}).then(function(result){
                    result.isIE = true;
                    callback(result);
                }.bind(this));
        }else{
            var result = {isIE:false,id:control};
            callback(result);
        }
    };


    /**
     * 解析url
     */
    this.parseUrl = function(url){
        var urlParts = url.split('?');
        // var urlPartOne = urlParts[0].split('/mapserver/vmap/');
        var urlPartOne = urlParts[0].split('/mapserver/');
        this.host = urlPartOne[0];
        this.servername = urlPartOne[1].split('/')[1];
        var params = urlParts[1].split('&');
        for(var i = 0;i<params.length;i++){
            var param = params[i];
            var keyValue = param.split('=');
            if(keyValue[0] == 'styleId'){
                this.styleId = keyValue[1];
                return;
            }
        }
    };

    /**
     * 拾取要素
     * Parameters :
     * row - 要拾取的要素所在的行
     * col - 要拾取的要素所在的列
     * level - 要拾取的要素所在的层级
     * x - 要拾取的要素所在瓦片内的x坐标
     * y - 要拾取的要素所在瓦片内y坐标
     * control - 过滤的json对象
     * controlId - 过滤对象在服务器上存的key
     * callback - 拾取到要素后的回调函数
     */
    this.pickupFeatures = function(row,col,level,x,y,control,controlId,callback) {
        var url = this.host + '/mapserver/pickup/'+this.servername+'/getData?x='+col +'&y='+row+'&l='+level+
            '&pixelX='+x+'&pixelY='+y+'&styleId='+this.styleId+'&tilesize='+this.tileSize+'&clientVersion='+Custom.Version;
        if(control){
            url = url + '&control='+control;
        }
        if(controlId){
            url = url + '&controlId='+controlId;
        }

        Custom.getJSON({
            url:url,
            dataType: "json"}).then(function (features) {
                callback(features);
            },function(){
                callback([]);
            })
    };

    /**
     * 构造高亮的filter
     * Parameters :
     * features - 要素数组
     * style - 高亮样式 如：{color:"red",opacity:0.8};
     */
    this.CreateHighlightFilter = function(layerFeatures,style){
        var filter = new Custom.Filter();
        filter.otherDisplay = false;

        for(var layerId in layerFeatures){
            var fs = layerFeatures[layerId];
            var hasFid = false;
            for(var fid in fs){
                var filterLayer = new Custom.FilterLayer();
                filterLayer.id = layerId;
                filterLayer.idFilter = fid;
                filterLayer.color = style;
                filter.addFilterLayer(filterLayer);
                hasFid = true;
            }
            if(!hasFid){
                var filterLayer = new Custom.FilterLayer();
                filterLayer.id = layerId;
                filterLayer.color = style;
                filter.addFilterLayer(filterLayer);
            }
        }
        return filter;
    };


    /**
     * 构造高亮的filter,每个要素都有高亮样式
     * Parameters :
     * layerFeatures - 要素数组
     */
    this.CreateEveryHighlightFilter = function(layerFeatures){
        var filter = new Custom.Filter();
        filter.otherDisplay = false;

        for(var layerId in layerFeatures){
            var fs = layerFeatures[layerId];
            var layerStyle = fs.style;
            var hasFid = false;
            for(var fid in fs){
                var style = fs[fid].style;
                style.color = style.color.replace('#','%23');
                var filterLayer = new Custom.FilterLayer();
                filterLayer.id = layerId;
                filterLayer.idFilter = fid;
                filterLayer.color = style;
                filter.addFilterLayer(filterLayer);
                hasFid = true;
            }
            if(!hasFid && layerStyle){
                layerStyle.color = layerStyle.color.replace('#','%23');
                var filterLayer = new Custom.FilterLayer();
                filterLayer.id = layerId;
                filterLayer.color = layerStyle;
                filter.addFilterLayer(filterLayer);
            }
        }
        return filter;
    };

    /**
     * 是否为ie浏览器
     */
    this.isIE = function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    };
}
///<jscompress sourcefile="GVMapGridUtil.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
Custom.GVMapGridUtil =function(isDynamicMap) {
    //继承DataSource
    Custom.GXYZUtil.apply(this);

    //纹理
    this.textures = {};

    this.isDynamicMap = isDynamicMap;

    this.styleObj = {};

    /**
     * 设置样式文件
     */
    this.setStyle = function(styleObj){
        this.styleObj = styleObj;
        // this.styleFun = new Function("drawer","level", styleStr);
        // if(this.styleDef){
        //     this.styleDef.resolve();
        // }
    }

    this.formatStyle = function(styleObj,successFun){
        this.styleObj = styleObj;
        var styleJson = JSON.stringify(this.styleObj);
        Custom.getJSON({type:'post',url:this.host + '/mapserver/styleInfo/format.do',
            data:'styleJson= '+ styleJson,
            dataType:'json'}).then(function(result){
            this.styleFun = new Function("drawer","level", result.styleJs);
            successFun();
        }.bind(this));
    }

    /**
     * 加载样式文件和纹理数据
     */
    this.loadStyle = function(styleType){
        var def1 = new Deferred();
        var def2 = new Deferred();


        if(!styleType){
            styleType = 'label';
        }

        if(this.isDynamicMap){
            var styleJson = JSON.stringify(this.styleObj);
            // Custom.getJSON({type:'post',url:this.host + '/mapserver/styleInfo/format.do',
            Custom.getJSON({type:'post',url:'http://127.0.0.1/mapserver/styleInfo/format.do',
                data:'styleJson= '+ styleJson,
                dataType:'json'}).then(function(result){
                this.styleFun = new Function("drawer","level", result.styleJs);
                def1.resolve();
            }.bind(this));

        }else{
            //请求样式文件
            Custom.getJSON({url:this.host + '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/'+styleType+'/style.js',dataType:'text'})
                .then(function(result) {
                    this.styleFun = new Function("drawer","level", result);
                    def1.resolve();
                }.bind(this));
        }


        //请求图标纹理
        Custom.getJSON({url:this.host+ '/mapserver/styleInfo/'+this.servername+'/'+this.styleId+'/label/texture.js',dataType:'text'}).then(function(result){
            var textures = JSON.parse(result);
            var totalCount = 0;
            for(var i in textures){
                totalCount++;
            }

            if(totalCount == 0){
                def2.resolve();
                return;
            }

            var count = 0;
            for(var key in textures){
                var img = new Image();
                img.name = key;
                img.onload = function(data) {
                    count++;
                    var name = data.target.name;
                    this.textures[name] =data.target;
                    if(count == totalCount){
                        def2.resolve();
                    }
                }.bind(this);
                img.src = textures[key];
            }
        }.bind(this));

        return [def1,def2];
    }
}
///<jscompress sourcefile="PropertyGetter.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
function PropertyGetter(propertyConfig) {
    this.propertyConfig = {};

    for(var i = 0 ;i < propertyConfig.length; i ++){
        if(propertyConfig[i].id == 'true' || propertyConfig[i].id == true){

            this.idIndex = propertyConfig[i].index;
        }
        this.propertyConfig[propertyConfig[i].name] = parseInt(propertyConfig[i].index);
    }

    this.get = function(data, propertyName){

        var value = data[this.propertyConfig[propertyName]];
        return value;
    };

    this.getId = function(data){
        return data[this.idIndex];
    }
}
///<jscompress sourcefile="GVMapGrid.js" />
/**
 * Created by kongjian on 2017/9/26.
 * 前端绘制底图layer
 */
L.GVMapGrid  = L.TileLayer.extend({
    //多个服务器url的域名，用于解决一个域名只有6条请求管线的限制
    urlArray:[],
    // 不带过滤条件的url
    sourceUrl: null,
    // 纹理图标集合
    textures: {},
    //瓦片队列
    tileQueue:[],
    //缩放比例
    ratio:1,
    //过滤json对象
    control:null,
    //过滤的id
    controlId:null,
    //瓦片大小
    tilesize:256,
    initialize: function(url, options) {
        if(window.devicePixelRatio > 1.5){
            this.ratio = 2;
        }

        if(!this.sourceUrl){
            this.sourceUrl = url;
        }

        if(options &&options.tileSize){
            this.tilesize = options.tileSize;
        }


        this.gVMapGridUtil = new Custom.GVMapGridUtil();
        this.gVMapGridUtil.tileSize = this.tilesize;
        this.gVMapGridUtil.parseUrl(url);

        this._url = url +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version;
        L.setOptions(this,options);
        this.hitDetection = options.hitDetection;
        this.on('tileunload', this._onTileRemove);
        this.on('tileload', this._onTileLoad);
        this.on('tileerror', this._onTileError);
    },

    onAdd: function () {
        if(this.control){
            this._url = this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+this.control;
        }
        if(this.controlId){
            this._url = this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&controlId='+this.controlId;
        }

        this._initContainer();

        this._levels = {};
        this._tiles = {};

        var reqArr = this.gVMapGridUtil.loadStyle('layer');
        Promise.all(reqArr).then(function(){
            this._resetView();
            this._update();
        }.bind(this));
    },

    /**
     * 重写构造瓦片的方法
     */
    createTile: function (coords, done) {
        //从队列中取canvas，避免频繁创建canvas
        var tile = this.tileQueue.pop();
        if(!tile){
            tile = this.initTile();
        }else{
            this._cleanTile(tile);
        }

        var url = this.getTileUrl(coords);

        Custom.getJSON({url:url,dataType:'json'})
            .then(function(data) {
                    tile.data = data;
                    this._tileOnLoad.apply(this, [done,tile]);
            }.bind(this),
              function(error){
                  this._tileOnError.apply(this, [done, tile,error]);
              }.bind(this));

        return tile;
    },

    /**
     * 获取url的方法
     */
    getTileUrl: function (coords) {
        var data = {
            r: L.Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        if(this.urlArray.length == 0){
            return L.Util.template(this._url, L.extend(data, this.options));
        }else{
            //从urlArray中随机取出一个url
            var len = this.urlArray.length-1;
            var index = Math.round(Math.random()*len);
            var url = this.urlArray[index];

            var array = this._url.split('/mapserver');
            var partUrl = array[1];
            url = url + '/mapserver'+partUrl;
            return L.Util.template(url, L.extend(data, this.options));
        }
    },

    /**
     *  初始化canvas
     */
    initTile:function(){
        // console.time('initTile');
        var tile = document.createElement("canvas");
        tile.style.width = this.tilesize + "px";
        tile.style.height = this.tilesize + "px";
        tile.width = this.tilesize;
        tile.height = this.tilesize;

        var ctx = tile.getContext("2d",{isQuality:true});
        tile.ctx = ctx;
        // console.timeEnd('initTile');
        return tile;
    },

    //移除瓦片
    _onTileRemove: function (e) {
        //加入到瓦片队列
        this.tileQueue.push(e.tile);
    },

    /**
     *  重写，取消请求的操作
     */
    _abortLoading: function () {
        var i, tile;
        for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;

                if (!tile.complete) {
                    L.DomUtil.remove(tile);
                }
            }
        }
    },

    _onTileLoad:function(item){
        var tile = item.tile;
        this._drawTile(tile,tile.data);
        tile.complete = true;
    },

    _onTileError:function(item){
        var tile = item.tile;
        tile.complete = true;
        this.tileQueue.push(tile);
    },

    _tileOnError: function (done, tile, e) {
        done(e, tile);
    },

    _drawTile:function(tile,features){
        // console.time('_drawTile');
        var ctx = tile.ctx;
        var level = Math.floor(this._map.getZoom());
        var holder = new DataHolder({
            layerDataMap:features,
            ctx:ctx,
            ratio:1,
            control:null,
            textures:this.gVMapGridUtil.textures,
            extent:{
                level:level
            }
        });
        this.gVMapGridUtil.styleFun.call({}, holder, level);
        // console.timeEnd('_drawTile');
    },

    _cleanTile:function(tile){
        tile.ctx.clearRect(0, 0, this.tilesize, this.tilesize);
    },

    /**
     * 设置过滤条件
     */
    setFilter:function(filter){
        if(!this._url ||  !filter || (filter.layers.length == 0 && filter.order.length == 0)){
            return;
        }

        this.gVMapGridUtil.setFilter(filter,function(result){
            if(result.isIE){
                this.controlId =result.id;
                this.setUrl(this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version + '&controlId='+result.id);
            }else{
                this.control =result.id;
                this.setUrl(this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+result.id);
            }
        }.bind(this));
    },

    /**
     * 根据屏幕坐标获取拾取到的要素
     * Parameters :
     * x -
     * y -
     * callback - 拾取成功的回调函数
     */
    getFeatureByXY:function(x,y,callback){
        var latLng = this._map.containerPointToLatLng(new L.point(x,y));
        this.getFeatureByLonlat(latLng,callback);
    },

    /**
     * 根据地理坐标获取拾取到的要素
     * Parameters :
     * lonlat - 地理坐标对象
     * callback - 拾取成功的回调函数
     */
    getFeatureByLonlat:function(latLng,callback){
        var maxBounds = this._map.options.crs.projection.bounds;
        //地图当前范围
        var bounds = this._map.getBounds();
        var pBounds = this._map.getPixelBounds();
        //地图当前分辨率
        var res = (bounds._northEast.lat - bounds._southWest.lat)/(pBounds.max.y - pBounds.min.y);

        var tileSize = this.options.tileSize;
        var row = (maxBounds.max.y - latLng.lat) /(res*tileSize);
        var col = (latLng.lng - maxBounds.min.x)/(res*tileSize);

        var level = this._map.getZoom();
        var tx = (col - Math.floor(col))*tileSize;
        var ty = (row - Math.floor(row))*tileSize;

        this.gVMapGridUtil.pickupFeatures(row,col,level,tx,ty,this.control,this.controlId,function(features){
            callback(features);
        });
    },

    /**
     * 根据指定的样式高亮要素
     * Parameters :
     * layerFeatures - 要素数组
     * style - 高亮样式 如：{color:"red",opacity:0.8};
     */
    highlightFeatures:function(layerFeatures,style){
        //获取高亮的过滤条件
        var filter = this.gVMapGridUtil.CreateHighlightFilter(layerFeatures,style);
        //如果没有过滤任何要素
        if(filter.layers.length == 0){
            return;
        }

        style.color = style.color.replace('#','%23');
        if(!this.highlightLayer){
            //构造高亮图层
            var url = this.gVMapGridUtil.host + '/mapserver/vmap/'+this.gVMapGridUtil.servername+'/getMAP?x={x}&y={y}&l={z}'
                +'&styleId='+this.gVMapGridUtil.styleId;
            if(this.control){
                url = url + '&control='+this.control;
            }
            if(this.controlId){
                url = url + '&controlId='+this.controlId;
            }


            this.highlightLayer = new L.GXYZ(url,this.options);
            this._map.addLayer(this.highlightLayer);
        }

        this.highlightLayer.options.opacity = style.opacity;
        this.highlightLayer._updateOpacity();
        //设置高亮过滤条件
        this.highlightLayer.setFilter(filter);
        //获取当前图层的index
        var index = this.options.zIndex;
        //设置高亮图层在当前底图图层之上
        this.highlightLayer.setZIndex(index+1);
    },


    /**
     * 取消高亮
     */
    cancelHighlight:function(){
        if(this.highlightLayer){
            this._map.removeLayer(this.highlightLayer);
            this.highlightLayer = null;
        }
    }
})
///<jscompress sourcefile="GXYZ.js" />
/**
 * Created by kongjian on 2017/7/3.
 * 后端绘制底图layer
 */
L.GXYZ  = L.TileLayer.extend({
    //多个服务器url的域名，用于解决一个域名只有6条请求管线的限制
    urlArray:[],
    // 不带过滤条件的url
    sourceUrl: null,
    //底图图层的代理类，负责封装过滤，拾取高亮等接口
    gxyzUtil:null,
    //高亮图层
    highlightLayer:null,
    //缩放比例
    ratio:1,
    //过滤json对象
    control:null,
    //过滤的id
    controlId:null,
    //瓦片大小
    tilesize:256,
    initialize: function(url, options) {
        if(window.devicePixelRatio > 1.5){
            this.ratio = 2;
        }

        if(!this.sourceUrl){
            this.sourceUrl = url;
        }

        if(options &&options.tileSize){
            this.tilesize = options.tileSize;
        }

        this.gxyzUtil = new Custom.GXYZUtil();
        this.gxyzUtil.tileSize = this.tilesize;
        this.gxyzUtil.parseUrl(url);

        this._url = url +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version;
        L.setOptions(this,options);
    },

    onAdd: function () {
        if(this.control){
            this._url = this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+this.control;
        }
        if(this.controlId){
            this._url = this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&controlId='+this.controlId;
        }

        this._initContainer();

        this._levels = {};
        this._tiles = {};

        this._resetView();
        this._update();
    },

    /**
     * 获取url的方法
     */
    getTileUrl: function (coords) {
        var data = {
            r: L.Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        if(this.urlArray.length == 0){
            return L.Util.template(this._url, L.extend(data, this.options));
        }else{
            //从urlArray中随机取出一个url
            var len = this.urlArray.length-1;
            var index = Math.round(Math.random()*len);
            var url = this.urlArray[index];

            var array = this._url.split('/mapserver');
            var partUrl = array[1];
            url = url + '/mapserver'+partUrl;
            return L.Util.template(url, L.extend(data, this.options));
        }
    },

    /**
     * 设置过滤条件
     */
    setFilter:function(filter){
        if(!this._url ||  !filter || (filter.layers.length == 0 && filter.order.length == 0)){
            return;
        }

        this.gxyzUtil.setFilter(filter,function(result){
            if(result.isIE){
                this.controlId =result.id;
                this.setUrl(this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version + '&controlId='+result.id);
            }else{
                this.control =result.id;
                this.setUrl(this.sourceUrl +'&ratio='+this.ratio+'&tilesize='+this.tilesize+'&clientVersion='+Custom.Version+ '&control='+result.id);
            }
        }.bind(this));
    },

    /**
     * 根据屏幕坐标获取拾取到的要素
     * Parameters :
     * x -
     * y -
     * callback - 拾取成功的回调函数
     */
    getFeatureByXY:function(x,y,callback){
        var latLng = this._map.containerPointToLatLng(new L.point(x,y));
        this.getFeatureByLonlat(latLng,callback);
    },

    /**
     * 根据地理坐标获取拾取到的要素
     * Parameters :
     * lonlat - 地理坐标对象
     * callback - 拾取成功的回调函数
     */
    getFeatureByLonlat:function(latLng,callback){
        var maxBounds = this._map.options.crs.projection.bounds;
        //地图当前范围
        var bounds = this._map.getBounds();
        var pBounds = this._map.getPixelBounds();
        //地图当前分辨率
        var res = (bounds._northEast.lat - bounds._southWest.lat)/(pBounds.max.y - pBounds.min.y);

        var tileSize = this.options.tileSize;
        var row = (maxBounds.max.y - latLng.lat) /(res*tileSize);
        var col = (latLng.lng - maxBounds.min.x)/(res*tileSize);

        var level = this._map.getZoom();
        var tx = (col - Math.floor(col))*tileSize;
        var ty = (row - Math.floor(row))*tileSize;

        this.gxyzUtil.pickupFeatures(row,col,level,tx,ty,this.control,this.controlId,function(features){
            callback(features);
        });
    },

    /**
     * 根据指定的样式高亮要素
     * Parameters :
     * layerFeatures - 要素map集合
     * style - 高亮样式 如：{color:"red",opacity:0.8};
     */
    highlightFeatures:function(layerFeatures,style){
        //获取高亮的过滤条件
        var filter = this.gxyzUtil.CreateHighlightFilter(layerFeatures,style);
        //如果没有过滤任何要素
        if(filter.layers.length == 0){
            return;
        }

        style.color = style.color.replace('#','%23');
        if(!this.highlightLayer){
            //构造高亮图层
            this.highlightLayer = new L.GXYZ(this.sourceUrl,this.options);
            this._map.addLayer(this.highlightLayer);
        }

        this.highlightLayer.options.opacity = style.opacity;
        this.highlightLayer._updateOpacity();
        //设置高亮过滤条件
        this.highlightLayer.setFilter(filter);
        //获取当前图层的index
        var index = this.options.zIndex;
        //设置高亮图层在当前底图图层之上
        this.highlightLayer.setZIndex(index+1);
    },


    /**
     * 根据指定的样式高亮要素，每个要素都可以有不同的样式
     * Parameters :
     * layerFeatures - 要素map集合
     * opacity - 透明度，所有要高亮的要素都是必须是相同的透明度;
     */
    highlightEveryFeatures:function(layerFeatures,opacity){
        //获取高亮的过滤条件
        var filter = this.gxyzUtil.CreateEveryHighlightFilter(layerFeatures);
        //如果没有过滤任何要素
        if(filter.layers.length == 0){
            return;
        }

        if(!this.highlightLayer){
            //构造高亮图层
            this.highlightLayer = new L.GXYZ(this.sourceUrl,this.options);
            this._map.addLayer(this.highlightLayer);
        }

        this.highlightLayer.options.opacity = opacity;
        this.highlightLayer._updateOpacity();
        //设置高亮过滤条件
        this.highlightLayer.setFilter(filter);
        //获取当前图层的index
        var index = this.options.zIndex;
        //设置高亮图层在当前底图图层之上
        this.highlightLayer.setZIndex(index+1);
    },


    /**
     * 取消高亮
     */
    cancelHighlight:function(){
        if(this.highlightLayer){
            this._map.removeLayer(this.highlightLayer);
            this.highlightLayer = null;
        }
    }



})
///<jscompress sourcefile="GDrawGeomerty.js" />
/**
 * Created by kongjian on 2017/6/26.
 * 绘制点，线面的工具类
 */
Custom.GDrawGeomerty ={
    /**
     * 画点注记图标
     * Parameters:
     *  ctx - 画布对象
     *  hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawPointIcon:function(ctx,hitCtx,hitDetection,feature,textures){
        var style = feature.style;
        if(!style.texture){
            return;
        }

        var width = style.graphicWidth;
        var height = style.graphicHeight;


        var textureKey = style.texture;
        var img = textures[textureKey];
        if(!img){
            return ;
        }

        if(!width || !height){
            width = img.width;
            height = img.height;
        }

        var xOffset =  style.graphicXOffset -0.5 * width;
        var yOffset =  style.graphicYOffset -0.5 * height;

        var point = feature.datas[0][0];
        var x = point[0] + xOffset;
        var y = point[1] + yOffset;
        var opacity = style.pointFillAlpha || 1;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();

        //拾取检测用的矩形
        if (hitDetection) {
            hitCtx.save();
            this.setHitContextStyle(hitCtx,feature.id);
            hitCtx.fillRect(x,y,width,height);
            hitCtx.restore();
        }
    },

    /**
     * 画点注记
     * Parameters:
     *  ctx - 画布对象
     *  hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawPoint:function(ctx,hitCtx,hitDetection,feature){
        if(!feature.label){
            return;
        }

        var style = feature.style;
        var pt = style.textPoint;
        var labelRows = feature.label.split(' ');
        var numRows = labelRows.length;
        var lineHeight = style.pointHeight;
        lineHeight =lineHeight +2;
        if(style.pointHashBackground == true){
            ctx.save();
            ctx.globalAlpha = style.pointBackgroundAlpha;
            ctx.strokeStyle = style.pointBackgroundLineColor;
            ctx.lineWidth = style.pointBackgroundLineWidth;
            ctx.fillStyle = style.pointBackgroundColor;
            ctx.font = style.pointFillFont;
            var rectX= pt[0] - style.pointBackgroundGap;
            var rectY = pt[1]-style.pointBackgroundGap - style.pointHeight/2;

            var maxWidth = 0;
            for (var i = 0; i < numRows; i++) {
                var itemWdith = ctx.measureText(labelRows[i]).width;
                if(itemWdith > maxWidth){
                    maxWidth = itemWdith;
                }
            }
            this.drawRoundRect(ctx,rectX,rectY,maxWidth+style.pointBackgroundGap*2,
                style.pointHeight*numRows+style.pointBackgroundGap*2+(numRows-1)*2,style.pointBackgroundRadius);
            ctx.fill();
            ctx.restore();

            for (var j = 0; j < numRows; j++) {
                if (style.pointHashOutline == true) {
                    ctx.save();
                    ctx.textBaseline = "middle";
                    ctx.globalAlpha = style.pointStrokeAlpha;
                    ctx.strokeStyle = style.pointStrokeStyle;
                    ctx.lineWidth = style.pointLineWidth;
                    ctx.font = style.pointStrokeFont;
                    ctx.strokeText(labelRows[j], pt[0], pt[1]+ (lineHeight * j) );
                    ctx.restore();
                }

                ctx.save();
                ctx.textBaseline = "middle";
                ctx.globalAlpha = style.pointFillAlpha;
                ctx.fillStyle = style.pointFillStyle;
                ctx.font = style.pointFillFont;
                ctx.fillText(labelRows[j], pt[0], pt[1]+ (lineHeight * j) );
                ctx.restore();
            }

            //拾取检测用的矩形
            if (hitDetection) {
                hitCtx.save();
                this.setHitContextStyle(hitCtx,feature.id);
                this.drawHitRoundRect(hitCtx,rectX,rectY,maxWidth+style.pointBackgroundGap*2,style.pointHeight+style.pointBackgroundGap*2,style.pointBackgroundRadius);
                hitCtx.fill();
                hitCtx.restore();
            }
        }else{
            var maxWidth = 0;
            for (var i = 0; i < numRows; i++) {
                if (style.pointHashOutline == true) {
                    ctx.save();
                    ctx.textBaseline = "middle";
                    ctx.globalAlpha = style.pointStrokeAlpha;
                    ctx.strokeStyle = style.pointStrokeStyle;
                    ctx.lineWidth = style.pointLineWidth;
                    ctx.font = style.pointStrokeFont;
                    ctx.strokeText(labelRows[i], pt[0], pt[1]+ (lineHeight * i) );
                    ctx.restore();
                }

                ctx.save();
                ctx.textBaseline = "middle";
                ctx.globalAlpha = style.pointFillAlpha;
                ctx.fillStyle = style.pointFillStyle;
                ctx.font = style.pointFillFont;
                ctx.fillText(labelRows[i], pt[0], pt[1]+ (lineHeight * i) );
                maxWidth = ctx.measureText(labelRows[i]).width > maxWidth?  ctx.measureText(labelRows[i]).width : maxWidth ;
                ctx.restore();
            }


            //拾取检测用的矩形
            if (hitDetection) {
                hitCtx.save();
                this.setHitContextStyle(hitCtx,feature.id);
                hitCtx.textBaseline = "middle";
                hitCtx.fillRect(pt[0],pt[1]- style.pointHeight/2,maxWidth,lineHeight * numRows);
                hitCtx.restore();
            }
        }
    },


    /**
     * 画线注记
     * Parameters:
     *  ctx - 画布对象
     * hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawLine : function(ctx,hitCtx,hitDetection,feature){

        if(feature.lineType == 'text'){
            this.drawLineText(ctx,hitCtx,hitDetection,feature);
        }

        if(feature.lineType == 'code'){
            this.drawLineCode(ctx,hitCtx,hitDetection,feature);
        }

        if(feature.lineType == 'arrow'){
            this.drawLineArrow(ctx,hitCtx,hitDetection,feature);
        }
    },


    /**
     * 画线文本注记
     * Parameters:
     *  ctx - 画布对象
     * hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawLineText : function(ctx,hitCtx,hitDetection, feature){
        var style = feature.style;
        var label = feature.label;
        var textPoints =  feature.textPoints;
        //去掉尾部的空格
        // if(label){
        //     label = label.replace(/(\s*$)/g,"");
        // }
        //只有一个点，或者是有线背景矩形框
        if(style.lineHashBackground == true || textPoints.length == 1){
            var index = Math.floor(textPoints.length/2);
            var localPoint = textPoints[index][0];
            if(textPoints.length == 1){
                this.drawBgText(ctx,label,localPoint,style.backgroundAlpha,
                    style.backgroundLineColor,style.backgroundLineWidth,
                    style.backgroundColor,style.lineFillFont,style.lineBackgroundGap,
                    style.lineHeight,style.lineBackgroundRadius,style.lineHashOutline,
                    style.lineStrokeAlpha,style.lineStrokeStyle,style.lineLineWidth,
                    style.lineStrokeFont,style.lineFillAlpha,style.lineFillStyle,
                    hitCtx,hitDetection,feature.id,false);
            }else{
                this.drawBgText(ctx,label,localPoint,style.backgroundAlpha,
                    style.backgroundLineColor,style.backgroundLineWidth,
                    style.backgroundColor,style.lineFillFont,style.lineBackgroundGap,
                    style.lineHeight,style.lineBackgroundRadius,style.lineHashOutline,
                    style.lineStrokeAlpha,style.lineStrokeStyle,style.lineLineWidth,
                    style.lineStrokeFont,style.lineFillAlpha,style.lineFillStyle,
                    hitCtx,hitDetection,feature.id,true);
            }

        }else {
            //开始绘制线注记
            for (var j = 0; j < label.length; j++) {
                var pa = textPoints[j];
                var angle = pa[1];
                var point = pa[0];
                var labelChar = label.charAt(j);

                if(style.lineHashOutline == true){
                    ctx.save();
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.globalAlpha = style.lineStrokeAlpha;
                    ctx.strokeStyle = style.lineStrokeStyle;
                    ctx.lineWidth = style.lineLineWidth;
                    ctx.font = style.lineStrokeFont;
                    ctx.translate(point[0], point[1]);
                    ctx.rotate(angle * Math.PI / 180);
                    ctx.strokeText(labelChar, 0, 0);
                    ctx.restore();
                }

                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.globalAlpha = style.lineFillAlpha;
                ctx.fillStyle = style.lineFillStyle;
                ctx.font = style.lineFillFont;
                ctx.translate(point[0], point[1]);
                ctx.rotate(angle * Math.PI / 180);
                ctx.fillText(labelChar, 0, 0);
                ctx.restore();


                //拾取检测用的矩形
                if (hitDetection) {
                    hitCtx.save();
                    this.setHitContextStyle(hitCtx,feature.id);
                    hitCtx.translate(point[0], point[1]);
                    hitCtx.rotate(angle * Math.PI / 180);
                    // hitCtx.translate(-style.lineHeight*1.2*0.5, -style.lineHeight*1.2*0.5);
                    hitCtx.fillRect(-style.lineHeight*1.2*0.5, -style.lineHeight*1.2*0.5,style.lineHeight*1.2,style.lineHeight*1.2);
                    hitCtx.restore();
                }

            }
        }
    },

    /**
     * 画线编码注记
     * Parameters:
     *  ctx - 画布对象
     * hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawLineCode : function(ctx,hitCtx,hitDetection,feature){
        var style = feature.style;
        var localPoint =  feature.codePoint;
        var codeLabel = feature.label;
        if(style.showRoadCode == true && codeLabel && codeLabel.length > 0){
            this.drawBgText(ctx,codeLabel,localPoint,style.codeBackgroundAlpha,
                style.codeBackgroundLineColor,style.codeBackgroundLineWidth,
                style.codeBackgroundColor,style.codeLineFillFont,style.codeLineBackgroundGap,
                style.codeLineHeight,style.codeLineBackgroundRadius,style.codeLineHashOutline,
                style.codeLineStrokeAlpha,style.codeLineStrokeStyle,style.codeLineLineWidth,
                style.codeLineStrokeFont,style.codeLineFillAlpha,style.codeLineFillStyle,
                hitCtx,hitDetection,feature.id,true);
        }
    },

    /**
     * 画线箭头
     * Parameters:
     *  ctx - 画布对象
     * hitCtx - 画拾取box的画布对象
     * hitDetection - 是否绘制拾取的box
     * feature - 设置过样式，转换过为屏幕坐标，避让过的注记数据
     */
    drawLineArrow : function(ctx,hitCtx,hitDetection,feature){
        var points = feature.arrowPoint;
        var style = feature.style;
        var p1 = points[0][0];
        var p2 =  points[1][0];
        ctx.save();
        ctx.lineWidth=2;
        ctx.strokeStyle="#666666";
        ctx.fillStyle="#666666";
        //画线
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1]);
        ctx.lineTo(p2[0],p2[1]);
        ctx.stroke();
        //画箭头
        if(style.arrowDirectionValue == 0){
            var startRadians=Math.atan((p2[1]-p1[1])/(p2[0]-p1[0]));
            startRadians+=((p2[0]>p1[0])?-90:90)*Math.PI/180;
            this.drawArrowhead(ctx,p1[0],p1[1],startRadians);
        }else{
            var startRadians=Math.atan((p2[1]-p1[1])/(p2[0]-p1[0]));
            startRadians+=((p2[0]>p1[0])?90:-90)*Math.PI/180;
            this.drawArrowhead(ctx,p2[0],p2[1],startRadians);
        }
        ctx.restore();
    },

    /**
     * 画箭头的头
     * Parameters:
     */
    drawArrowhead : function(ctx,x,y,radians){
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(radians);
        ctx.moveTo(0,0);
        ctx.lineTo(3,6);
        ctx.lineTo(0,5);
        ctx.lineTo(-3,6);
        ctx.closePath();
        ctx.fill();
    },

    /**
     * 画圆角矩形
     */
    drawRoundRect : function(ctx, x, y, width, height, radius){
        ctx.beginPath();
        ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        ctx.lineTo(width - radius + x, y);
        ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        ctx.lineTo(width + x, height + y - radius);
        ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        ctx.lineTo(radius + x, height +y);
        ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        ctx.closePath();
    },

    /**
     * 绘制带背景的线文本
     */
    drawBgText : function(ctx,label,localPoint,backgroundAlpha,
                               backgroundLineColor,backgroundLineWidth,
                               backgroundColor,lineFillFont,lineBackgroundGap,
                               lineHeight,lineBackgroundRadius,lineHashOutline,
                               lineStrokeAlpha,lineStrokeStyle,lineLineWidth,
                               lineStrokeFont,lineFillAlpha,lineFillStyle,hitCtx,hitDetection,featureId,isDrawbg){
        ctx.save();
        ctx.globalAlpha = backgroundAlpha;
        ctx.strokeStyle = backgroundLineColor;
        ctx.lineWidth = backgroundLineWidth;
        ctx.fillStyle = backgroundColor;
        ctx.font = lineFillFont;
        var w = ctx.measureText(label).width;
        var rectX= localPoint[0] - w/2-lineBackgroundGap;
        var rectY = localPoint[1]-lineHeight/2-lineBackgroundGap;
        if(isDrawbg){
            this.drawRoundRect(ctx,rectX,rectY,w+lineBackgroundGap*2,lineHeight+lineBackgroundGap*2,lineBackgroundRadius);
            ctx.fill();
        }
        ctx.restore();

        if(lineHashOutline == true){
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.globalAlpha = lineStrokeAlpha;
            ctx.strokeStyle = lineStrokeStyle;
            ctx.lineWidth = lineLineWidth;
            ctx.font = lineStrokeFont;
            ctx.translate(localPoint[0], localPoint[1]);
            ctx.strokeText(label, 0, 0);
            ctx.restore();
        }

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = lineFillAlpha;
        ctx.fillStyle = lineFillStyle;
        ctx.font = lineFillFont;
        ctx.translate(localPoint[0], localPoint[1]);
        ctx.fillText(label, 0, 0);
        ctx.restore();


        //拾取检测用的矩形
        if (hitDetection) {
            hitCtx.save();
            this.setHitContextStyle(hitCtx, featureId);
            this.drawHitRoundRect(hitCtx,rectX,rectY,w+lineBackgroundGap*2,lineHeight+lineBackgroundGap*2,lineBackgroundRadius);
            hitCtx.fill();
            hitCtx.restore();
        }
    },

    /**
     * 根据featureId生成颜色值
     */
    featureIdToHex : function(featureId) {
        var id = Number(featureId) + 1;
        return "#" + id.toString(16);
    },

    setHitContextStyle:function(hitCtx,featureId){
        var hex = this.featureIdToHex(featureId);
        hitCtx.globalAlpha = 1;
        hitCtx.fillStyle = hex;
    },

    /**
     * 绘制拾取背景框
     */
    drawHitRoundRect : function(hitCtx, x, y, width, height, radius){
        hitCtx.beginPath();
        hitCtx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        hitCtx.lineTo(width - radius + x, y);
        hitCtx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        hitCtx.lineTo(width + x, height + y - radius);
        hitCtx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        hitCtx.lineTo(radius + x, height +y);
        hitCtx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        hitCtx.closePath();
    }
}
///<jscompress sourcefile="GServiceGroup.js" />
/**
 * Created by kongjian on 2017/6/26.
 */
Custom.GServiceGroup =function(layerId, url, map, options) {
    this.map = null;
    this.layer = null;
    this.label = null;
    this.layerType = 0;
    this.labelType = 2;
    this.map = map;
    this.url = url;
    this.layerId = layerId;
    this.styleId = null;
    this.tileSize = 256;
    this.addServiceGroup = function () {
        if(options && options.styleId){
            this.styleId = options.styleId;
        }
        if(options && options.tileSize){
            this.tileSize = options.tileSize;
        }
        switch(this.layerType){
            case 0: this.addBaseLayer();
                break;
            case 1: this.addFrontBaseLayer();
                break;
        }
        switch(this.labelType){
            case 2: this.addFrontLabel();
                break;
            case 3: this.AddImgLabel();
                break;
            case 4: this.addAvoidLabel();
                break;
        }
    };
    /*后端底图*/
    this.addBaseLayer = function() {
        this.layer = new L.GXYZ(
                this.url + "&x={x}&y={y}&l={z}&tileType=" + this.layerType,
                {sphericalMercator: false, isBaseLayer: false,tileSize:this.tileSize}
        );
        this.map.addLayer(this.layer);
        
    };
    /*前端底图*/
    this.addFrontBaseLayer = function(){
        this.layer = new L.GVMapGrid(
                this.url + "&x={x}&y={y}&l={z}&tileType=" + this.layerType,
                {maxZoom: 21,keepBuffer:0,updateWhenZooming:false,tileSize:this.tileSize}
        );
        this.map.addLayer(this.layer);
    }
//////////////////////////////////////////////////////////////////////////

    /*后端注记绘制*/
    this.AddImgLabel = function(){
        this.label = new L.GXYZ(
                this.url + "&x={x}&y={y}&l={z}&tileType=" + this.labelType,
                {sphericalMercator: false, isBaseLayer: false,tileSize:this.tileSize}
        );
        this.map.addLayer(this.label);
    }
    /*后端注记避让*/
    this.addAvoidLabel = function(url) {
        this.label = new L.GLabelGrid(
            this.url + '&x={x}&y={y}&l={z}&tileType=' + this.labelType,
            {hitDetection:true,keepBuffer:0,updateWhenZooming:false,tileSize:this.tileSize}
        );
        this.map.addLayer(this.label);
       
    };
    /*前端*/
    this.addFrontLabel = function(url) {
        this.label = new L.GWVTAnno("GWVTanno",{tileSize:this.tileSize});

        var dataSource = new Custom.URLDataSource();
        dataSource.url = this.url+'&x=${x}&y=${y}&l=${z}&tileType='+this.labelType;
        this.label.addDataSource(dataSource);
        this.map.addLayer(this.label);
    };

    this.setLayerType = function (layerType) {
        if(layerType == "Img"){
            this.layerType = 0;
        }else if(layerType == "Data"){
            this.layerType = 1;
        }
    };

    this.setLabelType = function (labelType) {
        if(labelType == "Data"){
            this.labelType = 2;
        }else if(labelType == "Img"){
            this.labelType = 3;
        }else if(labelType == "AvoidImg"){
            this.labelType = 4;
        }
    };
    this.setTileSize = function(tileSize) {
        this.tileSize = tileSize;
    };
    this.getLayer = function () {
        return this.layer;
    };

    this.getLabel = function () {
        return this.label;
    };

    this.removeGroupLayer = function () {
        if(this.layer){
            this.map.removeLayer(this.layer);
        }
        if(this.label){
            this.map.removeLayer(this.label);
        }
    };
}

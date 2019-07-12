$.fn.easeScroll = function(options) {
	! function() {
		function e() {
			var e = false;
			e && removeEventListener("keydown", keyDownHandler), v.keyboardSupport && !e && addEventListener("keydown", keyDownHandler)
		}

		function loadedHandler() {
			if (document.body) {
				var body = document.body,
					html = document.documentElement,
					windowHeight = window.innerHeight,
					r = body.scrollHeight;
				if (S = document.compatMode.indexOf("CSS") >= 0 ? html : body, w = body, e(), x = true, top != self) y = true;
				else if (r > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
					var a = false,
						i = function() {
							a || html.scrollHeight == document.height || (a = true, setTimeout(function() {
								html.style.height = document.height + "px", a = false
							}, 100))
						};
					if (html.style.height = "auto", setTimeout(i, 10), S.offsetHeight <= windowHeight) {
						var div = document.createElement("div");
						div.style.clear = "both", body.appendChild(div)
					}
				}
				v.fixedBackground || b || (body.style.backgroundAttachment = "scroll", html.style.backgroundAttachment = "scroll")
			}
		}

		function scrollControlHandler(e, t, o, n) {
			if (n || (n = 1000), d(t, o), 1 != v.accelerationMax) {
				var r = +new Date,
					a = r - C;
				if (a < v.accelerationDelta) {
					var i = (1 + 30 / a) / 2;
					i > 1 && (i = Math.min(i, v.accelerationMax), t *= i, o *= i)
				}
				C = +new Date
			}
			if (M.push({
				x: t,
				y: o,
				lastX: 0 > t ? .99 : -.99,
				lastY: 0 > o ? .99 : -.99,
				start: +new Date
			}), !T) {
				var l = e === document.body,
					u = function() {
						for (var r = +new Date, a = 0, i = 0, c = 0; c < M.length; c++) {
							var s = M[c],
								d = r - s.start,
								f = d >= v.animationTime,
								h = f ? 1 : d / v.animationTime;
							v.pulseAlgorithm && (h = p(h));
							var m = s.x * h - s.lastX >> 0,
								w = s.y * h - s.lastY >> 0;
							a += m, i += w, s.lastX += m, s.lastY += w, f && (M.splice(c, 1), c--)
						}
						l ? window.scrollBy(a, i) : (a && (e.scrollLeft += a), i && (e.scrollTop += i)), t || o || (M = []), M.length ? requestAnimationFrame(u, e, n / v.frameRate + 1) : T = false
					};
				requestAnimationFrame(u, e, 0), T = true
			}
		}

		function mouseWheelHandler(event) {
			x || t();
			var mouseHoverTarget = event.target,
				r = l(mouseHoverTarget);
			if (!r || event.defaultPrevented || checkTagName(w, "embed") || checkTagName(mouseHoverTarget, "embed") && /\.pdf/i.test(mouseHoverTarget.src)) return true;
			var a = event.wheelDeltaX || 0,
				i = event.wheelDeltaY || 0;
			return a || i || (i = event.wheelDelta || 0), !v.touchpadSupport && f(i) ? true : (Math.abs(a) > 1.2 && (a *= v.stepSize / 120), Math.abs(i) > 1.2 && (i *= v.stepSize / 120), scrollControlHandler(r, -a, -i), void event.preventDefault())
		}

		function keyDownHandler(event) {
			var target = event.target,
				controlKeyboard = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
			if (/input|textarea|select|embed/i.test(target.nodeName) || target.isContentEditable || event.defaultPrevented || controlKeyboard) return true;
			if (checkTagName(target, "button") && event.keyCode === key.spacebar) return true;
			var r,
				a = 0,
				i = 0,
				u = l(w),
				c = u.clientHeight;
			switch (u == document.body && (c = window.innerHeight), event.keyCode) {
				case key.up:
					i = -v.arrowScroll;
					break;
				case key.down:
					i = v.arrowScroll;
					break;
				case key.spacebar:
					r = event.shiftKey ? 1 : -1, i = -r * c * .9;
					break;
				case key.pageup:
					i = .9 * -c;
					break;
				case key.pagedown:
					i = .9 * c;
					break;
				case key.home:
					i = -u.scrollTop;
					break;
				case key.end:
					var d = u.scrollHeight - u.scrollTop - c;
					i = d > 0 ? d + 10 : 0;
					break;
				case key.left:
					a = -v.arrowScroll;
					break;
				case key.right:
					a = v.arrowScroll;
					break;
				default:
					return true
			}
			scrollControlHandler(u, a, i), event.preventDefault()
		}

		function mouseDownHandler(event) {
			w = event.target
		}

		function i(e, t) {
			for (var o = e.length; o--;) z[N(e[o])] = t;
			return t
		}

		function l(e) {
			var t = [],
				o = S.scrollHeight;
			do {
				var n = z[N(e)];
				if (n) return i(t, n);
				if (t.push(e), o === e.scrollHeight) {
					if (!y || S.clientHeight + 10 < o) return i(t, document.body)
				} else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return i(t, e)
			} while (e = e.parentNode)
		}

		function addEventListener(eventName, func, options) {
			window.addEventListener(eventName, func, options || false)
		}

		function removeEventListener(eventName, func, options) {
			window.removeEventListener(eventName, func, options || false)
		}

		function checkTagName(target, tagName) {
			return (target.nodeName || "").toLowerCase() === tagName.toLowerCase()
		}

		function d(e, t) {
			e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (k.x !== e || k.y !== t) && (k.x = e, k.y = t, M = [], C = 0)
		}

		function f(e) {
			if (e) {
				e = Math.abs(e), D.push(e), D.shift(), clearTimeout(A);
				var t = D[0] == D[1] && D[1] == D[2],
					o = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
				return !(t || o)
			}
		}

		function h(e, t) {
			return Math.floor(e / t) == e / t
		}

		function m(e) {
			var t, o, n;
			return e *= v.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * v.pulseNormalize
		}

		function p(e) {
			return e >= 1 ? 1 : 0 >= e ? 0 : (1 == v.pulseNormalize && (v.pulseNormalize /= m(1)), m(e))
		}

		var settings = $.extend({
			// These are the defaults.
			frameRate: 60,
			animationTime: 1000,
			stepSize: 120,
			pulseAlgorithm: true,
			pulseScale: 8,
			pulseNormalize: 1,
			accelerationDelta: 20,
			accelerationMax: 1,
			keyboardSupport: true,
			arrowScroll: 50,
			touchpadSupport: true,
			fixedBackground: true
		}, options );

		var w,
			globalSettings = {
				frameRate: settings.frameRate,
				animationTime: settings.animationTime,
				stepSize: settings.stepSize,
				pulseAlgorithm: settings.pulseAlgorithm,
				pulseScale: settings.pulseScale,
				pulseNormalize: settings.pulseNormalize,
				accelerationDelta: settings.accelerationDelta,
				accelerationMax: settings.accelerationMax,
				keyboardSupport: settings.keyboardSupport,
				arrowScroll: settings.arrowScroll,
				touchpadSupport: settings.touchpadSupport,
				fixedBackground: settings.fixedBackground,
				excluded: ""
			},
			v = globalSettings,
			b = false,
			y = false,
			k = {
				x: 0,
				y: 0
			},
			x = false,
			S = document.documentElement,
			D = [120, 120, 120],
			key = {
				left: 37,
				up: 38,
				right: 39,
				down: 40,
				spacebar: 32,
				pageup: 33,
				pagedown: 34,
				end: 35,
				home: 36
			},
			M = [],
			T = false,
			C = +new Date,
			z = {};
		setInterval(function() {
			z = {}
		}, 10000);
		var A,
			N = function() {
				var e = 0;
				return function(t) {
					return t.uniqueID || (t.uniqueID = e++)
				}
			}(),
			requestAnimationFrame = function() {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e, t, o) {
					window.setTimeout(e, o || 1000 / 60)
				}
			}(),
			isChromeOrIPad = /chrome|iPad/i.test(window.navigator.userAgent),
			hasMouseWheel = "onmousewheel" in document;
		hasMouseWheel && isChromeOrIPad && (addEventListener("mousedown", mouseDownHandler), addEventListener("mousewheel", mouseWheelHandler, {passive: false}), addEventListener("load", loadedHandler) )
	}();
}

(function(){
    'use strict'

    // Build Plugin
    var EaseScroll = function () {

        // Define option defaults
        var defaults = {
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
            fixedBackground: true,
            browser: {
                Chrome: true,
                FireFox: true,
                Safari: true,
                IE: true,
                Edge: true
            }
        }

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        } else {
            this.options = defaults
        }
        // Browser Setting
        if (arguments[0].browser && typeof arguments[0].browser === "object") {
            this.options.browser = extendDefaults(defaults.browser, arguments[0].browser);
        } else {
            this.options.browser = defaults.browser
        }

        esSettings = this.options;

        currentBrowserBuildAllow = esSettings.browser[currentBrowser];

        init();
    }

    // -----------------
    // Public Methods
    EaseScroll.prototype.destroy = destroy;
    EaseScroll.prototype.build = build;

    // -----------------
    // Private Methods

    function init () {
        if (!currentBrowserBuildAllow) return false;
        addEventListener("mousedown", mouseDownHandler);
        addEventListener(wheelEvent, mouseWheelHandler, {passive: false});
        addEventListener("load", loadedHandler);
    }

    function destroy () {
        if (!currentBrowserBuildAllow) return false;
        removeEventListener("mousedown", mouseDownHandler);
        removeEventListener(wheelEvent, mouseWheelHandler);
        removeEventListener("keydown", keyDownHandler);
        isDestroy = true;
        loaded = false;
    }

    function build () {
        if(isDestroy) init();
    }

    function keyListenerHandler() {
        var hasBuilded = false;
        hasBuilded && removeEventListener("keydown", keyDownHandler), esSettings.keyboardSupport && !hasBuilded && addEventListener("keydown", keyDownHandler)
    }

    function loadedHandler() {
        if (document.body) {
            var body = document.body,
                html = document.documentElement,
                windowHeight = window.innerHeight,
                bodyHeight = body.scrollHeight;
            if (scrollMainEl = document.compatMode.indexOf("CSS") >= 0 ? html : body, currentHoverTarget = body, keyListenerHandler(), loaded = true, top != self) isInIframe = true;
            else if (bodyHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
                var a = false,
                    i = function() {
                        a || html.scrollHeight == document.height || (a = true, setTimeout(function() {
                            html.style.height = document.height + "px", a = false
                        }, 100))
                    };
                if (html.style.height = "auto", setTimeout(i, 10), scrollMainEl.offsetHeight <= windowHeight) {
                    var div = document.createElement("div");
                    div.style.clear = "both", body.appendChild(div)
                }
            }
            esSettings.fixedBackground || b || (body.style.backgroundAttachment = "scroll", html.style.backgroundAttachment = "scroll")
        }
    }

    function scrollControlHandler(scrollTarget, scrollX, scrollY, ms) {
        if (ms || (ms = 1000), resetScrollControl(scrollX, scrollY), 1 != esSettings.accelerationMax) {
            var r = +new Date,
                a = r - C;
            if (a < esSettings.accelerationDelta) {
                var i = (1 + 30 / a) / 2;
                i > 1 && (i = Math.min(i, esSettings.accelerationMax), scrollX *= i, scrollY *= i)
            }
            C = +new Date
        }
        if (M.push({
            x: scrollX,
            y: scrollY,
            lastX: 0 > scrollX ? .99 : -.99,
            lastY: 0 > scrollY ? .99 : -.99,
            start: +new Date
        }), !animationRunning) {
            var isBody = scrollTarget === document.body,
                step = function() {
                    for (var timestamp = +new Date, xCoord = 0, yCoord = 0, c = 0; c < M.length; c++) {
                        var scrollSet = M[c],
                            progress = timestamp - scrollSet.start,
                            isAnimationEnd = progress >= esSettings.animationTime,
                            h = isAnimationEnd ? 1 : progress / esSettings.animationTime;
                        esSettings.pulseAlgorithm && (h = p(h));
                        var m = scrollSet.x * h - scrollSet.lastX >> 0,
                            w = scrollSet.y * h - scrollSet.lastY >> 0;
                        xCoord += m, yCoord += w, scrollSet.lastX += m, scrollSet.lastY += w, isAnimationEnd && (M.splice(c, 1), c--)
                    }
                    isBody ? window.scrollBy(xCoord, yCoord) : (xCoord && (scrollTarget.scrollLeft += xCoord), yCoord && (scrollTarget.scrollTop += yCoord)), scrollX || scrollY || (M = []), M.length ? requestAnimationFrame(step, scrollTarget, ms / esSettings.frameRate + 1) : animationRunning = false
                };
            requestAnimationFrame(step, scrollTarget, 0), animationRunning = true
        }
    }

    function mouseWheelHandler(event) {
        loaded || loadedHandler();
        var mouseWheelTarget = event.target,
            scrollTarget = l(mouseWheelTarget);
        if (!scrollTarget || event.defaultPrevented || checkTagName(currentHoverTarget, "embed") || checkTagName(mouseWheelTarget, "embed") && /\.pdf/i.test(mouseWheelTarget.src)) return true;
        var scrollX = event.wheelDeltaX || -event.deltaX * 40 || 0,
            scrollY = event.wheelDeltaY || -event.deltaY * 40 || 0;
        return (
            scrollX || scrollY || (scrollY = event.wheelDelta || 0),
            !esSettings.touchpadSupport && f(scrollY)
                ? true
                : (Math.abs(scrollX) > 1.2 && (scrollX *= esSettings.stepSize / 120),
                  Math.abs(scrollY) > 1.2 && (scrollY *= esSettings.stepSize / 120),
                  scrollControlHandler(scrollTarget, -scrollX, -scrollY),
                  event.preventDefault())
        )
    }

    function keyDownHandler(event) {
        var target = event.target,
            isControlKeyboard = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
        if (/input|textarea|select|embed/i.test(target.nodeName) || target.isContentEditable || event.defaultPrevented || isControlKeyboard) return true;
        if (checkTagName(target, "button") && event.keyCode === key.spacebar) return true;
        var direction,
            scrollX = 0,
            scrollY = 0,
            scrollTarget = l(currentHoverTarget) || document.body,
            scrollTargetHeight = scrollTarget.clientHeight;
        switch (scrollTarget === document.body && (scrollTargetHeight = window.innerHeight), event.keyCode) {
            case key.up:
                scrollY = -esSettings.arrowScroll;
                break;
            case key.down:
                scrollY = esSettings.arrowScroll;
                break;
            case key.spacebar:
                direction = event.shiftKey ? 1 : -1,
                scrollY = -direction * scrollTargetHeight * .9;
                break;
            case key.pageup:
                scrollY = .9 * -scrollTargetHeight;
                break;
            case key.pagedown:
                scrollY = .9 * scrollTargetHeight;
                break;
            case key.home:
                scrollY = (scrollTarget !== document.body) ? -scrollTarget.scrollTop : -document.documentElement.scrollTop;
                break;
            case key.end: {
                var scrollTop = (scrollTarget !== document.body) ? scrollTarget.scrollTop : document.documentElement.scrollTop;
                var distance = scrollTarget.scrollHeight - scrollTop - scrollTargetHeight;
                scrollY = distance > 0 ? distance + 10 : 0;
                break;
            }
            case key.left:
                scrollX = -esSettings.arrowScroll;
                break;
            case key.right:
                scrollX = esSettings.arrowScroll;
                break;
            default:
                return true
        }
        scrollControlHandler(scrollTarget, scrollX, scrollY), event.preventDefault()
    }

    function mouseDownHandler(event) {
        currentHoverTarget = event.target
    }

    function i(e, t) {
        for (var o = e.length; o--;) z[N(e[o])] = t;
        return t
    }

    function l(el) {
        var t = [],
            o = scrollMainEl.scrollHeight;
        do {
            var n = z[N(el)],
                overflow;
            if (n) return i(t, n);
            if (t.push(el), o === el.scrollHeight) {
                if (!isInIframe || scrollMainEl.clientHeight + 10 < o) return i(t, document.body)
            } else if (el.clientHeight + 10 < el.scrollHeight && (overflow = getComputedStyle(el, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return i(t, el)
        } while (el = el.parentNode)
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

    function resetScrollControl(scrollX, scrollY) {
        scrollX = scrollX > 0 ? 1 : -1,
        scrollY = scrollY > 0 ? 1 : -1,
        (scrollDir.x !== scrollX || scrollDir.y !== scrollY) && (scrollDir.x = scrollX, scrollDir.y = scrollY, M = [], C = 0)
    }

    function f(scrollY) {
        if (scrollY) {
            scrollY = Math.abs(scrollY), D.push(scrollY), D.shift(), clearTimeout(timer);
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
        return e *= esSettings.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * esSettings.pulseNormalize
    }

    function p(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == esSettings.pulseNormalize && (esSettings.pulseNormalize /= m(1)), m(e))
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    var currentHoverTarget,
        esSettings = null,
        b = false,
        isInIframe = false,
        scrollDir = {
            x: 0,
            y: 0
        },
        loaded = false,
        isDestroy = false,
        scrollMainEl = document.documentElement,
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
        animationRunning = false,
        C = +new Date,
        z = {};
    setInterval(function() {
        z = {}
    }, 10000);
    var timer,
        N = function() {
            var e = 0;
            return function(t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }();

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, target, delay) {
            window.setTimeout(callback, delay || 1000 / 60)
        }
    window.requestAnimationFrame = requestAnimationFrame;

    var wheelEvent = 'onwheel' in document
        // spec event type
        ? 'wheel'
        : document.onmousewheel !== undefined
            // legacy event type
            ? 'mousewheel'
            // older Firefox
            : 'DOMMouseScroll';

    // Browser Detect
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function(p) {
            return p.toString() === '[object SafariRemoteNotification]'
        })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
    // Internet Explorer 6-11
    var isIE = /* @cc_on!@ */ false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var currentBrowser = isFirefox
        ? 'FireFox'
        : isSafari
        ? 'Safari'
        : isIE
        ? 'IE'
        : isEdge
        ? 'Edge'
        : isChrome
        ? 'Chrome'
        : null;
    var currentBrowserBuildAllow = false;
    // [End] Browser Detect

    window.EaseScroll = EaseScroll;

})();

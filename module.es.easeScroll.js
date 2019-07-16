const EaseScroll = function() {
    // Methods
    this.build = build;
    this.destroy = destroy;

    // Define option defaults
    const defaults = {
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
    };

    this.options = { ...defaults, ...arguments[0] };

    esSettings = this.options;

    init();
}

// -----------------
// Private Methods

function init() {
    if (hasMouseWheel && isChromeOrIPad) {
        addEventListener('mousedown', mouseDownHandler);
        addEventListener('mousewheel', mouseWheelHandler, { passive: false });
        addEventListener('load', loadedHandler);
    }
}

function destroy() {
    if (hasMouseWheel && isChromeOrIPad) {
        removeEventListener('mousedown', mouseDownHandler);
        removeEventListener('mousewheel', mouseWheelHandler);
        removeEventListener('keydown', keyDownHandler);
    }
    isDestroy = true;
}

// After Destroy
function build() {
    if (isDestroy) init();
}

function keyListenerHandler() {
    if (esSettings.keyboardSupport) addEventListener('keydown', keyDownHandler);
}

function loadedHandler() {
    if (document.body) {
        const body = document.body;
        const html = document.documentElement;
        const windowHeight = window.innerHeight;
        const bodyHeight = body.scrollHeight;
        if (
            ((scrollMainEl = document.compatMode.indexOf('CSS') >= 0 ? html : body),
            (currentHoverTarget = body),
            keyListenerHandler(),
            (loaded = true),
            top !== self)
        )
            isInIframe = true;
        else if (
            bodyHeight > windowHeight &&
            (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)
        ) {
            let a = false;
            const i = function() {
                if (!a && html.scrollHeight !== document.height) {
                    a = true;
                    setTimeout(function() {
                        html.style.height = document.height + 'px';
                        a = false;
                    }, 100);
                }
            }
            if (((html.style.height = 'auto'), setTimeout(i, 10), scrollMainEl.offsetHeight <= windowHeight)) {
                const div = document.createElement('div');
                div.style.clear = 'both';
                body.appendChild(div);
            }
        }
        if (!esSettings.fixedBackground) {
            body.style.backgroundAttachment = 'scroll';
            html.style.backgroundAttachment = 'scroll';
        }
    }
}

function scrollControlHandler(scrollTarget, scrollX, scrollY, ms) {
    if ((ms || (ms = 1000), resetScrollControl(scrollX, scrollY), esSettings.accelerationMax !== 1)) {
        const r = +new Date();
        const a = r - C;
        if (a < esSettings.accelerationDelta) {
            let i = (1 + 30 / a) / 2;
            if (i > 1) {
                i = Math.min(i, esSettings.accelerationMax);
                scrollX *= i;
                scrollY *= i;
            }
        }
        C = +new Date();
    }
    if (
        (M.push({
            x: scrollX,
            y: scrollY,
            lastX: scrollX < 0 ? 0.99 : -0.99,
            lastY: scrollY < 0 ? 0.99 : -0.99,
            start: +new Date()
        }),
        !animationRunning)
    ) {
        const isBody = scrollTarget === document.body;
        const step = function() {
            const timestamp = +new Date();
            let xCoord = 0;
            let yCoord = 0;
            for (let c = 0; c < M.length; c++) {
                const scrollSet = M[c];
                const progress = timestamp - scrollSet.start;
                const isAnimationEnd = progress >= esSettings.animationTime;
                let h = isAnimationEnd ? 1 : progress / esSettings.animationTime;
                esSettings.pulseAlgorithm && (h = p(h));
                const m = (scrollSet.x * h - scrollSet.lastX) >> 0;
                const w = (scrollSet.y * h - scrollSet.lastY) >> 0;

                xCoord += m;
                yCoord += w;
                scrollSet.lastX += m;
                scrollSet.lastY += w;

                if (isAnimationEnd) {
                    M.splice(c, 1);
                    c--;
                }
            }

            if (isBody) window.scrollBy(xCoord, yCoord)
            else {
                if (xCoord) scrollTarget.scrollLeft += xCoord;
                if (yCoord) scrollTarget.scrollTop += yCoord;
            }

            if (!scrollX && !scrollY) M = [];

            if (M.length) requestAnimationFrame(step, scrollTarget, ms / esSettings.frameRate + 1);
            else animationRunning = false;
        }
        requestAnimationFrame(step, scrollTarget, 0);
        animationRunning = true;
    }
}

function mouseWheelHandler(event) {
    loaded || loadedHandler();
    const mouseWheelTarget = event.target;
    const scrollTarget = l(mouseWheelTarget);
    if (
        !scrollTarget ||
        event.defaultPrevented ||
        checkTagName(currentHoverTarget, 'embed') ||
        (checkTagName(mouseWheelTarget, 'embed') && /\.pdf/i.test(mouseWheelTarget.src))
    )
        return true;
    let scrollX = event.wheelDeltaX || 0;
    let scrollY = event.wheelDeltaY || 0;
    return (
        scrollX || scrollY || (scrollY = event.wheelDelta || 0),
        !esSettings.touchpadSupport && f(scrollY)
            ? true
            : (Math.abs(scrollX) > 1.2 && (scrollX *= esSettings.stepSize / 120),
              Math.abs(scrollY) > 1.2 && (scrollY *= esSettings.stepSize / 120),
              scrollControlHandler(scrollTarget, -scrollX, -scrollY),
              void event.preventDefault())
    )
}

function keyDownHandler(event) {
    const target = event.target
    const isControlKeyboard =
        event.ctrlKey || event.altKey || event.metaKey || (event.shiftKey && event.keyCode !== key.spacebar)
    if (
        /input|textarea|select|embed/i.test(target.nodeName) ||
        target.isContentEditable ||
        event.defaultPrevented ||
        isControlKeyboard
    )
        return true
    if (checkTagName(target, 'button') && event.keyCode === key.spacebar) return true
    let direction;
    let scrollX = 0;
    let scrollY = 0;
    const scrollTarget = l(currentHoverTarget);
    let scrollTargetHeight = scrollTarget.clientHeight;
    switch ((scrollTarget === document.body && (scrollTargetHeight = window.innerHeight), event.keyCode)) {
        case key.up:
            scrollY = -esSettings.arrowScroll;
            break
        case key.down:
            scrollY = esSettings.arrowScroll;
            break
        case key.spacebar:
            direction = event.shiftKey ? 1 : -1;
            scrollY = -direction * scrollTargetHeight * 0.9;
            break
        case key.pageup:
            scrollY = 0.9 * -scrollTargetHeight;
            break
        case key.pagedown:
            scrollY = 0.9 * scrollTargetHeight;
            break
        case key.home:
            // [Bug] Body is not working
            scrollY = -scrollTarget.scrollTop;
            break
        case key.end:
            const distance = scrollTarget.scrollHeight - scrollTarget.scrollTop - scrollTargetHeight;
            scrollY = distance > 0 ? distance + 10 : 0;
            break
        case key.left:
            scrollX = -esSettings.arrowScroll;
            break
        case key.right:
            scrollX = esSettings.arrowScroll;
            break
        default:
            return true
    }
    scrollControlHandler(scrollTarget, scrollX, scrollY);
    event.preventDefault();
}

function mouseDownHandler(event) {
    currentHoverTarget = event.target;
}

function i(e, t) {
    for (let o = e.length; o--; ) z[N(e[o])] = t
    return t
}

function l(el) {
    const t = [];
    const o = scrollMainEl.scrollHeight;
    do {
        const n = z[N(el)];
        let overflow;
        if (n) return i(t, n)
        if ((t.push(el), o === el.scrollHeight)) {
            if (!isInIframe || scrollMainEl.clientHeight + 10 < o) return i(t, document.body)
        } else if (
            el.clientHeight + 10 < el.scrollHeight &&
            ((overflow = getComputedStyle(el, '').getPropertyValue('overflow-y')),
            overflow === 'scroll' || overflow === 'auto')
        )
            return i(t, el)
    } while ((el = el.parentNode))
}

function addEventListener(eventName, func, options) {
    window.addEventListener(eventName, func, options || false);
}

function removeEventListener(eventName, func, options) {
    window.removeEventListener(eventName, func);
}

function checkTagName(target, tagName) {
    return (target.nodeName || '').toLowerCase() === tagName.toLowerCase();
}

function resetScrollControl(scrollX, scrollY) {
    scrollX = scrollX > 0 ? 1 : -1;
    scrollY = scrollY > 0 ? 1 : -1;
    if (scrollDir.x !== scrollX || scrollDir.y !== scrollY) {
        scrollDir.x = scrollX
        scrollDir.y = scrollY
        M = []
        C = 0
    }
}

function f(scrollY) {
    if (scrollY) {
        scrollY = Math.abs(scrollY);
        D.push(scrollY);
        D.shift();
        clearTimeout(timer);

        const t = D[0] === D[1] && D[1] === D[2];
        const o = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
        return !(t || o)
    }
}

function h(e, t) {
    return Math.floor(e / t) === e / t
}

function m(e) {
    let t, o, n;
    return (
        (e *= esSettings.pulseScale),
        e < 1
            ? (t = e - (1 - Math.exp(-e)))
            : ((o = Math.exp(-1)), (e -= 1), (n = 1 - Math.exp(-e)), (t = o + n * (1 - o))),
        t * esSettings.pulseNormalize
    )
}

function p(e) {
    return e >= 1 ? 1 : e <= 0 ? 0 : (esSettings.pulseNormalize === 1 && (esSettings.pulseNormalize /= m(1)), m(e))
}

let currentHoverTarget;
let esSettings = null;
let isInIframe = false;
const scrollDir = {
    x: 0,
    y: 0
};
let loaded = false;
let isDestroy = false;
let scrollMainEl = document.documentElement;
const D = [120, 120, 120];
const key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36
};
let M = [];
let animationRunning = false;
let C = +new Date();
let z = {};
setInterval(function() {
    z = {};
}, 10000);
let timer;
const N = function() {
    let e = 0;
    return function(t) {
        return t.uniqueID || (t.uniqueID = e++)
    }
}

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, target, delay) {
        window.setTimeout(callback, delay || 1000 / 60)
    }
window.requestAnimationFrame = requestAnimationFrame;

const isChromeOrIPad = /chrome|iPad/i.test(window.navigator.userAgent);
const hasMouseWheel = 'onmousewheel' in document;

export default EaseScroll;

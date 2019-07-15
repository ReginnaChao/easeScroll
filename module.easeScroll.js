const EaseScroll = function() {
    this.isDestroy = false

    // Methods
    this.build = build
    this.destroy = destroy

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
    }

    // Create options by extending defaults with the passed in arguments
    if (arguments[0] && typeof arguments[0] === 'object') {
        this.options = extendDefaults(defaults, arguments[0])
    } else {
        this.options = defaults
    }
    esSettings = this.options

    console.log(esSettings)

    init()
}

// -----------------
// Private Methods

function init() {
    console.log('init')
}

function destroy() {
    console.log('destroyHandler')
    this.isDestroy = true
}

// After Destory
const build = function() {
    if (this.isDestroy) init()
}

function extendDefaults() {
    console.log(extendDefaults)
}

// let currentHoverTarget
let esSettings = null
// const isInIframe = false
// const scrollDir = {
//     x: 0,
//     y: 0
// }
// const loaded = false
// const scrollMainEl = document.documentElement
// const D = [120, 120, 120]
// const key = {
//     left: 37,
//     up: 38,
//     right: 39,
//     down: 40,
//     spacebar: 32,
//     pageup: 33,
//     pagedown: 34,
//     end: 35,
//     home: 36
// }
// const M = []
// const animationRunning = false
// const C = +new Date()
// let z = {}
// setInterval(function() {
//     z = {}
// }, 10000)
// let timer
// const N = function() {
//     let e = 0
//     return function(t) {
//         return t.uniqueID || (t.uniqueID = e++)
//     }
// }
// const requestAnimationFrame = function() {
//     return (
//         window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         function(callback, target, delay) {
//             window.setTimeout(callback, delay || 1000 / 60)
//         }
//     )
// }

// const isChromeOrIPad = /chrome|iPad/i.test(window.navigator.userAgent)
// const hasMouseWheel = 'onmousewheel' in document

export default EaseScroll

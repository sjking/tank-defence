var Game = require('./Game.js');
var keyDetector = require('./keyDetector.js');
var WindowResizeDetector = require('./windowResizeDetector');
var htmlViewResizer = require('./htmlViewResizer');
var CanvasResizer = require('./CanvasResizer');

window.addEventListener('load', eventWindowLoaded, false);	

function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport () {
    return Modernizr.canvas;
}

function canvasApp() {
    if (canvasSupport()) {
        var Canvas = document.getElementById("canvas");
        var context = Canvas.getContext("2d");
        
        document.onkeydown = keyDetector.keyDown.bind(keyDetector);
        document.onkeyup = keyDetector.keyUp.bind(keyDetector);

        var windowOnResize = new WindowResizeDetector(window);
        window.onresize = windowOnResize.resize.bind(windowOnResize);
        document.documentElement.style.overflow = 'hidden';  // firefox, chrome
        document.body.scroll = "no"; // ie only
        var resizeCanvas = new CanvasResizer(context.canvas);
        resizeCanvas.on('resize', htmlViewResizer);

        Game.init(context, keyDetector.list, windowOnResize, resizeCanvas);
        
        setInterval(Game.loop.bind(Game), Game.interval);
    }
}

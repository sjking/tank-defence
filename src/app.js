var Game = require('./Game2.js');
var keyDetector = require('./keyDetector.js');

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
        
        Game.init(context, keyDetector.list);
        
        setInterval(Game.loop.bind(Game), Game.interval);
    }
}

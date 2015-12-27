var Game = require('./Game2.js');

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
        Game.init(context);
        setInterval(Game.loop.bind(Game), Game.interval);
    }
}

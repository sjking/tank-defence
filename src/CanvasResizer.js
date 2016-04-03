var EventEmitter = require('events').EventEmitter;
var util = require('util');

function CanvasResizer(canvas) {
    this.canvas = canvas;
    EventEmitter.call(this);
}

util.inherits(CanvasResizer, EventEmitter);

module.exports = CanvasResizer;

CanvasResizer.prototype.resize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.emit('resize', width, height);
};

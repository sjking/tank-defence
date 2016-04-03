var EventEmitter = require('events').EventEmitter;
var util = require('util');

function WindowResizeDetector(window) {
    this.window = window;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    EventEmitter.call(this);
}

util.inherits(WindowResizeDetector, EventEmitter);

module.exports = WindowResizeDetector;

WindowResizeDetector.prototype.resize = function() {
    this.width = this.window.innerWidth;
    this.height = this.window.innerHeight;
    this.emit('resize');
};

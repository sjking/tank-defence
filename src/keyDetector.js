var keyMap = require('./keyMap.js');
_ = require('underscore');

var keyPressList = {};

var keyDetector = {
    keyDown: function handleKeyPress(e) {
        e = e ? e : this.defaultEvent;
        if (keyMap(e)) {
            this.list[keyMap(e)] = true;
        }
    },
    keyUp: function handleKeyRelease(e) {
        e = e ? e : this.defaultEvent;
        if (keyMap(e)) {
            this.list[keyMap(e)] = false;
        }
    },
    defaultEvent: null,
    list: {}
}

module.exports = Object.create(keyDetector);

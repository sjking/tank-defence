const keys = {
    UP: 8,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    ACTION: 4,
    INCREASE_POWER: 5,
    DECREASE_POWER: 6,
    START: 7
};

var keyCodeMap = {
    '37': keys.LEFT,
    '39': keys.RIGHT,
    '87': keys.UP,
    '83': keys.DOWN,
    '32': keys.ACTION,
    '65': keys.DECREASE_POWER,
    '68': keys.INCREASE_POWER,
    '13': keys.START
};

function keyMap(e) {
    return keyCodeMap[e.keyCode] || false;
}

module.exports = keyMap;

keyMap.codeMap = keyCodeMap;
keyMap.codes = keys;

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
    '38': keys.UP,
    '40': keys.DOWN,
    '32': keys.ACTION,
    '188': keys.DECREASE_POWER,
    '190': keys.INCREASE_POWER
};

function keyMap(e) {
    return keyCodeMap[e.keyCode] || false;
}

module.exports = keyMap;

keyMap.codeMap = keyCodeMap;
keyMap.codes = keys;

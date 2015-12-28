var _ = require('underscore');

var Level = require('./Level2.js');
var LevelOne = require('./LevelOne.js');
var keyDecoder = require('./keyMap.js'),
    keyCode = keyDecoder.codes;

const GAME_STATE = {
    PLAY: 0,
    DIE: 1,
    GAME_OVER: 2,
    NEXT_LEVEL: 3,
    TITLE_SCREEN: 4,
    LOAD: 5,
    WAIT: 6
};
const FRAME_RATE = 30;
const INTERVAL = 1000 / FRAME_RATE;

function loadLevel(levelData) {
    this.level = Object.create(Level[levelData.type]);
    this.level.setup(this.context, levelData.data);
    this.level.load()
        .then(initGameObjects.bind(this))
        .then(startLevel.bind(this))
        .catch(handleError.bind(this));
    this.gameState = GAME_STATE.WAIT;
}

function handleError(err) {}

function initGameObjects(assets) {
    return this.level.populate(assets); 
}

function startLevel() {
    this.gameState = GAME_STATE.PLAY;
}

function playGame() {
    detectKeyPresses.call(this);
    this.level.draw();
    this.level.player.draw();
    _.each(this.level.aliens, function(alien) {
        alien.draw();
    });
    _.each(this.level.ufos, function(ufo) {
        ufo.draw();
    });
}

function detectKeyPresses() {
    var keyPressList = this.keyPressList;
    var keysList = _.pairs(keyPressList);

    _.each(keysList, function(key) {
        //var msg = key[1] ? " pressed" : " released";
        switch(Number(key[0])) {
            case keyCode.UP:
                //console.log("up ", msg);
                break;
            case keyCode.RIGHT:
                //console.log("right ", msg);
                break;
            case keyCode.DOWN:
                //console.log("down ", msg);
                break;
            case keyCode.LEFT:
                //console.log("left ", msg);
                break;
            case keyCode.ACTION:
                //console.log("action ", msg);
                break;
            case keyCode.INCREASE_POWER:
                //console.log("more power ", msg);
                break;
            case keyCode.DECREASE_POWER:
                //console.log("less power ", msg);
                break;
            case keyCode.START:
                //console.log("start ", msg);
                break;
        }
        delete keyPressList[key[0]];
    });
}

function detectCollisions() {
}

var Game = {
    init: function(context, keyPressList) {
        this.context = context;
        this.gameState = GAME_STATE.LOAD;
        this.level = 0;
        this.keyPressList = keyPressList;
    },
    loop: function() {
        switch (this.gameState) {
            case GAME_STATE.PLAY:
                playGame.call(this);
                break;
            case GAME_STATE.DIE:
                //transition()
                break;
            case GAME_STATE.GAME_OVER:
                //gameOver();
                break;	
            case GAME_STATE.NEXT_LEVEL:
                //transition();
                break;
            case GAME_STATE.TITLE_SCREEN:
                //titleScreen();
                break;
            case GAME_STATE.LOAD:
                loadLevel.call(this, LevelOne);
                break;
            case GAME_STATE.WAIT:
                (function() {})()
                break;
            default:
                break;
		}
    },
    interval: INTERVAL
};

module.exports = Game;

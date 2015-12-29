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
        .then(setLevelBoundaries.bind(this))
        .then(startLevel.bind(this))
        .catch(handleError.bind(this));
    this.gameState = GAME_STATE.WAIT;
}

function handleError(err) {
    var msg = err.toString() + "\nfilename: " + err.fileName +
        "\nline number: " + err.lineNumber + "\ncolumn: " + err.columnNumber;
    alert(msg);
}

function initGameObjects(assets) {
    return this.level.populate(assets); 
}

function setLevelBoundaries() {
    var buildings = this.level.buildings;
    var edge = this.context.canvas.width;
    for (var i=0; i < buildings.length; i++) {
       if (buildings[i].edge < edge) {
           edge = buildings[i].edge;
       }
    }
    this.level.buildingBoundary = edge;     

    return Promise.resolve();
}

function startLevel() {
    this.gameState = GAME_STATE.PLAY;
}

function playGame() {
    detectKeyPresses.call(this);
    this.level.draw();
    for (var i=0; i < this.level.aliens.length; i++) {
        this.level.aliens[i].draw();
    }
    for (var i=0; i < this.level.ufos.length; i++) {
        this.level.ufos[i].draw();
    }
    this.level.player.draw();
}

function detectKeyPresses() {
    var keys = this.keyPressList;
    var player = this.level.player;
        
    if (keys[keyCode.LEFT]) {
        if (player && player.posX > 0) {
            player.posX -= player.speed;
        }
    }
    if (keys[keyCode.RIGHT]) {
        var buildingBoundary = this.level.buildingBoundary
        if (player && player.posX < buildingBoundary - player.width) {
            player.posX += player.speed;
        }
    }
    if (keys[keyCode.UP]) {
        if (player && player.turretPos < player.turretCount) {
            player.turretPos++;
        }
    }
    if (keys[keyCode.DOWN]) {
        if (player && player.turretPos > 0) {
            player.turretPos--
        }
    }
    if (keys[keyCode.ACTION]) {

    }
    if (keys[keyCode.INCREASE_POWER]) {

    }
    if (keys[keyCode.DECREASE_POWER]) {

    }
    if (keys[keyCode.START]) {

    }
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

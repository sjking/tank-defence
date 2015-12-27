var Level = require('./Level2.js');
var LevelOne = require('./LevelOne.js');

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

function handleError(err) {
    console.log("err: ", err);
}

function initGameObjects(assets) {
    return this.level.populate(assets); 
}

function startLevel() {
    this.gameState = GAME_STATE.PLAY;
}

function playGame() {
    this.level.draw();
    this.level.player.draw();
}

var Game = {
    init: function(context) {
        this.context = context;
        this.gameState = GAME_STATE.LOAD;
        this.level = 0;
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



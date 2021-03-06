var _ = require('underscore');

var Level = require('./Level.js');
var keyDecoder = require('./keyMap.js'),
    keyCode = keyDecoder.codes;
var StatusBar = require('./StatusBar');
var TitleScreen = require('./TitleScreen');
var TransitionScreen = require('./TransitionScreen');
var LevelLoader = require('./LevelLoader');

const GAME_STATE = {
    PLAY: 0,
    DIE: 1,
    GAME_OVER: 2,
    NEXT_LEVEL: 3,
    TITLE_SCREEN: 4,
    LOAD: 5,
    READY: 7,
    WAIT: 6
};
const FRAME_RATE = 30;
const INTERVAL = 1000 / FRAME_RATE;
const STARTING_LIVES = 3;

const BASE_VIEWPORT_WIDTH = 960;
const BASE_VIEWPORT_HEIGHT = 544;
const BASE_VIEWPORT_ASPECT_RATIO = BASE_VIEWPORT_WIDTH / BASE_VIEWPORT_HEIGHT;

function loadLevel(levelNumber) {
    this.levelLoader.get(levelNumber)
        .then(levelLoaded.bind(this))
        .catch(handleError.bind(this));
}

function handleError(err) {
    var msg = err.toString() + "\nfilename: " + err.fileName +
        "\nline number: " + err.lineNumber + "\ncolumn: " + err.columnNumber;
    alert(msg);
}

function levelLoaded(level) {
    if (level.complete) { // if all levels are passed, the game is won
        this.gameState = GAME_STATE.COMPLETE;    
        this.transitionTimer = this.transitionTime;
        this.level = null;
        this.playerLives = STARTING_LIVES;
    }
    else {
        this.gameState = GAME_STATE.NEXT_LEVEL;
        this.level = level;
        this.transitionTimer = this.transitionTime;
        this.level.load()
            .then(initGameObjects.bind(this))
            .then(setLevelBoundaries.bind(this))
            .then(setStatusBar.bind(this))
            .then(startLevel.bind(this))
            .catch(handleError.bind(this));
    }
}

function initGameObjects(assets) {
    this.canonBalls = [];
    this.lasers = [];
    this.explosions = [];
    return this.level.populate(assets, this.playerLives); 
}

function setStatusBar() {
    this.statusBar = Object.create(StatusBar);
    this.statusBar.init(this.context, this.level.player, this.level.baseHeight);
}

function setLevelBoundaries() {
    var buildings = this.level.buildings;
    var edge = this.level.baseWidth;
    for (var i=0; i < buildings.length; i++) {
       if (buildings[i].edge < edge) {
           edge = buildings[i].edge;
       }
    }
    this.level.buildingBoundary = edge;

    return Promise.resolve();
}

function rescaleLevel() {
    this.level.rescale(this.windowOnResize.width, this.windowOnResize.height);
    this.canvasResizer.resize(this.level.baseWidth * this.level.scale, this.level.baseHeight * this.level.scale);
}

function startLevel() {
    rescaleLevel.call(this);
    this.gameState = GAME_STATE.READY;
}

function playGame() {
    this.context.scale(this.level.scale, this.level.scale);
    var i;

    this.level.draw();
    this.statusBar.draw();
   
    // draw explosions
    i = this.explosions.length;
    while (i--) {
        this.explosions[i].draw(this.context);
        if (!this.explosions[i].animate()) {
            this.explosions.splice(i, 1);
        }
    }

    // draw enemies
    for (var i=0; i < this.level.aliens.length; i++) {
        this.level.aliens[i].draw();
    }
    for (var i=0; i < this.level.ufos.length; i++) {
        var laser = this.level.ufos[i].animate(this.level.buildingBoundary, 
                                               this.level.player);
        laser && this.lasers.push(laser);
        this.level.ufos[i].draw();
    }
   
    // Check if canon ball hits any enemies, or any buildings
    i = this.canonBalls.length;
    while (i--) {
        var canonBall = this.canonBalls[i];
        canonBall.draw();

        if (!canonBall.animate()) {
            this.canonBalls.splice(i, 1);
        }
        else {
            var j = this.level.ufos.length;
            var pass = false;
            while (j-- && !pass) {
                var ufo = this.level.ufos[j];
                if (ufo.checkCollision(canonBall)) {
                   generateExplosion.call(this, canonBall.posX, canonBall.posY);
                   this.canonBalls.splice(i, 1);
                   this.level.ufos.splice(j, 1);
                   pass = true;
                }
            }
            var k = this.level.aliens.length;
            while (k-- && !pass) {
                var alien = this.level.aliens[k];
                if (alien.checkCollision(canonBall)) {
                   generateExplosion.call(this, canonBall.posX, canonBall.posY);
                   this.canonBalls.splice(i, 1);
                   this.level.aliens.splice(k, 1);
                   pass = true;
                }
            }
            if (!pass) { // building collisions
                if (this.level.checkCollision(canonBall)) {
                   generateExplosion.call(this, canonBall.posX, canonBall.posY);
                   this.canonBalls.splice(i, 1);
                   pass = true;
                }
            }
        }
    }

    // check if the player is hit by any enemies lasers
    i = this.lasers.length;
    while(i--) {
        this.lasers[i].draw();
    
        if (this.lasers[i].checkCollision(this.level.player) && 
                this.level.player.alive) {
            generateExplosion.call(this, this.lasers[i].posX, 
                    this.lasers[i].posY);
            this.lasers.splice(i, 1);            
            playerDies.call(this);
        }
        else if (!this.lasers[i].animate()) {
            this.lasers.splice(i, 1);            
        }
    }

    this.level.player.alive && this.level.player.draw();

    // check if all enemies have been vanquished, and are done exploding
    if (!this.level.ufos.length && !this.level.aliens.length && !this.explosions.length) {
        this.transitionTimer = this.transitionTime;
        this.gameState = GAME_STATE.NEXT_LEVEL;
        loadLevel.call(this, ++this.currentLevel);
    }

    this.context.setTransform(1, 0, 0, 1, 0, 0);
}

function generateExplosion(posX, posY) {
    if (this.level.explosions.length === 1) {
        var explosion = Object.create(this.level.explosions[0]);
        explosion.init(this.context, posX, posY);
        this.explosions.push(explosion);
    }
    else {
        // TO-DO: handle variety of explosions, maybe choose by random, or by
        // a keyword?
        return;
    }
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
            player.turretPos--;
        }
    }
    if (keys[keyCode.ACTION]) {
        var canonBall = player.fireCanon();
        if (canonBall) {
            this.canonBalls.push(canonBall);
        }
    }
    if (keys[keyCode.INCREASE_POWER]) {
        this.level.player.increaseCanonBallSpeed();
    }
    if (keys[keyCode.DECREASE_POWER]) {
        this.level.player.decreaseCanonBallSpeed();
    }
}

function detectKeyPressesTitleScreen() {
    var keys = this.keyPressList;
    
    if (keys[keyCode.START]) {
        this.currentLevel = 1;
        loadLevel.call(this, 1);
        this.gameState = GAME_STATE.NEXT_LEVEL;
    }
    // TO-DO: Detect mouse events, and arrow keys
}

function playerDies() {
    this.playerLives = --this.level.player.lives;
    this.level.player.alive = false;
    this.gameState = GAME_STATE.DIE;
}

function waitForExplosions() {
    if (this.explosions.length || this.lasers.length) {
        playGame.call(this);
    }
    else if (this.level.player.lives) {
        this.level.player.alive = true;
        this.gameState = GAME_STATE.PLAY;
    }
    else {
        this.transitionTimer = this.transitionTime;
        this.gameState = GAME_STATE.GAME_OVER;
    }
}

function titleScreen() {
    this.context.scale(this.viewportScale, this.viewportScale);
    this.titleScreen.draw();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
}

function gameOver() {
    if (this.transitionTimer > 0) {
        this.context.scale(this.viewportScale, this.viewportScale);
        this.transitionScreen.draw("Game Over");
        this.transitionTimer--;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    else {
        this.playerLives = STARTING_LIVES;
        this.gameState = GAME_STATE.TITLE_SCREEN;
    }
}

function complete() {
    if (this.transitionTimer > 0) {
        this.context.scale(this.viewportScale, this.viewportScale);
        this.transitionScreen.draw("Congratulations, You Win!");
        this.transitionTimer--;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    else {
        this.gameState = GAME_STATE.TITLE_SCREEN;
    }
}

function transition(text) {
    this.context.scale(this.viewportScale, this.viewportScale);
    this.transitionScreen.draw(text);
    this.transitionTimer > 0 && this.transitionTimer--;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
}

function ready() {
    if (this.transitionTimer > 0) {
        this.context.scale(this.viewportScale, this.viewportScale);
        this.transitionScreen.draw("Level " + this.currentLevel);
        this.transitionTimer--;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    else {
        this.gameState = GAME_STATE.PLAY;
    }
}

function windowResized() {
    if (this.level) {
        rescaleLevel.call(this);
    }
    else {
        scaleViewport.call(this, this.windowOnResize.width, this.windowOnResize.height);
    }
}

// For scaling the transition screens, and title screen
function scaleViewport(width, height) {
    this.viewportScale = (width / height < BASE_VIEWPORT_ASPECT_RATIO) ? (width / BASE_VIEWPORT_WIDTH) : (height / BASE_VIEWPORT_HEIGHT);
    this.canvasResizer.resize(BASE_VIEWPORT_WIDTH * this.viewportScale, BASE_VIEWPORT_HEIGHT * this.viewportScale);
}

var Game = {
    init: function(context, keyPressList, windowOnResize, resizeCanvas) {
        this.context = context;
        this.gameState = GAME_STATE.TITLE_SCREEN;
        this.titleScreen = Object.create(TitleScreen);
        this.titleScreen.init(context, BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT);
        this.keyPressList = keyPressList;
        this.transitionTime = FRAME_RATE * 2; // 2 seconds
        this.transitionScreen = Object.create(TransitionScreen);
        this.transitionScreen.init(context, BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT);
        this.levelLoader = Object.create(LevelLoader);
        this.levelLoader.init(context);
        this.playerLives = STARTING_LIVES;
        this.windowOnResize = windowOnResize;
        this.canvasResizer = resizeCanvas;
        scaleViewport.call(this, this.windowOnResize.width, this.windowOnResize.height);
        this.windowOnResize.on('resize', windowResized.bind(this));
    },
    loop: function() {
        switch (this.gameState) {
            case GAME_STATE.PLAY:
                detectKeyPresses.call(this);
                playGame.call(this);
                break;
            case GAME_STATE.DIE:
                waitForExplosions.call(this);
                break;
            case GAME_STATE.GAME_OVER:
                gameOver.call(this);
                break;	
            case GAME_STATE.NEXT_LEVEL:
                transition.call(this, "Level " + this.currentLevel);
                break;
            case GAME_STATE.TITLE_SCREEN:
                detectKeyPressesTitleScreen.call(this);
                titleScreen.call(this);
                break;
            case GAME_STATE.COMPLETE:
                complete.call(this);
                break;
            case GAME_STATE.WAIT:
                (function() {})();
                break;
            case GAME_STATE.READY:
                ready.call(this);
                break;
            default:
                break;
        }
    },
    interval: INTERVAL
};

module.exports = Game;

var CanonBall = require('./CanonBall.js');

var Player = {
    init: function(context, image, posX, posY, lives, ground, baseCanvasHeight) {
        this.context = context;
        this.spriteSheet = image;
        this.lives = lives;
        this.posX = posX;
        this.posY = posY;
        this.ground = ground;
        this.baseCanvasHeight = baseCanvasHeight;
       
        // defaults, or starting values
        this.turretPos = 0;
        this.canonTimer = 0; // controls canon firing interval
        this.alive = true;

        // Configurable, or adjustable by player in game
        this.canonBallSpeed = 5;
        this.canonHold = 60; // interval between firing canon balls (2s)
        this.speed = 2;
        
        // Constants 
        this.width = 118;
        this.height = 80;
        this.canonX = 62;
        this.canonY = 29;
        this.hitHeight = 37;
        this.hitWidth = 90;
        this.turretAngle = -5;
        this.turretLength = 50;
        this.turretCount = 14;
    },
    increaseCanonBallSpeed: function() {
        this.canonBallSpeed += this.canonBallSpeed < 15 ? 0.2 : 0;
    },
    decreaseCanonBallSpeed: function() {
        this.canonBallSpeed -= this.canonBallSpeed > 1 ? 0.2 : 0;
    },
    draw: function() {
        var sourceX = Math.floor(this.turretPos % 3) * this.width;
        var sourceY = Math.floor(this.turretPos / 3) * this.height;
        this.context.drawImage(
            this.spriteSheet, sourceX, sourceY, this.width, this.height, 
            this.posX, this.ground - this.height, this.width, this.height
        );
        if (this.canonTimer > 0) {
            this.canonTimer--;
        }
    },
    fireCanon: function() {
        if (this.canonTimer === 0) {
            this.canonTimer = this.canonHold;
            var angle = this.turretPos && this.turretPos * this.turretAngle;
            var rad = Math.PI * angle/180;
            var xPos = this.posX + this.canonX + Math.cos(rad) * 
                this.turretLength;
            var yPos = (this.ground - this.canonY) + Math.sin(rad) * 
                this.turretLength;
            var dx = Math.cos(rad) * this.canonBallSpeed;
            var dy = Math.sin(rad) * this.canonBallSpeed;
            var canonBall = Object.create(CanonBall);
            canonBall.init(this.context, xPos, yPos, dx, dy, this.baseCanvasHeight);
            return canonBall;
        }
        else {
            return false;
        }
    }
};

module.exports = Player;

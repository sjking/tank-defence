var CanonBall = require('./CanonBall.js');

var Player = {
    init: function(context, image, posX, posY, lives) {
        this.context = context;
        this.spriteSheet = image;
        this.lives = lives;
        this.posX = posX;
        this.posY = posY;
        this.alive = true;
        this.width = 118;
        this.height = 80;
        this.canonX = 62;
        this.canonY = 29;
        this.hitHeight = 37;
        this.hitWidth = 90;
        this.turretPos = 0;
        this.turretAngle = -5;
        this.turretLength = 50;
        this.turretCount = 14;
        this.speed = 2;
        this.canonTimer = 0;
        this.canonHold = 60;
        this.canonBallSpeed = 5;
        this.ground = 416;
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
            canonBall.init(this.context, xPos, yPos, dx, dy);
            return canonBall;
        }
        else {
            return false;
        }
    }
};

module.exports = Player;

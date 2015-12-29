
var Player = {
    init: function(context, image, posX, posY, lives) {
        this.context = context;
        this.spriteSheet = image;
        this.lives = lives;
        this.posX = posX;
        this.posY = posY;
        this.width = 118;
        this.height = 80;
        this.hitHeight = 37;
        this.hitWidth = 90;
        this.turretPos = 0;
        this.turretAngle = -5;
        this.turretLength = 50;
        this.turretCount = 14;
        this.speed = 2;
        this.ground = 416;
    },
    draw: function() {
        var sourceX = Math.floor(this.turretPos % 3) * this.width;
        var sourceY = Math.floor(this.turretPos / 3) * this.height;
        this.context.drawImage(
            this.spriteSheet, sourceX, sourceY, this.width, this.height, 
            this.posX, this.ground - this.height, this.width, this.height
        );
    }
};

module.exports = Player;

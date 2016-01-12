var Alien = {
    init: function(context, posX, posY, image) {
        this.context = context;
        this.spriteSheet = image;
        this.frameIndex = 0;
        this.animationCounter = 0;
        this.forwards = true;
        this.width = 41;
        this.height = 54;
        this.posX = posX;
        this.posY = posY;
        this.animationFrequency = 3;
    },
    draw: function() {
        this.animationCounter++;
        if (this.frameIndex === 3) {
            this.forwards = false;
        }
        else if (this.frameIndex === 0) {
            this.forwards = true;
        }
        var sourceX = Math.floor(this.frameIndex % 4) * this.width;
        var sourceY = 0;
        this.context.drawImage(this.spriteSheet, sourceX, sourceY, this.width, 
                this.height, this.posX - this.width/2, this.posY - this.height, 
                this.width, this.height
        );
        if (this.animationCounter == this.animationFrequency) {
            this.forwards ? this.frameIndex++ : this.frameIndex--; 
            this.animationCounter = 0;
        }
    },
    checkCollision: function(projectile) {
        if (projectile.posX > this.posX && 
                projectile.posX < this.posX + this.width &&
                projectile.posY > this.posY - this.height &&
                projectile.posY < this.posY) {
            return true;
        }
        return false;
    }
};

module.exports = Alien;

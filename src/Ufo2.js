var Ufo = {
    init: function(context, posX, posY, dx, dy, laserFrequency, image) {
        this.context = context; 
        this.posX = posX;
        this.posY = posY;
        this.dx = dx;
        this.dy = dy;
        this.spriteSheet = image;
        this.frameIndex = 0;
        this.animationCounter = 0;
        this.width = 119;
        this.height = 42;
        this.numberOfFrames = 8;
        this.animationFrequency = 6;
        this.forwards = true;
        this.laserFrequency = laserFrequency;
        this.laserCounter = 0;
    },
    draw: function() {
        this.animationCounter++;
        this.laserCounter++;
        var sourceX = Math.floor(this.frameIndex % 4) * this.width;
        var sourceY = Math.floor(this.frameIndex / 4) * this.height;
        this.context.drawImage(this.spriteSheet, sourceX, sourceY, this.width, 
                this.height, this.posX-this.width/2, this.posY-this.height, 
                this.width, this.height
        );
        if (this.animationCounter === this.animationFrequency) {
            if (this.frameIndex < this.numberOfFrames-1) {
                this.frameIndex++;
            }
            else {
                this.frameIndex = 0; 
            }
            this.animationCounter = 0;
        }
    }
}

module.exports = Ufo;

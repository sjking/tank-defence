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
        this.up = true;
        this.laserFrequency = laserFrequency;
        this.laserCounter = 0;
    },
    draw: function() {
        var sourceX = Math.floor(this.frameIndex % 4) * this.width;
        var sourceY = Math.floor(this.frameIndex / 4) * this.height;
        this.context.drawImage(this.spriteSheet, sourceX, sourceY, this.width, 
                this.height, this.posX-this.width/2, this.posY-this.height, 
                this.width, this.height
        );
    },
    animate: function(buildingBoundary, player) {
        this.animationCounter++;
        this.laserCounter++;
        
        if (this.animationCounter === this.animationFrequency) {
            if (this.frameIndex < this.numberOfFrames-1) {
                this.frameIndex++;
            }
            else {
                this.frameIndex = 0; 
            }
            this.animationCounter = 0;
        }
        
        this.posX += this.forwards ? this.dx : -this.dx;
        this.poxY += this.up ? this.dy : -this.dy;
        if (this.posX > this.context.canvas.width - this.width/2) {
            this.forwards = false;
        }
        if (this.posX < this.width/2) {
            this.forwards = true;
        }

        if (this.laserCounter > this.laserFrequency && 
                this.posX < buildingBoundary && player) {
            var targetX = player.posx + player.width / 2.0;
            var targetY = player.ground - player.height / 2.0;
            var sourceX = this.posX;
            var sourceY = this.posY;
            this.laserCounter = 0;
            // TO-DO: make a laser object and return it
        }
    }
}

module.exports = Ufo;

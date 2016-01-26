var Laser = require('./Laser');

var Ufo = {
    init: function(context, posX, posY, dx, dy, laserFrequency, image, baseWidth) {
        this.context = context; 
        this.posX = posX;
        this.posY = posY;
        this.dx = dx;
        this.dy = dy;
        this.spriteSheet = image;
        this.baseWidth = baseWidth;
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
        this.laserSpeed = 5.0; // TO-DO: pass this in 
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
        // Return a laser if the laser is fired, else return null
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
        this.posY += this.up ? this.dy : -this.dy;
        if (this.posX > this.baseWidth - this.width/2) {
            this.forwards = false;
        }
        if (this.posX < this.width/2) {
            this.forwards = true;
        }

        if (this.laserCounter > this.laserFrequency && 
                this.posX < buildingBoundary && player.alive) {
            var targetX = player.posX + player.width / 2.0;
            var targetY = player.ground - player.height / 2.0;
            var sourceX = this.posX;
            var sourceY = this.posY;
            this.laserCounter = 0;
            // TO-DO: make a laser object and return it
            var newLaser = Object.create(Laser);
            newLaser.init(this.context, targetX, targetY, sourceX, sourceY, 
                          this.laserSpeed
            );
            return newLaser;
        }
        return null;
    },
    checkCollision: function(projectile) {
        if (projectile.posX > this.posX - this.width/2.0 &&
                projectile.posX < this.posX + this.width/2.0 &&
                projectile.posY > this.posY - this.height &&
                projectile.posY < this.posY) {
            return true;
        }
        return false;
    }
}

module.exports = Ufo;

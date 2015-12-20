 var eggAnimationFrequency = 3;
 
function animateEgg(theContext) {
    //if (!this.destroyed) {
		this.animationCounter++; 
        if (this.frameIndex == 3) {
            this.forwards = false;
        }
        else if (this.frameIndex == 0) {
            this.forwards = true;
        }		
        var sourceX = Math.floor(this.frameIndex % 4) * this.width;
        var sourceY = 0;
        //console.log("sourceX: " + sourceX + ", sourceY: " + sourceY);
		//console.log("hello: ");
		
        theContext.drawImage(this.spriteSheet, sourceX, sourceY, this.width, this.height, this.posX-this.width/2, 
        		this.posY-this.height, this.width, this.height);
        if (this.animationCounter == this.animationFrequency) {
            if (this.forwards)
                this.frameIndex++;
            else
                this.frameIndex--;
            this.animationCounter = 0;
        }
	//}
}

function eggCollision(projectile) {
	if (projectile.x > this.posX && projectile.x < this.posX+this.width && 
		projectile.y > this.posY-this.height && projectile.y < this.posY)
		return true;
}

    function Egg(animationFrequency, spriteSheet, posX, posY) {
        //this.destroyed = false;
		this.forwards = true;
        this.frameIndex = 0;
        this.animationCounter = 0;
        this.width = 41;
        this.height = 54;
        this.posX = posX;
        this.posY = posY;
        this.animationFrequency = animationFrequency;
        this.spriteSheet = spriteSheet;
        this.draw = animateEgg;
		this.checkCollision = eggCollision;
    }
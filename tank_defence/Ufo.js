 var ufoAnimationFrequency = 6;
 
 function animateUfo(theContext) {
	this.animationCounter++;
	this.laserCounter++;
	var sourceX = Math.floor(this.frameIndex % 4) * this.width;
	var sourceY = Math.floor(this.frameIndex / 4) * this.height;
	
	//console.log("ufo sourceX: " + sourceX);
	//console.log("ufo sourceY: " + sourceY);
	
	/*
	theContext.fillStyle = "#ee33dd";
	theContext.fillRect(this.posX-this.width/2.0, this.posY-this.height, this.width, this.height);
	theContext.fillStyle = "#000000";
	*/
	
	theContext.drawImage(this.spriteSheet, sourceX, sourceY, this.width, this.height, 
			this.posX-this.width/2, this.posY-this.height, this.width, this.height);
	
	
	
	
	if (this.animationCounter == this.animationFrequency) {
		if (this.frameIndex < this.numberOfFrames-1)
			this.frameIndex++;
		else
			this.frameIndex = 0;
		this.animationCounter = 0;
	}
 }
 
function ufoCollision(projectile) {
	if (projectile.x > this.posX-this.width/2.0 && projectile.x < this.posX+this.width/2.0 && 
		projectile.y > this.posY-this.height && projectile.y < this.posY)
		return true;
}

 
 function Ufo(animationFrequency, spriteSheet, posX, posY, dx, dy) {
	this.frameIndex = 0;
	this.animationCounter = 0;
	this.width = 119;
	this.height = 42;
	this.numberOfFrames = 8;
	this.posX = posX;
	this.posY = posY;
	this.dx = dx;
	this.dy = dy;
	this.animationFrequency = animationFrequency;
	this.spriteSheet = spriteSheet;
	this.draw = animateUfo;
	this.forwards = true;
	this.checkCollision = ufoCollision;
	this.laserFrequency = 100;
	this.laserCounter = 0;
	//this.checkCollision = ufoCollision;
}
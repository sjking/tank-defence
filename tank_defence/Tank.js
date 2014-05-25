function drawTank(theContext) {
	var sourceX = Math.floor(this.turretPos % 3) * 118;
	var sourceY = Math.floor(this.turretPos / 3) * 80;
	theContext.drawImage(this.spriteSheet, sourceX, sourceY, 
		118, 80, this.posX, this.ground-80, 
		118, 80);
}

function Tank(spriteSheet, posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.width = 118;
	this.height = 80;
	this.hitHeight = 37;
	this.hitWidth = 90;
	this.spriteSheet = spriteSheet;
	this.draw = drawTank;
	this.turretPos = 0;
	this.turretAngle = -5;
	this.turretLength = 50;
	this.ground = 416;
}

function drawLevel(theContext) {
	var mapRows = 15;
	var mapCols = 20;
	var mapIndexOffset = -1;
	//console.log("hello");
	for (var i=0; i < mapRows; i++) {
			for (var j=0; j < mapCols; j++) {
				var tileId = this.tileMap[i][j] + mapIndexOffset;
				var sourceX = tileId*32;
				var sourceY = 0;
				theContext.drawImage(this.tileSheet, sourceX, sourceY, 32, 32, j*32,i*32, 32, 32);
			}
	}
}

function levelCollision(projectile) {
	var numberOfBuildings = this.buildingBounds.length;
	for(var i=0; i < numberOfBuildings; i++)
		if (projectile.x > this.buildingBounds[i].x && 
			projectile.x < this.buildingBounds[i].width+this.buildingBounds[i].x && projectile.y > this.buildingBounds[i].y)
			return true;
}

// object for a level
function Level(tileMap, buildingBounds, tileSheet, buildingEdge) {
	this.tileMap = tileMap;
	this.buildingBounds = buildingBounds;
	this.tileSheet = tileSheet;
	this.draw = drawLevel;
	this.checkCollision = levelCollision;
	this.buildingEdge = buildingEdge;
}

/************/
/* Level 1 **/
/************/
var levelOneTileMap = [
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,2,2,2,2,2,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,5,4,4,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,7,7,4,4,3,4,4,7,7,7,7],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
	];

var levelOneBuildingBoundsObj1 = {x:352,y:160,width:160};
var levelOneBuildingBounds = [levelOneBuildingBoundsObj1];
var levelOneBuildingEdge = 352;
var levelOneEggPosX = levelOneBuildingBoundsObj1.x + levelOneBuildingBoundsObj1.width/2;
var levelOneEggPosY = levelOneBuildingBoundsObj1.y;


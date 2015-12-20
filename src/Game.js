window.addEventListener('load', eventWindowLoaded, false);	
function eventWindowLoaded() {

	canvasApp();
	
}

function canvasSupport () {
  	return Modernizr.canvas;
}


function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	else {
		var theCanvas = document.getElementById("canvas");
		var context = theCanvas.getContext("2d");
	}
	
	// load the level
	var levelSheet = new Image();
	levelSheet.src = "/content/projects/building_32x32.png";
	
	// explosion sheet
	var explosionSheet = new Image();
	explosionSheet.src = "/content/projects/explosion.png";
	
	// egg sheet
	var eggSheet = new Image();
	eggSheet.src = "/content/projects/egg_sheet_sm.png";
	
	// ufo sheet
	var ufoSheet = new Image();
	ufoSheet.src = "/content/projects/ufo_sheet.png";
	
	var tileSheet = new Image();
	tileSheet.src = "/content/projects/tank_sheet_sm.png";	
	tileSheet.addEventListener('load', eventTankLoaded, false);
	
	
	var level;
	var eggs = [];
	var ufos = [];
	var player;
	var turretCnt = 14;
	var tankH = 80;
	var tankBodyH = 37;
	var tankW = 118;
	var ground = 416;
	var keyPressList = [];

	var x = 100;
	var speed = 2; // speed of the tank

	var ufoDx = 4;
	var ufoDy = 0;
	var ufoStartX = -50;
	var ufoStartY = 65;
	var ufoLasers = [];
	var laserSpeed = 5.0;
	
	var buildingX = 11 *32;	// level specific!!!!!
	var buildingY = 8 * 32 // level specific!!!!
	var buildingW = 5*32;
	
	var canonBalls = [];
	var canonBallSpeed = 5.0;
	var canonHold = 60;	// hold time to shoot another canon ball
	var canonTimer = 0;
	var gravity = 0.2;
	var explosions =[];	// holds all the current explosions
	
	var currentGameState;	// holds the current game state
	var playerLives;	// holds the number of lives
	var transitionAmount = 90;	// length of the transition between states	
	var transitionCounter;	

	// Game state constants
	var GAME_STATE_PLAY = 0;
	var GAME_STATE_DIE = 1;
	var GAME_STATE_GAME_OVER = 2;
	var GAME_STATE_NEXT_LEVEL = 3;
	var GAME_STATE_TITLE_SCREEN = 4;
	
	function eventTankLoaded() {
		level = new Level(levelOneTileMap, levelOneBuildingBounds, levelSheet);
		eggs[0] = new Egg(eggAnimationFrequency, eggSheet, levelOneEggPosX, levelOneEggPosY);
		ufos[0] = new Ufo(ufoAnimationFrequency, ufoSheet, ufoStartX, ufoStartY, ufoDx, ufoDy);
		player = new Tank(tileSheet, 50, ground);
		startUp();
	}
	
	function playGame() {
		// check the keys
		if (keyPressList[37] == true) {
			if (player && player.posX > 0)
					player.posX -= speed;
		}
		if (keyPressList[39] == true) {
			if (player && player.posX < 352-player.width) // change this from its constant valu
					player.posX += speed;
		}
		// move turret up
		if (keyPressList[38] == true) {
			if (player && player.turretPos < turretCnt)				
					player.turretPos++;				
		}
		// move turret down
		if (keyPressList[40] == true) {
			if (player && player.turretPos > 0)
				player.turretPos--;				
		}
		// fire canon
		if (keyPressList[32] == true) {
			if (player && canonTimer == 0) {
					canonTimer = canonHold;
					fireCanon(player.turretAngle);
			}
		}
		// canon velocity
		if (keyPressList[188] == true) { // decrease
			if (canonBallSpeed > 1)
				canonBallSpeed -= 0.2;	
		}
		if (keyPressList[190] == true) { // increase
			if (canonBallSpeed < 14.9)
				canonBallSpeed += 0.2;
		}
		level.draw(context);
		
		//draw moon
		context.fillStyle = "#003344";
		context.beginPath();
		context.arc(100, 100, 30, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		context.fillStyle = "#000000";
		
		// draw egg
		for (var i=0; i < eggs.length; i++)
			eggs[i].draw(context);
		
		// draw ufo
		if (ufos.length > 0) {
			tempUFO = ufos[ufos.length-1];
			if (tempUFO.forwards) {
				tempUFO.posX += tempUFO.dx;
				tempUFO.posY += tempUFO.dy;
			}
			else {
				tempUFO.posX -= tempUFO.dx;
				tempUFO.posY -= tempUFO.dy;
			}
			if (tempUFO.posX > theCanvas.width-tempUFO.width/2)
				tempUFO.forwards = false;
			if (tempUFO.posX < tempUFO.width/2)
				tempUFO.forwards = true;
			// fire ufo lasers 
			if (tempUFO.laserCounter > tempUFO.laserFrequency && tempUFO.posX < 352 && player) {
				var targetX = player.posX + player.width/2.0; // the x position of the tank
				var targetY = ground - player.height/2.0; // y position of tank
				var sourceX = tempUFO.posX;
				var sourceY = tempUFO.posY; 
				
				fireUFOLaser(targetX, targetY, sourceX, sourceY);
				tempUFO.laserCounter = 0;
			}

			tempUFO.draw(context);
		}
		
		// draw ufo lasers and check collisions
		var tempUFOLasers= {};
		var UFOLaserLength = ufoLasers.length;
		for (var i = 0; i < UFOLaserLength; i++) {
			tempUFOLaser = ufoLasers[i];
			
			if (tempUFOLaser) {
				context.fillStyle = "#ffffff";
				context.beginPath();
				context.arc(Math.floor(tempUFOLaser.x), 
					Math.floor(tempUFOLaser.y), 2, (Math.PI/180)*0, 
					(Math.PI/180)*360, false);
				context.closePath();
				context.fill();
				context.fillStyle = "#000000";
				tempUFOLaser.x += tempUFOLaser.dx;
				tempUFOLaser.y += tempUFOLaser.dy;
				var currentUfoLaser = {x: tempUFOLaser.x, y: tempUFOLaser.y};
			
				// check to see if the laser hits the tank
				if (tempUFOLaser.x > player.posX && 
						tempUFOLaser.x < player.posX + player.hitWidth  && 
						tempUFOLaser.y > ground-player.hitHeight && 
						tempUFOLaser.y < ground) {
					ufoLasers.splice(i,1);
					explosions.push({coordinates:currentUfoLaser, frame:0});
					die();
				}
				// check to see if the laser hits the ground or goes out of bounds
				if (tempUFOLaser.y > ground) {
					ufoLasers.splice(i,1);
					continue;	
				}
				if (tempUFOLaser.x < 0 || tempUFOLaser.x > theCanvas.width) {
					ufoLasers.splice(i,1);
					continue;	
				}
			}
		}
		
		// status bar
		context.fillStyle = "#eeeeee";
		context.font = "12pt Arial";
		context.fillText('Power: ', 10, ground+25);
		context.fillSytle = "#000000";
		context.fillText('Lives: ', 10, ground+50);
		context.fillText(playerLives, 60, ground+50);
		context.fillStyle = "#666666";
		context.fillRect(70, ground+15, 100, 10);
		context.fillStyle = "#dddddd";
		// current power
		context.fillRect(70, ground+15, canonBallSpeed*6.67, 10);
		context.fillStyle = "#000000";
			
		// tank
		if (player) {
			player.draw(context);
		}
	
		// canon balls
		var tempCanonBall = {};
		var canonBallLen = canonBalls.length;
		for (var i = 0; i < canonBallLen; i++) {
			tempCanonBall = canonBalls[i];
			
			if (tempCanonBall) {
				context.fillStyle = "#ffffff";
				context.beginPath();
				context.arc(Math.floor(tempCanonBall.x), 
					Math.floor(tempCanonBall.y), 2, (Math.PI/180)*0, 
					(Math.PI/180)*360, false);
				context.closePath();
				context.fill();
				context.fillStyle = "#000000";
				
				tempCanonBall.x += tempCanonBall.dx;
				tempCanonBall.y += tempCanonBall.dy;
				tempCanonBall.dy += gravity;
				
				var currentCanonBall = {x: tempCanonBall.x, y: tempCanonBall.y};
				
				//check to see if it hits a building
				if (level.checkCollision(currentCanonBall)) {
					explosions.push({coordinates:currentCanonBall, frame:0});
					canonBalls.splice(i,1);
					continue;
				}
						
				// check if canon ball hits an egg
				for (var j=0; j < eggs.length; j++) {
					if (eggs[j].checkCollision(currentCanonBall)) {
						console.log("egg collision check");
						explosions.push({coordinates:currentCanonBall, frame:0});
						canonBalls.splice(j,1);
						eggs.splice(j,1);
						continue;
					}
				}
				// check if the canon ball hits the ufo
				if (ufos.length > 0) {
					tempUFO = ufos[ufos.length-1];
					if (tempUFO.checkCollision(currentCanonBall)) {
						explosions.push({coordinates:currentCanonBall, frame:0});
						canonBalls.splice(i,1);
						ufos.splice(i,1);
						continue;
					}
				}
				// check to see if the canon ball is out of bounds or hits the ground
				if (tempCanonBall.y > ground) {
					console.log("hit the ground for i: " + i);
					canonBalls.splice(i,1);
					console.log("canonBalls.length: " + canonBalls.length);
					continue;
				}
				if (tempCanonBall.x > theCanvas.width || tempCanonBall.x < 0) {
					canonBalls.splice(i,1);
					continue;
				}	
			}		
		}
		if (canonTimer > 0)
			canonTimer--;
	
		drawExplosions();
		
		// check if the player can go to the next level
		if (ufos.length < 1 && eggs.length < 1) {
			passToNextLevel();
		}
	}
	
	function passToNextLevel() {
		currentGameState = GAME_STATE_NEXT_LEVEL;
		transitionCounter = 0;
	}
	
	// when the tank gets killed
	function die() {
		playerLives--;
		player = null;
		// if (playerLives > 0) {
			playerLostLife();			
			currentGameState = GAME_STATE_DIE;
		// }	
		// else
		// 	currentGameState = GAME_STATE_GAME_OVER;
	}
	
	// when the player gets killed transition screen
	function playerLostLife() {
		transitionCounter = 0;
	}

	function resetGameObjects() {
		player = new Tank(tileSheet, 50, ground);			
		var numberOfEggs = eggs.length;
		for (var i=0; i < numberOfEggs; i++) {
			eggs.splice(i,1);
		}
		var numberOfUfos = ufos.length;
		for (var i=0; i < numberOfUfos; i++) {
			ufos.splice(i,1);
		}
		var numberOfUfoLasers = ufoLasers.length;
		for (var i=0; i < numberOfUfoLasers; i++) {
			ufoLasers.splice(i,1);
		}
		var numberOfCanonBalls = canonBalls.length;
		for (var i=0; i < numberOfCanonBalls; i++) {
			canonBalls.splice(i,1);
		}
		
		eggs[0] = new Egg(eggAnimationFrequency, eggSheet, levelOneEggPosX, levelOneEggPosY);
		ufos[0] = new Ufo(ufoAnimationFrequency, ufoSheet, ufoStartX, ufoStartY, ufoDx, ufoDy);
	}

	// handle displaying the state transition screen
	function transition() {
		if (explosions.length > 0) {
			playGame();
			console.log("still exploding");	
		}
		else if (transitionCounter >= transitionAmount) {
			if (playerLives > 0) {	
				// reset the game objects
				resetGameObjects();
				currentGameState = GAME_STATE_PLAY;
			}
			else {
				currentGameState = GAME_STATE_GAME_OVER;
			}
		}
		else if (currentGameState == GAME_STATE_DIE) {
			// display the transition screen
			context.fillStyle = "#000000";
			context.fillRect(0, 0, theCanvas.width, theCanvas.height);
			context.fillStyle = "#000000";
			// draw some text
			context.fillStyle = "#eeeeee";
			context.font = "12pt Arial";
			if (playerLives > 0)
				context.fillText('You Died', theCanvas.width/2-25, theCanvas.height/2);
			else
				context.fillText('Game Over', theCanvas.width/2-25, theCanvas.height/2);
			context.fillSytle = "#000000";	
		}
		else if (currentGameState == GAME_STATE_NEXT_LEVEL) {
			// display the transition screen
			context.fillStyle = "#000000";
			context.fillRect(0, 0, theCanvas.width, theCanvas.height);
			context.fillStyle = "#000000";
			// draw some text
			context.fillStyle = "#eeeeee";
			context.font = "12pt Arial";
			context.fillText('You pass to the next level!', theCanvas.width/2-100, theCanvas.height/2);
			context.fillSytle = "#000000";
		}
		transitionCounter++;
	}
	
	// handle display game over screen
	function gameOver() {
		if (explosions.length > 0) {
			playGame();
		}
		else {
			// play again?
			if (keyPressList[80] == true) {
				resetGameObjects();
				playerLives = 3;
				currentGameState = GAME_STATE_PLAY;
			}
		
			// display the transition screen
			context.fillStyle = "#000000";
			context.fillRect(0, 0, theCanvas.width, theCanvas.height);
			context.fillStyle = "#000000";
			// draw some text
			context.fillStyle = "#eeeeee";
			context.font = "12pt Arial";
			context.fillText('Tank Defence', theCanvas.width/2-150, theCanvas.height/2);
			context.fillText("Press 'p' to play", theCanvas.width/2-150, theCanvas.height/2+50);
			context.fillSytle = "#000000";	
		}
	}

	function drawExplosions() {
		var numberOfFramesInExplosion = 42;
		var width = 130;
		var height = 130;
		var numberOfExplosions = explosions.length;
		for (var i=0; i < numberOfExplosions; i++) {
			var tempExplosion = explosions[i];
			if (tempExplosion) {
				var posX = tempExplosion.coordinates.x-(width/2);
				var posY = tempExplosion.coordinates.y-(height/2);
				
				var frameNumber = tempExplosion.frame;
				
				if (frameNumber > numberOfFramesInExplosion-1) {
					explosions.splice(i,1);
					console.log("remove explosion i: " + i);
					continue;
				}
				var sourceX = Math.floor(frameNumber % 6) * width; // 130 width
				var sourceY = Math.floor(frameNumber / 6) * height; // 130 height
				
				context.drawImage(explosionSheet, sourceX, sourceY, width, height, posX, posY, width, height);
				explosions[i].frame++;
			}
			
		}
		
	}
	
	function fireCanon(angle) {
		var angle = player.turretPos * player.turretAngle;
		var rad = Math.PI * (angle)/180;
		console.log("rad: " + rad);
		var xPos = player.posX + 62 + Math.cos(rad) * player.turretLength;
		var yPos = (ground - 29) + Math.sin(rad) * player.turretLength;
		var newCanonBall = {};
		newCanonBall.x = xPos;
		newCanonBall.y = yPos;
		newCanonBall.dx = Math.cos(rad) * canonBallSpeed;
		newCanonBall.dy = Math.sin(rad) * canonBallSpeed;	
		canonBalls.push(newCanonBall);
	}
	
	function fireUFOLaser(targetX, targetY, sourceX, sourceY) {
		var distX = targetX - sourceX;
		var distY = targetY - sourceY;
		var rad = Math.atan(distX / distY);
		var newUFOLaser = {};
		newUFOLaser.x = sourceX;
		newUFOLaser.y = sourceY;
		newUFOLaser.dx = laserSpeed * Math.sin(rad);
		newUFOLaser.dy = laserSpeed * Math.cos(rad);
		ufoLasers.push(newUFOLaser);
	}
	
	// determines the game state and draws for it
	function gameLoop() {
		switch (currentGameState) {
			case GAME_STATE_PLAY:
				playGame();
				break;
			case GAME_STATE_DIE:
				transition()
				break;
			case GAME_STATE_GAME_OVER:
				gameOver();
				break;
			case GAME_STATE_NEXT_LEVEL:
				transition();
				break;
			default:
				break;
		}
	}
	
	const FRAME_RATE=30;
	function startUp() {
		var intervalTime = 1000/FRAME_RATE;
		currentGameState = GAME_STATE_GAME_OVER;
		playerLives = 3;
		setInterval(gameLoop, intervalTime);
	}
	
	document.onkeydown = function(e) {
		e = e ? e : window.event;
		keyPressList[e.keyCode] = true;
	}
	
	document.onkeyup = function(e) {
		e = e ? e : window.event;
		keyPressList[e.keyCode] = false;
	} 
	
	
}
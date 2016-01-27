var Laser = {
    init: function(context, targetX, targetY, sourceX, sourceY, speed, baseCanvasHeight) {
        this.context = context; 
        this.speed = speed;
        this.baseCanvasHeight = baseCanvasHeight;

        var distX = targetX - sourceX;
        var distY = targetY - sourceY;
        var rad = Math.atan(distX / distY);

        this.posX = sourceX;
        this.posY = sourceY;
        this.dx = this.speed * Math.sin(rad);
        this.dy = this.speed * Math.cos(rad);
        this.radius = 2;
    },
    animate: function () {
        this.posX += this.dx;
        this.posY += this.dy;
        return this.posY <= this.baseCanvasHeight;
    },
    draw: function() {
        this.context.fillStyle = "#ffffff";
        this.context.beginPath();
        this.context.arc(Math.floor(this.posX), Math.floor(this.posY), 
                         this.radius, 0, Math.PI/180 * 360, false
        );
        this.context.closePath();
        this.context.fill();
    },
    checkCollision: function(player) {
        // returns true if collision, false if not
        if (this.posX > player.posX &&
                this.posX < player.posX + player.hitWidth &&
                this.posY > player.ground - player.hitHeight &&
                this.posY < player.ground) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Laser;

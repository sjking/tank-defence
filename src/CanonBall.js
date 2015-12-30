var CanonBall = {
    init: function(context, posX, posY, dx, dy) {
        this.posX = posX;
        this.posY = posY;
        this.dx = dx;
        this.dy = dy;
        this.context = context;
        this.radius = 2;
        this.gravity = 0.2;
    },
    animate: function() {
        this.posX += this.dx;
        this.posY += this.dy;
        this.dy += this.gravity;
        
        return this.posY < this.context.canvas.height;
    },
    draw: function() {
        this.context.fillStyle = "#ffffff";
        this.context.beginPath();
        this.context.arc(Math.floor(this.posX), Math.floor(this.posY), 
            this.radius, 0, Math.PI/180 * 360, false
        );
        this.context.closePath();
        this.context.fill();
        //this.context.fillStyle = "#000000";
    }
}

module.exports = CanonBall;

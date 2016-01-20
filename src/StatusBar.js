var StatusBar = {
    init: function(context, player) {
        this.context = context;
        this.player = player;
        this.posY = this.context.canvas.height - 64;
    },
    draw: function() {
        this.context.fillStyle = "#eee";
        this.context.font = "12pt Arial";
        this.context.textAlign = "left";
        this.context.fillText('Power: ', 10, this.posY + 25);
        this.context.fillText('Lives: ', 10, this.posY + 50);
        this.context.fillText(this.player.lives, 60, this.posY + 50);
        this.context.fillStyle = "#666";
        this.context.fillRect(70, this.posY + 15, 100, 10);
        this.context.fillStyle = "#ddd";
        // current power
        this.context.fillRect(70, this.posY + 15, 
                this.player.canonBallSpeed*6.67, 10);
        this.context.fillStyle = "#000";
    }
};

module.exports = StatusBar;

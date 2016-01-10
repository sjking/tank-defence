var StatusBar = {
    init: function(context, player) {
        this.context = context;
        this.player = player;
        this.ground = 416; // TO-DO: this shouldn't be hard-coded
    },
    draw: function() {
        this.context.fillStyle = "#eee";
        this.context.font = "12pt Arial";
        this.context.textAlign = "left";
        this.context.fillText('Power: ', 10, this.ground+25);
        this.context.fillText('Lives: ', 10, this.ground+50);
        this.context.fillText(this.player.lives, 60, this.ground+50);
        this.context.fillStyle = "#666";
        this.context.fillRect(70, this.ground+15, 100, 10);
        this.context.fillStyle = "#ddd";
        // current power
        this.context.fillRect(70, this.ground+15, 
                this.player.canonBallSpeed*6.67, 10);
        this.context.fillStyle = "#000";
    }
};

module.exports = StatusBar;

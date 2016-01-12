const BACKGROUND_COLOR = "#000";
const TEXT_COLOR = "#eee";
const FONT = "14pt Arial";

var TransitionScreen = {
    init: function(context) {
        this.context = context;
    },
    draw: function(text) {
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.context.canvas.width, 
                this.context.canvas.height);

        this.context.fillStyle = TEXT_COLOR;
        this.context.font = FONT;
        this.context.textAlign = "center";
        this.context.fillText(text, this.context.canvas.width/2,
                this.context.canvas.height/2);
    }
};

module.exports = TransitionScreen;

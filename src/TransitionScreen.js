const BACKGROUND_COLOR = "#000";
const TEXT_COLOR = "#ffff00";
const FONT = "32pt Arial";

var TransitionScreen = {
    init: function(context, baseWidth, baseHeight) {
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.context = context;
    },
    draw: function(text) {
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.baseWidth, this.baseHeight);
        this.context.fillStyle = TEXT_COLOR;
        this.context.font = FONT;
        this.context.textAlign = "center";
        this.context.fillText(text, this.baseWidth/2, this.baseHeight/2);
    }
};

module.exports = TransitionScreen;

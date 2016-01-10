const SELECTED_BUTTON_COLOR = "#ffff00";
const DEFAULT_BUTTON_COLOR = "#eee";
const BACKGROUND_COLOR = "#000";
const REGULAR_FONT = "12pt Arial";
const LARGE_FONT = "16pt Arial";
const SMALL_FONT = "10pt Arial";

var TitleScreen = {
    init: function(context) {
        this.context = context;
        this.title = "Tank Defence";
        this.subtitle = "© 2016 codecity.ca";
        this.startButton = createButton(context, "Start", 
                context.canvas.width/2, context.canvas.height/2);
    },
    draw: function() {
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.context.canvas.width, 
                this.context.canvas.height);
        
        this.context.fillStyle = DEFAULT_BUTTON_COLOR;
        this.context.font = LARGE_FONT;
        this.context.textAlign = "center";
        this.context.fillText(this.title, this.context.canvas.width/2, 
                this.context.canvas.height/4);

        this.context.font = SMALL_FONT;
        this.context.fillText(this.subtitle, this.context.canvas.width/2,
                this.context.canvas.height/3);

        this.startButton.draw();
    }
};

var Button = {
    init: function(context, text, posX, posY, defaultColor, selectedColor, 
                  font) {
        this.context = context;
        this.text = text;
        this.posX = posX;
        this.posY = posY;
        this.defaultColor = defaultColor;
        this.selectedColor = selectedColor;
        this.font = font;
        this.selected = true;
    },
    select: function() {
        this.selected = true;
    },
    draw: function() {
        this.context.fillStyle = this.selected ? this.selectedColor : 
            this.defaultColor;
        this.context.font = this.font;
        this.context.textAlign = 'center';
        this.context.fillText(this.text, this.posX, this.posY);
    }
};

function createButton(context, text, posX, posY) {
    var btn = Object.create(Button);
    btn.init(context, text, posX, posY, DEFAULT_BUTTON_COLOR, 
            SELECTED_BUTTON_COLOR, REGULAR_FONT);
    return btn;
}

module.exports = TitleScreen;

const SELECTED_BUTTON_COLOR = "#ffff00";
const DEFAULT_BUTTON_COLOR = "#eee";
const CONTROLS_COLOR = "#d3d";
const BACKGROUND_COLOR = "#000";
const REGULAR_FONT = "12pt Arial";
const LARGE_FONT = "16pt Arial";
const SMALL_FONT = "10pt Arial";
const CONTROLS_FONT = "10pt monospace";

var TitleScreen = {
    init: function(context, baseWidth, baseHeight) {
        this.context = context;
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.title = "Tank Defence";
        this.subtitle = "© 2016 codecity.ca";
        this.startButton = createButton(context, "Press ↳ENTER to Start Game",
                this.baseWidth/2, this.baseHeight/2);

    },
    draw: function() {
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.baseWidth, 
                this.baseHeight);
        
        this.context.fillStyle = DEFAULT_BUTTON_COLOR;
        this.context.font = LARGE_FONT;
        this.context.textAlign = "center";
        this.context.fillText(this.title, this.baseWidth/2,
                this.baseHeight/4);

        this.context.font = SMALL_FONT;
        this.context.fillText(this.subtitle, this.baseWidth/2,
                this.baseHeight/3);

        this.startButton.draw();

        this.context.fillStyle = CONTROLS_COLOR;
        this.context.fillText("Controls", this.baseWidth/2, this.baseHeight*23/32);
        this.context.textAlign = "left";
        this.context.font = CONTROLS_FONT;
        this.context.fillText("A         | Increase Canon Power", this.baseWidth/3, this.baseHeight*25/32);
        this.context.fillText("D         | Decrease Canon Power", this.baseWidth/3, this.baseHeight*26/32);
        this.context.fillText("W         | Turret Up", this.baseWidth/3, this.baseHeight*27/32);
        this.context.fillText("S         | Turret Down", this.baseWidth/3, this.baseHeight*28/32);
        this.context.fillText("⇨         | Move Right", this.baseWidth/3, this.baseHeight*29/32);
        this.context.fillText("⇦         | Move Left", this.baseWidth/3, this.baseHeight*30/32);
        this.context.fillText("SPACE     | Fire Canon", this.baseWidth/3, this.baseHeight*31/32);
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

var Explosion = function(image, width, height, frames, columns, rows) {
    return {
        spriteSheet: image,
        width: width,
        height: height,
        frames: frames,
        columns: columns,
        rows: rows,
        init: function(context, posX, posY) {
            this.context = context;
            this.posX = posX - this.width/2;
            this.posY = posY - this.height/2; 
            this.frameNumber = 0;
        },
        animate: function() {
            if (this.frameNumber >= this.frames) {
                return false;
            }
            else {
                this.frameNumber++;
                return true;
            }
        },
        draw: function(context) {
            var sourceX = Math.floor(this.frameNumber % this.columns) * 
                this.width;
            var sourceY = Math.floor(this.frameNumber / (this.rows - 1)) * 
                this.height;
            context.drawImage(this.spriteSheet, sourceX, sourceY,
                    this.width, this.height, this.posX, this.posY, this.width,
                    this.height);
        }
    }
};

module.exports = Explosion;

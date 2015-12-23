var cache = {};

var GameObject = {
    init: function(context, imagePath) {
       this.context = context;
       this.imagePath = imagePath;
    },
    load: function() {
        var scope = this;
        if (cache[scope.imagePath]) {
            scope.image = cache[scope.imagePath];
            return Promise.resolve();
        }
        return new Promise(function(resolve,reject) {
            var img = new Image();
            img.onload = function() {
                scope.image = img;
                cache[scope.imagePath] = img;
                resolve();
            };
            img.onerror = function() {
                reject();
            };
            img.src = scope.imagePath;
        });
    }
};

var Tank = Object.create(GameObject);

Tank.setup = function(context, imagePath) {
    this.init(context, imagePath);
    this.width = 118;
    this.height = 80;
    this.hitHeight = 37;
    this.hitWidth = 90;
    this.turretPos = 0;
    this.turretAngle = -5;
    this.turretLength = 50;
    this.speed = 2;
    this.ground = 416;
};

Tank.draw = function() {
    var sheetPosX = Math.floor(this.turretPos % 3) * this.width;
    var sheetPosY = Math.floor(this.turretPos % 3) * this.height;
    this.context.drawImage(
        this.spriteSheet, sourceX, sourceY, this.width, this.height, 
        this.posX, this.ground - this.height, this.width, this.height
    );
};


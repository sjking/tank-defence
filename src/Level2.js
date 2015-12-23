var cache = {};

var Level = {
    init: function(context, tileMap, tileSheet, buildings, assets) {
        this.context = context;
        this.tileMap = tileMap;
        this.buildings = buildings;
        this.tileSheet = tileSheet;
        this.assets = assets;
    },
    load: function() {
        var scope = this;
        var promises = [];
        _.each(scope.assets, function(url) {
            if (!cache[url]) {
                var fetch = new Promise(function(resolve, reject) {
                    var img = new Image();
                    img.onload = function() {
                        cache[url] = img;
                        resolve();
                    };
                    img.onerror = function() {
                        reject();
                    };
                    img.src = url;
                }):
                promises.push(fetch);
            }
        });
        if (cache[scope.tileSheet]) {
            scope.image = cache[scope.tileSheet];
        }
        else {
            var fetch = Promise(function(resolve,reject) {
                var img = new Image();
                img.onload = function() {
                    scope.image = img;
                    cache[scope.tileSheet] = img;
                    resolve();
                };
                img.onerror = function() {
                    reject();
                };
                img.src = scope.tileSheet;
            });
            promises.push(fetch);
        }
        return promises;
    },
    draw: function() {
        var mapRows = 15;
        var mapCols = 20;
        var mapIndexOffset = -1;
        for (var i=0; i < mapRows; i++) {
            for (var j=0; j < mapCols; j++) {
                var tileId = this.tileMap[i][j] + mapIndexOffset;
                var tileSize = 32;
                var sourceX = tileId*tileSize;
                var sourceY = 0;
                this.context.drawImage(
                    this.tileSheet, sourceX, sourceY, tileSize, 
                    tileSize, j*tileSize, i*tileSize, tileSize, tileSize
                );
            }
        }
    },
    checkCollision: function(projectile) {
        var p = projectile;

        this.buildings.forEach(function(building) {
            var b = building.bounds;
            if (p.x > b[i].x && p.x < b[i].width + b[i].x && p.y > b[i].y) {
                return true;
            }
        });
    }
};

var LevelAlpha = Object.create(Level);

LevelAlpha.setup = function(context, gameData) {
    this.buildings = gameData.buildings;
    this.player = gameData.player;
    this.ufos = gameData.ufos;
    this.aliens = gameData.aliens;

    function mapAssets(gameData) {
        var mapped = [
            gameData.spriteSheet,
            gameData.player.spriteSheet,
            
        ];
        mapped.push(_.map(gameData.ufos, function(ufo) {
            return ufo.spriteSheet;
        }));
        mapped.push(_.map(gameData.aliens, function(alien) {
            return alien.spriteSheet;
        }));
        return _.compact(mapped);
    }

    this.init(
        context, gameData.tileMap, gameData.tileSheet, 
        gameData.buildings, mapAssets(gameData)
    );
};

/************/
/* Level 1 **/
/************/
var levelOneTileMap = [
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,2,2,2,2,2,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,5,4,4,7,7,7,7],
    [7,7,7,7,7,7,7,7,7,7,7,4,4,3,4,4,7,7,7,7],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
];

var levelOneGameData = {
    buildings: [
        {
            edge: 352,
            bounds: { x: 352, y: 160, width: 160 },
        }
    ],
    spriteSheet: "assets/building_32x32.png",
    player: {
        spriteSheet: "assets/tank_sheet_sm.png",
        posX: 0,
        posY: 0
    },
    ufos: [
        {
            spriteSheet: "assets/ufo_sheet.png",
            posX: 0,
            posY; 0
        }
    ],
    aliens: [
        {
            spriteSheet: "assets/ufo_sheet.png",
            strength: 1,
            toxicity: 1,
            offensiveness: 0
        }
    ],
    tileMap: levelOneTileMap
};

var Level1 = Object.new(LevelAlpha);
Level1.setup(null, levelOneGameData);

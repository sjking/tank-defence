var _ = require('underscore');
var Player = require('./Player.js');

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
                        resolve({ url: url, img: img });
                    };
                    img.onerror = function() {
                        reject();
                    };
                    img.src = url;
                });
                promises.push(fetch);
            }
        });
        if (cache[scope.tileSheet]) {
            scope.image = cache[scope.tileSheet];
        }
        else {
            var fetch = new Promise(function(resolve,reject) {
                var img = new Image();
                img.src = scope.tileSheet;
                img.onload = function() {
                    scope.image = img;
                    cache[scope.tileSheet] = img;
                    resolve({ url: scope.tileSheet, img: img });
                };
                img.onerror = function() {
                    reject();
                };
            });
            promises.push(fetch);
        }
        return Promise.all(promises);
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
                    this.image, sourceX, sourceY, tileSize, 
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
        return _.chain(mapped).compact().flatten().value();
    }

    this.init(
        context, gameData.tileMap, gameData.spriteSheet, 
        gameData.buildings, mapAssets(gameData)
    );
};

LevelAlpha.populate = function(assets) {
    // to-do: assign each image to its object (player, ufo, alien), the
    // building image is already assigned to this level by now
    var images = _.indexBy(assets, 'url');
    
    var player = Object.create(Player);
    var playerImage = images[this.player.spriteSheet].img;
    var playerLives = 3;
    player.init(this.context, playerImage, this.player.posX, this.player.posY,
        playerLives
    );
    this.player = player;
    

    return Promise.resolve();
};

module.exports = {
    alpha: LevelAlpha
};

var _ = require('underscore');

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
                        resolve(url);
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
                img.onload = function() {
                    scope.image = img;
                    cache[scope.tileSheet] = img;
                    resolve(scope.tileSheet);
                };
                img.onerror = function() {
                    reject();
                };
                img.src = scope.tileSheet;
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
        return _.chain(mapped).compact().flatten().value();
    }

    this.init(
        context, gameData.tileMap, gameData.tileSheet, 
        gameData.buildings, mapAssets(gameData)
    );
};

module.exports = {
    alpha: LevelAlpha
};

var _ = require('underscore');
var Player = require('./Player.js');
var Alien = require('./Alien.js');
var Ufo = require('./Ufo.js');
var Explosion = require('./Explosion');

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
            else {
                promises.push(Promise.resolve({ url: url, img: cache[url] }));
            }
        });
        if (cache[scope.tileSheet]) {
            scope.image = cache[scope.tileSheet];
            promises.push(Promise.resolve(
                        { url: scope.tileSheet, img: cache[scope.tileSheet] })
                    );
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

        for (var i=0; i < this.buildings.length; i++) {
            var b = this.buildings[i].bounds; 
            if (p.posX > b.x && p.posX < b.width + b.x && p.posY > b.y) {
                return true;
            }
        }
    }
};

var LevelAlpha = Object.create(Level);

LevelAlpha.setup = function(context, gameData) {
    this.buildings = gameData.buildings;
    this.player = gameData.player;
    this.ufos = gameData.ufos;
    this.aliens = gameData.aliens;
    this.explosions = gameData.explosions;

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
        mapped.push(_.map(gameData.explosions, function(explosion) {
            return explosion.spriteSheet;
        }));

        return _.chain(mapped).compact().flatten().value();
    }

    this.init(
        context, gameData.tileMap, gameData.spriteSheet, 
        gameData.buildings, mapAssets(gameData)
    );
};

LevelAlpha.populate = function(assets, playerLives) {
    // to-do: assign each image to its object (player, ufo, alien), the
    // building image is already assigned to this level by now
    var images = _.indexBy(assets, 'url');
    
    var player = Object.create(Player);
    var playerImage = images[this.player.spriteSheet].img;
    player.init(this.context, playerImage, this.player.posX, this.player.posY,
        playerLives
    );
    this.player = player;

    var context = this.context;

    // Aliens are centred atop buildings
    function alienPosition(building) {
        var x = building.bounds.x + building.bounds.width / 2;
        return { posX: x, posY: building.bounds.y }; 
    }

    // TO-DO: adjust the data model for aliens/buildings, parallel collections 
    // are a code smell
    var aliens = _.chain(this.buildings).map(alienPosition).zip(this.aliens)
        .value();
    var newAliens = [];
    _.each(aliens, function(alien) {
        var newAlien = Object.create(Alien);
        newAlien.init(context, alien[0].posX, alien[0].posY, 
                images[alien[1].spriteSheet].img
        );
        newAliens.push(newAlien);
    });
    this.aliens = newAliens;

    function makeUfo(ufo) {
        var newUfo = Object.create(Ufo);
        var ufoImage = images[ufo.spriteSheet].img;
        newUfo.init(context, ufo.posX, ufo.posY, ufo.dx, ufo.dy, 
                ufo.laserFrequency, ufoImage
        );
        return newUfo;
    }
    
    var ufos = _.map(this.ufos, makeUfo); 
    this.ufos = ufos;

    // explosions: will be created from these base objects as needed; multiple
    // explosion base objects can be provided for variety
    var explosions = [];
    for (var i=0; i < this.explosions.length; i++) {
        var explosionSheet = images[this.explosions[i].spriteSheet].img;
        var explosion = Object.create(Explosion(explosionSheet, 
                    this.explosions[i].width, this.explosions[i].height,
                    this.explosions[i].frames, this.explosions[i].columns,
                    this.explosions[i].rows));
        explosions.push(explosion);
    }
    this.explosions = explosions;

    return Promise.resolve();
};

module.exports = {
    alpha: LevelAlpha
};

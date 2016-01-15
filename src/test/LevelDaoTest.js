var test = require('tape'),
    _ = require('underscore'),
    Promise = require('bluebird'),
    vm = require('vm');

var fs = require('fs'),
    readFile = Promise.promisify(fs.readFile);

const context = {
    Promise: Promise,
    require: require,
    module: module
};

const srcDir = __dirname.replace("/test","");
const levelDir = srcDir + "/levels";
readFile(srcDir + '/LevelDao.js').then(initTest);

function initTest(body) {
    var script = new vm.Script(body);
    var LevelDao = script.runInNewContext(context);

    LevelDao.init(true, levelDir);
    LevelDao.fetch("level001").then(runTests);
}

function runTests(LevelData) {
    test('fetch level one', function(t) {
        t.plan(2);
        t.deepEqual(LevelData.data, levelOneGameData, "game data");
        t.deepEqual(LevelData.tileMap, levelOneTileMap, "tile map");
    });
}

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
    "buildings": [
        {
            "edge": 352,
            "bounds": { "x": 352, "y": 160, "width": 160 }
        }
    ],
    "spriteSheet": "assets/building_32x32.png",
    "player": {
        "spriteSheet": "assets/tank_sheet_sm.png",
        "posX": 0,
        "posY": 0
    },
    "ufos": [
        {
            "spriteSheet": "assets/ufo_sheet.png",
            "posX": -50,
            "posY": 65,
            "dx": 4,
            "dy": 0,
            "laserFrequency": 100,
            "laserSpeed": 5
        }
    ],
    "aliens": [
        {
            "spriteSheet": "assets/alien_sheet.png",
            "strength": 1,
            "toxicity": 1,
            "offensiveness": 0
        }
    ],
    "explosions": [
        {
            "spriteSheet": "assets/explosion.png",
            "width": 130,
            "height": 130,
            "frames": 42,
            "columns": 6,
            "rows": 7
        }
    ]
};

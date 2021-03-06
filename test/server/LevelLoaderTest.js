var test = require('tape'),
    _ = require('underscore'),
    LevelLoader = require('../.././levels/LevelLoader');

test('read level one data from filesystem', function(t) {
    t.plan(2);
    LevelLoader.get(1).then(function(levelData) {
        t.deepEqual(levelData.data, levelOneGameData, "game data");
        t.deepEqual(levelData.tileMap, levelOneTileMap, "tile map");
    });
});

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

var test = require('tape');
var level = require('../Level2.js');
var _ = require('underscore');

// Test LevelAlpha: level 1

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
            posY: 0
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

var alpha = Object.create(level.alpha);

test('setup level one', function(t) {
    t.plan(1);
    
    alpha.setup(null, levelOneGameData);

    var assets = [
        levelOneGameData.spriteSheet,
        levelOneGameData.ufos[0].spriteSheet,
        levelOneGameData.aliens[0].spriteSheet,
        levelOneGameData.player.spriteSheet
    ];
    var difference = _.difference(assets, alpha.assets);

    t.deepLooseEqual(difference, [], "assets are setup");
});




//tLevelAlpha.load().then(function(assets) {
//    console.log("success: ", assets);
//    console.log("contents: ", JSON.stringify(tLevelAlpha, null, 5));		
//}, function (error) {
//    //expect().fail("Failed to load Level");
//    console.log("Failure: ", error);
//});

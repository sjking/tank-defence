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
            bounds: { x: 352, y: 160, width: 160 }
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
            posX: -50,
            posY: 65,
            dx: 4,
            dy: 0,
            laserFrequency: 100,
            laserSpeed: 5
        }
    ],
    aliens: [
        {
            spriteSheet: "assets/alien_sheet.png",
            strength: 1,
            toxicity: 1,
            offensiveness: 0
        }
    ],
    tileMap: levelOneTileMap,
    explosions: [
        {
            spriteSheet: "assets/explosion.png",
            width: 130,
            height: 130,
            frames: 42,
            columns: 6,
            rows: 7
        }
    ]
};

module.exports = {
    type: "alpha",
    data: levelOneGameData
};

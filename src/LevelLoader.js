var pad = require("underscore.string/pad");

var LevelDao = require('./LevelDao'),
    Level = require('./Level');

const LEVEL_PREFIX = "level";
const PAD = 3;

// TO-DO: get from config module
const BASE_URL = __dirname + "/levels"; 
const LOCAL = true; 

var LevelLoader = {
    init: function(context) {
        this.context = context;
        this.levelDao = Object.create(LevelDao);
        this.levelDao.init(LOCAL, BASE_URL);
    },
    get: function(levelNumber) {
        var levelId = LEVEL_PREFIX + pad(levelNumber, PAD, "0");
        return this.levelDao.fetch(levelId).then(loadLevel.bind(this));
    }
};

function loadLevel(levelData) {
    var level = Object.create(Level[levelData.type]);
    level.setup(this.context, levelData.data);
    return level;
}

module.exports = LevelLoader;

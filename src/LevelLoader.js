// TO-DO: This is for the client-side, the other LevelLoader will reside on the
// server. Need to re-organize project.
var LevelClient = require('./LevelClient'),
    Level = require('./Level');

const BASE_URL = window.location.href;

var LevelLoader = {
    init: function(context, baseUrl) {
        this.context = context;
        this.levelClient = Object.create(LevelClient);
        this.levelClient.init(baseUrl || BASE_URL);
    },
    get: function(levelNumber) {
        return this.levelClient.get(levelNumber).then(loadLevel.bind(this));
    }
};

function loadLevel(levelData) {
    if (levelData.complete) { // complete flag is returned when all levels have been completed
        return levelData;
    }
    var level = Object.create(Level[levelData.type]);
    level.setup(this.context, levelData.data);
    return level;
}

module.exports = LevelLoader;

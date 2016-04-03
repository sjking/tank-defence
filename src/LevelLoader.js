// TO-DO: This is for the client-side, the other LevelLoader will reside on the
// server. Need to re-organize project.
var LevelDaoClient = require('./LevelDaoClient'),
    Level = require('./Level');

const BASE_URL = "http://localhost:3000"; // TO-DO: config

var LevelLoader = {
    init: function(context, baseUrl) {
        this.context = context;
        this.levelDaoClient = Object.create(LevelDaoClient);
        this.levelDaoClient.init(baseUrl || BASE_URL);
    },
    get: function(levelNumber) {
        return this.levelDaoClient.get(levelNumber).then(loadLevel.bind(this));
    }
};

function loadLevel(levelData) {
    if (levelData.complete) {
        return levelData;
    }
    var level = Object.create(Level[levelData.type]);
    level.setup(this.context, levelData.data);
    return level;
}

module.exports = LevelLoader;

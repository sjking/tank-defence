// For loading levels from the server
var LevelDao = require('./LevelDao'),
    Promise = require('bluebird');

const TOTAL_LEVELS = 3;

var LevelLoader = {
    get: function(levelNumber) {
        if (levelNumber <= TOTAL_LEVELS) {
            return LevelDao.get(levelNumber);
        }
        else {
            return Promise.resolve({ "complete": true });
        }
    }
};

module.exports = LevelLoader;

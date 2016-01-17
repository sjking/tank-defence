// For loading levels from the server
var LevelDao = require('./LevelDao');

var LevelLoader = {
    get: function(levelNumber) {
        return LevelDao.get(levelNumber);
    }
};

module.exports = LevelLoader;

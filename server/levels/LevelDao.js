var fs = require('fs'),
    Promise = require('bluebird'),
    readFile = Promise.promisify(fs.readFile),
    pad = require("underscore.string/pad");

const BASE_DIRECTORY = __dirname + "/data"; 
const LEVEL_PREFIX = "level";
const PAD = 3;

var LevelDao = {
    get: function(levelNumber) {
        var levelId = LEVEL_PREFIX + pad(levelNumber, PAD, "0");
        return fetchLocal(levelId); 
    }
};

module.exports = LevelDao;

function fetchLocal(levelId) {
    var filePath = BASE_DIRECTORY + "/" + levelId + ".json";
    return readFile(filePath, 'utf8').then(JSON.parse); 
}

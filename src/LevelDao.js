var fs = require('fs'),
    readFile = Promise.promisify(fs.readFile);

var LevelDao = {
    init: function(local, baseUrl) {
        this.local = local;
        this.baseUrl = baseUrl;
    },
    fetch: function(level) {
        if (this.local) {
            return fetchLocal.call(this, level); 
        }
        else {
            return fetchRemote.call(this, level);
        }
    },
    foo: function() {
        return "baseUrl: " + this.baseUrl;
    }
};

module.exports = LevelDao;

function fetchLocal(level) {
    var filePath = this.baseUrl + "/" + level + ".json";
    return readFile(filePath, 'utf8').then(JSON.parse); 
}

function fetchRemote(level) {
    // TO-DO
    return fetchLocal.call(this, level);
}

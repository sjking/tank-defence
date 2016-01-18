var $ = require('jquery');

var LevelDaoClient = {
    init: function(baseUrl) {
        this.baseUrl = baseUrl;
    },
    get: function(levelNumber) {
        var url = this.baseUrl + "/level?number=" + levelNumber;
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: url,
                success: function(data) {
                    console.log("data: ", data);
                    resolve(data);
                },
                error: function(error) {
                    console.log("error: ", error);
                    reject(error);
                }
            });
        });
        return promise;
    }
};

module.exports = LevelDaoClient;

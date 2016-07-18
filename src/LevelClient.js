var $ = require('jquery');

var LevelClient = {
    init: function(baseUrl) {
        this.baseUrl = baseUrl;
    },
    get: function(levelNumber) {
        var baseUrl = this.baseUrl[this.baseUrl.length - 1] === "/" ?
            this.baseUrl.substring(0, this.baseUrl.length - 1) : this.baseUrl;
        var url = baseUrl + "/level?number=" + levelNumber;
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: url,
                success: function(data) {
                    resolve(data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
        return promise;
    }
};

module.exports = LevelClient;

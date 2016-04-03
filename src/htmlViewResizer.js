// uses jquery to adjust the html container and the css when the canvas is
// resized
var $ = require('jquery');
const ID = "#canvas";

var htmlViewResizer = function(width, height) {
    $(ID).css({
        position:'absolute',
        left: ($(window).width() - width) / 2,
        top: ($(window).height() - height) / 2
    });
};

module.exports = htmlViewResizer;

var express = require('express'),
    app = express(),
    levelLoader = require('./levels/LevelLoader');

app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/styles'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/level', function(req, res) {
    var levelNumber = req.query.number;
    levelLoader.get(levelNumber).then(function(json) {
        console.log("sending level: ", json);
        res.send(json);
    }).catch(function(error) {
        res.sendStatus(404);
    });
});

const PORT = 3000;

app.listen(PORT, function () {
    console.log("Tank Defence, © 2016 codecity.ca");
    console.log("Listening on port " + PORT);
});

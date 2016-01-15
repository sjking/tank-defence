var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/lib'));
app.use('/assets', express.static(__dirname + '/assets'));

const PORT = 3000;

app.listen(PORT, function () {
    console.log("Tank Defence, © 2016 codecity.ca");
    console.log("Listening on port " + PORT);
});

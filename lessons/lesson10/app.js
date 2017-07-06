var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var game = require('./model/game.js');
server.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

io.on('connection', function (socket) {
    game.init(socket);
});

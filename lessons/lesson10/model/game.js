/**
 * Created by Echetik on 06.07.2017.
 */
/*
 Пример объекта хранящегося в переменной room
 {
 notFull:true,
 firstPlayer:{
 name:Вася,
 socket:socket
 },
 secondPlayer:{
 name:Саша,
 socket:socket
 },
 }
 */
var rooms = [];
exports.init = function (socket) {
    socket.on('ready', function (name) {
        // 1. Ищем незаполненную комнату
        var roomFind = false;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].notFull) {
                //неполная комната найдена
                roomFind = true;
                rooms[i].notFull = false;
                rooms[i].secondPlayer = {
                    name: name,
                    socket: socket
                };
                //стартуем игру
                rooms[i].firstPlayer.socket.emit('startGame', {numRoom: i});
                socket.emit('startGame', {numRoom: i});
                break;
            }
        }
        //2. Была ли найдена неполная комната
        if (!roomFind) {
            rooms.push({
                notFull: true,
                firstPlayer: {
                    name: name,
                    socket: socket
                }
            });
            socket.emit('wait', 'Ожидаем второго игрока');
        }
    })
    socket.on('changeTurn', function (data) {
        console.log(data);
        //получаем комнату
        var room = rooms[data.numRoom];
        //какой игрок прислал
        if (room.firstPlayer.name === data.playerName) {
            //первый игрок отправляем второму
            room.secondPlayer.socket.emit('nextTurn', data);
        }else{
            //второй игрок отправляем первому
            room.firstPlayer.socket.emit('nextTurn', data);
        }
    })
};
var http = require('http'); // подключение модуля
var fs = require('fs');
var serv = http.createServer(function (request, response) {    // вызов метода создания http сервера
    var filename = "";
    if (process.env.LANG === 'en_EN') {
        filename = './lab3-1-en.html';
    } else if (process.env.LANG === 'ru_RU') {
        filename = './lab3-1-ru.html';
    } else {
        filename = './lab3-1-en.html';
    }
    // if (process.argv[2] === 'en') {
    //     filename = './lab3-1-en.html';
    // } else if (process.argv[2] === 'ru') {
    //     filename = './lab3-1-ru.html';
    // } else {
    //     filename = './lab3-1-en.html';
    // }
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        response.writeHead(200, {'Content-Type': "text/html"});
        response.end(data);
    });
});
serv.listen(8080);
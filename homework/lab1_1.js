var http = require('http'); // подключение модуля

var serv = http.createServer(function (request, response) {    // вызов метода создания http сервера
    console.log(request);
    console.log(response);
});
serv.listen(8080);
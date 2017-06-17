
var http = require('http'); // подключение модуля
http.createServer(function (request, response) {    // вызов метода создания http сервера
    response.writeHead(404, {'Content-Type':'text/html'});
    response.write('<hl>Sorry, page does not exists!</hl>');
    response.end();
}).listen(8080);
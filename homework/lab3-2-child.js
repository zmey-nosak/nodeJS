/**
 * Created by Stepan.Koledov on 29.06.2017.
 */
var http = require('http'); // подключение модуля
var url = require('url');
var serv = http.createServer(function (request, response) {    // вызов метода создания http сервера
    var get = url.parse(request.url, true).query;
    console.log(get);
    process.send({id: get.id, code: get.code});
});
serv.listen(8080);
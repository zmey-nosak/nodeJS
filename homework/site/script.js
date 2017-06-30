/**
 * Created by Echetik on 17.06.2017.
 */
var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require('path');
var path = require('path');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
};

http.createServer(function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/')
        pathname = 'index.html';
    else pathname = pathname.substring(1, pathname.length);
    var extname = path.extname(pathname);
    console.log(extname);
    var mimeType = mimeTypes[path.extname(pathname)];

    if ((extname == ".gif") || (extname == ".jpg")) {
        var img = fs.readFileSync(pathname);
        response.writeHead(200, {'Content-Type': mimeType});
        response.end(img, 'binary');
    } else {
        fs.readFile(pathname, 'utf8', function (err, data) {
            if (err) {
                console.log('Could not lind or open file ' + pathname + ' for reading\n');
            } else {
                console.log(pathname + ' ' + path.extname(pathname));
                response.writeHead(200, {'Content-Type': extname});
                response.end(data);
            }
        });
    }
}).listen(8080);
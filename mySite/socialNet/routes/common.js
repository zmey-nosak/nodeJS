var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var path = require('path');
var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
};

router.get('*', function (req, res, next) {
    if (req.url !== '/login') {
        loggedInCheck(req, res, next);
    } else {
        next();
    }
});

router.get('/login', function (req, res, next) {
    getContent(req,res);
});

function getContent(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/login')
        pathname = 'C:\\Users\\Stepan.Koledov\\nodeJS\\nodeJS\\mySite\\socialNet\\public\\login.html';
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
}
function loggedInCheck(req, res, next) {
    if (req.session.auth) {
        res.render('');
    } else {
        console.log("Please Log in to access to this webpage");
        res.redirect('/login');
    }
}
module.exports = router;
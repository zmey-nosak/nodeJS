var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('./node_modules/express-session');
var common = require('./routes/common');
var app = express();
app.use(session({
    secret: ' 23msdfl34kasd ',
    name: 'sid',
    cookie: {
        httpOnly: true, maxAge: 30000
    },
}));




//
// app.set(function (req, res, next) {
//     var pathname = url.parse(req.url).pathname;
//     if (pathname == '/')
//         pathname = 'index.html';
//     else pathname = pathname.substring(1, pathname.length);
//     var extname = path.extname(pathname);
//     var mimeType = mimeTypes[path.extname(pathname)];
//
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', common);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(8083);
module.exports = app;

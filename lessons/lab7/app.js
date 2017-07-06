var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mustache_express = require('mustache-express');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var ajaxservice = require('./routes/ajaxservice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache_express());
app.set('view engine', 'mustache');

app.use(session({
	secret: ' 23msdfl34kasd ',
	resave: false,
	saveUninitialized: false,
	name: 'sid',
	cookie: {httpOnly: true, maxAge: 600000} 
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	//Логирование сессии
	var sess = req.session;
	if (sess.views) {
		console.log('views: ' + sess.views + ' expires in: ' + (sess.cookie.maxAge / 1000) + ' id' + req.session.id);
		sess.views++;
	} else {
		sess.views = 1;
		console.log('views: ' + sess.views + ' expires in: ' + (sess.cookie.maxAge / 1000) + ' id' + req.session.id);
	}
	next();
});

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/ajaxservice', ajaxservice);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);

module.exports = app;

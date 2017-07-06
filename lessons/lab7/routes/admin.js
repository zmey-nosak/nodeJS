var express = require('express');
var router = express.Router();
var auth = require('../model/auth.js');

/*var users = {
	root:"root"
};*/

var storSess = {};

router.use(function(req, res, next){
	//Проверяем есть ли такой пользователь
	var sess = req.session;
	if(!sess.auth) {
		if(req.originalUrl === "/admin" && req.method==="POST"){
		 	next()
		} else {
			console.log("Новый пользователь");
			//Отправляем ему форму авторизации
			res.render('auth', {message:""});
		}
	} else {
		next();
	}
});

/* GET home page. */
router.post('/', function(req, res, next) {
	var data = req.body;
	console.log(req.body);

	auth.getPassword(data.password).then(
		function(rows){
			console.log(rows);
			if(data.password === rows[0].password) {
				//Пользователь авторизован
				storSess[req.session.id] = true;
				req.session.auth = true;
				res.redirect('/admin');
			} else {
				//Отправляем форму повторного ввода
				throw new('Неверная пара логин/пароль');
			}
		}
	).catch(function(err){
		console.log(err);
		//Отправляем форму повторного ввода
		res.render('auth', {message:"Неверная пара логин/пароль"});
	});
});

router.get('/', function(req, res, next) {
	res.render('admin', { title: 'Админка' })
});

router.post('/out', function(req, res, next) {
	console.log('Удаляем сессию')
	delete storSess[req.session.id];
	req.session.destroy();
	res.redirect('/admin');
});

module.exports = router;

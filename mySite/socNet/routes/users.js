var express = require('express');
var router = express.Router();
var auth = require('../model/auth.js');
var user = require('../model/user.js');
var storSess = {};
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.use('*', function (req, res, next) {
    //Проверяем есть ли такой пользователь
    var sess = req.session;
    if (!sess.auth) {
        if (req.originalUrl === "/users" && req.method === "POST") {
            next()
        } else {
            console.log("Новый пользователь");
            res.redirect("../login");
        }
    } else {
        next();
    }
});

/* GET home page. */
router.post('/', function (req, res, next) {
    var data = req.body;
    console.log(req.body);

    auth.getPassword(data.email).then(
        function (rows) {
            console.log(rows);
            if (data.password === rows[0].password) {
                //Пользователь авторизован
                storSess[req.session.id] = true;
                req.session.auth = true;
                req.session.user_id = rows[0].user_id;
                return rows[0].user_id;
            } else {
                //Отправляем форму повторного ввода
                throw new ("Неверная пара логин/пароль");
            }
        }
    ).then(function (result) {
        res.redirect('/users/' + result);
    }).catch(function (err) {
        console.log(err);
        //Отправляем форму повторного ввода
        res.render('login', {message: "Неверная пара логин/пароль"});
    });
});

router.get('/:id', function (req, res, next) {
    var userInfo = {};
    user.getUserPersonalInfo(req.params.id)
        .then(function (rows) {
            userInfo = rows[0];
            return userInfo;
        })
        .then(function (result) {
            user.getUsersGroups(userInfo.id)
                .then(function (rows) {
                    userInfo.groups = rows;
                    return userInfo;
                })
                .then(function (result) {
                    user.getUsersFriends(userInfo.id)
                        .then(function (rows) {
                            userInfo.friends = rows;
                            userInfo.friends_count = rows.length;
                            res.render('index', {user: userInfo});
                        });
                });
        });
});
module.exports = router;

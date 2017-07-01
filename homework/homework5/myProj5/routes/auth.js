/**
 * Created by Echetik on 30.06.2017.
 */
var express = require('express');
var router = express.Router();
var mustache = require('mustache');
var template = `
login: {{login}}

password: {{password}}

e-mail: {{mail}}
`;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('auth');
});
router.post('/', function (req, res, next) {
    var body = req.body;
    console.log(body.login + " " + body.password + " " + req.body["mail"]);
    var html = mustache.render(template, req.body);
    res.status(200).send(html);
    // res.redirect('http://yandex.ru');
});

module.exports = router;

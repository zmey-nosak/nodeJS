var express = require('express');
var router = express.Router();
var fs = require('fs');
var storageAuth = {
    root: 'rooot'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.auth) {
        res.render('')
    } else {
        fs.readFile('public/html/login.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': "text/html"});
            res.end(data);
        });
        // res.render('login', { message:'Input password and login!'});
        // res.sendFile(path.join(__dirname+'/index.html'));
    }
});

router.post('/', function (req, res, next) {
    var data = req.body;
    if (storageAuth[data.login] === data.pass) {
        req.session.auth = true;
        res.render('index', {});
    } else {
        res.render('login', {message: 'Incorrect pair password and login!'});
    }
});

router.post('/logout', function (req, res, next) {
    req.session.auth = false;
    req.session.destroy();
    res.redirect(__dirname + '/public/html/index.html');
});

module.exports = router;

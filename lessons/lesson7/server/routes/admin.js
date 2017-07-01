var express = require('express');
var router = express.Router();

var storageAuth = {
  root:'rooot'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.auth) {
    res.render('')
  } else {
    res.render('formAuth', { message:'Input password and login!'});
  }
});

router.post('/', function(req, res, next) {
    var data = req.body;
    if(storageAuth[data.login] === data.pass) {
        req.session.auth = true;
        res.render('admin', {});
    } else {
      res.render('formAuth', { message:'Incorrect pair password and login!'});
    }
});

router.post('/logout',function(req, res, next) {
    req.session.auth = false;
    req.session.destroy();
    res.redirect('/admin');
});

module.exports = router;

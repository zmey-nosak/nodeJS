var express = require('express');
var router = express.Router();

router.get('/:controller/:action', function (req, res, next) {
    res.send('respond with a resource');
});

router.param('controller', function (req, res, next, value) {
    req.user = {
        controller: value
    };
    next();
});

router.param('action', function (req, res, next, value) {
    req.user.action = value;
    console.log(req.user.controller + " " + req.user.action);
    res.status(200).send();
});

router.get('/:controller/:action', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;

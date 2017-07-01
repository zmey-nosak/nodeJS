var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/get', function(req, res, next) {
  var data = [{ name: 'Peter', data: 'bla-bla'}, { name: 'Vasiliy', data: 'ps...'}]
  res.status(200).json(data);
});

module.exports = router;
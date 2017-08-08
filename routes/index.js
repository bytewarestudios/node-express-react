var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = process.cwd();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//api mocking
router.get('/path to api', function(req, res) {
  fs.readFile(path + 'uri of resource', 'utf8', function(err, data) {
    console.log(err);
    res.send(data);
  });
});


module.exports = router;

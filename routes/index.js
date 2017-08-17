var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = process.cwd();

/*
  As this gets more complex you would probably want to move routes
  other than index to seperate files.
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

//api mocking
router.get('/path-to-api', function(req, res) {
  fs.readFile(path + 'uri-of-resource', 'utf8', function(err, data) {
    console.log(err);
    res.send(data);
  });
});


module.exports = router;

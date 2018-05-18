var express = require('express');
var router = express.Router();

// Require controller modules.
var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');
var users_controller = require('../controllers/usersController');

//Display some drawing search bar
router.get('/', function(req, res, next) {
  res.send("TODO: implement a search bar or something cute like that")
});

//Display a specific drawing
router.get('/:id', drawings_controller.drawing_detail);

module.exports = router;

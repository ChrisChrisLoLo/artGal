var express = require('express');
var router = express.Router();

// Require controller modules.
var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');
var users_controller = require('../controllers/usersController');

//Display some drawing search bar
router.get('/', function(req, res, next) {
  res.render('draw.hbs');
});

//Display a specific drawing
router.get('/:drawingID/', (req,res)=>{
});

module.exports = router;

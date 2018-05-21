var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');
var users_controller = require('../controllers/usersController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index.hbs',{title:"ArtGal"});
// });
router.get('/', drawings_controller.drawing_list);
module.exports = router;

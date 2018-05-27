var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');
var users_controller = require('../controllers/usersController');

router.get('/', drawings_controller.drawing_list);
router.get('/login',users_controller.login);
module.exports = router;

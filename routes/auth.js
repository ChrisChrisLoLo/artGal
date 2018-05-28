var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
//var drawings_controller = require('../controllers/drawingsController');
var users_controller = require('../controllers/usersController');

//router.get('/google', );
router.get('/login',users_controller.login_get);
router.post('/login',users_controller.login_post);
module.exports = router;

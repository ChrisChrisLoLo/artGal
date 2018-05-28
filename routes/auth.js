//NOTE: Information reguarding Oauth and passport can be found here in a refresher is needed: 
//https://www.youtube.com/watch?v=c_FRNFZENjw&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=4
var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
//var drawings_controller = require('../controllers/drawingsController');
var auth_controller = require('../controllers/authController');

//router.get('/google', );
router.get('/',auth_controller.login_page);

//router.get('/google',auth_controller.auth_google);

module.exports = router;

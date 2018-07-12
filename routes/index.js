var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');

router.get('/', drawings_controller.drawing_list);

router.get('/p/:pageCount', drawings_controller.drawing_list);

module.exports = router;

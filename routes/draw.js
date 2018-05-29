var express = require('express');
var router = express.Router();
var drawings_controller = require('../controllers/drawingsController');

/* GET users listing. */
router.get('/',drawings_controller.make_drawing);

/* POST drawing */
router.post('/submit',drawings_controller.drawing_create_post);


module.exports = router;

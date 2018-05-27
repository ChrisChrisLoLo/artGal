var express = require('express');
var router = express.Router();
var drawings_controller = require('../controllers/drawingsController');

/* GET users listing. */
router.get('/',(req, res, next) => {
  res.render('draw.hbs',{title:"Draw"});
});

/* POST drawing */
router.post('/submit',drawings_controller.drawing_create_post);


module.exports = router;

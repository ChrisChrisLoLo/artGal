const express = require('express');
const router = express.Router();

var users_controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


/* Render profile customizations */
router.get('/profile',users_controller.user_profile);
/* */



module.exports = router;

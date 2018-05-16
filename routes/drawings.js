var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('draw.hbs');
});

router.get('/drawingID/:drawingID', (req,res)=>{
    res.send(req.params.drawingID);
});

module.exports = router;

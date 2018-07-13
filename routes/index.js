var express = require('express');
var router = express.Router();

// Require controller modules.
//var comments_controller = require('../controllers/commentsController');
var drawings_controller = require('../controllers/drawingsController');

router.get('/', drawings_controller.drawing_list);

router.get('/p/:pageCount', drawings_controller.drawing_list);

router.get('/privacy', (req,res)=>{
    res.render('privacy',{
        title:'Privacy',
        user:req.user
    });
});

router.get('/terms', (req,res)=>{
    res.render('privacy',{
        title:'Terms',
        user:req.user
    });
});

router.get('/support', (req,res)=>{
    res.render('privacy',{
        title:'Support',
        user:req.user
    });
});

module.exports = router;

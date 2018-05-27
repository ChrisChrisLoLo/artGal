var Drawing = require('../models/drawings');
var Comment = require('../models/comments');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all drawings.
exports.drawing_list = function(req, res) {
    //TODO: put in userID and use the populate method 
    Drawing.find({},'title imageURL desc creationDate')
        .limit(20)
        .sort({creationDate:-1})
        .exec((err,listDrawings) => {
            if (err) {return next(err);}
            res.render('index',{
                title:"ArtGal",
                listDrawings:listDrawings
            });
    });
};

// Display detail page for a specific drawing.
exports.drawing_detail = function(req, res, next) {
    async.parallel({
        drawings: (callback)=>{
            Drawing.findById(req.params.id)
                .exec(callback);
        },
        // users: (callback)=>{
        //     User.findById(req.params.id)
        //         .exec(callback);
        // },
        comments: (callback)=>{
            Comment.find({
                artID:req.params.id
                },'userID desc creationDate')
                .sort({creationDate:1})
                .exec(callback);
        }
    },function(err,results){
        if (err) {return next(err);}
        if (results.drawings==null){
            var err = new Error('Drawing not found');
            err.status = 404;
            return next(err);
        }
        console.log(results.drawings);
        res.render('drawing',{
            title:results.drawings.title,
            imageURL:results.drawings.imageURL,
            desc:results.drawings.desc,
            tags:results.drawings.tags,
            creationDate:results.drawings.creationDate,
            userID:results.drawings.userID,
            rating:results.drawings.rating,
            id:results.drawings._id,
            listComments:results.comments
        });
    });    
};

// Display drawing create form on GET.
exports.drawing_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing create GET');
};

// Handle drawing create on POST.
// Self note: the reason why this is an array is bc this is a middleware chain
exports.drawing_create_post = [
    body('title','This post requires a title').isLength({min:1}).trim(),
    body('title','This title is too long').isLength({max:45}).trim(),
    body('desc','Description is too long').isLength({max:140}).trim(),
    body('tags','Too many letters in the tags').isLength({max:45}).trim(),
    body('imageURL','Something went wrong with the image').isLength({min:1}).trim(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('desc').trim().escape(),
    sanitizeBody('tags').trim().escape(),
    sanitizeBody('imageURL').trim().escape(),
    sanitizeBody('isAnon').trim().escape(),
    (req,res,next) => {
        const errors =validationResult(req);
        var drawing = new Drawing(
            {
            title:req.body.title,
            imageURL:req.body.imageURL,
            desc:req.body.desc,
            tags:req.body.tags,
            isAnon:req.body.isAnon==='true'
            }
        );
        if(!errors.isEmpty()){
            res.send("TODO:IMPLEMENT ERROR SCREEN");
            //res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        else{
            drawing.save(function (err) {
                if (err) { return next(err); }
                // Genre saved. Redirect to genre detail page.
                res.redirect(drawing.url);
            });
        }
    }
];

// Display drawing delete form on GET.
exports.drawing_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing delete GET');
};

// Handle drawing delete on POST.
exports.drawing_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing delete POST');
};

// Display drawing update form on GET.
exports.drawing_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing update GET');
};

// Handle drawing update on POST.
exports.drawing_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing update POST');
};
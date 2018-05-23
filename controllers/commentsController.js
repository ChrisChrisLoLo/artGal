var Comment = require('../models/comments');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
// Display list of all comments.
exports.comment_list = function(req, res) {
    res.send('NOT IMPLEMENTED: comment list');
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: comment detail: ' + req.params.id);
};

// Display comment create form on GET.
exports.comment_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: comment create GET');
};

// Handle comment create on POST.
exports.comment_create_post = [
    body('comment','This comment is empty').isLength({min:1}).trim(),
    body('drawingID','An error occured attaching the drawingID').isLength({min:1}).trim(),
    sanitizeBody('comment').trim().escape(),
    sanitizeBody('drawingID').trim().escape(),
    (req,res,next) => {
        const errors =validationResult(req);
        var comment = new Comment(
            {
                artID: req.body.drawingID,
                desc: req.body.comment
            }
        );
        if(!errors.isEmpty()){
            res.send(`Errors in comment_create_post:${errors}`);
            //res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        else{
            comment.save(function (err) {
                if (err) { console.log("EEEERROR"); return next(err); }
                // Genre saved. Redirect to genre detail page.
                res.redirect(comment.url);
            });
        }
    }
];

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: comment delete GET');
};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment delete POST');
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: comment update GET');
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment update POST');
};
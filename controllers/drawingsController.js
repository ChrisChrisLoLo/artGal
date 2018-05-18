var Drawing = require('../models/drawings');
var bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all drawings.
exports.drawing_list = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing list');
};

// Display detail page for a specific drawing.
exports.drawing_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing detail: ' + req.params.id);
};

// Display drawing create form on GET.
exports.drawing_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: drawing create GET');
};

// Handle drawing create on POST.
exports.drawing_create_post = function(req, res) {
    console.log(req);
    //Check is post is valid
    req.checkBody('title','This post requires a title').isLength({min:1}).trim();
    req.checkBody('title','This title is too long').isLength({max:45}).trim();
    req.checkBody('desc','Description is too long').isLength({max:140}).trim();
    req.checkBody('tags','Too many letters in the tags').isLength({max:45}).trim();
    req.checkBody('imageURL','Something went wrong with the image').isLength({min:1}).trim();
};

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
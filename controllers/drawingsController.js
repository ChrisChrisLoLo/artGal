var Drawing = require('../models/drawings');
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
    res.send('NOT IMPLEMENTED: drawing create POST');
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
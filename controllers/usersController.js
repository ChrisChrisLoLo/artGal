var User = require('../models/users');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const {authCheck} = require('./utils/authCheck');
//Checks if users are authorized to access content. Redirects them to login otherwise.
// var authCheck = (req,res,next) => {
//     if(!req.user){
//         res.redirect('/auth');
//     }
//     else{
//         next();
//     }
// };

exports.user_profile =[ 
    authCheck,
    (req,res) => {
        console.log(req.user);
        res.render('profile',{
            title:'Your Profile',
            user:req.user
        });
    }
];

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user create GET');
};

// Handle user create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user create POST');
};

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};
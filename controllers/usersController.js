var User = require('../models/users');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const client = new OAuth2Client(CLIENT_ID);


//Display login page
exports.login_get = (req,res)=>{
    res.render('login',{title:"Login"});
};
exports.login_post = (req,res)=>{
    passport.use(
        new GoogleStrategy({
            //Options for google strategy
            clientID:process.env.googleClientID,
            clientSecret:process.env.googleClientSecret
        }),()=>{
            //Passport callback function
        }
    )

};

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
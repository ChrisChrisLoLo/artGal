const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Display login page
exports.login_page = (req,res)=>{
    res.render('login',{title:"Login"});
};

//Authenicate wiht google
exports.auth_google = passport.authenticate('google',{
    scope:['profile']
});

//Callback route for google. THe difference between the this authenticate and
//the authenticate above is that we now have a code embedded in out GET request.
exports.auth_google_redirect = [
    passport.authenticate('google'),
    (req,res) =>{
        res.redirect('/')
    }   
];

exports.auth_logout = (req,res) => {
    req.logout();
    res.redirect('/');
};
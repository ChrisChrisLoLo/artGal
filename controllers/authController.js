const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Display login page
exports.login_page = (req,res)=>{
    res.render('login',{title:"Login"});
};

exports.auth_google = passport.authenticate('google',{
    scope:['profile']
});

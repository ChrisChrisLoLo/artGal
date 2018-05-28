const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const client = new OAuth2Client(CLIENT_ID);


//Display login page
exports.login_page = (req,res)=>{
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

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').load();



passport.use(
    new GoogleStrategy({
        //Options for google strategy
        callbackURL:'/auth/google/redirect',
        clientID:process.env.googleClientID,
        clientSecret:process.env.googleClientSecret
    },()=>{
        //Passport callback function
        
    })
);

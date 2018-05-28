const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').load();

const User = require('../models/users');

passport.use(
    new GoogleStrategy({
        //Options for google strategy
        callbackURL:'/auth/google/redirect',
        clientID:process.env.googleClientID,
        clientSecret:process.env.googleClientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //Passport callback function
        //We want the profile information for logging in
        console.log(profile);
        //TODO:import user image or have a default image.
        new User({
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            gender: profile.gender
        }).save().then((newUser) => {
            console.log(`New user: ${newUser}`)
        });
    })
);

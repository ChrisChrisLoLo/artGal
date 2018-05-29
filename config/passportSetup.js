const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').load();

const User = require('../models/users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user) => {
        done(null,user);
    })
});

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
        User.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log('User currently exists');
                done(null,currentUser);
            }else{
                //TODO:import user image or have a default image.
                new User({
                    googleID: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    gender: profile.gender
                }).save().then((newUser) => {
                    console.log(`New user: ${newUser}`);
                    done(null, newUser);
                });
            }
        });
    })
);

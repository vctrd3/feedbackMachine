const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //user is User model existingUser or newUser
  done(null, user.id); //user.id is from user model on mongodb
})

passport.deserializeUser(async (id, done) => {
  try{
    const user = await User.findById(id);
    done(null, user);
  } catch{
  }
});

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    try{
      const existingUser = await User.findOne({googleId: profile.id});
      if(existingUser){
        done(null, existingUser); //first arg is for error object, second is user to return
    } else{
        const newUser = await new User({ googleId: profile.id}).save();
        done(null, newUser);
    }
    } catch{
    }
  })
);

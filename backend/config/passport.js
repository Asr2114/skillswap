const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../models/User');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'

},

async(accessToken, refreshToken, profile, done)=>{
    try{
        let existingUser = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });
        if(!existingUser){
            existingUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value
            });
        }
        return done(null, existingUser);
    } catch(err){
        return done(err);
    }
}
));

passport.serializeUser((user, done)=> done(null, user.id));
passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});
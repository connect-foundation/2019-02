const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const Users = require('../models/users');

passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
},
((_, __, profile, done) => {
  const username = `google_${profile.id}`;
  const displayname = profile.displayName;
  Users.upsertUser(username, displayname)
    .then((user) => done(null, user))
    .catch((error) => done(error));
})));

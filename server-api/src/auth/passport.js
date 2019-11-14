const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const KakaoTokenStrategy = require('passport-kakao-token').Strategy;
const NaverTokenStrategy = require('passport-naver-token').Strategy;
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

passport.use(new NaverTokenStrategy({
  clientID: process.env.NAVER_ID,
  clientSecret: process.env.NAVER_SECRET,
},
((_, __, profile, done) => {
  const username = `naver_${profile.id}`;
  const displayname = profile.displayName;
  Users.upsertUser(username, displayname)
    .then((user) => done(null, user))
    .catch((error) => done(error));
})));

passport.use(new KakaoTokenStrategy({
  clientID: process.env.KAKAO_ID,
},
((_, __, profile, done) => {
  const username = `kakao_${profile.id}`;
  const displayname = profile.displayName;
  Users.upsertUser(username, displayname)
    .then((user) => done(null, user))
    .catch((error) => done(error));
})));

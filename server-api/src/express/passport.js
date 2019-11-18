const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const KakaoTokenStrategy = require('passport-kakao-token').Strategy;
const NaverTokenStrategy = require('passport-naver-token').Strategy;
const Users = require('../models/users');

/**
 * @description oAuth 서비스 제공자에 따른 사용자 정보를 upsert 하기 위함
 * @param {string} provider
 * @returns {function} oAuth callback function
 */
const setProviderToUpsert = (provider) => (_, __, profile, done) => {
  const username = `${provider}_${profile.id}`;
  const displayname = profile.displayName;

  Users.upsert(username, displayname)
    .then((user) => done(null, user))
    .catch((error) => done(error));
};

passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
}, setProviderToUpsert('google')));

passport.use(new NaverTokenStrategy({
  clientID: process.env.NAVER_ID,
  clientSecret: process.env.NAVER_SECRET,
}, setProviderToUpsert('naver')));

passport.use(new KakaoTokenStrategy({
  clientID: process.env.KAKAO_ID,
}, setProviderToUpsert('kakao')));

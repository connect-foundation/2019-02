const express = require('express');
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { Users } = require('../models');

const router = express.Router();
const kakaoKey = {
  clientID: process.env.KAKAO_ID,
  callbackURL: 'http://localhost:4000/auth/kakao/callback',
};

passport.use('kakao', new KakaoStrategy(
  kakaoKey,
  (_, __, profile, done) => {
    const findUser = Users.findOne({
      username: `kakao_${profile.id}`,
    });

    findUser.then((user) => {
      if (user) return done(null, user);

      const userInfo = {
        username: `kakao_${profile.id}`,
        displayname: profile.displayName,
      };
      const newUser = new Users(userInfo);

      newUser.save()
        .then(() => done(null, userInfo))
        .catch((error) => (done(error)));
    }).catch((error) => done(error));
  },
));

router.get('/', passport.authenticate('kakao'));

router.get('/callback',
  passport.authenticate('kakao'),
  (req, res) => {
    res.send(req.user);
  });

module.exports = router;

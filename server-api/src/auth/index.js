const { Router } = require('express');
const passport = require('passport');
const authKakao = require('./kakao');

const router = Router();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use('/kakao', authKakao);

module.exports = router;

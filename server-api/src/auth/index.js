const { Router } = require('express');
const passport = require('passport');

require('./kakao');

const router = Router();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback',
  passport.authenticate('kakao'),
  (req, res) => {
    res.status(200).end();
  });

module.exports = router;

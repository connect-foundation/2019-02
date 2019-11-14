const { Router } = require('express');
const passport = require('passport');
require('./passport');
const { generateToken, sendToken } = require('../middleware/token');

const router = Router();

router.route('/google')
  .post(passport.authenticate('google-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
      displayname: req.user.displayname,
    };
    next();
  }, generateToken, sendToken);

router.route('/naver')
  .post(passport.authenticate('naver-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
      displayname: req.user.displayname,
    };
    next();
  }, generateToken, sendToken);

router.route('/kakao')
  .get(passport.authenticate('kakao-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
      displayname: req.user.displayname,
    };
    next();
  }, generateToken, sendToken);

module.exports = router;

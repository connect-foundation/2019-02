const { Router } = require('express');
const passport = require('passport');
const { generateToken, sendToken } = require('./tokenizer');
require('./passport');

const router = Router();

/**
 * @api {post} /auth/google
 * @apiParam {object} Blob object
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 User Not Authenticated
 */
router.route('/google')
  .post(
    passport.authenticate('google-token', { session: false }),
    (req, res, next) => {
      if (!req.user) return res.send(401, 'User Not Authenticated');

      req.auth = {
        id: req.user.id,
        displayname: req.user.displayname,
      };

      next();
    },
    generateToken,
    sendToken,
  );

/**
 * @api {get} /auth/kakao
 * @apiParam {string} kakao access token
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 User Not Authenticated
 */
router.route('/kakao')
  .get(
    passport.authenticate('kakao-token', { session: false }),
    (req, res, next) => {
      if (!req.user) return res.send(401, 'User Not Authenticated');

      req.auth = {
        id: req.user.id,
        displayname: req.user.displayname,
      };

      next();
    },
    generateToken,
    sendToken,
  );


/**
 * @api {post} /auth/naver
 * @apiParam {string} naver access token
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 User Not Authenticated
 */
router.route('/naver')
  .post(
    passport.authenticate('naver-token', { session: false }),
    (req, res, next) => {
      if (!req.user) return res.send(401, 'User Not Authenticated');

      req.auth = {
        id: req.user.id,
        displayname: req.user.displayname,
      };

      next();
    },
    generateToken,
    sendToken,
  );

module.exports = router;

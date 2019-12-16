const { Router } = require('express');
const passport = require('passport');
const {
  setAuth,
  generateToken,
  sendToken,
  setAnonymousAuth,
  sendAnonymousToken,
} = require('../middlewares/auth');

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
    setAuth,
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
    setAuth,
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
  .get(
    (req, _, next) => {
      req.provider = 'naver';
      next();
    },
    passport.authenticate('naver-token', { session: false }),
    setAuth,
    generateToken,
    sendToken,
  );

/**
 * @api {get} /auth/anonymous
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 */
router.route('/anonymous')
  .get(
    setAnonymousAuth,
    generateToken,
    sendAnonymousToken,
  );

module.exports = router;

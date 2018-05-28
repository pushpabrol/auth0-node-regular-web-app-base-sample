const express = require('express');
const passport = require('passport');
const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',function(req, res, next) {
        console.log('callback url = ', 'https://' + req.headers.host + '/callback')
        passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: 'https://' + req.headers.host + '/callback',
 callbackURL: 'https://' + req.headers.host + '/callback',
 connection: 'Username-Password-Authentication',
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'})(req, res, next);
    } ,
  function(req, res) {
    res.redirect("/");
});
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get( '/callback',function(req, res, next) {
        console.log('callback url = ', 'https://' + req.headers.host + '/callback')
        passport.authenticate('auth0', {
  redirectUri: 'https://' + req.headers.host + '/callback',
callbackURL: 'https://' + req.headers.host + '/callback',
  failureRedirect: 'http://' + req.headers.host + '/failure'})(req, res, next);
    },
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);
router.get('/failure', function(req, res) {
  var error = req.flash("error");
  var error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });

  });

module.exports = router;

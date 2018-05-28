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
        console.log('callback url = ', 'https://' + req.headers.host + '/callback');

	var opts = {
      domain: env.AUTH0_DOMAIN,
  redirectUri: 'https://' + req.headers.host + '/callback',
  callbackURL: 'https://' + req.headers.host + '/callback',
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'
};
if(req.headers.host === 'client1.inovalon.desmaximus.com')
{
opts.clientID = 'rI3g0ryKrRMGl6R4OadLP3Of4AfTFdLC';
opts.clientSecret = 'iiv8Dlb0Nd25wGz6fVHZ1-X5E16AGk3x_Y2p5RFthwJ3OC7WFcuzKERB24TCtuOL';
}

if(req.headers.host === 'client2.inovalon.desmaximus.com')
{
opts.clientID = 'tW72IQe877pOE4LvNHYHzAAkMXFjorB1';
opts.clientSecret = '6vblQw0e5kWvm-lmgAzg9Klk4TsgOJAfHfOhVtQWkTQ9sdsE-0clV9reP-SU2vfO';
}
console.log(passport);
a0base = Object.getPrototypeOf(passport._strategies.auth0);
a0base.constructor.call(passport._strategies.auth0, opts,function(){ return true;});
console.log(opts);
        passport.authenticate('auth0', opts)
        (req, res, next);
    } ,
  function(req, res) {
    res.redirect("/");
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/*router.get( '/callback',function(req, res, next) {
  passport.authenticate('auth0', {
    failureRedirect: 'https://' + req.headers.host +'/failure', callbackURL: 'https://' + req.headers.host + '/callback',
  redirectUri: 'https://' + req.headers.host + '/callback' 
  })(req, res, next); },
  function(req, res) {
	console.log(req.session.returnTo);
    res.redirect(req.session.returnTo || 'https://' + req.headers.host + '/user');
  }
);
*/


router.get( '/callback',function(req, res, next) {

var opts = {
      domain: env.AUTH0_DOMAIN,
  redirectUri: 'https://' + req.headers.host + '/callback',
  callbackURL: 'https://' + req.headers.host + '/callback',
  failureRedirect: 'https://' + req.headers.host +'/failure',
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'
};
if(req.headers.host === 'client1.inovalon.desmaximus.com')
{
opts.clientID = 'rI3g0ryKrRMGl6R4OadLP3Of4AfTFdLC';
opts.clientSecret = 'iiv8Dlb0Nd25wGz6fVHZ1-X5E16AGk3x_Y2p5RFthwJ3OC7WFcuzKERB24TCtuOL';
}

if(req.headers.host === 'client2.inovalon.desmaximus.com')
{
opts.clientID = 'tW72IQe877pOE4LvNHYHzAAkMXFjorB1';
opts.clientSecret = '6vblQw0e5kWvm-lmgAzg9Klk4TsgOJAfHfOhVtQWkTQ9sdsE-0clV9reP-SU2vfO';
}
console.log(passport);
a0base = Object.getPrototypeOf(passport._strategies.auth0);
a0base.constructor.call(passport._strategies.auth0, opts,function(){ return true;});
console.log(opts);

  passport.authenticate('auth0', opts)(req, res, next); },
  function(req, res) {
        console.log(req.session.returnTo);
    res.redirect(req.session.returnTo || 'https://' + req.headers.host + '/user');
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

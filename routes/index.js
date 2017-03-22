const routes = require('express').Router();
const middleware = require('../config/middleware');
const passport = require('passport');
const db = require('../models');

routes.get('/', (req, res) => {
  console.log('user', req.user);
  res.render('index', {
    user: req.user
  });
});

//login a new user
routes.post('/authenticate', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login'
}));


routes.get('/logout', middleware.destroySession);

routes.get('/login', function(req, res) {
  res.render('login');
});

routes.get('/signup', function(req, res) {
  res.render('signup');
});

//create a new user
routes.post('/signup', function(req, res) {
  db.User.find({where: {username: req.username}}).then(function(user) {
    if (!user) {
      db.User.create({username: req.body.username, password: req.body.password}).then(function(user) {
        req.logIn(user, function(err) {
          if (err) {
            return res.redirect('/signup');
          } else {
            res.redirect('/index');    
          }
        });
        
      }).catch(function(err) {
        res.redirect('/signup');
      });
    }
  });
});


routes.get('/auth/facebook',
  function(req, res, next) {
    console.log('in auth facebook');
    next();
  },
  passport.authenticate('facebook', { scope: ['email']}));

routes.get('/auth/facebook/callback',
  function(req, res, next) {
    console.log('in callback');
    next();
  },
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('in auth callback');
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = routes;
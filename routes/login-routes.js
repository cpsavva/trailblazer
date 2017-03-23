// const routes = require('express').Router();
// const middleware = require('../config/middleware');
// const passport = require('passport');
// const db = require('../models');


// //login a new user
// routes.post('/authenticate', passport.authenticate('local', {
//   successRedirect: '/index',
//   failureRedirect: '/login'
// }));


// routes.get('/logout', middleware.destroySession);

// routes.get('/login', function(req, res) {
//   res.render('login');
// });


// routes.get('/auth/facebook',
//   function(req, res, next) {
//     console.log('in auth facebook');
//     next();
//   },
//   passport.authenticate('facebook'));

// routes.get('/auth/facebook/callback',
//   function(req, res, next) {
//     console.log('in callback');
//     next();
//   },
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log('in auth callback');
//     // Successful authentication, redirect home.
//     res.redirect('/index');
//   });

// module.exports = routes;
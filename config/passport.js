var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var db = require('../models');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser');
  db.User.findById(user.id).then(function(user) {
    done(null, user);
  });
});


passport.use(new LocalStrategy(function(username, password, done) {
  
  db.User.findOne({where: {username: username}}).then(function(user) {
    if (!user) {
      return done(null, false, { message: 'Incorrect credentials.' })
    }
    var passwd = user ? user.password: '';
    db.User.validPassword(password, passwd, function(err, found) {
      
      done(err, found ? user : false);
    });    
  });
}));


passport.use(new FacebookStrategy({

    clientID: '1214087665378938',
    clientSecret: 'd37a0a54a9dc93076dadb1c92ca5a784',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

    db.User.findOne({where: {facebookId: profile.id}}).then(function(user) {
      if (!user) {
        db.User.create({facebookRefreshToken: refreshToken, facebookAccessToken: accessToken, facebookId: profile.id, username: profile.username || profile.emails[0].value, password: 'some random password hash' }).then(function(user) {
          done(null, user);
        }).catch(function(err) {
          console.log('err', err);
          done(err, false);
        });

      } else {
        done(null, user ? user : false);
      }
    });
  }
));
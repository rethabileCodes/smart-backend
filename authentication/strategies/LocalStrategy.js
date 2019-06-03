var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  var User = require('../../models/User');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use('local-login',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req,email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: `No User Record Found for ${email}.Please Register An Account.`});
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Invalid Credentials, Please check the supplied inputs and try again.' });
      }
      return done(null, user);
    });
  }
));
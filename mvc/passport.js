//tham khao passpor tai http://www.passportjs.org/docs/configure/
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('./models/user.model');

passport.use(new LocalStrategy(
  async function(username, password, done) {

  }
));

module.exports = passport
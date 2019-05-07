//tham khao passpor tai http://www.passportjs.org/docs/configure/
// https://viblo.asia/p/su-dung-passportjs-xay-dung-kich-ban-dang-ky-va-dang-nhap-4dbZNEJyKYM
//https://codetheworld.io/xac-thuc-dang-nhap-bang-passport-bat-dau-voi-local-authentication.html
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('./models/user.model');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    let user = await userModel.dangnhap(username, password);
    if (!user) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

module.exports = passport
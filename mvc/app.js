
// ==========================================?
//tìm hiểu về mô hình https://code.tutsplus.com/vi/tutorials/site-authentication-in-nodejs-user-sign-up--cms-29933
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var hbssection = require ("express-handlebars-sections");
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var baivietRouter = require('./routes/baiviet');
var danhsachRouter = require('./routes/danhsach');
var tagRouter = require('./routes/quanlynhan');
var chuyenmucRouter = require('./routes/quanlychuyenmuc');
var nguoidungRouter = require('./routes/quanlynguoidung');
var dsbaivietRouter = require('./routes/quanlybaiviet');
var tagindex = require ("./routes/tag");
var searchRouter = require ("./routes/search");
var thongtinRouter = require ("./routes/thongtin");
var writerRouer = require("./routes/writer");
var phancongRouter = require("./routes/phancong");

var passport = require('./passport');
var session = require("express-session"),
    bodyParser = require("body-parser");

var moment = require ("moment");
var hbs = require('hbs');
var fs = require('fs');
var dateFormat = require('dateformat');
var app = express();

var multer  =   require('multer');
var fs = require('fs')
var path = require('path')
var crypto = require('crypto');

var storage = multer.diskStorage({
  //folder upload -> public/upload
  destination: 'public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

let header = fs.readFileSync(path.join(__dirname,"views","user","template","header.hbs"), 'utf-8');
let footer = fs.readFileSync(path.join(__dirname,"views","user","template","footer.hbs"), 'utf-8');
let headeradmin = fs.readFileSync(path.join(__dirname,"views","admin","template","header.hbs"), 'utf-8');
let footeradmin = fs.readFileSync(path.join(__dirname,"views","admin","template","footer.hbs"), 'utf-8');
let headerwriter = fs.readFileSync(path.join(__dirname,"views","writer","template","header.hbs"), 'utf-8');
let footerwriter = fs.readFileSync(path.join(__dirname,"views","writer","template","footer.hbs"), 'utf-8');

hbs.registerPartial('userHeader',  header);
hbs.registerPartial('userFooter',  footer);
hbs.registerPartial('adminHeader',  headeradmin);
hbs.registerPartial('adminFooter',  footeradmin);
hbs.registerPartial('writerHeader',  headerwriter);
hbs.registerPartial('writerFooter',  footerwriter);

hbs.registerHelper('getDate', function(date) { //bỏ múi giờ
  if (date instanceof Date) {
    return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  }
  return date
});
hbs.registerHelper('Date', function(date) { //bỏ múi giờ
  if (date instanceof Date) {
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
  }
  return date
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/baiviet',baivietRouter);
app.use('/danhsach',danhsachRouter);
app.use('/quanlynhan',tagRouter);
app.use('/quanlychuyenmuc', chuyenmucRouter);
app.use('/quanlynguoidung', nguoidungRouter);
app.use('/quanlybaiviet', dsbaivietRouter);
app.use ('/tag',tagindex);
app.use ('/search',searchRouter);
app.use('/phancong', phancongRouter);
app.use('/thongtin', thongtinRouter);
app.use('/writer', writerRouer);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(req.app.get('env'));
  
  // render the error page
  res.status(err.status || 500);
  res.render('error/error', {
    err: err
  });
});
var port = process.env.PORT || 78;
app.listen(port, () => {
  var env = app.get('env');
  console.log(`server is running in ${env} mode at http://localhost:${port}`);
});
module.exports = app;

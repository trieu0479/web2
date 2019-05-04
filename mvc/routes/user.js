var express           = require('express');
//require model
var dashboardModel   = require ("../models/dashboard.model");
var userModel =  require ("../models/user.model");
//use validator
const { check, validationResult } = require('express-validator/check');
//use bcrybt
//  var bcrypt = require('bcrypt');
//  const saltRounds = 10;
//  const myPlaintextPassword = 's0/\/\P4$$w0rD';
//  const someOtherPlaintextPassword = 'not_bacon';
//  ----------------------------------------
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res) {
    let data = {};
    data.baiVietNoiBat = await dashboardModel.get3PostForDashborad();
    data.lay10baixemnhieu = await dashboardModel.lay10baixemnhieu();
    data.laymenu = await dashboardModel.laymenu();
    data.lay10baimoinhat = await dashboardModel.lay10baimoinhat();
    data.top10chuyenmuc = await dashboardModel.top10chuyenmuc();
    res.render('user/index', data);
});




router.get('/baiviet',function(req,res) {
    res.render('user/baiviet')
});

// Cái này hiển thị form đăng ký
router.get('/dangky',function (req,res) {
    let viewData = { 
        errors: false,
        input: {}
    }
    res.render ("user/dangkyuser")
});


// Cái này hiển thị dữ liệu gửi lên
router.post('/dangky',[
// express-validator
    check('username').isLength({min:3,max:15}).withMessage('Tên đăng nhập trong khoảng (3-15) ký tự'),
    check('displayname').isLength({max: 40}).withMessage('Tên Hiển thị không lớn hơn 40 ký tự'),
    check('yearbirth').isLength({min: 4, max: 4}).withMessage('Năm sinh phải là 4 số'),
    check('email').isLength({min:4,max:40}).withMessage('Email ko lớn hơn 40 ký tự'),],
    function (req,res) {
      //hash
    //   var hash = bcrypt.hashSync(req.body.password,saltRounds);
    //   var user = {
    //       MatKhau:hash
    //   }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let viewData = { 
            errors: errors.array(),
            input: req.body
        }
        res.render("user/dangkyuser", viewData)
    } else {
        let data = req.body;
        userModel.dangky(data);
        res.status(200).send()
        // res.redirect("../views/user/dangnhapuser");
    }
});




router.get('/dangnhap',function (req,res) {
    res.render ("../views/user/dangnhapuser")
});
//load datbase


module.exports = router;

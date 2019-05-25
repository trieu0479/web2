var express           = require('express');
//require model
var dashboardModel   = require ("../models/dashboard.model");
var userModel =  require ("../models/user.model");
var chitietModel = require ("../models/baiviet.model");
var tagindexModel = require ("../models/tag.model");
var passport = require('passport');
//xac thuc username,email ,..giong nhau Expressvalidator
var customValidate = require("../customValidate")
var moment = require("moment");
//use validator
const { check, validationResult } = require('express-validator/check');
//use bcrybt
//  var bcrypt = require('bcrypt');
//  const saltRounds = 10;
//  const myPlaintextPassword = 's0/\/\P4$$w0rD';
//  const someOtherPlaintextPassword = 'not_bacon';
//  ----------------------------------------
var router = express.Router();
//truyền req.session qua tất cả các view
router.use(function (req, res, next) {
	res.locals.req = req;
	next();
})

/* GET home page. */
router.get('/', async function (req, res) {    
    // const viewName = "user/index";
    // var vm = {
    //     error: true
    // }
    var id = req.params.id;
    // console.log(id);
    // if (isNaN(id)) {
    //     res.render(viewName, vm);
    //     return;
    // }
    let data = {};
    data.baiVietNoiBat = await dashboardModel.get3PostForDashborad();
    data.lay10baixemnhieu = await dashboardModel.lay10baixemnhieu();
    data.laymenu = await dashboardModel.laymenu();
    data.lay10baimoinhat = await dashboardModel.lay10baimoinhat();
    data.top10chuyenmuc = await dashboardModel.top10chuyenmuc();
    data.laymenu1 = await dashboardModel.demchuyenmuc();
    data.tagindex = await tagindexModel.tagindex();
    
    res.render('user/index', data);
});




///===================router Sign Up======
// Cái này hiển thị form đăng ký
router.get('/dangky',function (req,res) {
    let viewData = { 
        errors: false,
        input: {}
    }
    res.render ("user/dangkyuser")
});


// Cái này hiển thị dữ liệu gửi lên
router.post('/dangky', [
// express-validator
    check('username').isLength({min:3,max:15}).withMessage('Username is (3-15) characters'),
    check('displayname').isLength({max: 40}).withMessage('Display name is no larger than 40 characters'),
    check("password").isLength({min:3,max:50}).withMessage("Password length is 3-50.Try again"),
    check('ngaythangnamsinh').isLength({min: 7, max: 11}).withMessage('The date of birth must be invalid'),    
    check('email').isEmail().withMessage('Email invalid'),
    //check issue same as   
    check('username').custom((data)=>customValidate.checkDuplicate(data, "TenDangNhap")).withMessage('Username already used.Try Username other! '), 
    check("displayname").custom((hihi)=>customValidate.checkDuplicate(hihi,"TenHienThi")).withMessage("Displayname already exists.Try Enter displayname other!"),
    check('email').custom((data) => customValidate.checkDuplicate(data, "Email")).withMessage('Email already use.Try Email other!'), 
    check("password").custom((data)=>customValidate.checkDuplicate(data,"MatKhau")).withMessage("Password already exists.Try passwod other!")    
],     
    async function (req,res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({
            status: false,
            errors: errors.array()
        })
    } else {             
        var dob=moment(req.body.ngaythangnamsinh).format("DD-MM-YY");        
        let data = req.body;       
        // console.log(data);
        data.NgayThangNamSinh = dob;      
        console.log(data);    
        debugger
            
        let returnToUser=await userModel.dangky(data);
        res.send({
            status: true,
            message:'signup success', //ajax alert
            data:returnToUser
        }) 
       
    }
})


// ===============rouuter Login================================

router.get('/dangnhap',function (req,res) {    
    res.render ("../views/user/dangnhapuser")
});
router.post("/dangnhap",[
    check("username").isLength({min:3,max:15}).withMessage('Username is (3-15) characters and must valid'),
    check("password").isLength({min:3,max:50}).withMessage('Password is length 3-50.Try again')
],function(req,res, next) {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // let viewData = { 
        //     errors: errors.array(),
        //     input: req.body
        // }        
        return res.render('user/dangnhapuser', {                   
                    errors: errors.array()
                  });
                  
    }                                 
    else {
        // console.log('vao day nhe')
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
              }        
            // console.log('thongtin', user)                
            // if (!user) {
            //     // let viewData = { 
            //     //     errors: [{msg: "Sai ten dang nhap hoac mat khau"}],
            //     //     input: req.body,                    
            //     // }
            //     // console.log (viewData);
            //     // res.render("user/dangnhapuser");                                                                  
            //     //   console.log(user);
            // } else {                
            //     // xử lý khi thành công ...
            // }
            // neu user isvalid false 
            // console.log('info', user)
            if(user.isValid === false) {
                return res.render('user/dangnhapuser', {                   
                    errors: [{msg: "Sai ten dang nhap hoac mat khau "}],                 
                  });
            }
             else if (user.isValid === true && user.user.Active === 0 && user.user.MaLoaiTaiKhoan === 2 ) {
                return res.render('user/dangnhapuser', {                   
                    errors: [{msg: "Tài khoản hiện tại của bạn là Sucbcriber hết hạn. Cần nạp card để kích hoạt"}],                   
                  });
            } 
            // else if (user.isValid === true && user.user.MaLoaiTaiKhoan === 5) {
            //     return res.render("admin/index")
            // }
            else {
                req.session.user = user;      
                console.log(user);                                      
                res.redirect("/");
            }
        })(req, res, next);
        
    }
})


router.get('/dangxuat',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  req.logout();
           res.redirect('/');  
        }  
    });  

});  

module.exports = router;

var express           = require('express');
//require model
var dashboardModel   = require ("../models/dashboard.model");
var userModel =  require ("../models/user.model");

var passport = require('passport')
//xac thuc username,email ,..giong nhau Expressvalidator
var customValidate = require("../customValidate")

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
    // var id = req.params.id;
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
    check('yearbirth').isLength({min: 4, max: 4}).isNumeric().withMessage('The year of birth must be a number and have 4 characters'),    
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
            errors: errors.array(),
        })
    } else {
        let data = req.body;
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
        let viewData = { 
            errors: errors.array(),
            input: req.body
        }
        res.render("user/dangnhapuser", viewData)
    } else {
        passport.authenticate('local', function(err, user, info) {
            if (!user) {
                let viewData = { 
                    errors: [{msg: "Sai ten dang nhap hoac mat khau"}],
                    input: req.body
                }
                // res.render("user/dangnhapuser", viewData)
            } else {
                req.session.user = user;            
                res.redirect("/");
                // xử lý khi thành công ...
            }
            // if (req.session.user) {
            //     console.log("coo");                        
            // }
            // else console.log("kko");
        })(req, res, next);
        
    }
})

// router.get("/dangnhapsession",(req,res)=> {
   

// })
router.post("/dangxuat",(req,res)=>{
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
})
module.exports = router;

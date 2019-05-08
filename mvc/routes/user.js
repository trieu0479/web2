var express           = require('express');
//require model
var dashboardModel   = require ("../models/dashboard.model");
var userModel =  require ("../models/user.model");

var passport = require('passport')

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
router.post('/dangky',[
// express-validator
    check('username').isLength({min:3,max:15}).withMessage('Username is (3-15) characters'),
    check('displayname').isLength({max: 40}).withMessage('Display name is no larger than 40 characters'),
    check('yearbirth').isLength({min: 4, max: 4}).isNumeric().withMessage('The year of birth must be a number and have 4 characters'),
    // check('pass')
    check('email').isEmail().withMessage('Email invalid'), ]
    ,
    check('email').custom(value => {
        return User.findUserByEmail(value).then(user => { 
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
    }),
    async function (req,res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let viewData = { 
            errors: errors.array(),
            input: req.body
        }
        res.render("user/dangkyuser", viewData)
    } else {
        let data = req.body;
        let returnToUser=await userModel.dangky(data);
        //1 hộp thoại alert báo dang ký thành công
        // res.status(200).send()
        res.send({
            message:'signup success', //ajax alert
            data:returnToUser
        }) 
        
 
               
        // res.render("user/dangnhapuser");
        
    }
});


// ===============rouuter Login================================

router.get('/dangnhap',function (req,res) {
    res.render ("../views/user/dangnhapuser")
});
router.post("/dangnhap",[
    check("username").isLength({min:3,max:15}).withMessage('Username is (3-15) characters and must valid')
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
                res.render("user/dangnhapuser", viewData)
            } else {
                req.session.user = user
                res.send()
                // xử lý khi thành công ...
            }
        })(req, res, next);
    }
}
)


module.exports = router;

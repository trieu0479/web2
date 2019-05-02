var express             = require('express');
//require model
var dashboardModel =require ("../models/dashboard.model");

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    let data = {};
    data.baiVietNoiBat = await dashboardModel.get3PostForDashborad();
    data.lay10baimoinhat = await dashboardModel.lay10baimoinhat();
    data.laymenu = await dashboardModel.laymenu();
    res.render('user/index', data);
});




router.get('/baiviet',function(req,res,next) {
    res.render('user/baiviet')
});
router.get('/dangky',function (req,res,next) {
res.render ("../views/user/dangkyuser")
});
router.get('/dangnhap',function (req,res,next) {
    res.render ("../views/user/dangnhapuser")
    });
//load datbase


module.exports = router;

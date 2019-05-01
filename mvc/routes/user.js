var express             = require('express');
//require model
var dashboardModel =require ("../models/dashboard.model");

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    let data = {};
    data.baiVietNoiBat = await dashboardModel.get3PostForDashborad();
    data.lay10baimoinhat = await dashboardModel.lay10baimoinhat();
    res.render('user/index', data);
});




router.get('/baiviet',function baiviet(req,res,next) {
    res.render('user/baiviet')
});
//load datbase


module.exports = router;

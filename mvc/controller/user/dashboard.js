

function index (req, res, next) {
    res.render('user/index');
}
function baiviet(req,res,next) {
    res.render('user/baiviet')
}
module.exports = {
    index, //cai nay la j v
    baiviet
}
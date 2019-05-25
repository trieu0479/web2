var express = require('express');
var adminModel = require('../models/admin.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
    let data = {};
    data.nguoidung = await adminModel.nguoidung();
    data.baiviet = await adminModel.baiviet();
    data.tag = await adminModel.tag();
    data.chuyenmuc = await adminModel.chuyenmuc();
  res.render('admin/index.hbs', data);
});
router.get ()
module.exports = router;

var express = require('express');
var danhmucgModel = require('../models/quanlychuyenmuc.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
    let data = {};
    data.danhmuc = await danhmucgModel.all();
    
  res.render('admin/quanlychuyenmuc/index.hbs', data);
});

router.get('/detail/:id', async function (req, res) {
    const viewName = 'admin/quanlychuyenmuc/detail.hbs';
    var vm = {
        error: true
    }
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.render(viewName, vm);
        return;
    }
    let data = {};
    data.chuyenmuc = await danhmucgModel.detail(id);
    data.ten = await danhmucgModel.detail1(id);
    res.render(viewName, data);
});

router.get('/detailchm/:id', async function (req, res) {
    const viewName = 'admin/quanlychuyenmuc/detailchm.hbs';
    var vm = {
        error: true
    }
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.render(viewName, vm);
        return;
    }
    let data = {};
    data.chuyenmuc = await danhmucgModel.detailchm(id);
    res.render(viewName, data);
});

router.get('/edit/:id', async function (req, res) {
    const viewName = 'admin/quanlychuyenmuc/edit.hbs';
    var vm = {
        error: true
    }
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.render(viewName, vm);
        return;
    }
    let data = {};
    data.chitiet = await danhmucgModel.detail1(id);
    res.render(viewName, data);
});
router.get('/editchm/:id', async function (req, res) {
    const viewName = 'admin/quanlychuyenmuc/editchm.hbs';
    var vm = {
        error: true
    }
    var id = req.params.id;
    console.log(id);
    if (isNaN(id)) {
        res.render(viewName, vm);
        return;
    }
    let data = {};
    data.chitiet = await danhmucgModel.detailchm(id);
    res.render(viewName, data);
});
module.exports = router;
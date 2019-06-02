var express = require('express');
var danhmucgModel = require('../models/quanlychuyenmuc.model');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 3;

    var start = (page - 1) * perPage;
    var end = perPage;
    //var Rows = 37;
    Promise.all([
        danhmucgModel.sl(),
        danhmucgModel.all(start, end)
    ]).then(([Rows, rows]) => {

        var total = Rows.length;

        var nPages = Math.floor(total / perPage);
        if (total % perPage > 0)
            nPages++;

        var page_numbers = [];
        for (i = 1; i <= nPages; i++) {
            page_numbers.push({
                value: i,
                active: i === +page
            })
        }

        const hasPrevPage = page > 1;
        const hasNextPage = page < nPages;

        res.render('admin/quanlychuyenmuc/index', {
            error: false,
            danhmuc: rows,
            page_numbers,
            hasPrevPage,
            prevPage: page - 1,
            hasNextPage,
            nextPage: page + 1
        });

    }).catch(next);
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
router.get('/add', (req, res, next) => {
    res.render('admin/quanlychuyenmuc/add');
})

router.post('/add', (req, res, next) => {
    var vm = {
        success: true
    }
    danhmucgModel.add(req.body)
        .then(n => {
            res.render('admin/quanlychuyenmuc/add', vm);
        })
        .catch(next);
});
router.get('/addchm', (req, res, next) => {
    res.render('admin/quanlychuyenmuc/addchm');
});
router.post('/addchm', (req, res, next) => {
    var vm = {
        success: true
    }
    danhmucgModel.addchm(req.body)
        .then(id => {
            res.render('admin/quanlychuyenmuc/addchm', vm);
        })
        .catch(next);
});
router.post('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    danhmucgModel.delete(id)
        .then(n => {
            res.redirect('/quanlychuyenmuc');
        }).catch(next);
});

router.post('/deletechm/:id', (req, res, next) => {
    var id = req.params.id;
    danhmucgModel.deletechm(id)
        .then(n => {
            res.redirect('/quanlychuyenmuc');
        }).catch(next);
});
router.post('/update', (req, res, next) => {
    danhmucgModel.update(req.body).then(n => {
        res.redirect('/quanlychuyenmuc');
    }).catch(next);
});
router.post('/updatechm', (req, res, next) => {
    danhmucgModel.updatechm(req.body).then(n => {
        res.redirect('/quanlychuyenmuc');
    }).catch(next);
});
module.exports = router;
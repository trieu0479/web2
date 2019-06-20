var express = require('express');
var nguoidungModel = require('../models/quanlynguoidung.model');
var router = express.Router();

/* GET users listing. */

router.get('/', async function (req, res)  {  
    let data = {};
    data.nguoidung = await nguoidungModel.loai();
    res.render('admin/quanlynguoidung/index', data);
});


router.get('/detail/:id', (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = perPage;


    Promise.all([
        nguoidungModel.sl(),
        nguoidungModel.all(id, start, end)
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

        res.render('admin/quanlynguoidung/detail', {
            error: false,
            nguoidung: rows,
            page_numbers,
            hasPrevPage,
            prevPage: page - 1,
            hasNextPage,
            nextPage: page + 1
        });

    }).catch(next);
});
// router.get('/detail/:id', async function (req, res) {
//     const viewName = 'admin/quanlynguoidung/detail.hbs';
//     var vm = {
//         error: true
//     }
//     var id = req.params.id;
//     console.log(id);
//     if (isNaN(id)) {
//         res.render(viewName, vm);
//         return;
//     }
//     let data = {};
//     data.chuyenmuc = await nguoidungModel.detail(id);
//     res.render(viewName, data);
// });


router.get('/edit/:id', async function (req, res) {
    const viewName = 'admin/quanlynguoidung/edit';
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
    data.chitiet = await nguoidungModel.detail(id);
    res.render(viewName, data);
});
router.post('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    nguoidungModel.delete(id)
        .then(n => {
            res.redirect('/quanlynguoidung');
        }).catch(next);
});
router.post('/update', (req, res, next) => {
    nguoidungModel.update(req.body).then(n => {
        res.redirect('/quanlynguoidung');
    }).catch(next);
});

module.exports = router;
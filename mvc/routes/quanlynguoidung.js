var express = require('express');
var nguoidungModel = require('../models/quanlynguoidung.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
    let data = {};
    data.nguoidung = await nguoidungModel.all();

    res.render('admin/quanlynguoidung/index', data);
});

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
})
module.exports = router;
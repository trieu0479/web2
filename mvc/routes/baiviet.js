var express = require('express');
var chitietModel = require('../models/baiviet.model');
var router = express.Router();
var dashboardModel   = require ("../models/dashboard.model");

router.get('/:id', async function (req, res) {
    const viewName = 'user/baiviet';
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
    data.baiviet = await chitietModel.chitiet(id);
    data.binhluan = await chitietModel.binhluan(id);
    data.nambaiviet =await chitietModel.nambaiviet(id);
    data.laymenu = await dashboardModel.laymenu();
    res.render(viewName, data);
    // chitietModel.chitiet(id)
    //     .then(rows => {
    //         if (rows.length > 0) {
    //             vm = {
    //                 error: false,
    //                 baiviet: rows[0]
    //             }
    //         }

    //         res.render(viewName, vm);
    //     })
    //     .catch(next);
    // chitietModel.binhluan(id)
    //     .then(rows => {
    //         if (rows.length > 0) {
    //             vm = {
    //                 error: false,
    //                 binhluan: rows[0]
    //             }
    //         }
    //         res.render(viewName, vm);
    //     })
    //     .catch(next);
});
module.exports = router;
var express = require('express');
var danhsachModel = require('../models/danhsach.model');
var dashboardModel   = require ("../models/dashboard.model");

var router = express.Router();

router.get('/:id', async function (req, res) {
    const viewName = 'user/danhsach';
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
    data.baiviet = await danhsachModel.danhsach(id);
    data.laymenu = await dashboardModel.laymenu();
    res.render(viewName, data);
});
module.exports = router;
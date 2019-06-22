var express = require("express");
var dsdanhmuc = require("../models/dsdanhmuc.model");
var danhsachModel = require("../models/danhsach.model");
var dashboardModel = require("../models/dashboard.model");
var chitietModel = require("../models/baiviet.model");
var tagindexModel = require("../models/tag.model");
var router = express.Router();

router.use(async function (req, res, next) {
    res.locals.req = req;
    res.locals.laymenu = await dashboardModel.laymenu();
    // res.locals.laymenu;
    for (let x in res.locals.laymenu) {
        res.locals.laymenu[x].sub = await danhsachModel.danhsachMain(res.locals.laymenu[x].IDDanhMuc);
    }
    next();
});

router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    var page = parseInt(req.query.page) || 1;
    var perPage = 5;

    var start = (page - 1) * perPage;
    var end = perPage * page;
    //var Rows = 37;
    Promise.all([
        dsdanhmuc.sl(id),
        dsdanhmuc.dsdanhmuc(start, end, id),
        dashboardModel.demchuyenmuc(),
    ]).then(([Rows, rows, rows1]) => {

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

        res.render('user/dsdanhmuc', {
            error: false,
            baiviet: rows,
            laymenu1: rows1,
            page_numbers,
            
        });

    }).catch(next);

    // const viewName = "user/dsdanhmuc";
    // var vm = {
    //     error: true
    // };
    // var id = req.params.id;
    // console.log(id);
    // if (isNaN(id)) {
    //     res.render(viewName, vm);
    //     return;
    // }
    // let data = {};
    // data.baiviet = await dsdanhmuc.sl(id);
    // // data.laymenu = await dashboardModel.laymenu();
    // // data.laymenu1 = await dashboardModel.demchuyenmuc();
    // // data.taglk = await tagindexModel.taglk(id);
    // // data.tagindex = await tagindexModel.tagindex();
    // console.log(data);
    // res.render(viewName, data);
});
module.exports = router;

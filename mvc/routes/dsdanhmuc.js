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
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = perPage;
    //var Rows = 37;
    Promise.all([
        dsdanhmuc.sl(id),
        dsdanhmuc.dsdanhmuc(start, end, id)
    ]).then(([Rows, rows]) => {

        var total = Rows.length;
        console.log(total);
        var nPages = Math.floor(total / perPage);
        if (total % perPage > 0)
            nPages++;

        var page_numbers = [];
        for (i = 1; i <= 8; i++) {
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
            page_numbers,
            hasPrevPage,
            prevPage: page - 1,
            hasNextPage,
            nextPage: page + 1
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

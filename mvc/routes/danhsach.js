var express = require("express");
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


  var page = parseInt(req.query.page) || 1;
  var perPage = 5;

  var start = (page - 1) * perPage;
  var end = perPage;

  const viewName = "user/danhsach";
  var vm = {
    error: true
  };
  var id = req.params.id;
  console.log(id);
  if (isNaN(id)) {
    res.render(viewName, vm);
    return;
  }
  // let data = {};
  // data.baiviet = await danhsachModel.danhsach(id);
  // // data.laymenu = await dashboardModel.laymenu();
  // data.laymenu1 = await dashboardModel.demchuyenmuc();
  // data.taglk = await tagindexModel.taglk(id);
  // data.tagindex = await tagindexModel.tagindex();
  Promise.all([
    danhsachModel.sl(id),
    danhsachModel.danhsach(start, end, id),
    dashboardModel.demchuyenmuc(),
    tagindexModel.taglk(id),
    tagindexModel.tagindex(),
  ]).then(([Rows, rows, rows1, rows2, rows3]) => {

    var total = Rows.length;
console.log(rows)
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

    res.render('user/danhsach', {
      error: false,
      baiviet: rows,
      laymenu1: rows1,
      taglk: rows2,
      tagindex: rows3,
      page_numbers,
    });
  }).catch(next);
});
module.exports = router;

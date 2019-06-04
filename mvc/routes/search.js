var express = require("express");
var router = express.Router();
var searchModel = require("../models/search.model");
var dashboardModel = require("../models/dashboard.model");
var chitietModel = require("../models/baiviet.model");
var tagindexModel = require("../models/tag.model");
var danhsachModel = require("../models/danhsach.model");
/* GET users listing. */
// router.get('/search/req', async function(req, res) {
//   res.render('user/search.hbs');
// });
// router.use(function (req, res, next) {
// 	res.locals.req = req;
// 	next();
// })
router.use(async function (req, res, next) {
	res.locals.req = req;
  res.locals.laymenu = await dashboardModel.laymenu();
  res.locals.laymenu;
  
  for (let x in res.locals.laymenu ) {
    res.locals.laymenu[x].sub = await danhsachModel.danhsachMain(res.locals.laymenu[x].IDDanhMuc)
  }
  // console.log(res.locals.laymenu);

	next();
})
router.get("", async function(req, res, err) {
  let data = {};
  // if (data.status === 400) {
  //   res.redirect("user/404");
  // }
  const viewName = "user/search.hbs";
  var search = req.query.search;
  data.search = await searchModel.fulltextsearch(search);
  data.noData = data.search.length <= 0;
  // if (data.noData )  {
  //   res.render("user/404.hbs");
  // }
  
  res.render(viewName, data);
  // var req = req.query.search;
  // console.log(req);

  // //   var search1 = req.body.search;
  // //   console.log(search1);
  //   console.log(getreq);
  //   if (!(getreq)) {
  //       res.render(viewName, vm);
  //       return;
  //   }

  // data.baiviet= await danhSachModel.danhsach(id);
  // data.laymenu1 = await dashboardModel.demchuyenmuc();
  // data.taglk = await tagindexModel.taglk(id);
  // data.tagindex = await tagindexModel.tagindex();
});

// router.post('/:req', async function (req, res) {
//     const viewName = 'user/search.hbs';
//     res.render(viewName); });

module.exports = router;

var express = require("express");
var tagindexModel = require("../models/tag.model");
var baivietModel = require("../models/baiviet.model");
var dashboardModel = require("../models/dashboard.model");
var danhsachModel = require("../models/danhsach.model");
var router = express.Router();

router.use(async function (req, res, next) {
  res.locals.req = req;
  res.locals.laymenu = await dashboardModel.laymenu();  
  for (let x in res.locals.laymenu ) {
    res.locals.laymenu[x].sub = await danhsachModel.danhsachMain(res.locals.laymenu[x].IDDanhMuc)
  }
  // console.log(res.locals.laymenu);
	next();
})

router.get("/:id", async function(req, res) {
  const viewName = "user/tag.hbs";
  var vm = {
    error: true
  };
  var id = req.params.id;
  console.log(id);
  if (isNaN(id)) {
    res.render(viewName, vm);
    return;
  }
  let data = {};
  data.taglk = await tagindexModel.taglk(id);
  data.laymenu1 = await baivietModel.demchuyenmuc();

  res.render(viewName, data);
});
module.exports = router;

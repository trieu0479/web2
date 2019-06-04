var express = require("express");
var chitietModel = require("../models/baiviet.model");
var router = express.Router();
var dashboardModel = require("../models/dashboard.model");
var tagindexModel = require("../models/tag.model");
var danhsachModel = require("../models/danhsach.model");
var userModel = require ("../models/user.model");
//chi tiet bai viet
router.use(async function(req, res, next) {
  res.locals.req = req;
  res.locals.laymenu = await dashboardModel.laymenu();

  for (let x in res.locals.laymenu) {
    res.locals.laymenu[x].sub = await danhsachModel.danhsachMain(
      res.locals.laymenu[x].IDDanhMuc
    );
  }
  next();
});
router.get("/:id", async function(req, res) {
  const viewName = "user/baiviet";
  var vm = {
    error: true
  };
  var id = req.params.id;
  console.log(id);
  if (isNaN(id)) {
    res.render(viewName, vm);
    // return;
  }
  let data = {};
  data.baiviet = await chitietModel.chitiet(id);
  data.binhluan = await chitietModel.binhluan(id);
  data.nambaiviet = await chitietModel.nambaiviet(id);
//   data.laymenu = await dashboardModel.laymenu();
  data.tagindex = await tagindexModel.tagindex();
  data.demchuyenmuc = await chitietModel.demchuyenmuc();
  data.taglk = await tagindexModel.taglk(id);
  // data.dangky = await userModel.dangky(req);
  res.render(viewName, data);
  //load tag
  // router.get("/:id",async function (req,res) {
  //     const viewName ="user/baiviet";
  //     var vm = {
  //         error: true
  //     }
  //     var id =req.params.id;
  //     console.log(id);
  //     if (isNaN(id)) {
  //         res.render(viewName,vm);
  //         return;
  //     }
  //     let data ={};
  //     data.tagbaiviet = await chitietModel.tagbaiviet(id);

  // })
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

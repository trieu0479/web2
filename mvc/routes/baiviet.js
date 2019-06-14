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
    res.locals.laymenu[x].sub = await danhsachModel.danhsachMain( res.locals.laymenu[x].IDDanhMuc);
  }
  next();
});

router.get("/:id", async function(req, res) {
  const viewName = "user/baiviet";
  var vm = {
    error: true
  };
  var id = req.params.id;
  if (isNaN(id)) {
    res.render(viewName, vm);
  }

  let data = {};
  // data.idBaiViet = id;
  data.baiviet = await chitietModel.chitiet(id);
  data.nambaiviet = await chitietModel.nambaiviet(id);
  data.tagindex = await tagindexModel.tagindex();
  data.demchuyenmuc = await chitietModel.demchuyenmuc();
  data.taglk = await tagindexModel.taglk(id);
  data.result = await chitietModel.binhluan(data,req);   
  data.showbinhluan = await chitietModel.showbinhluan(id); 
  data.luotxem = await chitietModel.soluotxem(req);
  data.baivietpremium = await chitietModel.baivietpremium(req);
  res.render(viewName, data);  
  console.log(req.session.user);
  // =======================================
  if (!req.session.user ) {
    if (data.baivietpremium.status===201) {
    console.log("ko co user dang nhap");    
    console.log(data.baivietpremium.status);
    
    return res.render("user/khongtimthaytrang"); }
    else res.render("user/baiviet");
  }
  if (req.session.user.MaLoaiTaiKhoan==2) {
     if (data.baivietpremium.status===201) {
        console.log("201");    
     {
      console.log("thanh cong");
      return res.render("user/baiviet");
    }
  }
    else return res.render("user/khongtimthaytrang");    
    // return res.redirect(`/baiviet/${id}`)  
  }
  else {
    if (data.baivietpremium.status===201) {
      console.log("401");    
   {
    console.log(" day la ma loai tai khoan khac");
    return res.render("user/khongtimthaytrang");
  }
}
  else return res.render("user/baiviet"); 
}
});
// ==========================================================
router.post("/:id", async function(req, res) {
  const viewName = "user/baiviet";
  var vm = {
    error: true
  };
  
  var id = req.params.id;

  if (isNaN(id)) {
    res.render(viewName,vm);
  }
  let data = {}; 
  data.baiviet = await chitietModel.chitiet(id);
  data.nambaiviet = await chitietModel.nambaiviet(id);
  data.tagindex = await tagindexModel.tagindex();
  data.demchuyenmuc = await chitietModel.demchuyenmuc();
  data.taglk = await tagindexModel.taglk(id);
  data.showbinhluan = await chitietModel.showbinhluan(id);   
  data.result = await chitietModel.binhluan(data,req); 
  data.luotxem = await chitietModel.soluotxem(req);
  data.baivietpremium = await chitietModel.baivietpremium(req);
//  ====xu ly khi tai khoan là subcribers đc xem bai viết premium 
// ========Xử lý bình luận=====================
   if (data.result.status===400) {
    console.log("400");
    data.errors = [{ msg: data.result.messages }];
    return res.render("user/baiviet", data);
  }
  else if (data.result.status ===500) {
    console.log("500");
    data.errors = [{ msg: data.result.messages }];
    return res.render("user/baiviet", data);

  }
 else if (data.result.status ===200) {
  console.log("200");
  return res.redirect(`/baiviet/${id}`);  
  //thong bao alert cho nguoi dung bik la binh lan thanh cong roi
 }
 res.render(viewName, data);
})  
module.exports = router;

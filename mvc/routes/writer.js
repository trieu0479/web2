var express = require("express");

var writerModel = require("../models/writer.model");
var router = express.Router();



/* GET users listing. */
router.get('/', async function (req, res) {

  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  data.writer = await writerModel.detail(id);
  data.info = await writerModel.infor(id);
  //console.log(data);
  res.render('writer/index', data);

});
router.get('/dangbai', async function (req, res) {
  let data = {};
  data.chuyenmuc = await writerModel.laychuyenmuc();
  res.render('writer/dangbai', data);
});

///   Đăng bài viết
// router.get('/add', (req, res, next) => {
//   console.log("dangbaithanhcong");  
//   res.render('writer/index');
// })

router.post('/dangbai', async function (req, res, next) {

  let data = {};
  data.chuyenmuc = await writerModel.laychuyenmuc();
  writerModel.add(req.body)
  res.render('writer/dangbai', data);
})


router.get('/hieuchinh', async function (req, res) {
  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  data.hieuchinh = await writerModel.hieuchinh(id);
  //console.log(data);
  res.render('writer/hieuchinh', data);
});

router.get('/dsbaiviet', (req, res, next) => {
  console.log("danh sach bv writer");
  var page = parseInt(req.query.page) || 1;
  var perPage = 10;
  var start = (page - 1) * perPage;
  var end = perPage;
  var id = req.session.user.user.MaTaiKhoan;
  Promise.all([
    writerModel.sl(id),
    writerModel.baiviet(id, start, end)
  ]).then(([Rows, rows]) => {
    //console.log(rows);
    var total = Rows.length;
    //console.log(total);
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

    res.render('writer/dsbaiviet', {
      error: false,
      baiviet: rows,
      page_numbers,
      hasPrevPage,
      prevPage: page - 1,
      hasNextPage,
      nextPage: page + 1
    });

  }).catch(next);

});

router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      req.logout();
      res.redirect("/");
    }
  });
});

router.post('/update', (req, res, next) => {
  writerModel.update(req.body).then(n => {
    res.redirect('./');
  }).catch(next);
})

router.get('/:id', async function (req, res, next) {

  var id = req.params.id;
  let data = {};
  data.chitiet = await writerModel.chitiet(id);
  res.render('writer/chitiet', data);
})

router.get('/addtag/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  let data = {};
  data.danhsachtag = await writerModel.danhsachtag(id);
  data.danhsach = await writerModel.themtag(id);
  data.bv = await writerModel.bv(id);
  console.log(data);
  res.render('writer/addtag', data);
})

router.post('/addtag',  async function (req, res, next) {
  var vm = {
    success: true
  }
  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  data.writer = await writerModel.detail(id);
  data.info = await writerModel.infor(id);
  writerModel.addtag(req.body)
      res.render('writer/index', data);
   
})
router.get('/chitiet/:id', async function (req, res) {
  const viewName = 'writer/chitiet';

  var id = req.params.id;
  console.log(id);

  let data = {};
  data.chitiet = await writerModel.chitiet(id);
  data.chuyenmuc = await writerModel.laychuyenmuc();
  console.log(data);
  res.render(viewName, data);
});
//router.get ()
module.exports = router;

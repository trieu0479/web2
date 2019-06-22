var express = require("express");

var editorModel = require("../models/editor.model");

var router = express.Router();



/* GET users listing. */
router.get('/', async function (req, res) {

  var id = req.session.user.user.MaTaiKhoan;
  console.log(id);
  let data = {};
  //data.editor = await editorModel.detail(id);
  data.info = await editorModel.infor(id);  
  res.render('editor/index',data );

});

router.get('/qlbaiviet', async function (req, res) {

  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  
  data.baiviet = await editorModel.detail(id);
  //console.log(data);
  res.render('editor/qlbaiviet', data);

});

router.get('/xuly', async function (req, res) {

  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  data.baiviet = await editorModel.xuly(id);
  //console.log(data);
  res.render('editor/xuly', data);

});

router.get('/tuchoi/:id', async function (req, res) {

  var id = req.params.id;
  console.log(id);
  let data = {};
  
  data.chitiet = await editorModel.chitiet(id);
  //console.log(data);
  res.render('editor/tuchoi', data);

});

router.post('/add', async function(req, res) {
  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  
  data.baiviet = await editorModel.detail(id);
  editorModel.add(req.body)
      res.render('editor/qlbaiviet', data);

});
router.post('/update', (req, res, next) => {
  var vm = {
    success: true
  }
  editorModel.update(req.body)
    res.render('editor/index', vm);
  
})
router.post('/updatett', async function (req, res, next) {
  var id = req.session.user.user.MaTaiKhoan;
  //console.log(id);
  let data = {};
  
  data.baiviet = await editorModel.detail(id);
  editorModel.updatett(req.body)
    res.render('editor/qlbaiviet', data);
 
})


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

// =========================duyet bai viet===================
router.get('/duyet/:id', async function (req, res, next) {

  var id = req.params.id;
  let data = {};
  data.chitiet = await editorModel.chitiet(id);
  data.chuyenmuc = await editorModel.laychuyenmuc();
  //console.log(data);
  res.render('editor/duyet', data);
})




router.get('/chitiet/:id', async function (req, res) {
  const viewName = 'editor/chitiet';
  var id = req.params.id;
  let data = {};
  data.chitiet = await editorModel.chitiet(id);
  console.log(data); 
  res.render(viewName, data);
});

//router.get ()
module.exports = router;

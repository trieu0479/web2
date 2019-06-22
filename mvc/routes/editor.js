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
  //console.log(data);
  res.render('editor/index', data);

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

//router.get ()
module.exports = router;

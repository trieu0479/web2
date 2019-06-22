var express = require("express");
//require model

var thongtinModel = require("../models/thongtin.model");
var router = express.Router();


router.get("/:id", async function (req, res) {
  var id = req.params.id;
  var vm = {
    error: true
  }
  if (isNaN(id)) {
    res.render("user/thongtin", vm);
    return;
  }
  let data = {};
  data.detail = await thongtinModel.detail(id);
  res.render("user/thongtin", data);
});

router.post('/update', (req, res, next) => {
  thongtinModel.update(req.body).then(n => {

    res.redirect('/.');
  }).catch(next);
})
module.exports = router;
var express = require('express');
var baivietModel = require('../models/quanlybaiviet.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
    let data = {};
    data.baiviet = await baivietModel.all();
    
  res.render('admin/quanlybaiviet/index.hbs', data);
});
router.get('/edit/:id', async function (req, res) {
  const viewName = 'admin/quanlybaiviet/edit.hbs';
  var vm = {
      error: true
  }
  var id = req.params.id;
  console.log(id);
  if (isNaN(id)) {
      res.render(viewName, vm);
      return;
  }
  let data = {};
  data.chitiet = await baivietModel.detail(id);
  res.render(viewName, data);
});

module.exports = router;
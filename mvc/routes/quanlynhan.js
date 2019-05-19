var express = require('express');
var tagModel = require('../models/quanlynhan.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
    let data = {};
    data.tag = await tagModel.all();
    
  res.render('admin/quanlynhan/index.hbs', data);
});
router.get('/edit/:id', async function (req, res) {
  const viewName = 'admin/quanlynhan/edit.hbs';
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
  data.chitiet = await tagModel.detail(id);
  res.render(viewName, data);
});

module.exports = router;
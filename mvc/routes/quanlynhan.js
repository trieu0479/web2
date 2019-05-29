var express = require('express');
var tagModel = require('../models/quanlynhan.model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  let data = {};
  data.tag = await tagModel.all();

  res.render('admin/quanlynhan/index', data);
});

router.get('/add', (req, res, next) => {
  res.render('admin/quanlynhan/add');
})

router.post('/add', (req, res, next) => {
  var vm = {
    success: true
  }
  tagModel.add(req.body)
    .then(id => {
      res.render('admin/quanlynhan/add', vm);
    })
    .catch(next);
})

router.get('/edit/:id', async function (req, res) {
  const viewName = 'admin/quanlynhan/edit';
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
router.post('/delete/:id', (req, res, next) => {
  var id = req.params.id;
  tagModel.delete(id)
      .then(n => {
          res.redirect('/quanlynhan');
      }).catch(next);
})

module.exports = router;
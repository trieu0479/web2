var express = require('express');
var baivietModel = require('../models/quanlybaiviet.model');
var router = express.Router();

router.get('/', (req, res, next) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;

  var start = (page - 1) * perPage;
  var end = perPage;
  //var Rows = 37;
  Promise.all([
    baivietModel.sl(),
    baivietModel.all(start, end)
  ]).then(([Rows, rows]) => {

    var total = Rows.length;

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

    res.render('admin/quanlybaiviet/index', {
      error: false,
      baiviet: rows,
      page_numbers,
      hasPrevPage,
      prevPage: page - 1,
      hasNextPage,
      nextPage: page + 1
    });

  }).catch(next);
})
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
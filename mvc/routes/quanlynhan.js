var express = require('express');
var tagModel = require('../models/quanlynhan.model');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=>  {
  var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = perPage;

    Promise.all([
      tagModel.sl(),
      tagModel.all(start, end)
    ]).then(([Rows, rows]) => {

        var total = Rows.length;
        console.log(total);
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

        res.render('admin/quanlynhan/index', {
            error: false,
            tag: rows,
            page_numbers,
            hasPrevPage,
            prevPage: page - 1,
            hasNextPage,
            nextPage: page + 1
        });

    }).catch(next); 
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
});
router.post('/update', (req, res, next) => {
  tagModel.update(req.body).then(n => {
    res.redirect('/quanlynhan');
  }).catch(next);
})


module.exports = router;
var express = require('express');
var phancongModel = require('../models/phancong.model');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=>  {
  var page = parseInt(req.query.page) || 1;
    var perPage = 10;

    var start = (page - 1) * perPage;
    var end = perPage;

    Promise.all([
        phancongModel.sl(),
        phancongModel.all(start, end)
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
        res.render('admin/phancong/index', {
            error: false,
            nguoidung: rows,
            page_numbers,
           
        });

    }).catch(next); 
});

router.get('/add/:id', async function (req, res, next) {
    var vm = {
        error: true
      };
    
      var id = req.params.id;
      if (isNaN(id)) {
        res.render(viewName,vm);
      }
    let data = {};
    data.nguoidung = await phancongModel.detail(id);
    data.phancong = await phancongModel.phancong(id);
    console.log(data);
    res.render('admin/phancong/add', data);
})

router.post('/add', (req, res, next) => {
  var vm = {
    success: true
  }

  phancongModel.add(req.body)
    .then(id => {
      res.render('admin/phancong/add', vm);
    })
    .catch(next);
})
router.get('/detail/:id', async function (req, res, next) {
    var vm = {
        error: true
      };
    
      var id = req.params.id;
      if (isNaN(id)) {
        res.render(viewName,vm);
      }
    let data = {};
    data.chuyenmuc = await phancongModel.chuyenmuc(id);
    //data.phancong = await phancongModel.phancong(id);
    console.log(data);
    res.render('admin/phancong/detail', data);
})

router.post('/delete/:id', (req, res, next) => {
  var id = req.params.id;
  console.log(id);
  phancongModel.delete(id)
      .then(n => {
          res.redirect('admin/phancong');
      }).catch(next);
});

module.exports = router;
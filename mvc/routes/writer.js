var express = require("express");

var writerModel = require("../models/writer.model");
var router = express.Router();



/* GET users listing. */
router.get('/', function (req, res) {
    res.render('writer/index', { result: 'result' });
});
router.get('/dangbai', function (req, res) {

    res.render('writer/dangbai.hbs');
});

router.get('/dsbaiviet', async function (req, res) {

    res.render('writer/dsbaiviet');
});
router.get('/add', (req, res, next) => {
    res.render('writer/index');
})

router.post('/add', async function(req, res, next) {
    
      //var dob = moment(req.body.ngaythangnamsinh).format("DD-MM-YY");
      let data = req.body;
      // console.log(data);
      //data.NgayThangNamSinh = dob;
      console.log(data);

      let returnToUser = await writerModel.add(data);
      res.send({
        status: true,
        message: "add success", //ajax alert
        data: returnToUser
      });
    
})

//router.get ()
module.exports = router;


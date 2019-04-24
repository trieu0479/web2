var express             = require('express');
const path              = require('path');
const controllerPath    = path.join(__dirname, '..', 'controller', 'user');

// const controllerPath    = '../controller/user';

var dashboardController = require(path.join(controllerPath, 'dashboard.js'));

var router = express.Router();

/* GET home page. */
router.get('/', dashboardController.index);
router.get('/baiviet',dashboardController.baiviet);

module.exports = router;

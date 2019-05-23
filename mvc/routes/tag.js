var express = require('express');
var tagindexModel = require ("../models/tag.model");
var baivietModel = require ("../models/baiviet.model");
var router = express.Router();

router.get('/:id', async function (req, res) {
    const viewName = 'user/tag';
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
    data.taglk = await tagindexModel.taglk(id);
    data.laymenu1 =  await baivietModel.demchuyenmuc();
    data.tagindex = await tagindexModel.tagindex();
    res.render(viewName, data);
});
module.exports = router;
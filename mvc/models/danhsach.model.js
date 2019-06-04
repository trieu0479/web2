var db = require('../connection');


module.exports = {
    danhsach: (id) => {
       return db.load(`select * from chuyemuc join baiviet on baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
        where chuyemuc.IDChuyenMuc = "${id}" `);
    },
    danhsachMain: (id) => {
       return db.load(`select * from chuyemuc where chuyemuc.IDDanhMuc = "${id}" `);
    },
    
}
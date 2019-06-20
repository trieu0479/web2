var db = require('../connection');


module.exports = {
    danhsach: (id) => {
        //check tài khoản chô
       return db.load(`select * from chuyemuc join baiviet on baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
        where chuyemuc.IDChuyenMuc = "${id}" order by BaiVietPremium desc, NgayDang desc `);
    },
    danhsachMain: (id) => {
       return db.load(`select * from chuyemuc where chuyemuc.IDDanhMuc = "${id}" `);
    },
    
}
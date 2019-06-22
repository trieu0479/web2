var db = require('../connection');


module.exports = {
    danhsach: (id) => {
        //check tài khoản chô
       return db.load(`select * from chuyemuc join baiviet on baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
        where chuyemuc.IDChuyenMuc = "${id}" and baiviet.TinhTrang = 2 order by BaiVietPremium desc, NgayDang desc `);
    },
    danhsachMain: (id) => {
       return db.load(`select * from chuyemuc where chuyemuc.IDDanhMuc = "${id}" `);
    },
    dsdanhmuc: id => {
        return db.load(`SELECT *from danhmuc,chuyemuc,baiviet WHERE chuyemuc.IDDanhMuc=danhmuc.IDDanhMuc and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
         and danhmuc.IDDanhMuc=${id} and baiviet.TinhTrang = 2`);
    }
    
}
var db = require('../connection');


module.exports = {

   sl: (id)=> {
        return db.load(`SELECT *from danhmuc,chuyemuc,baiviet WHERE chuyemuc.IDDanhMuc=danhmuc.IDDanhMuc and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
         and danhmuc.IDDanhMuc=${id}`);
    },
    dsdanhmuc: (start, end, id)=> {
        return db.load(`SELECT *from danhmuc,chuyemuc,baiviet WHERE chuyemuc.IDDanhMuc=danhmuc.IDDanhMuc and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc
         and danhmuc.IDDanhMuc=${id} limit ${end} offset ${start}`);
    }
    
}
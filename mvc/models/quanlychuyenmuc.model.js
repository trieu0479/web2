var db =require("../connection");

module.exports = {
    all: () => {
        return db.load('select  *  from danhmuc ');
    },
    detail: id =>{
        return db.load(`select * from chuyemuc join danhmuc on chuyemuc.IDDanhMuc = danhmuc.IDDanhMuc where danhmuc.IDDanhMuc = ${id}`);
    },
    detail1: id =>{
        return db.load(`select * from danhmuc where IDDanhMuc = ${id}`);
    },
   detailchm: id =>{
       return db.load(`select * from chuyemuc where IDChuyenMuc = ${id}`);
   }
};
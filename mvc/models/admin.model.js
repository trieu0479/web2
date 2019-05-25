var db =require("../connection");

module.exports = {
    nguoidung: () => {
        return db.load('select  count(*) as sl from taikhoan ');
    },
    baiviet: () => {
        return db.load('select count(*) as sl from baiviet');
    },
    tag: () => {
        return db.load('select count(*) as sl from tag');
    }, 
    chuyenmuc: () => {
        return db.load('select count(*) as sl from chuyemuc');
    },
    dangnhap:async (username,password) => {

    }
};
var db = require("../connection");


module.exports ={
    // all: (start, end) => {
    //     return db.load(`select  *  from baiviet limit ${end} offset ${start}`);
    // },
    all:() => {
        return db.load('select * from baiviet');
    },
    detail: id => {
        return db.load(`select * from baiviet join danhmuc on baiviet.IDDanhMuc = danhmuc.IDDanhMuc where IDBaiViet = ${id}`);
    },
    
};
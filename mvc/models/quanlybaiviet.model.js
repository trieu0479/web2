var db =require("../connection");

module.exports = {
    all: () => {
        return db.load('select  *  from baiviet ');
    },
    detail: id =>{
        return db.load(`select * from baiviet join danhmuc on baiviet.IDDanhMuc = danhmuc.IDDanhMuc where IDBaiViet = ${id}`);
    }
};
var db = require('../connection');


module.exports = {
    danhsach: (id) => {
       return db.load(`select * from danhmuc join baiviet on 
       baiviet.IDDanhMuc = danhmuc.IDDanhMuc where danhmuc.IDDanhMuc = ${id} `);
    },
    
}
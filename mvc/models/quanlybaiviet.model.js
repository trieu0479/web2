var db = require("../connection");


module.exports ={
    // all: (start, end) => {
    //     return db.load(`select  *  from baiviet limit ${end} offset ${start}`);
    // },
    sl:() => {
        return db.load(`select  *  from baiviet `);
    },
    all:(start, end) => {
        return db.load(`select  *  from baiviet limit ${end} offset ${start}`);
    },
    detail: id => {
        return db.load(`select * from baiviet join danhmuc on baiviet.IDDanhMuc = danhmuc.IDDanhMuc where IDBaiViet = ${id}`);
    },
    update: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
      },
};
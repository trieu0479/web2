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
        return db.load(`select * from baiviet , chuyemuc, danhmuc where baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc 
        and chuyemuc.IDDanhMuc = danhmuc.IDDanhMuc and IDBaiViet = ${id}`);
    },
    update: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
      },
};